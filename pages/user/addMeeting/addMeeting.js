// pages/user/addMeeting/addMeeting.js
var util = require("../../../utils/util.js")
var message = require("../../../components/message/message.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingName:"",
    address:"",
    introduction:"",
    meetingTime:"请选择时间",
    meetingDate:"请选择日期",
    currentDate:"",
    currentTime:"",
    showCModal:false,
    options:[
      {
        name:"aName",
        value:true,
        title:"姓名",
      },
      {
        name: "aWorkUnit",
        value: false,
        title: "工作单位",
      },
      {
        name: "aIDNum",
        value: false,
        title: "身份证号",
      },
      {
        name: "aGender",
        value: false,
        title: "性别",
      },
      {
        name: "aPhoneNum",
        value: false,
        title: "电话号码",
      },
      {
        name: "aArrangeRoom",
        value: false,
        title: "是否需安排房间",
      }, {
        name: "aAttendTime",
        value: false,
        title: "参会时间",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var time = util.formatTime(new Date());
    console.log(time);
    var date = util.formatDate(new Date());
    this.setData({
      // meetingTime:time,
      // meetingDate:date,
      currentDate:date,
      currentTime:time
    })
  },

  // 选择时间日期
  chooseTime(e){
    this.setData({
      meetingTime: e.detail.value
    })
  },
  chooseDate(e){
    this.setData({
      meetingDate: e.detail.value
    })
  },


  // 选择与会者需要填写的信息
  toSelected(e){
    var index = e.currentTarget.dataset.idx
    this.data.options[index].value = !this.data.options[index].value
    this.setData({
      options: this.data.options
    }) 
  },

  // 确定提交按钮
  bindConfirmBtn(){
    var data = this.data
    if(data.meetingName===""){
      message.showMessage(this,"warning", "请填写会议名称");
      return;
    }
    if (data.address === "") {
      message.showMessage(this, "warning", "请填写地址");
      return;
    }
    if (data.meetingTime === "请选择时间" || data.meetingDate ==="请选择日期"){
      message.showMessage(this, "warning", "请选择开会时间");
      return;
    }
    let i;
    for(i = 0;i<data.options.length;i++){
      if(data.options[i].value){
        break;
      }

    }
    if(i===7){
      message.showMessage(this, "warning", "请至少选中一种信息");
      return;
    }




    this.setData({
      showCModal:true
    })

  },


  //输入
  inputName(e){
    this.data.meetingName = e.detail.value;
  },
  inputAddress(e){
    this.data.address = e.detail.value;
  },
  inputIntroduction(e){
    this.data.introduction = e.detail.value;
  },
  postForm(){
    
  }
})