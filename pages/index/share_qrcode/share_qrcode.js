// pages/index/share_qrcode/share_qrcode.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcoce:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    this.qrcode()
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
  onShareAppMessage: function (res) {
    return {
      title:'益点合伙人分享多多赚钱多多！'
    }

  },
  qrcode:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone
    }
    let that = this
    app.HttpService.qrcode(params).then(data=>{
      if(data.status == 1){
        that.setData({
          qrcode:data.imgUrl
        })
      }else{
        wx.showModal({
          title: '友情提示',
          content: '系统错误',
          showCancel:true
        })
      }
    })
   
  }
  

})