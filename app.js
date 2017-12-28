//app.js
import WxValidate from 'utils/WxValidate'
import HttpService from 'utils/HttpService'
import Tools from 'utils/Tools'
import Config from 'etc/config'
import EcsUtils from 'utils/EcsUtils'
App({
  onLaunch: function () {

  },
  gbData: {
    userInfo: null
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  HttpService: new HttpService,
  Tools: new Tools,
  EcsUtils: new EcsUtils
})
