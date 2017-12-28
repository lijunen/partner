// components/user_info/user_info.js
let app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
    inputParams: {}
  },
  attached:function(){
    let userInfo = wx.getStorageSync("userInfo");
    let inputParams = wx.getStorageSync('inputParams')
    this.setData({
      userInfo:userInfo,
      inputParams: inputParams
    })
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    agentInfo:function(){
      let params = {
        bid: app.gbData.userInfo.bid,
        phone: app.gbData.userInfo.phone,
        type:'ver'
      }
      app.HttpService.checkAccount(params).then(data=>{
        if(data.status == 1){
          let params = {
            bid: app.gbData.userInfo.bid,
            phone: app.gbData.userInfo.phone,
            type: 'acc'
          }
          app.HttpService.checkAccount(params).then(res=>{
            if(res.status == 1){
              wx.navigateTo({
                url: '/pages/index/agent_info/agent_info',
              })
            }else{
              wx.showModal({
                title: '友情提示',
                content: '请进行收款账号认证！',
                showCancel:false,
                success:function(){
                  wx.navigateTo({
                    url: '/pages/index/auth/card/card_commit',
                  })
                }
              })
            }
          })
        }else{
          wx.showModal({
            title: '友情提示',
            content: '您还没有实名认证,请进行实名认证！',
            showCancel:true
          })
        }
      })
    }
  }
})
