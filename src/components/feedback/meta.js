!function (e, t) { function n() { var t = s.getBoundingClientRect().width; t / a > 540 && (t = 540 * a); var n = t / 10; s.style.fontSize = n + "px", l.rem = e.rem = n } var r, i = e.document, s = i.documentElement, o = i.querySelector('meta[name="viewport"]'), u = i.querySelector('meta[name="flexible"]'), a = 0, f = 0, l = t.flexible || (t.flexible = {}); if (o) { console.warn("\u5c06\u6839\u636e\u5df2\u6709\u7684meta\u6807\u7b7e\u6765\u8bbe\u7f6e\u7f29\u653e\u6bd4\u4f8b"); var c = o.getAttribute("content").match(/initial\-scale=([\d\.]+)/); c && (f = parseFloat(c[1]), a = parseInt(1 / f)) } else if (u) { var h = u.getAttribute("content"); if (h) { var p = h.match(/initial\-dpr=([\d\.]+)/), d = h.match(/maximum\-dpr=([\d\.]+)/); p && (a = parseFloat(p[1]), f = parseFloat((1 / a).toFixed(2))), d && (a = parseFloat(d[1]), f = parseFloat((1 / a).toFixed(2))) } } if (!a && !f) { var v = (e.navigator.appVersion.match(/android/gi), e.navigator.appVersion.match(/iphone/gi)), m = e.devicePixelRatio; a = v ? m >= 3 && (!a || a >= 3) ? 3 : m >= 2 && (!a || a >= 2) ? 2 : 1 : 1, f = 1 / a } if (s.setAttribute("data-dpr", a), !o) if (o = i.createElement("meta"), o.setAttribute("name", "viewport"), o.setAttribute("content", "initial-scale=" + f + ", maximum-scale=" + f + ", minimum-scale=" + f + ", user-scalable=no"), s.firstElementChild) s.firstElementChild.appendChild(o); else { var g = i.createElement("div"); g.appendChild(o), i.write(g.innerHTML) } e.addEventListener("resize", function () { clearTimeout(r), r = setTimeout(n, 300) }, !1), e.addEventListener("pageshow", function (e) { e.persisted && (clearTimeout(r), r = setTimeout(n, 300)) }, !1), "complete" === i.readyState ? i.body.style.fontSize = 12 * a + "px" : i.addEventListener("DOMContentLoaded", function () { i.body.style.fontSize = 12 * a + "px" }, !1), n(), l.dpr = e.dpr = a, l.refreshRem = n, l.rem2px = function (e) { var t = parseFloat(e) * this.rem; return "string" == typeof e && e.match(/rem$/) && (t += "px"), t }, l.px2rem = function (e) { var t = parseFloat(e) / this.rem; return "string" == typeof e && e.match(/px$/) && (t += "rem"), t } }(window, window.lib || (window.lib = {}))