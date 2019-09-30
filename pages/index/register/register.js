// pages/index/register/register.js
var message = require("../../../components/message/message.js");
var myLogin = require("../../../utils/login.js")
const app = getApp();
var loadingBtn = require("../../../components/loadingBtn/loadingBtn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    password:"",
    name:"",
    showCModal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  //输入绑定
  bindUserName(e){
    this.data.userName = e.detail.value
  },
  bindPassword(e) {
    this.data.password = e.detail.value
  },
  bindName(e)
  {
    this.data.name = e.detail.value
  },


  tapRegister(){
    var that = this
    if (this.data.userName === "") {
      message.showMessage(this,"warning" ,"请输入用户名");
      return;
    }
    if (this.data.name === "") {
      message.showMessage(this, "warning", "请输入姓名");
      return;
    }
    if (this.data.password === "") {
      message.showMessage(this, "warning", "请输入密码");
      return;
    }
    // 如果没有进行授权
    if (app.globalData.userInfo === null) {
      this.setData({
        showCModal: true
      })
      return;
    }
    else {
      console.log("获得用户信息成功");
      loadingBtn.showBtnLoading(this);
      wx.request({
        url: app.globalData.url+ '/register',
        method:"post",
        header:{
          "content-type":"application/x-www-form-urlencoded"
        },
        data:{
          username:that.data.userName,
          password:that.data.password,
          name:that.data.name
        },
        success:res=>{
          if(res.data){
            message.showMessage(that,"success","注册成功！")
            loadingBtn.hideBtnLoading(that);
            var time = setInterval(function(){
              wx.navigateBack({

              });
              clearInterval(time);
            },600)
          }
        }
      })
    }
  },
  modalConfirm() {
    var that = this
    console.log("模态框确认");
    myLogin.getUserWxInfo(function (e) {
      if (e) {
        message.showMessage(that, "success", "获取成功");
      }
    });
  }
})