// pages/joinMeeting/joinMeeting.js
var message = require("../../components/message/message.js");
var utils = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCModal: false,
    modalTitle: "",
    modalContain: "",
    meetingDetails: null,
    nickName: null,
    meetingList:null,
    canAttend:true,
    greetings:null,
    inputID:false,
    meetingID:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var greetings = utils.greetings();
    this.setData({
      nickName: app.globalData.userInfo.nickName,
      greetings:greetings
    }),
      this.getOpenId()
      this.getCopy();
  },
  onShow: function(){
    if(app.globalData.openID!=null){
      this.getList();
    }
  },
  bindScanQRCode() {
    var that = this
    wx.scanCode({

      success(res) {
        console.log(res.result)
        try {
          var resJson = JSON.parse(res.result);
          console.log(resJson)
          if (resJson.Identifier === "NCUMeeting") {
            that.showMeetingDetails(resJson.id);
          } else {
            message.showMessage(that, "error", "错误：解析失败，该二维码无效");
            return;
          }
        } catch (e) {
          message.showMessage(that, "error", "错误：解析失败，该二维码无效");
          return;
        }
      }
    })
  },
  // 查看扫描的会议的details
  showMeetingDetails(id) {
    wx.showLoading({
      title: '请稍后...',
    })
    var that = this
    wx.request({
      url: app.globalData.url + '/meeting/getbyid',
      data: {
        id: id
      },
      success: res => {
        wx.hideLoading()
        if(res.data.success===false){
          message.showMessage(that,"error",res.data.message);
          return;
        }
        var data = res.data.data
        that.data.meetingDetails = data
        var currentTime = Date.parse(new Date())
        // 现在的时间大于会议的时间,则不允许加入会议
        console.log(res.data.data);
        if (currentTime > res.data.data.meetTime){
          that.canNotAttend(res.data.data);
          return
        }
        var contain = "会议名称：" + data.name + "\n地址：" + data.address + "\n时间：" + data.meetTimeFormat + "\n发起人：" + data.organizerName + "\n是否加入？";
        if (res.data.success) {
          that.setData({
            showCModal: true,
            modalTitle: "扫描成功！",
            modalContain: contain,
            canAttend:true,
            inputID: false
          })
        }
      },
      complete: res => {}
    })
  },
  modalConfirm() {
    // 如果当前弹出的是inputid模态框
    if(this.data.inputID === true){
      if(this.data.meetingID ===""){
        message.showMessage(this,"warning","请输入ID");
        return;
      }
      this.showMeetingDetails(this.data.meetingID);
      return;
    }
    if(this.data.canAttend===false)
    return;
    var that = this
    wx.navigateTo({
      url: 'fillTable/fillTable',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: that.data.meetingDetails
        })
      }
    })
  },
  getList() {
    var that = this
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.url + '/attendee/get',
          data: {
            "openID": app.globalData.openID
          },
          success: res => {
            console.log(res.data.data)
            that.setData({
              meetingList:res.data.data
            })
          }
        })
      }
    })
  },
  getOpenId(){
    if(app.globalData.openID!=null)
    return
    var that = this
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.url + '/login/getopenid',
          data: {
            "code": res.code
          },
          success: res => {
            console.log(res.data)
            if(res.data.success ===true){
              app.globalData.openID = res.data.data.openId
              that.getList()
            }
          }
        })
      }
    })
  },
  // 不能加入会议
  canNotAttend(data){
    var contain = "抱歉，该会议在" + data.meetTimeFormat+"已经开展，超过加入时间，因此无法加入。"
    this.setData({
      showCModal:true,
      canAttend:false,
      modalTitle: "当前会议无法加入！",
      modalContain:contain,
      inputID:false
    })
  },

  // 输入id
  bindInputID(){
    this.setData({
      showCModal:true,
      modalTitle:"输入会议ID",
      modalContain:"",
      inputID:true
    })
  },
  inputID(e){
    this.data.meetingID = e.detail.value
  },

// 获取剪贴板的内容
  getCopy(){
    var that = this;
    wx.getClipboardData({
      success:res=>{
        console.log(res.data);
        var copyData = res.data;
        var data2 = copyData.substring(36,51);
        console.log(data2)
        if(data2.substring(0,3) === "id="){
          that.showMeetingDetails(data2.substring(3));
          wx.setClipboardData({
            data: ' ',
            success:res=>{
              wx.hideToast();
            }
          })
        }
      }
    })
  }
})