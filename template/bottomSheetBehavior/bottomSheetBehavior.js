/**
 * Bottom Sheet 组件
 */
class BottomSheetBehavior {
    /**
     * todo:
     * 1. expandable content
     * 2. optimize scroll animation
     * 3. optimize mask dismiss anmation
     */
    constructor() {
        // default params
        // behavior animtaion duration
        this._default_duration = 500
        this._ratio = 0.5
        this._page_height = 625
        wx.getSystemInfo({
            success: (res) => {
                this._ratio = res.windowWidth / 750
                this._page_height = res.windowHeight
            }
        })
    }
    /**
     * get current page instance
     */
    _get_current_page() {
        if (!this._cur_page) {
            const pages = getCurrentPages()
            this._cur_page = pages[pages.length - 1]
        }
        return this._cur_page
    }

    /**
     * bind functions to current page
     */
    _bind_scrollable_methods() {
        let methods = {
            onScrollStart: this.onScrollStart,
            onScrollMove: this.onScrollMove,
            onScrollEnd: this.onScrollEnd,
        }

        const cur_page = this._get_current_page()

        for (let key in methods) {
            if (methods.hasOwnProperty(key) && typeof methods[key] === 'function') {
                this[key] = methods[key] = methods[key].bind(this)
                // important step: bind methods to page
                cur_page[`${key}`] = methods[key]
            }
        }
    }

    /**
     * show Bottom Sheet Window
     */
    show(height = 750, is_scrollable = false) {
        const cur_page = this._get_current_page()
        let _bottom_sheet_state = cur_page.data._bottom_sheet_state || {}
        if (_bottom_sheet_state.is_showed == 1) {
            return
        }

        if (is_scrollable) {
            this._bind_scrollable_methods()
        }

        this._behavior_animation = wx.createAnimation({
            duration: this._default_duration,
            // display mask view before the content view
            delay: 50,
            timingFunction: 'ease-in-ou',
        })

        this._behavior_animation.translateY(-height * this._ratio).step()
        _bottom_sheet_state.is_showed = 1
        _bottom_sheet_state.translation_y = height
        _bottom_sheet_state.animation = this._behavior_animation.export()
        _bottom_sheet_state.offset = this._page_height
        cur_page.setData({
            _bottom_sheet_state: _bottom_sheet_state
        })
    }

    /**
     * hide Bottom Sheet Window
     */
    dismiss() {
        const cur_page = this._get_current_page()
        let _bottom_sheet_state = cur_page.data._bottom_sheet_state || {}
        if (_bottom_sheet_state.is_showed != 1) {
            return
        }

        this._behavior_animation.translateY(_bottom_sheet_state.translation_y * this._ratio).step({
            duration: this._default_duration,
        })

        _bottom_sheet_state.animation = this._behavior_animation.export()
        cur_page.setData({
            _bottom_sheet_state: _bottom_sheet_state
        })

        setTimeout(function () {
            // hide mask view a bit later
            _bottom_sheet_state.is_showed = 0
            cur_page.setData({
                _bottom_sheet_state: _bottom_sheet_state,
            })
        }, this._default_duration / 2)
    }

    /**
     * scroll start
     */
    onScrollStart(event) {
        // touch down y
        // console.log(event)
        let cur_page = this._get_current_page()
        let _bottom_sheet_state = cur_page.data._bottom_sheet_state
        _bottom_sheet_state.current_touch_y = event.touches[0].clientY
        _bottom_sheet_state.total_offset = 0
        cur_page.setData({
            _bottom_sheet_state: cur_page.data._bottom_sheet_state
        })
    }

    /**
     * scroll move
     */
    onScrollMove(event) {
        // console.log(event)
        let cur_page = this._get_current_page()
        let _bottom_sheet_state = cur_page.data._bottom_sheet_state
        let cur_offset = event.touches[0].clientY - _bottom_sheet_state.current_touch_y
        if (cur_offset <= 0) {
            return
        }
        // translation y animation
        this._behavior_animation.translateY(cur_offset).step()

        _bottom_sheet_state.current_touch_y = event.touches[0].clientY
        _bottom_sheet_state.total_offset += cur_offset
        _bottom_sheet_state.animation = this._behavior_animation.export()
        cur_page.setData({
            _bottom_sheet_state: _bottom_sheet_state
        })
    }

    /**
     * scroll end
     */
    onScrollEnd(event) {
        let cur_page = this._get_current_page()
        let _bottom_sheet_state = cur_page.data._bottom_sheet_state

        if (_bottom_sheet_state.total_offset > _bottom_sheet_state.translation_y * this._ratio / 2) {
            // dismiss
            this._behavior_animation.translateY(_bottom_sheet_state.translation_y * this._ratio).step({
                duration: 200,
            })
            _bottom_sheet_state.animation = this._behavior_animation.export()
            cur_page.setData({
                _bottom_sheet_state: _bottom_sheet_state,
            })

            setTimeout(function () {
                _bottom_sheet_state.is_showed = 0
                cur_page.setData({
                    _bottom_sheet_state: _bottom_sheet_state,
                })
            }, 200)
        } else if (_bottom_sheet_state.total_offset != 0) {
            // resume
            this._behavior_animation.translateY(-_bottom_sheet_state.translation_y * this._ratio).step()
            _bottom_sheet_state.animation = this._behavior_animation.export()
            cur_page.setData({
                _bottom_sheet_state: _bottom_sheet_state
            })
        }
    }
}

module.exports = BottomSheetBehavior;