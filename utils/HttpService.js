import ServiceBase from 'ServiceBase'

class Service extends ServiceBase {
  constructor() {
    super()
    this.path = {
      getMoreInfo: 'App/Other/getMore',
      helpCenter: 'App/Other/helpCenter',
      helpDetail: 'App/Other/helpDetail',
      login:'App/Login/login',
      userInfo:"App/BusinessInfor/busInfo",
      indexAd:'App/Test/ad',
      balance:'App/Balance/balance',
      homeModule:'App/ModuleApi/HomeModule',
      qrcode:'App/Qrcode/index',
      getSubordinate:'App/TeamManage/getSubordinate',
      checkAccountTwo:'App/BusinessInfor/checkAccountTwo',
      accountInfor:'App/BusinessInfor/accountInfor',
      accountVerified:'App/BusinessInfor/Verified',
      checkCards:'App/CheckBankCark/checkCards',
      verifyBankCardInfo:'App/CheckBankCark/VerifyBankCardInfo',
      doBankCardInfo:'App/BusinessInfor/doBankCardInfo',
      checkAccount:'App/BusinessInfor/checkAccount',
      bankList:'App/BusinessInfor/bankList',
      incomeRanking:'App/Balance/IncomeRanking',
      numBankCards:'App/BusinessInfor/numBankCards',
      balanceCashBack:'App/Balance/balanceCashBack',
      walleDetail:'App/Balance/walleDetail',
      getTeamList:'App/Recommend/getTeamList',
      getSystemMessageList:'App/Message/getSystemMessageList',
      getSystemMessageDetail:'App/Message/getSystemMessageDetail',
      checkOldPwd:'App/BusinessInfor/checkOldPwd',
      changePwd:'App/BusinessInfor/changePwd',
      canRaiseAmount:'App/Balance/canRaiseAmount',
      getBalance:'App/Balance/getBalance',
      receiveFlowWallet:'App/Drawcash/receiveFlowWallet'

    }
  }

  
  /**
   * 获取基础信息
   */
  getMoreInfo(params) {
    return this.sendRequest({
      url: this.path.getMoreInfo,
      data: params
    })
  }

  /**
   * 登录
   */
  login(params){
    return this.sendRequest({
      url: this.path.login,
      data: params
    })
  }

  /**
   * 获取用户信息
   */
  userInfo(params){
    return this.sendRequest({
      url: this.path.userInfo,
      data: params
    })
  }

  /**
   * 首页广告图
   */
  indexAd(params){
    return this.sendRequest({
      url: this.path.indexAd,
      data: params
    })
  }
  
  /**
   * 用户余额
   */
  balance(params){
    return this.sendRequest({
      url: this.path.balance,
      data: params
    })
  }

  /**
   * 首页模块
   */
  homeModule(params){
    return this.sendRequest({
      url: this.path.homeModule,
      data: params
    })
  }

  /**
   * 推广二维码
   */
  qrcode(params){
    return this.sendRequest({
      url: this.path.qrcode,
      data: params
    })
  }

  /**
   * 我的团队
   */
  getSubordinate(params){
    return this.sendRequest({
      url: this.path.getSubordinate,
      data: params
    })
  }
  /**
   * 验证认证信息
   */
  checkAccountTwo(params){
    return this.sendRequest({
      url: this.path.checkAccountTwo,
      data: params
    })
  }
  /**
   * 商户信息
   */
  accountInfor(params){
    return this.sendRequest({
      url: this.path.accountInfor,
      data: params
    })
  }

  /**
   * 个人信息认证
   */
  accountVerified(params){
    return this.sendRequest({
      url: this.path.accountVerified,
      data: params
    })
  }
  /**
   * 根据卡号获取银行
   */
  checkCards(params){
    return this.sendRequest({
      url: this.path.checkCards,
      data: params
    })
  }
  /**
   * 银行卡认证
   */
  verifyBankCardInfo(params){
    return this.sendRequest({
      url: this.path.verifyBankCardInfo,
      data: params
    })
  }
  /**
   * 更新用户卡信息
   */
  doBankCardInfo(params){
    return this.sendRequest({
      url: this.path.doBankCardInfo,
      data: params
    })
  }

  /**
   * 验证用户信息
   */
  checkAccount(params){
    return this.sendRequest({
      url: this.path.checkAccount,
      data: params
    })
  }

  /**
   * 收入统计
   */
  incomeRanking(params,isLoading = true){
    return this.sendRequest({
      url: this.path.incomeRanking,
      data: params,
      showLoading:isLoading
    })
  }

  
  /**
   * 银行卡数量
   */
  numBankCards(params){
    return this.sendRequest({
      url: this.path.numBankCards,
      data: params
    })
  }

  /**
   * 余额统计
   */
  balanceCashBack(params){
    return this.sendRequest({
      url: this.path.balanceCashBack,
      data: params
    })
  }

  /**
   * 钱包明细
   */
  walleDetail(params){
    return this.sendRequest({
      url: this.path.walleDetail,
      data: params
    })
  }
  /**
   * 银行卡列表
   */
  bankList(params){
    return this.sendRequest({
      url: this.path.bankList,
      data: params
    })
  }

  /**
   * 好友
   */
  getTeamList(params,isLoading = true){
    return this.sendRequest({
      url: this.path.getTeamList,
      data: params,
      showLoading: isLoading
    })
  }
  /**
   * 帮助中心
   */
  helpCenter(params) {
    return this.sendRequest({
      url: this.path.helpCenter,
      data: params
    })
  }
  /**
   * 帮助明细
   */
  helpDetail(params) {
    return this.sendRequest({
      url: this.path.helpDetail,
      data: params
    })
  }
  /**
   * 消息列表
   */
  getSystemMessageList(params) {
    return this.sendRequest({
      url: this.path.getSystemMessageList,
      data: params
    })
  }

  /**
   * 消息详情
   */
  getSystemMessageDetail(params) {
    return this.sendRequest({
      url: this.path.getSystemMessageDetail,
      data: params
    })
  }
  /**
   * 修改密码
   */
  changePwd(params) {
    return this.sendRequest({
      url: this.path.changePwd,
      data: params
    })
  }
  /**
   * 验证旧密码
   */
  checkOldPwd(params) {
    return this.sendRequest({
      url: this.path.checkOldPwd,
      data: params
    })
  }

  /**
   * 银行卡信息
   */
  canRaiseAmount(params) {
    return this.sendRequest({
      url: this.path.canRaiseAmount,
      data: params
    })
  }

  /**
   * 获取余额数据
   */
  getBalance(params) {
    return this.sendRequest({
      url: this.path.getBalance,
      data: params
    })
  }
  
  /**
   * 提现
   */
  receiveFlowWallet(params) {
    return this.sendRequest({
      url: this.path.receiveFlowWallet,
      data: params
    })
  }
 
  
  
  

 


}



export default Service