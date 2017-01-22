/**
 * 弹出 Bottom SHeet
 */
function show(page, height) {
    var newAnimation = wx.createAnimation({
        duration: 500,
        //让遮罩先显示
        delay: 10,
        timingFunction: 'ease-in-ou',
    })

    // 当前界面暂存动画实例, 以及弹出的位移距离
    page.currentSheetAnim = newAnimation
    page.transHeight = height
    newAnimation.translateY(-height).step()

    page.setData({
        // 显示遮罩
        isShow: 1,
        sheetAnimation: page.currentSheetAnim.export()
    })
}

/**
 * 隐藏 Bottom Sheet
 */
function dismiss(page) {
    const disDuration = 500;
    page.currentSheetAnim.translateY(page.transHeight).step({
        duration: disDuration,
    })

    page.setData({
        sheetAnimation: page.currentSheetAnim.export()
    })

    setTimeout(function () {
        // 延迟遮罩消失
        page.setData({
            isShow: 0,
        })
    }, disDuration / 2)
}

/**
 * 滚动开始
 */
function onScrollStart(page, event) {
    // 记录按下的坐标 Y
    page.currentTouchY = event.touches[0].clientY
    page.totalOffset = 0
}

/**
 * 滚动过程
 */
function onScrollMove(page, event) {
    // 当次位移
    var curOffset = event.touches[0].clientY - page.currentTouchY
    if (curOffset <= 0) {
        return
    }
    // 更新 curY
    page.currentTouchY = event.touches[0].clientY
    page.totalOffset += curOffset
    page.currentSheetAnim.translateY(curOffset).step()
    page.setData({
        sheetAnimation: page.currentSheetAnim.export()
    })
}

/**
 * 滚动结束
 */
function onScrollEnd(page) {
    if (page.totalOffset > page.transHeight / 2) {
        // 收起
        page.currentSheetAnim.translateY(page.transHeight).step({
            duration: 200,
        })

        page.setData({
            sheetAnimation: page.currentSheetAnim.export(),
        })

        setTimeout(function () {
            page.setData({
                isShow: 0,
            })
        }, 150)
    } else if (page.totalOffset != 0) {
        // 还原
        page.currentSheetAnim.translateY(-page.transHeight).step()
        page.setData({
            sheetAnimation: page.currentSheetAnim.export()
        })
    }
}

module.exports = {
    show: show,
    dismiss: dismiss,
    onScrollStart: onScrollStart,
    onScrollMove: onScrollMove,
    onScrollEnd: onScrollEnd,
}