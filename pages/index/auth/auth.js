// pages/index/auth/auth.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_check:{
      is_auth:false,
      url:''
    },
    card_check:{
      is_auth:false,
      url:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
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
    this.checkAccount()
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

  checkAccount:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone
    }
    app.HttpService.checkAccountTwo(params).then(data=>{
      if(data.status == 2){
        this.setData({
          info_check:{
            is_auth:true,
            url:'./person/person_info'
          },
          card_check:{
            is_auth:true,
            url:'./card/card_info'
          }
        })
      }

      if (data.status == 1) {
        this.setData({
          info_check: {
            is_auth: true,
            url: './person/person_info'
          },
          card_check: {
            is_auth: false,
            url: './card/card_commit'
          }
        })
      }
      if (data.status == 0) {
        this.setData({
          info_check: {
            is_auth: false,
            url: './person/person_commit'
          },
          card_check: {
            is_auth: false,
            url: './card/card_commit'
          }
        })
      }
    })

  },
  jumpUrl:function(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  }
})