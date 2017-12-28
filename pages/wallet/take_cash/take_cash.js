// pages/wallet/take_cash/take_cash.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balanceList:[],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    buttonText: '确定提现',
    loading: false,
    disabled: false,
    realName:'',
    bankCardNo:'',
    bankId:'',
    money:'',
    payType:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    this.canRaiseAmount()
    this.getBalance()
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
   * 获取银行卡信息
   */
  canRaiseAmount:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
    }
    let that = this
    app.HttpService.canRaiseAmount(params).then(data=>{
      if(data.status == 1){
        that.setData({
          realName: data.data.name,
          bankId:data.data.id,
          bankCardNo: data.data.bankCard
        })
      }

    })
  },
  /**
     * 获取余额数据
     */
  getBalance: function () {
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
    }
    let that = this
    app.HttpService.getBalance(params).then(data=>{
      if(data.status == 1){
        data.data.map((item,index)=>{
          if(index == 0){
            that.setData({
              payType: item.payType
            })
          }
        })
        that.setData({
          balanceList:data.data
        })
      }
    })
  },
  /**
   * 更改提现
   */
  changeCashType:function(e){
    let current = e.detail.current
    this.data.balanceList.map((item,index)=>{
      if(current == index){
        this.setData({
          payType:item.payType
        })
      }
    })
  },

  /**
   * 提现
   */
  receiveFlowWallet:function(){
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      money:this.data.money,
      bankId:this.data.bankId,
      type:this.data.payType
    }
    let that = this
    app.HttpService.receiveFlowWallet(params).then(data=>{
      if(data.status){
        wx.showToast({
          title: data.msg,
        })
        setTimeout(()=>{
          that.setData({
            money:''
          })
          that.getBalance()
        },1000)
      }else{
        wx.showModal({
          title: '友情提示',
          content: data.msg,
          showCancel:false
        })
      }
    })
  },
  bindInput:function(e){
    this.setData({
      money:e.detail.value
    })
  },
  formSubmit:function(e){
    if(this.data.money == 0|| this.data.money == ''){
      wx.showModal({
        title: '友情提示',
        content: '请输入提现金额',
        showCancel:false
      })
      return false
    }
    var m = /^[1-9]\d{3}$/;
    if(!m.test(this.data.money)){
      wx.showModal({
        title: '友情提示',
        content: '请输入4位以上的数字',
        showCancel:false
      })
      return false;
    }
    this.receiveFlowWallet()
  }

})