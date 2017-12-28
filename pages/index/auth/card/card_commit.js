// pages/index/auth/person/person_commit.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName: '',
    buttonText: '确定',
    loading: false,
    disabled: false,
    cardNum: '',
    bankName: '',
    bankCity: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    this.setData({
      realName: app.gbData.userInfo.realName
    })
    this.WxValidate = app.WxValidate({
      realName: {
        required: true
      },
      cardNumber: {
        required: true
      },
      bankPreMobile: {
        required: true,
        tel: true
      },

    },
      {
        realName: {
          required: '请先进行实名认证'
        },
        cardNumber: {
          required: '请输入收款账号',
        },
        bankPreMobile: {
          required: '请输入预留银行手机号码',
          tel: '手机号码格式不正确'
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
    let field = e.currentTarget.dataset.field
    let value = e.detail.value
    this.setData({
      field: value
    })
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
    this.saveAccountInfo(params)

  },
  saveAccountInfo: function (params) {
    params['bid'] = app.gbData.userInfo.bid
    params['phone'] = app.gbData.userInfo.phone
    params['accountNo'] = params['cardNumber']
    let that = this
    app.HttpService.verifyBankCardInfo(params).then(data => {
      this.setData({
        buttonText: '确定',
        loading: false,
        disabled: false
      })
      if (data.status == 1) {
        that.doBankCardInfo(params)

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
  },
  checkCards: function (e) {
    let params = {
      cardNum: e.detail.value
    }
    let that = this
    app.HttpService.checkCards(params).then(data => {
      if (data.status == 1) {
        if(data.bankName == '未知'){
          wx.showModal({
            title: '友情提示',
            content: '请核对银行卡号是否正确',
            showCancel:false
          })
        }else{
          that.setData({
            bankName: data.bankName
          })
        }
      }
    })
  },

  /**
   * 城市切换
   */
  switchCity: function () {
    wx.navigateTo({
      url: '../../switchcity/switchcity',
    })
  },
  /**
   * 添加银行卡
   */
  doBankCardInfo: function (params) {
    let postParams = {}
    postParams['bid'] = app.gbData.userInfo.bid
    postParams['phone'] = app.gbData.userInfo.phone
    postParams['cardNum'] = params['cardNumber']
    postParams['bankName'] = params['bankName']
    postParams['resPhoneNum'] = params['bankPreMobile']
    postParams['city'] = params['city']
    app.HttpService.doBankCardInfo(postParams).then(data => {
      if (data.status == 1) {
        wx.showToast({
          title: data.msg,
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '../auth',
          })
        }, 1000)
      }else{
        wx.showModal({
          title: '友情提示',
          content: data.msg,
          showCancel:false
        })
      }
    })
  }

})