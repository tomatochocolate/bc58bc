/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/17 19:35
 */
import { isUndefined } from '@/libs/utils'

const document = !isUndefined(window) && !isUndefined(window) ? window.document : {}
const keyboardAllowed = !isUndefined(Element) && 'ALLOW_KEYBOARD_INPUT' in Element
const fn = (() => {
    let val
    const fnMap = [
        [
            'requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled',
            'fullscreenchange', 'fullscreenerror'
        ],
        // New WebKit
        [
            'webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement',
            'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'
        ],
        // Old WebKit (Safari 5.1)
        [
            'webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement',
            'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'
        ],
        [
            'mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement',
            'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'
        ],
        [
            'msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement',
            'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError'
        ]
    ]
    let i = 0
    let l = fnMap.length
    let ret = {}

    for (; i < l; i++) {
        val = fnMap[i]
        if (val && val[1] in document) {
            for (i = 0; i < val.length; i++) {
                ret[fnMap[0][i]] = val[i]
            }
            return ret
        }
    }
    return false
})()
const eventNameMap = {
    change: fn.fullscreenchange,
    error: fn.fullscreenerror
}
const fullscreen = {
    on (event, callback) {
        const eventName = eventNameMap[event]

        if (eventName) {
            document.addEventListener(eventName, callback, false)
        }
    },
    off (event, callback) {
        const eventName = eventNameMap[event]

        if (eventName) {
            document.removeEventListener(eventName, callback, false)
        }
    },
    request (elem) {
        return new Promise(resolve => {
            const request = fn.requestFullscreen
            const onFullScreenEntered = () => {
                this.off('change', onFullScreenEntered)
                resolve()
            }

            elem = elem || document.documentElement
            // Work around Safari 5.1 bug: reports support for
            // keyboard in fullscreen even though it doesn't.
            // Browser sniffing, since the alternative with
            // setTimeout is even worse.
            if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
                elem[request]()
            } else {
                elem[request](keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {})
            }
            this.on('change', onFullScreenEntered)
        })
    },
    exit () {
        return new Promise(resolve => {
            if (!this.isFullscreen) {
                resolve()
                return
            }

            const onFullScreenExit = () => {
                this.off('change', onFullScreenExit)
                resolve()
            }
            document[fn.exitFullscreen]()
            this.on('change', onFullScreenExit)
        })
    },
    toggle (elem) {
        return this.isFullscreen ? this.exit() : this.request(elem)
    },
    onchange (callback) {
        this.on('change', callback)
    },
    onerror (callback) {
        this.on('error', callback)
    },
    raw: fn
}

Object.defineProperties(fullscreen, {
    isFullscreen: {
        get () {
            return Boolean(document[fn.fullscreenElement])
        }
    },
    element: {
        enumerable: true,
        get () {
            return document[fn.fullscreenElement]
        }
    },
    enabled: {
        enumerable: true,
        get () {
            // Coerce to boolean in case of old WebKit
            return Boolean(document[fn.fullscreenEnabled])
        }
    }
})

export default fullscreen

