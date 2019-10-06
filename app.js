//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that =this

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo);
              that.globalData.userInfo = res.userInfo
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
      }
    })

    
    // 获取屏幕的高度和宽度
    try {
      var n = wx.getSystemInfoSync();
      this.globalData.windowHeight = n.windowHeight, this.globalData.windowWidth = n.windowWidth,
      this.globalData.navHeight = n.statusBarHeight + 46, console.log(n);
      
    } catch (t) { }

  },
  globalData: {
    windowHeight: null,
    windowWidth: null,
    navHeight: null,
    userInfo: null,
    url1: "https://www.ncutradingplatform.top/holdmeeting",
    url: "http://192.168.1.108:8080/MidTermWork_war_exploded",
    user:null,
    openID:null
  }
})