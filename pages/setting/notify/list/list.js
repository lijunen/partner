// pages/setting/notify/list/list.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1
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
    this.getSystemMessageList()
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
    this.setData({
      page:1,
      list:[],
      has_more_data: true
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page:this.data.page+1
    })
    this.getSystemMessageList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  detail:function(e){
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  },
  getSystemMessageList:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      page: this.data.page
    }
    let that = this
    let isShowLoading = true
    if (this.data.page > 1) {
      isShowLoading = false
    }
    app.HttpService.getSystemMessageList(params, isShowLoading).then(data=>{
      if(data.status == 1){
        data.data.map(item=>{
          that.data.list.push(item)
        })
        that.setData({
          list:that.data.list
        })

      }else{
        that.setData({
          has_more_data: false
        })
      }
    })
  }
})