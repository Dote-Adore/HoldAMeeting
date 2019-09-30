function showBtnLoading(that) {
  var animation = wx.createAnimation({
    duration: 300,
    timingFunction: "ease",
    delay: 0,
  })
  animation.width(0).height(0)
  animation.width(20).height(20).step({ duration: 200 });
  that.setData({
    btnLoadingAnim: animation.export()
  })
}
// 隐藏按钮的loading
function hideBtnLoading(that){
  var animation = wx.createAnimation({
    duration: 300,
    timingFunction: "ease",
    delay: 0,
  })
  animation.width(20).height(20)
  animation.width(0).height(0).step({ duration: 200 });
  that.setData({
    btnLoadingAnim: animation.export()
  })
}

module.exports = {
  showBtnLoading: showBtnLoading,
  hideBtnLoading: hideBtnLoading
}