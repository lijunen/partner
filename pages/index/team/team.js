// pages/index/team/team.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    under_total:0,  //直属团队,
    Belong_total:0  //间接团队

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    this.getSubordinate('under')
    this.getSubordinate('Belong')
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
  getSubordinate:function(level){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      level:level
    }
    let that = this
    app.HttpService.getSubordinate(params).then(data=>{
      if(data.status == 1){
        let field = level+'_total'
        if(level == 'under'){
          that.setData({
            under_total: data.data.length
          })
        }
        if(level == 'Belong'){
          that.setData({
            Belong_total: data.data.length
          })
        }
        
      }
    })
  },
  listTeam:function(e){
    let team_type = e.currentTarget.dataset.type
    console.log(team_type)
    wx.navigateTo({
      url: './users/list?type='+team_type,
    })
  }

})