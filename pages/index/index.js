//index.js
let app = getApp()
const BottomSheetBehavior = require('../../template/bottomSheetBehavior/bottomSheetBehavior')

const bt_component = new BottomSheetBehavior()

Page({
  data: {
    userInfo: {},
  },
  onLoad: function (options) {
    let that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  // 弹出 BottomSheet 
  onCommonClickHandler: function () {
    // 500 rpx
    bt_component.show(500)
  },

  // 弹出 Scrollable BottomSheet 
  onScrollableClickHandler: function () {
    bt_component.show(500, true)
  },

  // 隐藏 Bottom Sheet
  onDismissHandler: function () {
    bt_component.dismiss()
  }
})
