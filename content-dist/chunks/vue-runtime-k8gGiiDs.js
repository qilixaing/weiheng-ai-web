// @__NO_SIDE_EFFECTS__
function zn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const K = {}, rt = [], Re = () => {
}, Zs = () => !1, ln = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), fn = (e) => e.startsWith("onUpdate:"), Q = Object.assign, Yn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ai = Object.prototype.hasOwnProperty, j = (e, t) => ai.call(e, t), O = Array.isArray, ke = (e) => It(e) === "[object Map]", Ue = (e) => It(e) === "[object Set]", bs = (e) => It(e) === "[object Date]", P = (e) => typeof e == "function", G = (e) => typeof e == "string", de = (e) => typeof e == "symbol", V = (e) => e !== null && typeof e == "object", Qs = (e) => (V(e) || P(e)) && P(e.then) && P(e.catch), er = Object.prototype.toString, It = (e) => er.call(e), di = (e) => It(e).slice(8, -1), tr = (e) => It(e) === "[object Object]", cn = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, vt = /* @__PURE__ */ zn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), un = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, hi = /-\w/g, me = un(
  (e) => e.replace(hi, (t) => t.slice(1).toUpperCase())
), pi = /\B([A-Z])/g, Xe = un(
  (e) => e.replace(pi, "-$1").toLowerCase()
), nr = un((e) => e.charAt(0).toUpperCase() + e.slice(1)), wn = un(
  (e) => e ? `on${nr(e)}` : ""
), Pe = (e, t) => !Object.is(e, t), Gt = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, sr = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, an = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let xs;
const dn = () => xs || (xs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Xn(e) {
  if (O(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = G(s) ? yi(s) : Xn(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (G(e) || V(e))
    return e;
}
const gi = /;(?![^(]*\))/g, _i = /:([^]+)/, mi = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function yi(e) {
  const t = {};
  return e.replace(mi, (n) => n.startsWith("/*") ? "" : n).split(gi).forEach((n) => {
    if (n) {
      const s = n.split(_i);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Zn(e) {
  let t = "";
  if (G(e))
    t = e;
  else if (O(e))
    for (let n = 0; n < e.length; n++) {
      const s = Zn(e[n]);
      s && (t += s + " ");
    }
  else if (V(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const bi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", xi = /* @__PURE__ */ zn(bi);
function rr(e) {
  return !!e || e === "";
}
function vi(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let r = 0; s && r < e.length; r++)
    s = xe(e[r], t[r], n);
  return s;
}
function vs(e, t, n) {
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
function Si(e, t, n) {
  let s = ke(e), r = ke(t);
  if (s || r || (s = Ue(e), r = Ue(t), s || r))
    return s && r ? vs(e, t, n) : !1;
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
function Ss(e, t, n, s) {
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
  let s = bs(e), r = bs(t);
  return s || r ? s && r ? e.getTime() === t.getTime() : !1 : (s = de(e), r = de(t), s || r ? e === t : (s = O(e), r = O(t), s || r ? s && r ? Ss(e, t, n, vi) : !1 : (s = V(e), r = V(t), s || r ? !s || !r ? !1 : Ss(e, t, n, Si) : String(e) === String(t))));
}
function Qn(e, t) {
  return e.findIndex((n) => xe(n, t));
}
const ir = (e) => !!(e && e.__v_isRef === !0), wi = (e) => G(e) ? e : e == null ? "" : O(e) || V(e) && (e.toString === er || !P(e.toString)) ? ir(e) ? wi(e.value) : JSON.stringify(e, or, 2) : String(e), or = (e, t) => ir(t) ? or(e, t.value) : ke(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[Cn(s, i) + " =>"] = r, n),
    {}
  )
} : Ue(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Cn(n))
} : de(t) ? Cn(t) : V(t) && !O(t) && !tr(t) ? String(t) : t, Cn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    de(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Z;
class Ci {
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
function Ti() {
  return Z;
}
let W;
const Tn = /* @__PURE__ */ new WeakSet();
class lr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Z && (Z.active ? Z.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Tn.has(this) && (Tn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || cr(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ws(this), ur(this);
    const t = W, n = ye;
    W = this, ye = !0;
    try {
      return this.fn();
    } finally {
      ar(this), W = t, ye = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ns(t);
      this.deps = this.depsTail = void 0, ws(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Tn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Vn(this) && this.run();
  }
  get dirty() {
    return Vn(this);
  }
}
let fr = 0, St, wt;
function cr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = wt, wt = e;
    return;
  }
  e.next = St, St = e;
}
function es() {
  fr++;
}
function ts() {
  if (--fr > 0)
    return;
  if (wt) {
    let t = wt;
    for (wt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; St; ) {
    let t = St;
    for (St = void 0; t; ) {
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
function ur(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ar(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), ns(s), Ei(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Vn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (dr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function dr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Et) || (e.globalVersion = Et, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Vn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = W, s = ye;
  W = e, ye = !0;
  try {
    ur(e);
    const r = e.fn(e._value);
    (t.version === 0 || Pe(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    W = n, ye = s, ar(e), e.flags &= -3;
  }
}
function ns(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      ns(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ei(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let ye = !0;
const hr = [];
function Ie() {
  hr.push(ye), ye = !1;
}
function Fe() {
  const e = hr.pop();
  ye = e === void 0 ? !0 : e;
}
function ws(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = W;
    W = void 0;
    try {
      t();
    } finally {
      W = n;
    }
  }
}
let Et = 0;
class Oi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ss {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!W || !ye || W === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== W)
      n = this.activeLink = new Oi(W, this), W.deps ? (n.prevDep = W.depsTail, W.depsTail.nextDep = n, W.depsTail = n) : W.deps = W.depsTail = n, pr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = W.depsTail, n.nextDep = void 0, W.depsTail.nextDep = n, W.depsTail = n, W.deps === n && (W.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Et++, this.notify(t);
  }
  notify(t) {
    es();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ts();
    }
  }
}
function pr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        pr(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Yt = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ Symbol(
  ""
), Nn = /* @__PURE__ */ Symbol(
  ""
), Ot = /* @__PURE__ */ Symbol(
  ""
);
function ee(e, t, n) {
  if (ye && W) {
    let s = Yt.get(e);
    s || Yt.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ss()), r.map = s, r.key = n), r.track();
  }
}
function He(e, t, n, s, r, i) {
  const o = Yt.get(e);
  if (!o) {
    Et++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (es(), t === "clear")
    o.forEach(l);
  else {
    const c = O(e), d = c && cn(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((p, w) => {
        (w === "length" || w === Ot || !de(w) && w >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(Ot)), t) {
        case "add":
          c ? d && l(o.get("length")) : (l(o.get(it)), ke(e) && l(o.get(Nn)));
          break;
        case "delete":
          c || (l(o.get(it)), ke(e) && l(o.get(Nn)));
          break;
        case "set":
          ke(e) && l(o.get(it));
          break;
      }
  }
  ts();
}
function Ai(e, t) {
  const n = Yt.get(e);
  return n && n.get(t);
}
function ot(e) {
  const t = /* @__PURE__ */ D(e);
  return t === e || (ee(t, "iterate", Ot), /* @__PURE__ */ ae(e)) ? t : /* @__PURE__ */ De(e) ? /* @__PURE__ */ Je(e) ? t.map((n) => ze(he(n))) : t.map(ze) : t.map(he);
}
function hn(e) {
  return ee(e = /* @__PURE__ */ D(e), "iterate", Ot), e;
}
function Oe(e, t) {
  return /* @__PURE__ */ De(e) ? ze(/* @__PURE__ */ Je(e) ? he(t) : t) : he(t);
}
const Mi = {
  __proto__: null,
  [Symbol.iterator]() {
    return En(this, Symbol.iterator, (e) => Oe(this, e));
  },
  concat(...e) {
    return ot(this).concat(
      ...e.map((t) => O(t) ? ot(t) : t)
    );
  },
  entries() {
    return En(this, "entries", (e) => (e[1] = Oe(this, e[1]), e));
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
      (n) => n.map((s) => Oe(this, s)),
      arguments
    );
  },
  find(e, t) {
    return je(
      this,
      "find",
      e,
      t,
      (n) => Oe(this, n),
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
      (n) => Oe(this, n),
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
    return On(this, "includes", e);
  },
  indexOf(...e) {
    return On(this, "indexOf", e);
  },
  join(e) {
    return ot(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return On(this, "lastIndexOf", e);
  },
  map(e, t) {
    return je(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return _t(this, "pop");
  },
  push(...e) {
    return _t(this, "push", e);
  },
  reduce(e, ...t) {
    return Ts(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ts(this, "reduceRight", e, t);
  },
  shift() {
    return _t(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return je(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return _t(this, "splice", e);
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
    return _t(this, "unshift", e);
  },
  values() {
    return En(this, "values", (e) => Oe(this, e));
  }
};
function En(e, t, n) {
  const s = hn(e), r = s[t], i = r.call(s);
  if (s !== e && !/* @__PURE__ */ ae(e)) {
    if (i[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(i));
      return o.next = () => Cs(i.next(), n), r !== gr[t] && Object.defineProperties(o, {
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
    i._next = i.next, i.next = () => Cs(i._next(), n);
  }
  return i;
}
function Cs(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const gr = Array.prototype;
function je(e, t, n, s, r, i) {
  const o = hn(e), l = o !== e && !/* @__PURE__ */ ae(e), c = o[t];
  if (c !== gr[t]) {
    const p = c.apply(e, i);
    return l ? he(p) : p;
  }
  let d = n;
  o !== e && (l ? d = function(p, w) {
    return n.call(this, Oe(e, p), w, e);
  } : n.length > 2 && (d = function(p, w) {
    return n.call(this, p, w, e);
  }));
  const a = c.call(o, d, s);
  return l && r ? r(a) : a;
}
function Ts(e, t, n, s) {
  const r = hn(e), i = r !== e && !/* @__PURE__ */ ae(e);
  let o = n, l = !1;
  r !== e && (i ? (l = s.length === 0, o = function(d, a, p) {
    return l && (l = !1, d = Oe(e, d)), n.call(this, d, Oe(e, a), p, e);
  }) : n.length > 3 && (o = function(d, a, p) {
    return n.call(this, d, a, p, e);
  }));
  const c = r[t](o, ...s);
  return l ? Oe(e, c) : c;
}
function On(e, t, n) {
  const s = /* @__PURE__ */ D(e);
  ee(s, "iterate", Ot);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ pn(n[0]) ? (n[0] = /* @__PURE__ */ D(n[0]), s[t](...n)) : r;
}
function _t(e, t, n = []) {
  Ie(), es();
  const s = (/* @__PURE__ */ D(e))[t].apply(e, n);
  return ts(), Fe(), s;
}
const Pi = /* @__PURE__ */ zn("__proto__,__v_isRef,__isVue"), _r = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(de)
);
function Ri(e) {
  de(e) || (e = String(e));
  const t = /* @__PURE__ */ D(this);
  return ee(t, "has", e), t.hasOwnProperty(e);
}
class mr {
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
      return s === (r ? i ? Ki : vr : i ? xr : br).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = O(t);
    if (!r) {
      let c;
      if (o && (c = Mi[n]))
        return c;
      if (n === "hasOwnProperty")
        return Ri;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Y(t) ? t : s
    );
    if ((de(n) ? _r.has(n) : Pi(n)) || (r || ee(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ Y(l)) {
      const c = o && cn(n) ? l : l.value;
      return r && V(c) ? /* @__PURE__ */ Ln(c) : c;
    }
    return V(l) ? r ? /* @__PURE__ */ Ln(l) : /* @__PURE__ */ is(l) : l;
  }
}
class yr extends mr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = O(t) && cn(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ De(i);
      if (!/* @__PURE__ */ ae(s) && !/* @__PURE__ */ De(s) && (i = /* @__PURE__ */ D(i), s = /* @__PURE__ */ D(s)), !o && /* @__PURE__ */ Y(i) && !/* @__PURE__ */ Y(s))
        return d || (i.value = s), !0;
    }
    const l = o ? Number(n) < t.length : j(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Y(t) ? t : r
    );
    return t === /* @__PURE__ */ D(r) && c && (l ? Pe(s, i) && He(t, "set", n, s) : He(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = j(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && He(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!de(n) || !_r.has(n)) && ee(t, "has", n), s;
  }
  ownKeys(t) {
    return ee(
      t,
      "iterate",
      O(t) ? "length" : it
    ), Reflect.ownKeys(t);
  }
}
class Ii extends mr {
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
const Fi = /* @__PURE__ */ new yr(), Di = /* @__PURE__ */ new Ii(), ji = /* @__PURE__ */ new yr(!0);
const Hn = (e) => e, $t = (e) => Reflect.getPrototypeOf(e);
function Vi(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ D(r), o = ke(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = r[e](...s), a = n ? Hn : t ? ze : he;
    return !t && ee(
      i,
      "iterate",
      c ? Nn : it
    ), Q(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: p, done: w } = d.next();
          return w ? { value: p, done: w } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: w
          };
        }
      }
    );
  };
}
function Kt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ni(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ D(i), l = /* @__PURE__ */ D(r);
      e || (Pe(r, l) && ee(o, "get", r), ee(o, "get", l));
      const { has: c } = $t(o), d = t ? Hn : e ? ze : he;
      if (c.call(o, r))
        return d(i.get(r));
      if (c.call(o, l))
        return d(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && ee(/* @__PURE__ */ D(r), "iterate", it), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ D(i), l = /* @__PURE__ */ D(r);
      return e || (Pe(r, l) && ee(o, "has", r), ee(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ D(l), d = t ? Hn : e ? ze : he;
      return !e && ee(c, "iterate", it), l.forEach((a, p) => r.call(i, d(a), d(p), o));
    }
  };
  return Q(
    n,
    e ? {
      add: Kt("add"),
      set: Kt("set"),
      delete: Kt("delete"),
      clear: Kt("clear")
    } : {
      add(r) {
        const i = /* @__PURE__ */ D(this), o = $t(i), l = /* @__PURE__ */ D(r), c = !t && !/* @__PURE__ */ ae(r) && !/* @__PURE__ */ De(r) ? l : r;
        return o.has.call(i, c) || Pe(r, c) && o.has.call(i, r) || Pe(l, c) && o.has.call(i, l) || (i.add(c), He(i, "add", c, c)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ ae(i) && !/* @__PURE__ */ De(i) && (i = /* @__PURE__ */ D(i));
        const o = /* @__PURE__ */ D(this), { has: l, get: c } = $t(o);
        let d = l.call(o, r);
        d || (r = /* @__PURE__ */ D(r), d = l.call(o, r));
        const a = c.call(o, r);
        return o.set(r, i), d ? Pe(i, a) && He(o, "set", r, i) : He(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ D(this), { has: o, get: l } = $t(i);
        let c = o.call(i, r);
        c || (r = /* @__PURE__ */ D(r), c = o.call(i, r)), l && l.call(i, r);
        const d = i.delete(r);
        return c && He(i, "delete", r, void 0), d;
      },
      clear() {
        const r = /* @__PURE__ */ D(this), i = r.size !== 0, o = r.clear();
        return i && He(
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
    n[r] = Vi(r, e, t);
  }), n;
}
function rs(e, t) {
  const n = Ni(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_isShallow" ? t : r === "__v_raw" ? s : Reflect.get(
    j(n, r) && r in s ? n : s,
    r,
    i
  );
}
const Hi = {
  get: /* @__PURE__ */ rs(!1, !1)
}, Li = {
  get: /* @__PURE__ */ rs(!1, !0)
}, $i = {
  get: /* @__PURE__ */ rs(!0, !1)
};
const br = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), vr = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap();
function Ui(e) {
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
function is(e) {
  return /* @__PURE__ */ De(e) ? e : os(
    e,
    !1,
    Fi,
    Hi,
    br
  );
}
// @__NO_SIDE_EFFECTS__
function Wi(e) {
  return os(
    e,
    !1,
    ji,
    Li,
    xr
  );
}
// @__NO_SIDE_EFFECTS__
function Ln(e) {
  return os(
    e,
    !0,
    Di,
    $i,
    vr
  );
}
function os(e, t, n, s, r) {
  if (!V(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = Ui(di(e));
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
  return /* @__PURE__ */ De(e) ? /* @__PURE__ */ Je(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function De(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ae(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function pn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function D(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ D(t) : e;
}
function Bi(e) {
  return !j(e, "__v_skip") && Object.isExtensible(e) && sr(e, "__v_skip", !0), e;
}
const he = (e) => V(e) ? /* @__PURE__ */ is(e) : e, ze = (e) => V(e) ? /* @__PURE__ */ Ln(e) : e;
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function qi(e) {
  return Gi(e, !1);
}
function Gi(e, t) {
  return /* @__PURE__ */ Y(e) ? e : new ki(e, t);
}
class ki {
  constructor(t, n) {
    this.dep = new ss(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ D(t), this._value = n ? t : he(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ ae(t) || /* @__PURE__ */ De(t);
    t = s ? t : /* @__PURE__ */ D(t), Pe(t, n) && (this._rawValue = t, this._value = s ? t : he(t), this.dep.trigger());
  }
}
function Sr(e) {
  return /* @__PURE__ */ Y(e) ? e.value : e;
}
const Ji = {
  get: (e, t, n) => t === "__v_raw" ? e : Sr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ Y(r) && !/* @__PURE__ */ Y(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function wr(e) {
  return /* @__PURE__ */ Je(e) ? e : new Proxy(e, Ji);
}
class zi {
  constructor(t, n, s) {
    this._object = t, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._key = de(n) ? n : String(n), this._raw = /* @__PURE__ */ D(t);
    let r = !0, i = t;
    if (!O(t) || de(this._key) || !cn(this._key))
      do
        r = !/* @__PURE__ */ pn(i) || /* @__PURE__ */ ae(i);
      while (r && (i = i.__v_raw));
    this._shallow = r;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = Sr(t)), this._value = t === void 0 ? this._defaultValue : t;
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
    return Ai(this._raw, this._key);
  }
}
class Yi {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function zl(e, t, n) {
  return /* @__PURE__ */ Y(e) ? e : P(e) ? new Yi(e) : V(e) && arguments.length > 1 ? Xi(e, t, n) : /* @__PURE__ */ qi(e);
}
function Xi(e, t, n) {
  return new zi(e, t, n);
}
class Zi {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ss(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Et - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    W !== this)
      return cr(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return dr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Qi(e, t, n = !1) {
  let s, r;
  return P(e) ? s = e : (s = e.get, r = e.set), new Zi(s, r, n);
}
const Ut = {}, Xt = /* @__PURE__ */ new WeakMap();
let st;
function eo(e, t = !1, n = st) {
  if (n) {
    let s = Xt.get(n);
    s || Xt.set(n, s = []), s.push(e);
  }
}
function to(e, t, n = K) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n, d = (A) => r ? A : /* @__PURE__ */ ae(A) || r === !1 || r === 0 ? Le(A, 1) : Le(A);
  let a, p, w, C, N = !1, R = !1;
  if (/* @__PURE__ */ Y(e) ? (p = () => e.value, N = /* @__PURE__ */ ae(e)) : /* @__PURE__ */ Je(e) ? (p = () => d(e), N = !0) : O(e) ? (R = !0, N = e.some((A) => /* @__PURE__ */ Je(A) || /* @__PURE__ */ ae(A)), p = () => e.map((A) => {
    if (/* @__PURE__ */ Y(A))
      return A.value;
    if (/* @__PURE__ */ Je(A))
      return d(A);
    if (P(A))
      return c ? c(A, 2) : A();
  })) : P(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (w) {
      Ie();
      try {
        w();
      } finally {
        Fe();
      }
    }
    const A = st;
    st = a;
    try {
      return c ? c(e, 3, [C]) : e(C);
    } finally {
      st = A;
    }
  } : p = Re, t && r) {
    const A = p, z = r === !0 ? 1 / 0 : r;
    p = () => Le(A(), z);
  }
  const k = Ti(), B = () => {
    a.stop(), k && k.active && Yn(k.effects, a);
  };
  if (i && t) {
    const A = t;
    t = (...z) => {
      try {
        return A(...z);
      } finally {
        B();
      }
    };
  }
  let F = R ? new Array(e.length).fill(Ut) : Ut;
  const H = (A) => {
    if (!(!(a.flags & 1) || !a.dirty && !A))
      if (t) {
        const z = a.run();
        if (A || r || N || (R ? z.some((Be, Se) => Pe(Be, F[Se])) : Pe(z, F))) {
          const Be = st;
          Ie();
          try {
            w && w(), st = a;
            const Se = [
              z,
              // pass undefined as the old value when it's changed for the first time
              F === Ut ? void 0 : R && F[0] === Ut ? [] : F,
              C
            ];
            F = z, c ? c(t, 3, Se) : (
              // @ts-expect-error
              t(...Se)
            );
          } finally {
            st = Be, Fe();
          }
        }
      } else
        a.run();
  };
  return l && l(H), a = new lr(p), a.scheduler = o ? () => o(H, !1) : H, C = (A) => eo(A, !1, a), w = a.onStop = () => {
    const A = Xt.get(a);
    if (A) {
      if (c)
        c(A, 4);
      else
        for (const z of A) z();
      Xt.delete(a);
    }
  }, t ? s ? H(!0) : F = a.run() : o ? o(H.bind(null, !0), !0) : a.run(), B.pause = a.pause.bind(a), B.resume = a.resume.bind(a), B.stop = B, B;
}
function Le(e, t = 1 / 0, n) {
  if (t <= 0 || !V(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Y(e))
    Le(e.value, t, n);
  else if (O(e))
    for (let s = 0; s < e.length; s++)
      Le(e[s], t, n);
  else if (Ue(e) || ke(e))
    e.forEach((s) => {
      Le(s, t, n);
    });
  else if (tr(e)) {
    for (const s in e)
      Le(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Le(e[s], t, n);
  }
  return e;
}
function Ft(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    gn(r, t, n);
  }
}
function ve(e, t, n, s) {
  if (P(e)) {
    const r = Ft(e, t, n, s);
    return r && Qs(r) && r.catch((i) => {
      gn(i, t, n);
    }), r;
  }
  if (O(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(ve(e[i], t, n, s));
    return r;
  }
}
function gn(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || K;
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
      Ie(), Ft(i, null, 10, [
        e,
        c,
        d
      ]), Fe();
      return;
    }
  }
  no(e, n, r, s, o);
}
function no(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const re = [];
let _e = -1;
const Ae = [];
let Ge = null, lt = 0;
const Cr = /* @__PURE__ */ Promise.resolve();
let Zt = null;
function Tr(e) {
  const t = Zt || Cr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function so(e) {
  let t = _e + 1, n = re.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = re[s], i = At(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ls(e) {
  if (!(e.flags & 1)) {
    const t = At(e), n = re[re.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= At(n) ? re.push(e) : re.splice(so(t), 0, e), e.flags |= 1, Er();
  }
}
function Er() {
  Zt || (Zt = Cr.then(Mr));
}
function ro(e) {
  if (!O(e))
    Ge && e.id === -1 ? Ge.splice(lt + 1, 0, e) : e.flags & 1 || (Ae.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Ae.push(e[t]);
  Er();
}
function Or(e, t, n, s = _e + 1) {
  for (; s < re.length; s++) {
    const r = re[s];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid || t !== void 0 && !(r.id >= t))
        continue;
      re.splice(s, 1), s = e ? s - 1 : _e, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ar(e, t, n = 0) {
  if (Ae.length) {
    let s = Ae, r = 0;
    if (t) {
      s = [];
      for (let o = 0; o < Ae.length; o++) {
        const l = Ae[o];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? Ae[r++] = l : s.push(l);
      }
    }
    const i = [...new Set(s)].sort((o, l) => At(o) - At(l));
    if (Ae.length = r, Ge) {
      for (let o = 0; o < i.length; o++)
        Ge.push(i[o]);
      return;
    }
    for (Ge = i, lt = 0; lt < Ge.length; lt++) {
      const o = Ge[lt];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    Ge = null, lt = 0;
  }
}
let An = !1;
function io(e, t) {
  if (An) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(Ae);
  e(), An = !0;
  try {
    Or(void 0, t), Ar(void 0, n, t);
  } finally {
    An = !1;
  }
}
const At = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Mr(e) {
  try {
    for (_e = 0; _e < re.length; _e++) {
      const t = re[_e];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ft(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; _e < re.length; _e++) {
      const t = re[_e];
      t && (t.flags &= -2);
    }
    _e = -1, re.length = 0, Ar(), Zt = null, (re.length || Ae.length) && Mr();
  }
}
let te = null, Pr = null;
function Qt(e) {
  const t = te;
  return te = e, Pr = e && e.type.__scopeId || null, t;
}
function oo(e, t = te, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Vs(-1);
    const i = Qt(t), o = Ke.length;
    let l;
    try {
      l = e(...r);
    } finally {
      for (let c = Ke.length; c > o; c--) as();
      Qt(i), s._d && Vs(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Yl(e, t) {
  if (te === null)
    return e;
  const n = vn(te), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = K] = t[r];
    i && (P(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Le(o), s.push({
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
    c && (Ie(), ve(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Fe());
  }
}
function lo(e, t) {
  if (ie) {
    let n = ie.provides;
    const s = ie.parent && ie.parent.provides;
    s === n && (n = ie.provides = Object.create(s)), n[e] = t;
  }
}
function kt(e, t, n = !1) {
  const s = ol();
  if (s || ct) {
    let r = ct ? ct._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && P(t) ? t.call(s && s.proxy) : t;
  }
}
const fo = /* @__PURE__ */ Symbol.for("v-scx"), co = () => kt(fo);
function Mn(e, t, n) {
  return Rr(e, t, n);
}
function Rr(e, t, n = K) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = Q({}, n), c = t && s || !t && i !== "post";
  let d;
  if (Rt) {
    if (i === "sync") {
      const C = co();
      d = C.__watcherHandles || (C.__watcherHandles = []);
    } else if (!c) {
      const C = () => {
      };
      return C.stop = Re, C.resume = Re, C.pause = Re, C;
    }
  }
  const a = ie;
  l.call = (C, N, R) => ve(C, a, N, R);
  let p = !1;
  i === "post" ? l.scheduler = (C) => {
    C.i = a, oe(C, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (C, N) => {
    N ? C() : ls(C);
  }), l.augmentJob = (C) => {
    t && (C.flags |= 4), p && (C.flags |= 2, a && (C.id = a.uid, C.i = a));
  };
  const w = to(e, t, l);
  return Rt && (d ? d.push(w) : c && w()), w;
}
function uo(e, t, n) {
  const s = this.proxy, r = G(e) ? e.includes(".") ? Ir(s, e) : () => s[e] : e.bind(s, s);
  let i;
  P(t) ? i = t : (i = t.handler, n = t);
  const o = Dt(this), l = Rr(r, i.bind(s), n);
  return o(), l;
}
function Ir(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const ao = /* @__PURE__ */ Symbol("_vte"), _n = (e) => e.__isTeleport, Pn = /* @__PURE__ */ Symbol("_leaveCb");
function ho(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== pe) {
        t = n;
        break;
      }
  }
  return t;
}
function Fr(e) {
  if (!fs(e))
    return _n(e.type) && e.children ? ho(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && P(n.default))
      return n.default();
  }
}
function en(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    en(
      _n(n.type) && Fr(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === le && O(e.children)) {
    const n = Ur(e.children, !1);
    n && en(n, t);
  }
}
function $n(e) {
  if (e.component)
    return $n(e.component.subTree);
  if (e.type === le) {
    const t = O(e.children) && Ur(e.children, !1);
    return t ? $n(t) : void 0;
  }
  if (e.type !== pe)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Xl(e, t) {
  return P(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Q({ name: e.name }, t, { setup: e })
  ) : e;
}
function Dr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Es(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const tn = /* @__PURE__ */ new WeakMap();
function Ct(e, t, n, s, r = !1) {
  if (O(e)) {
    e.forEach(
      (R, k) => Ct(
        R,
        t && (O(t) ? t[k] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (ft(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Ct(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? vn(s.component) : s.el, o = r ? null : i, { i: l, r: c } = e, d = t && t.r, a = l.refs === K ? l.refs = {} : l.refs, p = l.setupState, w = /* @__PURE__ */ D(p), C = p === K ? Zs : (R) => Es(a, R) ? !1 : j(w, R), N = (R, k) => !(k && Es(a, k));
  if (d != null && d !== c) {
    if (Os(t), G(d))
      a[d] = null, C(d) && (p[d] = null);
    else if (/* @__PURE__ */ Y(d)) {
      const R = t;
      N(d, R.k) && (d.value = null), R.k && (a[R.k] = null);
    }
  }
  if (P(c))
    Ft(c, l, 12, [o, a]);
  else {
    const R = G(c), k = /* @__PURE__ */ Y(c);
    if (R || k) {
      const B = () => {
        if (e.f) {
          const F = R ? C(c) ? p[c] : a[c] : N() || !e.k ? c.value : a[e.k];
          if (r)
            O(F) && Yn(F, i);
          else if (O(F))
            F.includes(i) || F.push(i);
          else if (R)
            a[c] = [i], C(c) && (p[c] = a[c]);
          else {
            const H = [i];
            N(c, e.k) && (c.value = H), e.k && (a[e.k] = H);
          }
        } else R ? (a[c] = o, C(c) && (p[c] = o)) : k && (N(c, e.k) && (c.value = o), e.k && (a[e.k] = o));
      };
      if (o) {
        const F = () => {
          B(), tn.delete(e);
        };
        F.id = -1, tn.set(e, F), oe(F, n);
      } else
        Os(e), B();
    }
  }
}
function Os(e) {
  const t = tn.get(e);
  t && (t.flags |= 8, tn.delete(e));
}
dn().requestIdleCallback;
dn().cancelIdleCallback;
const ft = (e) => !!e.type.__asyncLoader, fs = (e) => e.type.__isKeepAlive;
function po(e, t) {
  jr(e, "a", t);
}
function go(e, t) {
  jr(e, "da", t);
}
function jr(e, t, n = ie) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (mn(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      fs(r.parent.vnode) && _o(s, t, n, r), r = r.parent;
  }
}
function _o(e, t, n, s) {
  const r = mn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Vr(() => {
    Yn(s[t], r);
  }, n);
}
function mn(e, t, n = ie, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Ie();
      const l = Dt(n), c = ve(t, n, e, o);
      return l(), Fe(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const We = (e) => (t, n = ie) => {
  (!Rt || e === "sp") && mn(e, (...s) => t(...s), n);
}, mo = We("bm"), yo = We("m"), bo = We(
  "bu"
), xo = We("u"), vo = We(
  "bum"
), Vr = We("um"), So = We(
  "sp"
), wo = We("rtg"), Co = We("rtc");
function To(e, t = ie) {
  mn("ec", e, t);
}
const Eo = /* @__PURE__ */ Symbol.for("v-ndc");
function Zl(e, t, n, s) {
  let r;
  const i = n, o = O(e);
  if (o || G(e)) {
    const l = o && /* @__PURE__ */ Je(e);
    let c = !1, d = !1;
    l && (c = !/* @__PURE__ */ ae(e), d = /* @__PURE__ */ De(e), e = hn(e)), r = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      r[a] = t(
        c ? d ? ze(he(e[a])) : he(e[a]) : e[a],
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
  else if (V(e))
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
function Ql(e, t, n, s, r, i) {
  if (n == null && (n = {}), te.ce || te.parent && ft(te.parent) && te.parent.ce) {
    const d = n, a = Object.keys(d).length > 0;
    return Gn(), kn(
      le,
      null,
      [be("slot", d, s)],
      a ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1);
  const l = Ke.length;
  Gn();
  let c;
  try {
    const d = o && Nr(o(n)), a = n.key || i || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    c = kn(
      le,
      {
        key: (a && !de(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && s ? "_fb" : "")
      },
      d || (s ? s() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let a = Ke.length; a > l; a--) as();
    throw d;
  } finally {
    o && o._c && (o._d = !0);
  }
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function Nr(e) {
  return e.some((t) => xn(t) ? !(t.type === pe || t.type === le && !Nr(t.children)) : !0) ? e : null;
}
const Kn = (e) => e ? ii(e) ? vn(e) : Kn(e.parent) : null, Tt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Q(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Kn(e.parent),
    $root: (e) => Kn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Lr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ls(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Tr.bind(e.proxy)),
    $watch: (e) => uo.bind(e)
  })
), Rn = (e, t) => e !== K && !e.__isScriptSetup && j(e, t), Oo = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const w = o[t];
      if (w !== void 0)
        switch (w) {
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
        if (Rn(s, t))
          return o[t] = 1, s[t];
        if (r !== K && j(r, t))
          return o[t] = 2, r[t];
        if (j(i, t))
          return o[t] = 3, i[t];
        if (n !== K && j(n, t))
          return o[t] = 4, n[t];
        Un && (o[t] = 0);
      }
    }
    const d = Tt[t];
    let a, p;
    if (d)
      return t === "$attrs" && ee(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== K && j(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, j(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Rn(r, t) ? (r[t] = n, !0) : s !== K && j(s, t) ? (s[t] = n, !0) : j(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== K && l[0] !== "$" && j(e, l) || Rn(t, l) || j(i, l) || j(s, l) || j(Tt, l) || j(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function As(e) {
  return O(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Un = !0;
function Ao(e) {
  const t = Lr(e), n = e.proxy, s = e.ctx;
  Un = !1, t.beforeCreate && Ms(t.beforeCreate, e, "bc");
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
    mounted: w,
    beforeUpdate: C,
    updated: N,
    activated: R,
    deactivated: k,
    beforeDestroy: B,
    beforeUnmount: F,
    destroyed: H,
    unmounted: A,
    render: z,
    renderTracked: Be,
    renderTriggered: Se,
    errorCaptured: qe,
    serverPrefetch: jt,
    // public API
    expose: Ze,
    inheritAttrs: dt,
    // assets
    components: Vt,
    directives: Nt,
    filters: Sn
  } = t;
  if (d && Mo(d, s, null), o)
    for (const q in o) {
      const U = o[q];
      P(U) && (s[q] = U.bind(n));
    }
  if (r) {
    const q = r.call(n, n);
    V(q) && (e.data = /* @__PURE__ */ is(q));
  }
  if (Un = !0, i)
    for (const q in i) {
      const U = i[q], Qe = P(U) ? U.bind(n, n) : P(U.get) ? U.get.bind(n, n) : Re, Ht = !P(U) && P(U.set) ? U.set.bind(n) : Re, et = dl({
        get: Qe,
        set: Ht
      });
      Object.defineProperty(s, q, {
        enumerable: !0,
        configurable: !0,
        get: () => et.value,
        set: (ge) => et.value = ge
      });
    }
  if (l)
    for (const q in l)
      Hr(l[q], s, n, q);
  if (c) {
    const q = P(c) ? c.call(n) : c;
    Reflect.ownKeys(q).forEach((U) => {
      lo(U, q[U]);
    });
  }
  a && Ms(a, e, "c");
  function ne(q, U) {
    O(U) ? U.forEach((Qe) => q(Qe.bind(n))) : U && q(U.bind(n));
  }
  if (ne(mo, p), ne(yo, w), ne(bo, C), ne(xo, N), ne(po, R), ne(go, k), ne(To, qe), ne(Co, Be), ne(wo, Se), ne(vo, F), ne(Vr, A), ne(So, jt), O(Ze))
    if (Ze.length) {
      const q = e.exposed || (e.exposed = {});
      Ze.forEach((U) => {
        Object.defineProperty(q, U, {
          get: () => n[U],
          set: (Qe) => n[U] = Qe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  z && e.render === Re && (e.render = z), dt != null && (e.inheritAttrs = dt), Vt && (e.components = Vt), Nt && (e.directives = Nt), jt && Dr(e);
}
function Mo(e, t, n = Re) {
  O(e) && (e = Wn(e));
  for (const s in e) {
    const r = e[s];
    let i;
    V(r) ? "default" in r ? i = kt(
      r.from || s,
      r.default,
      !0
    ) : i = kt(r.from || s) : i = kt(r), /* @__PURE__ */ Y(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function Ms(e, t, n) {
  ve(
    O(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Hr(e, t, n, s) {
  let r = s.includes(".") ? Ir(n, s) : () => n[s];
  if (G(e)) {
    const i = t[e];
    P(i) && Mn(r, i);
  } else if (P(e))
    Mn(r, e.bind(n));
  else if (V(e))
    if (O(e))
      e.forEach((i) => Hr(i, t, n, s));
    else {
      const i = P(e.handler) ? e.handler.bind(n) : t[e.handler];
      P(i) && Mn(r, i, e);
    }
}
function Lr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (d) => nn(c, d, o, !0)
  ), nn(c, t, o)), V(t) && i.set(t, c), c;
}
function nn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && nn(e, i, n, !0), r && r.forEach(
    (o) => nn(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = Po[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Po = {
  data: Ps,
  props: Rs,
  emits: Rs,
  // objects
  methods: bt,
  computed: bt,
  // lifecycle
  beforeCreate: se,
  created: se,
  beforeMount: se,
  mounted: se,
  beforeUpdate: se,
  updated: se,
  beforeDestroy: se,
  beforeUnmount: se,
  destroyed: se,
  unmounted: se,
  activated: se,
  deactivated: se,
  errorCaptured: se,
  serverPrefetch: se,
  // assets
  components: bt,
  directives: bt,
  // watch
  watch: Io,
  // provide / inject
  provide: Ps,
  inject: Ro
};
function Ps(e, t) {
  return t ? e ? function() {
    return Q(
      P(e) ? e.call(this, this) : e,
      P(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ro(e, t) {
  return bt(Wn(e), Wn(t));
}
function Wn(e) {
  if (O(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function bt(e, t) {
  return e ? Q(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Rs(e, t) {
  return e ? O(e) && O(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Q(
    /* @__PURE__ */ Object.create(null),
    As(e),
    As(t ?? {})
  ) : t;
}
function Io(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Q(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = se(e[s], t[s]);
  return n;
}
function $r() {
  return {
    app: null,
    config: {
      isNativeTag: Zs,
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
let Fo = 0;
function Do(e, t) {
  return function(s, r = null) {
    P(s) || (s = Q({}, s)), r != null && !V(r) && (r = null);
    const i = $r(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = i.app = {
      _uid: Fo++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: hl,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && P(a.install) ? (o.add(a), a.install(d, ...p)) : P(a) && (o.add(a), a(d, ...p))), d;
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
      mount(a, p, w) {
        if (!c) {
          const C = d._ceVNode || be(s, r);
          return C.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(C, a, w), c = !0, d._container = a, a.__vue_app__ = d, vn(C.component);
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
const jo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${me(t)}Modifiers`] || e[`${Xe(t)}Modifiers`];
function Vo(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || K;
  let r = n;
  const i = t.startsWith("update:"), o = i && jo(s, t.slice(7));
  o && (o.trim && (r = n.map((a) => G(a) ? a.trim() : a)), o.number && (r = r.map(an)));
  let l, c = s[l = wn(t)] || // also try camelCase event handler (#2249)
  s[l = wn(me(t))];
  !c && i && (c = s[l = wn(Xe(t))]), c && ve(
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
const No = /* @__PURE__ */ new WeakMap();
function Kr(e, t, n = !1) {
  const s = n ? No : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!P(e)) {
    const c = (d) => {
      const a = Kr(d, t, !0);
      a && (l = !0, Q(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (V(e) && s.set(e, null), null) : (O(i) ? i.forEach((c) => o[c] = null) : Q(o, i), V(e) && s.set(e, o), o);
}
function yn(e, t) {
  return !e || !ln(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, Xe(t)) || j(e, t));
}
function Is(e) {
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
    data: w,
    setupState: C,
    ctx: N,
    inheritAttrs: R
  } = e, k = Qt(e);
  let B, F;
  try {
    if (n.shapeFlag & 4) {
      const A = r || s, z = A;
      B = Me(
        d.call(
          z,
          A,
          a,
          p,
          C,
          w,
          N
        )
      ), F = l;
    } else {
      const A = t;
      B = Me(
        A.length > 1 ? A(
          p,
          { attrs: l, slots: o, emit: c }
        ) : A(
          p,
          null
        )
      ), F = t.props ? l : Ho(l);
    }
  } catch (A) {
    Ke.length = 0, gn(A, e, 1), B = be(pe);
  }
  let H = B;
  if (F && R !== !1) {
    const A = Object.keys(F), { shapeFlag: z } = H;
    A.length && z & 7 && (i && A.some(fn) && (F = Lo(
      F,
      i
    )), H = ut(H, F, !1, !0));
  }
  if (n.dirs && (H = ut(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const A = _n(H.type) && Fr(H) || H;
    en(A, n.transition);
  }
  return B = H, Qt(k), B;
}
function Ur(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    if (xn(r)) {
      if (r.type !== pe || r.children === "v-if") {
        if (n)
          return;
        n = r;
      }
    } else
      return;
  }
  return n;
}
const Ho = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ln(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Lo = (e, t) => {
  const n = {};
  for (const s in e)
    (!fn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function $o(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? Fs(s, o, d) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const w = a[p];
        if (Wr(o, s, w) && !yn(d, w))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Fs(s, o, d) : !0 : !!o;
  return !1;
}
function Fs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (!j(e, i) || Wr(t, e, i) && !yn(n, i))
      return !0;
  }
  return !1;
}
function Wr(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && V(s) && V(r) ? !xe(s, r) : s !== r;
}
function Ko({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = s, e = r), r === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const Br = {}, qr = () => Object.create(Br), Gr = (e) => Object.getPrototypeOf(e) === Br;
function Uo(e, t, n, s = !1) {
  const r = {}, i = qr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), kr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ Wi(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Wo(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ D(r), [c] = e.propsOptions;
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
        let w = a[p];
        if (yn(e.emitsOptions, w))
          continue;
        const C = t[w];
        if (c)
          if (j(i, w))
            C !== i[w] && (i[w] = C, d = !0);
          else {
            const N = me(w);
            r[N] = Bn(
              c,
              l,
              N,
              C,
              e,
              !1
            );
          }
        else
          C !== i[w] && (i[w] = C, d = !0);
      }
    }
  } else {
    kr(e, t, r, i) && (d = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !j(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Xe(p)) === p || !j(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[p] = Bn(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !j(t, p)) && (delete i[p], d = !0);
  }
  d && He(e.attrs, "set", "");
}
function kr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (vt(c))
        continue;
      const d = t[c];
      let a;
      r && j(r, a = me(c)) ? !i || !i.includes(a) ? n[a] = d : (l || (l = {}))[a] = d : yn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, o = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ D(n), d = l || K;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      n[p] = Bn(
        r,
        c,
        p,
        d[p],
        e,
        !j(d, p)
      );
    }
  }
  return o;
}
function Bn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = j(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && P(c)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const a = Dt(r);
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
const Bo = /* @__PURE__ */ new WeakMap();
function Jr(e, t, n = !1) {
  const s = n ? Bo : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let c = !1;
  if (!P(e)) {
    const a = (p) => {
      c = !0;
      const [w, C] = Jr(p, t, !0);
      Q(o, w), C && l.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return V(e) && s.set(e, rt), rt;
  if (O(i))
    for (let a = 0; a < i.length; a++) {
      const p = me(i[a]);
      Ds(p) && (o[p] = K);
    }
  else if (i)
    for (const a in i) {
      const p = me(a);
      if (Ds(p)) {
        const w = i[a], C = o[p] = O(w) || P(w) ? { type: w } : Q({}, w), N = C.type;
        let R = !1, k = !0;
        if (O(N))
          for (let B = 0; B < N.length; ++B) {
            const F = N[B], H = P(F) && F.name;
            if (H === "Boolean") {
              R = !0;
              break;
            } else H === "String" && (k = !1);
          }
        else
          R = P(N) && N.name === "Boolean";
        C[
          0
          /* shouldCast */
        ] = R, C[
          1
          /* shouldCastTrue */
        ] = k, (R || j(C, "default")) && l.push(p);
      }
    }
  const d = [o, l];
  return V(e) && s.set(e, d), d;
}
function Ds(e) {
  return e[0] !== "$" && !vt(e);
}
const cs = (e) => e === "_" || e === "_ctx" || e === "$stable", us = (e) => O(e) ? e.map(Me) : [Me(e)], qo = (e, t, n) => {
  if (t._n)
    return t;
  const s = oo((...r) => us(t(...r)), n);
  return s._c = !1, s;
}, zr = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (cs(r)) continue;
    const i = e[r];
    if (P(i))
      t[r] = qo(r, i, s);
    else if (i != null) {
      const o = us(i);
      t[r] = () => o;
    }
  }
}, Yr = (e, t) => {
  const n = us(t);
  e.slots.default = () => n;
}, Xr = (e, t, n) => {
  for (const s in t)
    (n || !cs(s)) && (e[s] = t[s]);
}, Go = (e, t, n) => {
  const s = e.slots = qr();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Xr(s, t, n), n && sr(s, "_", r, !0)) : zr(t, s);
  } else t && Yr(e, t);
}, ko = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = K;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Xr(r, t, n) : (i = !t.$stable, zr(t, r)), o = t;
  } else t && (Yr(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !cs(l) && o[l] == null && delete r[l];
}, oe = Zo;
function Jo(e) {
  return zo(e);
}
function zo(e, t) {
  const n = dn();
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
    nextSibling: w,
    setScopeId: C = Re,
    insertStaticContent: N
  } = e, R = (f, u, h, y = null, _ = null, m = null, v = void 0, x = null, b = !!u.dynamicChildren) => {
    if (f === u)
      return;
    f && !mt(f, u) && (y = Lt(f), ge(f, _, m, !0), f = null), u.patchFlag === -2 && (b = !1, u.dynamicChildren = null), u.dynamicChildren && f && f.dynamicChildren && f.dynamicChildren.hasOnce && (u.dynamicChildren === rt && (u.dynamicChildren = []), u.dynamicChildren.hasOnce = !0);
    const { type: g, ref: T, shapeFlag: S } = u;
    switch (g) {
      case bn:
        k(f, u, h, y);
        break;
      case pe:
        B(f, u, h, y);
        break;
      case Jt:
        f == null && F(u, h, y, v);
        break;
      case le:
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
        S & 1 ? z(
          f,
          u,
          h,
          y,
          _,
          m,
          v,
          x,
          b
        ) : S & 6 ? Nt(
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
          pt
        );
    }
    T != null && _ ? Ct(T, f && f.ref, m, u || f, !u) : T == null && f && f.ref != null && Ct(f.ref, null, m, f, !0);
  }, k = (f, u, h, y) => {
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
  }, B = (f, u, h, y) => {
    f == null ? s(
      u.el = c(u.children || ""),
      h,
      y
    ) : u.el = f.el;
  }, F = (f, u, h, y) => {
    [f.el, f.anchor] = N(
      f.children,
      u,
      h,
      y,
      f.el,
      f.anchor
    );
  }, H = ({ el: f, anchor: u }, h, y) => {
    let _;
    for (; f && f !== u; )
      _ = w(f), s(f, h, y), f = _;
    s(u, h, y);
  }, A = ({ el: f, anchor: u }) => {
    let h;
    for (; f && f !== u; )
      h = w(f), r(f), f = h;
    r(u);
  }, z = (f, u, h, y, _, m, v, x, b) => {
    if (u.type === "svg" ? v = "svg" : u.type === "math" && (v = "mathml"), f == null)
      Be(
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
  }, Be = (f, u, h, y, _, m, v, x) => {
    let b, g;
    const { props: T, shapeFlag: S, transition: E, dirs: M } = f;
    if (b = f.el = o(
      f.type,
      m,
      T && T.is,
      T
    ), S & 8 ? a(b, f.children) : S & 16 && qe(
      f.children,
      b,
      null,
      y,
      _,
      In(f, m),
      v,
      x
    ), M && tt(f, null, y, "created"), Se(b, f, f.scopeId, v, y), T) {
      for (const $ in T)
        $ !== "value" && !vt($) && i(b, $, null, T[$], m, y);
      "value" in T && i(b, "value", null, T.value, m), (g = T.onVnodeBeforeMount) && Ee(g, y, f);
    }
    M && tt(f, null, y, "beforeMount");
    const I = Yo(_, E);
    I && E.beforeEnter(b), s(b, u, h), ((g = T && T.onVnodeMounted) || I || M) && oe(() => {
      g && Ee(g, y, f), I && E.enter(b), M && tt(f, null, y, "mounted");
    }, _);
  }, Se = (f, u, h, y, _) => {
    if (h && C(f, h), y)
      for (let m = 0; m < y.length; m++)
        C(f, y[m]);
    if (_) {
      let m = _.subTree;
      if (u === m || ei(m.type) && (m.ssContent === u || m.ssFallback === u)) {
        const v = _.vnode;
        Se(
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
      const T = f[g] = x ? Ne(f[g]) : Me(f[g]);
      R(
        null,
        T,
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
    let { patchFlag: b, dynamicChildren: g, dirs: T } = u;
    b |= f.patchFlag & 16;
    const S = f.props || K, E = u.props || K;
    let M;
    if (h && nt(h, !1), (M = E.onVnodeBeforeUpdate) && Ee(M, h, u, f), T && tt(u, f, h, "beforeUpdate"), h && nt(h, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    g && (!f.dynamicChildren || f.dynamicChildren.length !== g.length) && (b = 0, v = !1, g = null), (S.innerHTML && E.innerHTML == null || S.textContent && E.textContent == null) && a(x, ""), g ? Ze(
      f.dynamicChildren,
      g,
      x,
      h,
      y,
      In(u, _),
      m
    ) : v || U(
      f,
      u,
      x,
      null,
      h,
      y,
      In(u, _),
      m,
      !1
    ), b > 0) {
      if (b & 16)
        dt(x, S, E, h, _);
      else if (b & 2 && S.class !== E.class && i(x, "class", null, E.class, _), b & 4 && i(x, "style", S.style, E.style, _), b & 8) {
        const I = u.dynamicProps;
        for (let $ = 0; $ < I.length; $++) {
          const L = I[$], J = S[L], X = E[L];
          (X !== J || L === "value") && i(x, L, J, X, _, h);
        }
      }
      b & 1 && f.children !== u.children && a(x, u.children);
    } else !v && g == null && dt(x, S, E, h, _);
    ((M = E.onVnodeUpdated) || T) && oe(() => {
      M && Ee(M, h, u, f), T && tt(u, f, h, "updated");
    }, y);
  }, Ze = (f, u, h, y, _, m, v) => {
    for (let x = 0; x < u.length; x++) {
      const b = f[x], g = u[x], T = b.el || qn(b), S = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        T && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !mt(b, g) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? p(T) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      R(
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
  }, dt = (f, u, h, y, _) => {
    if (u !== h) {
      if (u !== K)
        for (const m in u)
          !vt(m) && !(m in h) && i(
            f,
            m,
            u[m],
            null,
            _,
            y
          );
      for (const m in h) {
        if (vt(m)) continue;
        const v = h[m], x = u[m];
        v !== x && m !== "value" && i(f, m, x, v, _, y);
      }
      "value" in h && i(f, "value", u.value, h.value, _);
    }
  }, Vt = (f, u, h, y, _, m, v, x, b) => {
    const g = u.el = f ? f.el : l(""), T = u.anchor = f ? f.anchor : l("");
    let { patchFlag: S, dynamicChildren: E, slotScopeIds: M } = u;
    M && (x = x ? x.concat(M) : M), f == null ? (s(g, h, y), s(T, h, y), qe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      T,
      _,
      m,
      v,
      x,
      b
    )) : S > 0 && S & 64 && E && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === E.length ? (Ze(
      f.dynamicChildren,
      E,
      h,
      _,
      m,
      v,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || _ && u === _.subTree) && Zr(
      f,
      u,
      !0
      /* shallow */
    )) : U(
      f,
      u,
      h,
      T,
      _,
      m,
      v,
      x,
      b
    );
  }, Nt = (f, u, h, y, _, m, v, x, b) => {
    u.slotScopeIds = x, f == null ? u.shapeFlag & 512 ? _.ctx.activate(
      u,
      h,
      y,
      v,
      b
    ) : Sn(
      u,
      h,
      y,
      _,
      m,
      v,
      b
    ) : ds(f, u, b);
  }, Sn = (f, u, h, y, _, m, v) => {
    const x = f.component = il(
      f,
      y,
      _
    );
    if (fs(f) && (x.ctx.renderer = pt), ll(x, !1, v), x.asyncDep) {
      if (_ && _.registerDep(
        x,
        ne,
        v,
        m
      ), !f.el) {
        const b = x.subTree = be(pe);
        B(null, b, u, h), f.placeholder = b.el;
      }
    } else
      ne(
        x,
        f,
        u,
        h,
        _,
        m,
        v
      );
  }, ds = (f, u, h) => {
    const y = u.component = f.component;
    if ($o(f, u, h))
      if (y.asyncDep && !y.asyncResolved) {
        u.el = f.el, u.placeholder = f.placeholder, q(y, u, h);
        return;
      } else
        y.next = u, y.update();
    else
      u.el = f.el, u.placeholder = f.placeholder, y.vnode = u;
  }, ne = (f, u, h, y, _, m, v) => {
    const x = () => {
      if (f.isMounted) {
        let { next: S, bu: E, u: M, parent: I, vnode: $ } = f;
        {
          const Ce = Qr(f);
          if (Ce) {
            S && (S.el = $.el, q(f, S, v)), Ce.asyncDep.then(() => {
              oe(() => {
                f.isUnmounted || g();
              }, _);
            });
            return;
          }
        }
        let L = S, J;
        nt(f, !1), S ? (S.el = $.el, q(f, S, v)) : S = $, E && Gt(E), (J = S.props && S.props.onVnodeBeforeUpdate) && Ee(J, I, S, $), nt(f, !0);
        const X = Is(f), we = f.subTree;
        f.subTree = X, R(
          we,
          X,
          // parent may have changed if it's in a teleport
          p(we.el),
          // anchor may have changed if it's in a fragment
          Lt(we),
          f,
          _,
          m
        ), S.el = X.el, L === null && Ko(f, X.el), M && oe(M, _), (J = S.props && S.props.onVnodeUpdated) && oe(
          () => Ee(J, I, S, $),
          _
        );
      } else {
        let S;
        const { el: E, props: M } = u, { bm: I, m: $, parent: L, root: J, type: X } = f, we = ft(u);
        nt(f, !1), I && Gt(I), !we && (S = M && M.onVnodeBeforeMount) && Ee(S, L, u), nt(f, !0);
        {
          J.ce && J.ce._hasShadowRoot() && J.ce._injectChildStyle(
            X,
            f.parent ? f.parent.type : void 0
          );
          const Ce = f.subTree = Is(f);
          R(
            null,
            Ce,
            h,
            y,
            f,
            _,
            m
          ), u.el = Ce.el;
        }
        if ($ && oe($, _), !we && (S = M && M.onVnodeMounted)) {
          const Ce = u;
          oe(
            () => Ee(S, L, Ce),
            _
          );
        }
        (u.shapeFlag & 256 || L && ft(L.vnode) && L.vnode.shapeFlag & 256) && f.a && oe(f.a, _), f.isMounted = !0, u = h = y = null;
      }
    };
    f.scope.on();
    const b = f.effect = new lr(x);
    f.scope.off();
    const g = f.update = b.run.bind(b), T = f.job = b.runIfDirty.bind(b);
    T.i = f, T.id = f.uid, b.scheduler = () => ls(T), nt(f, !0), g();
  }, q = (f, u, h) => {
    u.component = f;
    const y = f.vnode.props;
    f.vnode = u, f.next = null, Wo(f, u.props, y, h), ko(f, u.children, h), Ie(), Or(f), Fe();
  }, U = (f, u, h, y, _, m, v, x, b = !1) => {
    const g = f && f.children, T = f ? f.shapeFlag : 0, S = u.children, { patchFlag: E, shapeFlag: M } = u;
    if (E > 0) {
      if (E & 128) {
        Ht(
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
      } else if (E & 256) {
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
    M & 8 ? (T & 16 && ht(g, _, m), S !== g && a(h, S)) : T & 16 ? M & 16 ? Ht(
      g,
      S,
      h,
      y,
      _,
      m,
      v,
      x,
      b
    ) : ht(g, _, m, !0) : (T & 8 && a(h, ""), M & 16 && qe(
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
    const g = f.length, T = u.length, S = Math.min(g, T);
    let E;
    for (E = 0; E < S; E++) {
      const M = u[E] = b ? Ne(u[E]) : Me(u[E]);
      R(
        f[E],
        M,
        h,
        null,
        _,
        m,
        v,
        x,
        b
      );
    }
    g > T ? ht(
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
  }, Ht = (f, u, h, y, _, m, v, x, b) => {
    let g = 0;
    const T = u.length;
    let S = f.length - 1, E = T - 1;
    for (; g <= S && g <= E; ) {
      const M = f[g], I = u[g] = b ? Ne(u[g]) : Me(u[g]);
      if (mt(M, I))
        R(
          M,
          I,
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
    for (; g <= S && g <= E; ) {
      const M = f[S], I = u[E] = b ? Ne(u[E]) : Me(u[E]);
      if (mt(M, I))
        R(
          M,
          I,
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
      S--, E--;
    }
    if (g > S) {
      if (g <= E) {
        const M = E + 1, I = M < T ? u[M].el : y;
        for (; g <= E; )
          R(
            null,
            u[g] = b ? Ne(u[g]) : Me(u[g]),
            h,
            I,
            _,
            m,
            v,
            x,
            b
          ), g++;
      }
    } else if (g > E)
      for (; g <= S; )
        ge(f[g], _, m, !0), g++;
    else {
      const M = g, I = g, $ = /* @__PURE__ */ new Map();
      for (g = I; g <= E; g++) {
        const fe = u[g] = b ? Ne(u[g]) : Me(u[g]);
        fe.key != null && $.set(fe.key, g);
      }
      let L, J = 0;
      const X = E - I + 1;
      let we = !1, Ce = 0;
      const gt = new Array(X);
      for (g = 0; g < X; g++) gt[g] = 0;
      for (g = M; g <= S; g++) {
        const fe = f[g];
        if (J >= X) {
          ge(fe, _, m, !0);
          continue;
        }
        let Te;
        if (fe.key != null)
          Te = $.get(fe.key);
        else
          for (L = I; L <= E; L++)
            if (gt[L - I] === 0 && mt(fe, u[L])) {
              Te = L;
              break;
            }
        Te === void 0 ? ge(fe, _, m, !0) : (gt[Te - I] = g + 1, Te >= Ce ? Ce = Te : we = !0, R(
          fe,
          u[Te],
          h,
          null,
          _,
          m,
          v,
          x,
          b
        ), J++);
      }
      const _s = we ? Xo(gt) : rt;
      for (L = _s.length - 1, g = X - 1; g >= 0; g--) {
        const fe = I + g, Te = u[fe], ms = u[fe + 1], ys = fe + 1 < T ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ms.el || qn(ms)
        ) : y;
        gt[g] === 0 ? R(
          null,
          Te,
          h,
          ys,
          _,
          m,
          v,
          x,
          b
        ) : we && (L < 0 || g !== _s[L] ? et(Te, h, ys, 2) : L--);
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
      v.move(f, u, h, pt);
      return;
    }
    if (v === le) {
      s(m, u, h);
      for (let S = 0; S < b.length; S++)
        et(b[S], u, h, y);
      s(f.anchor, u, h);
      return;
    }
    if (v === Jt) {
      H(f, u, h);
      return;
    }
    if (y !== 2 && g & 1 && x)
      if (y === 0)
        x.persisted && !m[Pn] ? s(m, u, h) : (x.beforeEnter(m), s(m, u, h), oe(() => x.enter(m), _));
      else {
        const { leave: S, delayLeave: E, afterLeave: M } = x, I = () => {
          f.ctx.isUnmounted ? r(m) : s(m, u, h);
        }, $ = () => {
          const L = m._isLeaving || !!m[Pn];
          m._isLeaving && m[Pn](
            !0
            /* cancelled */
          ), x.persisted && !L ? I() : S(m, () => {
            I(), M && M();
          });
        };
        E ? E(m, I, $) : $();
      }
    else
      s(m, u, h);
  }, ge = (f, u, h, y = !1, _ = !1) => {
    const {
      type: m,
      props: v,
      ref: x,
      children: b,
      dynamicChildren: g,
      shapeFlag: T,
      patchFlag: S,
      dirs: E,
      cacheIndex: M,
      memo: I
    } = f;
    if ((S === -2 || g && g.hasOnce) && (_ = !1), x != null && (Ie(), Ct(x, null, h, f, !0), Fe()), M != null && (!f.ctx || f.ctx === u) && (u.renderCache[M] = void 0), T & 256) {
      u.ctx.deactivate(f);
      return;
    }
    const $ = T & 1 && E, L = !ft(f);
    let J;
    if (L && (J = v && v.onVnodeBeforeUnmount) && Ee(J, u, f), T & 6)
      ui(f.component, h, y);
    else {
      if (T & 128) {
        f.suspense.unmount(h, y);
        return;
      }
      $ && tt(f, null, u, "beforeUnmount"), T & 64 ? f.type.remove(
        f,
        u,
        h,
        pt,
        y
      ) : g && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !g.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (m !== le || S > 0 && S & 64) ? ht(
        g,
        u,
        h,
        !1,
        !0
      ) : (m === le && S & 384 || !_ && T & 16) && ht(b, u, h), y && hs(f);
    }
    const X = I != null && M == null;
    (L && (J = v && v.onVnodeUnmounted) || $ || X) && oe(() => {
      J && Ee(J, u, f), $ && tt(f, null, u, "unmounted"), X && (f.el = null);
    }, h);
  }, hs = (f) => {
    const { type: u, el: h, anchor: y, transition: _ } = f, m = u === le;
    if (m && !_) {
      ps(h, y);
      return;
    }
    if (u === Jt) {
      A(f), _ && !_.persisted && _.afterLeave && _.afterLeave();
      return;
    }
    const v = m ? $n(f) : f, x = () => {
      m ? p(h) && ps(h, y) : r(h), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (v && v.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: b, delayLeave: g } = _, T = v.el, S = () => b(T, x);
      g ? g(T, x, S) : S();
    } else
      x();
  }, ps = (f, u) => {
    let h;
    for (; f !== u; )
      h = w(f), r(f), f = h;
    r(u);
  }, ui = (f, u, h) => {
    const { bum: y, scope: _, job: m, subTree: v, um: x, m: b, a: g } = f;
    js(b), js(g), y && Gt(y), _.stop(), m ? (m.flags |= 8, ge(v, f, u, h)) : f.vnode.el && v && (v.transition = f.vnode.transition, ge(v, f, u, h)), x && oe(x, u), oe(() => {
      f.isUnmounted = !0;
    }, u);
  }, ht = (f, u, h, y = !1, _ = !1, m = 0) => {
    for (let v = m; v < f.length; v++)
      ge(f[v], u, h, y, _);
  }, Lt = (f) => {
    if (f.shapeFlag & 6)
      return Lt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const u = w(f.anchor || f.el), h = u && u[ao];
    return h ? w(h) : u;
  }, gs = (f, u, h) => {
    const y = f && u._vnode ? void 0 : f && f.component ? f.component.uid : rl();
    io(() => {
      f == null ? u._vnode && ge(u._vnode, null, null, !0) : R(
        u._vnode || null,
        f,
        u,
        null,
        null,
        null,
        h
      ), u._vnode = f;
    }, y);
  }, pt = {
    p: R,
    um: ge,
    m: et,
    r: hs,
    mt: Sn,
    mc: qe,
    pc: U,
    pbc: Ze,
    n: Lt,
    o: e
  };
  return {
    render: gs,
    hydrate: void 0,
    createApp: Do(gs)
  };
}
function In({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function nt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Yo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Zr(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (O(s) && O(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Ne(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && Zr(o, l)), l.type === bn && (l.patchFlag === -1 && (l = r[i] = Ne(l)), l.el = o.el), l.type === pe && !l.el && (l.el = o.el);
    }
}
function Xo(e) {
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
function Qr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Qr(t);
}
function js(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function qn(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? qn(t.subTree) : null;
}
const ei = (e) => e.__isSuspense;
function Zo(e, t) {
  t && t.pendingBranch ? O(e) ? t.effects.push(...e) : t.effects.push(e) : ro(e);
}
const le = /* @__PURE__ */ Symbol.for("v-fgt"), bn = /* @__PURE__ */ Symbol.for("v-txt"), pe = /* @__PURE__ */ Symbol.for("v-cmt"), Jt = /* @__PURE__ */ Symbol.for("v-stc"), Ke = [];
let ce = null;
function Gn(e = !1) {
  Ke.push(ce = e ? null : []);
}
function as() {
  Ke.pop(), ce = Ke[Ke.length - 1] || null;
}
let Mt = 1;
function Vs(e, t = !1) {
  Mt += e, e < 0 && ce && t && (ce.hasOnce = !0);
}
function ti(e) {
  return e.dynamicChildren = Mt > 0 ? ce || rt : null, as(), Mt > 0 && ce && ce.push(e), e;
}
function ef(e, t, n, s, r, i) {
  return ti(
    si(
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
function kn(e, t, n, s, r) {
  return ti(
    be(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function xn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function mt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ni = ({ key: e }) => e ?? null, zt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? G(e) || /* @__PURE__ */ Y(e) || P(e) ? { i: te, r: e, k: t, f: !!n } : e : null);
function si(e, t = null, n = null, s = 0, r = null, i = e === le ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ni(t),
    ref: t && zt(t),
    scopeId: Pr,
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
    ctx: te
  };
  return l ? (sn(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= G(n) ? 8 : 16), Mt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ce.push(c), c;
}
const be = Qo;
function Qo(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Eo) && (e = pe), xn(e)) {
    const l = ut(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && sn(l, n), Mt > 0 && !i && ce && (l.shapeFlag & 6 ? ce[ce.indexOf(e)] = l : ce.push(l)), l.patchFlag = -2, l;
  }
  if (al(e) && (e = e.__vccOpts), t) {
    t = el(t);
    let { class: l, style: c } = t;
    l && !G(l) && (t.class = Zn(l)), V(c) && (/* @__PURE__ */ pn(c) && !O(c) && (c = Q({}, c)), t.style = Xn(c));
  }
  const o = G(e) ? 1 : ei(e) ? 128 : _n(e) ? 64 : V(e) ? 4 : P(e) ? 2 : 0;
  return si(
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
function el(e) {
  return e ? /* @__PURE__ */ pn(e) || Gr(e) ? Q({}, e) : e : null;
}
function ut(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, d = t ? nl(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && ni(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? O(i) ? i.concat(zt(t)) : [i, zt(t)] : zt(t)
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
    patchFlag: t && e.type !== le ? o === -1 ? 16 : o | 16 : o,
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
  return c && s && en(
    a,
    c.clone(a)
  ), a;
}
function tl(e = " ", t = 0) {
  return be(bn, null, e, t);
}
function tf(e, t) {
  const n = be(Jt, null, e);
  return n.staticCount = t, n;
}
function nf(e = "", t = !1) {
  return t ? (Gn(), kn(pe, null, e)) : be(pe, null, e);
}
function Me(e) {
  return e == null || typeof e == "boolean" ? be(pe) : O(e) ? be(
    le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : xn(e) ? Ne(e) : be(bn, null, String(e));
}
function Ne(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ut(e);
}
function sn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (O(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), sn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Gr(t) ? t._ctx = te : r === 3 && te && (te.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (P(t)) {
    if (s & 65) {
      sn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: te }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [tl(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function nl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Zn([t.class, s.class]));
      else if (r === "style")
        t.style = Xn([t.style, s.style]);
      else if (ln(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(O(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !fn(r) && (t[r] = o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Ee(e, t, n, s = null) {
  ve(e, t, 7, [
    n,
    s
  ]);
}
const sl = $r();
let ri = 0;
function rl() {
  return ri;
}
function il(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || sl, i = {
    uid: ri++,
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
    scope: new Ci(
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
    propsOptions: Jr(s, r),
    emitsOptions: Kr(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: K,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: K,
    data: K,
    props: K,
    attrs: K,
    slots: K,
    refs: K,
    setupState: K,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Vo.bind(null, i), e.ce && e.ce(i), i;
}
let ie = null;
const ol = () => ie || te;
let rn, Pt;
{
  const e = dn(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  rn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ie = n
  ), Pt = t(
    "__VUE_SSR_SETTERS__",
    (n) => Rt = n
  );
}
const Dt = (e) => {
  const t = ie;
  return rn(e), e.scope.on(), () => {
    e.scope.off(), rn(t);
  };
}, Ns = () => {
  ie && ie.scope.off(), rn(null);
};
function ii(e) {
  return e.vnode.shapeFlag & 4;
}
let Rt = !1;
function ll(e, t = !1, n = !1) {
  t && Pt(t);
  const { props: s, children: r } = e.vnode, i = ii(e);
  Uo(e, s, i, t), Go(e, r, n || t);
  const o = i ? fl(e, t) : void 0;
  return t && Pt(!1), o;
}
function fl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Oo);
  const { setup: s } = n;
  if (s) {
    Ie();
    const r = e.setupContext = s.length > 1 ? ul(e) : null, i = Dt(e), o = Ft(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Qs(o);
    if (Fe(), i(), (l || e.sp) && !ft(e) && Dr(e), l) {
      if (o.then(Ns, Ns), t)
        return o.then((c) => {
          Pt(!0);
          try {
            Hs(e, c, t);
          } finally {
            Pt(!1);
          }
        }).catch((c) => {
          gn(c, e, 0);
        });
      e.asyncDep = o;
    } else
      Hs(e, o);
  } else
    oi(e);
}
function Hs(e, t, n) {
  P(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : V(t) && (e.setupState = wr(t)), oi(e);
}
function oi(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Re);
  {
    const r = Dt(e);
    Ie();
    try {
      Ao(e);
    } finally {
      Fe(), r();
    }
  }
}
const cl = {
  get(e, t) {
    return ee(e, "get", ""), e[t];
  }
};
function ul(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, cl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function vn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(wr(Bi(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Tt)
        return Tt[n](e);
    },
    has(t, n) {
      return n in t || n in Tt;
    }
  })) : e.proxy;
}
function al(e) {
  return P(e) && "__vccOpts" in e;
}
const dl = (e, t) => /* @__PURE__ */ Qi(e, t, Rt), hl = "3.5.44";
let Jn;
const Ls = typeof window < "u" && window.trustedTypes;
if (Ls)
  try {
    Jn = /* @__PURE__ */ Ls.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const li = Jn ? (e) => Jn.createHTML(e) : (e) => e, pl = "http://www.w3.org/2000/svg", gl = "http://www.w3.org/1998/Math/MathML", Ve = typeof document < "u" ? document : null, $s = Ve && /* @__PURE__ */ Ve.createElement("template"), _l = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? Ve.createElementNS(pl, e) : t === "mathml" ? Ve.createElementNS(gl, e) : n ? Ve.createElement(e, { is: n }) : Ve.createElement(e);
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
      $s.innerHTML = li(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = $s.content;
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
}, ml = /* @__PURE__ */ Symbol("_vtc");
function yl(e, t, n) {
  const s = e[ml];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const on = /* @__PURE__ */ Symbol("_vod"), fi = /* @__PURE__ */ Symbol("_vsh"), sf = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[on] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : yt(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), yt(e, !0), s.enter(e)) : s.leave(e, () => {
      yt(e, !1);
    }) : yt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    yt(e, t);
  }
};
function yt(e, t) {
  e.style.display = t ? e[on] : "none", e[fi] = !t;
}
const bl = /* @__PURE__ */ Symbol(""), xl = /(?:^|;)\s*display\s*:/;
function vl(e, t, n) {
  const s = e.style, r = G(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (G(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && xt(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && xt(s, o, "");
    for (const o in n) {
      o === "display" && (i = !0);
      const l = n[o];
      l != null ? wl(
        e,
        o,
        !G(t) && t ? t[o] : void 0,
        l
      ) || xt(s, o, l) : xt(s, o, "");
    }
  } else if (r) {
    if (t !== n) {
      const o = s[bl];
      o && (n += ";" + o), s.cssText = n, i = xl.test(n);
    }
  } else t && e.removeAttribute("style");
  on in e && ((!r || t !== n) && (e[on] = i ? s.display : ""), e[fi] && (s.display = "none"));
}
const Wt = /\s*!important$/;
function xt(e, t, n) {
  if (O(n))
    n.forEach((s) => xt(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    Wt.test(n) ? e.setProperty(t, n.replace(Wt, ""), "important") : e.setProperty(t, n);
  else {
    const s = Sl(e, t);
    Wt.test(n) ? e.setProperty(
      Xe(s),
      n.replace(Wt, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ks = ["Webkit", "Moz", "ms"], Fn = {};
function Sl(e, t) {
  const n = Fn[t];
  if (n)
    return n;
  let s = me(t);
  if (s !== "filter" && s in e)
    return Fn[t] = s;
  s = nr(s);
  for (let r = 0; r < Ks.length; r++) {
    const i = Ks[r] + s;
    if (i in e)
      return Fn[t] = i;
  }
  return t;
}
function wl(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && G(s) && n === s;
}
const Us = "http://www.w3.org/1999/xlink";
function Ws(e, t, n, s, r, i = xi(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Us, t.slice(6, t.length)) : e.setAttributeNS(Us, t, n) : n == null || i && !rr(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : de(n) ? String(n) : n
  );
}
function Bs(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? li(n) : n);
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
    l === "boolean" ? n = rr(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function $e(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Cl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const qs = /* @__PURE__ */ Symbol("_vei");
function Tl(e, t, n, s, r = null) {
  const i = e[qs] || (e[qs] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = Al(t);
    if (s) {
      const d = i[t] = Rl(
        s,
        r
      );
      $e(e, l, d, c);
    } else o && (Cl(e, l, o, c), i[t] = void 0);
  }
}
const El = /(Once|Passive|Capture)$/, Ol = /^on:?(?:Once|Passive|Capture)$/;
function Al(e) {
  let t, n;
  for (; (n = e.match(El)) && !Ol.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Xe(e.slice(2)), t];
}
let Dn = 0;
const Ml = /* @__PURE__ */ Promise.resolve(), Pl = () => Dn || (Ml.then(() => Dn = 0), Dn = Date.now());
function Rl(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const r = n.value;
    if (O(r)) {
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
  return n.value = e, n.attached = Pl(), n;
}
const Gs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Il = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? yl(e, s, o) : t === "style" ? vl(e, n, s) : ln(t) ? fn(t) || Tl(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Fl(e, t, s, o)) ? (Bs(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ws(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Dl(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !G(s))) ? Bs(e, me(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ws(e, t, s, o));
};
function Fl(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Gs(t) && P(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Gs(t) && G(n) ? !1 : t in e;
}
function Dl(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = me(t);
  return Array.isArray(n) ? n.some((r) => me(r) === s) : Object.keys(n).some((r) => me(r) === s);
}
const Ye = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return O(t) ? (n) => Gt(t, n) : t;
};
function jl(e) {
  e.target.composing = !0;
}
function ks(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const ue = /* @__PURE__ */ Symbol("_assign"), Bt = /* @__PURE__ */ Symbol("_initialValue");
function jn(e, t, n) {
  return t && (e = e.trim()), n && (e = an(e)), e;
}
const Js = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e.parentNode && (e.type === "text" ? e[Bt] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Bt] = e.defaultValue.replace(/\r\n?/g, `
`))), e[ue] = Ye(r);
    const i = s || r.props && r.props.type === "number";
    $e(e, t ? "change" : "input", (o) => {
      o.target.composing || e[ue](jn(e.value, n, i));
    }), (n || i) && $e(e, "change", () => {
      e.value = jn(e.value, n, i);
    }), t || ($e(e, "compositionstart", jl), $e(e, "compositionend", ks), $e(e, "change", ks));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const r = t ?? "", i = e[Bt];
    delete e[Bt], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[ue](jn(e.value, n, s)) : e.value = r;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[ue] = Ye(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? an(e.value) : e.value, c = t ?? "";
    if (l === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c);
  }
}, Vl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[ue] = Ye(n), $e(e, "change", () => {
      const s = e._modelValue, r = at(e), i = e.checked, o = e[ue];
      if (O(s)) {
        const l = Qn(s, r), c = l !== -1;
        if (i && !c)
          o(s.concat(r));
        else if (!i && c) {
          const d = [...s];
          d.splice(l, 1), o(d);
        }
      } else if (Ue(s)) {
        const l = new Set(s);
        i ? l.add(r) : l.delete(r), o(l);
      } else
        o(ci(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: zs,
  beforeUpdate(e, t, n) {
    e[ue] = Ye(n), zs(e, t, n);
  }
};
function zs(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let r;
  if (O(t))
    r = Qn(t, s.props.value) > -1;
  else if (Ue(t))
    r = t.has(s.props.value);
  else {
    if (t === n) return;
    r = xe(t, ci(e, !0));
  }
  e.checked !== r && (e.checked = r);
}
const Nl = {
  created(e, { value: t }, n) {
    e.checked = xe(t, n.props.value), e[ue] = Ye(n), $e(e, "change", () => {
      e[ue](at(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e[ue] = Ye(s), t !== n && (e.checked = xe(t, s.props.value));
  }
}, Hl = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, $e(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => n ? an(at(c)) : at(c)
      ), i = e.multiple, o = i ? Ue(e._modelValue) ? new Set(r) : r : r[0], l = e._pendingValue = [
        i,
        i ? O(o) ? r.slice() : r : o
      ];
      try {
        e[ue](o);
      } finally {
        Tr(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[ue] = Ye(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Ys(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[ue] = Ye(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Ll(t, n[1], n[0])) && Ys(e, t);
  }
};
function Ll(e, t, n) {
  if (!n || O(e)) return xe(e, t);
  if (Ue(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function Ys(e, t) {
  const n = e.multiple, s = O(t);
  if (!(n && !s && !Ue(t))) {
    for (let r = 0, i = e.options.length; r < i; r++) {
      const o = e.options[r], l = at(o);
      if (n)
        if (s) {
          const c = typeof l;
          c === "string" || c === "number" ? o.selected = t.some((d) => String(d) === String(l)) : o.selected = Qn(t, l) > -1;
        } else
          o.selected = t.has(l);
      else if (xe(at(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function at(e) {
  return "_value" in e ? e._value : e.value;
}
function ci(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const rf = {
  created(e, t, n) {
    qt(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    qt(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    qt(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    qt(e, t, n, s, "updated");
  }
};
function $l(e, t) {
  switch (e) {
    case "SELECT":
      return Hl;
    case "TEXTAREA":
      return Js;
    default:
      switch (t) {
        case "checkbox":
          return Vl;
        case "radio":
          return Nl;
        default:
          return Js;
      }
  }
}
function qt(e, t, n, s, r) {
  const o = $l(
    e.tagName,
    n.props && n.props.type
  )[r];
  o && o(e, t, n, s);
}
const Kl = ["ctrl", "shift", "alt", "meta"], Ul = {
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
  exact: (e, t) => Kl.some((n) => e[`${n}Key`] && !t.includes(n))
}, of = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = Ul[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  }));
}, Wl = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, lf = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const i = Xe(r.key);
    if (t.some(
      (o) => o === i || Wl[o] === i
    ))
      return e(r);
  }));
}, Bl = /* @__PURE__ */ Q({ patchProp: Il }, _l);
let Xs;
function ql() {
  return Xs || (Xs = Jo(Bl));
}
const ff = ((...e) => {
  const t = ql().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = kl(s);
    if (!r) return;
    const i = t._component;
    !P(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, Gl(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function Gl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function kl(e) {
  return G(e) ? document.querySelector(e) : e;
}
export {
  oo as A,
  Xl as B,
  Vl as C,
  lf as D,
  tf as E,
  le as F,
  Y as G,
  Vr as H,
  rf as I,
  sf as J,
  dl as a,
  is as b,
  ff as c,
  ef as d,
  Zl as e,
  yo as f,
  vo as g,
  si as h,
  Zn as i,
  be as j,
  nf as k,
  tl as l,
  zl as m,
  Tr as n,
  Gn as o,
  Xn as p,
  of as q,
  qi as r,
  kn as s,
  wi as t,
  Sr as u,
  Yl as v,
  Mn as w,
  Js as x,
  Hl as y,
  Ql as z
};
