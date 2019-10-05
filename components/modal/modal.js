// components/Modal.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value:"标题"
    },
    contain:{
      type:String,
      value:"这里填写内容"
    },
    showCModal:{
      type: Boolean,
      value:false
    },
    imageSrc:{
      type:String,
      value:""
    },
    containCenter:{
      type:Boolean,
      value:false
    }
  },

  // 周期函数
  lifetimes:{
    attached: function(){
      // this._showCModal();
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    navH: app.globalData.navHeight,
    bg_anim: null,
    modal_body_anim:null,
    showModal:false,
    containStyle:""
  },

// 当值改变时，调用
  observers: {
    'showCModal': function (showCModal) {
      var that = this
      if(showCModal===true){
        var time = setInterval(function(){
          that._showCModal()
          clearInterval(time);
        },200)
      }
    },
    'containCenter': function (containCenter) {
      var that = this
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      if (containCenter === true) {
        that.setData({
          containStyle:"text-align:center"
        })
      }
      else{
        that.setData({
          containStyle: ""
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapConfirm(){
      console.log("用户点击确认");
      this.triggerEvent("tapconfirm")
      this._hideModal();
    },
    tapCancel(){
      console.log("用户点击取消");
      this.triggerEvent("tapCancel")
      this._hideModal();
    },

    _showCModal() {
      var that = this
      this.setData({
        showModal: true
      })
      if (this.data.bg_anim != null)
        return;
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
        delay: 0,
      })
      animation.opacity(0.4).step({ duration: 200 });
      // animation.opacity(0.4).step();


      var animation2 = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
        delay: 0
      })
      animation2.scale(1,1).step({duration:3})
      animation2.scale(1.1, 1.1).step({ duration: 70 });
      animation2.scale(1, 1).step({ duration: 127 });

      this.setData({
        bg_anim: animation.export(),
        modal_body_anim:animation2.export()
      })

      var time = setInterval(function(){
        that.setData({
          bg_anim:null,
          modal_body_anim:null
        }),
        clearInterval(time);
      },200)
    },

    _hideModal(){
      var that = this;
      if (this.data.bg_anim !== null)
        return;
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
        delay: 0,
      })
      animation.opacity(0).step({ duration: 200 });
      // animation.opacity(0.4).step();


      var animation2 = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
        delay: 0
      })
      animation2.scale(1.1, 1.1).step({ duration: 70 });
      animation2.scale(1, 1).opacity(0).step({ duration: 100 });

      this.setData({
        bg_anim: animation.export(),
        modal_body_anim: animation2.export()
      })

      var time = setInterval(function () {
        that.setData({
          bg_anim: null,
          modal_body_anim: null,
          showModal: false, 
          showCModal: false
        }),
        clearInterval(time);
      }, 200)
    }
  }
})
