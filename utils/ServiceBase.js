import __config from '../etc/config'
import Tools from 'Tools'
import es6 from '../assets/plugins/es6-promise'
class ServiceBase {
  constructor() {
    // this.encrypt = new Encrypt
    this.tools = new Tools

  }
  /**
   * 发送请求
   */
  sendRequest(config) {
    // 注入拦截器
    const chainInterceptors = (promise, interceptors) => {
      for (let i = 0, ii = interceptors.length; i < ii;) {
        let thenFn = interceptors[i++]
        let rejectFn = interceptors[i++]
        promise = promise.then(thenFn, rejectFn)
      }
      return promise
    }
    //构建wx.request  请求对象
    const wxConfig = {
      url: __config.basePath + config.url,
      data: config.data,
      method: config.method || 'POST',
      dataType: config.dataType || 'JSON',
      showLoading: config.showLoading != undefined ? config.showLoading :true
    }
    // return this.__http(wxConfig)
    let requestInterceptors = []
    let responseInterceptors = []
    let reversedInterceptors = this.setInterceptors()
    let promise = this.__resolve(wxConfig)

    // 缓存拦截器
    reversedInterceptors.forEach((n, i) => {
      if (n.request || n.requestError) {
        requestInterceptors.push(n.request, n.requestError)
      }
      if (n.response || n.responseError) {
        responseInterceptors.unshift(n.response, n.responseError)
      }
    })

    // 注入请求拦截器
    promise = chainInterceptors(promise, requestInterceptors)

    // 发起HTTPS请求
    promise = promise.then(this.__http)

    // 注入响应拦截器
    promise = chainInterceptors(promise, responseInterceptors)

    // 接口调用成功，res = {data: '开发者服务器返回的内容'}
    promise = promise.then(res => res, err => err)

    return promise

  }



  /**
   * __http - wx.request
   */
  __http(obj) {
    return new es6.Promise((resolve, reject) => {
      obj.success = (res) => resolve(res)
      obj.fail = (res) => reject(res)
      wx.request(obj)
    })
  }

  /**
   * __resolve
   */
  __resolve(res) {
    return new es6.Promise((resolve, reject) => {
      resolve(res)
    })
  }

  /**
   * __reject
   */
  __reject(res) {
    return new es6.Promise((resolve, reject) => {
      reject(res)
    })
  }
  /**
   * 设置request拦截器
   */
  setInterceptors() {
    return [{
      request: (request) => {
        request.data.key = __config.key
        request.data.from_client = "12"
        //数据加密
        // let sendData = this.encrypt.encrypt(request.data)
        request.header = request.header || {}
        // request.data = sendData
        request.data = request.data
        if (request.showLoading) {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
        }
        return request
      },
      requestError: (requestError) => {
        wx.hideLoading()
        return requestError
      },
      response: (response) => {
        wx.hideLoading()
        // console.log(response)
        return JSON.parse(response.data);
        // let responseStr = this.encrypt.decrypt(response.data)
        // return JSON.parse(responseStr.substr(0, responseStr.lastIndexOf('}') + 1))
      },
      responseError: (responseError) => {
        wx.hideLoading()
        return responseError
      },
    }]
  }

}

export default ServiceBase