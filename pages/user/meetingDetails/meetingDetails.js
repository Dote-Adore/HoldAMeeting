// pages/user/meetingDetails/meetingDetails.js
const app = getApp()
var message = require("../../../components/message/message.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingInfo: {
      address: "地点第十",
      createTime: 1569929204000,
      id: "100454205383",
      introduction: "好的我的好兄弟",
      meetTime: 1602108180000,
      meetTimeFormat: "10月08日  06:03",
      name: "哈哈哈哈啊哈哈黑恶hi",
      organizerID: 1,
      organizerName: "宠与崇"
    },
    statistics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data);
      that.setData({
        meetingInfo: data.data
      })
    })
    this.getStatics();
  },
  getStatics(){
    var that = this
    wx.request({
      url: app.globalData.url + '/attendee/statisticsbymeeting',
      data:{
        meetingID:that.data.meetingInfo.id
      },
      success:res=>{
        console.log(res.data);
        if(res.data.success === true){
          that.setData({
            statistics:res.data.data
          })
        }

      }
    })
  },
  downloadExcel(){
    wx.showLoading({
      title: '正在下载...',
    })
    var meetingInfo = this.data.meetingInfo
    wx.downloadFile({
      url: app.globalData.url + "/meeting/exportExc?meetingID=" + meetingInfo.id,
      filePath:wx.env.USER_DATA_PATH+"/dowloadExcel.xls",
      success:res=>{
        message.showMessage(this, "success", "下载成功！");
        wx.hideLoading();
        const filePath = res.filePath;
        wx.openDocument({
          filePath: filePath,
          success:res=>{
            console.log("打开成功");
          }
        })
      }
    })
  }
})