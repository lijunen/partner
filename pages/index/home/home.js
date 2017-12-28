// pages/index/home/home.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    wallet: { balance: 0, cap: 0 },
    homeModel: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    let userInfo = wx.getStorageSync("userInfo")
    app.gbData.userInfo = userInfo
    this.indexAd()
    this.balance()
    this.homeModule()
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
   * 首页广告
   */
  indexAd: function () {
    app.HttpService.indexAd({}).then(data => {
      this.setData({
        imgUrls: data
      })
    })
  },
    /**
   * 用户余额
   */
  balance: function () {
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone
    }
    app.HttpService.balance(params).then(data => {
      if (data.status == 1) {
        let wallet = {
          balance: data.balance,
          cap: data.cap
        }
        this.setData({
          wallet: wallet
        })
      }
    })
  },
  /**
   * 首页模块
   */
  homeModule: function () {
    let that = this
    app.HttpService.homeModule({}).then(data => {
      let models = []
      if (data.status == 1) {
        data.moduleData.map(item => {
          if (item.id == 2) {
            item.url = '../auth/auth'
          }
          if (item.id == 3) {
            item.url = '../team/team'
          }
          if (item.id == 4) {
            item.url = '../share_qrcode/share_qrcode'
          }
          models.push(item)
        })
        that.setData({
          homeModel: models
        })
      }
    })
  }

})