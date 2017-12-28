// pages/index/team/users/list.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_type:'under',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    this.getSubordinate(options.type)
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
  getSubordinate: function (level) {
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      level: level
    }
    let that = this
    app.HttpService.getSubordinate(params).then(data => {
      if (data.status == 1) {
          this.setData({
            list:data.data
          })

      }
    })
  }

})