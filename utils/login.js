
function getUserWxInfo(func) {
  const app = getApp();  // 获取用户信息


  //function getUserInfo(e) {
  var that = this;
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            console.log(res.userInfo);
            app.globalData.userInfo = res.userInfo
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.userInfoReadyCallback)
              that.userInfoReadyCallback(res)
          },
        })
      }
      else {//没有授权,引导授权
        console.log("获取用户信息失败")
      }
      typeof func == "function" && func(res.authSetting['scope.userInfo'])
    }
  });
}

// 授权认证
function authorization() {
  wx.showModal({
    title: '提示',
    content: '您尚未对小程序进行授权，请点击去认定跳转到授权页面进行授权',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        wx.navigateTo({
          url: '/pages/common/authorization/authorization',
        })
      }
    }
  })
}

//登陆
function mylogin(currentPage, func) {
  const app = getApp()
  wx.login({
    success: res => {
      wx.request({
        url: app.globalData.url + '/login',
        method: "post", 
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          "userName": currentPage.data.userName,
          "password": currentPage.data.password,
          "code": res.code,
        },
        success: res => {
          typeof func == "function" && func(res.data)
        }
      })
    }
  })
}


// 注册
function registerAccount() {
  var userinfo = app.globalData.userInfo;
  wx.request({
    url: app.globalData.url + '/register',
    method:"post",
    data: {
      nickName: userinfo.nickName,
      avatar: userinfo.avatarUrl,
      openid: app.globalData.openid
    }, success: res => {
      console.log(res);
    }
  })
}
module.exports = {
  getUserWxInfo: getUserWxInfo,
  authorization: authorization,
  mylogin:mylogin
}