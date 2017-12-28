//login.js
//获取应用实例
var app = getApp()
Page({
  data: {
    buttonText: '确定',
    loading: false,
    disabled: false,
    oldPassword:'',
    password:''
  },
  onLoad: function (options) {
    app.EcsUtils.checkLoginStatus()
    this.WxValidate = app.WxValidate({
      old_password: {
        required: true,
      },
      password: {
        required: true,
        equalTo:'reply_password'
      },

    }, {
        old_password: {
          required: '请输入旧密码',
        },
        password: {
          required: '请输入新密码',
          equalTo:'两次密码不一致'
        },

      })
  },

  formSubmit: function (e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showModal({
        title: '友情提示',
        content: `${error.msg}`,
        showCancel: false
      })
      return false
    }
    this.setData({
      disabled: true,
      loading: true
    })
    this.modifyPassword(params)

  },


  bindInput: function (e) {
    try {
      let field = e.currentTarget.dataset.field
      let value = e.detail.value
      this.setData({
        [field]:value
      })
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * 修改密码
   */
  modifyPassword: function () {
    let params = {
      bid: app.gbData.userInfo.bid,
      phone: app.gbData.userInfo.phone,
      pwd:this.data.oldPassword
    }
    let that = this
    app.HttpService.checkOldPwd(params).then(data => {
      this.setData({
        buttonText: '确定',
        loading: false,
        disabled: false
      })
      if(data.status == 1){
        let params = {
          bid: app.gbData.userInfo.bid,
          phone: app.gbData.userInfo.phone,
          newPwd: that.data.password
        }
        app.HttpService.changePwd(params).then(res=>{
          that.setData({
            buttonText: '确定',
            loading: false,
            disabled: false
          })
          if (res.status == 1) {
            wx.showToast({
              title: '密码修改成功',
            })
            setTimeout(() => {
              wx.removeStorageSync('userInfo')
              wx.redirectTo({
                url: '../../index/login/login',
              })
            }, 1000)
          } else {
            wx.showModal({
              title: '友情提示',
              content: data.msg,
              showCancel: false
            })
          }
        })
      }else{
        wx.showModal({
          title: '友情提示',
          content: data.msg,
          showCancel: false
        })
      }
      })
      .catch(err => {
        console.log('err:' + err)
      })
  },

  

})
