//index.js
//获取应用实例
const app = getApp()
const messageTop = 100;
var message = require("../../components/message/message.js");
var myLogin = require("../../utils/login.js")
var loadingBtn = require("../../components/loadingBtn/loadingBtn.js")
Page({
  data: {
    userInfo:null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowHeight: app.globalData.windowHeight,
    navH: app.globalData.navHeight,
    userName:"",
    password:"",
    showMessage:true,
    messageContain:"dsdds",
    showCModal:false,
    showBtnLoading:false,
    btnLoadingAnim:null
  },
  onLoad(){
    
  },
  inputUserName(e){
    this.data.userName = e.detail.value;
  },
  inputPassword(e){
    this.data.password = e.detail.value;
  },


  //登陆
  tapLogin(){
    if(this.data.userName===""){
      message.showMessage(this, "warning", "请输入用户名", messageTop);
      return;
    }
    if(this.data.password ===""){
      message.showMessage(this, "warning", "请输入密码", messageTop);
      return;
    }

    // 如果没有进行授权
    if(app.globalData.userInfo === null){
      this.setData({
        showCModal:true
      })
      return;
    }
    else{
      var that = this;
      console.log("获得用户信息成功");
      // loading
      loadingBtn.showBtnLoading(that);
      myLogin.mylogin(this,function(res){
        // hide loading
        loadingBtn.hideBtnLoading(that);
        console.log(res);
        // 如果成功登陆
        if(res.success){
          // 弹出消息提示
          message.showMessage(that, "success", "登陆成功", messageTop);
          app.globalData.user = res.data
          wx.navigateTo({
            url: '../user/user',
          })
        }
        else{
          message.showMessage(that, "error", "登陆失败：用户名或密码错误", messageTop);
        }
      });
    }
  },
  tapRegister(){
    wx.navigateTo({
      url: 'register/register',
    })
  },

  modalConfirm(){
    var that = this
    console.log("模态框确认");
    myLogin.getUserWxInfo(function(e){
      if(e){
        message.showMessage(that, "success","获取成功");
      }
    });
  },
})