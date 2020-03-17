// MessagePack.min.js
!function(t, r) {
    "object" == typeof exports && "undefined" != typeof module ? r(exports) : "function" == typeof define && define.amd ? define(["exports"], r) : r((t = t || self).MessagePack = {})
}(this, function(t) {
    "use strict";
    const r = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      , e = (t,r)=>{
        let e = t;
        return "string" == typeof r ? e = t.toLocaleString(r) : !0 === r && (e = t.toLocaleString()),
        e
    }
    ;
    for (var n = function(t) {
        var r = l(t)
          , e = r[0]
          , n = r[1];
        return 3 * (e + n) / 4 - n
    }, i = function(t) {
        for (var r, e = l(t), n = e[0], i = e[1], o = new a(function(t, r, e) {
            return 3 * (r + e) / 4 - e
        }(0, n, i)), f = 0, s = i > 0 ? n - 4 : n, h = 0; h < s; h += 4)
            r = u[t.charCodeAt(h)] << 18 | u[t.charCodeAt(h + 1)] << 12 | u[t.charCodeAt(h + 2)] << 6 | u[t.charCodeAt(h + 3)],
            o[f++] = r >> 16 & 255,
            o[f++] = r >> 8 & 255,
            o[f++] = 255 & r;
        2 === i && (r = u[t.charCodeAt(h)] << 2 | u[t.charCodeAt(h + 1)] >> 4,
        o[f++] = 255 & r);
        1 === i && (r = u[t.charCodeAt(h)] << 10 | u[t.charCodeAt(h + 1)] << 4 | u[t.charCodeAt(h + 2)] >> 2,
        o[f++] = r >> 8 & 255,
        o[f++] = 255 & r);
        return o
    }, o = function(t) {
        for (var r, e = t.length, n = e % 3, i = [], o = 0, u = e - n; o < u; o += 16383)
            i.push(p(t, o, o + 16383 > u ? u : o + 16383));
        1 === n ? (r = t[e - 1],
        i.push(f[r >> 2] + f[r << 4 & 63] + "==")) : 2 === n && (r = (t[e - 2] << 8) + t[e - 1],
        i.push(f[r >> 10] + f[r >> 4 & 63] + f[r << 2 & 63] + "="));
        return i.join("")
    }, f = [], u = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, c = s.length; h < c; ++h)
        f[h] = s[h],
        u[s.charCodeAt(h)] = h;
    function l(t) {
        var r = t.length;
        if (r % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
        var e = t.indexOf("=");
        return -1 === e && (e = r),
        [e, e === r ? 0 : 4 - e % 4]
    }
    function p(t, r, e) {
        for (var n, i, o = [], u = r; u < e; u += 3)
            n = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]),
            o.push(f[(i = n) >> 18 & 63] + f[i >> 12 & 63] + f[i >> 6 & 63] + f[63 & i]);
        return o.join("")
    }
    u["-".charCodeAt(0)] = 62,
    u["_".charCodeAt(0)] = 63;
    var y, g = {
        byteLength: n,
        toByteArray: i,
        fromByteArray: o
    }, d = {
        read: function(t, r, e, n, i) {
            var o, f, u = 8 * i - n - 1, a = (1 << u) - 1, s = a >> 1, h = -7, c = e ? i - 1 : 0, l = e ? -1 : 1, p = t[r + c];
            for (c += l,
            o = p & (1 << -h) - 1,
            p >>= -h,
            h += u; h > 0; o = 256 * o + t[r + c],
            c += l,
            h -= 8)
                ;
            for (f = o & (1 << -h) - 1,
            o >>= -h,
            h += n; h > 0; f = 256 * f + t[r + c],
            c += l,
            h -= 8)
                ;
            if (0 === o)
                o = 1 - s;
            else {
                if (o === a)
                    return f ? NaN : 1 / 0 * (p ? -1 : 1);
                f += Math.pow(2, n),
                o -= s
            }
            return (p ? -1 : 1) * f * Math.pow(2, o - n)
        },
        write: function(t, r, e, n, i, o) {
            var f, u, a, s = 8 * o - i - 1, h = (1 << s) - 1, c = h >> 1, l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : o - 1, y = n ? 1 : -1, g = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;
            for (r = Math.abs(r),
            isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0,
            f = h) : (f = Math.floor(Math.log(r) / Math.LN2),
            r * (a = Math.pow(2, -f)) < 1 && (f--,
            a *= 2),
            (r += f + c >= 1 ? l / a : l * Math.pow(2, 1 - c)) * a >= 2 && (f++,
            a /= 2),
            f + c >= h ? (u = 0,
            f = h) : f + c >= 1 ? (u = (r * a - 1) * Math.pow(2, i),
            f += c) : (u = r * Math.pow(2, c - 1) * Math.pow(2, i),
            f = 0)); i >= 8; t[e + p] = 255 & u,
            p += y,
            u /= 256,
            i -= 8)
                ;
            for (f = f << i | u,
            s += i; s > 0; t[e + p] = 255 & f,
            p += y,
            f /= 256,
            s -= 8)
                ;
            t[e + p - y] |= 128 * g
        }
    }, w = (function(t, r) {
        r.Buffer = i,
        r.SlowBuffer = function(t) {
            +t != t && (t = 0);
            return i.alloc(+t)
        }
        ,
        r.INSPECT_MAX_BYTES = 50;
        var e = 2147483647;
        function n(t) {
            if (t > e)
                throw new RangeError('The value "' + t + '" is invalid for option "size"');
            var r = new Uint8Array(t);
            return r.__proto__ = i.prototype,
            r
        }
        function i(t, r, e) {
            if ("number" == typeof t) {
                if ("string" == typeof r)
                    throw new TypeError('The "string" argument must be of type string. Received type number');
                return u(t)
            }
            return o(t, r, e)
        }
        function o(t, r, e) {
            if ("string" == typeof t)
                return function(t, r) {
                    "string" == typeof r && "" !== r || (r = "utf8");
                    if (!i.isEncoding(r))
                        throw new TypeError("Unknown encoding: " + r);
                    var e = 0 | h(t, r)
                      , o = n(e)
                      , f = o.write(t, r);
                    f !== e && (o = o.slice(0, f));
                    return o
                }(t, r);
            if (ArrayBuffer.isView(t))
                return a(t);
            if (null == t)
                throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
            if (j(t, ArrayBuffer) || t && j(t.buffer, ArrayBuffer))
                return function(t, r, e) {
                    if (r < 0 || t.byteLength < r)
                        throw new RangeError('"offset" is outside of buffer bounds');
                    if (t.byteLength < r + (e || 0))
                        throw new RangeError('"length" is outside of buffer bounds');
                    var n;
                    n = void 0 === r && void 0 === e ? new Uint8Array(t) : void 0 === e ? new Uint8Array(t,r) : new Uint8Array(t,r,e);
                    return n.__proto__ = i.prototype,
                    n
                }(t, r, e);
            if ("number" == typeof t)
                throw new TypeError('The "value" argument must not be of type number. Received type number');
            var o = t.valueOf && t.valueOf();
            if (null != o && o !== t)
                return i.from(o, r, e);
            var f = function(t) {
                if (i.isBuffer(t)) {
                    var r = 0 | s(t.length)
                      , e = n(r);
                    return 0 === e.length ? e : (t.copy(e, 0, 0, r),
                    e)
                }
                if (void 0 !== t.length)
                    return "number" != typeof t.length || F(t.length) ? n(0) : a(t);
                if ("Buffer" === t.type && Array.isArray(t.data))
                    return a(t.data)
            }(t);
            if (f)
                return f;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive])
                return i.from(t[Symbol.toPrimitive]("string"), r, e);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
        }
        function f(t) {
            if ("number" != typeof t)
                throw new TypeError('"size" argument must be of type number');
            if (t < 0)
                throw new RangeError('The value "' + t + '" is invalid for option "size"')
        }
        function u(t) {
            return f(t),
            n(t < 0 ? 0 : 0 | s(t))
        }
        function a(t) {
            for (var r = t.length < 0 ? 0 : 0 | s(t.length), e = n(r), i = 0; i < r; i += 1)
                e[i] = 255 & t[i];
            return e
        }
        function s(t) {
            if (t >= e)
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + e.toString(16) + " bytes");
            return 0 | t
        }
        function h(t, r) {
            if (i.isBuffer(t))
                return t.length;
            if (ArrayBuffer.isView(t) || j(t, ArrayBuffer))
                return t.byteLength;
            if ("string" != typeof t)
                throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
            var e = t.length
              , n = arguments.length > 2 && !0 === arguments[2];
            if (!n && 0 === e)
                return 0;
            for (var o = !1; ; )
                switch (r) {
                case "ascii":
                case "latin1":
                case "binary":
                    return e;
                case "utf8":
                case "utf-8":
                    return N(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * e;
                case "hex":
                    return e >>> 1;
                case "base64":
                    return P(t).length;
                default:
                    if (o)
                        return n ? -1 : N(t).length;
                    r = ("" + r).toLowerCase(),
                    o = !0
                }
        }
        function c(t, r, e) {
            var n = t[r];
            t[r] = t[e],
            t[e] = n
        }
        function l(t, r, e, n, o) {
            if (0 === t.length)
                return -1;
            if ("string" == typeof e ? (n = e,
            e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648),
            F(e = +e) && (e = o ? 0 : t.length - 1),
            e < 0 && (e = t.length + e),
            e >= t.length) {
                if (o)
                    return -1;
                e = t.length - 1
            } else if (e < 0) {
                if (!o)
                    return -1;
                e = 0
            }
            if ("string" == typeof r && (r = i.from(r, n)),
            i.isBuffer(r))
                return 0 === r.length ? -1 : p(t, r, e, n, o);
            if ("number" == typeof r)
                return r &= 255,
                "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : p(t, [r], e, n, o);
            throw new TypeError("val must be string, number or Buffer")
        }
        function p(t, r, e, n, i) {
            var o, f = 1, u = t.length, a = r.length;
            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (t.length < 2 || r.length < 2)
                    return -1;
                f = 2,
                u /= 2,
                a /= 2,
                e /= 2
            }
            function s(t, r) {
                return 1 === f ? t[r] : t.readUInt16BE(r * f)
            }
            if (i) {
                var h = -1;
                for (o = e; o < u; o++)
                    if (s(t, o) === s(r, -1 === h ? 0 : o - h)) {
                        if (-1 === h && (h = o),
                        o - h + 1 === a)
                            return h * f
                    } else
                        -1 !== h && (o -= o - h),
                        h = -1
            } else
                for (e + a > u && (e = u - a),
                o = e; o >= 0; o--) {
                    for (var c = !0, l = 0; l < a; l++)
                        if (s(t, o + l) !== s(r, l)) {
                            c = !1;
                            break
                        }
                    if (c)
                        return o
                }
            return -1
        }
        function y(t, r, e, n) {
            e = Number(e) || 0;
            var i = t.length - e;
            n ? (n = Number(n)) > i && (n = i) : n = i;
            var o = r.length;
            n > o / 2 && (n = o / 2);
            for (var f = 0; f < n; ++f) {
                var u = parseInt(r.substr(2 * f, 2), 16);
                if (F(u))
                    return f;
                t[e + f] = u
            }
            return f
        }
        function w(t, r, e, n) {
            return z(N(r, t.length - e), t, e, n)
        }
        function b(t, r, e, n) {
            return z(function(t) {
                for (var r = [], e = 0; e < t.length; ++e)
                    r.push(255 & t.charCodeAt(e));
                return r
            }(r), t, e, n)
        }
        function v(t, r, e, n) {
            return b(t, r, e, n)
        }
        function E(t, r, e, n) {
            return z(P(r), t, e, n)
        }
        function m(t, r, e, n) {
            return z(function(t, r) {
                for (var e, n, i, o = [], f = 0; f < t.length && !((r -= 2) < 0); ++f)
                    e = t.charCodeAt(f),
                    n = e >> 8,
                    i = e % 256,
                    o.push(i),
                    o.push(n);
                return o
            }(r, t.length - e), t, e, n)
        }
        function B(t, r, e) {
            return 0 === r && e === t.length ? g.fromByteArray(t) : g.fromByteArray(t.slice(r, e))
        }
        function A(t, r, e) {
            e = Math.min(t.length, e);
            for (var n = [], i = r; i < e; ) {
                var o, f, u, a, s = t[i], h = null, c = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
                if (i + c <= e)
                    switch (c) {
                    case 1:
                        s < 128 && (h = s);
                        break;
                    case 2:
                        128 == (192 & (o = t[i + 1])) && (a = (31 & s) << 6 | 63 & o) > 127 && (h = a);
                        break;
                    case 3:
                        o = t[i + 1],
                        f = t[i + 2],
                        128 == (192 & o) && 128 == (192 & f) && (a = (15 & s) << 12 | (63 & o) << 6 | 63 & f) > 2047 && (a < 55296 || a > 57343) && (h = a);
                        break;
                    case 4:
                        o = t[i + 1],
                        f = t[i + 2],
                        u = t[i + 3],
                        128 == (192 & o) && 128 == (192 & f) && 128 == (192 & u) && (a = (15 & s) << 18 | (63 & o) << 12 | (63 & f) << 6 | 63 & u) > 65535 && a < 1114112 && (h = a)
                    }
                null === h ? (h = 65533,
                c = 1) : h > 65535 && (h -= 65536,
                n.push(h >>> 10 & 1023 | 55296),
                h = 56320 | 1023 & h),
                n.push(h),
                i += c
            }
            return function(t) {
                var r = t.length;
                if (r <= U)
                    return String.fromCharCode.apply(String, t);
                var e = ""
                  , n = 0;
                for (; n < r; )
                    e += String.fromCharCode.apply(String, t.slice(n, n += U));
                return e
            }(n)
        }
        r.kMaxLength = e,
        i.TYPED_ARRAY_SUPPORT = function() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                },
                42 === t.foo()
            } catch (t) {
                return !1
            }
        }(),
        i.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
        Object.defineProperty(i.prototype, "parent", {
            enumerable: !0,
            get: function() {
                if (i.isBuffer(this))
                    return this.buffer
            }
        }),
        Object.defineProperty(i.prototype, "offset", {
            enumerable: !0,
            get: function() {
                if (i.isBuffer(this))
                    return this.byteOffset
            }
        }),
        "undefined" != typeof Symbol && null != Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
            value: null,
            configurable: !0,
            enumerable: !1,
            writable: !1
        }),
        i.poolSize = 8192,
        i.from = function(t, r, e) {
            return o(t, r, e)
        }
        ,
        i.prototype.__proto__ = Uint8Array.prototype,
        i.__proto__ = Uint8Array,
        i.alloc = function(t, r, e) {
            return function(t, r, e) {
                return f(t),
                t <= 0 ? n(t) : void 0 !== r ? "string" == typeof e ? n(t).fill(r, e) : n(t).fill(r) : n(t)
            }(t, r, e)
        }
        ,
        i.allocUnsafe = function(t) {
            return u(t)
        }
        ,
        i.allocUnsafeSlow = function(t) {
            return u(t)
        }
        ,
        i.isBuffer = function(t) {
            return null != t && !0 === t._isBuffer && t !== i.prototype
        }
        ,
        i.compare = function(t, r) {
            if (j(t, Uint8Array) && (t = i.from(t, t.offset, t.byteLength)),
            j(r, Uint8Array) && (r = i.from(r, r.offset, r.byteLength)),
            !i.isBuffer(t) || !i.isBuffer(r))
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t === r)
                return 0;
            for (var e = t.length, n = r.length, o = 0, f = Math.min(e, n); o < f; ++o)
                if (t[o] !== r[o]) {
                    e = t[o],
                    n = r[o];
                    break
                }
            return e < n ? -1 : n < e ? 1 : 0
        }
        ,
        i.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ,
        i.concat = function(t, r) {
            if (!Array.isArray(t))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length)
                return i.alloc(0);
            var e;
            if (void 0 === r)
                for (r = 0,
                e = 0; e < t.length; ++e)
                    r += t[e].length;
            var n = i.allocUnsafe(r)
              , o = 0;
            for (e = 0; e < t.length; ++e) {
                var f = t[e];
                if (j(f, Uint8Array) && (f = i.from(f)),
                !i.isBuffer(f))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                f.copy(n, o),
                o += f.length
            }
            return n
        }
        ,
        i.byteLength = h,
        i.prototype._isBuffer = !0,
        i.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var r = 0; r < t; r += 2)
                c(this, r, r + 1);
            return this
        }
        ,
        i.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var r = 0; r < t; r += 4)
                c(this, r, r + 3),
                c(this, r + 1, r + 2);
            return this
        }
        ,
        i.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var r = 0; r < t; r += 8)
                c(this, r, r + 7),
                c(this, r + 1, r + 6),
                c(this, r + 2, r + 5),
                c(this, r + 3, r + 4);
            return this
        }
        ,
        i.prototype.toString = function() {
            var t = this.length;
            return 0 === t ? "" : 0 === arguments.length ? A(this, 0, t) : function(t, r, e) {
                var n = !1;
                if ((void 0 === r || r < 0) && (r = 0),
                r > this.length)
                    return "";
                if ((void 0 === e || e > this.length) && (e = this.length),
                e <= 0)
                    return "";
                if ((e >>>= 0) <= (r >>>= 0))
                    return "";
                for (t || (t = "utf8"); ; )
                    switch (t) {
                    case "hex":
                        return M(this, r, e);
                    case "utf8":
                    case "utf-8":
                        return A(this, r, e);
                    case "ascii":
                        return I(this, r, e);
                    case "latin1":
                    case "binary":
                        return k(this, r, e);
                    case "base64":
                        return B(this, r, e);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return S(this, r, e);
                    default:
                        if (n)
                            throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(),
                        n = !0
                    }
            }
            .apply(this, arguments)
        }
        ,
        i.prototype.toLocaleString = i.prototype.toString,
        i.prototype.equals = function(t) {
            if (!i.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === i.compare(this, t)
        }
        ,
        i.prototype.inspect = function() {
            var t = ""
              , e = r.INSPECT_MAX_BYTES;
            return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(),
            this.length > e && (t += " ... "),
            "<Buffer " + t + ">"
        }
        ,
        i.prototype.compare = function(t, r, e, n, o) {
            if (j(t, Uint8Array) && (t = i.from(t, t.offset, t.byteLength)),
            !i.isBuffer(t))
                throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
            if (void 0 === r && (r = 0),
            void 0 === e && (e = t ? t.length : 0),
            void 0 === n && (n = 0),
            void 0 === o && (o = this.length),
            r < 0 || e > t.length || n < 0 || o > this.length)
                throw new RangeError("out of range index");
            if (n >= o && r >= e)
                return 0;
            if (n >= o)
                return -1;
            if (r >= e)
                return 1;
            if (this === t)
                return 0;
            for (var f = (o >>>= 0) - (n >>>= 0), u = (e >>>= 0) - (r >>>= 0), a = Math.min(f, u), s = this.slice(n, o), h = t.slice(r, e), c = 0; c < a; ++c)
                if (s[c] !== h[c]) {
                    f = s[c],
                    u = h[c];
                    break
                }
            return f < u ? -1 : u < f ? 1 : 0
        }
        ,
        i.prototype.includes = function(t, r, e) {
            return -1 !== this.indexOf(t, r, e)
        }
        ,
        i.prototype.indexOf = function(t, r, e) {
            return l(this, t, r, e, !0)
        }
        ,
        i.prototype.lastIndexOf = function(t, r, e) {
            return l(this, t, r, e, !1)
        }
        ,
        i.prototype.write = function(t, r, e, n) {
            if (void 0 === r)
                n = "utf8",
                e = this.length,
                r = 0;
            else if (void 0 === e && "string" == typeof r)
                n = r,
                e = this.length,
                r = 0;
            else {
                if (!isFinite(r))
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                r >>>= 0,
                isFinite(e) ? (e >>>= 0,
                void 0 === n && (n = "utf8")) : (n = e,
                e = void 0)
            }
            var i = this.length - r;
            if ((void 0 === e || e > i) && (e = i),
            t.length > 0 && (e < 0 || r < 0) || r > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1; ; )
                switch (n) {
                case "hex":
                    return y(this, t, r, e);
                case "utf8":
                case "utf-8":
                    return w(this, t, r, e);
                case "ascii":
                    return b(this, t, r, e);
                case "latin1":
                case "binary":
                    return v(this, t, r, e);
                case "base64":
                    return E(this, t, r, e);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return m(this, t, r, e);
                default:
                    if (o)
                        throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(),
                    o = !0
                }
        }
        ,
        i.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        var U = 4096;
        function I(t, r, e) {
            var n = "";
            e = Math.min(t.length, e);
            for (var i = r; i < e; ++i)
                n += String.fromCharCode(127 & t[i]);
            return n
        }
        function k(t, r, e) {
            var n = "";
            e = Math.min(t.length, e);
            for (var i = r; i < e; ++i)
                n += String.fromCharCode(t[i]);
            return n
        }
        function M(t, r, e) {
            var n = t.length;
            (!r || r < 0) && (r = 0),
            (!e || e < 0 || e > n) && (e = n);
            for (var i = "", o = r; o < e; ++o)
                i += O(t[o]);
            return i
        }
        function S(t, r, e) {
            for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2)
                i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i
        }
        function T(t, r, e) {
            if (t % 1 != 0 || t < 0)
                throw new RangeError("offset is not uint");
            if (t + r > e)
                throw new RangeError("Trying to access beyond buffer length")
        }
        function _(t, r, e, n, o, f) {
            if (!i.isBuffer(t))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (r > o || r < f)
                throw new RangeError('"value" argument is out of bounds');
            if (e + n > t.length)
                throw new RangeError("Index out of range")
        }
        function L(t, r, e, n, i, o) {
            if (e + n > t.length)
                throw new RangeError("Index out of range");
            if (e < 0)
                throw new RangeError("Index out of range")
        }
        function x(t, r, e, n, i) {
            return r = +r,
            e >>>= 0,
            i || L(t, 0, e, 4),
            d.write(t, r, e, n, 23, 4),
            e + 4
        }
        function C(t, r, e, n, i) {
            return r = +r,
            e >>>= 0,
            i || L(t, 0, e, 8),
            d.write(t, r, e, n, 52, 8),
            e + 8
        }
        i.prototype.slice = function(t, r) {
            var e = this.length;
            (t = ~~t) < 0 ? (t += e) < 0 && (t = 0) : t > e && (t = e),
            (r = void 0 === r ? e : ~~r) < 0 ? (r += e) < 0 && (r = 0) : r > e && (r = e),
            r < t && (r = t);
            var n = this.subarray(t, r);
            return n.__proto__ = i.prototype,
            n
        }
        ,
        i.prototype.readUIntLE = function(t, r, e) {
            t >>>= 0,
            r >>>= 0,
            e || T(t, r, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
                n += this[t + o] * i;
            return n
        }
        ,
        i.prototype.readUIntBE = function(t, r, e) {
            t >>>= 0,
            r >>>= 0,
            e || T(t, r, this.length);
            for (var n = this[t + --r], i = 1; r > 0 && (i *= 256); )
                n += this[t + --r] * i;
            return n
        }
        ,
        i.prototype.readUInt8 = function(t, r) {
            return t >>>= 0,
            r || T(t, 1, this.length),
            this[t]
        }
        ,
        i.prototype.readUInt16LE = function(t, r) {
            return t >>>= 0,
            r || T(t, 2, this.length),
            this[t] | this[t + 1] << 8
        }
        ,
        i.prototype.readUInt16BE = function(t, r) {
            return t >>>= 0,
            r || T(t, 2, this.length),
            this[t] << 8 | this[t + 1]
        }
        ,
        i.prototype.readUInt32LE = function(t, r) {
            return t >>>= 0,
            r || T(t, 4, this.length),
            (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }
        ,
        i.prototype.readUInt32BE = function(t, r) {
            return t >>>= 0,
            r || T(t, 4, this.length),
            16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }
        ,
        i.prototype.readIntLE = function(t, r, e) {
            t >>>= 0,
            r >>>= 0,
            e || T(t, r, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
                n += this[t + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)),
            n
        }
        ,
        i.prototype.readIntBE = function(t, r, e) {
            t >>>= 0,
            r >>>= 0,
            e || T(t, r, this.length);
            for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256); )
                o += this[t + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)),
            o
        }
        ,
        i.prototype.readInt8 = function(t, r) {
            return t >>>= 0,
            r || T(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }
        ,
        i.prototype.readInt16LE = function(t, r) {
            t >>>= 0,
            r || T(t, 2, this.length);
            var e = this[t] | this[t + 1] << 8;
            return 32768 & e ? 4294901760 | e : e
        }
        ,
        i.prototype.readInt16BE = function(t, r) {
            t >>>= 0,
            r || T(t, 2, this.length);
            var e = this[t + 1] | this[t] << 8;
            return 32768 & e ? 4294901760 | e : e
        }
        ,
        i.prototype.readInt32LE = function(t, r) {
            return t >>>= 0,
            r || T(t, 4, this.length),
            this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }
        ,
        i.prototype.readInt32BE = function(t, r) {
            return t >>>= 0,
            r || T(t, 4, this.length),
            this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }
        ,
        i.prototype.readFloatLE = function(t, r) {
            return t >>>= 0,
            r || T(t, 4, this.length),
            d.read(this, t, !0, 23, 4)
        }
        ,
        i.prototype.readFloatBE = function(t, r) {
            return t >>>= 0,
            r || T(t, 4, this.length),
            d.read(this, t, !1, 23, 4)
        }
        ,
        i.prototype.readDoubleLE = function(t, r) {
            return t >>>= 0,
            r || T(t, 8, this.length),
            d.read(this, t, !0, 52, 8)
        }
        ,
        i.prototype.readDoubleBE = function(t, r) {
            return t >>>= 0,
            r || T(t, 8, this.length),
            d.read(this, t, !1, 52, 8)
        }
        ,
        i.prototype.writeUIntLE = function(t, r, e, n) {
            (t = +t,
            r >>>= 0,
            e >>>= 0,
            n) || _(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
            var i = 1
              , o = 0;
            for (this[r] = 255 & t; ++o < e && (i *= 256); )
                this[r + o] = t / i & 255;
            return r + e
        }
        ,
        i.prototype.writeUIntBE = function(t, r, e, n) {
            (t = +t,
            r >>>= 0,
            e >>>= 0,
            n) || _(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
            var i = e - 1
              , o = 1;
            for (this[r + i] = 255 & t; --i >= 0 && (o *= 256); )
                this[r + i] = t / o & 255;
            return r + e
        }
        ,
        i.prototype.writeUInt8 = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 1, 255, 0),
            this[r] = 255 & t,
            r + 1
        }
        ,
        i.prototype.writeUInt16LE = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 2, 65535, 0),
            this[r] = 255 & t,
            this[r + 1] = t >>> 8,
            r + 2
        }
        ,
        i.prototype.writeUInt16BE = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 2, 65535, 0),
            this[r] = t >>> 8,
            this[r + 1] = 255 & t,
            r + 2
        }
        ,
        i.prototype.writeUInt32LE = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 4, 4294967295, 0),
            this[r + 3] = t >>> 24,
            this[r + 2] = t >>> 16,
            this[r + 1] = t >>> 8,
            this[r] = 255 & t,
            r + 4
        }
        ,
        i.prototype.writeUInt32BE = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 4, 4294967295, 0),
            this[r] = t >>> 24,
            this[r + 1] = t >>> 16,
            this[r + 2] = t >>> 8,
            this[r + 3] = 255 & t,
            r + 4
        }
        ,
        i.prototype.writeIntLE = function(t, r, e, n) {
            if (t = +t,
            r >>>= 0,
            !n) {
                var i = Math.pow(2, 8 * e - 1);
                _(this, t, r, e, i - 1, -i)
            }
            var o = 0
              , f = 1
              , u = 0;
            for (this[r] = 255 & t; ++o < e && (f *= 256); )
                t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1),
                this[r + o] = (t / f >> 0) - u & 255;
            return r + e
        }
        ,
        i.prototype.writeIntBE = function(t, r, e, n) {
            if (t = +t,
            r >>>= 0,
            !n) {
                var i = Math.pow(2, 8 * e - 1);
                _(this, t, r, e, i - 1, -i)
            }
            var o = e - 1
              , f = 1
              , u = 0;
            for (this[r + o] = 255 & t; --o >= 0 && (f *= 256); )
                t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1),
                this[r + o] = (t / f >> 0) - u & 255;
            return r + e
        }
        ,
        i.prototype.writeInt8 = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 1, 127, -128),
            t < 0 && (t = 255 + t + 1),
            this[r] = 255 & t,
            r + 1
        }
        ,
        i.prototype.writeInt16LE = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 2, 32767, -32768),
            this[r] = 255 & t,
            this[r + 1] = t >>> 8,
            r + 2
        }
        ,
        i.prototype.writeInt16BE = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 2, 32767, -32768),
            this[r] = t >>> 8,
            this[r + 1] = 255 & t,
            r + 2
        }
        ,
        i.prototype.writeInt32LE = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 4, 2147483647, -2147483648),
            this[r] = 255 & t,
            this[r + 1] = t >>> 8,
            this[r + 2] = t >>> 16,
            this[r + 3] = t >>> 24,
            r + 4
        }
        ,
        i.prototype.writeInt32BE = function(t, r, e) {
            return t = +t,
            r >>>= 0,
            e || _(this, t, r, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            this[r] = t >>> 24,
            this[r + 1] = t >>> 16,
            this[r + 2] = t >>> 8,
            this[r + 3] = 255 & t,
            r + 4
        }
        ,
        i.prototype.writeFloatLE = function(t, r, e) {
            return x(this, t, r, !0, e)
        }
        ,
        i.prototype.writeFloatBE = function(t, r, e) {
            return x(this, t, r, !1, e)
        }
        ,
        i.prototype.writeDoubleLE = function(t, r, e) {
            return C(this, t, r, !0, e)
        }
        ,
        i.prototype.writeDoubleBE = function(t, r, e) {
            return C(this, t, r, !1, e)
        }
        ,
        i.prototype.copy = function(t, r, e, n) {
            if (!i.isBuffer(t))
                throw new TypeError("argument should be a Buffer");
            if (e || (e = 0),
            n || 0 === n || (n = this.length),
            r >= t.length && (r = t.length),
            r || (r = 0),
            n > 0 && n < e && (n = e),
            n === e)
                return 0;
            if (0 === t.length || 0 === this.length)
                return 0;
            if (r < 0)
                throw new RangeError("targetStart out of bounds");
            if (e < 0 || e >= this.length)
                throw new RangeError("Index out of range");
            if (n < 0)
                throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length),
            t.length - r < n - e && (n = t.length - r + e);
            var o = n - e;
            if (this === t && "function" == typeof Uint8Array.prototype.copyWithin)
                this.copyWithin(r, e, n);
            else if (this === t && e < r && r < n)
                for (var f = o - 1; f >= 0; --f)
                    t[f + r] = this[f + e];
            else
                Uint8Array.prototype.set.call(t, this.subarray(e, n), r);
            return o
        }
        ,
        i.prototype.fill = function(t, r, e, n) {
            if ("string" == typeof t) {
                if ("string" == typeof r ? (n = r,
                r = 0,
                e = this.length) : "string" == typeof e && (n = e,
                e = this.length),
                void 0 !== n && "string" != typeof n)
                    throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !i.isEncoding(n))
                    throw new TypeError("Unknown encoding: " + n);
                if (1 === t.length) {
                    var o = t.charCodeAt(0);
                    ("utf8" === n && o < 128 || "latin1" === n) && (t = o)
                }
            } else
                "number" == typeof t && (t &= 255);
            if (r < 0 || this.length < r || this.length < e)
                throw new RangeError("Out of range index");
            if (e <= r)
                return this;
            var f;
            if (r >>>= 0,
            e = void 0 === e ? this.length : e >>> 0,
            t || (t = 0),
            "number" == typeof t)
                for (f = r; f < e; ++f)
                    this[f] = t;
            else {
                var u = i.isBuffer(t) ? t : i.from(t, n)
                  , a = u.length;
                if (0 === a)
                    throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                for (f = 0; f < e - r; ++f)
                    this[f + r] = u[f % a]
            }
            return this
        }
        ;
        var R = /[^+\/0-9A-Za-z-_]/g;
        function O(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }
        function N(t, r) {
            var e;
            r = r || 1 / 0;
            for (var n = t.length, i = null, o = [], f = 0; f < n; ++f) {
                if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                    if (!i) {
                        if (e > 56319) {
                            (r -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (f + 1 === n) {
                            (r -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = e;
                        continue
                    }
                    if (e < 56320) {
                        (r -= 3) > -1 && o.push(239, 191, 189),
                        i = e;
                        continue
                    }
                    e = 65536 + (i - 55296 << 10 | e - 56320)
                } else
                    i && (r -= 3) > -1 && o.push(239, 191, 189);
                if (i = null,
                e < 128) {
                    if ((r -= 1) < 0)
                        break;
                    o.push(e)
                } else if (e < 2048) {
                    if ((r -= 2) < 0)
                        break;
                    o.push(e >> 6 | 192, 63 & e | 128)
                } else if (e < 65536) {
                    if ((r -= 3) < 0)
                        break;
                    o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
                } else {
                    if (!(e < 1114112))
                        throw new Error("Invalid code point");
                    if ((r -= 4) < 0)
                        break;
                    o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
                }
            }
            return o
        }
        function P(t) {
            return g.toByteArray(function(t) {
                if ((t = (t = t.split("=")[0]).trim().replace(R, "")).length < 2)
                    return "";
                for (; t.length % 4 != 0; )
                    t += "=";
                return t
            }(t))
        }
        function z(t, r, e, n) {
            for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i)
                r[i + e] = t[i];
            return i
        }
        function j(t, r) {
            return t instanceof r || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name
        }
        function F(t) {
            return t != t
        }
    }(y = {
        exports: {}
    }, y.exports),
    y.exports);
    w.Buffer,
    w.SlowBuffer,
    w.INSPECT_MAX_BYTES,
    w.kMaxLength;
    const b = w.Buffer;
    var v = {
        initialize: (t,n)=>{
            if ("number" != typeof t || !0 === Number.isNaN(t))
                throw Error('@initialize : expecting "tempBufferLength" to be a number.');
            if (t < 1)
                throw Error('@initialize : expecting "tempBufferLength" to be greater than zero.');
            if (void 0 !== n) {
                if ("function" != typeof n)
                    throw Error('@initialize : expecting "logFunction" to be a function.');
                n(`@initialize : setting buffer limit to ${((t,n)=>{
                    if (!Number.isFinite(t))
                        throw new TypeError(`Expected a finite number, got ${typeof t}: ${t}`);
                    if ((n = Object.assign({}, n)).signed && 0 === t)
                        return " 0 B";
                    const i = t < 0
                      , o = i ? "-" : n.signed ? "+" : "";
                    if (i && (t = -t),
                    t < 1)
                        return o + e(t, n.locale) + " B";
                    const f = Math.min(Math.floor(Math.log10(t) / 3), r.length - 1);
                    return t = Number((t / Math.pow(1e3, f)).toPrecision(3)),
                    o + e(t, n.locale) + " " + r[f]
                }
                )(t)}`)
            }
            const i = {};
            let o = !1
              , f = -33;
            const u = b.allocUnsafe(t).fill(0);
            let a = -1;
            const s = t=>{
                let r = 0;
                switch (typeof t) {
                case "string":
                    if ((r = b.byteLength(t)) < 32) {
                        r = 0;
                        for (let e = 0, n = 0, i = t.length; e < i; e += 1)
                            (n = t.charCodeAt(e)) < 128 ? r += 1 : n < 1280 ? r += 2 : n < 55296 || n >= 57344 ? r += 3 : (e += 1,
                            r += 4);
                        u[a += 1] = 160 | r;
                        for (let r = 0, e = 0, n = t.length; r < n; r += 1)
                            (e = t.charCodeAt(r)) < 128 ? u[a += 1] = e : e < 1280 ? (u[a += 1] = 192 | e >> 6,
                            u[a += 1] = 128 | 63 & e) : e < 55296 || e >= 57344 ? (u[a += 1] = 224 | e >> 12,
                            u[a += 1] = 128 | e >> 6 & 63,
                            u[a += 1] = 128 | 63 & e) : (r += 1,
                            e = 65536 + ((1023 & e) << 10 | 1023 & t.charCodeAt(r)),
                            u[a += 1] = 240 | e >> 18,
                            u[a += 1] = 128 | e >> 12 & 63,
                            u[a += 1] = 128 | e >> 6 & 63,
                            u[a += 1] = 128 | 63 & e)
                    } else if (r < 256)
                        u[a += 1] = 217,
                        u[a += 1] = r,
                        u.write(t, a += 1, r, "utf8"),
                        a += r - 1;
                    else if (r < 65536)
                        u[a += 1] = 218,
                        u[a += 1] = r >> 8,
                        u[a += 1] = r,
                        u.write(t, a += 1, r, "utf8"),
                        a += r - 1;
                    else {
                        if (!(r < 4294967296))
                            throw Error("@internalEncode : Max supported string length (4294967296) exceeded, encoding failure.");
                        u[a += 1] = 219,
                        u[a += 1] = r >> 24,
                        u[a += 1] = r >> 16,
                        u[a += 1] = r >> 8,
                        u[a += 1] = r,
                        u.write(t, a += 1, r, "utf8"),
                        a += r - 1
                    }
                    break;
                case "number":
                    if (!1 === Number.isFinite(t)) {
                        if (!0 === Number.isNaN(t)) {
                            u[a += 1] = 212,
                            u[a += 1] = 0,
                            u[a += 1] = 1;
                            break
                        }
                        if (t === 1 / 0) {
                            u[a += 1] = 212,
                            u[a += 1] = 0,
                            u[a += 1] = 2;
                            break
                        }
                        if (t === -1 / 0) {
                            u[a += 1] = 212,
                            u[a += 1] = 0,
                            u[a += 1] = 3;
                            break
                        }
                    }
                    if (Math.floor(t) !== t) {
                        if (Math.fround(t) === t) {
                            u[a += 1] = 202,
                            u.writeFloatBE(t, a += 1),
                            a += 3;
                            break
                        }
                        u[a += 1] = 203,
                        u.writeDoubleBE(t, a += 1),
                        a += 7;
                        break
                    }
                    if (t >= 0) {
                        if (t < 128) {
                            u[a += 1] = t;
                            break
                        }
                        if (t < 256) {
                            u[a += 1] = 204,
                            u[a += 1] = t;
                            break
                        }
                        if (t < 65536) {
                            u[a += 1] = 205,
                            u[a += 1] = t >> 8,
                            u[a += 1] = t;
                            break
                        }
                        if (t < 4294967296) {
                            u[a += 1] = 206,
                            u[a += 1] = t >> 24,
                            u[a += 1] = t >> 16,
                            u[a += 1] = t >> 8,
                            u[a += 1] = t;
                            break
                        }
                        let r = t / Math.pow(2, 32) >> 0
                          , e = t >>> 0;
                        u[a += 1] = 207,
                        u[a += 1] = r >> 24,
                        u[a += 1] = r >> 16,
                        u[a += 1] = r >> 8,
                        u[a += 1] = r,
                        u[a += 1] = e >> 24,
                        u[a += 1] = e >> 16,
                        u[a += 1] = e >> 8,
                        u[a += 1] = e
                    } else {
                        if (t >= -32) {
                            u[a += 1] = t;
                            break
                        }
                        if (t >= -128) {
                            u[a += 1] = 208,
                            u[a += 1] = t;
                            break
                        }
                        if (t >= -12800) {
                            u[a += 1] = 209,
                            u[a += 1] = t >> 8,
                            u[a += 1] = t;
                            break
                        }
                        if (t >= -128e6) {
                            u[a += 1] = 210,
                            u[a += 1] = t >> 24,
                            u[a += 1] = t >> 16,
                            u[a += 1] = t >> 8,
                            u[a += 1] = t;
                            break
                        }
                        let r = Math.floor(t / Math.pow(2, 32))
                          , e = t >>> 0;
                        u[a += 1] = 211,
                        u[a += 1] = r >> 24,
                        u[a += 1] = r >> 16,
                        u[a += 1] = r >> 8,
                        u[a += 1] = r,
                        u[a += 1] = e >> 24,
                        u[a += 1] = e >> 16,
                        u[a += 1] = e >> 8,
                        u[a += 1] = e
                    }
                    break;
                case "object":
                    if (null === t) {
                        u[a += 1] = 192;
                        break
                    }
                    if (!0 === Array.isArray(t)) {
                        if ((r = t.length) < 16)
                            u[a += 1] = 144 | r;
                        else if (r < 65536)
                            u[a += 1] = 220,
                            u[a += 1] = r >> 8,
                            u[a += 1] = r;
                        else {
                            if (!(r < 4294967296))
                                throw new Error("@internalEncode : Array too large");
                            u[a += 1] = 221,
                            u[a += 1] = r >> 24,
                            u[a += 1] = r >> 16,
                            u[a += 1] = r >> 8,
                            u[a += 1] = r
                        }
                        for (let e = 0; e < r; e += 1)
                            s(t[e]);
                        break
                    }
                    if (t instanceof ArrayBuffer && (t = b.from(t)),
                    t instanceof b == 0 && (t instanceof Int8Array || t instanceof Int16Array || t instanceof Int32Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Uint16Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array)) {
                        let r = b.from(t.buffer);
                        t.byteLength !== t.buffer.byteLength && (r = r.slice(t.byteOffset, t.byteOffset + t.byteLength)),
                        t = r
                    }
                    if (t instanceof b) {
                        if ((r = t.length) < 256)
                            if (u[a += 1] = 196,
                            u[a += 1] = r,
                            r > 32)
                                t.copy(u, a += 1, 0, r),
                                a += r - 1;
                            else
                                for (let e = 0; e < r; e++)
                                    u[a += 1] = t[e];
                        else if (r < 65536)
                            u[a += 1] = 197,
                            u[a += 1] = r >> 8,
                            u[a += 1] = r,
                            t.copy(u, a += 1, 0, r),
                            a += r - 1;
                        else {
                            if (!(r < 4294967296))
                                throw Error("@internalEncode : Max supported buffer length (4294967296) exceeded, encoding failure.");
                            u[a += 1] = 198,
                            u[a += 1] = r >> 24,
                            u[a += 1] = r >> 16,
                            u[a += 1] = r >> 8,
                            u[a += 1] = r,
                            t.copy(u, a += 1, 0, r),
                            a += r - 1
                        }
                        break
                    }
                    {
                        let e = Object.keys(t);
                        if ((r = e.length) < 16)
                            u[a += 1] = 128 | r;
                        else if (r < 65536)
                            u[a += 1] = 222,
                            u[a += 1] = r >> 8,
                            u[a += 1] = r;
                        else {
                            if (!(r < 4294967296))
                                throw new Error("@internalEncode : Object too large");
                            u[a += 1] = 223,
                            u[a += 1] = r >> 24,
                            u[a += 1] = r >> 16,
                            u[a += 1] = r >> 8,
                            u[a += 1] = r
                        }
                        if (!0 === o)
                            for (let n = 0; n < r; n += 1)
                                s(i[e[n]] || e[n]),
                                s(t[e[n]]);
                        else
                            for (let n = 0; n < r; n += 1)
                                s(e[n]),
                                s(t[e[n]])
                    }
                    break;
                default:
                    switch (t) {
                    case !0:
                        u[a += 1] = 195;
                        break;
                    case !1:
                        u[a += 1] = 194;
                        break;
                    case void 0:
                        u[a += 1] = 212,
                        u[a += 1] = 0,
                        u[a += 1] = 0;
                        break;
                    default:
                        throw Error("@internalEncode : Error encoding value.")
                    }
                }
            }
            ;
            let h = void 0
              , c = 0;
            const l = ()=>{
                let t, r;
                if (h[c] < 192) {
                    if (h[c] < 128)
                        return t = h[c],
                        c += 1,
                        t;
                    if (h[c] < 144) {
                        if (r = 31 & h[c],
                        t = {},
                        c += 1,
                        !0 === o)
                            for (let e, n = 0; n < r; n++)
                                e = l(),
                                t[i[e] || e] = l();
                        else
                            for (let e = 0; e < r; e++)
                                t[l()] = l();
                        return t
                    }
                    if (h[c] < 160) {
                        r = 15 & h[c],
                        c += 1,
                        t = new Array(r);
                        for (let e = 0; e < r; e += 1)
                            t[e] = l();
                        return t
                    }
                    return r = 31 & h[c],
                    c += 1,
                    t = h.toString("utf8", c, c + r),
                    c += r,
                    t
                }
                if (h[c] > 223)
                    return t = -1 * (255 - h[c] + 1),
                    c += 1,
                    t;
                switch (h[c]) {
                case 202:
                    return t = h.readFloatBE(c += 1),
                    c += 4,
                    t;
                case 203:
                    return t = h.readDoubleBE(c += 1),
                    c += 8,
                    t;
                case 204:
                    return t = h.readUInt8(c += 1),
                    c += 1,
                    t;
                case 205:
                    return t = h.readUInt16BE(c += 1),
                    c += 2,
                    t;
                case 206:
                    return t = h.readUInt32BE(c += 1),
                    c += 4,
                    t;
                case 207:
                    return t = h.readUInt32BE(c += 1) * Math.pow(2, 32) + h.readUInt32BE(c += 4),
                    c += 4,
                    t;
                case 208:
                    return t = h.readInt8(c += 1),
                    c += 1,
                    t;
                case 209:
                    return t = h.readInt16BE(c += 1),
                    c += 2,
                    t;
                case 210:
                    return t = h.readInt32BE(c += 1),
                    c += 4,
                    t;
                case 211:
                    return t = h.readInt32BE(c += 1) * Math.pow(2, 32) + h.readUInt32BE(c += 4),
                    c += 4,
                    t;
                case 217:
                    return r = h.readUInt8(c += 1),
                    c += 1,
                    t = h.toString("utf8", c, c + r),
                    c += r,
                    t;
                case 218:
                    return r = h.readUInt16BE(c += 1),
                    c += 2,
                    t = h.toString("utf8", c, c + r),
                    c += r,
                    t;
                case 219:
                    return r = h.readUInt32BE(c += 1),
                    c += 4,
                    t = h.toString("utf8", c, c + r),
                    c += r,
                    t;
                case 212:
                    switch (h.readInt8(c += 1)) {
                    case 0:
                        switch (h.readInt8(c += 1)) {
                        case 0:
                            return c += 1,
                            t = void 0;
                        case 1:
                            return c += 1,
                            t = NaN;
                        case 2:
                            return c += 1,
                            t = 1 / 0;
                        case 3:
                            return c += 1,
                            t = -1 / 0
                        }
                    }
                    break;
                case 192:
                    return c += 1,
                    t = null;
                case 194:
                    return c += 1,
                    t = !1;
                case 195:
                    return c += 1,
                    t = !0;
                case 220:
                    r = h.readUInt16BE(c += 1),
                    c += 2,
                    t = new Array(r);
                    for (let e = 0; e < r; e += 1)
                        t[e] = l();
                    return t;
                case 221:
                    r = h.readUInt32BE(c += 1),
                    c += 4,
                    t = new Array(r);
                    for (let e = 0; e < r; e += 1)
                        t[e] = l();
                    return t;
                case 222:
                    if (r = h.readUInt16BE(c += 1),
                    t = {},
                    c += 2,
                    !0 === o)
                        for (let e, n = 0; n < r; n++)
                            e = l(),
                            t[i[e] || e] = l();
                    else
                        for (let e = 0; e < r; e++)
                            t[l()] = l();
                    return t;
                case 223:
                    if (r = h.readUInt32BE(c += 1),
                    t = {},
                    c += 4,
                    !0 === o)
                        for (let e, n = 0; n < r; n++)
                            e = l(),
                            t[i[e] || e] = l();
                    else
                        for (let e = 0; e < r; e++)
                            t[l()] = l();
                    return t;
                case 196:
                    return r = h.readUInt8(c += 1),
                    c += 1,
                    t = h.slice(c, c + r),
                    c += r,
                    t;
                case 197:
                    return r = h.readUInt16BE(c += 1),
                    c += 2,
                    t = h.slice(c, c + r),
                    c += r,
                    t;
                case 198:
                    return r = h.readUInt32BE(c += 1),
                    c += 4,
                    t = h.slice(c, c + r),
                    c += r,
                    t
                }
                throw Error("@internalDecode : Error decoding value.")
            }
            ;
            return {
                encode: t=>{
                    a = -1,
                    s(t);
                    const r = b.allocUnsafe(a + 1).fill(0);
                    return u.copy(r, 0, 0, a + 1),
                    r
                }
                ,
                decode: t=>{
                    h = t,
                    c = 0;
                    const r = l();
                    return h = void 0,
                    r
                }
                ,
                register: (...t)=>{
                    !1 === o && (o = !0);
                    for (let r = 0, e = t.length; r < e; r += 1)
                        i[f += 1] = t[r],
                        i[t[r]] = f
                }
            }
        }
        ,
        Buffer: b
    }
      , E = v.initialize
      , m = v.Buffer;
    t.default = v,
    t.initialize = E,
    t.Buffer = m,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=MessagePack.min.js.map

var DEBUG = !1
  , Utils = {
    prefix: "miniroyale2",
    zeroVector: new pc.Vec3(0,0,0),
    heightVector: new pc.Vec3(0,-5,0),
    nullVector: new pc.Vec3(0,-100,0),
    whiteColor: new pc.Color(1,1,1),
    parseFloat: function(e) {
        return 10 * parseFloat(parseFloat(e).toFixed(1))
    },
    encodeFloat: function(e) {
        return 10 * parseFloat(parseFloat(e).toFixed(1))
    },
    decodeFloat: function(e) {
        return e / 10
    },
    lookAt: function(e, t, r, n) {
        return Math.atan2(r - e, n - t)
    },
    distance: function(e, t, r, n) {
        return Math.sqrt(Math.pow(e - r, 2) + Math.pow(t - n, 2))
    },
    toDeg: function(e) {
        return e * (180 / Math.PI)
    },
    toRad: function(e) {
        return e * (Math.PI / 180)
    },
    lerp: function(e, t, r) {
        var n = (1 - r) * e + r * t;
        return isNaN(n) ? 0 : Math.abs(n - e) > 50 ? t : n
    },
    rotate: function(e, t, r) {
        return e + this.shortAngleDist(e, t) * r
    },
    shortcutName: function(e) {
        return e ? e.replace("-Grenade", "") : ""
    },
    clearName: function(e) {
        return e ? e.replace("_", ".").replace("Ammo-", "") : ""
    },
    clearId: function(e) {
        return e ? e.replace("Ammo-", "") : ""
    },
    shortAngleDist: function(e, t) {
        var r = 2 * Math.PI
          , n = (t - e) % r;
        return 2 * n % r - n
    },
    float: function(e) {
        return isNaN(e) ? 0 : e.toFixed(3)
    },
    pad: function(e, t) {
        return ("000" + e).slice(-3)
    },
    timeCountBack: function(e) {
        var t = new Date(e)
          , r = new Date
          , n = Math.floor((t - r) / 1e3)
          , o = Math.floor(n / 60)
          , a = Math.floor(o / 60)
          , i = Math.floor(a / 24);
        return (a -= 24 * i) + " hours, " + (o = o - 24 * i * 60 - 60 * a) + " minutes, " + (n = n - 24 * i * 60 * 60 - 60 * a * 60 - 60 * o) + " seconds"
    },
    mmssmm: function(e) {
        var t = e
          , r = Math.floor(1e3 * t % 1e3)
          , n = Math.floor(t % 60)
          , o = Math.floor(1e3 * t / 6e4 % 60)
          , a = "MM:SS:XX";
        return n < 10 && (n = "0" + n),
        o < 10 && (o = "0" + o),
        r < 100 && (r = "0" + r),
        a = (a = (a = a.replace(/MM/, o)).replace(/SS/, n)).replace(/XX/, r.toString().slice(0, 2))
    },
    mmss: function(e) {
        var t = e
          , r = Math.floor(1e3 * t % 1e3)
          , n = Math.floor(t % 60)
          , o = Math.floor(1e3 * t / 6e4 % 60)
          , a = "MM:SS";
        return n < 10 && (n = "0" + n),
        o < 10 && (o = "0" + o),
        r < 100 && (r = "0" + r),
        a = (a = a.replace(/MM/, o)).replace(/SS/, n)
    },
    createCookie: function(e, t, r) {
        if (r) {
            var n = new Date;
            n.setTime(n.getTime() + 24 * r * 60 * 60 * 1e3);
            var o = "; expires=" + n.toGMTString()
        } else
            o = "";
        document.cookie = e + "=" + t + o + "; path=/"
    },
    readCookie: function(e) {
        for (var t = e + "=", r = document.cookie.split(";"), n = 0; n < r.length; n++) {
            for (var o = r[n]; " " == o.charAt(0); )
                o = o.substring(1, o.length);
            if (0 == o.indexOf(t))
                return o.substring(t.length, o.length)
        }
        return null
    },
    shuffle: function(e) {
        var t, r, n;
        for (n = e.length - 1; n > 0; n--)
            t = Math.floor(Math.random() * (n + 1)),
            r = e[n],
            e[n] = e[t],
            e[t] = r;
        return e
    },
    isMobile: function() {
        return !!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    },
    number: function(e, t) {
        return e ? parseInt(e) : t
    },
    getURLParams: function(e, t) {
        t || (t = location.href),
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var r = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(t);
        return null == r ? null : r[1]
    }
};
var Attachment = pc.createScript("attachment");
Attachment.attributes.add("hand", {
    type: "entity"
}),
Attachment.attributes.add("arms", {
    type: "entity"
}),
Attachment.attributes.add("leftHandEntity", {
    type: "entity"
}),
Attachment.attributes.add("muzzleEntity", {
    type: "entity"
}),
Attachment.attributes.add("muzzleSpark", {
    type: "entity"
}),
Attachment.attributes.add("muzzleSmoke", {
    type: "entity"
}),
Attachment.attributes.add("bulletEntities", {
    type: "entity",
    array: !0
}),
Attachment.attributes.add("weaponsEntity", {
    type: "entity"
}),
Attachment.attributes.add("dropPoint", {
    type: "entity"
}),
Attachment.attributes.add("garbage", {
    type: "entity"
}),
Attachment.attributes.add("batchBullets", {
    type: "entity",
    array: !0
}),
Attachment.attributes.add("inventoryEntity", {
    type: "entity"
}),
Attachment.prototype.initialize = function() {
    this.rightHand = this.arms.findByName("mag"),
    this.leftHand = this.arms.findByName("hand_L"),
    this.lastSmokeTime = Date.now(),
    this.mount = this.arms.findByName("weapon"),
    this.hand.reparent(this.mount),
    this.leftHandEntity.reparent(this.leftHand),
    this.hasSight = !1,
    this.weaponType = "Unknown",
    this.currentWeapon = null,
    this.rootNode = !1,
    this.partMap = {},
    this.currentSparkScale = 0,
    this.currentSparkAngle = 0,
    this.bullets = [],
    this.attachments = {},
    this.inventory = this.inventoryEntity.script.inventory,
    this.renderFire = 0,
    this.timestamp = 0,
    this.bulletIndex = 0,
    this.bulletTypes = {},
    this.bulletTypes["Ammo-9mm"] = this.bulletEntities[0],
    this.bulletTypes["Ammo-45ACP"] = this.bulletEntities[1],
    this.bulletTypes["Ammo-12_Gauge"] = this.bulletEntities[2],
    this.bulletTypes["Ammo-5_56mm"] = this.bulletEntities[3],
    this.bulletTypes["Ammo-7_62mm"] = this.bulletEntities[4],
    this.character = this.entity.script.movement
}
,
Attachment.prototype.setHandTemporary = function() {
    this.mount = this.arms.findByName("hand_R"),
    this.hand.reparent(this.mount),
    this.hand.enabled = !1
}
,
Attachment.prototype.setHandHold = function() {
    this.mount = this.arms.findByName("weapon"),
    this.hand.reparent(this.mount),
    this.hand.enabled = !0
}
,
Attachment.prototype.getWeaponDetails = function() {
    return this.currentWeapon
}
,
Attachment.prototype.setWeapon = function(t) {
    var e = this.weaponsEntity.findByName(t).script.weapon;
    this.currentWeapon = e,
    this.entity.findByTag("weapon").map(function(t) {
        t.enabled = !1
    }),
    this.currentWeaponEntity = this.entity.findByName(t),
    this.currentWeaponEntity.enabled = !0,
    "Grenade" != this.currentWeapon.type && (this.currentWeaponModel = this.currentWeaponEntity.findByName("Model"),
    this.muzzlePoint = this.currentWeaponEntity.findByName("MuzzlePoint"),
    this.bulletPoint = this.currentWeaponEntity.findByName("BulletPoint"),
    this.attachments["RedDot-Sight"] = this.currentWeaponEntity.findByName("RedDot-Sight"),
    this.attachments["Holographic-Sight"] = this.currentWeaponEntity.findByName("Holographic-Sight"),
    this.muzzleEntity.reparent(this.muzzlePoint),
    this.muzzleSmoke.reparent(this.muzzlePoint),
    this.setParts(),
    this.setBatchBullets())
}
,
Attachment.prototype.getMuzzlePoint = function() {
    return this.muzzleEntity.getPosition().clone()
}
,
Attachment.prototype.attachMagazine = function() {
    this.magazineEntity.originalPosition = this.magazineEntity.getLocalPosition().clone(),
    this.magazineEntity.originalAngles = this.magazineEntity.getLocalEulerAngles().clone(),
    this.magazineEntity.originalParent = this.magazineEntity.parent,
    this.magazineEntity.setLocalEulerAngles(0, 0, 0),
    this.magazineEntity.setLocalPosition(0, 0, 0),
    this.magazineEntity.reparent(this.rightHand)
}
,
Attachment.prototype.reattachMagazine = function() {
    this.magazineEntity && this.magazineEntity.originalPosition && this.magazineEntity.originalAngles && (this.magazineEntity.setLocalPosition(this.magazineEntity.originalPosition),
    this.magazineEntity.setLocalEulerAngles(this.magazineEntity.originalAngles),
    this.magazineEntity.reparent(this.magazineEntity.originalParent))
}
,
Attachment.prototype.setParts = function() {
    var t = this.currentWeaponModel.findByName("RootNode");
    if (!t)
        return setTimeout(function(t) {
            t.setParts()
        }, 100, this),
        !1;
    this.rootNode = t.children[0];
    var e = this;
    this.currentWeaponModel && this.currentWeaponModel.findByName("RootNode") && this.currentWeaponModel.findByName("RootNode").children.length > 0 && this.currentWeaponModel.findByName("RootNode").children[0].children.length > 0 && this.currentWeaponModel.findByName("RootNode").children[0].children.map(function(t) {
        t.name.search("_mag") > -1 && (e.magazineEntity = t)
    }),
    this.currentWeapon.allowGrip && this.setPart("grip", !1),
    this.currentWeapon.allowStock && this.setPart("stock", !0),
    this.currentWeapon.bigScope && this.setPart("bipod", !1),
    this.currentWeapon.allowSliderAnimation && (this.setPart("slider", !0),
    this.partMap.slider.startPosition = this.partMap.slider.getLocalPosition().clone(),
    this.partMap.slider.currentPosition = this.partMap.slider.getLocalPosition().clone()),
    this.currentWeapon.allowSight && this.inventory.hasItemType("Sight") ? (this.setPart("sight", !1),
    this.hasSight = !0,
    this.inventory.hasItem("RedDot-Sight") && (this.setAttachment("Holographic-Sight", !1),
    this.setAttachment("RedDot-Sight", !0)),
    this.inventory.hasItem("Holographic-Sight") && (this.setAttachment("RedDot-Sight", !1),
    this.setAttachment("Holographic-Sight", !0))) : (this.hasSight = !1,
    this.setPart("sight", !0),
    this.setAttachment("RedDot-Sight", !1),
    this.setAttachment("Holographic-Sight", !1))
}
,
Attachment.prototype.setAttachment = function(t, e) {
    this.attachments[t] && (this.attachments[t].enabled = e)
}
,
Attachment.prototype.setBatchBullets = function() {
    for (var t = this.batchBullets.length, e = this.bulletTypes[this.currentWeapon.ammoType].findByName("Bullet"); t--; )
        this.batchBullets[t] && (this.batchBullets[t].model.asset = e.model.asset)
}
,
Attachment.prototype.setPart = function(t, e) {
    var i = this.rootNode.children
      , n = !1;
    for (var a in i) {
        var s = i[a];
        s.name.search(t) > -1 && (e ? s.setLocalScale(1, 1, 1) : s.setLocalScale(.001, .001, .001),
        this.partMap[t] = s,
        n = !0)
    }
    return n
}
,
Attachment.prototype.cleanParts = function() {
    return this.muzzleEntity.getPosition().clone()
}
,
Attachment.prototype.setSlider = function() {
    this.partMap.slider && this.character.currentWeaponDetails.currentAmmo <= 0 && (this.partMap.slider.currentPosition.z = -.05)
}
,
Attachment.prototype.setMuzzle = function() {
    this.currentSparkScale = .001 + .003 * Math.random(),
    this.currentSparkAngle = 180 * Math.random(),
    Date.now() - this.lastSmokeTime > 1500 && (this.muzzleSmoke.particlesystem.reset(),
    this.lastSmokeTime = Date.now()),
    this.muzzleSmoke.particlesystem.play(),
    this.muzzleSpark.element.opacity = 1,
    this.renderFire = .05;
    var t = this.bulletPoint.getRotation().clone()
      , e = this.batchBullets[this.bulletIndex];
    e.timestamp = 0,
    e.direction = .06 * Math.random(),
    e.setPosition(this.bulletPoint.getPosition().clone()),
    e.setRotation(t),
    this.bulletIndex++,
    this.bulletIndex > this.batchBullets.length - 1 && (this.bulletIndex = 0),
    this.partMap.slider && (this.partMap.slider.currentPosition.z -= .05)
}
,
Attachment.prototype.updateBullets = function() {
    for (var t = this.batchBullets.length; t--; )
        this.batchBullets[t].rotateLocal(7, 0, 0),
        this.batchBullets[t].translateLocal(-.045, this.batchBullets[t].direction, -.022),
        this.batchBullets[t].timestamp++,
        this.batchBullets[t].timestamp > 20 && this.batchBullets[t].setPosition(0, 0, 0)
}
,
Attachment.prototype.update = function(t) {
    this.renderFire < 0 && (this.muzzleSpark.element.opacity = 0),
    this.currentSparkScale = pc.math.lerp(this.currentSparkScale, 0, .1),
    this.currentSparkAngle = pc.math.lerp(this.currentSparkAngle, 0, .1),
    this.muzzleSpark.setLocalScale(this.currentSparkScale, this.currentSparkScale, this.currentSparkScale),
    this.muzzleSpark.setLocalEulerAngles(180, 0, -180 + this.currentSparkAngle),
    this.updateBullets(),
    this.partMap.slider && (this.partMap.slider.currentPosition.z = pc.math.lerp(this.partMap.slider.currentPosition.z, this.partMap.slider.startPosition.z, .1),
    this.partMap.slider.setLocalPosition(this.partMap.slider.currentPosition)),
    this.renderFire -= t,
    this.timestamp++
}
;
var Movement = pc.createScript("movement");
Movement.attributes.add("active", {
    type: "boolean"
}),
Movement.attributes.add("hash", {
    type: "number"
}),
Movement.attributes.add("sensitivity", {
    type: "number"
}),
Movement.attributes.add("power", {
    type: "number"
}),
Movement.attributes.add("maxJumpTime", {
    type: "number"
}),
Movement.attributes.add("defaultPitchHeight", {
    type: "number",
    default: .681
}),
Movement.attributes.add("jumpHeightFactor", {
    type: "number"
}),
Movement.attributes.add("jumpPeakHeight", {
    type: "number"
}),
Movement.attributes.add("jumpPower", {
    type: "number"
}),
Movement.attributes.add("gravity", {
    type: "number"
}),
Movement.attributes.add("jumpingForce", {
    type: "number"
}),
Movement.attributes.add("jumpTweenFactor", {
    type: "number"
}),
Movement.attributes.add("maxLandingBounce", {
    type: "number"
}),
Movement.attributes.add("animationSpeed", {
    type: "number"
}),
Movement.attributes.add("blendTime", {
    type: "number"
}),
Movement.attributes.add("pitchSpeed", {
    type: "number"
}),
Movement.attributes.add("focusSpeed", {
    type: "number"
}),
Movement.attributes.add("focusFov", {
    type: "number"
}),
Movement.attributes.add("ADSBlur", {
    type: "entity"
}),
Movement.attributes.add("vibrationThreshold", {
    type: "number"
}),
Movement.attributes.add("pivotSpeed", {
    type: "number"
}),
Movement.attributes.add("takePointEntity", {
    type: "entity"
}),
Movement.attributes.add("lookPointEntity", {
    type: "entity"
}),
Movement.attributes.add("armsEntity", {
    type: "entity"
}),
Movement.attributes.add("characterEntity", {
    type: "entity"
}),
Movement.attributes.add("characterAttachmentHolder", {
    type: "entity"
}),
Movement.attributes.add("characterAttachmentModel", {
    type: "entity"
}),
Movement.attributes.add("cinematicCamera", {
    type: "entity"
}),
Movement.attributes.add("resetPosition", {
    type: "vec3"
}),
Movement.attributes.add("cameraEntity", {
    type: "entity"
}),
Movement.attributes.add("deathCameraHolder", {
    type: "entity"
}),
Movement.attributes.add("deathCameraEntity", {
    type: "entity"
}),
Movement.attributes.add("cameraHolder", {
    type: "entity"
}),
Movement.attributes.add("handPivotEntity", {
    type: "entity"
}),
Movement.attributes.add("yawEntity", {
    type: "entity"
}),
Movement.attributes.add("headPositionEntity", {
    type: "entity"
}),
Movement.attributes.add("pitchEntity", {
    type: "entity"
}),
Movement.attributes.add("pivotEntity", {
    type: "entity"
}),
Movement.attributes.add("bodyEntity", {
    type: "entity"
}),
Movement.attributes.add("compassEntity", {
    type: "entity"
}),
Movement.attributes.add("lookEntity", {
    type: "entity"
}),
Movement.attributes.add("crosshairElement", {
    type: "entity"
}),
Movement.attributes.add("crosshairSize", {
    type: "number"
}),
Movement.attributes.add("scopeElement", {
    type: "entity"
}),
Movement.attributes.add("hitmarkerElement", {
    type: "entity"
}),
Movement.attributes.add("interfaceEntity", {
    type: "entity"
}),
Movement.attributes.add("inventoryEntity", {
    type: "entity"
}),
Movement.attributes.add("vehicleCamera", {
    type: "entity"
}),
Movement.attributes.add("bounceSpeed", {
    type: "number"
}),
Movement.attributes.add("recoilSpeed", {
    type: "number"
}),
Movement.attributes.add("focusHeight", {
    type: "number"
}),
Movement.attributes.add("defaultHeight", {
    type: "number"
}),
Movement.attributes.add("throwPower", {
    type: "number"
}),
Movement.attributes.add("maxThrowingTime", {
    type: "number"
}),
Movement.attributes.add("throwingFactor", {
    type: "number"
}),
Movement.attributes.add("throwAnimationTime", {
    type: "number"
}),
Movement.attributes.add("scopeFocusSpeed", {
    type: "number"
}),
Movement.attributes.add("startWeaponEntity", {
    type: "entity"
}),
Movement.attributes.add("startAmmoEntity", {
    type: "entity"
}),
Movement.attributes.add("dynamicWorld", {
    type: "entity"
}),
Movement.attributes.add("environmentManager", {
    type: "entity"
}),
Movement.attributes.add("outlineShaderEntity", {
    type: "entity"
}),
Movement.attributes.add("networkEntity", {
    type: "entity"
}),
Movement.attributes.add("itemSpawnEntity", {
    type: "entity"
}),
Movement.attributes.add("attachmentsEntity", {
    type: "entity"
}),
Movement.attributes.add("leftHandWeapons", {
    type: "entity"
}),
Movement.attributes.add("tabletEntity", {
    type: "entity"
}),
Movement.attributes.add("miniMapEntity", {
    type: "entity"
}),
Movement.attributes.add("needleEntity", {
    type: "entity"
}),
Movement.attributes.add("ambientColor", {
    type: "rgb"
}),
Movement.attributes.add("damageAmbientColor", {
    type: "rgb"
}),
Movement.attributes.add("scopeEntity", {
    type: "entity"
}),
Movement.attributes.add("scopeBlurEntity", {
    type: "entity"
}),
Movement.attributes.add("scopeDefaultEntity", {
    type: "entity"
}),
Movement.attributes.add("chatEntity", {
    type: "entity"
}),
Movement.attributes.add("testNumber", {
    type: "number"
}),
Movement.prototype.initialize = function() {
    this.force = new pc.Vec3,
    this.eulers = new pc.Vec3,
    this.nextEulers = new pc.Vec3,
    this.originalHandPivotPosition = this.handPivotEntity.getLocalPosition().clone(),
    this.isForceStop = !1,
    this.allForce = new pc.Vec3(0,0,0),
    this.currentVelocity = new pc.Vec3(0,0,0),
    this.currentHeadPosition = this.headPositionEntity.getLocalPosition().clone(),
    this.currentHeadStartPosition = this.headPositionEntity.getLocalPosition().clone(),
    this.currentHeadRotation = new pc.Vec3(0,0,0),
    this.defaultExposure = 10,
    this.currentExposure = 10,
    this.nextExposure = this.currentExposure,
    this.animationCurrentTime = 0,
    this.animationDuration = 0,
    this.isJumpStarted = 0,
    this.nextJumpValue = 1,
    this.senseX = 0,
    this.senseY = 0,
    this.quickForceX = 0,
    this.quickForceY = 0,
    this.shootingTime = 0,
    this.previousHeight = 0,
    this.currentCrossSize = 0,
    this.isNetworkShooting = !1,
    this.closerDistance = 1e3,
    this.lastReloadingWeapon = {},
    this.rescueModeDisabled = !1,
    this.runVibration = 0,
    this.gameFinished = !1,
    this.onParachute = !0,
    this.isSwapActive = !1,
    this.nextForceX = 0,
    this.nextForceY = 0,
    this.isTakeAnimation = !1,
    this.bodyStartPosition = this.bodyEntity.getLocalPosition().clone(),
    this.bodyStartRotation = this.bodyEntity.getLocalEulerAngles().clone(),
    this.currentBodyPosition = this.bodyStartPosition.clone(),
    this.currentBodyRotation = this.bodyStartRotation.clone(),
    this.nextBodyPosition = new pc.Vec3(0,0,0),
    this.nextBodyRotation = new pc.Vec3(0,0,0),
    this.nextDeathCameraPosition = new pc.Vec3(0,0,0),
    this.nextDeathCameraAngles = new pc.Vec3(0,0,0),
    this.currentDeathCameraPosition = new pc.Vec3(0,0,0),
    this.currentDeathCameraAngles = new pc.Vec3(0,0,0),
    this.cameraPoint = this.armsEntity.findByName("camera"),
    this.currentPitchAngle = new pc.Vec3,
    this.currentEuler = new pc.Vec3,
    this.enemyFacePoint = new pc.Vec3(0,0,0),
    this.enemyFaceAngle = new pc.Vec3(0,0,0),
    this.killerEntity = null,
    this.lastRaycastUpdate = Date.now(),
    this.ray = new pc.Ray,
    this.currentAnimation = "Idle",
    this.timestamp = 0,
    this.height = 0,
    this.inspecting = !1,
    this.maxVelocity = 8.5,
    this.currentVibration = 0,
    this.currentRecoilForce = 0,
    this.currentJumpPower = .5,
    this.nextShootTime = 0,
    this.currentPitchHeight = 0,
    this.lastRaycast = Date.now(),
    this.lastHeightRaycast = Date.now(),
    this.lastDroneCheck = Date.now(),
    this.currentBounceX = 0,
    this.currentBounceY = 0,
    this.currentWeaponDetails = null,
    this.lastBounceX = 0,
    this.lastBounceY = 0,
    this.forceX = 0,
    this.forceY = 0,
    this.forceZ = 0,
    this.swingX = 0,
    this.swingY = 0,
    this.swingZ = 0,
    this.focusSwingX = 0,
    this.focusSwingY = 0,
    this.armsX = 0,
    this.armsZ = 0,
    this.onSlope = !1,
    this.slopeDirection = new pc.Vec3,
    this.lastCurrentPower = 0,
    this.throwPosition = new pc.Vec3(0,0,0),
    this.throwDirection = new pc.Vec3(0,0,0),
    this.startFov = parseInt(this.cameraEntity.camera.fov + ""),
    this.vibrationSense = 0,
    this.shootRate = 0,
    this.shootLock = !1,
    this.animationCallback = !1,
    this.alreadyRevertKick = !1,
    this.raycast = {
        from: null,
        to: null
    },
    this.isReloading = 0,
    this.isTaking = 0,
    this.isThrowing = 0,
    this.isShooting = !1,
    this.isFocusing = !1,
    this.isJumping = -1,
    this.isCrouching = !1,
    this.isShifting = !1,
    this.isVaccinate = 0,
    this.lastShootTime = 0,
    this.isLanded = !0,
    this.tween = {
        landingBounce: 0
    },
    this.deathTime = 0,
    this.lastRigidUpdate = Date.now(),
    this.isPeekingLeft = !1,
    this.isPeekingRight = !1,
    this.isFalling = !1,
    this.isSwinging = 0,
    this.isDeath = !1,
    this.currentThrowPower = .5,
    this.throwingStart = !1,
    this.isThrowingStarted = !1,
    this.currentSpeed = 0,
    this.currentJumpingForce = 0,
    this.currentHealth = 100,
    this.currentArmor = 0,
    this.currentArmX = 0,
    this.currentArmY = 0,
    this.currentArmZ = 0,
    this.forwardCount = 0,
    this.leftCount = 0,
    this.cameraHeight = 0,
    this.scopeFocusTime = 0,
    this.parachuteKick = 20,
    this.jumpTimer = !1,
    this.grenadeTimer = !1,
    this.throwTimeout = !1,
    this.throwLocationSet = !1,
    this.onLeftHand = !1,
    this.onTablet = !1,
    this.setKeyboard(),
    this.keyboardState = {
        wasPressed: {},
        wasReleased: {}
    },
    this.stats = {
        gameStart: Date.now(),
        gameEnd: !1,
        gameTime: 0,
        bulletFired: 0
    },
    this.inControl = !1,
    this.locked = !1,
    this.interactiveObjects = this.app.root.findByTag("interactive"),
    this.lastInteractiveUpdate = Date.now(),
    this.app.mouse.on("mousemove", this.mouseMove, this),
    this.app.mouse.on("mousedown", this.mouseDown, this),
    this.app.mouse.on("mouseup", this.mouseUp, this),
    this.app.mouse.on("mousewheel", this.mouseWheel, this),
    this.app.keyboard.on("keydown", this.keyDown, this),
    this.app.keyboard.on("keyup", this.keyUp, this),
    this.isTouchEnabled = !1,
    this.app.on("Touch:Movement", this.setTouchMovement, this),
    this.app.on("Touch:Angle", this.setTouchAngle, this),
    this.inventoryEntity.enabled = !0,
    this.interface = this.interfaceEntity.script.interface,
    this.inventory = this.inventoryEntity.script.inventory,
    this.attachment = this.entity.script.attachment,
    this.network = this.networkEntity.script.network,
    this.network.controls = this,
    "true" == Utils.getURLParams("control") && (this.inControl = !0),
    this.onReady(),
    this.setSkin(pc.skin),
    this.setKeyboardStates(),
    this.firstTimeInventory = !1,
    this.regions = this.entity.root.findByTag("Region"),
    this.currentHitmarkerSize = .4,
    this.currentHitmarkerOpacity = 0,
    this.app.on("Hitmarker:Set", this.setHitmarker.bind(this)),
    this.app.on("Player:Damage", this.setDamage.bind(this)),
    this.app.on("Player:Hurt", this.showLimitAlert.bind(this)),
    this.app.on("Player:Cough", this.setCough.bind(this)),
    this.app.on("Player:Stop", this.setStop.bind(this), this),
    this.app.on("Player:Shake", this.shake.bind(this)),
    this.app.on("Event:Victory", this.showVictory.bind(this), this),
    this.app.fire("State:Sound", !0),
    this.entity.collision.on("collisionstart", this.onCollisionStart.bind(this), this),
    this.entity.collision.on("collisionend", this.onCollisionEnd.bind(this), this),
    this.heightVector = new pc.Vec3(0,-1e3,0),
    this.jumpVector = new pc.Vec3(0,0,0),
    this.jumpForwardVector = new pc.Vec3(0,0,0),
    this.zeroVector = new pc.Vec3(0,0,0),
    this.hitPosition = new pc.Vec3,
    this.currentPositionData = {
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        angle: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    this.lastNetworkPosition = Date.now(),
    this.lastDamagePosition = new pc.Vec3(0,0,0),
    this.teleportPosition = new pc.Vec3(0,0,0),
    this.nextPosition = new pc.Vec3(0,0,0),
    this.armsStartPosition = this.armsEntity.getLocalPosition().clone(),
    this.tasks = {
        ammo: !1,
        drive: !1,
        takeWeapon: !1,
        takeAmmo: !1,
        drone: !1
    },
    this.setId(),
    this.getKeyboardConfiguration(),
    this.mouseSensitivity = 1;
    var t = window.localStorage.getItem("MouseSensitivity");
    t && parseInt(t) > 0 && (t = parseInt(t),
    this.mouseSensitivity = t / 100);
    var e = window.localStorage.getItem("InvertAxis");
    this.invertAxis = !(!e || null === e) && e,
    Utils.isMobile() && this.setTouchState(),
    pc.controls = this
}
,
Movement.prototype.setId = function() {
    this.hash = pc.userId
}
,
Movement.prototype.onReady = function() {
    this.setStartWeapon(this.startWeaponEntity, this.startAmmoEntity)
}
,
Movement.prototype.setSkin = function(t) {
    var e = this.app.assets.find(t + "-Character");
    e && (this.characterEntity.model.asset = e)
}
,
Movement.prototype.setKeyboard = function() {
    this.keyboard = {
        up: !1,
        down: !1,
        left: !1,
        right: !1,
        jump: !1,
        reload: !1,
        shift: !1,
        throw: !1,
        crouch: !1,
        peek_left: !1,
        peek_right: !1,
        shoot: !1
    }
}
,
Movement.prototype.onCollisionStart = function(t) {
    if ("Stairway" == t.other.name) {
        var e = t.other.getLocalEulerAngles().clone().x;
        e < 0 && (e = 180 - Math.abs(e));
        var i = 68 * e / 42;
        this.onSlope = !0,
        this.slopeDirection = t.other.forward.scale(i)
    }
    t.other.name && (this.isLanded = !0,
    this.land())
}
,
Movement.prototype.onCollisionEnd = function(t) {
    "Stairway" == t.name && (this.onSlope = !1),
    t.name && (this.isLanded = !1)
}
,
Movement.prototype.showVictory = function() {
    this.gameFinished = !0,
    this.locked = !0,
    this.isForceStop = !0,
    this.isCrouching = !1,
    this.resetHeadPosition(),
    this.cameraEntity.enabled = !1,
    this.armsEntity.enabled = !1,
    this.crosshairElement.enabled = !1,
    this.characterEntity.enabled = !0,
    this.cinematicCamera.enabled = !0,
    this.characterEntity.animation.play("Enemy-Victory"),
    this.attachment.currentWeaponEntity.reparent(this.characterAttachmentModel),
    this.characterAttachmentHolder.reparent(this.characterEntity.findByName("Hand_R")),
    this.cinematicCamera.tween(this.cinematicCamera.getLocalEulerAngles()).rotate({
        x: 0,
        y: 30,
        z: 0
    }, 4.5, pc.QuarticOut).start()
}
,
Movement.prototype.showLimitAlert = function() {
    this.interface.showAlert("Stay in the area!", "error")
}
,
Movement.prototype.mouseDown = function(t) {
    return !this.inControl && (this.interface.isInventoryEnabled || this.app.mouse.enablePointerLock(),
    !!pc.Mouse.isPointerLocked() && (2 == t.button && (this.currentWeaponDetails.noFocus || (this.isFocusing = !0,
    this.shootingTime = -1,
    this.swingX = 0,
    this.swingY = 0,
    this.entity.sound.play("Focus"))),
    void (0 === t.button && this.setMouseDown())))
}
,
Movement.prototype.setMouseDown = function() {
    if (!this.isMovementAllowed())
        return !1;
    if (this.locked)
        return !1;
    if (this.onLeftHand && this.onTablet)
        return !1;
    (this.isReloading > 0 && this.currentWeaponDetails.currentAmmo > 0 && this.stopReload(),
    this.isReloading < 0 && this.isVaccinate < 0) && (this.isShooting = !0,
    this.shoot(),
    this.currentWeaponDetails.currentAmmo <= 0 && (this.entity.sound.play("Empty-Clip"),
    this.attachment.setSlider()))
}
,
Movement.prototype.touchSwitch = function() {
    var t = this.inventory.getCurrentIndex();
    ++t > this.inventory.shortcuts.length - 1 && (t = 0),
    this.setWeapon(this.inventory.getItemByIndex(t))
}
,
Movement.prototype.mouseWheel = function(t) {
    if (!this.isMovementAllowed())
        return !1;
    if (this.inControl)
        return !1;
    if (this.locked)
        return !1;
    var e = this.inventory.getCurrentIndex();
    t.wheel > 0 ? e-- : e++,
    this.setWeapon(this.inventory.getItemByIndex(e))
}
,
Movement.prototype.mouseUp = function(t) {
    return !!this.isMovementAllowed() && (!this.inControl && (!this.locked && (2 == t.button && (this.isFocusing = !1),
    0 === t.button && this.setMouseUp(),
    void (this.shootLock = !1))))
}
,
Movement.prototype.setMouseUp = function() {
    this.isShooting = !1,
    this.isNetworkShooting = !1,
    this.app.fire("Keyboard:State", "shoot", !1),
    this.nextShootTime < 0 && (this.nextShootTime = parseInt(this.currentWeaponDetails.nextShootTime + "")),
    this.shootLock = !1
}
,
Movement.prototype.setRegion = function() {
    var t = 1e3
      , e = "Unknown";
    for (var i in this.regions) {
        var s = this.regions[i]
          , n = s.getPosition().clone().sub(this.entity.getPosition().clone()).length();
        s.enabled && n < t && (e = s.name,
        t = n)
    }
    this.interface.setRegionName(e)
}
,
Movement.prototype.setRaycast = function() {
    var t = window.innerWidth / 2
      , e = window.innerHeight / 2;
    this.raycast.to = this.cameraEntity.camera.screenToWorld(t, e, this.cameraEntity.camera.farClip),
    this.raycast.muzzle = this.attachment.getMuzzlePoint();
    var i = this.app.systems.rigidbody.raycastFirst(this.lookPointEntity.getPosition(), this.raycast.to);
    i && i.point && (this.closerDistance = i.point.sub(this.entity.getPosition().clone()).length())
}
,
Movement.prototype.updateInteractiveObjects = function() {
    if (Date.now() - this.lastInteractiveUpdate > 500) {
        this.interactiveObjects = [];
        var t = this.app.root.findByTag("interactive");
        for (var e in t) {
            var i = t[e];
            if (i && i.enabled)
                this.entity.getPosition().clone().sub(i.getPosition().clone()).length() < 4 && this.interactiveObjects.push(i)
        }
        this.lastInteractiveUpdate = Date.now()
    }
}
,
Movement.prototype.doRaycast = function(t) {
    var e = !1
      , i = this.app.graphicsDevice.width / 2
      , s = this.app.graphicsDevice.height / 2;
    this.raycast.from = this.cameraEntity.camera.screenToWorld(i, s, this.cameraEntity.camera.nearClip),
    this.setRaycast(),
    this.updateInteractiveObjects();
    var n = this.takePointEntity.getPosition()
      , o = 1e3;
    for (var a in this.interactiveObjects) {
        var r = this.interactiveObjects[a];
        if (r && r.enabled && r.script && r.script.interactive) {
            var h = n.clone().sub(r.getPosition()).length();
            h < o && h < 1.5 && ("Door" === r.name ? (this.setInteractive(r, r.script.interactive),
            e = !0) : this.closerDistance > h && (this.setInteractive(r, r.script.interactive),
            e = !0),
            o = h)
        }
    }
    !1 === e && (this.interface.hideInspect(),
    this.outlineShaderEntity.script.outline.activeEntity = !1,
    this.inspecting = !1),
    this.lastRaycast = Date.now()
}
,
Movement.prototype.setInteractive = function(t, e) {
    var i = e.getDetails();
    i.isAvailable && (this.inspecting = t,
    this.isSwapActive = !1,
    this.outlineShaderEntity.script.outline.activeEntity = t.children[0],
    t && t.script && t.script.weapon && this.inventory.hasItemType(t.script.weapon.type) && "Ammo" != t.script.weapon.type && (i.action = "Swap : " + t.script.weapon.name,
    this.isSwapActive = !0),
    this.interface.setInspect(i))
}
,
Movement.prototype.doAction = function() {
    !1 !== this.inspecting && (this.interface.hideInspect(),
    this.inspecting.script.interactive.doAction(this.entity),
    this.inspecting = !1)
}
,
Movement.prototype.setPosition = function(t, e, i, s, n) {
    this.teleportPosition.x = t,
    this.teleportPosition.y = e,
    this.teleportPosition.z = i,
    this.nextEulers.x = s * pc.math.RAD_TO_DEG,
    this.nextEulers.y = n * pc.math.RAD_TO_DEG
}
,
Movement.prototype.getInCar = function(t) {
    t && t.script.interactive.isAvailable && (t.script.vehicle.enabled = !0,
    t.script.vehicle.playerEntity = this.entity,
    t.script.vehicle.start(),
    t.script.vehicle.camera = this.vehicleCamera,
    this.vehicleCamera.enabled = !0,
    this.vehicleCamera.setPosition(t.script.vehicle.leavePoint.getPosition().clone()),
    this.vehicleCamera.script.camera.vehicle = t.findByName("CameraPoint"),
    this.interface.switchMode("Car"),
    this.entity.enabled = !1)
}
,
Movement.prototype.leaveCar = function(t) {
    var e = t.getPosition().clone()
      , i = t.getEulerAngles().clone();
    this.entity.rigidbody.teleport(e.x, e.y, e.z, 0, 0, 0),
    this.eulers.x = i.y + 90,
    this.eulers.y = 0,
    this.vehicleCamera.script.camera.vehicle = !1,
    this.vehicleCamera.enabled = !1,
    this.interface.switchMode("Player")
}
,
Movement.prototype.takeItem = function(t) {
    if (this.isReloading > 0 || this.isTaking > 0 || this.isVaccinate > 0)
        return !1;
    if (this.inventory.checkEnoughSpace() && "Bag" != t.script.weapon.type)
        return this.interface.showAlert("You don't have enough space in your bag!", "error", "bag"),
        !1;
    if (t.script.weapon.onlySingle && this.inventory.hasItemType(t.script.weapon.type))
        return this.interface.showAlert("You already have " + t.script.weapon.type + " in your pack.", "error"),
        !1;
    (this.inventory.addItem(t.script.weapon.name, t.script.weapon.ammoType, t.script.weapon.type, t.script.weapon.icon, t.script.weapon.maskIcon, t.script.weapon.amount),
    "Ammo" == t.script.weapon.type && (this.tasks.takeAmmo = !0,
    this.interface.hideGuide()),
    this.takeAnimation(),
    this.currentWeaponDetails.ammoType == t.script.weapon.ammoType && "Ammo" == t.script.weapon.type) && (0 === this.currentWeaponDetails.currentAmmo && this.reload());
    return this.firstTimeInventory || this.interface.showInventoryAlert(),
    this.firstTimeInventory = !0,
    this.attachment.setParts(),
    this.entity.sound.play("TakeItem"),
    !0
}
,
Movement.prototype.takeWeapon = function(t) {
    if (this.isReloading > 0 || this.isTaking > 0 || this.isVaccinate > 0)
        return !1;
    var e = t.script.weapon.name
      , i = t.script.weapon.type
      , s = !1
      , n = !1;
    if (this.inventory.hasItem(e) ? (this.interface.showAlert("You already have this item!", "error"),
    s = !0) : this.inventory.hasItemType(i) && (this.interface.showAlert("You can carry only one " + i.toLowerCase() + ".", "error"),
    n = this.inventory.findItemByType(i)),
    this.inventory.checkEnoughSpace(i))
        return this.interface.showAlert("You don't have enough space in your bag!", "error", "bag"),
        !1;
    this.isSwapActive && this.inventory.dropItem(this.inventory.findItemByType(i), !0),
    this.inventory.addItem(t.script.weapon.name, t.script.weapon.ammoType, t.script.weapon.type, t.script.weapon.icon, t.script.weapon.maskIcon),
    s && this.inventory.dropItem(this.inventory.findItem(e), !0),
    n && this.inventory.dropItem(n, !0),
    "Handgun" != t.script.weapon.type && "Rifle" != t.script.weapon.type && "SubMachine" != t.script.weapon.type || (this.tasks.takeWeapon = !0),
    setTimeout(function(t, e) {
        t.setWeapon(e, !0)
    }, 50, this, e);
    var o = this.inventory.checkAmmo(this.currentWeaponDetails)
      , a = this.currentWeaponDetails.currentAmmo;
    return o > 0 && 0 === a && this.reload(),
    this.firstTimeInventory || this.interface.showInventoryAlert(),
    this.firstTimeInventory = !0,
    this.entity.sound.play("TakeItem"),
    !0
}
,
Movement.prototype.setAngleDelta = function(t) {
    var e = this.sensitivity * this.mouseSensitivity;
    this.isFocusing && (e *= .6),
    this.isFocusing && this.currentWeaponDetails.bigScope && (e *= .5),
    this.eulers.x -= e * t.dx,
    this.eulers.y -= e * t.dy,
    this.eulers.y = Math.min(this.eulers.y, 89),
    this.eulers.y = Math.max(this.eulers.y, -89),
    this.senseX += e * t.dx * .1,
    this.senseY += e * t.dy * .1,
    this.isFocusing ? (this.focusSwingX -= e * t.dx,
    this.focusSwingY -= e * t.dy) : (this.swingX -= e * t.dy,
    this.swingY -= e * t.dx)
}
,
Movement.prototype.mouseMove = function(t) {
    if (!this.isMovementAllowed())
        return !1;
    !pc.Mouse.isPointerLocked() && !t.buttons[0] || this.inControl || this.locked || this.setAngleDelta(t)
}
,
Movement.prototype.getKeyboardConfiguration = function() {
    this.currentConfiguration = {},
    this.currentLabels = {};
    var t = Service.get("keyboard")
      , e = Service.get("keyboard_labels");
    t && e && (this.currentConfiguration = t,
    this.currentLabels = e)
}
,
Movement.prototype.wasPressed = function(t) {
    if (void 0 !== this.currentConfiguration[t]) {
        var e = this.currentConfiguration[t];
        return !!this.app.keyboard.wasPressed(e)
    }
    return !(!pc["KEY_" + t] || !this.app.keyboard.wasPressed(pc["KEY_" + t]))
}
,
Movement.prototype.wasReleased = function(t) {
    if (void 0 !== this.currentConfiguration[t]) {
        var e = this.currentConfiguration[t];
        return !!this.app.keyboard.wasReleased(e)
    }
    return !(!pc["KEY_" + t] || !this.app.keyboard.wasReleased(pc["KEY_" + t]))
}
,
Movement.prototype.isPressed = function(t) {
    if (void 0 !== this.currentConfiguration[t]) {
        var e = this.currentConfiguration[t];
        return !!this.app.keyboard.isPressed(e)
    }
    return !(!pc["KEY_" + t] || !this.app.keyboard.isPressed(pc["KEY_" + t]))
}
,
Movement.prototype.setTouchState = function() {
    this.isTouchEnabled = !0
}
,
Movement.prototype.setTouchDown = function(t) {
    this.isTouchEnabled && (!1 === this.inspecting && this.setMouseDown(),
    this.doAction())
}
,
Movement.prototype.setTouchUp = function(t) {
    this.setMouseUp()
}
,
Movement.prototype.resetTouchKeyboard = function() {
    this.isTouchEnabled && (this.keyboard.up = !1,
    this.keyboard.down = !1,
    this.keyboard.left = !1,
    this.keyboard.right = !1)
}
,
Movement.prototype.setTouchMovement = function(t, e) {
    if (!this.isTouchEnabled)
        return !1;
    "Forward" == t && (this.keyboard.up = e),
    "Backward" == t && (this.keyboard.down = e),
    "Left" == t && (this.keyboard.left = e),
    "Right" == t && (this.keyboard.right = e)
}
,
Movement.prototype.setTouchAngle = function(t) {
    this.setAngleDelta(t)
}
,
Movement.prototype.keyDown = function(t) {
    var e = t.key
      , i = this;
    this.keyboardState.wasPressed[e] && this.keyboardState.wasPressed[e].map(function(t) {
        t(i)
    })
}
,
Movement.prototype.keyUp = function(t) {
    var e = t.key
      , i = this;
    this.keyboardState.wasReleased[e] && this.keyboardState.wasReleased[e].map(function(t) {
        t(i)
    })
}
,
Movement.prototype.defineKeyboardStates = function(t, e, i) {
    this.keyboardState[t] || (this.keyboardState[t] = {}),
    this.keyboardState[t][e] || (this.keyboardState[t][e] = []),
    this.keyboardState[t][e].push(i)
}
,
Movement.prototype.setKeyboardStates = function() {
    this.defineKeyboardStates("wasPressed", pc.KEY_W, function(t) {
        t.app.fire("Keyboard:State", "up", !0)
    }),
    this.defineKeyboardStates("wasReleased", pc.KEY_W, function(t) {
        t.app.fire("Keyboard:State", "up", !1)
    }),
    this.defineKeyboardStates("wasPressed", pc.KEY_S, function(t) {
        t.app.fire("Keyboard:State", "down", !0)
    }),
    this.defineKeyboardStates("wasReleased", pc.KEY_S, function(t) {
        t.app.fire("Keyboard:State", "down", !1)
    }),
    this.defineKeyboardStates("wasPressed", pc.KEY_A, function(t) {
        t.app.fire("Keyboard:State", "left", !0)
    }),
    this.defineKeyboardStates("wasReleased", pc.KEY_A, function(t) {
        t.app.fire("Keyboard:State", "left", !1)
    }),
    this.defineKeyboardStates("wasPressed", pc.KEY_D, function(t) {
        t.app.fire("Keyboard:State", "right", !0)
    }),
    this.defineKeyboardStates("wasReleased", pc.KEY_D, function(t) {
        t.app.fire("Keyboard:State", "right", !1)
    }),
    this.defineKeyboardStates("wasPressed", pc.KEY_Q, function(t) {
        t.app.fire("Keyboard:State", "peek_left", !0)
    }),
    this.defineKeyboardStates("wasReleased", pc.KEY_Q, function(t) {
        t.app.fire("Keyboard:State", "peek_left", !1)
    }),
    this.defineKeyboardStates("wasPressed", pc.KEY_E, function(t) {
        t.app.fire("Keyboard:State", "peek_right", !0)
    }),
    this.defineKeyboardStates("wasReleased", pc.KEY_E, function(t) {
        t.app.fire("Keyboard:State", "peek_right", !1)
    }),
    this.defineKeyboardStates("wasReleased", pc.KEY_C, function(t) {
        t.app.fire("Keyboard:State", "crouch", t.isCrouching)
    }),
    this.defineKeyboardStates("wasPressed", pc.KEY_SHIFT, function(t) {
        t.app.fire("Keyboard:State", "shift", !0),
        t.app.fire("Keyboard:State", "peek_left", !1),
        t.app.fire("Keyboard:State", "peek_right", !1),
        t.app.fire("Keyboard:State", "crouch", !1)
    }),
    this.defineKeyboardStates("wasReleased", pc.KEY_SHIFT, function(t) {
        t.isShifting && t.app.fire("Keyboard:State", "shift", !1)
    }),
    this.defineKeyboardStates("wasPressed", pc.KEY_SPACE, function(t) {
        t.app.fire("Keyboard:State", "jump", !0),
        t.app.fire("Keyboard:State", "peek_left", !1),
        t.app.fire("Keyboard:State", "peek_right", !1),
        t.app.fire("Keyboard:State", "crouch", !1),
        clearTimeout(t.jumpTimer),
        t.jumpTimer = setTimeout(function(t) {
            t.app.fire("Keyboard:State", "jump", !1)
        }, 500, t)
    })
}
,
Movement.prototype.setRecoilForce = function() {
    this.currentBounceY = pc.math.lerp(this.currentBounceY, this.lastBounceY, this.bounceSpeed),
    this.lastBounceY = pc.math.lerp(this.lastBounceY, 0, this.recoilSpeed),
    this.currentBounceX = pc.math.lerp(this.currentBounceX, this.lastBounceX, this.bounceSpeed),
    this.lastBounceX = pc.math.lerp(this.lastBounceX, 0, this.recoilSpeed),
    this.eulers.y += this.currentBounceY - this.lastBounceY,
    this.eulers.x += this.currentBounceX - this.lastBounceX
}
,
Movement.prototype.isMovementAllowed = function() {
    var t = !0;
    return this.isDeath && !this.inControl && (t = !1),
    this.locked && (t = !1),
    this.chatEntity && this.chatEntity.script && this.chatEntity.script.chat.isFocused && (t = !1),
    t
}
,
Movement.prototype.setTeleportPosition = function() {
    this.nextPosition.x = pc.math.lerp(this.nextPosition.x, this.teleportPosition.x, .2),
    this.nextPosition.y = pc.math.lerp(this.nextPosition.y, this.teleportPosition.y, .2),
    this.nextPosition.z = pc.math.lerp(this.nextPosition.z, this.teleportPosition.z, .2),
    this.entity.rigidbody.teleport(this.nextPosition.x, this.nextPosition.y, this.nextPosition.z)
}
,
Movement.prototype.setMovement = function() {
    if (!this.isMovementAllowed())
        return !1;
    var t = this.cameraEntity.forward
      , e = this.cameraEntity.right;
    this.allForce.x = 0,
    this.allForce.z = 0;
    var i = 0
      , s = 0
      , n = !1
      , o = !1;
    if (this.wasReleased("W") && (this.forwardCount = 0,
    this.leftCount = 0,
    this.entity.sound.stop("HeavyBreath")),
    (this.wasReleased("A") || this.wasReleased("D")) && (this.leftCount = 0),
    this.isPressed("Z") && (this.isFocusing = !0,
    this.shootingTime = -1),
    this.wasReleased("Z") && (this.isFocusing = !1),
    (this.isPressed("W") && !this.inControl || this.keyboard.up) && (i += t.x,
    s += t.z,
    n = !0,
    o = !0,
    this.isCrouching ? this.forwardCount += .5 : (this.forwardCount++,
    this.currentJumpPower = pc.math.lerp(this.currentJumpPower, 0, .03))),
    (this.isPressed("A") && !this.inControl || this.keyboard.left) && (i -= e.x,
    s -= e.z,
    n = !0,
    !0,
    this.leftCount++),
    (this.isPressed("D") && !this.inControl || this.keyboard.right) && (i += e.x,
    s += e.z,
    n = !0,
    !0,
    this.leftCount--),
    (this.isPressed("S") && !this.inControl || this.keyboard.down) && (i -= t.x,
    s -= t.z,
    n = !0,
    this.isCrouching ? this.forwardCount -= .5 : this.forwardCount--),
    this.inControl ? (this.keyboard.shift && (this.isShifting = !0,
    this.isCrouching = !1,
    this.isFocusing = !1,
    this.disablePeek()),
    this.keyboard.jump && this.jump(),
    this.keyboard.reload && this.reload(),
    this.keyboard.peek_left ? this.isPeekingLeft = !0 : this.isPeekingLeft = !1,
    this.keyboard.peek_right ? this.isPeekingRight = !0 : this.isPeekingRight = !1,
    this.keyboard.crouch ? this.isCrouching = !0 : this.isCrouching = !1) : (this.wasPressed("SHIFT") && (this.isShifting = !0,
    this.isCrouching = !1,
    this.isFocusing = !1,
    this.disablePeek()),
    this.wasReleased("SHIFT") && (this.isShifting = !1),
    this.wasPressed("R") && this.reload(),
    this.wasPressed("SPACE") && this.jump(),
    this.wasPressed("C") && this.crouch(),
    this.wasPressed("CAPS_LOCK") && this.toggleMap(),
    this.wasPressed("X") && this.useNeedle(),
    this.wasPressed("Q") && (this.isPeekingLeft = !0,
    this.peekLeft()),
    this.wasReleased("Q") && (this.isPeekingLeft = !1),
    this.wasPressed("E") && (this.isPeekingRight = !0,
    this.peekRight()),
    this.wasReleased("E") && (this.isPeekingRight = !1),
    this.wasReleased("F") && (this.doRaycast(!0),
    this.doAction()),
    this.wasReleased("V"),
    !this.isThrowingStarted && this.isShooting && "Grenade" == this.currentWeaponDetails.type && this.startThrowing(),
    this.isThrowingStarted && !this.isShooting && "Grenade" == this.currentWeaponDetails.type && this.throwGrenade(),
    this.wasPressed("1") && this.setWeapon(this.inventory.getItemByIndex(1)),
    this.wasPressed("2") && this.setWeapon(this.inventory.getItemByIndex(2)),
    this.wasPressed("3") && this.setWeapon(this.inventory.getItemByIndex(3)),
    this.wasPressed("4") && this.setWeapon(this.inventory.getItemByIndex(4)),
    this.wasPressed("5") && this.setWeapon(this.inventory.getItemByIndex(5))),
    0 !== i && 0 !== s) {
        var a = this.power;
        this.isCrouching && (a *= .4),
        this.isFocusing && (a *= .8),
        "Handgun" == this.attachment.type && (a *= 1.2),
        this.isShifting || (a *= 1.35),
        this.isJumping > 0 && (a *= 1.05),
        this.currentSpeed = a / this.animationSpeed;
        var r = this.lastCurrentPower;
        n && this.height < 1.5 && (this.forceX = i,
        this.forceZ = s,
        this.lastCurrentPower = a),
        o || (r *= .7,
        this.currentSpeed = .7 * this.currentSpeed),
        this.isVaccinate > 0 && (r *= .6),
        this.currentHealth < 60 && (r *= .95),
        this.currentDate - this.lastDamageTime < 1e3 && (r *= .85),
        this.currentDate - this.lastShootTime < 300 && (r *= .5);
        var h = 6 * this.currentSpeed;
        this.isFocusing || this.isCrouching ? this.runVibration = 0 : this.runVibration = Math.cos(this.timestamp / h) * Math.sin(this.timestamp / h) * .2,
        this.runVibration = pc.math.lerp(this.runVibration, 0, .05),
        this.force.set(this.forceX, 0, this.forceZ).normalize().scale(r),
        this.allForce.x = this.force.x,
        this.allForce.z = this.force.z,
        this.currentVibration++
    } else
        this.currentSpeed = 0;
    n || (this.currentSpeed = 0),
    this.forwardCount > 300 && this.currentSpeed >= .5 && (this.entity.sound.slot("HeavyBreath").isPlaying || this.entity.sound.play("HeavyBreath")),
    this.currentVelocity = this.entity.rigidbody.linearVelocity.length(),
    this.checkRescueMode(),
    this.setMiniMap(),
    this.setCrosshair(this.currentSpeed)
}
,
Movement.prototype.setMiniMap = function() {
    var t = this.entity.getPosition().clone()
      , e = t.x / 100
      , i = t.z / 100;
    this.miniMapEntity.setLocalPosition(-e, i, 0)
}
,
Movement.prototype.setNetworkPosition = function() {
    if (Date.now() - this.lastNetworkPosition < 60)
        return !1;
    var t = this.entity.getPosition().clone();
    this.currentPositionData.position.x = Utils.parseFloat(t.x),
    this.currentPositionData.position.y = Utils.parseFloat(t.y),
    this.currentPositionData.position.z = Utils.parseFloat(t.z),
    this.currentPositionData.angle.x = Utils.parseFloat(this.eulers.x % 360 * pc.math.DEG_TO_RAD),
    this.currentPositionData.angle.y = Utils.parseFloat(this.eulers.y % 360 * pc.math.DEG_TO_RAD),
    this.app.fire("Player:Position", this.currentPositionData),
    this.lastNetworkPosition = Date.now()
}
,
Movement.prototype.setStartWeapon = function(t, e) {
    void 0 !== pc.perkItem && pc.perkItem && this.inventory.addItem(pc.perkItem.name, pc.perkItem.ammoType, pc.perkItem.type, pc.perkItem.icon, pc.perkItem.maskIcon, 1),
    this.inventory.addItem(t.script.weapon.name, t.script.weapon.ammoType, t.script.weapon.type, t.script.weapon.icon, t.script.weapon.maskIcon),
    this.inventory.addItem(e.script.weapon.name, e.script.weapon.ammoType, e.script.weapon.type, e.script.weapon.icon, e.script.weapon.maskIcon, 10),
    this.setWeapon(t.script.weapon.name),
    setTimeout(function(t) {
        t.reload()
    }, 100, this)
}
,
Movement.prototype.useNeedle = function() {
    return !(this.isTaking < -.5 && this.isReloading < -.5 && this.isSwinging < -.5 && this.isThrowingStarted) && (this.inventory.hasItem("Needle") ? (this.disableTablet(),
    this.onLeftHand = !0,
    this.attachmentsEntity.enabled = !1,
    this.leftHandWeapons.enabled = !1,
    this.needleEntity.enabled = !0,
    this.isVaccinate = 200,
    this.inventory.useStack("Needle", 1),
    setTimeout(function(t) {
        t.entity.sound.play("Stab-Needle")
    }, 1e3, this),
    setTimeout(function(t) {
        t.entity.sound.play("Breath-out")
    }, 2200, this),
    void this.setAnimation("Left-Needle", 1, .2, !1, function(t) {
        t.needleEntity.enabled = !1,
        t.onLeftHand = !1,
        t.isVaccinate = 0;
        var e = 100 - t.currentHealth;
        e > 0 && e < 100 && t.app.fire("Player:Heal", e),
        t.interface.showFeeling("healing", 3, 1),
        t.leftHandWeapons.enabled = !0,
        t.attachmentsEntity.enabled = !0,
        t.setAnimation("Takeout", 1, .2, !1, function() {})
    })) : (this.interface.showAlert("You don't have needle in your backpack!", "error", "needle"),
    !1))
}
,
Movement.prototype.disableTablet = function() {
    this.onTablet = !1,
    this.tabletEntity.script.tablet.cameraEntity.enabled = !1,
    this.tabletEntity.enabled = !1
}
,
Movement.prototype.toggleMap = function() {
    this.onTablet = !this.onTablet,
    "Grenade" == this.currentWeaponDetails.type || (this.onLeftHand = this.onTablet),
    this.setAnimation("Takeout", 1, .2, !1, function() {}),
    this.tabletEntity.enabled ? this.tabletEntity.script.tablet.cameraEntity.enabled = !1 : this.tabletEntity.script.tablet.cameraEntity.enabled = !0,
    this.attachmentsEntity.enabled = !this.onTablet,
    this.leftHandWeapons.enabled = !this.onTablet,
    this.tabletEntity.enabled = this.onTablet,
    this.entity.sound.play("Crouch"),
    this.entity.sound.play("Hint")
}
,
Movement.prototype.swingKnife = function() {
    var t = Math.floor(2 * Math.random()) + 1;
    this.setAnimation("Knife-" + t, 1, this.blendTime, !1, function(t) {}),
    this.isSwinging = 100
}
,
Movement.prototype.startThrowing = function() {
    if (0 === this.inventory.checkAmountByType("Grenade"))
        return this.interface.showAlert("You don't have grenade!", "error"),
        !1;
    this.throwingStart = Date.now(),
    this.isThrowingStarted = !0,
    this.entity.sound.play("Grenade-Start")
}
,
Movement.prototype.setThrowing = function() {
    this.isThrowingStarted ? (this.interface.setThrowingBar((Date.now() - this.throwingStart) * this.throwingFactor),
    this.maxThrowingTime < Date.now() - this.throwingStart && this.throwGrenade()) : this.interface.hideThrowingBar()
}
,
Movement.prototype.throwGrenade = function() {
    this.isTaking < 0 && this.isReloading < 0 && this.isVaccinate < 0 && this.isSwinging < 0 && this.isThrowingStarted && (this.isThrowing = 80,
    this.isThrowingStarted = !1,
    this.setAnimation("Throw", 1, this.blendTime, !1, function(t) {
        t.isThrowing = -1,
        t.isThrowingStarted = !1
    }),
    clearTimeout(this.throwTimeout),
    clearTimeout(this.throwLocationSet),
    this.throwTimeout = setTimeout(function(t) {
        t.addGrenade(),
        setTimeout(function() {
            t.setAnimation("Idle", 1, 0, !1, function(t) {})
        }, 250)
    }, this.throwAnimationTime, this),
    this.throwLocationSet = setTimeout(function(t) {
        t.throwPosition = t.attachment.dropPoint.getPosition().clone(),
        t.throwDirection = t.attachment.dropPoint.forward.clone()
    }, this.throwAnimationTime - 200, this))
}
,
Movement.prototype.addGrenade = function() {
    var t = (Date.now() - this.throwingStart) * this.throwPower
      , e = this.inventory.getActiveGrenade();
    this.app.fire("Grenade:Throw", this.hash, this.throwPosition, this.throwDirection, t, e, !0),
    this.app.fire("Player:Throw", Utils.encodeFloat(this.throwPosition.x), Utils.encodeFloat(this.throwPosition.y), Utils.encodeFloat(this.throwPosition.z), Utils.encodeFloat(this.throwDirection.x), Utils.encodeFloat(this.throwDirection.y), Utils.encodeFloat(this.throwDirection.z), Utils.encodeFloat(t), e),
    this.entity.sound.play("Grenade-Throw"),
    this.inventory.useStack(e + "-Grenade", 1),
    this.isThrowingStarted = !1
}
,
Movement.prototype.setWeapon = function(t, e) {
    if (this.stopReload(),
    this.isReloading > 0 || this.isVaccinate > 0 || this.isTaking > 0 || this.isSwinging > 0)
        return !1;
    if (t)
        if (this.attachment.setWeapon(t),
        this.inventory.setShortcutByName(t),
        this.currentWeaponDetails = this.attachment.getWeaponDetails(),
        this.takeout(),
        this.inventory.updateLeftSpace(),
        this.app.fire("Player:SetWeapon", t),
        "Grenade" == this.currentWeaponDetails.type)
            this.onLeftHand = !0;
        else {
            var i = !1;
            this.onLeftHand && (i = !0),
            this.onLeftHand = !1,
            i && this.setAnimation("Takeout", 1, this.blendTime, !1, function(t) {}),
            setTimeout(function(t) {
                0 === t.currentWeaponDetails.currentAmmo && t.reload(!0)
            }, 50, this)
        }
}
,
Movement.prototype.takeout = function() {
    this.isTaking < 0 && (0 === this.currentWeaponDetails.currentAmmo ? this.reload(!0) : (this.isTaking = 60,
    this.setAnimation("Takeout", 1, this.blendTime, !1, function(t) {
        t.isTaking = -1,
        t.reload(!0)
    }),
    this.entity.sound.play("Weapon-Takeout"),
    "Rifle" != this.currentWeaponDetails.type && "SubMachine" != this.currentWeaponDetails.type || setTimeout(function(t) {
        t.entity.sound.play("Weapon-Reload")
    }, 500, this)))
}
,
Movement.prototype.crouch = function() {
    this.isCrouching = !this.isCrouching,
    this.disablePeek(),
    this.entity.sound.play("Crouch")
}
,
Movement.prototype.disablePeek = function() {
    this.isPeekingLeft = !1,
    this.isPeekingRight = !1
}
,
Movement.prototype.peekLeft = function() {
    this.isPeekingRight && this.disablePeek(),
    this.entity.sound.play("Crouch")
}
,
Movement.prototype.peekRight = function() {
    this.isPeekingLeft && this.disablePeek(),
    this.entity.sound.play("Crouch")
}
,
Movement.prototype.resetHeadPosition = function() {
    this.currentHeadPosition.y = this.currentHeadStartPosition.y,
    this.headPositionEntity.setLocalPosition(this.currentHeadPosition)
}
,
Movement.prototype.setHeadPosition = function() {
    this.isCrouching ? this.currentHeadPosition.y = pc.math.lerp(this.currentHeadPosition.y, this.currentHeadStartPosition.y - .8, .1) : this.currentHeadPosition.y = pc.math.lerp(this.currentHeadPosition.y, this.currentHeadStartPosition.y, .1);
    var t = 15;
    this.isCrouching && (t = 20),
    this.isPeekingLeft ? this.currentHeadRotation.z = pc.math.lerp(this.currentHeadRotation.z, t, .1) : this.isPeekingRight ? this.currentHeadRotation.z = pc.math.lerp(this.currentHeadRotation.z, -t, .1) : this.currentHeadRotation.z = pc.math.lerp(this.currentHeadRotation.z, 0, .1),
    this.headPositionEntity.setLocalPosition(this.currentHeadPosition)
}
,
Movement.prototype.setCough = function() {
    this.entity.sound.slots["Male-Cough"].isPlaying || this.isDeath || this.gameFinished || (this.interface.showFeeling("breathing", 10, 1),
    this.entity.sound.play("Male-Cough"))
}
,
Movement.prototype.shake = function() {
    this.nextForceX = 5
}
,
Movement.prototype.setCurrentDate = function() {
    this.currentDate = Date.now()
}
,
Movement.prototype.setHeight = function() {
    var t = this.entity.getPosition()
      , e = t.clone().add(this.heightVector)
      , i = this.app.systems.rigidbody.raycastFirst(t, e)
      , s = 1e3;
    i && (s = i.point.sub(this.entity.getPosition().clone()).length()),
    this.height > 900 && this.entity.rigidbody.teleport(this.resetPosition),
    this.height > 2 ? this.isFalling = !0 : (this.isFalling && this.entity.sound.play("Fall"),
    this.isFalling = !1),
    this.height = s
}
,
Movement.prototype.jump = function() {
    this.height <= 1.15 && (this.isJumping = this.maxJumpTime,
    this.currentJumpingForce = this.jumpingForce,
    this.isCrouching = !1,
    this.currentJumpPower = this.jumpPower,
    this.disablePeek(),
    this.isJumpStarted = .1,
    this.nextJumpValue = -30,
    this.entity.sound.play("Jump"))
}
,
Movement.prototype.land = function() {
    if (!this.isLanded)
        return !1;
    this.isJumpStarted = .15,
    this.nextJumpValue = -10
}
,
Movement.prototype.applyFallForce = function() {
    this.isJumping > 0 && (this.currentJumpPower = pc.math.lerp(this.currentJumpPower, 0, .1),
    this.jumpVector.x = 0,
    this.jumpVector.y = this.currentJumpPower,
    this.jumpVector.z = 0,
    this.entity.rigidbody.applyImpulse(this.jumpVector)),
    this.height >= 1 && (this.allForce.y = this.gravity,
    this.isJumping < 0 && !this.onSlope && this.height >= 2 && (this.allForce.y = 2 * this.gravity)),
    this.onSlope && this.entity.rigidbody.applyForce(this.slopeDirection)
}
,
Movement.prototype.setStop = function() {
    this.allForce.x = 0,
    this.allForce.z = 0,
    this.app.fire("Keyboard:State", "up", !1),
    this.app.fire("Keyboard:State", "down", !1),
    this.app.fire("Keyboard:State", "left", !1),
    this.app.fire("Keyboard:State", "right", !1),
    this.app.keyboard.update()
}
,
Movement.prototype.setAllForces = function() {
    this.isForceStop && this.stopAllForce(),
    this.height >= 1 && (this.allForce.x *= 1.1,
    this.allForce.z *= 1.1),
    isNaN(this.allForce.x) || isNaN(this.allForce.y) || isNaN(this.allForce.z) || this.entity.rigidbody.applyForce(this.allForce)
}
,
Movement.prototype.useAmmo = function(t, e, i) {
    var s = 0
      , n = 0;
    i > t ? (s = t,
    n = t - e) : i <= t && (e + i > t ? (s = t,
    n = t - e) : (s = e + i,
    n = i)),
    this.currentWeaponDetails.currentAmmo = s,
    this.inventory.useStack(this.currentWeaponDetails.ammoType, n)
}
,
Movement.prototype.stopReload = function() {
    this.isReloading > 0 && (this.isReloading = -1,
    this.setAnimation("Idle", 1, this.blendTime, !0),
    this.attachment.reattachMagazine(),
    this.entity.sound.stop(this.lastReloadingWeapon.type + "-Reload"),
    this.currentInsertTimeout && (clearTimeout(this.currentInsertTimeout),
    this.currentInsertTimeout = !1))
}
,
Movement.prototype.reload = function(t) {
    if (this.isReloading < 0 && this.isVaccinate < 0 && this.isTaking < 0 && this.isSwinging < 0 && this.currentWeaponDetails) {
        this.isTakeAnimation = !1,
        this.attachmentsEntity.enabled = !0;
        var e = this.inventory.checkAmmo(this.currentWeaponDetails);
        if (t && 0 !== e)
            return !1;
        if (this.currentWeaponDetails.clipCapacity == this.currentWeaponDetails.currentAmmo)
            ;
        else if (e > 0) {
            if (this.isFocusing = !1,
            this.isReloading = 355,
            this.currentWeaponDetails.isSniper)
                this.entity.sound.play("Shotgun-Open"),
                this.setAnimation("Open", 1, this.blendTime, !1, function(t) {
                    t.insertBullet()
                });
            else if (this.currentWeaponDetails.isShotgun)
                this.entity.sound.play("Shotgun-Open"),
                this.setAnimation("Open", 1, this.blendTime, !1, function(t) {
                    t.insertBullet()
                });
            else {
                var i = this.currentWeaponDetails
                  , s = this.inventory.checkAmmo(i);
                this.entity.sound.play(this.currentWeaponDetails.type + "-Reload"),
                this.setAnimation("Reload", 1, this.blendTime, !1, function(t) {
                    t.isReloading = -1,
                    t.setAnimation("Idle", 1, t.blendTime, !0),
                    t.attachment.reattachMagazine(),
                    t.useAmmo(i.clipCapacity, i.currentAmmo, s)
                }),
                "P90" == this.currentWeaponDetails.name && setTimeout(function(t) {
                    t.entity.sound.slots["Weapon-Reload"].isPlaying || t.entity.sound.play("Weapon-Reload")
                }, 3100, this),
                this.attachment.attachMagazine(),
                this.lastReloadingWeapon = i
            }
            this.inventory.updateLeftSpace()
        } else
            this.interface.showAlert("You don't have enough " + Utils.clearName(this.currentWeaponDetails.ammoType) + " ammo!", "default", this.currentWeaponDetails.ammoType)
    }
}
,
Movement.prototype.insertBullet = function() {
    var t = this.inventory.checkAmmo(this.currentWeaponDetails);
    this.currentWeaponDetails.clipCapacity == this.currentWeaponDetails.currentAmmo || 0 === t ? (this.entity.sound.play("Shotgun-Close"),
    this.setAnimation("Close", 1, this.blendTime, !1, function(t) {
        t.isReloading = -1,
        t.setAnimation("Idle", 1, t.blendTime, !0)
    })) : (this.entity.sound.play("Shotgun-Insert"),
    this.isReloading = 125,
    this.setAnimation("Insert", 1, this.blendTime, !1, function(t) {}, !0),
    this.useAmmo(this.currentWeaponDetails.clipCapacity, this.currentWeaponDetails.currentAmmo, 1),
    this.currentInsertTimeout = setTimeout(function(t) {
        t.insertBullet()
    }, 700, this))
}
,
Movement.prototype.checkRescueMode = function() {
    if (this.rescueModeDisabled)
        return !1;
    var t = this.entity.getPosition()
      , e = t.clone().add(new pc.Vec3(0,100,0))
      , i = this.app.systems.rigidbody.raycastFirst(t, e);
    if (i) {
        var s = i.point.sub(t.clone()).length();
        if ("SM_Bld_Shop_Large_02" == i.entity.name && this.height < 2 && s < 2) {
            var n = t.clone().add(new pc.Vec3(0,10,0));
            this.entity.rigidbody.teleport(n),
            this.rescueModeDisabled = !0
        }
    }
    this.timestamp > 20 && (this.rescueModeDisabled = !0)
}
,
Movement.prototype.updateAnimation = function() {
    var t = 0
      , e = 0
      , i = 0;
    if (this.animationCallback && this.animationCurrentTime <= 0 && (this.animationCallback(this),
    this.animationCallback = !1),
    !this.isShooting && !this.isThrowingStarted && this.isReloading < 0 && this.isVaccinate < 0 && this.isTaking < 0 && this.isSwinging < 0 && this.isThrowing < 0 && !this.locked) {
        if (this.currentSpeed >= 1 && this.shootRate < 0 && this.isJumping < -.2 && !this.isFalling) {
            var s = this.currentVelocity / this.maxVelocity;
            s = Math.min(s, 1),
            this.currentDate - this.lastShootTime > 1e3 && this.setAnimation("Run", s, this.blendTime, !0),
            this.entity.sound.slots.Running.isPlaying || this.entity.sound.play("Running"),
            "Handgun" == this.currentWeaponDetails.type ? this.entity.sound.slots.Running.pitch = 1.5 : this.entity.sound.slots.Running.pitch = 1.3,
            this.disablePeek()
        } else
            this.shootingTime < 0 && (this.setAnimation("Idle", 1, this.blendTime, !0),
            this.entity.sound.stop("Running"));
        t = Math.cos(this.forwardCount / this.pivotSpeed) + Math.sin(this.leftCount / this.pivotSpeed),
        e = Math.sin(this.forwardCount / this.pivotSpeed) * Math.cos(this.forwardCount / this.pivotSpeed) + Math.cos(this.leftCount / this.pivotSpeed),
        this.isFalling ? (t = 0,
        e = .05 * Math.sin(this.isJumping / 9)) : this.isFocusing ? this.isFocusing ? (t *= .01,
        e *= .01) : this.isCrouching && (t *= .01,
        e *= .01) : (t *= .03,
        e *= .02),
        this.currentSpeed <= .01 && (t = 0,
        e = 0,
        i = 0)
    }
    if (this.isFocusing && (t *= .1,
    e *= .1,
    i *= .1),
    this.isThrowingStarted && (e = .5,
    i = 2),
    this.isJumping > 0 && !this.isFocusing) {
        var n = Math.cos(this.height * this.maxLandingBounce);
        this.tween.landingBounce = n > .5 ? pc.math.lerp(this.tween.landingBounce, -this.jumpTweenFactor, .08) : pc.math.lerp(this.tween.landingBounce, this.jumpTweenFactor, .1)
    } else
        this.tween.landingBounce = pc.math.lerp(this.tween.landingBounce, 0, .1);
    this.isJumpStarted > 0 && (this.tween.landingBounce = pc.math.lerp(this.tween.landingBounce, this.nextJumpValue, .2)),
    this.previousHeight = this.height,
    this.currentArmX = pc.math.lerp(this.currentArmX, t, .1),
    this.currentArmY = pc.math.lerp(this.currentArmY, e, .1),
    this.currentArmZ = pc.math.lerp(this.currentArmZ, i, .1),
    this.pivotEntity.setLocalPosition(this.currentArmX, this.currentArmY, this.currentArmZ)
}
,
Movement.prototype.setHitmarker = function(t) {
    this.currentHitmarkerSize = .255,
    this.currentHitmarkerOpacity = 1
}
,
Movement.prototype.setDamage = function(t) {
    this.interface.showDamageIndicator(),
    this.lastDamagePosition.x = t.x,
    this.lastDamagePosition.y = t.y,
    this.lastDamagePosition.z = t.z;
    var e = Math.round(pc.math.random(1, 3));
    this.entity.sound.play("Body-Hit-" + e),
    this.currentEuler.x += 20 * Math.random(),
    this.currentEuler.y += 20 * Math.random(),
    this.lastDamageTime = Date.now()
}
,
Movement.prototype.updateDamageIndicator = function() {
    var t = this.entity.getPosition().clone()
      , e = Utils.lookAt(this.lastDamagePosition.x, this.lastDamagePosition.z, t.x, t.z);
    e = e * pc.math.RAD_TO_DEG - this.eulers.x % 360,
    this.interface.setDamageIndicatorStatus(e)
}
,
Movement.prototype.killScore = function() {
    this.entity.sound.play("Kill-Score")
}
,
Movement.prototype.setCrosshair = function(t) {
    if (this.gameFinished)
        return !1;
    var e = 0;
    this.isFalling || this.isJumping > 0 ? e += 100 * this.currentSpeed * this.currentSpeed : e += 5 * Math.cos(this.timestamp / 3.5) * this.currentSpeed,
    e += 25 * this.currentRecoilForce,
    e += this.height,
    this.currentCrossSize = pc.math.lerp(this.currentCrossSize, this.crosshairSize + 20 * t + e, .7),
    this.crosshairElement.element.width = this.currentCrossSize,
    this.crosshairElement.element.height = this.currentCrossSize,
    this.currentHitmarkerSize = pc.math.lerp(this.currentHitmarkerSize, .4, .35),
    this.currentHitmarkerOpacity = pc.math.lerp(this.currentHitmarkerOpacity, 0, .15),
    this.hitmarkerElement.enabled = !0,
    this.hitmarkerElement.setLocalScale(this.currentHitmarkerSize, this.currentHitmarkerSize, this.currentHitmarkerSize),
    this.currentHitmarkerOpacity < .2 ? this.hitmarkerElement.element.opacity = 0 : this.hitmarkerElement.element.opacity = 1,
    this.lookEntity.enabled = this.isFocusing,
    this.ADSBlur.enabled = this.isFocusing,
    this.isFocusing && !this.currentWeaponDetails.focusCrosshair ? this.crosshairElement.enabled = !1 : this.onTablet ? this.crosshairElement.enabled = !1 : this.crosshairElement.enabled = !0,
    this.currentWeaponDetails.bigScope ? this.isFocusing ? this.scopeFocusTime = pc.math.lerp(this.scopeFocusTime, 1, this.scopeFocusSpeed) : this.scopeFocusTime = pc.math.lerp(this.scopeFocusTime, 0, this.scopeFocusSpeed) : this.scopeFocusTime = 0,
    this.scopeFocusTime > .95 ? (this.scopeElement.enabled = !0,
    this.armsEntity.enabled = !1) : (this.scopeElement.enabled = !1,
    this.armsEntity.enabled = !0),
    this.vibrationSense = e
}
,
Movement.prototype.takeAnimation = function() {
    if (this.attachment.hand.enabled)
        return this.attachment.setHandHold(),
        !1;
    this.attachment.setHandTemporary(),
    this.isTakeAnimation = !0,
    this.setAnimation("Left-Take", 3.1, 0, !1, function(t) {
        t.isTakeAnimation = !1,
        t.attachment.setHandHold()
    }, !1, !0),
    setTimeout(function(t) {
        t.isTakeAnimation = !1,
        t.attachment.setHandHold()
    }, 1100, this)
}
,
Movement.prototype.setAnimation = function(t, e, i, s, n, o, a) {
    var r = "normal"
      , h = "Handgun";
    this.isReloading < 0 && this.isTaking < 0 && this.isFocusing && this.currentSpeed < this.vibrationThreshold && (t = "ADS",
    r = "focus"),
    this.currentWeaponDetails && (h = this.currentWeaponDetails.rifleFocus && "focus" == r ? "Rifle" : "SubMachine" == this.currentWeaponDetails.type ? "Rifle" : this.currentWeaponDetails.type,
    !this.currentWeaponDetails.customAnimation || "Reload" != t && "Open" != t && "Insert" != t && "Close" != t && "Fire" != t || (t = this.currentWeaponDetails.name + "-" + t,
    a = !0)),
    "Throw" == t ? t = "Rifle-Throw" : this.onLeftHand && this.isVaccinate > 0 ? t = "Left-Needle" : this.onLeftHand ? t = "Left-Idle" : a || (t = h + "-" + t),
    (this.currentAnimation != t || o) && (this.armsEntity.animation.loop = !1 !== s,
    this.isFocusing > 0 && (this.armsEntity.animation.loop = !1),
    "focus" == r ? this.armsEntity.animation.play(t) : this.armsEntity.animation.play(t, i),
    this.currentAnimation = t),
    n && (this.animationCallback = n,
    this.animationCurrentTime = this.armsEntity.animation.duration / e,
    this.armsEntity.animation.currentTime = 0),
    this.armsEntity.animation.speed = "focus" == r ? 5 : e
}
,
Movement.prototype.setCameraAngle = function(t) {
    if (this.inControl && (this.eulers.x = pc.math.lerpAngle(this.eulers.x, this.nextEulers.x, .2),
    this.eulers.y = pc.math.lerpAngle(this.eulers.y, this.nextEulers.y, .2)),
    this.currentEuler.x = pc.math.lerpAngle(this.currentEuler.x, this.eulers.x, this.pitchSpeed),
    this.currentEuler.y = pc.math.lerpAngle(this.currentEuler.y, this.eulers.y, this.pitchSpeed),
    this.quickForceX = pc.math.lerp(this.quickForceX, this.nextForceX, .3),
    this.quickForceY = pc.math.lerp(this.quickForceY, this.nextForceY, .3),
    this.isFocusing ? this.swingX = pc.math.lerp(this.swingX, 0, .25) : this.swingX = pc.math.lerp(this.swingX, 0, .02),
    this.focusSwingX = pc.math.lerp(this.focusSwingX, 0, .25),
    this.focusSwingY = pc.math.lerp(this.focusSwingY, 0, .25),
    this.swingY = pc.math.lerp(this.swingY, 0, .05),
    this.isPeekingLeft && !this.isFocusing)
        this.armsZ = pc.math.lerpAngle(this.armsZ, -20, .1);
    else if (this.isPeekingRight && !this.isFocusing)
        this.armsZ = pc.math.lerpAngle(this.armsZ, 20, .1);
    else if (0 !== this.leftCount) {
        var e = Math.sin(this.leftCount / this.pivotSpeed) * Math.cos(this.leftCount / this.pivotSpeed) * 2;
        this.leftCount > 0 ? e = -7 - e : e += 7,
        this.armsZ = pc.math.lerpAngle(this.armsZ, e, .1)
    } else
        this.armsZ = pc.math.lerpAngle(this.armsZ, 0, .1);
    this.isFocusing ? (this.currentPitchAngle.x = this.currentEuler.x,
    this.currentPitchAngle.y = this.currentEuler.y) : (this.currentPitchAngle.x = pc.math.lerpAngle(this.currentPitchAngle.x, this.currentEuler.x, this.pitchSpeed),
    this.currentPitchAngle.y = pc.math.lerpAngle(this.currentPitchAngle.y, this.currentEuler.y, this.pitchSpeed)),
    this.currentJumpingForce,
    this.isFocusing && 0 !== this.currentWeaponDetails.focusVector.y ? this.cameraHeight = pc.math.lerp(this.cameraHeight, this.currentWeaponDetails.focusVector.y, .1) : this.isFocusing && this.attachment.hasSight ? this.cameraHeight = pc.math.lerp(this.cameraHeight, this.focusHeight, .1) : this.cameraHeight = pc.math.lerp(this.cameraHeight, this.defaultHeight, .1);
    this.cameraPoint.getLocalEulerAngles();
    if (!this.isDeath || this.inControl) {
        this.pitchEntity.setLocalEulerAngles(this.currentPitchAngle.y, 0, 0),
        this.cameraHolder.setLocalEulerAngles(this.currentPitchAngle.y, 0, 0),
        this.cameraEntity.setLocalPosition(0, this.cameraHeight, .41),
        this.cameraEntity.setLocalEulerAngles(.05 * -this.tween.landingBounce + .3 * this.currentRecoilForce, this.quickForceX, 0),
        this.scopeEntity.setLocalPosition(10 * this.focusSwingX, 10 * this.focusSwingY, 0);
        var i = Math.min(Math.abs(this.focusSwingX) + Math.abs(this.focusSwingY), 1);
        this.scopeBlurEntity.element.opacity = i,
        this.scopeDefaultEntity.element.opacity = Math.max(1 - i, 0)
    }
    if (this.isFocusing && (this.armsX = .1 * this.armsX,
    this.armsZ = .1 * this.armsZ,
    this.quickForceX = .1 * this.quickForceX),
    this.headPositionEntity.setLocalEulerAngles(0, 0, this.currentHeadRotation.z),
    this.yawEntity.setLocalEulerAngles(0, this.currentPitchAngle.x, 0),
    this.armsEntity.setLocalEulerAngles(this.armsX, 0, this.armsZ + this.quickForceX),
    this.isFocusing ? this.armsEntity.setLocalPosition(this.armsStartPosition.x, this.armsStartPosition.y, this.armsStartPosition.z) : this.armsEntity.setLocalPosition(this.armsStartPosition.x, this.armsStartPosition.y + .002 * this.tween.landingBounce, this.armsStartPosition.z - .001 * this.tween.landingBounce),
    this.isFocusing) {
        var s = new pc.Vec3(0,.366,.32)
          , n = this.handPivotEntity.getLocalPosition().lerp(this.handPivotEntity.getLocalPosition().clone(), s, .1);
        this.handPivotEntity.setLocalPosition(n)
    } else
        this.handPivotEntity.setLocalPosition(this.originalHandPivotPosition);
    this.handPivotEntity.setLocalEulerAngles(.15 * this.swingX + .15 * this.tween.landingBounce, .15 * this.swingY, 0)
}
,
Movement.prototype.setFocusState = function(t) {
    this.isShooting && this.nextShootTime < 0 && this.currentWeaponDetails.currentAmmo > 0 && (this.cameraEntity.camera.fov -= .1 * this.currentRecoilForce),
    this.isFocusing && this.currentWeaponDetails.bigScope ? this.cameraEntity.camera.fov = pc.math.lerp(this.cameraEntity.camera.fov, this.startFov - 2 * this.focusFov, .5 * this.focusSpeed * t) : this.isFocusing ? this.cameraEntity.camera.fov = pc.math.lerp(this.cameraEntity.camera.fov, this.startFov - this.focusFov, this.focusSpeed * t) : this.cameraEntity.camera.fov = pc.math.lerp(this.cameraEntity.camera.fov, this.startFov, this.focusSpeed * t)
}
,
Movement.prototype.setCompass = function() {
    this.compassEntity.script.compass.currentAngle = this.eulers.x % 360,
    this.compassEntity.script.compass.currentPosition = this.entity.getPosition().clone()
}
,
Movement.prototype.setCounters = function(t) {
    this.isReloading -= 60 * t,
    this.isTaking -= 60 * t,
    this.isThrowing -= 60 * t,
    this.shootRate -= 60 * t,
    this.nextShootTime -= 60 * t,
    this.isJumpStarted -= t,
    this.animationCurrentTime -= t,
    this.shootingTime -= t,
    this.isJumping -= t,
    this.isSwinging -= 60 * t,
    this.currentJumpingForce--,
    this.isVaccinate -= 60 * t,
    this.currentRecoilForce = pc.math.lerp(this.currentRecoilForce, 0, .1),
    this.senseX = pc.math.lerp(this.senseX, 0, .85),
    this.senseY = pc.math.lerp(this.senseY, 0, .85),
    this.nextForceX = pc.math.lerp(this.nextForceX, 0, .2),
    this.nextForceY = pc.math.lerp(this.nextForceY, 0, .2)
}
,
Movement.prototype.fireBullet = function() {
    var t = this.raycast.to
      , e = .8 * this.currentWeaponDetails.damage + Math.random() * this.currentWeaponDetails.damage;
    e = Math.min(e, this.currentWeaponDetails.damage),
    e = Math.floor(e),
    this.currentWeaponDetails.bigScope && !this.isFocusing ? (t.x += 60 * Math.random() - 60 * Math.random(),
    t.y += 60 * Math.random() - 60 * Math.random(),
    t.z += 60 * Math.random() - 60 * Math.random()) : this.currentWeaponDetails.isShotgun ? (t.x += 40 * Math.random() - 40 * Math.random(),
    t.y += 40 * Math.random() - 40 * Math.random(),
    t.z += 40 * Math.random() - 40 * Math.random()) : this.isFocusing ? (t.x += 1 * this.currentRecoilForce * Math.random() - 1 * this.currentRecoilForce * Math.random(),
    t.y += 1 * this.currentRecoilForce * Math.random() - 1 * this.currentRecoilForce * Math.random(),
    t.z += 1 * this.currentRecoilForce * Math.random() - 1 * this.currentRecoilForce * Math.random()) : (t.x += 10 * this.currentRecoilForce * Math.random() - 10 * this.currentRecoilForce * Math.random(),
    t.y += 10 * this.currentRecoilForce * Math.random() - 10 * this.currentRecoilForce * Math.random(),
    t.z += 10 * this.currentRecoilForce * Math.random() - 10 * this.currentRecoilForce * Math.random()),
    this.app.fire("Bullet:Fire", this.hash, this.raycast.muzzle, t, this.raycast.muzzle, e),
    this.shotgunBullets--
}
,
Movement.prototype.shoot = function() {
    if ("Grenade" == this.currentWeaponDetails.type)
        return !1;
    if (this.isShooting && this.currentWeaponDetails && this.currentWeaponDetails.currentAmmo <= 0)
        return this.inventory.checkAmmo(this.currentWeaponDetails) > 0 ? (this.reload(),
        this.isShooting = !1,
        this.app.fire("Keyboard:State", "shoot", !1)) : this.interface.showAlert("You don't have enough " + Utils.clearName(this.currentWeaponDetails.ammoType) + " ammo!", "default", this.currentWeaponDetails.ammoType),
        !1;
    if (this.isShooting && this.nextShootTime < 0) {
        var t = this.currentWeaponDetails
          , e = t.recoil;
        e *= 1.1,
        !1 === this.isFocusing ? t.automatic && "Handgun" == t.type ? this.setAnimation("Idle", 1, 0, !1, null, !0) : (this.setAnimation("Fire", 1, 0, !1, null, !0),
        this.shootingTime = 1.2) : e *= .3,
        this.currentWeaponDetails.isShotgun && (this.shotgunBullets = 10),
        this.entity.sound.play("Fire-" + t.name),
        this.stats.bulletFired++,
        this.nextBodyPosition.z += .3 * e,
        this.nextBodyRotation.x -= 2 * e * Math.random(),
        this.nextBodyRotation.y -= 2 * e * Math.random(),
        this.nextBodyRotation.z -= 2 * e * Math.random(),
        this.currentRecoilForce += 2 * e,
        this.fireBullet(),
        this.attachment.setMuzzle(),
        this.currentBounceX = .02 * e * Math.random() - .02 * e * Math.random(),
        this.currentBounceY = .05 * e,
        this.lastBounceX = 1.2 * e * Math.random() - 1.2 * e * Math.random(),
        this.lastBounceY = 1 * -e,
        this.shootRate = t.shootRate,
        this.currentWeaponDetails.currentAmmo--;
        var i = this.currentDate;
        this.lastShootTime = i,
        this.currentWeaponDetails.automatic || (this.shootLock = !0),
        this.isNetworkShooting || this.app.fire("Keyboard:State", "shoot", !0),
        this.isNetworkShooting = !0
    }
}
,
Movement.prototype.setFire = function() {
    this.shootRate < 0 && !this.shootLock && this.isThrowing < 0 && this.isReloading < 0 && this.isTaking < 0 && this.shoot()
}
,
Movement.prototype.setBodyPosition = function() {
    this.nextBodyPosition = this.nextBodyPosition.lerp(this.nextBodyPosition, this.zeroVector, .3),
    this.nextBodyRotation = this.nextBodyRotation.lerp(this.nextBodyRotation, this.zeroVector, .3);
    var t = this.bodyStartPosition.clone().add(this.nextBodyPosition)
      , e = this.bodyStartRotation.clone().add(this.nextBodyRotation)
      , i = this.currentBodyPosition.lerp(this.currentBodyPosition, t, .2)
      , s = this.currentBodyRotation.lerp(this.currentBodyRotation, e, .2);
    this.shootRate > 0 && (this.isFocusing || (i.y += .001 * Math.sin(this.timestamp / 4),
    s.x += .01 * Math.cos(this.timestamp / 2),
    s.z += Math.sin(this.timestamp / 3) * Math.sin(this.timestamp / 3) * .15)),
    this.nextShootTime > 0 && (this.nextBodyRotation.x = Math.cos(this.timestamp / 1) * Math.sin(this.timestamp / 1) * 2,
    this.nextBodyRotation.y = Math.cos(this.timestamp / 1) * Math.sin(this.timestamp / 1) * 2,
    this.nextBodyRotation.z = Math.cos(this.timestamp / 1) * Math.sin(this.timestamp / 1) * 2),
    this.bodyEntity.setLocalPosition(i),
    this.bodyEntity.setLocalEulerAngles(s)
}
,
Movement.prototype.setAmmoValues = function() {
    this.currentWeaponDetails && (this.interface.setClip(this.currentWeaponDetails.currentAmmo),
    this.interface.setAmmo(this.inventory.checkAmmo(this.currentWeaponDetails)),
    this.interface.setGrenadeCount(this.inventory.checkAmountByType("Grenade")))
}
,
Movement.prototype.setParachuteKick = function() {
    if (this.parachuteKick--,
    this.parachuteKick > 0) {
        var t = new pc.Vec3(0,0,0)
          , e = this.cameraEntity.forward;
        t.x = 50 * e.x,
        t.z = 50 * e.z,
        this.currentSpeed = this.power / this.parachuteKick,
        this.entity.rigidbody.applyForce(t)
    }
}
,
Movement.prototype.zoomEnemy = function(t) {
    if (this.network.isPaused = !0,
    this.interface.hideDamageIndicator(),
    t) {
        this.killerEntity = t;
        var e = this.killerEntity.findByName("FacePoint");
        e && (this.enemyFacePoint = e.getPosition().clone(),
        this.enemyFaceAngle = e.getEulerAngles().clone(),
        this.nextDeathCameraPosition = this.enemyFacePoint,
        this.nextDeathCameraAngles = this.enemyFaceAngle,
        this.deathCameraEntity.tween(this.deathCameraEntity.getEulerAngles()).rotate({
            x: this.nextDeathCameraAngles.x,
            y: this.nextDeathCameraAngles.y,
            z: this.nextDeathCameraAngles.z
        }, 1, pc.QuarticOut).start())
    }
}
,
Movement.prototype.stopAllForce = function() {
    this.isForceStop && (this.allForce.x = 0,
    this.allForce.z = 0)
}
,
Movement.prototype.showResults = function(t) {
    var e = this
      , i = 3e3;
    1 === t.rank && (i = 6e3),
    this.stats.gameTime = Date.now() - this.stats.gameStart,
    this.results = t,
    this.gameFinished = !0,
    this.results.gameTime = this.stats.gameTime,
    this.results.bulletFired = this.stats.bulletFired,
    setTimeout(function() {
        e.interface.showResults(e.results),
        e.spectateEnemy()
    }, i)
}
,
Movement.prototype.spectateEnemy = function() {
    this.network.isPaused = !1,
    this.locked = !0,
    this.isForceStop = !0,
    this.giveControl(this.killerEntity),
    this.setAnimation("Idle", 1, this.blendTime, !0)
}
,
Movement.prototype.stopSpectating = function() {
    this.inControl = !1,
    this.armsEntity.enabled = !1,
    this.network.disconnect()
}
,
Movement.prototype.takeControlBack = function() {
    var t = this.killerEntity;
    t && t.script.enemy && t.script.enemy.giveControlBack(),
    this.killerEntity = null,
    this.setKeyboard()
}
,
Movement.prototype.giveControl = function(t) {
    t && t.enabled && t.script.enemy && (t.script.enemy.takeControl(),
    this.inControl = !0,
    this.eulers.x = 0,
    this.eulers.y = 0,
    this.currentEuler.x = 0,
    this.currentEuler.y = 0,
    this.deathCameraEntity.enabled = !1,
    this.characterEntity.enabled = !1,
    this.cameraEntity.enabled = !0,
    this.armsEntity.enabled = !0,
    this.locked = !1,
    this.isFocusing = !1,
    this.network.isPaused = !1)
}
,
Movement.prototype.setDeathCamera = function() {
    this.currentDeathCameraPosition = this.currentDeathCameraPosition.lerp(this.currentDeathCameraPosition, this.nextDeathCameraPosition, .1),
    this.deathCameraEntity.setPosition(this.currentDeathCameraPosition)
}
,
Movement.prototype.respawn = function() {
    this.isDeath = !1,
    this.isForceStop = !1,
    this.characterEntity.enabled = !1,
    this.cameraEntity.enabled = !0,
    this.armsEntity.enabled = !0,
    this.gameFinished = !1,
    this.locked = !1,
    this.network.isPaused = !1,
    this.entity.sound.play("Ambient"),
    this.inControl = !1,
    this.interface.respawn(),
    this.takeControlBack(),
    this.app.fire("Player:Respawn", !0)
}
,
Movement.prototype.setDeath = function(t) {
    if (this.isDeath = !0,
    this.isForceStop = !0,
    this.killerEntity = t,
    this.currentDeathCameraPosition = this.entity.getPosition().clone(),
    this.currentDeathCameraAngles = this.cameraEntity.getEulerAngles().clone(),
    this.characterEntity.enabled = !0,
    this.characterEntity.sound.play("Male-Scream"),
    this.cameraEntity.enabled = !1,
    this.armsEntity.enabled = !1,
    this.nextDeathCameraPosition = this.deathCameraHolder.getPosition().clone(),
    this.nextDeathCameraAngles = this.deathCameraHolder.getEulerAngles().clone(),
    this.deathCameraEntity.enabled = !0,
    this.deathCameraEntity.tween(this.deathCameraEntity.getEulerAngles()).rotate({
        x: this.nextDeathCameraAngles.x,
        y: this.nextDeathCameraAngles.y,
        z: this.nextDeathCameraAngles.z
    }, 1, pc.QuarticOut).start(),
    setTimeout(function(t, e) {
        t.zoomEnemy(e)
    }, 2e3, this, t),
    setTimeout(function(t) {
        t.entity.sound.stop("Ambient"),
        t.entity.sound.play("Battle-Outro")
    }, 800, this),
    t) {
        var e = t.script.enemy;
        this.interface.showInspectator(e.username, e.skin, e.damageRegistered, e.damageGiven, e.currentWeaponName)
    }
    "capture-the-flag" == pc.currentMode && (setTimeout(function(t) {
        t.spectateEnemy()
    }, 3500, this),
    setTimeout(function(t) {
        t.respawn()
    }, 6e3, this))
}
,
Movement.prototype.getNearestAmmoPosition = function() {
    return this.itemSpawnEntity.script.itemSpawn.getNearestItem("Ammo", this.entity.getPosition().clone())
}
,
Movement.prototype.getNearestDronePosition = function() {
    var t = this.entity.getPosition().clone()
      , e = this.app.root.findByTag("Drone")
      , i = 1e3
      , s = !1;
    for (var n in e) {
        var o = e[n];
        if (o && o.enabled) {
            var a = o.getPosition().clone()
              , r = t.sub(a).length();
            i > r && (i = r,
            s = o)
        }
    }
    return s
}
,
Movement.prototype.checkTasks = function() {
    if (!this.tasks.ammo && this.tasks.takeWeapon && !this.tasks.takeAmmo) {
        var t = this.getNearestAmmoPosition().add(this.entity.getPosition());
        this.interface.showGuide("Don't forget ammo!", t),
        this.tasks.ammo = !0
    }
    if (!this.tasks.drone && this.currentDate - this.lastDroneCheck > 2e3) {
        var e = this.getNearestDronePosition();
        e && (this.interface.showGuide("Shoot drones!", e, 3e3),
        this.tasks.drone = !0),
        this.lastDroneCheck = Date.now()
    }
}
,
Movement.prototype.setExposure = function() {
    this.currentExposure = pc.math.lerp(this.currentExposure, this.nextExposure, .05),
    this.app.scene.exposure = this.currentExposure
}
,
Movement.prototype.checkHealth = function() {
    this.currentHealth < 60 ? this.deathFeeling() : (this.alreadyRevertKick = !1,
    this.nextExposure = this.defaultExposure,
    this.app.scene.ambientLight = this.ambientColor,
    this.environmentManager.sound.volume = pc.math.lerp(this.environmentManager.sound.volume, 1, .1))
}
,
Movement.prototype.deathFeeling = function() {
    this.isDeath || (this.entity.sound.slots["Revert-Kick"].isPlaying || (this.entity.sound.play("Revert-Kick"),
    this.alreadyRevertKick = !0,
    this.interface.showFeeling("breathing", 3, 1),
    this.app.fire("Player:Heal", 10)),
    this.entity.sound.slots["Fast-Breath"].isPlaying || this.entity.sound.play("Fast-Breath"),
    this.entity.sound.slots["Deep-Ambient"].isPlaying || this.entity.sound.play("Deep-Ambient"),
    this.nextExposure = 5,
    this.environmentManager.sound.volume = pc.math.lerp(this.environmentManager.sound.volume, .2, .1),
    this.app.scene.ambientLight = this.damageAmbientColor)
}
,
Movement.prototype.update = function(t) {
    if (this.setAllForces(),
    this.setCurrentDate(),
    this.setExposure(),
    this.checkHealth(),
    this.active && !this.isDeath && !this.inControl) {
        this.setMovement(),
        this.setCameraAngle(t),
        this.setFocusState(t),
        this.setCompass(),
        this.setCounters(t),
        this.setBodyPosition(),
        this.updateAnimation();
        var e = Math.max(this.currentHealth, 0);
        this.interface.setHealth(e),
        this.interface.setArmor(this.currentArmor),
        this.setHeight(),
        this.setRecoilForce(),
        this.setHeadPosition(),
        this.setParachuteKick(),
        this.setRegion(),
        this.setAmmoValues(),
        this.setThrowing(),
        this.updateDamageIndicator(),
        this.checkTasks(),
        this.setNetworkPosition()
    }
    this.active && this.inControl && (this.setMovement(),
    this.setTeleportPosition(),
    this.setCameraAngle(t),
    this.setCompass(),
    this.setCounters(t),
    this.setBodyPosition(),
    this.updateAnimation(),
    this.setHeight(),
    this.applyFallForce(),
    this.setRecoilForce(),
    this.setHeadPosition(),
    this.setFire()),
    this.active && !this.isDeath && (this.inControl || this.applyFallForce(),
    this.doRaycast(),
    this.setFire(),
    this.shotgunBullets > 0 && this.fireBullet()),
    this.isDeath,
    this.deathCameraEntity.enabled && this.setDeathCamera(),
    this.timestamp += 60 * t
}
;
var Compass = pc.createScript("compass");
Compass.attributes.add("directionElement", {
    type: "entity"
}),
Compass.attributes.add("angleElement", {
    type: "entity"
}),
Compass.attributes.add("directionWordElement", {
    type: "entity"
}),
Compass.attributes.add("poleElement", {
    type: "entity"
}),
Compass.attributes.add("poleLabelElement", {
    type: "entity"
}),
Compass.attributes.add("miniMapImage", {
    type: "entity"
}),
Compass.attributes.add("miniMapEntity", {
    type: "entity"
}),
Compass.attributes.add("baseElement", {
    type: "entity"
}),
Compass.attributes.add("angleFactor", {
    type: "number"
}),
Compass.attributes.add("widthFactor", {
    type: "number"
}),
Compass.attributes.add("currentAngle", {
    type: "number"
}),
Compass.attributes.add("mapScale", {
    type: "number"
}),
Compass.prototype.initialize = function() {
    this.currentPosition = new pc.Vec3(0,0,0);
    var t = 0;
    this.directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    for (var e = Math.floor(360 / this.widthFactor), i = 3 * e, s = -(3 * e); s < i; s++) {
        var a = Math.abs(Math.floor(10 * s % 360));
        if (this.angleElement.element.text = a + "",
        a % 45 == 0 ? (this.directionWordElement.enabled = !0,
        this.angleElement.enabled = !0,
        this.directionWordElement.element.text = this.directions[t % this.directions.length],
        t += 2) : (this.angleElement.enabled = !1,
        this.directionWordElement.enabled = !1),
        a % 10 == 0) {
            var n = this.directionElement.clone()
              , r = s * this.widthFactor;
            n.setLocalPosition(r, 0, 0),
            n.enabled = !0,
            this.baseElement.addChild(n)
        }
    }
}
,
Compass.prototype.update = function(t) {
    this.baseElement.setLocalPosition(this.currentAngle * this.angleFactor - 110, 0, 0),
    this.poleElement.setLocalEulerAngles(0, 0, -this.currentAngle),
    this.poleLabelElement.setLocalEulerAngles(0, 0, this.currentAngle),
    this.miniMapImage.setLocalEulerAngles(0, 0, -this.currentAngle),
    this.miniMapImage.element.pivot = new pc.Vec2(this.currentPosition.x * this.mapScale,-this.currentPosition.z * this.mapScale),
    this.miniMapEntity && this.miniMapEntity.setLocalEulerAngles(0, 0, this.currentAngle)
}
;
var variable = {
    FPS: 60
};
var Vehicle = pc.createScript("vehicle");
Vehicle.attributes.add("topSpeed", {
    type: "number",
    default: 10,
    title: "Top Speed"
}),
Vehicle.attributes.add("maxEngineForce", {
    type: "number",
    default: 1e3,
    title: "Max Engine Force"
}),
Vehicle.attributes.add("maxBrakingForce", {
    type: "number",
    default: 30,
    title: "Max Braking Force"
}),
Vehicle.attributes.add("maxSteering", {
    type: "number",
    default: .2,
    title: "Max Steering"
}),
Vehicle.attributes.add("suspensionStiffness", {
    type: "number",
    default: 20,
    title: "Suspension Stiffness"
}),
Vehicle.attributes.add("suspensionDamping", {
    type: "number",
    default: 2.3,
    title: "Suspension Damping"
}),
Vehicle.attributes.add("suspensionCompression", {
    type: "number",
    default: 4.4,
    title: "Suspension Compression"
}),
Vehicle.attributes.add("suspensionRestLength", {
    type: "number",
    default: .6,
    title: "Suspension Rest Length"
}),
Vehicle.attributes.add("rollInfluence", {
    type: "number",
    default: 2,
    title: "Roll Influence"
}),
Vehicle.attributes.add("friction", {
    type: "number",
    default: 1e3,
    title: "Friction Slip"
}),
Vehicle.attributes.add("wheelFrontLeft", {
    type: "entity"
}),
Vehicle.attributes.add("wheelFrontRight", {
    type: "entity"
}),
Vehicle.attributes.add("wheelBackLeft", {
    type: "entity"
}),
Vehicle.attributes.add("wheelBackRight", {
    type: "entity"
}),
Vehicle.attributes.add("chassisEntity", {
    type: "entity"
}),
Vehicle.attributes.add("playerEntity", {
    type: "entity"
}),
Vehicle.attributes.add("leavePoint", {
    type: "entity"
}),
Vehicle.attributes.add("facePoint", {
    type: "entity"
}),
Vehicle.attributes.add("interfaceEntity", {
    type: "entity"
}),
Vehicle.attributes.add("exhaustParticle", {
    type: "entity"
}),
Vehicle.attributes.add("wheelFactor", {
    type: "number"
}),
Vehicle.prototype.initialize = function() {
    this.engineForce = 0,
    this.brakingForce = 0,
    this.vehicleSteering = 0,
    this.gasLevel = 1,
    this.engineJumpLevel = 1,
    this.enginePedalLevel = 0,
    this.currentVites = 0,
    this.emissionLevel = 0,
    this.currentVitesLevel = 0,
    this.wheels = [],
    this.wheelsConfig = [],
    this.camera = null,
    this.chassis = this.entity,
    this.currentSpeed = 0,
    this.trans = new Ammo.btTransform,
    this.quat = new pc.Quat,
    this.pos = new pc.Vec3,
    this.mat = new pc.Mat4,
    this.initialRot = this.entity.getRotation().clone(),
    this.initialPos = this.entity.getPosition().clone(),
    this.direction = new pc.Vec3,
    this.chassisAngles = new pc.Vec3(0,0,0),
    this.isEngineActive = !0,
    this.active = !1,
    this.playerLeaved = !1,
    this.leaveCompleted = !1,
    this.leaveTime = 0,
    this.timestamp = 0,
    this.engineActivation = 0;
    this.on("attr", this.onAttributeChanged),
    this.regions = this.entity.root.findByTag("Region")
}
,
Vehicle.prototype.addWheel = function(e, t, i, s) {
    var n = e.getLocalPosition().clone();
    this.wheelsConfig[s] = {
        isFront: i,
        connection: [n.x, n.y, n.z],
        radius: .05,
        width: .05,
        name: t
    },
    this.wheels[s] = e
}
,
Vehicle.prototype.setWheels = function() {
    this.ammoVec = new Ammo.btVector3,
    this.wheelDirection = new Ammo.btVector3(0,-1,0),
    this.wheelAxle = new Ammo.btVector3(-1,0,0);
    this.addWheel(this.wheelFrontLeft, "SM_Veh_Muscle_Wheel_fl", !0, 0),
    this.addWheel(this.wheelFrontRight, "SM_Veh_Muscle_Wheel_fr", !0, 1),
    this.addWheel(this.wheelBackLeft, "SM_Veh_Muscle_Wheel_rl", !1, 2),
    this.addWheel(this.wheelBackRight, "SM_Veh_Muscle_Wheel_rr", !1, 3)
}
,
Vehicle.prototype.getEntityCompound = function() {
    return this.entity.script.compound.rigidbody
}
,
Vehicle.prototype.localCreateRigidBody = function(e, t, i) {
    var s = new Ammo.btVector3(0,0,0);
    e > 0 && i.calculateLocalInertia(e, s);
    var n = new Ammo.btDefaultMotionState(t)
      , h = new Ammo.btRigidBodyConstructionInfo(e,n,i,s)
      , a = new Ammo.btRigidBody(h);
    return a.setContactProcessingThreshold(1e6),
    this.app.systems.rigidbody.dynamicsWorld.addRigidBody(a),
    a
}
,
Vehicle.prototype.reset = function() {
    var e = this.entity.getPosition().clone();
    this.initialPos.x = e.x,
    this.initialPos.y = e.y,
    this.initialPos.z = e.z;
    var t = this.entity.getRotation().clone();
    this.initialRot.x = t.x,
    this.initialRot.y = t.y,
    this.initialRot.z = t.z,
    this.initialRot.w = t.w;
    var i = this.carChassis
      , s = i.getWorldTransform();
    s.setOrigin(new Ammo.btVector3(this.initialPos.x,this.initialPos.y,this.initialPos.z)),
    s.setRotation(new Ammo.btQuaternion(this.initialRot.x,this.initialRot.y,this.initialRot.z,this.initialRot.w)),
    i.setLinearVelocity(new Ammo.btVector3(0,0,0)),
    i.setAngularVelocity(new Ammo.btVector3(0,0,0))
}
,
Vehicle.prototype.start = function() {
    var e, t = this.app;
    this.active = !0;
    var i = new Ammo.btBoxShape(new Ammo.btVector3(1,.5,3.5))
      , s = new Ammo.btTransform;
    s.setIdentity(),
    s.setOrigin(new Ammo.btVector3(0,1,0));
    var n = new Ammo.btCompoundShape;
    n.addChildShape(s, i);
    var h = new Ammo.btTransform;
    h.setIdentity();
    var a = this.entity.getPosition();
    h.setOrigin(new Ammo.btVector3(a.x,a.y,a.z)),
    this.carChassis = this.localCreateRigidBody(100, h, n),
    this.carChassis.entity = this.entity;
    var o = new Ammo.btVehicleTuning
      , r = new Ammo.btDefaultVehicleRaycaster(t.systems.rigidbody.dynamicsWorld);
    this.vehicle = new Ammo.btRaycastVehicle(o,this.carChassis,r),
    this.carChassis.setActivationState(pc.RIGIDBODY_DISABLE_DEACTIVATION),
    t.systems.rigidbody.dynamicsWorld.addAction(this.vehicle);
    this.vehicle.setCoordinateSystem(0, 1, 2),
    this.setWheels();
    this.entity.name;
    var l, c = this.wheelsConfig.length;
    for (e = 0; e < c; e++) {
        l = this.wheelsConfig[e];
        var d = new Ammo.btVector3(l.connection[0],l.connection[1],l.connection[2]);
        this.vehicle.addWheel(d, this.wheelDirection, this.wheelAxle, this.suspensionRestLength, l.radius, o, l.isFront)
    }
    for (e = 0; e < this.vehicle.getNumWheels(); e++)
        (l = this.vehicle.getWheelInfo(e)).set_m_suspensionStiffness(this.suspensionStiffness),
        l.set_m_wheelsDampingRelaxation(this.suspensionDamping),
        l.set_m_wheelsDampingCompression(this.suspensionCompression),
        l.set_m_frictionSlip(this.friction),
        l.set_m_rollInfluence(this.rollInfluence);
    this.reset(),
    this.entity.collision.enabled = !1,
    this.entity.rigidbody.enabled = !1,
    this.isEngineActive = !0,
    this.entity.sound.play("EngineStart"),
    this.engineActivation = 50,
    this.interface = this.app.root.findByName("Overlay").script.interface,
    this.exhaustParticle.particlesystem.play(),
    this.playerLeaved = !1,
    this.leaveCompleted = !1,
    this.leaveTime = 0
}
,
Vehicle.prototype.setSoundPitch = function() {
    var e = Math.cos(this.timestamp) * this.enginePedalLevel * 2 + 5 * this.vehicleSteering
      , t = Math.random();
    if (this.engineActivation > 20 && this.engineActivation <= 21 && t > .5 && (this.engineActivation = 50,
    this.entity.sound.stop("EngineStart"),
    this.entity.sound.play("EngineStart")),
    this.engineActivation > 0 && (e += 2 * Math.cos(this.timestamp)),
    0 === this.engineActivation && (this.entity.sound.play("EnginePedal"),
    this.entity.sound.play("Idle")),
    this.engineActivation < 0) {
        var i = this.currentSpeed / 80
          , s = this.currentSpeed / 80;
        s += .5;
        var n = this.enginePedalLevel;
        n = Math.min(n, 2),
        this.entity.sound.slots.Idle && (this.entity.sound.slots.Idle.pitch = s + n + 2 * this.currentVites + .2),
        this.entity.sound.slots.EnginePedal && (this.entity.sound.slots.EnginePedal.pitch = .5 * s + n + this.currentVites + .5,
        this.entity.sound.slots.EnginePedal.volume = n + this.currentVites + .5),
        this.engineJumpLevel = pc.math.lerp(this.engineJumpLevel, 1, .1),
        this.enginePedalLevel = pc.math.lerp(this.enginePedalLevel, .1, .1),
        i > .25 && this.currentVites < .2 && (this.currentVites += .05),
        i > .1 && (this.enginePedalLevel = pc.math.lerp(this.enginePedalLevel, .1, .1)),
        i < .02 && (this.currentVites = 0,
        this.currentVitesLevel = -1),
        i > .02 && -1 === this.currentVitesLevel && (this.entity.sound.play("Cogs"),
        this.currentVitesLevel = 0,
        e += 12),
        i > .1 && 0 === this.currentVitesLevel && (this.entity.sound.play("Cogs"),
        this.currentVitesLevel = 1,
        e += 12),
        i > .2 && 1 === this.currentVitesLevel && (this.entity.sound.play("Cogs"),
        this.currentVitesLevel = 2,
        e += 12),
        this.emissionLevel = pc.math.lerp(this.emissionLevel, .5, .1),
        this.exhaustParticle.setLocalScale(this.emissionLevel, this.emissionLevel, this.emissionLevel),
        this.chassisAngles.x = pc.math.lerp(this.chassisAngles.x, 4 * -this.enginePedalLevel, .1)
    }
    this.chassisAngles.z = pc.math.lerp(this.chassisAngles.z, e, .1),
    this.timestamp++,
    this.engineActivation--
}
,
Vehicle.prototype.gasAccelerate = function() {
    this.currentVites < 1 && (this.enginePedalLevel += .05),
    this.engineJumpLevel += .05,
    this.enginePedalLevel += .05,
    this.engineJumpLevel > 1.15 && (this.engineJumpLevel = 1),
    this.emissionLevel < 1.5 && (this.emissionLevel += .1),
    this.entity.sound.slots.EngineJump.pitch = this.engineJumpLevel
}
,
Vehicle.prototype.setRegion = function() {
    var e = 1e3
      , t = "Unknown";
    for (var i in this.regions) {
        var s = this.regions[i]
          , n = s.getPosition().clone().sub(this.entity.getPosition().clone()).length();
        n < e && (t = s.name,
        e = n)
    }
    this.interface.setRegionName(t)
}
,
Vehicle.prototype.stop = function() {
    this.active = !1,
    this.app.systems.rigidbody.dynamicsWorld.removeAction(this.vehicle),
    this.app.systems.rigidbody.dynamicsWorld.removeRigidBody(this.carChassis),
    this.entity.collision.enabled = !0,
    this.entity.rigidbody.enabled = !0,
    this.isEngineActive = !1,
    this.playerLeaved = !0,
    this.entity.sound.stop("EngineStart"),
    this.entity.sound.stop("EnginePedal"),
    this.entity.sound.stop("Idle"),
    this.exhaustParticle.particlesystem.stop(),
    this.entity.script.interactive.isAvailable = !0,
    this.entity.script.interactive.updateCollisionShape()
}
,
Vehicle.prototype.leave = function() {
    this.currentSpeed < 1 ? (this.camera.script.camera.focusPosition = this.leavePoint.getPosition().clone(),
    this.camera.script.camera.facePoint = this.facePoint.getPosition().clone(),
    this.camera.script.camera.vehicle = !1,
    this.playerLeaved = !0,
    this.leaveTime = 20) : this.interface.showAlert("Stop car first")
}
,
Vehicle.prototype.leaveComplete = function() {
    this.entity.script.interactive.isAvailable = !0,
    this.playerEntity.enabled = !0,
    this.playerEntity.script.movement.leaveCar(this.leavePoint),
    this.ammoVec = new Ammo.btVector3,
    this.ammoVec.setValue(0, 0, 0),
    this.vehicle.getRigidBody().setLinearVelocity(this.ammoVec),
    this.leaveCompleted = !0
}
,
Vehicle.prototype.onAttributeChanged = function() {
    if (this.vehicle)
        for (var e = 0; e < this.vehicle.getNumWheels(); e++)
            ;
}
,
Vehicle.prototype.update = function(e) {
    var t, i = this.app;
    if (!this.vehicle.getRigidBody())
        return !1;
    this.playerLeaved && this.leaveTime < 0 && !this.leaveCompleted && this.leaveComplete(),
    this.playerLeaved && this.leaveTime--;
    var s = this.vehicle.getRigidBody().getLinearVelocity();
    if (this.leaveCompleted && this.playerLeaved && s.length() < .5 && this.isEngineActive && this.active && this.stop(),
    this.isEngineActive && this.active && !this.playerLeaved && this.engineActivation < 0) {
        var n = this.topSpeed;
        if (s.length() > n) {
            var h = Math.abs(s.length() / n);
            this.ammoVec.setValue(s.x() / h, s.y() / h, s.z() / h),
            this.vehicle.getRigidBody().setLinearVelocity(this.ammoVec)
        }
        this.currentSpeed = s.length(),
        this.direction.set(s.x(), s.y(), s.z()).normalize();
        var a = i.keyboard.isPressed(pc.KEY_A) || i.keyboard.isPressed(pc.KEY_LEFT)
          , o = i.keyboard.isPressed(pc.KEY_D) || i.keyboard.isPressed(pc.KEY_RIGHT)
          , r = i.keyboard.isPressed(pc.KEY_W) || i.keyboard.isPressed(pc.KEY_UP)
          , l = i.keyboard.isPressed(pc.KEY_S) || i.keyboard.isPressed(pc.KEY_DOWN)
          , c = this.maxSteering;
        c /= this.currentSpeed + 1,
        this.vehicleSteering = a && o ? 0 : a ? pc.math.lerp(this.vehicleSteering, c, .05) : o ? pc.math.lerp(this.vehicleSteering, -c, .05) : 0,
        (this.app.keyboard.wasPressed(pc.KEY_F) || this.app.keyboard.wasPressed(pc.KEY_ENTER)) && this.leave(),
        this.app.keyboard.wasPressed(pc.KEY_H) && (this.entity.sound.slots.Horn.isPlaying || this.entity.sound.play("Horn")),
        this.app.keyboard.wasReleased(pc.KEY_H) && this.entity.sound.slots.Horn.isPlaying && this.entity.sound.stop("Horn"),
        r && l ? this.engineForce = this.brakingForce = 0 : r ? (this.direction.dot(this.entity.forward) > 0 ? (this.brakingForce = this.maxBrakingForce,
        this.engineForce = 0) : (this.brakingForce = 0,
        this.engineForce = this.maxEngineForce),
        this.gasAccelerate(this.engineForce)) : l ? this.direction.dot(this.entity.forward) < 0 ? (this.brakingForce = this.maxBrakingForce,
        this.engineForce = 0) : (this.brakingForce = 0,
        this.engineForce = -this.maxEngineForce) : this.engineForce = this.brakingForce = 0,
        this.vehicle.setSteeringValue(this.vehicleSteering, 0),
        this.vehicle.setSteeringValue(this.vehicleSteering, 1),
        this.vehicle.applyEngineForce(this.engineForce, 2),
        this.vehicle.setBrake(this.brakingForce, 2),
        this.vehicle.applyEngineForce(this.engineForce, 3),
        this.vehicle.setBrake(this.brakingForce, 3)
    }
    if (this.isEngineActive) {
        for (t = 0; t < this.vehicle.getNumWheels(); t++)
            this.vehicle.updateWheelTransform(t, !0);
        this.carChassis.getMotionState().getWorldTransform(this.trans);
        var d = this.trans
          , p = d.getOrigin()
          , y = d.getRotation();
        for (this.quat.set(y.x(), y.y(), y.z(), y.w()),
        this.entity.setPosition(p.x(), p.y(), p.z()),
        this.entity.setRotation(this.quat),
        this.chassisEntity.setLocalEulerAngles(this.chassisAngles),
        this.mat.copy(this.entity.getWorldTransform()),
        this.mat.invert(),
        t = 0; t < this.vehicle.getNumWheels(); t++) {
            p = (d = this.vehicle.getWheelTransformWS(t)).getOrigin(),
            y = d.getRotation(),
            this.pos.set(p.x(), p.y(), p.z()),
            this.quat.set(y.x(), y.y(), y.z(), y.w());
            var g = this.quat.getEulerAngles();
            if (this.wheels[t]) {
                this.pos.sub(this.entity.getPosition().clone());
                var m = this.wheels[t].getLocalPosition().clone();
                this.wheels[t].setLocalPosition(m.x, this.pos.y + .35, m.z),
                this.wheels[t].setEulerAngles(g.x * this.wheelFactor, g.y, g.z)
            }
        }
        this.setSoundPitch(),
        this.setRegion()
    }
}
;
var Camera = pc.createScript("camera");
Camera.attributes.add("maxDistance", {
    type: "number",
    default: 20
}),
Camera.attributes.add("minElevation", {
    type: "number",
    default: 5
}),
Camera.attributes.add("maxElevation", {
    type: "number",
    default: 75
}),
Camera.attributes.add("vehicle", {
    type: "entity"
}),
Camera.attributes.add("compassEntity", {
    type: "entity"
}),
Camera.prototype.initialize = function() {
    this.focusPosition = new pc.Vec3(0,0,0),
    this.facePoint = new pc.Vec3(0,0,0),
    this.desiredPos = new pc.Vec3,
    this.desiredPitch = 20,
    this.desiredYaw = 0,
    this.desiredDistance = 10,
    this.speed = 10,
    this.pitch = new pc.Quat,
    this.yaw = new pc.Quat,
    this.quat = new pc.Quat,
    this.app.mouse.on("mousemove", this.onMouseMove, this)
}
,
Camera.prototype.update = function(t) {
    var e = this.focusPosition
      , i = this.facePoint
      , s = !1;
    if (this.vehicle) {
        e = this.vehicle.getPosition();
        var a = this.vehicle.forward;
        a.y = 0,
        a.normalize(),
        this.pitch.setFromAxisAngle(this.entity.right, -this.desiredPitch),
        this.yaw.setFromAxisAngle(pc.Vec3.UP, this.desiredYaw),
        this.quat.mul2(this.pitch, this.yaw).transformVector(a, a),
        this.desiredPos.add2(e, a.scale(this.desiredDistance)),
        i = e,
        s = this.desiredPos
    } else
        this.desiredPos = e,
        (s = this.entity.getPosition()).lerp(s, this.desiredPos, t * this.speed);
    s && (this.entity.setPosition(s),
    this.entity.lookAt(i),
    this.setCompass())
}
,
Camera.prototype.setCompass = function() {
    if (!this.vehicle)
        return !1;
    var t = this.vehicle.getEulerAngles().y;
    this.compassEntity.script.compass.currentAngle = t + (this.desiredYaw + 180) % 360
}
,
Camera.prototype.onMouseMove = function(t) {
    pc.Mouse.isPointerLocked() && this.vehicle && (this.desiredPitch += .1 * t.dy,
    this.desiredYaw -= .1 * t.dx,
    this.desiredPitch = Math.min(this.desiredPitch, 90),
    this.desiredPitch = Math.max(this.desiredPitch, -90))
}
;
var Interface = pc.createScript("interface");
Interface.attributes.add("cameraEntity", {
    type: "entity"
}),
Interface.attributes.add("ammoElement", {
    type: "entity"
}),
Interface.attributes.add("clipElement", {
    type: "entity"
}),
Interface.attributes.add("grenadeCountElement", {
    type: "entity"
}),
Interface.attributes.add("healthElement", {
    type: "entity"
}),
Interface.attributes.add("armorElement", {
    type: "entity"
}),
Interface.attributes.add("healthBar", {
    type: "entity"
}),
Interface.attributes.add("armorBar", {
    type: "entity"
}),
Interface.attributes.add("inspectElement", {
    type: "entity"
}),
Interface.attributes.add("actionElement", {
    type: "entity"
}),
Interface.attributes.add("regionElement", {
    type: "entity"
}),
Interface.attributes.add("timeElement", {
    type: "entity"
}),
Interface.attributes.add("aliveCountElement", {
    type: "entity"
}),
Interface.attributes.add("inventoryElement", {
    type: "entity"
}),
Interface.attributes.add("inventoryMessageElement", {
    type: "entity"
}),
Interface.attributes.add("alertElement", {
    type: "entity"
}),
Interface.attributes.add("alertIcon", {
    type: "entity"
}),
Interface.attributes.add("alertMessageElement", {
    type: "entity"
}),
Interface.attributes.add("notificationElement", {
    type: "entity"
}),
Interface.attributes.add("notificationKillMessage", {
    type: "entity"
}),
Interface.attributes.add("notificationPoisionMessage", {
    type: "entity"
}),
Interface.attributes.add("notificationUserMessage", {
    type: "entity"
}),
Interface.attributes.add("notificationLimit", {
    type: "number"
}),
Interface.attributes.add("notificationFadeOutTime", {
    type: "number"
}),
Interface.attributes.add("fullSizeMapElement", {
    type: "entity"
}),
Interface.attributes.add("victoryElement", {
    type: "entity"
}),
Interface.attributes.add("crosshairElement", {
    type: "entity"
}),
Interface.attributes.add("scopeElement", {
    type: "entity"
}),
Interface.attributes.add("skullElement", {
    type: "entity"
}),
Interface.attributes.add("damageIndicatorElement", {
    type: "entity"
}),
Interface.attributes.add("ricochetTraceElement", {
    type: "entity"
}),
Interface.attributes.add("reloadingElement", {
    type: "entity"
}),
Interface.attributes.add("reloadingBar", {
    type: "entity"
}),
Interface.attributes.add("administeringElement", {
    type: "entity"
}),
Interface.attributes.add("administeringBar", {
    type: "entity"
}),
Interface.attributes.add("throwingBarElement", {
    type: "entity"
}),
Interface.attributes.add("throwingBar", {
    type: "entity"
}),
Interface.attributes.add("knifeBackground", {
    type: "entity"
}),
Interface.attributes.add("grenadeBackground", {
    type: "entity"
}),
Interface.attributes.add("damageFeeling", {
    type: "entity"
}),
Interface.attributes.add("breathingFeeling", {
    type: "entity"
}),
Interface.attributes.add("healingFeeling", {
    type: "entity"
}),
Interface.attributes.add("shortcutInventoryGroup", {
    type: "entity"
}),
Interface.attributes.add("ammoGroup", {
    type: "entity"
}),
Interface.attributes.add("playerEntity", {
    type: "entity"
}),
Interface.attributes.add("itemManagerEntity", {
    type: "entity"
}),
Interface.attributes.add("playerManagerEntity", {
    type: "entity"
}),
Interface.attributes.add("screenSizeElements", {
    type: "entity",
    array: !0
}),
Interface.attributes.add("gameplayElements", {
    type: "entity",
    array: !0
}),
Interface.attributes.add("desktopElements", {
    type: "entity",
    array: !0
}),
Interface.attributes.add("mobileElements", {
    type: "entity",
    array: !0
}),
Interface.attributes.add("chatElement", {
    type: "entity"
}),
Interface.attributes.add("evacuateMessageElement", {
    type: "entity"
}),
Interface.attributes.add("evacuateEntity", {
    type: "entity"
}),
Interface.attributes.add("evacuateSecondsElement", {
    type: "entity"
}),
Interface.attributes.add("inspectorElement", {
    type: "entity"
}),
Interface.attributes.add("inspectorUsernameElement", {
    type: "entity"
}),
Interface.attributes.add("inspectorProfilePictureElement", {
    type: "entity"
}),
Interface.attributes.add("inspectorDamageGivenElement", {
    type: "entity"
}),
Interface.attributes.add("inspectorDamageTakenElement", {
    type: "entity"
}),
Interface.attributes.add("inspectorWeaponNameElement", {
    type: "entity"
}),
Interface.attributes.add("inspectorWeaponIconElement", {
    type: "entity"
}),
Interface.attributes.add("killPointScore", {
    type: "entity"
}),
Interface.attributes.add("killPointLabel", {
    type: "entity"
}),
Interface.attributes.add("killPointElement", {
    type: "entity"
}),
Interface.attributes.add("killPointShine", {
    type: "entity"
}),
Interface.attributes.add("experiencePointElement", {
    type: "entity"
}),
Interface.attributes.add("experiencePointText", {
    type: "entity"
}),
Interface.attributes.add("spectatingYouElement", {
    type: "entity"
}),
Interface.attributes.add("spectatingYouText", {
    type: "entity"
}),
Interface.attributes.add("hitPointsWrapper", {
    type: "entity"
}),
Interface.attributes.add("hitPoint", {
    type: "entity"
}),
Interface.attributes.add("guideEntity", {
    type: "entity"
}),
Interface.attributes.add("guideOrigin", {
    type: "entity"
}),
Interface.attributes.add("guideArrow", {
    type: "entity"
}),
Interface.attributes.add("guideTextElement", {
    type: "entity"
}),
Interface.attributes.add("resultsEntity", {
    type: "entity"
}),
Interface.attributes.add("resultsMessages", {
    type: "entity"
}),
Interface.attributes.add("resultsKilledElement", {
    type: "entity"
}),
Interface.attributes.add("resultsGameTimeElement", {
    type: "entity"
}),
Interface.attributes.add("resultsDamageTakenElement", {
    type: "entity"
}),
Interface.attributes.add("resultsDamageGivenElement", {
    type: "entity"
}),
Interface.attributes.add("resultsBulletFiredElement", {
    type: "entity"
}),
Interface.attributes.add("resultsHeadshotsElement", {
    type: "entity"
}),
Interface.attributes.add("resultsRankElement", {
    type: "entity"
}),
Interface.attributes.add("resultsRankStateElement", {
    type: "entity"
}),
Interface.attributes.add("resultsKilledPlayers", {
    type: "entity"
}),
Interface.attributes.add("resultsKilledRow", {
    type: "entity"
}),
Interface.attributes.add("resultsExperienceBar", {
    type: "entity"
}),
Interface.attributes.add("resultsSpectateButton", {
    type: "entity"
}),
Interface.attributes.add("resultsPlayButton", {
    type: "entity"
}),
Interface.attributes.add("transitionEntity", {
    type: "entity"
}),
Interface.attributes.add("experienceValue", {
    type: "entity"
}),
Interface.attributes.add("killPointValue", {
    type: "entity"
}),
Interface.attributes.add("timePointValue", {
    type: "entity"
}),
Interface.attributes.add("coinValue", {
    type: "entity"
}),
Interface.attributes.add("experienceBarElement", {
    type: "entity"
}),
Interface.attributes.add("signupCTA", {
    type: "entity"
}),
Interface.attributes.add("throwableIcon", {
    type: "entity"
}),
Interface.attributes.add("caseHealthBar", {
    type: "entity"
}),
Interface.attributes.add("caseHealthEntity", {
    type: "entity"
}),
Interface.attributes.add("reportQuestionElement", {
    type: "entity"
}),
Interface.attributes.add("reportedElement", {
    type: "entity"
}),
Interface.attributes.add("grenadeIcon", {
    type: "asset",
    assetType: "sprite"
}),
Interface.attributes.add("smokeIcon", {
    type: "asset",
    assetType: "sprite"
}),
Interface.attributes.add("bombIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.attributes.add("lastStandIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.attributes.add("bagIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.attributes.add("needleIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.attributes.add("Ammo-5_56mmIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.attributes.add("Ammo-7_62mmIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.attributes.add("Ammo-45ACPIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.attributes.add("Ammo-12_GaugeIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.attributes.add("Ammo-9mmIcon", {
    type: "asset",
    assetType: "texture"
}),
Interface.prototype.initialize = function() {
    this.isInventoryEnabled = !1,
    this.nextFrameInventory = !1,
    this.lastGuidePosition = !1,
    this.lastHintPlay = Date.now(),
    this.caseEntity = !1,
    this.inEvacuate = !1,
    this.spectateTimer = !1,
    this.inspectorName = !1,
    this.userReported = !1,
    this.showDuelIcon = !1,
    this.gameFinished = !1,
    this.setInventoryVisibility(),
    this.alertTimer = !1,
    this.notificationIndex = 0,
    this.isCounting = -1,
    this.killedPlayers = [],
    this.currentHealth = 0,
    this.currentAmmo = 0,
    this.app.on("Player:Kill", this.onPlayerKill.bind(this), !0),
    this.app.on("Player:Point", this.onPlayerKillPoint.bind(this), !0),
    this.app.on("Player:Warn", this.setWarn.bind(this), this),
    this.app.on("Enemy:Create", this.onPlayerCreate.bind(this), !0),
    this.app.on("Hitmarker:Set", this.addHitPoint.bind(this), !0),
    this.app.on("Event:Circle", this.startCircleEvent.bind(this), this),
    this.app.on("Event:Disconnect", this.eventFinish.bind(this), this),
    this.app.on("Case:Health", this.showCaseHealth.bind(this), this),
    this.app.on("Event:Victory", this.showVictory.bind(this), this),
    this.app.keyboard.on("keydown", this.keyDown.bind(this), !0),
    this.notificationStayTime = 1.2,
    this.time = 300,
    this.totalPlayerCount = 1,
    this.lastScreenSizeUpdate = Date.now(),
    this.character = this.playerEntity.script.movement,
    this.inventory = this.inventoryElement.script.inventory,
    this.playerManager = this.playerManagerEntity.script.playerManager,
    setInterval(function(e) {
        e.time--,
        e.setTime(),
        e.checkAliveCount()
    }, 1e3, this),
    this.damageIndicatorElement.enabled = !0,
    this.itemManager = this.itemManagerEntity.script.itemSpawn,
    document.body.oncontextmenu = function() {
        return !1
    }
    ,
    void 0 !== pc.hash && (this.signupCTA.enabled = !1),
    Utils.isMobile() ? this.hideDesktopElements() : this.hideMobileElements()
}
,
Interface.prototype.hideDesktopElements = function() {
    for (var e = this.desktopElements.length; e--; )
        this.desktopElements[e] && (this.desktopElements[e].enabled = !1)
}
,
Interface.prototype.hideMobileElements = function() {
    for (var e = this.mobileElements.length; e--; )
        this.mobileElements[e] && (this.mobileElements[e].enabled = !1)
}
,
Interface.prototype.setWarn = function(e, t) {
    "evacuate" == e && (!0 === t && this.inEvacuate ? this.evacuateEntity.enabled = t : this.evacuateEntity.enabled = !1)
}
,
Interface.prototype.startCircleEvent = function() {
    this.showAlert("Zone guaranteed! Stay away from chemical!", "error", "bomb", 5e3)
}
,
Interface.prototype.showEvacuateMessage = function() {
    this.evacuateMessageElement.enabled = !0,
    setTimeout(function(e) {
        e.evacuateMessageElement.enabled = !1
    }, 3e3, this)
}
,
Interface.prototype.keyDown = function(e) {
    9 == e.key && e.event.preventDefault()
}
,
Interface.prototype.eventFinish = function() {
    this.resultsSpectateButton.enabled = !1
}
,
Interface.prototype.showSpectatingYou = function() {
    var e = 4e3 + Math.floor(8e3 * Math.random());
    this.spectatingYouElement.enabled = !0,
    setTimeout(function(e) {
        e.spectatingYouElement.enabled = !1
    }, e, this)
}
,
Interface.prototype.showVictory = function() {
    this.hideGameplayElements(),
    this.chatElement.enabled = !1,
    this.victoryElement.enabled = !0
}
,
Interface.prototype.showCaseHealth = function(e) {
    this.caseEntity = e,
    this.caseHealthEntity.enabled = !0,
    clearTimeout(this.caseHealthTimer),
    this.caseHealthTimer = setTimeout(function(e) {
        e.hideCaseHealth()
    }, 1e3, this)
}
,
Interface.prototype.hideCaseHealth = function() {
    this.caseEntity = !1,
    this.caseHealthEntity.enabled = !1
}
,
Interface.prototype.setCaseHealthPosition = function() {
    if (this.gameFinished)
        return this.hideCaseHealth(),
        !1;
    if (!1 !== this.caseEntity && this.caseEntity.enabled) {
        var e = this.caseEntity.getPosition().clone()
          , t = new pc.Vec3;
        this.cameraEntity.camera.worldToScreen(e, t);
        var i = this.guideEntity.element.screen.screen.scale
          , n = this.app.graphicsDevice
          , a = this.caseEntity.health / this.caseEntity.maxHealth
          , s = !0;
        this.caseEntity.originalModel && this.caseEntity.originalModel.enabled && this.caseEntity.originalModel.model && this.caseEntity.originalModel.model.meshInstances.length > 0 && (s = this.caseEntity.originalModel.model.meshInstances[0].visibleThisFrame),
        t.x > 0 && t.x < this.app.graphicsDevice.width && t.y > 0 && t.y < this.app.graphicsDevice.height && t.z > 0 && a > 0 && s ? (this.caseHealthBar.setLocalScale(a, 1, 1),
        this.caseHealthEntity.setLocalPosition(t.x / i, (n.height - t.y) / i, 0),
        Date.now() - this.lastHintPlay > 8e3 && (this.entity.sound.play("Hint"),
        this.lastHintPlay = Date.now())) : this.hideCaseHealth()
    } else
        this.hideCaseHealth()
}
,
Interface.prototype.switchMode = function(e) {
    "Car" == e ? (this.crosshairElement.enabled = !1,
    this.scopeElement.enabled = !1,
    this.shortcutInventoryGroup.enabled = !1,
    this.ammoGroup.enabled = !1) : (this.crosshairElement.enabled = !0,
    this.scopeElement.enabled = !0,
    this.shortcutInventoryGroup.enabled = !0,
    this.ammoGroup.enabled = !0)
}
,
Interface.prototype.addFriend = function() {
    var e = this.inspectorName;
    this.inspectorName && "Guest" != this.inspectorName && "guest" != this.inspectorName && void 0 !== pc.hash && Service.post("add_friend", {
        user_hash: pc.hash,
        friend_username: e
    }, function(e) {
        e.success
    })
}
,
Interface.prototype.reportUser = function() {
    var e = this
      , t = this.inspectorName;
    this.inspectorName && "Guest" != this.inspectorName && "guest" != this.inspectorName && Service.post("report_user", {
        username: t
    }, function(t) {
        t.success && (e.reportedElement.element.text = "User has been reported! Report code : " + t.code)
    })
}
,
Interface.prototype.setThrowableIcon = function() {
    var e = this.inventory.getActiveGrenade();
    "Explosion" == e ? this.throwableIcon.element.spriteAsset = this.grenadeIcon : "Smoke" == e && (this.throwableIcon.element.spriteAsset = this.smokeIcon)
}
,
Interface.prototype.addHitPoint = function(e, t) {
    pc.math.random(-10, 10);
    t && this.entity.sound.play("Headshot")
}
,
Interface.prototype.showGuide = function(e, t, i) {
    var n = this
      , a = 1500;
    i > 0 && (a = i),
    this.guideEntity.enabled = !0,
    this.guideTextElement.element.text = e,
    this.lastGuidePosition = t,
    this.entity.sound.play("Hint"),
    setTimeout(function() {
        n.lastGuidePosition = !1,
        n.guideEntity.enabled = !1
    }, a)
}
,
Interface.prototype.hideGuide = function() {
    this.guideEntity.enabled = !1
}
,
Interface.prototype.setGuidePosition = function() {
    if (this.gameFinished)
        return this.hideGuide(),
        !1;
    if (!1 !== this.lastGuidePosition) {
        var e = this.lastGuidePosition;
        void 0 !== this.lastGuidePosition.name && (e = this.lastGuidePosition.getPosition().clone());
        var t = new pc.Vec3;
        this.cameraEntity.camera.worldToScreen(e, t);
        var i = this.guideEntity.element.screen.screen.scale
          , n = this.app.graphicsDevice;
        t.x > 0 && t.x < this.app.graphicsDevice.width && t.y > 0 && t.y < this.app.graphicsDevice.height && t.z > 0 ? this.guideEntity.setLocalPosition(t.x / i, (n.height - t.y) / i, 0) : this.hideGuide()
    }
}
,
Interface.prototype.playAgain = function() {
    window.location.reload()
}
,
Interface.prototype.spectate = function() {
    this.resultsEntity.enabled = !1,
    this.inspectorElement.enabled = !0,
    this.setSpectateTimer()
}
,
Interface.prototype.setPlayAgain = function() {
    this.isCounting > 0 && (this.resultsPlayButton.element.text = "Play Again (" + this.isCounting + ")"),
    0 === this.isCounting && this.playAgain()
}
,
Interface.prototype.addKilledPeople = function(e, t, i) {
    var n = this.resultsKilledRow.clone();
    n.enabled = !0,
    e && (e = e.slice(0, 10),
    n.findByName("Username").element.text = e),
    t && (n.findByName("Weapon").element.spriteAsset = t),
    n.findByName("IsHead").enabled = !!i,
    n.setLocalPosition(0, 30 * -this.killedPlayers.length, 0),
    this.resultsKilledPlayers.addChild(n),
    this.killedPlayers.push(n)
}
,
Interface.prototype.backResults = function() {
    this.inspectorElement.enabled = !1,
    this.resultsEntity.enabled = !0,
    this.isCounting < 10 && (this.isCounting = 10)
}
,
Interface.prototype.showResults = function(e) {
    this.app.mouse.disablePointerLock(),
    window.onbeforeunload = !1,
    this.victoryElement.enabled = !1,
    this.chatElement.enabled = !1,
    this.inspectorElement.enabled = !1,
    this.resultsEntity.enabled = !0,
    this.resultsKilledElement.element.text = e.kills + "",
    this.resultsGameTimeElement.element.text = Utils.mmss(e.gameTime / 1e3),
    this.resultsDamageTakenElement.element.text = e.damageTaken + "",
    this.resultsDamageGivenElement.element.text = e.damageGiven + "",
    this.resultsBulletFiredElement.element.text = e.bulletFired + "",
    this.resultsHeadshotsElement.element.text = e.headshots + "",
    this.experienceValue.script.counter.nextValue = e.experience,
    this.killPointValue.script.counter.nextValue = e.killPoint,
    this.timePointValue.script.counter.nextValue = e.timePoint,
    this.coinValue.script.counter.nextValue = e.coins;
    var t = Math.min(e.experience / 2, 250);
    this.experienceBarElement.tween(this.experienceBarElement.element).to({
        width: t
    }, .7, pc.QuarticOut).start();
    var i = parseInt(e.rank)
      , n = "Finished";
    1 == i && (n = "Survived",
    this.entity.sound.play("Victory")),
    2 == i && (n = "Almost"),
    3 == i && (n = "Too close"),
    4 == i && (n = "Maybe next time"),
    5 == i && (n = "Getting better"),
    6 == i && (n = "More attention needed"),
    7 == i && (n = "More needed"),
    8 == i && (n = "Not that fast"),
    9 == i && (n = "Maybe next time"),
    10 == i && (n = "More attention needed"),
    this.resultsMessages.element.text = n,
    this.resultsRankElement.element.text = e.rank + "",
    this.resultsRankStateElement.element.text = e.rankLabel,
    e.lastShooter || (this.resultsSpectateButton.enabled = !1),
    "battle-royale" == pc.currentMode && (this.setSpectateTimer(),
    this.gameFinished = !0,
    this.isCounting = 20)
}
,
Interface.prototype.respawn = function() {
    this.resultsEntity.enabled = !1,
    this.chatElement.enabled = !0
}
,
Interface.prototype.setSpectateTimer = function() {
    if ("capture-the-flag" == pc.currentMode)
        return !1;
    var e = this;
    clearTimeout(this.spectateTimer),
    this.spectateTimer = setTimeout(function() {
        e.transitionEntity.enabled = !0,
        e.inspectorElement.enabled = !1,
        e.resultsSpectateButton.enabled = !1,
        e.resultsEntity.enabled = !0,
        e.character.stopSpectating()
    }, 1e4)
}
,
Interface.prototype.onPlayerKillPoint = function(e, t, i, n) {
    this.showSkull(),
    this.showScore(e, t, n),
    setTimeout(function(e) {
        e.showSpectatingYou()
    }, 2500, this);
    var a = this.character.currentWeaponDetails.maskIcon;
    this.addKilledPeople(e, a, n),
    i.length > 0 && setTimeout(function(e) {
        e.showExperience(i)
    }, 1e3, this)
}
,
Interface.prototype.showExperience = function(e) {
    this.experiencePointText.element.text = e,
    this.experiencePointElement.setLocalScale(0, 0, 0),
    this.experiencePointElement.enabled = !0,
    this.experiencePointElement.tween(this.experiencePointElement.getLocalScale()).to({
        x: 1,
        y: 1,
        z: 1
    }, .5, pc.QuarticOut).start(),
    clearTimeout(this.experiencePointElement.timer),
    this.experiencePointElement.timer = setTimeout(function(e) {
        e.experiencePointElement.enabled = !1
    }, 2500, this)
}
,
Interface.prototype.showScore = function(e, t, i) {
    this.killPointScore.element.text = t + "",
    this.killPointLabel.element.text = e,
    this.killPointShine.script.animation.stop(),
    this.killPointShine.script.animation.start(),
    i ? (this.entity.sound.play("Headshot"),
    setTimeout(function(e) {
        e.entity.sound.play("Point")
    }, 700, this)) : this.entity.sound.play("Point"),
    this.killPointElement.setLocalScale(0, 0, 0),
    this.killPointElement.enabled = !0,
    this.killPointElement.tween(this.killPointElement.getLocalScale()).to({
        x: 1,
        y: 1,
        z: 1
    }, .5, pc.QuarticOut).start(),
    clearTimeout(this.killPointElement.timer),
    this.killPointElement.timer = setTimeout(function(e) {
        e.killPointElement.enabled = !1
    }, 3500, this)
}
,
Interface.prototype.showSkull = function() {
    this.skullElement.enabled = !0,
    clearTimeout(this.skullElement.timer),
    this.skullElement.timer = setTimeout(function(e) {
        e.skullElement.enabled = !1
    }, 500, this)
}
,
Interface.prototype.onPlayerKill = function(e) {
    e.weapon ? this.addKillAnnounce(e.killer, e.killed, e.weapon, e.isHead) : this.addPoisonKillAnnounce(e.killed)
}
,
Interface.prototype.onPlayerCreate = function(e, t) {
    this.addUserMessage(t, "joined to session!")
}
,
Interface.prototype.showDamageIndicator = function() {
    this.damageIndicatorElement.element.opacity = 1,
    this.showFeeling("damage", 1),
    this.isDamageTaken = 1.5
}
,
Interface.prototype.hideDamageIndicator = function() {
    this.damageIndicatorElement.element.opacity = 0,
    this.isDamageTaken = 0
}
,
Interface.prototype.setDamageIndicatorStatus = function(e) {
    if (this.isDamageTaken < 0)
        return !1;
    this.damageIndicatorElement.element.opacity = pc.math.lerp(this.damageIndicatorElement.element.opacity, 0, .08),
    this.damageIndicatorElement.setLocalEulerAngles(0, 0, e)
}
,
Interface.prototype.getWhiteIcon = function(e) {
    var t = this.itemManager.getWeaponDetails(e);
    return !!t && t.maskIcon
}
,
Interface.prototype.addUserMessage = function(e, t) {
    if (!e || !t)
        return !1;
    var i = this.notificationUserMessage.clone();
    i.username = i.findByName("Username"),
    i.text = i.findByName("Text"),
    i.background = i.findByName("Background"),
    e && i.username && (i.username.element.text = e),
    i.text.element.text = t,
    i.enabled = !0,
    i.tween(i.username.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    i.tween(i.text.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    i.tween(i.background.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    this.notificationElement.addChild(i),
    this.notificationIndex++,
    this.updateNotifications(),
    this.entity.sound.play("Click")
}
,
Interface.prototype.addPoisonKillAnnounce = function(e) {
    var t = "Guest";
    e && (t = e);
    var i = this.notificationPoisionMessage.clone();
    i.killed = i.findByName("Killed"),
    i.background = i.findByName("Background"),
    i.message = i.findByName("Message"),
    i.icon = i.findByName("Icon"),
    i.killed.element.text = t,
    i.enabled = !0,
    i.tween(i.killed.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    i.tween(i.background.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    i.tween(i.message.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    i.tween(i.icon.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    this.notificationElement.addChild(i),
    this.notificationIndex++,
    this.updateNotifications(),
    this.entity.sound.play("Click")
}
,
Interface.prototype.addKillAnnounce = function(e, t, i, n) {
    var a = "Guest"
      , s = "Guest";
    e && (a = e),
    t && (s = t);
    var r = this.getWhiteIcon(i)
      , o = this.notificationKillMessage.clone();
    o.killer = o.findByName("Killer"),
    o.killed = o.findByName("Killed"),
    o.weapon = o.findByName("Weapon"),
    o.background = o.findByName("Background"),
    o.head = o.findByName("IsHead"),
    n ? (o.head.enabled = !0,
    o.killed.setLocalPosition(210, 0, 0),
    o.tween(o.head.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start()) : (o.head.enabled = !1,
    o.killed.setLocalPosition(180, 0, 0)),
    o.killer.element.text = a,
    o.killed.element.text = s,
    o.weapon.element.spriteAsset = r,
    o.enabled = !0,
    o.tween(o.killer.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    o.tween(o.killed.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    o.tween(o.weapon.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    o.tween(o.background.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    this.notificationElement.addChild(o),
    this.notificationIndex++,
    this.updateNotifications(),
    this.entity.sound.play("Click")
}
,
Interface.prototype.hideGameplayElements = function() {
    this.gameplayElements.map(function(e) {
        e.enabled = !1
    })
}
,
Interface.prototype.showGameplayElements = function() {
    this.gameplayElements.map(function(e) {
        e.enabled = !0
    })
}
,
Interface.prototype.showInspectator = function(e, t, i, n, a) {
    if ("battle-royale" == pc.currentMode && this.hideGameplayElements(),
    this.inspectorName = e,
    this.inspectorElement.enabled = !0,
    this.inspectorUsernameElement.element.text = e,
    this.inspectorDamageGivenElement.element.text = i + "",
    this.inspectorDamageTakenElement.element.text = n + "",
    t) {
        var s = this.app.assets.find(t + "-CharacterThumbnail");
        console.log(t, s),
        s && (this.inspectorProfilePictureElement.element.textureAsset = s)
    }
    var r = this.itemManager.getWeaponDetails(a);
    r && (this.inspectorWeaponNameElement.element.text = r.name,
    this.inspectorWeaponIconElement.element.textureAsset = r.icon)
}
,
Interface.prototype.showFeeling = function(e, t, i) {
    var n = !1;
    if ("damage" == e ? n = this.damageFeeling : "healing" == e ? n = this.healingFeeling : "breathing" == e && (n = this.breathingFeeling),
    !n)
        return !1;
    n.element.opacity = i > 0 ? i : .5,
    n.enabled = !0,
    this.setScreenSize(!0),
    n.tween(n.element).to({
        opacity: 0
    }, t, pc.QuarticOut).start()
}
,
Interface.prototype.updateNotifications = function() {
    for (var e = this.notificationElement.children.length; e--; ) {
        var t = this.notificationElement.children[e];
        t && t.enabled && t.tween(t.getLocalPosition()).to({
            x: 0,
            y: 40 * (this.notificationIndex - e),
            z: 0
        }, .5, pc.QuarticOut).start()
    }
    this.notificationIndex > this.notificationLimit && (this.notificationElement.children[3].destroy(),
    this.notificationIndex--)
}
,
Interface.prototype.setThrowingBar = function(e) {
    this.throwingBarElement.enabled = !0,
    this.throwingBar.setLocalScale(.01 * e, 1, 1)
}
,
Interface.prototype.hideThrowingBar = function() {
    this.throwingBarElement.enabled = !1
}
,
Interface.prototype.checkAliveCount = function() {
    this.totalPlayerCount = this.playerManager.players.length + 1,
    this.aliveCountElement.element.text = this.totalPlayerCount + "",
    2 !== this.totalPlayerCount || this.showDuelIcon || (this.showAlert("There is only one enemy left!", "error", "lastStand", 5e3),
    this.showDuelIcon = !0)
}
,
Interface.prototype.setTime = function() {
    this.timeElement.element.text = Utils.mmss(this.time),
    this.isCounting--
}
,
Interface.prototype.hideInspect = function() {
    this.inspectElement.enabled = !1
}
,
Interface.prototype.setInspect = function(e) {
    this.actionElement.element.text = e.action,
    this.inspectElement.enabled = !0
}
,
Interface.prototype.setAmmo = function(e) {
    this.ammoElement.element.text = e + ""
}
,
Interface.prototype.setClip = function(e) {
    this.clipElement.element.text = e + "",
    parseInt(e) <= 10 && !this.character.currentWeaponDetails.isShotgun && !this.character.currentWeaponDetails.isSniper ? this.clipElement.element.color = new pc.Color(1,.5,.5,0) : this.clipElement.element.color = new pc.Color(1,1,1,0)
}
,
Interface.prototype.setGrenadeCount = function(e) {}
,
Interface.prototype.setHoverSecondaryWeapon = function(e) {}
,
Interface.prototype.setHealth = function(e) {
    if (this.currentHealth == e)
        return !1;
    e = Math.floor(e),
    this.healthElement.element.text = e + "",
    this.healthBar.setLocalScale(.01 * e, 1, 1),
    this.currentHealth = e
}
,
Interface.prototype.setArmor = function(e) {
    if (this.currentArmor == e)
        return !1;
    this.armorElement.element.text = e + "",
    this.armorBar.setLocalScale(.01 * e, 1, 1),
    this.currentArmor = e
}
,
Interface.prototype.setRegionName = function(e) {
    this.regionElement.element.text = e
}
,
Interface.prototype.toggleMap = function() {
    this.fullSizeMapElement.enabled = !this.fullSizeMapElement.enabled
}
,
Interface.prototype.showInventoryAlert = function() {
    this.inventoryMessageElement.enabled = !0,
    setTimeout(function(e) {
        e.inventoryMessageElement.enabled = !1
    }, 3e3, this)
}
,
Interface.prototype.showAlert = function(e, t, i, n) {
    "error" == t && (this.alertElement.enabled || this.entity.sound.play("UI-Error")),
    this.alertMessageElement.element.text = e,
    i && this[i + "Icon"] ? (this.alertIcon.element.textureAsset = this[i + "Icon"],
    this.alertIcon.enabled = !0) : this.alertIcon.enabled = !1,
    this.alertElement.enabled = !0,
    clearTimeout(this.alertTimer);
    var a = 3e3;
    n > 0 && (a = n),
    this.alertTimer = setTimeout(function(e) {
        e.alertElement.enabled = !1
    }, a, this)
}
,
Interface.prototype.setInventoryVisibility = function() {
    if (!this.inventoryElement.script.inventory.items)
        return !1;
    this.isInventoryEnabled && (this.app.mouse.disablePointerLock(),
    this.inventory.updateLeftSpace()),
    this.nextFrameInventory = !0
}
,
Interface.prototype.setShortcuts = function() {
    if (this.gameFinished)
        return !1;
    if (this.app.keyboard.wasPressed(pc.KEY_I) || this.app.keyboard.wasPressed(pc.KEY_TAB) || this.app.keyboard.wasReleased(pc.KEY_TAB) || this.app.keyboard.wasPressed(pc.KEY_ESCAPE)) {
        if (this.app.keyboard.wasPressed(pc.KEY_ESCAPE) && this.isInventoryEnabled)
            return !1;
        if (this.character.isDeath)
            return !1;
        if (this.character.chatEntity && this.character.chatEntity.script && this.character.chatEntity.script.chat.isFocused)
            return !1;
        this.app.keyboard.wasPressed(pc.KEY_TAB) ? this.isInventoryEnabled = !0 : this.app.keyboard.wasReleased(pc.KEY_TAB) ? (this.isInventoryEnabled = !1,
        this.app.mouse.enablePointerLock()) : this.isInventoryEnabled = !this.isInventoryEnabled,
        this.setInventoryVisibility(),
        this.isInventoryEnabled ? this.entity.sound.play("OpenBag") : this.entity.sound.play("CloseBag")
    }
}
,
Interface.prototype.setScreenSize = function(e) {
    if (Date.now() - this.lastScreenSizeUpdate < 1e3 && !e)
        return !1;
    for (var t = this.entity.screen.scale, i = this.entity.screen._resolution, n = this.screenSizeElements.length; n--; ) {
        var a = this.screenSizeElements[n];
        a.enabled && (a.element.calculatedWidth = i.x / t,
        a.element.calculatedHeight = i.y / t)
    }
    this.lastScreenSizeUpdate = Date.now()
}
,
Interface.prototype.setSpecialKeybinds = function() {
    this.gameFinished && this.inspectorName && !this.userReported && this.app.keyboard.wasPressed(pc.KEY_Y) && (this.reportQuestionElement.enabled = !1,
    this.reportedElement.enabled = !0,
    this.reportedElement.element.text = "Please wait...",
    this.reportUser(),
    this.userReported = !0)
}
,
Interface.prototype.update = function(e) {
    this.character.isReloading > 0 ? (this.reloadingElement.enabled = !0,
    this.reloadingBar.setLocalScale(100 * this.character.isReloading / 355 * .01, 1, 1)) : this.reloadingElement.enabled = !1,
    this.character.isVaccinate > 0 ? (this.administeringElement.enabled = !0,
    this.administeringBar.setLocalScale(100 * this.character.isVaccinate / 200 * .01, 1, 1)) : this.administeringElement.enabled = !1,
    this.setShortcuts(),
    this.setScreenSize(),
    this.setGuidePosition(),
    this.setCaseHealthPosition(),
    this.setPlayAgain(),
    this.setSpecialKeybinds(),
    this.nextFrameInventory && (this.inventoryElement.enabled = this.isInventoryEnabled,
    this.nextFrameInventory = !1),
    this.gameFinished && (this.inventoryElement.enabled = !1),
    this.isDamageTaken -= e
}
;
var Interactive = pc.createScript("interactive");
Interactive.attributes.add("type", {
    type: "string",
    enum: [{
        Vehicle: "vehicle"
    }, {
        Weapon: "weapon"
    }, {
        Ammo: "ammo"
    }, {
        Item: "item"
    }, {
        Door: "door"
    }],
    default: "vehicle"
}),
Interactive.attributes.add("active", {
    type: "boolean",
    default: !0
}),
Interactive.attributes.add("collisionBox", {
    type: "vec3"
}),
Interactive.attributes.add("offsetVector", {
    type: "vec3"
}),
Interactive.prototype.initialize = function() {
    this.actions = {
        vehicle: "Drive",
        weapon: "Take",
        ammo: "Take",
        item: "Take",
        door: "Open / Close"
    },
    "weapon" == this.type || "ammo" == this.type || "item" == this.type ? this.action = Utils.clearName(this.entity.name) : this.action = this.actions[this.type],
    this.isAvailable = !0,
    this.state = !1,
    this.aabbShape = new pc.BoundingBox,
    this.updateCollisionShape()
}
,
Interactive.prototype.doAction = function(t) {
    if ("vehicle" == this.type && (t.script.movement.getInCar(this.entity),
    this.isAvailable = !1),
    "weapon" == this.type) {
        if (!t.script.movement.takeWeapon(this.entity))
            return !1;
        this.isUnlimited ? (this.entity.findByName("Model").enabled = !1,
        this.isAvailable = !1,
        setTimeout(function(t) {
            t.entity.findByName("Model").enabled = !0,
            t.isAvailable = !0
        }, 3e3, this)) : this.entity.destroy()
    }
    if ("ammo" == this.type) {
        if (!t.script.movement.takeItem(this.entity))
            return !1;
        this.isUnlimited ? (this.entity.findByName("Model").enabled = !1,
        this.isAvailable = !1,
        setTimeout(function(t) {
            t.entity.findByName("Model").enabled = !0,
            t.isAvailable = !0
        }, 3e3, this)) : this.entity.destroy()
    }
    if ("item" == this.type) {
        if (!t.script.movement.takeItem(this.entity))
            return !1;
        this.isUnlimited ? (this.entity.findByName("Model").enabled = !1,
        this.isAvailable = !1,
        setTimeout(function(t) {
            t.entity.findByName("Model").enabled = !0,
            t.isAvailable = !0
        }, 3e3, this)) : this.entity.destroy()
    }
    "door" == this.type && (this.state = !this.state,
    this.app.fire("State:Object", this.entity.getGuid(), this.state),
    t && t.script && t.script.movement && t.script.movement.takeAnimation())
}
,
Interactive.prototype.updateCollisionShape = function() {
    var t = this.entity.findByName("Model");
    if (t && t.model && t.model.meshInstances && t.model.meshInstances.length > 0) {
        var e = t.model.meshInstances;
        this.aabbShape = e[0].aabb
    } else
        this.objectCenter = this.entity.getPosition().clone().add(this.offsetVector).sub(this.collisionBox.clone().scale(.5)),
        this.aabbShape = new pc.BoundingBox(this.objectCenter,this.collisionBox.clone().scale(1.1))
}
,
Interactive.prototype.getDetails = function() {
    return {
        type: this.type,
        action: this.action,
        active: this.active,
        isAvailable: this.isAvailable
    }
}
;
var Shoot = pc.createScript("shoot");
Shoot.attributes.add("smokeParticle", {
    type: "entity"
}),
Shoot.attributes.add("derbisParticle", {
    type: "entity"
}),
Shoot.attributes.add("trailFX", {
    type: "entity"
}),
Shoot.attributes.add("trailLimit", {
    type: "number"
}),
Shoot.attributes.add("bulletHoleEntity", {
    type: "entity"
}),
Shoot.attributes.add("bloodEntity", {
    type: "entity"
}),
Shoot.attributes.add("grenadeEntity", {
    type: "entity"
}),
Shoot.attributes.add("smokeEntity", {
    type: "entity"
}),
Shoot.attributes.add("explosionEntity", {
    type: "entity"
}),
Shoot.attributes.add("smokeExplosionEntity", {
    type: "entity"
}),
Shoot.attributes.add("grenadeTime", {
    type: "number"
}),
Shoot.attributes.add("smokeTime", {
    type: "number"
}),
Shoot.attributes.add("dynamicWorld", {
    type: "entity"
}),
Shoot.attributes.add("garbageEntity", {
    type: "entity"
}),
Shoot.attributes.add("randomItems", {
    type: "entity",
    array: !0
}),
Shoot.prototype.initialize = function() {
    this.grenades = [],
    this.trails = [],
    this.trailIndex = 0;
    for (var t = 0; t < this.trailLimit; t++)
        this.cloneTrail();
    this.app.on("Bullet:Fire", this.onBulletFire.bind(this), this),
    this.app.on("Grenade:Throw", this.onGrenadeThrow.bind(this), this)
}
,
Shoot.prototype.onCollisionStart = function(t) {
    t && "Glass" == t.name && this.app.fire("State:Object", t._guid, !0)
}
,
Shoot.prototype.onGrenadeThrow = function(t, i, e, s, o, a) {
    var r = new pc.Vec3(0,0,0);
    r.copy(e).scale(s);
    var n = !1;
    "Explosion" == o ? (n = this.grenadeEntity.clone()).time = this.grenadeTime : "Smoke" == o && ((n = this.smokeEntity.clone()).time = this.smokeTime),
    n.enabled = !0,
    n.type = o,
    n.points = [],
    n.colors = [],
    n.isOwner = a,
    n.tempPoints = [],
    n.tempColors = [],
    n && n.collision && n.collision.on("collisionend", this.onCollisionStart.bind(this)),
    n.rigidbody.teleport(i.x, i.y, i.z),
    n.rigidbody.applyForce(r),
    n.points.push(n.getPosition().clone()),
    n.colors.push(new pc.Color(1,0,0)),
    this.dynamicWorld.addChild(n),
    this.grenades.push(n)
}
,
Shoot.prototype.cloneTrail = function() {
    var t = this.trailFX.clone();
    t.isActive = !1,
    t.enabled = !0,
    t.timestamp = 0,
    t.setPosition(Utils.nullVector),
    t.traces = t.findByTag("Trace"),
    t.myTrace = !1,
    this.dynamicWorld.addChild(t),
    this.trails.push(t)
}
,
Shoot.prototype.createTrail = function(t, i, e) {
    for (var s in this.trails[this.trailIndex].setPosition(t),
    this.trails[this.trailIndex].lookAt(i),
    this.trails[this.trailIndex].isActive = !0,
    this.trails[this.trailIndex].timestamp = 0,
    e == pc.userId ? this.trails[this.trailIndex].myTrace = !0 : this.trails[this.trailIndex].myTrace = !1,
    this.trails[this.trailIndex].traces) {
        this.trails[this.trailIndex].traces[s].element.opacity = 1
    }
    this.trailIndex++,
    this.trailIndex > this.trails.length - 1 && (this.trailIndex = 0)
}
,
Shoot.prototype.onBulletFire = function(t, i, e, s, o) {
    var a = this.app.systems.rigidbody.raycastFirst(i, e);
    Math.random();
    if (this.createTrail(s, e, t),
    a) {
        if (a.entity.tags.list().indexOf("State") > -1 && !a.entity.state)
            void 0 === a.entity.state && this.app.fire("State:Object", a.entity._guid, !0),
            a.entity.state = !0;
        else if (a.entity && a.entity.tags.list().indexOf("Case") > -1) {
            if (a.entity.sound.pitch = .9 + .1 * Math.random(),
            a.entity.sound.play("Impact"),
            a.entity.health--,
            a.entity.rigidbody.applyTorqueImpulse(2 * Math.random(), 2 * Math.random(), 2 * Math.random()),
            this.smokeParticle.setPosition(a.point),
            this.derbisParticle.setPosition(a.point),
            this.smokeParticle.particlesystem.reset(),
            this.smokeParticle.particlesystem.play(),
            this.derbisParticle.particlesystem.reset(),
            this.derbisParticle.particlesystem.play(),
            a.entity.health < 1) {
                for (var r = a.entity.getPosition().clone(), n = 0; n < 4; n++) {
                    var l = Math.floor(Math.random() * this.randomItems.length - 1);
                    this.randomItems[l] && this.app.fire("Item:Throw", this.randomItems[l].name, r)
                }
                a.entity.destroy(),
                this.smokeParticle.particlesystem.reset(),
                this.smokeParticle.particlesystem.play()
            }
        } else if (a.entity.tags.list().indexOf("Enemy") > -1) {
            if (o > 0 && a.entity && a.entity.script && a.entity.script.enemy) {
                var h = a.entity.getPosition().clone().sub(a.point)
                  , p = !1
                  , y = .09;
                h.x <= y && h.x >= -y && h.z <= y && h.z >= -y ? p = !0 : h.x <= y && h.x >= -y && h.y <= y && h.y >= -y ? p = !0 : h.x <= y && h.x >= -y && h.z <= y && h.z >= -y ? p = !0 : h.z <= y && h.z >= -y && h.y <= y && h.y >= -y && (p = !0),
                p || a.entity.script.enemy.damage(t, o, a.normal, h)
            }
            this.bloodEntity.setPosition(a.point),
            this.bloodEntity.particlesystem.particleNormal = a.normal,
            this.bloodEntity.particlesystem.reset(),
            this.bloodEntity.particlesystem.play()
        } else
            this.smokeParticle.setPosition(a.point),
            this.derbisParticle.setPosition(a.point),
            this.smokeParticle.particlesystem.reset(),
            this.smokeParticle.particlesystem.play(),
            this.derbisParticle.particlesystem.reset(),
            this.derbisParticle.particlesystem.play(),
            this.bulletHoleEntity.setPosition(a.point),
            this.bulletHoleEntity.particlesystem.particleNormal = a.normal,
            this.bulletHoleEntity.particlesystem.play();
        a.entity && a.entity.tags.list().indexOf("Drone") > -1 && (void 0 === a.entity.health && (a.entity.health = 2),
        a.entity.health--,
        a.entity.script.drone.applyForce(),
        this.smokeParticle.setPosition(a.point),
        this.derbisParticle.setPosition(a.point),
        this.smokeParticle.particlesystem.reset(),
        this.smokeParticle.particlesystem.play(),
        this.derbisParticle.particlesystem.reset(),
        this.derbisParticle.particlesystem.play(),
        a.entity.health < 1 && (this.app.fire("State:Object", a.entity._guid, !0),
        this.app.fire("Item:Case", a.point),
        this.createExplosion(a.point)))
    }
}
,
Shoot.prototype.createExplosion = function(t) {
    var i = this.explosionEntity.clone();
    i.setPosition(t),
    i.enabled = !0,
    this.garbageEntity.addChild(i)
}
,
Shoot.prototype.createSmoke = function(t) {
    var i = this.smokeExplosionEntity.clone();
    i.setPosition(t),
    i.enabled = !0,
    i.time = 500,
    this.garbageEntity.addChild(i)
}
,
Shoot.prototype.updateTrails = function() {
    for (var t = this.trails.length; t--; )
        if (this.trails[t].isActive) {
            if (this.trails[t].myTrace)
                for (var i in this.trails[t].traces) {
                    var e = this.trails[t].traces[i];
                    e.element.opacity = pc.math.lerp(e.element.opacity, 0, .1)
                }
            else
                this.trails[t].translateLocal(0, 0, -2.5);
            this.trails[t].timestamp++,
            this.trails[t].timestamp > 1e3 && (this.trails[t].isActive = !1,
            this.trails[t].timestamp = 0,
            this.trails[t].setPosition(Utils.nullVector))
        }
}
,
Shoot.prototype.updateGrenades = function(t) {
    for (var i = this.grenades.length; i--; ) {
        var e = this.grenades[i];
        if (e && (e.time -= 1,
        e.isOwner && (e.tempPoints.push(e.getPosition().clone()),
        e.tempColors.push(Utils.whiteColor),
        e.tempPoints.length % 2 == 0 && (e.points = e.tempPoints.slice(0),
        e.colors = e.tempColors.slice(0),
        this.app.renderLines(e.points, e.colors))),
        e.time < 0)) {
            if ("Explosion" == e.type) {
                if (this.createExplosion(e.getPosition()),
                e.isOwner) {
                    var s = e.getPosition().clone();
                    this.app.fire("Player:Explosion", s.x, s.y, s.z)
                }
            } else
                "Smoke" == e.type && this.createSmoke(e.getPosition());
            this.grenades.splice(i, 1),
            e.destroy()
        }
    }
}
,
Shoot.prototype.update = function(t) {
    this.updateGrenades(t),
    this.updateTrails()
}
;
var Collector = pc.createScript("collector");
Collector.attributes.add("timeLimit", {
    type: "number"
}),
Collector.attributes.add("frequency", {
    type: "number"
}),
Collector.prototype.initialize = function() {
    this.lastCheck = Date.now()
}
,
Collector.prototype.updateTimes = function(t) {
    if (Date.now() - this.lastCheck < this.frequency)
        return !1;
    for (var e = this.entity.children.length; e--; ) {
        var i = this.entity.children[e];
        void 0 === i.time && (i.time = this.timeLimit),
        i.time -= 1,
        i.time < 0 && i.destroy()
    }
    this.lastCheck = Date.now()
}
,
Collector.prototype.update = function(t) {
    this.updateTimes(t * variable.FPS)
}
;
var Enemy = pc.createScript("enemy");
Enemy.attributes.add("characterEntity", {
    type: "entity"
}),
Enemy.attributes.add("parachuteEntity", {
    type: "entity"
}),
Enemy.attributes.add("networkEntity", {
    type: "entity"
}),
Enemy.attributes.add("facePointEntity", {
    type: "entity"
}),
Enemy.attributes.add("playerId", {
    type: "number"
}),
Enemy.attributes.add("speedFactor", {
    type: "number",
    default: 1
}),
Enemy.attributes.add("walkSpeed", {
    type: "number",
    default: 1
}),
Enemy.attributes.add("runSpeed", {
    type: "number",
    default: 1
}),
Enemy.attributes.add("animationRunSpeed", {
    type: "number",
    default: 1
}),
Enemy.attributes.add("animationWalkSpeed", {
    type: "number",
    default: 1
}),
Enemy.attributes.add("bagEntity", {
    type: "entity"
}),
Enemy.attributes.add("angleEntity", {
    type: "entity"
}),
Enemy.attributes.add("weaponHolder", {
    type: "entity"
}),
Enemy.attributes.add("itemManagerEntity", {
    type: "entity"
}),
Enemy.attributes.add("shootHolderEntity", {
    type: "entity"
}),
Enemy.attributes.add("muzzlePointEntity", {
    type: "entity"
}),
Enemy.attributes.add("shootPointEntity", {
    type: "entity"
}),
Enemy.attributes.add("shootAngleEntity", {
    type: "entity"
}),
Enemy.attributes.add("currentWeapon", {
    type: "string"
}),
Enemy.attributes.add("muzzleEntity", {
    type: "entity"
}),
Enemy.attributes.add("forwardAngleEntity", {
    type: "entity"
}),
Enemy.attributes.add("backwardAngleEntity", {
    type: "entity"
}),
Enemy.attributes.add("leftAngleEntity", {
    type: "entity"
}),
Enemy.attributes.add("rightAngleEntity", {
    type: "entity"
}),
Enemy.attributes.add("idleAngleEntity", {
    type: "entity"
}),
Enemy.prototype.initialize = function() {
    this.lastShooter = !1,
    this.lastDamage = 0,
    this.lastDirection = new pc.Vec3,
    this.currentMuzzleSize = 0,
    this.currentDirectionEntity = this.idleAngleEntity,
    this.username = "Guest",
    this.profilePictureHash = "",
    this.currentWeaponName = "Desert-Eagle",
    this.damageRegistered = 0,
    this.damageGiven = 0,
    this.skin = "",
    this.hat = "",
    this.isShifting = !1,
    this.isCrouching = !1,
    this.lastHitTime = Date.now(),
    this.isDeath = !1,
    this.currentWeaponDetails = {
        shootRate: 10
    },
    this.lastKey = "up",
    this.keyboard = {
        up: !1,
        down: !1,
        left: !1,
        right: !1,
        jump: !1,
        reload: !1,
        shift: !1,
        throw: !1,
        crouch: !1,
        peek_left: !1,
        peek_right: !1,
        shoot: !1
    },
    this.nextPosition = new pc.Vec3(0,0,0),
    this.nextRotation = new pc.Vec3(0,0,0),
    this.currentPosition = new pc.Vec3(0,0,0),
    this.currentRotation = new pc.Vec3(0,0,0),
    this.nextPosition.x = Utils.nullVector.x,
    this.nextPosition.y = Utils.nullVector.y,
    this.nextPosition.z = Utils.nullVector.z,
    this.currentPosition.x = Utils.nullVector.x,
    this.currentPosition.y = Utils.nullVector.y,
    this.currentPosition.z = Utils.nullVector.z,
    this.damageVector = new pc.Vec3(0,0,0),
    this.muzzlePointEntity = !1,
    this.deathAnimationSet = !1,
    this.lastUpdate = Date.now(),
    this.lastLerp = 1,
    this.isJumping = 0,
    this.isThrowing = 0,
    this.lastShootTime = 0,
    this.inControl = !1,
    this.totalUpdateCount = 0,
    this.totalUpdateDelta = 0,
    this.currentAnimationName = "Idle",
    this.currentSpeed = 1,
    this.stepSpeed = 1,
    this.network = this.networkEntity.script.network,
    this.spineRotation = 0,
    this.currentSpineRotation = new pc.Vec3(0,0,0),
    this.onParachute = !0,
    this.raycast = {
        from: new pc.Vec3(0,0,0),
        to: new pc.Vec3(0,0,0)
    },
    "capture-the-flag" == pc.currentMode && this.setLand()
}
,
Enemy.prototype.setSkin = function(t) {
    var i = this.app.assets.find(t + "-Character");
    t && (this.characterEntity.model.asset = i,
    this.parachuteEntity.model.asset = i,
    this.skin = t)
}
,
Enemy.prototype.setHat = function(t) {
    this.hat = t
}
,
Enemy.prototype.setBag = function() {
    this.bagEntity.reparent(this.spine_03),
    this.bagEntity.setLocalScale(100, 100, 100)
}
,
Enemy.prototype.setLand = function() {
    this.parachuteEntity.enabled = !1,
    this.characterEntity.enabled = !0,
    this.onParachute = !1,
    this.weaponHolder.reparent(this.characterEntity.findByName("Hand_R")),
    this.weaponHolder.setLocalScale(100, 100, 100),
    this.keyboard.up = !1,
    this.setAnimation("Idle", !0),
    this.spine_01 = this.characterEntity.findByName("Spine_01"),
    this.spine_02 = this.characterEntity.findByName("Spine_02"),
    this.spine_03 = this.characterEntity.findByName("Spine_03"),
    this.shoulderLeft = this.characterEntity.findByName("Shoulder_L"),
    this.shoulderRight = this.characterEntity.findByName("Shoulder_R"),
    this.clavicleLeft = this.characterEntity.findByName("Clavicle_L"),
    this.clavicleRight = this.characterEntity.findByName("Clavicle_R"),
    this.neck = this.characterEntity.findByName("Neck"),
    this.startAngle_spine_01 = this.spine_01.getLocalEulerAngles().clone(),
    this.startAngle_spine_02 = this.spine_02.getLocalEulerAngles().clone(),
    this.startAngle_spine_03 = this.spine_03.getLocalEulerAngles().clone(),
    this.startAngle_shoulderLeft = this.shoulderLeft.getLocalEulerAngles().clone(),
    this.startAngle_shoulderRight = this.shoulderRight.getLocalEulerAngles().clone(),
    this.startAngle_clavicleLeft = this.clavicleLeft.getLocalEulerAngles().clone(),
    this.startAngle_clavicleRight = this.clavicleRight.getLocalEulerAngles().clone(),
    this.startAngle_neck = this.neck.getLocalEulerAngles().clone(),
    this.setWeapon(this.currentWeapon),
    this.setBag()
}
,
Enemy.prototype.death = function() {
    this.isDeath = !0,
    this.keyboard.up = !1,
    this.keyboard.down = !1,
    this.keyboard.left = !1,
    this.keyboard.right = !1,
    this.keyboard.shoot = !1,
    this.keyboard.reload = !1,
    this.keyboard.jump = !1,
    this.isShooting = !1;
    var t = Math.round(Math.random()) + 1;
    if (this.setAnimation("Death-" + t, !1),
    void 0 !== pc.userId && pc.userId == this.lastShooter) {
        var i = this.entity.getPosition().clone();
        if (this.app.fire("Item:Throw", this.currentWeaponName, i),
        this.currentWeaponDetails) {
            var e = Utils.clearId(this.currentWeaponDetails.ammoType);
            this.app.fire("Item:Throw", e, i)
        }
    }
    setTimeout(function(t) {
        try {
            t.removeEnemy()
        } catch (t) {}
    }, 3e3, this)
}
,
Enemy.prototype.takeControl = function() {
    this.characterEntity.enabled = !1,
    this.inControl = !0,
    this.network.controls.keyboard = this.keyboard,
    this.setWeapon(this.currentWeaponName)
}
,
Enemy.prototype.giveControlBack = function() {
    this.characterEntity.enabled = !0,
    this.inControl = !1
}
,
Enemy.prototype.setPosition = function(t) {
    t.length > 3 && !this.network.isPaused && (this.nextPosition.x = Utils.decodeFloat(t[1]),
    this.nextPosition.y = Utils.decodeFloat(t[2]),
    this.nextPosition.z = Utils.decodeFloat(t[3]),
    this.nextRotation.y = Utils.decodeFloat(t[4]),
    this.spineRotation = Utils.decodeFloat(t[5]),
    this.inControl && this.network.controls.setPosition(this.nextPosition.x, this.nextPosition.y, this.nextPosition.z, this.nextRotation.y, this.spineRotation))
}
,
Enemy.prototype.collisionStart = function(t) {
    null !== t && t.other.tags.list().indexOf("vehicle")
}
,
Enemy.prototype.respawn = function() {
    this.isDeath = !1,
    this.deathAnimationSet = !1,
    this.entity.enabled = !0,
    this.inControl = !1
}
,
Enemy.prototype.damage = function(t, i, e, n) {
    var s = this.entity.getPosition().clone()
      , o = !1;
    if (this.isDeath)
        return !1;
    if (pc.controls && pc.controls.hash == t) {
        var a = pc.controls.entity.getPosition().clone().sub(s).length()
          , h = !1;
        pc.controls && pc.controls.currentWeaponDetails && pc.controls.currentWeaponDetails.name && (h = pc.controls.currentWeaponDetails.longDistance),
        h || (a > 5 && (i *= .9),
        a > 10 && (i *= .7),
        a > 15 && (i *= .4))
    }
    if (i = Math.floor(i),
    this.lastShooter = t,
    this.lastDamage = i,
    this.lastDirection = e,
    this.damageRegistered += parseInt(i),
    n && n.y < -.6 && (o = !0),
    this.app.fire("Register:Damage", this.lastShooter, this.playerId, this.lastDamage, o),
    this.app.fire("DamageManager:Register", i, s),
    this.app.fire("Hitmarker:Set", i, o),
    this.app.fire("Hit:Point", this.entity, i),
    Date.now() - this.lastHitTime > 1200) {
        var r = Math.round(pc.math.random(1, 2));
        this.entity.sound.play("Male-Hit-" + r),
        this.lastHitTime = Date.now()
    }
    this.damageVector.x = pc.math.random(0, 55),
    this.damageVector.y = pc.math.random(0, 55),
    this.damageVector.z = pc.math.random(0, 55)
}
,
Enemy.prototype.setInput = function(t, i) {
    void 0 !== this.keyboard[t] && (this.keyboard[t] = i,
    !0 === i && (this.lastKey = t),
    this.inControl && (this.network.controls.keyboard[t] = i))
}
,
Enemy.prototype.setAnimation = function(t, i) {
    if (this.onParachute)
        return !1;
    this.currentAnimationName != t && (this.characterEntity.animation.play("Enemy-" + t, .15),
    this.characterEntity.animation.loop = i,
    this.currentAnimationName = t)
}
,
Enemy.prototype.setWeapon = function(t) {
    if (this.onParachute)
        return !1;
    var i = this.entity.findByName(t);
    this.entity.findByTag("weapon").map(function(t) {
        t.enabled = !1
    }),
    i && (i.enabled = !0,
    this.muzzlePointEntity = i.findByName("MuzzlePoint"),
    this.muzzleEntity.reparent(this.muzzlePointEntity),
    this.currentWeaponDetails = this.itemManagerEntity.script.itemSpawn.getWeaponDetails(t)),
    this.inControl && this.network.controls.setWeapon(t, !0),
    this.currentWeaponName = t
}
,
Enemy.prototype.shoot = function() {
    if (this.lastShootTime > 0)
        return !1;
    this.raycast.from = this.muzzlePointEntity.getPosition(),
    this.raycast.to = this.shootPointEntity.getPosition(),
    this.inControl ? this.network.controls.shoot() : (this.app.fire("Bullet:Fire", this.playerId, this.raycast.from, this.raycast.to, this.raycast.from, 0),
    "Shotgun" == this.currentWeaponDetails.name ? this.entity.sound.play("Shotgun-Fire") : "Steyr-SSG-69" == this.currentWeaponDetails.name ? this.entity.sound.play("Sniper-Fire") : this.entity.sound.play("Rifle-Test"),
    this.currentMuzzleSize = 1),
    this.currentWeaponDetails.shootRate > 0 ? this.lastShootTime = this.currentWeaponDetails.nextShootTime : this.lastShootTime = 8
}
,
Enemy.prototype.throw = function() {
    this.entity.sound.play("Grenade-Throw"),
    this.isThrowing = 20
}
,
Enemy.prototype.setMuzzlePoint = function(t) {
    this.currentMuzzleSize = pc.math.lerp(this.currentMuzzleSize, .001, .5),
    this.muzzleEntity.setLocalScale(this.currentMuzzleSize, this.currentMuzzleSize, this.currentMuzzleSize)
}
,
Enemy.prototype.playSound = function(t) {
    this.entity.sound.slots[t].isPlaying || this.entity.sound.play(t)
}
,
Enemy.prototype.updateKeyboardState = function() {
    if (this.onParachute)
        return !1;
    if (this.deathAnimationSet)
        return !1;
    if (this.isThrowing > 0 ? this.setAnimation("Throw", !1) : this.keyboard.jump ? this.isJumping < 0 && (this.setAnimation("Jump", !1),
    this.playSound("Jump"),
    this.isJumping = 50) : this.isCrouching && this.keyboard.up && this.keyboard.left ? (this.setAnimation("Crouch-Forward-Left", !0),
    this.playSound("Running")) : this.isCrouching && this.keyboard.up && this.keyboard.right ? (this.setAnimation("Crouch-Forward-Right", !0),
    this.playSound("Running")) : this.isCrouching && this.keyboard.down && this.keyboard.left ? (this.setAnimation("Crouch-Backward-Left", !0),
    this.playSound("Running")) : this.isCrouching && this.keyboard.down && this.keyboard.right ? (this.setAnimation("Crouch-Backward-Right", !0),
    this.playSound("Running")) : this.isCrouching && this.keyboard.down ? (this.setAnimation("Crouch-Backward", !0),
    this.playSound("Running")) : this.isCrouching && this.keyboard.left ? (this.setAnimation("Crouch-Left", !0),
    this.playSound("Running")) : this.isCrouching && this.keyboard.right ? (this.setAnimation("Crouch-Right", !0),
    this.playSound("Running")) : this.isCrouching && this.keyboard.up ? (this.setAnimation("Crouch-Forward", !0),
    this.playSound("Running")) : this.keyboard.up && this.keyboard.left ? (this.setAnimation("Forward-Left", !0),
    this.playSound("Running")) : this.keyboard.up && this.keyboard.right ? (this.setAnimation("Forward-Right", !0),
    this.playSound("Running")) : this.keyboard.down && this.keyboard.left ? (this.setAnimation("Backward-Left", !0),
    this.playSound("Running")) : this.keyboard.down && this.keyboard.right ? (this.setAnimation("Backward-Right", !0),
    this.playSound("Running")) : this.keyboard.up ? (this.setAnimation("Forward", !0),
    this.playSound("Running"),
    this.currentDirectionEntity = this.forwardAngleEntity) : this.keyboard.down ? (this.setAnimation("Backward", !0),
    this.playSound("Running"),
    this.currentDirectionEntity = this.backwardAngleEntity) : this.keyboard.left ? (this.setAnimation("Left", !0),
    this.playSound("Running"),
    this.currentDirectionEntity = this.leftAngleEntity) : this.keyboard.right ? (this.setAnimation("Right", !0),
    this.playSound("Running"),
    this.currentDirectionEntity = this.rightAngleEntity) : this.isDeath || (this.setAnimation("Idle", !0),
    this.currentDirectionEntity = this.idleAngleEntity),
    this.isDeath) {
        var t = Math.round(Math.random()) + 1;
        this.setAnimation("Death-" + t, !1),
        this.deathAnimationSet = !0
    }
    this.isShifting ? (this.stepSpeed = this.walkSpeed,
    this.characterEntity.animation.speed = this.animationRunSpeed) : (this.stepSpeed = this.runSpeed,
    this.characterEntity.animation.speed = this.animationWalkSpeed),
    this.keyboard.crouch ? (this.isCrouching = !0,
    this.characterEntity.animation.speed = this.animationWalkSpeed) : this.isCrouching = !1,
    this.keyboard.shift ? this.isShifting = !1 : this.isShifting = !0,
    this.keyboard.shoot ? this.isShooting = !0 : this.isShooting = !1,
    this.isShooting && this.shoot(),
    this.keyboard.reload && this.playSound("Reload"),
    this.keyboard.throw
}
,
Enemy.prototype.removeEnemy = function() {
    if ("capture-the-flag" == pc.currentMode)
        return this.entity.enabled = !1,
        !1;
    this.bagEntity.destroy && this.bagEntity.destroy(),
    this.weaponHolder.destroy && this.weaponHolder.destroy(),
    this.shootHolderEntity.destroy && this.shootHolderEntity.destroy(),
    this.muzzlePointEntity && this.muzzlePointEntity.destroy && this.muzzlePointEntity.destroy(),
    this.shootPointEntity.destroy && this.shootPointEntity.destroy(),
    this.entity.destroy()
}
,
Enemy.prototype.setMovement = function(t) {
    var i = this.entity.getPosition().clone().sub(this.nextPosition).length();
    if (this.currentSpeed = i * this.speedFactor,
    this.currentSpeed = Math.min(this.currentSpeed, 7),
    this.currentPosition = this.currentPosition.lerp(this.currentPosition, this.nextPosition, .2),
    this.onParachute)
        this.entity.setPosition(this.currentPosition);
    else if (i > .15) {
        var e = this.nextPosition.clone().sub(this.entity.getPosition()).normalize().scale(this.stepSpeed);
        this.entity.translate(e),
        i > 2 && this.entity.setPosition(this.nextPosition)
    }
    if (this.currentRotation.y = Utils.rotate(this.currentRotation.y, this.nextRotation.y, .2),
    this.entity.setLocalEulerAngles(0, this.currentRotation.y * pc.math.RAD_TO_DEG, 0),
    this.onParachute)
        return !1;
    var n = this.spineRotation * pc.math.RAD_TO_DEG;
    this.shootAngleEntity.setLocalEulerAngles(this.spineRotation * pc.math.RAD_TO_DEG - 180, 0, 180),
    this.angleEntity.setLocalEulerAngles(0, 0, n),
    this.damageVector.lerp(this.damageVector, new pc.Vec3(0,0,0), .2);
    var s = this.startAngle_spine_03.clone().add(this.angleEntity.getLocalEulerAngles().clone()).add(this.currentDirectionEntity.getLocalEulerAngles().clone()).add(this.damageVector);
    this.spine_02.setLocalEulerAngles(s)
}
,
Enemy.prototype.setCounters = function(t) {
    this.lastShootTime -= 60 * t,
    this.isJumping -= 60 * t,
    this.isThrowing -= 60 * t
}
,
Enemy.prototype.update = function(t) {
    if (this.network.isPaused ? this.characterEntity.animation.speed = 0 : (this.setMovement(t),
    this.setCounters(t),
    this.setMuzzlePoint(),
    this.isDeath || this.updateKeyboardState()),
    this.isDeath && !this.deathAnimationSet) {
        var i = Math.round(Math.random()) + 1;
        this.setAnimation("Death-" + i, !1),
        this.deathAnimationSet = !0
    }
}
;
var Weapon = pc.createScript("weapon");
Weapon.attributes.add("name", {
    type: "string"
}),
Weapon.attributes.add("icon", {
    type: "asset",
    assetType: "texture"
}),
Weapon.attributes.add("type", {
    type: "string",
    enum: [{
        Handgun: "Handgun"
    }, {
        Rifle: "Rifle"
    }, {
        SubMachine: "SubMachine"
    }, {
        Ammo: "Ammo"
    }, {
        Attachment: "Attachment"
    }, {
        Bag: "Bag"
    }, {
        Armor: "Armor"
    }, {
        Sight: "Sight"
    }, {
        Helmet: "Helmet"
    }, {
        Grenade: "Grenade"
    }, {
        Needle: "Needle"
    }],
    default: "Handgun"
}),
Weapon.attributes.add("ammoType", {
    type: "string",
    enum: [{
        Unknown: "Unknown"
    }, {
        "9mm": "Ammo-9mm"
    }, {
        "45ACP": "Ammo-45ACP"
    }, {
        "12_Gauge": "Ammo-12_Gauge"
    }, {
        "5_56mm": "Ammo-5_56mm"
    }, {
        "7_62mm": "Ammo-7_62mm"
    }],
    default: "9mm"
}),
Weapon.attributes.add("probability", {
    type: "number"
}),
Weapon.attributes.add("recoil", {
    type: "number"
}),
Weapon.attributes.add("shootRate", {
    type: "number"
}),
Weapon.attributes.add("nextShootTime", {
    type: "number"
}),
Weapon.attributes.add("damage", {
    type: "number"
}),
Weapon.attributes.add("clipCapacity", {
    type: "number"
}),
Weapon.attributes.add("extendedCapacity", {
    type: "number"
}),
Weapon.attributes.add("automatic", {
    type: "boolean"
}),
Weapon.attributes.add("noFocus", {
    type: "boolean"
}),
Weapon.attributes.add("bigScope", {
    type: "boolean"
}),
Weapon.attributes.add("customAnimation", {
    type: "boolean"
}),
Weapon.attributes.add("rifleFocus", {
    type: "boolean"
}),
Weapon.attributes.add("longDistance", {
    type: "boolean"
}),
Weapon.attributes.add("allowSight", {
    type: "boolean"
}),
Weapon.attributes.add("allowExtend", {
    type: "boolean"
}),
Weapon.attributes.add("allowStock", {
    type: "boolean"
}),
Weapon.attributes.add("allowGrip", {
    type: "boolean"
}),
Weapon.attributes.add("allowSliderAnimation", {
    type: "boolean"
}),
Weapon.attributes.add("allowBarrel", {
    type: "boolean"
}),
Weapon.attributes.add("isShotgun", {
    type: "boolean"
}),
Weapon.attributes.add("isSniper", {
    type: "boolean"
}),
Weapon.attributes.add("onlySingle", {
    type: "boolean"
}),
Weapon.attributes.add("maskIcon", {
    type: "asset",
    assetType: "sprite"
}),
Weapon.attributes.add("focusVector", {
    type: "vec3"
}),
Weapon.attributes.add("currentAmmo", {
    type: "number",
    default: 0
}),
Weapon.attributes.add("amount", {
    type: "number",
    default: 0
}),
Weapon.prototype.initialize = function() {
    this.partMap = {},
    this.isClear = !1,
    this.clearParts()
}
,
Weapon.prototype.clearParts = function() {
    if (!this.entity.findByName("RootNode"))
        return !1;
    this.allowGrip && this.disablePart("grip"),
    this.allowStock && this.disablePart("slider"),
    this.allowSight && this.disablePart("sight"),
    this.isClear = !0
}
,
Weapon.prototype.disablePart = function(t) {
    var e = this.entity.findByName("RootNode").children[0].children
      , a = !1;
    for (var o in e) {
        var n = e[o];
        n.name.search(t) > -1 && (n.setLocalScale(.001, .001, .001),
        this.partMap[t] = n,
        a = !0)
    }
    return a
}
,
Weapon.prototype.setHeight = function() {
    var t = this.entity.getPosition().clone()
      , e = t.clone().add(Utils.heightVector)
      , a = this.app.systems.rigidbody.raycastFirst(t, e)
      , o = 1e3;
    a && (o = a.point.sub(this.entity.getPosition().clone()).length()),
    this.entity.translateLocal(0, -o, 0)
}
;
var ItemSpawn = pc.createScript("itemSpawn");
ItemSpawn.attributes.add("ambientManager", {
    type: "entity"
}),
ItemSpawn.attributes.add("mapEntities", {
    type: "entity",
    array: !0
}),
ItemSpawn.attributes.add("items", {
    type: "entity",
    array: !0
}),
ItemSpawn.attributes.add("spawnPoint", {
    type: "entity"
}),
ItemSpawn.attributes.add("spawnPointShelf", {
    type: "entity"
}),
ItemSpawn.attributes.add("dynamicWorld", {
    type: "entity"
}),
ItemSpawn.attributes.add("caseEntity", {
    type: "entity"
}),
ItemSpawn.attributes.add("safeCaseEntity", {
    type: "entity"
}),
ItemSpawn.attributes.add("physicalCapsule", {
    type: "entity"
}),
ItemSpawn.attributes.add("characterEntity", {
    type: "entity"
}),
ItemSpawn.attributes.add("distanceLimit", {
    type: "number"
}),
ItemSpawn.attributes.add("checkLimit", {
    type: "number"
}),
ItemSpawn.attributes.add("random", {
    type: "boolean"
}),
ItemSpawn.prototype.initialize = function() {
    this.app.on("Item:Drop", this.dropItem.bind(this), this),
    this.app.on("Item:Case", this.dropCase.bind(this), this),
    this.app.on("Item:Throw", this.throwItem.bind(this), this),
    this.mapEntity = this.mapEntities[this.ambientManager.script.ambient.currentIndex],
    this.tables = [],
    this.spawned = [],
    this.cases = [],
    this.index = -1,
    this.capsules = [],
    this.currentCapsuleIndex = 0,
    this.lastCheckTime = Date.now(),
    this.lastCaseCheckTime = Date.now(),
    this.createTables(),
    this.createCapsules();
    for (var t = this.items.length; t--; )
        this.items[t].enabled = !1
}
,
ItemSpawn.prototype.createTables = function() {
    if (!this.mapEntity)
        return !1;
    var t = this.mapEntity.findByTag("SpawnPoint")
      , e = this.mapEntity.getPosition().clone();
    for (var i in t) {
        var s = t[i]
          , n = this.spawnPoint;
        Math.random() > .5 && (n = this.spawnPointShelf);
        var a = n.clone();
        a.setPosition(s.getPosition().sub(e).clone()),
        a.setLocalEulerAngles(s.getEulerAngles().clone()),
        a.enabled = !0,
        this.mapEntity.addChild(a);
        var h = a.findByTag("WeaponSpawnPoint");
        this.tables.push(h),
        s.destroy()
    }
    this.app.fire("Physics:Update", !0)
}
,
ItemSpawn.prototype.spawnItem = function(t, e) {
    var i;
    Math.random();
    return this.index++,
    this.index > this.items.length - 1 && (this.index = 0),
    Math.random() > .7 && this.index % 2 == 0 && (this.index = 2 * Math.round(Math.random() * (this.items.length / 2))),
    !!(i = this.items[this.index]) && this.dropItem(i.name, t.getPosition().clone(), -1, !0, t.getEulerAngles().clone())
}
,
ItemSpawn.prototype.getWeaponDetails = function(t) {
    var e = !1;
    for (var i in this.items) {
        var s = this.items[i];
        s.script && s.script.weapon.name == t && (e = s.script.weapon)
    }
    return e
}
,
ItemSpawn.prototype.createCapsules = function() {
    for (var t = 0; t < 4; t++) {
        var e = this.physicalCapsule.clone();
        e.felt = !1,
        e.sound.positional = !0,
        e.collision.on("collisionend", function(t) {
            this.entity.felt || (this.entity.sound.play("Felt"),
            this.entity.felt = !0,
            this.entity.timer = setTimeout(function(t) {
                t.rigidbody.enabled = !1,
                t.collision.enabled = !1,
                t.children.length > 0 && t.children[0].script.interactive.updateCollisionShape()
            }, 2e3, this.entity))
        }),
        this.capsules.push(e),
        this.dynamicWorld.addChild(e)
    }
}
,
ItemSpawn.prototype.throwItem = function(t, e) {
    var i = this.findItem(t).clone();
    i.enabled = !0;
    var s = 5 * Math.random()
      , n = 10 * Math.random()
      , a = 5 * Math.random()
      , h = e.clone().add(new pc.Vec3(.1 * s,0,.1 * a))
      , o = this.capsules[this.currentCapsuleIndex];
    o.children.length > 0 && o.children[0].destroy(),
    o.addChild(i),
    o.setPosition(h),
    o.enabled = !0,
    o.felt = !1,
    o.sound.positional = !0,
    clearTimeout(o.timer),
    o.collision.enabled = !0,
    o.rigidbody.enabled = !0,
    o.rigidbody.applyImpulse(s, n, a),
    this.currentCapsuleIndex++,
    this.currentCapsuleIndex > this.capsules.length - 1 && (this.currentCapsuleIndex = 0)
}
,
ItemSpawn.prototype.dropItem = function(t, e, i, s, n) {
    var a = new pc.Vec3(0,90,0)
      , h = this.findItem(t).clone();
    return n && (a = n),
    e.add(new pc.Vec3(0,.05,0)),
    h.setPosition(e),
    h.setLocalEulerAngles(a),
    h.type = h.script.weapon.type,
    h.enabled = !0,
    s || h.script.weapon.setHeight(),
    i > -1 && (h.script.weapon.amount = i),
    this.dynamicWorld.addChild(h),
    h
}
,
ItemSpawn.prototype.getNearestItem = function(t, e) {
    for (var i = this.spawned.length, s = new pc.Vec3(0,0,0), n = 1e3; i--; )
        if (this.spawned[i] && this.spawned[i].enabled && this.spawned[i].type == t) {
            var a = this.spawned[i].getPosition().clone()
              , h = a.sub(e).length();
            h < n && (s = a,
            n = h)
        }
    return s
}
,
ItemSpawn.prototype.findItem = function(t) {
    var e = !1;
    for (var i in this.items) {
        var s = this.items[i];
        s.name == t && (e = s)
    }
    return e
}
,
ItemSpawn.prototype.checkNearestTables = function() {
    if (Date.now() - this.lastCheckTime < this.checkLimit)
        return !1;
    for (var t = this.tables.length, e = this.characterEntity.getPosition().clone(); t--; ) {
        if (this.tables[t].length > 0)
            this.tables[t][0].getPosition().clone().sub(e).length() < this.distanceLimit && (this.spawned.push(this.spawnItem(this.tables[t][0], 0)),
            this.spawned.push(this.spawnItem(this.tables[t][1], 1)),
            this.tables.splice(t, 1))
    }
    for (var i = this.spawned.length; i--; ) {
        if (this.spawned[i])
            this.spawned[i].getPosition().clone().sub(e).length() < this.distanceLimit ? this.spawned[i].enabled = !0 : this.spawned[i].enabled = !1
    }
    this.lastCheckTime = Date.now()
}
,
ItemSpawn.prototype.dropCase = function(t) {
    var e = this.caseEntity.clone();
    e.setPosition(t),
    e.enabled = !0,
    e.health = 3,
    e.maxHealth = 3,
    e._destroy = e.destroy,
    e.cases = this.cases,
    e.destroy = function() {
        var t = this.cases.indexOf(this);
        this.cases.splice(t, 1),
        this._destroy()
    }
    ,
    this.dynamicWorld.addChild(e),
    this.cases.push(e)
}
,
ItemSpawn.prototype.checkNearestCases = function() {
    if (Date.now() - this.lastCaseCheckTime < 1e3)
        return !1;
    for (var t = this.cases.length, e = 1e3; t--; )
        if (this.cases[t] && this.cases[t].enabled) {
            var i = this.characterEntity.getPosition().clone()
              , s = this.cases[t].getPosition().clone()
              , n = i.sub(s).length();
            n < 15 && e > n && (this.app.fire("Case:Health", this.cases[t]),
            e = n)
        }
    this.lastCaseCheckTime = Date.now()
}
,
ItemSpawn.prototype.update = function(t) {
    this.checkNearestTables(),
    this.checkNearestCases()
}
;
var Firebase = pc.createScript("firebase");
Firebase.attributes.add("apiKey", {
    type: "string"
}),
Firebase.attributes.add("authDomain", {
    type: "string"
}),
Firebase.attributes.add("databaseURL", {
    type: "string"
}),
Firebase.attributes.add("projectId", {
    type: "string"
}),
Firebase.attributes.add("storageBucket", {
    type: "string"
}),
Firebase.attributes.add("messagingSenderId", {
    type: "string"
}),
Firebase.attributes.add("appId", {
    type: "string"
}),
Firebase.attributes.add("measurementId", {
    type: "string"
}),
Firebase.attributes.add("prefix", {
    type: "string"
}),
Firebase.prototype.initialize = function() {
    var e = this;
    this.user = !1,
    this.data = {
        level: 1
    },
    this.loadScript("https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js", function() {
        e.onLoad()
    })
}
,
Firebase.prototype.loadScript = function(e, t) {
    var a = document.createElement("script");
    a.src = e,
    a.onload = function() {
        t()
    }
    ,
    document.body.appendChild(a)
}
,
Firebase.prototype.onLoad = function() {
    var e = this
      , t = {
        apiKey: this.apiKey,
        authDomain: this.authDomain,
        databaseURL: this.databaseURL,
        projectId: this.projectId,
        storageBucket: this.storageBucket,
        messagingSenderId: this.messagingSenderId,
        appId: this.appId,
        measurementId: this.measurementId
    };
    firebase.initializeApp(t),
    this.loadScript("https://www.gstatic.com/firebasejs/7.2.1/firebase-analytics.js", function() {
        firebase.analytics()
    }),
    this.loadScript("https://www.gstatic.com/firebasejs/7.2.1/firebase-database.js", function() {
        e.loadScript("https://www.gstatic.com/firebasejs/7.2.1/firebase-auth.js", function() {
            e.checkAuth()
        })
    }),
    console.log("[DEBUG] Firebase loaded!")
}
,
Firebase.prototype.checkAuth = function() {
    var e = this;
    firebase.auth().onAuthStateChanged(function(t) {
        t && (e.user = t,
        e.getAccountDetails())
    })
}
,
Firebase.prototype.logout = function() {
    firebase.auth().signOut()
}
,
Firebase.prototype.getProfile = function() {
    return {
        username: this.user.email.replace(this.prefix, ""),
        level: this.data.level
    }
}
,
Firebase.prototype.getAccountDetails = function() {
    var e = this
      , t = firebase.auth().currentUser.uid;
    t && firebase.database().ref("/users/" + t).once("value").then(function(t) {
        t.val() && (e.data = t.val())
    })
}
,
Firebase.prototype.setDetails = function(e) {
    var t = firebase.auth().currentUser.uid;
    firebase.database().ref("users/" + t).update(e).catch(function(e) {})
}
,
Firebase.prototype.getLeaderboard = function(e) {
    firebase.database().ref("leaderboard").limitToLast(10).once("value").then(function(e) {
        console.log(e.val())
    })
}
;
var Input = pc.createScript("input");
Input.attributes.add("placeholder", {
    type: "string"
}),
Input.attributes.add("type", {
    type: "string",
    enum: [{
        Text: "text"
    }, {
        Email: "email"
    }, {
        Password: "password"
    }],
    default: "text"
}),
Input.attributes.add("maxLength", {
    type: "number",
    default: 64
}),
Input.attributes.add("fontSize", {
    type: "number",
    default: 1
}),
Input.attributes.add("padding", {
    type: "number",
    default: 1
}),
Input.attributes.add("scaleUnit", {
    type: "string",
    enum: [{
        "Viewport Width": "vw"
    }, {
        "Viewport Height": "vh"
    }, {
        Pixel: "px"
    }],
    default: "vw"
}),
Input.attributes.add("color", {
    type: "rgb"
}),
Input.attributes.add("whitePlaceholder", {
    type: "boolean"
}),
Input.attributes.add("fontFamily", {
    type: "string",
    default: "Arial, sans-serif"
}),
Input.attributes.add("storeValue", {
    type: "boolean"
}),
Input.attributes.add("focusEntity", {
    type: "entity"
}),
Input.prototype.initialize = function() {
    this.element = document.createElement("input"),
    this.element.placeholder = this.placeholder,
    this.element.type = this.type,
    this.element.style.position = "absolute",
    this.element.style.fontFamily = this.fontFamily,
    this.element.style.border = "0px",
    this.element.style.background = "transparent",
    this.element.style.fontSize = this.fontSize + this.scaleUnit,
    this.element.style.padding = this.padding + this.scaleUnit,
    this.element.style.boxSizing = "border-box",
    this.maxLength > 0 && (this.element.maxlength = this.maxLength);
    var t = "rgb(" + 255 * this.color.r + ", " + 255 * this.color.g + ", " + 255 * this.color.b + ")";
    this.element.style.color = t,
    this.element.style.outline = "none",
    this.whitePlaceholder && (this.element.className = "white-placeholder"),
    document.body.appendChild(this.element),
    this.focusEntity && (this.focusEntity.enabled = !1,
    this.element.onfocus = this.onFocus.bind(this),
    this.element.onblur = this.onBlur.bind(this)),
    this.element.onchange = this.onChange.bind(this),
    window.localStorage.getItem(this.entity._guid) && this.setValue(window.localStorage.getItem(this.entity._guid)),
    this.updateStyle(),
    this.on("state", function(t) {
        this.entity.enabled ? this.element.style.display = "block" : this.element.style.display = "none"
    }, this)
}
,
Input.prototype.store = function() {
    this.storeValue = !0,
    this.onChange()
}
,
Input.prototype.onFocus = function() {
    this.focusEntity.enabled = !0
}
,
Input.prototype.onBlur = function() {
    this.focusEntity.enabled = !1
}
,
Input.prototype.onChange = function() {
    this.storeValue && window.localStorage.setItem(this.entity._guid, this.getValue())
}
,
Input.prototype.updateStyle = function() {
    if (this.entity.element.screenCorners) {
        var t = this.entity.element.screenCorners
          , e = 1 / this.app.graphicsDevice.maxPixelRatio;
        this.element.style.left = t[0].x * e + "px",
        this.element.style.bottom = t[0].y * e + "px",
        this.element.style.width = (t[2].x - t[0].x) * e + "px",
        this.element.style.height = (t[2].y - t[0].y) * e + "px"
    }
}
,
Input.prototype.update = function(t) {
    this.updateStyle()
}
,
Input.prototype.setValue = function(t) {
    this.element.value = t
}
,
Input.prototype.getValue = function() {
    if (this.element)
        return this.element.value
}
,
Input.prototype.focus = function() {
    this.element && this.element.focus()
}
,
Input.prototype.blur = function() {
    this.element && this.element.blur()
}
;
var Checkbox = pc.createScript("checkbox");
Checkbox.attributes.add("default", {
    type: "boolean"
}),
Checkbox.attributes.add("storeValue", {
    type: "boolean"
}),
Checkbox.attributes.add("storeWithName", {
    type: "boolean"
}),
Checkbox.attributes.add("connected", {
    type: "entity"
}),
Checkbox.attributes.add("triggerFunction", {
    type: "string"
}),
Checkbox.prototype.initialize = function() {
    (this.storeWithName ? this.elementId = this.entity.name : this.elementId = this.entity._guid,
    this.element = document.createElement("input"),
    this.element.type = "checkbox",
    this.element.style.position = "absolute",
    this.element.style.border = "0px",
    this.element.style.background = "transparent",
    this.element.style.outline = "none",
    this.element.style.margin = "0 auto",
    this.element.style.padding = "auto",
    this.element.checked = this.default,
    document.body.appendChild(this.element),
    this.updateStyle(),
    this.on("state", function(e) {
        this.entity.enabled ? this.element.style.display = "block" : this.element.style.display = "none"
    }, this),
    this.element.onchange = this.onChange.bind(this),
    this.storeValue) && (window.localStorage.getItem(this.elementId) && this.setValue(window.localStorage.getItem(this.elementId)))
}
,
Checkbox.prototype.onChange = function() {
    if (this.storeValue && window.localStorage.setItem(this.elementId, this.getValue()),
    this.connected) {
        var connectedEntity = this.connected
          , self = this.entity;
        eval("connectedEntity.script." + this.triggerFunction)
    }
}
,
Checkbox.prototype.updateStyle = function() {
    if (this.entity.element.screenCorners) {
        var e = this.entity.element.screenCorners
          , t = 1 / this.app.graphicsDevice.maxPixelRatio;
        this.element.style.left = e[0].x * t + "px",
        this.element.style.bottom = e[0].y * t + "px",
        this.element.style.width = (e[2].x - e[0].x) * t + "px",
        this.element.style.height = (e[2].y - e[0].y) * t + "px"
    }
}
,
Checkbox.prototype.update = function(e) {
    this.updateStyle()
}
,
Checkbox.prototype.setValue = function(e) {
    this.element.checked = e
}
,
Checkbox.prototype.getValue = function() {
    if (this.element)
        return this.element.checked
}
;
var Button = pc.createScript("button");
Button.attributes.add("connected", {
    type: "entity"
}),
Button.attributes.add("immediateTrigger", {
    type: "boolean"
}),
Button.attributes.add("triggerFunction", {
    type: "string"
}),
Button.attributes.add("leaveFunction", {
    type: "string"
}),
Button.attributes.add("booleanTrigger", {
    type: "boolean"
}),
Button.attributes.add("playSound", {
    type: "boolean"
}),
Button.attributes.add("waitResolve", {
    type: "boolean"
}),
Button.attributes.add("hoverScale", {
    type: "boolean"
}),
Button.prototype.initialize = function() {
    this.spinner = !1,
    this.text = !1,
    Utils.isMobile() ? (this.entity.element.on("touchstart", this.onPress, this),
    this.entity.element.on("touchend", this.onLeave, this)) : (this.entity.element.on("mouseenter", this.onHover, this),
    this.entity.element.on("mouseleave", this.onLeave, this),
    this.entity.element.on("mousedown", this.onPress, this)),
    this.entity.findByName("Spinner") && (this.spinner = this.entity.findByName("Spinner"),
    this.spinner.enabled = !1),
    this.entity.findByName("Text") && (this.text = this.entity.findByName("Text"),
    this.text.enabled = !0)
}
,
Button.prototype.onHover = function(t) {
    document.body.style.cursor = "pointer",
    this.hoverScale && this.entity.setLocalScale(1.1, 1.1, 1.1)
}
,
Button.prototype.onLeave = function(event) {
    if (document.body.style.cursor = "default",
    this.hoverScale && this.entity.setLocalScale(1, 1, 1),
    this.connected) {
        var connectedEntity = this.connected;
        this.booleanTrigger && eval("connectedEntity.script." + this.triggerFunction + " = false;"),
        this.leaveFunction && eval("connectedEntity.script." + this.leaveFunction)
    }
}
,
Button.prototype.resolve = function() {
    this.spinner.enabled = !1,
    this.text.enabled = !0,
    this.entity.button.active = !0
}
,
Button.prototype.onPress = function(t) {
    if (!this.entity.button.active)
        return !1;
    this.immediateTrigger ? this.onPressFire(t) : setTimeout(function(t, e) {
        t.onPressFire(e)
    }, 100, this, t)
}
,
Button.prototype.onPressFire = function(event) {
    if (this.playSound && this.entity.sound.play("click"),
    this.waitResolve && (this.spinner.enabled = !0,
    this.text.enabled = !1,
    this.entity.button.active = !1),
    this.connected) {
        var connectedEntity = this.connected
          , self = this.entity;
        this.booleanTrigger ? eval("connectedEntity.script." + this.triggerFunction + " = true;") : eval("connectedEntity.script." + this.triggerFunction)
    } else
        eval(this.triggerFunction)
}
;
var Rotate = pc.createScript("rotate");
Rotate.attributes.add("axis", {
    type: "string",
    enum: [{
        x: "x"
    }, {
        y: "y"
    }, {
        z: "z"
    }]
}),
Rotate.attributes.add("speed", {
    type: "number"
}),
Rotate.attributes.add("waveStyle", {
    type: "boolean"
}),
Rotate.attributes.add("waveWidth", {
    type: "number"
}),
Rotate.attributes.add("children", {
    type: "boolean"
}),
Rotate.attributes.add("graphName", {
    type: "string"
}),
Rotate.prototype.initialize = function() {
    this.currentElement = this.entity,
    this.timestamp = 0,
    this.children && (this.currentElement = this.entity.findByName(this.graphName))
}
,
Rotate.prototype.update = function(t) {
    var e = this.speed * (60 * t);
    this.waveStyle && (e = Math.cos(this.timestamp * this.speed) * this.waveWidth,
    this.timestamp += 60 * t),
    this.currentElement ? ("x" == this.axis && this.currentElement.rotateLocal(e, 0, 0),
    "y" == this.axis && this.currentElement.rotateLocal(0, e, 0),
    "z" == this.axis && this.currentElement.rotateLocal(0, 0, e)) : this.children && (this.currentElement = this.entity.findByName(this.graphName))
}
;
var Login = pc.createScript("login");
Login.attributes.add("usernameElement", {
    type: "entity"
}),
Login.attributes.add("passwordElement", {
    type: "entity"
}),
Login.attributes.add("rememberElement", {
    type: "entity"
}),
Login.attributes.add("alertElement", {
    type: "entity"
}),
Login.attributes.add("loginButton", {
    type: "entity"
}),
Login.attributes.add("profileEntity", {
    type: "entity"
}),
Login.attributes.add("menuElement", {
    type: "entity"
}),
Login.prototype.initialize = function() {}
,
Login.prototype.onModalShow = function() {
    this.profileEntity.script.profile.isAuth && this.completeLoginAction()
}
,
Login.prototype.completeLoginAction = function(t) {
    this.rememberElement.script.checkbox.getValue() && (this.usernameElement.script.input.store(),
    this.passwordElement.script.input.store()),
    this.menuElement.script.menu.openModal("profile")
}
,
Login.prototype.loginAction = function() {
    var t = this
      , e = this.usernameElement.script.input.getValue()
      , i = this.passwordElement.script.input.getValue();
    Service.post("login", {
        username: e,
        password: i
    }, function(e) {
        e.success ? (t.completeLoginAction(e),
        t.loginButton.script.button.resolve()) : (t.alertElement.script.alert.show(e.message, 6e3),
        t.loginButton.script.button.resolve())
    }, Service.authURL)
}
;
var Alert = pc.createScript("alert");
Alert.attributes.add("text", {
    type: "entity"
}),
Alert.attributes.add("length", {
    type: "number",
    default: 50
}),
Alert.prototype.initialize = function() {
    this.entity.enabled = !1
}
,
Alert.prototype.show = function(t, e) {
    this.text.element.text = t.slice(0, this.length),
    this.entity.enabled = !0,
    setTimeout(function(t) {
        t.hide()
    }, e, this)
}
,
Alert.prototype.hide = function() {
    this.entity.enabled = !1
}
;
var Menu = pc.createScript("menu");
Menu.attributes.add("homeModal", {
    type: "entity"
}),
Menu.attributes.add("loginModal", {
    type: "entity"
}),
Menu.attributes.add("signupModal", {
    type: "entity"
}),
Menu.attributes.add("profileModal", {
    type: "entity"
}),
Menu.attributes.add("leaderboardModal", {
    type: "entity"
}),
Menu.attributes.add("settingsModal", {
    type: "entity"
}),
Menu.attributes.add("shopModal", {
    type: "entity"
}),
Menu.attributes.add("appearanceModal", {
    type: "entity"
}),
Menu.attributes.add("configuratorModal", {
    type: "entity"
}),
Menu.attributes.add("mainBannerEntity", {
    type: "entity"
}),
Menu.attributes.add("iogamesLinkEntity", {
    type: "entity"
}),
Menu.attributes.add("pokiLinkEntity", {
    type: "entity"
}),
Menu.attributes.add("landscapeMode", {
    type: "entity"
}),
Menu.attributes.add("characterEntity", {
    type: "entity"
}),
Menu.attributes.add("weaponEntity", {
    type: "entity"
}),
Menu.attributes.add("hatEntity", {
    type: "entity"
}),
Menu.attributes.add("enemyCharacterEntity_1", {
    type: "entity"
}),
Menu.attributes.add("weaponEntity_1", {
    type: "entity"
}),
Menu.attributes.add("rotatoryEntity", {
    type: "entity"
}),
Menu.attributes.add("changeSmokeEntity", {
    type: "entity"
}),
Menu.attributes.add("rewardContentEntity", {
    type: "entity"
}),
Menu.attributes.add("rewardTitle", {
    type: "entity"
}),
Menu.attributes.add("rewardImage", {
    type: "entity"
}),
Menu.attributes.add("alertEntity", {
    type: "entity"
}),
Menu.attributes.add("alertMessage", {
    type: "entity"
}),
Menu.attributes.add("cameraEntity", {
    type: "entity"
}),
Menu.attributes.add("versionElement", {
    type: "entity"
}),
Menu.attributes.add("playButton", {
    type: "entity"
}),
Menu.attributes.add("menuButtons", {
    type: "entity",
    array: !0
}),
Menu.attributes.add("screenSizeElements", {
    type: "entity",
    array: !0
}),
Menu.attributes.add("bannerAreas", {
    type: "entity",
    array: !0
}),
Menu.attributes.add("pokiMainBanner", {
    type: "entity"
}),
Menu.attributes.add("maps", {
    type: "string",
    array: !0
}),
Menu.attributes.add("earnGoldButton", {
    type: "entity"
}),
Menu.attributes.add("matchGroupEntity", {
    type: "entity"
}),
Menu.attributes.add("friendsListEntity", {
    type: "entity"
}),
Menu.attributes.add("linksEntity", {
    type: "entity"
}),
Menu.attributes.add("accountEntity", {
    type: "entity"
}),
Menu.attributes.add("featuredYoutuber", {
    type: "entity"
}),
Menu.attributes.add("earnGoldGroup", {
    type: "entity"
}),
Menu.attributes.add("linkElements", {
    type: "entity",
    array: !0
}),
Menu.attributes.add("mobileVersion", {
    type: "string"
}),
Menu.attributes.add("friendEntity", {
    type: "entity"
}),
Menu.attributes.add("friendCharacterEntity", {
    type: "entity"
}),
Menu.attributes.add("friendWeaponEntity", {
    type: "entity"
}),
Menu.attributes.add("friendUsername", {
    type: "entity"
}),
Menu.attributes.add("inviteConfirmation", {
    type: "entity"
}),
Menu.attributes.add("inviteMessage", {
    type: "entity"
}),
Menu.attributes.add("leavePartyButton", {
    type: "entity"
}),
Menu.attributes.add("invitePartyButton", {
    type: "entity"
}),
Menu.attributes.add("readyMatchText", {
    type: "entity"
}),
Menu.attributes.add("twitchLiveText", {
    type: "entity"
}),
Menu.attributes.add("twitchLiveButton", {
    type: "entity"
}),
Menu.prototype.initialize = function() {
    pc.network = {
        IP: "",
        roomId: "",
        radiusId: 0,
        gameMode: "BATTLEROYALE"
    },
    this.isPlayingCloth = !1,
    this.lastCrateBuy = 0,
    this.weaponAttached = !1,
    this.weaponAttached_1 = !1,
    this.weaponAttached_2 = !1,
    this.activeAnimationTimer = !1,
    this.lastEarnGold = 0,
    this.alreadyWaitingMatch = !1,
    this.currentAnimation = "None",
    this.activeModal = "none",
    this.lastScreenSizeUpdate = Date.now(),
    this.setActiveMenuButton(this.activeModal),
    this.startUIFix = !1,
    "undefined" == typeof VERSION ? this.versionElement.element.text = "v1.0.0" : this.versionElement.element.text = "v" + VERSION,
    document.body.oncontextmenu = function() {
        return !1
    }
    ,
    "undefined" != typeof VERSION && (window.onbeforeunload = function() {
        return "Are you sure you want to leave?"
    }
    ),
    (document.referrer.search("crazygames") > -1 || "crazygames" == Utils.getURLParams("ref")) && (this.iogamesLinkEntity.enabled = !1,
    this.pokiLinkEntity.enabled = !1),
    document.referrer.search("iogames.space") > -1 ? this.iogamesLinkEntity.enabled = !0 : this.iogamesLinkEntity.enabled = !1,
    "undefined" != typeof PokiSDK && (VERSION && window.localStorage.getItem("last_version") != VERSION && (PokiSDK.gameLoadingFinished(),
    window.localStorage.setItem("last_version", VERSION)),
    this.disableBanners(),
    this.enablePokiBanners()),
    document.referrer.search("no-ads") > -1 || document.referrer.search("kongregate") > -1 ? (this.iogamesLinkEntity.enabled = !1,
    this.disableBanners(),
    pc.denyAds = !0) : pc.denyAds = !1,
    this.app.on("Profile:Ready", this.autoLogin, this),
    this.showGoldButton(),
    this.setQuality(),
    this.setMasterVolume(),
    this.setMouseSensitivity(),
    this.setAnimation("Rifle-Walk"),
    this.checkMobileMode(),
    this.getDetails(),
    this.app.on("InviteService:Join", this.joinFriend, this),
    this.app.on("InviteService:Leave", this.leftFriend, this);
    var t = this.enemyCharacterEntity_1
      , e = this.weaponEntity_1
      , i = this;
    this.app.assets.get(this.enemyCharacterEntity_1.model.asset).ready(function() {
        i.attachWeapon(t, e)
    })
}
,
Menu.prototype.leftFriend = function() {
    this.friendEntity.enabled = !1
}
,
Menu.prototype.joinFriend = function(t, e) {
    var i = this;
    if (this.friendEntity.enabled = !0,
    this.friendUsername.element.text = t + "",
    e) {
        var n = this.app.assets.find(e + "-Character");
        this.friendCharacterEntity.model.asset = n
    }
    var a = this.friendCharacterEntity
      , o = this.friendWeaponEntity;
    this.app.assets.get(this.friendCharacterEntity.model.asset).ready(function() {
        i.attachWeapon(a, o)
    })
}
,
Menu.prototype.acceptInvite = function() {
    var t = this;
    Service.post("accept_invite", {
        invite_id: pc.inviteId
    }, function(e) {
        t.profileModal.script.profile.getFriendLeaderboard()
    }),
    this.inviteConfirmation.enabled = !1,
    this.leavePartyButton.enabled = !0,
    this.invitePartyButton.enabled = !1
}
,
Menu.prototype.declineInvite = function() {
    var t = this;
    Service.post("decline_invite", {
        invite_id: pc.inviteId
    }, function(e) {
        t.profileModal.script.profile.getFriendLeaderboard()
    }),
    this.inviteConfirmation.enabled = !1,
    this.leavePartyButton.enabled = !1,
    this.invitePartyButton.enabled = !0,
    this.friendEntity.enabled = !1,
    pc.inviteId = -1
}
,
Menu.prototype.inviteUser = function(t) {
    this.app.fire("InviteService:Invite", t)
}
,
Menu.prototype.readyMatch = function() {}
,
Menu.prototype.getDetails = function() {
    var t = this
      , e = Date.now();
    Service.post("get_details", {}, function(i) {
        if (i) {
            pc.country = i.country;
            var n = (Date.now() - e) / 1e3
              , a = 1;
            n < 100 ? a = 3 : n < 300 ? a = 2 : n >= 300 && (a = 1),
            pc.signalLevel = a,
            i.twitch && i.twitch.success && t.setTwitchLive(i.twitch.username, i.twitch.display_name),
            pc.app.fire("Server:Update", !0)
        }
    }, Service.generalURL)
}
,
Menu.prototype.checkTwitchLive = function() {}
,
Menu.prototype.setTwitchLive = function(t, e) {
    if (t) {
        var i = "https://www.twitch.tv/" + t;
        this.twitchLiveText.element.text = e + ' [color="#dddddd"]is live now![/color]',
        this.twitchLiveButton.script.button.triggerFunction = "window.open('" + i + "');",
        this.twitchLiveButton.enabled = !0
    } else
        this.twitchLiveButton.enabled = !1
}
,
Menu.prototype.getReadyUsers = function() {}
,
Menu.prototype.setReadyUsers = function(t) {
    if (!t)
        return this.leavePartyButton.enabled = !1,
        this.invitePartyButton.enabled = !0,
        this.friendEntity.enabled = !1,
        this.readyMatchText.element.text = "Play Now",
        this.readyMatchText.element.fontSize = 32,
        this.playButton.script.button.active = !0,
        pc.inviteId = -1,
        pc.isHost = !1,
        !1;
    t.friend_id == pc.username && "1" == t.user_ready ? this.friendUsername.element.color = new pc.Color(0,.9,0) : t.user_id == pc.username && "1" == t.friend_ready && (this.friendUsername.element.color = new pc.Color(0,.9,0),
    pc.isHost = !0);
    var e = 0;
    "1" == t.user_ready && e++,
    "1" == t.friend_ready && e++,
    this.readyMatchText.element.text = "Ready (" + e + " / 2)",
    this.readyMatchText.element.fontSize = 20,
    2 === e && this.findMatch()
}
,
Menu.prototype.showInviteAlert = function(t, e) {
    this.inviteConfirmation.enabled = !0,
    this.inviteMessage.element.text = e,
    pc.inviteId = t
}
,
Menu.prototype.checkMobileMode = function() {
    Utils.isMobile() ? (window.innerWidth < window.innerHeight ? this.landscapeMode.enabled = !0 : this.landscapeMode.enabled = !1,
    this.mainBannerEntity.enabled = !1,
    this.linksEntity.enabled = !1,
    this.featuredYoutuber.enabled = !1,
    this.friendsListEntity.enabled = !1,
    this.matchGroupEntity.setLocalScale(1.5, 1.5, 1.5),
    this.accountEntity.setLocalScale(1.5, 1.5, 1.5),
    this.accountEntity.setLocalPosition(0, 50, 0),
    this.earnGoldGroup.setLocalScale(1.5, 1.5, 1.5),
    this.earnGoldGroup.setLocalPosition(0, -20, 0)) : this.landscapeMode.enabled = !1
}
,
Menu.prototype.enablePokiBanners = function() {
    "true" === window.localStorage.getItem("PokiBannerAllow") && (this.pokiMainBanner.enabled = !0),
    window.localStorage.setItem("PokiBannerAllow", !0)
}
,
Menu.prototype.disableBanners = function() {
    for (var t = this.bannerAreas.length; t--; )
        this.bannerAreas[t] && (this.bannerAreas[t].enabled = !1)
}
,
Menu.prototype.attachWeapon = function(t, e) {
    var i = t.findByName("Hand_R");
    e.reparent(i),
    e.setLocalScale(100, 100, 100)
}
,
Menu.prototype.toggleMusicMute = function() {}
,
Menu.prototype.inviteFriend = function() {
    if (pc.hash) {
        var t = prompt("Please enter your friend's name", "");
        null !== t ? this.profileModal.script.profile.followFriend(t) : this.showAlert("Please enter username!")
    } else
        this.showAlert("Please login first!")
}
,
Menu.prototype.attachHat = function(t, e) {
    var i = t.findByName("Head");
    e.reparent(i),
    e.setLocalScale(100, 100, 100)
}
,
Menu.prototype.autoLogin = function() {
    var t = Service.get("hash");
    t ? (pc.hash = t,
    this.profileModal.script.profile.getDetails()) : "signup" == Utils.getURLParams("ref") && setTimeout(function(t) {
        t.openModal("signup")
    }, 100, this),
    this.profileModal.script.profile.getDetails()
}
,
Menu.prototype.setMouseSensitivity = function() {
    var t = window.localStorage.getItem("MouseSensitivity");
    if ((t = parseInt(t)) > 0) {
        var e = t / 100;
        e = Math.min(e, 1),
        pc.mouseSensitivity = e
    }
}
,
Menu.prototype.setMasterVolume = function() {
    var t = window.localStorage.getItem("Volume");
    if ((t = parseInt(t)) > -1) {
        var e = t / 100;
        e = Math.min(e, 1),
        this.app._audioManager.volume = e
    }
}
,
Menu.prototype.setQuality = function() {
    var t = window.localStorage.getItem("Quality");
    if ((t = parseInt(t)) > 0) {
        var e = t / 100;
        e = Math.min(e, 1),
        e = Math.max(e, .5),
        this.app.graphicsDevice.maxPixelRatio = e
    }
}
,
Menu.prototype.setActiveMenuButton = function(t) {
    for (var e = this.menuButtons.length; e--; )
        this.menuButtons[e].name == t || this.menuButtons[e].tags.list().indexOf(t) > -1 ? (this.menuButtons[e].element.opacity = .05,
        this.menuButtons[e].children[0].element.opacity = 1,
        this.menuButtons[e].children[1].element.opacity = 1) : (this.menuButtons[e].element.opacity = 0,
        this.menuButtons[e].children[0].element.opacity = .8,
        this.menuButtons[e].children[1].element.opacity = .8)
}
,
Menu.prototype.openSkins = function() {
    this.openModal("appearance"),
    this.profileModal.script.profile.getSkins()
}
,
Menu.prototype.closeReward = function() {
    this.rewardContentEntity.enabled = !1,
    this.rewardTitle.enabled = !1,
    this.rewardImage.enabled = !1
}
,
Menu.prototype.openReward = function(t) {
    this.rewardContentEntity.enabled = !0,
    "skin" != t.type && "skin_1" != t.type || (this.rewardTitle.enabled = !0,
    this.rewardImage.enabled = !0,
    this.rewardTitle.element.text = t.name + " skin",
    this.rewardImage.element.textureAsset = this.app.assets.find(t.name + "-CharacterThumbnail"))
}
,
Menu.prototype.showGoldButton = function() {
    var t = Service.get("last_gold");
    if (t) {
        var e = Date.now() - t;
        this.earnGoldButton.enabled = e > 3e5
    } else
        this.earnGoldButton.enabled = !0
}
,
Menu.prototype.getGold = function() {
    var t = this;
    isAdBlockActive ? this.showAlert("Please disable Adblock extension!") : (this.profileModal.script.profile.getGold(function(e) {
        t.showAlert(e)
    }, function(e) {
        t.showAlert(e)
    }),
    Service.set("last_gold", Date.now()),
    this.showGoldButton(),
    this.entity.sound.stop("Music"))
}
,
Menu.prototype.earnGold = function() {
    if (Date.now() - this.lastEarnGold < 1e3)
        return !1;
    var t = this;
    "undefined" != typeof PokiSDK ? PokiSDK.commercialBreak().then(function() {
        t.getGold()
    }).catch(function() {
        t.showAlert("We are unable to show preroll!")
    }) : "undefined" != typeof aiptag ? (pc.adsCallback = this.getGold.bind(this),
    aiptag.cmd.player.push(function() {
        adplayer.startPreRoll()
    })) : this.showAlert("We are unable to show preroll!"),
    this.lastEarnGold = Date.now()
}
,
Menu.prototype.switchSkin = function(t) {
    var e = this.app.assets.find(t + "-Character");
    if (!e)
        return !1;
    var i = this;
    this.characterEntity.model.asset = e,
    this.profileModal.script.profile.setSkin(t),
    e.ready(function(t) {
        i.weaponAttached = !1
    }),
    pc.skin = t,
    "appearance" == this.activeModal && (this.isPlayingCloth || (this.isPlayingCloth = !0,
    clearTimeout(this.activeAnimationTimer),
    this.activeAnimationTimer = setTimeout(function(t) {
        t.activeModal,
        t.isPlayingCloth = !1
    }, 5200, this)),
    this.changeSmokeEntity.particlesystem.reset(),
    this.changeSmokeEntity.particlesystem.play(),
    this.entity.sound.play("ClothChange"))
}
,
Menu.prototype.buyCrate = function(t, e) {
    if (Date.now() - this.lastCrateBuy < 5e3)
        return this.showAlert("Please wait 2 seconds!"),
        this.rewardContentEntity.enabled = !1,
        e.resolve(),
        !1;
    var i = this;
    this.profileModal.script.profile.buyCrate(t, function(t) {
        e.resolve(),
        i.openReward(t)
    }, function(t) {
        e.resolve(),
        i.showAlert(t)
    }),
    this.lastCrateBuy = Date.now()
}
,
Menu.prototype.openAccount = function() {
    this.profileModal.script.profile.getFriends(),
    this.openModal("login")
}
,
Menu.prototype.openModal = function(t) {
    this.closeAllModals(!0),
    this[t + "Modal"].enabled = !0,
    this[t + "Modal"] && this[t + "Modal"].script && this[t + "Modal"].script.scripts.length > 0 && this[t + "Modal"].script.scripts[0].onModalShow && this[t + "Modal"].script.scripts[0].onModalShow(),
    this.activeModal = t,
    this.setActiveMenuButton(this.activeModal),
    this.activeModal
}
,
Menu.prototype.setAnimation = function(t, e) {
    this.currentAnimation != t && (e > 0 ? this.characterEntity.animation.play(t, e) : this.characterEntity.animation.play(t, .1),
    this.currentAnimation = t),
    this.characterEntity && !this.characterEntity.model && setTimeout(function(e) {
        e.setAnimation(t)
    }, 100, this)
}
,
Menu.prototype.closeModal = function(t) {
    this[t + "Modal"].enabled = !1,
    this.activeModal = "none"
}
,
Menu.prototype.setScreenSize = function() {
    if (Date.now() - this.lastScreenSizeUpdate < 100)
        return !1;
    for (var t = this.entity.screen.scale, e = this.entity.screen._resolution, i = this.screenSizeElements.length; i--; ) {
        var n = this.screenSizeElements[i];
        n.enabled && (n.element.calculatedWidth = e.x / t,
        n.element.calculatedHeight = e.y / t)
    }
    this.lastScreenSizeUpdate = Date.now()
}
,
Menu.prototype.startMatchDelay = function() {
    this.showPreroll()
}
,
Menu.prototype.showPreroll = function() {
    if (this.mainBannerEntity.enabled = !1,
    this.app.fire("InviteService:Kill", !0),
    "undefined" != typeof PokiSDK) {
        var t = this;
        PokiSDK.commercialBreak().then(function() {
            t.findMatch()
        }).catch(function() {
            t.findMatch()
        })
    } else
        this.findMatch()
}
,
Menu.prototype.showAlert = function(t) {
    this.alertEntity.enabled = !0,
    this.alertMessage.element.text = t
}
,
Menu.prototype.closeAlert = function() {
    this.alertEntity.enabled = !1
}
,
Menu.prototype.findMatch = function() {
    if (this.alreadyWaitingMatch)
        return !1;
    this.closeAllModals(),
    this.disableBanners(),
    this.alreadyWaitingMatch = !0,
    this.weaponEntity.destroy(),
    this.requestMatch()
}
,
Menu.prototype.requestMatch = function() {
    var t = "1.0.0"
      , e = this;
    "undefined" != typeof VERSION && (t = VERSION);
    -1 !== pc.inviteId && (pc.inviteId,
    pc.isHost),
    Service.post("find_match", {
        country: "EU",
        game_mode: "BATTLEROYALE",
        maps: this.maps.join(","),
        version: t
    }, function(t) {
        t.success ? t.session ? (pc.selectedMap = t.session.map,
        pc.network.IP = t.session.ip,
        pc.network.roomId = t.session.room_id,
        pc.network.radiusId = t.session.radius,
        pc.network.gameMode = t.session.game_mode,
        e.loadScene("Game")) : alert("Couldn't find match, try again please") : t.waiting ? setTimeout(function() {
            e.requestMatch()
        }, 2e3) : (alert(t.message),
        e.playButton.script.button.resolve())
    })
}
,
Menu.prototype.closeAllModals = function(t) {
    var e = this.entity.root.findByTag("Modal");
    for (var i in e) {
        e[i].enabled = !1
    }
    this.setActiveMenuButton("none"),
    t || (this.homeModal.enabled = !0)
}
,
Menu.prototype.loadScene = function(t) {
    var e = this
      , i = pc.app._sceneRegistry.find(t).url
      , n = pc.app.root.findByName("Root");
    "undefined" != typeof VERSION && (i = i + "?v=" + VERSION),
    pc.app.loadSceneHierarchy(i, function(t, i) {
        t ? console.error(t) : (e.playButton.script.button.resolve(),
        n.destroy())
    })
}
,
Menu.prototype.update = function(t) {
    this.setScreenSize(),
    this.checkMobileMode(),
    this.startUIFix || (this.startUIFix = !0,
    this.closeAllModals()),
    this.characterEntity && this.characterEntity.model && !this.weaponAttached && (this.attachWeapon(this.characterEntity, this.weaponEntity),
    this.attachHat(this.characterEntity, this.hatEntity),
    this.weaponAttached = !0),
    "appearance" == this.activeModal ? (this.cameraEntity.camera.fov = pc.math.lerp(this.cameraEntity.camera.fov, 35, .1),
    this.cameraEntity.script.rotate.waveStyle = !1,
    this.cameraEntity.setLocalEulerAngles(5.18, -6.28, 0),
    this.characterEntity.animation.speed = .7,
    this.rotatoryEntity.script.rotate.speed = pc.math.lerp(this.rotatoryEntity.script.rotate.speed, -.02, .3)) : (this.cameraEntity.camera.fov = pc.math.lerp(this.cameraEntity.camera.fov, 40, .1),
    this.cameraEntity.script.rotate.waveStyle = !0,
    this.rotatoryEntity.script.rotate.speed = -.05,
    this.characterEntity.animation.speed = 1)
}
;
var Signup = pc.createScript("signup");
Signup.attributes.add("usernameElement", {
    type: "entity"
}),
Signup.attributes.add("passwordElement", {
    type: "entity"
}),
Signup.attributes.add("alertElement", {
    type: "entity"
}),
Signup.attributes.add("signupButton", {
    type: "entity"
}),
Signup.attributes.add("menuElement", {
    type: "entity"
}),
Signup.prototype.initialize = function() {}
,
Signup.prototype.completeSignupAction = function(t) {
    this.menuElement.script.menu.openModal("login")
}
,
Signup.prototype.signupAction = function() {
    var t = this
      , e = this.usernameElement.script.input.getValue()
      , n = this.passwordElement.script.input.getValue();
    Service.post("create_account", {
        username: e,
        password: n
    }, function(e) {
        e.success ? (t.completeSignupAction(e),
        t.signupButton.script.button.resolve()) : (t.alertElement.script.alert.show(e.message, 6e3),
        t.signupButton.script.button.resolve())
    }, Service.authURL)
}
;
var Profile = pc.createScript("profile");
Profile.attributes.add("menuEntity", {
    type: "entity"
}),
Profile.attributes.add("usernameElement", {
    type: "entity"
}),
Profile.attributes.add("levelElement", {
    type: "entity"
}),
Profile.attributes.add("goldElement", {
    type: "entity"
}),
Profile.attributes.add("goldElements", {
    type: "entity",
    array: !0
}),
Profile.attributes.add("experienceElement", {
    type: "entity"
}),
Profile.attributes.add("experienceBar", {
    type: "entity"
}),
Profile.attributes.add("nextLevelElement", {
    type: "entity"
}),
Profile.attributes.add("killsElement", {
    type: "entity"
}),
Profile.attributes.add("deathsElement", {
    type: "entity"
}),
Profile.attributes.add("headshotsElement", {
    type: "entity"
}),
Profile.attributes.add("topPositionElement", {
    type: "entity"
}),
Profile.attributes.add("gameTimeElement", {
    type: "entity"
}),
Profile.attributes.add("lastMatchKillsElement", {
    type: "entity"
}),
Profile.attributes.add("lastMatchTimeElement", {
    type: "entity"
}),
Profile.attributes.add("lastMatchPositionElement", {
    type: "entity"
}),
Profile.attributes.add("totalWinElement", {
    type: "entity"
}),
Profile.attributes.add("totalGamesElement", {
    type: "entity"
}),
Profile.attributes.add("KDRElement", {
    type: "entity"
}),
Profile.attributes.add("badgesHolder", {
    type: "entity"
}),
Profile.attributes.add("badgeElement", {
    type: "entity"
}),
Profile.attributes.add("dailyRankEntity", {
    type: "entity"
}),
Profile.attributes.add("dailyRankValue", {
    type: "entity"
}),
Profile.attributes.add("dailyRankDate", {
    type: "entity"
}),
Profile.attributes.add("friendUsernameElement", {
    type: "entity"
}),
Profile.attributes.add("friendsContent", {
    type: "entity"
}),
Profile.attributes.add("friendRowEntity", {
    type: "entity"
}),
Profile.attributes.add("followersContent", {
    type: "entity"
}),
Profile.attributes.add("followersRowEntity", {
    type: "entity"
}),
Profile.attributes.add("followersCount", {
    type: "entity"
}),
Profile.attributes.add("passwordElement", {
    type: "entity"
}),
Profile.attributes.add("emailElement", {
    type: "entity"
}),
Profile.attributes.add("saveSettingsButton", {
    type: "entity"
}),
Profile.attributes.add("shortcutUsername", {
    type: "entity"
}),
Profile.attributes.add("shortcutProfileImage", {
    type: "entity"
}),
Profile.attributes.add("shortcutLevel", {
    type: "entity"
}),
Profile.attributes.add("shortcutLevelBadge", {
    type: "entity"
}),
Profile.attributes.add("shortcutExperienceHolder", {
    type: "entity"
}),
Profile.attributes.add("shortcutExperienceBar", {
    type: "entity"
}),
Profile.attributes.add("shortcutExperienceElement", {
    type: "entity"
}),
Profile.attributes.add("shortcutLoginButton", {
    type: "entity"
}),
Profile.attributes.add("profilePictures", {
    type: "entity",
    array: !0
}),
Profile.attributes.add("skinHolder", {
    type: "entity"
}),
Profile.attributes.add("skinItem", {
    type: "entity"
}),
Profile.attributes.add("friendLeaderboardEntity", {
    type: "entity"
}),
Profile.attributes.add("friendLeaderboardHolder", {
    type: "entity"
}),
Profile.attributes.add("friendLeaderboardRow", {
    type: "entity"
}),
Profile.attributes.add("friendLeaderboardLoading", {
    type: "entity"
}),
Profile.attributes.add("loginRequiredEntities", {
    type: "entity",
    array: !0
}),
Profile.prototype.initialize = function() {
    this.isAuth = !1,
    this.lastFriendsUpdate = 0,
    this.invitedUsername = !1,
    this.followedUsers = [],
    this.followers = [],
    this.currentSkin = "Biker",
    this.friendLeaderboard = [],
    this.lastFriendLeaderboard = 0,
    this.friendUsernames = [],
    this.partyUsers = [],
    this.friendsList = [],
    this.onlineFriends = [],
    this.skins = [],
    this.partyId = "none",
    this.badgeElement.enabled = !1,
    this.app.on("FriendList:List", this.setOnlineList, this),
    this.app.on("FriendList:Online", this.setOnlineUser, this),
    this.app.on("FriendList:Offline", this.setOfflineUser, this),
    this.app.on("InviteService:Invite", this.setInvite, this),
    this.app.on("FriendList:Left", this.setFriendLeft, this),
    this.app.on("FriendList:JoinParty", this.setParty, this),
    this.menu = this.menuEntity.script.menu,
    this.app.fire("Profile:Ready", !0)
}
,
Profile.prototype.setParty = function(e) {
    this.partyId = e,
    this.invitedUsername && this.partyUsers.push(this.inviteUsername);
    "none" == this.partyId && (this.partyUsers = [],
    this.invitedUsername = !1),
    this.setFriendLeaderboard(this.friendsList)
}
,
Profile.prototype.setFriendLeft = function(e) {
    this.invitedUsername == e && (this.invitedUsername = !1),
    this.setFriendLeaderboard(this.friendsList)
}
,
Profile.prototype.setInvite = function(e) {
    this.invitedUsername = e
}
,
Profile.prototype.setInvite = function(e) {
    this.invitedUsername = e,
    this.setFriendLeaderboard(this.friendsList)
}
,
Profile.prototype.setOnlineList = function(e) {
    this.onlineFriends = e,
    this.setFriendLeaderboard(this.friendsList)
}
,
Profile.prototype.setOnlineUser = function(e) {
    -1 === this.onlineFriends.indexOf(e) && (this.onlineFriends.push(e),
    this.setFriendLeaderboard(this.friendsList))
}
,
Profile.prototype.setOfflineUser = function(e) {
    var t = this.onlineFriends.indexOf(e);
    this.invitedUsername == e && (this.invitedUsername = !1),
    t > -1 && (this.onlineFriends.splice(t, 1),
    this.setFriendLeaderboard(this.friendsList))
}
,
Profile.prototype.disableLoginRequiredEntities = function() {
    for (var e = this.loginRequiredEntities.length; e--; )
        this.loginRequiredEntities[e].enabled = !1
}
,
Profile.prototype.setDetails = function(e) {
    var t = this;
    t.isAuth = !0,
    e.hash && (pc.hash = e.hash,
    pc.username = e.username,
    Service.set("hash", pc.hash)),
    t.usernameElement.element.text = e.username,
    t.usernameElement.findByName("Verified").enabled = "1" == e.verified,
    t.app.fire("Start:InviteService", !0),
    "1" == e.verified && t.usernameElement.setLocalPosition(110, 0, 0),
    t.levelElement.element.text = e.level + "",
    t.nextLevelElement.element.text = "Next level : " + (e.level + 1);
    Math.floor(e.experience);
    var i = Math.pow(10 * e.level, 2)
      , n = Math.pow(10 * (e.level - 1), 2)
      , r = e.experience - n
      , s = i - n;
    for (var a in t.experienceBar.element.width = 100 * r / s * 4,
    t.experienceElement.element.text = e.experience + " / " + i,
    100 * r / s > 10 ? (t.experienceElement.enabled = !0,
    t.shortcutExperienceElement.enabled = !0) : (t.experienceElement.enabled = !1,
    t.shortcutExperienceElement.enabled = !1),
    t.goldElements) {
        t.goldElements[a].element.text = e.coins + ""
    }
    t.killsElement.element.text = e.kills + "",
    t.deathsElement.element.text = e.deaths + "",
    t.headshotsElement.element.text = e.headshots + "",
    t.gameTimeElement.element.text = Utils.mmss(e.total_game_time) + "",
    t.totalWinElement.element.text = e.total_games_won + "",
    t.totalGamesElement.element.text = e.total_games_played + "",
    t.KDRElement.element.text = e.kdr + "",
    e.current_rank > 0 ? (t.dailyRankEntity.enabled = !0,
    t.dailyRankValue.element.text = e.current_rank + ".") : (t.dailyRankEntity.enabled = !0,
    t.dailyRankValue.element.text = "254233."),
    t.dailyRankDate.element.text = Utils.timeCountBack(e.daily_rank_date),
    t.lastMatchKillsElement.element.text = e.last_match_kills + "",
    t.lastMatchTimeElement.element.text = Utils.mmss(e.last_match_time) + "",
    t.lastMatchPositionElement.element.text = e.last_match_position + "",
    t.shortcutUsername.element.text = e.username,
    t.shortcutUsername.findByName("Verified").enabled = "1" == e.verified,
    "1" == e.verified && t.shortcutUsername.setLocalPosition(100, 0, 0),
    t.shortcutLevel.element.text = e.level + "",
    t.shortcutExperienceBar.element.width = 100 * r / s * 1.5,
    t.shortcutExperienceElement.element.text = e.experience + " / " + i,
    t.shortcutLoginButton.enabled = !1,
    t.shortcutExperienceHolder.enabled = !0,
    t.shortcutLevelBadge.enabled = !0,
    t.setProfilePicture(e.active_skin),
    t.getSkins(),
    t.setDefaultSkin(),
    t.setBadges(e.badges),
    t.disableLoginRequiredEntities(),
    t.getFriendLeaderboard(),
    void 0 !== pc.miniplay && (pc.miniplay.save("total_kills", e.kills),
    pc.miniplay.save("total_deaths", e.deaths),
    pc.miniplay.save("total_experience", e.experience)),
    window.localStorage.setItem("miniroyale2_account_refresh", Date.now())
}
,
Profile.prototype.getDetails = function() {
    var e = window.localStorage.getItem("miniroyale2_account_details");
    if (e) {
        e = JSON.parse(e);
        parseInt(window.localStorage.getItem("miniroyale2_account_refresh"));
        this.entity.enabled && this.setDetails(e)
    }
    if (Date.now() - pc.detailsRequestDate < 1e3)
        return !1;
    var t = this;
    Service.post("get_details", {
        hash: pc.hash
    }, function(e) {
        e && e.success ? (window.localStorage.setItem("miniroyale2_account_details", JSON.stringify(e)),
        t.setDetails(e)) : (t.isAuth = !1,
        console.log("Please login first!"))
    }, Service.authURL),
    pc.detailsRequestDate = Date.now()
}
,
Profile.prototype.setBadges = function(e) {
    var t = JSON.parse(e);
    for (var i in t) {
        var n = t[i];
        if (n) {
            var r = this.app.assets.find(n + "-badge.png");
            if (r) {
                var s = this.badgeElement.clone();
                s.element.textureAsset = r.id,
                s.enabled = !0,
                s.setLocalPosition(40 * -parseInt(i), 0, 0),
                this.badgesHolder.addChild(s)
            }
        }
    }
}
,
Profile.prototype.onModalShow = function() {
    this.getDetails()
}
,
Profile.prototype.setProfilePicture = function(e) {
    for (var t = this.profilePictures.length, i = this.app.assets.find(e + "-CharacterThumbnail"); t--; )
        this.profilePictures[t] && e && i && (this.profilePictures[t].element.textureAsset = i)
}
,
Profile.prototype.getRankChart = function() {
    Service.post("get_position_chart", {
        hash: pc.hash
    }, function(e) {})
}
,
Profile.prototype.saveSettings = function() {
    var e = this
      , t = this.passwordElement.script.input.getValue()
      , i = this.emailElement.script.input.getValue();
    Service.post("save_account", {
        password: t,
        email: i
    }, function(t) {
        t.success || alert(t.message),
        e.saveSettingsButton.script.button.resolve()
    })
}
,
Profile.prototype.getGold = function(e, t) {
    Service.post("claim_reward", {
        hash: pc.hash
    }, function(i) {
        i.success ? e(i.message) : t(i.message)
    })
}
,
Profile.prototype.buyCrate = function(e, t, i) {
    var n = this;
    Service.post("open_crate", {
        type: e
    }, function(e) {
        e.success ? (t(e.crate),
        n.getDetails()) : i(e.message)
    })
}
,
Profile.prototype.clearFriends = function() {
    for (var e in this.followers) {
        this.followers[e];
        this.followers[e].destroy()
    }
    for (var t in this.followedUsers) {
        this.followedUsers[t];
        this.followedUsers[t].destroy()
    }
    this.followers = [],
    this.followedUsers = []
}
,
Profile.prototype.setFriends = function(e) {
    var t = e.followers
      , i = e.followings;
    if (null === Service.get("followers") && this.app.fire("Interface:Notification", "You have new followers!"),
    null != Service.get("followers") && Service.get("followers") < t.length) {
        var n = t.length - parseInt(Service.get("followers"));
        this.app.fire("Interface:Notification", 'You have [color="#FFFF00"]' + n + " new[/color] followers.")
    }
    for (var r in Service.set("followers", t.length),
    i) {
        var s = i[r];
        this.friendRowEntity.findByName("Username").element.text = s.username,
        this.friendRowEntity.findByName("Unfollow").script.button.triggerFunction = "profile.unfollowFriend('" + s.username + "');",
        s.active_skin ? this.friendRowEntity.findByName("ProfileImage").element.textureAsset = this.app.assets.find(s.active_skin + "-CharacterThumbnail") : this.friendRowEntity.findByName("ProfileImage").element.textureAsset = this.app.assets.find("no_photo.jpg");
        var a = this.friendRowEntity.clone();
        a.setLocalPosition(0, -parseInt(33 * r), 0),
        a.enabled = !0,
        this.friendsContent.addChild(a),
        this.followedUsers.push(a)
    }
    for (var o in t) {
        var l = t[o];
        this.followersRowEntity.findByName("Username").element.text = l.username,
        this.followersRowEntity.findByName("Follow").script.button.triggerFunction = "profile.followFriend('" + l.username + "');",
        l.active_skin ? this.followersRowEntity.findByName("ProfileImage").element.textureAsset = this.app.assets.find(l.active_skin + "-CharacterThumbnail") : this.followersRowEntity.findByName("ProfileImage").element.textureAsset = this.app.assets.find("no_photo.jpg");
        var d = this.followersRowEntity.clone();
        d.setLocalPosition(0, -parseInt(33 * o), 0),
        d.enabled = !0,
        this.followersContent.addChild(d),
        this.followers.push(d)
    }
    this.followersCount.element.text = t.length + ""
}
,
Profile.prototype.setDefaultSkin = function() {
    var e = Service.get("skin_name");
    this.menuEntity.script.menu.switchSkin(e)
}
,
Profile.prototype.setSkin = function(e) {
    if (this.currentSkin == e)
        return !1;
    if (void 0 === this.skins)
        return !1;
    for (var t = this.skins.length; t--; ) {
        var i = this.skins[t];
        i.name == e ? i.activeIcon.enabled = !0 : i.activeIcon.enabled = !1
    }
    Service.post("set_skin", {
        skin_name: e
    }, function(t) {
        t.success && Service.set("skin_name", e)
    }, Service.authURL),
    this.currentSkin = e,
    pc.currentSkin = this.currentSkin
}
,
Profile.prototype.getSkins = function() {
    var e = this;
    Service.post("get_skins", {
        hash: pc.hash
    }, function(t) {
        t.success && e.setSkins(t)
    }, Service.authURL)
}
,
Profile.prototype.clearSkins = function() {
    for (var e = this.skins.length; e--; )
        this.skins[e] && this.skins[e].name && this.skins[e].destroy();
    this.skins = []
}
,
Profile.prototype.setSkins = function(e) {
    this.clearSkins();
    var t = []
      , i = 0
      , n = e.skins;
    for (var r in n) {
        var s = n[r].name
          , a = this.app.assets.find(s + "-CharacterThumbnail");
        if (this.app.assets.find(s + "-Character") && -1 === t.indexOf(s)) {
            var o = parseInt(i) % 4
              , l = Math.floor(parseInt(i) / 4)
              , d = this.skinItem.clone();
            d.name = s,
            d.enabled = !0,
            d.activeIcon = d.findByName("Active"),
            d.activeIcon.enabled = !1,
            d.findByName("Name").element.text = s,
            d.findByName("Thumbnail").element.textureAsset = a,
            d.findByName("SwitchButton").script.button.triggerFunction = "menu.switchSkin('" + s + "');",
            d.setLocalPosition(160 * o, -160 * l, 0),
            this.skinHolder.addChild(d),
            this.skins.push(d),
            t.push(s),
            i++
        }
    }
    var f = Service.get("skin_name");
    f && this.setSkin(f)
}
,
Profile.prototype.clearFriendLeaderboard = function() {
    for (var e in this.friendLeaderboard) {
        this.friendLeaderboard[e];
        this.friendLeaderboard[e].destroy()
    }
    this.friendLeaderboard = []
}
,
Profile.prototype.getFriendLeaderboard = function(e) {
    if (void 0 === pc.hash)
        return !1;
    var t = this;
    if (!e) {
        if (Date.now() - this.lastFriendLeaderboard < 6e3)
            return !1;
        this.friendLeaderboardLoading.enabled = !0,
        this.friendLeaderboardEntity.enabled = !0;
        parseInt(window.localStorage.getItem("miniroyale2_date"));
        var i = window.localStorage.getItem("miniroyale2_friends");
        i && (i = JSON.parse(i)) && (t.setFriendLeaderboard(i),
        t.app.fire("InviteService:SetFriends", t.friendUsernames))
    }
    Service.post("get_friend_leaderboard", {}, function(e) {
        e.success && (t.setFriendLeaderboard(e.leaderboard),
        t.app.fire("InviteService:SetFriends", t.friendUsernames),
        window.localStorage.setItem("miniroyale2_friends", JSON.stringify(e.leaderboard)),
        window.localStorage.setItem("miniroyale2_date", Date.now()))
    }, Service.authURL),
    this.lastFriendLeaderboard = Date.now()
}
,
Profile.prototype.setInvites = function(e) {
    if (!e)
        return !1;
    e.friend_id == pc.username && "0" == e.accepted ? this.menu.showInviteAlert(e.id, e.user_id + " invited you!") : "1" == e.accepted && (e.friend_id == pc.username ? this.menu.joinFriend(e.id, e.user_id, e.user_skin) : this.menu.joinFriend(e.id, e.friend_id, e.friend_skin))
}
,
Profile.prototype.setReadyStates = function() {
    -1 !== pc.inviteId && this.menu.getReadyUsers()
}
,
Profile.prototype.setFriendLeaderboard = function(e) {
    if (this.menu.alreadyWaitingMatch)
        return !1;
    this.friendsList = e,
    this.clearFriendLeaderboard();
    var t = 0
      , i = [];
    for (var n in e) {
        var r = e[n]
          , s = this.app.assets.find("Biker-CharacterThumbnail");
        r.active_skin && (s = this.app.assets.find(r.active_skin + "-CharacterThumbnail"));
        var a = this.friendLeaderboardRow.clone();
        a.enabled = !0,
        a.findByName("Background").element.opacity = t % 2 == 0 ? .1 : .05;
        var o = a.findByName("Username");
        o.element.text = r.username,
        o.findByName("Verified").enabled = "1" == r.verified,
        "1" == r.verified && o.setLocalPosition(o.getLocalPosition().add(new pc.Vec3(25,0,0))),
        a.findByName("Level").element.text = parseInt(r.level) + "",
        a.findByName("ProfilePicture").element.textureAsset = s,
        a.findByName("Invite").script.button.triggerFunction = "menu.inviteUser('" + r.username + "');",
        a.findByName("WaitingInvite").enabled = !1,
        "none" != this.partyId ? (a.findByName("Invite").enabled = !1,
        a.findByName("InParty").enabled = !1,
        a.findByName("LastSeen").enabled = !1,
        a.findByName("OnlineDisplay").enabled = !1) : !1 !== this.invitedUsername ? (a.findByName("Invite").enabled = !1,
        a.findByName("InParty").enabled = !1,
        a.findByName("LastSeen").enabled = !1,
        this.invitedUsername == r.username && "none" == this.partyId && (a.findByName("WaitingInvite").enabled = !0)) : this.onlineFriends.indexOf(r.username) > -1 ? (a.findByName("OnlineDisplay").enabled = !0,
        a.findByName("Invite").enabled = !0,
        r.in_party ? (a.findByName("Invite").enabled = !1,
        a.findByName("InParty").enabled = !0) : a.findByName("InParty").enabled = !1,
        a.findByName("LastSeen").enabled = !1) : (a.findByName("OnlineDisplay").enabled = !1,
        a.findByName("Invite").enabled = !1,
        a.findByName("InParty").enabled = !1,
        a.findByName("LastSeen").enabled = !0,
        a.findByName("LastSeen").element.text = r.last_seen),
        a.setLocalPosition(0, 30 * -t, 0),
        this.friendLeaderboard.push(a),
        this.friendLeaderboardHolder.addChild(a),
        i.push(r.username),
        t++
    }
    this.friendUsernames = i,
    this.friendLeaderboardLoading.enabled = !1
}
,
Profile.prototype.getFriends = function() {
    var e = this;
    this.clearFriends(),
    Service.post("get_friends", {}, function(t) {
        t.success && e.setFriends(t)
    }, Service.authURL)
}
,
Profile.prototype.unfollowFriend = function(e) {
    var t = this;
    Service.post("remove_friend", {
        username: e
    }, function(e) {
        e.success ? (alert("User successfuly unfollowed!"),
        t.getFriends()) : alert(e.message)
    }, Service.authURL)
}
,
Profile.prototype.addFriend = function() {
    var e = this
      , t = this.friendUsernameElement.script.input.getValue();
    Service.post("add_friend", {
        friend_username: t
    }, function(t) {
        t.success ? (alert("User successfuly followed!"),
        e.getFriends()) : alert(t.message)
    }, Service.authURL)
}
,
Profile.prototype.followFriend = function(e) {
    var t = this;
    Service.post("add_friend", {
        friend_username: e
    }, function(e) {
        e.success ? (alert("User successfuly followed!"),
        t.getFriends()) : alert(e.message)
    }, Service.authURL)
}
,
Profile.prototype.logout = function() {
    var e = this;
    Service.post("logout", {}, function(t) {
        pc.hash = !1,
        pc.username = !1,
        Service.set("hash", !1),
        Service.set("followers", !1),
        e.menuEntity.script.menu.openModal("login"),
        window.location.reload()
    }, Service.authURL)
}
,
Profile.prototype.setData = function(e) {}
;
var Tabs = pc.createScript("tabs");
Tabs.attributes.add("menu", {
    type: "entity",
    array: !0
}),
Tabs.attributes.add("content", {
    type: "entity",
    array: !0
}),
Tabs.prototype.initialize = function() {
    this.switchTab(0)
}
,
Tabs.prototype.switchTab = function(t) {
    for (var e in this.content) {
        var a = this.content[e]
          , n = this.menu[e];
        a && (a.enabled = !1,
        n.element.opacity = .5)
    }
    this.content[t].enabled = !0,
    this.menu[t].element.opacity = 1
}
;
var Parachute = pc.createScript("parachute");
Parachute.attributes.add("parachuteScene", {
    type: "entity"
}),
Parachute.attributes.add("parachuteEntity", {
    type: "entity"
}),
Parachute.attributes.add("characterEntity", {
    type: "entity"
}),
Parachute.attributes.add("rotationPivotEntity", {
    type: "entity"
}),
Parachute.attributes.add("cameraEntity", {
    type: "entity"
}),
Parachute.attributes.add("fallPoint", {
    type: "entity"
}),
Parachute.attributes.add("parachutePoint", {
    type: "entity"
}),
Parachute.attributes.add("facePoint", {
    type: "entity"
}),
Parachute.attributes.add("playerEntity", {
    type: "entity"
}),
Parachute.attributes.add("interfaceEntity", {
    type: "entity"
}),
Parachute.attributes.add("parachuteInterfaceEntity", {
    type: "entity"
}),
Parachute.attributes.add("compassElement", {
    type: "entity"
}),
Parachute.attributes.add("heightBarElement", {
    type: "entity"
}),
Parachute.attributes.add("speedDisplayElement", {
    type: "entity"
}),
Parachute.attributes.add("alertEntity", {
    type: "entity"
}),
Parachute.attributes.add("alertTextElement", {
    type: "entity"
}),
Parachute.attributes.add("endTransition", {
    type: "entity"
}),
Parachute.attributes.add("resetPosition", {
    type: "vec3"
}),
Parachute.attributes.add("turnSpeed", {
    type: "number"
}),
Parachute.attributes.add("mapDistance", {
    type: "number"
}),
Parachute.attributes.add("parachuteOpenLimit", {
    type: "number",
    default: 50
}),
Parachute.attributes.add("desktopElements", {
    type: "entity",
    array: !0
}),
Parachute.attributes.add("mobileElements", {
    type: "entity",
    array: !0
}),
Parachute.prototype.initialize = function() {
    this.timestamp = 0,
    this.autoControl = !1,
    this.currentFallSpeed = 30,
    this.currentCameraFov = 70,
    this.keyboard = {
        up: !1,
        down: !1,
        left: !1,
        right: !1,
        jump: !1,
        reload: !1,
        shift: !1,
        throw: !1,
        crouch: !1,
        peek_left: !1,
        peek_right: !1,
        shoot: !1
    },
    this.currentAnimation = "Falling",
    this.isParachuteOpen = !1,
    this.lastNetworkPosition = Date.now(),
    this.accelerateSpeed = 0,
    this.currentWindVolume = 1,
    this.onGround = !1,
    this.focusTimeout = 0,
    this.height = 150,
    this.characterRotationX = 0,
    this.characterRotationY = 0,
    this.characterRotationZ = 0,
    this.currentPositionData = {
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        angle: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    this.openBumpFactor = 0,
    this.currentAngle = Math.floor(360 * Math.random()),
    this.playerEntity.enabled = !1,
    this.interfaceEntity.enabled = !1,
    this.app.on("Player:Hurt", this.showLimitAlert.bind(this)),
    this.app.on("Touch:Movement", this.setTouchMovement, this),
    this.entity.collision.on("collisionstart", this.onCollisionStart, this),
    this.alreadyFocused = !1,
    this.setSkin(pc.skin),
    Utils.isMobile() ? this.hideDesktopElements() : this.hideMobileElements()
}
,
Parachute.prototype.onCollisionStart = function() {
    this.cutParachute()
}
,
Parachute.prototype.hideDesktopElements = function() {
    for (var t = this.desktopElements.length; t--; )
        this.desktopElements[t] && (this.desktopElements[t].enabled = !1)
}
,
Parachute.prototype.hideMobileElements = function() {
    for (var t = this.mobileElements.length; t--; )
        this.mobileElements[t] && (this.mobileElements[t].enabled = !1)
}
,
Parachute.prototype.changeDirection = function() {
    var t = this.entity.getPosition().clone()
      , e = Utils.zeroVector.clone().sub(t).length()
      , i = Utils.lookAt(t.x, t.z, Utils.zeroVector.x, Utils.zeroVector.z);
    i *= pc.math.RAD_TO_DEG,
    e > this.mapDistance ? i > -35 && i < 35 || (i > 0 ? this.currentAngle -= this.turnSpeed : this.currentAngle += this.turnSpeed,
    this.accelerateSpeed = pc.math.lerp(this.accelerateSpeed, 3, .1),
    this.characterRotationX = pc.math.lerp(this.characterRotationX, 85, .01),
    this.autoControl = !0) : this.autoControl = !1
}
,
Parachute.prototype.setSkin = function(t) {
    var e = this.app.assets.find(t + "-Character");
    t && (this.characterEntity.model.asset = e)
}
,
Parachute.prototype.showLimitAlert = function() {
    var t = this;
    this.alertEntity.enabled = !0,
    this.alertTextElement.element.text = "Stay in the area!",
    clearTimeout(this.alertEntity.timer),
    this.alertEntity.timer = setTimeout(function() {
        t.alertEntity.enabled = !1
    }, 3e3)
}
,
Parachute.prototype.setNetworkPosition = function() {
    if (Date.now() - this.lastNetworkPosition < 60)
        return !1;
    var t = this.entity.getPosition().clone();
    this.currentPositionData.position.x = Utils.parseFloat(t.x),
    this.currentPositionData.position.y = Utils.parseFloat(t.y),
    this.currentPositionData.position.z = Utils.parseFloat(t.z),
    this.currentPositionData.angle.x = Utils.parseFloat(this.currentAngle % 360 * pc.math.DEG_TO_RAD),
    this.currentPositionData.angle.y = 0,
    this.app.fire("Player:Position", this.currentPositionData),
    this.lastNetworkPosition = Date.now()
}
,
Parachute.prototype.setCharacterAnimation = function(t, e) {
    this.currentAnimation != t && (this.characterEntity.animation.play(t, e),
    this.currentAnimation = t)
}
,
Parachute.prototype.setCurrentHeight = function() {
    var t = this.entity.getPosition().clone()
      , e = t.clone().add(new pc.Vec3(0,-1e3,0))
      , i = this.app.systems.rigidbody.raycastFirst(t, e)
      , a = 1e3;
    i && i.entity && "Enemy" != i.entity.name && (a = i.point.sub(this.entity.getPosition().clone()).length()),
    this.height = a,
    this.compassElement.script.compass.currentAngle = this.currentAngle % 360,
    this.height > 900 && (this.entity.setPosition(this.resetPosition),
    this.openParachute())
}
,
Parachute.prototype.openParachute = function() {
    this.isParachuteOpen || (this.parachuteEntity.enabled = !0,
    this.parachuteEntity.setLocalScale(.2, .2, .2),
    this.parachuteEntity.tween(this.parachuteEntity.getLocalScale()).to({
        x: 1,
        y: 1,
        z: 1
    }, 1, pc.BounceInOut).start(),
    this.setCharacterAnimation("Hang", .1),
    this.isParachuteOpen = !0,
    this.entity.sound.play("ParachuteOpen"),
    this.entity.sound.play("ParachuteFall"),
    this.openBumpFactor = 50)
}
,
Parachute.prototype.focusPlayer = function() {
    var t = this.entity.getPosition()
      , e = this.cameraEntity.getEulerAngles();
    e.z < 0 ? e.y : e.y,
    this.app.fire("Player:Land", !0),
    this.app.mouse.enablePointerLock(),
    this.interfaceEntity.enabled = !0,
    this.playerEntity.enabled = !0,
    this.playerEntity.script.movement.onParachute = !1,
    this.playerEntity.script.movement.eulers.x = this.currentAngle % 360,
    t.add(new pc.Vec3(0,3.5,0)),
    this.playerEntity.rigidbody.teleport(t.x, t.y, t.z, 0, 0, 0);
    try {
        "undefined" != typeof PokiSDK && PokiSDK.gameplayStart()
    } catch (t) {}
}
,
Parachute.prototype.cutParachute = function() {
    this.onGround || (this.app.fire("Physics:Trigger", !0),
    this.entity.sound.stop("ParachuteFall"),
    this.entity.sound.play("Whoosh"),
    this.onGround = !0)
}
,
Parachute.prototype.setCurrentValues = function() {
    var t = 30
      , e = 80
      , i = 1;
    this.height < this.parachuteOpenLimit && (t = 5,
    e = 50,
    i = 0),
    this.height < 4 && this.cutParachute(),
    this.onGround && (e = 60),
    this.currentFallSpeed = pc.math.lerp(this.currentFallSpeed, t, .08),
    this.currentCameraFov = pc.math.lerp(this.currentCameraFov, e, .08),
    this.currentWindVolume = pc.math.lerp(this.currentWindVolume, i, .08),
    this.entity.sound.slots.HeavyWind && (this.entity.sound.slots.HeavyWind.volume = this.currentWindVolume);
    var a = this.entity.getPosition().clone();
    this.compassElement.script.compass.currentPosition.x = a.x,
    this.compassElement.script.compass.currentPosition.z = a.z,
    this.heightBarElement.element.height = this.height,
    this.speedDisplayElement.element.text = Math.floor(this.height) + ""
}
,
Parachute.prototype.setTouchMovement = function(t, e) {
    "Forward" == t && (this.keyboard.up = e),
    "Backward" == t && (this.keyboard.down = e),
    "Left" == t && (this.keyboard.left = e),
    "Right" == t && (this.keyboard.right = e)
}
,
Parachute.prototype.applyGravityForce = function(t) {
    this.accelerateSpeed = pc.math.lerp(this.accelerateSpeed, 0, .1),
    this.characterRotationX = pc.math.lerp(this.characterRotationX, 0, .1),
    this.characterRotationZ = pc.math.lerp(this.characterRotationZ, 0, .1),
    this.openBumpFactor = pc.math.lerp(this.openBumpFactor, .5 * Math.cos(this.timestamp / 5), .05),
    this.height < this.parachuteOpenLimit && this.openParachute(),
    this.height > .7 && this.entity.translateLocal(0, -t * this.currentFallSpeed + t * this.accelerateSpeed, 0),
    this.isParachuteOpen && this.entity.translateLocal(0, 0, t * this.currentFallSpeed * 1.5 + t * this.accelerateSpeed),
    !this.app.keyboard.isPressed(pc.KEY_W) && !this.keyboard.up || this.autoControl || (this.accelerateSpeed = pc.math.lerp(this.accelerateSpeed, 3, .1),
    this.characterRotationX = pc.math.lerp(this.characterRotationX, 85, .01)),
    !this.app.keyboard.isPressed(pc.KEY_A) && !this.keyboard.left || this.autoControl || (this.currentAngle += this.turnSpeed * (60 * t),
    this.characterRotationZ = pc.math.lerp(this.characterRotationZ, -85, .01)),
    !this.app.keyboard.isPressed(pc.KEY_D) && !this.keyboard.right || this.autoControl || (this.currentAngle -= this.turnSpeed * (60 * t),
    this.characterRotationZ = pc.math.lerp(this.characterRotationZ, 85, .01)),
    this.entity.setLocalEulerAngles(0, this.currentAngle - 180, 0)
}
,
Parachute.prototype.setAnimation = function(t) {
    this.parachuteEntity.setLocalEulerAngles(.05 * Math.cos(this.timestamp / 2) - 15, 0, .1 * Math.sin(this.timestamp / 2)),
    this.rotationPivotEntity.setLocalEulerAngles(this.characterRotationX + this.openBumpFactor + .5 * Math.cos(this.timestamp / 5), this.characterRotationY + .5 * Math.cos(this.timestamp / 5), this.characterRotationZ + .5 * Math.sin(this.timestamp / 5))
}
,
Parachute.prototype.setCameraPoint = function(t) {
    var e = this.fallPoint
      , i = 5 * Math.cos(this.timestamp / 3)
      , a = 1 * Math.sin(this.timestamp / 3)
      , s = .05;
    this.height < this.parachuteOpenLimit && (e = this.parachutePoint,
    i = 1 * Math.cos(this.timestamp / 20),
    a = 1 * Math.sin(this.timestamp / 20)),
    this.onGround && (e = this.facePoint,
    s = .1);
    var r = e.getLocalPosition().clone()
      , n = e.getLocalEulerAngles().clone();
    n.add(new pc.Vec3(i,a,0));
    var h = this.cameraEntity.getLocalPosition()
      , o = this.cameraEntity.getLocalEulerAngles()
      , c = h.lerp(h.clone(), r.clone(), s)
      , p = o.lerp(o.clone(), n.clone(), s);
    this.cameraEntity.setLocalPosition(c),
    this.cameraEntity.setLocalEulerAngles(p),
    this.cameraEntity.camera.fov = this.currentCameraFov
}
,
Parachute.prototype.update = function(t) {
    this.setCurrentValues(),
    this.setCurrentHeight(),
    this.applyGravityForce(t),
    this.setCameraPoint(),
    this.setAnimation(),
    this.setNetworkPosition(),
    this.onGround && (this.focusTimeout += 60 * t),
    this.focusTimeout > 5 && !this.alreadyFocused && (this.endTransition.enabled = !0,
    this.alreadyFocused = !0,
    this.hideMobileElements(),
    setTimeout(function(t) {
        t.focusPlayer(),
        setTimeout(function() {
            t.parachuteInterfaceEntity.enabled = !1,
            t.parachuteScene.enabled = !1
        }, 500)
    }, 500, this)),
    this.timestamp += 60 * t
}
;
var Animation = pc.createScript("animation");
Animation.attributes.add("autoplay", {
    type: "boolean"
}),
Animation.attributes.add("animationName", {
    type: "string",
    enum: [{
        Danger: "danger"
    }, {
        Pickup: "pickup"
    }, {
        Shake: "shake"
    }, {
        Flickering: "flicker"
    }, {
        Impact: "impact"
    }, {
        Positioning: "positioning"
    }, {
        "Fade Out": "fadeOut"
    }, {
        "Fade Scale Out": "fadeScaleOut"
    }, {
        Flying: "flying"
    }, {
        "Cursor-8": "cursor-eight"
    }, {
        "Fade To": "fadeTo"
    }]
}),
Animation.attributes.add("speed", {
    type: "number"
}),
Animation.attributes.add("repeat", {
    type: "number"
}),
Animation.attributes.add("yoyo", {
    type: "boolean"
}),
Animation.attributes.add("loop", {
    type: "boolean"
}),
Animation.attributes.add("nextPosition", {
    type: "vec3"
}),
Animation.attributes.add("nextOpacity", {
    type: "number"
}),
Animation.attributes.add("delay", {
    type: "number"
}),
Animation.attributes.add("ease", {
    type: "string",
    enum: [{
        SineIn: "sineIn"
    }, {
        Linear: "linear"
    }, {
        BackIn: "backIn"
    }, {
        Bounce: "bounceIn"
    }]
}),
Animation.prototype.initialize = function() {
    this.isPlaying = !1,
    this.timestamp = 0,
    this.startPosition = this.entity.getLocalPosition().clone(),
    this.startScale = this.entity.getLocalScale().clone(),
    this.startOpacity = this.entity.element.opacity,
    this.entity.opacity = this.startOpacity,
    this.entity.scale = this.startScale.x,
    "sineIn" == this.ease ? this.ease = pc.SineIn : "linear" == this.ease ? this.ease = pc.Linear : "bounceIn" == this.ease ? this.ease = pc.BounceIn : this.ease = pc.Linear,
    "danger" == this.animationName && (this.animation = this.entity.tween(this.entity.getLocalScale()).to({
        x: 1.2,
        y: 1.2,
        z: 1.2
    }, this.speed, pc.ExponentialInOut)),
    "pickup" == this.animationName && (this.animation = this.entity.tween(this.entity.getLocalScale()).to({
        x: .1,
        y: .1,
        z: .1
    }, this.speed, pc.SineIn)),
    "shake" == this.animationName && (this.animation = this.entity.tween(this.entity.getEulerAngles()).rotate({
        x: 0,
        y: 0,
        z: 10
    }, this.speed, pc.Linear)),
    "flying" == this.animationName && (this.animation = this.entity.tween(this.entity.getLocalPosition()).to({
        x: 5,
        y: 5,
        z: 0
    }, this.speed, pc.Linear),
    this.entity.tween(this.entity.getEulerAngles()).rotate({
        x: 0,
        y: 0,
        z: -2
    }, this.speed, pc.Linear).loop(!0).yoyo(!0).start()),
    "flicker" == this.animationName && (this.animation = this.entity.tween(this.entity.element).to({
        opacity: .5
    }, this.speed, pc.Linear)),
    "fadeOut" == this.animationName && (this.animation = this.entity.tween(this.entity).to({
        opacity: 0
    }, this.speed, this.ease)),
    "fadeTo" == this.animationName && (this.animation = this.entity.tween(this.entity).to({
        opacity: this.nextOpacity
    }, this.speed, this.ease)),
    "fadeScaleOut" == this.animationName && (this.animation = this.entity.tween(this.entity).to({
        opacity: 0,
        scale: 1.2
    }, this.speed, this.ease)),
    "impact" == this.animationName && (this.entity.setLocalScale(1.5, 1.5, 1.5),
    this.animation = this.entity.tween(this.entity.getLocalScale()).to({
        x: 1,
        y: 1,
        z: 1
    }, this.speed, pc.SineIn)),
    "positioning" == this.animationName && (this.animation = this.entity.tween(this.entity.getLocalPosition()).to(this.nextPosition, this.speed, this.ease)),
    this.yoyo && this.animation.yoyo(!0),
    this.repeat > 0 && this.animation.repeat(this.repeat),
    this.loop && this.animation.loop(!0),
    this.autoplay && (this.delay > 0 ? setTimeout(function(t) {
        t.start()
    }, 1e3 * this.delay, this) : this.start()),
    this.on("state", function(t) {
        this.entity.enabled ? this.entity.script.animation.start() : this.entity.script.animation.stop()
    }, this)
}
,
Animation.prototype.start = function() {
    !this.isPlaying && this.animation && (this.isPlaying = !0,
    this.animation.start())
}
,
Animation.prototype.stop = function() {
    this.isPlaying && (this.entity.element.opacity = this.startOpacity,
    this.entity.setLocalScale(this.startScale),
    this.entity.setLocalPosition(this.startPosition),
    this.animation.stop(),
    this.entity.opacity = this.startOpacity,
    this.entity.scale = this.startScale.x,
    this.isPlaying = !1)
}
,
Animation.prototype.update = function(t) {
    if ("cursor-eight" == this.animationName) {
        var i = Math.cos(this.timestamp / this.speed) * this.nextPosition.x
          , e = Math.sin(this.timestamp / this.speed) * Math.cos(this.timestamp / this.speed) * this.nextPosition.y;
        this.entity.setLocalPosition(i, e, 0),
        this.timestamp++
    }
    "null" !== this.entity.opacity && (this.entity.element.opacity = this.entity.opacity),
    "null" !== this.entity.scale && this.entity.setLocalScale(this.entity.scale, this.entity.scale, this.entity.scale)
}
;
pc.extend(pc, function() {
    var t = function(t) {
        this._app = t,
        this._tweens = [],
        this._add = []
    };
    t.prototype = {
        add: function(t) {
            return this._add.push(t),
            t
        },
        update: function(t) {
            for (var i = 0, e = this._tweens.length; i < e; )
                this._tweens[i].update(t) ? i++ : (this._tweens.splice(i, 1),
                e--);
            this._add.length && (this._tweens = this._tweens.concat(this._add),
            this._add.length = 0)
        }
    };
    var i = function(t, i, e) {
        pc.events.attach(this),
        this.manager = i,
        e && (this.entity = null),
        this.time = 0,
        this.complete = !1,
        this.playing = !1,
        this.stopped = !0,
        this.pending = !1,
        this.target = t,
        this.duration = 0,
        this._currentDelay = 0,
        this.timeScale = 1,
        this._reverse = !1,
        this._delay = 0,
        this._yoyo = !1,
        this._count = 0,
        this._numRepeats = 0,
        this._repeatDelay = 0,
        this._from = !1,
        this._slerp = !1,
        this._fromQuat = new pc.Quat,
        this._toQuat = new pc.Quat,
        this._quat = new pc.Quat,
        this.easing = pc.EASE_LINEAR,
        this._sv = {},
        this._ev = {}
    }
      , e = function(t) {
        var i;
        return t instanceof pc.Vec2 ? i = {
            x: t.x,
            y: t.y
        } : t instanceof pc.Vec3 ? i = {
            x: t.x,
            y: t.y,
            z: t.z
        } : t instanceof pc.Vec4 ? i = {
            x: t.x,
            y: t.y,
            z: t.z,
            w: t.w
        } : t instanceof pc.Quat ? i = {
            x: t.x,
            y: t.y,
            z: t.z,
            w: t.w
        } : t instanceof pc.Color ? (i = {
            r: t.r,
            g: t.g,
            b: t.b
        },
        void 0 !== t.a && (i.a = t.a)) : i = t,
        i
    };
    i.prototype = {
        to: function(t, i, n, s, r, h) {
            return this._properties = e(t),
            this.duration = i,
            n && (this.easing = n),
            s && this.delay(s),
            r && this.repeat(r),
            h && this.yoyo(h),
            this
        },
        from: function(t, i, n, s, r, h) {
            return this._properties = e(t),
            this.duration = i,
            n && (this.easing = n),
            s && this.delay(s),
            r && this.repeat(r),
            h && this.yoyo(h),
            this._from = !0,
            this
        },
        rotate: function(t, i, n, s, r, h) {
            return this._properties = e(t),
            this.duration = i,
            n && (this.easing = n),
            s && this.delay(s),
            r && this.repeat(r),
            h && this.yoyo(h),
            this._slerp = !0,
            this
        },
        start: function() {
            var t, i, e, n;
            if (this.playing = !0,
            this.complete = !1,
            this.stopped = !1,
            this._count = 0,
            this.pending = this._delay > 0,
            this._reverse && !this.pending ? this.time = this.duration : this.time = 0,
            this._from) {
                for (t in this._properties)
                    this._properties.hasOwnProperty(t) && (this._sv[t] = this._properties[t],
                    this._ev[t] = this.target[t]);
                this._slerp && (this._toQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z),
                i = void 0 !== this._properties.x ? this._properties.x : this.target.x,
                e = void 0 !== this._properties.y ? this._properties.y : this.target.y,
                n = void 0 !== this._properties.z ? this._properties.z : this.target.z,
                this._fromQuat.setFromEulerAngles(i, e, n))
            } else {
                for (t in this._properties)
                    this._properties.hasOwnProperty(t) && (this._sv[t] = this.target[t],
                    this._ev[t] = this._properties[t]);
                this._slerp && (this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z),
                i = void 0 !== this._properties.x ? this._properties.x : this.target.x,
                e = void 0 !== this._properties.y ? this._properties.y : this.target.y,
                n = void 0 !== this._properties.z ? this._properties.z : this.target.z,
                this._toQuat.setFromEulerAngles(i, e, n))
            }
            return this._currentDelay = this._delay,
            this.manager.add(this),
            this
        },
        pause: function() {
            this.playing = !1
        },
        resume: function() {
            this.playing = !0
        },
        stop: function() {
            this.playing = !1,
            this.stopped = !0
        },
        delay: function(t) {
            return this._delay = t,
            this.pending = !0,
            this
        },
        repeat: function(t, i) {
            return this._count = 0,
            this._numRepeats = t,
            this._repeatDelay = i || 0,
            this
        },
        loop: function(t) {
            return t ? (this._count = 0,
            this._numRepeats = 1 / 0) : this._numRepeats = 0,
            this
        },
        yoyo: function(t) {
            return this._yoyo = t,
            this
        },
        reverse: function() {
            return this._reverse = !this._reverse,
            this
        },
        chain: function() {
            for (var t = arguments.length; t--; )
                t > 0 ? arguments[t - 1]._chained = arguments[t] : this._chained = arguments[t];
            return this
        },
        update: function(t) {
            if (this.stopped)
                return !1;
            if (!this.playing)
                return !0;
            if (!this._reverse || this.pending ? this.time += t * this.timeScale : this.time -= t * this.timeScale,
            this.pending) {
                if (!(this.time > this._currentDelay))
                    return !0;
                this._reverse ? this.time = this.duration - (this.time - this._currentDelay) : this.time = this.time - this._currentDelay,
                this.pending = !1
            }
            var i = 0;
            (!this._reverse && this.time > this.duration || this._reverse && this.time < 0) && (this._count++,
            this.complete = !0,
            this.playing = !1,
            this._reverse ? (i = this.duration - this.time,
            this.time = 0) : (i = this.time - this.duration,
            this.time = this.duration));
            var e, n, s = this.time / this.duration, r = this.easing(s);
            for (var h in this._properties)
                this._properties.hasOwnProperty(h) && (e = this._sv[h],
                n = this._ev[h],
                this.target[h] = e + (n - e) * r);
            if (this._slerp && this._quat.slerp(this._fromQuat, this._toQuat, r),
            this.entity && (this.entity._dirtifyLocal(),
            this.element && this.entity.element && (this.entity.element[this.element] = this.target),
            this._slerp && this.entity.setLocalRotation(this._quat)),
            this.fire("update", t),
            this.complete) {
                var a = this._repeat(i);
                return a ? this.fire("loop") : (this.fire("complete", i),
                this.entity && this.entity.off("destroy", this.stop, this),
                this._chained && this._chained.start()),
                a
            }
            return !0
        },
        _repeat: function(t) {
            if (this._count < this._numRepeats) {
                if (this._reverse ? this.time = this.duration - t : this.time = t,
                this.complete = !1,
                this.playing = !0,
                this._currentDelay = this._repeatDelay,
                this.pending = !0,
                this._yoyo) {
                    for (var i in this._properties)
                        tmp = this._sv[i],
                        this._sv[i] = this._ev[i],
                        this._ev[i] = tmp;
                    this._slerp && (this._quat.copy(this._fromQuat),
                    this._fromQuat.copy(this._toQuat),
                    this._toQuat.copy(this._quat))
                }
                return !0
            }
            return !1
        }
    };
    var n = function(t) {
        return 1 - s(1 - t)
    }
      , s = function(t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    };
    return {
        TweenManager: t,
        Tween: i,
        Linear: function(t) {
            return t
        },
        QuadraticIn: function(t) {
            return t * t
        },
        QuadraticOut: function(t) {
            return t * (2 - t)
        },
        QuadraticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
        },
        CubicIn: function(t) {
            return t * t * t
        },
        CubicOut: function(t) {
            return --t * t * t + 1
        },
        CubicInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        },
        QuarticIn: function(t) {
            return t * t * t * t
        },
        QuarticOut: function(t) {
            return 1 - --t * t * t * t
        },
        QuarticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
        },
        QuinticIn: function(t) {
            return t * t * t * t * t
        },
        QuinticOut: function(t) {
            return --t * t * t * t * t + 1
        },
        QuinticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        },
        SineIn: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : 1 - Math.cos(t * Math.PI / 2)
        },
        SineOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : Math.sin(t * Math.PI / 2)
        },
        SineInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : .5 * (1 - Math.cos(Math.PI * t))
        },
        ExponentialIn: function(t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1)
        },
        ExponentialOut: function(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
        },
        ExponentialInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        },
        CircularIn: function(t) {
            return 1 - Math.sqrt(1 - t * t)
        },
        CircularOut: function(t) {
            return Math.sqrt(1 - --t * t)
        },
        CircularInOut: function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        },
        BackIn: function(t) {
            return t * t * (2.70158 * t - 1.70158)
        },
        BackOut: function(t) {
            return --t * t * (2.70158 * t + 1.70158) + 1
        },
        BackInOut: function(t) {
            var i = 2.5949095;
            return (t *= 2) < 1 ? t * t * ((i + 1) * t - i) * .5 : .5 * ((t -= 2) * t * ((i + 1) * t + i) + 2)
        },
        BounceIn: n,
        BounceOut: s,
        BounceInOut: function(t) {
            return t < .5 ? .5 * n(2 * t) : .5 * s(2 * t - 1) + .5
        },
        ElasticIn: function(t) {
            var i, e = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1,
            i = .1) : i = .4 * Math.asin(1 / e) / (2 * Math.PI),
            -e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / .4))
        },
        ElasticOut: function(t) {
            var i, e = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1,
            i = .1) : i = .4 * Math.asin(1 / e) / (2 * Math.PI),
            e * Math.pow(2, -10 * t) * Math.sin((t - i) * (2 * Math.PI) / .4) + 1)
        },
        ElasticInOut: function(t) {
            var i, e = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1,
            i = .1) : i = .4 * Math.asin(1 / e) / (2 * Math.PI),
            (t *= 2) < 1 ? e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / .4) * -.5 : e * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / .4) * .5 + 1)
        }
    }
}()),
function() {
    pc.Application.prototype.addTweenManager = function() {
        this._tweenManager = new pc.TweenManager(this),
        this.on("update", function(t) {
            this._tweenManager.update(t)
        })
    }
    ,
    pc.Application.prototype.tween = function(t) {
        return new pc.Tween(t,this._tweenManager)
    }
    ,
    pc.Entity.prototype.tween = function(t, i) {
        var e = this._app.tween(t);
        return e.entity = this,
        this.once("destroy", e.stop, e),
        i && i.element && (e.element = i.element),
        e
    }
    ;
    var t = pc.Application.getApplication();
    t && t.addTweenManager()
}();
// thumbnail.js
var Thumbnail = pc.createScript('thumbnail');

Thumbnail.attributes.add('model', {
    type: 'entity'
});
Thumbnail.prototype.initialize = function() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.width = 512;
    this.canvas.height = 512;

    this.index = 0;
    this.currentName = 'thumbnail.png';

    //this.app.keyboard.on('keydown', this.clearScene.bind(this), this);

    this.itemSet();
}
;

Thumbnail.prototype.slug = function(string) {
    var a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    var b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    var p = new RegExp(a.split('').join('|'),'g');

    return string.toString().replace(/\s+/g, '-')// Replace spaces with -
    .replace(p, c=>b.charAt(a.indexOf(c)))// Replace special characters
    .replace(/&/g, '-and-')// Replace & with 'and'
    .replace(/[^\w\-]+/g, '')// Remove all non-word characters
    .replace(/\-\-+/g, '-')// Replace multiple - with single -
    .replace(/^-+/, '')// Trim - from start of text
    .replace(/-+$/, '');
}
;

Thumbnail.prototype.clearScene = function() {
}
;

Thumbnail.prototype.update = function(dt) {/*
    this.app.graphicsDevice.clear({
        color: [0, 0, 0, 0],
        flags: pc.CLEARFLAG_COLOR
    });
    */
}
;

Thumbnail.prototype.itemSet = function() {
    var item = this.entity.findByTag('thumbnail-item')[this.index];

    if (item) {
        var items = this.entity.findByTag('thumbnail-item');
        for (var itemIndex in items) {
            var currentItem = items[itemIndex];

            currentItem.enabled = false;
        }

        this.app.graphicsDevice.clear({
            color: [0, 0, 0, 0],
            flags: pc.CLEARFLAG_COLOR
        });

        item.enabled = true;
        this.currentName = this.slug(item.script.attr.name);

        setTimeout(function(self) {
            self.capture();
        }, 200, this);

        this.index++;
    }
}
;

Thumbnail.prototype.capture = function() {
    var texture = new pc.Texture(this.app.graphicsDevice,{
        mipmaps: false
    });

    texture.minFilter = pc.FILTER_LINEAR;
    texture.magFilter = pc.FILTER_LINEAR;
    texture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
    texture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;

    var self = this;
    var lastCaptureIndex = this.captured;
    var image = new Image();
    image.src = pc.app.graphicsDevice.canvas.toDataURL('image/png');
    image.onload = function() {
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.context.drawImage(image, -window.innerWidth / 2 + 256, -window.innerHeight / 2 + 262);

        var canvasImage = new Image();
        canvasImage.src = self.canvas.toDataURL('image/png');
        canvasImage.onload = function() {
            self.download(canvasImage.src, self.currentName);
        }
        ;
    }
    ;

    this.captured++;
}
;

Thumbnail.prototype.download = function(image, name) {
    var a = document.createElement('a');
    a.href = image;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(function(self) {
        self.itemSet();
    }, 500, this);
}
;

var Translate = pc.createScript("translate");
Translate.attributes.add("axis", {
    type: "string",
    enum: [{
        x: "x"
    }, {
        y: "y"
    }, {
        z: "z"
    }]
}),
Translate.attributes.add("speed", {
    type: "number"
}),
Translate.prototype.initialize = function() {}
,
Translate.prototype.update = function(t) {
    var a = this.speed * (60 * t);
    "x" == this.axis && this.entity.translateLocal(a, 0, 0),
    "y" == this.axis && this.entity.translateLocal(0, a, 0),
    "z" == this.axis && this.entity.translateLocal(0, 0, a)
}
;
var Scale = pc.createScript("scale");
Scale.attributes.add("axis", {
    type: "string",
    enum: [{
        x: "x"
    }, {
        y: "y"
    }, {
        z: "z"
    }]
}),
Scale.attributes.add("speed", {
    type: "number"
}),
Scale.attributes.add("destroy", {
    type: "number"
}),
Scale.prototype.initialize = function() {
    this.startScale = new pc.Vec3(1,1,1),
    this.timestamp = 0
}
,
Scale.prototype.update = function(t) {
    "x" == this.axis && (this.startScale.x += this.speed),
    "y" == this.axis && (this.startScale.y += this.speed),
    "z" == this.axis && (this.startScale.z += this.speed),
    this.entity.setLocalScale(this.startScale),
    this.timestamp > this.destroy && this.entity.destroy(),
    this.timestamp++
}
;
var Inventory = pc.createScript("inventory");
Inventory.attributes.add("itemElement", {
    type: "entity"
}),
Inventory.attributes.add("itemManagerEntity", {
    type: "entity"
}),
Inventory.attributes.add("inventoryContent", {
    type: "entity"
}),
Inventory.attributes.add("leftSpaceElement", {
    type: "entity"
}),
Inventory.attributes.add("spaceBarElement", {
    type: "entity"
}),
Inventory.attributes.add("shortcutHolder", {
    type: "entity"
}),
Inventory.attributes.add("shortcutItem", {
    type: "entity"
}),
Inventory.attributes.add("shortcutName", {
    type: "entity"
}),
Inventory.attributes.add("shortcutIcon", {
    type: "entity"
}),
Inventory.attributes.add("shortcutBind", {
    type: "entity"
}),
Inventory.attributes.add("shortcutBackground", {
    type: "entity"
}),
Inventory.attributes.add("weaponAttachmentsHolder", {
    type: "entity"
}),
Inventory.attributes.add("weaponItem", {
    type: "entity"
}),
Inventory.attributes.add("weaponName", {
    type: "entity"
}),
Inventory.attributes.add("weaponBindKey", {
    type: "entity"
}),
Inventory.attributes.add("weaponIcon", {
    type: "entity"
}),
Inventory.attributes.add("weaponAmmoType", {
    type: "entity"
}),
Inventory.attributes.add("weaponClip", {
    type: "entity"
}),
Inventory.attributes.add("weaponMagazine", {
    type: "entity"
}),
Inventory.attributes.add("weaponSightButton", {
    type: "entity"
}),
Inventory.attributes.add("weaponSightIcon", {
    type: "entity"
}),
Inventory.attributes.add("weaponSilencerButton", {
    type: "entity"
}),
Inventory.attributes.add("weaponSilencerIcon", {
    type: "entity"
}),
Inventory.attributes.add("weaponMagazineButton", {
    type: "entity"
}),
Inventory.attributes.add("weaponMagazineIcon", {
    type: "entity"
}),
Inventory.attributes.add("weaponGripButton", {
    type: "entity"
}),
Inventory.attributes.add("weaponGripIcon", {
    type: "entity"
}),
Inventory.attributes.add("bagIconElement", {
    type: "entity"
}),
Inventory.attributes.add("bagIconLevel1", {
    type: "asset",
    assetType: "texture"
}),
Inventory.attributes.add("bagIconLevel3", {
    type: "asset",
    assetType: "texture"
}),
Inventory.attributes.add("helmetIcon", {
    type: "entity"
}),
Inventory.attributes.add("armorIcon", {
    type: "entity"
}),
Inventory.attributes.add("bootIcon", {
    type: "entity"
}),
Inventory.attributes.add("helmetBackgroundIcon", {
    type: "entity"
}),
Inventory.attributes.add("armorBackgroundIcon", {
    type: "entity"
}),
Inventory.attributes.add("bootBackgroundIcon", {
    type: "entity"
}),
Inventory.attributes.add("needleCountEntity", {
    type: "entity"
}),
Inventory.attributes.add("characterEntity", {
    type: "entity"
}),
Inventory.prototype.initialize = function() {
    this.items = [],
    this.shortcuts = [],
    this.removeItem = !1,
    this.defaultSpace = 5,
    this.totalSpace = parseInt(this.defaultSpace + ""),
    this.currentWeaponName = !1,
    this.shortcutItem.enabled = !1,
    this.weaponItem.enabled = !1,
    this.itemElement.enabled = !1,
    this.updateLeftSpace(),
    this.entity.parent.script.interface.setInventoryVisibility(),
    this.interface = this.entity.parent.script.interface,
    this.character = this.characterEntity.script.movement,
    this.itemManager = this.itemManagerEntity.script.itemSpawn
}
,
Inventory.prototype.addItem = function(t, e, n, o, i, s) {
    if (this.hasItem(t))
        return this.addStack(t, s),
        !1;
    var r = this.itemElement.clone();
    r.nameElement = r.findByName("ItemName"),
    r.typeElement = r.findByName("ItemType"),
    r.iconElement = r.findByName("ItemIcon"),
    r.dropButton = r.findByName("DropButton"),
    r.itemAmount = r.findByName("ItemAmount"),
    r.dropButton.item = r,
    r.dropButton.script.button.connected = this.entity,
    r.nameElement.element.text = Utils.clearName(t),
    r.typeElement.element.text = e,
    r.itemAmount.element.text = s + "",
    r.iconElement.element.textureAsset = o,
    "Handgun" != n && "Rifle" != n && "SubMachine" != n && (r.typeElement.enabled = !1),
    "Sight" == n && (r.itemAmount.enabled = !1),
    r.setLocalPosition(0, -10 - 70 * this.items.length, 0),
    r.name = t,
    r.ammoType = e,
    r.type = n,
    r.amount = s,
    r.icon = o,
    r.details = this.itemManager.getWeaponDetails(t),
    i && (r.maskIcon = i),
    r.enabled = !0,
    this.inventoryContent.addChild(r),
    this.items.push(r),
    "Handgun" != n && "Rifle" != n && "SubMachine" != n && "Grenade" != n || (this.createShortcut(r),
    r.itemAmount.enabled = !1),
    this.updateLeftSpace(),
    this.updateItems()
}
,
Inventory.prototype.updateItems = function() {
    for (var t = this.items.length; t--; )
        this.items[t].setLocalPosition(0, -10 - 70 * t, 0);
    for (var e in this.inventoryContent.children) {
        var n = this.inventoryContent.children[e]
          , o = !1;
        for (var i in this.items) {
            this.items[i].name == n.name && (o = !0)
        }
        !o && n.enabled && n.destroy()
    }
}
,
Inventory.prototype.updateShortcuts = function() {
    for (var t = this.shortcuts.length; t--; )
        if (this.shortcuts[t]) {
            var e = this.shortcuts[t]
              , n = this.shortcuts[t].item.details;
            if (e.setLocalPosition(0, 80 * -t, 0),
            e.bindKey.element.text = t + 1 + "",
            "Grenade" != this.shortcuts[t].type) {
                if (this.shortcuts[t].inventoryConnection.setLocalPosition(170 * t, 0, 0),
                this.shortcuts[t].inventoryConnection.clip.element.text = n.currentAmmo + "",
                this.shortcuts[t].inventoryConnection.magazine.element.text = this.checkAmmo(n) + "",
                this.shortcuts[t].inventoryConnection.bindKey.element.text = t + 1 + "",
                n.allowSight) {
                    var o = this.findItemByType("Sight");
                    o && this.currentWeaponName == n.name ? (this.shortcuts[t].inventoryConnection.slotIconSight.enabled = !0,
                    this.shortcuts[t].inventoryConnection.slotIconSight.element.textureAsset = o.icon) : this.shortcuts[t].inventoryConnection.slotIconSight.enabled = !1
                }
                if (n.allowExtend) {
                    var i = this.findItemByType("Extend");
                    i && this.currentWeaponName == n.name ? (this.shortcuts[t].inventoryConnection.slotIconMagazine.enabled = !0,
                    this.shortcuts[t].inventoryConnection.slotIconMagazine.element.textureAsset = i.icon) : this.shortcuts[t].inventoryConnection.slotIconMagazine.enabled = !1
                }
                if (n.allowBarrel) {
                    var s = this.findItemByType("Barrel");
                    s && this.currentWeaponName == n.name ? (this.shortcuts[t].inventoryConnection.slotIconSilencer.enabled = !0,
                    this.shortcuts[t].inventoryConnection.slotIconSilencer.element.textureAsset = s.icon) : this.shortcuts[t].inventoryConnection.slotIconSilencer.enabled = !1
                }
                if (n.allowGrip) {
                    var r = this.findItemByType("Grip");
                    r && this.currentWeaponName == n.name ? (this.shortcuts[t].inventoryConnection.slotIconGrip.enabled = !0,
                    this.shortcuts[t].inventoryConnection.slotIconGrip.element.textureAsset = r.icon) : this.shortcuts[t].inventoryConnection.slotIconGrip.enabled = !1
                }
            }
        }
}
,
Inventory.prototype.createInventoryShortcut = function(t, e) {
    this.weaponName.element.text = t.name,
    this.weaponBindKey.element.text = e + 1 + "";
    var n = this.weaponItem.clone();
    return n.setLocalPosition(170 * e, 0, 0),
    n.enabled = !0,
    n.bindKey = n.findByName("KeyBind"),
    n.ammoType = n.findByName("AmmoType"),
    n.clip = n.findByName("Clip"),
    n.magazine = n.findByName("Magazine"),
    n.weaponIcon = n.findByName("WeaponIcon"),
    n.weaponIcon.element.textureAsset = t.icon.id,
    n.slotButtonSight = n.findByName("SlotButtonSight"),
    n.slotIconSight = n.findByName("SightIcon"),
    n.slotButtonGrip = n.findByName("SlotButtonGrip"),
    n.slotIconGrip = n.findByName("GripIcon"),
    n.slotButtonMagazine = n.findByName("SlotButtonMagazine"),
    n.slotIconMagazine = n.findByName("MagazineIcon"),
    n.slotButtonSilencer = n.findByName("SlotButtonSilencer"),
    n.slotIconSilencer = n.findByName("SilencerIcon"),
    n.dropButton = n.findByName("DropItem"),
    n.dropButton.item = t,
    n.dropButton.script.button.connected = this.entity,
    n.weapon = t,
    n.slotButtonSight.enabled = t.details.allowSight,
    n.slotButtonGrip.enabled = t.details.allowGrip,
    n.slotButtonMagazine.enabled = t.details.allowExtend,
    n.slotButtonSilencer.enabled = t.details.allowBarrel,
    n.ammoType.element.text = Utils.clearName(t.details.ammoType),
    this.weaponAttachmentsHolder.addChild(n),
    n
}
,
Inventory.prototype.getActiveGrenade = function() {
    return this.hasItem("Explosion-Grenade") ? "Explosion" : this.hasItem("Smoke-Grenade") ? "Smoke" : void 0
}
,
Inventory.prototype.createShortcut = function(t) {
    this.shortcutName.element.text = Utils.shortcutName(t.name),
    this.shortcutBind.element.text = this.shortcuts.length + 1 + "";
    var e = this.shortcutItem.clone();
    e.setLocalPosition(0, 80 * -this.shortcuts.length, 0),
    e.enabled = !0,
    e.name = t.name,
    e.type = t.type,
    e.background = e.findByName("Background"),
    e.bindKey = e.findByName("BindKey"),
    t.maskIcon && (e.findByName("Icon").element.spriteAsset = t.maskIcon.id),
    "Grenade" != t.type ? e.inventoryConnection = this.createInventoryShortcut(t, this.shortcuts.length) : (e.findByName("Icon").setLocalPosition(-55, 4, 0),
    e.findByName("Icon").setLocalScale(.22, .22, .22)),
    e.item = t,
    this.shortcutHolder.setLocalPosition(0, 80 * this.shortcuts.length + 205, 0),
    this.shortcutHolder.addChild(e),
    this.shortcuts.push(e),
    this.setShortcut(this.shortcuts.length - 1)
}
,
Inventory.prototype.setShortcut = function(t) {
    for (var e = this.shortcuts.length; e--; )
        e == t ? (this.shortcuts[e].active = !0,
        this.shortcuts[e].background.element.opacity = .3) : (this.shortcuts[e].active = !1,
        this.shortcuts[e].background.element.opacity = .05)
}
,
Inventory.prototype.setShortcutByName = function(t) {
    for (var e = this.shortcuts.length; e--; )
        this.shortcuts[e].name == t ? this.shortcuts[e].background.element.opacity = .3 : this.shortcuts[e].background.element.opacity = .05;
    this.currentWeaponName = t
}
,
Inventory.prototype.removeShortcut = function(t) {
    for (var e = this.shortcuts.length; e--; )
        this.shortcuts[e].name == t.name && (this.shortcuts[e].inventoryConnection && this.shortcuts[e].inventoryConnection.destroy(),
        this.shortcuts[e].destroy(),
        this.shortcuts.splice(e, 1));
    if (this.currentWeaponName == t.name) {
        var n = Object.keys(this.shortcuts);
        this.character.setWeapon(this.shortcuts[n[0]].name)
    }
}
,
Inventory.prototype.hasItem = function(t) {
    var e = !1;
    for (var n in this.items) {
        var o = this.items[n];
        o.name == t && (e = o)
    }
    return e
}
,
Inventory.prototype.addStack = function(t, e) {
    for (var n in this.items) {
        this.items[n].name == Utils.clearId(t) && (this.items[n].amount += e,
        this.items[n].itemAmount.element.text = this.items[n].amount + "")
    }
}
,
Inventory.prototype.useStack = function(t, e) {
    for (var n in this.items) {
        var o = this.items[n];
        o.name != Utils.clearId(t) && t != o.name || (this.items[n].amount -= e,
        this.items[n].itemAmount.element.text = this.items[n].amount + "",
        this.items[n].amount <= 0 && (o.destroy(),
        this.items.splice(parseInt(n), 1),
        this.removeShortcut(o)))
    }
}
,
Inventory.prototype.checkAmountByType = function(t) {
    var e = 0
      , n = !1;
    for (var o in this.items) {
        var i = this.items[o];
        i.type == t && (n = i)
    }
    return n && n.amount > 0 && (e = n.amount),
    e
}
,
Inventory.prototype.checkAmmo = function(t) {
    var e = 0
      , n = !1;
    for (var o in this.items) {
        var i = this.items[o];
        "Ammo-" + i.name == t.ammoType && (n = i)
    }
    return n && n.amount > 0 && (e = n.amount),
    e
}
,
Inventory.prototype.hasItemType = function(t, e) {
    var n = !1;
    for (var o in this.items) {
        var i = this.items[o];
        e ? e != i && i.type == t ? n = i : n || (n = !1) : i.type == t && (n = i)
    }
    return n
}
,
Inventory.prototype.getCurrentIndex = function() {
    for (var t = this.shortcuts.length, e = 0; t--; )
        this.shortcuts[t] && this.shortcuts[t].active && (e = t);
    return e
}
,
Inventory.prototype.getItemByIndex = function(t) {
    return !!this.shortcuts[t - 1] && this.shortcuts[t - 1].name
}
,
Inventory.prototype.checkEnoughSpace = function(t) {
    for (var e = 0, n = ["Handgun", "Rifle", "SubMachine", "Ammo", "Grenade"], o = this.items.length; o--; )
        n.indexOf(this.items[o].type) > -1 && e++;
    return n.indexOf(t) > -1 && e >= this.totalSpace
}
,
Inventory.prototype.findItem = function(t) {
    return this.hasItem(t)
}
,
Inventory.prototype.getItemAmount = function(t) {
    var e = this.hasItem(t);
    return e ? e.amount : 0
}
,
Inventory.prototype.setNeedleCount = function() {
    this.needleCountEntity.element.text = this.getItemAmount("Needle") + "x"
}
,
Inventory.prototype.findItemByType = function(t) {
    return this.hasItemType(t)
}
,
Inventory.prototype.checkDefaultGun = function(t) {
    return "Handgun" != t.type && "Rifle" != t.type && "SubMachine" != t.type || !!(this.hasItemType("Handgun", t) || this.hasItemType("Rifle", t) || this.hasItemType("SubMachine", t))
}
,
Inventory.prototype.dropItem = function(t, e) {
    if ("Bag" == t.type && this.items.length >= this.defaultSpace)
        return this.interface.showAlert("Can't do that!"),
        !1;
    this.checkDefaultGun(t) ? (t.destroy(),
    this.items.splice(this.items.indexOf(t), 1),
    this.removeShortcut(t),
    this.updateLeftSpace(),
    this.entity.sound.play("DropItem"),
    this.app.fire("Item:Drop", t.name, this.characterEntity.script.attachment.dropPoint.getPosition().clone(), t.amount),
    this.characterEntity.script.attachment.setParts()) : e || this.interface.showAlert("You should at least have a gun.")
}
,
Inventory.prototype.checkAdditionalSpace = function() {
    this.hasItem("Bag-Level-3") ? (this.totalSpace = 12,
    this.bagIconElement.element.icon = this.bagIconLevel3) : (this.totalSpace = 5,
    this.bagIconElement.element.icon = this.bagIconLevel1)
}
,
Inventory.prototype.checkAdditionalArmor = function() {
    if (!this.character)
        return !1;
    this.character.currentArmor = 0,
    this.character.currentArmor += this.getItemAmount("Armor-Level-1"),
    this.character.currentArmor += this.getItemAmount("Armor-Level-2"),
    this.character.currentArmor += this.getItemAmount("Armor-Level-3")
}
,
Inventory.prototype.checkPlayerAttachments = function() {
    if (!this.character)
        return !1;
    var t = this.hasItemType("Helmet");
    t ? (this.helmetIcon.enabled = !0,
    this.helmetIcon.element.textureAsset = t.icon,
    this.helmetBackgroundIcon.enabled = !1) : (this.helmetIcon.enabled = !1,
    this.helmetBackgroundIcon.enabled = !1);
    var e = this.hasItemType("Armor");
    e ? (this.armorIcon.enabled = !0,
    this.armorIcon.element.textureAsset = e.icon,
    this.armorBackgroundIcon.enabled = !1) : (this.armorIcon.enabled = !1,
    this.armorBackgroundIcon.enabled = !1);
    var n = this.hasItemType("Boot");
    n ? (this.bootIcon.enabled = !0,
    this.bootIcon.element.textureAsset = n.icon,
    this.bootBackgroundIcon.enabled = !1) : (this.bootIcon.enabled = !1,
    this.bootBackgroundIcon.enabled = !1)
}
,
Inventory.prototype.updateLeftSpace = function() {
    this.checkAdditionalSpace(),
    this.checkAdditionalArmor(),
    this.checkPlayerAttachments();
    for (var t = 0, e = this.items.length; e--; )
        "Handgun" != this.items[e].type && "Rifle" != this.items[e].type && "SubMachine" != this.items[e].type && "Ammo" != this.items[e].type && "Grenade" != this.items[e].type || t++;
    var n = 1 * t / this.totalSpace;
    this.leftSpaceElement.element.text = t + " / " + this.totalSpace,
    this.spaceBarElement.setLocalScale(n, 1, 1);
    var o = 0;
    for (var i in this.items) {
        this.items[i].setLocalPosition(0, -10 - 70 * o, 0),
        o++
    }
    this.updateShortcuts(),
    this.setNeedleCount()
}
,
Inventory.prototype.update = function(t) {
    this.removeItem && (this.removeItem.destroy(),
    this.removeItem = !1)
}
;
var Attr = pc.createScript("attr");
Attr.attributes.add("name", {
    type: "string"
}),
Attr.prototype.initialize = function() {}
;
var Sky = pc.createScript("sky");
Sky.attributes.add("playerCamera", {
    type: "entity"
}),
Sky.prototype.initialize = function() {}
,
Sky.prototype.update = function(t) {
    var e = this.playerCamera.getPosition().clone()
      , i = new pc.Vec3(e.x,0,e.z);
    this.entity.setPosition(i)
}
;
var Character = pc.createScript("character");
Character.attributes.add("bagEntity", {
    type: "entity"
}),
Character.prototype.initialize = function() {
    this.spine = this.entity.findByName("Spine_01"),
    this.bagEntity.setLocalScale(250, 250, 250),
    this.bagEntity.reparent(this.spine)
}
;
var Network = pc.createScript("network");
Network.attributes.add("SSL", {
    type: "boolean"
}),
Network.attributes.add("IP", {
    type: "string"
}),
Network.attributes.add("port", {
    type: "string"
}),
Network.attributes.add("hash", {
    type: "string"
}),
Network.attributes.add("username", {
    type: "string"
}),
Network.attributes.add("roomId", {
    type: "string"
}),
Network.attributes.add("radiusId", {
    type: "number"
}),
Network.attributes.add("radiusTime", {
    type: "number"
}),
Network.attributes.add("evacuateTime", {
    type: "number"
}),
Network.attributes.add("playerManager", {
    type: "entity"
}),
Network.prototype.initialize = function() {
    this.isDeath = !1,
    this.isPaused = !1,
    this.activityTimer = 90,
    setInterval(function(t) {
        t.activityTimer < 0 && (t.disconnect(),
        "undefined" == typeof VERSION || (window.location.href = "https://miniroyale2.io/?kicked=true")),
        t.activityTimer--
    }, 1e3, this);
    (new Date).getMinutes();
    "undefined" != typeof VERSION ? (this.SSL = !0,
    this.IP = pc.network.IP,
    this.port = 443,
    this.roomId = pc.network.roomId,
    this.radiusId = pc.network.radiusId) : this.roomId = "ROOM1",
    this.pack = MessagePack.initialize(4194304),
    this.SSL ? this.ws = new WebSocket("wss://" + this.IP + ":" + this.port + "/?" + this.roomId) : this.ws = new WebSocket("ws://" + this.IP + ":" + this.port + "/?" + this.roomId),
    this.ws.binaryType = "arraybuffer",
    this.ws.userId = -1,
    this.ws.roomId = "NONE",
    this.gameFinished = !1,
    this.time = 0,
    this.ws.map = {
        auth: "auth",
        mode: "mode",
        team: "team",
        close: "close",
        leave: "leave",
        result: "result",
        death: "death",
        hurt: "hurt",
        users: "users",
        respawn: "respawn",
        deploy: "deploy",
        killed: "killed",
        tick: "tick",
        land: "land",
        heal: "heal",
        chat: "chat",
        s: "state",
        w: "weapon",
        p: "position",
        j: "join",
        k: "keyboard",
        d: "damage",
        t: "throw",
        h: "health",
        e: "explosion",
        deployCancel: "deployCancel"
    },
    this.keys = {
        up: 1,
        down: 2,
        left: 3,
        right: 4,
        jump: 5,
        reload: 6,
        throw: 7,
        crouch: 8,
        peek_left: 9,
        peek_right: 10,
        shift: 11,
        shoot: 12
    },
    this.actions = {
        0: "",
        1: "Headshot"
    },
    this.rankLabels = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th"],
    this.ws.onopen = this.onOpen.bind(this),
    this.ws.onclose = this.onClose.bind(this),
    this.ws.onmessage = this.onMessage.bind(this),
    this.reverseMap(),
    this.app.on("Player:Position", this.setPosition.bind(this)),
    this.app.on("Player:Land", this.setLand.bind(this)),
    this.app.on("Player:Throw", this.setThrow.bind(this)),
    this.app.on("Player:Hurt", this.setHurt.bind(this)),
    this.app.on("Player:Heal", this.setHeal.bind(this)),
    this.app.on("Player:Respawn", this.setRespawn.bind(this)),
    this.app.on("Player:Explosion", this.setExplosion.bind(this)),
    this.app.on("Player:SetWeapon", this.setWeapon.bind(this)),
    this.app.on("Player:Team", this.setTeam.bind(this)),
    this.app.on("Register:Damage", this.registerDamage.bind(this)),
    this.app.on("Keyboard:State", this.setInput.bind(this)),
    this.app.on("State:Object", this.setObjectState.bind(this)),
    this.app.on("Event:SendChat", this.sendChatMessage.bind(this)),
    this.app.on("Server:Reconnect", this.reconnect.bind(this)),
    this.app.on("Deploy:Position", this.sendDeployPosition.bind(this)),
    this.lastDamagePosition = new pc.Vec3(0,0,0),
    this.controls = !1,
    this.lastShooter = !1,
    void 0 !== pc.hash && (this.hash = pc.hash),
    void 0 !== pc.username && (this.username = pc.username),
    void 0 !== pc.skin ? this.skin = pc.skin : this.skin = "",
    void 0 !== pc.hat ? this.hat = pc.hat : this.hat = "";
    var t = Utils.getURLParams("skin");
    t && (this.skin = t,
    pc.skin = t)
}
,
Network.prototype.connect = function() {
    this.ws && this.ws.close();
    var t = (new Date).getMinutes();
    "undefined" != typeof VERSION ? (this.SSL = !0,
    this.IP = pc.network.IP,
    this.port = 443,
    this.roomId = pc.network.roomId,
    this.radiusId = pc.network.radiusId) : this.roomId = "ROOM" + t,
    this.SSL ? this.ws = new WebSocket("wss://" + this.IP + ":" + this.port + "/?" + this.roomId) : this.ws = new WebSocket("ws://" + this.IP + ":" + this.port + "/?" + this.roomId),
    this.ws.binaryType = "arraybuffer",
    this.ws.userId = -1,
    this.ws.roomId = "NONE",
    this.ws.map = {
        auth: "auth",
        mode: "mode",
        team: "team",
        close: "close",
        leave: "leave",
        result: "result",
        death: "death",
        hurt: "hurt",
        users: "users",
        deploy: "deploy",
        respawn: "respawn",
        killed: "killed",
        tick: "tick",
        land: "land",
        heal: "heal",
        chat: "chat",
        s: "state",
        w: "weapon",
        p: "position",
        j: "join",
        k: "keyboard",
        d: "damage",
        t: "throw",
        h: "health",
        e: "explosion",
        deployCancel: "deployCancel"
    },
    this.ws.onopen = this.onOpen.bind(this),
    this.ws.onclose = this.onClose.bind(this),
    this.ws.onmessage = this.onMessage.bind(this),
    this.reverseMap()
}
,
Network.prototype.onOpen = function(t) {}
,
Network.prototype.reconnect = function() {
    var t = "1.0.0"
      , e = this;
    "undefined" != typeof VERSION && (t = VERSION),
    pc.network = {
        IP: "",
        roomId: "",
        radiusId: 0
    },
    Service.post("find_match", {
        country: "EU",
        game_mode: "BATTLEROYALE",
        maps: pc.selectedMap,
        version: t
    }, function(t) {
        t.success ? t.session ? (pc.network.IP = t.session.ip,
        pc.network.roomId = t.session.room_id,
        pc.network.radiusId = t.session.radius,
        e.connect()) : alert("Couldn't find match, try again please") : alert(t.message)
    })
}
,
Network.prototype.onClose = function(t) {
    1e3 == t.code && this.app.fire("Server:Reconnect", !0),
    this.app.fire("Event:Disconnect", !0)
}
,
Network.prototype.onMessage = function(t) {
    var e = new Uint8Array(t.data);
    e = MessagePack.Buffer.from(e);
    var s = this.pack.decode(e);
    s && this.parse(s)
}
,
Network.prototype.broadcast = function(t) {
    this.ws.readyState == this.ws.OPEN && -1 != this.ws.userId && "NONE" != this.ws.roomId && (this.ws.send(this.pack.encode(t)),
    this.activityTimer = 90)
}
,
Network.prototype.parse = function(t) {
    t.length > 0 && this[this.ws.map[t[0]]] && this[this.ws.map[t[0]]](t.splice(1, t.length + 1))
}
,
Network.prototype.reverseMap = function() {
    var t = this;
    Object.values(this.ws.map).map(function(e, s) {
        t.ws.map[e] = Object.keys(t.ws.map)[s]
    });
    var e = {};
    Object.values(this.keys).map(function(s, i) {
        e[s] = Object.keys(t.keys)[i]
    }),
    Object.values(e).map(function(s, i) {
        t.keys[Object.keys(e)[i]] = s
    })
}
,
Network.prototype.setObjectState = function(t, e) {
    this.broadcast([this.ws.map.state, t, e])
}
,
Network.prototype.sendChatMessage = function(t) {
    var e = t.slice(0, 32);
    this.broadcast([this.ws.map.chat, e])
}
,
Network.prototype.chat = function(t) {
    t.length > 0 && this.app.fire("Event:Chat", t[0], t[1])
}
,
Network.prototype.tick = function(t) {
    this.time = parseInt(t),
    this.app.fire("Server:Tick", this.time),
    this.setTickStates()
}
,
Network.prototype.setTickStates = function() {
    if (this.time == this.radiusTime && "battle-royale" == pc.currentMode && this.app.fire("Event:Circle", this.radiusId),
    this.time == this.evacuateTime && "battle-royale" == pc.currentMode && this.controls && this.controls.interface && this.controls.interface.showEvacuateMessage(),
    this.time >= this.evacuateTime && "battle-royale" == pc.currentMode && this.controls && this.controls.interface) {
        var t = Math.max(this.radiusTime - this.time, 0) + " SN";
        this.controls.interface.inEvacuate = !0,
        this.controls.interface.evacuateSecondsElement.element.text = t
    }
}
,
Network.prototype.state = function(t) {
    this.app.fire("State:Trigger", t[0], t[1])
}
,
Network.prototype.setThrow = function(t, e, s, i, o, a, n, r) {
    this.broadcast([this.ws.map.throw, t, e, s, i, o, a, n, r])
}
,
Network.prototype.setHurt = function() {
    this.broadcast([this.ws.map.hurt, !0])
}
,
Network.prototype.setHeal = function(t) {
    this.broadcast([this.ws.map.heal, t])
}
,
Network.prototype.setRespawn = function() {
    this.broadcast([this.ws.map.respawn, !0]),
    this.gameFinished = !1
}
,
Network.prototype.respawn = function(t) {
    if (t.length > 0) {
        var e = t[0]
          , s = this.getPlayerById(e);
        s.script && s.script.enemy && this.ws.userId != e && s.script.enemy.respawn()
    }
}
,
Network.prototype.setExplosion = function(t, e, s) {
    this.broadcast([this.ws.map.explosion, Utils.encodeFloat(t), Utils.encodeFloat(e), Utils.encodeFloat(s)])
}
,
Network.prototype.deploy = function(t) {
    this.app.fire("Enemy:Deploy", t[0], this.ws.userId, t[1], t[2])
}
,
Network.prototype.deployCancel = function(t) {
    this.app.fire("Deploy:Cancel", !0)
}
,
Network.prototype.setWeapon = function(t) {
    this.broadcast([this.ws.map.weapon, t])
}
,
Network.prototype.weapon = function(t) {
    var e = t[0]
      , s = t[1];
    this.app.fire("Enemy:SetWeapon", e, s)
}
,
Network.prototype.setInput = function(t, e) {
    this.broadcast([this.ws.map.keyboard, this.keys[t], e])
}
,
Network.prototype.registerDamage = function(t, e, s, i) {
    t && e && s && this.broadcast([this.ws.map.damage, t, e, s, i])
}
,
Network.prototype.damage = function(t) {
    if (t.length > 2) {
        var e = t[0]
          , s = t[1];
        t[3];
        if (this.ws.userId == s && !this.gameFinished) {
            var i = this.getPlayerById(e);
            i && (i.script && i.script.enemy && t.length > 2 && (i.script.enemy.damageGiven += parseInt(t[2])),
            this.lastDamagePosition = i.getPosition().clone()),
            this.app.fire("Player:Damage", this.lastDamagePosition)
        }
    }
}
,
Network.prototype.health = function(t) {
    this.controls && t.length > 0 && ((this.controls.currentHealth > t[0] || this.controls.currentArmor > t[1]) && this.controls.setDamage({
        x: 0,
        y: 0,
        z: 0
    }),
    this.controls.currentHealth = t[0],
    this.controls.currentArmor = t[1])
}
,
Network.prototype.keyboard = function(t) {
    3 === t.length && this.app.fire("Enemy:Keyboard", t[0], this.keys[t[1]], t[2])
}
,
Network.prototype.disconnect = function(t) {
    this.broadcast([this.ws.map.leave, this.ws.userId]),
    this.ws.close()
}
,
Network.prototype.throw = function(t) {
    var e = new pc.Vec3(Utils.decodeFloat(t[1]),Utils.decodeFloat(t[2]),Utils.decodeFloat(t[3]))
      , s = new pc.Vec3(Utils.decodeFloat(t[4]),Utils.decodeFloat(t[5]),Utils.decodeFloat(t[6]))
      , i = Utils.decodeFloat(t[7])
      , o = t[8];
    this.app.fire("Grenade:Throw", t[0], e, s, i, o, !1)
}
,
Network.prototype.result = function(t) {
    var e = parseInt(t[0]) + 1
      , s = {
        rank: e,
        rankLabel: this.rankLabels[e - 1],
        kills: t[1],
        gameTime: t[2],
        damageTaken: t[3],
        damageGiven: t[4],
        headshots: t[5],
        experience: t[6],
        coins: t[7],
        timePoint: t[8],
        killPoint: t[9],
        lastShooter: this.lastShooter
    };
    this.controls || (this.waitingResultSend = !1,
    this.currentResults = s,
    setInterval(function(t) {
        t.controls && !t.waitingResultSend && (t.controls.showResults(t.currentResults),
        t.waitingResultSend = !0)
    }, 1e3, this)),
    this.controls && (1 == e && setTimeout(function(t) {
        t.app.fire("Event:Victory", !0)
    }, 1e3, this),
    this.controls.showResults(s)),
    void 0 !== pc.miniplay && (1 !== e && pc.miniplay.save("deaths", 1),
    pc.miniplay.save("kills", s.kills),
    pc.miniplay.save("experience", parseInt(s.experience))),
    this.gameFinished = !0,
    "undefined" != typeof PokiSDK && (PokiSDK.happyTime(10 / e * .1),
    PokiSDK.gameplayStop())
}
,
Network.prototype.death = function(t) {
    if (this.controls && t.length > 0 && !this.gameFinished) {
        var e = this.getPlayerById(t[0]);
        e && (this.lastShooter = e),
        this.controls.setDeath(e),
        this.isDeath = !0
    }
}
,
Network.prototype.killed = function(t) {
    if (t.length > 0 && !this.isPaused) {
        var e = this.getPlayerById(t[0])
          , s = this.getPlayerById(t[1])
          , i = !1;
        t.length > 3 && (i = t[4]);
        var o = ""
          , a = ""
          , n = "";
        e && (o = e.script.enemy.username,
        e.script.enemy.death()),
        this.ws.userId == t[1] ? (a = this.username,
        n = this.controls.currentWeaponDetails.name,
        this.app.fire("Player:Point", o, t[2], this.actions[t[3]], t[4])) : s && s.script.enemy && (a = s.script.enemy.username,
        n = s.script.enemy.currentWeaponName),
        this.app.fire("Player:Kill", {
            killer: a,
            killed: o,
            weapon: n,
            isHead: i
        })
    }
}
,
Network.prototype.auth = function(t) {
    this.ws.roomId = t[0],
    this.ws.userId = t[1],
    pc.userId = this.ws.userId,
    this.broadcast([this.ws.map.join, this.ws.userId, this.hash, this.username, this.skin, this.hat]),
    this.broadcast([this.ws.map.mode, pc.currentMode])
}
,
Network.prototype.join = function(t) {
    var e = {
        id: t[0],
        username: t[1],
        weapon: t[2],
        location: t[3],
        skin: t[4],
        hat: t[5]
    };
    this.app.fire("Enemy:Create", e.id, e.username, e.weapon, e.location, e.skin, e.hat)
}
,
Network.prototype.users = function(t) {
    for (var e = t[0], s = e.length; s--; )
        this.app.fire("Enemy:Create", e[s].id, e[s].username, e[s].weapon, e[s].location, e[s].skin, e[s].hat)
}
,
Network.prototype.getPlayerById = function(t) {
    return this.playerManager.script.playerManager.getPlayerById(t)
}
,
Network.prototype.position = function(t) {
    this.app.fire("Enemy:Position", t)
}
,
Network.prototype.team = function(t) {
    if (t.length < 1)
        return !1;
    console.log(t),
    this.app.fire("Team:Selection", t[0], t[1], t[2], t[3], t[4], this.ws.userId == t[0])
}
,
Network.prototype.setTeam = function(t) {
    this.broadcast([this.ws.map.team, t])
}
,
Network.prototype.close = function(t) {
    this.app.fire("Enemy:Destroy", t)
}
,
Network.prototype.setLand = function() {
    this.broadcast([this.ws.map.land, 1])
}
,
Network.prototype.land = function(t) {
    this.app.fire("Enemy:Land", t)
}
,
Network.prototype.setPosition = function(t) {
    this.broadcast([this.ws.map.position, t.position.x, t.position.y, t.position.z, t.angle.x, t.angle.y])
}
,
Network.prototype.sendDeployPosition = function(t, e) {
    this.broadcast([this.ws.map.deploy, t, e])
}
,
Network.prototype.update = function(t) {}
;
var PlayerManager = pc.createScript("playerManager");
PlayerManager.attributes.add("enemyEntity", {
    type: "entity"
}),
PlayerManager.attributes.add("networkEntity", {
    type: "entity"
}),
PlayerManager.prototype.initialize = function() {
    this.players = [],
    this.app.on("Enemy:Create", this.onPlayerCreate.bind(this), this),
    this.app.on("Enemy:Position", this.onPlayerPosition.bind(this), this),
    this.app.on("Enemy:Destroy", this.onPlayerDestroy.bind(this), this),
    this.app.on("Enemy:Keyboard", this.onKeyboardState.bind(this), this),
    this.app.on("Enemy:SetWeapon", this.setWeapon.bind(this), this),
    this.app.on("Enemy:Land", this.setLand.bind(this), this),
    this.app.on("Grenade:Throw", this.setThrow.bind(this), this)
}
,
PlayerManager.prototype.onPlayerCreate = function(e, t, r, a, n, i) {
    if (this.findByPlayerId(e))
        return !1;
    var s = this.enemyEntity.clone();
    r && (s.script.enemy.currentWeapon = r),
    s.enabled = !0,
    s.playerId = e,
    s.script.enemy.playerId = e,
    t && (s.script.enemy.username = t),
    n && (s.script.enemy.skin = n,
    s.script.enemy.setSkin(s.script.enemy.skin)),
    i && (s.script.enemy.hat = i,
    s.script.enemy.setHat(s.script.enemy.hat)),
    s.sound.positional = !0,
    s.script.enemy.networkEntity = this.networkEntity,
    this.entity.addChild(s),
    this.players.push(s)
}
,
PlayerManager.prototype.setThrow = function(e) {
    var t = this.findByPlayerId(e);
    t && t.script.enemy.throw()
}
,
PlayerManager.prototype.findByPlayerId = function(e) {
    for (var t = !1, r = this.players.length; r--; )
        this.players[r] && this.players[r].playerId == e && (t = this.players[r]);
    return t
}
,
PlayerManager.prototype.onPlayerPosition = function(e) {
    for (var t = this.players.length; t--; ) {
        var r = this.players[t];
        r.playerId == e[0] && r && r.script && r.script.enemy && r.script.enemy.setPosition(e)
    }
}
,
PlayerManager.prototype.onPlayerDestroy = function(e) {
    for (var t = this.players.length; t--; ) {
        var r = this.players[t];
        r.playerId == e[0] && (r && r.script && r.script.enemy ? r.script.enemy.removeEnemy() : r.destroy(),
        this.players.splice(t, 1))
    }
}
,
PlayerManager.prototype.onKeyboardState = function(e, t, r) {
    for (var a = this.players.length; a--; ) {
        var n = this.players[a];
        n && n.playerId == e && n.script && n.script.enemy && n.script.enemy.setInput(t, r)
    }
}
,
PlayerManager.prototype.setWeapon = function(e, t) {
    for (var r = this.players.length; r--; ) {
        var a = this.players[r];
        a && a.playerId == e && a.script && a.script.enemy && a.script.enemy.setWeapon(t)
    }
}
,
PlayerManager.prototype.setLand = function(e) {
    for (var t = this.players.length; t--; ) {
        var r = this.players[t];
        r.playerId == e && r.script.enemy.setLand()
    }
}
,
PlayerManager.prototype.getPlayerById = function(e) {
    for (var t = this.players.length, r = !1; t--; ) {
        var a = this.players[t];
        a.playerId == e && (r = a)
    }
    return r
}
;
var Slider = pc.createScript("slider");
Slider.attributes.add("defaultValue", {
    type: "number",
    default: 100
}),
Slider.attributes.add("min", {
    type: "number",
    default: 0
}),
Slider.attributes.add("max", {
    type: "number",
    default: 100
}),
Slider.attributes.add("step", {
    type: "number",
    default: 1
}),
Slider.attributes.add("displayElement", {
    type: "entity"
}),
Slider.attributes.add("storeValue", {
    type: "boolean"
}),
Slider.attributes.add("storeWithName", {
    type: "boolean"
}),
Slider.attributes.add("connected", {
    type: "entity"
}),
Slider.attributes.add("triggerFunction", {
    type: "string"
}),
Slider.prototype.initialize = function() {
    this.element = document.createElement("input"),
    this.element.type = "range",
    this.element.style.position = "absolute",
    this.element.style.fontFamily = this.fontFamily,
    this.element.style.border = "0px",
    this.element.style.margin = "0px",
    this.element.style.padding = "0px",
    this.element.style.background = "transparent",
    this.element.style.boxSizing = "border-box",
    this.element.value = this.defaultValue,
    this.element.min = this.min,
    this.element.max = this.max,
    this.element.onchange = this.onChange.bind(this),
    this.element.style.outline = "none",
    document.body.appendChild(this.element),
    this.updateStyle(),
    this.storeWithName ? this.elementId = this.entity.name : this.elementId = this.entity._guid,
    window.localStorage.getItem(this.elementId) && this.setValue(window.localStorage.getItem(this.elementId)),
    this.on("state", function(e) {
        this.entity.enabled ? this.element.style.display = "block" : this.element.style.display = "none"
    }, this)
}
,
Slider.prototype.onFocus = function() {
    this.focusEntity.enabled = !0
}
,
Slider.prototype.onBlur = function() {
    this.focusEntity.enabled = !1
}
,
Slider.prototype.onChange = function() {
    if (this.storeValue && window.localStorage.setItem(this.elementId, this.getValue()),
    this.connected) {
        var connectedEntity = this.connected
          , self = this.entity;
        eval("connectedEntity.script." + this.triggerFunction)
    }
}
,
Slider.prototype.updateStyle = function() {
    if (this.entity.element.screenCorners) {
        var e = this.entity.element.screenCorners
          , t = 1 / this.app.graphicsDevice.maxPixelRatio;
        this.element.style.left = e[0].x * t + "px",
        this.element.style.bottom = e[0].y * t + "px",
        this.element.style.width = (e[2].x - e[0].x) * t + "px",
        this.element.style.height = (e[2].y - e[0].y) * t + "px"
    }
}
,
Slider.prototype.update = function(e) {
    this.updateStyle(),
    this.displayElement && (this.displayElement.element.text = this.getValue())
}
,
Slider.prototype.setValue = function(e) {
    this.element.value = e
}
,
Slider.prototype.getValue = function() {
    if (this.element)
        return this.element.value
}
;
var Container = pc.createScript("container");
Container.attributes.add("id", {
    type: "string"
}),
Container.attributes.add("onInit", {
    type: "string"
}),
Container.attributes.add("innerHTML", {
    type: "string"
}),
Container.attributes.add("onDestroy", {
    type: "string"
}),
Container.attributes.add("autoResize", {
    type: "boolean",
    default: !0
}),
Container.attributes.add("fullyRemove", {
    type: "boolean"
}),
Container.prototype.initialize = function() {
    var t = document.getElementById(this.id);
    t ? (this.element = t,
    this.element.style.width = this.entity.element.width + "px",
    this.element.style.height = this.entity.element.height + "px") : (this.element = document.createElement("div"),
    this.element.style.width = this.entity.element.width + "px",
    this.element.style.height = this.entity.element.height + "px",
    this.element.id = this.id,
    this.innerHTML && (this.element.innerHTML = this.innerHTML),
    this.element.style.position = "absolute",
    document.body.appendChild(this.element)),
    this.element.style.overflow = "hidden",
    this.updateStyle(),
    setTimeout(function(t) {
        t._onInit()
    }, 150, this),
    this.on("state", function(t) {
        this.entity.enabled ? (this._onInit(),
        this.element.style.display = "block") : this.element.style.display = "none"
    }, this),
    this.on("destroy", this._onDestroy, this)
}
,
Container.prototype._onInit = function() {
    if ("undefined" !== this.onInit)
        try {
            eval(this.onInit)
        } catch (t) {}
}
,
Container.prototype._onDestroy = function() {
    if ("undefined" !== this.onDestroy) {
        try {
            eval(this.onDestroy)
        } catch (t) {}
        try {
            this.fullyRemove && this.element.remove()
        } catch (t) {}
    }
}
,
Container.prototype.updateStyle = function() {
    if (this.entity.element.screenCorners) {
        var t = this.entity.element.screenCorners;
        this.element.style.left = t[0].x + "px",
        this.element.style.bottom = t[0].y + "px",
        this.element.style.position = "absolute",
        this.element.style.display = "block",
        this.element.style.zIndex = 1e3;
        var e = (t[2].x - t[0].x) / this.entity.element.width
          , i = (t[2].y - t[0].y) / this.entity.element.height;
        this.autoResize && (this.element.style.transform = "scale(" + e + ", " + i + ")",
        this.element.style.transformOrigin = "left bottom")
    }
}
,
Container.prototype.update = function(t) {
    this.updateStyle()
}
;
var PhysicsManager = pc.createScript("physicsManager");
PhysicsManager.attributes.add("lookEntity", {
    type: "entity"
}),
PhysicsManager.attributes.add("lookADSEntity", {
    type: "entity"
}),
PhysicsManager.attributes.add("maxBodies", {
    type: "number",
    default: 5
}),
PhysicsManager.attributes.add("threshold", {
    type: "number",
    default: 2
}),
PhysicsManager.prototype.initialize = function() {
    this.lastRigidUpdate = Date.now(),
    this.lastDistanceUpdate = Date.now(),
    this.currentPosition = new pc.Vec3(0,0,0),
    this.lookPosition = new pc.Vec3(0,0,0),
    this.rigidbodies = [],
    this.app.root.findByTag("Rigidbody") && (this.rigidbodies = this.app.root.findByTag("Rigidbody")),
    this.app.on("Player:Position", this.setPosition.bind(this), this),
    this.app.on("Physics:Update", this.onPhysicsUpdate.bind(this), this),
    this.app.on("Physics:Trigger", this.forceTrigger, this)
}
,
PhysicsManager.prototype.onPhysicsUpdate = function(i) {
    this.rigidbodies = this.app.root.findByTag("Rigidbody")
}
,
PhysicsManager.prototype.setLookPosition = function(i) {
    this.lookPosition.x = i.x,
    this.lookPosition.z = i.z
}
,
PhysicsManager.prototype.setPosition = function(i) {
    this.currentPosition.x = Utils.decodeFloat(i.position.x),
    this.currentPosition.y = Utils.decodeFloat(i.position.y),
    this.currentPosition.z = Utils.decodeFloat(i.position.z)
}
,
PhysicsManager.prototype.disableAllPhysics = function() {
    for (var i = this.rigidbodies.length; i--; ) {
        var t = this.rigidbodies[i];
        t && t.rigidbody && t.enabled && (t.collision.enabled = !1,
        t.rigidbody.enabled = !1)
    }
}
,
PhysicsManager.prototype.forceTrigger = function() {
    this.lastRigidUpdate = 1e3,
    this.checkRigidbodiesV2()
}
,
PhysicsManager.prototype.checkRigidbodiesV2 = function() {
    if (Date.now() - this.lastRigidUpdate < 250)
        return !1;
    var i = this.rigidbodies.length
      , t = this.currentPosition
      , s = this.lookEntity.getPosition()
      , o = 0;
    for (this.lookADSEntity.enabled && (s = this.lookADSEntity.getPosition()); i--; ) {
        var e = this.rigidbodies[i];
        if (e && e.rigidbody && e.enabled) {
            var n = e.getPosition()
              , d = t.clone().sub(n).length()
              , a = s.clone().sub(n).length()
              , r = 5;
            e && e.model && e.model.meshInstances && e.model.meshInstances.length > 0 && (r = e.model.meshInstances[0].aabb._radius),
            (d < (r += this.threshold) || a < r) && this.maxBodies > o ? (e.rigidbody.enabled = !0,
            e.collision.enabled = !0,
            o++) : d < r && (e.tags.list().indexOf("Batch") > -1 || "Stairway" == e.name || "Body" == e.name) ? (e.rigidbody.enabled = !0,
            e.collision.enabled = !0) : (e.rigidbody.enabled = !1,
            e.collision.enabled = !1)
        }
    }
    this.lastRigidUpdate = Date.now()
}
,
PhysicsManager.prototype.checkRigidbodies = function() {
    if (Date.now() - this.lastRigidUpdate < 100)
        return !1;
    if (!this.rigidbodies)
        return !1;
    var i = this.rigidbodies.length
      , t = this.currentPosition
      , s = [];
    for (this.lookADSEntity.enabled ? (this.lookPosition = this.lookADSEntity.getPosition().clone(),
    this.radius = 10) : (this.lookPosition = this.lookEntity.getPosition().clone(),
    this.radius = 5); i--; ) {
        var o = this.rigidbodies[i].getPosition().clone()
          , e = Utils.distance(o.x, o.z, t.x, t.z)
          , n = Utils.distance(o.x, o.z, this.lookPosition.x, this.lookPosition.z);
        this.rigidbodies[i].rigidbody && (n < 5 ? (this.rigidbodies[i].rigidbody.enabled = !0,
        this.rigidbodies[i].collision.enabled = !0) : (this.rigidbodies[i].tags.list().indexOf("Batch") > -1 && (e -= 10),
        s.push({
            body: this.rigidbodies[i],
            distance: e,
            distanceLook: n
        })))
    }
    s.sort(function(i, t) {
        return i.distance - t.distance
    }),
    disabledBodies = s.slice(this.maxBodies, s.length);
    for (var d = (s = s.slice(0, this.maxBodies)).length; d--; ) {
        var a = s[d];
        a && a.distance < 20 && (a.body.rigidbody.enabled = !0,
        a.body.collision.enabled = !0)
    }
    for (var r = disabledBodies.length; r--; ) {
        var h = disabledBodies[r];
        h && (h.body.rigidbody.enabled = !1,
        h.body.collision.enabled = !1)
    }
    this.lastRigidUpdate = Date.now(),
    Date.now() - this.lastDistanceUpdate >= 100 && (this.lastDistanceUpdate = Date.now())
}
,
PhysicsManager.prototype.update = function(i) {
    this.checkRigidbodiesV2()
}
;
var Service = {
    baseURL: "https://gatewayconnect.miniroyale2.io",
    authURL: "https://gatewayconnect.miniroyale2.io",
    generalURL: "https://general-stats.miniroyale2.io",
    post: function(e, t, n, o) {
        var a = Service.baseURL + "?request=" + e;
        o && (a = o + "?request=" + e);
        var i = "string" == typeof t ? t : Object.keys(t).map(function(e) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(t[e])
        }).join("&")
          , r = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
        return r.open("POST", a),
        r.onreadystatechange = function() {
            r.readyState > 3 && 200 == r.status && n(JSON.parse(r.responseText))
        }
        ,
        Utils.isMobile() || (r.withCredentials = !0),
        r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        r.send(i),
        r
    },
    set: function(e, t) {
        e = "miniroyale2_" + e,
        window.localStorage.setItem(e, JSON.stringify(t))
    },
    get: function(e) {
        e = "miniroyale2_" + e;
        var t = window.localStorage.getItem(e);
        return !!e && JSON.parse(t)
    }
};
var Scrollbar = pc.createScript("scrollbar");
Scrollbar.prototype.initialize = function() {
    this.entity.element.on(pc.EVENT_MOUSEWHEEL, this.onWheel.bind(this), this)
}
,
Scrollbar.prototype.onWheel = function(e) {
    return e.event.preventDefault(),
    this.entity.scrollview.scroll.y += .1 * e.wheel,
    !1
}
;
var Outline = pc.createScript("outline");
Outline.attributes.add("activeEntity", {
    type: "entity"
}),
Outline.attributes.add("edgeSize", {
    type: "number",
    default: 1
}),
Outline.attributes.add("edgeColor", {
    type: "rgba",
    default: [0, 0, 0, 1]
}),
Outline.prototype.initialize = function() {
    this.currentEntity = !1,
    this.color = this.edgeColor.data,
    this.edgeToonShader = "uniform vec4 edgeColor;",
    this.edgeToonShader += "void main() {",
    this.edgeToonShader += "gl_FragColor = edgeColor;",
    this.edgeToonShader += "}",
    this.transformShader = "uniform float edgeSize;",
    this.transformShader += "mat4 getModelMatrix() {",
    this.transformShader += "return matrix_model;",
    this.transformShader += "}",
    this.transformShader += "vec4 getPosition() {",
    this.transformShader += "dModelMatrix = getModelMatrix();",
    this.transformShader += "vec4 posW = dModelMatrix * vec4(vertex_position, 1.0);",
    this.transformShader += "vec3 normal = normalize(matrix_normal * vertex_normal);",
    this.transformShader += "posW.xyz += (normal / 100.0) * edgeSize;",
    this.transformShader += "dPositionW = posW.xyz;",
    this.transformShader += "return matrix_viewProjection * posW;",
    this.transformShader += "}",
    this.transformShader += "vec3 getWorldPosition() {",
    this.transformShader += "return dPositionW;",
    this.transformShader += "}"
}
,
Outline.prototype.clearShader = function(e) {
    e && e.model && e.model.model && e.model.model.meshInstances && e.model.model.loaded && (this.app.scene.removeModel(e.model.model),
    e.model.model.meshInstances = e.originalMeshInstances,
    this.app.scene.addModel(e.model.model))
}
,
Outline.prototype.setShader = function(e) {
    if (e && e.model && e.model.model && e.model.model.meshInstances) {
        var t = e.model.model.meshInstances
          , o = []
          , r = e.model.model.meshInstances;
        e.originalMeshInstances = r;
        for (var a = 0; a < t.length; a++) {
            var d = t[a]
              , i = d.material.clone();
            i.chunks.transformVS = this.transformShader,
            i.customFragmentShader = this.edgeToonShader,
            i.cull = pc.CULLFACE_FRONT,
            i.update();
            var s = new pc.MeshInstance(d.node,d.mesh,i);
            s.castShadow = !1,
            s.receiveShadow = !1,
            s.skinInstance = d.skinInstance,
            s.setParameter("edgeSize", this.edgeSize),
            s.setParameter("edgeColor", this.color),
            s.drawOrder = 0,
            s.updateKey(),
            o.push(s)
        }
        this.app.scene.removeModel(e.model.model),
        e.model.model.meshInstances = t.concat(o),
        this.app.scene.addModel(e.model.model),
        e.model.model.loaded = !0
    }
}
,
Outline.prototype.update = function(e) {
    this.currentEntity != this.activeEntity && (this.clearShader(this.currentEntity),
    this.setShader(this.activeEntity),
    this.currentEntity = this.activeEntity)
}
;
var Environment = pc.createScript("environment");
Environment.attributes.add("playerEntity", {
    type: "entity"
}),
Environment.attributes.add("playerCamera", {
    type: "entity"
}),
Environment.attributes.add("parachutePlayerEntity", {
    type: "entity"
}),
Environment.attributes.add("domeEntity", {
    type: "entity"
}),
Environment.attributes.add("cloudsEntity", {
    type: "entity"
}),
Environment.attributes.add("lightEntity", {
    type: "entity"
}),
Environment.attributes.add("limitEntity", {
    type: "entity"
}),
Environment.attributes.add("limitMaterial", {
    type: "asset",
    assetType: "material"
}),
Environment.attributes.add("mapLimit", {
    type: "number"
}),
Environment.attributes.add("birdsEntity", {
    type: "entity"
}),
Environment.attributes.add("smokeCircle", {
    type: "entity"
}),
Environment.attributes.add("radiusEntities", {
    type: "entity",
    array: !0
}),
Environment.attributes.add("sunLight", {
    type: "entity"
}),
Environment.attributes.add("nukesEntity", {
    type: "entity"
}),
Environment.attributes.add("lightIntensity", {
    type: "number"
}),
Environment.attributes.add("currentCircleScale", {
    type: "number",
    default: 2
}),
Environment.attributes.add("limitFactor", {
    type: "number",
    default: 75
}),
Environment.prototype.initialize = function() {
    this.lastShadowUpdate = Date.now(),
    this.nextFrameAffect = !0,
    this.circleStarted = !1,
    this.bombFelt = !1,
    void 0 !== pc.network ? (this.selectedRadiusEntity = this.radiusEntities[pc.network.radiusId],
    this.radiusEntities[pc.network.radiusId] || (this.selectedRadiusEntity = this.radiusEntities[0])) : this.selectedRadiusEntity = this.radiusEntities[0],
    this.currentCirclePosition = new pc.Vec3(0,0,0),
    this.lastBirdSound = Date.now(),
    this.lastHurtTime = Date.now(),
    this.app.on("Event:Circle", this.startCircleEvent.bind(this), this),
    this.app.on("Server:Tick", this.setTick.bind(this), this)
}
,
Environment.prototype.setTick = function(t) {
    this.currentCircleScale = 2 - t / 250
}
,
Environment.prototype.startCircleEvent = function(t) {
    this.circleStarted || (this.entity.sound.play("Siren"),
    setTimeout(function(t) {
        t.dropBomb()
    }, 1e4, this),
    this.birdsEntity.enabled = !1,
    this.smokeCircle.enabled = !0,
    this.nukesEntity.enabled = !0,
    this.circleStarted = !0)
}
,
Environment.prototype.dropBomb = function() {
    setTimeout(function(t) {
        t.nukesEntity.enabled = !1,
        t.sunLight.light.intensity = 30,
        t.bombFelt = !0,
        t.app.fire("Player:Shake", !0)
    }, 3e3, this),
    this.entity.sound.play("Bomb")
}
,
Environment.prototype.update = function(t) {
    var i = this.playerCamera.getPosition().clone();
    this.parachutePlayerEntity.enabled && (i = this.parachutePlayerEntity.getPosition().clone());
    var e = new pc.Vec3(i.x,0,i.z)
      , n = i.sub(Utils.zeroVector.clone()).length();
    if (this.domeEntity.setPosition(e),
    this.cloudsEntity.rotateLocal(0, .005, 0),
    Date.now() - this.lastBirdSound > 42e3 && !this.bombFelt && (this.entity.sound.play("Seagull"),
    this.lastBirdSound = Date.now()),
    Date.now() - this.lastShadowUpdate > 2500 && (this.lightEntity.light.shadowUpdateMode = pc.SHADOWUPDATE_REALTIME,
    this.lastShadowUpdate = Date.now(),
    this.nextFrameAffect = !0),
    this.nextFrameAffect && (this.lightEntity.light.shadowUpdateMode = pc.SHADOWUPDATE_THISFRAME,
    this.nextFrameAffect = !1),
    n > this.mapLimit - 30) {
        var s = Math.max((n - this.mapLimit) / 30, .1);
        this.limitEntity.enabled = !0,
        this.entity.sound.slots.Buzz.isPlaying || (this.entity.sound.slots.Buzz.volume = s,
        this.entity.sound.play("Buzz")),
        this.limitMaterial.resource.opacity = s,
        this.limitMaterial.resource.update(),
        (n - this.mapLimit) / 30 > .5 && this.playerEntity.enabled && this.playerEntity.script && !this.playerEntity.script.movement.onParachute && Date.now() - this.lastHurtTime > 1e3 && (this.app.fire("Player:Hurt", !0),
        this.lastHurtTime = Date.now())
    } else
        this.limitEntity.enabled && (this.limitEntity.enabled = !1,
        this.entity.sound.stop("Buzz"));
    if (this.selectedRadiusEntity && "battle-royale" == pc.currentMode) {
        var a = this.currentCircleScale
          , r = i.sub(this.selectedRadiusEntity.getPosition().clone()).length();
        if (this.bombFelt) {
            var o = this.smokeCircle.getLocalPosition().clone()
              , l = this.selectedRadiusEntity.getPosition().clone();
            this.currentCirclePosition = this.currentCirclePosition.lerp(o, l, .01),
            this.smokeCircle.setLocalPosition(this.currentCirclePosition),
            this.smokeCircle.setLocalScale(this.currentCircleScale, 1, this.currentCircleScale),
            this.sunLight.light.intensity = pc.math.lerp(this.sunLight.light.intensity, this.lightIntensity, .1),
            r > a * this.limitFactor && Date.now() - this.lastHurtTime > 500 && (this.app.fire("Player:Cough", !0),
            this.app.fire("Player:Hurt", !0),
            this.lastHurtTime = Date.now())
        }
        this.bombFelt || this.app.fire("Player:Warn", "evacuate", r > a - 25)
    }
}
;
var Leaderboard = pc.createScript("leaderboard");
Leaderboard.attributes.add("rowEntity", {
    type: "entity"
}),
Leaderboard.attributes.add("contentEntity", {
    type: "entity"
}),
Leaderboard.attributes.add("sort", {
    type: "string"
}),
Leaderboard.prototype.initialize = function() {
    var e = this;
    Service.post("leaderboard", {
        sort: this.sort
    }, function(t) {
        t.success ? e.updateRows(t.entries) : alert("An error occured!")
    }),
    this.rowEntity.enabled = !1
}
,
Leaderboard.prototype.updateRows = function(e) {
    for (var t = this.contentEntity.children.length; t--; )
        this.contentEntity.children[t].enabled && this.contentEntity.children[t].destroy();
    for (var i in e) {
        var n = e[i]
          , r = this.rowEntity.findByName("Username");
        r.element.text = n.username,
        r.findByName("Verified").enabled = "1" == n.verified,
        "1" == n.verified ? r.setLocalPosition(new pc.Vec3(110,0,0)) : r.setLocalPosition(new pc.Vec3(75,0,0)),
        this.rowEntity.findByName("Rank").element.text = parseInt(i) + 1 + ".",
        n.active_skin ? this.rowEntity.findByName("ProfilePicture").element.textureAsset = this.app.assets.find(n.active_skin + "-CharacterThumbnail") : this.rowEntity.findByName("ProfilePicture").element.textureAsset = this.app.assets.find("Biker-CharacterThumbnail"),
        this.rowEntity.findByName("Experience") && (this.rowEntity.findByName("Experience").element.text = n.experience),
        this.rowEntity.findByName("KDR") && n.kdr && (this.rowEntity.findByName("KDR").element.text = n.kdr),
        this.rowEntity.findByName("Kills").element.text = n.kills,
        this.rowEntity.findByName("Deaths").element.text = n.deaths;
        var a = this.rowEntity.clone();
        a.enabled = !0,
        a.setLocalPosition(0, -33 * i, 0),
        this.contentEntity.addChild(a)
    }
}
;
var Fps = pc.createScript("fps");
Fps.attributes.add("displayElement", {
    type: "entity"
}),
Fps.prototype.initialize = function() {
    this.startTime = performance.now(),
    this.lastUpdate = Date.now()
}
,
Fps.prototype.postUpdate = function(t) {
    this.startTime = performance.now()
}
,
Fps.prototype.update = function(t) {
    var e = (performance.now() - this.startTime) / 1e3
      , a = Math.floor(1 / e);
    Date.now() - this.lastUpdate > 500 && (this.displayElement.element.text = a + "",
    this.lastUpdate = Date.now())
}
;
var Ping = pc.createScript("ping");
Ping.attributes.add("signal", {
    type: "entity",
    array: !0
}),
Ping.attributes.add("location", {
    type: "entity"
}),
Ping.prototype.initialize = function() {
    this.location.element.text = "EU",
    this.getCountry(),
    this.testPing(),
    pc.country = "EU",
    this.app.on("Server:Update", this.onUpdate, this)
}
,
Ping.prototype.onUpdate = function() {
    this.getCountry(),
    this.testPing()
}
,
Ping.prototype.setSignalLevel = function(t) {
    t <= 1 ? (this.signal[0].enabled = !0,
    this.signal[1].enabled = !1,
    this.signal[2].enabled = !1) : t <= 2 ? (this.signal[0].enabled = !0,
    this.signal[1].enabled = !0,
    this.signal[2].enabled = !1) : t <= 3 && (this.signal[0].enabled = !0,
    this.signal[1].enabled = !0,
    this.signal[2].enabled = !0)
}
,
Ping.prototype.setCountry = function(t) {
    t && (this.location.element.text = t,
    pc.country = t)
}
,
Ping.prototype.getCountry = function() {
    this.setCountry(pc.country)
}
,
Ping.prototype.testPing = function() {
    Date.now();
    this.setSignalLevel(pc.signalLevel)
}
;
var StateManager = pc.createScript("stateManager");
StateManager.attributes.add("glassEntity", {
    type: "entity"
}),
StateManager.attributes.add("shootManager", {
    type: "entity"
}),
StateManager.prototype.initialize = function() {
    this.app.on("State:Trigger", this.onStateChange.bind(this), this),
    this.app.on("State:Sound", this.onSound.bind(this), this)
}
,
StateManager.prototype.onSound = function() {
    this.entity.sound.positional = !0
}
,
StateManager.prototype.onStateChange = function(t, e) {
    var a = this.app.root.findByGuid(t);
    a && a.enabled && ("Glass" == a.name && this.setGlassState(a),
    "Door" == a.name && this.setDoorState(a, e),
    "Drone" == a.name && this.setDroneState(a))
}
,
StateManager.prototype.setDroneState = function(t) {
    this.shootManager.script.shoot.createExplosion(t.getPosition().clone()),
    t.sound.stop("Plane"),
    t.sound.stop("Plane_2"),
    t.destroy()
}
,
StateManager.prototype.setGlassState = function(t) {
    this.playSound("GlassBreak", t),
    this.glassEntity.setPosition(t.getPosition().clone()),
    this.glassEntity.particlesystem.reset(),
    this.glassEntity.particlesystem.play(),
    t.destroy()
}
,
StateManager.prototype.setDoorState = function(t, e) {
    void 0 === t.state && (t.state = !1),
    t.state = !t.state;
    var a = t.getEulerAngles().clone();
    t.defaultAngle || (t.defaultAngle = a),
    !0 === t.state ? (this.playSound("DoorOpen", t),
    t.tween(t.getEulerAngles()).rotate({
        x: a.x,
        y: a.y + 85,
        z: a.z
    }, .5, pc.CircularOut).start()) : !1 === t.state && (this.playSound("DoorClose", t),
    t.tween(t.getEulerAngles()).rotate({
        x: t.defaultAngle.x,
        y: t.defaultAngle.y,
        z: t.defaultAngle.z
    }, .5, pc.CircularOut).start())
}
,
StateManager.prototype.playSound = function(t, e) {
    this.entity.setPosition(e.getPosition().clone()),
    this.entity.sound.play(t)
}
;
var Helicopter = pc.createScript("helicopter");
Helicopter.attributes.add("helicopterEntity", {
    type: "entity"
}),
Helicopter.attributes.add("cameraEntity", {
    type: "entity"
}),
Helicopter.attributes.add("pinHolder", {
    type: "entity"
}),
Helicopter.attributes.add("deployPosition", {
    type: "entity"
}),
Helicopter.attributes.add("deployLoading", {
    type: "entity"
}),
Helicopter.attributes.add("deployHover", {
    type: "entity"
}),
Helicopter.attributes.add("deploySelectedEntity", {
    type: "entity"
}),
Helicopter.attributes.add("optimizingElement", {
    type: "entity"
}),
Helicopter.attributes.add("reconnectingElement", {
    type: "entity"
}),
Helicopter.attributes.add("enemyLocation", {
    type: "entity"
}),
Helicopter.attributes.add("readyPlayersText", {
    type: "entity"
}),
Helicopter.attributes.add("loadingEntity", {
    type: "entity"
}),
Helicopter.attributes.add("notificationElement", {
    type: "entity"
}),
Helicopter.attributes.add("notificationKillMessage", {
    type: "entity"
}),
Helicopter.attributes.add("notificationUserMessage", {
    type: "entity"
}),
Helicopter.attributes.add("notificationLimit", {
    type: "number"
}),
Helicopter.attributes.add("notificationFadeOutTime", {
    type: "number"
}),
Helicopter.attributes.add("titleBackgroundEntity", {
    type: "entity"
}),
Helicopter.attributes.add("titleEntity", {
    type: "entity"
}),
Helicopter.attributes.add("timeEntity", {
    type: "entity"
}),
Helicopter.attributes.add("transitionEntity", {
    type: "entity"
}),
Helicopter.attributes.add("parachuteScene", {
    type: "entity"
}),
Helicopter.attributes.add("parachutePlayerEntity", {
    type: "entity"
}),
Helicopter.attributes.add("aliveTextElement", {
    type: "entity"
}),
Helicopter.attributes.add("readyColor", {
    type: "rgb"
}),
Helicopter.attributes.add("positionEntities", {
    type: "entity",
    array: !0
}),
Helicopter.attributes.add("bannerEntities", {
    type: "entity",
    array: !0
}),
Helicopter.attributes.add("itemManagerEntity", {
    type: "entity"
}),
Helicopter.attributes.add("perkButtons", {
    type: "entity",
    array: !0
}),
Helicopter.attributes.add("perkBackgrounds", {
    type: "entity",
    array: !0
}),
Helicopter.attributes.add("playerListHolder", {
    type: "entity"
}),
Helicopter.attributes.add("playerListRow", {
    type: "entity"
}),
Helicopter.attributes.add("timerBar", {
    type: "entity"
}),
Helicopter.attributes.add("offsetY", {
    type: "number"
}),
Helicopter.attributes.add("maxTime", {
    type: "number"
}),
Helicopter.prototype.initialize = function() {
    this.timestamp = 0,
    this.tick = 0,
    this.notificationIndex = 0,
    this.notificationStayTime = 1,
    this.posX = 0,
    this.posZ = 0,
    this.deploySelected = !1,
    this.selectionCompleted = !1,
    this.readyPlayers = 0,
    this.players = [],
    this.playerCount = 0;
    var t = this.positionEntities[Math.floor(Math.random() * (this.positionEntities.length - 1))];
    this.entity.setPosition(t.getPosition().clone()),
    this.entity.setLocalEulerAngles(t.getLocalEulerAngles().clone()),
    this.topRotor = this.helicopterEntity.findByName("Top_Rotor"),
    this.backRotor = this.helicopterEntity.findByName("Back_Rotor"),
    this.app.on("Enemy:Deploy", this.setEnemyDeployPosition.bind(this), this),
    this.app.on("Enemy:Create", this.setJoinedPlayer.bind(this), this),
    this.app.on("Deploy:Cancel", this.deployCancel.bind(this), this),
    this.app.on("Server:Tick", this.setTick.bind(this), this),
    this.app.on("Server:Reconnect", this.showReconnecting.bind(this)),
    this.app.on("Event:Optimize", this.hideOptimizing.bind(this), this),
    this.pinHolder.element.on("mousemove", this.setPinPosition.bind(this), this),
    this.pinHolder.element.on("mousedown", this.selectPosition.bind(this), this),
    void 0 !== pc.denyAds && !0 === pc.denyAds && this.disableBanners(),
    this.checkMusicSettings(),
    void 0 !== pc.username ? this.addPlayer(pc.username) : this.addPlayer("Guest"),
    this.itemManager = this.itemManagerEntity.script.itemSpawn
}
,
Helicopter.prototype.checkMusicSettings = function() {
    "true" === window.localStorage.getItem("MuteMusic") ? this.entity.sound.stop("Music") : this.entity.sound.play("Music")
}
,
Helicopter.prototype.disableBanners = function() {
    for (var t = this.bannerEntities.length; t--; )
        this.bannerEntities[t] && this.bannerEntities[t].destroy()
}
,
Helicopter.prototype.selectPerk = function(t, e) {
    pc.perkItem = this.itemManager.getWeaponDetails(t);
    for (var i = this.perkButtons.length; i--; )
        this.perkButtons[i] && this.perkButtons[i].destroy();
    this.perkBackgrounds[e] && (this.perkBackgrounds[e].element.color = new pc.Color(1,244 / 255,0))
}
,
Helicopter.prototype.showReconnecting = function() {
    this.reconnectingElement.enabled = !0,
    setTimeout(function(t) {
        t.reconnectingElement.enabled = !1
    }, 2e3, this)
}
,
Helicopter.prototype.hideOptimizing = function() {
    this.optimizingElement.enabled = !1
}
,
Helicopter.prototype.setTick = function(t) {
    var e = this.maxTime - t;
    e = Math.max(e, 0),
    this.tick = e,
    t >= this.maxTime - 5 && (this.loadingEntity.enabled = !1,
    this.titleEntity.element.text = "Get ready!",
    this.titleBackgroundEntity.element.color = this.readyColor,
    this.entity.sound.play("Count")),
    t >= this.maxTime - 1 && !this.transitionEntity.enabled ? (this.transitionEntity.enabled = !0,
    this.entity.sound.stop("Helicopter"),
    this.entity.sound.stop("Helicopter-Rator")) : t >= this.maxTime ? (this.entity.enabled = !1,
    this.bannerEntities.length > 0 && this.bannerEntities[0] && this.bannerEntities[0].destroy(),
    this.parachuteScene.enabled = !0) : this.timeEntity.element.text = e + "";
    var i = Math.min(1, t / 20);
    this.timerBar.tween(this.timerBar.getLocalScale()).to({
        x: i,
        y: 1,
        z: 1
    }, 1, pc.Linear).start()
}
,
Helicopter.prototype.deployCancel = function() {
    this.selectionCompleted || (this.deployHover.enabled = !0,
    this.deployLoading.enabled = !1,
    this.deploySelectedEntity.enabled = !1,
    this.deploySelected = !1,
    this.titleEntity.element.text = "Please select another location!",
    this.entity.sound.play("Error"))
}
,
Helicopter.prototype.detectPositionFromEvent = function(t) {
    var e = this.pinHolder.element.width
      , i = this.pinHolder.element.height
      , n = e / (this.pinHolder.element.screenCorners[2].x - this.pinHolder.element.screenCorners[0].x)
      , o = i / (this.pinHolder.element.screenCorners[2].y - this.pinHolder.element.screenCorners[0].y)
      , s = this.pinHolder.element.screenCorners[0].x
      , a = this.pinHolder.element.screenCorners[0].y;
    this.pinHolder.getLocalPosition().clone();
    this.posX = 30 * Math.round((t.x - s) * n / 30),
    this.posZ = 30 * Math.round((t.y - a) * o / 30)
}
,
Helicopter.prototype.selectPosition = function(t) {
    if (this.tick < 6)
        return !1;
    this.deploySelected || (this.detectPositionFromEvent(t),
    this.deploySelected = !0,
    this.deployLoading.enabled = !0,
    this.entity.sound.play("Click"),
    this.app.fire("Deploy:Position", this.posX, this.posZ))
}
,
Helicopter.prototype.setPinPosition = function(t) {
    if (this.tick < 6)
        return !1;
    this.deploySelected || this.selectionCompleted || (this.detectPositionFromEvent(t),
    this.deployPosition.setLocalPosition(this.posX, -this.posZ + this.offsetY, 0))
}
,
Helicopter.prototype.addUserMessage = function(t, e, i) {
    if (!t || !e)
        return !1;
    var n = this.notificationUserMessage.clone();
    if (n.username = n.findByName("Username"),
    n.text = n.findByName("Text"),
    n.background = n.findByName("Background"),
    n.profileImage = n.findByName("ProfileImage"),
    t && n.username && (n.username.element.text = t),
    i) {
        var o = this.app.assets.find(i + "-CharacterThumbnail");
        o && (n.profileImage.element.textureAsset = o)
    }
    n.text.element.text = e,
    n.enabled = !0,
    n.tween(n.username.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    n.tween(n.text.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    n.tween(n.background.element).delay(this.notificationFadeOutTime).to({
        opacity: 0
    }, this.notificationStayTime, pc.QuarticOut).start(),
    this.notificationElement.addChild(n),
    this.notificationIndex++,
    this.updateNotifications(),
    this.entity.sound.play("Join")
}
,
Helicopter.prototype.updateNotifications = function() {
    for (var t = this.notificationElement.children.length; t--; ) {
        var e = this.notificationElement.children[t];
        e && e.enabled && e.tween(e.getLocalPosition()).to({
            x: 0,
            y: 40 * (this.notificationIndex - t),
            z: 0
        }, .5, pc.QuarticOut).start()
    }
    this.notificationIndex > this.notificationLimit && (this.notificationElement.children[2].destroy(),
    this.notificationIndex--)
}
,
Helicopter.prototype.setJoinedPlayer = function(t, e, i, n, o) {
    !1 !== n && this.setEnemyDeployPosition(t, -1, n[0], n[1]),
    this.addUserMessage(e, "joined to session!", o),
    this.addPlayer(e)
}
,
Helicopter.prototype.addPlayer = function(t) {
    if (this.playerCount >= 10)
        return !1;
    var e = this.playerListRow.clone();
    e.setLocalPosition(0, 25 * -this.playerCount, 0),
    e.enabled = !0,
    t && (e.findByName("Username").element.text = t + ""),
    this.playerListHolder.addChild(e),
    this.playerCount++
}
,
Helicopter.prototype.setEnemyDeployPosition = function(t, e, i, n) {
    if (t == e) {
        this.entity.sound.play("Selected"),
        this.deployHover.enabled = !1,
        this.deployLoading.enabled = !1,
        this.deploySelectedEntity.enabled = !0,
        this.selectionCompleted = !0,
        this.titleEntity.element.text = "Waiting for other players...",
        this.deployPosition.setLocalPosition(i, -n + this.offsetY, 0);
        var o = (i + 1) / 350 * 80
          , s = (n + 1) / 350 * 80;
        this.parachutePlayerEntity.setLocalPosition(o, 130, s)
    } else {
        var a = this.enemyLocation.clone();
        a.setLocalPosition(i, -n + this.offsetY, 0),
        a.enabled = !0,
        this.pinHolder.addChild(a),
        this.entity.sound.play("Click")
    }
    -1 == this.players.indexOf(t) && (this.players.push(t),
    this.readyPlayers++,
    this.readyPlayersText.element.text = 'Ready : [color="#40CD11"]' + this.readyPlayers + "/10[/color]",
    this.aliveTextElement.element.text = this.readyPlayers)
}
,
Helicopter.prototype.update = function(t) {
    this.entity.sound.slots.Helicopter.isPlaying || this.entity.sound.play("Helicopter"),
    this.entity.sound.slots["Helicopter-Rator"].isPlaying || this.entity.sound.play("Helicopter-Rator");
    var e = Math.cos(this.timestamp / 30) * Math.cos(this.timestamp / 30)
      , i = 2 * Math.cos(this.timestamp / 50)
      , n = Math.sin(this.timestamp / 50)
      , o = Math.cos(this.timestamp / 220) * Math.cos(this.timestamp / 220) * 1;
    this.helicopterEntity.setLocalEulerAngles(e, i, n),
    this.cameraEntity.setLocalEulerAngles(o, 0, 0),
    this.entity.translateLocal(-.02, 0, -.02),
    this.topRotor.rotateLocal(0, 40.1, 0),
    this.backRotor.rotateLocal(50, 0, 0),
    this.timestamp++
}
;
var Tablet = pc.createScript("tablet");
Tablet.attributes.add("screenMaterial", {
    type: "asset",
    assetType: "material"
}),
Tablet.attributes.add("cameraEntity", {
    type: "entity"
}),
Tablet.attributes.add("layerName", {
    type: "string"
}),
Tablet.prototype.initialize = function() {
    this.texture = new pc.Texture(this.app.graphicsDevice,{
        width: 256,
        height: 256,
        format: pc.PIXELFORMAT_R8_G8_B8,
        autoMipmap: !0
    }),
    this.texture.minFilter = pc.FILTER_LINEAR,
    this.texture.magFilter = pc.FILTER_LINEAR;
    var e = new pc.RenderTarget(this.app.graphicsDevice,this.texture,{
        depth: !1
    })
      , t = this.app.scene.layers.getLayerByName(this.layerName);
    t.renderTarget = e;
    var a = this.screenMaterial.resource;
    a.diffuseMap = t.renderTarget.colorBuffer,
    a.update()
}
,
Tablet.prototype.update = function(e) {}
;
var Drone = pc.createScript("drone");
Drone.attributes.add("caseEntity", {
    type: "entity"
}),
Drone.attributes.add("caseBaseEntity", {
    type: "entity"
}),
Drone.prototype.initialize = function() {
    this.timestamp = 0,
    this.forceX = 0,
    this.forceZ = 0,
    this.caseAngleX = 0,
    this.caseAngleY = 0,
    this.caseAngleZ = 0,
    this.nextForceX = 0,
    this.nextForceZ = 0,
    this.propeller_1 = this.entity.findByName("Quad [Propeller] (1)"),
    this.propeller_2 = this.entity.findByName("Quad [Propeller] (2)"),
    this.propeller_3 = this.entity.findByName("Quad [Propeller] (3)"),
    this.propeller_4 = this.entity.findByName("Quad [Propeller] (4)"),
    this.propeller_1.setLocalEulerAngles(-270, 0, 0),
    this.propeller_2.setLocalEulerAngles(-270, 0, 0),
    this.propeller_3.setLocalEulerAngles(-270, 0, 0),
    this.propeller_4.setLocalEulerAngles(-270, 0, 0);
    var t = new pc.Vec3(0,0,-5);
    this.propeller_1.translateLocal(t),
    this.propeller_2.translateLocal(t),
    this.propeller_3.translateLocal(t),
    this.propeller_4.translateLocal(t)
}
,
Drone.prototype.applyForce = function() {
    this.nextForceX += 30 * Math.random() - 30 * Math.random(),
    this.nextForceZ += 30 * Math.random() - 30 * Math.random(),
    this.entity.sound.pitch = 2
}
,
Drone.prototype.update = function(t) {
    var e = 5 * Math.cos(this.timestamp / 20) + this.forceX
      , s = 5 * Math.sin(this.timestamp / 10) + this.forceZ
      , i = Math.cos(this.timestamp / 200) * Math.sin(this.timestamp / 200) * .8 + .1 * this.forceX
      , l = Math.cos(this.timestamp / 50) * Math.sin(this.timestamp / 50) * .2
      , a = Math.cos(this.timestamp / 20) * this.forceZ * .05;
    this.caseAngleX = pc.math.lerpAngle(this.caseAngleX, e, .3),
    this.caseAngleY = pc.math.lerpAngle(this.caseAngleY, 5 * i, .3),
    this.caseAngleZ = pc.math.lerpAngle(this.caseAngleZ, s, .3),
    this.entity.setLocalEulerAngles(e, 5 * i, s),
    this.entity.setLocalPosition(i, l + a, a),
    this.caseBaseEntity && (this.caseBaseEntity.setLocalEulerAngles(this.caseAngleX - e, i + this.caseAngleY - 5 * i, this.caseAngleZ + a - s),
    this.caseEntity.setLocalEulerAngles(this.caseAngleX, this.caseAngleY, this.caseAngleZ)),
    this.propeller_1.rotateLocal(0, 0, 50),
    this.propeller_2.rotateLocal(0, 0, 50),
    this.propeller_3.rotateLocal(0, 0, 50),
    this.propeller_4.rotateLocal(0, 0, 50),
    this.nextForceX = pc.math.lerp(this.nextForceX, 0, .01),
    this.nextForceZ = pc.math.lerp(this.nextForceZ, 0, .01),
    this.forceX = pc.math.lerp(this.forceX, this.nextForceX, .1),
    this.forceZ = pc.math.lerp(this.forceZ, this.nextForceZ, .1),
    this.entity.sound && (this.entity.sound.pitch = pc.math.lerp(this.entity.sound.pitch, 1, .01)),
    this.entity.sound && (this.entity.sound.slots.Plane.isPlaying || this.entity.sound.play("Plane"),
    this.entity.sound.slots.Plane_2.isPlaying || this.entity.sound.play("Plane_2")),
    this.timestamp += 60 * t
}
;
var BatchManager = pc.createScript("batchManager");
BatchManager.attributes.add("ambientManager", {
    type: "entity"
}),
BatchManager.attributes.add("mapEntities", {
    type: "entity",
    array: !0
}),
BatchManager.attributes.add("maxSize", {
    type: "number"
}),
BatchManager.attributes.add("maxGrid", {
    type: "number"
}),
BatchManager.attributes.add("processTime", {
    type: "number"
}),
BatchManager.attributes.add("dynamicWorld", {
    type: "entity"
}),
BatchManager.attributes.add("doorBatchGroupId", {
    type: "number"
}),
BatchManager.prototype.initialize = function() {
    this.mapEntity = this.mapEntities[this.ambientManager.script.ambient.currentIndex];
    var t = this.mapEntity.children;
    this.entities = t,
    this.count = 0,
    this.timestamp = 0
}
,
BatchManager.prototype.optimize = function() {
    this.app.fire("Physics:Update", !0),
    this.setCustomBatch();
    for (var t = -this.maxGrid; t < this.maxGrid; t++)
        for (var e = -this.maxGrid; e < this.maxGrid; e++)
            this.setPositionBatch(t, e)
}
,
BatchManager.prototype.setCustomBatch = function() {
    var t = this.app.root.findByTag("interactive");
    for (var e in t) {
        var a = t[e];
        if ("Glass" == a.name)
            a.tags.add("Batch");
        else if ("Door" == a.name) {
            a.findByName("Model").tags.add("Batch")
        }
    }
}
,
BatchManager.prototype.setPositionBatch = function(t, e) {
    for (var a = this.entities.length, i = new pc.Vec3(t * this.maxSize,0,e * this.maxSize), s = []; a--; ) {
        var r = this.entities[a].getPosition().clone()
          , n = i.clone().sub(r).length()
          , h = this.entities[a].children;
        for (var c in h) {
            var p = h[c];
            if (p.tags.list().indexOf("interactive") > -1) {
                var o = p.getPosition().clone()
                  , d = p.getEulerAngles().clone();
                p.reparent(this.dynamicWorld),
                p.setPosition(o),
                p.setEulerAngles(d)
            }
        }
        n <= this.maxSize && this.entities[a].tags.list().indexOf("Batch") > -1 && (s.push(this.entities[a]),
        this.entities.splice(a, 1))
    }
    this.prepare(this.count, s),
    this.count++
}
,
BatchManager.prototype.prepare = function(t, e) {
    this.batches = [],
    this.batchIds = [];
    var a = []
      , i = this.app.batcher.addGroup("Area-" + t, !1, this.maxSize);
    for (var s in e) {
        var r = e[s];
        r.model && r.model.meshInstances && r.model.meshInstances.length > 0 && r.tags.list().indexOf("Batch") > -1 && (a = a.concat(r.model.meshInstances),
        r.model.batchGroupId = i.id)
    }
    var n = this.app.batcher.prepare(a, !1, this.maxSize, !1)
      , h = this.app.batcher.create(n, !1, i.id);
    this.batches.push(h),
    this.batchIds.push(i.id),
    this.app.batcher.generate(this.batchIds)
}
,
BatchManager.prototype.update = function(t) {
    this.timestamp < this.processTime && this.timestamp++,
    this.processTime == this.timestamp && (this.timestamp++,
    this.optimize(),
    this.entity.destroy(),
    this.app.fire("Event:Optimize", !0))
}
;
var LimitFps = pc.createScript("limitFps");
LimitFps.attributes.add("targetFps", {
    type: "number",
    default: 60
}),
LimitFps.prototype.initialize = function() {}
,
LimitFps.prototype.limit = function(t) {
    return !1
}
;
var Counter = pc.createScript("counter");
Counter.attributes.add("nextValue", {
    type: "number",
    default: 0
}),
Counter.attributes.add("speed", {
    type: "number",
    default: .1
}),
Counter.prototype.initialize = function() {
    this.currentValue = 0
}
,
Counter.prototype.update = function(t) {
    this.currentValue = pc.math.lerp(this.currentValue, this.nextValue, this.speed),
    this.entity.element.text = Math.round(this.currentValue) + ""
}
;
var Miniplay = pc.createScript("miniplay");
Miniplay.attributes.add("URL", {
    type: "string"
}),
Miniplay.attributes.add("key", {
    type: "string"
}),
Miniplay.prototype.initialize = function() {
    var i = document.referrer;
    if (i && (i.search("lechuck") > -1 || i.search("miniplay") > -1 || i.search("minijuegos") > -1)) {
        var t = this
          , e = document.createElement("script");
        e.src = this.URL,
        e.onload = function() {
            t.initalizeAPI()
        }
        ,
        document.body.appendChild(e),
        this.isReady = !1,
        pc.miniplay = this
    }
}
,
Miniplay.prototype.initalizeAPI = function() {
    this.lechuck = new LeChuckAPI({}),
    this.isReady = !0,
    console.log("[DEBUG] LeChuck API has been initalized!", this.key)
}
,
Miniplay.prototype.save = function(i, t) {
    this.isReady && this.lechuck.stat.put(function(i) {}, i, t)
}
;
var Chat = pc.createScript("chat");
Chat.attributes.add("messageElement", {
    type: "entity"
}),
Chat.attributes.add("messageRowEntity", {
    type: "entity"
}),
Chat.attributes.add("messageBox", {
    type: "entity"
}),
Chat.attributes.add("chatInput", {
    type: "entity"
}),
Chat.attributes.add("messageLimit", {
    type: "number"
}),
Chat.attributes.add("fadeOutTime", {
    type: "number"
}),
Chat.attributes.add("notificationStayTime", {
    type: "number",
    default: 1.2
}),
Chat.prototype.initialize = function() {
    this.messages = [],
    this.messageIndex = 0,
    this.isFocused = !1,
    this.app.on("Event:Chat", this.addMessage.bind(this), this),
    this.addMessage("Console", "Chat feature actived!")
}
,
Chat.prototype.addMessage = function(t, e) {
    var s = (t ? t + "" : "Guest") + ' : [color="#ffffff"]' + e + "[/color]";
    this.messageElement.element.text = s + "",
    this.messageIndex++;
    var a = this.messageRowEntity.clone();
    a.enabled = !0,
    a.username = a.findByName("Content"),
    a.background = a.findByName("Background"),
    a.tween(a.username.element).delay(this.notificationStayTime).to({
        opacity: 0
    }, this.fadeOutTime, pc.QuarticOut).start(),
    a.tween(a.background.element).delay(this.notificationStayTime).to({
        opacity: 0
    }, this.fadeOutTime, pc.QuarticOut).start(),
    a.setLocalPosition(0, 0, 0),
    this.messageBox.addChild(a),
    this.entity.sound.play("Pop"),
    this.updateChatMessages()
}
,
Chat.prototype.focus = function() {
    this.chatInput.script.input.focus(),
    this.isFocused = !0
}
,
Chat.prototype.blur = function() {
    this.chatInput.script.input.blur(),
    this.isFocused = !1
}
,
Chat.prototype.sendMessage = function() {
    var t = this.chatInput.script.input.getValue();
    t && (this.app.fire("Event:SendChat", t),
    this.chatInput.script.input.setValue(""))
}
,
Chat.prototype.updateChatMessages = function() {
    for (var t = this.messageBox.children.length; t--; ) {
        var e = this.messageBox.children[t];
        e && e.tween(e.getLocalPosition()).to({
            x: 0,
            y: 30 * (this.messageIndex - t),
            z: 0
        }, .5, pc.QuarticOut).start()
    }
    this.messageIndex > this.messageLimit && (this.messageBox.children[1].destroy(),
    this.messageIndex--)
}
,
Chat.prototype.updateFocusStatus = function() {
    "INPUT" == document.activeElement.tagName ? this.isFocused = !0 : this.isFocused = !1
}
,
Chat.prototype.update = function(t) {
    this.app.keyboard.wasPressed(pc.KEY_ENTER) && (this.isFocused ? (this.sendMessage(),
    this.blur()) : this.focus()),
    this.isFocused && this.app.fire("Player:Stop", !0),
    this.updateFocusStatus()
}
;
var Notification = pc.createScript("notification");
Notification.attributes.add("messageBox", {
    type: "entity"
}),
Notification.attributes.add("messageRowEntity", {
    type: "entity"
}),
Notification.attributes.add("messageElement", {
    type: "entity"
}),
Notification.attributes.add("messageLimit", {
    type: "number"
}),
Notification.attributes.add("fadeOutTime", {
    type: "number"
}),
Notification.attributes.add("notificationStayTime", {
    type: "number",
    default: 1.2
}),
Notification.prototype.initialize = function() {
    this.messages = [],
    this.messageIndex = 0,
    this.app.on("Interface:Notification", this.addNotification.bind(this), this)
}
,
Notification.prototype.addNotification = function(t) {
    this.messageElement.element.text = t + "",
    this.messageIndex++;
    var i = this.messageRowEntity.clone();
    i.enabled = !0,
    i.content = i.findByName("Content"),
    i.icon = i.findByName("Icon"),
    i.background = i.findByName("Background"),
    i.tween(i.content.element).delay(this.notificationStayTime).to({
        opacity: 0
    }, this.fadeOutTime, pc.QuarticOut).start(),
    i.tween(i.icon.element).delay(this.notificationStayTime).to({
        opacity: 0
    }, this.fadeOutTime, pc.QuarticOut).start(),
    i.tween(i.background.element).delay(this.notificationStayTime).to({
        opacity: 0
    }, this.fadeOutTime, pc.QuarticOut).start(),
    i.setLocalPosition(0, 0, 0),
    this.messageBox.addChild(i),
    this.updateChatMessages()
}
,
Notification.prototype.updateChatMessages = function() {
    for (var t = this.messageBox.children.length; t--; ) {
        var i = this.messageBox.children[t];
        i && i.tween(i.getLocalPosition()).to({
            x: 0,
            y: 35 * (this.messageIndex - t),
            z: 0
        }, .5, pc.QuarticOut).start()
    }
    this.messageIndex > this.messageLimit && (this.messageBox.children[1].destroy(),
    this.messageIndex--)
}
,
Notification.prototype.update = function(t) {}
;
var Sprite = pc.createScript("sprite");
Sprite.attributes.add("speed", {
    type: "number"
}),
Sprite.attributes.add("frameCount", {
    type: "number"
}),
Sprite.attributes.add("loop", {
    type: "boolean"
}),
Sprite.attributes.add("autoplay", {
    type: "boolean"
}),
Sprite.prototype.initialize = function() {
    this.frame = 0
}
,
Sprite.prototype.update = function(t) {
    this.frame += this.speed;
    var e = Math.round(this.frame % this.frameCount);
    this.entity.element.spriteFrame = e
}
;
var KeyboardConfiguration = pc.createScript("keyboardConfiguration");
KeyboardConfiguration.attributes.add("itemEntity", {
    type: "entity"
}),
KeyboardConfiguration.attributes.add("holderEntity", {
    type: "entity"
}),
KeyboardConfiguration.attributes.add("keys", {
    type: "string",
    array: !0
}),
KeyboardConfiguration.attributes.add("labels", {
    type: "string",
    array: !0
}),
KeyboardConfiguration.prototype.initialize = function() {
    this.activeKey = !1,
    this.keyEntities = [],
    this.defaultConfiguration = [49, 50, 51, 52, 53, 54, 87, 66, 69, 83, 65, 68, 82, 81, 88, 20, 67, 16, 70, 71, 13, 66],
    this.currentConfiguration = {},
    this.currentLabels = {};
    var t = Service.get("keyboard")
      , e = Service.get("keyboard_labels");
    t && e && (this.currentConfiguration = t,
    this.currentLabels = e),
    this.showKeys(),
    this.app.keyboard.on("keydown", this.setKey.bind(this), this)
}
,
KeyboardConfiguration.prototype.configurationSet = function(t, e, i) {
    this.currentConfiguration[t] = e,
    this.currentLabels[t] = i,
    Service.set("keyboard", this.currentConfiguration),
    Service.set("keyboard_labels", this.currentLabels)
}
,
KeyboardConfiguration.prototype.checkUse = function(t) {
    return !!(this.currentConfiguration && Object.values(this.currentConfiguration).indexOf(t) > -1)
}
,
KeyboardConfiguration.prototype.setKey = function(t) {
    if (this.activeKey && t.event) {
        if (this.checkUse(t.key))
            return this.showKeys(),
            alert("This key in use, please change current binding."),
            !1;
        this.configurationSet(this.activeKey, t.key, t.event.key.toUpperCase()),
        this.showKeys()
    }
}
,
KeyboardConfiguration.prototype.clearKeys = function() {
    for (var t = this.keyEntities.length; t--; )
        this.keyEntities[t] && this.keyEntities[t].destroy();
    this.keyEntities = []
}
,
KeyboardConfiguration.prototype.showKeys = function() {
    this.activeKey = !1,
    this.clearKeys();
    for (var t = this.keys.length; t--; ) {
        var e = 51 * parseInt(t)
          , i = this.itemEntity.clone();
        i.setLocalPosition(0, -e, 0),
        i.enabled = !0,
        i.label = i.findByName("Label"),
        i.label.element.text = this.labels[t],
        i.button = i.findByName("DefineButton"),
        i.button.keyLabel = i.button.findByName("Text"),
        i.button.keyId = this.keys[t];
        var n = this.currentLabels[this.keys[t]];
        i.button.keyLabel.element.text = n ? n + "" : this.keys[t],
        i.button.configurator = this,
        i.button.waitingInput = i.findByName("WaitingInput"),
        i.button.waitingInput.enabled = !1,
        i.button.element.on("click", function(t) {
            this.waitingInput.enabled = !0,
            this.enabled = !1,
            this.configurator.activeKey = this.keyId
        }, i.button),
        this.holderEntity.addChild(i),
        this.keyEntities.push(i)
    }
}
;
var Ambient = pc.createScript("ambient");
Ambient.attributes.add("modes", {
    type: "string",
    array: !0
}),
Ambient.attributes.add("maps", {
    type: "string",
    array: !0
}),
Ambient.attributes.add("ambientColors", {
    type: "rgb",
    array: !0
}),
Ambient.attributes.add("fogColors", {
    type: "rgb",
    array: !0
}),
Ambient.attributes.add("skyBoxes", {
    type: "asset",
    assetType: "cubemap",
    array: !0
}),
Ambient.attributes.add("mapImages", {
    type: "asset",
    assetType: "texture",
    array: !0
}),
Ambient.attributes.add("mapElements", {
    type: "entity",
    array: !0
}),
Ambient.attributes.add("mapNames", {
    type: "entity",
    array: !0
}),
Ambient.attributes.add("regions", {
    type: "entity",
    array: !0
}),
Ambient.attributes.add("mapEntities", {
    type: "entity",
    array: !0
}),
Ambient.attributes.add("lightEntities", {
    type: "entity",
    array: !0
}),
Ambient.attributes.add("randomizeMap", {
    type: "boolean"
}),
Ambient.attributes.add("selectedMap", {
    type: "string"
}),
Ambient.attributes.add("currentMode", {
    type: "string",
    default: "battle-royale"
}),
Ambient.attributes.add("debug", {
    type: "boolean"
}),
Ambient.attributes.add("helicopterScene", {
    type: "entity"
}),
Ambient.attributes.add("teamSelectionScene", {
    type: "entity"
}),
Ambient.prototype.initialize = function() {
    void 0 !== pc.selectedMap && (this.selectedMap = pc.selectedMap),
    this.randomizeMap ? this.currentIndex = Math.round(Math.random()) : this.currentIndex = this.maps.indexOf(this.selectedMap),
    this.currentMode = this.modes[this.currentIndex],
    pc.currentMode = this.currentMode,
    this.app.scene.ambientLight = this.ambientColors[this.currentIndex],
    this.app.scene.fogColor = this.fogColors[this.currentIndex],
    this.app.scene.skybox = this.skyBoxes[this.currentIndex].resource;
    for (var t = this.mapEntities.length; t--; )
        this.mapEntities[t].enabled = !1;
    if (this.mapEntities[this.currentIndex].enabled = !0,
    this.lightEntities.length > 0) {
        for (var e = this.lightEntities.length; e--; )
            this.lightEntities[e].enabled = !1;
        this.lightEntities[this.currentIndex].enabled = !0
    }
    if (this.mapElements.length > 0)
        for (var i = this.mapElements.length; i--; )
            this.mapElements[i].element.textureAsset = this.mapImages[this.currentIndex];
    if (this.mapNames.length > 0)
        for (var a = this.mapNames.length; a--; )
            this.mapNames[a].element.text = this.maps[this.currentIndex];
    if (this.regions.length > 0) {
        for (var s = this.regions.length; s--; )
            this.regions[s].enabled = !1;
        this.regions[this.currentIndex].enabled = !0
    }
    this.debug || ("battle-royale" == pc.currentMode ? (this.helicopterScene.enabled = !0,
    this.teamSelectionScene.enabled = !1) : "capture-the-flag" == pc.currentMode && (this.helicopterScene.enabled = !1,
    this.teamSelectionScene.enabled = !0))
}
;
var Touch = pc.createScript("touch");
Touch.attributes.add("type", {
    type: "string",
    enum: [{
        movement: "movement"
    }, {
        angle: "angle"
    }],
    default: "movement"
}),
Touch.attributes.add("detectMobile", {
    type: "boolean",
    default: !0
}),
Touch.attributes.add("threshold", {
    type: "number",
    default: 30
}),
Touch.attributes.add("multiplier", {
    type: "number",
    default: 30
}),
Touch.attributes.add("connectedEntity", {
    type: "entity"
}),
Touch.attributes.add("triggerFunction", {
    type: "string"
}),
Touch.attributes.add("debug", {
    type: "boolean"
}),
Touch.prototype.initialize = function() {
    this.touchCenterEntity = this.entity.findByName("Touch"),
    this.isStartedTouch = 0,
    this.wasMoving = !1,
    this.isTouching = !1,
    this.touchX = 0,
    this.touchY = 0,
    this.startX = 0,
    this.startY = 0,
    this.diffX = 0,
    this.diffY = 0,
    this.entity.element.on("touchstart", this.touchStart, this),
    this.entity.element.on("touchmove", this.touchMove, this),
    this.entity.element.on("touchend", this.touchEnd, this),
    this.entity.element.on("touchcancel", this.touchEnd, this),
    this.debug && (this.app.on("Touch:Movement", function(t) {
        console.log("Touch movement : ", t)
    }),
    this.app.on("Touch:Angle", function(t) {
        console.log("Touch angle : ", t)
    })),
    this.checkMobile() && this.app.fire("Touch:State", !0),
    this.detectMobile && !this.checkMobile() && this.entity.destroy()
}
,
Touch.prototype.checkMobile = function() {
    var t = !1
      , i = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
    for (var e in i) {
        var h = i[e];
        navigator.userAgent.match(h) && (t = !0)
    }
    return t
}
,
Touch.prototype.checkThreshold = function() {
    if (!this.entity.enabled)
        return !1;
    if ("angle" == this.type && this.isTouching) {
        var t = this.diffX / this.entity.element.width * this.multiplier
          , i = this.diffY / this.entity.element.height * this.multiplier;
        this.app.fire("Touch:Angle", {
            dx: t,
            dy: i
        })
    }
}
,
Touch.prototype.touchStart = function(t) {
    if (!this.entity.enabled)
        return !1;
    this.isTouching = !0,
    this.startX = t.x,
    this.startY = t.y,
    this.touchX = t.x,
    this.touchY = t.y,
    this.isStartedTouch = .1,
    this.wasMoving = !1,
    "angle" == this.type && this.app.fire("Touch:Down", !0)
}
,
Touch.prototype.touchMove = function(t) {
    if (!this.entity.enabled)
        return !1;
    this.touchX = t.x,
    this.touchY = t.y,
    this.isStartedTouch = 1,
    "movement" == this.type && (this.diffY < -this.threshold ? this.app.fire("Touch:Movement", "Forward", !0) : this.app.fire("Touch:Movement", "Forward", !1),
    this.diffY > this.threshold ? this.app.fire("Touch:Movement", "Backward", !0) : this.app.fire("Touch:Movement", "Backward", !1),
    this.diffX > this.threshold ? this.app.fire("Touch:Movement", "Right", !0) : this.app.fire("Touch:Movement", "Right", !1),
    this.diffX < -this.threshold ? this.app.fire("Touch:Movement", "Left", !0) : this.app.fire("Touch:Movement", "Left", !1)),
    0 !== t.x && 0 !== t.y && (this.wasMoving = !0)
}
,
Touch.prototype.touchEnd = function(event) {
    if (!this.entity.enabled)
        return !1;
    if (this.isTouching = !1,
    this.startX = 0,
    this.startY = 0,
    this.touchX = 0,
    this.touchY = 0,
    "angle" == this.type && this.app.fire("Touch:Down", !1),
    this.wasMoving || this.app.fire("Touch:Tap", !0),
    this.connectedEntity && this.triggerFunction) {
        var connectedEntity = this.connectedEntity;
        eval("connectedEntity.script." + this.triggerFunction)
    }
}
,
Touch.prototype.update = function(t) {
    if (!this.entity.enabled)
        return !1;
    if (this.isTouching) {
        var i = this.touchX - this.startX
          , e = this.touchY - this.startY;
        0 !== i || 0 !== e ? this.touchCenterEntity.setLocalPosition(i, -e, 0) : this.touchCenterEntity.setLocalPosition(0, 0, 0),
        this.diffX = i,
        this.diffY = e
    } else
        this.touchCenterEntity.setLocalPosition(0, 0, 0),
        this.diffX = 0,
        this.diffY = 0;
    this.checkThreshold(),
    this.isStartedTouch -= t
}
;
var SpawnTable = pc.createScript("spawnTable");
SpawnTable.attributes.add("weaponEntities", {
    type: "entity",
    array: !0
}),
SpawnTable.attributes.add("deskEntity", {
    type: "entity"
}),
SpawnTable.attributes.add("dynamicWorld", {
    type: "entity"
}),
SpawnTable.prototype.initialize = function() {
    new pc.Vec3(0,90,0);
    var t = this.deskEntity.clone();
    t.setPosition(this.entity.getPosition()),
    t.setLocalEulerAngles(this.entity.getEulerAngles()),
    t.enabled = !0;
    for (var e = t.findByTag("WeaponSpawnPoint"), i = 0; i < e.length; i++) {
        var n = this.weaponEntities[i].clone();
        n.setPosition(e[i].getPosition().clone()),
        n.setLocalEulerAngles(this.entity.getEulerAngles()),
        n.enabled = !0,
        n.type = n.script.weapon.type,
        "Ammo" == n.script.weapon.type && (n.script.interactive.isUnlimited = !0),
        this.dynamicWorld.addChild(n)
    }
    this.dynamicWorld.addChild(t),
    this.entity.destroy()
}
;
var TeamSelection = pc.createScript("teamSelection");
TeamSelection.attributes.add("playerEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("interfaceEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("blueTeamButton", {
    type: "entity"
}),
TeamSelection.attributes.add("blueTeamHolder", {
    type: "entity"
}),
TeamSelection.attributes.add("blueTeamPlayer", {
    type: "entity"
}),
TeamSelection.attributes.add("redTeamButton", {
    type: "entity"
}),
TeamSelection.attributes.add("redTeamHolder", {
    type: "entity"
}),
TeamSelection.attributes.add("redTeamPlayer", {
    type: "entity"
}),
TeamSelection.attributes.add("titleEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("titleBackgroundEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("loadingEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("transitionEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("bannerEntities", {
    type: "entity"
}),
TeamSelection.attributes.add("teamStageEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("timeEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("timerBar", {
    type: "entity"
}),
TeamSelection.attributes.add("optimizingEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("reconnectingEntity", {
    type: "entity"
}),
TeamSelection.attributes.add("readyPlayersText", {
    type: "entity"
}),
TeamSelection.attributes.add("readyColor", {
    type: "rgb"
}),
TeamSelection.prototype.initialize = function() {
    this.allPlayers = [],
    this.tick = 20,
    this.maxTime = 20,
    this.readyPlayers = 0,
    this.app.on("Team:Selection", this.onTeamSelection, this),
    this.app.on("Enemy:Destroy", this.onPlayerLeave, this),
    this.app.on("Enemy:Create", this.setJoinedPlayer, this),
    this.app.on("Server:Tick", this.setTick, this),
    this.app.on("Server:Reconnect", this.showReconnecting, this),
    this.app.on("Event:Optimize", this.hideOptimizing, this),
    this.blueTeamPlayer.enabled = !1,
    this.redTeamPlayer.enabled = !1
}
,
TeamSelection.prototype.setJoinedPlayer = function() {}
,
TeamSelection.prototype.showReconnecting = function() {}
,
TeamSelection.prototype.hideOptimizing = function() {}
,
TeamSelection.prototype.setTick = function(e) {
    var t = this.maxTime - e;
    t = Math.max(t, 0),
    this.tick = t,
    this.timeEntity.element.text = t + "",
    e >= this.maxTime - 5 && (this.loadingEntity.enabled = !1,
    this.titleEntity.element.text = "Get ready!",
    this.titleBackgroundEntity.element.color = this.readyColor,
    this.blueTeamButton.enabled = !1,
    this.redTeamButton.enabled = !1,
    this.entity.sound.play("Count")),
    e >= this.maxTime - 1 && !this.transitionEntity.enabled ? this.transitionEntity.enabled = !0 : e >= this.maxTime && (this.entity.enabled = !1,
    this.bannerEntity && this.bannerEntity.destroy(),
    this.teamStageEntity.enabled = !0);
    var i = Math.min(1, e / 20);
    this.timerBar.tween(this.timerBar.getLocalScale()).to({
        x: i,
        y: 1,
        z: 1
    }, 1, pc.Linear).start()
}
,
TeamSelection.prototype.selectTeam = function(e) {
    this.app.fire("Player:Team", e),
    this.blueTeamButton.enabled = !1,
    this.redTeamButton.enabled = !1
}
,
TeamSelection.prototype.onTeamSelection = function(e, t, i, a, n, l) {
    var r = !1
      , o = !1;
    "blue" === t && (r = this.blueTeamHolder,
    o = this.blueTeamPlayer),
    "red" === t && (r = this.redTeamHolder,
    o = this.redTeamPlayer);
    var s = o.clone();
    s.enabled = !0,
    s.userId = e,
    s.team = t,
    s.setLocalPosition(),
    s.findByName("Username").element.text = i,
    s.findByName("Level").element.text = n + 1 + "",
    s.setLocalPosition(0, 45 * -this.getTeamCount(t), 0),
    l && (this.blueTeamButton.enabled = !1,
    this.redTeamButton.enabled = !1,
    s.findByName("Background").element.color = this.meColor);
    var y = this.app.assets.find(a + "-CharacterThumbnail");
    y && (s.findByName("ProfilePicture").element.textureAsset = y),
    r.addChild(s),
    this.allPlayers.push(s),
    this.readyPlayers++,
    this.readyPlayersText.element.text = 'Ready : [color="#40CD11"]' + this.readyPlayers + "/10[/color]"
}
,
TeamSelection.prototype.getTeamCount = function(e) {
    for (var t = 0, i = this.allPlayers.length; i--; )
        this.allPlayers[i] && this.allPlayers[i].team == e && t++;
    return t
}
,
TeamSelection.prototype.onPlayerLeave = function(e) {
    for (var t = this.allPlayers.length; t--; )
        this.allPlayers[t] && this.allPlayers[t].userId == e[0] && (this.allPlayers[t].destroy(),
        this.allPlayers.splice(t, 1))
}
,
TeamSelection.prototype.connectGame = function(e) {
    this.interfaceEntity.enabled = !0,
    this.playerEntity.enabled = !0,
    this.app.fire("Player:Land", !0),
    this.playerEntity.script.movement.onParachute = !1,
    this.entity.enabled = !1
}
,
TeamSelection.prototype.update = function(e) {}
;
var InviteService = pc.createScript("inviteService");
InviteService.attributes.add("IP", {
    type: "string"
}),
InviteService.attributes.add("testIP", {
    type: "string"
}),
InviteService.attributes.add("debug", {
    type: "boolean"
}),
InviteService.attributes.add("isPrivate", {
    type: "boolean",
    default: !1
}),
InviteService.attributes.add("inviteButton", {
    type: "entity"
}),
InviteService.attributes.add("findMatchButton", {
    type: "entity"
}),
InviteService.attributes.add("readyPartyButton", {
    type: "entity"
}),
InviteService.attributes.add("leavePartyButton", {
    type: "entity"
}),
InviteService.attributes.add("menuEntity", {
    type: "entity"
}),
InviteService.attributes.add("privateIconCheckbox", {
    type: "entity"
}),
InviteService.attributes.add("mainBannerEntity", {
    type: "entity"
}),
InviteService.attributes.add("chatEntity", {
    type: "entity"
}),
InviteService.attributes.add("defaultVersion", {
    type: "string",
    default: "1.0.78"
}),
InviteService.prototype.initialize = function() {
    this.username = "none",
    this.skin = "Biker",
    this.hat = "none",
    this.friends = [],
    this.version = this.defaultVersion,
    this.socket = !1,
    this.isConnected = !1,
    this.currentPartyId = "none",
    this.app.on("Start:InviteService", this.init, this),
    this.app.on("InviteService:SetFriends", this.setFriends, this),
    this.app.on("InviteService:Invite", this.sendInvite, this),
    this.app.on("InviteService:Kill", this.killService, this),
    this.app.on("Event:SendChat", this.sendChat, this)
}
,
InviteService.prototype.sendChat = function(e) {
    this.isAlreadyConnected && this.send(["chat", e])
}
,
InviteService.prototype.killService = function() {
    this.isAlreadyConnected && (this.socket.close(),
    this.chatEntity.enabled = !1)
}
,
InviteService.prototype.init = function() {
    if (this.isAlreadyConnected)
        return !1;
    this.username = pc.username,
    this.skin = pc.currentSkin,
    this.debug ? this.socket = new WebSocket(this.testIP) : this.socket = new WebSocket(this.IP);
    var e = this;
    this.socket.onopen = function(t) {
        e.onOpen(t)
    }
    ,
    this.socket.onmessage = function(t) {
        e.onMessage(t)
    }
    ,
    this.isAlreadyConnected = !0
}
,
InviteService.prototype.setPrivate = function() {
    this.isPrivate = !this.isPrivate,
    this.privateIconCheckbox.enabled = this.isPrivate,
    this.send(["match", this.version, this.menuEntity.script.menu.maps.join(","), this.isPrivate, pc.country])
}
,
InviteService.prototype.setFriends = function(e) {
    this.friends = e,
    this.friends.length > 0 && this.send(["subscribe", this.friends])
}
,
InviteService.prototype.onOpen = function(e) {
    this.debug && console.log("Invite service is ready!"),
    this.isConnected = !0
}
,
InviteService.prototype.onMessage = function(e) {
    if (!e || !e.data)
        return !1;
    var t = this.decode(e.data)
      , i = t[0]
      , n = t.slice(1, t.length)
      , s = this.defaultVersion;
    if ("undefined" != typeof VERSION && (s = VERSION),
    this.version = s,
    this.debug && console.log("Event : ", this.decode(e.data)),
    "auth" === i && (this.send(["username", this.username, this.skin, this.hat]),
    this.send(["subscribe", this.friends]),
    this.send(["match", s, this.menuEntity.script.menu.maps.join(","), this.isPrivate, pc.country])),
    "friends" === i && n.length > 0 && this.app.fire("FriendList:List", n[0]),
    "online" === i && n.length > 0 && this.app.fire("FriendList:Online", n[0]),
    "chat" === i && n.length > 0 && this.app.fire("Event:Chat", n[0], n[1]),
    "offline" === i && n.length > 0 && this.app.fire("FriendList:Offline", n[0]),
    "invite" === i && n.length > 0) {
        var r = confirm(n[0] + " invites you game!")
          , o = n[0];
        r ? this.acceptInvite(o) : this.declineInvite(o)
    }
    if ("message" === i && n.length > 0 && console.error(n[0]),
    "join" === i && n.length > 0 && console.error(n[0]),
    "left" === i && n.length > 0 && (console.log("Party member left : ", n[0]),
    this.app.fire("FriendList:Left", n[0])),
    "party" === i && n.length > 0) {
        var a = !1;
        "none" !== n[0] ? (console.log("Joined a party : ", n[0]),
        this.currentPartyId = n[0],
        this.app.fire("FriendList:JoinParty", n[0]),
        a = !0) : (console.log("Party removed"),
        this.currentPartyId = "none",
        this.app.fire("FriendList:JoinParty", "none"),
        a = !1),
        this.inviteButton.enabled = !a,
        this.findMatchButton.enabled = !a,
        this.readyPartyButton.enabled = a,
        this.leavePartyButton.enabled = a,
        a && this.readyPartyButton.script.button.resolve(),
        a ? (this.chatEntity.enabled = !0,
        n.length > 1 && this.app.fire("InviteService:Join", n[1], n[2])) : (this.chatEntity.enabled = !0,
        this.app.fire("InviteService:Leave", !0))
    }
    "session" === i && n.length > 0 && (this.socket.close(),
    this.chatEntity.destroy(),
    this.mainBannerEntity.enabled = !1,
    this.menuEntity.script.menu.closeAllModals(),
    this.menuEntity.script.menu.disableBanners(),
    pc.selectedMap = n[0],
    pc.network.IP = n[1],
    pc.network.roomId = n[2],
    pc.network.radiusId = n[3],
    pc.network.gameMode = n[4],
    this.menuEntity.script.menu.loadScene("Game"))
}
,
InviteService.prototype.acceptInvite = function(e) {
    this.send(["accept", e])
}
,
InviteService.prototype.declineInvite = function(e) {
    this.send(["decline", e])
}
,
InviteService.prototype.sendInvite = function(e) {
    this.send(["invite", e])
}
,
InviteService.prototype.ready = function() {
    this.send(["ready", !0]),
    this.inviteButton.enabled = !1,
    this.leavePartyButton.enabled = !1
}
,
InviteService.prototype.leaveParty = function() {
    this.send(["left", !0])
}
,
InviteService.prototype.send = function(e) {
    if (!this.isConnected)
        return !1;
    this.socket.send(this.encode(e))
}
,
InviteService.prototype.encode = function(e) {
    return JSON.stringify(e)
}
,
InviteService.prototype.decode = function(e) {
    return JSON.parse(e)
}
;
var Hitmarker = pc.createScript("hitmarker");
Hitmarker.attributes.add("hitPointEntity", {
    type: "entity"
}),
Hitmarker.attributes.add("hitPointHolder", {
    type: "entity"
}),
Hitmarker.attributes.add("distance", {
    type: "number",
    default: 100
}),
Hitmarker.attributes.add("spread", {
    type: "number",
    default: 20
}),
Hitmarker.attributes.add("speed", {
    type: "number",
    default: 1
}),
Hitmarker.attributes.add("duration", {
    type: "number",
    default: 1
}),
Hitmarker.attributes.add("rotateSpeed", {
    type: "number",
    default: 1
}),
Hitmarker.attributes.add("cameraEntity", {
    type: "entity"
}),
Hitmarker.attributes.add("screenEntity", {
    type: "entity"
}),
Hitmarker.attributes.add("hitmarkerEntity", {
    type: "entity"
}),
Hitmarker.prototype.initialize = function() {
    this.points = [],
    this.hitPointEntity.enabled = !1,
    this.app.on("Hit:Point", this.onHitPoint, this)
}
,
Hitmarker.prototype.onHitPoint = function(t, e) {
    var i = this.hitPointEntity.clone();
    i.connectedEntity = t,
    i.time = 1,
    i.direction = Math.random();
    var a = Math.random() * this.spread - Math.random() * this.spread;
    i.findByName("Wrapper").setLocalPosition(a, a, 0);
    var r = i.findByName("Number");
    r.element.text = e + "",
    r.tween(r.getLocalPosition()).to({
        x: a,
        y: this.distance,
        z: 0
    }, this.duration, pc.SineOut).start(),
    r.tween(r.element).to({
        opacity: 0
    }, this.duration, pc.SineOut).start(),
    this.points.push(i),
    this.hitPointHolder.addChild(i)
}
,
Hitmarker.prototype.trackPoint = function(t, e) {
    if (!t)
        return !1;
    var i = t.connectedEntity.getPosition().clone()
      , a = new pc.Vec3;
    this.cameraEntity.camera.worldToScreen(i, a);
    var r = this.screenEntity.screen.scale
      , n = this.app.graphicsDevice;
    a.x > 0 && a.x < this.app.graphicsDevice.width && a.y > 0 && a.y < this.app.graphicsDevice.height && a.z > 0 ? (t.direction > .5 ? t.rotateLocal(0, 0, this.rotateSpeed * e) : t.rotateLocal(0, 0, -this.rotateSpeed * e),
    t.setLocalPosition(a.x / r, (n.height - a.y) / r, 0),
    t.enabled = !0) : t.enabled = !1
}
,
Hitmarker.prototype.updatePoints = function(t) {
    for (var e = this.points.length; e--; ) {
        var i = this.points[e];
        i && (i.time -= t * this.speed,
        i.time < 0 ? (i.destroy(),
        this.points.splice(e, 1)) : this.trackPoint(i, t))
    }
}
,
Hitmarker.prototype.update = function(t) {
    this.updatePoints(t)
}
;
