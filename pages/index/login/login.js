// pages/index/login/login.js
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonText: '确定',
    loading: false,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = app.WxValidate({
      phone: {
        required: true,
        tel: true,
        maxlength: 11,
      },
      password: {
        required: true,
      },

    }, {
        phone: {
          required: '请输入账号',
          tel: '手机号格式不正确'
        },
        password: {
          required: '请输入密码',
        },

      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindInput: function (e) {
    try {
      let inputParams = {}
      let inputValue = wx.getStorageSync('inputParams')
      if (inputValue) {
        inputParams = inputValue
      }

      let field = e.currentTarget.dataset.field
      let value = e.detail.value
      inputParams[field] = value
      
      wx.setStorageSync('inputParams', inputParams)
    } catch (e) {
      console.log(e);
    }
  },
  formSubmit: function (e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showModal({
        title: '友情提示',
        content: `${error.msg}`,
        showCancel: false
      })
      return false
    }
    this.setData({
      disabled: true,
      loading: true
    })
    this.login(params)

  },
  login: function (params) {
    app.HttpService.login(params).then(data => {
        this.setData({
          buttonText: '确定',
          loading: false,
          disabled: false
        })
        if (data.status == 1) {
          wx.showToast({
            title: '登录成功',
          })
          wx.setStorageSync("userInfo", data.userinfo)          
          setTimeout(() => {
            wx.switchTab({
              url: '../home/home',
            })
            
          }, 1000)
        } else {
          wx.showModal({
            title: '友情提示',
            content: data.msg,
            showCancel: false
          })
        }
      })
      .catch(err => {
        console.log('err:' + err)
      })
  }
})