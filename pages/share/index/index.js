var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
let app = getApp();
Page({
  data: {
    page:1,
    list:[],
    count_info:{
      totalBelongMan:0,
      totalBelongMoney:0,
      totalMan:0,
      totalMoney:0,
      totalUnderMan:0,
      totalUnderMoney:0
    }
  },
  onLoad: function () {
    app.EcsUtils.checkLoginStatus()
    this.getTeamList()
    this.countTeamList()
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      list: []
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    this.getTeamList()
  },
  getTeamList:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      level: 'under',
      page:this.data.page
    }
    let that = this
    app.HttpService.getTeamList(params).then(data=>{
      if(data.status == 1){
        data.data.map(item=>{
          that.data.list.push(item)
        })
        that.setData({
          list:that.data.list
        })
      }
    })
  },
  countTeamList:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      level: 'param'
    }
    let that = this
    app.HttpService.getTeamList(params).then(data=>{
      if(data.status == 1){
        that.setData({
          count_info:data.data
        })
      }
    })
  }
});