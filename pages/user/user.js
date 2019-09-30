// pages/user/user.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: app.globalData.user,
    meetingList:[
      {
        id:"453393033",
        name: "关于食品安全的会议",
        address:"主教三楼314",
        attendeeNum:30,
        meetingTime:"7月13日，下午15点40"
      },
      {
        id:"444739498",
        name: "关于网络安全的会议",
        address: "主教三楼3222",
        attendeeNum: 108,
        meetingTime: "7月8日，下午15点40"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.user
    })
  },
  bindAddMeeting(){
    wx.navigateTo({
      url: 'addMeeting/addMeeting',
    })
  }
})