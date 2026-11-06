// @__NO_SIDE_EFFECTS__
function Qn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const B = {}, rt = [], Ie = () => {
}, ir = () => !1, un = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), an = (e) => e.startsWith("onUpdate:"), te = Object.assign, es = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, mi = Object.prototype.hasOwnProperty, L = (e, t) => mi.call(e, t), M = Array.isArray, Ge = (e) => It(e) === "[object Map]", We = (e) => It(e) === "[object Set]", Cs = (e) => It(e) === "[object Date]", I = (e) => typeof e == "function", J = (e) => typeof e == "string", pe = (e) => typeof e == "symbol", $ = (e) => e !== null && typeof e == "object", or = (e) => ($(e) || I(e)) && I(e.then) && I(e.catch), lr = Object.prototype.toString, It = (e) => lr.call(e), yi = (e) => It(e).slice(8, -1), fr = (e) => It(e) === "[object Object]", dn = (e) => J(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, St = /* @__PURE__ */ Qn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), hn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, bi = /-\w/g, oe = hn(
  (e) => e.replace(bi, (t) => t.slice(1).toUpperCase())
), xi = /\B([A-Z])/g, Xe = hn(
  (e) => e.replace(xi, "-$1").toLowerCase()
), pn = hn((e) => e.charAt(0).toUpperCase() + e.slice(1)), On = hn(
  (e) => e ? `on${pn(e)}` : ""
), Pe = (e, t) => !Object.is(e, t), Jt = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, cr = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, gn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ts;
const _n = () => Ts || (Ts = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ts(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = J(s) ? Ci(s) : ts(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (J(e) || $(e))
    return e;
}
const vi = /;(?![^(]*\))/g, Si = /:([^]+)/, wi = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Ci(e) {
  const t = {};
  return e.replace(wi, (n) => n.startsWith("/*") ? "" : n).split(vi).forEach((n) => {
    if (n) {
      const s = n.split(Si);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ns(e) {
  let t = "";
  if (J(e))
    t = e;
  else if (M(e))
    for (let n = 0; n < e.length; n++) {
      const s = ns(e[n]);
      s && (t += s + " ");
    }
  else if ($(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ti = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Ei = /* @__PURE__ */ Qn(Ti);
function ur(e) {
  return !!e || e === "";
}
function Oi(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let r = 0; s && r < e.length; r++)
    s = xe(e[r], t[r], n);
  return s;
}
function Es(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), r = new Uint8Array(s.length);
  for (const i of e) {
    let o = -1;
    for (let l = 0; l < s.length; l++)
      if (!r[l] && xe(i, s[l], n)) {
        o = l;
        break;
      }
    if (o < 0) return !1;
    r[o] = 1;
  }
  return !0;
}
function Ai(e, t, n) {
  let s = Ge(e), r = Ge(t);
  if (s || r || (s = We(e), r = We(t), s || r))
    return s && r ? Es(e, t, n) : !1;
  const i = Object.keys(e).length, o = Object.keys(t).length;
  if (i !== o)
    return !1;
  for (const l in e) {
    const c = e.hasOwnProperty(l), d = t.hasOwnProperty(l);
    if (c && !d || !c && d || !xe(e[l], t[l], n))
      return !1;
  }
  return String(e) === String(t);
}
function Os(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [r, i] = n;
  if (r.has(e) || i.has(t))
    return r.get(e) === t && i.get(t) === e;
  r.set(e, t), i.set(t, e);
  const o = s(e, t, n);
  return r.delete(e), i.delete(t), o;
}
function xe(e, t, n) {
  if (e === t) return !0;
  let s = Cs(e), r = Cs(t);
  return s || r ? s && r ? e.getTime() === t.getTime() : !1 : (s = pe(e), r = pe(t), s || r ? e === t : (s = M(e), r = M(t), s || r ? s && r ? Os(e, t, n, Oi) : !1 : (s = $(e), r = $(t), s || r ? !s || !r ? !1 : Os(e, t, n, Ai) : String(e) === String(t))));
}
function ss(e, t) {
  return e.findIndex((n) => xe(n, t));
}
const ar = (e) => !!(e && e.__v_isRef === !0), Mi = (e) => J(e) ? e : e == null ? "" : M(e) || $(e) && (e.toString === lr || !I(e.toString)) ? ar(e) ? Mi(e.value) : JSON.stringify(e, dr, 2) : String(e), dr = (e, t) => ar(t) ? dr(e, t.value) : Ge(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[An(s, i) + " =>"] = r, n),
    {}
  )
} : We(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => An(n))
} : pe(t) ? An(t) : $(t) && !M(t) && !fr(t) ? String(t) : t, An = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    pe(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Z;
class Ri {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Z && (Z.active ? (this.parent = Z, this.index = (Z.scopes || (Z.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const r = this.scopes.slice();
        for (t = 0, n = r.length; t < n; t++)
          r[t].resume();
      }
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++)
        s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Z;
      try {
        return Z = this, t();
      } finally {
        Z = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Z, Z = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Z === this)
        Z = this.prevScope;
      else {
        let t = Z;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const r = this.scopes.slice();
        for (n = 0, s = r.length; n < s; n++)
          r[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Pi() {
  return Z;
}
let k;
const Mn = /* @__PURE__ */ new WeakSet();
class hr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Z && (Z.active ? Z.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Mn.has(this) && (Mn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || gr(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, As(this), _r(this);
    const t = k, n = be;
    k = this, be = !0;
    try {
      return this.fn();
    } finally {
      mr(this), k = t, be = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        os(t);
      this.deps = this.depsTail = void 0, As(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Mn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    $n(this) && this.run();
  }
  get dirty() {
    return $n(this);
  }
}
let pr = 0, wt, Ct;
function gr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Ct, Ct = e;
    return;
  }
  e.next = wt, wt = e;
}
function rs() {
  pr++;
}
function is() {
  if (--pr > 0)
    return;
  if (Ct) {
    let t = Ct;
    for (Ct = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; wt; ) {
    let t = wt;
    for (wt = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function _r(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function mr(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), os(s), Ii(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function $n(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (yr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function yr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ot) || (e.globalVersion = Ot, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !$n(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = k, s = be;
  k = e, be = !0;
  try {
    _r(e);
    const r = e.fn(e._value);
    (t.version === 0 || Pe(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    k = n, be = s, mr(e), e.flags &= -3;
  }
}
function os(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      os(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ii(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let be = !0;
const br = [];
function Fe() {
  br.push(be), be = !1;
}
function De() {
  const e = br.pop();
  be = e === void 0 ? !0 : e;
}
function As(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = k;
    k = void 0;
    try {
      t();
    } finally {
      k = n;
    }
  }
}
let Ot = 0;
class Fi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ls {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!k || !be || k === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== k)
      n = this.activeLink = new Fi(k, this), k.deps ? (n.prevDep = k.depsTail, k.depsTail.nextDep = n, k.depsTail = n) : k.deps = k.depsTail = n, xr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = k.depsTail, n.nextDep = void 0, k.depsTail.nextDep = n, k.depsTail = n, k.deps === n && (k.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ot++, this.notify(t);
  }
  notify(t) {
    rs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      is();
    }
  }
}
function xr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        xr(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Qt = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ Symbol(
  ""
), Kn = /* @__PURE__ */ Symbol(
  ""
), At = /* @__PURE__ */ Symbol(
  ""
);
function ne(e, t, n) {
  if (be && k) {
    let s = Qt.get(e);
    s || Qt.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ls()), r.map = s, r.key = n), r.track();
  }
}
function Le(e, t, n, s, r, i) {
  const o = Qt.get(e);
  if (!o) {
    Ot++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (rs(), t === "clear")
    o.forEach(l);
  else {
    const c = M(e), d = c && dn(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((p, C) => {
        (C === "length" || C === At || !pe(C) && C >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(At)), t) {
        case "add":
          c ? d && l(o.get("length")) : (l(o.get(it)), Ge(e) && l(o.get(Kn)));
          break;
        case "delete":
          c || (l(o.get(it)), Ge(e) && l(o.get(Kn)));
          break;
        case "set":
          Ge(e) && l(o.get(it));
          break;
      }
  }
  is();
}
function Di(e, t) {
  const n = Qt.get(e);
  return n && n.get(t);
}
function ot(e) {
  const t = /* @__PURE__ */ H(e);
  return t === e || (ne(t, "iterate", At), /* @__PURE__ */ he(e)) ? t : /* @__PURE__ */ Ne(e) ? /* @__PURE__ */ Je(e) ? t.map((n) => ze(ge(n))) : t.map(ze) : t.map(ge);
}
function mn(e) {
  return ne(e = /* @__PURE__ */ H(e), "iterate", At), e;
}
function Ae(e, t) {
  return /* @__PURE__ */ Ne(e) ? ze(/* @__PURE__ */ Je(e) ? ge(t) : t) : ge(t);
}
const Ni = {
  __proto__: null,
  [Symbol.iterator]() {
    return Rn(this, Symbol.iterator, (e) => Ae(this, e));
  },
  concat(...e) {
    return ot(this).concat(
      ...e.map((t) => M(t) ? ot(t) : t)
    );
  },
  entries() {
    return Rn(this, "entries", (e) => (e[1] = Ae(this, e[1]), e));
  },
  every(e, t) {
    return je(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return je(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Ae(this, s)),
      arguments
    );
  },
  find(e, t) {
    return je(
      this,
      "find",
      e,
      t,
      (n) => Ae(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return je(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return je(
      this,
      "findLast",
      e,
      t,
      (n) => Ae(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return je(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return je(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Pn(this, "includes", e);
  },
  indexOf(...e) {
    return Pn(this, "indexOf", e);
  },
  join(e) {
    return ot(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Pn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return je(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return mt(this, "pop");
  },
  push(...e) {
    return mt(this, "push", e);
  },
  reduce(e, ...t) {
    return Rs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Rs(this, "reduceRight", e, t);
  },
  shift() {
    return mt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return je(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return mt(this, "splice", e);
  },
  toReversed() {
    return ot(this).toReversed();
  },
  toSorted(e) {
    return ot(this).toSorted(e);
  },
  toSpliced(...e) {
    return ot(this).toSpliced(...e);
  },
  unshift(...e) {
    return mt(this, "unshift", e);
  },
  values() {
    return Rn(this, "values", (e) => Ae(this, e));
  }
};
function Rn(e, t, n) {
  const s = mn(e), r = s[t], i = r.call(s);
  if (s !== e && !/* @__PURE__ */ he(e)) {
    if (i[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(i));
      return o.next = () => Ms(i.next(), n), r !== vr[t] && Object.defineProperties(o, {
        return: {
          get() {
            const l = i.return;
            return typeof l == "function" ? l.bind(i) : l;
          }
        },
        throw: {
          get() {
            const l = i.throw;
            return typeof l == "function" ? l.bind(i) : l;
          }
        }
      }), o;
    }
    i._next = i.next, i.next = () => Ms(i._next(), n);
  }
  return i;
}
function Ms(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const vr = Array.prototype;
function je(e, t, n, s, r, i) {
  const o = mn(e), l = o !== e && !/* @__PURE__ */ he(e), c = o[t];
  if (c !== vr[t]) {
    const p = c.apply(e, i);
    return l ? ge(p) : p;
  }
  let d = n;
  o !== e && (l ? d = function(p, C) {
    return n.call(this, Ae(e, p), C, e);
  } : n.length > 2 && (d = function(p, C) {
    return n.call(this, p, C, e);
  }));
  const a = c.call(o, d, s);
  return l && r ? r(a) : a;
}
function Rs(e, t, n, s) {
  const r = mn(e), i = r !== e && !/* @__PURE__ */ he(e);
  let o = n, l = !1;
  r !== e && (i ? (l = s.length === 0, o = function(d, a, p) {
    return l && (l = !1, d = Ae(e, d)), n.call(this, d, Ae(e, a), p, e);
  }) : n.length > 3 && (o = function(d, a, p) {
    return n.call(this, d, a, p, e);
  }));
  const c = r[t](o, ...s);
  return l ? Ae(e, c) : c;
}
function Pn(e, t, n) {
  const s = /* @__PURE__ */ H(e);
  ne(s, "iterate", At);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ yn(n[0]) ? (n[0] = /* @__PURE__ */ H(n[0]), s[t](...n)) : r;
}
function mt(e, t, n = []) {
  Fe(), rs();
  const s = (/* @__PURE__ */ H(e))[t].apply(e, n);
  return is(), De(), s;
}
const ji = /* @__PURE__ */ Qn("__proto__,__v_isRef,__isVue"), Sr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(pe)
);
function Vi(e) {
  pe(e) || (e = String(e));
  const t = /* @__PURE__ */ H(this);
  return ne(t, "has", e), t.hasOwnProperty(e);
}
class wr {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return s === (r ? i ? Gi : Or : i ? Er : Tr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = M(t);
    if (!r) {
      let c;
      if (o && (c = Ni[n]))
        return c;
      if (n === "hasOwnProperty")
        return Vi;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Y(t) ? t : s
    );
    if ((pe(n) ? Sr.has(n) : ji(n)) || (r || ne(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ Y(l)) {
      const c = o && dn(n) ? l : l.value;
      return r && $(c) ? /* @__PURE__ */ Wn(c) : c;
    }
    return $(l) ? r ? /* @__PURE__ */ Wn(l) : /* @__PURE__ */ cs(l) : l;
  }
}
class Cr extends wr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = M(t) && dn(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Ne(i);
      if (!/* @__PURE__ */ he(s) && !/* @__PURE__ */ Ne(s) && (i = /* @__PURE__ */ H(i), s = /* @__PURE__ */ H(s)), !o && /* @__PURE__ */ Y(i) && !/* @__PURE__ */ Y(s))
        return d || (i.value = s), !0;
    }
    const l = o ? Number(n) < t.length : L(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Y(t) ? t : r
    );
    return t === /* @__PURE__ */ H(r) && c && (l ? Pe(s, i) && Le(t, "set", n, s) : Le(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = L(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Le(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!pe(n) || !Sr.has(n)) && ne(t, "has", n), s;
  }
  ownKeys(t) {
    return ne(
      t,
      "iterate",
      M(t) ? "length" : it
    ), Reflect.ownKeys(t);
  }
}
class Hi extends wr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Li = /* @__PURE__ */ new Cr(), $i = /* @__PURE__ */ new Hi(), Ki = /* @__PURE__ */ new Cr(!0);
const Un = (e) => e, Kt = (e) => Reflect.getPrototypeOf(e);
function Ui(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ H(r), o = Ge(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = r[e](...s), a = n ? Un : t ? ze : ge;
    return !t && ne(
      i,
      "iterate",
      c ? Kn : it
    ), te(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: p, done: C } = d.next();
          return C ? { value: p, done: C } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: C
          };
        }
      }
    );
  };
}
function Ut(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Wi(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ H(i), l = /* @__PURE__ */ H(r);
      e || (Pe(r, l) && ne(o, "get", r), ne(o, "get", l));
      const { has: c } = Kt(o), d = t ? Un : e ? ze : ge;
      if (c.call(o, r))
        return d(i.get(r));
      if (c.call(o, l))
        return d(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && ne(/* @__PURE__ */ H(r), "iterate", it), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ H(i), l = /* @__PURE__ */ H(r);
      return e || (Pe(r, l) && ne(o, "has", r), ne(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ H(l), d = t ? Un : e ? ze : ge;
      return !e && ne(c, "iterate", it), l.forEach((a, p) => r.call(i, d(a), d(p), o));
    }
  };
  return te(
    n,
    e ? {
      add: Ut("add"),
      set: Ut("set"),
      delete: Ut("delete"),
      clear: Ut("clear")
    } : {
      add(r) {
        const i = /* @__PURE__ */ H(this), o = Kt(i), l = /* @__PURE__ */ H(r), c = !t && !/* @__PURE__ */ he(r) && !/* @__PURE__ */ Ne(r) ? l : r;
        return o.has.call(i, c) || Pe(r, c) && o.has.call(i, r) || Pe(l, c) && o.has.call(i, l) || (i.add(c), Le(i, "add", c, c)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ he(i) && !/* @__PURE__ */ Ne(i) && (i = /* @__PURE__ */ H(i));
        const o = /* @__PURE__ */ H(this), { has: l, get: c } = Kt(o);
        let d = l.call(o, r);
        d || (r = /* @__PURE__ */ H(r), d = l.call(o, r));
        const a = c.call(o, r);
        return o.set(r, i), d ? Pe(i, a) && Le(o, "set", r, i) : Le(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ H(this), { has: o, get: l } = Kt(i);
        let c = o.call(i, r);
        c || (r = /* @__PURE__ */ H(r), c = o.call(i, r)), l && l.call(i, r);
        const d = i.delete(r);
        return c && Le(i, "delete", r, void 0), d;
      },
      clear() {
        const r = /* @__PURE__ */ H(this), i = r.size !== 0, o = r.clear();
        return i && Le(
          r,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Ui(r, e, t);
  }), n;
}
function fs(e, t) {
  const n = Wi(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_isShallow" ? t : r === "__v_raw" ? s : Reflect.get(
    L(n, r) && r in s ? n : s,
    r,
    i
  );
}
const Bi = {
  get: /* @__PURE__ */ fs(!1, !1)
}, qi = {
  get: /* @__PURE__ */ fs(!1, !0)
}, ki = {
  get: /* @__PURE__ */ fs(!0, !1)
};
const Tr = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap();
function Ji(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function cs(e) {
  return /* @__PURE__ */ Ne(e) ? e : us(
    e,
    !1,
    Li,
    Bi,
    Tr
  );
}
// @__NO_SIDE_EFFECTS__
function zi(e) {
  return us(
    e,
    !1,
    Ki,
    qi,
    Er
  );
}
// @__NO_SIDE_EFFECTS__
function Wn(e) {
  return us(
    e,
    !0,
    $i,
    ki,
    Or
  );
}
function us(e, t, n, s, r) {
  if (!$(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = Ji(yi(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? s : n
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  return /* @__PURE__ */ Ne(e) ? /* @__PURE__ */ Je(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ne(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function he(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function yn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function H(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ H(t) : e;
}
function Yi(e) {
  return !L(e, "__v_skip") && Object.isExtensible(e) && cr(e, "__v_skip", !0), e;
}
const ge = (e) => $(e) ? /* @__PURE__ */ cs(e) : e, ze = (e) => $(e) ? /* @__PURE__ */ Wn(e) : e;
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function zt(e) {
  return Ar(e, !1);
}
// @__NO_SIDE_EFFECTS__
function sf(e) {
  return Ar(e, !0);
}
function Ar(e, t) {
  return /* @__PURE__ */ Y(e) ? e : new Xi(e, t);
}
class Xi {
  constructor(t, n) {
    this.dep = new ls(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ H(t), this._value = n ? t : ge(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ he(t) || /* @__PURE__ */ Ne(t);
    t = s ? t : /* @__PURE__ */ H(t), Pe(t, n) && (this._rawValue = t, this._value = s ? t : ge(t), this.dep.trigger());
  }
}
function Mr(e) {
  return /* @__PURE__ */ Y(e) ? e.value : e;
}
const Zi = {
  get: (e, t, n) => t === "__v_raw" ? e : Mr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ Y(r) && !/* @__PURE__ */ Y(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Rr(e) {
  return /* @__PURE__ */ Je(e) ? e : new Proxy(e, Zi);
}
class Qi {
  constructor(t, n, s) {
    this._object = t, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._key = pe(n) ? n : String(n), this._raw = /* @__PURE__ */ H(t);
    let r = !0, i = t;
    if (!M(t) || pe(this._key) || !dn(this._key))
      do
        r = !/* @__PURE__ */ yn(i) || /* @__PURE__ */ he(i);
      while (r && (i = i.__v_raw));
    this._shallow = r;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = Mr(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ Y(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ Y(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Di(this._raw, this._key);
  }
}
class eo {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function rf(e, t, n) {
  return /* @__PURE__ */ Y(e) ? e : I(e) ? new eo(e) : $(e) && arguments.length > 1 ? to(e, t, n) : /* @__PURE__ */ zt(e);
}
function to(e, t, n) {
  return new Qi(e, t, n);
}
class no {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ls(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ot - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    k !== this)
      return gr(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return yr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function so(e, t, n = !1) {
  let s, r;
  return I(e) ? s = e : (s = e.get, r = e.set), new no(s, r, n);
}
const Wt = {}, en = /* @__PURE__ */ new WeakMap();
let st;
function ro(e, t = !1, n = st) {
  if (n) {
    let s = en.get(n);
    s || en.set(n, s = []), s.push(e);
  }
}
function io(e, t, n = B) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n, d = (E) => r ? E : /* @__PURE__ */ he(E) || r === !1 || r === 0 ? $e(E, 1) : $e(E);
  let a, p, C, T, R = !1, w = !1;
  if (/* @__PURE__ */ Y(e) ? (p = () => e.value, R = /* @__PURE__ */ he(e)) : /* @__PURE__ */ Je(e) ? (p = () => d(e), R = !0) : M(e) ? (w = !0, R = e.some((E) => /* @__PURE__ */ Je(E) || /* @__PURE__ */ he(E)), p = () => e.map((E) => {
    if (/* @__PURE__ */ Y(E))
      return E.value;
    if (/* @__PURE__ */ Je(E))
      return d(E);
    if (I(E))
      return c ? c(E, 2) : E();
  })) : I(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (C) {
      Fe();
      try {
        C();
      } finally {
        De();
      }
    }
    const E = st;
    st = a;
    try {
      return c ? c(e, 3, [T]) : e(T);
    } finally {
      st = E;
    }
  } : p = Ie, t && r) {
    const E = p, N = r === !0 ? 1 / 0 : r;
    p = () => $e(E(), N);
  }
  const K = Pi(), j = () => {
    a.stop(), K && K.active && es(K.effects, a);
  };
  if (i && t) {
    const E = t;
    t = (...N) => {
      try {
        return E(...N);
      } finally {
        j();
      }
    };
  }
  let F = w ? new Array(e.length).fill(Wt) : Wt;
  const D = (E) => {
    if (!(!(a.flags & 1) || !a.dirty && !E))
      if (t) {
        const N = a.run();
        if (E || r || R || (w ? N.some((Se, we) => Pe(Se, F[we])) : Pe(N, F))) {
          const Se = st;
          Fe();
          try {
            C && C(), st = a;
            const we = [
              N,
              // pass undefined as the old value when it's changed for the first time
              F === Wt ? void 0 : w && F[0] === Wt ? [] : F,
              T
            ];
            F = N, c ? c(t, 3, we) : (
              // @ts-expect-error
              t(...we)
            );
          } finally {
            st = Se, De();
          }
        }
      } else
        a.run();
  };
  return l && l(D), a = new hr(p), a.scheduler = o ? () => o(D, !1) : D, T = (E) => ro(E, !1, a), C = a.onStop = () => {
    const E = en.get(a);
    if (E) {
      if (c)
        c(E, 4);
      else
        for (const N of E) N();
      en.delete(a);
    }
  }, t ? s ? D(!0) : F = a.run() : o ? o(D.bind(null, !0), !0) : a.run(), j.pause = a.pause.bind(a), j.resume = a.resume.bind(a), j.stop = j, j;
}
function $e(e, t = 1 / 0, n) {
  if (t <= 0 || !$(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Y(e))
    $e(e.value, t, n);
  else if (M(e))
    for (let s = 0; s < e.length; s++)
      $e(e[s], t, n);
  else if (We(e) || Ge(e))
    e.forEach((s) => {
      $e(s, t, n);
    });
  else if (fr(e)) {
    for (const s in e)
      $e(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && $e(e[s], t, n);
  }
  return e;
}
function Ft(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Dt(r, t, n);
  }
}
function ve(e, t, n, s) {
  if (I(e)) {
    const r = Ft(e, t, n, s);
    return r && or(r) && r.catch((i) => {
      Dt(i, t, n);
    }), r;
  }
  if (M(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(ve(e[i], t, n, s));
    return r;
  }
}
function Dt(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || B;
  if (t) {
    let l = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, c, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Fe(), Ft(i, null, 10, [
        e,
        c,
        d
      ]), De();
      return;
    }
  }
  oo(e, n, r, s, o);
}
function oo(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const ie = [];
let ye = -1;
const Me = [];
let ke = null, lt = 0;
const Pr = /* @__PURE__ */ Promise.resolve();
let tn = null;
function Ir(e) {
  const t = tn || Pr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function lo(e) {
  let t = ye + 1, n = ie.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = ie[s], i = Mt(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function as(e) {
  if (!(e.flags & 1)) {
    const t = Mt(e), n = ie[ie.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Mt(n) ? ie.push(e) : ie.splice(lo(t), 0, e), e.flags |= 1, Fr();
  }
}
function Fr() {
  tn || (tn = Pr.then(jr));
}
function fo(e) {
  if (!M(e))
    ke && e.id === -1 ? ke.splice(lt + 1, 0, e) : e.flags & 1 || (Me.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Me.push(e[t]);
  Fr();
}
function Dr(e, t, n, s = ye + 1) {
  for (; s < ie.length; s++) {
    const r = ie[s];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid || t !== void 0 && !(r.id >= t))
        continue;
      ie.splice(s, 1), s = e ? s - 1 : ye, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Nr(e, t, n = 0) {
  if (Me.length) {
    let s = Me, r = 0;
    if (t) {
      s = [];
      for (let o = 0; o < Me.length; o++) {
        const l = Me[o];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? Me[r++] = l : s.push(l);
      }
    }
    const i = [...new Set(s)].sort((o, l) => Mt(o) - Mt(l));
    if (Me.length = r, ke) {
      for (let o = 0; o < i.length; o++)
        ke.push(i[o]);
      return;
    }
    for (ke = i, lt = 0; lt < ke.length; lt++) {
      const o = ke[lt];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    ke = null, lt = 0;
  }
}
let In = !1;
function co(e, t) {
  if (In) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(Me);
  e(), In = !0;
  try {
    Dr(void 0, t), Nr(void 0, n, t);
  } finally {
    In = !1;
  }
}
const Mt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function jr(e) {
  try {
    for (ye = 0; ye < ie.length; ye++) {
      const t = ie[ye];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ft(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ye < ie.length; ye++) {
      const t = ie[ye];
      t && (t.flags &= -2);
    }
    ye = -1, ie.length = 0, Nr(), tn = null, (ie.length || Me.length) && jr();
  }
}
let ee = null, Vr = null;
function nn(e) {
  const t = ee;
  return ee = e, Vr = e && e.type.__scopeId || null, t;
}
function uo(e, t = ee, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Ws(-1);
    const i = nn(t), o = Ue.length;
    let l;
    try {
      l = e(...r);
    } finally {
      for (let c = Ue.length; c > o; c--) _s();
      nn(i), s._d && Ws(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function of(e, t) {
  if (ee === null)
    return e;
  const n = Tn(ee), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = B] = t[r];
    i && (I(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && $e(o), s.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function tt(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[s];
    c && (Fe(), ve(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), De());
  }
}
function ao(e, t) {
  if (Q) {
    let n = Q.provides;
    const s = Q.parent && Q.parent.provides;
    s === n && (n = Q.provides = Object.create(s)), n[e] = t;
  }
}
function Yt(e, t, n = !1) {
  const s = hl();
  if (s || ct) {
    let r = ct ? ct._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && I(t) ? t.call(s && s.proxy) : t;
  }
}
const ho = /* @__PURE__ */ Symbol.for("v-scx"), po = () => Yt(ho);
function Fn(e, t, n) {
  return Hr(e, t, n);
}
function Hr(e, t, n = B) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = te({}, n), c = t && s || !t && i !== "post";
  let d;
  if (at) {
    if (i === "sync") {
      const T = po();
      d = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!c) {
      const T = () => {
      };
      return T.stop = Ie, T.resume = Ie, T.pause = Ie, T;
    }
  }
  const a = Q;
  l.call = (T, R, w) => ve(T, a, R, w);
  let p = !1;
  i === "post" ? l.scheduler = (T) => {
    T.i = a, le(T, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (T, R) => {
    R ? T() : as(T);
  }), l.augmentJob = (T) => {
    t && (T.flags |= 4), p && (T.flags |= 2, a && (T.id = a.uid, T.i = a));
  };
  const C = io(e, t, l);
  return at && (d ? d.push(C) : c && C()), C;
}
function go(e, t, n) {
  const s = this.proxy, r = J(e) ? e.includes(".") ? Lr(s, e) : () => s[e] : e.bind(s, s);
  let i;
  I(t) ? i = t : (i = t.handler, n = t);
  const o = Nt(this), l = Hr(r, i.bind(s), n);
  return o(), l;
}
function Lr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const _o = /* @__PURE__ */ Symbol("_vte"), bn = (e) => e.__isTeleport, Dn = /* @__PURE__ */ Symbol("_leaveCb");
function mo(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== _e) {
        t = n;
        break;
      }
  }
  return t;
}
function $r(e) {
  if (!xn(e))
    return bn(e.type) && e.children ? mo(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && I(n.default))
      return n.default();
  }
}
function sn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    sn(
      bn(n.type) && $r(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === fe && M(e.children)) {
    const n = Jr(e.children, !1);
    n && sn(n, t);
  }
}
function Bn(e) {
  if (e.component)
    return Bn(e.component.subTree);
  if (e.type === fe) {
    const t = M(e.children) && Jr(e.children, !1);
    return t ? Bn(t) : void 0;
  }
  if (e.type !== _e)
    return e;
}
// @__NO_SIDE_EFFECTS__
function yo(e, t) {
  return I(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    te({ name: e.name }, t, { setup: e })
  ) : e;
}
function ds(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ps(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const rn = /* @__PURE__ */ new WeakMap();
function Tt(e, t, n, s, r = !1) {
  if (M(e)) {
    e.forEach(
      (w, K) => Tt(
        w,
        t && (M(t) ? t[K] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (ft(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Tt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Tn(s.component) : s.el, o = r ? null : i, { i: l, r: c } = e, d = t && t.r, a = l.refs === B ? l.refs = {} : l.refs, p = l.setupState, C = /* @__PURE__ */ H(p), T = p === B ? ir : (w) => Ps(a, w) ? !1 : L(C, w), R = (w, K) => !(K && Ps(a, K));
  if (d != null && d !== c) {
    if (Is(t), J(d))
      a[d] = null, T(d) && (p[d] = null);
    else if (/* @__PURE__ */ Y(d)) {
      const w = t;
      R(d, w.k) && (d.value = null), w.k && (a[w.k] = null);
    }
  }
  if (I(c))
    Ft(c, l, 12, [o, a]);
  else {
    const w = J(c), K = /* @__PURE__ */ Y(c);
    if (w || K) {
      const j = () => {
        if (e.f) {
          const F = w ? T(c) ? p[c] : a[c] : R() || !e.k ? c.value : a[e.k];
          if (r)
            M(F) && es(F, i);
          else if (M(F))
            F.includes(i) || F.push(i);
          else if (w)
            a[c] = [i], T(c) && (p[c] = a[c]);
          else {
            const D = [i];
            R(c, e.k) && (c.value = D), e.k && (a[e.k] = D);
          }
        } else w ? (a[c] = o, T(c) && (p[c] = o)) : K && (R(c, e.k) && (c.value = o), e.k && (a[e.k] = o));
      };
      if (o) {
        const F = () => {
          j(), rn.delete(e);
        };
        F.id = -1, rn.set(e, F), le(F, n);
      } else
        Is(e), j();
    }
  }
}
function Is(e) {
  const t = rn.get(e);
  t && (t.flags |= 8, rn.delete(e));
}
const Fs = (e) => e.nodeType === 8;
_n().requestIdleCallback;
_n().cancelIdleCallback;
function bo(e, t) {
  if (Fs(e) && e.data === "[") {
    let n = 1, s = e.nextSibling;
    for (; s; ) {
      if (s.nodeType === 1) {
        if (t(s) === !1)
          break;
      } else if (Fs(s))
        if (s.data === "]") {
          if (--n === 0) break;
        } else s.data === "[" && n++;
      s = s.nextSibling;
    }
  } else
    t(e);
}
const ft = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function lf(e) {
  I(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: s,
    delay: r = 200,
    hydrate: i,
    timeout: o,
    // undefined = never times out
    suspensible: l = !0,
    onError: c
  } = e;
  let d = null, a, p = 0;
  const C = () => (p++, d = null, T()), T = () => {
    let R;
    return d || (R = d = t().catch((w) => {
      if (w = w instanceof Error ? w : new Error(String(w)), c)
        return new Promise((K, j) => {
          c(w, () => K(C()), () => j(w), p + 1);
        });
      throw w;
    }).then((w) => R !== d && d ? d : (w && (w.__esModule || w[Symbol.toStringTag] === "Module") && (w = w.default), a = w, w)));
  };
  return /* @__PURE__ */ yo({
    name: "AsyncComponentWrapper",
    __asyncLoader: T,
    __asyncHydrate(R, w, K) {
      const j = R.isConnected;
      let F = !1;
      (w.bu || (w.bu = [])).push(() => F = !0);
      const D = () => {
        F || !R.parentNode || j && !R.isConnected || K();
      }, E = i ? () => {
        const N = i(
          D,
          (Se) => bo(R, Se)
        );
        N && (w.bum || (w.bum = [])).push(N);
      } : D;
      a ? E() : T().then(() => !w.isUnmounted && E());
    },
    get __asyncResolved() {
      return a;
    },
    setup() {
      const R = Q;
      if (ds(R), a)
        return () => Bt(a, R);
      const w = (N) => {
        d = null, Dt(
          N,
          R,
          13,
          !s
        );
      };
      if (l && R.suspense || at)
        return T().then((N) => () => Bt(N, R)).catch((N) => (w(N), () => s ? ce(s, {
          error: N
        }) : null));
      const K = /* @__PURE__ */ zt(!1), j = /* @__PURE__ */ zt(), F = /* @__PURE__ */ zt(!!r);
      let D, E;
      return hs(() => {
        D != null && clearTimeout(D), E != null && clearTimeout(E);
      }), r && (E = setTimeout(() => {
        R.isUnmounted || (F.value = !1);
      }, r)), o != null && (D = setTimeout(() => {
        if (!R.isUnmounted && !K.value && !j.value) {
          const N = new Error(
            `Async component timed out after ${o}ms.`
          );
          w(N), j.value = N;
        }
      }, o)), T().then(() => {
        R.isUnmounted || (K.value = !0, R.parent && xn(R.parent.vnode) && R.parent.update());
      }).catch((N) => {
        if (R.isUnmounted) {
          d = null;
          return;
        }
        w(N), j.value = N;
      }), () => {
        if (K.value && a)
          return Bt(a, R);
        if (j.value && s)
          return ce(s, {
            error: j.value
          });
        if (n && !F.value)
          return Bt(
            n,
            R
          );
      };
    }
  });
}
function Bt(e, t) {
  const { ref: n, props: s, children: r, ce: i } = t.vnode, o = ce(e, s, r);
  return o.ref = n, o.ce = i, delete t.vnode.ce, o;
}
const xn = (e) => e.type.__isKeepAlive;
function xo(e, t) {
  Kr(e, "a", t);
}
function vo(e, t) {
  Kr(e, "da", t);
}
function Kr(e, t, n = Q) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (vn(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      xn(r.parent.vnode) && So(s, t, n, r), r = r.parent;
  }
}
function So(e, t, n, s) {
  const r = vn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  hs(() => {
    es(s[t], r);
  }, n);
}
function vn(e, t, n = Q, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Fe();
      const l = Nt(n), c = ve(t, n, e, o);
      return l(), De(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Be = (e) => (t, n = Q) => {
  (!at || e === "sp") && vn(e, (...s) => t(...s), n);
}, wo = Be("bm"), Co = Be("m"), To = Be(
  "bu"
), Eo = Be("u"), Oo = Be(
  "bum"
), hs = Be("um"), Ao = Be(
  "sp"
), Mo = Be("rtg"), Ro = Be("rtc");
function Po(e, t = Q) {
  vn("ec", e, t);
}
const Io = "components", Ur = /* @__PURE__ */ Symbol.for("v-ndc");
function ff(e) {
  return J(e) ? Fo(Io, e, !1) || e : e || Ur;
}
function Fo(e, t, n = !0, s = !1) {
  const r = ee || Q;
  if (r) {
    const i = r.type;
    {
      const l = yl(
        i,
        !1
      );
      if (l && (l === t || l === oe(t) || l === pn(oe(t))))
        return i;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ds(r[e] || i[e], t) || // global registration
      Ds(r.appContext[e], t)
    );
    return !o && s ? i : o;
  }
}
function Ds(e, t) {
  return e && (e[t] || e[oe(t)] || e[pn(oe(t))]);
}
function cf(e, t, n, s) {
  let r;
  const i = n, o = M(e);
  if (o || J(e)) {
    const l = o && /* @__PURE__ */ Je(e);
    let c = !1, d = !1;
    l && (c = !/* @__PURE__ */ he(e), d = /* @__PURE__ */ Ne(e), e = mn(e)), r = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      r[a] = t(
        c ? d ? ze(ge(e[a])) : ge(e[a]) : e[a],
        a,
        void 0,
        i
      );
  } else if (typeof e == "number")
    if (!Number.isInteger(e) || e < 0)
      r = [];
    else {
      r = new Array(e);
      for (let l = 0; l < e; l++)
        r[l] = t(l + 1, l, void 0, i);
    }
  else if ($(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, d = l.length; c < d; c++) {
        const a = l[c];
        r[c] = t(e[a], a, c, i);
      }
    }
  else
    r = [];
  return r;
}
function uf(e, t, n, s, r, i) {
  if (n == null && (n = {}), ee.ce || ee.parent && ft(ee.parent) && ee.parent.ce) {
    const d = n, a = Object.keys(d).length > 0;
    return Yn(), Xn(
      fe,
      null,
      [ce("slot", d, s)],
      a ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1);
  const l = Ue.length;
  Yn();
  let c;
  try {
    const d = o && Wr(o(n)), a = n.key || i || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    c = Xn(
      fe,
      {
        key: (a && !pe(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && s ? "_fb" : "")
      },
      d || (s ? s() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let a = Ue.length; a > l; a--) _s();
    throw d;
  } finally {
    o && o._c && (o._d = !0);
  }
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function Wr(e) {
  return e.some((t) => Cn(t) ? !(t.type === _e || t.type === fe && !Wr(t.children)) : !0) ? e : null;
}
const qn = (e) => e ? ai(e) ? Tn(e) : qn(e.parent) : null, Et = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ te(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => qn(e.parent),
    $root: (e) => qn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => qr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      as(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ir.bind(e.proxy)),
    $watch: (e) => go.bind(e)
  })
), Nn = (e, t) => e !== B && !e.__isScriptSetup && L(e, t), Do = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const C = o[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (Nn(s, t))
          return o[t] = 1, s[t];
        if (r !== B && L(r, t))
          return o[t] = 2, r[t];
        if (L(i, t))
          return o[t] = 3, i[t];
        if (n !== B && L(n, t))
          return o[t] = 4, n[t];
        kn && (o[t] = 0);
      }
    }
    const d = Et[t];
    let a, p;
    if (d)
      return t === "$attrs" && ne(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== B && L(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, L(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Nn(r, t) ? (r[t] = n, !0) : s !== B && L(s, t) ? (s[t] = n, !0) : L(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== B && l[0] !== "$" && L(e, l) || Nn(t, l) || L(i, l) || L(s, l) || L(Et, l) || L(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : L(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ns(e) {
  return M(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let kn = !0;
function No(e) {
  const t = qr(e), n = e.proxy, s = e.ctx;
  kn = !1, t.beforeCreate && js(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: d,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: C,
    beforeUpdate: T,
    updated: R,
    activated: w,
    deactivated: K,
    beforeDestroy: j,
    beforeUnmount: F,
    destroyed: D,
    unmounted: E,
    render: N,
    renderTracked: Se,
    renderTriggered: we,
    errorCaptured: qe,
    serverPrefetch: jt,
    // public API
    expose: Ze,
    inheritAttrs: ht,
    // assets
    components: Vt,
    directives: Ht,
    filters: En
  } = t;
  if (d && jo(d, s, null), o)
    for (const G in o) {
      const q = o[G];
      I(q) && (s[G] = q.bind(n));
    }
  if (r) {
    const G = r.call(n, n);
    $(G) && (e.data = /* @__PURE__ */ cs(G));
  }
  if (kn = !0, i)
    for (const G in i) {
      const q = i[G], Qe = I(q) ? q.bind(n, n) : I(q.get) ? q.get.bind(n, n) : Ie, Lt = !I(q) && I(q.set) ? q.set.bind(n) : Ie, et = xl({
        get: Qe,
        set: Lt
      });
      Object.defineProperty(s, G, {
        enumerable: !0,
        configurable: !0,
        get: () => et.value,
        set: (me) => et.value = me
      });
    }
  if (l)
    for (const G in l)
      Br(l[G], s, n, G);
  if (c) {
    const G = I(c) ? c.call(n) : c;
    Reflect.ownKeys(G).forEach((q) => {
      ao(q, G[q]);
    });
  }
  a && js(a, e, "c");
  function se(G, q) {
    M(q) ? q.forEach((Qe) => G(Qe.bind(n))) : q && G(q.bind(n));
  }
  if (se(wo, p), se(Co, C), se(To, T), se(Eo, R), se(xo, w), se(vo, K), se(Po, qe), se(Ro, Se), se(Mo, we), se(Oo, F), se(hs, E), se(Ao, jt), M(Ze))
    if (Ze.length) {
      const G = e.exposed || (e.exposed = {});
      Ze.forEach((q) => {
        Object.defineProperty(G, q, {
          get: () => n[q],
          set: (Qe) => n[q] = Qe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  N && e.render === Ie && (e.render = N), ht != null && (e.inheritAttrs = ht), Vt && (e.components = Vt), Ht && (e.directives = Ht), jt && ds(e);
}
function jo(e, t, n = Ie) {
  M(e) && (e = Gn(e));
  for (const s in e) {
    const r = e[s];
    let i;
    $(r) ? "default" in r ? i = Yt(
      r.from || s,
      r.default,
      !0
    ) : i = Yt(r.from || s) : i = Yt(r), /* @__PURE__ */ Y(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function js(e, t, n) {
  ve(
    M(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Br(e, t, n, s) {
  let r = s.includes(".") ? Lr(n, s) : () => n[s];
  if (J(e)) {
    const i = t[e];
    I(i) && Fn(r, i);
  } else if (I(e))
    Fn(r, e.bind(n));
  else if ($(e))
    if (M(e))
      e.forEach((i) => Br(i, t, n, s));
    else {
      const i = I(e.handler) ? e.handler.bind(n) : t[e.handler];
      I(i) && Fn(r, i, e);
    }
}
function qr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (d) => on(c, d, o, !0)
  ), on(c, t, o)), $(t) && i.set(t, c), c;
}
function on(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && on(e, i, n, !0), r && r.forEach(
    (o) => on(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = Vo[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Vo = {
  data: Vs,
  props: Hs,
  emits: Hs,
  // objects
  methods: xt,
  computed: xt,
  // lifecycle
  beforeCreate: re,
  created: re,
  beforeMount: re,
  mounted: re,
  beforeUpdate: re,
  updated: re,
  beforeDestroy: re,
  beforeUnmount: re,
  destroyed: re,
  unmounted: re,
  activated: re,
  deactivated: re,
  errorCaptured: re,
  serverPrefetch: re,
  // assets
  components: xt,
  directives: xt,
  // watch
  watch: Lo,
  // provide / inject
  provide: Vs,
  inject: Ho
};
function Vs(e, t) {
  return t ? e ? function() {
    return te(
      I(e) ? e.call(this, this) : e,
      I(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ho(e, t) {
  return xt(Gn(e), Gn(t));
}
function Gn(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function re(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function xt(e, t) {
  return e ? te(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Hs(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : te(
    /* @__PURE__ */ Object.create(null),
    Ns(e),
    Ns(t ?? {})
  ) : t;
}
function Lo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = te(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = re(e[s], t[s]);
  return n;
}
function kr() {
  return {
    app: null,
    config: {
      isNativeTag: ir,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let $o = 0;
function Ko(e, t) {
  return function(s, r = null) {
    I(s) || (s = te({}, s)), r != null && !$(r) && (r = null);
    const i = kr(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = i.app = {
      _uid: $o++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: vl,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && I(a.install) ? (o.add(a), a.install(d, ...p)) : I(a) && (o.add(a), a(d, ...p))), d;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), d;
      },
      component(a, p) {
        return p ? (i.components[a] = p, d) : i.components[a];
      },
      directive(a, p) {
        return p ? (i.directives[a] = p, d) : i.directives[a];
      },
      mount(a, p, C) {
        if (!c) {
          const T = d._ceVNode || ce(s, r);
          return T.appContext = i, C === !0 ? C = "svg" : C === !1 && (C = void 0), e(T, a, C), c = !0, d._container = a, a.__vue_app__ = d, Tn(T.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (ve(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, d;
      },
      runWithContext(a) {
        const p = ct;
        ct = d;
        try {
          return a();
        } finally {
          ct = p;
        }
      }
    };
    return d;
  };
}
let ct = null;
const Uo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${oe(t)}Modifiers`] || e[`${Xe(t)}Modifiers`];
function Wo(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || B;
  let r = n;
  const i = t.startsWith("update:"), o = i && Uo(s, t.slice(7));
  o && (o.trim && (r = n.map((a) => J(a) ? a.trim() : a)), o.number && (r = r.map(gn)));
  let l, c = s[l = On(t)] || // also try camelCase event handler (#2249)
  s[l = On(oe(t))];
  !c && i && (c = s[l = On(Xe(t))]), c && ve(
    c,
    e,
    6,
    r
  );
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, ve(
      d,
      e,
      6,
      r
    );
  }
}
const Bo = /* @__PURE__ */ new WeakMap();
function Gr(e, t, n = !1) {
  const s = n ? Bo : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!I(e)) {
    const c = (d) => {
      const a = Gr(d, t, !0);
      a && (l = !0, te(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? ($(e) && s.set(e, null), null) : (M(i) ? i.forEach((c) => o[c] = null) : te(o, i), $(e) && s.set(e, o), o);
}
function Sn(e, t) {
  return !e || !un(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), L(e, t[0].toLowerCase() + t.slice(1)) || L(e, Xe(t)) || L(e, t));
}
function Ls(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: c,
    render: d,
    renderCache: a,
    props: p,
    data: C,
    setupState: T,
    ctx: R,
    inheritAttrs: w
  } = e, K = nn(e);
  let j, F;
  try {
    if (n.shapeFlag & 4) {
      const E = r || s, N = E;
      j = Re(
        d.call(
          N,
          E,
          a,
          p,
          T,
          C,
          R
        )
      ), F = l;
    } else {
      const E = t;
      j = Re(
        E.length > 1 ? E(
          p,
          { attrs: l, slots: o, emit: c }
        ) : E(
          p,
          null
        )
      ), F = t.props ? l : qo(l);
    }
  } catch (E) {
    Ue.length = 0, Dt(E, e, 1), j = ce(_e);
  }
  let D = j;
  if (F && w !== !1) {
    const E = Object.keys(F), { shapeFlag: N } = D;
    E.length && N & 7 && (i && E.some(an) && (F = ko(
      F,
      i
    )), D = ut(D, F, !1, !0));
  }
  if (n.dirs && (D = ut(D, null, !1, !0), D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = bn(D.type) && $r(D) || D;
    sn(E, n.transition);
  }
  return j = D, nn(K), j;
}
function Jr(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    if (Cn(r)) {
      if (r.type !== _e || r.children === "v-if") {
        if (n)
          return;
        n = r;
      }
    } else
      return;
  }
  return n;
}
const qo = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || un(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ko = (e, t) => {
  const n = {};
  for (const s in e)
    (!an(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Go(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? $s(s, o, d) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const C = a[p];
        if (zr(o, s, C) && !Sn(d, C))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? $s(s, o, d) : !0 : !!o;
  return !1;
}
function $s(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (!L(e, i) || zr(t, e, i) && !Sn(n, i))
      return !0;
  }
  return !1;
}
function zr(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && $(s) && $(r) ? !xe(s, r) : s !== r;
}
function Jo({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = s, e = r), r === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const Yr = {}, Xr = () => Object.create(Yr), Zr = (e) => Object.getPrototypeOf(e) === Yr;
function zo(e, t, n, s = !1) {
  const r = {}, i = Xr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Qr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ zi(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Yo(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ H(r), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let C = a[p];
        if (Sn(e.emitsOptions, C))
          continue;
        const T = t[C];
        if (c)
          if (L(i, C))
            T !== i[C] && (i[C] = T, d = !0);
          else {
            const R = oe(C);
            r[R] = Jn(
              c,
              l,
              R,
              T,
              e,
              !1
            );
          }
        else
          T !== i[C] && (i[C] = T, d = !0);
      }
    }
  } else {
    Qr(e, t, r, i) && (d = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !L(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Xe(p)) === p || !L(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[p] = Jn(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !L(t, p)) && (delete i[p], d = !0);
  }
  d && Le(e.attrs, "set", "");
}
function Qr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (St(c))
        continue;
      const d = t[c];
      let a;
      r && L(r, a = oe(c)) ? !i || !i.includes(a) ? n[a] = d : (l || (l = {}))[a] = d : Sn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, o = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ H(n), d = l || B;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      n[p] = Jn(
        r,
        c,
        p,
        d[p],
        e,
        !L(d, p)
      );
    }
  }
  return o;
}
function Jn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = L(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && I(c)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const a = Nt(r);
          s = d[n] = c.call(
            null,
            t
          ), a();
        }
      } else
        s = c;
      r.ce && r.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Xe(n)) && (s = !0));
  }
  return s;
}
const Xo = /* @__PURE__ */ new WeakMap();
function ei(e, t, n = !1) {
  const s = n ? Xo : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let c = !1;
  if (!I(e)) {
    const a = (p) => {
      c = !0;
      const [C, T] = ei(p, t, !0);
      te(o, C), T && l.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return $(e) && s.set(e, rt), rt;
  if (M(i))
    for (let a = 0; a < i.length; a++) {
      const p = oe(i[a]);
      Ks(p) && (o[p] = B);
    }
  else if (i)
    for (const a in i) {
      const p = oe(a);
      if (Ks(p)) {
        const C = i[a], T = o[p] = M(C) || I(C) ? { type: C } : te({}, C), R = T.type;
        let w = !1, K = !0;
        if (M(R))
          for (let j = 0; j < R.length; ++j) {
            const F = R[j], D = I(F) && F.name;
            if (D === "Boolean") {
              w = !0;
              break;
            } else D === "String" && (K = !1);
          }
        else
          w = I(R) && R.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = w, T[
          1
          /* shouldCastTrue */
        ] = K, (w || L(T, "default")) && l.push(p);
      }
    }
  const d = [o, l];
  return $(e) && s.set(e, d), d;
}
function Ks(e) {
  return e[0] !== "$" && !St(e);
}
const ps = (e) => e === "_" || e === "_ctx" || e === "$stable", gs = (e) => M(e) ? e.map(Re) : [Re(e)], Zo = (e, t, n) => {
  if (t._n)
    return t;
  const s = uo((...r) => gs(t(...r)), n);
  return s._c = !1, s;
}, ti = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (ps(r)) continue;
    const i = e[r];
    if (I(i))
      t[r] = Zo(r, i, s);
    else if (i != null) {
      const o = gs(i);
      t[r] = () => o;
    }
  }
}, ni = (e, t) => {
  const n = gs(t);
  e.slots.default = () => n;
}, si = (e, t, n) => {
  for (const s in t)
    (n || !ps(s)) && (e[s] = t[s]);
}, Qo = (e, t, n) => {
  const s = e.slots = Xr();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (si(s, t, n), n && cr(s, "_", r, !0)) : ti(t, s);
  } else t && ni(e, t);
}, el = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = B;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : si(r, t, n) : (i = !t.$stable, ti(t, r)), o = t;
  } else t && (ni(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !ps(l) && o[l] == null && delete r[l];
}, le = il;
function tl(e) {
  return nl(e);
}
function nl(e, t) {
  const n = _n();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: c,
    setText: d,
    setElementText: a,
    parentNode: p,
    nextSibling: C,
    setScopeId: T = Ie,
    insertStaticContent: R
  } = e, w = (f, u, h, y = null, _ = null, m = null, v = void 0, x = null, b = !!u.dynamicChildren) => {
    if (f === u)
      return;
    f && !yt(f, u) && (y = $t(f), me(f, _, m, !0), f = null), u.patchFlag === -2 && (b = !1, u.dynamicChildren = null), u.dynamicChildren && f && f.dynamicChildren && f.dynamicChildren.hasOnce && (u.dynamicChildren === rt && (u.dynamicChildren = []), u.dynamicChildren.hasOnce = !0);
    const { type: g, ref: O, shapeFlag: S } = u;
    switch (g) {
      case wn:
        K(f, u, h, y);
        break;
      case _e:
        j(f, u, h, y);
        break;
      case Xt:
        f == null && F(u, h, y, v);
        break;
      case fe:
        Vt(
          f,
          u,
          h,
          y,
          _,
          m,
          v,
          x,
          b
        );
        break;
      default:
        S & 1 ? N(
          f,
          u,
          h,
          y,
          _,
          m,
          v,
          x,
          b
        ) : S & 6 ? Ht(
          f,
          u,
          h,
          y,
          _,
          m,
          v,
          x,
          b
        ) : (S & 64 || S & 128) && g.process(
          f,
          u,
          h,
          y,
          _,
          m,
          v,
          x,
          b,
          gt
        );
    }
    O != null && _ ? Tt(O, f && f.ref, m, u || f, !u) : O == null && f && f.ref != null && Tt(f.ref, null, m, f, !0);
  }, K = (f, u, h, y) => {
    if (f == null)
      s(
        u.el = l(u.children),
        h,
        y
      );
    else {
      const _ = u.el = f.el;
      u.children !== f.children && d(_, u.children);
    }
  }, j = (f, u, h, y) => {
    f == null ? s(
      u.el = c(u.children || ""),
      h,
      y
    ) : u.el = f.el;
  }, F = (f, u, h, y) => {
    [f.el, f.anchor] = R(
      f.children,
      u,
      h,
      y,
      f.el,
      f.anchor
    );
  }, D = ({ el: f, anchor: u }, h, y) => {
    let _;
    for (; f && f !== u; )
      _ = C(f), s(f, h, y), f = _;
    s(u, h, y);
  }, E = ({ el: f, anchor: u }) => {
    let h;
    for (; f && f !== u; )
      h = C(f), r(f), f = h;
    r(u);
  }, N = (f, u, h, y, _, m, v, x, b) => {
    if (u.type === "svg" ? v = "svg" : u.type === "math" && (v = "mathml"), f == null)
      Se(
        u,
        h,
        y,
        _,
        m,
        v,
        x,
        b
      );
    else {
      const g = f.el && f.el._isVueCE ? f.el : null;
      try {
        g && g._beginPatch(), jt(
          f,
          u,
          _,
          m,
          v,
          x,
          b
        );
      } finally {
        g && g._endPatch();
      }
    }
  }, Se = (f, u, h, y, _, m, v, x) => {
    let b, g;
    const { props: O, shapeFlag: S, transition: A, dirs: P } = f;
    if (b = f.el = o(
      f.type,
      m,
      O && O.is,
      O
    ), S & 8 ? a(b, f.children) : S & 16 && qe(
      f.children,
      b,
      null,
      y,
      _,
      jn(f, m),
      v,
      x
    ), P && tt(f, null, y, "created"), we(b, f, f.scopeId, v, y), O) {
      for (const W in O)
        W !== "value" && !St(W) && i(b, W, null, O[W], m, y);
      "value" in O && i(b, "value", null, O.value, m), (g = O.onVnodeBeforeMount) && Oe(g, y, f);
    }
    P && tt(f, null, y, "beforeMount");
    const V = sl(_, A);
    V && A.beforeEnter(b), s(b, u, h), ((g = O && O.onVnodeMounted) || V || P) && le(() => {
      g && Oe(g, y, f), V && A.enter(b), P && tt(f, null, y, "mounted");
    }, _);
  }, we = (f, u, h, y, _) => {
    if (h && T(f, h), y)
      for (let m = 0; m < y.length; m++)
        T(f, y[m]);
    if (_) {
      let m = _.subTree;
      if (u === m || oi(m.type) && (m.ssContent === u || m.ssFallback === u)) {
        const v = _.vnode;
        we(
          f,
          v,
          v.scopeId,
          v.slotScopeIds,
          _.parent
        );
      }
    }
  }, qe = (f, u, h, y, _, m, v, x, b = 0) => {
    for (let g = b; g < f.length; g++) {
      const O = f[g] = x ? He(f[g]) : Re(f[g]);
      w(
        null,
        O,
        u,
        h,
        y,
        _,
        m,
        v,
        x
      );
    }
  }, jt = (f, u, h, y, _, m, v) => {
    const x = u.el = f.el;
    let { patchFlag: b, dynamicChildren: g, dirs: O } = u;
    b |= f.patchFlag & 16;
    const S = f.props || B, A = u.props || B;
    let P;
    if (h && nt(h, !1), (P = A.onVnodeBeforeUpdate) && Oe(P, h, u, f), O && tt(u, f, h, "beforeUpdate"), h && nt(h, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    g && (!f.dynamicChildren || f.dynamicChildren.length !== g.length) && (b = 0, v = !1, g = null), (S.innerHTML && A.innerHTML == null || S.textContent && A.textContent == null) && a(x, ""), g ? Ze(
      f.dynamicChildren,
      g,
      x,
      h,
      y,
      jn(u, _),
      m
    ) : v || q(
      f,
      u,
      x,
      null,
      h,
      y,
      jn(u, _),
      m,
      !1
    ), b > 0) {
      if (b & 16)
        ht(x, S, A, h, _);
      else if (b & 2 && S.class !== A.class && i(x, "class", null, A.class, _), b & 4 && i(x, "style", S.style, A.style, _), b & 8) {
        const V = u.dynamicProps;
        for (let W = 0; W < V.length; W++) {
          const U = V[W], z = S[U], X = A[U];
          (X !== z || U === "value") && i(x, U, z, X, _, h);
        }
      }
      b & 1 && f.children !== u.children && a(x, u.children);
    } else !v && g == null && ht(x, S, A, h, _);
    ((P = A.onVnodeUpdated) || O) && le(() => {
      P && Oe(P, h, u, f), O && tt(u, f, h, "updated");
    }, y);
  }, Ze = (f, u, h, y, _, m, v) => {
    for (let x = 0; x < u.length; x++) {
      const b = f[x], g = u[x], O = b.el || zn(b), S = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !yt(b, g) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? p(O) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      w(
        b,
        g,
        S,
        null,
        y,
        _,
        m,
        v,
        !0
      );
    }
  }, ht = (f, u, h, y, _) => {
    if (u !== h) {
      if (u !== B)
        for (const m in u)
          !St(m) && !(m in h) && i(
            f,
            m,
            u[m],
            null,
            _,
            y
          );
      for (const m in h) {
        if (St(m)) continue;
        const v = h[m], x = u[m];
        v !== x && m !== "value" && i(f, m, x, v, _, y);
      }
      "value" in h && i(f, "value", u.value, h.value, _);
    }
  }, Vt = (f, u, h, y, _, m, v, x, b) => {
    const g = u.el = f ? f.el : l(""), O = u.anchor = f ? f.anchor : l("");
    let { patchFlag: S, dynamicChildren: A, slotScopeIds: P } = u;
    P && (x = x ? x.concat(P) : P), f == null ? (s(g, h, y), s(O, h, y), qe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      O,
      _,
      m,
      v,
      x,
      b
    )) : S > 0 && S & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === A.length ? (Ze(
      f.dynamicChildren,
      A,
      h,
      _,
      m,
      v,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || _ && u === _.subTree) && ri(
      f,
      u,
      !0
      /* shallow */
    )) : q(
      f,
      u,
      h,
      O,
      _,
      m,
      v,
      x,
      b
    );
  }, Ht = (f, u, h, y, _, m, v, x, b) => {
    u.slotScopeIds = x, f == null ? u.shapeFlag & 512 ? _.ctx.activate(
      u,
      h,
      y,
      v,
      b
    ) : En(
      u,
      h,
      y,
      _,
      m,
      v,
      b
    ) : ms(f, u, b);
  }, En = (f, u, h, y, _, m, v) => {
    const x = f.component = dl(
      f,
      y,
      _
    );
    if (xn(f) && (x.ctx.renderer = gt), pl(x, !1, v), x.asyncDep) {
      if (_ && _.registerDep(
        x,
        se,
        v,
        m
      ), !f.el) {
        const b = x.subTree = ce(_e);
        j(null, b, u, h), f.placeholder = b.el;
      }
    } else
      se(
        x,
        f,
        u,
        h,
        _,
        m,
        v
      );
  }, ms = (f, u, h) => {
    const y = u.component = f.component;
    if (Go(f, u, h))
      if (y.asyncDep && !y.asyncResolved) {
        u.el = f.el, u.placeholder = f.placeholder, G(y, u, h);
        return;
      } else
        y.next = u, y.update();
    else
      u.el = f.el, u.placeholder = f.placeholder, y.vnode = u;
  }, se = (f, u, h, y, _, m, v) => {
    const x = () => {
      if (f.isMounted) {
        let { next: S, bu: A, u: P, parent: V, vnode: W } = f;
        {
          const Te = ii(f);
          if (Te) {
            S && (S.el = W.el, G(f, S, v)), Te.asyncDep.then(() => {
              le(() => {
                f.isUnmounted || g();
              }, _);
            });
            return;
          }
        }
        let U = S, z;
        nt(f, !1), S ? (S.el = W.el, G(f, S, v)) : S = W, A && Jt(A), (z = S.props && S.props.onVnodeBeforeUpdate) && Oe(z, V, S, W), nt(f, !0);
        const X = Ls(f), Ce = f.subTree;
        f.subTree = X, w(
          Ce,
          X,
          // parent may have changed if it's in a teleport
          p(Ce.el),
          // anchor may have changed if it's in a fragment
          $t(Ce),
          f,
          _,
          m
        ), S.el = X.el, U === null && Jo(f, X.el), P && le(P, _), (z = S.props && S.props.onVnodeUpdated) && le(
          () => Oe(z, V, S, W),
          _
        );
      } else {
        let S;
        const { el: A, props: P } = u, { bm: V, m: W, parent: U, root: z, type: X } = f, Ce = ft(u);
        nt(f, !1), V && Jt(V), !Ce && (S = P && P.onVnodeBeforeMount) && Oe(S, U, u), nt(f, !0);
        {
          z.ce && z.ce._hasShadowRoot() && z.ce._injectChildStyle(
            X,
            f.parent ? f.parent.type : void 0
          );
          const Te = f.subTree = Ls(f);
          w(
            null,
            Te,
            h,
            y,
            f,
            _,
            m
          ), u.el = Te.el;
        }
        if (W && le(W, _), !Ce && (S = P && P.onVnodeMounted)) {
          const Te = u;
          le(
            () => Oe(S, U, Te),
            _
          );
        }
        (u.shapeFlag & 256 || U && ft(U.vnode) && U.vnode.shapeFlag & 256) && f.a && le(f.a, _), f.isMounted = !0, u = h = y = null;
      }
    };
    f.scope.on();
    const b = f.effect = new hr(x);
    f.scope.off();
    const g = f.update = b.run.bind(b), O = f.job = b.runIfDirty.bind(b);
    O.i = f, O.id = f.uid, b.scheduler = () => as(O), nt(f, !0), g();
  }, G = (f, u, h) => {
    u.component = f;
    const y = f.vnode.props;
    f.vnode = u, f.next = null, Yo(f, u.props, y, h), el(f, u.children, h), Fe(), Dr(f), De();
  }, q = (f, u, h, y, _, m, v, x, b = !1) => {
    const g = f && f.children, O = f ? f.shapeFlag : 0, S = u.children, { patchFlag: A, shapeFlag: P } = u;
    if (A > 0) {
      if (A & 128) {
        Lt(
          g,
          S,
          h,
          y,
          _,
          m,
          v,
          x,
          b
        );
        return;
      } else if (A & 256) {
        Qe(
          g,
          S,
          h,
          y,
          _,
          m,
          v,
          x,
          b
        );
        return;
      }
    }
    P & 8 ? (O & 16 && pt(g, _, m), S !== g && a(h, S)) : O & 16 ? P & 16 ? Lt(
      g,
      S,
      h,
      y,
      _,
      m,
      v,
      x,
      b
    ) : pt(g, _, m, !0) : (O & 8 && a(h, ""), P & 16 && qe(
      S,
      h,
      y,
      _,
      m,
      v,
      x,
      b
    ));
  }, Qe = (f, u, h, y, _, m, v, x, b) => {
    f = f || rt, u = u || rt;
    const g = f.length, O = u.length, S = Math.min(g, O);
    let A;
    for (A = 0; A < S; A++) {
      const P = u[A] = b ? He(u[A]) : Re(u[A]);
      w(
        f[A],
        P,
        h,
        null,
        _,
        m,
        v,
        x,
        b
      );
    }
    g > O ? pt(
      f,
      _,
      m,
      !0,
      !1,
      S
    ) : qe(
      u,
      h,
      y,
      _,
      m,
      v,
      x,
      b,
      S
    );
  }, Lt = (f, u, h, y, _, m, v, x, b) => {
    let g = 0;
    const O = u.length;
    let S = f.length - 1, A = O - 1;
    for (; g <= S && g <= A; ) {
      const P = f[g], V = u[g] = b ? He(u[g]) : Re(u[g]);
      if (yt(P, V))
        w(
          P,
          V,
          h,
          null,
          _,
          m,
          v,
          x,
          b
        );
      else
        break;
      g++;
    }
    for (; g <= S && g <= A; ) {
      const P = f[S], V = u[A] = b ? He(u[A]) : Re(u[A]);
      if (yt(P, V))
        w(
          P,
          V,
          h,
          null,
          _,
          m,
          v,
          x,
          b
        );
      else
        break;
      S--, A--;
    }
    if (g > S) {
      if (g <= A) {
        const P = A + 1, V = P < O ? u[P].el : y;
        for (; g <= A; )
          w(
            null,
            u[g] = b ? He(u[g]) : Re(u[g]),
            h,
            V,
            _,
            m,
            v,
            x,
            b
          ), g++;
      }
    } else if (g > A)
      for (; g <= S; )
        me(f[g], _, m, !0), g++;
    else {
      const P = g, V = g, W = /* @__PURE__ */ new Map();
      for (g = V; g <= A; g++) {
        const ue = u[g] = b ? He(u[g]) : Re(u[g]);
        ue.key != null && W.set(ue.key, g);
      }
      let U, z = 0;
      const X = A - V + 1;
      let Ce = !1, Te = 0;
      const _t = new Array(X);
      for (g = 0; g < X; g++) _t[g] = 0;
      for (g = P; g <= S; g++) {
        const ue = f[g];
        if (z >= X) {
          me(ue, _, m, !0);
          continue;
        }
        let Ee;
        if (ue.key != null)
          Ee = W.get(ue.key);
        else
          for (U = V; U <= A; U++)
            if (_t[U - V] === 0 && yt(ue, u[U])) {
              Ee = U;
              break;
            }
        Ee === void 0 ? me(ue, _, m, !0) : (_t[Ee - V] = g + 1, Ee >= Te ? Te = Ee : Ce = !0, w(
          ue,
          u[Ee],
          h,
          null,
          _,
          m,
          v,
          x,
          b
        ), z++);
      }
      const vs = Ce ? rl(_t) : rt;
      for (U = vs.length - 1, g = X - 1; g >= 0; g--) {
        const ue = V + g, Ee = u[ue], Ss = u[ue + 1], ws = ue + 1 < O ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ss.el || zn(Ss)
        ) : y;
        _t[g] === 0 ? w(
          null,
          Ee,
          h,
          ws,
          _,
          m,
          v,
          x,
          b
        ) : Ce && (U < 0 || g !== vs[U] ? et(Ee, h, ws, 2) : U--);
      }
    }
  }, et = (f, u, h, y, _ = null) => {
    const { el: m, type: v, transition: x, children: b, shapeFlag: g } = f;
    if (g & 6) {
      et(f.component.subTree, u, h, y);
      return;
    }
    if (g & 128) {
      f.suspense.move(u, h, y);
      return;
    }
    if (g & 64) {
      v.move(f, u, h, gt);
      return;
    }
    if (v === fe) {
      s(m, u, h);
      for (let S = 0; S < b.length; S++)
        et(b[S], u, h, y);
      s(f.anchor, u, h);
      return;
    }
    if (v === Xt) {
      D(f, u, h);
      return;
    }
    if (y !== 2 && g & 1 && x)
      if (y === 0)
        x.persisted && !m[Dn] ? s(m, u, h) : (x.beforeEnter(m), s(m, u, h), le(() => x.enter(m), _));
      else {
        const { leave: S, delayLeave: A, afterLeave: P } = x, V = () => {
          f.ctx.isUnmounted ? r(m) : s(m, u, h);
        }, W = () => {
          const U = m._isLeaving || !!m[Dn];
          m._isLeaving && m[Dn](
            !0
            /* cancelled */
          ), x.persisted && !U ? V() : S(m, () => {
            V(), P && P();
          });
        };
        A ? A(m, V, W) : W();
      }
    else
      s(m, u, h);
  }, me = (f, u, h, y = !1, _ = !1) => {
    const {
      type: m,
      props: v,
      ref: x,
      children: b,
      dynamicChildren: g,
      shapeFlag: O,
      patchFlag: S,
      dirs: A,
      cacheIndex: P,
      memo: V
    } = f;
    if ((S === -2 || g && g.hasOnce) && (_ = !1), x != null && (Fe(), Tt(x, null, h, f, !0), De()), P != null && (!f.ctx || f.ctx === u) && (u.renderCache[P] = void 0), O & 256) {
      u.ctx.deactivate(f);
      return;
    }
    const W = O & 1 && A, U = !ft(f);
    let z;
    if (U && (z = v && v.onVnodeBeforeUnmount) && Oe(z, u, f), O & 6)
      _i(f.component, h, y);
    else {
      if (O & 128) {
        f.suspense.unmount(h, y);
        return;
      }
      W && tt(f, null, u, "beforeUnmount"), O & 64 ? f.type.remove(
        f,
        u,
        h,
        gt,
        y
      ) : g && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !g.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (m !== fe || S > 0 && S & 64) ? pt(
        g,
        u,
        h,
        !1,
        !0
      ) : (m === fe && S & 384 || !_ && O & 16) && pt(b, u, h), y && ys(f);
    }
    const X = V != null && P == null;
    (U && (z = v && v.onVnodeUnmounted) || W || X) && le(() => {
      z && Oe(z, u, f), W && tt(f, null, u, "unmounted"), X && (f.el = null);
    }, h);
  }, ys = (f) => {
    const { type: u, el: h, anchor: y, transition: _ } = f, m = u === fe;
    if (m && !_) {
      bs(h, y);
      return;
    }
    if (u === Xt) {
      E(f), _ && !_.persisted && _.afterLeave && _.afterLeave();
      return;
    }
    const v = m ? Bn(f) : f, x = () => {
      m ? p(h) && bs(h, y) : r(h), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (v && v.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: b, delayLeave: g } = _, O = v.el, S = () => b(O, x);
      g ? g(O, x, S) : S();
    } else
      x();
  }, bs = (f, u) => {
    let h;
    for (; f !== u; )
      h = C(f), r(f), f = h;
    r(u);
  }, _i = (f, u, h) => {
    const { bum: y, scope: _, job: m, subTree: v, um: x, m: b, a: g } = f;
    Us(b), Us(g), y && Jt(y), _.stop(), m ? (m.flags |= 8, me(v, f, u, h)) : f.vnode.el && v && (v.transition = f.vnode.transition, me(v, f, u, h)), x && le(x, u), le(() => {
      f.isUnmounted = !0;
    }, u);
  }, pt = (f, u, h, y = !1, _ = !1, m = 0) => {
    for (let v = m; v < f.length; v++)
      me(f[v], u, h, y, _);
  }, $t = (f) => {
    if (f.shapeFlag & 6)
      return $t(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const u = C(f.anchor || f.el), h = u && u[_o];
    return h ? C(h) : u;
  }, xs = (f, u, h) => {
    const y = f && u._vnode ? void 0 : f && f.component ? f.component.uid : al();
    co(() => {
      f == null ? u._vnode && me(u._vnode, null, null, !0) : w(
        u._vnode || null,
        f,
        u,
        null,
        null,
        null,
        h
      ), u._vnode = f;
    }, y);
  }, gt = {
    p: w,
    um: me,
    m: et,
    r: ys,
    mt: En,
    mc: qe,
    pc: q,
    pbc: Ze,
    n: $t,
    o: e
  };
  return {
    render: xs,
    hydrate: void 0,
    createApp: Ko(xs)
  };
}
function jn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function nt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function sl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ri(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (M(s) && M(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = He(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && ri(o, l)), l.type === wn && (l.patchFlag === -1 && (l = r[i] = He(l)), l.el = o.el), l.type === _e && !l.el && (l.el = o.el);
    }
}
function rl(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, e[n[l]] < d ? i = l + 1 : o = l;
      d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function ii(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ii(t);
}
function Us(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function zn(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? zn(t.subTree) : null;
}
const oi = (e) => e.__isSuspense;
function il(e, t) {
  t && t.pendingBranch ? M(e) ? t.effects.push(...e) : t.effects.push(e) : fo(e);
}
const fe = /* @__PURE__ */ Symbol.for("v-fgt"), wn = /* @__PURE__ */ Symbol.for("v-txt"), _e = /* @__PURE__ */ Symbol.for("v-cmt"), Xt = /* @__PURE__ */ Symbol.for("v-stc"), Ue = [];
let ae = null;
function Yn(e = !1) {
  Ue.push(ae = e ? null : []);
}
function _s() {
  Ue.pop(), ae = Ue[Ue.length - 1] || null;
}
let Rt = 1;
function Ws(e, t = !1) {
  Rt += e, e < 0 && ae && t && (ae.hasOnce = !0);
}
function li(e) {
  return e.dynamicChildren = Rt > 0 ? ae || rt : null, _s(), Rt > 0 && ae && ae.push(e), e;
}
function af(e, t, n, s, r, i) {
  return li(
    ci(
      e,
      t,
      n,
      s,
      r,
      i,
      !0
    )
  );
}
function Xn(e, t, n, s, r) {
  return li(
    ce(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Cn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function yt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const fi = ({ key: e }) => e ?? null, Zt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? J(e) || /* @__PURE__ */ Y(e) || I(e) ? { i: ee, r: e, k: t, f: !!n } : e : null);
function ci(e, t = null, n = null, s = 0, r = null, i = e === fe ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && fi(t),
    ref: t && Zt(t),
    scopeId: Vr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ee
  };
  return l ? (ln(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= J(n) ? 8 : 16), Rt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ae && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ae.push(c), c;
}
const ce = ol;
function ol(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Ur) && (e = _e), Cn(e)) {
    const l = ut(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ln(l, n), Rt > 0 && !i && ae && (l.shapeFlag & 6 ? ae[ae.indexOf(e)] = l : ae.push(l)), l.patchFlag = -2, l;
  }
  if (bl(e) && (e = e.__vccOpts), t) {
    t = ll(t);
    let { class: l, style: c } = t;
    l && !J(l) && (t.class = ns(l)), $(c) && (/* @__PURE__ */ yn(c) && !M(c) && (c = te({}, c)), t.style = ts(c));
  }
  const o = J(e) ? 1 : oi(e) ? 128 : bn(e) ? 64 : $(e) ? 4 : I(e) ? 2 : 0;
  return ci(
    e,
    t,
    n,
    s,
    r,
    o,
    i,
    !0
  );
}
function ll(e) {
  return e ? /* @__PURE__ */ yn(e) || Zr(e) ? te({}, e) : e : null;
}
function ut(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, d = t ? cl(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && fi(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? M(i) ? i.concat(Zt(t)) : [i, Zt(t)] : Zt(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== fe ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ut(e.ssContent),
    ssFallback: e.ssFallback && ut(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return c && s && sn(
    a,
    c.clone(a)
  ), a;
}
function fl(e = " ", t = 0) {
  return ce(wn, null, e, t);
}
function df(e, t) {
  const n = ce(Xt, null, e);
  return n.staticCount = t, n;
}
function hf(e = "", t = !1) {
  return t ? (Yn(), Xn(_e, null, e)) : ce(_e, null, e);
}
function Re(e) {
  return e == null || typeof e == "boolean" ? ce(_e) : M(e) ? ce(
    fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Cn(e) ? He(e) : ce(wn, null, String(e));
}
function He(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ut(e);
}
function ln(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (M(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ln(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Zr(t) ? t._ctx = ee : r === 3 && ee && (ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (I(t)) {
    if (s & 65) {
      ln(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ee }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [fl(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function cl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ns([t.class, s.class]));
      else if (r === "style")
        t.style = ts([t.style, s.style]);
      else if (un(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(M(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !an(r) && (t[r] = o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Oe(e, t, n, s = null) {
  ve(e, t, 7, [
    n,
    s
  ]);
}
const ul = kr();
let ui = 0;
function al() {
  return ui;
}
function dl(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || ul, i = {
    uid: ui++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ri(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ei(s, r),
    emitsOptions: Gr(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: B,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: B,
    data: B,
    props: B,
    attrs: B,
    slots: B,
    refs: B,
    setupState: B,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Wo.bind(null, i), e.ce && e.ce(i), i;
}
let Q = null;
const hl = () => Q || ee;
let fn, Pt;
{
  const e = _n(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  fn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Q = n
  ), Pt = t(
    "__VUE_SSR_SETTERS__",
    (n) => at = n
  );
}
const Nt = (e) => {
  const t = Q;
  return fn(e), e.scope.on(), () => {
    e.scope.off(), fn(t);
  };
}, Bs = () => {
  Q && Q.scope.off(), fn(null);
};
function ai(e) {
  return e.vnode.shapeFlag & 4;
}
let at = !1;
function pl(e, t = !1, n = !1) {
  t && Pt(t);
  const { props: s, children: r } = e.vnode, i = ai(e);
  zo(e, s, i, t), Qo(e, r, n || t);
  const o = i ? gl(e, t) : void 0;
  return t && Pt(!1), o;
}
function gl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Do);
  const { setup: s } = n;
  if (s) {
    Fe();
    const r = e.setupContext = s.length > 1 ? ml(e) : null, i = Nt(e), o = Ft(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = or(o);
    if (De(), i(), (l || e.sp) && !ft(e) && ds(e), l) {
      if (o.then(Bs, Bs), t)
        return o.then((c) => {
          Pt(!0);
          try {
            qs(e, c, t);
          } finally {
            Pt(!1);
          }
        }).catch((c) => {
          Dt(c, e, 0);
        });
      e.asyncDep = o;
    } else
      qs(e, o);
  } else
    di(e);
}
function qs(e, t, n) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : $(t) && (e.setupState = Rr(t)), di(e);
}
function di(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Ie);
  {
    const r = Nt(e);
    Fe();
    try {
      No(e);
    } finally {
      De(), r();
    }
  }
}
const _l = {
  get(e, t) {
    return ne(e, "get", ""), e[t];
  }
};
function ml(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, _l),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Tn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Rr(Yi(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Et)
        return Et[n](e);
    },
    has(t, n) {
      return n in t || n in Et;
    }
  })) : e.proxy;
}
function yl(e, t = !0) {
  return I(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function bl(e) {
  return I(e) && "__vccOpts" in e;
}
const xl = (e, t) => /* @__PURE__ */ so(e, t, at), vl = "3.5.44";
let Zn;
const ks = typeof window < "u" && window.trustedTypes;
if (ks)
  try {
    Zn = /* @__PURE__ */ ks.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const hi = Zn ? (e) => Zn.createHTML(e) : (e) => e, Sl = "http://www.w3.org/2000/svg", wl = "http://www.w3.org/1998/Math/MathML", Ve = typeof document < "u" ? document : null, Gs = Ve && /* @__PURE__ */ Ve.createElement("template"), Cl = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? Ve.createElementNS(Sl, e) : t === "mathml" ? Ve.createElementNS(wl, e) : n ? Ve.createElement(e, { is: n }) : Ve.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Ve.createTextNode(e),
  createComment: (e) => Ve.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ve.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      Gs.innerHTML = hi(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Gs.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Tl = /* @__PURE__ */ Symbol("_vtc");
function El(e, t, n) {
  const s = e[Tl];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const cn = /* @__PURE__ */ Symbol("_vod"), pi = /* @__PURE__ */ Symbol("_vsh"), pf = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[cn] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : bt(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), bt(e, !0), s.enter(e)) : s.leave(e, () => {
      bt(e, !1);
    }) : bt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    bt(e, t);
  }
};
function bt(e, t) {
  e.style.display = t ? e[cn] : "none", e[pi] = !t;
}
const Ol = /* @__PURE__ */ Symbol(""), Al = /(?:^|;)\s*display\s*:/;
function Ml(e, t, n) {
  const s = e.style, r = J(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (J(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && vt(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && vt(s, o, "");
    for (const o in n) {
      o === "display" && (i = !0);
      const l = n[o];
      l != null ? Pl(
        e,
        o,
        !J(t) && t ? t[o] : void 0,
        l
      ) || vt(s, o, l) : vt(s, o, "");
    }
  } else if (r) {
    if (t !== n) {
      const o = s[Ol];
      o && (n += ";" + o), s.cssText = n, i = Al.test(n);
    }
  } else t && e.removeAttribute("style");
  cn in e && ((!r || t !== n) && (e[cn] = i ? s.display : ""), e[pi] && (s.display = "none"));
}
const qt = /\s*!important$/;
function vt(e, t, n) {
  if (M(n))
    n.forEach((s) => vt(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    qt.test(n) ? e.setProperty(t, n.replace(qt, ""), "important") : e.setProperty(t, n);
  else {
    const s = Rl(e, t);
    qt.test(n) ? e.setProperty(
      Xe(s),
      n.replace(qt, ""),
      "important"
    ) : e[s] = n;
  }
}
const Js = ["Webkit", "Moz", "ms"], Vn = {};
function Rl(e, t) {
  const n = Vn[t];
  if (n)
    return n;
  let s = oe(t);
  if (s !== "filter" && s in e)
    return Vn[t] = s;
  s = pn(s);
  for (let r = 0; r < Js.length; r++) {
    const i = Js[r] + s;
    if (i in e)
      return Vn[t] = i;
  }
  return t;
}
function Pl(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && J(s) && n === s;
}
const zs = "http://www.w3.org/1999/xlink";
function Ys(e, t, n, s, r, i = Ei(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(zs, t.slice(6, t.length)) : e.setAttributeNS(zs, t, n) : n == null || i && !ur(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : pe(n) ? String(n) : n
  );
}
function Xs(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? hi(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = ur(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function Ke(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Il(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Zs = /* @__PURE__ */ Symbol("_vei");
function Fl(e, t, n, s, r = null) {
  const i = e[Zs] || (e[Zs] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = jl(t);
    if (s) {
      const d = i[t] = Ll(
        s,
        r
      );
      Ke(e, l, d, c);
    } else o && (Il(e, l, o, c), i[t] = void 0);
  }
}
const Dl = /(Once|Passive|Capture)$/, Nl = /^on:?(?:Once|Passive|Capture)$/;
function jl(e) {
  let t, n;
  for (; (n = e.match(Dl)) && !Nl.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Xe(e.slice(2)), t];
}
let Hn = 0;
const Vl = /* @__PURE__ */ Promise.resolve(), Hl = () => Hn || (Vl.then(() => Hn = 0), Hn = Date.now());
function Ll(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const r = n.value;
    if (M(r)) {
      const i = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        i.call(s), s._stopped = !0;
      };
      const o = r.slice(), l = [s];
      for (let c = 0; c < o.length && !s._stopped; c++) {
        const d = o[c];
        d && ve(
          d,
          t,
          5,
          l
        );
      }
    } else
      ve(
        r,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Hl(), n;
}
const Qs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, $l = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? El(e, s, o) : t === "style" ? Ml(e, n, s) : un(t) ? an(t) || Fl(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Kl(e, t, s, o)) ? (Xs(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ys(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ul(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !J(s))) ? Xs(e, oe(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ys(e, t, s, o));
};
function Kl(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Qs(t) && I(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Qs(t) && J(n) ? !1 : t in e;
}
function Ul(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = oe(t);
  return Array.isArray(n) ? n.some((r) => oe(r) === s) : Object.keys(n).some((r) => oe(r) === s);
}
const Ye = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return M(t) ? (n) => Jt(t, n) : t;
};
function Wl(e) {
  e.target.composing = !0;
}
function er(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const de = /* @__PURE__ */ Symbol("_assign"), kt = /* @__PURE__ */ Symbol("_initialValue");
function Ln(e, t, n) {
  return t && (e = e.trim()), n && (e = gn(e)), e;
}
const tr = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e.parentNode && (e.type === "text" ? e[kt] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[kt] = e.defaultValue.replace(/\r\n?/g, `
`))), e[de] = Ye(r);
    const i = s || r.props && r.props.type === "number";
    Ke(e, t ? "change" : "input", (o) => {
      o.target.composing || e[de](Ln(e.value, n, i));
    }), (n || i) && Ke(e, "change", () => {
      e.value = Ln(e.value, n, i);
    }), t || (Ke(e, "compositionstart", Wl), Ke(e, "compositionend", er), Ke(e, "change", er));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const r = t ?? "", i = e[kt];
    delete e[kt], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[de](Ln(e.value, n, s)) : e.value = r;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[de] = Ye(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? gn(e.value) : e.value, c = t ?? "";
    if (l === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c);
  }
}, Bl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[de] = Ye(n), Ke(e, "change", () => {
      const s = e._modelValue, r = dt(e), i = e.checked, o = e[de];
      if (M(s)) {
        const l = ss(s, r), c = l !== -1;
        if (i && !c)
          o(s.concat(r));
        else if (!i && c) {
          const d = [...s];
          d.splice(l, 1), o(d);
        }
      } else if (We(s)) {
        const l = new Set(s);
        i ? l.add(r) : l.delete(r), o(l);
      } else
        o(gi(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: nr,
  beforeUpdate(e, t, n) {
    e[de] = Ye(n), nr(e, t, n);
  }
};
function nr(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let r;
  if (M(t))
    r = ss(t, s.props.value) > -1;
  else if (We(t))
    r = t.has(s.props.value);
  else {
    if (t === n) return;
    r = xe(t, gi(e, !0));
  }
  e.checked !== r && (e.checked = r);
}
const ql = {
  created(e, { value: t }, n) {
    e.checked = xe(t, n.props.value), e[de] = Ye(n), Ke(e, "change", () => {
      e[de](dt(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e[de] = Ye(s), t !== n && (e.checked = xe(t, s.props.value));
  }
}, kl = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, Ke(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => n ? gn(dt(c)) : dt(c)
      ), i = e.multiple, o = i ? We(e._modelValue) ? new Set(r) : r : r[0], l = e._pendingValue = [
        i,
        i ? M(o) ? r.slice() : r : o
      ];
      try {
        e[de](o);
      } finally {
        Ir(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[de] = Ye(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    sr(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[de] = Ye(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Gl(t, n[1], n[0])) && sr(e, t);
  }
};
function Gl(e, t, n) {
  if (!n || M(e)) return xe(e, t);
  if (We(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function sr(e, t) {
  const n = e.multiple, s = M(t);
  if (!(n && !s && !We(t))) {
    for (let r = 0, i = e.options.length; r < i; r++) {
      const o = e.options[r], l = dt(o);
      if (n)
        if (s) {
          const c = typeof l;
          c === "string" || c === "number" ? o.selected = t.some((d) => String(d) === String(l)) : o.selected = ss(t, l) > -1;
        } else
          o.selected = t.has(l);
      else if (xe(dt(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function dt(e) {
  return "_value" in e ? e._value : e.value;
}
function gi(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const gf = {
  created(e, t, n) {
    Gt(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    Gt(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    Gt(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    Gt(e, t, n, s, "updated");
  }
};
function Jl(e, t) {
  switch (e) {
    case "SELECT":
      return kl;
    case "TEXTAREA":
      return tr;
    default:
      switch (t) {
        case "checkbox":
          return Bl;
        case "radio":
          return ql;
        default:
          return tr;
      }
  }
}
function Gt(e, t, n, s, r) {
  const o = Jl(
    e.tagName,
    n.props && n.props.type
  )[r];
  o && o(e, t, n, s);
}
const zl = ["ctrl", "shift", "alt", "meta"], Yl = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => zl.some((n) => e[`${n}Key`] && !t.includes(n))
}, _f = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = Yl[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  }));
}, Xl = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, mf = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const i = Xe(r.key);
    if (t.some(
      (o) => o === i || Xl[o] === i
    ))
      return e(r);
  }));
}, Zl = /* @__PURE__ */ te({ patchProp: $l }, Cl);
let rr;
function Ql() {
  return rr || (rr = tl(Zl));
}
const yf = ((...e) => {
  const t = Ql().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = tf(s);
    if (!r) return;
    const i = t._component;
    !I(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, ef(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function ef(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function tf(e) {
  return J(e) ? document.querySelector(e) : e;
}
export {
  yo as A,
  Bl as B,
  mf as C,
  df as D,
  Y as E,
  fe as F,
  pf as G,
  ff as H,
  Yi as I,
  sf as J,
  rf as K,
  lf as L,
  hs as M,
  gf as N,
  xl as a,
  cs as b,
  yf as c,
  af as d,
  ci as e,
  cf as f,
  ns as g,
  Co as h,
  ce as i,
  hf as j,
  _f as k,
  Xn as l,
  of as m,
  ts as n,
  Yn as o,
  fl as p,
  kl as q,
  zt as r,
  Ir as s,
  Mi as t,
  Mr as u,
  tr as v,
  Fn as w,
  Oo as x,
  uf as y,
  uo as z
};
