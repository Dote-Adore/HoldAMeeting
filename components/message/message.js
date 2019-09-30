
function showMessage(that,type,messageContain,top){
  if (that.data.messageAnimation != null)
    return;
  var topPos = 30;
  if(top%1===0)
    topPos = top;
  that.setData({
    messageTop: topPos,
    messageContain: messageContain,
    showMessage:true,
    messageType:type
  })
    doAnimation(that);

  var timeDelay = setInterval(function(){
    that.setData({
      showMessage:false,
      messageAnimation:null
    })
    clearInterval(timeDelay)
  },1400)
}

function doAnimation(that){
  anim_IN(that);
  var timeDelay = setInterval(function(){
    anim_Show(that);
    clearInterval(timeDelay);
    var timeDelay_Out = setInterval(function(){
      anim_Out(that);
      clearInterval(timeDelay_Out)
    },1000)
  },
  200)
}

// 动画效果
function anim_IN(that){
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease',
    delay: 0,
  })
  animation.opacity(1).translateY(20).step({duration:200});
  that.setData({
    messageAnimation: animation.export()
  })
}

function anim_Show(that){
  var animation = wx.createAnimation({
    duration: 1000,
    timingFunction: 'ease',
    delay: 0,
  })
  that.setData({
    messageAnimation: animation.export()
  })
}

function anim_Out(that){
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease',
    delay: 0,
  })
  animation.opacity(0).translateY(0).step({duration:200});
  that.setData({
    messageAnimation: animation.export()
  })
}
module.exports = {
  showMessage: showMessage
}