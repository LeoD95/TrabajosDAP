/*
 Highcharts JS v6.1.1 (2018-06-27)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(S, K) {
    "object" === typeof module && module.exports ? module.exports = S.document ? K(S) : K : S.Highcharts = K(S)
})("undefined" !== typeof window ? window : this, function(S) {
    var K = function() {
        var a = "undefined" === typeof S ? window : S,
            A = a.document,
            C = a.navigator && a.navigator.userAgent || "",
            E = A && A.createElementNS && !!A.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            p = /(edge|msie|trident)/i.test(C) && !a.opera,
            g = -1 !== C.indexOf("Firefox"),
            d = -1 !== C.indexOf("Chrome"),
            m = g && 4 > parseInt(C.split("Firefox/")[1],
                10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "6.1.1",
            deg2rad: 2 * Math.PI / 360,
            doc: A,
            hasBidiBug: m,
            hasTouch: A && void 0 !== A.documentElement.ontouchstart,
            isMS: p,
            isWebKit: -1 !== C.indexOf("AppleWebKit"),
            isFirefox: g,
            isChrome: d,
            isSafari: !d && -1 !== C.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(C),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: E,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: []
        }
    }();
    (function(a) {
        a.timers = [];
        var A = a.charts,
            C = a.doc,
            E = a.win;
        a.error = function(p, g) {
            p = a.isNumber(p) ? "Highcharts error #" + p + ": www.highcharts.com/errors/" + p : p;
            if (g) throw Error(p);
            E.console && console.log(p)
        };
        a.Fx = function(a, g, d) {
            this.options = g;
            this.elem = a;
            this.prop = d
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    g = this.paths[1],
                    d = [],
                    m = this.now,
                    w = a.length,
                    v;
                if (1 === m) d = this.toD;
                else if (w === g.length && 1 > m)
                    for (; w--;) v = parseFloat(a[w]), d[w] = isNaN(v) ? g[w] : m * parseFloat(g[w] - v) + v;
                else d = g;
                this.elem.attr("d",
                    d, null, !0)
            },
            update: function() {
                var a = this.elem,
                    g = this.prop,
                    d = this.now,
                    m = this.options.step;
                if (this[g + "Setter"]) this[g + "Setter"]();
                else a.attr ? a.element && a.attr(g, d, null, !0) : a.style[g] = d + this.unit;
                m && m.call(a, d, this)
            },
            run: function(p, g, d) {
                var m = this,
                    w = m.options,
                    v = function(a) {
                        return v.stopped ? !1 : m.step(a)
                    },
                    l = E.requestAnimationFrame || function(a) {
                        setTimeout(a, 13)
                    },
                    e = function() {
                        for (var c = 0; c < a.timers.length; c++) a.timers[c]() || a.timers.splice(c--, 1);
                        a.timers.length && l(e)
                    };
                p !== g || this.elem["forceAnimate:" +
                    this.prop] ? (this.startTime = +new Date, this.start = p, this.end = g, this.unit = d, this.now = this.start, this.pos = 0, v.elem = this.elem, v.prop = this.prop, v() && 1 === a.timers.push(v) && l(e)) : (delete w.curAnim[this.prop], w.complete && 0 === a.keys(w.curAnim).length && w.complete.call(this.elem))
            },
            step: function(p) {
                var g = +new Date,
                    d, m = this.options,
                    w = this.elem,
                    v = m.complete,
                    l = m.duration,
                    e = m.curAnim;
                w.attr && !w.element ? p = !1 : p || g >= l + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), d = e[this.prop] = !0, a.objectEach(e, function(a) {
                    !0 !==
                        a && (d = !1)
                }), d && v && v.call(w), p = !1) : (this.pos = m.easing((g - this.startTime) / l), this.now = this.start + (this.end - this.start) * this.pos, this.update(), p = !0);
                return p
            },
            initPath: function(p, g, d) {
                function m(a) {
                    var b, c;
                    for (f = a.length; f--;) b = "M" === a[f] || "L" === a[f], c = /[a-zA-Z]/.test(a[f + 3]), b && c && a.splice(f + 1, 0, a[f + 1], a[f + 2], a[f + 1], a[f + 2])
                }

                function w(a, b) {
                    for (; a.length < q;) {
                        a[0] = b[q - a.length];
                        var c = a.slice(0, n);
                        [].splice.apply(a, [0, 0].concat(c));
                        t && (c = a.slice(a.length - n), [].splice.apply(a, [a.length, 0].concat(c)), f--)
                    }
                    a[0] =
                        "M"
                }

                function v(a, c) {
                    for (var f = (q - a.length) / n; 0 < f && f--;) b = a.slice().splice(a.length / F - n, n * F), b[0] = c[q - n - f * n], y && (b[n - 6] = b[n - 2], b[n - 5] = b[n - 1]), [].splice.apply(a, [a.length / F, 0].concat(b)), t && f--
                }
                g = g || "";
                var l, e = p.startX,
                    c = p.endX,
                    y = -1 < g.indexOf("C"),
                    n = y ? 7 : 3,
                    q, b, f;
                g = g.split(" ");
                d = d.slice();
                var t = p.isArea,
                    F = t ? 2 : 1,
                    J;
                y && (m(g), m(d));
                if (e && c) {
                    for (f = 0; f < e.length; f++)
                        if (e[f] === c[0]) {
                            l = f;
                            break
                        } else if (e[0] === c[c.length - e.length + f]) {
                        l = f;
                        J = !0;
                        break
                    }
                    void 0 === l && (g = [])
                }
                g.length && a.isNumber(l) && (q = d.length + l * F * n,
                    J ? (w(g, d), v(d, g)) : (w(d, g), v(g, d)));
                return [g, d]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function() {
            this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.merge = function() {
            var p, g = arguments,
                d, m = {},
                w = function(d, l) {
                    "object" !== typeof d && (d = {});
                    a.objectEach(l, function(e, c) {
                        !a.isObject(e, !0) || a.isClass(e) || a.isDOMElement(e) ? d[c] = l[c] : d[c] = w(d[c] || {}, e)
                    });
                    return d
                };
            !0 === g[0] && (m = g[1], g = Array.prototype.slice.call(g, 2));
            d = g.length;
            for (p = 0; p < d; p++) m = w(m,
                g[p]);
            return m
        };
        a.pInt = function(a, g) {
            return parseInt(a, g || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(p, g) {
            return !!p && "object" === typeof p && (!g || !a.isArray(p))
        };
        a.isDOMElement = function(p) {
            return a.isObject(p) && "number" === typeof p.nodeType
        };
        a.isClass = function(p) {
            var g = p && p.constructor;
            return !(!a.isObject(p, !0) || a.isDOMElement(p) || !g || !g.name || "Object" ===
                g.name)
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function(a, g) {
            for (var d = a.length; d--;)
                if (a[d] === g) {
                    a.splice(d, 1);
                    break
                }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(p, g, d) {
            var m;
            a.isString(g) ? a.defined(d) ? p.setAttribute(g, d) : p && p.getAttribute && ((m = p.getAttribute(g)) || "class" !== g || (m = p.getAttribute(g + "Name"))) : a.defined(g) && a.isObject(g) && a.objectEach(g, function(a, d) {
                p.setAttribute(d, a)
            });
            return m
        };
        a.splat = function(p) {
            return a.isArray(p) ?
                p : [p]
        };
        a.syncTimeout = function(a, g, d) {
            if (g) return setTimeout(a, g, d);
            a.call(0, d)
        };
        a.clearTimeout = function(p) {
            a.defined(p) && clearTimeout(p)
        };
        a.extend = function(a, g) {
            var d;
            a || (a = {});
            for (d in g) a[d] = g[d];
            return a
        };
        a.pick = function() {
            var a = arguments,
                g, d, m = a.length;
            for (g = 0; g < m; g++)
                if (d = a[g], void 0 !== d && null !== d) return d
        };
        a.css = function(p, g) {
            a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity\x3d" + 100 * g.opacity + ")");
            a.extend(p.style, g)
        };
        a.createElement = function(p, g, d, m, w) {
            p = C.createElement(p);
            var v =
                a.css;
            g && a.extend(p, g);
            w && v(p, {
                padding: 0,
                border: "none",
                margin: 0
            });
            d && v(p, d);
            m && m.appendChild(p);
            return p
        };
        a.extendClass = function(p, g) {
            var d = function() {};
            d.prototype = new p;
            a.extend(d.prototype, g);
            return d
        };
        a.pad = function(a, g, d) {
            return Array((g || 2) + 1 - String(a).replace("-", "").length).join(d || 0) + a
        };
        a.relativeLength = function(a, g, d) {
            return /%$/.test(a) ? g * parseFloat(a) / 100 + (d || 0) : parseFloat(a)
        };
        a.wrap = function(a, g, d) {
            var m = a[g];
            a[g] = function() {
                var a = Array.prototype.slice.call(arguments),
                    g = arguments,
                    l = this;
                l.proceed = function() {
                    m.apply(l, arguments.length ? arguments : g)
                };
                a.unshift(m);
                a = d.apply(this, a);
                l.proceed = null;
                return a
            }
        };
        a.formatSingle = function(p, g, d) {
            var m = /\.([0-9])/,
                w = a.defaultOptions.lang;
            /f$/.test(p) ? (d = (d = p.match(m)) ? d[1] : -1, null !== g && (g = a.numberFormat(g, d, w.decimalPoint, -1 < p.indexOf(",") ? w.thousandsSep : ""))) : g = (d || a.time).dateFormat(p, g);
            return g
        };
        a.format = function(p, g, d) {
            for (var m = "{", w = !1, v, l, e, c, y = [], n; p;) {
                m = p.indexOf(m);
                if (-1 === m) break;
                v = p.slice(0, m);
                if (w) {
                    v = v.split(":");
                    l = v.shift().split(".");
                    c = l.length;
                    n = g;
                    for (e = 0; e < c; e++) n && (n = n[l[e]]);
                    v.length && (n = a.formatSingle(v.join(":"), n, d));
                    y.push(n)
                } else y.push(v);
                p = p.slice(m + 1);
                m = (w = !w) ? "}" : "{"
            }
            y.push(p);
            return y.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(p, g, d, m, w) {
            var v, l = p;
            d = a.pick(d, 1);
            v = p / d;
            g || (g = w ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === m && (1 === d ? g = a.grep(g, function(a) {
                return 0 === a % 1
            }) : .1 >= d && (g = [1 / d])));
            for (m = 0; m < g.length && !(l = g[m], w && l * d >= p ||
                    !w && v <= (g[m] + (g[m + 1] || g[m])) / 2); m++);
            return l = a.correctFloat(l * d, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function(a, g) {
            var d = a.length,
                m, w;
            for (w = 0; w < d; w++) a[w].safeI = w;
            a.sort(function(a, d) {
                m = g(a, d);
                return 0 === m ? a.safeI - d.safeI : m
            });
            for (w = 0; w < d; w++) delete a[w].safeI
        };
        a.arrayMin = function(a) {
            for (var g = a.length, d = a[0]; g--;) a[g] < d && (d = a[g]);
            return d
        };
        a.arrayMax = function(a) {
            for (var g = a.length, d = a[0]; g--;) a[g] > d && (d = a[g]);
            return d
        };
        a.destroyObjectProperties = function(p, g) {
            a.objectEach(p, function(a,
                m) {
                a && a !== g && a.destroy && a.destroy();
                delete p[m]
            })
        };
        a.discardElement = function(p) {
            var g = a.garbageBin;
            g || (g = a.createElement("div"));
            p && g.appendChild(p);
            g.innerHTML = ""
        };
        a.correctFloat = function(a, g) {
            return parseFloat(a.toPrecision(g || 14))
        };
        a.setAnimation = function(p, g) {
            g.renderer.globalAnimation = a.pick(p, g.options.chart.animation, !0)
        };
        a.animObject = function(p) {
            return a.isObject(p) ? a.merge(p) : {
                duration: p ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(p, g, d, m) {
            p = +p || 0;
            g = +g;
            var w = a.defaultOptions.lang,
                v = (p.toString().split(".")[1] || "").split("e")[0].length,
                l, e, c = p.toString().split("e"); - 1 === g ? g = Math.min(v, 20) : a.isNumber(g) ? g && c[1] && 0 > c[1] && (l = g + +c[1], 0 <= l ? (c[0] = (+c[0]).toExponential(l).split("e")[0], g = l) : (c[0] = c[0].split(".")[0] || 0, p = 20 > g ? (c[0] * Math.pow(10, c[1])).toFixed(g) : 0, c[1] = 0)) : g = 2;
            e = (Math.abs(c[1] ? c[0] : p) + Math.pow(10, -Math.max(g, v) - 1)).toFixed(g);
            v = String(a.pInt(e));
            l = 3 < v.length ? v.length % 3 : 0;
            d = a.pick(d,
                w.decimalPoint);
            m = a.pick(m, w.thousandsSep);
            p = (0 > p ? "-" : "") + (l ? v.substr(0, l) + m : "");
            p += v.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + m);
            g && (p += d + e.slice(-g));
            c[1] && 0 !== +p && (p += "e" + c[1]);
            return p
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(p, g, d) {
            if ("width" === g) return Math.max(0, Math.min(p.offsetWidth, p.scrollWidth) - a.getStyle(p, "padding-left") - a.getStyle(p, "padding-right"));
            if ("height" === g) return Math.max(0, Math.min(p.offsetHeight, p.scrollHeight) - a.getStyle(p, "padding-top") -
                a.getStyle(p, "padding-bottom"));
            E.getComputedStyle || a.error(27, !0);
            if (p = E.getComputedStyle(p, void 0)) p = p.getPropertyValue(g), a.pick(d, "opacity" !== g) && (p = a.pInt(p));
            return p
        };
        a.inArray = function(p, g, d) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(g, p, d)
        };
        a.grep = function(p, g) {
            return (a.filterPolyfill || Array.prototype.filter).call(p, g)
        };
        a.find = Array.prototype.find ? function(a, g) {
            return a.find(g)
        } : function(a, g) {
            var d, m = a.length;
            for (d = 0; d < m; d++)
                if (g(a[d], d)) return a[d]
        };
        a.some = function(p, g, d) {
            return (a.somePolyfill ||
                Array.prototype.some).call(p, g, d)
        };
        a.map = function(a, g) {
            for (var d = [], m = 0, w = a.length; m < w; m++) d[m] = g.call(a[m], a[m], m, a);
            return d
        };
        a.keys = function(p) {
            return (a.keysPolyfill || Object.keys).call(void 0, p)
        };
        a.reduce = function(p, g, d) {
            return (a.reducePolyfill || Array.prototype.reduce).apply(p, 2 < arguments.length ? [g, d] : [g])
        };
        a.offset = function(a) {
            var g = C.documentElement;
            a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (E.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                left: a.left +
                    (E.pageXOffset || g.scrollLeft) - (g.clientLeft || 0)
            }
        };
        a.stop = function(p, g) {
            for (var d = a.timers.length; d--;) a.timers[d].elem !== p || g && g !== a.timers[d].prop || (a.timers[d].stopped = !0)
        };
        a.each = function(p, g, d) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(p, g, d)
        };
        a.objectEach = function(a, g, d) {
            for (var m in a) a.hasOwnProperty(m) && g.call(d || a[m], a[m], m, a)
        };
        a.addEvent = function(p, g, d, m) {
            var w, v = p.addEventListener || a.addEventListenerPolyfill;
            w = "function" === typeof p && p.prototype ? p.prototype.protoEvents = p.prototype.protoEvents || {} : p.hcEvents = p.hcEvents || {};
            a.Point && p instanceof a.Point && p.series && p.series.chart && (p.series.chart.runTrackerClick = !0);
            v && v.call(p, g, d, !1);
            w[g] || (w[g] = []);
            w[g].push(d);
            m && a.isNumber(m.order) && (d.order = m.order, w[g].sort(function(a, e) {
                return a.order - e.order
            }));
            return function() {
                a.removeEvent(p, g, d)
            }
        };
        a.removeEvent = function(p, g, d) {
            function m(e, c) {
                var d = p.removeEventListener || a.removeEventListenerPolyfill;
                d && d.call(p, e, c, !1)
            }

            function w(e) {
                var c, d;
                p.nodeName && (g ? (c = {}, c[g] = !0) : c = e, a.objectEach(c, function(a,
                    c) {
                    if (e[c])
                        for (d = e[c].length; d--;) m(c, e[c][d])
                }))
            }
            var v, l;
            a.each(["protoEvents", "hcEvents"], function(e) {
                var c = p[e];
                c && (g ? (v = c[g] || [], d ? (l = a.inArray(d, v), -1 < l && (v.splice(l, 1), c[g] = v), m(g, d)) : (w(c), c[g] = [])) : (w(c), p[e] = {}))
            })
        };
        a.fireEvent = function(p, g, d, m) {
            var w, v, l, e, c;
            d = d || {};
            C.createEvent && (p.dispatchEvent || p.fireEvent) ? (w = C.createEvent("Events"), w.initEvent(g, !0, !0), a.extend(w, d), p.dispatchEvent ? p.dispatchEvent(w) : p.fireEvent(g, w)) : a.each(["protoEvents", "hcEvents"], function(y) {
                if (p[y])
                    for (v = p[y][g] || [], l = v.length, d.target || a.extend(d, {
                            preventDefault: function() {
                                d.defaultPrevented = !0
                            },
                            target: p,
                            type: g
                        }), e = 0; e < l; e++)(c = v[e]) && !1 === c.call(p, d) && d.preventDefault()
            });
            m && !d.defaultPrevented && m.call(p, d)
        };
        a.animate = function(p, g, d) {
            var m, w = "",
                v, l, e;
            a.isObject(d) || (e = arguments, d = {
                duration: e[2],
                easing: e[3],
                complete: e[4]
            });
            a.isNumber(d.duration) || (d.duration = 400);
            d.easing = "function" === typeof d.easing ? d.easing : Math[d.easing] || Math.easeInOutSine;
            d.curAnim = a.merge(g);
            a.objectEach(g, function(c, e) {
                a.stop(p, e);
                l = new a.Fx(p, d, e);
                v = null;
                "d" === e ? (l.paths = l.initPath(p, p.d, g.d), l.toD = g.d, m = 0, v = 1) : p.attr ? m = p.attr(e) : (m = parseFloat(a.getStyle(p, e)) || 0, "opacity" !== e && (w = "px"));
                v || (v = c);
                v && v.match && v.match("px") && (v = v.replace(/px/g, ""));
                l.run(m, v, w)
            })
        };
        a.seriesType = function(p, g, d, m, w) {
            var v = a.getOptions(),
                l = a.seriesTypes;
            v.plotOptions[p] = a.merge(v.plotOptions[g], d);
            l[p] = a.extendClass(l[g] || function() {}, m);
            l[p].prototype.type = p;
            w && (l[p].prototype.pointClass = a.extendClass(a.Point, w));
            return l[p]
        };
        a.uniqueKey = function() {
            var a =
                Math.random().toString(36).substring(2, 9),
                g = 0;
            return function() {
                return "highcharts-" + a + "-" + g++
            }
        }();
        E.jQuery && (E.jQuery.fn.highcharts = function() {
            var p = [].slice.call(arguments);
            if (this[0]) return p[0] ? (new(a[a.isString(p[0]) ? p.shift() : "Chart"])(this[0], p[0], p[1]), this) : A[a.attr(this[0], "data-highcharts-chart")]
        })
    })(K);
    (function(a) {
        var A = a.each,
            C = a.isNumber,
            E = a.map,
            p = a.merge,
            g = a.pInt;
        a.Color = function(d) {
            if (!(this instanceof a.Color)) return new a.Color(d);
            this.init(d)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [g(a[1]), g(a[2]), g(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [g(a[1]), g(a[2]), g(a[3]), 1]
                }
            }],
            names: {
                none: "rgba(255,255,255,0)",
                white: "#ffffff",
                black: "#000000"
            },
            init: function(d) {
                var g, w, v, l;
                if ((this.input = d = this.names[d && d.toLowerCase ? d.toLowerCase() : ""] || d) && d.stops) this.stops = E(d.stops, function(e) {
                    return new a.Color(e[1])
                });
                else if (d && d.charAt && "#" === d.charAt() && (g = d.length, d = parseInt(d.substr(1),
                        16), 7 === g ? w = [(d & 16711680) >> 16, (d & 65280) >> 8, d & 255, 1] : 4 === g && (w = [(d & 3840) >> 4 | (d & 3840) >> 8, (d & 240) >> 4 | d & 240, (d & 15) << 4 | d & 15, 1])), !w)
                    for (v = this.parsers.length; v-- && !w;) l = this.parsers[v], (g = l.regex.exec(d)) && (w = l.parse(g));
                this.rgba = w || []
            },
            get: function(a) {
                var d = this.input,
                    g = this.rgba,
                    v;
                this.stops ? (v = p(d), v.stops = [].concat(v.stops), A(this.stops, function(d, e) {
                    v.stops[e] = [v.stops[e][0], d.get(a)]
                })) : v = g && C(g[0]) ? "rgb" === a || !a && 1 === g[3] ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === a ? g[3] : "rgba(" + g.join(",") + ")" : d;
                return v
            },
            brighten: function(a) {
                var d, w = this.rgba;
                if (this.stops) A(this.stops, function(d) {
                    d.brighten(a)
                });
                else if (C(a) && 0 !== a)
                    for (d = 0; 3 > d; d++) w[d] += g(255 * a), 0 > w[d] && (w[d] = 0), 255 < w[d] && (w[d] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function(a, g) {
                var d = this.rgba,
                    v = a.rgba;
                v.length && d && d.length ? (a = 1 !== v[3] || 1 !== d[3], g = (a ? "rgba(" : "rgb(") + Math.round(v[0] + (d[0] - v[0]) * (1 - g)) + "," + Math.round(v[1] + (d[1] - v[1]) * (1 - g)) + "," + Math.round(v[2] + (d[2] - v[2]) * (1 - g)) + (a ? "," + (v[3] + (d[3] -
                    v[3]) * (1 - g)) : "") + ")") : g = a.input || "none";
                return g
            }
        };
        a.color = function(d) {
            return new a.Color(d)
        }
    })(K);
    (function(a) {
        var A, C, E = a.addEvent,
            p = a.animate,
            g = a.attr,
            d = a.charts,
            m = a.color,
            w = a.css,
            v = a.createElement,
            l = a.defined,
            e = a.deg2rad,
            c = a.destroyObjectProperties,
            y = a.doc,
            n = a.each,
            q = a.extend,
            b = a.erase,
            f = a.grep,
            t = a.hasTouch,
            F = a.inArray,
            J = a.isArray,
            D = a.isFirefox,
            H = a.isMS,
            u = a.isObject,
            r = a.isString,
            B = a.isWebKit,
            z = a.merge,
            G = a.noop,
            M = a.objectEach,
            h = a.pick,
            x = a.pInt,
            N = a.removeEvent,
            k = a.splat,
            I = a.stop,
            T = a.svg,
            Q = a.SVG_NS,
            O = a.symbolSizes,
            P = a.win;
        A = a.SVGElement = function() {
            return this
        };
        q(A.prototype, {
            opacity: 1,
            SVG_NS: Q,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function(a, b) {
                this.element = "span" === b ? v(b) : y.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function(b, k, x) {
                k = a.animObject(h(k, this.renderer.globalAnimation, !0));
                0 !== k.duration ? (x && (k.complete = x), p(this, b, k)) : (this.attr(b, null, x), k.step && k.step.call(this));
                return this
            },
            complexColor: function(b, h, k) {
                var L = this.renderer,
                    x, c, f, e, r, q, t, d, I, u, N, B = [],
                    R;
                a.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    b.radialGradient ? c = "radialGradient" : b.linearGradient && (c = "linearGradient");
                    c && (f = b[c], r = L.gradients, t = b.stops, u = k.radialReference, J(f) && (b[c] = f = {
                        x1: f[0],
                        y1: f[1],
                        x2: f[2],
                        y2: f[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === c && u && !l(f.gradientUnits) && (e = f, f = z(f, L.getRadialAttr(u, e), {
                        gradientUnits: "userSpaceOnUse"
                    })), M(f, function(a, b) {
                        "id" !==
                        b && B.push(b, a)
                    }), M(t, function(a) {
                        B.push(a)
                    }), B = B.join(","), r[B] ? N = r[B].attr("id") : (f.id = N = a.uniqueKey(), r[B] = q = L.createElement(c).attr(f).add(L.defs), q.radAttr = e, q.stops = [], n(t, function(b) {
                        0 === b[1].indexOf("rgba") ? (x = a.color(b[1]), d = x.get("rgb"), I = x.get("a")) : (d = b[1], I = 1);
                        b = L.createElement("stop").attr({
                            offset: b[0],
                            "stop-color": d,
                            "stop-opacity": I
                        }).add(q);
                        q.stops.push(b)
                    })), R = "url(" + L.url + "#" + N + ")", k.setAttribute(h, R), k.gradient = B, b.toString = function() {
                        return R
                    })
                })
            },
            applyTextOutline: function(h) {
                var k =
                    this.element,
                    L, x, c, f, e; - 1 !== h.indexOf("contrast") && (h = h.replace(/contrast/g, this.renderer.getContrast(k.style.fill)));
                h = h.split(" ");
                x = h[h.length - 1];
                if ((c = h[0]) && "none" !== c && a.svg) {
                    this.fakeTS = !0;
                    h = [].slice.call(k.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    c = c.replace(/(^[\d\.]+)(.*?)$/g, function(a, b, h) {
                        return 2 * b + h
                    });
                    for (e = h.length; e--;) L = h[e], "highcharts-text-outline" === L.getAttribute("class") && b(h, k.removeChild(L));
                    f = k.firstChild;
                    n(h, function(a, b) {
                        0 === b && (a.setAttribute("x", k.getAttribute("x")),
                            b = k.getAttribute("y"), a.setAttribute("y", b || 0), null === b && k.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        g(a, {
                            "class": "highcharts-text-outline",
                            fill: x,
                            stroke: x,
                            "stroke-width": c,
                            "stroke-linejoin": "round"
                        });
                        k.insertBefore(a, f)
                    })
                }
            },
            attr: function(a, b, h, k) {
                var x, L = this.element,
                    c, f = this,
                    e, r;
                "string" === typeof a && void 0 !== b && (x = a, a = {}, a[x] = b);
                "string" === typeof a ? f = (this[a + "Getter"] || this._defaultGetter).call(this, a, L) : (M(a, function(b, h) {
                    e = !1;
                    k || I(this, h);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h) &&
                        (c || (this.symbolAttr(a), c = !0), e = !0);
                    !this.rotation || "x" !== h && "y" !== h || (this.doTransform = !0);
                    e || (r = this[h + "Setter"] || this._defaultSetter, r.call(this, b, h, L))
                }, this), this.afterSetters());
                h && h.call(this);
                return f
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            addClass: function(a, b) {
                var h = this.attr("class") || ""; - 1 === h.indexOf(a) && (b || (a = (h + (h ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== F(a, (this.attr("class") ||
                    "").split(" "))
            },
            removeClass: function(a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function(a) {
                var b = this;
                n("x y r start end width height innerR anchorX anchorY".split(" "), function(k) {
                    b[k] = h(a[k], b[k])
                });
                b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, b) {
                var h;
                b = b || a.strokeWidth || 0;
                h = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x ||
                    0) + h;
                a.y = Math.floor(a.y || this.y || 0) + h;
                a.width = Math.floor((a.width || this.width || 0) - 2 * h);
                a.height = Math.floor((a.height || this.height || 0) - 2 * h);
                l(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function(a) {
                var b = this.styles,
                    h = {},
                    k = this.element,
                    c, f = "",
                    e, L = !b,
                    r = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                b && M(a, function(a, k) {
                    a !== b[k] && (h[k] = a, L = !0)
                });
                L && (b && (a = q(b, h)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === k.nodeName.toLowerCase() && a.width && (c = this.textWidth =
                    x(a.width))), this.styles = a, c && !T && this.renderer.forExport && delete a.width, k.namespaceURI === this.SVG_NS ? (e = function(a, b) {
                    return "-" + b.toLowerCase()
                }, M(a, function(a, b) {
                    -1 === F(b, r) && (f += b.replace(/([A-Z])/g, e) + ":" + a + ";")
                }), f && g(k, "style", f)) : w(k, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            getStyle: function(a) {
                return P.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function() {
                var a =
                    this.getStyle("stroke-width"),
                    b;
                a.indexOf("px") === a.length - 2 ? a = x(a) : (b = y.createElementNS(Q, "rect"), g(b, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(b), a = b.getBBox().width, b.parentNode.removeChild(b));
                return a
            },
            on: function(a, b) {
                var h = this,
                    k = h.element;
                t && "click" === a ? (k.ontouchstart = function(a) {
                    h.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(k, a)
                }, k.onclick = function(a) {
                    (-1 === P.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (h.touchEventFired || 0)) && b.call(k, a)
                }) : k["on" +
                    a] = b;
                return this
            },
            setRadialReference: function(a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function(a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    b = this.translateY || 0,
                    k = this.scaleX,
                    x = this.scaleY,
                    c = this.inverted,
                    f = this.rotation,
                    e = this.matrix,
                    r = this.element;
                c && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                l(e) && a.push("matrix(" + e.join(",") + ")");
                c ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + h(this.rotationOriginX, r.getAttribute("x"), 0) + " " + h(this.rotationOriginY, r.getAttribute("y") || 0) + ")");
                (l(k) || l(x)) && a.push("scale(" + h(k, 1) + " " + h(x, 1) + ")");
                a.length && r.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, k, x) {
                var c, f, e, q, t = {};
                f = this.renderer;
                e = f.alignedObjects;
                var L, d;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = k, !x || r(x)) this.alignTo = c = x || "renderer", b(e, this), e.push(this), x = null
                } else a = this.alignOptions, k = this.alignByTranslate, c = this.alignTo;
                x = h(x, f[c], f);
                c = a.align;
                f = a.verticalAlign;
                e = (x.x || 0) + (a.x || 0);
                q = (x.y || 0) + (a.y || 0);
                "right" === c ? L = 1 : "center" === c && (L = 2);
                L && (e += (x.width - (a.width || 0)) / L);
                t[k ? "translateX" : "x"] = Math.round(e);
                "bottom" === f ? d = 1 : "middle" === f && (d = 2);
                d && (q += (x.height - (a.height || 0)) / d);
                t[k ? "translateY" :
                    "y"] = Math.round(q);
                this[this.placed ? "animate" : "attr"](t);
                this.placed = !0;
                this.alignAttr = t;
                return this
            },
            getBBox: function(a, b) {
                var k, x = this.renderer,
                    c, f = this.element,
                    r = this.styles,
                    t, L = this.textStr,
                    d, z = x.cache,
                    I = x.cacheKeys,
                    u;
                b = h(b, this.rotation);
                c = b * e;
                t = f && A.prototype.getStyle.call(f, "font-size");
                l(L) && (u = L.toString(), -1 === u.indexOf("\x3c") && (u = u.replace(/[0-9]/g, "0")), u += ["", b || 0, t, this.textWidth, r && r.textOverflow].join());
                u && !a && (k = z[u]);
                if (!k) {
                    if (f.namespaceURI === this.SVG_NS || x.forExport) {
                        try {
                            (d =
                                this.fakeTS && function(a) {
                                    n(f.querySelectorAll(".highcharts-text-outline"), function(b) {
                                        b.style.display = a
                                    })
                                }) && d("none"), k = f.getBBox ? q({}, f.getBBox()) : {
                                width: f.offsetWidth,
                                height: f.offsetHeight
                            }, d && d("")
                        } catch (V) {}
                        if (!k || 0 > k.width) k = {
                            width: 0,
                            height: 0
                        }
                    } else k = this.htmlGetBBox();
                    x.isSVG && (a = k.width, x = k.height, r && "11px" === r.fontSize && 17 === Math.round(x) && (k.height = x = 14), b && (k.width = Math.abs(x * Math.sin(c)) + Math.abs(a * Math.cos(c)), k.height = Math.abs(x * Math.cos(c)) + Math.abs(a * Math.sin(c))));
                    if (u && 0 < k.height) {
                        for (; 250 <
                            I.length;) delete z[I.shift()];
                        z[u] || I.push(u);
                        z[u] = k
                    }
                }
                return k
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var b = this.renderer,
                    h = this.element,
                    k;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) k =
                    this.zIndexSetter();
                k || (a ? a.element : b.box).appendChild(h);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    h = a.element || {},
                    k = a.renderer.isSVG && "SPAN" === h.nodeName && a.parentGroup,
                    x = h.ownerSVGElement,
                    c = a.clipPath;
                h.onclick = h.onmouseout = h.onmouseover = h.onmousemove = h.point = null;
                I(a);
                c && x && (n(x.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                    var b = a.getAttribute("clip-path"),
                        h = c.element.id;
                    (-1 < b.indexOf("(#" +
                        h + ")") || -1 < b.indexOf('("#' + h + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = c.destroy());
                if (a.stops) {
                    for (x = 0; x < a.stops.length; x++) a.stops[x] = a.stops[x].destroy();
                    a.stops = null
                }
                for (a.safeRemoveChild(h); k && k.div && 0 === k.div.childNodes.length;) h = k.parentGroup, a.safeRemoveChild(k.div), delete k.div, k = h;
                a.alignTo && b(a.renderer.alignedObjects, a);
                M(a, function(b, h) {
                    delete a[h]
                });
                return null
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = h(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, b, h) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[b] !== a && (h.setAttribute(b, a), this[b] = a)
            },
            alignSetter: function(a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function(a, b, h) {
                this[b] = a;
                h.setAttribute(b, a)
            },
            titleSetter: function(a) {
                var b =
                    this.element.getElementsByTagName("title")[0];
                b || (b = y.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(y.createTextNode(String(h(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, b, h) {
                "string" === typeof a ? h.setAttribute(b, a) : a && this.complexColor(a, b, h)
            },
            visibilitySetter: function(a,
                b, h) {
                "inherit" === a ? h.removeAttribute(b) : this[b] !== a && h.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function(a, b) {
                var h = this.renderer,
                    k = this.parentGroup,
                    c = (k || h).element || h.box,
                    f, e = this.element,
                    r, q, h = c === h.box;
                f = this.added;
                var t;
                l(a) ? (e.setAttribute("data-z-index", a), a = +a, this[b] === a && (f = !1)) : l(this[b]) && e.removeAttribute("data-z-index");
                this[b] = a;
                if (f) {
                    (a = this.zIndex) && k && (k.handleZ = !0);
                    b = c.childNodes;
                    for (t = b.length - 1; 0 <= t && !r; t--)
                        if (k = b[t], f = k.getAttribute("data-z-index"), q = !l(f), k !== e)
                            if (0 > a && q &&
                                !h && !t) c.insertBefore(e, b[t]), r = !0;
                            else if (x(f) <= a || q && (!l(a) || 0 <= a)) c.insertBefore(e, b[t + 1] || null), r = !0;
                    r || (c.insertBefore(e, b[h ? 3 : 0] || null), r = !0)
                }
                return r
            },
            _defaultSetter: function(a, b, h) {
                h.setAttribute(b, a)
            }
        });
        A.prototype.yGetter = A.prototype.xGetter;
        A.prototype.translateXSetter = A.prototype.translateYSetter = A.prototype.rotationSetter = A.prototype.verticalAlignSetter = A.prototype.rotationOriginXSetter = A.prototype.rotationOriginYSetter = A.prototype.scaleXSetter = A.prototype.scaleYSetter = A.prototype.matrixSetter =
            function(a, b) {
                this[b] = a;
                this.doTransform = !0
            };
        C = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        q(C.prototype, {
            Element: A,
            SVG_NS: Q,
            init: function(a, b, h, k, x, c) {
                var f;
                k = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                });
                f = k.element;
                a.appendChild(f);
                g(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && g(f, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = f;
                this.boxWrapper = k;
                this.alignedObjects = [];
                this.url = (D || B) && y.getElementsByTagName("base").length ? P.location.href.replace(/#.*?$/,
                    "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 6.1.1"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = c;
                this.forExport = x;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, h, !1);
                var e;
                D && a.getBoundingClientRect && (b = function() {
                    w(a, {
                        left: 0,
                        top: 0
                    });
                    e = a.getBoundingClientRect();
                    w(a, {
                        left: Math.ceil(e.left) - e.left + "px",
                        top: Math.ceil(e.top) -
                            e.top + "px"
                    })
                }, b(), this.unSubPixelFix = E(P, "resize", b))
            },
            definition: function(a) {
                function b(a, x) {
                    var c;
                    n(k(a), function(a) {
                        var k = h.createElement(a.tagName),
                            f = {};
                        M(a, function(a, b) {
                            "tagName" !== b && "children" !== b && "textContent" !== b && (f[b] = a)
                        });
                        k.attr(f);
                        k.add(x || h.defs);
                        a.textContent && k.element.appendChild(y.createTextNode(a.textContent));
                        b(a.children || [], k);
                        c = k
                    });
                    return c
                }
                var h = this;
                return b(a)
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                c(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: G,
            getRadialAttr: function(a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            getSpanWidth: function(a) {
                return a.getBBox(!0).width
            },
            applyEllipsis: function(a, b, h, k) {
                var x = a.rotation,
                    c = h,
                    f, e = 0,
                    r = h.length,
                    q = function(a) {
                        b.removeChild(b.firstChild);
                        a && b.appendChild(y.createTextNode(a))
                    },
                    t;
                a.rotation = 0;
                c = this.getSpanWidth(a, b);
                if (t = c > k) {
                    for (; e <= r;) f = Math.ceil((e + r) / 2), c = h.substring(0, f) + "\u2026", q(c), c = this.getSpanWidth(a, b), e === r ? e = r + 1 : c > k ? r = f - 1 : e = f;
                    0 === r && q("")
                }
                a.rotation = x;
                return t
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function(a) {
                var b = a.element,
                    k = this,
                    c = k.forExport,
                    e = h(a.textStr, "").toString(),
                    r = -1 !== e.indexOf("\x3c"),
                    q = b.childNodes,
                    t, d = g(b, "x"),
                    z = a.styles,
                    I = a.textWidth,
                    l =
                    z && z.lineHeight,
                    u = z && z.textOutline,
                    N = z && "ellipsis" === z.textOverflow,
                    B = z && "nowrap" === z.whiteSpace,
                    D, G = q.length,
                    H = I && !a.added && this.box,
                    L = function(a) {
                        return l ? x(l) : k.fontMetrics(void 0, a.getAttribute("style") ? a : b).h
                    },
                    v = function(a, b) {
                        M(k.escapes, function(h, k) {
                            b && -1 !== F(h, b) || (a = a.toString().replace(new RegExp(h, "g"), k))
                        });
                        return a
                    },
                    m = function(a, b) {
                        var h;
                        h = a.indexOf("\x3c");
                        a = a.substring(h, a.indexOf("\x3e") - h);
                        h = a.indexOf(b + "\x3d");
                        if (-1 !== h && (h = h + b.length + 1, b = a.charAt(h), '"' === b || "'" === b)) return a = a.substring(h +
                            1), a.substring(0, a.indexOf(b))
                    },
                    z = [e, N, B, l, u, z && z.fontSize, I].join();
                if (z !== a.textCache) {
                    for (a.textCache = z; G--;) b.removeChild(q[G]);
                    r || u || N || I || -1 !== e.indexOf(" ") ? (H && H.appendChild(b), e = r ? e.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [e], e = f(e, function(a) {
                        return "" !== a
                    }), n(e, function(h, x) {
                        var f, e = 0;
                        h = h.replace(/^\s+|\s+$/g,
                            "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        f = h.split("|||");
                        n(f, function(h) {
                            if ("" !== h || 1 === f.length) {
                                var r = {},
                                    q = y.createElementNS(k.SVG_NS, "tspan"),
                                    z, n;
                                (z = m(h, "class")) && g(q, "class", z);
                                if (z = m(h, "style")) z = z.replace(/(;| |^)color([ :])/, "$1fill$2"), g(q, "style", z);
                                (n = m(h, "href")) && !c && (g(q, "onclick", 'location.href\x3d"' + n + '"'), g(q, "class", "highcharts-anchor"));
                                h = v(h.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== h) {
                                    q.appendChild(y.createTextNode(h));
                                    e ? r.dx = 0 : x &&
                                        null !== d && (r.x = d);
                                    g(q, r);
                                    b.appendChild(q);
                                    !e && D && (!T && c && w(q, {
                                        display: "block"
                                    }), g(q, "dy", L(q)));
                                    if (I) {
                                        r = h.replace(/([^\^])-/g, "$1- ").split(" ");
                                        n = 1 < f.length || x || 1 < r.length && !B;
                                        var l = [],
                                            u, F = L(q),
                                            G = a.rotation;
                                        for (N && (t = k.applyEllipsis(a, q, h, I)); !N && n && (r.length || l.length);) a.rotation = 0, u = k.getSpanWidth(a, q), h = u > I, void 0 === t && (t = h), h && 1 !== r.length ? (q.removeChild(q.firstChild), l.unshift(r.pop())) : (r = l, l = [], r.length && !B && (q = y.createElementNS(Q, "tspan"), g(q, {
                                                dy: F,
                                                x: d
                                            }), z && g(q, "style", z), b.appendChild(q)),
                                            u > I && (I = u + 1)), r.length && q.appendChild(y.createTextNode(r.join(" ").replace(/- /g, "-")));
                                        a.rotation = G
                                    }
                                    e++
                                }
                            }
                        });
                        D = D || b.childNodes.length
                    }), N && t && a.attr("title", v(a.textStr, ["\x26lt;", "\x26gt;"])), H && H.removeChild(b), u && a.applyTextOutline && a.applyTextOutline(u)) : b.appendChild(y.createTextNode(v(e)))
                }
            },
            getContrast: function(a) {
                a = m(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, b, h, k, x, c, f, e, r) {
                var q = this.label(a, b, h, r, null, null, null, null, "button"),
                    t = 0;
                q.attr(z({
                        padding: 8,
                        r: 2
                    },
                    x));
                E(q.element, H ? "mouseover" : "mouseenter", function() {
                    3 !== t && q.setState(1)
                });
                E(q.element, H ? "mouseout" : "mouseleave", function() {
                    3 !== t && q.setState(t)
                });
                q.setState = function(a) {
                    1 !== a && (q.state = t = a);
                    q.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0])
                };
                return q.on("click", function(a) {
                    3 !== t && k.call(q, a)
                })
            },
            crispLine: function(a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) +
                    b % 2 / 2);
                return a
            },
            path: function(a) {
                var b = {};
                J(a) ? b.d = a : u(a) && q(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function(a, b, h) {
                a = u(a) ? a : {
                    x: a,
                    y: b,
                    r: h
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function(a, b, h) {
                    h.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function(a, b, h, k, x, c) {
                u(a) ? (k = a, b = k.y, h = k.r, a = k.x) : k = {
                    innerR: k,
                    start: x,
                    end: c
                };
                a = this.symbol("arc", a, b, h, h, k);
                a.r = h;
                return a
            },
            rect: function(a, b, h, k, x, c) {
                x = u(a) ? a.r : x;
                c = this.createElement("rect");
                a = u(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(h,
                        0),
                    height: Math.max(k, 0)
                };
                x && (a.r = x);
                c.rSetter = function(a, b, h) {
                    g(h, {
                        rx: a,
                        ry: a
                    })
                };
                return c.attr(a)
            },
            setSize: function(a, b, k) {
                var x = this.alignedObjects,
                    c = x.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                        width: a,
                        height: b
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: h(k, !0) ? void 0 : 0
                    }); c--;) x[c].align()
            },
            g: function(a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function(a, b, h, k, x, c) {
                var f = {
                        preserveAspectRatio: "none"
                    },
                    e, r = function(a, b) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b)
                    },
                    t = function(b) {
                        r(e.element, a);
                        c.call(e, b)
                    };
                1 < arguments.length && q(f, {
                    x: b,
                    y: h,
                    width: k,
                    height: x
                });
                e = this.createElement("image").attr(f);
                c ? (r(e.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), f = new P.Image, E(f, "load", t), f.src = a, f.complete && t({})) : r(e.element, a);
                return e
            },
            symbol: function(a, b, k, x, c, f) {
                var e = this,
                    r, t = /^url\((.*?)\)$/,
                    z = t.test(a),
                    I = !z && (this.symbols[a] ? a : "circle"),
                    u = I && this.symbols[I],
                    N = l(b) && u && u.call(this.symbols, Math.round(b), Math.round(k), x, c, f),
                    B, D;
                u ? (r = this.path(N), q(r, {
                    symbolName: I,
                    x: b,
                    y: k,
                    width: x,
                    height: c
                }), f && q(r, f)) : z && (B = a.match(t)[1], r = this.image(B), r.imgwidth = h(O[B] && O[B].width, f && f.width), r.imgheight = h(O[B] && O[B].height, f && f.height), D = function() {
                    r.attr({
                        width: r.width,
                        height: r.height
                    })
                }, n(["width", "height"], function(a) {
                    r[a + "Setter"] = function(a, b) {
                        var h = {},
                            k = this["img" + b],
                            x = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        l(k) && (this.element && this.element.setAttribute(b, k), this.alignByTranslate || (h[x] = ((this[b] || 0) - k) / 2, this.attr(h)))
                    }
                }), l(b) && r.attr({
                    x: b,
                    y: k
                }), r.isImg = !0, l(r.imgwidth) && l(r.imgheight) ? D() : (r.attr({
                    width: 0,
                    height: 0
                }), v("img", {
                    onload: function() {
                        var a = d[e.chartIndex];
                        0 === this.width && (w(this, {
                            position: "absolute",
                            top: "-999em"
                        }), y.body.appendChild(this));
                        O[B] = {
                            width: this.width,
                            height: this.height
                        };
                        r.imgwidth = this.width;
                        r.imgheight = this.height;
                        r.element && D();
                        this.parentNode && this.parentNode.removeChild(this);
                        e.imgCount--;
                        if (!e.imgCount && a && a.onload) a.onload()
                    },
                    src: B
                }), this.imgCount++));
                return r
            },
            symbols: {
                circle: function(a, b, h, k) {
                    return this.arc(a + h / 2, b + k / 2, h / 2, k / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function(a, b, h, k) {
                    return ["M", a, b, "L", a + h, b, a + h, b + k, a, b + k, "Z"]
                },
                triangle: function(a, b, h, k) {
                    return ["M", a + h / 2, b, "L", a + h, b + k, a, b + k, "Z"]
                },
                "triangle-down": function(a, b, h, k) {
                    return ["M", a, b, "L", a + h, b, a + h / 2, b + k, "Z"]
                },
                diamond: function(a, b, h, k) {
                    return ["M", a + h / 2, b, "L", a + h, b + k / 2, a + h / 2, b + k, a, b + k / 2, "Z"]
                },
                arc: function(a,
                    b, k, x, c) {
                    var f = c.start,
                        e = c.r || k,
                        r = c.r || x || k,
                        q = c.end - .001;
                    k = c.innerR;
                    x = h(c.open, .001 > Math.abs(c.end - c.start - 2 * Math.PI));
                    var t = Math.cos(f),
                        z = Math.sin(f),
                        d = Math.cos(q),
                        q = Math.sin(q);
                    c = .001 > c.end - f - Math.PI ? 0 : 1;
                    e = ["M", a + e * t, b + r * z, "A", e, r, 0, c, 1, a + e * d, b + r * q];
                    l(k) && e.push(x ? "M" : "L", a + k * d, b + k * q, "A", k, k, 0, c, 0, a + k * t, b + k * z);
                    e.push(x ? "" : "Z");
                    return e
                },
                callout: function(a, b, h, k, x) {
                    var c = Math.min(x && x.r || 0, h, k),
                        f = c + 6,
                        e = x && x.anchorX;
                    x = x && x.anchorY;
                    var r;
                    r = ["M", a + c, b, "L", a + h - c, b, "C", a + h, b, a + h, b, a + h, b + c, "L", a + h, b + k -
                        c, "C", a + h, b + k, a + h, b + k, a + h - c, b + k, "L", a + c, b + k, "C", a, b + k, a, b + k, a, b + k - c, "L", a, b + c, "C", a, b, a, b, a + c, b
                    ];
                    e && e > h ? x > b + f && x < b + k - f ? r.splice(13, 3, "L", a + h, x - 6, a + h + 6, x, a + h, x + 6, a + h, b + k - c) : r.splice(13, 3, "L", a + h, k / 2, e, x, a + h, k / 2, a + h, b + k - c) : e && 0 > e ? x > b + f && x < b + k - f ? r.splice(33, 3, "L", a, x + 6, a - 6, x, a, x - 6, a, b + c) : r.splice(33, 3, "L", a, k / 2, e, x, a, k / 2, a, b + c) : x && x > k && e > a + f && e < a + h - f ? r.splice(23, 3, "L", e + 6, b + k, e, b + k + 6, e - 6, b + k, a + c, b + k) : x && 0 > x && e > a + f && e < a + h - f && r.splice(3, 3, "L", e - 6, b, e, b - 6, e + 6, b, h - c, b);
                    return r
                }
            },
            clipRect: function(b, h, k,
                x) {
                var c = a.uniqueKey(),
                    f = this.createElement("clipPath").attr({
                        id: c
                    }).add(this.defs);
                b = this.rect(b, h, k, x, 0).add(f);
                b.id = c;
                b.clipPath = f;
                b.count = 0;
                return b
            },
            text: function(a, b, h, k) {
                var x = {};
                if (k && (this.allowHTML || !this.forExport)) return this.html(a, b, h);
                x.x = Math.round(b || 0);
                h && (x.y = Math.round(h));
                if (a || 0 === a) x.text = a;
                a = this.createElement("text").attr(x);
                k || (a.xSetter = function(a, b, h) {
                    var k = h.getElementsByTagName("tspan"),
                        x, c = h.getAttribute(b),
                        f;
                    for (f = 0; f < k.length; f++) x = k[f], x.getAttribute(b) === c && x.setAttribute(b,
                        a);
                    h.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function(a, b) {
                a = b && A.prototype.getStyle.call(b, "font-size");
                a = /px/.test(a) ? x(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b,
                    b: Math.round(.8 * b),
                    f: a
                }
            },
            rotCorr: function(a, b, h) {
                var k = a;
                b && h && (k = Math.max(k * Math.cos(b * e), 4));
                return {
                    x: -a / 3 * Math.sin(b * e),
                    y: k
                }
            },
            label: function(b, h, k, x, c, f, e, r, t) {
                var d = this,
                    I = d.g("button" !== t && "label"),
                    u = I.text = d.text("", 0, 0, e).attr({
                        zIndex: 1
                    }),
                    B, D, g = 0,
                    F = 3,
                    y =
                    0,
                    G, T, w, H, v, Q = {},
                    m, J = /^url\((.*?)\)$/.test(x),
                    M = J,
                    p, O, P, L;
                t && I.addClass("highcharts-" + t);
                M = !0;
                p = function() {
                    return B.strokeWidth() % 2 / 2
                };
                O = function() {
                    var a = u.element.style,
                        b = {};
                    D = (void 0 === G || void 0 === T || v) && l(u.textStr) && u.getBBox();
                    I.width = (G || D.width || 0) + 2 * F + y;
                    I.height = (T || D.height || 0) + 2 * F;
                    m = F + d.fontMetrics(a && a.fontSize, u).b;
                    M && (B || (I.box = B = d.symbols[x] || J ? d.symbol(x) : d.rect(), B.addClass(("button" === t ? "" : "highcharts-label-box") + (t ? " highcharts-" + t + "-box" : "")), B.add(I), a = p(), b.x = a, b.y = (r ? -m : 0) + a),
                        b.width = Math.round(I.width), b.height = Math.round(I.height), B.attr(q(b, Q)), Q = {})
                };
                P = function() {
                    var a = y + F,
                        b;
                    b = r ? 0 : m;
                    l(G) && D && ("center" === v || "right" === v) && (a += {
                        center: .5,
                        right: 1
                    }[v] * (G - D.width));
                    if (a !== u.x || b !== u.y) u.attr("x", a), u.hasBoxWidthChanged && (D = u.getBBox(!0), O()), void 0 !== b && u.attr("y", b);
                    u.x = a;
                    u.y = b
                };
                L = function(a, b) {
                    B ? B.attr(a, b) : Q[a] = b
                };
                I.onAdd = function() {
                    u.add(I);
                    I.attr({
                        text: b || 0 === b ? b : "",
                        x: h,
                        y: k
                    });
                    B && l(c) && I.attr({
                        anchorX: c,
                        anchorY: f
                    })
                };
                I.widthSetter = function(b) {
                    G = a.isNumber(b) ? b : null
                };
                I.heightSetter = function(a) {
                    T = a
                };
                I["text-alignSetter"] = function(a) {
                    v = a
                };
                I.paddingSetter = function(a) {
                    l(a) && a !== F && (F = I.padding = a, P())
                };
                I.paddingLeftSetter = function(a) {
                    l(a) && a !== y && (y = a, P())
                };
                I.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== g && (g = a, D && I.attr({
                        x: w
                    }))
                };
                I.textSetter = function(a) {
                    void 0 !== a && u.textSetter(a);
                    O();
                    P()
                };
                I["stroke-widthSetter"] = function(a, b) {
                    a && (M = !0);
                    this["stroke-width"] = a;
                    L(b, a)
                };
                I.rSetter = function(a, b) {
                    L(b, a)
                };
                I.anchorXSetter = function(a, b) {
                    c = I.anchorX = a;
                    L(b, Math.round(a) -
                        p() - w)
                };
                I.anchorYSetter = function(a, b) {
                    f = I.anchorY = a;
                    L(b, a - H)
                };
                I.xSetter = function(a) {
                    I.x = a;
                    g && (a -= g * ((G || D.width) + 2 * F), I["forceAnimate:x"] = !0);
                    w = Math.round(a);
                    I.attr("translateX", w)
                };
                I.ySetter = function(a) {
                    H = I.y = Math.round(a);
                    I.attr("translateY", H)
                };
                var R = I.css;
                return q(I, {
                    css: function(a) {
                        if (a) {
                            var b = {};
                            a = z(a);
                            n(I.textProps, function(h) {
                                void 0 !== a[h] && (b[h] = a[h], delete a[h])
                            });
                            u.css(b);
                            "width" in b && O()
                        }
                        return R.call(I, a)
                    },
                    getBBox: function() {
                        return {
                            width: D.width + 2 * F,
                            height: D.height + 2 * F,
                            x: D.x - F,
                            y: D.y -
                                F
                        }
                    },
                    destroy: function() {
                        N(I.element, "mouseenter");
                        N(I.element, "mouseleave");
                        u && (u = u.destroy());
                        B && (B = B.destroy());
                        A.prototype.destroy.call(I);
                        I = d = O = P = L = null
                    }
                })
            }
        });
        a.Renderer = C
    })(K);
    (function(a) {
        var A = a.attr,
            C = a.createElement,
            E = a.css,
            p = a.defined,
            g = a.each,
            d = a.extend,
            m = a.isFirefox,
            w = a.isMS,
            v = a.isWebKit,
            l = a.pick,
            e = a.pInt,
            c = a.SVGRenderer,
            y = a.win,
            n = a.wrap;
        d(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.htmlUpdateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = d(this.styles, a);
                E(this.element, a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        c = this.x || 0,
                        t = this.y || 0,
                        d = this.textAlign || "left",
                        n = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[d],
                        l = this.styles,
                        y = l && l.whiteSpace;
                    E(b, {
                        marginLeft: this.translateX || 0,
                        marginTop: this.translateY ||
                            0
                    });
                    this.inverted && g(b.childNodes, function(c) {
                        a.invertChild(c, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var l = this.rotation,
                            u = this.textWidth && e(this.textWidth),
                            r = [l, d, b.innerHTML, this.textWidth, this.textAlign].join(),
                            B;
                        (B = u !== this.oldTextWidth) && !(B = u > this.oldTextWidth) && ((B = this.textPxLength) || (E(b, {
                            width: "",
                            whiteSpace: y || "nowrap"
                        }), B = b.offsetWidth), B = B > u);
                        B && /[ \-]/.test(b.textContent || b.innerText) ? (E(b, {
                            width: u + "px",
                            display: "block",
                            whiteSpace: y || "normal"
                        }), this.oldTextWidth = u, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        r !== this.cTT && (y = a.fontMetrics(b.style.fontSize).b, p(l) && l !== (this.oldRotation || 0) && this.setSpanRotation(l, n, y), this.getSpanCorrection(!p(l) && this.textPxLength || b.offsetWidth, y, n, l, d));
                        E(b, {
                            left: c + (this.xCorr || 0) + "px",
                            top: t + (this.yCorr || 0) + "px"
                        });
                        this.cTT = r;
                        this.oldRotation = l
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, b, c) {
                var f = {},
                    e = this.renderer.getTransformKey();
                f[e] = f.transform = "rotate(" + a + "deg)";
                f[e + (m ? "Origin" : "-origin")] = f.transformOrigin = 100 * b + "% " + c + "px";
                E(this.element, f)
            },
            getSpanCorrection: function(a,
                b, c) {
                this.xCorr = -a * c;
                this.yCorr = -b
            }
        });
        d(c.prototype, {
            getTransformKey: function() {
                return w && !/Edge/.test(y.navigator.userAgent) ? "-ms-transform" : v ? "-webkit-transform" : m ? "MozTransform" : y.opera ? "-o-transform" : ""
            },
            html: function(a, b, c) {
                var f = this.createElement("span"),
                    e = f.element,
                    q = f.renderer,
                    D = q.isSVG,
                    y = function(a, b) {
                        g(["opacity", "visibility"], function(c) {
                            n(a, c + "Setter", function(a, c, f, h) {
                                a.call(this, c, f, h);
                                b[f] = c
                            })
                        });
                        a.addedSetters = !0
                    };
                f.textSetter = function(a) {
                    a !== e.innerHTML && delete this.bBox;
                    this.textStr =
                        a;
                    e.innerHTML = l(a, "");
                    f.doTransform = !0
                };
                D && y(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function(a, b) {
                    "align" === b && (b = "textAlign");
                    f[b] = a;
                    f.doTransform = !0
                };
                f.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                f.attr({
                    text: a,
                    x: Math.round(b),
                    y: Math.round(c)
                }).css({
                    position: "absolute"
                });
                e.style.whiteSpace = "nowrap";
                f.css = f.htmlCss;
                D && (f.add = function(a) {
                    var b, c = q.box.parentNode,
                        t = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) t.push(a),
                                a = a.parentGroup;
                            g(t.reverse(), function(a) {
                                function e(b, k) {
                                    a[k] = b;
                                    "translateX" === k ? h.left = b + "px" : h.top = b + "px";
                                    a.doTransform = !0
                                }
                                var h, x = A(a.element, "class");
                                x && (x = {
                                    className: x
                                });
                                b = a.div = a.div || C("div", x, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || c);
                                h = b.style;
                                d(a, {
                                    classSetter: function(a) {
                                        return function(b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(b),
                                    on: function() {
                                        t[0].div &&
                                            f.on.apply({
                                                element: t[0].div
                                            }, arguments);
                                        return a
                                    },
                                    translateXSetter: e,
                                    translateYSetter: e
                                });
                                a.addedSetters || y(a, h)
                            })
                        }
                    } else b = c;
                    b.appendChild(e);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f
                });
                return f
            }
        })
    })(K);
    (function(a) {
        var A = a.defined,
            C = a.each,
            E = a.extend,
            p = a.merge,
            g = a.pick,
            d = a.timeUnits,
            m = a.win;
        a.Time = function(a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function(d) {
                var w = g(d && d.useUTC, !0),
                    l = this;
                this.options = d = p(!0, this.options || {}, d);
                this.Date = d.Date || m.Date;
                this.timezoneOffset =
                    (this.useUTC = w) && d.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(w && !d.getTimezoneOffset && !d.timezone)) || this.timezoneOffset ? (this.get = function(a, c) {
                    var e = c.getTime(),
                        d = e - l.getTimezoneOffset(c);
                    c.setTime(d);
                    a = c["getUTC" + a]();
                    c.setTime(e);
                    return a
                }, this.set = function(e, c, d) {
                    var n;
                    if (-1 !== a.inArray(e, ["Milliseconds", "Seconds", "Minutes"])) c["set" + e](d);
                    else n = l.getTimezoneOffset(c), n = c.getTime() - n, c.setTime(n), c["setUTC" + e](d), e = l.getTimezoneOffset(c), n =
                        c.getTime() + e, c.setTime(n)
                }) : w ? (this.get = function(a, c) {
                    return c["getUTC" + a]()
                }, this.set = function(a, c, d) {
                    return c["setUTC" + a](d)
                }) : (this.get = function(a, c) {
                    return c["get" + a]()
                }, this.set = function(a, c, d) {
                    return c["set" + a](d)
                })
            },
            makeTime: function(d, v, l, e, c, y) {
                var n, q, b;
                this.useUTC ? (n = this.Date.UTC.apply(0, arguments), q = this.getTimezoneOffset(n), n += q, b = this.getTimezoneOffset(n), q !== b ? n += b - q : q - 36E5 !== this.getTimezoneOffset(n - 36E5) || a.isSafari || (n -= 36E5)) : n = (new this.Date(d, v, g(l, 1), g(e, 0), g(c, 0), g(y, 0))).getTime();
                return n
            },
            timezoneOffsetFunction: function() {
                var d = this,
                    g = this.options,
                    l = m.moment;
                if (!this.useUTC) return function(a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (g.timezone) {
                    if (l) return function(a) {
                        return 6E4 * -l.tz(a, g.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && g.getTimezoneOffset ? function(a) {
                    return 6E4 * g.getTimezoneOffset(a)
                } : function() {
                    return 6E4 * (d.timezoneOffset || 0)
                }
            },
            dateFormat: function(d, g, l) {
                if (!a.defined(g) || isNaN(g)) return a.defaultOptions.lang.invalidDate || "";
                d = a.pick(d, "%Y-%m-%d %H:%M:%S");
                var e = this,
                    c = new this.Date(g),
                    y = this.get("Hours", c),
                    n = this.get("Day", c),
                    q = this.get("Date", c),
                    b = this.get("Month", c),
                    f = this.get("FullYear", c),
                    t = a.defaultOptions.lang,
                    F = t.weekdays,
                    w = t.shortWeekdays,
                    D = a.pad,
                    c = a.extend({
                        a: w ? w[n] : F[n].substr(0, 3),
                        A: F[n],
                        d: D(q),
                        e: D(q, 2, " "),
                        w: n,
                        b: t.shortMonths[b],
                        B: t.months[b],
                        m: D(b + 1),
                        o: b + 1,
                        y: f.toString().substr(2, 2),
                        Y: f,
                        H: D(y),
                        k: y,
                        I: D(y % 12 || 12),
                        l: y % 12 || 12,
                        M: D(e.get("Minutes", c)),
                        p: 12 > y ? "AM" : "PM",
                        P: 12 > y ? "am" : "pm",
                        S: D(c.getSeconds()),
                        L: D(Math.round(g % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(c, function(a, b) {
                    for (; - 1 !== d.indexOf("%" + b);) d = d.replace("%" + b, "function" === typeof a ? a.call(e, g) : a)
                });
                return l ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
            },
            getTimeTicks: function(a, v, l, e) {
                var c = this,
                    y = [],
                    n = {},
                    q, b = new c.Date(v),
                    f = a.unitRange,
                    t = a.count || 1,
                    F;
                if (A(v)) {
                    c.set("Milliseconds", b, f >= d.second ? 0 : t * Math.floor(c.get("Milliseconds", b) / t));
                    f >= d.second && c.set("Seconds", b, f >= d.minute ? 0 : t * Math.floor(c.get("Seconds", b) / t));
                    f >= d.minute && c.set("Minutes", b, f >= d.hour ? 0 : t * Math.floor(c.get("Minutes",
                        b) / t));
                    f >= d.hour && c.set("Hours", b, f >= d.day ? 0 : t * Math.floor(c.get("Hours", b) / t));
                    f >= d.day && c.set("Date", b, f >= d.month ? 1 : t * Math.floor(c.get("Date", b) / t));
                    f >= d.month && (c.set("Month", b, f >= d.year ? 0 : t * Math.floor(c.get("Month", b) / t)), q = c.get("FullYear", b));
                    f >= d.year && c.set("FullYear", b, q - q % t);
                    f === d.week && c.set("Date", b, c.get("Date", b) - c.get("Day", b) + g(e, 1));
                    q = c.get("FullYear", b);
                    e = c.get("Month", b);
                    var w = c.get("Date", b),
                        D = c.get("Hours", b);
                    v = b.getTime();
                    c.variableTimezone && (F = l - v > 4 * d.month || c.getTimezoneOffset(v) !==
                        c.getTimezoneOffset(l));
                    b = b.getTime();
                    for (v = 1; b < l;) y.push(b), b = f === d.year ? c.makeTime(q + v * t, 0) : f === d.month ? c.makeTime(q, e + v * t) : !F || f !== d.day && f !== d.week ? F && f === d.hour && 1 < t ? c.makeTime(q, e, w, D + v * t) : b + f * t : c.makeTime(q, e, w + v * t * (f === d.day ? 1 : 7)), v++;
                    y.push(b);
                    f <= d.hour && 1E4 > y.length && C(y, function(a) {
                        0 === a % 18E5 && "000000000" === c.dateFormat("%H%M%S%L", a) && (n[a] = "day")
                    })
                }
                y.info = E(a, {
                    higherRanks: n,
                    totalRange: f * t
                });
                return y
            }
        }
    })(K);
    (function(a) {
        var A = a.merge;
        a.defaultOptions = {
            symbols: ["circle", "diamond", "square",
                "triangle", "triangle-down"
            ],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {},
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {}
            },
            loading: {},
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat: '\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cspan class\x3d"highcharts-strong"\x3e{point.y}\x3c/span\x3e\x3cbr/\x3e'
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(C) {
            a.defaultOptions = A(!0, a.defaultOptions, C);
            a.time.update(A(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(A(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function(A, E, p) {
            return a.time.dateFormat(A, E, p)
        }
    })(K);
    (function(a) {
        var A = a.correctFloat,
            C = a.defined,
            E = a.destroyObjectProperties,
            p = a.fireEvent,
            g = a.isNumber,
            d = a.pick,
            m = a.deg2rad;
        a.Tick = function(a, d, l, e) {
            this.axis = a;
            this.pos = d;
            this.type = l || "";
            this.isNewLabel = this.isNew = !0;
            l || e || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    g = a.options,
                    l = a.chart,
                    e =
                    a.categories,
                    c = a.names,
                    y = this.pos,
                    n = g.labels,
                    q = a.tickPositions,
                    b = y === q[0],
                    f = y === q[q.length - 1],
                    c = e ? d(e[y], c[y], y) : y,
                    e = this.label,
                    q = q.info,
                    t;
                a.isDatetimeAxis && q && (t = g.dateTimeLabelFormats[q.higherRanks[y] || q.unitName]);
                this.isFirst = b;
                this.isLast = f;
                g = a.labelFormatter.call({
                    axis: a,
                    chart: l,
                    isFirst: b,
                    isLast: f,
                    dateTimeLabelFormat: t,
                    value: a.isLog ? A(a.lin2log(c)) : c,
                    pos: y
                });
                if (C(e)) e && e.attr({
                    text: g
                });
                else {
                    if (this.label = e = C(g) && n.enabled ? l.renderer.text(g, 0, 0, n.useHTML).add(a.labelGroup) : null) e.textPxLength =
                        e.getBBox().width;
                    this.rotation = 0
                }
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var g = this.axis,
                    l = g.options.labels,
                    e = a.x,
                    c = g.chart.chartWidth,
                    y = g.chart.spacing,
                    n = d(g.labelLeft, Math.min(g.pos, y[3])),
                    y = d(g.labelRight, Math.max(g.isRadial ? 0 : g.pos + g.len, c - y[1])),
                    q = this.label,
                    b = this.rotation,
                    f = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[g.labelAlign || q.attr("align")],
                    t = q.getBBox().width,
                    F = g.getSlotWidth(this),
                    w = F,
                    D = 1,
                    H, u = {};
                if (b || !1 === l.overflow) 0 >
                    b && e - f * t < n ? H = Math.round(e / Math.cos(b * m) - n) : 0 < b && e + f * t > y && (H = Math.round((c - e) / Math.cos(b * m)));
                else if (c = e + (1 - f) * t, e - f * t < n ? w = a.x + w * (1 - f) - n : c > y && (w = y - a.x + w * f, D = -1), w = Math.min(F, w), w < F && "center" === g.labelAlign && (a.x += D * (F - w - f * (F - Math.min(t, w)))), t > w || g.autoRotation && (q.styles || {}).width) H = w;
                H && (u.width = H, (l.style || {}).textOverflow || (u.textOverflow = "ellipsis"), q.css(u))
            },
            getPosition: function(d, g, l, e) {
                var c = this.axis,
                    y = c.chart,
                    n = e && y.oldChartHeight || y.chartHeight;
                d = {
                    x: d ? a.correctFloat(c.translate(g + l, null,
                        null, e) + c.transB) : c.left + c.offset + (c.opposite ? (e && y.oldChartWidth || y.chartWidth) - c.right - c.left : 0),
                    y: d ? n - c.bottom + c.offset - (c.opposite ? c.height : 0) : a.correctFloat(n - c.translate(g + l, null, null, e) - c.transB)
                };
                p(this, "afterGetPosition", {
                    pos: d
                });
                return d
            },
            getLabelPosition: function(a, d, l, e, c, g, n, q) {
                var b = this.axis,
                    f = b.transA,
                    t = b.reversed,
                    F = b.staggerLines,
                    y = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    D = c.y,
                    H = e || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1),
                    u = {};
                C(D) || (D = 0 === b.side ? l.rotation ? -8 : -l.getBBox().height :
                    2 === b.side ? y.y + 8 : Math.cos(l.rotation * m) * (y.y - l.getBBox(!1, 0).height / 2));
                a = a + c.x + H + y.x - (g && e ? g * f * (t ? -1 : 1) : 0);
                d = d + D - (g && !e ? g * f * (t ? 1 : -1) : 0);
                F && (l = n / (q || 1) % F, b.opposite && (l = F - l - 1), d += b.labelOffset / F * l);
                u.x = a;
                u.y = Math.round(d);
                p(this, "afterGetLabelPosition", {
                    pos: u
                });
                return u
            },
            getMarkPath: function(a, d, l, e, c, g) {
                return g.crispLine(["M", a, d, "L", a + (c ? 0 : -l), d + (c ? l : 0)], e)
            },
            renderGridLine: function(a, d, l) {
                var e = this.axis,
                    c = this.gridLine,
                    g = {},
                    n = this.pos,
                    q = this.type,
                    b = e.tickmarkOffset,
                    f = e.chart.renderer;
                c || (q || (g.zIndex =
                    1), a && (g.opacity = 0), this.gridLine = c = f.path().attr(g).addClass("highcharts-" + (q ? q + "-" : "") + "grid-line").add(e.gridGroup));
                if (!a && c && (a = e.getPlotLinePath(n + b, c.strokeWidth() * l, a, !0))) c[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: d
                })
            },
            renderMark: function(a, d, l) {
                var e = this.axis,
                    c = e.chart.renderer,
                    g = this.type,
                    n = e.tickSize(g ? g + "Tick" : "tick"),
                    q = this.mark,
                    b = !q,
                    f = a.x;
                a = a.y;
                n && (e.opposite && (n[0] = -n[0]), b && (this.mark = q = c.path().addClass("highcharts-" + (g ? g + "-" : "") + "tick").add(e.axisGroup)), q[b ? "attr" : "animate"]({
                    d: this.getMarkPath(f,
                        a, n[0], q.strokeWidth() * l, e.horiz, c),
                    opacity: d
                }))
            },
            renderLabel: function(a, m, l, e) {
                var c = this.axis,
                    y = c.horiz,
                    n = c.options,
                    q = this.label,
                    b = n.labels,
                    f = b.step,
                    c = c.tickmarkOffset,
                    t = !0,
                    F = a.x;
                a = a.y;
                q && g(F) && (q.xy = a = this.getLabelPosition(F, a, q, y, b, c, e, f), this.isFirst && !this.isLast && !d(n.showFirstLabel, 1) || this.isLast && !this.isFirst && !d(n.showLastLabel, 1) ? t = !1 : !y || b.step || b.rotation || m || 0 === l || this.handleOverflow(a), f && e % f && (t = !1), t && g(a.y) ? (a.opacity = l, q[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) :
                    (q.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(g, m, l) {
                var e = this.axis,
                    c = e.horiz,
                    y = this.getPosition(c, this.pos, e.tickmarkOffset, m),
                    n = y.x,
                    q = y.y,
                    e = c && n === e.pos + e.len || !c && q === e.pos ? -1 : 1;
                l = d(l, 1);
                this.isActive = !0;
                this.renderGridLine(m, l, e);
                this.renderMark(y, l, e);
                this.renderLabel(y, m, l, g);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function() {
                E(this, this.axis)
            }
        }
    })(K);
    var U = function(a) {
        var A = a.addEvent,
            C = a.animObject,
            E = a.arrayMax,
            p = a.arrayMin,
            g = a.correctFloat,
            d = a.defaultOptions,
            m = a.defined,
            w = a.deg2rad,
            v = a.destroyObjectProperties,
            l = a.each,
            e = a.extend,
            c = a.fireEvent,
            y = a.format,
            n = a.getMagnitude,
            q = a.grep,
            b = a.inArray,
            f = a.isArray,
            t = a.isNumber,
            F = a.isString,
            J = a.merge,
            D = a.normalizeTickInterval,
            H = a.objectEach,
            u = a.pick,
            r = a.removeEvent,
            B = a.splat,
            z = a.syncTimeout,
            G = a.Tick,
            M = function() {
                this.init.apply(this, arguments)
            };
        a.extend(M.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    x: 0
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle"
                },
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    }
                }
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, x) {
                var h = x.isX,
                    k = this;
                k.chart = a;
                k.horiz = a.inverted && !k.isZAxis ? !h : h;
                k.isXAxis = h;
                k.coll = k.coll || (h ? "xAxis" : "yAxis");
                c(this, "init", {
                    userOptions: x
                });
                k.opposite = x.opposite;
                k.side = x.side || (k.horiz ? k.opposite ? 0 :
                    2 : k.opposite ? 1 : 3);
                k.setOptions(x);
                var f = this.options,
                    e = f.type;
                k.labelFormatter = f.labels.formatter || k.defaultLabelFormatter;
                k.userOptions = x;
                k.minPixelPadding = 0;
                k.reversed = f.reversed;
                k.visible = !1 !== f.visible;
                k.zoomEnabled = !1 !== f.zoomEnabled;
                k.hasNames = "category" === e || !0 === f.categories;
                k.categories = f.categories || k.hasNames;
                k.names || (k.names = [], k.names.keys = {});
                k.plotLinesAndBandsGroups = {};
                k.isLog = "logarithmic" === e;
                k.isDatetimeAxis = "datetime" === e;
                k.positiveValuesOnly = k.isLog && !k.allowNegativeLog;
                k.isLinked =
                    m(f.linkedTo);
                k.ticks = {};
                k.labelEdge = [];
                k.minorTicks = {};
                k.plotLinesAndBands = [];
                k.alternateBands = {};
                k.len = 0;
                k.minRange = k.userMinRange = f.minRange || f.maxZoom;
                k.range = f.range;
                k.offset = f.offset || 0;
                k.stacks = {};
                k.oldStacks = {};
                k.stacksTouched = 0;
                k.max = null;
                k.min = null;
                k.crosshair = u(f.crosshair, B(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);
                x = k.options.events; - 1 === b(k, a.axes) && (h ? a.axes.splice(a.xAxis.length, 0, k) : a.axes.push(k), a[k.coll].push(k));
                k.series = k.series || [];
                a.inverted && !k.isZAxis && h && void 0 === k.reversed &&
                    (k.reversed = !0);
                H(x, function(a, b) {
                    A(k, b, a)
                });
                k.lin2log = f.linearToLogConverter || k.lin2log;
                k.isLog && (k.val2lin = k.log2lin, k.lin2val = k.lin2log);
                c(this, "afterInit")
            },
            setOptions: function(a) {
                this.options = J(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], J(d[this.coll], a));
                c(this, "afterSetOptions", {
                    userOptions: a
                })
            },
            defaultLabelFormatter: function() {
                var b = this.axis,
                    x = this.value,
                    f = b.chart.time,
                    k = b.categories,
                    c = this.dateTimeLabelFormat,
                    e = d.lang,
                    r = e.numericSymbols,
                    e = e.numericSymbolMagnitude || 1E3,
                    q = r && r.length,
                    t, z = b.options.labels.format,
                    b = b.isLog ? Math.abs(x) : b.tickInterval;
                if (z) t = y(z, this, f);
                else if (k) t = x;
                else if (c) t = f.dateFormat(c, x);
                else if (q && 1E3 <= b)
                    for (; q-- && void 0 === t;) f = Math.pow(e, q + 1), b >= f && 0 === 10 * x % f && null !== r[q] && 0 !== x && (t = a.numberFormat(x / f, -1) + r[q]);
                void 0 === t && (t = 1E4 <= Math.abs(x) ? a.numberFormat(x, -1) : a.numberFormat(x, -1, void 0, ""));
                return t
            },
            getSeriesExtremes: function() {
                var a =
                    this,
                    b = a.chart;
                c(this, "getSeriesExtremes", null, function() {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    l(a.series, function(h) {
                        if (h.visible || !b.options.chart.ignoreHiddenSeries) {
                            var k = h.options,
                                f = k.threshold,
                                x;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= f && (f = null);
                            if (a.isXAxis) k = h.xData, k.length && (h = p(k), x = E(k), t(h) || h instanceof Date || (k = q(k, t), h = p(k), x = E(k)), k.length && (a.dataMin = Math.min(u(a.dataMin, k[0], h), h), a.dataMax =
                                Math.max(u(a.dataMax, k[0], x), x)));
                            else if (h.getExtremes(), x = h.dataMax, h = h.dataMin, m(h) && m(x) && (a.dataMin = Math.min(u(a.dataMin, h), h), a.dataMax = Math.max(u(a.dataMax, x), x)), m(f) && (a.threshold = f), !k.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                c(this, "afterGetSeriesExtremes")
            },
            translate: function(a, b, f, k, c, e) {
                var h = this.linkedParent || this,
                    x = 1,
                    r = 0,
                    d = k ? h.oldTransA : h.transA;
                k = k ? h.oldMin : h.min;
                var q = h.minPixelPadding;
                c = (h.isOrdinal || h.isBroken || h.isLog && c) && h.lin2val;
                d || (d = h.transA);
                f && (x *=
                    -1, r = h.len);
                h.reversed && (x *= -1, r -= x * (h.sector || h.len));
                b ? (a = (a * x + r - q) / d + k, c && (a = h.lin2val(a))) : (c && (a = h.val2lin(a)), a = t(k) ? x * (a - k) * d + r + x * q + (t(e) ? d * e : 0) : void 0);
                return a
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, b, f, k, c) {
                var h = this.chart,
                    x = this.left,
                    e = this.top,
                    r, d, q = f && h.oldChartHeight || h.chartHeight,
                    z = f && h.oldChartWidth || h.chartWidth,
                    I;
                r = this.transB;
                var l = function(a, b, h) {
                    if (a < b || a > h) k ? a = Math.min(Math.max(b, a), h) : I = !0;
                    return a
                };
                c = u(c, this.translate(a, null, null, f));
                c = Math.min(Math.max(-1E5, c), 1E5);
                a = f = Math.round(c + r);
                r = d = Math.round(q - c - r);
                t(c) ? this.horiz ? (r = e, d = q - this.bottom, a = f = l(a, x, x + this.width)) : (a = x, f = z - this.right, r = d = l(r, e, e + this.height)) : (I = !0, k = !1);
                return I && !k ? null : h.renderer.crispLine(["M", a, r, "L", f, d], b || 1)
            },
            getLinearTickPositions: function(a, b, f) {
                var h, c = g(Math.floor(b / a) * a);
                f = g(Math.ceil(f / a) * a);
                var x = [],
                    e;
                g(c + a) === c && (e = 20);
                if (this.single) return [b];
                for (b = c; b <= f;) {
                    x.push(b);
                    b = g(b + a, e);
                    if (b === h) break;
                    h = b
                }
                return x
            },
            getMinorTickInterval: function() {
                var a = this.options;
                return !0 === a.minorTicks ? u(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function() {
                var a = this,
                    b = a.options,
                    f = a.tickPositions,
                    k = a.minorTickInterval,
                    c = [],
                    e = a.pointRangePadding || 0,
                    r = a.min - e,
                    e = a.max + e,
                    d = e - r;
                if (d && d / k < a.len / 3)
                    if (a.isLog) l(this.paddedTicks, function(b, h, f) {
                        h && c.push.apply(c, a.getLogTickPositions(k, f[h - 1], f[h], !0))
                    });
                    else if (a.isDatetimeAxis &&
                    "auto" === this.getMinorTickInterval()) c = c.concat(a.getTimeTicks(a.normalizeTimeTickInterval(k), r, e, b.startOfWeek));
                else
                    for (b = r + (f[0] - r) % k; b <= e && b !== c[0]; b += k) c.push(b);
                0 !== c.length && a.trimTicks(c);
                return c
            },
            adjustForMinRange: function() {
                var a = this.options,
                    b = this.min,
                    f = this.max,
                    k, c, e, r, d, q, t, z;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (m(a.min) || m(a.max) ? this.minRange = null : (l(this.series, function(a) {
                        q = a.xData;
                        for (r = t = a.xIncrement ? 1 : q.length - 1; 0 < r; r--)
                            if (d = q[r] - q[r - 1], void 0 === e || d < e) e = d
                    }),
                    this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
                f - b < this.minRange && (c = this.dataMax - this.dataMin >= this.minRange, z = this.minRange, k = (z - f + b) / 2, k = [b - k, u(a.min, b - k)], c && (k[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = E(k), f = [b + z, u(a.max, b + z)], c && (f[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), f = p(f), f - b < z && (k[0] = f - z, k[1] = u(a.min, f - z), b = E(k)));
                this.min = b;
                this.max = f
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : l(this.series, function(b) {
                    var h = b.closestPointRange,
                        k = b.visible ||
                        !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && m(h) && k && (a = m(a) ? Math.min(a, h) : h)
                });
                return a
            },
            nameToX: function(a) {
                var h = f(this.categories),
                    c = h ? this.categories : this.names,
                    k = a.options.x,
                    e;
                a.series.requireSorting = !1;
                m(k) || (k = !1 === this.options.uniqueNames ? a.series.autoIncrement() : h ? b(a.name, c) : u(c.keys[a.name], -1)); - 1 === k ? h || (e = c.length) : e = k;
                void 0 !== e && (this.names[e] = a.name, this.names.keys[a.name] = e);
                return e
            },
            updateNames: function() {
                var b = this,
                    f = this.names;
                0 < f.length && (l(a.keys(f.keys),
                    function(a) {
                        delete f.keys[a]
                    }), f.length = 0, this.minRange = this.userMinRange, l(this.series || [], function(a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) a.processData(), a.generatePoints();
                    l(a.points, function(h, f) {
                        var k;
                        h.options && (k = b.nameToX(h), void 0 !== k && k !== h.x && (h.x = k, a.xData[f] = k))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var b = this,
                    h = b.max - b.min,
                    k = b.axisPointRange || 0,
                    f, e = 0,
                    r = 0,
                    d = b.linkedParent,
                    q = !!b.categories,
                    t = b.transA,
                    z = b.isXAxis;
                if (z || q || k) f = b.getClosest(), d ? (e = d.minPointOffset, r = d.pointRangePadding) :
                    l(b.series, function(a) {
                        var h = q ? 1 : z ? u(a.options.pointRange, f, 0) : b.axisPointRange || 0;
                        a = a.options.pointPlacement;
                        k = Math.max(k, h);
                        b.single || (e = Math.max(e, F(a) ? 0 : h / 2), r = Math.max(r, "on" === a ? 0 : h))
                    }), d = b.ordinalSlope && f ? b.ordinalSlope / f : 1, b.minPointOffset = e *= d, b.pointRangePadding = r *= d, b.pointRange = Math.min(k, h), z && (b.closestPointRange = f);
                a && (b.oldTransA = t);
                b.translationSlope = b.transA = t = b.options.staticScale || b.len / (h + r || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = t * e;
                c(this, "afterSetAxisTranslation")
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(b) {
                var h = this,
                    f = h.chart,
                    k = h.options,
                    e = h.isLog,
                    r = h.isDatetimeAxis,
                    d = h.isXAxis,
                    q = h.isLinked,
                    z = k.maxPadding,
                    B = k.minPadding,
                    F = k.tickInterval,
                    y = k.tickPixelInterval,
                    G = h.categories,
                    H = t(h.threshold) ? h.threshold : null,
                    w = h.softThreshold,
                    p, M, v, J;
                r || G || q || this.getTickAmount();
                v = u(h.userMin, k.min);
                J = u(h.userMax, k.max);
                q ? (h.linkedParent = f[h.coll][k.linkedTo], f = h.linkedParent.getExtremes(), h.min = u(f.min, f.dataMin), h.max = u(f.max, f.dataMax),
                    k.type !== h.linkedParent.options.type && a.error(11, 1)) : (!w && m(H) && (h.dataMin >= H ? (p = H, B = 0) : h.dataMax <= H && (M = H, z = 0)), h.min = u(v, p, h.dataMin), h.max = u(J, M, h.dataMax));
                e && (h.positiveValuesOnly && !b && 0 >= Math.min(h.min, u(h.dataMin, h.min)) && a.error(10, 1), h.min = g(h.log2lin(h.min), 15), h.max = g(h.log2lin(h.max), 15));
                h.range && m(h.max) && (h.userMin = h.min = v = Math.max(h.dataMin, h.minFromRange()), h.userMax = J = h.max, h.range = null);
                c(h, "foundExtremes");
                h.beforePadding && h.beforePadding();
                h.adjustForMinRange();
                !(G || h.axisPointRange ||
                    h.usePercentage || q) && m(h.min) && m(h.max) && (f = h.max - h.min) && (!m(v) && B && (h.min -= f * B), !m(J) && z && (h.max += f * z));
                t(k.softMin) && !t(h.userMin) && (h.min = Math.min(h.min, k.softMin));
                t(k.softMax) && !t(h.userMax) && (h.max = Math.max(h.max, k.softMax));
                t(k.floor) && (h.min = Math.max(h.min, k.floor));
                t(k.ceiling) && (h.max = Math.min(h.max, k.ceiling));
                w && m(h.dataMin) && (H = H || 0, !m(v) && h.min < H && h.dataMin >= H ? h.min = H : !m(J) && h.max > H && h.dataMax <= H && (h.max = H));
                h.tickInterval = h.min === h.max || void 0 === h.min || void 0 === h.max ? 1 : q && !F && y ===
                    h.linkedParent.options.tickPixelInterval ? F = h.linkedParent.tickInterval : u(F, this.tickAmount ? (h.max - h.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (h.max - h.min) * y / Math.max(h.len, y));
                d && !b && l(h.series, function(a) {
                    a.processData(h.min !== h.oldMin || h.max !== h.oldMax)
                });
                h.setAxisTranslation(!0);
                h.beforeSetTickPositions && h.beforeSetTickPositions();
                h.postProcessTickInterval && (h.tickInterval = h.postProcessTickInterval(h.tickInterval));
                h.pointRange && !F && (h.tickInterval = Math.max(h.pointRange, h.tickInterval));
                b =
                    u(k.minTickInterval, h.isDatetimeAxis && h.closestPointRange);
                !F && h.tickInterval < b && (h.tickInterval = b);
                r || e || F || (h.tickInterval = D(h.tickInterval, null, n(h.tickInterval), u(k.allowDecimals, !(.5 < h.tickInterval && 5 > h.tickInterval && 1E3 < h.max && 9999 > h.max)), !!this.tickAmount));
                this.tickAmount || (h.tickInterval = h.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    b, f = a.tickPositions;
                b = this.getMinorTickInterval();
                var k = a.tickPositioner,
                    e = a.startOnTick,
                    r = a.endOnTick;
                this.tickmarkOffset =
                    this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && m(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = f && f.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ?
                    this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, k && (k = k.apply(this, [this.min, this.max]))) && (this.tickPositions = b = k);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, e, r);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), f || k || this.adjustTickAmount());
                c(this, "afterSetTickPositions")
            },
            trimTicks: function(a, b, f) {
                var h = a[0],
                    c =
                    a[a.length - 1],
                    e = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== h) this.min = h;
                    else
                        for (; this.min - e > a[0];) a.shift();
                    if (f) this.max = c;
                    else
                        for (; this.max + e < a[a.length - 1];) a.pop();
                    0 === a.length && m(h) && !this.options.tickPositions && a.push((c + h) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    b, f = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === f.alignTicks || !1 === f.startOnTick || !1 === f.endOnTick || this.isLog || l(this.chart[this.coll], function(h) {
                    var k = h.options,
                        k = [h.horiz ? k.left : k.top, k.width, k.height,
                            k.pane
                        ].join();
                    h.series.length && (a[k] ? b = !0 : a[k] = 1)
                });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    f = a.tickPixelInterval;
                !m(a.tickInterval) && this.len < f && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / f) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    f = this.tickAmount,
                    k = this.finalTickAmt,
                    c = b && b.length,
                    e = u(this.threshold, this.softThreshold ?
                        0 : null);
                if (this.hasData()) {
                    if (c < f) {
                        for (; b.length < f;) b.length % 2 || this.min === e ? b.push(g(b[b.length - 1] + a)) : b.unshift(g(b[0] - a));
                        this.transA *= (c - 1) / (f - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    } else c > f && (this.tickInterval *= 2, this.setTickPositions());
                    if (m(k)) {
                        for (a = f = b.length; a--;)(3 === k && 1 === a % 2 || 2 >= k && 0 < a && a < f - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                l(this.series, function(b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                c(this, "afterSetScale")
            },
            setExtremes: function(a, b, f, k, r) {
                var h = this,
                    d = h.chart;
                f = u(f, !0);
                l(h.series, function(a) {
                    delete a.kdTree
                });
                r = e(r, {
                    min: a,
                    max: b
                });
                c(h, "setExtremes", r, function() {
                    h.userMin = a;
                    h.userMax = b;
                    h.eventArgs = r;
                    f && d.redraw(k)
                })
            },
            zoom: function(a, b) {
                var h = this.dataMin,
                    k = this.dataMax,
                    f = this.options,
                    c = Math.min(h, u(f.min, h)),
                    f = Math.max(k, u(f.max, k));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (m(h) && (a < c && (a = c), a > f && (a = f)), m(k) && (b < c && (b = c), b > f && (b = f))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a,
                    b, !1, void 0, {
                        trigger: "zoom"
                    });
                return !0
            },
            setAxisSize: function() {
                var b = this.chart,
                    f = this.options,
                    c = f.offsets || [0, 0, 0, 0],
                    k = this.horiz,
                    e = this.width = Math.round(a.relativeLength(u(f.width, b.plotWidth - c[3] + c[1]), b.plotWidth)),
                    r = this.height = Math.round(a.relativeLength(u(f.height, b.plotHeight - c[0] + c[2]), b.plotHeight)),
                    d = this.top = Math.round(a.relativeLength(u(f.top, b.plotTop + c[0]), b.plotHeight, b.plotTop)),
                    f = this.left = Math.round(a.relativeLength(u(f.left, b.plotLeft + c[3]), b.plotWidth, b.plotLeft));
                this.bottom =
                    b.chartHeight - r - d;
                this.right = b.chartWidth - e - f;
                this.len = Math.max(k ? e : r, 0);
                this.pos = k ? f : d
            },
            getExtremes: function() {
                var a = this.isLog;
                return {
                    min: a ? g(this.lin2log(this.min)) : this.min,
                    max: a ? g(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var b = this.isLog,
                    h = b ? this.lin2log(this.min) : this.min,
                    b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = h : Infinity === a ? a = b : h > a ? a = h : b < a && (a = b);
                return this.translate(a,
                    0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (u(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var b = this.options,
                    h = b[a + "Length"],
                    k = u(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (k && h) return "inside" === b[a + "Position"] && (h = -h), [h, k]
            },
            labelMetrics: function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function() {
                var a =
                    this.options.labels,
                    b = this.horiz,
                    f = this.tickInterval,
                    k = f,
                    c = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f),
                    e, r = a.rotation,
                    d = this.labelMetrics(),
                    q, t = Number.MAX_VALUE,
                    z, n = function(a) {
                        a /= c || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return g(a * f)
                    };
                b ? (z = !a.staggerLines && !a.step && (m(r) ? [r] : c < u(a.autoRotationLimit, 80) && a.autoRotation)) && l(z, function(a) {
                    var b;
                    if (a === r || a && -90 <= a && 90 >= a) q = n(Math.abs(d.h / Math.sin(w * a))), b = q + Math.abs(a / 360), b < t && (t = b, e = a, k = q)
                }) : a.step || (k = n(d.h));
                this.autoRotation = z;
                this.labelRotation =
                    u(e, r);
                return k
            },
            getSlotWidth: function() {
                var a = this.chart,
                    b = this.horiz,
                    f = this.options.labels,
                    k = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    c = a.margin[3];
                return b && 2 > (f.step || 0) && !f.rotation && (this.staggerLines || 1) * this.len / k || !b && (f.style && parseInt(f.style.width, 10) || c && c - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    b = a.renderer,
                    f = this.tickPositions,
                    k = this.ticks,
                    c = this.options.labels,
                    e = c && c.style || {},
                    r = this.horiz,
                    d = this.getSlotWidth(),
                    q = Math.max(1, Math.round(d -
                        2 * (c.padding || 5))),
                    t = {},
                    z = this.labelMetrics(),
                    n = c.style && c.style.textOverflow,
                    g, u, B = 0,
                    D;
                F(c.rotation) || (t.rotation = c.rotation || 0);
                l(f, function(a) {
                    (a = k[a]) && a.label && a.label.textPxLength > B && (B = a.label.textPxLength)
                });
                this.maxLabelLength = B;
                if (this.autoRotation) B > q && B > z.h ? t.rotation = this.labelRotation : this.labelRotation = 0;
                else if (d && (g = q, !n))
                    for (u = "clip", q = f.length; !r && q--;)
                        if (D = f[q], D = k[D].label) D.styles && "ellipsis" === D.styles.textOverflow ? D.css({
                            textOverflow: "clip"
                        }) : D.textPxLength > d && D.css({
                            width: d +
                                "px"
                        }), D.getBBox().height > this.len / f.length - (z.h - z.f) && (D.specificTextOverflow = "ellipsis");
                t.rotation && (g = B > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight, n || (u = "ellipsis"));
                if (this.labelAlign = c.align || this.autoLabelAlign(this.labelRotation)) t.align = this.labelAlign;
                l(f, function(a) {
                    var b = (a = k[a]) && a.label,
                        h = e.width,
                        f = {};
                    b && (b.attr(t), g && !h && "nowrap" !== e.whiteSpace && (g < b.textPxLength || "SPAN" === b.element.tagName) ? (f.width = g, n || (f.textOverflow = b.specificTextOverflow || u), b.css(f)) : b.styles && b.styles.width &&
                        !f.width && !h && b.css({
                            width: null
                        }), delete b.specificTextOverflow, a.rotation = t.rotation)
                });
                this.tickRotCorr = b.rotCorr(z.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || m(this.min) && m(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function(a) {
                var b = this.chart.renderer,
                    h = this.horiz,
                    k = this.opposite,
                    f = this.options.title,
                    c;
                this.axisTitle || ((c = f.textAlign) || (c = (h ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: k ? "right" : "left",
                    middle: "center",
                    high: k ? "left" : "right"
                })[f.align]), this.axisTitle = b.text(f.text, 0, 0, f.useHTML).attr({
                    zIndex: 7,
                    rotation: f.rotation || 0,
                    align: c
                }).addClass("highcharts-axis-title").add(this.axisGroup), this.axisTitle.isNew = !0);
                this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new G(this, a)
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    f = b.renderer,
                    k = a.options,
                    c = a.tickPositions,
                    e = a.ticks,
                    r = a.horiz,
                    d = a.side,
                    q = b.inverted && !a.isZAxis ? [1, 0, 3, 2][d] : d,
                    t, z, n = 0,
                    g, B = 0,
                    D = k.title,
                    F = k.labels,
                    y = 0,
                    G = b.axisOffset,
                    b = b.clipOffset,
                    w = [-1, 1, 1, -1][d],
                    p = k.className,
                    M = a.axisParent,
                    v = this.tickSize("tick");
                t = a.hasData();
                a.showAxis = z = t || u(k.showEmpty, !0);
                a.staggerLines = a.horiz && F.staggerLines;
                a.axisGroup || (a.gridGroup = f.g("grid").attr({
                        zIndex: k.gridZIndex || 1
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (p || "")).add(M), a.axisGroup = f.g("axis").attr({
                        zIndex: k.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (p || "")).add(M), a.labelGroup =
                    f.g("axis-labels").attr({
                        zIndex: F.zIndex || 7
                    }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (p || "")).add(M));
                t || a.isLinked ? (l(c, function(b, f) {
                    a.generateTick(b, f)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === d || 2 === d || {
                    1: "left",
                    3: "right"
                }[d] === a.labelAlign, u(F.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && l(c, function(a) {
                    y = Math.max(e[a].getLabelSize(), y)
                }), a.staggerLines && (y *= a.staggerLines), a.labelOffset = y * (a.opposite ? -1 : 1)) : H(e, function(a, b) {
                    a.destroy();
                    delete e[b]
                });
                D && D.text && !1 !== D.enabled && (a.addTitle(z), z && !1 !== D.reserveSpace && (a.titleOffset = n = a.axisTitle.getBBox()[r ? "height" : "width"], g = D.offset, B = m(g) ? 0 : u(D.margin, r ? 5 : 10)));
                a.renderLine();
                a.offset = w * u(k.offset, G[d]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                f = 0 === d ? -a.labelMetrics().h : 2 === d ? a.tickRotCorr.y : 0;
                B = Math.abs(y) + B;
                y && (B = B - f + w * (r ? u(F.y, a.tickRotCorr.y + 8 * w) : F.x));
                a.axisTitleMargin = u(g, B);
                G[d] = Math.max(G[d], a.axisTitleMargin + n + w * a.offset, B, t && c.length && v ? v[0] + w * a.offset : 0);
                k = k.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() /
                    2);
                b[q] = Math.max(b[q], k)
            },
            getLinePath: function(a) {
                var b = this.chart,
                    f = this.opposite,
                    k = this.offset,
                    h = this.horiz,
                    c = this.left + (f ? this.width : 0) + k,
                    k = b.chartHeight - this.bottom - (f ? this.height : 0) + k;
                f && (a *= -1);
                return b.renderer.crispLine(["M", h ? this.left : c, h ? k : this.top, "L", h ? b.chartWidth - this.right : c, h ? k : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    f = this.top,
                    k = this.len,
                    c = this.options.title,
                    e = a ? b : f,
                    r = this.opposite,
                    d = this.offset,
                    q = c.x || 0,
                    t = c.y || 0,
                    z = this.axisTitle,
                    n = this.chart.renderer.fontMetrics(c.style && c.style.fontSize, z),
                    z = Math.max(z.getBBox(null, 0).height - n.h - 1, 0),
                    k = {
                        low: e + (a ? 0 : k),
                        middle: e + k / 2,
                        high: e + (a ? k : 0)
                    }[c.align],
                    b = (a ? f + this.height : b) + (a ? 1 : -1) * (r ? -1 : 1) * this.axisTitleMargin + [-z, z, n.f, -z][this.side];
                return {
                    x: a ? k + q : b + (r ? this.width : 0) + d + q,
                    y: a ? b + t - (r ? this.height : 0) + d : k + t
                }
            },
            renderMinorTick: function(a) {
                var b = this.chart.hasRendered &&
                    t(this.oldMin),
                    f = this.minorTicks;
                f[a] || (f[a] = new G(this, a, "minor"));
                b && f[a].isNew && f[a].render(null, !0);
                f[a].render(null, !1, 1)
            },
            renderTick: function(a, b) {
                var f = this.isLinked,
                    k = this.ticks,
                    h = this.chart.hasRendered && t(this.oldMin);
                if (!f || a >= this.min && a <= this.max) k[a] || (k[a] = new G(this, a)), h && k[a].isNew && k[a].render(b, !0, .1), k[a].render(b)
            },
            render: function() {
                var b = this,
                    f = b.chart,
                    e = b.options,
                    k = b.isLog,
                    r = b.isLinked,
                    d = b.tickPositions,
                    q = b.axisTitle,
                    n = b.ticks,
                    g = b.minorTicks,
                    u = b.alternateBands,
                    B = e.stackLabels,
                    D = e.alternateGridColor,
                    F = b.tickmarkOffset,
                    y = b.axisLine,
                    m = b.showAxis,
                    w = C(f.renderer.globalAnimation),
                    p, M;
                b.labelEdge.length = 0;
                b.overlap = !1;
                l([n, g, u], function(a) {
                    H(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || r) b.minorTickInterval && !b.categories && l(b.getMinorTickPositions(), function(a) {
                    b.renderMinorTick(a)
                }), d.length && (l(d, function(a, f) {
                    b.renderTick(a, f)
                }), F && (0 === b.min || b.single) && (n[-1] || (n[-1] = new G(b, -1, null, !0)), n[-1].render(-1))), D && l(d, function(c, h) {
                    M = void 0 !== d[h + 1] ? d[h + 1] + F : b.max - F;
                    0 ===
                        h % 2 && c < b.max && M <= b.max + (f.polar ? -F : F) && (u[c] || (u[c] = new a.PlotLineOrBand(b)), p = c + F, u[c].options = {
                            from: k ? b.lin2log(p) : p,
                            to: k ? b.lin2log(M) : M,
                            color: D
                        }, u[c].render(), u[c].isActive = !0)
                }), b._addedPlotLB || (l((e.plotLines || []).concat(e.plotBands || []), function(a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                l([n, g, u], function(a) {
                    var b, k = [],
                        c = w.duration;
                    H(a, function(a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, k.push(b))
                    });
                    z(function() {
                            for (b = k.length; b--;) a[k[b]] && !a[k[b]].isActive && (a[k[b]].destroy(), delete a[k[b]])
                        },
                        a !== u && f.hasRendered && c ? c : 0)
                });
                y && (y[y.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(y.strokeWidth())
                }), y.isPlaced = !0, y[m ? "show" : "hide"](!0));
                q && m && (e = b.getTitlePosition(), t(e.y) ? (q[q.isNew ? "attr" : "animate"](e), q.isNew = !1) : (q.attr("y", -9999), q.isNew = !0));
                B && B.enabled && b.renderStackTotals();
                b.isDirty = !1;
                c(this, "afterRender")
            },
            redraw: function() {
                this.visible && (this.render(), l(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                l(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var f = this,
                    h = f.stacks,
                    k = f.plotLinesAndBands,
                    e;
                c(this, "destroy", {
                    keepEvents: a
                });
                a || r(f);
                H(h, function(a, b) {
                    v(a);
                    h[b] = null
                });
                l([f.ticks, f.minorTicks, f.alternateBands], function(a) {
                    v(a)
                });
                if (k)
                    for (a = k.length; a--;) k[a].destroy();
                l("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
                    f[a] && (f[a] = f[a].destroy())
                });
                for (e in f.plotLinesAndBandsGroups) f.plotLinesAndBandsGroups[e] = f.plotLinesAndBandsGroups[e].destroy();
                H(f, function(a, k) {
                    -1 === b(k,
                        f.keepProps) && delete f[k]
                })
            },
            drawCrosshair: function(a, b) {
                var f, k = this.crosshair,
                    h = u(k.snap, !0),
                    e, r = this.cross;
                c(this, "drawCrosshair", {
                    e: a,
                    point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (m(b) || !h)) {
                    h ? m(b) && (e = u(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : e = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    m(e) && (f = this.getPlotLinePath(b && (this.isXAxis ? b.x : u(b.stackY, b.y)), null, null, null, e) || null);
                    if (!m(f)) {
                        this.hideCrosshair();
                        return
                    }
                    h = this.categories && !this.isRadial;
                    r || (this.cross = r = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (h ? "category " : "thin ") + k.className).attr({
                        zIndex: u(k.zIndex, 2)
                    }).add());
                    r.show().attr({
                        d: f
                    });
                    h && !k.width && r.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                c(this, "afterDrawCrosshair", {
                    e: a,
                    point: b
                })
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = M
    }(K);
    (function(a) {
        var A = a.Axis,
            C = a.getMagnitude,
            E = a.normalizeTickInterval,
            p = a.timeUnits;
        A.prototype.getTimeTicks =
            function() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            };
        A.prototype.normalizeTimeTickInterval = function(a, d) {
            var g = d || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            d = g[g.length - 1];
            var w = p[d[0]],
                v = d[1],
                l;
            for (l = 0; l < g.length && !(d = g[l], w = p[d[0]], v = d[1], g[l + 1] && a <= (w * v[v.length - 1] + p[g[l + 1][0]]) / 2); l++);
            w === p.year && a < 5 * w && (v = [1, 2,
                5
            ]);
            a = E(a / w, v, "year" === d[0] ? Math.max(C(a / w), 1) : 1);
            return {
                unitRange: w,
                count: a,
                unitName: d[0]
            }
        }
    })(K);
    (function(a) {
        var A = a.Axis,
            C = a.getMagnitude,
            E = a.map,
            p = a.normalizeTickInterval,
            g = a.pick;
        A.prototype.getLogTickPositions = function(a, m, w, v) {
            var d = this.options,
                e = this.len,
                c = [];
            v || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), c = this.getLinearTickPositions(a, m, w);
            else if (.08 <= a)
                for (var e = Math.floor(m), y, n, q, b, f, d = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; e < w + 1 && !f; e++)
                    for (n = d.length, y = 0; y <
                        n && !f; y++) q = this.log2lin(this.lin2log(e) * d[y]), q > m && (!v || b <= w) && void 0 !== b && c.push(b), b > w && (f = !0), b = q;
            else m = this.lin2log(m), w = this.lin2log(w), a = v ? this.getMinorTickInterval() : d.tickInterval, a = g("auto" === a ? null : a, this._minorAutoInterval, d.tickPixelInterval / (v ? 5 : 1) * (w - m) / ((v ? e / this.tickPositions.length : e) || 1)), a = p(a, null, C(a)), c = E(this.getLinearTickPositions(a, m, w), this.log2lin), v || (this._minorAutoInterval = a / 5);
            v || (this.tickInterval = a);
            return c
        };
        A.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        A.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(K);
    (function(a, A) {
        var C = a.arrayMax,
            E = a.arrayMin,
            p = a.defined,
            g = a.destroyObjectProperties,
            d = a.each,
            m = a.erase,
            w = a.merge,
            v = a.pick;
        a.PlotLineOrBand = function(a, e) {
            this.axis = a;
            e && (this.options = e, this.id = e.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var d = this,
                    e = d.axis,
                    c = e.horiz,
                    g = d.options,
                    n = g.label,
                    q = d.label,
                    b = g.to,
                    f = g.from,
                    t = g.value,
                    F = p(f) && p(b),
                    m = p(t),
                    D = d.svgElem,
                    H = !D,
                    u = [],
                    r = v(g.zIndex, 0),
                    B = g.events,
                    u = {
                        "class": "highcharts-plot-" + (F ? "band " :
                            "line ") + (g.className || "")
                    },
                    z = {},
                    G = e.chart.renderer,
                    M = F ? "bands" : "lines",
                    h;
                e.isLog && (f = e.log2lin(f), b = e.log2lin(b), t = e.log2lin(t));
                z.zIndex = r;
                M += "-" + r;
                (h = e.plotLinesAndBandsGroups[M]) || (e.plotLinesAndBandsGroups[M] = h = G.g("plot-" + M).attr(z).add());
                H && (d.svgElem = D = G.path().attr(u).add(h));
                if (m) u = e.getPlotLinePath(t, D.strokeWidth());
                else if (F) u = e.getPlotBandPath(f, b, g);
                else return;
                H && u && u.length ? (D.attr({
                    d: u
                }), B && a.objectEach(B, function(a, b) {
                    D.on(b, function(a) {
                        B[b].apply(d, [a])
                    })
                })) : D && (u ? (D.show(), D.animate({
                        d: u
                    })) :
                    (D.hide(), q && (d.label = q = q.destroy())));
                n && p(n.text) && u && u.length && 0 < e.width && 0 < e.height && !u.isFlat ? (n = w({
                    align: c && F && "center",
                    x: c ? !F && 4 : 10,
                    verticalAlign: !c && F && "middle",
                    y: c ? F ? 16 : 10 : F ? 6 : -4,
                    rotation: c && !F && 90
                }, n), this.renderLabel(n, u, F, r)) : q && q.hide();
                return d
            },
            renderLabel: function(a, e, c, d) {
                var g = this.label,
                    q = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = d, this.label = g = q.text(a.text, 0,
                    0, a.useHTML).attr(g).add());
                d = e.xBounds || [e[1], e[4], c ? e[6] : e[1]];
                e = e.yBounds || [e[2], e[5], c ? e[7] : e[2]];
                c = E(d);
                q = E(e);
                g.align(a, !1, {
                    x: c,
                    y: q,
                    width: C(d) - c,
                    height: C(e) - q
                });
                g.show()
            },
            destroy: function() {
                m(this.axis.plotLinesAndBands, this);
                delete this.axis;
                g(this)
            }
        };
        a.extend(A.prototype, {
            getPlotBandPath: function(a, e) {
                var c = this.getPlotLinePath(e, null, null, !0),
                    d = this.getPlotLinePath(a, null, null, !0),
                    g = [],
                    q = this.horiz,
                    b = 1,
                    f;
                a = a < this.min && e < this.min || a > this.max && e > this.max;
                if (d && c)
                    for (a && (f = d.toString() === c.toString(),
                            b = 0), a = 0; a < d.length; a += 6) q && c[a + 1] === d[a + 1] ? (c[a + 1] += b, c[a + 4] += b) : q || c[a + 2] !== d[a + 2] || (c[a + 2] += b, c[a + 5] += b), g.push("M", d[a + 1], d[a + 2], "L", d[a + 4], d[a + 5], c[a + 4], c[a + 5], c[a + 1], c[a + 2], "z"), g.isFlat = f;
                return g
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(d, e) {
                var c = (new a.PlotLineOrBand(this, d)).render(),
                    g = this.userOptions;
                c && (e && (g[e] = g[e] || [], g[e].push(d)), this.plotLinesAndBands.push(c));
                return c
            },
            removePlotBandOrLine: function(a) {
                for (var e = this.plotLinesAndBands, c = this.options, g = this.userOptions, n = e.length; n--;) e[n].id === a && e[n].destroy();
                d([c.plotLines || [], g.plotLines || [], c.plotBands || [], g.plotBands || []], function(c) {
                    for (n = c.length; n--;) c[n].id === a && m(c, c[n])
                })
            },
            removePlotBand: function(a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function(a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(K, U);
    (function(a) {
        var A = a.doc,
            C = a.each,
            E = a.extend,
            p = a.format,
            g = a.isNumber,
            d = a.map,
            m = a.merge,
            w = a.pick,
            v =
            a.splat,
            l = a.syncTimeout,
            e = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, e) {
                this.chart = a;
                this.options = e;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = e.split && !a.inverted;
                this.shared = e.shared || this.split;
                this.outside = e.outside && !this.split
            },
            cleanSplit: function(a) {
                C(this.chart.series, function(c) {
                    var e = c && c.tt;
                    e && (!e.isActive || a ? c.tt = e.destroy() : e.isActive = !1)
                })
            },
            applyFilter: function() {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{
                        tagName: "feGaussianBlur",
                        in : "SourceAlpha",
                        stdDeviation: 1
                    }, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            type: "linear",
                            slope: .3
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            in : "SourceGraphic"
                        }]
                    }]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            },
            getLabel: function() {
                var c = this.chart.renderer,
                    e = this.options,
                    d;
                this.label || (this.outside && (this.container = d = a.doc.createElement("div"), d.className = "highcharts-tooltip-container", a.css(d, {
                    position: "absolute",
                    top: "1px",
                    pointerEvents: "none"
                }), a.doc.body.appendChild(d), this.renderer = c = new a.Renderer(d, 0, 0)), this.label = this.split ? c.g("tooltip") : c.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                    padding: e.padding,
                    r: e.borderRadius
                }), this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index), this.outside && (this.label.attr({
                    x: this.distance,
                    y: this.distance
                }), this.label.xSetter = function(a) {
                    d.style.left = a + "px"
                }, this.label.ySetter = function(a) {
                    d.style.top = a + "px"
                }), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                m(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, m(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function(c, e, d, q) {
                var b = this,
                    f = b.now,
                    t = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(c - f.x) || 1 < Math.abs(e - f.y)),
                    g = b.followPointer || 1 < b.len;
                E(f, {
                    x: t ? (2 * f.x + c) / 3 : c,
                    y: t ? (f.y + e) / 2 : e,
                    anchorX: g ? void 0 : t ? (2 * f.anchorX + d) / 3 : d,
                    anchorY: g ? void 0 : t ? (f.anchorY + q) / 2 : q
                });
                b.getLabel().attr(f);
                t && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    b && b.move(c, e, d, q)
                }, 32))
            },
            hide: function(c) {
                var e = this;
                a.clearTimeout(this.hideTimer);
                c = w(c, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = l(function() {
                    e.getLabel()[c ? "fadeOut" : "hide"]();
                    e.isHidden = !0
                }, c))
            },
            getAnchor: function(a, e) {
                var c, q = this.chart,
                    b = q.inverted,
                    f = q.plotTop,
                    t = q.plotLeft,
                    g = 0,
                    l = 0,
                    D, H;
                a = v(a);
                c = a[0].tooltipPos;
                this.followPointer && e && (void 0 === e.chartX && (e = q.pointer.normalize(e)), c = [e.chartX - q.plotLeft, e.chartY - f]);
                c || (C(a, function(a) {
                    D = a.series.yAxis;
                    H = a.series.xAxis;
                    g += a.plotX + (!b && H ? H.left - t : 0);
                    l += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && D ? D.top -
                        f : 0)
                }), g /= a.length, l /= a.length, c = [b ? q.plotWidth - l : g, this.shared && !b && 1 < a.length && e ? e.chartY - f : b ? q.plotHeight - g : l]);
                return d(c, Math.round)
            },
            getPosition: function(a, e, d) {
                var c = this.chart,
                    b = this.distance,
                    f = {},
                    t = c.inverted && d.h || 0,
                    g, n = this.outside,
                    D = n ? A.documentElement.clientWidth - 2 * b : c.chartWidth,
                    l = n ? Math.max(A.body.scrollHeight, A.documentElement.scrollHeight, A.body.offsetHeight, A.documentElement.offsetHeight, A.documentElement.clientHeight) : c.chartHeight,
                    u = c.pointer.chartPosition,
                    r = ["y", l, e, (n ? u.top -
                        b : 0) + d.plotY + c.plotTop, n ? 0 : c.plotTop, n ? l : c.plotTop + c.plotHeight],
                    B = ["x", D, a, (n ? u.left - b : 0) + d.plotX + c.plotLeft, n ? 0 : c.plotLeft, n ? D : c.plotLeft + c.plotWidth],
                    z = !this.followPointer && w(d.ttBelow, !c.inverted === !!d.negative),
                    G = function(a, k, c, h, e, r) {
                        var d = c < h - b,
                            q = h + b + c < k,
                            g = h - b - c;
                        h += b;
                        if (z && q) f[a] = h;
                        else if (!z && d) f[a] = g;
                        else if (d) f[a] = Math.min(r - c, 0 > g - t ? g : g - t);
                        else if (q) f[a] = Math.max(e, h + t + c > k ? h : h + t);
                        else return !1
                    },
                    m = function(a, k, c, h) {
                        var e;
                        h < b || h > k - b ? e = !1 : f[a] = h < c / 2 ? 1 : h > k - c / 2 ? k - c - 2 : h - c / 2;
                        return e
                    },
                    h = function(a) {
                        var b =
                            r;
                        r = B;
                        B = b;
                        g = a
                    },
                    x = function() {
                        !1 !== G.apply(0, r) ? !1 !== m.apply(0, B) || g || (h(!0), x()) : g ? f.x = f.y = 0 : (h(!0), x())
                    };
                (c.inverted || 1 < this.len) && h();
                x();
                return f
            },
            defaultFormatter: function(a) {
                var c = this.points || v(this),
                    e;
                e = [a.tooltipFooterHeaderFormatter(c[0])];
                e = e.concat(a.bodyFormatter(c));
                e.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return e
            },
            refresh: function(c, e) {
                var d, q = this.options,
                    b = c,
                    f, t = {},
                    g = [];
                d = q.formatter || this.defaultFormatter;
                var t = this.shared,
                    l;
                q.enabled && (a.clearTimeout(this.hideTimer), this.followPointer =
                    v(b)[0].series.tooltipOptions.followPointer, f = this.getAnchor(b, e), e = f[0], q = f[1], !t || b.series && b.series.noSharedTooltip ? t = b.getLabelConfig() : (C(b, function(a) {
                        a.setState("hover");
                        g.push(a.getLabelConfig())
                    }), t = {
                        x: b[0].category,
                        y: b[0].y
                    }, t.points = g, b = b[0]), this.len = g.length, t = d.call(t, this), l = b.series, this.distance = w(l.tooltipOptions.distance, 16), !1 === t ? this.hide() : (d = this.getLabel(), this.isHidden && d.attr({
                        opacity: 1
                    }).show(), this.split ? this.renderSplit(t, v(c)) : (d.css({
                            width: this.chart.spacingBox.width
                        }),
                        d.attr({
                            text: t && t.join ? t.join("") : t
                        }), d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + w(b.colorIndex, l.colorIndex)), this.updatePosition({
                            plotX: e,
                            plotY: q,
                            negative: b.negative,
                            ttBelow: b.ttBelow,
                            h: f[2] || 0
                        })), this.isHidden = !1))
            },
            renderSplit: function(c, e) {
                var d = this,
                    q = [],
                    b = this.chart,
                    f = b.renderer,
                    t = !0,
                    g = this.options,
                    l = 0,
                    D = this.getLabel();
                a.isString(c) && (c = [!1, c]);
                C(c.slice(0, e.length + 1), function(a, c) {
                    if (!1 !== a) {
                        c = e[c - 1] || {
                            isHeader: !0,
                            plotX: e[0].plotX
                        };
                        var r = c.series || d,
                            B = r.tt,
                            z = "highcharts-color-" +
                            w(c.colorIndex, (c.series || {}).colorIndex, "none");
                        B || (r.tt = B = f.label(null, null, null, "callout", null, null, g.useHTML).addClass("highcharts-tooltip-box " + z).attr({
                            padding: g.padding,
                            r: g.borderRadius
                        }).add(D));
                        B.isActive = !0;
                        B.attr({
                            text: a
                        });
                        a = B.getBBox();
                        z = a.width + B.strokeWidth();
                        c.isHeader ? (l = a.height, z = Math.max(0, Math.min(c.plotX + b.plotLeft - z / 2, b.chartWidth - z))) : z = c.plotX + b.plotLeft - w(g.distance, 16) - z;
                        0 > z && (t = !1);
                        a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                        a -= b.plotTop;
                        q.push({
                            target: c.isHeader ?
                                b.plotHeight + l : a,
                            rank: c.isHeader ? 1 : 0,
                            size: r.tt.getBBox().height + 1,
                            point: c,
                            x: z,
                            tt: B
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(q, b.plotHeight + l);
                C(q, function(a) {
                    var f = a.point,
                        c = f.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: t || f.isHeader ? a.x : f.plotX + b.plotLeft + w(g.distance, 16),
                        y: a.pos + b.plotTop,
                        anchorX: f.isHeader ? f.plotX + b.plotLeft : f.plotX + c.xAxis.pos,
                        anchorY: f.isHeader ? a.pos + b.plotTop - 15 : f.plotY + c.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var c = this.chart,
                    e = this.getLabel(),
                    d = (this.options.positioner ||
                        this.getPosition).call(this, e.width, e.height, a),
                    b = a.plotX + c.plotLeft;
                a = a.plotY + c.plotTop;
                var f;
                this.outside && (f = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(e.width + f, e.height + f, !1), b += c.pointer.chartPosition.left - d.x, a += c.pointer.chartPosition.top - d.y);
                this.move(Math.round(d.x), Math.round(d.y || 0), b, a)
            },
            getDateFormat: function(a, d, g, q) {
                var b = this.chart.time,
                    f = b.dateFormat("%m-%d %H:%M:%S.%L", d),
                    c, n, l = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    D = "millisecond";
                for (n in e) {
                    if (a ===
                        e.week && +b.dateFormat("%w", d) === g && "00:00:00.000" === f.substr(6)) {
                        n = "week";
                        break
                    }
                    if (e[n] > a) {
                        n = D;
                        break
                    }
                    if (l[n] && f.substr(l[n]) !== "01-01 00:00:00.000".substr(l[n])) break;
                    "week" !== n && (D = n)
                }
                n && (c = q[n]);
                return c
            },
            getXDateFormat: function(a, e, d) {
                e = e.dateTimeLabelFormats;
                var c = d && d.closestPointRange;
                return (c ? this.getDateFormat(c, a.x, d.options.startOfWeek, e) : e.day) || e.year
            },
            tooltipFooterHeaderFormatter: function(a, e) {
                e = e ? "footer" : "header";
                var c = a.series,
                    d = c.tooltipOptions,
                    b = d.xDateFormat,
                    f = c.xAxis,
                    t = f && "datetime" ===
                    f.options.type && g(a.key),
                    l = d[e + "Format"];
                t && !b && (b = this.getXDateFormat(a, d, f));
                t && b && C(a.point && a.point.tooltipDateKeys || ["key"], function(a) {
                    l = l.replace("{point." + a + "}", "{point." + a + ":" + b + "}")
                });
                return p(l, {
                    point: a,
                    series: c
                }, this.chart.time)
            },
            bodyFormatter: function(a) {
                return d(a, function(a) {
                    var c = a.series.tooltipOptions;
                    return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            C =
            a.attr,
            E = a.charts,
            p = a.css,
            g = a.defined,
            d = a.each,
            m = a.extend,
            w = a.find,
            v = a.fireEvent,
            l = a.isNumber,
            e = a.isObject,
            c = a.offset,
            y = a.pick,
            n = a.splat,
            q = a.Tooltip;
        a.Pointer = function(a, f) {
            this.init(a, f)
        };
        a.Pointer.prototype = {
            init: function(a, f) {
                this.options = f;
                this.chart = a;
                this.runChartClick = f.chart.events && !!f.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                q && (a.tooltip = new q(a, f.tooltip), this.followTouchMove = y(f.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    e = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (e = y(c.pinchType, e));
                this.zoomX = a = /x/.test(e);
                this.zoomY = e = /y/.test(e);
                this.zoomHor = a && !b || e && b;
                this.zoomVert = e && !b || a && b;
                this.hasZoom = a || e
            },
            normalize: function(a, f) {
                var b;
                b = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                f || (this.chartPosition = f = c(this.chart.container));
                return m(a, {
                    chartX: Math.round(b.pageX - f.left),
                    chartY: Math.round(b.pageY - f.top)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                d(this.chart.axes,
                    function(f) {
                        b[f.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: f,
                            value: f.toValue(a[f.horiz ? "chartX" : "chartY"])
                        })
                    });
                return b
            },
            findNearestKDPoint: function(a, f, c) {
                var b;
                d(a, function(a) {
                    var d = !(a.noSharedTooltip && f) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(c, d);
                    if ((d = e(a, !0)) && !(d = !e(b, !0))) var d = b.distX - a.distX,
                        q = b.dist - a.dist,
                        t = (a.series.group && a.series.group.zIndex) - (b.series.group && b.series.group.zIndex),
                        d = 0 < (0 !== d && f ? d : 0 !== q ? q : 0 !== t ? t : b.series.index > a.series.index ? -1 : 1);
                    d && (b = a)
                });
                return b
            },
            getPointFromEvent: function(a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function(a, f) {
                var b = a.series,
                    c = b.xAxis,
                    b = b.yAxis,
                    e = y(a.clientX, a.plotX),
                    d = a.shapeArgs;
                if (c && b) return f ? {
                    chartX: c.len + c.pos - e,
                    chartY: b.len + b.pos - a.plotY
                } : {
                    chartX: e + c.pos,
                    chartY: a.plotY + b.pos
                };
                if (d && d.x && d.y) return {
                    chartX: d.x,
                    chartY: d.y
                }
            },
            getHoverData: function(b, f, c, q, g, n, l) {
                var t, r = [],
                    B = l && l.isBoosting;
                q = !(!q || !b);
                l = f && !f.stickyTracking ? [f] : a.grep(c, function(a) {
                    return a.visible &&
                        !(!g && a.directTouch) && y(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                f = (t = q ? b : this.findNearestKDPoint(l, g, n)) && t.series;
                t && (g && !f.noSharedTooltip ? (l = a.grep(c, function(a) {
                    return a.visible && !(!g && a.directTouch) && y(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), d(l, function(a) {
                    var b = w(a.points, function(a) {
                        return a.x === t.x && !a.isNull
                    });
                    e(b) && (B && (b = a.getPoint(b)), r.push(b))
                })) : r.push(t));
                return {
                    hoverPoint: t,
                    hoverSeries: f,
                    hoverPoints: r
                }
            },
            runPointActions: function(b, f) {
                var c = this.chart,
                    e = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0,
                    q = e ? e.shared : !1,
                    g = f || c.hoverPoint,
                    l = g && g.series || c.hoverSeries,
                    l = this.getHoverData(g, l, c.series, !!f || l && l.directTouch && this.isDirectTouch, q, b, {
                        isBoosting: c.isBoosting
                    }),
                    n, g = l.hoverPoint;
                n = l.hoverPoints;
                f = (l = l.hoverSeries) && l.tooltipOptions.followPointer;
                q = q && l && !l.noSharedTooltip;
                if (g && (g !== c.hoverPoint || e && e.isHidden)) {
                    d(c.hoverPoints || [], function(b) {
                        -1 === a.inArray(b, n) && b.setState()
                    });
                    d(n || [], function(a) {
                        a.setState("hover")
                    });
                    if (c.hoverSeries !==
                        l) l.onMouseOver();
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!g.series) return;
                    g.firePointEvent("mouseOver");
                    c.hoverPoints = n;
                    c.hoverPoint = g;
                    e && e.refresh(q ? n : g, b)
                } else f && e && !e.isHidden && (g = e.getAnchor([{}], b), e.updatePosition({
                    plotX: g[0],
                    plotY: g[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = A(c.container.ownerDocument, "mousemove", function(b) {
                    var f = E[a.hoverChartIndex];
                    if (f) f.pointer.onDocumentMouseMove(b)
                }));
                d(c.axes, function(f) {
                    var c = y(f.crosshair.snap, !0),
                        e = c ? a.find(n, function(a) {
                            return a.series[f.coll] ===
                                f
                        }) : void 0;
                    e || !c ? f.drawCrosshair(b, e) : f.hideCrosshair()
                })
            },
            reset: function(a, f) {
                var b = this.chart,
                    c = b.hoverSeries,
                    e = b.hoverPoint,
                    q = b.hoverPoints,
                    g = b.tooltip,
                    l = g && g.shared ? q : e;
                a && l && d(n(l), function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) g && l && (g.refresh(l), e && (e.setState(e.state, !0), d(b.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, e)
                })));
                else {
                    if (e) e.onMouseOut();
                    q && d(q, function(a) {
                        a.setState()
                    });
                    if (c) c.onMouseOut();
                    g && g.hide(f);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    d(b.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = b.hoverPoints = b.hoverPoint = null
                }
            },
            scaleGroups: function(a, f) {
                var b = this.chart,
                    c;
                d(b.series, function(e) {
                    c = a || e.getPlotBox();
                    e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(c), e.markerGroup && (e.markerGroup.attr(c), e.markerGroup.clip(f ? b.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(c))
                });
                b.clipRect.attr(f || b.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    e = a.chartX,
                    d = a.chartY,
                    q = this.zoomHor,
                    g = this.zoomVert,
                    l = b.plotLeft,
                    r = b.plotTop,
                    B = b.plotWidth,
                    z = b.plotHeight,
                    n, m = this.selectionMarker,
                    h = this.mouseDownX,
                    x = this.mouseDownY,
                    w = c.panKey && a[c.panKey + "Key"];
                m && m.touch || (e < l ? e = l : e > l + B && (e = l + B), d < r ? d = r : d > r + z && (d = r + z), this.hasDragged = Math.sqrt(Math.pow(h - e, 2) + Math.pow(x - d, 2)), 10 < this.hasDragged && (n = b.isInsidePlot(h - l, x - r), b.hasCartesianSeries && (this.zoomX || this.zoomY) &&
                    n && !w && !m && (this.selectionMarker = m = b.renderer.rect(l, r, q ? 1 : B, g ? 1 : z, 0).attr({
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add()), m && q && (e -= h, m.attr({
                        width: Math.abs(e),
                        x: (0 < e ? 0 : e) + h
                    })), m && g && (e = d - x, m.attr({
                        height: Math.abs(e),
                        y: (0 < e ? 0 : e) + x
                    })), n && !m && c.panning && b.pan(a, c.panning)))
            },
            drop: function(a) {
                var b = this,
                    c = this.chart,
                    e = this.hasPinched;
                if (this.selectionMarker) {
                    var q = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        n = this.selectionMarker,
                        w = n.attr ? n.attr("x") : n.x,
                        u = n.attr ? n.attr("y") : n.y,
                        r = n.attr ? n.attr("width") :
                        n.width,
                        B = n.attr ? n.attr("height") : n.height,
                        z;
                    if (this.hasDragged || e) d(c.axes, function(c) {
                        if (c.zoomEnabled && g(c.min) && (e || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[c.coll]])) {
                            var f = c.horiz,
                                h = "touchend" === a.type ? c.minPixelPadding : 0,
                                d = c.toValue((f ? w : u) + h),
                                f = c.toValue((f ? w + r : u + B) - h);
                            q[c.coll].push({
                                axis: c,
                                min: Math.min(d, f),
                                max: Math.max(d, f)
                            });
                            z = !0
                        }
                    }), z && v(c, "selection", q, function(a) {
                        c.zoom(m(a, e ? {
                            animation: !1
                        } : null))
                    });
                    l(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    e && this.scaleGroups()
                }
                c && l(c.index) &&
                    (p(c.container, {
                        cursor: c._cursor
                    }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(b) {
                E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") ||
                    b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(b) {
                var c = E[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(b) {
                var c = this.chart;
                g(a.hoverChartIndex) && E[a.hoverChartIndex] && E[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX -
                    c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            },
            inClass: function(a, c) {
                for (var b; a;) {
                    if (b = C(a, "class")) {
                        if (-1 !== b.indexOf(c)) return !0;
                        if (-1 !== b.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    e = b.plotLeft,
                    d = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (v(c.series, "click", m(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (m(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - d) && v(b, "click", a)))
            },
            setDOMEvents: function() {
                var b = this,
                    c = b.chart.container,
                    e = c.ownerDocument;
                c.onmousedown = function(a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function(a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function(a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = A(c, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = A(e, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (c.ontouchstart = function(a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function(a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = A(e, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function() {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function(a, c) {
                    b[c] = null
                })
            }
        }
    })(K);
    (function(a) {
        var A = a.charts,
            C = a.each,
            E = a.extend,
            p = a.map,
            g = a.noop,
            d = a.pick;
        E(a.Pointer.prototype, {
            pinchTranslate: function(a, d, g, l, e, c) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, d, g, l, e, c);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, g, l,
                    e, c)
            },
            pinchTranslateDirection: function(a, d, g, l, e, c, p, n) {
                var q = this.chart,
                    b = a ? "x" : "y",
                    f = a ? "X" : "Y",
                    t = "chart" + f,
                    m = a ? "width" : "height",
                    w = q["plot" + (a ? "Left" : "Top")],
                    D, H, u = n || 1,
                    r = q.inverted,
                    B = q.bounds[a ? "h" : "v"],
                    z = 1 === d.length,
                    G = d[0][t],
                    v = g[0][t],
                    h = !z && d[1][t],
                    x = !z && g[1][t],
                    y;
                g = function() {
                    !z && 20 < Math.abs(G - h) && (u = n || Math.abs(v - x) / Math.abs(G - h));
                    H = (w - v) / u + G;
                    D = q["plot" + (a ? "Width" : "Height")] / u
                };
                g();
                d = H;
                d < B.min ? (d = B.min, y = !0) : d + D > B.max && (d = B.max - D, y = !0);
                y ? (v -= .8 * (v - p[b][0]), z || (x -= .8 * (x - p[b][1])), g()) : p[b] = [v, x];
                r || (c[b] = H - w, c[m] = D);
                c = r ? 1 / u : u;
                e[m] = D;
                e[b] = d;
                l[r ? a ? "scaleY" : "scaleX" : "scale" + f] = u;
                l["translate" + f] = c * w + (v - c * G)
            },
            pinch: function(a) {
                var m = this,
                    v = m.chart,
                    l = m.pinchDown,
                    e = a.touches,
                    c = e.length,
                    y = m.lastValidTouch,
                    n = m.hasZoom,
                    q = m.selectionMarker,
                    b = {},
                    f = 1 === c && (m.inClass(a.target, "highcharts-tracker") && v.runTrackerClick || m.runChartClick),
                    t = {};
                1 < c && (m.initiated = !0);
                n && m.initiated && !f && a.preventDefault();
                p(e, function(a) {
                    return m.normalize(a)
                });
                "touchstart" === a.type ? (C(e, function(a, b) {
                    l[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), y.x = [l[0].chartX, l[1] && l[1].chartX], y.y = [l[0].chartY, l[1] && l[1].chartY], C(v.axes, function(a) {
                    if (a.zoomEnabled) {
                        var b = v.bounds[a.horiz ? "h" : "v"],
                            c = a.minPixelPadding,
                            e = a.toPixels(d(a.options.min, a.dataMin)),
                            f = a.toPixels(d(a.options.max, a.dataMax)),
                            r = Math.max(e, f);
                        b.min = Math.min(a.pos, Math.min(e, f) - c);
                        b.max = Math.max(a.pos + a.len, r + c)
                    }
                }), m.res = !0) : m.followTouchMove && 1 === c ? this.runPointActions(m.normalize(a)) : l.length && (q || (m.selectionMarker = q = E({
                    destroy: g,
                    touch: !0
                }, v.plotBox)), m.pinchTranslate(l,
                    e, b, q, t, y), m.hasPinched = n, m.scaleGroups(b, t), m.res && (m.res = !1, this.reset(!1, 0)))
            },
            touch: function(g, p) {
                var m = this.chart,
                    l, e;
                if (m.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = m.index;
                1 === g.touches.length ? (g = this.normalize(g), (e = m.isInsidePlot(g.chartX - m.plotLeft, g.chartY - m.plotTop)) && !m.openMenu ? (p && this.runPointActions(g), "touchmove" === g.type && (p = this.pinchDown, l = p[0] ? 4 <= Math.sqrt(Math.pow(p[0].chartX - g.chartX, 2) + Math.pow(p[0].chartY - g.chartY, 2)) : !1), d(l, !0) && this.pinch(g)) : p && this.reset()) : 2 === g.touches.length && this.pinch(g)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(d) {
                A[a.hoverChartIndex] && A[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.charts,
            E = a.css,
            p = a.doc,
            g = a.extend,
            d = a.noop,
            m = a.Pointer,
            w = a.removeEvent,
            v = a.win,
            l = a.wrap;
        if (!a.hasTouch && (v.PointerEvent || v.MSPointerEvent)) {
            var e = {},
                c = !!v.PointerEvent,
                y = function() {
                    var c = [];
                    c.item = function(a) {
                        return this[a]
                    };
                    a.objectEach(e, function(a) {
                        c.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return c
                },
                n = function(c, b, e, g) {
                    "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !C[a.hoverChartIndex] || (g(c), g = C[a.hoverChartIndex].pointer, g[b]({
                        type: e,
                        target: c.currentTarget,
                        preventDefault: d,
                        touches: y()
                    }))
                };
            g(m.prototype, {
                onContainerPointerDown: function(a) {
                    n(a, "onContainerTouchStart", "touchstart", function(a) {
                        e[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    n(a, "onContainerTouchMove", "touchmove", function(a) {
                        e[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        e[a.pointerId].target || (e[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    n(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete e[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, c ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, c ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(p, c ?
                        "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            l(m.prototype, "init", function(a, b, c) {
                a.call(this, b, c);
                this.hasZoom && E(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            l(m.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(A)
            });
            l(m.prototype, "destroy", function(a) {
                this.batchMSEvents(w);
                a.call(this)
            })
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.css,
            E = a.discardElement,
            p = a.defined,
            g = a.each,
            d = a.fireEvent,
            m = a.isFirefox,
            w = a.marginNames,
            v = a.merge,
            l = a.pick,
            e = a.setAnimation,
            c = a.stableSort,
            y = a.win,
            n = a.wrap;
        a.Legend = function(a, b) {
            this.init(a, b)
        };
        a.Legend.prototype = {
            init: function(a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), A(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = A(this.chart, "render", function() {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            },
            setOptions: function(a) {
                var b = l(a.padding, 8);
                this.options =
                    a;
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.symbolWidth = l(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            },
            update: function(a, b) {
                var c = this.chart;
                this.setOptions(v(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                l(b, !0) && c.redraw();
                d(this, "afterUpdate")
            },
            colorizeItem: function(a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                d(this, "afterColorizeItem", {
                    item: a,
                    visible: b
                })
            },
            positionItems: function() {
                g(this.allItems, this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function(a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    e = a._legendItemPos,
                    d = e[0],
                    e = e[1],
                    g = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[p(a.translateY) ? "animate" : "attr"]({
                    translateX: b ? d : this.legendWidth - d - 2 * c - 4,
                    translateY: e
                });
                g && (g.x = d, g.y = e)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                g(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && E(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                g(this.getAllItems(), function(b) {
                    g(["legendItem", "legendGroup"], a, b)
                });
                g("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    b, c = this.clipHeight || this.legendHeight,
                    e = this.titleHeight;
                a && (b = a.translateY, g(this.allItems, function(f) {
                    var d = f.checkbox,
                        g;
                    d && (g = b + e + d.y + (this.scrollOffset || 0) + 3, C(d, {
                        left: a.translateX + f.checkboxOffset +
                            d.x - 20 + "px",
                        top: g + "px",
                        display: g > b - 6 && g < b + c - 6 ? "" : "none"
                    }))
                }, this))
            },
            renderTitle: function() {
                var a = this.options,
                    b = this.padding,
                    c = a.title,
                    e = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).add(this.group)), a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: e
                }));
                this.titleHeight = e
            },
            setText: function(c) {
                var b = this.options;
                c.legendItem.attr({
                    text: b.labelFormat ? a.format(b.labelFormat,
                        c, this.chart.time) : b.labelFormatter.call(c)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    c = b.renderer,
                    e = this.options,
                    d = this.symbolWidth,
                    g = e.symbolPadding,
                    q = "horizontal" === e.layout ? l(e.itemDistance, 20) : 0,
                    n = !e.rtl,
                    u = a.legendItem,
                    r = !a.series,
                    B = !r && a.series.drawLegendSymbol ? a.series : a,
                    z = B.options,
                    z = this.createCheckboxForItem && z && z.showCheckbox,
                    q = d + g + q + (z ? 20 : 0),
                    G = e.useHTML,
                    m = a.options.className;
                u || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + B.type + "-series highcharts-color-" + a.colorIndex + (m ?
                    " " + m : "") + (r ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = u = c.text("", n ? d + g : -g, this.baseline || 0, G).attr({
                    align: n ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = c.fontMetrics(12, u), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, u.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, B.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, u, G), z && this.createCheckboxForItem(a));
                this.colorizeItem(a,
                    a.visible);
                u.css({
                    width: (e.itemWidth || e.width || b.spacingBox.width) - q
                });
                this.setText(a);
                b = u.getBBox();
                a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width + q;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            },
            layoutItem: function(a) {
                var b = this.options,
                    c = this.padding,
                    e = "horizontal" === b.layout,
                    d = a.itemHeight,
                    g = b.itemMarginBottom || 0,
                    q = this.itemMarginTop,
                    n = e ? l(b.itemDistance,
                        20) : 0,
                    u = b.width,
                    r = u || this.chart.spacingBox.width - 2 * c - b.x,
                    b = b.alignColumns && this.totalItemWidth > r ? this.maxItemWidth : a.itemWidth;
                e && this.itemX - c + b > r && (this.itemX = c, this.itemY += q + this.lastLineHeight + g, this.lastLineHeight = 0);
                this.lastItemY = q + this.itemY + g;
                this.lastLineHeight = Math.max(d, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += b : (this.itemY += q + d + g, this.lastLineHeight = d);
                this.offsetWidth = u || Math.max((e ? this.itemX - c - (a.checkbox ? 0 : n) : b) + c, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                g(this.chart.series, function(b) {
                    var c = b && b.options;
                    b && l(c.showInLegend, p(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                d(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            },
            getAlignment: function() {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function(a, b) {
                var c = this.chart,
                    e = this.options,
                    d = this.getAlignment();
                d && g([/(lth|ct|rth)/, /(rtv|rm|rbv)/,
                    /(rbh|cb|lbh)/, /(lbv|lm|ltv)/
                ], function(f, g) {
                    f.test(d) && !p(a[g]) && (c[w[g]] = Math.max(c[w[g]], c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * e[g % 2 ? "x" : "y"] + l(e.margin, 12) + b[g] + (0 === g && void 0 !== c.options.title.margin ? c.titleOffset + c.options.title.margin : 0)))
                })
            },
            proximatePositions: function() {
                var c = this.chart,
                    b = [],
                    e = "left" === this.options.align;
                g(this.allItems, function(f) {
                    var d, g;
                    d = e;
                    f.xAxis && f.points && (f.xAxis.options.reversed && (d = !d), d = a.find(d ? f.points : f.points.slice(0).reverse(), function(b) {
                            return a.isNumber(b.plotY)
                        }),
                        g = f.legendGroup.getBBox().height, b.push({
                            target: f.visible ? d.plotY - .3 * g : c.plotHeight,
                            size: g,
                            item: f
                        }))
                }, this);
                a.distribute(b, c.plotHeight);
                g(b, function(a) {
                    a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos
                })
            },
            render: function() {
                var a = this.chart,
                    b = a.renderer,
                    e = this.group,
                    d, n, l, m = this.box,
                    p = this.options,
                    u = this.padding;
                this.itemX = u;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                e || (this.group = e = b.g("legend").attr({
                        zIndex: 7
                    }).add(), this.contentGroup = b.g().attr({
                        zIndex: 1
                    }).add(e), this.scrollGroup =
                    b.g().add(this.contentGroup));
                this.renderTitle();
                d = this.getAllItems();
                c(d, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                p.reversed && d.reverse();
                this.allItems = d;
                this.display = n = !!d.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                g(d, this.renderItem, this);
                g(d, this.layoutItem, this);
                d = (p.width || this.offsetWidth) + u;
                l = this.lastItemY + this.lastLineHeight + this.titleHeight;
                l = this.handleOverflow(l);
                l += u;
                m || (this.box = m = b.rect().addClass("highcharts-legend-box").attr({
                        r: p.borderRadius
                    }).add(e),
                    m.isNew = !0);
                0 < d && 0 < l && (m[m.isNew ? "attr" : "animate"](m.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: d,
                    height: l
                }, m.strokeWidth())), m.isNew = !1);
                m[n ? "show" : "hide"]();
                "none" === e.getStyle("display") && (d = l = 0);
                this.legendWidth = d;
                this.legendHeight = l;
                n && (b = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (b = v(b, {
                    y: b.y + a.titleOffset + a.options.title.margin
                })), e.align(v(p, {
                    width: d,
                    height: l,
                    verticalAlign: this.proximate ? "top" : p.verticalAlign
                }), !0, b));
                this.proximate || this.positionItems()
            },
            handleOverflow: function(a) {
                var b = this,
                    c = this.chart,
                    e = c.renderer,
                    d = this.options,
                    n = d.y,
                    q = this.padding,
                    c = c.spacingBox.height + ("top" === d.verticalAlign ? -n : n) - q,
                    n = d.maxHeight,
                    m, u = this.clipRect,
                    r = d.navigation,
                    B = l(r.animation, !0),
                    z = r.arrowSize || 12,
                    G = this.nav,
                    p = this.pages,
                    h, x = this.allItems,
                    v = function(a) {
                        "number" === typeof a ? u.attr({
                            height: a
                        }) : u && (b.clipRect = u.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + q + "px,9999px," + (q + a) + "px,0)" : "auto")
                    };
                "horizontal" !== d.layout || "middle" === d.verticalAlign || d.floating ||
                    (c /= 2);
                n && (c = Math.min(c, n));
                p.length = 0;
                a > c && !1 !== r.enabled ? (this.clipHeight = m = Math.max(c - 20 - this.titleHeight - q, 0), this.currentPage = l(this.currentPage, 1), this.fullHeight = a, g(x, function(a, b) {
                    var c = a._legendItemPos[1],
                        e = Math.round(a.legendItem.getBBox().height),
                        k = p.length;
                    if (!k || c - p[k - 1] > m && (h || c) !== p[k - 1]) p.push(h || c), k++;
                    a.pageIx = k - 1;
                    h && (x[b - 1].pageIx = k - 1);
                    b === x.length - 1 && c + e - p[k - 1] > m && (p.push(c), a.pageIx = k);
                    c !== h && (h = c)
                }), u || (u = b.clipRect = e.clipRect(0, q, 9999, 0), b.contentGroup.clip(u)), v(m), G || (this.nav =
                    G = e.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = e.symbol("triangle", 0, 0, z, z).on("click", function() {
                        b.scroll(-1, B)
                    }).add(G), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation").add(G), this.down = e.symbol("triangle-down", 0, 0, z, z).on("click", function() {
                        b.scroll(1, B)
                    }).add(G)), b.scroll(0), a = c) : G && (v(), this.nav = G.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, b) {
                var c = this.pages,
                    d = c.length;
                a = this.currentPage + a;
                var g = this.clipHeight,
                    n = this.pager,
                    l = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== b && e(b, this.chart), this.nav.attr({
                        translateX: l,
                        translateY: g + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), n.attr({
                        text: a + "/" + d
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.scrollOffset = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }),
                    this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, b) {
                var c = a.symbolHeight,
                    e = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(e ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, e ? c : a.symbolWidth, c, l(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options.marker,
                    c, e = a.symbolWidth,
                    d = a.symbolHeight;
                c = d / 2;
                var g = this.chart.renderer,
                    n = this.legendGroup;
                a = a.baseline - Math.round(.3 *
                    a.fontMetrics.b);
                this.legendLine = g.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr({}).add(n);
                b && !1 !== b.enabled && e && (c = Math.min(l(b.radius, c), c), 0 === this.symbol.indexOf("url") && (b = v(b, {
                    width: d,
                    height: d
                }), c = 0), this.legendSymbol = b = g.symbol(this.symbol, e / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(n), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(y.navigator.userAgent) || m) && n(a.Legend.prototype, "positionItem", function(a, b) {
            var c = this,
                e = function() {
                    b._legendItemPos && a.call(c, b)
                };
            e();
            setTimeout(e)
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.animObject,
            E = a.attr,
            p = a.doc,
            g = a.Axis,
            d = a.createElement,
            m = a.defaultOptions,
            w = a.discardElement,
            v = a.charts,
            l = a.defined,
            e = a.each,
            c = a.extend,
            y = a.find,
            n = a.fireEvent,
            q = a.grep,
            b = a.isNumber,
            f = a.isObject,
            t = a.isString,
            F = a.Legend,
            J = a.marginNames,
            D = a.merge,
            H = a.objectEach,
            u = a.Pointer,
            r = a.pick,
            B = a.pInt,
            z = a.removeEvent,
            G = a.seriesTypes,
            M = a.splat,
            h = a.syncTimeout,
            x = a.win,
            N = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, b, c) {
            return new N(a, b, c)
        };
        c(N.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (t(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b, c) {
                var e, k, d = b.series,
                    h = b.plotOptions || {};
                n(this, "init", {
                    args: arguments
                }, function() {
                    b.series = null;
                    e = D(m, b);
                    for (k in e.plotOptions) e.plotOptions[k].tooltip = h[k] && D(h[k].tooltip) || void 0;
                    e.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    e.series = b.series = d;
                    this.userOptions = b;
                    var f = e.chart,
                        r = f.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = c;
                    this.isResizing = 0;
                    this.options = e;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && a.keys(b.time).length ? new a.Time(b.time) : a.time;
                    this.hasCartesianSeries = f.showAxes;
                    var g = this;
                    g.index = v.length;
                    v.push(g);
                    a.chartCount++;
                    r && H(r, function(a, b) {
                        A(g, b, a)
                    });
                    g.xAxis = [];
                    g.yAxis = [];
                    g.pointCount = g.colorCounter = g.symbolCounter = 0;
                    n(g, "afterInit");
                    g.firstRender()
                })
            },
            initSeries: function(b) {
                var c = this.options.chart;
                (c = G[b.type || c.type || c.defaultSeriesType]) ||
                a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function(a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function(a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                n(this, "beforeRedraw");
                var k = this.axes,
                    d = this.series,
                    h = this.pointer,
                    f = this.legend,
                    r = this.isDirtyLegend,
                    g, z, l = this.hasCartesianSeries,
                    B = this.isDirtyBox,
                    q, u = this.renderer,
                    t = u.isHidden(),
                    x = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                t && this.temporaryDisplay();
                this.layOutTitles();
                for (b = d.length; b--;)
                    if (q = d[b], q.options.stacking && (g = !0, q.isDirty)) {
                        z = !0;
                        break
                    }
                if (z)
                    for (b = d.length; b--;) q = d[b], q.options.stacking && (q.isDirty = !0);
                e(d, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), r = !0);
                    a.isDirtyData && n(a, "updatedData")
                });
                r && f.options.enabled && (f.render(), this.isDirtyLegend = !1);
                g && this.getStacks();
                l && e(k, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                l && (e(k,
                    function(a) {
                        a.isDirty && (B = !0)
                    }), e(k, function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, x.push(function() {
                        n(a, "afterSetExtremes", c(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (B || g) && a.redraw()
                }));
                B && this.drawChartBox();
                n(this, "predraw");
                e(d, function(a) {
                    (B || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                h && h.reset(!0);
                u.draw();
                n(this, "redraw");
                n(this, "render");
                t && this.temporaryDisplay(!0);
                e(x, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id ===
                        a
                }
                var c, e = this.series,
                    d;
                c = y(this.axes, b) || y(this.series, b);
                for (d = 0; !c && d < e.length; d++) c = y(e[d].points || [], b);
                return c
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = M(b.xAxis || {}),
                    b = b.yAxis = M(b.yAxis || {});
                n(this, "getAxes");
                e(c, function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                e(b, function(a, b) {
                    a.index = b
                });
                c = c.concat(b);
                e(c, function(b) {
                    new g(a, b)
                });
                n(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var a = [];
                e(this.series, function(b) {
                    a = a.concat(q(b.data || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return q(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, c) {
                var d = this,
                    h = d.options,
                    k;
                k = h.title = D(h.title, a);
                h = h.subtitle = D(h.subtitle, b);
                e([
                    ["title", a, k],
                    ["subtitle", b, h]
                ], function(a, b) {
                    var c = a[0],
                        e = d[c],
                        h = a[1];
                    a = a[2];
                    e && h && (d[c] = e = e.destroy());
                    a && !e && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function(a) {
                        d.setTitle(!b && a, b && a)
                    })
                });
                d.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b =
                    0,
                    d, h = this.renderer,
                    k = this.spacingBox;
                e(["title", "subtitle"], function(a) {
                    var e = this[a],
                        d = this.options[a];
                    a = "title" === a ? -3 : d.verticalAlign ? 0 : b + 2;
                    var f;
                    e && (f = h.fontMetrics(f, e).b, e.css({
                        width: (d.width || k.width + d.widthAdjust) + "px"
                    }).align(c({
                        y: a + f
                    }, d), !1, "spacingBox"), d.floating || d.verticalAlign || (b = Math.ceil(b + e.getBBox(d.useHTML).height)))
                }, this);
                d = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && d && (this.isDirtyBox = this.isDirtyLegend = d, this.hasRendered && r(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    e = this.renderTo;
                l(c) || (this.containerWidth = a.getStyle(e, "width"));
                l(b) || (this.containerHeight = a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached &&
                        (p.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        p.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, p.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === p.body) break
                    }
            },
            setClassName: function(a) {
                this.container.className =
                    "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var c, e = this.options,
                    h = e.chart,
                    f, r;
                c = this.renderTo;
                var g = a.uniqueKey(),
                    z;
                c || (this.renderTo = c = h.renderTo);
                t(c) && (this.renderTo = c = p.getElementById(c));
                c || a.error(13, !0);
                f = B(E(c, "data-highcharts-chart"));
                b(f) && v[f] && v[f].hasRendered && v[f].destroy();
                E(c, "data-highcharts-chart", this.index);
                c.innerHTML = "";
                h.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                f = this.chartWidth;
                r = this.chartHeight;
                this.container = c = d("div", {
                        id: g
                    }, void 0,
                    c);
                this._cursor = c.style.cursor;
                this.renderer = new(a[h.renderer] || a.Renderer)(c, f, r, null, h.forExport, e.exporting && e.exporting.allowHTML);
                this.setClassName(h.className);
                for (z in e.defs) this.renderer.definition(e.defs[z]);
                this.renderer.chartIndex = this.index;
                n(this, "afterGetContainer")
            },
            getMargins: function(a) {
                var b = this.spacing,
                    c = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !l(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(c,
                    b);
                n(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && e(a.axes, function(a) {
                    a.visible && a.getOffset()
                });
                e(J, function(e, d) {
                    l(c[d]) || (a[e] += b[d])
                });
                a.setChartSize()
            },
            reflow: function(b) {
                var c = this,
                    e = c.options.chart,
                    d = c.renderTo,
                    f = l(e.width) && l(e.height),
                    k = e.width || a.getStyle(d, "width"),
                    e = e.height || a.getStyle(d, "height"),
                    d = b ? b.target : x;
                if (!f && !c.isPrinting && k && e && (d === x || d === p)) {
                    if (k !== c.containerWidth || e !== c.containerHeight) a.clearTimeout(c.reflowTimeout),
                        c.reflowTimeout = h(function() {
                            c.container && c.setSize(void 0, void 0, !1)
                        }, b ? 100 : 0);
                    c.containerWidth = k;
                    c.containerHeight = e
                }
            },
            setReflow: function(a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = A(x, "resize", function(a) {
                    b.reflow(a)
                }), A(this, "destroy", this.unbindReflow))
            },
            setSize: function(b, c, d) {
                var f = this,
                    k = f.renderer;
                f.isResizing += 1;
                a.setAnimation(d, f);
                f.oldChartHeight = f.chartHeight;
                f.oldChartWidth = f.chartWidth;
                void 0 !== b && (f.options.chart.width =
                    b);
                void 0 !== c && (f.options.chart.height = c);
                f.getChartSize();
                f.setChartSize(!0);
                k.setSize(f.chartWidth, f.chartHeight, d);
                e(f.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                f.isDirtyLegend = !0;
                f.isDirtyBox = !0;
                f.layOutTitles();
                f.getMargins();
                f.redraw(d);
                f.oldChartHeight = null;
                n(f, "resize");
                h(function() {
                    f && n(f, "endResize", null, function() {
                        --f.isResizing
                    })
                }, C(void 0).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    c = this.renderer,
                    d = this.chartWidth,
                    f = this.chartHeight,
                    h = this.options.chart,
                    k = this.spacing,
                    r = this.clipOffset,
                    g, z, l, B;
                this.plotLeft = g = Math.round(this.plotLeft);
                this.plotTop = z = Math.round(this.plotTop);
                this.plotWidth = l = Math.max(0, Math.round(d - g - this.marginRight));
                this.plotHeight = B = Math.max(0, Math.round(f - z - this.marginBottom));
                this.plotSizeX = b ? B : l;
                this.plotSizeY = b ? l : B;
                this.plotBorderWidth = h.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: k[3],
                    y: k[0],
                    width: d - k[3] - k[1],
                    height: f - k[0] - k[2]
                };
                this.plotBox = c.plotBox = {
                    x: g,
                    y: z,
                    width: l,
                    height: B
                };
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d,
                    r[3]) / 2);
                c = Math.ceil(Math.max(d, r[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(d, r[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, r[2]) / 2 - c))
                };
                a || e(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                n(this, "afterSetChartSize", {
                    skipAxes: a
                })
            },
            resetMargins: function() {
                var a = this,
                    b = a.options.chart;
                e(["margin", "spacing"], function(c) {
                    var d = b[c],
                        h = f(d) ? d : [d, d, d, d];
                    e(["Top", "Right", "Bottom", "Left"], function(e, d) {
                        a[c][d] = r(b[c + e], h[d])
                    })
                });
                e(J, function(b,
                    c) {
                    a[b] = r(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    d = this.chartBackground,
                    f = this.plotBackground,
                    h = this.plotBorder,
                    r, g, z = this.plotLeft,
                    l = this.plotTop,
                    B = this.plotWidth,
                    q = this.plotHeight,
                    u = this.plotBox,
                    t = this.clipRect,
                    x = this.clipBox,
                    m = "animate";
                d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), m = "attr");
                r = g = d.strokeWidth();
                d[m]({
                    x: g / 2,
                    y: g / 2,
                    width: c - g - r % 2,
                    height: e - g - r % 2,
                    r: a.borderRadius
                });
                m = "animate";
                f || (m = "attr", this.plotBackground = f = b.rect().addClass("highcharts-plot-background").add());
                f[m](u);
                t ? t.animate({
                    width: x.width,
                    height: x.height
                }) : this.clipRect = b.clipRect(x);
                m = "animate";
                h || (m = "attr", this.plotBorder = h = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                h[m](h.crisp({
                    x: z,
                    y: l,
                    width: B,
                    height: q
                }, -h.strokeWidth()));
                this.isDirtyBox = !1;
                n(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, d = a.options.series,
                    f, h;
                e(["inverted", "angular", "polar"], function(e) {
                    c = G[b.type || b.defaultSeriesType];
                    h = b[e] || c && c.prototype[e];
                    for (f = d && d.length; !h && f--;)(c = G[d[f].type]) && c.prototype[e] && (h = !0);
                    a[e] = h
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                e(b, function(a) {
                    a.linkedSeries.length = 0
                });
                e(b, function(b) {
                    var c = b.options.linkedTo;
                    t(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = r(b.options.visible, c.options.visible, b.visible))
                });
                n(this, "afterLinkSeries")
            },
            renderSeries: function() {
                e(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && e(b.items, function(e) {
                    var d = c(b.style, e.style),
                        f = B(d.left) + a.plotLeft,
                        h = B(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(e.html, f, h).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    d, f, h;
                this.setTitle();
                this.legend = new F(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                e(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                f = 1.1 < c / this.plotWidth;
                h = 1.05 < d / this.plotHeight;
                if (f || h) e(a, function(a) {
                    (a.horiz && f || !a.horiz && h) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && e(a, function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = D(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    a.href && (x.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var b = this,
                    c = b.axes,
                    d = b.series,
                    f = b.container,
                    h, r = f && f.parentNode;
                n(b, "destroy");
                b.renderer.forExport ? a.erase(v, b) : v[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                z(b);
                for (h = c.length; h--;) c[h] = c[h].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (h = d.length; h--;) d[h] = d[h].destroy();
                e("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
                    function(a) {
                        var c = b[a];
                        c && c.destroy && (b[a] = c.destroy())
                    });
                f && (f.innerHTML = "", z(f), r && w(f));
                H(b, function(a, c) {
                    delete b[c]
                })
            },
            firstRender: function() {
                var a = this,
                    b = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    e(b.series || [], function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    n(a, "beforeRender");
                    u && (a.pointer = new u(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function() {
                e([this.callback].concat(this.callbacks),
                    function(a) {
                        a && void 0 !== this.index && a.apply(this, [this])
                    }, this);
                n(this, "load");
                n(this, "render");
                l(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.Chart,
            E = a.each;
        A(C, "afterSetChartSize", function(p) {
            var g = this.options.chart.scrollablePlotArea;
            (g = g && g.minWidth) && !this.renderer.forExport && (this.scrollablePixels = g = Math.max(0, g - this.chartWidth)) && (this.plotWidth += g, this.clipBox.width += g, p.skipAxes || E(this.axes, function(d) {
                1 === d.side ? d.getPlotLinePath =
                    function() {
                        var g = this.right,
                            p;
                        this.right = g - d.chart.scrollablePixels;
                        p = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this.right = g;
                        return p
                    } : (d.setAxisSize(), d.setAxisTranslation())
            }))
        });
        A(C, "render", function() {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        C.prototype.setUpScrolling = function() {
            this.scrollingContainer = a.createElement("div", {
                    className: "highcharts-scrolling"
                }, {
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch"
                },
                this.renderTo);
            this.innerContainer = a.createElement("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        C.prototype.applyFixed = function() {
            var p = this.container,
                g, d, m = !this.fixedDiv;
            m && (this.fixedDiv = a.createElement("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.fixedRenderer =
                g = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = g.path().attr({
                    fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(), a.each([this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title"], function(d) {
                    a.each(p.querySelectorAll(d), function(a) {
                        g.box.appendChild(a);
                        a.style.pointerEvents = "auto"
                    })
                }));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            d = this.chartWidth + this.scrollablePixels;
            this.container.style.width = d + "px";
            this.renderer.boxWrapper.attr({
                width: d,
                height: this.chartHeight,
                viewBox: [0, 0, d, this.chartHeight].join(" ")
            });
            m && (d = this.options.chart.scrollablePlotArea, d.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * d.scrollPositionX));
            m = this.axisOffset;
            d = this.plotTop - m[0] - 1;
            var m = this.plotTop + this.plotHeight + m[2],
                w = this.plotLeft +
                this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({
                d: this.scrollablePixels ? ["M", 0, d, "L", this.plotLeft - 1, d, "L", this.plotLeft - 1, m, "L", 0, m, "Z", "M", w, d, "L", this.chartWidth, d, "L", this.chartWidth, m, "L", w, m, "Z"] : ["M", 0, 0]
            })
        }
    })(K);
    (function(a) {
        var A, C = a.each,
            E = a.extend,
            p = a.erase,
            g = a.fireEvent,
            d = a.format,
            m = a.isArray,
            w = a.isNumber,
            v = a.pick,
            l = a.removeEvent;
        a.Point = A = function() {};
        a.Point.prototype = {
            init: function(a, c, d) {
                var e = a.chart.options.chart.colorCount;
                this.series = a;
                this.applyOptions(c, d);
                a.options.colorByPoint ?
                    (c = a.colorCounter, a.colorCounter++, a.colorCounter === e && (a.colorCounter = 0)) : c = a.colorIndex;
                this.colorIndex = v(this.colorIndex, c);
                a.chart.pointCount++;
                g(this, "afterInit");
                return this
            },
            applyOptions: function(a, c) {
                var e = this.series,
                    d = e.options.pointValKey || e.pointValKey;
                a = A.prototype.optionsToObject.call(this, a);
                E(this, a);
                this.options = this.options ? E(this.options, a) : a;
                a.group && delete this.group;
                d && (this.y = this[d]);
                this.isNull = v(this.isValid && !this.isValid(), null === this.x || !w(this.y, !0));
                this.selected && (this.state =
                    "select");
                "name" in this && void 0 === c && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
                void 0 === this.x && e && (this.x = void 0 === c ? e.autoIncrement(this) : c);
                return this
            },
            setNestedProperty: function(e, c, d) {
                d = d.split(".");
                a.reduce(d, function(e, d, b, f) {
                    e[d] = f.length - 1 === b ? c : a.isObject(e[d], !0) ? e[d] : {};
                    return e[d]
                }, e);
                return e
            },
            optionsToObject: function(e) {
                var c = {},
                    d = this.series,
                    g = d.options.keys,
                    l = g || d.pointArrayMap || ["y"],
                    b = l.length,
                    f = 0,
                    t = 0;
                if (w(e) || null === e) c[l[0]] = e;
                else if (m(e))
                    for (!g && e.length > b &&
                        (d = typeof e[0], "string" === d ? c.name = e[0] : "number" === d && (c.x = e[0]), f++); t < b;) g && void 0 === e[f] || (0 < l[t].indexOf(".") ? a.Point.prototype.setNestedProperty(c, e[f], l[t]) : c[l[t]] = e[f]), f++, t++;
                else "object" === typeof e && (c = e, e.dataLabels && (d._hasPointLabels = !0), e.marker && (d._hasPointMarkers = !0));
                return c
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ?
                    " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function() {
                var a = this.series,
                    c = a.zones,
                    a = a.zoneAxis || "y",
                    d = 0,
                    g;
                for (g = c[d]; this[a] >= g.value;) g = c[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = g && g.color && !this.options.color ? g.color : this.nonZonedColor;
                return g
            },
            destroy: function() {
                var a = this.series.chart,
                    c = a.hoverPoints,
                    d;
                a.pointCount--;
                c && (this.setState(), p(c, this), c.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) l(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (d in this) this[d] = null
            },
            destroyElements: function() {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], c, d = 6; d--;) c = a[d], this[c] && (this[c] = this[c].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name ||
                        this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var c = this.series,
                    e = c.tooltipOptions,
                    g = v(e.valueDecimals, ""),
                    l = e.valuePrefix || "",
                    b = e.valueSuffix || "";
                C(c.pointArrayMap || ["y"], function(c) {
                    c = "{point." + c;
                    if (l || b) a = a.replace(RegExp(c + "}", "g"), l + c + "}" + b);
                    a = a.replace(RegExp(c + "}", "g"), c + ":,." + g + "f}")
                });
                return d(a, {
                    point: this,
                    series: this.series
                }, c.chart.time)
            },
            firePointEvent: function(a, c, d) {
                var e = this,
                    l = this.series.options;
                (l.point.events[a] || e.options && e.options.events && e.options.events[a]) && this.importEvents();
                "click" === a && l.allowPointSelect && (d = function(a) {
                    e.select && e.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                g(this, a, c, d)
            },
            visible: !0
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.animObject,
            E = a.arrayMax,
            p = a.arrayMin,
            g = a.correctFloat,
            d = a.defaultOptions,
            m = a.defined,
            w = a.each,
            v = a.erase,
            l = a.extend,
            e = a.fireEvent,
            c = a.grep,
            y = a.isArray,
            n = a.isNumber,
            q = a.isString,
            b = a.merge,
            f = a.objectEach,
            t = a.pick,
            F = a.removeEvent,
            J = a.splat,
            D = a.SVGElement,
            H = a.syncTimeout,
            u = a.win;
        a.Series = a.seriesType("line", null, {
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var c = this,
                    d, g = a.series,
                    h;
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                l(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                d = b.events;
                f(d, function(a, b) {
                    A(c, b, a)
                });
                if (d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                w(c.parallelArrays, function(a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                g.length && (h = g[g.length - 1]);
                c._i = t(h && h._i, -1) + 1;
                a.orderSeries(this.insert(g));
                e(this, "afterInit")
            },
            insert: function(a) {
                var b = this.options.index,
                    c;
                if (n(b)) {
                    for (c = a.length; c--;)
                        if (b >= t(a[c].options.index, a[c]._i)) {
                            a.splice(c +
                                1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return t(c, a.length - 1)
            },
            bindAxes: function() {
                var b = this,
                    c = b.options,
                    e = b.chart,
                    d;
                w(b.axisTypes || [], function(f) {
                    w(e[f], function(a) {
                        d = a.options;
                        if (c[f] === d.index || void 0 !== c[f] && c[f] === d.id || void 0 === c[f] && 0 === d.index) b.insert(a.series), b[f] = a, a.isDirty = !0
                    });
                    b[f] || b.optionalAxis === f || a.error(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var c = a.series,
                    e = arguments,
                    d = n(b) ? function(e) {
                        var d = "y" === e && c.toYData ? c.toYData(a) : a[e];
                        c[e + "Data"][b] =
                            d
                    } : function(a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(e, 2))
                    };
                w(c.parallelArrays, d)
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    c, e = a.pointIntervalUnit,
                    d = this.chart.time,
                    b = t(b, a.pointStart, 0);
                this.pointInterval = c = t(this.pointInterval, a.pointInterval, 1);
                e && (a = new d.Date(b), "day" === e ? d.set("Date", a, d.get("Date", a) + c) : "month" === e ? d.set("Month", a, d.get("Month", a) + c) : "year" === e && d.set("FullYear", a, d.get("FullYear", a) + c), c = a.getTime() - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function(a) {
                var c = this.chart,
                    f = c.options,
                    g = f.plotOptions,
                    r = (c.userOptions || {}).plotOptions || {},
                    h = g[this.type];
                this.userOptions = a;
                c = b(h, g.series, a);
                this.tooltipOptions = b(d.tooltip, d.plotOptions.series && d.plotOptions.series.tooltip, d.plotOptions[this.type].tooltip, f.tooltip.userOptions, g.series && g.series.tooltip, g[this.type].tooltip, a.tooltip);
                this.stickyTracking = t(a.stickyTracking, r[this.type] && r[this.type].stickyTracking, r.series && r.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ?
                    !0 : c.stickyTracking);
                null === h.marker && delete c.marker;
                this.zoneAxis = c.zoneAxis;
                a = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    className: "highcharts-negative"
                });
                a.length && m(a[a.length - 1].value) && a.push({});
                e(this, "afterSetOptions", {
                    options: c
                });
                return c
            },
            getName: function() {
                return this.name || "Series " + (this.index + 1)
            },
            getCyclic: function(a, b, c) {
                var e, d = this.chart,
                    f = this.userOptions,
                    g = a + "Index",
                    r = a + "Counter",
                    k = c ? c.length : t(d.options.chart[a + "Count"], d[a + "Count"]);
                b || (e = t(f[g], f["_" + g]), m(e) || (d.series.length || (d[r] = 0), f["_" + g] = e = d[r] % k, d[r] += 1), c && (b = c[e]));
                void 0 !== e && (this[g] = e);
                this[a] = b
            },
            getColor: function() {
                this.getCyclic("color")
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function(b) {
                var c = this.options,
                    e = this.points,
                    d = [],
                    f, h, g, r = this.requireSorting;
                w(b, function(b) {
                    var h;
                    h = a.defined(b) &&
                        this.pointClass.prototype.optionsToObject.call({
                            series: this
                        }, b).x;
                    n(h) && (h = a.inArray(h, this.xData, g), -1 === h ? d.push(b) : b !== c.data[h] ? (e[h].update(b, !1, null, !1), e[h].touched = !0, r && (g = h)) : e[h] && (e[h].touched = !0), f = !0)
                }, this);
                if (f)
                    for (b = e.length; b--;) h = e[b], h.touched || h.remove(!1), h.touched = !1;
                else if (b.length === e.length) w(b, function(a, b) {
                    e[b].update && a !== c.data[b] && e[b].update(a, !1, null, !1)
                });
                else return !1;
                w(d, function(a) {
                    this.addPoint(a, !1)
                }, this);
                return !0
            },
            setData: function(b, c, e, d) {
                var f = this,
                    h = f.points,
                    g = h && h.length || 0,
                    r, k = f.options,
                    l = f.chart,
                    z = null,
                    u = f.xAxis,
                    B = k.turboThreshold,
                    m = this.xData,
                    p = this.yData,
                    D = (r = f.pointArrayMap) && r.length,
                    G;
                b = b || [];
                r = b.length;
                c = t(c, !0);
                !1 !== d && r && g && !f.cropped && !f.hasGroupedData && f.visible && (G = this.updateData(b));
                if (!G) {
                    f.xIncrement = null;
                    f.colorCounter = 0;
                    w(this.parallelArrays, function(a) {
                        f[a + "Data"].length = 0
                    });
                    if (B && r > B) {
                        for (e = 0; null === z && e < r;) z = b[e], e++;
                        if (n(z))
                            for (e = 0; e < r; e++) m[e] = this.autoIncrement(), p[e] = b[e];
                        else if (y(z))
                            if (D)
                                for (e = 0; e < r; e++) z = b[e], m[e] = z[0], p[e] =
                                    z.slice(1, D + 1);
                            else
                                for (e = 0; e < r; e++) z = b[e], m[e] = z[0], p[e] = z[1];
                        else a.error(12)
                    } else
                        for (e = 0; e < r; e++) void 0 !== b[e] && (z = {
                            series: f
                        }, f.pointClass.prototype.applyOptions.apply(z, [b[e]]), f.updateParallelArrays(z, e));
                    p && q(p[0]) && a.error(14, !0);
                    f.data = [];
                    f.options.data = f.userOptions.data = b;
                    for (e = g; e--;) h[e] && h[e].destroy && h[e].destroy();
                    u && (u.minRange = u.userMinRange);
                    f.isDirty = l.isDirtyBox = !0;
                    f.isDirtyData = !!h;
                    e = !1
                }
                "point" === k.legendType && (this.processData(), this.generatePoints());
                c && l.redraw(e)
            },
            processData: function(b) {
                var c =
                    this.xData,
                    e = this.yData,
                    d = c.length,
                    f;
                f = 0;
                var h, g, r = this.xAxis,
                    k, l = this.options;
                k = l.cropThreshold;
                var n = this.getExtremesFromAll || l.getExtremesFromAll,
                    q = this.isCartesian,
                    l = r && r.val2lin,
                    u = r && r.isLog,
                    t = this.requireSorting,
                    m, p;
                if (q && !this.isDirty && !r.isDirty && !this.yAxis.isDirty && !b) return !1;
                r && (b = r.getExtremes(), m = b.min, p = b.max);
                if (q && this.sorted && !n && (!k || d > k || this.forceCrop))
                    if (c[d - 1] < m || c[0] > p) c = [], e = [];
                    else if (c[0] < m || c[d - 1] > p) f = this.cropData(this.xData, this.yData, m, p), c = f.xData, e = f.yData, f = f.start,
                    h = !0;
                for (k = c.length || 1; --k;) d = u ? l(c[k]) - l(c[k - 1]) : c[k] - c[k - 1], 0 < d && (void 0 === g || d < g) ? g = d : 0 > d && t && (a.error(15), t = !1);
                this.cropped = h;
                this.cropStart = f;
                this.processedXData = c;
                this.processedYData = e;
                this.closestPointRange = g
            },
            cropData: function(a, b, c, e, d) {
                var f = a.length,
                    g = 0,
                    r = f,
                    k;
                d = t(d, this.cropShoulder, 1);
                for (k = 0; k < f; k++)
                    if (a[k] >= c) {
                        g = Math.max(0, k - d);
                        break
                    }
                for (c = k; c < f; c++)
                    if (a[c] > e) {
                        r = c + d;
                        break
                    }
                return {
                    xData: a.slice(g, r),
                    yData: b.slice(g, r),
                    start: g,
                    end: r
                }
            },
            generatePoints: function() {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    e, d = this.processedXData,
                    f = this.processedYData,
                    g = this.pointClass,
                    l = d.length,
                    k = this.cropStart || 0,
                    n, q = this.hasGroupedData,
                    a = a.keys,
                    u, t = [],
                    m;
                c || q || (c = [], c.length = b.length, c = this.data = c);
                a && q && (this.options.keys = !1);
                for (m = 0; m < l; m++) n = k + m, q ? (u = (new g).init(this, [d[m]].concat(J(f[m]))), u.dataGroup = this.groupMap[m]) : (u = c[n]) || void 0 === b[n] || (c[n] = u = (new g).init(this, b[n], d[m])), u && (u.index = n, t[m] = u);
                this.options.keys = a;
                if (c && (l !== (e = c.length) || q))
                    for (m = 0; m < e; m++) m !== k || q || (m += l), c[m] && (c[m].destroyElements(),
                        c[m].plotX = void 0);
                this.data = c;
                this.points = t
            },
            getExtremes: function(a) {
                var b = this.yAxis,
                    c = this.processedXData,
                    e, d = [],
                    f = 0;
                e = this.xAxis.getExtremes();
                var g = e.min,
                    r = e.max,
                    k, l, q = this.requireSorting ? 1 : 0,
                    u, t;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (t = 0; t < e; t++)
                    if (l = c[t], u = a[t], k = (n(u, !0) || y(u)) && (!b.positiveValuesOnly || u.length || 0 < u), l = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[t + q] || l) >= g && (c[t - q] || l) <= r, k && l)
                        if (k = u.length)
                            for (; k--;) "number" === typeof u[k] &&
                                (d[f++] = u[k]);
                        else d[f++] = u;
                this.dataMin = p(d);
                this.dataMax = E(d)
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    c = this.xAxis,
                    d = c.categories,
                    f = this.yAxis,
                    h = this.points,
                    l = h.length,
                    q = !!this.modifyValue,
                    k = a.pointPlacement,
                    u = "between" === k || n(k),
                    p = a.threshold,
                    D = a.startFromThreshold ? p : 0,
                    v, H, w, y, F = Number.MAX_VALUE;
                "between" === k && (k = .5);
                n(k) && (k *= t(a.pointRange || c.pointRange));
                for (a = 0; a < l; a++) {
                    var J = h[a],
                        A = J.x,
                        C = J.y;
                    H = J.low;
                    var E = b && f.stacks[(this.negStacks &&
                            C < (D ? 0 : p) ? "-" : "") + this.stackKey],
                        K;
                    f.positiveValuesOnly && null !== C && 0 >= C && (J.isNull = !0);
                    J.plotX = v = g(Math.min(Math.max(-1E5, c.translate(A, 0, 0, 0, 1, k, "flags" === this.type)), 1E5));
                    b && this.visible && !J.isNull && E && E[A] && (y = this.getStackIndicator(y, A, this.index), K = E[A], C = K.points[y.key], H = C[0], C = C[1], H === D && y.key === E[A].base && (H = t(n(p) && p, f.min)), f.positiveValuesOnly && 0 >= H && (H = null), J.total = J.stackTotal = K.total, J.percentage = K.total && J.y / K.total * 100, J.stackY = C, K.setOffset(this.pointXOffset || 0, this.barW || 0));
                    J.yBottom = m(H) ? Math.min(Math.max(-1E5, f.translate(H, 0, 1, 0, 1)), 1E5) : null;
                    q && (C = this.modifyValue(C, J));
                    J.plotY = H = "number" === typeof C && Infinity !== C ? Math.min(Math.max(-1E5, f.translate(C, 0, 1, 0, 1)), 1E5) : void 0;
                    J.isInside = void 0 !== H && 0 <= H && H <= f.len && 0 <= v && v <= c.len;
                    J.clientX = u ? g(c.translate(A, 0, 0, 0, 1, k)) : v;
                    J.negative = J.y < (p || 0);
                    J.category = d && void 0 !== d[J.x] ? d[J.x] : J.x;
                    J.isNull || (void 0 !== w && (F = Math.min(F, Math.abs(v - w))), w = v);
                    J.zone = this.zones.length && J.getZone()
                }
                this.closestPointRangePx = F;
                e(this, "afterTranslate")
            },
            getValidPoints: function(a, b) {
                var e = this.chart;
                return c(a || this.points || [], function(a) {
                    return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    e = b.renderer,
                    d = b.inverted,
                    f = this.clipBox,
                    g = f || b.clipBox,
                    r = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(),
                    k = b[r],
                    l = b[r + "m"];
                k || (a && (g.width = 0, d && (g.x = b.plotSizeX), b[r + "m"] = l = e.clipRect(d ? b.plotSizeX + 99 : -99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth :
                    b.chartHeight)), b[r] = k = e.clipRect(g), k.count = {
                    length: 0
                });
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || f ? k : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = r);
                a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && r && b[r] && (f || (b[r] = b[r].destroy()), b[r + "m"] && (b[r + "m"] = b[r + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = C(this.options.animation),
                    e;
                a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) &&
                    a.animate({
                        width: b.plotSizeX,
                        x: 0
                    }, c), b[e + "m"] && b[e + "m"].animate({
                        width: b.plotSizeX + 99,
                        x: 0
                    }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                e(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    c, e, d, f, g = this.options.marker,
                    l, k, n, q = this[this.specialGroup] || this.markerGroup,
                    u, m = t(g.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= g.enabledThreshold * g.radius);
                if (!1 !== g.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) e =
                        a[c], f = e.graphic, l = e.marker || {}, k = !!e.marker, d = m && void 0 === l.enabled || l.enabled, n = e.isInside, d && !e.isNull ? (d = t(l.symbol, this.symbol), u = this.markerAttribs(e, e.selected && "select"), f ? f[n ? "show" : "hide"](!0).animate(u) : n && (0 < u.width || e.hasImage) && (e.graphic = f = b.renderer.symbol(d, u.x, u.y, u.width, u.height, k ? l : g).add(q)), f && f.addClass(e.getClassName(), !0)) : f && (e.graphic = f.destroy())
            },
            markerAttribs: function(a, b) {
                var c = this.options.marker,
                    e = a.marker || {},
                    d = e.symbol || c.symbol,
                    f = t(e.radius, c.radius);
                b && (c = c.states[b],
                    b = e.states && e.states[b], f = t(b && b.radius, c && c.radius, f + (c && c.radiusPlus || 0)));
                a.hasImage = d && 0 === d.indexOf("url");
                a.hasImage && (f = 0);
                a = {
                    x: Math.floor(a.plotX) - f,
                    y: a.plotY - f
                };
                f && (a.width = a.height = 2 * f);
                return a
            },
            destroy: function() {
                var b = this,
                    c = b.chart,
                    d = /AppleWebKit\/533/.test(u.navigator.userAgent),
                    g, l, h = b.data || [],
                    n, q;
                e(b, "destroy");
                F(b);
                w(b.axisTypes || [], function(a) {
                    (q = b[a]) && q.series && (v(q.series, b), q.isDirty = q.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (l = h.length; l--;)(n = h[l]) &&
                    n.destroy && n.destroy();
                b.points = null;
                a.clearTimeout(b.animationTimeout);
                f(b, function(a, b) {
                    a instanceof D && !a.survive && (g = d && "group" === b ? "hide" : "destroy", a[g]())
                });
                c.hoverSeries === b && (c.hoverSeries = null);
                v(c.series, b);
                c.orderSeries();
                f(b, function(a, c) {
                    delete b[c]
                })
            },
            getGraphPath: function(a, b, c) {
                var e = this,
                    d = e.options,
                    f = d.step,
                    g, r = [],
                    k = [],
                    l;
                a = a || e.points;
                (g = a.reversed) && a.reverse();
                (f = {
                    right: 1,
                    center: 2
                }[f] || f && 3) && g && (f = 4 - f);
                !d.connectNulls || b || c || (a = this.getValidPoints(a));
                w(a, function(h, g) {
                    var n =
                        h.plotX,
                        q = h.plotY,
                        u = a[g - 1];
                    (h.leftCliff || u && u.rightCliff) && !c && (l = !0);
                    h.isNull && !m(b) && 0 < g ? l = !d.connectNulls : h.isNull && !b ? l = !0 : (0 === g || l ? g = ["M", h.plotX, h.plotY] : e.getPointSpline ? g = e.getPointSpline(a, h, g) : f ? (g = 1 === f ? ["L", u.plotX, q] : 2 === f ? ["L", (u.plotX + n) / 2, u.plotY, "L", (u.plotX + n) / 2, q] : ["L", n, u.plotY], g.push("L", n, q)) : g = ["L", n, q], k.push(h.x), f && (k.push(h.x), 2 === f && k.push(h.x)), r.push.apply(r, g), l = !1)
                });
                r.xMap = k;
                return e.graphPath = r
            },
            drawGraph: function() {
                var a = this,
                    b = (this.gappedPath || this.getGraphPath).call(this),
                    c = [
                        ["graph", "highcharts-graph"]
                    ],
                    c = a.getZonesGraphs(c);
                w(c, function(c, e) {
                    e = c[0];
                    var d = a[e];
                    d ? (d.endX = a.preventGraphAnimation ? null : b.xMap, d.animate({
                        d: b
                    })) : b.length && (a[e] = a.chart.renderer.path(b).addClass(c[1]).attr({
                        zIndex: 1
                    }).add(a.group));
                    d && (d.startX = b.xMap, d.isArea = b.isArea)
                })
            },
            getZonesGraphs: function(a) {
                w(this.zones, function(b, c) {
                    a.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || "")])
                }, this);
                return a
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    e = this.zones,
                    d, f, g = this.clips || [],
                    l, k = this.graph,
                    n = this.area,
                    q = Math.max(b.chartWidth, b.chartHeight),
                    u = this[(this.zoneAxis || "y") + "Axis"],
                    m, p, D = b.inverted,
                    v, H, y, F, J = !1;
                e.length && (k || n) && u && void 0 !== u.min && (p = u.reversed, v = u.horiz, k && !this.showLine && k.hide(), n && n.hide(), m = u.getExtremes(), w(e, function(e, h) {
                    d = p ? v ? b.plotWidth : 0 : v ? 0 : u.toPixels(m.min);
                    d = Math.min(Math.max(t(f, d), 0), q);
                    f = Math.min(Math.max(Math.round(u.toPixels(t(e.value, m.max), !0)), 0), q);
                    J && (d = f = u.toPixels(m.max));
                    H = Math.abs(d - f);
                    y = Math.min(d,
                        f);
                    F = Math.max(d, f);
                    u.isXAxis ? (l = {
                        x: D ? F : y,
                        y: 0,
                        width: H,
                        height: q
                    }, v || (l.x = b.plotHeight - l.x)) : (l = {
                        x: 0,
                        y: D ? F : y,
                        width: q,
                        height: H
                    }, v && (l.y = b.plotWidth - l.y));
                    g[h] ? g[h].animate(l) : (g[h] = c.clipRect(l), k && a["zone-graph-" + h].clip(g[h]), n && a["zone-area-" + h].clip(g[h]));
                    J = e.value > m.max;
                    a.resetZones && 0 === f && (f = void 0)
                }), this.clips = g)
            },
            invertGroups: function(a) {
                function b() {
                    w(["group", "markerGroup"], function(b) {
                        c[b] && (e.renderer.isVML && c[b].attr({
                                width: c.yAxis.len,
                                height: c.xAxis.len
                            }), c[b].width = c.yAxis.len, c[b].height =
                            c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    e = c.chart,
                    d;
                c.xAxis && (d = A(e, "resize", b), A(c, "destroy", d), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, e, d) {
                var f = this[a],
                    g = !f;
                g && (this[a] = f = this.chart.renderer.g().attr({
                    zIndex: e || .1
                }).add(d));
                f.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (m(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                f.attr({
                    visibility: c
                })[g ?
                    "attr" : "animate"](this.getPlotBox());
                return f
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, d = a.options,
                    f = !!a.animate && b.renderer.isSVG && C(d.animation).duration,
                    h = a.visible ? "inherit" : "hidden",
                    g = d.zIndex,
                    l = a.hasRendered,
                    k = b.seriesGroup,
                    n = b.inverted;
                c = a.plotGroup("group", "series", h, g, k);
                a.markerGroup = a.plotGroup("markerGroup",
                    "markers", h, g, k);
                f && a.animate(!0);
                c.inverted = a.isCartesian ? n : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(n);
                !1 === d.clip || a.sharedClipKey || l || c.clip(b.clipRect);
                f && a.animate();
                l || (a.animationTimeout = H(function() {
                    a.afterAnimate()
                }, f));
                a.isDirty = !1;
                a.hasRendered = !0;
                e(a, "afterRender")
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c =
                    this.group,
                    e = this.xAxis,
                    d = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: t(e && e.left, a.plotLeft),
                    translateY: t(d && d.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    e = this.yAxis,
                    d = this.chart.inverted;
                return this.searchKDTree({
                    clientX: d ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: d ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c,
                    e, d) {
                    var f, h;
                    if (h = c && c.length) return f = b.kdAxisArray[e % d], c.sort(function(a, b) {
                        return a[f] - b[f]
                    }), h = Math.floor(h / 2), {
                        point: c[h],
                        left: a(c.slice(0, h), e + 1, d),
                        right: a(c.slice(h + 1), e + 1, d)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                H(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, h, l) {
                    var k = b.point,
                        r = e.kdAxisArray[h % l],
                        n, u, q = k;
                    u = m(a[d]) && m(k[d]) ?
                        Math.pow(a[d] - k[d], 2) : null;
                    n = m(a[f]) && m(k[f]) ? Math.pow(a[f] - k[f], 2) : null;
                    n = (u || 0) + (n || 0);
                    k.dist = m(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                    k.distX = m(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                    r = a[r] - k[r];
                    n = 0 > r ? "left" : "right";
                    u = 0 > r ? "right" : "left";
                    b[n] && (n = c(a, b[n], h + 1, l), q = n[g] < q[g] ? n : k);
                    b[u] && Math.sqrt(r * r) < q[g] && (a = c(a, b[u], h + 1, l), q = a[g] < q[g] ? a : q);
                    return q
                }
                var e = this,
                    d = this.kdAxisArray[0],
                    f = this.kdAxisArray[1],
                    g = b ? "distX" : "dist";
                b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree ||
                    this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(K);
    (function(a) {
        var A = a.Axis,
            C = a.Chart,
            E = a.correctFloat,
            p = a.defined,
            g = a.destroyObjectProperties,
            d = a.each,
            m = a.format,
            w = a.objectEach,
            v = a.pick,
            l = a.Series;
        a.StackItem = function(a, c, d, g, l) {
            var b = a.chart.inverted;
            this.axis = a;
            this.isNegative = d;
            this.options = c;
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = l;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: c.align || (b ? d ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (b ?
                    "middle" : d ? "bottom" : "top"),
                y: v(c.y, b ? 4 : d ? 14 : -6),
                x: v(c.x, b ? d ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (b ? d ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function() {
                g(this, this.axis)
            },
            render: function(a) {
                var c = this.axis.chart,
                    e = this.options,
                    d = e.format,
                    d = d ? m(d, this, c.time) : e.formatter.call(this);
                this.label ? this.label.attr({
                    text: d,
                    visibility: "hidden"
                }) : this.label = c.renderer.text(d, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function(a,
                c) {
                var e = this.axis,
                    d = e.chart,
                    g = e.translate(e.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    b = e.translate(0),
                    b = Math.abs(g - b);
                a = d.xAxis[0].translate(this.x) + a;
                e = this.getStackBox(d, this, a, g, c, b, e);
                if (c = this.label) c.align(this.alignOptions, null, e), e = c.alignAttr, c[!1 === this.options.crop || d.isInsidePlot(e.x, e.y) ? "show" : "hide"](!0)
            },
            getStackBox: function(a, c, d, g, l, b, f) {
                var e = c.axis.reversed,
                    n = a.inverted;
                a = f.height + f.pos - (n ? a.plotLeft : a.plotTop);
                c = c.isNegative && !e || !c.isNegative && e;
                return {
                    x: n ? c ? g : g - b : d,
                    y: n ? a - d - l : c ? a - g - b : a - g,
                    width: n ? b : l,
                    height: n ? l : b
                }
            }
        };
        C.prototype.getStacks = function() {
            var a = this;
            d(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            d(a.series, function(c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + v(c.options.stack, ""))
            })
        };
        A.prototype.buildStacks = function() {
            var a = this.series,
                c = v(this.options.reversedStacks, !0),
                d = a.length,
                g;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (g = d; g--;) a[c ? g : d - g - 1].setStackedPoints();
                for (g = 0; g <
                    d; g++) a[g].modifyStacks()
            }
        };
        A.prototype.renderStackTotals = function() {
            var a = this.chart,
                c = a.renderer,
                d = this.stacks,
                g = this.stackTotalGroup;
            g || (this.stackTotalGroup = g = c.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            g.translate(a.plotLeft, a.plotTop);
            w(d, function(a) {
                w(a, function(a) {
                    a.render(g)
                })
            })
        };
        A.prototype.resetStacks = function() {
            var a = this,
                c = a.stacks;
            a.isXAxis || w(c, function(c) {
                w(c, function(e, d) {
                    e.touched < a.stacksTouched ? (e.destroy(), delete c[d]) : (e.total = null, e.cumulative = null)
                })
            })
        };
        A.prototype.cleanStacks = function() {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), w(a, function(a) {
                w(a, function(a) {
                    a.cumulative = a.total
                })
            }))
        };
        l.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var e = this.processedXData,
                    c = this.processedYData,
                    d = [],
                    g = c.length,
                    l = this.options,
                    b = l.threshold,
                    f = v(l.startFromThreshold && b, 0),
                    m = l.stack,
                    l = l.stacking,
                    w = this.stackKey,
                    J = "-" + w,
                    D = this.negStacks,
                    H = this.yAxis,
                    u =
                    H.stacks,
                    r = H.oldStacks,
                    B, z, G, A, h, x, C;
                H.stacksTouched += 1;
                for (h = 0; h < g; h++) x = e[h], C = c[h], B = this.getStackIndicator(B, x, this.index), A = B.key, G = (z = D && C < (f ? 0 : b)) ? J : w, u[G] || (u[G] = {}), u[G][x] || (r[G] && r[G][x] ? (u[G][x] = r[G][x], u[G][x].total = null) : u[G][x] = new a.StackItem(H, H.options.stackLabels, z, x, m)), G = u[G][x], null !== C ? (G.points[A] = G.points[this.index] = [v(G.cumulative, f)], p(G.cumulative) || (G.base = A), G.touched = H.stacksTouched, 0 < B.index && !1 === this.singleStacks && (G.points[A][0] = G.points[this.index + "," + x + ",0"][0])) :
                    G.points[A] = G.points[this.index] = null, "percent" === l ? (z = z ? w : J, D && u[z] && u[z][x] ? (z = u[z][x], G.total = z.total = Math.max(z.total, G.total) + Math.abs(C) || 0) : G.total = E(G.total + (Math.abs(C) || 0))) : G.total = E(G.total + (C || 0)), G.cumulative = v(G.cumulative, f) + (C || 0), null !== C && (G.points[A].push(G.cumulative), d[h] = G.cumulative);
                "percent" === l && (H.usePercentage = !0);
                this.stackedYData = d;
                H.oldStacks = {}
            }
        };
        l.prototype.modifyStacks = function() {
            var a = this,
                c = a.stackKey,
                g = a.yAxis.stacks,
                l = a.processedXData,
                q, b = a.options.stacking;
            a[b + "Stacker"] && d([c, "-" + c], function(c) {
                for (var e = l.length, d, f; e--;)
                    if (d = l[e], q = a.getStackIndicator(q, d, a.index, c), f = (d = g[c] && g[c][d]) && d.points[q.key]) a[b + "Stacker"](f, d, e)
            })
        };
        l.prototype.percentStacker = function(a, c, d) {
            c = c.total ? 100 / c.total : 0;
            a[0] = E(a[0] * c);
            a[1] = E(a[1] * c);
            this.stackedYData[d] = a[1]
        };
        l.prototype.getStackIndicator = function(a, c, d, g) {
            !p(a) || a.x !== c || g && a.key !== g ? a = {
                x: c,
                index: 0,
                key: g
            } : a.index++;
            a.key = [d, c, a.index].join();
            return a
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.Axis,
            E = a.createElement,
            p = a.css,
            g = a.defined,
            d = a.each,
            m = a.erase,
            w = a.extend,
            v = a.fireEvent,
            l = a.inArray,
            e = a.isNumber,
            c = a.isObject,
            y = a.isArray,
            n = a.merge,
            q = a.objectEach,
            b = a.pick,
            f = a.Point,
            t = a.Series,
            F = a.seriesTypes,
            J = a.setAnimation,
            D = a.splat;
        w(a.Chart.prototype, {
            addSeries: function(a, c, e) {
                var d, f = this;
                a && (c = b(c, !0), v(f, "addSeries", {
                    options: a
                }, function() {
                    d = f.initSeries(a);
                    f.isDirtyLegend = !0;
                    f.linkSeries();
                    v(f, "afterAddSeries");
                    c && f.redraw(e)
                }));
                return d
            },
            addAxis: function(a, c, d, e) {
                var f = c ? "xAxis" : "yAxis",
                    g = this.options;
                a = n(a, {
                    index: this[f].length,
                    isX: c
                });
                c = new C(this, a);
                g[f] = D(g[f] || {});
                g[f].push(a);
                b(d, !0) && this.redraw(e);
                return c
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = function() {
                        d && p(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = E("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = E("span", {
                    className: "highcharts-loading-inner"
                }, null, d), A(b, "redraw", e));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML =
                    a || c.lang.loading;
                b.loadingShown = !0;
                e()
            },
            hideLoading: function() {
                var a = this.loadingDiv;
                a && (a.className = "highcharts-loading highcharts-loading-hidden");
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function(a, c, f, m) {
                var r = this,
                    u = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    t = a.chart,
                    h, p, w = [];
                v(r, "update", {
                    options: a
                });
                if (t) {
                    n(!0, r.options.chart, t);
                    "className" in t && r.setClassName(t.className);
                    "reflow" in t && r.setReflow(t.reflow);
                    if ("inverted" in t || "polar" in t || "type" in t) r.propFromSeries(), h = !0;
                    "alignTicks" in t && (h = !0);
                    q(t, function(a, b) {
                        -1 !== l("chart." + b, r.propsRequireUpdateSeries) && (p = !0); - 1 !== l(b, r.propsRequireDirtyBox) && (r.isDirtyBox = !0)
                    })
                }
                a.plotOptions && n(!0, this.options.plotOptions,
                    a.plotOptions);
                q(a, function(a, b) {
                    if (r[b] && "function" === typeof r[b].update) r[b].update(a, !1);
                    else if ("function" === typeof r[u[b]]) r[u[b]](a);
                    "chart" !== b && -1 !== l(b, r.propsRequireUpdateSeries) && (p = !0)
                });
                d("xAxis yAxis zAxis series colorAxis pane".split(" "), function(b) {
                    var c;
                    a[b] && ("series" === b && (c = [], d(r[b], function(a, b) {
                        a.options.isInternal || c.push(b)
                    })), d(D(a[b]), function(a, d) {
                        (d = g(a.id) && r.get(a.id) || r[b][c ? c[d] : d]) && d.coll === b && (d.update(a, !1), f && (d.touched = !0));
                        if (!d && f)
                            if ("series" === b) r.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) r.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), f && d(r[b], function(a) {
                        a.touched || a.options.isInternal ? delete a.touched : w.push(a)
                    }))
                });
                d(w, function(a) {
                    a.remove(!1)
                });
                h && d(r.axes, function(a) {
                    a.update({}, !1)
                });
                p && d(r.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && n(!0, r.options.loading, a.loading);
                h = t && t.width;
                t = t && t.height;
                e(h) && h !== r.chartWidth || e(t) && t !== r.chartHeight ? r.setSize(h, t, m) : b(c, !0) && r.redraw(m);
                v(r, "afterUpdate", {
                    options: a
                })
            },
            setSubtitle: function(a) {
                this.setTitle(void 0,
                    a)
            }
        });
        w(f.prototype, {
            update: function(a, d, e, f) {
                function g() {
                    l.applyOptions(a);
                    null === l.y && h && (l.graphic = h.destroy());
                    c(a, !0) && (h && h.element && a && a.marker && void 0 !== a.marker.symbol && (l.graphic = h.destroy()), a && a.dataLabels && l.dataLabel && (l.dataLabel = l.dataLabel.destroy()), l.connector && (l.connector = l.connector.destroy()));
                    n = l.index;
                    r.updateParallelArrays(l, n);
                    k.data[n] = c(k.data[n], !0) || c(a, !0) ? l.options : b(a, k.data[n]);
                    r.isDirty = r.isDirtyData = !0;
                    !r.fixedBox && r.hasCartesianSeries && (q.isDirtyBox = !0);
                    "point" ===
                    k.legendType && (q.isDirtyLegend = !0);
                    d && q.redraw(e)
                }
                var l = this,
                    r = l.series,
                    h = l.graphic,
                    n, q = r.chart,
                    k = r.options;
                d = b(d, !0);
                !1 === f ? g() : l.firePointEvent("update", {
                    options: a
                }, g)
            },
            remove: function(a, b) {
                this.series.removePoint(l(this, this.series.data), a, b)
            }
        });
        w(t.prototype, {
            addPoint: function(a, c, d, e) {
                var f = this.options,
                    g = this.data,
                    l = this.chart,
                    h = this.xAxis,
                    h = h && h.hasNames && h.names,
                    r = f.data,
                    n, k, q = this.xData,
                    u, t;
                c = b(c, !0);
                n = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(n, [a]);
                t = n.x;
                u = q.length;
                if (this.requireSorting &&
                    t < q[u - 1])
                    for (k = !0; u && q[u - 1] > t;) u--;
                this.updateParallelArrays(n, "splice", u, 0, 0);
                this.updateParallelArrays(n, u);
                h && n.name && (h[t] = n.name);
                r.splice(u, 0, a);
                k && (this.data.splice(u, 0, null), this.processData());
                "point" === f.legendType && this.generatePoints();
                d && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(n, "shift"), r.shift()));
                this.isDirtyData = this.isDirty = !0;
                c && l.redraw(e)
            },
            removePoint: function(a, c, d) {
                var e = this,
                    f = e.data,
                    g = f[a],
                    l = e.points,
                    h = e.chart,
                    r = function() {
                        l && l.length === f.length &&
                            l.splice(a, 1);
                        f.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(g || {
                            series: e
                        }, "splice", a, 1);
                        g && g.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        c && h.redraw()
                    };
                J(d, h);
                c = b(c, !0);
                g ? g.firePointEvent("remove", null, r) : r()
            },
            remove: function(a, c, d) {
                function e() {
                    f.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    g.linkSeries();
                    b(a, !0) && g.redraw(c)
                }
                var f = this,
                    g = f.chart;
                !1 !== d ? v(f, "remove", null, e) : e()
            },
            update: function(c, e) {
                var f = this,
                    g = f.chart,
                    q = f.userOptions,
                    u = f.oldType || f.type,
                    t = c.type || q.type || g.options.chart.type,
                    h = F[u].prototype,
                    m, p = ["group", "markerGroup", "dataLabelsGroup"],
                    k = ["navigatorSeries", "baseSeries"],
                    D = f.finishedAnimating && {
                        animation: !1
                    },
                    H = ["data", "name", "turboThreshold"],
                    y = a.keys(c),
                    J = 0 < y.length;
                d(y, function(a) {
                    -1 === l(a, H) && (J = !1)
                });
                if (J) c.data && this.setData(c.data, !1), c.name && this.setName(c.name, !1);
                else {
                    k = p.concat(k);
                    d(k, function(a) {
                        k[a] = f[a];
                        delete f[a]
                    });
                    c = n(q, D, {
                        index: f.index,
                        pointStart: b(q.pointStart, f.xData[0])
                    }, {
                        data: f.options.data
                    }, c);
                    f.remove(!1, null, !1);
                    for (m in h) f[m] = void 0;
                    F[t || u] ?
                        w(f, F[t || u].prototype) : a.error(17, !0);
                    d(k, function(a) {
                        f[a] = k[a]
                    });
                    f.init(g, c);
                    c.zIndex !== q.zIndex && d(p, function(a) {
                        f[a] && f[a].attr({
                            zIndex: c.zIndex
                        })
                    });
                    f.oldType = u;
                    g.linkSeries()
                }
                v(this, "afterUpdate");
                b(e, !0) && g.redraw(!1)
            },
            setName: function(a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        w(C.prototype, {
            update: function(a, c) {
                var d = this.chart,
                    e = a && a.events || {};
                a = n(this.userOptions, a);
                d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] =
                    a);
                q(d.options[this.coll].events, function(a, b) {
                    "undefined" === typeof e[b] && (e[b] = void 0)
                });
                this.destroy(!0);
                this.init(d, w(a, {
                    events: e
                }));
                d.isDirtyBox = !0;
                b(c, !0) && d.redraw()
            },
            remove: function(a) {
                for (var c = this.chart, e = this.coll, f = this.series, g = f.length; g--;) f[g] && f[g].remove(!1);
                m(c.axes, this);
                m(c[e], this);
                y(c.options[e]) ? c.options[e].splice(this.options.index, 1) : delete c.options[e];
                d(c[e], function(a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                c.isDirtyBox = !0;
                b(a, !0) && c.redraw()
            },
            setTitle: function(a,
                b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(K);
    (function(a) {
        var A = a.each,
            C = a.map,
            E = a.pick,
            p = a.Series,
            g = a.seriesType;
        g("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(d) {
                var g = [],
                    p = [],
                    v = this.xAxis,
                    l = this.yAxis,
                    e = l.stacks[this.stackKey],
                    c = {},
                    y = this.index,
                    n = l.series,
                    q = n.length,
                    b, f = E(l.options.reversedStacks, !0) ? 1 : -1,
                    t;
                d = d || this.points;
                if (this.options.stacking) {
                    for (t = 0; t < d.length; t++) d[t].leftNull = d[t].rightNull = null,
                        c[d[t].x] = d[t];
                    a.objectEach(e, function(a, b) {
                        null !== a.total && p.push(b)
                    });
                    p.sort(function(a, b) {
                        return a - b
                    });
                    b = C(n, function() {
                        return this.visible
                    });
                    A(p, function(a, d) {
                        var n = 0,
                            m, u;
                        if (c[a] && !c[a].isNull) g.push(c[a]), A([-1, 1], function(g) {
                            var l = 1 === g ? "rightNull" : "leftNull",
                                r = 0,
                                n = e[p[d + g]];
                            if (n)
                                for (t = y; 0 <= t && t < q;) m = n.points[t], m || (t === y ? c[a][l] = !0 : b[t] && (u = e[a].points[t]) && (r -= u[1] - u[0])), t += f;
                            c[a][1 === g ? "rightCliff" : "leftCliff"] = r
                        });
                        else {
                            for (t = y; 0 <= t && t < q;) {
                                if (m = e[a].points[t]) {
                                    n = m[1];
                                    break
                                }
                                t += f
                            }
                            n = l.translate(n,
                                0, 1, 0, 1);
                            g.push({
                                isNull: !0,
                                plotX: v.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: n,
                                yBottom: n
                            })
                        }
                    })
                }
                return g
            },
            getGraphPath: function(a) {
                var d = p.prototype.getGraphPath,
                    g = this.options,
                    v = g.stacking,
                    l = this.yAxis,
                    e, c, y = [],
                    n = [],
                    q = this.index,
                    b, f = l.stacks[this.stackKey],
                    t = g.threshold,
                    F = l.getThreshold(g.threshold),
                    J, g = g.connectNulls || "percent" === v,
                    D = function(c, e, d) {
                        var g = a[c];
                        c = v && f[g.x].points[q];
                        var r = g[d + "Null"] || 0;
                        d = g[d + "Cliff"] || 0;
                        var u, m, g = !0;
                        d || r ? (u = (r ? c[0] : c[1]) + d, m = c[0] + d, g = !!r) : !v && a[e] && a[e].isNull && (u = m = t);
                        void 0 !==
                            u && (n.push({
                                plotX: b,
                                plotY: null === u ? F : l.getThreshold(u),
                                isNull: g,
                                isCliff: !0
                            }), y.push({
                                plotX: b,
                                plotY: null === m ? F : l.getThreshold(m),
                                doCurve: !1
                            }))
                    };
                a = a || this.points;
                v && (a = this.getStackPoints(a));
                for (e = 0; e < a.length; e++)
                    if (c = a[e].isNull, b = E(a[e].rectPlotX, a[e].plotX), J = E(a[e].yBottom, F), !c || g) g || D(e, e - 1, "left"), c && !v && g || (n.push(a[e]), y.push({
                        x: e,
                        plotX: b,
                        plotY: J
                    })), g || D(e, e + 1, "right");
                e = d.call(this, n, !0, !0);
                y.reversed = !0;
                c = d.call(this, y, !0, !0);
                c.length && (c[0] = "L");
                c = e.concat(c);
                d = d.call(this, n, !1, g);
                c.xMap =
                    e.xMap;
                this.areaPath = c;
                return d
            },
            drawGraph: function() {
                this.areaPath = [];
                p.prototype.drawGraph.apply(this);
                var a = this,
                    g = this.areaPath,
                    w = this.options,
                    v = [
                        ["area", "highcharts-area"]
                    ];
                A(this.zones, function(a, e) {
                    v.push(["zone-area-" + e, "highcharts-area highcharts-zone-area-" + e + " " + a.className])
                });
                A(v, function(d) {
                    var e = d[0],
                        c = a[e];
                    c ? (c.endX = a.preventGraphAnimation ? null : g.xMap, c.animate({
                        d: g
                    })) : (c = a[e] = a.chart.renderer.path(g).addClass(d[1]).attr({
                        zIndex: 0
                    }).add(a.group), c.isArea = !0);
                    c.startX = g.xMap;
                    c.shiftUnit =
                        w.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function(a) {
        var A = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function(a, E, p) {
                var g = E.plotX,
                    d = E.plotY,
                    m = a[p - 1];
                p = a[p + 1];
                var w, v, l, e;
                if (m && !m.isNull && !1 !== m.doCurve && !E.isCliff && p && !p.isNull && !1 !== p.doCurve && !E.isCliff) {
                    a = m.plotY;
                    l = p.plotX;
                    p = p.plotY;
                    var c = 0;
                    w = (1.5 * g + m.plotX) / 2.5;
                    v = (1.5 * d + a) / 2.5;
                    l = (1.5 * g + l) / 2.5;
                    e = (1.5 * d + p) / 2.5;
                    l !== w && (c = (e - v) * (l - g) / (l - w) + d - e);
                    v += c;
                    e += c;
                    v > a && v > d ? (v = Math.max(a, d), e = 2 * d - v) : v < a && v < d &&
                        (v = Math.min(a, d), e = 2 * d - v);
                    e > p && e > d ? (e = Math.max(p, d), v = 2 * d - e) : e < p && e < d && (e = Math.min(p, d), v = 2 * d - e);
                    E.rightContX = l;
                    E.rightContY = e
                }
                E = ["C", A(m.rightContX, m.plotX), A(m.rightContY, m.plotY), A(w, g), A(v, d), g, d];
                m.rightContX = m.rightContY = null;
                return E
            }
        })
    })(K);
    (function(a) {
        var A = a.seriesTypes.area.prototype,
            C = a.seriesType;
        C("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: A.getStackPoints,
            getGraphPath: A.getGraphPath,
            drawGraph: A.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function(a) {
        var A = a.animObject,
            C = a.each,
            E = a.extend,
            p = a.isNumber,
            g = a.merge,
            d = a.pick,
            m = a.Series,
            w = a.seriesType,
            v = a.svg;
        w("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                m.prototype.init.apply(this, arguments);
                var a = this,
                    e = a.chart;
                e.hasRendered && C(e.series, function(c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    e = a.options,
                    c = a.xAxis,
                    g = a.yAxis,
                    n = c.options.reversedStacks,
                    n = c.reversed && !n || !c.reversed && n,
                    q, b = {},
                    f = 0;
                !1 === e.grouping ? f = 1 : C(a.chart.series, function(c) {
                    var e = c.options,
                        d = c.yAxis,
                        l;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || g.len !== d.len || g.pos !== d.pos || (e.stacking ? (q = c.stackKey, void 0 ===
                        b[q] && (b[q] = f++), l = b[q]) : !1 !== e.grouping && (l = f++), c.columnIndex = l)
                });
                var t = Math.min(Math.abs(c.transA) * (c.ordinalSlope || e.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
                    m = t * e.groupPadding,
                    p = (t - 2 * m) / (f || 1),
                    e = Math.min(e.maxPointWidth || c.len, d(e.pointWidth, p * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (p - e) / 2 + (m + ((a.columnIndex || 0) + (n ? 1 : 0)) * p - t / 2) * (n ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, e, c, d) {
                var g = this.chart,
                    l = this.borderWidth,
                    b = -(l % 2 ? .5 : 0),
                    l = l % 2 ? .5 : 1;
                g.inverted &&
                    g.renderer.isVML && (l += 1);
                this.options.crisp && (c = Math.round(a + c) + b, a = Math.round(a) + b, c -= a);
                d = Math.round(e + d) + l;
                b = .5 >= Math.abs(e) && .5 < d;
                e = Math.round(e) + l;
                d -= e;
                b && d && (--e, d += 1);
                return {
                    x: a,
                    y: e,
                    width: c,
                    height: d
                }
            },
            translate: function() {
                var a = this,
                    e = a.chart,
                    c = a.options,
                    g = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    g = a.borderWidth = d(c.borderWidth, g ? 0 : 1),
                    n = a.yAxis,
                    q = c.threshold,
                    b = a.translatedThreshold = n.getThreshold(q),
                    f = d(c.minPointLength, 5),
                    t = a.getColumnMetrics(),
                    p = t.width,
                    v = a.barW = Math.max(p, 1 + 2 * g),
                    D = a.pointXOffset =
                    t.offset;
                e.inverted && (b -= .5);
                c.pointPadding && (v = Math.ceil(v));
                m.prototype.translate.apply(a);
                C(a.points, function(c) {
                    var g = d(c.yBottom, b),
                        l = 999 + Math.abs(g),
                        l = Math.min(Math.max(-l, c.plotY), n.len + l),
                        t = c.plotX + D,
                        m = v,
                        w = Math.min(l, g),
                        y, h = Math.max(l, g) - w;
                    f && Math.abs(h) < f && (h = f, y = !n.reversed && !c.negative || n.reversed && c.negative, c.y === q && a.dataMax <= q && n.min < q && (y = !y), w = Math.abs(w - b) > f ? g - f : b - (y ? f : 0));
                    c.barX = t;
                    c.pointWidth = p;
                    c.tooltipPos = e.inverted ? [n.len + n.pos - e.plotLeft - l, a.xAxis.len - t - m / 2, h] : [t + m / 2, l + n.pos -
                        e.plotTop, h
                    ];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [t, b, m, 0] : [t, w, m, h])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            drawPoints: function() {
                var a = this,
                    d = this.chart,
                    c = a.options,
                    m = d.renderer,
                    n = c.animationLimit || 250,
                    q;
                C(a.points, function(b) {
                    var e = b.graphic,
                        l = e && d.pointCount < n ? "animate" : "attr";
                    if (p(b.plotY) && null !== b.y) {
                        q = b.shapeArgs;
                        if (e) e[l](g(q));
                        else b.graphic =
                            e = m[b.shapeType](q).add(b.group || a.group);
                        c.borderRadius && e.attr({
                            r: c.borderRadius
                        });
                        e.addClass(b.getClassName(), !0)
                    } else e && (b.graphic = e.destroy())
                })
            },
            animate: function(a) {
                var d = this,
                    c = this.yAxis,
                    g = d.options,
                    l = this.chart.inverted,
                    q = {},
                    b = l ? "translateX" : "translateY",
                    f;
                v && (a ? (q.scaleY = .001, a = Math.min(c.pos + c.len, Math.max(c.pos, c.toPixels(g.threshold))), l ? q.translateX = a - c.len : q.translateY = a, d.group.attr(q)) : (f = d.group.attr(b), d.group.animate({
                    scaleY: 1
                }, E(A(d.options.animation), {
                    step: function(a, e) {
                        q[b] =
                            f + e.pos * (c.pos - f);
                        d.group.attr(q)
                    }
                })), d.animate = null))
            },
            remove: function() {
                var a = this,
                    d = a.chart;
                d.hasRendered && C(d.series, function(c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                m.prototype.remove.apply(a, arguments)
            }
        })
    })(K);
    (function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(K);
    (function(a) {
        var A = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cspan class\x3d"highcharts-header"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function() {
                this.options.lineWidth && A.prototype.drawGraph.call(this)
            }
        })
    })(K);
    (function(a) {
        var A = a.deg2rad,
            C = a.isNumber,
            E = a.pick,
            p = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options,
                    d = this.chart,
                    m = 2 * (a.slicedOffset || 0),
                    w = d.plotWidth - 2 * m,
                    d = d.plotHeight - 2 * m,
                    v = a.center,
                    v = [E(v[0], "50%"), E(v[1], "50%"), a.size || "100%", a.innerSize || 0],
                    l = Math.min(w, d),
                    e, c;
                for (e = 0; 4 > e; ++e) c = v[e], a = 2 > e || 2 === e && /%$/.test(c), v[e] = p(c, [w, d, l, v[2]][e]) + (a ? m : 0);
                v[3] > v[2] && (v[3] = v[2]);
                return v
            },
            getStartAndEndRadians: function(a, d) {
                a = C(a) ? a : 0;
                d = C(d) && d > a && 360 > d - a ? d : a + 360;
                return {
                    start: A * (a + -90),
                    end: A * (d + -90)
                }
            }
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.CenteredSeriesMixin,
            E = a.defined,
            p = a.each,
            g = a.extend,
            d = C.getStartAndEndRadians,
            m = a.inArray,
            w = a.noop,
            v = a.pick,
            l = a.Point,
            e = a.Series,
            c = a.seriesType,
            y = a.setAnimation;
        c("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var c = this,
                    b = c.points,
                    d = c.startAngleRad;
                a || (p(b, function(a) {
                    var b = a.graphic,
                        e = a.shapeArgs;
                    b && (b.attr({
                        r: a.startR || c.center[3] / 2,
                        start: d,
                        end: d
                    }), b.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, c.options.animation))
                }), c.animate = null)
            },
            updateTotals: function() {
                var a, c = 0,
                    b = this.points,
                    d = b.length,
                    e, g = this.options.ignoreHiddenPoint;
                for (a = 0; a < d; a++) e = b[a], c += g && !e.visible ? 0 : e.isNull ? 0 : e.y;
                this.total = c;
                for (a = 0; a < d; a++) e = b[a], e.percentage = 0 < c && (e.visible || !g) ? e.y / c * 100 : 0, e.total = c
            },
            generatePoints: function() {
                e.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function(a) {
                this.generatePoints();
                var c = 0,
                    b = this.options,
                    e = b.slicedOffset,
                    g = e + (b.borderWidth || 0),
                    l, n, m, p = d(b.startAngle, b.endAngle),
                    u = this.startAngleRad = p.start,
                    p = (this.endAngleRad = p.end) - u,
                    r = this.points,
                    w, z = b.dataLabels.distance,
                    b = b.ignoreHiddenPoint,
                    y, A = r.length,
                    h;
                a || (this.center = a = this.getCenter());
                this.getX = function(b, c, d) {
                    m = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(m) * (a[2] / 2 + d.labelDistance)
                };
                for (y = 0; y < A; y++) {
                    h = r[y];
                    h.labelDistance = v(h.options.dataLabels && h.options.dataLabels.distance, z);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, h.labelDistance);
                    l = u + c * p;
                    if (!b || h.visible) c += h.percentage / 100;
                    n = u + c * p;
                    h.shapeType = "arc";
                    h.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * l) / 1E3,
                        end: Math.round(1E3 * n) / 1E3
                    };
                    m = (n + l) / 2;
                    m > 1.5 * Math.PI ? m -= 2 * Math.PI : m < -Math.PI / 2 && (m += 2 * Math.PI);
                    h.slicedTranslation = {
                        translateX: Math.round(Math.cos(m) * e),
                        translateY: Math.round(Math.sin(m) * e)
                    };
                    n = Math.cos(m) * a[2] /
                        2;
                    w = Math.sin(m) * a[2] / 2;
                    h.tooltipPos = [a[0] + .7 * n, a[1] + .7 * w];
                    h.half = m < -Math.PI / 2 || m > Math.PI / 2 ? 1 : 0;
                    h.angle = m;
                    l = Math.min(g, h.labelDistance / 5);
                    h.labelPos = [a[0] + n + Math.cos(m) * h.labelDistance, a[1] + w + Math.sin(m) * h.labelDistance, a[0] + n + Math.cos(m) * l, a[1] + w + Math.sin(m) * l, a[0] + n, a[1] + w, 0 > h.labelDistance ? "center" : h.half ? "right" : "left", m]
                }
            },
            drawGraph: null,
            drawPoints: function() {
                var a = this,
                    c = a.chart.renderer,
                    b, d, e;
                p(a.points, function(f) {
                    d = f.graphic;
                    f.isNull ? d && (f.graphic = d.destroy()) : (e = f.shapeArgs, b = f.getTranslate(),
                        d ? d.setRadialReference(a.center).animate(g(e, b)) : f.graphic = d = c[f.shapeType](e).setRadialReference(a.center).attr(b).add(a.group), d.attr({
                            visibility: f.visible ? "inherit" : "hidden"
                        }), d.addClass(f.getClassName()))
                })
            },
            searchPoint: w,
            sortByAngle: function(a, c) {
                a.sort(function(a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: C.getCenter,
            getSymbol: w
        }, {
            init: function() {
                l.prototype.init.apply(this, arguments);
                var a = this,
                    c;
                a.name = v(a.name, "Slice");
                c = function(b) {
                    a.slice("select" === b.type)
                };
                A(a, "select", c);
                A(a, "unselect", c);
                return a
            },
            isValid: function() {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function(a, c) {
                var b = this,
                    d = b.series,
                    e = d.chart,
                    g = d.options.ignoreHiddenPoint;
                c = v(c, g);
                a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, d.options.data[m(b, d.data)] = b.options, p(["graphic", "dataLabel", "connector", "shadowGroup"], function(c) {
                        if (b[c]) b[c][a ? "show" : "hide"](!0)
                    }), b.legendItem && e.legend.colorizeItem(b, a), a || "hover" !==
                    b.state || b.setState(""), g && (d.isDirty = !0), c && e.redraw())
            },
            slice: function(a, c, b) {
                var d = this.series;
                y(b, d.chart);
                v(c, !0);
                this.sliced = this.options.sliced = E(a) ? a : !this.sliced;
                d.options.data[m(this, d.data)] = this.options;
                this.graphic.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: this.shapeArgs.r -
                        1,
                    start: c.start,
                    end: c.end
                })
            }
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.arrayMax,
            E = a.defined,
            p = a.each,
            g = a.extend,
            d = a.format,
            m = a.map,
            w = a.merge,
            v = a.noop,
            l = a.pick,
            e = a.relativeLength,
            c = a.Series,
            y = a.seriesTypes,
            n = a.some,
            q = a.stableSort;
        a.distribute = function(b, c, d) {
            function e(a, b) {
                return a.target - b.target
            }
            var f, g = !0,
                t = b,
                u = [],
                r;
            r = 0;
            var v = t.reducedLen || c;
            for (f = b.length; f--;) r += b[f].size;
            if (r > v) {
                q(b, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (r = f = 0; r <= v;) r += b[f].size, f++;
                u = b.splice(f - 1, b.length)
            }
            q(b, e);
            for (b = m(b, function(a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: l(a.align, .5)
                    }
                }); g;) {
                for (f = b.length; f--;) g = b[f], r = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, r - g.size * g.align), c - g.size);
                f = b.length;
                for (g = !1; f--;) 0 < f && b[f - 1].pos + b[f - 1].size > b[f].pos && (b[f - 1].size += b[f].size, b[f - 1].targets = b[f - 1].targets.concat(b[f].targets), b[f - 1].align = .5, b[f - 1].pos + b[f - 1].size > c && (b[f - 1].pos = c - b[f - 1].size), b.splice(f, 1), g = !0)
            }
            t.push.apply(t, u);
            f = 0;
            n(b, function(b) {
                var e =
                    0;
                if (n(b.targets, function() {
                        t[f].pos = b.pos + e;
                        if (Math.abs(t[f].pos - t[f].target) > d) return p(t.slice(0, f + 1), function(a) {
                            delete a.pos
                        }), t.reducedLen = (t.reducedLen || c) - .1 * c, t.reducedLen > .1 * c && a.distribute(t, c, d), !0;
                        e += t[f].size;
                        f++
                    })) return !0
            });
            q(t, e)
        };
        c.prototype.drawDataLabels = function() {
            function b(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }
            var c = this,
                e = c.chart,
                g = c.options,
                m = g.dataLabels,
                q = c.points,
                n, u, r = c.hasRendered || 0,
                v, z, y = l(m.defer, !!g.animation),
                C = e.renderer;
            if (m.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(m), z = c.plotGroup("dataLabelsGroup", "data-labels", y && !r ? "hidden" : "visible", m.zIndex || 6), y && (z.attr({
                opacity: +r
            }), r || A(c, "afterAnimate", function() {
                c.visible && z.show(!0);
                z[g.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), u = m, p(q, function(f) {
                var g, h = f.dataLabel,
                    k, r, q = f.connector,
                    t = !h,
                    p;
                n = f.dlOptions ||
                    f.options && f.options.dataLabels;
                (g = l(n && n.enabled, u.enabled) && !f.isNull) && (g = !0 === b(f, n || m));
                g && (m = w(u, n), k = f.getLabelConfig(), p = m[f.formatPrefix + "Format"] || m.format, v = E(p) ? d(p, k, e.time) : (m[f.formatPrefix + "Formatter"] || m.formatter).call(k, m), k = m.rotation, r = {
                    r: m.borderRadius || 0,
                    rotation: k,
                    padding: m.padding,
                    zIndex: 1
                }, a.objectEach(r, function(a, b) {
                    void 0 === a && delete r[b]
                }));
                !h || g && E(v) ? g && E(v) && (h ? r.text = v : (h = f.dataLabel = k ? C.text(v, 0, -9999).addClass("highcharts-data-label") : C.label(v, 0, -9999, m.shape,
                    null, null, m.useHTML, null, "data-label"), h.addClass(" highcharts-data-label-color-" + f.colorIndex + " " + (m.className || "") + (m.useHTML ? " highcharts-tracker" : ""))), h.attr(r), h.added || h.add(z), c.alignDataLabel(f, h, m, null, t)) : (f.dataLabel = h = h.destroy(), q && (f.connector = q.destroy()))
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        c.prototype.alignDataLabel = function(a, c, d, e, m) {
            var b = this.chart,
                f = b.inverted,
                u = l(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                r = l(a.plotY, -9999),
                n = c.getBBox(),
                q, t = d.rotation,
                p = d.align,
                h = this.visible &&
                (a.series.forceDL || b.isInsidePlot(u, Math.round(r), f) || e && b.isInsidePlot(u, f ? e.x + 1 : e.y + e.height - 1, f)),
                v = "justify" === l(d.overflow, "justify");
            if (h && (q = b.renderer.fontMetrics(void 0, c).b, e = g({
                    x: f ? this.yAxis.len - r : u,
                    y: Math.round(f ? this.xAxis.len - u : r),
                    width: 0,
                    height: 0
                }, e), g(d, {
                    width: n.width,
                    height: n.height
                }), t ? (v = !1, u = b.renderer.rotCorr(q, t), u = {
                        x: e.x + d.x + e.width / 2 + u.x,
                        y: e.y + d.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        }[d.verticalAlign] * e.height
                    }, c[m ? "attr" : "animate"](u).attr({
                        align: p
                    }), r = (t + 720) % 360, r = 180 < r && 360 > r, "left" ===
                    p ? u.y -= r ? n.height : 0 : "center" === p ? (u.x -= n.width / 2, u.y -= n.height / 2) : "right" === p && (u.x -= n.width, u.y -= r ? 0 : n.height), c.placed = !0, c.alignAttr = u) : (c.align(d, null, e), u = c.alignAttr), v ? a.isLabelJustified = this.justifyDataLabel(c, d, u, n, e, m) : l(d.crop, !0) && (h = b.isInsidePlot(u.x, u.y) && b.isInsidePlot(u.x + n.width, u.y + n.height)), d.shape && !t)) c[m ? "attr" : "animate"]({
                anchorX: f ? b.plotWidth - a.plotY : a.plotX,
                anchorY: f ? b.plotHeight - a.plotX : a.plotY
            });
            h || (c.attr({
                y: -9999
            }), c.placed = !1)
        };
        c.prototype.justifyDataLabel = function(a,
            c, d, e, g, l) {
            var b = this.chart,
                f = c.align,
                r = c.verticalAlign,
                m, n, q = a.box ? 0 : a.padding || 0;
            m = d.x + q;
            0 > m && ("right" === f ? c.align = "left" : c.x = -m, n = !0);
            m = d.x + e.width - q;
            m > b.plotWidth && ("left" === f ? c.align = "right" : c.x = b.plotWidth - m, n = !0);
            m = d.y + q;
            0 > m && ("bottom" === r ? c.verticalAlign = "top" : c.y = -m, n = !0);
            m = d.y + e.height - q;
            m > b.plotHeight && ("top" === r ? c.verticalAlign = "bottom" : c.y = b.plotHeight - m, n = !0);
            n && (a.placed = !l, a.align(c, null, g));
            return n
        };
        y.pie && (y.pie.prototype.drawDataLabels = function() {
                var b = this,
                    d = b.data,
                    e, g = b.chart,
                    m = b.options.dataLabels,
                    n = l(m.connectorPadding, 10),
                    q = l(m.connectorWidth, 1),
                    u = g.plotWidth,
                    r = g.plotHeight,
                    v = Math.round(g.chartWidth / 3),
                    w, y = b.center,
                    A = y[2] / 2,
                    h = y[1],
                    x, N, k, I, K = [
                        [],
                        []
                    ],
                    Q, O, P, L, R = [0, 0, 0, 0];
                b.visible && (m.enabled || b._hasPointLabels) && (p(d, function(a) {
                    a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), a.dataLabel.shortened = !1)
                }), c.prototype.drawDataLabels.apply(b), p(d, function(a) {
                    a.dataLabel && (a.visible ? (K[a.half].push(a),
                        a.dataLabel._pos = null, a.dataLabel.getBBox().width > v && (a.dataLabel.css({
                            width: .7 * v
                        }), a.dataLabel.shortened = !0)) : a.dataLabel = a.dataLabel.destroy())
                }), p(K, function(c, d) {
                    var f, q, t = c.length,
                        v = [],
                        w;
                    if (t)
                        for (b.sortByAngle(c, d - .5), 0 < b.maxLabelDistance && (f = Math.max(0, h - A - b.maxLabelDistance), q = Math.min(h + A + b.maxLabelDistance, g.plotHeight), p(c, function(a) {
                                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, h - A - a.labelDistance), a.bottom = Math.min(h + A + a.labelDistance, g.plotHeight), w = a.dataLabel.getBBox().height ||
                                    21, a.distributeBox = {
                                        target: a.labelPos[1] - a.top + w / 2,
                                        size: w,
                                        rank: a.y
                                    }, v.push(a.distributeBox))
                            }), f = q + w - f, a.distribute(v, f, f / 5)), L = 0; L < t; L++) e = c[L], k = e.labelPos, x = e.dataLabel, P = !1 === e.visible ? "hidden" : "inherit", O = f = k[1], v && E(e.distributeBox) && (void 0 === e.distributeBox.pos ? P = "hidden" : (I = e.distributeBox.size, O = e.top + e.distributeBox.pos)), delete e.positionIndex, Q = m.justify ? y[0] + (d ? -1 : 1) * (A + e.labelDistance) : b.getX(O < e.top + 2 || O > e.bottom - 2 ? f : O, d, e), x._attr = {
                            visibility: P,
                            align: k[6]
                        }, x._pos = {
                            x: Q + m.x + ({
                                left: n,
                                right: -n
                            }[k[6]] || 0),
                            y: O + m.y - 10
                        }, k.x = Q, k.y = O, l(m.crop, !0) && (N = x.getBBox().width, f = null, Q - N < n && 1 === d ? (f = Math.round(N - Q + n), R[3] = Math.max(f, R[3])) : Q + N > u - n && 0 === d && (f = Math.round(Q + N - u + n), R[1] = Math.max(f, R[1])), 0 > O - I / 2 ? R[0] = Math.max(Math.round(-O + I / 2), R[0]) : O + I / 2 > r && (R[2] = Math.max(Math.round(O + I / 2 - r), R[2])), x.sideOverflow = f)
                }), 0 === C(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), q && p(this.points, function(a) {
                    var c;
                    w = a.connector;
                    if ((x = a.dataLabel) && x._pos && a.visible && 0 < a.labelDistance) {
                        P = x._attr.visibility;
                        if (c = !w) a.connector = w = g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup);
                        w[c ? "attr" : "animate"]({
                            d: b.connectorPath(a.labelPos)
                        });
                        w.attr("visibility", P)
                    } else w && (a.connector = w.destroy())
                }))
            }, y.pie.prototype.connectorPath = function(a) {
                var b = a.x,
                    c = a.y;
                return l(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" ===
                    a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
            }, y.pie.prototype.placeDataLabels = function() {
                p(this.points, function(a) {
                    var b = a.dataLabel;
                    b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                        width: b._attr.width + "px",
                        textOverflow: this.options.dataLabels.style.textOverflow || "ellipsis"
                    }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                        y: -9999
                    }))
                }, this)
            }, y.pie.prototype.alignDataLabel = v, y.pie.prototype.verifyDataLabelOverflow =
            function(a) {
                var b = this.center,
                    c = this.options,
                    d = c.center,
                    g = c.minSize || 80,
                    l, m = null !== c.size;
                m || (null !== d[0] ? l = Math.max(b[2] - Math.max(a[1], a[3]), g) : (l = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2), null !== d[1] ? l = Math.max(Math.min(l, b[2] - Math.max(a[0], a[2])), g) : (l = Math.max(Math.min(l, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2), l < b[2] ? (b[2] = l, b[3] = Math.min(e(c.innerSize || 0, l), l), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : m = !0);
                return m
            });
        y.column && (y.column.prototype.alignDataLabel = function(a,
            d, e, g, m) {
            var b = this.chart.inverted,
                f = a.series,
                n = a.dlBox || a.shapeArgs,
                r = l(a.below, a.plotY > l(this.translatedThreshold, f.yAxis.len)),
                q = l(e.inside, !!this.options.stacking);
            n && (g = w(n), 0 > g.y && (g.height += g.y, g.y = 0), n = g.y + g.height - f.yAxis.len, 0 < n && (g.height -= n), b && (g = {
                x: f.yAxis.len - g.y - g.height,
                y: f.xAxis.len - g.x - g.width,
                width: g.height,
                height: g.width
            }), q || (b ? (g.x += r ? 0 : g.width, g.width = 0) : (g.y += r ? g.height : 0, g.height = 0)));
            e.align = l(e.align, !b || q ? "center" : r ? "right" : "left");
            e.verticalAlign = l(e.verticalAlign, b ||
                q ? "middle" : r ? "top" : "bottom");
            c.prototype.alignDataLabel.call(this, a, d, e, g, m);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(K);
    (function(a) {
        var A = a.Chart,
            C = a.each,
            E = a.objectEach,
            p = a.pick;
        a = a.addEvent;
        a(A, "render", function() {
            var a = [];
            C(this.labelCollectors || [], function(d) {
                a = a.concat(d())
            });
            C(this.yAxis || [], function(d) {
                d.options.stackLabels && !d.options.stackLabels.allowOverlap && E(d.stacks, function(d) {
                    E(d, function(d) {
                        a.push(d.label)
                    })
                })
            });
            C(this.series || [], function(d) {
                var g =
                    d.options.dataLabels,
                    w = d.dataLabelCollections || ["dataLabel"];
                (g.enabled || d._hasPointLabels) && !g.allowOverlap && d.visible && C(w, function(g) {
                    C(d.points, function(d) {
                        d[g] && (d[g].labelrank = p(d.labelrank, d.shapeArgs && d.shapeArgs.height), a.push(d[g]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        A.prototype.hideOverlappingLabels = function(a) {
            var d = a.length,
                g, p, v, l, e, c, y = function(a, c, b, d, e, g, l, m) {
                    return !(e > a + b || e + l < a || g > c + d || g + m < c)
                };
            v = function(a) {
                var c, b, d, e = 2 * (a.box ? 0 : a.padding || 0);
                if (a && (!a.alignAttr || a.placed)) return c =
                    a.alignAttr || {
                        x: a.attr("x"),
                        y: a.attr("y")
                    }, b = a.parentGroup, a.width || (d = a.getBBox(), a.width = d.width, a.height = d.height), {
                        x: c.x + (b.translateX || 0),
                        y: c.y + (b.translateY || 0),
                        width: a.width - e,
                        height: a.height - e
                    }
            };
            for (p = 0; p < d; p++)
                if (g = a[p]) g.oldOpacity = g.opacity, g.newOpacity = 1, g.absoluteBox = v(g);
            a.sort(function(a, c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (p = 0; p < d; p++)
                for (c = (v = a[p]) && v.absoluteBox, g = p + 1; g < d; ++g)
                    if (e = (l = a[g]) && l.absoluteBox, c && e && v !== l && 0 !== v.newOpacity && 0 !== l.newOpacity && (e = y(c.x, c.y, c.width,
                            c.height, e.x, e.y, e.width, e.height)))(v.labelrank < l.labelrank ? v : l).newOpacity = 0;
            C(a, function(a) {
                var c, b;
                a && (b = a.newOpacity, a.oldOpacity !== b && (a.alignAttr && a.placed ? (b ? a.show(!0) : c = function() {
                    a.hide()
                }, a.alignAttr.opacity = b, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, c)) : a.attr({
                    opacity: b
                })), a.isOld = !0)
            })
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            C = a.Chart,
            E = a.createElement,
            p = a.css,
            g = a.defaultOptions,
            d = a.defaultPlotOptions,
            m = a.each,
            w = a.extend,
            v = a.fireEvent,
            l = a.hasTouch,
            e = a.inArray,
            c = a.isObject,
            y = a.Legend,
            n = a.merge,
            q = a.pick,
            b = a.Point,
            f = a.Series,
            t = a.seriesTypes,
            F = a.svg,
            J;
        J = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart.pointer,
                    c = function(a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                m(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (m(a.trackerGroups, function(d) {
                    if (a[d] && (a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout",
                            function(a) {
                                b.onTrackerMouseOut(a)
                            }), l)) a[d].on("touchstart", c)
                }), a._hasTracking = !0);
                v(this, "afterDrawTracker")
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options.trackByArea,
                    c = [].concat(b ? a.areaPath : a.graphPath),
                    d = c.length,
                    e = a.chart,
                    f = e.pointer,
                    g = e.renderer,
                    q = e.options.tooltip.snap,
                    h = a.tracker,
                    n, p = function() {
                        if (e.hoverSeries !== a) a.onMouseOver()
                    },
                    k = "rgba(192,192,192," + (F ? .0001 : .002) + ")";
                if (d && !b)
                    for (n = d + 1; n--;) "M" === c[n] && c.splice(n + 1, 0, c[n + 1] - q, c[n + 2], "L"), (n && "M" === c[n] || n === d) && c.splice(n, 0, "L",
                        c[n - 2] + q, c[n - 1]);
                h ? h.attr({
                    d: c
                }) : a.graph && (a.tracker = g.path(c).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: k,
                    fill: b ? k : "none",
                    "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * q),
                    zIndex: 2
                }).add(a.group), m([a.tracker, a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function(a) {
                        f.onTrackerMouseOut(a)
                    });
                    if (l) a.on("touchstart", p)
                }));
                v(this, "afterDrawTracker")
            }
        };
        t.column && (t.column.prototype.drawTracker = J.drawTrackerPoint);
        t.pie && (t.pie.prototype.drawTracker =
            J.drawTrackerPoint);
        t.scatter && (t.scatter.prototype.drawTracker = J.drawTrackerPoint);
        w(y.prototype, {
            setItemEvents: function(a, c, d) {
                var e = this.chart.renderer.boxWrapper,
                    f = "highcharts-legend-" + (a instanceof b ? "point" : "series") + "-active";
                (d ? c : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    e.addClass(f)
                }).on("mouseout", function() {
                    e.removeClass(f);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    e.removeClass(f);
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick",
                        b, c) : v(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = E("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                A(a.checkbox, "click", function(b) {
                    v(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        w(C.prototype, {
            showResetZoom: function() {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    c = g.lang,
                    d = b.options.chart.resetZoomButton,
                    e = d.theme,
                    f = e.states,
                    l = "chart" === d.relativeTo ? null :
                    "plotBox";
                v(this, "beforeShowResetZoom", null, function() {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, e, f && f.hover).attr({
                        align: d.position.align,
                        title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1, l)
                })
            },
            zoomOut: function() {
                v(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function(a) {
                var b, d = this.pointer,
                    e = !1,
                    f;
                !a || a.resetSelection ? (m(this.axes, function(a) {
                    b = a.zoom()
                }), d.initiated = !1) : m(a.xAxis.concat(a.yAxis), function(a) {
                    var c = a.axis;
                    d[c.isXAxis ?
                        "zoomX" : "zoomY"] && (b = c.zoom(a.min, a.max), c.displayBtn && (e = !0))
                });
                f = this.resetZoomButton;
                e && !f ? this.showResetZoom() : !e && c(f) && (this.resetZoomButton = f.destroy());
                b && this.redraw(q(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && m(d, function(a) {
                    a.setState()
                });
                m("xy" === b ? [1, 0] : [1], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        f = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        g = c[d],
                        l = (b.pointRange || 0) / 2,
                        m = b.reversed && !c.inverted ||
                        !b.reversed && c.inverted ? -1 : 1,
                        k = b.getExtremes(),
                        r = b.toValue(g - f, !0) + l * m,
                        m = b.toValue(g + b.len - f, !0) - l * m,
                        n = m < r,
                        g = n ? m : r,
                        r = n ? r : m,
                        m = Math.min(k.dataMin, l ? k.min : b.toValue(b.toPixels(k.min) - b.minPixelPadding)),
                        l = Math.max(k.dataMax, l ? k.max : b.toValue(b.toPixels(k.max) + b.minPixelPadding)),
                        n = m - g;
                    0 < n && (r += n, g = m);
                    n = r - l;
                    0 < n && (r = l, g -= n);
                    b.series.length && g !== k.min && r !== k.max && (b.setExtremes(g, r, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                p(c.container, {
                    cursor: "move"
                })
            }
        });
        w(b.prototype, {
            select: function(a, b) {
                var c =
                    this,
                    d = c.series,
                    f = d.chart;
                a = q(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    d.options.data[e(c, d.data)] = c.options;
                    c.setState(a && "select");
                    b || m(f.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[e(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                m(a.hoverPoints || [], function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = n(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function(a, c) {
                        A(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    e = this.plotY,
                    f = this.series,
                    g = f.options.states[a || "normal"] || {},
                    l = d[f.type].marker &&
                    f.options.marker,
                    m = l && !1 === l.enabled,
                    h = l && l.states && l.states[a || "normal"] || {},
                    n = !1 === h.enabled,
                    p = f.stateMarkerGraphic,
                    k = this.marker || {},
                    t = f.chart,
                    w = f.halo,
                    y, D = l && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (n || m && !1 === h.enabled) || a && k.states && k.states[a] && !1 === k.states[a].enabled)) {
                    D && (y = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), y &&
                        this.graphic.animate(y, q(t.options.chart.animation, h.animation, l.animation)), p && p.hide();
                    else {
                        if (a && h)
                            if (l = k.symbol || f.symbol, p && p.currentSymbol !== l && (p = p.destroy()), p) p[b ? "animate" : "attr"]({
                                x: y.x,
                                y: y.y
                            });
                            else l && (f.stateMarkerGraphic = p = t.renderer.symbol(l, y.x, y.y, y.width, y.height).add(f.markerGroup), p.currentSymbol = l);
                        p && (p[a && t.isInsidePlot(c, e, t.inverted) ? "show" : "hide"](), p.element.point = this)
                    }(c = g.halo) && c.size ? (w || (f.halo = w = t.renderer.path().add((this.graphic || p).parentGroup)), w.show()[b ? "animate" :
                        "attr"]({
                        d: this.haloPath(c.size)
                    }), w.attr({
                        "class": "highcharts-halo highcharts-color-" + q(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : ""),
                        zIndex: -1
                    }), w.point = this) : w && w.point && w.point.haloPath && w.animate({
                        d: w.point.haloPath(0)
                    }, null, w.hide);
                    this.state = a;
                    v(this, "afterSetState")
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        w(f.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !==
                    this) b.onMouseOut();
                this.options.events.mouseOver && v(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && v(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this;
                a = a || "";
                b.state !== a && (m([b.group, b.markerGroup, b.dataLabelsGroup], function(c) {
                    c && (b.state && c.removeClass("highcharts-series-" +
                        b.state), a && c.addClass("highcharts-series-" + a))
                }), b.state = a)
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    f, g = d.options.chart.ignoreHiddenSeries,
                    l = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !l : a) ? "show" : "hide";
                m(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && m(d.series,
                    function(a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    });
                m(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                g && (d.isDirtyBox = !0);
                v(c, f);
                !1 !== b && d.redraw()
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                v(this, a ? "select" : "unselect")
            },
            drawTracker: J.drawTrackerGraph
        })
    })(K);
    (function(a) {
        var A = a.Chart,
            C = a.each,
            E = a.inArray,
            p = a.isArray,
            g = a.isObject,
            d = a.pick,
            m = a.splat;
        A.prototype.setResponsive =
            function(d) {
                var g = this.options.responsive,
                    l = [],
                    e = this.currentResponsive;
                g && g.rules && C(g.rules, function(c) {
                    void 0 === c._id && (c._id = a.uniqueKey());
                    this.matchResponsiveRule(c, l, d)
                }, this);
                var c = a.merge.apply(0, a.map(l, function(c) {
                        return a.find(g.rules, function(a) {
                            return a._id === c
                        }).chartOptions
                    })),
                    l = l.toString() || void 0;
                l !== (e && e.ruleIds) && (e && this.update(e.undoOptions, d), l ? (this.currentResponsive = {
                    ruleIds: l,
                    mergedOptions: c,
                    undoOptions: this.currentOptions(c)
                }, this.update(c, d)) : this.currentResponsive = void 0)
            };
        A.prototype.matchResponsiveRule = function(a, g) {
            var l = a.condition;
            (l.callback || function() {
                return this.chartWidth <= d(l.maxWidth, Number.MAX_VALUE) && this.chartHeight <= d(l.maxHeight, Number.MAX_VALUE) && this.chartWidth >= d(l.minWidth, 0) && this.chartHeight >= d(l.minHeight, 0)
            }).call(this) && g.push(a._id)
        };
        A.prototype.currentOptions = function(d) {
            function v(d, c, l, n) {
                var e;
                a.objectEach(d, function(a, d) {
                    if (!n && -1 < E(d, ["series", "xAxis", "yAxis"]))
                        for (a = m(a), l[d] = [], e = 0; e < a.length; e++) c[d][e] && (l[d][e] = {}, v(a[e], c[d][e],
                            l[d][e], n + 1));
                    else g(a) ? (l[d] = p(a) ? [] : {}, v(a, c[d] || {}, l[d], n + 1)) : l[d] = c[d] || null
                })
            }
            var l = {};
            v(d, this.options, l, 0);
            return l
        }
    })(K);
    return K
});