// pages/user/user.js
var utils = require("../../utils/util.js")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: app.globalData.user,
    meetingList:null,
    showCModal:false,
    meetingCode:"",
    QRImg:"",
    greetings:null,
    canNavgateTo:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var greetings = utils.greetings();
    this.setData({
      user: app.globalData.user,
      greetings:greetings
    })

  },
  onShow: function(){
    this.getList();
  },

  getList(){
    var that = this
    wx.request({
      url: app.globalData.url + '/meeting/getByOrganizer',
      data:{
        page:0,
        id:this.data.user.id
      },
      success: res=> {
        console.log(res);
        that.setData({
          meetingList:res.data.data
        })
      }
    })
  },

  bindAddMeeting(){
    wx.navigateTo({
      url: 'addMeeting/addMeeting',
    })
  },
  bindShowQRCode(e){
    this.data.canNavgateTo = false;
    var that = this
    var index = e.currentTarget.dataset.index;
    var item = that.data.meetingList[index]
    this.setData({
      showCModal:true,
      meetingCode: item.id,
      QRImg: app.globalData.url + "/qrcode/get?" + "data=%7B\"id\":\""+item.id+"\",\"Identifier\":\"NCUMeeting\"%7D"
    })
  },
  bindtoDetials(e){
    var that = this;
    if(this.data.canNavgateTo ===false){
      return;
    }
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'meetingDetails/meetingDetails',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: that.data.meetingList[index]
        })
      }
    })
  },
  cancelCModel(){
    this.data.canNavgateTo = true;
  }
})