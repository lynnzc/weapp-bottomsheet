//index.js
var app = getApp()
var bottomSheetUtils = require("../../utils/BottomSheetUtils.js")
Page({
  data: {
    userInfo: {},
    systemInfo: {},
    isScrollable: true,
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    wx.getSystemInfo({
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          systemInfo: res,
        })
      }
    })
  },

  // 点击打开 BottomSheet 
  onCommenClickHandler: function () {
    // rpx 需要转换为 px, animation translate 以 px 为单位 
    const rpxToPxRatio = this.data.systemInfo.windowWidth / 750
    bottomSheetUtils.show(this, 500 * rpxToPxRatio)
    // 禁止滚动
    this.setData({
      isScrollable: false,
    })
  },

  // 点击打开 Scrollable BottomSheet 
  onScrollableClickHandler: function () {
    // rpx 需要转换为 px, animation translate 以 px 为单位 
    const rpxToPxRatio = this.data.systemInfo.windowWidth / 750
    bottomSheetUtils.show(this, 500 * rpxToPxRatio)
    // 打开滚动
    this.setData({
      isScrollable: true,
    })
  },

  // 开始滚动
  onScrollStart: function (event) {
    // console.log(event)
    if (!this.data.isScrollable) {
      return
    }
    bottomSheetUtils.onScrollStart(this, event)
  },

  // 滚动过程
  onScrollMove: function (event) {
    // console.log(event)
    if (!this.data.isScrollable) {
      return
    }
    bottomSheetUtils.onScrollMove(this, event)
  },

  // 滚动取消
  onScrollCancel: function (event) {
    // console.log(event)
  },

  // 滚动结束
  onScrollEnd: function (event) {
    // console.log(event)
    if (!this.data.isScrollable) {
      return
    }
    bottomSheetUtils.onScrollEnd(this)
  },

  onDismissHandler: function () {
    bottomSheetUtils.dismiss(this)
  }
})
