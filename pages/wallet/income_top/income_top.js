// pages/wallet/income_top/income_top.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank:'暂无收益',
    income:'暂无收益',
    list:[],
    userInfo:{},
    inputParams: {},
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    let inputParams = wx.getStorageSync('inputParams')
    this.setData({
      userInfo:app.gbData.userInfo,
      inputParams:inputParams
    })
    this.incomeRanking()

    this.listIncomeRanking()
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
    this.setData({
      page:1,
      list:[]
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page:this.data.page + 1
    })
    this.listIncomeRanking()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 个人收入
   */
  incomeRanking:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      type:'Per'
    }
    let that = this
    app.HttpService.incomeRanking(params).then(data=>{
      if(data.status == 1){
        that.setData({
          rank:data.data[0].rank,
          income:data.data[0].money
        })
      }
    })
  },

  /**
   * 排行列表
   */
  listIncomeRanking: function () {
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      type: 'All',
      page:this.data.page
    }
    let that = this
    app.HttpService.incomeRanking(params).then(data => {
      if (data.status == 1) {
       data.data.map(item=>{
        that.data.list.push(item)
       })
       that.setData({
         list:that.data.list
       })
      }
    })
  }


})