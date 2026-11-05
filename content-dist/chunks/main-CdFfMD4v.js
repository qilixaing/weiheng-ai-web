// @__NO_SIDE_EFFECTS__
function ps(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const U = {}, ct = [], De = () => {
}, wr = () => !1, vn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), wn = (e) => e.startsWith("onUpdate:"), Z = Object.assign, gs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ji = Object.prototype.hasOwnProperty, D = (e, t) => ji.call(e, t), A = Array.isArray, Xe = (e) => $t(e) === "[object Map]", ke = (e) => $t(e) === "[object Set]", Us = (e) => $t(e) === "[object Date]", P = (e) => typeof e == "function", q = (e) => typeof e == "string", we = (e) => typeof e == "symbol", H = (e) => e !== null && typeof e == "object", xr = (e) => (H(e) || P(e)) && P(e.then) && P(e.catch), Tr = Object.prototype.toString, $t = (e) => Tr.call(e), Vi = (e) => $t(e).slice(8, -1), Cr = (e) => $t(e) === "[object Object]", ms = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Mt = /* @__PURE__ */ ps(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), xn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Li = /-\w/g, be = xn(
  (e) => e.replace(Li, (t) => t.slice(1).toUpperCase())
), Hi = /\B([A-Z])/g, tt = xn(
  (e) => e.replace(Hi, "-$1").toLowerCase()
), Er = xn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Fn = xn(
  (e) => e ? `on${Er(e)}` : ""
), Ne = (e, t) => !Object.is(e, t), nn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ar = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Tn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let $s;
const Cn = () => $s || ($s = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ys(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = q(s) ? Bi(s) : ys(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (q(e) || H(e))
    return e;
}
const Ki = /;(?![^(]*\))/g, Ui = /:([^]+)/, $i = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Bi(e) {
  const t = {};
  return e.replace($i, (n) => n.startsWith("/*") ? "" : n).split(Ki).forEach((n) => {
    if (n) {
      const s = n.split(Ui);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function _s(e) {
  let t = "";
  if (q(e))
    t = e;
  else if (A(e))
    for (let n = 0; n < e.length; n++) {
      const s = _s(e[n]);
      s && (t += s + " ");
    }
  else if (H(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Wi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Ji = /* @__PURE__ */ ps(Wi);
function Or(e) {
  return !!e || e === "";
}
function ki(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let r = 0; s && r < e.length; r++)
    s = xe(e[r], t[r], n);
  return s;
}
function Bs(e, t, n) {
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
function qi(e, t, n) {
  let s = Xe(e), r = Xe(t);
  if (s || r || (s = ke(e), r = ke(t), s || r))
    return s && r ? Bs(e, t, n) : !1;
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
function Ws(e, t, n, s) {
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
  let s = Us(e), r = Us(t);
  return s || r ? s && r ? e.getTime() === t.getTime() : !1 : (s = we(e), r = we(t), s || r ? e === t : (s = A(e), r = A(t), s || r ? s && r ? Ws(e, t, n, ki) : !1 : (s = H(e), r = H(t), s || r ? !s || !r ? !1 : Ws(e, t, n, qi) : String(e) === String(t))));
}
function bs(e, t) {
  return e.findIndex((n) => xe(n, t));
}
const Ir = (e) => !!(e && e.__v_isRef === !0), Gi = (e) => q(e) ? e : e == null ? "" : A(e) || H(e) && (e.toString === Tr || !P(e.toString)) ? Ir(e) ? Gi(e.value) : JSON.stringify(e, Mr, 2) : String(e), Mr = (e, t) => Ir(t) ? Mr(e, t.value) : Xe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[jn(s, i) + " =>"] = r, n),
    {}
  )
} : ke(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => jn(n))
} : we(t) ? jn(t) : H(t) && !A(t) && !Cr(t) ? String(t) : t, jn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    we(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Q;
class zi {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Q && (Q.active ? (this.parent = Q, this.index = (Q.scopes || (Q.scopes = [])).push(
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
      const n = Q;
      try {
        return Q = this, t();
      } finally {
        Q = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Q, Q = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Q === this)
        Q = this.prevScope;
      else {
        let t = Q;
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
function Yi() {
  return Q;
}
let B;
const Vn = /* @__PURE__ */ new WeakSet();
class Pr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Q && (Q.active ? Q.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Vn.has(this) && (Vn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Nr(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Js(this), Dr(this);
    const t = B, n = Se;
    B = this, Se = !0;
    try {
      return this.fn();
    } finally {
      Fr(this), B = t, Se = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ws(t);
      this.deps = this.depsTail = void 0, Js(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Vn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Zn(this) && this.run();
  }
  get dirty() {
    return Zn(this);
  }
}
let Rr = 0, Pt, Rt;
function Nr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Rt, Rt = e;
    return;
  }
  e.next = Pt, Pt = e;
}
function Ss() {
  Rr++;
}
function vs() {
  if (--Rr > 0)
    return;
  if (Rt) {
    let t = Rt;
    for (Rt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Pt; ) {
    let t = Pt;
    for (Pt = void 0; t; ) {
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
function Dr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Fr(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), ws(s), Xi(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Zn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (jr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function jr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ft) || (e.globalVersion = Ft, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Zn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = B, s = Se;
  B = e, Se = !0;
  try {
    Dr(e);
    const r = e.fn(e._value);
    (t.version === 0 || Ne(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    B = n, Se = s, Fr(e), e.flags &= -3;
  }
}
function ws(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      ws(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Xi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Se = !0;
const Vr = [];
function Fe() {
  Vr.push(Se), Se = !1;
}
function je() {
  const e = Vr.pop();
  Se = e === void 0 ? !0 : e;
}
function Js(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = B;
    B = void 0;
    try {
      t();
    } finally {
      B = n;
    }
  }
}
let Ft = 0;
class Qi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class xs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!B || !Se || B === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== B)
      n = this.activeLink = new Qi(B, this), B.deps ? (n.prevDep = B.depsTail, B.depsTail.nextDep = n, B.depsTail = n) : B.deps = B.depsTail = n, Lr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = B.depsTail, n.nextDep = void 0, B.depsTail.nextDep = n, B.depsTail = n, B.deps === n && (B.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ft++, this.notify(t);
  }
  notify(t) {
    Ss();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      vs();
    }
  }
}
function Lr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Lr(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const es = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ Symbol(
  ""
), ts = /* @__PURE__ */ Symbol(
  ""
), jt = /* @__PURE__ */ Symbol(
  ""
);
function ee(e, t, n) {
  if (Se && B) {
    let s = es.get(e);
    s || es.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new xs()), r.map = s, r.key = n), r.track();
  }
}
function Ue(e, t, n, s, r, i) {
  const o = es.get(e);
  if (!o) {
    Ft++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Ss(), t === "clear")
    o.forEach(l);
  else {
    const c = A(e), d = c && ms(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((p, x) => {
        (x === "length" || x === jt || !we(x) && x >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(jt)), t) {
        case "add":
          c ? d && l(o.get("length")) : (l(o.get(ft)), Xe(e) && l(o.get(ts)));
          break;
        case "delete":
          c || (l(o.get(ft)), Xe(e) && l(o.get(ts)));
          break;
        case "set":
          Xe(e) && l(o.get(ft));
          break;
      }
  }
  vs();
}
function at(e) {
  const t = /* @__PURE__ */ F(e);
  return t === e || (ee(t, "iterate", jt), /* @__PURE__ */ he(e)) ? t : /* @__PURE__ */ Ve(e) ? /* @__PURE__ */ Qe(e) ? t.map((n) => Ze(pe(n))) : t.map(Ze) : t.map(pe);
}
function En(e) {
  return ee(e = /* @__PURE__ */ F(e), "iterate", jt), e;
}
function Me(e, t) {
  return /* @__PURE__ */ Ve(e) ? Ze(/* @__PURE__ */ Qe(e) ? pe(t) : t) : pe(t);
}
const Zi = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ln(this, Symbol.iterator, (e) => Me(this, e));
  },
  concat(...e) {
    return at(this).concat(
      ...e.map((t) => A(t) ? at(t) : t)
    );
  },
  entries() {
    return Ln(this, "entries", (e) => (e[1] = Me(this, e[1]), e));
  },
  every(e, t) {
    return Le(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Le(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Me(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Le(
      this,
      "find",
      e,
      t,
      (n) => Me(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Le(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Le(
      this,
      "findLast",
      e,
      t,
      (n) => Me(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Le(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Le(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Hn(this, "includes", e);
  },
  indexOf(...e) {
    return Hn(this, "indexOf", e);
  },
  join(e) {
    return at(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Hn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Le(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ct(this, "pop");
  },
  push(...e) {
    return Ct(this, "push", e);
  },
  reduce(e, ...t) {
    return qs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return qs(this, "reduceRight", e, t);
  },
  shift() {
    return Ct(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Le(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ct(this, "splice", e);
  },
  toReversed() {
    return at(this).toReversed();
  },
  toSorted(e) {
    return at(this).toSorted(e);
  },
  toSpliced(...e) {
    return at(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ct(this, "unshift", e);
  },
  values() {
    return Ln(this, "values", (e) => Me(this, e));
  }
};
function Ln(e, t, n) {
  const s = En(e), r = s[t], i = r.call(s);
  if (s !== e && !/* @__PURE__ */ he(e)) {
    if (i[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(i));
      return o.next = () => ks(i.next(), n), r !== Hr[t] && Object.defineProperties(o, {
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
    i._next = i.next, i.next = () => ks(i._next(), n);
  }
  return i;
}
function ks(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Hr = Array.prototype;
function Le(e, t, n, s, r, i) {
  const o = En(e), l = o !== e && !/* @__PURE__ */ he(e), c = o[t];
  if (c !== Hr[t]) {
    const p = c.apply(e, i);
    return l ? pe(p) : p;
  }
  let d = n;
  o !== e && (l ? d = function(p, x) {
    return n.call(this, Me(e, p), x, e);
  } : n.length > 2 && (d = function(p, x) {
    return n.call(this, p, x, e);
  }));
  const a = c.call(o, d, s);
  return l && r ? r(a) : a;
}
function qs(e, t, n, s) {
  const r = En(e), i = r !== e && !/* @__PURE__ */ he(e);
  let o = n, l = !1;
  r !== e && (i ? (l = s.length === 0, o = function(d, a, p) {
    return l && (l = !1, d = Me(e, d)), n.call(this, d, Me(e, a), p, e);
  }) : n.length > 3 && (o = function(d, a, p) {
    return n.call(this, d, a, p, e);
  }));
  const c = r[t](o, ...s);
  return l ? Me(e, c) : c;
}
function Hn(e, t, n) {
  const s = /* @__PURE__ */ F(e);
  ee(s, "iterate", jt);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ As(n[0]) ? (n[0] = /* @__PURE__ */ F(n[0]), s[t](...n)) : r;
}
function Ct(e, t, n = []) {
  Fe(), Ss();
  const s = (/* @__PURE__ */ F(e))[t].apply(e, n);
  return vs(), je(), s;
}
const eo = /* @__PURE__ */ ps("__proto__,__v_isRef,__isVue"), Kr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(we)
);
function to(e) {
  we(e) || (e = String(e));
  const t = /* @__PURE__ */ F(this);
  return ee(t, "has", e), t.hasOwnProperty(e);
}
class Ur {
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
      return s === (r ? i ? ao : Jr : i ? Wr : Br).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = A(t);
    if (!r) {
      let c;
      if (o && (c = Zi[n]))
        return c;
      if (n === "hasOwnProperty")
        return to;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ne(t) ? t : s
    );
    if ((we(n) ? Kr.has(n) : eo(n)) || (r || ee(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ ne(l)) {
      const c = o && ms(n) ? l : l.value;
      return r && H(c) ? /* @__PURE__ */ ss(c) : c;
    }
    return H(l) ? r ? /* @__PURE__ */ ss(l) : /* @__PURE__ */ Cs(l) : l;
  }
}
class $r extends Ur {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = A(t) && ms(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Ve(i);
      if (!/* @__PURE__ */ he(s) && !/* @__PURE__ */ Ve(s) && (i = /* @__PURE__ */ F(i), s = /* @__PURE__ */ F(s)), !o && /* @__PURE__ */ ne(i) && !/* @__PURE__ */ ne(s))
        return d || (i.value = s), !0;
    }
    const l = o ? Number(n) < t.length : D(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ ne(t) ? t : r
    );
    return t === /* @__PURE__ */ F(r) && c && (l ? Ne(s, i) && Ue(t, "set", n, s) : Ue(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = D(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Ue(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!we(n) || !Kr.has(n)) && ee(t, "has", n), s;
  }
  ownKeys(t) {
    return ee(
      t,
      "iterate",
      A(t) ? "length" : ft
    ), Reflect.ownKeys(t);
  }
}
class no extends Ur {
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
const so = /* @__PURE__ */ new $r(), ro = /* @__PURE__ */ new no(), io = /* @__PURE__ */ new $r(!0);
const ns = (e) => e, Yt = (e) => Reflect.getPrototypeOf(e);
function oo(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ F(r), o = Xe(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = r[e](...s), a = n ? ns : t ? Ze : pe;
    return !t && ee(
      i,
      "iterate",
      c ? ts : ft
    ), Z(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: p, done: x } = d.next();
          return x ? { value: p, done: x } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: x
          };
        }
      }
    );
  };
}
function Xt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function lo(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ F(i), l = /* @__PURE__ */ F(r);
      e || (Ne(r, l) && ee(o, "get", r), ee(o, "get", l));
      const { has: c } = Yt(o), d = t ? ns : e ? Ze : pe;
      if (c.call(o, r))
        return d(i.get(r));
      if (c.call(o, l))
        return d(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && ee(/* @__PURE__ */ F(r), "iterate", ft), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ F(i), l = /* @__PURE__ */ F(r);
      return e || (Ne(r, l) && ee(o, "has", r), ee(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ F(l), d = t ? ns : e ? Ze : pe;
      return !e && ee(c, "iterate", ft), l.forEach((a, p) => r.call(i, d(a), d(p), o));
    }
  };
  return Z(
    n,
    e ? {
      add: Xt("add"),
      set: Xt("set"),
      delete: Xt("delete"),
      clear: Xt("clear")
    } : {
      add(r) {
        const i = /* @__PURE__ */ F(this), o = Yt(i), l = /* @__PURE__ */ F(r), c = !t && !/* @__PURE__ */ he(r) && !/* @__PURE__ */ Ve(r) ? l : r;
        return o.has.call(i, c) || Ne(r, c) && o.has.call(i, r) || Ne(l, c) && o.has.call(i, l) || (i.add(c), Ue(i, "add", c, c)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ he(i) && !/* @__PURE__ */ Ve(i) && (i = /* @__PURE__ */ F(i));
        const o = /* @__PURE__ */ F(this), { has: l, get: c } = Yt(o);
        let d = l.call(o, r);
        d || (r = /* @__PURE__ */ F(r), d = l.call(o, r));
        const a = c.call(o, r);
        return o.set(r, i), d ? Ne(i, a) && Ue(o, "set", r, i) : Ue(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ F(this), { has: o, get: l } = Yt(i);
        let c = o.call(i, r);
        c || (r = /* @__PURE__ */ F(r), c = o.call(i, r)), l && l.call(i, r);
        const d = i.delete(r);
        return c && Ue(i, "delete", r, void 0), d;
      },
      clear() {
        const r = /* @__PURE__ */ F(this), i = r.size !== 0, o = r.clear();
        return i && Ue(
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
    n[r] = oo(r, e, t);
  }), n;
}
function Ts(e, t) {
  const n = lo(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_isShallow" ? t : r === "__v_raw" ? s : Reflect.get(
    D(n, r) && r in s ? n : s,
    r,
    i
  );
}
const co = {
  get: /* @__PURE__ */ Ts(!1, !1)
}, fo = {
  get: /* @__PURE__ */ Ts(!1, !0)
}, uo = {
  get: /* @__PURE__ */ Ts(!0, !1)
};
const Br = /* @__PURE__ */ new WeakMap(), Wr = /* @__PURE__ */ new WeakMap(), Jr = /* @__PURE__ */ new WeakMap(), ao = /* @__PURE__ */ new WeakMap();
function ho(e) {
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
function Cs(e) {
  return /* @__PURE__ */ Ve(e) ? e : Es(
    e,
    !1,
    so,
    co,
    Br
  );
}
// @__NO_SIDE_EFFECTS__
function po(e) {
  return Es(
    e,
    !1,
    io,
    fo,
    Wr
  );
}
// @__NO_SIDE_EFFECTS__
function ss(e) {
  return Es(
    e,
    !0,
    ro,
    uo,
    Jr
  );
}
function Es(e, t, n, s, r) {
  if (!H(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = ho(Vi(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? s : n
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  return /* @__PURE__ */ Ve(e) ? /* @__PURE__ */ Qe(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ve(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function he(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function As(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ F(t) : e;
}
function go(e) {
  return !D(e, "__v_skip") && Object.isExtensible(e) && Ar(e, "__v_skip", !0), e;
}
const pe = (e) => H(e) ? /* @__PURE__ */ Cs(e) : e, Ze = (e) => H(e) ? /* @__PURE__ */ ss(e) : e;
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function St(e) {
  return mo(e, !1);
}
function mo(e, t) {
  return /* @__PURE__ */ ne(e) ? e : new yo(e, t);
}
class yo {
  constructor(t, n) {
    this.dep = new xs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ F(t), this._value = n ? t : pe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ he(t) || /* @__PURE__ */ Ve(t);
    t = s ? t : /* @__PURE__ */ F(t), Ne(t, n) && (this._rawValue = t, this._value = s ? t : pe(t), this.dep.trigger());
  }
}
function _o(e) {
  return /* @__PURE__ */ ne(e) ? e.value : e;
}
const bo = {
  get: (e, t, n) => t === "__v_raw" ? e : _o(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ ne(r) && !/* @__PURE__ */ ne(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function kr(e) {
  return /* @__PURE__ */ Qe(e) ? e : new Proxy(e, bo);
}
class So {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new xs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ft - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    B !== this)
      return Nr(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return jr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function vo(e, t, n = !1) {
  let s, r;
  return P(e) ? s = e : (s = e.get, r = e.set), new So(s, r, n);
}
const Qt = {}, cn = /* @__PURE__ */ new WeakMap();
let lt;
function wo(e, t = !1, n = lt) {
  if (n) {
    let s = cn.get(n);
    s || cn.set(n, s = []), s.push(e);
  }
}
function xo(e, t, n = U) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n, d = (O) => r ? O : /* @__PURE__ */ he(O) || r === !1 || r === 0 ? $e(O, 1) : $e(O);
  let a, p, x, T, j = !1, M = !1;
  if (/* @__PURE__ */ ne(e) ? (p = () => e.value, j = /* @__PURE__ */ he(e)) : /* @__PURE__ */ Qe(e) ? (p = () => d(e), j = !0) : A(e) ? (M = !0, j = e.some((O) => /* @__PURE__ */ Qe(O) || /* @__PURE__ */ he(O)), p = () => e.map((O) => {
    if (/* @__PURE__ */ ne(O))
      return O.value;
    if (/* @__PURE__ */ Qe(O))
      return d(O);
    if (P(O))
      return c ? c(O, 2) : O();
  })) : P(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (x) {
      Fe();
      try {
        x();
      } finally {
        je();
      }
    }
    const O = lt;
    lt = a;
    try {
      return c ? c(e, 3, [T]) : e(T);
    } finally {
      lt = O;
    }
  } : p = De, t && r) {
    const O = p, Y = r === !0 ? 1 / 0 : r;
    p = () => $e(O(), Y);
  }
  const G = Yi(), W = () => {
    a.stop(), G && G.active && gs(G.effects, a);
  };
  if (i && t) {
    const O = t;
    t = (...Y) => {
      try {
        return O(...Y);
      } finally {
        W();
      }
    };
  }
  let N = M ? new Array(e.length).fill(Qt) : Qt;
  const V = (O) => {
    if (!(!(a.flags & 1) || !a.dirty && !O))
      if (t) {
        const Y = a.run();
        if (O || r || j || (M ? Y.some((Ge, Ce) => Ne(Ge, N[Ce])) : Ne(Y, N))) {
          const Ge = lt;
          Fe();
          try {
            x && x(), lt = a;
            const Ce = [
              Y,
              // pass undefined as the old value when it's changed for the first time
              N === Qt ? void 0 : M && N[0] === Qt ? [] : N,
              T
            ];
            N = Y, c ? c(t, 3, Ce) : (
              // @ts-expect-error
              t(...Ce)
            );
          } finally {
            lt = Ge, je();
          }
        }
      } else
        a.run();
  };
  return l && l(V), a = new Pr(p), a.scheduler = o ? () => o(V, !1) : V, T = (O) => wo(O, !1, a), x = a.onStop = () => {
    const O = cn.get(a);
    if (O) {
      if (c)
        c(O, 4);
      else
        for (const Y of O) Y();
      cn.delete(a);
    }
  }, t ? s ? V(!0) : N = a.run() : o ? o(V.bind(null, !0), !0) : a.run(), W.pause = a.pause.bind(a), W.resume = a.resume.bind(a), W.stop = W, W;
}
function $e(e, t = 1 / 0, n) {
  if (t <= 0 || !H(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ne(e))
    $e(e.value, t, n);
  else if (A(e))
    for (let s = 0; s < e.length; s++)
      $e(e[s], t, n);
  else if (ke(e) || Xe(e))
    e.forEach((s) => {
      $e(s, t, n);
    });
  else if (Cr(e)) {
    for (const s in e)
      $e(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && $e(e[s], t, n);
  }
  return e;
}
function Bt(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    An(r, t, n);
  }
}
function Te(e, t, n, s) {
  if (P(e)) {
    const r = Bt(e, t, n, s);
    return r && xr(r) && r.catch((i) => {
      An(i, t, n);
    }), r;
  }
  if (A(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(Te(e[i], t, n, s));
    return r;
  }
}
function An(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || U;
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
      Fe(), Bt(i, null, 10, [
        e,
        c,
        d
      ]), je();
      return;
    }
  }
  To(e, n, r, s, o);
}
function To(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const ie = [];
let ye = -1;
const Pe = [];
let Ye = null, dt = 0;
const qr = /* @__PURE__ */ Promise.resolve();
let fn = null;
function Gr(e) {
  const t = fn || qr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Co(e) {
  let t = ye + 1, n = ie.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = ie[s], i = Vt(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Os(e) {
  if (!(e.flags & 1)) {
    const t = Vt(e), n = ie[ie.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Vt(n) ? ie.push(e) : ie.splice(Co(t), 0, e), e.flags |= 1, zr();
  }
}
function zr() {
  fn || (fn = qr.then(Qr));
}
function Eo(e) {
  if (!A(e))
    Ye && e.id === -1 ? Ye.splice(dt + 1, 0, e) : e.flags & 1 || (Pe.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Pe.push(e[t]);
  zr();
}
function Yr(e, t, n, s = ye + 1) {
  for (; s < ie.length; s++) {
    const r = ie[s];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid || t !== void 0 && !(r.id >= t))
        continue;
      ie.splice(s, 1), s = e ? s - 1 : ye, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Xr(e, t, n = 0) {
  if (Pe.length) {
    let s = Pe, r = 0;
    if (t) {
      s = [];
      for (let o = 0; o < Pe.length; o++) {
        const l = Pe[o];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? Pe[r++] = l : s.push(l);
      }
    }
    const i = [...new Set(s)].sort((o, l) => Vt(o) - Vt(l));
    if (Pe.length = r, Ye) {
      for (let o = 0; o < i.length; o++)
        Ye.push(i[o]);
      return;
    }
    for (Ye = i, dt = 0; dt < Ye.length; dt++) {
      const o = Ye[dt];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    Ye = null, dt = 0;
  }
}
let Kn = !1;
function Ao(e, t) {
  if (Kn) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(Pe);
  e(), Kn = !0;
  try {
    Yr(void 0, t), Xr(void 0, n, t);
  } finally {
    Kn = !1;
  }
}
const Vt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Qr(e) {
  try {
    for (ye = 0; ye < ie.length; ye++) {
      const t = ie[ye];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Bt(
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
    ye = -1, ie.length = 0, Xr(), fn = null, (ie.length || Pe.length) && Qr();
  }
}
let te = null, Zr = null;
function un(e) {
  const t = te;
  return te = e, Zr = e && e.type.__scopeId || null, t;
}
function Oo(e, t = te, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && rr(-1);
    const i = un(t), o = Je.length;
    let l;
    try {
      l = e(...r);
    } finally {
      for (let c = Je.length; c > o; c--) Rs();
      un(i), s._d && rr(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Tc(e, t) {
  if (te === null)
    return e;
  const n = Nn(te), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = U] = t[r];
    i && (P(i) && (i = {
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
function it(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[s];
    c && (Fe(), Te(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), je());
  }
}
function Io(e, t) {
  if (oe) {
    let n = oe.provides;
    const s = oe.parent && oe.parent.provides;
    s === n && (n = oe.provides = Object.create(s)), n[e] = t;
  }
}
function sn(e, t, n = !1) {
  const s = Al();
  if (s || pt) {
    let r = pt ? pt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && P(t) ? t.call(s && s.proxy) : t;
  }
}
const Mo = /* @__PURE__ */ Symbol.for("v-scx"), Po = () => sn(Mo);
function Un(e, t, n) {
  return ei(e, t, n);
}
function ei(e, t, n = U) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = Z({}, n), c = t && s || !t && i !== "post";
  let d;
  if (Kt) {
    if (i === "sync") {
      const T = Po();
      d = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!c) {
      const T = () => {
      };
      return T.stop = De, T.resume = De, T.pause = De, T;
    }
  }
  const a = oe;
  l.call = (T, j, M) => Te(T, a, j, M);
  let p = !1;
  i === "post" ? l.scheduler = (T) => {
    T.i = a, le(T, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (T, j) => {
    j ? T() : Os(T);
  }), l.augmentJob = (T) => {
    t && (T.flags |= 4), p && (T.flags |= 2, a && (T.id = a.uid, T.i = a));
  };
  const x = xo(e, t, l);
  return Kt && (d ? d.push(x) : c && x()), x;
}
function Ro(e, t, n) {
  const s = this.proxy, r = q(e) ? e.includes(".") ? ti(s, e) : () => s[e] : e.bind(s, s);
  let i;
  P(t) ? i = t : (i = t.handler, n = t);
  const o = Wt(this), l = ei(r, i.bind(s), n);
  return o(), l;
}
function ti(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const No = /* @__PURE__ */ Symbol("_vte"), On = (e) => e.__isTeleport, $n = /* @__PURE__ */ Symbol("_leaveCb");
function Do(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== ge) {
        t = n;
        break;
      }
  }
  return t;
}
function ni(e) {
  if (!Is(e))
    return On(e.type) && e.children ? Do(e.children) : e;
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
function an(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    an(
      On(n.type) && ni(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === ce && A(e.children)) {
    const n = ai(e.children, !1);
    n && an(n, t);
  }
}
function rs(e) {
  if (e.component)
    return rs(e.component.subTree);
  if (e.type === ce) {
    const t = A(e.children) && ai(e.children, !1);
    return t ? rs(t) : void 0;
  }
  if (e.type !== ge)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Cc(e, t) {
  return P(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Z({ name: e.name }, t, { setup: e })
  ) : e;
}
function si(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Gs(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const dn = /* @__PURE__ */ new WeakMap();
function Nt(e, t, n, s, r = !1) {
  if (A(e)) {
    e.forEach(
      (M, G) => Nt(
        M,
        t && (A(t) ? t[G] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (ht(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Nt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Nn(s.component) : s.el, o = r ? null : i, { i: l, r: c } = e, d = t && t.r, a = l.refs === U ? l.refs = {} : l.refs, p = l.setupState, x = /* @__PURE__ */ F(p), T = p === U ? wr : (M) => Gs(a, M) ? !1 : D(x, M), j = (M, G) => !(G && Gs(a, G));
  if (d != null && d !== c) {
    if (zs(t), q(d))
      a[d] = null, T(d) && (p[d] = null);
    else if (/* @__PURE__ */ ne(d)) {
      const M = t;
      j(d, M.k) && (d.value = null), M.k && (a[M.k] = null);
    }
  }
  if (P(c))
    Bt(c, l, 12, [o, a]);
  else {
    const M = q(c), G = /* @__PURE__ */ ne(c);
    if (M || G) {
      const W = () => {
        if (e.f) {
          const N = M ? T(c) ? p[c] : a[c] : j() || !e.k ? c.value : a[e.k];
          if (r)
            A(N) && gs(N, i);
          else if (A(N))
            N.includes(i) || N.push(i);
          else if (M)
            a[c] = [i], T(c) && (p[c] = a[c]);
          else {
            const V = [i];
            j(c, e.k) && (c.value = V), e.k && (a[e.k] = V);
          }
        } else M ? (a[c] = o, T(c) && (p[c] = o)) : G && (j(c, e.k) && (c.value = o), e.k && (a[e.k] = o));
      };
      if (o) {
        const N = () => {
          W(), dn.delete(e);
        };
        N.id = -1, dn.set(e, N), le(N, n);
      } else
        zs(e), W();
    }
  }
}
function zs(e) {
  const t = dn.get(e);
  t && (t.flags |= 8, dn.delete(e));
}
Cn().requestIdleCallback;
Cn().cancelIdleCallback;
const ht = (e) => !!e.type.__asyncLoader, Is = (e) => e.type.__isKeepAlive;
function Fo(e, t) {
  ri(e, "a", t);
}
function jo(e, t) {
  ri(e, "da", t);
}
function ri(e, t, n = oe) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (In(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Is(r.parent.vnode) && Vo(s, t, n, r), r = r.parent;
  }
}
function Vo(e, t, n, s) {
  const r = In(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  ii(() => {
    gs(s[t], r);
  }, n);
}
function In(e, t, n = oe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Fe();
      const l = Wt(n), c = Te(t, n, e, o);
      return l(), je(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const qe = (e) => (t, n = oe) => {
  (!Kt || e === "sp") && In(e, (...s) => t(...s), n);
}, Lo = qe("bm"), Ho = qe("m"), Ko = qe(
  "bu"
), Uo = qe("u"), $o = qe(
  "bum"
), ii = qe("um"), Bo = qe(
  "sp"
), Wo = qe("rtg"), Jo = qe("rtc");
function ko(e, t = oe) {
  In("ec", e, t);
}
const qo = /* @__PURE__ */ Symbol.for("v-ndc");
function Ec(e, t, n, s) {
  let r;
  const i = n, o = A(e);
  if (o || q(e)) {
    const l = o && /* @__PURE__ */ Qe(e);
    let c = !1, d = !1;
    l && (c = !/* @__PURE__ */ he(e), d = /* @__PURE__ */ Ve(e), e = En(e)), r = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      r[a] = t(
        c ? d ? Ze(pe(e[a])) : pe(e[a]) : e[a],
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
  else if (H(e))
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
function Ac(e, t, n, s, r, i) {
  if (n == null && (n = {}), te.ce || te.parent && ht(te.parent) && te.parent.ce) {
    const d = n, a = Object.keys(d).length > 0;
    return us(), as(
      ce,
      null,
      [ve("slot", d, s)],
      a ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1);
  const l = Je.length;
  us();
  let c;
  try {
    const d = o && oi(o(n)), a = n.key || i || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    c = as(
      ce,
      {
        key: (a && !we(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && s ? "_fb" : "")
      },
      d || (s ? s() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let a = Je.length; a > l; a--) Rs();
    throw d;
  } finally {
    o && o._c && (o._d = !0);
  }
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function oi(e) {
  return e.some((t) => Rn(t) ? !(t.type === ge || t.type === ce && !oi(t.children)) : !0) ? e : null;
}
const is = (e) => e ? Oi(e) ? Nn(e) : is(e.parent) : null, Dt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Z(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => is(e.parent),
    $root: (e) => is(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ci(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Os(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Gr.bind(e.proxy)),
    $watch: (e) => Ro.bind(e)
  })
), Bn = (e, t) => e !== U && !e.__isScriptSetup && D(e, t), Go = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const x = o[t];
      if (x !== void 0)
        switch (x) {
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
        if (Bn(s, t))
          return o[t] = 1, s[t];
        if (r !== U && D(r, t))
          return o[t] = 2, r[t];
        if (D(i, t))
          return o[t] = 3, i[t];
        if (n !== U && D(n, t))
          return o[t] = 4, n[t];
        os && (o[t] = 0);
      }
    }
    const d = Dt[t];
    let a, p;
    if (d)
      return t === "$attrs" && ee(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== U && D(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, D(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Bn(r, t) ? (r[t] = n, !0) : s !== U && D(s, t) ? (s[t] = n, !0) : D(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== U && l[0] !== "$" && D(e, l) || Bn(t, l) || D(i, l) || D(s, l) || D(Dt, l) || D(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : D(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ys(e) {
  return A(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let os = !0;
function zo(e) {
  const t = ci(e), n = e.proxy, s = e.ctx;
  os = !1, t.beforeCreate && Xs(t.beforeCreate, e, "bc");
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
    mounted: x,
    beforeUpdate: T,
    updated: j,
    activated: M,
    deactivated: G,
    beforeDestroy: W,
    beforeUnmount: N,
    destroyed: V,
    unmounted: O,
    render: Y,
    renderTracked: Ge,
    renderTriggered: Ce,
    errorCaptured: ze,
    serverPrefetch: Jt,
    // public API
    expose: nt,
    inheritAttrs: vt,
    // assets
    components: kt,
    directives: qt,
    filters: Dn
  } = t;
  if (d && Yo(d, s, null), o)
    for (const J in o) {
      const $ = o[J];
      P($) && (s[J] = $.bind(n));
    }
  if (r) {
    const J = r.call(n, n);
    H(J) && (e.data = /* @__PURE__ */ Cs(J));
  }
  if (os = !0, i)
    for (const J in i) {
      const $ = i[J], st = P($) ? $.bind(n, n) : P($.get) ? $.get.bind(n, n) : De, Gt = !P($) && P($.set) ? $.set.bind(n) : De, rt = Nl({
        get: st,
        set: Gt
      });
      Object.defineProperty(s, J, {
        enumerable: !0,
        configurable: !0,
        get: () => rt.value,
        set: (me) => rt.value = me
      });
    }
  if (l)
    for (const J in l)
      li(l[J], s, n, J);
  if (c) {
    const J = P(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach(($) => {
      Io($, J[$]);
    });
  }
  a && Xs(a, e, "c");
  function se(J, $) {
    A($) ? $.forEach((st) => J(st.bind(n))) : $ && J($.bind(n));
  }
  if (se(Lo, p), se(Ho, x), se(Ko, T), se(Uo, j), se(Fo, M), se(jo, G), se(ko, ze), se(Jo, Ge), se(Wo, Ce), se($o, N), se(ii, O), se(Bo, Jt), A(nt))
    if (nt.length) {
      const J = e.exposed || (e.exposed = {});
      nt.forEach(($) => {
        Object.defineProperty(J, $, {
          get: () => n[$],
          set: (st) => n[$] = st,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  Y && e.render === De && (e.render = Y), vt != null && (e.inheritAttrs = vt), kt && (e.components = kt), qt && (e.directives = qt), Jt && si(e);
}
function Yo(e, t, n = De) {
  A(e) && (e = ls(e));
  for (const s in e) {
    const r = e[s];
    let i;
    H(r) ? "default" in r ? i = sn(
      r.from || s,
      r.default,
      !0
    ) : i = sn(r.from || s) : i = sn(r), /* @__PURE__ */ ne(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function Xs(e, t, n) {
  Te(
    A(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function li(e, t, n, s) {
  let r = s.includes(".") ? ti(n, s) : () => n[s];
  if (q(e)) {
    const i = t[e];
    P(i) && Un(r, i);
  } else if (P(e))
    Un(r, e.bind(n));
  else if (H(e))
    if (A(e))
      e.forEach((i) => li(i, t, n, s));
    else {
      const i = P(e.handler) ? e.handler.bind(n) : t[e.handler];
      P(i) && Un(r, i, e);
    }
}
function ci(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (d) => hn(c, d, o, !0)
  ), hn(c, t, o)), H(t) && i.set(t, c), c;
}
function hn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && hn(e, i, n, !0), r && r.forEach(
    (o) => hn(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = Xo[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Xo = {
  data: Qs,
  props: Zs,
  emits: Zs,
  // objects
  methods: Ot,
  computed: Ot,
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
  components: Ot,
  directives: Ot,
  // watch
  watch: Zo,
  // provide / inject
  provide: Qs,
  inject: Qo
};
function Qs(e, t) {
  return t ? e ? function() {
    return Z(
      P(e) ? e.call(this, this) : e,
      P(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Qo(e, t) {
  return Ot(ls(e), ls(t));
}
function ls(e) {
  if (A(e)) {
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
function Ot(e, t) {
  return e ? Z(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Zs(e, t) {
  return e ? A(e) && A(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Z(
    /* @__PURE__ */ Object.create(null),
    Ys(e),
    Ys(t ?? {})
  ) : t;
}
function Zo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Z(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = re(e[s], t[s]);
  return n;
}
function fi() {
  return {
    app: null,
    config: {
      isNativeTag: wr,
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
let el = 0;
function tl(e, t) {
  return function(s, r = null) {
    P(s) || (s = Z({}, s)), r != null && !H(r) && (r = null);
    const i = fi(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = i.app = {
      _uid: el++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Dl,
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
      mount(a, p, x) {
        if (!c) {
          const T = d._ceVNode || ve(s, r);
          return T.appContext = i, x === !0 ? x = "svg" : x === !1 && (x = void 0), e(T, a, x), c = !0, d._container = a, a.__vue_app__ = d, Nn(T.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (Te(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, d;
      },
      runWithContext(a) {
        const p = pt;
        pt = d;
        try {
          return a();
        } finally {
          pt = p;
        }
      }
    };
    return d;
  };
}
let pt = null;
const nl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${be(t)}Modifiers`] || e[`${tt(t)}Modifiers`];
function sl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || U;
  let r = n;
  const i = t.startsWith("update:"), o = i && nl(s, t.slice(7));
  o && (o.trim && (r = n.map((a) => q(a) ? a.trim() : a)), o.number && (r = r.map(Tn)));
  let l, c = s[l = Fn(t)] || // also try camelCase event handler (#2249)
  s[l = Fn(be(t))];
  !c && i && (c = s[l = Fn(tt(t))]), c && Te(
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
    e.emitted[l] = !0, Te(
      d,
      e,
      6,
      r
    );
  }
}
const rl = /* @__PURE__ */ new WeakMap();
function ui(e, t, n = !1) {
  const s = n ? rl : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!P(e)) {
    const c = (d) => {
      const a = ui(d, t, !0);
      a && (l = !0, Z(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (H(e) && s.set(e, null), null) : (A(i) ? i.forEach((c) => o[c] = null) : Z(o, i), H(e) && s.set(e, o), o);
}
function Mn(e, t) {
  return !e || !vn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), D(e, t[0].toLowerCase() + t.slice(1)) || D(e, tt(t)) || D(e, t));
}
function er(e) {
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
    data: x,
    setupState: T,
    ctx: j,
    inheritAttrs: M
  } = e, G = un(e);
  let W, N;
  try {
    if (n.shapeFlag & 4) {
      const O = r || s, Y = O;
      W = Re(
        d.call(
          Y,
          O,
          a,
          p,
          T,
          x,
          j
        )
      ), N = l;
    } else {
      const O = t;
      W = Re(
        O.length > 1 ? O(
          p,
          { attrs: l, slots: o, emit: c }
        ) : O(
          p,
          null
        )
      ), N = t.props ? l : il(l);
    }
  } catch (O) {
    Je.length = 0, An(O, e, 1), W = ve(ge);
  }
  let V = W;
  if (N && M !== !1) {
    const O = Object.keys(N), { shapeFlag: Y } = V;
    O.length && Y & 7 && (i && O.some(wn) && (N = ol(
      N,
      i
    )), V = gt(V, N, !1, !0));
  }
  if (n.dirs && (V = gt(V, null, !1, !0), V.dirs = V.dirs ? V.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const O = On(V.type) && ni(V) || V;
    an(O, n.transition);
  }
  return W = V, un(G), W;
}
function ai(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    if (Rn(r)) {
      if (r.type !== ge || r.children === "v-if") {
        if (n)
          return;
        n = r;
      }
    } else
      return;
  }
  return n;
}
const il = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || vn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ol = (e, t) => {
  const n = {};
  for (const s in e)
    (!wn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function ll(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? tr(s, o, d) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const x = a[p];
        if (di(o, s, x) && !Mn(d, x))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? tr(s, o, d) : !0 : !!o;
  return !1;
}
function tr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (!D(e, i) || di(t, e, i) && !Mn(n, i))
      return !0;
  }
  return !1;
}
function di(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && H(s) && H(r) ? !xe(s, r) : s !== r;
}
function cl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = s, e = r), r === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const hi = {}, pi = () => Object.create(hi), gi = (e) => Object.getPrototypeOf(e) === hi;
function fl(e, t, n, s = !1) {
  const r = {}, i = pi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), mi(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ po(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function ul(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ F(r), [c] = e.propsOptions;
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
        let x = a[p];
        if (Mn(e.emitsOptions, x))
          continue;
        const T = t[x];
        if (c)
          if (D(i, x))
            T !== i[x] && (i[x] = T, d = !0);
          else {
            const j = be(x);
            r[j] = cs(
              c,
              l,
              j,
              T,
              e,
              !1
            );
          }
        else
          T !== i[x] && (i[x] = T, d = !0);
      }
    }
  } else {
    mi(e, t, r, i) && (d = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !D(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = tt(p)) === p || !D(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[p] = cs(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !D(t, p)) && (delete i[p], d = !0);
  }
  d && Ue(e.attrs, "set", "");
}
function mi(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (Mt(c))
        continue;
      const d = t[c];
      let a;
      r && D(r, a = be(c)) ? !i || !i.includes(a) ? n[a] = d : (l || (l = {}))[a] = d : Mn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, o = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ F(n), d = l || U;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      n[p] = cs(
        r,
        c,
        p,
        d[p],
        e,
        !D(d, p)
      );
    }
  }
  return o;
}
function cs(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = D(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && P(c)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const a = Wt(r);
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
    ] && (s === "" || s === tt(n)) && (s = !0));
  }
  return s;
}
const al = /* @__PURE__ */ new WeakMap();
function yi(e, t, n = !1) {
  const s = n ? al : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let c = !1;
  if (!P(e)) {
    const a = (p) => {
      c = !0;
      const [x, T] = yi(p, t, !0);
      Z(o, x), T && l.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return H(e) && s.set(e, ct), ct;
  if (A(i))
    for (let a = 0; a < i.length; a++) {
      const p = be(i[a]);
      nr(p) && (o[p] = U);
    }
  else if (i)
    for (const a in i) {
      const p = be(a);
      if (nr(p)) {
        const x = i[a], T = o[p] = A(x) || P(x) ? { type: x } : Z({}, x), j = T.type;
        let M = !1, G = !0;
        if (A(j))
          for (let W = 0; W < j.length; ++W) {
            const N = j[W], V = P(N) && N.name;
            if (V === "Boolean") {
              M = !0;
              break;
            } else V === "String" && (G = !1);
          }
        else
          M = P(j) && j.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = M, T[
          1
          /* shouldCastTrue */
        ] = G, (M || D(T, "default")) && l.push(p);
      }
    }
  const d = [o, l];
  return H(e) && s.set(e, d), d;
}
function nr(e) {
  return e[0] !== "$" && !Mt(e);
}
const Ms = (e) => e === "_" || e === "_ctx" || e === "$stable", Ps = (e) => A(e) ? e.map(Re) : [Re(e)], dl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Oo((...r) => Ps(t(...r)), n);
  return s._c = !1, s;
}, _i = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Ms(r)) continue;
    const i = e[r];
    if (P(i))
      t[r] = dl(r, i, s);
    else if (i != null) {
      const o = Ps(i);
      t[r] = () => o;
    }
  }
}, bi = (e, t) => {
  const n = Ps(t);
  e.slots.default = () => n;
}, Si = (e, t, n) => {
  for (const s in t)
    (n || !Ms(s)) && (e[s] = t[s]);
}, hl = (e, t, n) => {
  const s = e.slots = pi();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Si(s, t, n), n && Ar(s, "_", r, !0)) : _i(t, s);
  } else t && bi(e, t);
}, pl = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = U;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Si(r, t, n) : (i = !t.$stable, _i(t, r)), o = t;
  } else t && (bi(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !Ms(l) && o[l] == null && delete r[l];
}, le = bl;
function gl(e) {
  return ml(e);
}
function ml(e, t) {
  const n = Cn();
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
    nextSibling: x,
    setScopeId: T = De,
    insertStaticContent: j
  } = e, M = (f, u, h, _ = null, m = null, y = null, v = void 0, S = null, b = !!u.dynamicChildren) => {
    if (f === u)
      return;
    f && !Et(f, u) && (_ = zt(f), me(f, m, y, !0), f = null), u.patchFlag === -2 && (b = !1, u.dynamicChildren = null), u.dynamicChildren && f && f.dynamicChildren && f.dynamicChildren.hasOnce && (u.dynamicChildren === ct && (u.dynamicChildren = []), u.dynamicChildren.hasOnce = !0);
    const { type: g, ref: C, shapeFlag: w } = u;
    switch (g) {
      case Pn:
        G(f, u, h, _);
        break;
      case ge:
        W(f, u, h, _);
        break;
      case rn:
        f == null && N(u, h, _, v);
        break;
      case ce:
        kt(
          f,
          u,
          h,
          _,
          m,
          y,
          v,
          S,
          b
        );
        break;
      default:
        w & 1 ? Y(
          f,
          u,
          h,
          _,
          m,
          y,
          v,
          S,
          b
        ) : w & 6 ? qt(
          f,
          u,
          h,
          _,
          m,
          y,
          v,
          S,
          b
        ) : (w & 64 || w & 128) && g.process(
          f,
          u,
          h,
          _,
          m,
          y,
          v,
          S,
          b,
          xt
        );
    }
    C != null && m ? Nt(C, f && f.ref, y, u || f, !u) : C == null && f && f.ref != null && Nt(f.ref, null, y, f, !0);
  }, G = (f, u, h, _) => {
    if (f == null)
      s(
        u.el = l(u.children),
        h,
        _
      );
    else {
      const m = u.el = f.el;
      u.children !== f.children && d(m, u.children);
    }
  }, W = (f, u, h, _) => {
    f == null ? s(
      u.el = c(u.children || ""),
      h,
      _
    ) : u.el = f.el;
  }, N = (f, u, h, _) => {
    [f.el, f.anchor] = j(
      f.children,
      u,
      h,
      _,
      f.el,
      f.anchor
    );
  }, V = ({ el: f, anchor: u }, h, _) => {
    let m;
    for (; f && f !== u; )
      m = x(f), s(f, h, _), f = m;
    s(u, h, _);
  }, O = ({ el: f, anchor: u }) => {
    let h;
    for (; f && f !== u; )
      h = x(f), r(f), f = h;
    r(u);
  }, Y = (f, u, h, _, m, y, v, S, b) => {
    if (u.type === "svg" ? v = "svg" : u.type === "math" && (v = "mathml"), f == null)
      Ge(
        u,
        h,
        _,
        m,
        y,
        v,
        S,
        b
      );
    else {
      const g = f.el && f.el._isVueCE ? f.el : null;
      try {
        g && g._beginPatch(), Jt(
          f,
          u,
          m,
          y,
          v,
          S,
          b
        );
      } finally {
        g && g._endPatch();
      }
    }
  }, Ge = (f, u, h, _, m, y, v, S) => {
    let b, g;
    const { props: C, shapeFlag: w, transition: E, dirs: I } = f;
    if (b = f.el = o(
      f.type,
      y,
      C && C.is,
      C
    ), w & 8 ? a(b, f.children) : w & 16 && ze(
      f.children,
      b,
      null,
      _,
      m,
      Wn(f, y),
      v,
      S
    ), I && it(f, null, _, "created"), Ce(b, f, f.scopeId, v, _), C) {
      for (const K in C)
        K !== "value" && !Mt(K) && i(b, K, null, C[K], y, _);
      "value" in C && i(b, "value", null, C.value, y), (g = C.onVnodeBeforeMount) && Ie(g, _, f);
    }
    I && it(f, null, _, "beforeMount");
    const R = yl(m, E);
    R && E.beforeEnter(b), s(b, u, h), ((g = C && C.onVnodeMounted) || R || I) && le(() => {
      g && Ie(g, _, f), R && E.enter(b), I && it(f, null, _, "mounted");
    }, m);
  }, Ce = (f, u, h, _, m) => {
    if (h && T(f, h), _)
      for (let y = 0; y < _.length; y++)
        T(f, _[y]);
    if (m) {
      let y = m.subTree;
      if (u === y || xi(y.type) && (y.ssContent === u || y.ssFallback === u)) {
        const v = m.vnode;
        Ce(
          f,
          v,
          v.scopeId,
          v.slotScopeIds,
          m.parent
        );
      }
    }
  }, ze = (f, u, h, _, m, y, v, S, b = 0) => {
    for (let g = b; g < f.length; g++) {
      const C = f[g] = S ? Ke(f[g]) : Re(f[g]);
      M(
        null,
        C,
        u,
        h,
        _,
        m,
        y,
        v,
        S
      );
    }
  }, Jt = (f, u, h, _, m, y, v) => {
    const S = u.el = f.el;
    let { patchFlag: b, dynamicChildren: g, dirs: C } = u;
    b |= f.patchFlag & 16;
    const w = f.props || U, E = u.props || U;
    let I;
    if (h && ot(h, !1), (I = E.onVnodeBeforeUpdate) && Ie(I, h, u, f), C && it(u, f, h, "beforeUpdate"), h && ot(h, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    g && (!f.dynamicChildren || f.dynamicChildren.length !== g.length) && (b = 0, v = !1, g = null), (w.innerHTML && E.innerHTML == null || w.textContent && E.textContent == null) && a(S, ""), g ? nt(
      f.dynamicChildren,
      g,
      S,
      h,
      _,
      Wn(u, m),
      y
    ) : v || $(
      f,
      u,
      S,
      null,
      h,
      _,
      Wn(u, m),
      y,
      !1
    ), b > 0) {
      if (b & 16)
        vt(S, w, E, h, m);
      else if (b & 2 && w.class !== E.class && i(S, "class", null, E.class, m), b & 4 && i(S, "style", w.style, E.style, m), b & 8) {
        const R = u.dynamicProps;
        for (let K = 0; K < R.length; K++) {
          const L = R[K], z = w[L], X = E[L];
          (X !== z || L === "value") && i(S, L, z, X, m, h);
        }
      }
      b & 1 && f.children !== u.children && a(S, u.children);
    } else !v && g == null && vt(S, w, E, h, m);
    ((I = E.onVnodeUpdated) || C) && le(() => {
      I && Ie(I, h, u, f), C && it(u, f, h, "updated");
    }, _);
  }, nt = (f, u, h, _, m, y, v) => {
    for (let S = 0; S < u.length; S++) {
      const b = f[S], g = u[S], C = b.el || fs(b), w = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        C && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Et(b, g) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? p(C) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      M(
        b,
        g,
        w,
        null,
        _,
        m,
        y,
        v,
        !0
      );
    }
  }, vt = (f, u, h, _, m) => {
    if (u !== h) {
      if (u !== U)
        for (const y in u)
          !Mt(y) && !(y in h) && i(
            f,
            y,
            u[y],
            null,
            m,
            _
          );
      for (const y in h) {
        if (Mt(y)) continue;
        const v = h[y], S = u[y];
        v !== S && y !== "value" && i(f, y, S, v, m, _);
      }
      "value" in h && i(f, "value", u.value, h.value, m);
    }
  }, kt = (f, u, h, _, m, y, v, S, b) => {
    const g = u.el = f ? f.el : l(""), C = u.anchor = f ? f.anchor : l("");
    let { patchFlag: w, dynamicChildren: E, slotScopeIds: I } = u;
    I && (S = S ? S.concat(I) : I), f == null ? (s(g, h, _), s(C, h, _), ze(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      C,
      m,
      y,
      v,
      S,
      b
    )) : w > 0 && w & 64 && E && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === E.length ? (nt(
      f.dynamicChildren,
      E,
      h,
      m,
      y,
      v,
      S
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || m && u === m.subTree) && vi(
      f,
      u,
      !0
      /* shallow */
    )) : $(
      f,
      u,
      h,
      C,
      m,
      y,
      v,
      S,
      b
    );
  }, qt = (f, u, h, _, m, y, v, S, b) => {
    u.slotScopeIds = S, f == null ? u.shapeFlag & 512 ? m.ctx.activate(
      u,
      h,
      _,
      v,
      b
    ) : Dn(
      u,
      h,
      _,
      m,
      y,
      v,
      b
    ) : Ds(f, u, b);
  }, Dn = (f, u, h, _, m, y, v) => {
    const S = f.component = El(
      f,
      _,
      m
    );
    if (Is(f) && (S.ctx.renderer = xt), Ol(S, !1, v), S.asyncDep) {
      if (m && m.registerDep(
        S,
        se,
        v,
        y
      ), !f.el) {
        const b = S.subTree = ve(ge);
        W(null, b, u, h), f.placeholder = b.el;
      }
    } else
      se(
        S,
        f,
        u,
        h,
        m,
        y,
        v
      );
  }, Ds = (f, u, h) => {
    const _ = u.component = f.component;
    if (ll(f, u, h))
      if (_.asyncDep && !_.asyncResolved) {
        u.el = f.el, u.placeholder = f.placeholder, J(_, u, h);
        return;
      } else
        _.next = u, _.update();
    else
      u.el = f.el, u.placeholder = f.placeholder, _.vnode = u;
  }, se = (f, u, h, _, m, y, v) => {
    const S = () => {
      if (f.isMounted) {
        let { next: w, bu: E, u: I, parent: R, vnode: K } = f;
        {
          const Ae = wi(f);
          if (Ae) {
            w && (w.el = K.el, J(f, w, v)), Ae.asyncDep.then(() => {
              le(() => {
                f.isUnmounted || g();
              }, m);
            });
            return;
          }
        }
        let L = w, z;
        ot(f, !1), w ? (w.el = K.el, J(f, w, v)) : w = K, E && nn(E), (z = w.props && w.props.onVnodeBeforeUpdate) && Ie(z, R, w, K), ot(f, !0);
        const X = er(f), Ee = f.subTree;
        f.subTree = X, M(
          Ee,
          X,
          // parent may have changed if it's in a teleport
          p(Ee.el),
          // anchor may have changed if it's in a fragment
          zt(Ee),
          f,
          m,
          y
        ), w.el = X.el, L === null && cl(f, X.el), I && le(I, m), (z = w.props && w.props.onVnodeUpdated) && le(
          () => Ie(z, R, w, K),
          m
        );
      } else {
        let w;
        const { el: E, props: I } = u, { bm: R, m: K, parent: L, root: z, type: X } = f, Ee = ht(u);
        ot(f, !1), R && nn(R), !Ee && (w = I && I.onVnodeBeforeMount) && Ie(w, L, u), ot(f, !0);
        {
          z.ce && z.ce._hasShadowRoot() && z.ce._injectChildStyle(
            X,
            f.parent ? f.parent.type : void 0
          );
          const Ae = f.subTree = er(f);
          M(
            null,
            Ae,
            h,
            _,
            f,
            m,
            y
          ), u.el = Ae.el;
        }
        if (K && le(K, m), !Ee && (w = I && I.onVnodeMounted)) {
          const Ae = u;
          le(
            () => Ie(w, L, Ae),
            m
          );
        }
        (u.shapeFlag & 256 || L && ht(L.vnode) && L.vnode.shapeFlag & 256) && f.a && le(f.a, m), f.isMounted = !0, u = h = _ = null;
      }
    };
    f.scope.on();
    const b = f.effect = new Pr(S);
    f.scope.off();
    const g = f.update = b.run.bind(b), C = f.job = b.runIfDirty.bind(b);
    C.i = f, C.id = f.uid, b.scheduler = () => Os(C), ot(f, !0), g();
  }, J = (f, u, h) => {
    u.component = f;
    const _ = f.vnode.props;
    f.vnode = u, f.next = null, ul(f, u.props, _, h), pl(f, u.children, h), Fe(), Yr(f), je();
  }, $ = (f, u, h, _, m, y, v, S, b = !1) => {
    const g = f && f.children, C = f ? f.shapeFlag : 0, w = u.children, { patchFlag: E, shapeFlag: I } = u;
    if (E > 0) {
      if (E & 128) {
        Gt(
          g,
          w,
          h,
          _,
          m,
          y,
          v,
          S,
          b
        );
        return;
      } else if (E & 256) {
        st(
          g,
          w,
          h,
          _,
          m,
          y,
          v,
          S,
          b
        );
        return;
      }
    }
    I & 8 ? (C & 16 && wt(g, m, y), w !== g && a(h, w)) : C & 16 ? I & 16 ? Gt(
      g,
      w,
      h,
      _,
      m,
      y,
      v,
      S,
      b
    ) : wt(g, m, y, !0) : (C & 8 && a(h, ""), I & 16 && ze(
      w,
      h,
      _,
      m,
      y,
      v,
      S,
      b
    ));
  }, st = (f, u, h, _, m, y, v, S, b) => {
    f = f || ct, u = u || ct;
    const g = f.length, C = u.length, w = Math.min(g, C);
    let E;
    for (E = 0; E < w; E++) {
      const I = u[E] = b ? Ke(u[E]) : Re(u[E]);
      M(
        f[E],
        I,
        h,
        null,
        m,
        y,
        v,
        S,
        b
      );
    }
    g > C ? wt(
      f,
      m,
      y,
      !0,
      !1,
      w
    ) : ze(
      u,
      h,
      _,
      m,
      y,
      v,
      S,
      b,
      w
    );
  }, Gt = (f, u, h, _, m, y, v, S, b) => {
    let g = 0;
    const C = u.length;
    let w = f.length - 1, E = C - 1;
    for (; g <= w && g <= E; ) {
      const I = f[g], R = u[g] = b ? Ke(u[g]) : Re(u[g]);
      if (Et(I, R))
        M(
          I,
          R,
          h,
          null,
          m,
          y,
          v,
          S,
          b
        );
      else
        break;
      g++;
    }
    for (; g <= w && g <= E; ) {
      const I = f[w], R = u[E] = b ? Ke(u[E]) : Re(u[E]);
      if (Et(I, R))
        M(
          I,
          R,
          h,
          null,
          m,
          y,
          v,
          S,
          b
        );
      else
        break;
      w--, E--;
    }
    if (g > w) {
      if (g <= E) {
        const I = E + 1, R = I < C ? u[I].el : _;
        for (; g <= E; )
          M(
            null,
            u[g] = b ? Ke(u[g]) : Re(u[g]),
            h,
            R,
            m,
            y,
            v,
            S,
            b
          ), g++;
      }
    } else if (g > E)
      for (; g <= w; )
        me(f[g], m, y, !0), g++;
    else {
      const I = g, R = g, K = /* @__PURE__ */ new Map();
      for (g = R; g <= E; g++) {
        const ue = u[g] = b ? Ke(u[g]) : Re(u[g]);
        ue.key != null && K.set(ue.key, g);
      }
      let L, z = 0;
      const X = E - R + 1;
      let Ee = !1, Ae = 0;
      const Tt = new Array(X);
      for (g = 0; g < X; g++) Tt[g] = 0;
      for (g = I; g <= w; g++) {
        const ue = f[g];
        if (z >= X) {
          me(ue, m, y, !0);
          continue;
        }
        let Oe;
        if (ue.key != null)
          Oe = K.get(ue.key);
        else
          for (L = R; L <= E; L++)
            if (Tt[L - R] === 0 && Et(ue, u[L])) {
              Oe = L;
              break;
            }
        Oe === void 0 ? me(ue, m, y, !0) : (Tt[Oe - R] = g + 1, Oe >= Ae ? Ae = Oe : Ee = !0, M(
          ue,
          u[Oe],
          h,
          null,
          m,
          y,
          v,
          S,
          b
        ), z++);
      }
      const Ls = Ee ? _l(Tt) : ct;
      for (L = Ls.length - 1, g = X - 1; g >= 0; g--) {
        const ue = R + g, Oe = u[ue], Hs = u[ue + 1], Ks = ue + 1 < C ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Hs.el || fs(Hs)
        ) : _;
        Tt[g] === 0 ? M(
          null,
          Oe,
          h,
          Ks,
          m,
          y,
          v,
          S,
          b
        ) : Ee && (L < 0 || g !== Ls[L] ? rt(Oe, h, Ks, 2) : L--);
      }
    }
  }, rt = (f, u, h, _, m = null) => {
    const { el: y, type: v, transition: S, children: b, shapeFlag: g } = f;
    if (g & 6) {
      rt(f.component.subTree, u, h, _);
      return;
    }
    if (g & 128) {
      f.suspense.move(u, h, _);
      return;
    }
    if (g & 64) {
      v.move(f, u, h, xt);
      return;
    }
    if (v === ce) {
      s(y, u, h);
      for (let w = 0; w < b.length; w++)
        rt(b[w], u, h, _);
      s(f.anchor, u, h);
      return;
    }
    if (v === rn) {
      V(f, u, h);
      return;
    }
    if (_ !== 2 && g & 1 && S)
      if (_ === 0)
        S.persisted && !y[$n] ? s(y, u, h) : (S.beforeEnter(y), s(y, u, h), le(() => S.enter(y), m));
      else {
        const { leave: w, delayLeave: E, afterLeave: I } = S, R = () => {
          f.ctx.isUnmounted ? r(y) : s(y, u, h);
        }, K = () => {
          const L = y._isLeaving || !!y[$n];
          y._isLeaving && y[$n](
            !0
            /* cancelled */
          ), S.persisted && !L ? R() : w(y, () => {
            R(), I && I();
          });
        };
        E ? E(y, R, K) : K();
      }
    else
      s(y, u, h);
  }, me = (f, u, h, _ = !1, m = !1) => {
    const {
      type: y,
      props: v,
      ref: S,
      children: b,
      dynamicChildren: g,
      shapeFlag: C,
      patchFlag: w,
      dirs: E,
      cacheIndex: I,
      memo: R
    } = f;
    if ((w === -2 || g && g.hasOnce) && (m = !1), S != null && (Fe(), Nt(S, null, h, f, !0), je()), I != null && (!f.ctx || f.ctx === u) && (u.renderCache[I] = void 0), C & 256) {
      u.ctx.deactivate(f);
      return;
    }
    const K = C & 1 && E, L = !ht(f);
    let z;
    if (L && (z = v && v.onVnodeBeforeUnmount) && Ie(z, u, f), C & 6)
      Fi(f.component, h, _);
    else {
      if (C & 128) {
        f.suspense.unmount(h, _);
        return;
      }
      K && it(f, null, u, "beforeUnmount"), C & 64 ? f.type.remove(
        f,
        u,
        h,
        xt,
        _
      ) : g && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !g.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== ce || w > 0 && w & 64) ? wt(
        g,
        u,
        h,
        !1,
        !0
      ) : (y === ce && w & 384 || !m && C & 16) && wt(b, u, h), _ && Fs(f);
    }
    const X = R != null && I == null;
    (L && (z = v && v.onVnodeUnmounted) || K || X) && le(() => {
      z && Ie(z, u, f), K && it(f, null, u, "unmounted"), X && (f.el = null);
    }, h);
  }, Fs = (f) => {
    const { type: u, el: h, anchor: _, transition: m } = f, y = u === ce;
    if (y && !m) {
      js(h, _);
      return;
    }
    if (u === rn) {
      O(f), m && !m.persisted && m.afterLeave && m.afterLeave();
      return;
    }
    const v = y ? rs(f) : f, S = () => {
      y ? p(h) && js(h, _) : r(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (v && v.shapeFlag & 1 && m && !m.persisted) {
      const { leave: b, delayLeave: g } = m, C = v.el, w = () => b(C, S);
      g ? g(C, S, w) : w();
    } else
      S();
  }, js = (f, u) => {
    let h;
    for (; f !== u; )
      h = x(f), r(f), f = h;
    r(u);
  }, Fi = (f, u, h) => {
    const { bum: _, scope: m, job: y, subTree: v, um: S, m: b, a: g } = f;
    sr(b), sr(g), _ && nn(_), m.stop(), y ? (y.flags |= 8, me(v, f, u, h)) : f.vnode.el && v && (v.transition = f.vnode.transition, me(v, f, u, h)), S && le(S, u), le(() => {
      f.isUnmounted = !0;
    }, u);
  }, wt = (f, u, h, _ = !1, m = !1, y = 0) => {
    for (let v = y; v < f.length; v++)
      me(f[v], u, h, _, m);
  }, zt = (f) => {
    if (f.shapeFlag & 6)
      return zt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const u = x(f.anchor || f.el), h = u && u[No];
    return h ? x(h) : u;
  }, Vs = (f, u, h) => {
    const _ = f && u._vnode ? void 0 : f && f.component ? f.component.uid : Cl();
    Ao(() => {
      f == null ? u._vnode && me(u._vnode, null, null, !0) : M(
        u._vnode || null,
        f,
        u,
        null,
        null,
        null,
        h
      ), u._vnode = f;
    }, _);
  }, xt = {
    p: M,
    um: me,
    m: rt,
    r: Fs,
    mt: Dn,
    mc: ze,
    pc: $,
    pbc: nt,
    n: zt,
    o: e
  };
  return {
    render: Vs,
    hydrate: void 0,
    createApp: tl(Vs)
  };
}
function Wn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ot({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function yl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function vi(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (A(s) && A(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Ke(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && vi(o, l)), l.type === Pn && (l.patchFlag === -1 && (l = r[i] = Ke(l)), l.el = o.el), l.type === ge && !l.el && (l.el = o.el);
    }
}
function _l(e) {
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
function wi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : wi(t);
}
function sr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function fs(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? fs(t.subTree) : null;
}
const xi = (e) => e.__isSuspense;
function bl(e, t) {
  t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : Eo(e);
}
const ce = /* @__PURE__ */ Symbol.for("v-fgt"), Pn = /* @__PURE__ */ Symbol.for("v-txt"), ge = /* @__PURE__ */ Symbol.for("v-cmt"), rn = /* @__PURE__ */ Symbol.for("v-stc"), Je = [];
let ae = null;
function us(e = !1) {
  Je.push(ae = e ? null : []);
}
function Rs() {
  Je.pop(), ae = Je[Je.length - 1] || null;
}
let Lt = 1;
function rr(e, t = !1) {
  Lt += e, e < 0 && ae && t && (ae.hasOnce = !0);
}
function Ti(e) {
  return e.dynamicChildren = Lt > 0 ? ae || ct : null, Rs(), Lt > 0 && ae && ae.push(e), e;
}
function Oc(e, t, n, s, r, i) {
  return Ti(
    Ei(
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
function as(e, t, n, s, r) {
  return Ti(
    ve(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Rn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ci = ({ key: e }) => e ?? null, on = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? q(e) || /* @__PURE__ */ ne(e) || P(e) ? { i: te, r: e, k: t, f: !!n } : e : null);
function Ei(e, t = null, n = null, s = 0, r = null, i = e === ce ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ci(t),
    ref: t && on(t),
    scopeId: Zr,
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
  return l ? (pn(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= q(n) ? 8 : 16), Lt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ae && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ae.push(c), c;
}
const ve = Sl;
function Sl(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === qo) && (e = ge), Rn(e)) {
    const l = gt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && pn(l, n), Lt > 0 && !i && ae && (l.shapeFlag & 6 ? ae[ae.indexOf(e)] = l : ae.push(l)), l.patchFlag = -2, l;
  }
  if (Rl(e) && (e = e.__vccOpts), t) {
    t = vl(t);
    let { class: l, style: c } = t;
    l && !q(l) && (t.class = _s(l)), H(c) && (/* @__PURE__ */ As(c) && !A(c) && (c = Z({}, c)), t.style = ys(c));
  }
  const o = q(e) ? 1 : xi(e) ? 128 : On(e) ? 64 : H(e) ? 4 : P(e) ? 2 : 0;
  return Ei(
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
function vl(e) {
  return e ? /* @__PURE__ */ As(e) || gi(e) ? Z({}, e) : e : null;
}
function gt(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, d = t ? xl(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Ci(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? A(i) ? i.concat(on(t)) : [i, on(t)] : on(t)
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
    patchFlag: t && e.type !== ce ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && gt(e.ssContent),
    ssFallback: e.ssFallback && gt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return c && s && an(
    a,
    c.clone(a)
  ), a;
}
function wl(e = " ", t = 0) {
  return ve(Pn, null, e, t);
}
function Ic(e, t) {
  const n = ve(rn, null, e);
  return n.staticCount = t, n;
}
function Mc(e = "", t = !1) {
  return t ? (us(), as(ge, null, e)) : ve(ge, null, e);
}
function Re(e) {
  return e == null || typeof e == "boolean" ? ve(ge) : A(e) ? ve(
    ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Rn(e) ? Ke(e) : ve(Pn, null, String(e));
}
function Ke(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : gt(e);
}
function pn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (A(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), pn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !gi(t) ? t._ctx = te : r === 3 && te && (te.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (P(t)) {
    if (s & 65) {
      pn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: te }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [wl(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function xl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = _s([t.class, s.class]));
      else if (r === "style")
        t.style = ys([t.style, s.style]);
      else if (vn(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(A(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !wn(r) && (t[r] = o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Ie(e, t, n, s = null) {
  Te(e, t, 7, [
    n,
    s
  ]);
}
const Tl = fi();
let Ai = 0;
function Cl() {
  return Ai;
}
function El(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Tl, i = {
    uid: Ai++,
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
    scope: new zi(
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
    propsOptions: yi(s, r),
    emitsOptions: ui(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: U,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: U,
    data: U,
    props: U,
    attrs: U,
    slots: U,
    refs: U,
    setupState: U,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = sl.bind(null, i), e.ce && e.ce(i), i;
}
let oe = null;
const Al = () => oe || te;
let gn, Ht;
{
  const e = Cn(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  gn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => oe = n
  ), Ht = t(
    "__VUE_SSR_SETTERS__",
    (n) => Kt = n
  );
}
const Wt = (e) => {
  const t = oe;
  return gn(e), e.scope.on(), () => {
    e.scope.off(), gn(t);
  };
}, ir = () => {
  oe && oe.scope.off(), gn(null);
};
function Oi(e) {
  return e.vnode.shapeFlag & 4;
}
let Kt = !1;
function Ol(e, t = !1, n = !1) {
  t && Ht(t);
  const { props: s, children: r } = e.vnode, i = Oi(e);
  fl(e, s, i, t), hl(e, r, n || t);
  const o = i ? Il(e, t) : void 0;
  return t && Ht(!1), o;
}
function Il(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Go);
  const { setup: s } = n;
  if (s) {
    Fe();
    const r = e.setupContext = s.length > 1 ? Pl(e) : null, i = Wt(e), o = Bt(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = xr(o);
    if (je(), i(), (l || e.sp) && !ht(e) && si(e), l) {
      if (o.then(ir, ir), t)
        return o.then((c) => {
          Ht(!0);
          try {
            or(e, c, t);
          } finally {
            Ht(!1);
          }
        }).catch((c) => {
          An(c, e, 0);
        });
      e.asyncDep = o;
    } else
      or(e, o);
  } else
    Ii(e);
}
function or(e, t, n) {
  P(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : H(t) && (e.setupState = kr(t)), Ii(e);
}
function Ii(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || De);
  {
    const r = Wt(e);
    Fe();
    try {
      zo(e);
    } finally {
      je(), r();
    }
  }
}
const Ml = {
  get(e, t) {
    return ee(e, "get", ""), e[t];
  }
};
function Pl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ml),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Nn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(kr(go(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Dt)
        return Dt[n](e);
    },
    has(t, n) {
      return n in t || n in Dt;
    }
  })) : e.proxy;
}
function Rl(e) {
  return P(e) && "__vccOpts" in e;
}
const Nl = (e, t) => /* @__PURE__ */ vo(e, t, Kt), Dl = "3.5.44";
let ds;
const lr = typeof window < "u" && window.trustedTypes;
if (lr)
  try {
    ds = /* @__PURE__ */ lr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Mi = ds ? (e) => ds.createHTML(e) : (e) => e, Fl = "http://www.w3.org/2000/svg", jl = "http://www.w3.org/1998/Math/MathML", He = typeof document < "u" ? document : null, cr = He && /* @__PURE__ */ He.createElement("template"), Vl = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? He.createElementNS(Fl, e) : t === "mathml" ? He.createElementNS(jl, e) : n ? He.createElement(e, { is: n }) : He.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => He.createTextNode(e),
  createComment: (e) => He.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => He.querySelector(e),
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
      cr.innerHTML = Mi(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = cr.content;
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
}, Ll = /* @__PURE__ */ Symbol("_vtc");
function Hl(e, t, n) {
  const s = e[Ll];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const mn = /* @__PURE__ */ Symbol("_vod"), Pi = /* @__PURE__ */ Symbol("_vsh"), Pc = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[mn] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : At(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), At(e, !0), s.enter(e)) : s.leave(e, () => {
      At(e, !1);
    }) : At(e, t));
  },
  beforeUnmount(e, { value: t }) {
    At(e, t);
  }
};
function At(e, t) {
  e.style.display = t ? e[mn] : "none", e[Pi] = !t;
}
const Kl = /* @__PURE__ */ Symbol(""), Ul = /(?:^|;)\s*display\s*:/;
function $l(e, t, n) {
  const s = e.style, r = q(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (q(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && It(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && It(s, o, "");
    for (const o in n) {
      o === "display" && (i = !0);
      const l = n[o];
      l != null ? Wl(
        e,
        o,
        !q(t) && t ? t[o] : void 0,
        l
      ) || It(s, o, l) : It(s, o, "");
    }
  } else if (r) {
    if (t !== n) {
      const o = s[Kl];
      o && (n += ";" + o), s.cssText = n, i = Ul.test(n);
    }
  } else t && e.removeAttribute("style");
  mn in e && ((!r || t !== n) && (e[mn] = i ? s.display : ""), e[Pi] && (s.display = "none"));
}
const Zt = /\s*!important$/;
function It(e, t, n) {
  if (A(n))
    n.forEach((s) => It(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    Zt.test(n) ? e.setProperty(t, n.replace(Zt, ""), "important") : e.setProperty(t, n);
  else {
    const s = Bl(e, t);
    Zt.test(n) ? e.setProperty(
      tt(s),
      n.replace(Zt, ""),
      "important"
    ) : e[s] = n;
  }
}
const fr = ["Webkit", "Moz", "ms"], Jn = {};
function Bl(e, t) {
  const n = Jn[t];
  if (n)
    return n;
  let s = be(t);
  if (s !== "filter" && s in e)
    return Jn[t] = s;
  s = Er(s);
  for (let r = 0; r < fr.length; r++) {
    const i = fr[r] + s;
    if (i in e)
      return Jn[t] = i;
  }
  return t;
}
function Wl(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && q(s) && n === s;
}
const ur = "http://www.w3.org/1999/xlink";
function ar(e, t, n, s, r, i = Ji(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ur, t.slice(6, t.length)) : e.setAttributeNS(ur, t, n) : n == null || i && !Or(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : we(n) ? String(n) : n
  );
}
function dr(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Mi(n) : n);
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
    l === "boolean" ? n = Or(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function Be(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Jl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const hr = /* @__PURE__ */ Symbol("_vei");
function kl(e, t, n, s, r = null) {
  const i = e[hr] || (e[hr] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = zl(t);
    if (s) {
      const d = i[t] = Ql(
        s,
        r
      );
      Be(e, l, d, c);
    } else o && (Jl(e, l, o, c), i[t] = void 0);
  }
}
const ql = /(Once|Passive|Capture)$/, Gl = /^on:?(?:Once|Passive|Capture)$/;
function zl(e) {
  let t, n;
  for (; (n = e.match(ql)) && !Gl.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : tt(e.slice(2)), t];
}
let kn = 0;
const Yl = /* @__PURE__ */ Promise.resolve(), Xl = () => kn || (Yl.then(() => kn = 0), kn = Date.now());
function Ql(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const r = n.value;
    if (A(r)) {
      const i = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        i.call(s), s._stopped = !0;
      };
      const o = r.slice(), l = [s];
      for (let c = 0; c < o.length && !s._stopped; c++) {
        const d = o[c];
        d && Te(
          d,
          t,
          5,
          l
        );
      }
    } else
      Te(
        r,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Xl(), n;
}
const pr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Zl = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? Hl(e, s, o) : t === "style" ? $l(e, n, s) : vn(t) ? wn(t) || kl(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ec(e, t, s, o)) ? (dr(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ar(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (tc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !q(s))) ? dr(e, be(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), ar(e, t, s, o));
};
function ec(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && pr(t) && P(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return pr(t) && q(n) ? !1 : t in e;
}
function tc(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = be(t);
  return Array.isArray(n) ? n.some((r) => be(r) === s) : Object.keys(n).some((r) => be(r) === s);
}
const et = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return A(t) ? (n) => nn(t, n) : t;
};
function nc(e) {
  e.target.composing = !0;
}
function gr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const de = /* @__PURE__ */ Symbol("_assign"), en = /* @__PURE__ */ Symbol("_initialValue");
function qn(e, t, n) {
  return t && (e = e.trim()), n && (e = Tn(e)), e;
}
const mr = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e.parentNode && (e.type === "text" ? e[en] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[en] = e.defaultValue.replace(/\r\n?/g, `
`))), e[de] = et(r);
    const i = s || r.props && r.props.type === "number";
    Be(e, t ? "change" : "input", (o) => {
      o.target.composing || e[de](qn(e.value, n, i));
    }), (n || i) && Be(e, "change", () => {
      e.value = qn(e.value, n, i);
    }), t || (Be(e, "compositionstart", nc), Be(e, "compositionend", gr), Be(e, "change", gr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const r = t ?? "", i = e[en];
    delete e[en], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[de](qn(e.value, n, s)) : e.value = r;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[de] = et(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Tn(e.value) : e.value, c = t ?? "";
    if (l === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c);
  }
}, sc = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[de] = et(n), Be(e, "change", () => {
      const s = e._modelValue, r = mt(e), i = e.checked, o = e[de];
      if (A(s)) {
        const l = bs(s, r), c = l !== -1;
        if (i && !c)
          o(s.concat(r));
        else if (!i && c) {
          const d = [...s];
          d.splice(l, 1), o(d);
        }
      } else if (ke(s)) {
        const l = new Set(s);
        i ? l.add(r) : l.delete(r), o(l);
      } else
        o(Ri(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: yr,
  beforeUpdate(e, t, n) {
    e[de] = et(n), yr(e, t, n);
  }
};
function yr(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let r;
  if (A(t))
    r = bs(t, s.props.value) > -1;
  else if (ke(t))
    r = t.has(s.props.value);
  else {
    if (t === n) return;
    r = xe(t, Ri(e, !0));
  }
  e.checked !== r && (e.checked = r);
}
const rc = {
  created(e, { value: t }, n) {
    e.checked = xe(t, n.props.value), e[de] = et(n), Be(e, "change", () => {
      e[de](mt(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e[de] = et(s), t !== n && (e.checked = xe(t, s.props.value));
  }
}, ic = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, Be(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => n ? Tn(mt(c)) : mt(c)
      ), i = e.multiple, o = i ? ke(e._modelValue) ? new Set(r) : r : r[0], l = e._pendingValue = [
        i,
        i ? A(o) ? r.slice() : r : o
      ];
      try {
        e[de](o);
      } finally {
        Gr(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[de] = et(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    _r(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[de] = et(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !oc(t, n[1], n[0])) && _r(e, t);
  }
};
function oc(e, t, n) {
  if (!n || A(e)) return xe(e, t);
  if (ke(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function _r(e, t) {
  const n = e.multiple, s = A(t);
  if (!(n && !s && !ke(t))) {
    for (let r = 0, i = e.options.length; r < i; r++) {
      const o = e.options[r], l = mt(o);
      if (n)
        if (s) {
          const c = typeof l;
          c === "string" || c === "number" ? o.selected = t.some((d) => String(d) === String(l)) : o.selected = bs(t, l) > -1;
        } else
          o.selected = t.has(l);
      else if (xe(mt(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function mt(e) {
  return "_value" in e ? e._value : e.value;
}
function Ri(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Rc = {
  created(e, t, n) {
    tn(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    tn(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    tn(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    tn(e, t, n, s, "updated");
  }
};
function lc(e, t) {
  switch (e) {
    case "SELECT":
      return ic;
    case "TEXTAREA":
      return mr;
    default:
      switch (t) {
        case "checkbox":
          return sc;
        case "radio":
          return rc;
        default:
          return mr;
      }
  }
}
function tn(e, t, n, s, r) {
  const o = lc(
    e.tagName,
    n.props && n.props.type
  )[r];
  o && o(e, t, n, s);
}
const cc = ["ctrl", "shift", "alt", "meta"], fc = {
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
  exact: (e, t) => cc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Nc = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = fc[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  }));
}, uc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Dc = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const i = tt(r.key);
    if (t.some(
      (o) => o === i || uc[o] === i
    ))
      return e(r);
  }));
}, ac = /* @__PURE__ */ Z({ patchProp: Zl }, Vl);
let br;
function dc() {
  return br || (br = gl(ac));
}
const hc = ((...e) => {
  const t = dc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = gc(s);
    if (!r) return;
    const i = t._component;
    !P(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, pc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function pc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function gc(e) {
  return q(e) ? document.querySelector(e) : e;
}
const Gn = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function mc(e, t, n, s) {
  const r = [];
  function i(l, c, d, a) {
    return Gn(c, d) ? c : Gn(c, l) ? d : Gn(d, l) ? c : (r.push(a), s === "remote" ? d : c);
  }
  const o = {};
  for (const l of /* @__PURE__ */ new Set([...Object.keys(e || {}), ...Object.keys(t || {}), ...Object.keys(n || {})])) {
    if (l === "calculated") continue;
    if (l === "records") {
      const d = [e, t, n].map((a) => Object.fromEntries((a?.records || []).map((p) => [p.date, p])));
      o.records = [...new Set(d.flatMap((a) => Object.keys(a)))].map((a) => i(...d.map((p) => p[a]), "记录 " + a)).filter(Boolean);
      continue;
    }
    if (["drafts", "habits"].includes(l)) {
      const d = [e?.[l] || {}, t?.[l] || {}, n?.[l] || {}];
      o[l] = {};
      for (const a of new Set(d.flatMap((p) => Object.keys(p)))) {
        const p = i(...d.map((x) => x[a]), l + " " + a);
        p !== void 0 && (o[l][a] = p);
      }
      continue;
    }
    const c = i(e?.[l], t?.[l], n?.[l], l);
    c !== void 0 && (o[l] = c);
  }
  return { state: o, conflicts: r };
}
const Sr = () => ({ threads: [], deleted: {}, activeByDate: {}, memoryEnabled: !0 });
function yc(e = Sr(), t = Sr()) {
  const n = { ...e.deleted };
  for (const [i, o] of Object.entries(t.deleted || {})) n[i] = Math.max(Number(o) || 0, Number(n[i]) || 0);
  const s = Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), r = /* @__PURE__ */ new Map();
  for (const i of [...e.threads || [], ...t.threads || []]) {
    if (!i || typeof i.id != "string" || i.id.length > 120 || n[i.id] || !/^\d{4}-\d{2}-\d{2}$/.test(i.date) || !Array.isArray(i.messages) || s && Date.parse(i.createdAt) < s) continue;
    const o = r.get(i.id), l = new Map((o?.messages || []).map((c) => [c.id, c]));
    for (const c of i.messages) {
      if (!c || typeof c.id != "string" || c.id.length > 120 || !["user", "assistant"].includes(c.role) || typeof c.content != "string" || c.content.length > 1e5) continue;
      const d = l.get(c.id);
      (!d || Number(c.updatedAt || 0) > Number(d.updatedAt || 0) || Number(c.updatedAt || 0) === Number(d.updatedAt || 0) && (Number(c.updatedAt || 0) > 0 || c.content.length >= d.content.length)) && l.set(c.id, { ...c });
    }
    r.set(i.id, { id: i.id, date: i.date, createdAt: i.createdAt, messages: [...l.values()].sort((c, d) => String(c.createdAt || "").localeCompare(String(d.createdAt || ""))).slice(-1e3) });
  }
  return { threads: [...r.values()].sort((i, o) => String(i.createdAt || "").localeCompare(String(o.createdAt || ""))), deleted: n, clearedAt: s, activeByDate: { ...e.activeByDate, ...t.activeByDate }, memoryEnabled: t.memoryEnabled ?? e.memoryEnabled ?? !0 };
}
function _c(e, t, n = Date.now()) {
  const s = new Map((e.threads || []).flatMap((o) => o.messages || []).map((o) => [o.id, o])), r = { ...e.deleted, ...t.deleted };
  new Set((t.threads || []).map((o) => o.id));
  const i = (o) => JSON.stringify({ ...o, updatedAt: void 0 });
  return { ...t, deleted: r, clearedAt: Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), threads: (t.threads || []).map((o) => ({ ...o, messages: o.messages.map((l) => ({ ...l, updatedAt: i(l) === i(s.get(l.id) || {}) && s.get(l.id)?.updatedAt || n })) })) };
}
let k = "guest", yn = 0;
const _n = "weiheng.ai-diet-chat.v1";
let zn = !1, Ut = 0, bn = !1;
const ln = /* @__PURE__ */ St("guest"), yt = (e) => {
  try {
    return JSON.parse(e) || { threads: [] };
  } catch {
    return { threads: [] };
  }
};
async function We() {
  if (k === "guest" || zn || bn) return;
  const e = k, t = fe(_n), n = globalThis.localStorage.getItem(t);
  zn = !0, ln.value = "syncing";
  try {
    const s = await fetch("/api/chat", { method: n ? "PUT" : "GET", cache: "no-store", signal: AbortSignal.timeout(15e3), headers: { "Content-Type": "application/json" }, ...n ? { body: JSON.stringify({ ...yt(n), expectedUserId: e }) } : {} }), r = await s.json();
    if (!s.ok) throw Error(r.error);
    if (bn || k !== e || r.userId !== e) return;
    const i = globalThis.localStorage.getItem(t), o = yc(r.state, yt(i)), l = JSON.stringify(o);
    globalThis.localStorage.setItem(t, l), ln.value = "synced", bc.value = (/* @__PURE__ */ new Date()).toISOString(), i !== l && window.dispatchEvent(new CustomEvent("weiheng-chat-synced")), i !== n && (clearTimeout(Ut), Ut = setTimeout(We, 1e3));
  } catch {
    ln.value = "error";
  } finally {
    zn = !1;
  }
}
const ut = "weiheng.local.v2", vr = /* @__PURE__ */ St(null), _e = /* @__PURE__ */ St("guest"), Ni = /* @__PURE__ */ St(""), bc = /* @__PURE__ */ St(""), Yn = /* @__PURE__ */ St([]);
let Xn = !1;
const hs = () => fe("__account_sync_base.v1"), Qn = (e) => {
  try {
    return JSON.parse(e) || {};
  } catch {
    return {};
  }
};
function fe(e, t = k) {
  return t === "guest" ? e : "weiheng.account." + encodeURIComponent(t) + "." + e;
}
function Fc(e, t = k) {
  return t === "guest" ? /^(weiheng|vitabalance)([.:\-]|$)/.test(e) && !e.startsWith("weiheng.account.") : e.startsWith("weiheng.account." + encodeURIComponent(t) + ".");
}
const Ns = () => fe("__account_sync_pending.v1");
async function _t(e = "GET", t, n) {
  const s = { method: e, cache: "no-store", signal: AbortSignal.timeout(15e3), headers: { "Content-Type": "application/json" } };
  e === "PUT" && (s.body = JSON.stringify({ localState: t, baseLocalState: n, expectedUserId: k === "guest" ? void 0 : k }));
  const r = await fetch("/api/data", s), i = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(i.error || "账号数据同步失败。");
  return i;
}
async function bt(e) {
  if (k === "guest" || Xn) return;
  const t = k, n = fe(ut), s = globalThis.localStorage.getItem(n);
  if (s !== null) {
    Xn = !0, _e.value = "syncing";
    try {
      const r = await _t("GET"), i = r.data?.localState || null;
      if (k !== t || r.userId !== t) {
        _e.value = "error";
        return;
      }
      const o = globalThis.localStorage.getItem(hs()), l = mc(Qn(o), Qn(s), Qn(i), e);
      if (l.conflicts.length) {
        const d = fe("__sync_conflict_backup.v1");
        if ((!globalThis.localStorage.getItem(d) || !Yn.value.length) && globalThis.localStorage.setItem(d, JSON.stringify({ local: s, server: i, at: (/* @__PURE__ */ new Date()).toISOString() })), !e) {
          Yn.value = l.conflicts, _e.value = "error";
          return;
        }
      }
      const c = JSON.stringify(l.state);
      if (await _t("PUT", c, i), k !== t) return;
      globalThis.localStorage.setItem(hs(), c), globalThis.localStorage.getItem(n) === s ? (globalThis.localStorage.setItem(n, c), globalThis.localStorage.removeItem(Ns()), window.dispatchEvent(new CustomEvent("weiheng-account-synced")), _e.value = "synced", Yn.value = []) : (_e.value = "pending", clearTimeout(yn), yn = setTimeout(() => bt(), 450)), Ni.value = (/* @__PURE__ */ new Date()).toISOString();
    } catch {
      _e.value = "error";
    } finally {
      Xn = !1;
    }
  }
}
async function jc(e) {
  await bt(e), await We();
}
function Vc() {
  return globalThis.localStorage.getItem(fe("__sync_conflict_backup.v1"));
}
function Di() {
  k !== "guest" && (globalThis.localStorage.setItem(Ns(), "1"), _e.value = "pending", clearTimeout(yn), yn = setTimeout(() => bt(), 450));
}
const Sn = {
  getItem: (e) => globalThis.localStorage.getItem(fe(e)),
  setItem(e, t) {
    e === _n && (t = JSON.stringify(_c(yt(Sn.getItem(e)), yt(t)))), globalThis.localStorage.setItem(fe(e), t), e === _n && k !== "guest" && (ln.value = "pending", clearTimeout(Ut), Ut = setTimeout(We, 900)), e === ut && Di();
  },
  removeItem(e) {
    globalThis.localStorage.removeItem(fe(e)), e === ut && k !== "guest" && (_e.value = "error", globalThis.localStorage.setItem(Ns(), "deleted"));
  }
};
async function Sc(e) {
  const t = fe(ut, e), n = globalThis.localStorage.getItem(fe("__account_sync_pending.v1", e)), s = globalThis.localStorage.getItem(t), r = await _t("GET"), i = typeof r.data?.localState == "string" ? r.data.localState : null;
  if (n === "deleted") {
    if (!(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok) throw new Error("账号数据删除状态暂未同步。");
    globalThis.localStorage.removeItem(fe("__account_sync_pending.v1", e));
  } else if (n && s !== null) {
    await bt();
    return;
  } else if (i !== null && s !== null && i !== s) {
    await bt();
    return;
  } else i !== null ? globalThis.localStorage.setItem(t, i) : s !== null && await _t("PUT", s, null);
  globalThis.localStorage.setItem(hs(), i || s || "{}"), Ni.value = (/* @__PURE__ */ new Date()).toISOString(), _e.value = "synced";
}
async function vc() {
  try {
    const s = await fetch("/api/auth/me", { cache: "no-store", signal: AbortSignal.timeout(8e3) });
    if (!s.ok) throw Error("identity");
    const r = await s.json();
    if (vr.value = r.authenticated && typeof r.user?.id == "string" ? r.user : null, k = vr.value?.id || "guest", _e.value = k === "guest" ? "guest" : "syncing", k !== "guest") {
      try {
        await Sc(k);
      } catch {
        _e.value = "error";
      }
      await We();
    }
  } catch {
    throw new Error("无法确认当前使用空间，暂停读取本地数据。");
  }
  let e = !1;
  const t = async () => {
    if (!(e || document.hidden)) {
      e = !0;
      try {
        const s = await fetch("/api/auth/me", { cache: "no-store", signal: AbortSignal.timeout(4e3) });
        if (!s.ok) return;
        const r = await s.json(), i = r.authenticated && typeof r.user?.id == "string" ? r.user.id : "guest";
        i !== k ? window.location.reload() : i !== "guest" && await bt();
      } catch {
      } finally {
        e = !1;
      }
    }
  };
  window.addEventListener("focus", () => {
    t(), We();
  }), window.addEventListener("online", () => {
    We();
  }), document.addEventListener("visibilitychange", () => {
    document.hidden || We();
  }), window.addEventListener("pagehide", () => {
    if (k !== "guest") {
      const s = Sn.getItem(_n);
      s && fetch("/api/chat", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...yt(s), expectedUserId: k }), keepalive: !0 }).catch(() => {
      });
    }
  }), setInterval(() => {
    document.hidden || We();
  }, 8e3).unref?.(), window.addEventListener("weiheng-reset-begin", () => {
    bn = !0, clearTimeout(Ut);
  }), window.addEventListener("weiheng-reset-abort", () => {
    bn = !1;
  }), document.addEventListener("visibilitychange", t), window.addEventListener("storage", (s) => {
    s.key === fe(ut) && k !== "guest" && Di();
  });
}
async function Lc({ mode: e, email: t, password: n, acceptTerms: s = !1, verificationCode: r = "" }) {
  const i = globalThis.localStorage.getItem(ut), o = await fetch(`/api/auth/${e === "register" ? "register" : "login"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email: t, password: n, acceptTerms: s, verificationCode: r })
  }), l = await o.json().catch(() => ({}));
  if (!o.ok) throw new Error(l.error || "登录暂时失败，请重试。");
  const c = await _t("GET"), d = typeof c.data?.localState == "string" ? c.data.localState : null;
  let a = "账号已登录。";
  return i && d === null ? window.confirm("发现本浏览器已有游客档案和饮食记录。是否复制到这个账号？游客原数据会保留，不会删除。") ? (await _t("PUT", i), globalThis.localStorage.setItem(fe(ut, l.user.id), i), a += "游客数据已复制到账号。") : a += "游客数据仍留在原浏览器空间。" : i && d !== null && (a += "账号已有数据，游客数据仍保留在原浏览器空间，未覆盖账号数据。"), window.location.reload(), { message: a };
}
async function Hc() {
  if (await We(), !(await fetch("/api/auth/logout", { method: "POST", cache: "no-store" })).ok) throw new Error("退出登录失败，请重试。");
  window.location.reload();
}
function Kc() {
  const e = "weiheng.ai-diet-chat.v1", t = yt(Sn.getItem(e)), n = { ...t.deleted };
  for (const s of t.threads || []) n[s.id] = Date.now();
  Sn.setItem(e, JSON.stringify({ threads: [], deleted: n, clearedAt: Date.now(), activeByDate: {}, memoryEnabled: t.memoryEnabled }));
}
async function wc() {
  try {
    await vc();
    const { default: e } = await import("./App-eZdKdgkG.js");
    hc(e).mount("#app");
  } catch {
    const e = document.querySelector("#app");
    if (e) {
      const t = document.createElement("p");
      t.textContent = "暂时无法确认当前使用空间，已暂停读取本地档案。请确认本地服务已启动，然后刷新重试。";
      const n = document.createElement("button");
      n.textContent = "刷新重试", n.onclick = () => location.reload(), e.append(t, n);
    }
  }
}
wc();
export {
  $o as A,
  Ac as B,
  Oo as C,
  Cc as D,
  sc as E,
  ce as F,
  ln as G,
  Kc as H,
  Dc as I,
  Ic as J,
  ne as K,
  ii as L,
  Ni as M,
  bc as N,
  jc as O,
  _e as P,
  Yn as Q,
  Rc as R,
  Vc as S,
  Hc as T,
  Lc as U,
  Pc as V,
  vr as a,
  Sn as b,
  Nl as c,
  Cs as d,
  us as e,
  Oc as f,
  Ec as g,
  Ei as h,
  ve as i,
  Mc as j,
  wl as k,
  ys as l,
  Ho as m,
  _s as n,
  Fc as o,
  Nc as p,
  as as q,
  St as r,
  fe as s,
  Gi as t,
  _o as u,
  Tc as v,
  Un as w,
  ic as x,
  mr as y,
  Gr as z
};
