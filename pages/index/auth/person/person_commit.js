// pages/index/auth/person/person_commit.js
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
    app.EcsUtils.checkLoginStatus()
    this.WxValidate = app.WxValidate({
      realName: {
        required: true,
        maxlength: 20,
      },
      idCard: {
        required: true,
        maxlength: 18,
        idcard:true
      },

    }, {
        realName: {
          required: '请输入真实姓名',
          maxlength: '真实姓名长度太长'
        },
        idCard: {
          required: '请输入身份证号码',
          maxlength: '身份证号码长度太长',
          idcard:'身份证号码格式不正确'
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
      let field = e.currentTarget.dataset.field
      let value = e.detail.value
      inputParams[field] = value  
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
    this.saveAccountInfo(params)

  },
  saveAccountInfo: function (params) {
    params['bid'] = app.gbData.userInfo.bid
    params['phone'] = app.gbData.userInfo.phone
    
    app.HttpService.accountVerified(params).then(data => {
        this.setData({
          buttonText: '确定',
          loading: false,
          disabled: false
        })
        if (data.status == 1) {
          wx.showToast({
            title: data.msg,
          })
          setTimeout(()=>{
            wx.redirectTo({
              url: '../auth',
            })
          },1000)
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