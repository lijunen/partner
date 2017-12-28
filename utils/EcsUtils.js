
import __config from '../etc/config'

class EcsUtils {
  uploadFile(file, file_name, success, fail) {
    wx.uploadFile({
      url: __config.basePath + "data/uploadImageNew",
      filePath: file,
      name: file_name,
      success: success,
      fail: fail
    });
  }

  /**
   * 文件上传，成功回调返回object
   */
  uploadFileV2(file, file_name, success, fail) {
    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: __config.basePath + "data/uploadImageNew",
      filePath: file,
      name: file_name,
      success: function (res) {
        try {
          let response = JSON.parse(res.data.trim())
          success(response)
        } catch (e) {
          console.log('JSON解析出错')
        }
        wx.hideLoading()
      },
      fail: fail
    });
  }
  /**
   * 文件上传，成功回调返回object
   */
  uploadFileV3(config) {
    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: __config.basePath + "data/uploadImageNew",
      filePath: config.file,
      formData: {'type': config.file_type || 1,ext_type:config.ext_type ||1},
      name: config.file_name,
      success: function (res) {
        try {

          let response = JSON.parse(res.data.trim())
          config.success(response)
        } catch (e) {
          // console.log('JSON解析出错')
        }
        wx.hideLoading()
      },
      fail:function(err){
        wx.hideLoading()
        if(config.fail){
          config.fail(err);
        }
      }
    });
  }

  /**
   * 车牌识别
   */
  discernCarNo(config) {
    wx.uploadFile({
      url: __config.basePath + "data/carNumberDiscernNew",
      filePath: config.filePath,
      name: config.name,
      formData: config.formData ? config.formData : {},
      success: function (res) {
        try {
          let response = JSON.parse(res.data.trim())
          if (config.success) {
            config.success(response)
          }
        } catch (e) {
          console.log('JSON解析出错')
        }
      },
      fail: function (err) {
        if (config.fail) {
          config.fail(err)
        }
      }
    });
  }

  /**
   * show toast
   * @param page obj 当前页面对象
   * @param content  显示的内容
   */
  showToast(page, content) {
    if (page.data.showToast != undefined) {
      page.setData({
        showToast: true,
        toastContent: content
      })
      setTimeout(function () {
        page.setData({
          showToast: false,
          toastContent: ''
        })
      }, 3000)
    }
  }

  /**
   * 生产GUID
   */
  createGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
        guid += "-";
    }
    return guid;
  }


  /**
   * 格式化时间戳
   * @param int 时间戳
   * @param 格式化 yyyy-mm-dd h:i
   */
  formatTimestamp(timestamp) {
    if (isNaN(timestamp)) {
      return ''
    }
    let myDate = new Date()
    myDate.setTime(parseInt(timestamp) * 1000)
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let day = myDate.getDate()
    let hour = myDate.getHours()
    let minute = myDate.getMinutes()
    let second = myDate.getSeconds()
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
  }

  /**
   * 日期减去指定天数
   * @param object date date对象
   * @param int days
   * @return date 对象 
   */
  dateReduceDays(date, days) {
    let value = date.valueOf()
    value = value - parseInt(days) * 24 * 60 * 60 * 1000
    let newDate = new Date(value)
    return newDate
  }

  /**
   * 获取当前时间的年月日
   */
  getDateYmd(myDate) {
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let day = myDate.getDate()
    return year + '-' + month + '-' + day
  }


  /**
   * 格式化分到元
   */
  formatPriceFenToYuan(value) {
    return value / 100
  }

  /**
   * 格式化价格元到分
   */
  formatPriceYuanToFen(value) {
    return value * 100
  }

  /**
   * 检查登录状态
   */
  checkLoginStatus(){
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      wx.reLaunch({
        url: '/pages/index/login/login',
      })
    }

  }
  
  
 

}
export default EcsUtils;
