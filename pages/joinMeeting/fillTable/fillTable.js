// pages/joinMeeting/fillTable/fillTable.js
var message = require("../../../components/message/message.js");
const app = getApp();
var loadingBtn = require("../../../components/loadingBtn/loadingBtn.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingDetails: {
      address: "主教楼",
      createTime: 1569928543000,
      id: "101275740402",
      introduction: "我在马路边捡到一分钱",
      meetTime: 1570136580000,
      meetTimeFormat: "明日 05:03",
      name: "测试测试",
      options: {
        aArrangeRoom: true,
        aAttendTime: true,
        aGender: true,
        aIDNum: true,
        aName: true,
        aPhoneNum: true,
        aWorkUnit: true,
      },
      organizerID: 1,
      organizerName: "宠与崇",
    },
    gender: [
      { name: 'male', value: '男' },
      { name: 'female', value: '女'}
    ],
    roomArrange:[
      { name: 'true', value: '是' },
      { name: 'false', value: '否' }
    ],

    // 输入
    aArrangeRoom: -1,
    aAttendTime: null,
    aGender: -1,
    aIDNum: null,
    aName: null,
    aPhoneNum: null,
    aWorkUnit: null,

    meetingDate:"请选择日期",
    meetingTime:"请选择时间"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      that.setData({
        meetingDetails: data.data
      })
    })
  },
  genderChange(e){
    if (e.detail.value === "male"){
      this.data.aGender = 1
    }
    else{
      this.data.aGender = 0
    }
  },
  roomChange(e){
    if(e.detail.value ==="true"){
      this.data.aArrangeRoom = 1
    }
    else{
      this.data.aArrangeRoom = 0;
    }
  },
  // aArrangeRoom: null,
  // aAttendTime: null,
  // aGender: null,
  // : null,
  // : null,
  // : null,
  // : null,
  // 表单输入
  inputForm(e){
    var data = this.data
    var type = e.currentTarget.dataset.type;
    var value = e.detail.value
    switch(type){
      case "aPhoneNum":
      data.aPhoneNum = value;
      console.log(data.aPhoneNum);
      break;
      case "aWorkUnit":
      data.aWorkUnit = value;
        console.log(data.aWorkUnit);

      break;
      case "aIDNum":
        data.aIDNum = value;
        console.log(data.aIDNum);

        break;
      case "aName":
        data.aName = value;
        console.log(data.aName)
        break;
    }
  },
  // 时间选择
  chooseTime(e) {
    this.setData({
      meetingTime: e.detail.value
    })
  },
  chooseDate(e) {
    this.setData({
      meetingDate: e.detail.value
    })
  },
  bindConfirmBtn(){
    var options = this.data.meetingDetails.options;
    var data = this.data;
    if (options.aName === true && (data.aName === null || data.aName==="")){
      message.showMessage(this,"warning","请输入姓名");
      return
    }
    if (options.aPhoneNum === true && (data.aPhoneNum === null || data.aPhoneNum === "")) {
      message.showMessage(this, "warning", "请输入电话");
      return
    }
    if (options.aGender === true && data.aGender === -1) {
      message.showMessage(this, "warning", "请选择性别");
      return
    }
    if (options.aIDNum === true && (data.aIDNum === null || data.aIDNum === "")) {
      message.showMessage(this, "warning", "请输入身份证号");
      return
    }
    if (options.aWorkUnit === true && (data.aWorkUnit === null || data.aWorkUnit === "")) {
      message.showMessage(this, "warning", "请输入工作单位");
      return
    }
    if (options.aArrangeRoom === true && data.aArrangeRoom === -1) {
      message.showMessage(this, "warning", "请选择是否需要安排房间");
      return
    }
    if (options.aAttendTime === true && data.meetingDate === "请选择日期") {
      message.showMessage(this, "warning", "请选择与会日期");
      return
    }
    if (options.aAttendTime === true && data.meetingTime === "请选择时间") {
      message.showMessage(this, "warning", "请选择与会时间");
      return
    }
    this.postForm()
  },
  postForm(){
    var that = this
    loadingBtn.showBtnLoading(this);
    if (this.data.meetingDetails.options.aAttendTime ===true){
      this.data.aAttendTime = this.data.meetingDate + " " + this.data.meetingTime + ":00";
      this.data.aAttendTime = Date.parse(this.data.aAttendTime.replace(/-/g, '/'));
    }
    var data = this.data
    wx.request({
      url: app.globalData.url +'/attendee/attend',
      method:"POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        meetingID:data.meetingDetails.id,
        openID:app.globalData.openID,
        aArrangeRoom: data.aArrangeRoom,
        aAttendTime: data.aAttendTime,
        aGender: data.aGender,
        aIDNum: data.aIDNum,
        aName: data.aName,
        aPhoneNum: data.aPhoneNum,
        aWorkUnit: data.aWorkUnit,
      },
      success:res=>{
        loadingBtn.hideBtnLoading(that);
        if(res.data.success === true)
         message.showMessage(that,"success","加入成功！");
         var time = setInterval(function(){
           wx.navigateBack({
           })
           clearInterval(time);
         },500)
      }
    })
  }
})