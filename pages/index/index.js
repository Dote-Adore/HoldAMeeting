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
    btnLoadingAnim:null,
    autoLogin:false,
    canShowCopy:false,
  },
  onLoad(){
    var that = this
    myLogin.getUserWxInfo(function (res) {
      // 如果授权登录成功，执行自动登录
      if(res){
        wx.showLoading({
          title: '请稍后...',
        })
        myLogin.autoLogin(function(res){
          wx.hideLoading();
          // 如果成功，则自动登录
          if(res.success){
            app.globalData.user = res.data
            wx.navigateTo({
              url: '../user/user',
            })
          }
          else{
            // 自动登录失败
            that.data.canShowCopy = true;
            that.getCopy();

          }
        });
      }
      else{
        that.data.canShowCopy = true;
        this.getCopy();
      }
    })
  },
  onShow(){
    if(this.data.canShowCopy === true){
      this.getCopy();
    }
  },
  //输入
  inputUserName(e){
    this.data.userName = e.detail.value;
  },
  inputPassword(e){
    this.data.password = e.detail.value;
  },

  // 自动登录按钮
  bindAutoLogin() {
    var that = this;
    this.setData({
      autoLogin: !that.data.autoLogin
    })
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


// 点击加入会议的按钮
  bindJoinMeeting(){
    // 如果没有进行授权
    if(app.globalData.userInfo===null){

      this.setData({
        showCModal:true
      })
      return;
    }
    else{
      wx.navigateTo({
        url:'../joinMeeting/joinMeeting',
      })
    }
  },

  getCopy() {
    var that = this;
    wx.getClipboardData({
      success: res => {
        console.log(res.data);
        var copyData = res.data;
        var data2 = copyData.substring(36, 51);
        console.log(data2)
        if (data2.substring(0, 3) === "id=") {
          wx.showModal({
            title: '检测到开口令',
            content: '是否加入？',
            success: res => {
              if (res.confirm) {
                that.bindJoinMeeting();
              }
              else{
                wx.setClipboardData({
                  data: ' ',
                  success:res=>{
                    wx.hideToast()
                  }
                })
              }
            }
          })
        }
      }
    })
  }
  
})