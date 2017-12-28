// pages/wallet/index/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNumber:0,
    balance:0,
    trade_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    this.numBankCards()
    this.balanceCashBack()
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
  /**
   * 银行卡数量
   */
  numBankCards:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
    }
    let that = this
    app.HttpService.numBankCards(params).then(data=>{
      if(data.status == 1){
        that.setData({
          cardNumber:data.con
        })
      }
    })
  },
  /**
   * 余额统计
   */
  balanceCashBack:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
    }
    let that = this
    app.HttpService.balanceCashBack(params).then(data=>{
      that.setData({
        balance:data.balance,
        trade_list:data.date
      })
    })
  }

})