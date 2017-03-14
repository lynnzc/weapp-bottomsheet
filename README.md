# weapp-bottomsheet
微信小程序，模仿 Android 底部弹出的 Bottom Sheet 样式控件效果  
  
# 运行效果  
![动效](https://github.com/lynnzc/weapp-bottomsheet/blob/master/res/weapp-bs-snap.gif)  
  
# 使用方法    
在需要弹出的 page 页面
```  
// xx_page.js
const BottomSheetBehavior = require('../../template/bottomSheetBehavior/bottomSheetBehavior')  
const bottom_sheet = new BottomSheetBehavior()  

Page({
   ...  
   onShowCallback: function() {  
      // 单位为 rpx  
      bottom_sheet.show(500)  
      // 同样，支持简单的滑动消失效果  
      // bottom_sheet.show(500, true)  
   },  
  
   onDismissCallback: function() {  
      bottom_sheet.dismiss()  
   }  
})  

// xx_page.wxml
<import src="../../template/bottomSheetBehavior/bottomSheetBehavior.wxml"/>  
<!-- your ml layout content -->
// _bottom_sheet_state 这个命名不能改动
<template is="bottom-sheet-behavior" data="{{_bottom_sheet_state}}"></template>  

// xx_page.wxss
@import "../../template/bottomSheetBehavior/bottomSheetBehavior.wxss";  
<!-- your style sheet -->
```  

# TODO
 - 支持 Initial Height , Swipe Up to Peek Height , 更接近 Android 效果  
 - 优化 Scroll Animation
 - 优化 Mask View Show / Dismiss Animation

# License  
```  
   Copyright 2017 lynn

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```  
  
