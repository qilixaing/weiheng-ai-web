// @__NO_SIDE_EFFECTS__
function ms(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const U = {}, ct = [], De = () => {
}, wr = () => !1, wn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), xn = (e) => e.startsWith("onUpdate:"), ee = Object.assign, _s = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Vi = Object.prototype.hasOwnProperty, j = (e, t) => Vi.call(e, t), A = Array.isArray, Xe = (e) => $t(e) === "[object Map]", Je = (e) => $t(e) === "[object Set]", Us = (e) => $t(e) === "[object Date]", M = (e) => typeof e == "function", q = (e) => typeof e == "string", pe = (e) => typeof e == "symbol", F = (e) => e !== null && typeof e == "object", xr = (e) => (F(e) || M(e)) && M(e.then) && M(e.catch), Tr = Object.prototype.toString, $t = (e) => Tr.call(e), Li = (e) => $t(e).slice(8, -1), Cr = (e) => $t(e) === "[object Object]", Tn = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Mt = /* @__PURE__ */ ms(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Cn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Hi = /-\w/g, ve = Cn(
  (e) => e.replace(Hi, (t) => t.slice(1).toUpperCase())
), Ki = /\B([A-Z])/g, tt = Cn(
  (e) => e.replace(Ki, "-$1").toLowerCase()
), Er = Cn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ln = Cn(
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
}, En = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let $s;
const An = () => $s || ($s = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ys(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = q(s) ? Wi(s) : ys(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (q(e) || F(e))
    return e;
}
const Ui = /;(?![^(]*\))/g, $i = /:([^]+)/, Bi = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Wi(e) {
  const t = {};
  return e.replace(Bi, (n) => n.startsWith("/*") ? "" : n).split(Ui).forEach((n) => {
    if (n) {
      const s = n.split($i);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function bs(e) {
  let t = "";
  if (q(e))
    t = e;
  else if (A(e))
    for (let n = 0; n < e.length; n++) {
      const s = bs(e[n]);
      s && (t += s + " ");
    }
  else if (F(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ki = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Ji = /* @__PURE__ */ ms(ki);
function Or(e) {
  return !!e || e === "";
}
function qi(e, t, n) {
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
function Gi(e, t, n) {
  let s = Xe(e), r = Xe(t);
  if (s || r || (s = Je(e), r = Je(t), s || r))
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
  return s || r ? s && r ? e.getTime() === t.getTime() : !1 : (s = pe(e), r = pe(t), s || r ? e === t : (s = A(e), r = A(t), s || r ? s && r ? Ws(e, t, n, qi) : !1 : (s = F(e), r = F(t), s || r ? !s || !r ? !1 : Ws(e, t, n, Gi) : String(e) === String(t))));
}
function vs(e, t) {
  return e.findIndex((n) => xe(n, t));
}
const Ir = (e) => !!(e && e.__v_isRef === !0), zi = (e) => q(e) ? e : e == null ? "" : A(e) || F(e) && (e.toString === Tr || !M(e.toString)) ? Ir(e) ? zi(e.value) : JSON.stringify(e, Mr, 2) : String(e), Mr = (e, t) => Ir(t) ? Mr(e, t.value) : Xe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[Hn(s, i) + " =>"] = r, n),
    {}
  )
} : Je(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Hn(n))
} : pe(t) ? Hn(t) : F(t) && !A(t) && !Cr(t) ? String(t) : t, Hn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    pe(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Z;
class Yi {
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
function Xi() {
  return Z;
}
let B;
const Kn = /* @__PURE__ */ new WeakSet();
class Pr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Z && (Z.active ? Z.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Kn.has(this) && (Kn.delete(this), this.trigger()));
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
    this.flags |= 2, ks(this), Dr(this);
    const t = B, n = Se;
    B = this, Se = !0;
    try {
      return this.fn();
    } finally {
      jr(this), B = t, Se = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        xs(t);
      this.deps = this.depsTail = void 0, ks(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Kn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ns(this) && this.run();
  }
  get dirty() {
    return ns(this);
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
function ws() {
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
function jr(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), xs(s), Qi(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function ns(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Fr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Fr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === jt) || (e.globalVersion = jt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ns(e))))
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
    B = n, Se = s, jr(e), e.flags &= -3;
  }
}
function xs(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      xs(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Qi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Se = !0;
const Vr = [];
function je() {
  Vr.push(Se), Se = !1;
}
function Fe() {
  const e = Vr.pop();
  Se = e === void 0 ? !0 : e;
}
function ks(e) {
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
let jt = 0;
class Zi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ts {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!B || !Se || B === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== B)
      n = this.activeLink = new Zi(B, this), B.deps ? (n.prevDep = B.depsTail, B.depsTail.nextDep = n, B.depsTail = n) : B.deps = B.depsTail = n, Lr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = B.depsTail, n.nextDep = void 0, B.depsTail.nextDep = n, B.depsTail = n, B.deps === n && (B.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, jt++, this.notify(t);
  }
  notify(t) {
    Ss();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ws();
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
const cn = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ Symbol(
  ""
), ss = /* @__PURE__ */ Symbol(
  ""
), Ft = /* @__PURE__ */ Symbol(
  ""
);
function te(e, t, n) {
  if (Se && B) {
    let s = cn.get(e);
    s || cn.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Ts()), r.map = s, r.key = n), r.track();
  }
}
function Ue(e, t, n, s, r, i) {
  const o = cn.get(e);
  if (!o) {
    jt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Ss(), t === "clear")
    o.forEach(l);
  else {
    const c = A(e), d = c && Tn(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((p, x) => {
        (x === "length" || x === Ft || !pe(x) && x >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(Ft)), t) {
        case "add":
          c ? d && l(o.get("length")) : (l(o.get(ft)), Xe(e) && l(o.get(ss)));
          break;
        case "delete":
          c || (l(o.get(ft)), Xe(e) && l(o.get(ss)));
          break;
        case "set":
          Xe(e) && l(o.get(ft));
          break;
      }
  }
  ws();
}
function eo(e, t) {
  const n = cn.get(e);
  return n && n.get(t);
}
function dt(e) {
  const t = /* @__PURE__ */ D(e);
  return t === e || (te(t, "iterate", Ft), /* @__PURE__ */ he(e)) ? t : /* @__PURE__ */ Ve(e) ? /* @__PURE__ */ Qe(e) ? t.map((n) => Ze(ge(n))) : t.map(Ze) : t.map(ge);
}
function On(e) {
  return te(e = /* @__PURE__ */ D(e), "iterate", Ft), e;
}
function Me(e, t) {
  return /* @__PURE__ */ Ve(e) ? Ze(/* @__PURE__ */ Qe(e) ? ge(t) : t) : ge(t);
}
const to = {
  __proto__: null,
  [Symbol.iterator]() {
    return Un(this, Symbol.iterator, (e) => Me(this, e));
  },
  concat(...e) {
    return dt(this).concat(
      ...e.map((t) => A(t) ? dt(t) : t)
    );
  },
  entries() {
    return Un(this, "entries", (e) => (e[1] = Me(this, e[1]), e));
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
    return $n(this, "includes", e);
  },
  indexOf(...e) {
    return $n(this, "indexOf", e);
  },
  join(e) {
    return dt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return $n(this, "lastIndexOf", e);
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
    return dt(this).toReversed();
  },
  toSorted(e) {
    return dt(this).toSorted(e);
  },
  toSpliced(...e) {
    return dt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ct(this, "unshift", e);
  },
  values() {
    return Un(this, "values", (e) => Me(this, e));
  }
};
function Un(e, t, n) {
  const s = On(e), r = s[t], i = r.call(s);
  if (s !== e && !/* @__PURE__ */ he(e)) {
    if (i[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(i));
      return o.next = () => Js(i.next(), n), r !== Hr[t] && Object.defineProperties(o, {
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
    i._next = i.next, i.next = () => Js(i._next(), n);
  }
  return i;
}
function Js(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Hr = Array.prototype;
function Le(e, t, n, s, r, i) {
  const o = On(e), l = o !== e && !/* @__PURE__ */ he(e), c = o[t];
  if (c !== Hr[t]) {
    const p = c.apply(e, i);
    return l ? ge(p) : p;
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
  const r = On(e), i = r !== e && !/* @__PURE__ */ he(e);
  let o = n, l = !1;
  r !== e && (i ? (l = s.length === 0, o = function(d, a, p) {
    return l && (l = !1, d = Me(e, d)), n.call(this, d, Me(e, a), p, e);
  }) : n.length > 3 && (o = function(d, a, p) {
    return n.call(this, d, a, p, e);
  }));
  const c = r[t](o, ...s);
  return l ? Me(e, c) : c;
}
function $n(e, t, n) {
  const s = /* @__PURE__ */ D(e);
  te(s, "iterate", Ft);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ In(n[0]) ? (n[0] = /* @__PURE__ */ D(n[0]), s[t](...n)) : r;
}
function Ct(e, t, n = []) {
  je(), Ss();
  const s = (/* @__PURE__ */ D(e))[t].apply(e, n);
  return ws(), Fe(), s;
}
const no = /* @__PURE__ */ ms("__proto__,__v_isRef,__isVue"), Kr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(pe)
);
function so(e) {
  pe(e) || (e = String(e));
  const t = /* @__PURE__ */ D(this);
  return te(t, "has", e), t.hasOwnProperty(e);
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
      return s === (r ? i ? po : kr : i ? Wr : Br).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = A(t);
    if (!r) {
      let c;
      if (o && (c = to[n]))
        return c;
      if (n === "hasOwnProperty")
        return so;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ X(t) ? t : s
    );
    if ((pe(n) ? Kr.has(n) : no(n)) || (r || te(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ X(l)) {
      const c = o && Tn(n) ? l : l.value;
      return r && F(c) ? /* @__PURE__ */ is(c) : c;
    }
    return F(l) ? r ? /* @__PURE__ */ is(l) : /* @__PURE__ */ Es(l) : l;
  }
}
class $r extends Ur {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = A(t) && Tn(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Ve(i);
      if (!/* @__PURE__ */ he(s) && !/* @__PURE__ */ Ve(s) && (i = /* @__PURE__ */ D(i), s = /* @__PURE__ */ D(s)), !o && /* @__PURE__ */ X(i) && !/* @__PURE__ */ X(s))
        return d || (i.value = s), !0;
    }
    const l = o ? Number(n) < t.length : j(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ X(t) ? t : r
    );
    return t === /* @__PURE__ */ D(r) && c && (l ? Ne(s, i) && Ue(t, "set", n, s) : Ue(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = j(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Ue(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!pe(n) || !Kr.has(n)) && te(t, "has", n), s;
  }
  ownKeys(t) {
    return te(
      t,
      "iterate",
      A(t) ? "length" : ft
    ), Reflect.ownKeys(t);
  }
}
class ro extends Ur {
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
const io = /* @__PURE__ */ new $r(), oo = /* @__PURE__ */ new ro(), lo = /* @__PURE__ */ new $r(!0);
const rs = (e) => e, Yt = (e) => Reflect.getPrototypeOf(e);
function co(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ D(r), o = Xe(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = r[e](...s), a = n ? rs : t ? Ze : ge;
    return !t && te(
      i,
      "iterate",
      c ? ss : ft
    ), ee(
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
function fo(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ D(i), l = /* @__PURE__ */ D(r);
      e || (Ne(r, l) && te(o, "get", r), te(o, "get", l));
      const { has: c } = Yt(o), d = t ? rs : e ? Ze : ge;
      if (c.call(o, r))
        return d(i.get(r));
      if (c.call(o, l))
        return d(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && te(/* @__PURE__ */ D(r), "iterate", ft), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ D(i), l = /* @__PURE__ */ D(r);
      return e || (Ne(r, l) && te(o, "has", r), te(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ D(l), d = t ? rs : e ? Ze : ge;
      return !e && te(c, "iterate", ft), l.forEach((a, p) => r.call(i, d(a), d(p), o));
    }
  };
  return ee(
    n,
    e ? {
      add: Xt("add"),
      set: Xt("set"),
      delete: Xt("delete"),
      clear: Xt("clear")
    } : {
      add(r) {
        const i = /* @__PURE__ */ D(this), o = Yt(i), l = /* @__PURE__ */ D(r), c = !t && !/* @__PURE__ */ he(r) && !/* @__PURE__ */ Ve(r) ? l : r;
        return o.has.call(i, c) || Ne(r, c) && o.has.call(i, r) || Ne(l, c) && o.has.call(i, l) || (i.add(c), Ue(i, "add", c, c)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ he(i) && !/* @__PURE__ */ Ve(i) && (i = /* @__PURE__ */ D(i));
        const o = /* @__PURE__ */ D(this), { has: l, get: c } = Yt(o);
        let d = l.call(o, r);
        d || (r = /* @__PURE__ */ D(r), d = l.call(o, r));
        const a = c.call(o, r);
        return o.set(r, i), d ? Ne(i, a) && Ue(o, "set", r, i) : Ue(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ D(this), { has: o, get: l } = Yt(i);
        let c = o.call(i, r);
        c || (r = /* @__PURE__ */ D(r), c = o.call(i, r)), l && l.call(i, r);
        const d = i.delete(r);
        return c && Ue(i, "delete", r, void 0), d;
      },
      clear() {
        const r = /* @__PURE__ */ D(this), i = r.size !== 0, o = r.clear();
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
    n[r] = co(r, e, t);
  }), n;
}
function Cs(e, t) {
  const n = fo(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_isShallow" ? t : r === "__v_raw" ? s : Reflect.get(
    j(n, r) && r in s ? n : s,
    r,
    i
  );
}
const uo = {
  get: /* @__PURE__ */ Cs(!1, !1)
}, ao = {
  get: /* @__PURE__ */ Cs(!1, !0)
}, ho = {
  get: /* @__PURE__ */ Cs(!0, !1)
};
const Br = /* @__PURE__ */ new WeakMap(), Wr = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ new WeakMap(), po = /* @__PURE__ */ new WeakMap();
function go(e) {
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
function Es(e) {
  return /* @__PURE__ */ Ve(e) ? e : As(
    e,
    !1,
    io,
    uo,
    Br
  );
}
// @__NO_SIDE_EFFECTS__
function mo(e) {
  return As(
    e,
    !1,
    lo,
    ao,
    Wr
  );
}
// @__NO_SIDE_EFFECTS__
function is(e) {
  return As(
    e,
    !0,
    oo,
    ho,
    kr
  );
}
function As(e, t, n, s, r) {
  if (!F(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = go(Li(e));
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
function In(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function D(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ D(t) : e;
}
function _o(e) {
  return !j(e, "__v_skip") && Object.isExtensible(e) && Ar(e, "__v_skip", !0), e;
}
const ge = (e) => F(e) ? /* @__PURE__ */ Es(e) : e, Ze = (e) => F(e) ? /* @__PURE__ */ is(e) : e;
// @__NO_SIDE_EFFECTS__
function X(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  return yo(e, !1);
}
function yo(e, t) {
  return /* @__PURE__ */ X(e) ? e : new bo(e, t);
}
class bo {
  constructor(t, n) {
    this.dep = new Ts(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ D(t), this._value = n ? t : ge(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ he(t) || /* @__PURE__ */ Ve(t);
    t = s ? t : /* @__PURE__ */ D(t), Ne(t, n) && (this._rawValue = t, this._value = s ? t : ge(t), this.dep.trigger());
  }
}
function Jr(e) {
  return /* @__PURE__ */ X(e) ? e.value : e;
}
const vo = {
  get: (e, t, n) => t === "__v_raw" ? e : Jr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ X(r) && !/* @__PURE__ */ X(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function qr(e) {
  return /* @__PURE__ */ Qe(e) ? e : new Proxy(e, vo);
}
class So {
  constructor(t, n, s) {
    this._object = t, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._key = pe(n) ? n : String(n), this._raw = /* @__PURE__ */ D(t);
    let r = !0, i = t;
    if (!A(t) || pe(this._key) || !Tn(this._key))
      do
        r = !/* @__PURE__ */ In(i) || /* @__PURE__ */ he(i);
      while (r && (i = i.__v_raw));
    this._shallow = r;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = Jr(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ X(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ X(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return eo(this._raw, this._key);
  }
}
class wo {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Oc(e, t, n) {
  return /* @__PURE__ */ X(e) ? e : M(e) ? new wo(e) : F(e) && arguments.length > 1 ? xo(e, t, n) : /* @__PURE__ */ at(e);
}
function xo(e, t, n) {
  return new So(e, t, n);
}
class To {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ts(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = jt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
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
    return Fr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Co(e, t, n = !1) {
  let s, r;
  return M(e) ? s = e : (s = e.get, r = e.set), new To(s, r, n);
}
const Qt = {}, fn = /* @__PURE__ */ new WeakMap();
let lt;
function Eo(e, t = !1, n = lt) {
  if (n) {
    let s = fn.get(n);
    s || fn.set(n, s = []), s.push(e);
  }
}
function Ao(e, t, n = U) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n, d = (O) => r ? O : /* @__PURE__ */ he(O) || r === !1 || r === 0 ? $e(O, 1) : $e(O);
  let a, p, x, T, V = !1, P = !1;
  if (/* @__PURE__ */ X(e) ? (p = () => e.value, V = /* @__PURE__ */ he(e)) : /* @__PURE__ */ Qe(e) ? (p = () => d(e), V = !0) : A(e) ? (P = !0, V = e.some((O) => /* @__PURE__ */ Qe(O) || /* @__PURE__ */ he(O)), p = () => e.map((O) => {
    if (/* @__PURE__ */ X(O))
      return O.value;
    if (/* @__PURE__ */ Qe(O))
      return d(O);
    if (M(O))
      return c ? c(O, 2) : O();
  })) : M(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (x) {
      je();
      try {
        x();
      } finally {
        Fe();
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
  const G = Xi(), W = () => {
    a.stop(), G && G.active && _s(G.effects, a);
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
  let N = P ? new Array(e.length).fill(Qt) : Qt;
  const L = (O) => {
    if (!(!(a.flags & 1) || !a.dirty && !O))
      if (t) {
        const Y = a.run();
        if (O || r || V || (P ? Y.some((Ge, Ce) => Ne(Ge, N[Ce])) : Ne(Y, N))) {
          const Ge = lt;
          je();
          try {
            x && x(), lt = a;
            const Ce = [
              Y,
              // pass undefined as the old value when it's changed for the first time
              N === Qt ? void 0 : P && N[0] === Qt ? [] : N,
              T
            ];
            N = Y, c ? c(t, 3, Ce) : (
              // @ts-expect-error
              t(...Ce)
            );
          } finally {
            lt = Ge, Fe();
          }
        }
      } else
        a.run();
  };
  return l && l(L), a = new Pr(p), a.scheduler = o ? () => o(L, !1) : L, T = (O) => Eo(O, !1, a), x = a.onStop = () => {
    const O = fn.get(a);
    if (O) {
      if (c)
        c(O, 4);
      else
        for (const Y of O) Y();
      fn.delete(a);
    }
  }, t ? s ? L(!0) : N = a.run() : o ? o(L.bind(null, !0), !0) : a.run(), W.pause = a.pause.bind(a), W.resume = a.resume.bind(a), W.stop = W, W;
}
function $e(e, t = 1 / 0, n) {
  if (t <= 0 || !F(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ X(e))
    $e(e.value, t, n);
  else if (A(e))
    for (let s = 0; s < e.length; s++)
      $e(e[s], t, n);
  else if (Je(e) || Xe(e))
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
    Mn(r, t, n);
  }
}
function Te(e, t, n, s) {
  if (M(e)) {
    const r = Bt(e, t, n, s);
    return r && xr(r) && r.catch((i) => {
      Mn(i, t, n);
    }), r;
  }
  if (A(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(Te(e[i], t, n, s));
    return r;
  }
}
function Mn(e, t, n, s = !0) {
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
      je(), Bt(i, null, 10, [
        e,
        c,
        d
      ]), Fe();
      return;
    }
  }
  Oo(e, n, r, s, o);
}
function Oo(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const ie = [];
let ye = -1;
const Pe = [];
let Ye = null, ht = 0;
const Gr = /* @__PURE__ */ Promise.resolve();
let un = null;
function zr(e) {
  const t = un || Gr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Io(e) {
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
    !(e.flags & 2) && t >= Vt(n) ? ie.push(e) : ie.splice(Io(t), 0, e), e.flags |= 1, Yr();
  }
}
function Yr() {
  un || (un = Gr.then(Zr));
}
function Mo(e) {
  if (!A(e))
    Ye && e.id === -1 ? Ye.splice(ht + 1, 0, e) : e.flags & 1 || (Pe.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Pe.push(e[t]);
  Yr();
}
function Xr(e, t, n, s = ye + 1) {
  for (; s < ie.length; s++) {
    const r = ie[s];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid || t !== void 0 && !(r.id >= t))
        continue;
      ie.splice(s, 1), s = e ? s - 1 : ye, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Qr(e, t, n = 0) {
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
    for (Ye = i, ht = 0; ht < Ye.length; ht++) {
      const o = Ye[ht];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    Ye = null, ht = 0;
  }
}
let Bn = !1;
function Po(e, t) {
  if (Bn) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(Pe);
  e(), Bn = !0;
  try {
    Xr(void 0, t), Qr(void 0, n, t);
  } finally {
    Bn = !1;
  }
}
const Vt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Zr(e) {
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
    ye = -1, ie.length = 0, Qr(), un = null, (ie.length || Pe.length) && Zr();
  }
}
let ne = null, ei = null;
function an(e) {
  const t = ne;
  return ne = e, ei = e && e.type.__scopeId || null, t;
}
function Ro(e, t = ne, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && rr(-1);
    const i = an(t), o = ke.length;
    let l;
    try {
      l = e(...r);
    } finally {
      for (let c = ke.length; c > o; c--) Rs();
      an(i), s._d && rr(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Ic(e, t) {
  if (ne === null)
    return e;
  const n = Fn(ne), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = U] = t[r];
    i && (M(i) && (i = {
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
    c && (je(), Te(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Fe());
  }
}
function No(e, t) {
  if (oe) {
    let n = oe.provides;
    const s = oe.parent && oe.parent.provides;
    s === n && (n = oe.provides = Object.create(s)), n[e] = t;
  }
}
function sn(e, t, n = !1) {
  const s = Pl();
  if (s || gt) {
    let r = gt ? gt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && M(t) ? t.call(s && s.proxy) : t;
  }
}
const Do = /* @__PURE__ */ Symbol.for("v-scx"), jo = () => sn(Do);
function Wn(e, t, n) {
  return ti(e, t, n);
}
function ti(e, t, n = U) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = ee({}, n), c = t && s || !t && i !== "post";
  let d;
  if (Kt) {
    if (i === "sync") {
      const T = jo();
      d = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!c) {
      const T = () => {
      };
      return T.stop = De, T.resume = De, T.pause = De, T;
    }
  }
  const a = oe;
  l.call = (T, V, P) => Te(T, a, V, P);
  let p = !1;
  i === "post" ? l.scheduler = (T) => {
    T.i = a, le(T, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (T, V) => {
    V ? T() : Os(T);
  }), l.augmentJob = (T) => {
    t && (T.flags |= 4), p && (T.flags |= 2, a && (T.id = a.uid, T.i = a));
  };
  const x = Ao(e, t, l);
  return Kt && (d ? d.push(x) : c && x()), x;
}
function Fo(e, t, n) {
  const s = this.proxy, r = q(e) ? e.includes(".") ? ni(s, e) : () => s[e] : e.bind(s, s);
  let i;
  M(t) ? i = t : (i = t.handler, n = t);
  const o = Wt(this), l = ti(r, i.bind(s), n);
  return o(), l;
}
function ni(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Vo = /* @__PURE__ */ Symbol("_vte"), Pn = (e) => e.__isTeleport, kn = /* @__PURE__ */ Symbol("_leaveCb");
function Lo(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== me) {
        t = n;
        break;
      }
  }
  return t;
}
function si(e) {
  if (!Is(e))
    return Pn(e.type) && e.children ? Lo(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && M(n.default))
      return n.default();
  }
}
function dn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    dn(
      Pn(n.type) && si(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === ce && A(e.children)) {
    const n = di(e.children, !1);
    n && dn(n, t);
  }
}
function os(e) {
  if (e.component)
    return os(e.component.subTree);
  if (e.type === ce) {
    const t = A(e.children) && di(e.children, !1);
    return t ? os(t) : void 0;
  }
  if (e.type !== me)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Mc(e, t) {
  return M(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ee({ name: e.name }, t, { setup: e })
  ) : e;
}
function ri(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Gs(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const hn = /* @__PURE__ */ new WeakMap();
function Nt(e, t, n, s, r = !1) {
  if (A(e)) {
    e.forEach(
      (P, G) => Nt(
        P,
        t && (A(t) ? t[G] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (pt(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Nt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Fn(s.component) : s.el, o = r ? null : i, { i: l, r: c } = e, d = t && t.r, a = l.refs === U ? l.refs = {} : l.refs, p = l.setupState, x = /* @__PURE__ */ D(p), T = p === U ? wr : (P) => Gs(a, P) ? !1 : j(x, P), V = (P, G) => !(G && Gs(a, G));
  if (d != null && d !== c) {
    if (zs(t), q(d))
      a[d] = null, T(d) && (p[d] = null);
    else if (/* @__PURE__ */ X(d)) {
      const P = t;
      V(d, P.k) && (d.value = null), P.k && (a[P.k] = null);
    }
  }
  if (M(c))
    Bt(c, l, 12, [o, a]);
  else {
    const P = q(c), G = /* @__PURE__ */ X(c);
    if (P || G) {
      const W = () => {
        if (e.f) {
          const N = P ? T(c) ? p[c] : a[c] : V() || !e.k ? c.value : a[e.k];
          if (r)
            A(N) && _s(N, i);
          else if (A(N))
            N.includes(i) || N.push(i);
          else if (P)
            a[c] = [i], T(c) && (p[c] = a[c]);
          else {
            const L = [i];
            V(c, e.k) && (c.value = L), e.k && (a[e.k] = L);
          }
        } else P ? (a[c] = o, T(c) && (p[c] = o)) : G && (V(c, e.k) && (c.value = o), e.k && (a[e.k] = o));
      };
      if (o) {
        const N = () => {
          W(), hn.delete(e);
        };
        N.id = -1, hn.set(e, N), le(N, n);
      } else
        zs(e), W();
    }
  }
}
function zs(e) {
  const t = hn.get(e);
  t && (t.flags |= 8, hn.delete(e));
}
An().requestIdleCallback;
An().cancelIdleCallback;
const pt = (e) => !!e.type.__asyncLoader, Is = (e) => e.type.__isKeepAlive;
function Ho(e, t) {
  ii(e, "a", t);
}
function Ko(e, t) {
  ii(e, "da", t);
}
function ii(e, t, n = oe) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Rn(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Is(r.parent.vnode) && Uo(s, t, n, r), r = r.parent;
  }
}
function Uo(e, t, n, s) {
  const r = Rn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  oi(() => {
    _s(s[t], r);
  }, n);
}
function Rn(e, t, n = oe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      je();
      const l = Wt(n), c = Te(t, n, e, o);
      return l(), Fe(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const qe = (e) => (t, n = oe) => {
  (!Kt || e === "sp") && Rn(e, (...s) => t(...s), n);
}, $o = qe("bm"), Bo = qe("m"), Wo = qe(
  "bu"
), ko = qe("u"), Jo = qe(
  "bum"
), oi = qe("um"), qo = qe(
  "sp"
), Go = qe("rtg"), zo = qe("rtc");
function Yo(e, t = oe) {
  Rn("ec", e, t);
}
const Xo = /* @__PURE__ */ Symbol.for("v-ndc");
function Pc(e, t, n, s) {
  let r;
  const i = n, o = A(e);
  if (o || q(e)) {
    const l = o && /* @__PURE__ */ Qe(e);
    let c = !1, d = !1;
    l && (c = !/* @__PURE__ */ he(e), d = /* @__PURE__ */ Ve(e), e = On(e)), r = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      r[a] = t(
        c ? d ? Ze(ge(e[a])) : ge(e[a]) : e[a],
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
  else if (F(e))
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
function Rc(e, t, n, s, r, i) {
  if (n == null && (n = {}), ne.ce || ne.parent && pt(ne.parent) && ne.parent.ce) {
    const d = n, a = Object.keys(d).length > 0;
    return ds(), hs(
      ce,
      null,
      [we("slot", d, s)],
      a ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1);
  const l = ke.length;
  ds();
  let c;
  try {
    const d = o && li(o(n)), a = n.key || i || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    c = hs(
      ce,
      {
        key: (a && !pe(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && s ? "_fb" : "")
      },
      d || (s ? s() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let a = ke.length; a > l; a--) Rs();
    throw d;
  } finally {
    o && o._c && (o._d = !0);
  }
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function li(e) {
  return e.some((t) => jn(t) ? !(t.type === me || t.type === ce && !li(t.children)) : !0) ? e : null;
}
const ls = (e) => e ? Ii(e) ? Fn(e) : ls(e.parent) : null, Dt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ls(e.parent),
    $root: (e) => ls(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => fi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Os(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = zr.bind(e.proxy)),
    $watch: (e) => Fo.bind(e)
  })
), Jn = (e, t) => e !== U && !e.__isScriptSetup && j(e, t), Qo = {
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
        if (Jn(s, t))
          return o[t] = 1, s[t];
        if (r !== U && j(r, t))
          return o[t] = 2, r[t];
        if (j(i, t))
          return o[t] = 3, i[t];
        if (n !== U && j(n, t))
          return o[t] = 4, n[t];
        cs && (o[t] = 0);
      }
    }
    const d = Dt[t];
    let a, p;
    if (d)
      return t === "$attrs" && te(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== U && j(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, j(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Jn(r, t) ? (r[t] = n, !0) : s !== U && j(s, t) ? (s[t] = n, !0) : j(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== U && l[0] !== "$" && j(e, l) || Jn(t, l) || j(i, l) || j(s, l) || j(Dt, l) || j(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ys(e) {
  return A(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let cs = !0;
function Zo(e) {
  const t = fi(e), n = e.proxy, s = e.ctx;
  cs = !1, t.beforeCreate && Xs(t.beforeCreate, e, "bc");
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
    updated: V,
    activated: P,
    deactivated: G,
    beforeDestroy: W,
    beforeUnmount: N,
    destroyed: L,
    unmounted: O,
    render: Y,
    renderTracked: Ge,
    renderTriggered: Ce,
    errorCaptured: ze,
    serverPrefetch: kt,
    // public API
    expose: nt,
    inheritAttrs: St,
    // assets
    components: Jt,
    directives: qt,
    filters: Vn
  } = t;
  if (d && el(d, s, null), o)
    for (const k in o) {
      const $ = o[k];
      M($) && (s[k] = $.bind(n));
    }
  if (r) {
    const k = r.call(n, n);
    F(k) && (e.data = /* @__PURE__ */ Es(k));
  }
  if (cs = !0, i)
    for (const k in i) {
      const $ = i[k], st = M($) ? $.bind(n, n) : M($.get) ? $.get.bind(n, n) : De, Gt = !M($) && M($.set) ? $.set.bind(n) : De, rt = Vl({
        get: st,
        set: Gt
      });
      Object.defineProperty(s, k, {
        enumerable: !0,
        configurable: !0,
        get: () => rt.value,
        set: (_e) => rt.value = _e
      });
    }
  if (l)
    for (const k in l)
      ci(l[k], s, n, k);
  if (c) {
    const k = M(c) ? c.call(n) : c;
    Reflect.ownKeys(k).forEach(($) => {
      No($, k[$]);
    });
  }
  a && Xs(a, e, "c");
  function se(k, $) {
    A($) ? $.forEach((st) => k(st.bind(n))) : $ && k($.bind(n));
  }
  if (se($o, p), se(Bo, x), se(Wo, T), se(ko, V), se(Ho, P), se(Ko, G), se(Yo, ze), se(zo, Ge), se(Go, Ce), se(Jo, N), se(oi, O), se(qo, kt), A(nt))
    if (nt.length) {
      const k = e.exposed || (e.exposed = {});
      nt.forEach(($) => {
        Object.defineProperty(k, $, {
          get: () => n[$],
          set: (st) => n[$] = st,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  Y && e.render === De && (e.render = Y), St != null && (e.inheritAttrs = St), Jt && (e.components = Jt), qt && (e.directives = qt), kt && ri(e);
}
function el(e, t, n = De) {
  A(e) && (e = fs(e));
  for (const s in e) {
    const r = e[s];
    let i;
    F(r) ? "default" in r ? i = sn(
      r.from || s,
      r.default,
      !0
    ) : i = sn(r.from || s) : i = sn(r), /* @__PURE__ */ X(i) ? Object.defineProperty(t, s, {
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
function ci(e, t, n, s) {
  let r = s.includes(".") ? ni(n, s) : () => n[s];
  if (q(e)) {
    const i = t[e];
    M(i) && Wn(r, i);
  } else if (M(e))
    Wn(r, e.bind(n));
  else if (F(e))
    if (A(e))
      e.forEach((i) => ci(i, t, n, s));
    else {
      const i = M(e.handler) ? e.handler.bind(n) : t[e.handler];
      M(i) && Wn(r, i, e);
    }
}
function fi(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (d) => pn(c, d, o, !0)
  ), pn(c, t, o)), F(t) && i.set(t, c), c;
}
function pn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && pn(e, i, n, !0), r && r.forEach(
    (o) => pn(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = tl[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const tl = {
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
  watch: sl,
  // provide / inject
  provide: Qs,
  inject: nl
};
function Qs(e, t) {
  return t ? e ? function() {
    return ee(
      M(e) ? e.call(this, this) : e,
      M(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function nl(e, t) {
  return Ot(fs(e), fs(t));
}
function fs(e) {
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
  return e ? ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Zs(e, t) {
  return e ? A(e) && A(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    Ys(e),
    Ys(t ?? {})
  ) : t;
}
function sl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ee(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = re(e[s], t[s]);
  return n;
}
function ui() {
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
let rl = 0;
function il(e, t) {
  return function(s, r = null) {
    M(s) || (s = ee({}, s)), r != null && !F(r) && (r = null);
    const i = ui(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = i.app = {
      _uid: rl++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Ll,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && M(a.install) ? (o.add(a), a.install(d, ...p)) : M(a) && (o.add(a), a(d, ...p))), d;
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
          const T = d._ceVNode || we(s, r);
          return T.appContext = i, x === !0 ? x = "svg" : x === !1 && (x = void 0), e(T, a, x), c = !0, d._container = a, a.__vue_app__ = d, Fn(T.component);
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
        const p = gt;
        gt = d;
        try {
          return a();
        } finally {
          gt = p;
        }
      }
    };
    return d;
  };
}
let gt = null;
const ol = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ve(t)}Modifiers`] || e[`${tt(t)}Modifiers`];
function ll(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || U;
  let r = n;
  const i = t.startsWith("update:"), o = i && ol(s, t.slice(7));
  o && (o.trim && (r = n.map((a) => q(a) ? a.trim() : a)), o.number && (r = r.map(En)));
  let l, c = s[l = Ln(t)] || // also try camelCase event handler (#2249)
  s[l = Ln(ve(t))];
  !c && i && (c = s[l = Ln(tt(t))]), c && Te(
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
const cl = /* @__PURE__ */ new WeakMap();
function ai(e, t, n = !1) {
  const s = n ? cl : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!M(e)) {
    const c = (d) => {
      const a = ai(d, t, !0);
      a && (l = !0, ee(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (F(e) && s.set(e, null), null) : (A(i) ? i.forEach((c) => o[c] = null) : ee(o, i), F(e) && s.set(e, o), o);
}
function Nn(e, t) {
  return !e || !wn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, tt(t)) || j(e, t));
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
    ctx: V,
    inheritAttrs: P
  } = e, G = an(e);
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
          V
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
      ), N = t.props ? l : fl(l);
    }
  } catch (O) {
    ke.length = 0, Mn(O, e, 1), W = we(me);
  }
  let L = W;
  if (N && P !== !1) {
    const O = Object.keys(N), { shapeFlag: Y } = L;
    O.length && Y & 7 && (i && O.some(xn) && (N = ul(
      N,
      i
    )), L = mt(L, N, !1, !0));
  }
  if (n.dirs && (L = mt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const O = Pn(L.type) && si(L) || L;
    dn(O, n.transition);
  }
  return W = L, an(G), W;
}
function di(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    if (jn(r)) {
      if (r.type !== me || r.children === "v-if") {
        if (n)
          return;
        n = r;
      }
    } else
      return;
  }
  return n;
}
const fl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || wn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ul = (e, t) => {
  const n = {};
  for (const s in e)
    (!xn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function al(e, t, n) {
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
        if (hi(o, s, x) && !Nn(d, x))
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
    if (!j(e, i) || hi(t, e, i) && !Nn(n, i))
      return !0;
  }
  return !1;
}
function hi(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && F(s) && F(r) ? !xe(s, r) : s !== r;
}
function dl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = s, e = r), r === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const pi = {}, gi = () => Object.create(pi), mi = (e) => Object.getPrototypeOf(e) === pi;
function hl(e, t, n, s = !1) {
  const r = {}, i = gi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), _i(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ mo(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function pl(e, t, n, s) {
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
        let x = a[p];
        if (Nn(e.emitsOptions, x))
          continue;
        const T = t[x];
        if (c)
          if (j(i, x))
            T !== i[x] && (i[x] = T, d = !0);
          else {
            const V = ve(x);
            r[V] = us(
              c,
              l,
              V,
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
    _i(e, t, r, i) && (d = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !j(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = tt(p)) === p || !j(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[p] = us(
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
  d && Ue(e.attrs, "set", "");
}
function _i(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (Mt(c))
        continue;
      const d = t[c];
      let a;
      r && j(r, a = ve(c)) ? !i || !i.includes(a) ? n[a] = d : (l || (l = {}))[a] = d : Nn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, o = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ D(n), d = l || U;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      n[p] = us(
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
function us(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = j(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && M(c)) {
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
const gl = /* @__PURE__ */ new WeakMap();
function yi(e, t, n = !1) {
  const s = n ? gl : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let c = !1;
  if (!M(e)) {
    const a = (p) => {
      c = !0;
      const [x, T] = yi(p, t, !0);
      ee(o, x), T && l.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return F(e) && s.set(e, ct), ct;
  if (A(i))
    for (let a = 0; a < i.length; a++) {
      const p = ve(i[a]);
      nr(p) && (o[p] = U);
    }
  else if (i)
    for (const a in i) {
      const p = ve(a);
      if (nr(p)) {
        const x = i[a], T = o[p] = A(x) || M(x) ? { type: x } : ee({}, x), V = T.type;
        let P = !1, G = !0;
        if (A(V))
          for (let W = 0; W < V.length; ++W) {
            const N = V[W], L = M(N) && N.name;
            if (L === "Boolean") {
              P = !0;
              break;
            } else L === "String" && (G = !1);
          }
        else
          P = M(V) && V.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = P, T[
          1
          /* shouldCastTrue */
        ] = G, (P || j(T, "default")) && l.push(p);
      }
    }
  const d = [o, l];
  return F(e) && s.set(e, d), d;
}
function nr(e) {
  return e[0] !== "$" && !Mt(e);
}
const Ms = (e) => e === "_" || e === "_ctx" || e === "$stable", Ps = (e) => A(e) ? e.map(Re) : [Re(e)], ml = (e, t, n) => {
  if (t._n)
    return t;
  const s = Ro((...r) => Ps(t(...r)), n);
  return s._c = !1, s;
}, bi = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Ms(r)) continue;
    const i = e[r];
    if (M(i))
      t[r] = ml(r, i, s);
    else if (i != null) {
      const o = Ps(i);
      t[r] = () => o;
    }
  }
}, vi = (e, t) => {
  const n = Ps(t);
  e.slots.default = () => n;
}, Si = (e, t, n) => {
  for (const s in t)
    (n || !Ms(s)) && (e[s] = t[s]);
}, _l = (e, t, n) => {
  const s = e.slots = gi();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Si(s, t, n), n && Ar(s, "_", r, !0)) : bi(t, s);
  } else t && vi(e, t);
}, yl = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = U;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Si(r, t, n) : (i = !t.$stable, bi(t, r)), o = t;
  } else t && (vi(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !Ms(l) && o[l] == null && delete r[l];
}, le = xl;
function bl(e) {
  return vl(e);
}
function vl(e, t) {
  const n = An();
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
    insertStaticContent: V
  } = e, P = (f, u, h, y = null, m = null, _ = null, S = void 0, v = null, b = !!u.dynamicChildren) => {
    if (f === u)
      return;
    f && !Et(f, u) && (y = zt(f), _e(f, m, _, !0), f = null), u.patchFlag === -2 && (b = !1, u.dynamicChildren = null), u.dynamicChildren && f && f.dynamicChildren && f.dynamicChildren.hasOnce && (u.dynamicChildren === ct && (u.dynamicChildren = []), u.dynamicChildren.hasOnce = !0);
    const { type: g, ref: C, shapeFlag: w } = u;
    switch (g) {
      case Dn:
        G(f, u, h, y);
        break;
      case me:
        W(f, u, h, y);
        break;
      case rn:
        f == null && N(u, h, y, S);
        break;
      case ce:
        Jt(
          f,
          u,
          h,
          y,
          m,
          _,
          S,
          v,
          b
        );
        break;
      default:
        w & 1 ? Y(
          f,
          u,
          h,
          y,
          m,
          _,
          S,
          v,
          b
        ) : w & 6 ? qt(
          f,
          u,
          h,
          y,
          m,
          _,
          S,
          v,
          b
        ) : (w & 64 || w & 128) && g.process(
          f,
          u,
          h,
          y,
          m,
          _,
          S,
          v,
          b,
          xt
        );
    }
    C != null && m ? Nt(C, f && f.ref, _, u || f, !u) : C == null && f && f.ref != null && Nt(f.ref, null, _, f, !0);
  }, G = (f, u, h, y) => {
    if (f == null)
      s(
        u.el = l(u.children),
        h,
        y
      );
    else {
      const m = u.el = f.el;
      u.children !== f.children && d(m, u.children);
    }
  }, W = (f, u, h, y) => {
    f == null ? s(
      u.el = c(u.children || ""),
      h,
      y
    ) : u.el = f.el;
  }, N = (f, u, h, y) => {
    [f.el, f.anchor] = V(
      f.children,
      u,
      h,
      y,
      f.el,
      f.anchor
    );
  }, L = ({ el: f, anchor: u }, h, y) => {
    let m;
    for (; f && f !== u; )
      m = x(f), s(f, h, y), f = m;
    s(u, h, y);
  }, O = ({ el: f, anchor: u }) => {
    let h;
    for (; f && f !== u; )
      h = x(f), r(f), f = h;
    r(u);
  }, Y = (f, u, h, y, m, _, S, v, b) => {
    if (u.type === "svg" ? S = "svg" : u.type === "math" && (S = "mathml"), f == null)
      Ge(
        u,
        h,
        y,
        m,
        _,
        S,
        v,
        b
      );
    else {
      const g = f.el && f.el._isVueCE ? f.el : null;
      try {
        g && g._beginPatch(), kt(
          f,
          u,
          m,
          _,
          S,
          v,
          b
        );
      } finally {
        g && g._endPatch();
      }
    }
  }, Ge = (f, u, h, y, m, _, S, v) => {
    let b, g;
    const { props: C, shapeFlag: w, transition: E, dirs: I } = f;
    if (b = f.el = o(
      f.type,
      _,
      C && C.is,
      C
    ), w & 8 ? a(b, f.children) : w & 16 && ze(
      f.children,
      b,
      null,
      y,
      m,
      qn(f, _),
      S,
      v
    ), I && it(f, null, y, "created"), Ce(b, f, f.scopeId, S, y), C) {
      for (const K in C)
        K !== "value" && !Mt(K) && i(b, K, null, C[K], _, y);
      "value" in C && i(b, "value", null, C.value, _), (g = C.onVnodeBeforeMount) && Ie(g, y, f);
    }
    I && it(f, null, y, "beforeMount");
    const R = Sl(m, E);
    R && E.beforeEnter(b), s(b, u, h), ((g = C && C.onVnodeMounted) || R || I) && le(() => {
      g && Ie(g, y, f), R && E.enter(b), I && it(f, null, y, "mounted");
    }, m);
  }, Ce = (f, u, h, y, m) => {
    if (h && T(f, h), y)
      for (let _ = 0; _ < y.length; _++)
        T(f, y[_]);
    if (m) {
      let _ = m.subTree;
      if (u === _ || Ti(_.type) && (_.ssContent === u || _.ssFallback === u)) {
        const S = m.vnode;
        Ce(
          f,
          S,
          S.scopeId,
          S.slotScopeIds,
          m.parent
        );
      }
    }
  }, ze = (f, u, h, y, m, _, S, v, b = 0) => {
    for (let g = b; g < f.length; g++) {
      const C = f[g] = v ? Ke(f[g]) : Re(f[g]);
      P(
        null,
        C,
        u,
        h,
        y,
        m,
        _,
        S,
        v
      );
    }
  }, kt = (f, u, h, y, m, _, S) => {
    const v = u.el = f.el;
    let { patchFlag: b, dynamicChildren: g, dirs: C } = u;
    b |= f.patchFlag & 16;
    const w = f.props || U, E = u.props || U;
    let I;
    if (h && ot(h, !1), (I = E.onVnodeBeforeUpdate) && Ie(I, h, u, f), C && it(u, f, h, "beforeUpdate"), h && ot(h, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    g && (!f.dynamicChildren || f.dynamicChildren.length !== g.length) && (b = 0, S = !1, g = null), (w.innerHTML && E.innerHTML == null || w.textContent && E.textContent == null) && a(v, ""), g ? nt(
      f.dynamicChildren,
      g,
      v,
      h,
      y,
      qn(u, m),
      _
    ) : S || $(
      f,
      u,
      v,
      null,
      h,
      y,
      qn(u, m),
      _,
      !1
    ), b > 0) {
      if (b & 16)
        St(v, w, E, h, m);
      else if (b & 2 && w.class !== E.class && i(v, "class", null, E.class, m), b & 4 && i(v, "style", w.style, E.style, m), b & 8) {
        const R = u.dynamicProps;
        for (let K = 0; K < R.length; K++) {
          const H = R[K], z = w[H], Q = E[H];
          (Q !== z || H === "value") && i(v, H, z, Q, m, h);
        }
      }
      b & 1 && f.children !== u.children && a(v, u.children);
    } else !S && g == null && St(v, w, E, h, m);
    ((I = E.onVnodeUpdated) || C) && le(() => {
      I && Ie(I, h, u, f), C && it(u, f, h, "updated");
    }, y);
  }, nt = (f, u, h, y, m, _, S) => {
    for (let v = 0; v < u.length; v++) {
      const b = f[v], g = u[v], C = b.el || as(b), w = (
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
      P(
        b,
        g,
        w,
        null,
        y,
        m,
        _,
        S,
        !0
      );
    }
  }, St = (f, u, h, y, m) => {
    if (u !== h) {
      if (u !== U)
        for (const _ in u)
          !Mt(_) && !(_ in h) && i(
            f,
            _,
            u[_],
            null,
            m,
            y
          );
      for (const _ in h) {
        if (Mt(_)) continue;
        const S = h[_], v = u[_];
        S !== v && _ !== "value" && i(f, _, v, S, m, y);
      }
      "value" in h && i(f, "value", u.value, h.value, m);
    }
  }, Jt = (f, u, h, y, m, _, S, v, b) => {
    const g = u.el = f ? f.el : l(""), C = u.anchor = f ? f.anchor : l("");
    let { patchFlag: w, dynamicChildren: E, slotScopeIds: I } = u;
    I && (v = v ? v.concat(I) : I), f == null ? (s(g, h, y), s(C, h, y), ze(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      C,
      m,
      _,
      S,
      v,
      b
    )) : w > 0 && w & 64 && E && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === E.length ? (nt(
      f.dynamicChildren,
      E,
      h,
      m,
      _,
      S,
      v
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || m && u === m.subTree) && wi(
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
      _,
      S,
      v,
      b
    );
  }, qt = (f, u, h, y, m, _, S, v, b) => {
    u.slotScopeIds = v, f == null ? u.shapeFlag & 512 ? m.ctx.activate(
      u,
      h,
      y,
      S,
      b
    ) : Vn(
      u,
      h,
      y,
      m,
      _,
      S,
      b
    ) : Ds(f, u, b);
  }, Vn = (f, u, h, y, m, _, S) => {
    const v = f.component = Ml(
      f,
      y,
      m
    );
    if (Is(f) && (v.ctx.renderer = xt), Rl(v, !1, S), v.asyncDep) {
      if (m && m.registerDep(
        v,
        se,
        S,
        _
      ), !f.el) {
        const b = v.subTree = we(me);
        W(null, b, u, h), f.placeholder = b.el;
      }
    } else
      se(
        v,
        f,
        u,
        h,
        m,
        _,
        S
      );
  }, Ds = (f, u, h) => {
    const y = u.component = f.component;
    if (al(f, u, h))
      if (y.asyncDep && !y.asyncResolved) {
        u.el = f.el, u.placeholder = f.placeholder, k(y, u, h);
        return;
      } else
        y.next = u, y.update();
    else
      u.el = f.el, u.placeholder = f.placeholder, y.vnode = u;
  }, se = (f, u, h, y, m, _, S) => {
    const v = () => {
      if (f.isMounted) {
        let { next: w, bu: E, u: I, parent: R, vnode: K } = f;
        {
          const Ae = xi(f);
          if (Ae) {
            w && (w.el = K.el, k(f, w, S)), Ae.asyncDep.then(() => {
              le(() => {
                f.isUnmounted || g();
              }, m);
            });
            return;
          }
        }
        let H = w, z;
        ot(f, !1), w ? (w.el = K.el, k(f, w, S)) : w = K, E && nn(E), (z = w.props && w.props.onVnodeBeforeUpdate) && Ie(z, R, w, K), ot(f, !0);
        const Q = er(f), Ee = f.subTree;
        f.subTree = Q, P(
          Ee,
          Q,
          // parent may have changed if it's in a teleport
          p(Ee.el),
          // anchor may have changed if it's in a fragment
          zt(Ee),
          f,
          m,
          _
        ), w.el = Q.el, H === null && dl(f, Q.el), I && le(I, m), (z = w.props && w.props.onVnodeUpdated) && le(
          () => Ie(z, R, w, K),
          m
        );
      } else {
        let w;
        const { el: E, props: I } = u, { bm: R, m: K, parent: H, root: z, type: Q } = f, Ee = pt(u);
        ot(f, !1), R && nn(R), !Ee && (w = I && I.onVnodeBeforeMount) && Ie(w, H, u), ot(f, !0);
        {
          z.ce && z.ce._hasShadowRoot() && z.ce._injectChildStyle(
            Q,
            f.parent ? f.parent.type : void 0
          );
          const Ae = f.subTree = er(f);
          P(
            null,
            Ae,
            h,
            y,
            f,
            m,
            _
          ), u.el = Ae.el;
        }
        if (K && le(K, m), !Ee && (w = I && I.onVnodeMounted)) {
          const Ae = u;
          le(
            () => Ie(w, H, Ae),
            m
          );
        }
        (u.shapeFlag & 256 || H && pt(H.vnode) && H.vnode.shapeFlag & 256) && f.a && le(f.a, m), f.isMounted = !0, u = h = y = null;
      }
    };
    f.scope.on();
    const b = f.effect = new Pr(v);
    f.scope.off();
    const g = f.update = b.run.bind(b), C = f.job = b.runIfDirty.bind(b);
    C.i = f, C.id = f.uid, b.scheduler = () => Os(C), ot(f, !0), g();
  }, k = (f, u, h) => {
    u.component = f;
    const y = f.vnode.props;
    f.vnode = u, f.next = null, pl(f, u.props, y, h), yl(f, u.children, h), je(), Xr(f), Fe();
  }, $ = (f, u, h, y, m, _, S, v, b = !1) => {
    const g = f && f.children, C = f ? f.shapeFlag : 0, w = u.children, { patchFlag: E, shapeFlag: I } = u;
    if (E > 0) {
      if (E & 128) {
        Gt(
          g,
          w,
          h,
          y,
          m,
          _,
          S,
          v,
          b
        );
        return;
      } else if (E & 256) {
        st(
          g,
          w,
          h,
          y,
          m,
          _,
          S,
          v,
          b
        );
        return;
      }
    }
    I & 8 ? (C & 16 && wt(g, m, _), w !== g && a(h, w)) : C & 16 ? I & 16 ? Gt(
      g,
      w,
      h,
      y,
      m,
      _,
      S,
      v,
      b
    ) : wt(g, m, _, !0) : (C & 8 && a(h, ""), I & 16 && ze(
      w,
      h,
      y,
      m,
      _,
      S,
      v,
      b
    ));
  }, st = (f, u, h, y, m, _, S, v, b) => {
    f = f || ct, u = u || ct;
    const g = f.length, C = u.length, w = Math.min(g, C);
    let E;
    for (E = 0; E < w; E++) {
      const I = u[E] = b ? Ke(u[E]) : Re(u[E]);
      P(
        f[E],
        I,
        h,
        null,
        m,
        _,
        S,
        v,
        b
      );
    }
    g > C ? wt(
      f,
      m,
      _,
      !0,
      !1,
      w
    ) : ze(
      u,
      h,
      y,
      m,
      _,
      S,
      v,
      b,
      w
    );
  }, Gt = (f, u, h, y, m, _, S, v, b) => {
    let g = 0;
    const C = u.length;
    let w = f.length - 1, E = C - 1;
    for (; g <= w && g <= E; ) {
      const I = f[g], R = u[g] = b ? Ke(u[g]) : Re(u[g]);
      if (Et(I, R))
        P(
          I,
          R,
          h,
          null,
          m,
          _,
          S,
          v,
          b
        );
      else
        break;
      g++;
    }
    for (; g <= w && g <= E; ) {
      const I = f[w], R = u[E] = b ? Ke(u[E]) : Re(u[E]);
      if (Et(I, R))
        P(
          I,
          R,
          h,
          null,
          m,
          _,
          S,
          v,
          b
        );
      else
        break;
      w--, E--;
    }
    if (g > w) {
      if (g <= E) {
        const I = E + 1, R = I < C ? u[I].el : y;
        for (; g <= E; )
          P(
            null,
            u[g] = b ? Ke(u[g]) : Re(u[g]),
            h,
            R,
            m,
            _,
            S,
            v,
            b
          ), g++;
      }
    } else if (g > E)
      for (; g <= w; )
        _e(f[g], m, _, !0), g++;
    else {
      const I = g, R = g, K = /* @__PURE__ */ new Map();
      for (g = R; g <= E; g++) {
        const ue = u[g] = b ? Ke(u[g]) : Re(u[g]);
        ue.key != null && K.set(ue.key, g);
      }
      let H, z = 0;
      const Q = E - R + 1;
      let Ee = !1, Ae = 0;
      const Tt = new Array(Q);
      for (g = 0; g < Q; g++) Tt[g] = 0;
      for (g = I; g <= w; g++) {
        const ue = f[g];
        if (z >= Q) {
          _e(ue, m, _, !0);
          continue;
        }
        let Oe;
        if (ue.key != null)
          Oe = K.get(ue.key);
        else
          for (H = R; H <= E; H++)
            if (Tt[H - R] === 0 && Et(ue, u[H])) {
              Oe = H;
              break;
            }
        Oe === void 0 ? _e(ue, m, _, !0) : (Tt[Oe - R] = g + 1, Oe >= Ae ? Ae = Oe : Ee = !0, P(
          ue,
          u[Oe],
          h,
          null,
          m,
          _,
          S,
          v,
          b
        ), z++);
      }
      const Ls = Ee ? wl(Tt) : ct;
      for (H = Ls.length - 1, g = Q - 1; g >= 0; g--) {
        const ue = R + g, Oe = u[ue], Hs = u[ue + 1], Ks = ue + 1 < C ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Hs.el || as(Hs)
        ) : y;
        Tt[g] === 0 ? P(
          null,
          Oe,
          h,
          Ks,
          m,
          _,
          S,
          v,
          b
        ) : Ee && (H < 0 || g !== Ls[H] ? rt(Oe, h, Ks, 2) : H--);
      }
    }
  }, rt = (f, u, h, y, m = null) => {
    const { el: _, type: S, transition: v, children: b, shapeFlag: g } = f;
    if (g & 6) {
      rt(f.component.subTree, u, h, y);
      return;
    }
    if (g & 128) {
      f.suspense.move(u, h, y);
      return;
    }
    if (g & 64) {
      S.move(f, u, h, xt);
      return;
    }
    if (S === ce) {
      s(_, u, h);
      for (let w = 0; w < b.length; w++)
        rt(b[w], u, h, y);
      s(f.anchor, u, h);
      return;
    }
    if (S === rn) {
      L(f, u, h);
      return;
    }
    if (y !== 2 && g & 1 && v)
      if (y === 0)
        v.persisted && !_[kn] ? s(_, u, h) : (v.beforeEnter(_), s(_, u, h), le(() => v.enter(_), m));
      else {
        const { leave: w, delayLeave: E, afterLeave: I } = v, R = () => {
          f.ctx.isUnmounted ? r(_) : s(_, u, h);
        }, K = () => {
          const H = _._isLeaving || !!_[kn];
          _._isLeaving && _[kn](
            !0
            /* cancelled */
          ), v.persisted && !H ? R() : w(_, () => {
            R(), I && I();
          });
        };
        E ? E(_, R, K) : K();
      }
    else
      s(_, u, h);
  }, _e = (f, u, h, y = !1, m = !1) => {
    const {
      type: _,
      props: S,
      ref: v,
      children: b,
      dynamicChildren: g,
      shapeFlag: C,
      patchFlag: w,
      dirs: E,
      cacheIndex: I,
      memo: R
    } = f;
    if ((w === -2 || g && g.hasOnce) && (m = !1), v != null && (je(), Nt(v, null, h, f, !0), Fe()), I != null && (!f.ctx || f.ctx === u) && (u.renderCache[I] = void 0), C & 256) {
      u.ctx.deactivate(f);
      return;
    }
    const K = C & 1 && E, H = !pt(f);
    let z;
    if (H && (z = S && S.onVnodeBeforeUnmount) && Ie(z, u, f), C & 6)
      Fi(f.component, h, y);
    else {
      if (C & 128) {
        f.suspense.unmount(h, y);
        return;
      }
      K && it(f, null, u, "beforeUnmount"), C & 64 ? f.type.remove(
        f,
        u,
        h,
        xt,
        y
      ) : g && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !g.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== ce || w > 0 && w & 64) ? wt(
        g,
        u,
        h,
        !1,
        !0
      ) : (_ === ce && w & 384 || !m && C & 16) && wt(b, u, h), y && js(f);
    }
    const Q = R != null && I == null;
    (H && (z = S && S.onVnodeUnmounted) || K || Q) && le(() => {
      z && Ie(z, u, f), K && it(f, null, u, "unmounted"), Q && (f.el = null);
    }, h);
  }, js = (f) => {
    const { type: u, el: h, anchor: y, transition: m } = f, _ = u === ce;
    if (_ && !m) {
      Fs(h, y);
      return;
    }
    if (u === rn) {
      O(f), m && !m.persisted && m.afterLeave && m.afterLeave();
      return;
    }
    const S = _ ? os(f) : f, v = () => {
      _ ? p(h) && Fs(h, y) : r(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (S && S.shapeFlag & 1 && m && !m.persisted) {
      const { leave: b, delayLeave: g } = m, C = S.el, w = () => b(C, v);
      g ? g(C, v, w) : w();
    } else
      v();
  }, Fs = (f, u) => {
    let h;
    for (; f !== u; )
      h = x(f), r(f), f = h;
    r(u);
  }, Fi = (f, u, h) => {
    const { bum: y, scope: m, job: _, subTree: S, um: v, m: b, a: g } = f;
    sr(b), sr(g), y && nn(y), m.stop(), _ ? (_.flags |= 8, _e(S, f, u, h)) : f.vnode.el && S && (S.transition = f.vnode.transition, _e(S, f, u, h)), v && le(v, u), le(() => {
      f.isUnmounted = !0;
    }, u);
  }, wt = (f, u, h, y = !1, m = !1, _ = 0) => {
    for (let S = _; S < f.length; S++)
      _e(f[S], u, h, y, m);
  }, zt = (f) => {
    if (f.shapeFlag & 6)
      return zt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const u = x(f.anchor || f.el), h = u && u[Vo];
    return h ? x(h) : u;
  }, Vs = (f, u, h) => {
    const y = f && u._vnode ? void 0 : f && f.component ? f.component.uid : Il();
    Po(() => {
      f == null ? u._vnode && _e(u._vnode, null, null, !0) : P(
        u._vnode || null,
        f,
        u,
        null,
        null,
        null,
        h
      ), u._vnode = f;
    }, y);
  }, xt = {
    p: P,
    um: _e,
    m: rt,
    r: js,
    mt: Vn,
    mc: ze,
    pc: $,
    pbc: nt,
    n: zt,
    o: e
  };
  return {
    render: Vs,
    hydrate: void 0,
    createApp: il(Vs)
  };
}
function qn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ot({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Sl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function wi(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (A(s) && A(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Ke(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && wi(o, l)), l.type === Dn && (l.patchFlag === -1 && (l = r[i] = Ke(l)), l.el = o.el), l.type === me && !l.el && (l.el = o.el);
    }
}
function wl(e) {
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
function xi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : xi(t);
}
function sr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function as(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? as(t.subTree) : null;
}
const Ti = (e) => e.__isSuspense;
function xl(e, t) {
  t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : Mo(e);
}
const ce = /* @__PURE__ */ Symbol.for("v-fgt"), Dn = /* @__PURE__ */ Symbol.for("v-txt"), me = /* @__PURE__ */ Symbol.for("v-cmt"), rn = /* @__PURE__ */ Symbol.for("v-stc"), ke = [];
let ae = null;
function ds(e = !1) {
  ke.push(ae = e ? null : []);
}
function Rs() {
  ke.pop(), ae = ke[ke.length - 1] || null;
}
let Lt = 1;
function rr(e, t = !1) {
  Lt += e, e < 0 && ae && t && (ae.hasOnce = !0);
}
function Ci(e) {
  return e.dynamicChildren = Lt > 0 ? ae || ct : null, Rs(), Lt > 0 && ae && ae.push(e), e;
}
function Nc(e, t, n, s, r, i) {
  return Ci(
    Ai(
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
function hs(e, t, n, s, r) {
  return Ci(
    we(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function jn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ei = ({ key: e }) => e ?? null, on = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? q(e) || /* @__PURE__ */ X(e) || M(e) ? { i: ne, r: e, k: t, f: !!n } : e : null);
function Ai(e, t = null, n = null, s = 0, r = null, i = e === ce ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ei(t),
    ref: t && on(t),
    scopeId: ei,
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
    ctx: ne
  };
  return l ? (gn(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= q(n) ? 8 : 16), Lt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ae && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ae.push(c), c;
}
const we = Tl;
function Tl(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Xo) && (e = me), jn(e)) {
    const l = mt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && gn(l, n), Lt > 0 && !i && ae && (l.shapeFlag & 6 ? ae[ae.indexOf(e)] = l : ae.push(l)), l.patchFlag = -2, l;
  }
  if (Fl(e) && (e = e.__vccOpts), t) {
    t = Cl(t);
    let { class: l, style: c } = t;
    l && !q(l) && (t.class = bs(l)), F(c) && (/* @__PURE__ */ In(c) && !A(c) && (c = ee({}, c)), t.style = ys(c));
  }
  const o = q(e) ? 1 : Ti(e) ? 128 : Pn(e) ? 64 : F(e) ? 4 : M(e) ? 2 : 0;
  return Ai(
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
function Cl(e) {
  return e ? /* @__PURE__ */ In(e) || mi(e) ? ee({}, e) : e : null;
}
function mt(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, d = t ? Al(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Ei(d),
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
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return c && s && dn(
    a,
    c.clone(a)
  ), a;
}
function El(e = " ", t = 0) {
  return we(Dn, null, e, t);
}
function Dc(e, t) {
  const n = we(rn, null, e);
  return n.staticCount = t, n;
}
function jc(e = "", t = !1) {
  return t ? (ds(), hs(me, null, e)) : we(me, null, e);
}
function Re(e) {
  return e == null || typeof e == "boolean" ? we(me) : A(e) ? we(
    ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : jn(e) ? Ke(e) : we(Dn, null, String(e));
}
function Ke(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : mt(e);
}
function gn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (A(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), gn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !mi(t) ? t._ctx = ne : r === 3 && ne && (ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (M(t)) {
    if (s & 65) {
      gn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ne }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [El(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Al(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = bs([t.class, s.class]));
      else if (r === "style")
        t.style = ys([t.style, s.style]);
      else if (wn(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(A(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !xn(r) && (t[r] = o);
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
const Ol = ui();
let Oi = 0;
function Il() {
  return Oi;
}
function Ml(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Ol, i = {
    uid: Oi++,
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
    scope: new Yi(
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
    emitsOptions: ai(s, r),
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = ll.bind(null, i), e.ce && e.ce(i), i;
}
let oe = null;
const Pl = () => oe || ne;
let mn, Ht;
{
  const e = An(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  mn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => oe = n
  ), Ht = t(
    "__VUE_SSR_SETTERS__",
    (n) => Kt = n
  );
}
const Wt = (e) => {
  const t = oe;
  return mn(e), e.scope.on(), () => {
    e.scope.off(), mn(t);
  };
}, ir = () => {
  oe && oe.scope.off(), mn(null);
};
function Ii(e) {
  return e.vnode.shapeFlag & 4;
}
let Kt = !1;
function Rl(e, t = !1, n = !1) {
  t && Ht(t);
  const { props: s, children: r } = e.vnode, i = Ii(e);
  hl(e, s, i, t), _l(e, r, n || t);
  const o = i ? Nl(e, t) : void 0;
  return t && Ht(!1), o;
}
function Nl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Qo);
  const { setup: s } = n;
  if (s) {
    je();
    const r = e.setupContext = s.length > 1 ? jl(e) : null, i = Wt(e), o = Bt(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = xr(o);
    if (Fe(), i(), (l || e.sp) && !pt(e) && ri(e), l) {
      if (o.then(ir, ir), t)
        return o.then((c) => {
          Ht(!0);
          try {
            or(e, c, t);
          } finally {
            Ht(!1);
          }
        }).catch((c) => {
          Mn(c, e, 0);
        });
      e.asyncDep = o;
    } else
      or(e, o);
  } else
    Mi(e);
}
function or(e, t, n) {
  M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : F(t) && (e.setupState = qr(t)), Mi(e);
}
function Mi(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || De);
  {
    const r = Wt(e);
    je();
    try {
      Zo(e);
    } finally {
      Fe(), r();
    }
  }
}
const Dl = {
  get(e, t) {
    return te(e, "get", ""), e[t];
  }
};
function jl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Dl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Fn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(qr(_o(e.exposed)), {
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
function Fl(e) {
  return M(e) && "__vccOpts" in e;
}
const Vl = (e, t) => /* @__PURE__ */ Co(e, t, Kt), Ll = "3.5.44";
let ps;
const lr = typeof window < "u" && window.trustedTypes;
if (lr)
  try {
    ps = /* @__PURE__ */ lr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Pi = ps ? (e) => ps.createHTML(e) : (e) => e, Hl = "http://www.w3.org/2000/svg", Kl = "http://www.w3.org/1998/Math/MathML", He = typeof document < "u" ? document : null, cr = He && /* @__PURE__ */ He.createElement("template"), Ul = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? He.createElementNS(Hl, e) : t === "mathml" ? He.createElementNS(Kl, e) : n ? He.createElement(e, { is: n }) : He.createElement(e);
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
      cr.innerHTML = Pi(
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
}, $l = /* @__PURE__ */ Symbol("_vtc");
function Bl(e, t, n) {
  const s = e[$l];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const _n = /* @__PURE__ */ Symbol("_vod"), Ri = /* @__PURE__ */ Symbol("_vsh"), Fc = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[_n] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : At(e, t);
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
  e.style.display = t ? e[_n] : "none", e[Ri] = !t;
}
const Wl = /* @__PURE__ */ Symbol(""), kl = /(?:^|;)\s*display\s*:/;
function Jl(e, t, n) {
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
      l != null ? Gl(
        e,
        o,
        !q(t) && t ? t[o] : void 0,
        l
      ) || It(s, o, l) : It(s, o, "");
    }
  } else if (r) {
    if (t !== n) {
      const o = s[Wl];
      o && (n += ";" + o), s.cssText = n, i = kl.test(n);
    }
  } else t && e.removeAttribute("style");
  _n in e && ((!r || t !== n) && (e[_n] = i ? s.display : ""), e[Ri] && (s.display = "none"));
}
const Zt = /\s*!important$/;
function It(e, t, n) {
  if (A(n))
    n.forEach((s) => It(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    Zt.test(n) ? e.setProperty(t, n.replace(Zt, ""), "important") : e.setProperty(t, n);
  else {
    const s = ql(e, t);
    Zt.test(n) ? e.setProperty(
      tt(s),
      n.replace(Zt, ""),
      "important"
    ) : e[s] = n;
  }
}
const fr = ["Webkit", "Moz", "ms"], Gn = {};
function ql(e, t) {
  const n = Gn[t];
  if (n)
    return n;
  let s = ve(t);
  if (s !== "filter" && s in e)
    return Gn[t] = s;
  s = Er(s);
  for (let r = 0; r < fr.length; r++) {
    const i = fr[r] + s;
    if (i in e)
      return Gn[t] = i;
  }
  return t;
}
function Gl(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && q(s) && n === s;
}
const ur = "http://www.w3.org/1999/xlink";
function ar(e, t, n, s, r, i = Ji(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ur, t.slice(6, t.length)) : e.setAttributeNS(ur, t, n) : n == null || i && !Or(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : pe(n) ? String(n) : n
  );
}
function dr(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Pi(n) : n);
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
function zl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const hr = /* @__PURE__ */ Symbol("_vei");
function Yl(e, t, n, s, r = null) {
  const i = e[hr] || (e[hr] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = Zl(t);
    if (s) {
      const d = i[t] = nc(
        s,
        r
      );
      Be(e, l, d, c);
    } else o && (zl(e, l, o, c), i[t] = void 0);
  }
}
const Xl = /(Once|Passive|Capture)$/, Ql = /^on:?(?:Once|Passive|Capture)$/;
function Zl(e) {
  let t, n;
  for (; (n = e.match(Xl)) && !Ql.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : tt(e.slice(2)), t];
}
let zn = 0;
const ec = /* @__PURE__ */ Promise.resolve(), tc = () => zn || (ec.then(() => zn = 0), zn = Date.now());
function nc(e, t) {
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
  return n.value = e, n.attached = tc(), n;
}
const pr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, sc = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? Bl(e, s, o) : t === "style" ? Jl(e, n, s) : wn(t) ? xn(t) || Yl(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : rc(e, t, s, o)) ? (dr(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ar(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (ic(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !q(s))) ? dr(e, ve(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), ar(e, t, s, o));
};
function rc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && pr(t) && M(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return pr(t) && q(n) ? !1 : t in e;
}
function ic(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = ve(t);
  return Array.isArray(n) ? n.some((r) => ve(r) === s) : Object.keys(n).some((r) => ve(r) === s);
}
const et = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return A(t) ? (n) => nn(t, n) : t;
};
function oc(e) {
  e.target.composing = !0;
}
function gr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const de = /* @__PURE__ */ Symbol("_assign"), en = /* @__PURE__ */ Symbol("_initialValue");
function Yn(e, t, n) {
  return t && (e = e.trim()), n && (e = En(e)), e;
}
const mr = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e.parentNode && (e.type === "text" ? e[en] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[en] = e.defaultValue.replace(/\r\n?/g, `
`))), e[de] = et(r);
    const i = s || r.props && r.props.type === "number";
    Be(e, t ? "change" : "input", (o) => {
      o.target.composing || e[de](Yn(e.value, n, i));
    }), (n || i) && Be(e, "change", () => {
      e.value = Yn(e.value, n, i);
    }), t || (Be(e, "compositionstart", oc), Be(e, "compositionend", gr), Be(e, "change", gr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const r = t ?? "", i = e[en];
    delete e[en], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[de](Yn(e.value, n, s)) : e.value = r;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[de] = et(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? En(e.value) : e.value, c = t ?? "";
    if (l === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c);
  }
}, lc = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[de] = et(n), Be(e, "change", () => {
      const s = e._modelValue, r = _t(e), i = e.checked, o = e[de];
      if (A(s)) {
        const l = vs(s, r), c = l !== -1;
        if (i && !c)
          o(s.concat(r));
        else if (!i && c) {
          const d = [...s];
          d.splice(l, 1), o(d);
        }
      } else if (Je(s)) {
        const l = new Set(s);
        i ? l.add(r) : l.delete(r), o(l);
      } else
        o(Ni(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: _r,
  beforeUpdate(e, t, n) {
    e[de] = et(n), _r(e, t, n);
  }
};
function _r(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let r;
  if (A(t))
    r = vs(t, s.props.value) > -1;
  else if (Je(t))
    r = t.has(s.props.value);
  else {
    if (t === n) return;
    r = xe(t, Ni(e, !0));
  }
  e.checked !== r && (e.checked = r);
}
const cc = {
  created(e, { value: t }, n) {
    e.checked = xe(t, n.props.value), e[de] = et(n), Be(e, "change", () => {
      e[de](_t(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e[de] = et(s), t !== n && (e.checked = xe(t, s.props.value));
  }
}, fc = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, Be(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => n ? En(_t(c)) : _t(c)
      ), i = e.multiple, o = i ? Je(e._modelValue) ? new Set(r) : r : r[0], l = e._pendingValue = [
        i,
        i ? A(o) ? r.slice() : r : o
      ];
      try {
        e[de](o);
      } finally {
        zr(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[de] = et(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    yr(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[de] = et(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !uc(t, n[1], n[0])) && yr(e, t);
  }
};
function uc(e, t, n) {
  if (!n || A(e)) return xe(e, t);
  if (Je(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function yr(e, t) {
  const n = e.multiple, s = A(t);
  if (!(n && !s && !Je(t))) {
    for (let r = 0, i = e.options.length; r < i; r++) {
      const o = e.options[r], l = _t(o);
      if (n)
        if (s) {
          const c = typeof l;
          c === "string" || c === "number" ? o.selected = t.some((d) => String(d) === String(l)) : o.selected = vs(t, l) > -1;
        } else
          o.selected = t.has(l);
      else if (xe(_t(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function _t(e) {
  return "_value" in e ? e._value : e.value;
}
function Ni(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Vc = {
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
function ac(e, t) {
  switch (e) {
    case "SELECT":
      return fc;
    case "TEXTAREA":
      return mr;
    default:
      switch (t) {
        case "checkbox":
          return lc;
        case "radio":
          return cc;
        default:
          return mr;
      }
  }
}
function tn(e, t, n, s, r) {
  const o = ac(
    e.tagName,
    n.props && n.props.type
  )[r];
  o && o(e, t, n, s);
}
const dc = ["ctrl", "shift", "alt", "meta"], hc = {
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
  exact: (e, t) => dc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Lc = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = hc[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  }));
}, pc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Hc = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const i = tt(r.key);
    if (t.some(
      (o) => o === i || pc[o] === i
    ))
      return e(r);
  }));
}, gc = /* @__PURE__ */ ee({ patchProp: sc }, Ul);
let br;
function mc() {
  return br || (br = bl(gc));
}
const _c = ((...e) => {
  const t = mc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = bc(s);
    if (!r) return;
    const i = t._component;
    !M(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, yc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function yc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function bc(e) {
  return q(e) ? document.querySelector(e) : e;
}
const Xn = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function vc(e, t, n, s) {
  const r = [];
  function i(l, c, d, a) {
    return Xn(c, d) ? c : Xn(c, l) ? d : Xn(d, l) ? c : (r.push(a), s === "remote" ? d : c);
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
const vr = () => ({ threads: [], deleted: {}, activeByDate: {}, memoryEnabled: !0 });
function Sc(e = vr(), t = vr()) {
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
function wc(e, t, n = Date.now()) {
  const s = new Map((e.threads || []).flatMap((o) => o.messages || []).map((o) => [o.id, o])), r = { ...e.deleted, ...t.deleted };
  new Set((t.threads || []).map((o) => o.id));
  const i = (o) => JSON.stringify({ ...o, updatedAt: void 0 });
  return { ...t, deleted: r, clearedAt: Math.max(Number(e.clearedAt) || 0, Number(t.clearedAt) || 0), threads: (t.threads || []).map((o) => ({ ...o, messages: o.messages.map((l) => ({ ...l, updatedAt: i(l) === i(s.get(l.id) || {}) && s.get(l.id)?.updatedAt || n })) })) };
}
let J = "guest", yn = 0;
const bn = "weiheng.ai-diet-chat.v1";
let Qn = !1, Ut = 0, vn = !1;
const ln = /* @__PURE__ */ at("guest"), yt = (e) => {
  try {
    return JSON.parse(e) || { threads: [] };
  } catch {
    return { threads: [] };
  }
};
async function We() {
  if (J === "guest" || Qn || vn) return;
  const e = J, t = fe(bn), n = globalThis.localStorage.getItem(t);
  Qn = !0, ln.value = "syncing";
  try {
    const s = await fetch("/api/chat", { method: n ? "PUT" : "GET", cache: "no-store", signal: AbortSignal.timeout(15e3), headers: { "Content-Type": "application/json" }, ...n ? { body: JSON.stringify({ ...yt(n), expectedUserId: e }) } : {} }), r = await s.json();
    if (!s.ok) throw Error(r.error);
    if (vn || J !== e || r.userId !== e) return;
    const i = globalThis.localStorage.getItem(t), o = Sc(r.state, yt(i)), l = JSON.stringify(o);
    globalThis.localStorage.setItem(t, l), ln.value = "synced", xc.value = (/* @__PURE__ */ new Date()).toISOString(), i !== l && window.dispatchEvent(new CustomEvent("weiheng-chat-synced")), i !== n && (clearTimeout(Ut), Ut = setTimeout(We, 1e3));
  } catch {
    ln.value = "error";
  } finally {
    Qn = !1;
  }
}
const ut = "weiheng.local.v2", Sr = /* @__PURE__ */ at(null), be = /* @__PURE__ */ at("guest"), Di = /* @__PURE__ */ at(""), xc = /* @__PURE__ */ at(""), Zn = /* @__PURE__ */ at([]);
let es = !1;
const gs = () => fe("__account_sync_base.v1"), ts = (e) => {
  try {
    return JSON.parse(e) || {};
  } catch {
    return {};
  }
}, Kc = () => J;
function fe(e, t = J) {
  return t === "guest" ? e : "weiheng.account." + encodeURIComponent(t) + "." + e;
}
function Uc(e, t = J) {
  return t === "guest" ? /^(weiheng|vitabalance)([.:\-]|$)/.test(e) && !e.startsWith("weiheng.account.") : e.startsWith("weiheng.account." + encodeURIComponent(t) + ".");
}
const Ns = () => fe("__account_sync_pending.v1");
async function bt(e = "GET", t, n) {
  const s = { method: e, cache: "no-store", signal: AbortSignal.timeout(15e3), headers: { "Content-Type": "application/json" } };
  e === "PUT" && (s.body = JSON.stringify({ localState: t, baseLocalState: n, expectedUserId: J === "guest" ? void 0 : J }));
  const r = await fetch("/api/data", s), i = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(i.error || "账号数据同步失败。");
  return i;
}
async function vt(e) {
  if (J === "guest" || es) return;
  const t = J, n = fe(ut), s = globalThis.localStorage.getItem(n);
  if (s !== null) {
    es = !0, be.value = "syncing";
    try {
      const r = await bt("GET"), i = r.data?.localState || null;
      if (J !== t || r.userId !== t) {
        be.value = "error";
        return;
      }
      const o = globalThis.localStorage.getItem(gs()), l = vc(ts(o), ts(s), ts(i), e);
      if (l.conflicts.length) {
        const d = fe("__sync_conflict_backup.v1");
        if ((!globalThis.localStorage.getItem(d) || !Zn.value.length) && globalThis.localStorage.setItem(d, JSON.stringify({ local: s, server: i, at: (/* @__PURE__ */ new Date()).toISOString() })), !e) {
          Zn.value = l.conflicts, be.value = "error";
          return;
        }
      }
      const c = JSON.stringify(l.state);
      if (await bt("PUT", c, i), J !== t) return;
      globalThis.localStorage.setItem(gs(), c), globalThis.localStorage.getItem(n) === s ? (globalThis.localStorage.setItem(n, c), globalThis.localStorage.removeItem(Ns()), window.dispatchEvent(new CustomEvent("weiheng-account-synced")), be.value = "synced", Zn.value = []) : (be.value = "pending", clearTimeout(yn), yn = setTimeout(() => vt(), 450)), Di.value = (/* @__PURE__ */ new Date()).toISOString();
    } catch {
      be.value = "error";
    } finally {
      es = !1;
    }
  }
}
async function $c(e) {
  await vt(e), await We();
}
function Bc() {
  return globalThis.localStorage.getItem(fe("__sync_conflict_backup.v1"));
}
function ji() {
  J !== "guest" && (globalThis.localStorage.setItem(Ns(), "1"), be.value = "pending", clearTimeout(yn), yn = setTimeout(() => vt(), 450));
}
const Sn = {
  getItem: (e) => globalThis.localStorage.getItem(fe(e)),
  setItem(e, t) {
    e === bn && (t = JSON.stringify(wc(yt(Sn.getItem(e)), yt(t)))), globalThis.localStorage.setItem(fe(e), t), e === bn && J !== "guest" && (ln.value = "pending", clearTimeout(Ut), Ut = setTimeout(We, 900)), e === ut && ji();
  },
  removeItem(e) {
    globalThis.localStorage.removeItem(fe(e)), e === ut && J !== "guest" && (be.value = "error", globalThis.localStorage.setItem(Ns(), "deleted"));
  }
};
async function Tc(e) {
  const t = fe(ut, e), n = globalThis.localStorage.getItem(fe("__account_sync_pending.v1", e)), s = globalThis.localStorage.getItem(t), r = await bt("GET"), i = typeof r.data?.localState == "string" ? r.data.localState : null;
  if (n === "deleted") {
    if (!(await fetch("/api/data", { method: "DELETE", cache: "no-store" })).ok) throw new Error("账号数据删除状态暂未同步。");
    globalThis.localStorage.removeItem(fe("__account_sync_pending.v1", e));
  } else if (n && s !== null) {
    await vt();
    return;
  } else if (i !== null && s !== null && i !== s) {
    await vt();
    return;
  } else i !== null ? globalThis.localStorage.setItem(t, i) : s !== null && await bt("PUT", s, null);
  globalThis.localStorage.setItem(gs(), i || s || "{}"), Di.value = (/* @__PURE__ */ new Date()).toISOString(), be.value = "synced";
}
async function Cc() {
  try {
    const s = await fetch("/api/auth/me", { cache: "no-store", signal: AbortSignal.timeout(8e3) });
    if (!s.ok) throw Error("identity");
    const r = await s.json();
    if (Sr.value = r.authenticated && typeof r.user?.id == "string" ? r.user : null, J = Sr.value?.id || "guest", be.value = J === "guest" ? "guest" : "syncing", J !== "guest") {
      try {
        await Tc(J);
      } catch {
        be.value = "error";
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
        i !== J ? window.location.reload() : i !== "guest" && await vt();
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
    if (J !== "guest") {
      const s = Sn.getItem(bn);
      s && fetch("/api/chat", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...yt(s), expectedUserId: J }), keepalive: !0 }).catch(() => {
      });
    }
  }), setInterval(() => {
    document.hidden || We();
  }, 8e3).unref?.(), window.addEventListener("weiheng-reset-begin", () => {
    vn = !0, clearTimeout(Ut);
  }), window.addEventListener("weiheng-reset-abort", () => {
    vn = !1;
  }), document.addEventListener("visibilitychange", t), window.addEventListener("storage", (s) => {
    s.key === fe(ut) && J !== "guest" && ji();
  });
}
async function Wc({ mode: e, email: t, password: n, acceptTerms: s = !1, verificationCode: r = "" }) {
  const i = globalThis.localStorage.getItem(ut), o = await fetch(`/api/auth/${e === "register" ? "register" : "login"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email: t, password: n, acceptTerms: s, verificationCode: r })
  }), l = await o.json().catch(() => ({}));
  if (!o.ok) throw new Error(l.error || "登录暂时失败，请重试。");
  const c = await bt("GET"), d = typeof c.data?.localState == "string" ? c.data.localState : null;
  let a = "账号已登录。";
  return i && d === null ? window.confirm("发现本浏览器已有游客档案和饮食记录。是否复制到这个账号？游客原数据会保留，不会删除。") ? (await bt("PUT", i), globalThis.localStorage.setItem(fe(ut, l.user.id), i), a += "游客数据已复制到账号。") : a += "游客数据仍留在原浏览器空间。" : i && d !== null && (a += "账号已有数据，游客数据仍保留在原浏览器空间，未覆盖账号数据。"), window.location.reload(), { message: a };
}
async function kc() {
  if (await We(), !(await fetch("/api/auth/logout", { method: "POST", cache: "no-store" })).ok) throw new Error("退出登录失败，请重试。");
  window.location.reload();
}
function Jc() {
  const e = "weiheng.ai-diet-chat.v1", t = yt(Sn.getItem(e)), n = { ...t.deleted };
  for (const s of t.threads || []) n[s.id] = Date.now();
  Sn.setItem(e, JSON.stringify({ threads: [], deleted: n, clearedAt: Date.now(), activeByDate: {}, memoryEnabled: t.memoryEnabled }));
}
async function Ec() {
  try {
    await Cc();
    const { default: e } = await import("./App-CU28IzOm.js");
    _c(e).mount("#app");
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
Ec();
export {
  Ic as A,
  mr as B,
  fc as C,
  Rc as D,
  Ro as E,
  ce as F,
  Mc as G,
  lc as H,
  ln as I,
  Jc as J,
  Hc as K,
  Dc as L,
  X as M,
  be as N,
  oi as O,
  Di as P,
  xc as Q,
  $c as R,
  Zn as S,
  Vc as T,
  Bc as U,
  kc as V,
  Wc as W,
  Fc as X,
  Sr as a,
  Sn as b,
  Vl as c,
  Es as d,
  Kc as e,
  ds as f,
  Nc as g,
  Pc as h,
  Bo as i,
  Jo as j,
  Ai as k,
  bs as l,
  we as m,
  zr as n,
  Uc as o,
  jc as p,
  El as q,
  at as r,
  fe as s,
  zi as t,
  Jr as u,
  Oc as v,
  Wn as w,
  ys as x,
  Lc as y,
  hs as z
};
