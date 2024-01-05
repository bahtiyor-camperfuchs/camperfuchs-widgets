function Wo(e, t) {
  const r = new Set(e.split(","));
  return t ? (n) => r.has(n.toLowerCase()) : (n) => r.has(n);
}
const et = {}, sn = [], Yt = () => {
}, ju = () => !1, Ta = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Qo = (e) => e.startsWith("onUpdate:"), ct = Object.assign, Go = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, Vu = Object.prototype.hasOwnProperty, $e = (e, t) => Vu.call(e, t), Te = Array.isArray, un = (e) => Ma(e) === "[object Map]", Gl = (e) => Ma(e) === "[object Set]", Ie = (e) => typeof e == "function", at = (e) => typeof e == "string", wn = (e) => typeof e == "symbol", Ze = (e) => e !== null && typeof e == "object", zl = (e) => (Ze(e) || Ie(e)) && Ie(e.then) && Ie(e.catch), ql = Object.prototype.toString, Ma = (e) => ql.call(e), Wu = (e) => Ma(e).slice(8, -1), Kl = (e) => Ma(e) === "[object Object]", zo = (e) => at(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ia = /* @__PURE__ */ Wo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Oa = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Qu = /-(\w)/g, Bt = Oa((e) => e.replace(Qu, (t, r) => r ? r.toUpperCase() : "")), Gu = /\B([A-Z])/g, Lt = Oa(
  (e) => e.replace(Gu, "-$1").toLowerCase()
), Pa = Oa((e) => e.charAt(0).toUpperCase() + e.slice(1)), Wa = Oa((e) => e ? `on${Pa(e)}` : ""), Ir = (e, t) => !Object.is(e, t), Qa = (e, t) => {
  for (let r = 0; r < e.length; r++)
    e[r](t);
}, fa = (e, t, r) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: r
  });
}, zu = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, yo = (e) => {
  const t = at(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Ni;
const Xl = () => Ni || (Ni = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Mt(e) {
  if (Te(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], a = at(n) ? Zu(n) : Mt(n);
      if (a)
        for (const o in a)
          t[o] = a[o];
    }
    return t;
  } else if (at(e) || Ze(e))
    return e;
}
const qu = /;(?![^(]*\))/g, Ku = /:([^]+)/, Xu = /\/\*[^]*?\*\//g;
function Zu(e) {
  const t = {};
  return e.replace(Xu, "").split(qu).forEach((r) => {
    if (r) {
      const n = r.split(Ku);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function He(e) {
  let t = "";
  if (at(e))
    t = e;
  else if (Te(e))
    for (let r = 0; r < e.length; r++) {
      const n = He(e[r]);
      n && (t += n + " ");
    }
  else if (Ze(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
function pt(e) {
  if (!e)
    return null;
  let { class: t, style: r } = e;
  return t && !at(t) && (e.class = He(t)), r && (e.style = Mt(r)), e;
}
const Ju = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ec = /* @__PURE__ */ Wo(Ju);
function Zl(e) {
  return !!e || e === "";
}
const ot = (e) => at(e) ? e : e == null ? "" : Te(e) || Ze(e) && (e.toString === ql || !Ie(e.toString)) ? JSON.stringify(e, Jl, 2) : String(e), Jl = (e, t) => t && t.__v_isRef ? Jl(e, t.value) : un(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [n, a], o) => (r[Ga(n, o) + " =>"] = a, r),
    {}
  )
} : Gl(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => Ga(r))
} : wn(t) ? Ga(t) : Ze(t) && !Te(t) && !Kl(t) ? String(t) : t, Ga = (e, t = "") => {
  var r;
  return wn(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
};
let Rt;
class tc {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Rt, !t && Rt && (this.index = (Rt.scopes || (Rt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const r = Rt;
      try {
        return Rt = this, t();
      } finally {
        Rt = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Rt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Rt = this.parent;
  }
  stop(t) {
    if (this._active) {
      let r, n;
      for (r = 0, n = this.effects.length; r < n; r++)
        this.effects[r].stop();
      for (r = 0, n = this.cleanups.length; r < n; r++)
        this.cleanups[r]();
      if (this.scopes)
        for (r = 0, n = this.scopes.length; r < n; r++)
          this.scopes[r].stop(!0);
      if (!this.detached && this.parent && !t) {
        const a = this.parent.scopes.pop();
        a && a !== this && (this.parent.scopes[this.index] = a, a.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function rc(e, t = Rt) {
  t && t.active && t.effects.push(e);
}
function es() {
  return Rt;
}
function nc(e) {
  Rt && Rt.cleanups.push(e);
}
let Gr;
class qo {
  constructor(t, r, n, a) {
    this.fn = t, this.trigger = r, this.scheduler = n, this.active = !0, this.deps = [], this._dirtyLevel = 3, this._trackId = 0, this._runnings = 0, this._queryings = 0, this._depsLength = 0, rc(this, a);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      this._dirtyLevel = 0, this._queryings++, Nr();
      for (const t of this.deps)
        if (t.computed && (ac(t.computed), this._dirtyLevel >= 2))
          break;
      Rr(), this._queryings--;
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 3 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Or, r = Gr;
    try {
      return Or = !0, Gr = this, this._runnings++, Ri(this), this.fn();
    } finally {
      Yi(this), this._runnings--, Gr = r, Or = t;
    }
  }
  stop() {
    var t;
    this.active && (Ri(this), Yi(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function ac(e) {
  return e.value;
}
function Ri(e) {
  e._trackId++, e._depsLength = 0;
}
function Yi(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      ts(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function ts(e, t) {
  const r = e.get(t);
  r !== void 0 && t._trackId !== r && (e.delete(t), e.size === 0 && e.cleanup());
}
let Or = !0, bo = 0;
const rs = [];
function Nr() {
  rs.push(Or), Or = !1;
}
function Rr() {
  const e = rs.pop();
  Or = e === void 0 ? !0 : e;
}
function Ko() {
  bo++;
}
function Xo() {
  for (bo--; !bo && wo.length; )
    wo.shift()();
}
function ns(e, t, r) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const n = e.deps[e._depsLength];
    n !== t ? (n && ts(n, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const wo = [];
function as(e, t, r) {
  Ko();
  for (const n of e.keys())
    if (!(!n.allowRecurse && n._runnings) && n._dirtyLevel < t && (!n._runnings || t !== 2)) {
      const a = n._dirtyLevel;
      n._dirtyLevel = t, a === 0 && (!n._queryings || t !== 2) && (n.trigger(), n.scheduler && wo.push(n.scheduler));
    }
  Xo();
}
const os = (e, t) => {
  const r = /* @__PURE__ */ new Map();
  return r.cleanup = e, r.computed = t, r;
}, pa = /* @__PURE__ */ new WeakMap(), zr = Symbol(""), _o = Symbol("");
function Et(e, t, r) {
  if (Or && Gr) {
    let n = pa.get(e);
    n || pa.set(e, n = /* @__PURE__ */ new Map());
    let a = n.get(r);
    a || n.set(r, a = os(() => n.delete(r))), ns(
      Gr,
      a
    );
  }
}
function hr(e, t, r, n, a, o) {
  const i = pa.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (r === "length" && Te(e)) {
    const s = Number(n);
    i.forEach((u, d) => {
      (d === "length" || !wn(d) && d >= s) && l.push(u);
    });
  } else
    switch (r !== void 0 && l.push(i.get(r)), t) {
      case "add":
        Te(e) ? zo(r) && l.push(i.get("length")) : (l.push(i.get(zr)), un(e) && l.push(i.get(_o)));
        break;
      case "delete":
        Te(e) || (l.push(i.get(zr)), un(e) && l.push(i.get(_o)));
        break;
      case "set":
        un(e) && l.push(i.get(zr));
        break;
    }
  Ko();
  for (const s of l)
    s && as(
      s,
      3
    );
  Xo();
}
function oc(e, t) {
  var r;
  return (r = pa.get(e)) == null ? void 0 : r.get(t);
}
const ic = /* @__PURE__ */ Wo("__proto__,__v_isRef,__isVue"), is = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(wn)
), Ui = /* @__PURE__ */ lc();
function lc() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...r) {
      const n = Ue(this);
      for (let o = 0, i = this.length; o < i; o++)
        Et(n, "get", o + "");
      const a = n[t](...r);
      return a === -1 || a === !1 ? n[t](...r.map(Ue)) : a;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...r) {
      Nr(), Ko();
      const n = Ue(this)[t].apply(this, r);
      return Xo(), Rr(), n;
    };
  }), e;
}
function sc(e) {
  const t = Ue(this);
  return Et(t, "has", e), t.hasOwnProperty(e);
}
class ls {
  constructor(t = !1, r = !1) {
    this._isReadonly = t, this._shallow = r;
  }
  get(t, r, n) {
    const a = this._isReadonly, o = this._shallow;
    if (r === "__v_isReactive")
      return !a;
    if (r === "__v_isReadonly")
      return a;
    if (r === "__v_isShallow")
      return o;
    if (r === "__v_raw")
      return n === (a ? o ? _c : ds : o ? cs : us).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const i = Te(t);
    if (!a) {
      if (i && $e(Ui, r))
        return Reflect.get(Ui, r, n);
      if (r === "hasOwnProperty")
        return sc;
    }
    const l = Reflect.get(t, r, n);
    return (wn(r) ? is.has(r) : ic(r)) || (a || Et(t, "get", r), o) ? l : vt(l) ? i && zo(r) ? l : l.value : Ze(l) ? a ? fs(l) : Yr(l) : l;
  }
}
class ss extends ls {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, n, a) {
    let o = t[r];
    if (!this._shallow) {
      const s = fn(o);
      if (!on(n) && !fn(n) && (o = Ue(o), n = Ue(n)), !Te(t) && vt(o) && !vt(n))
        return s ? !1 : (o.value = n, !0);
    }
    const i = Te(t) && zo(r) ? Number(r) < t.length : $e(t, r), l = Reflect.set(t, r, n, a);
    return t === Ue(a) && (i ? Ir(n, o) && hr(t, "set", r, n) : hr(t, "add", r, n)), l;
  }
  deleteProperty(t, r) {
    const n = $e(t, r);
    t[r];
    const a = Reflect.deleteProperty(t, r);
    return a && n && hr(t, "delete", r, void 0), a;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!wn(r) || !is.has(r)) && Et(t, "has", r), n;
  }
  ownKeys(t) {
    return Et(
      t,
      "iterate",
      Te(t) ? "length" : zr
    ), Reflect.ownKeys(t);
  }
}
class uc extends ls {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, r) {
    return !0;
  }
  deleteProperty(t, r) {
    return !0;
  }
}
const cc = /* @__PURE__ */ new ss(), dc = /* @__PURE__ */ new uc(), fc = /* @__PURE__ */ new ss(
  !0
), Zo = (e) => e, Sa = (e) => Reflect.getPrototypeOf(e);
function qn(e, t, r = !1, n = !1) {
  e = e.__v_raw;
  const a = Ue(e), o = Ue(t);
  r || (Ir(t, o) && Et(a, "get", t), Et(a, "get", o));
  const { has: i } = Sa(a), l = n ? Zo : r ? ti : Yn;
  if (i.call(a, t))
    return l(e.get(t));
  if (i.call(a, o))
    return l(e.get(o));
  e !== a && e.get(t);
}
function Kn(e, t = !1) {
  const r = this.__v_raw, n = Ue(r), a = Ue(e);
  return t || (Ir(e, a) && Et(n, "has", e), Et(n, "has", a)), e === a ? r.has(e) : r.has(e) || r.has(a);
}
function Xn(e, t = !1) {
  return e = e.__v_raw, !t && Et(Ue(e), "iterate", zr), Reflect.get(e, "size", e);
}
function Bi(e) {
  e = Ue(e);
  const t = Ue(this);
  return Sa(t).has.call(t, e) || (t.add(e), hr(t, "add", e, e)), this;
}
function Fi(e, t) {
  t = Ue(t);
  const r = Ue(this), { has: n, get: a } = Sa(r);
  let o = n.call(r, e);
  o || (e = Ue(e), o = n.call(r, e));
  const i = a.call(r, e);
  return r.set(e, t), o ? Ir(t, i) && hr(r, "set", e, t) : hr(r, "add", e, t), this;
}
function Hi(e) {
  const t = Ue(this), { has: r, get: n } = Sa(t);
  let a = r.call(t, e);
  a || (e = Ue(e), a = r.call(t, e)), n && n.call(t, e);
  const o = t.delete(e);
  return a && hr(t, "delete", e, void 0), o;
}
function Li() {
  const e = Ue(this), t = e.size !== 0, r = e.clear();
  return t && hr(e, "clear", void 0, void 0), r;
}
function Zn(e, t) {
  return function(n, a) {
    const o = this, i = o.__v_raw, l = Ue(i), s = t ? Zo : e ? ti : Yn;
    return !e && Et(l, "iterate", zr), i.forEach((u, d) => n.call(a, s(u), s(d), o));
  };
}
function Jn(e, t, r) {
  return function(...n) {
    const a = this.__v_raw, o = Ue(a), i = un(o), l = e === "entries" || e === Symbol.iterator && i, s = e === "keys" && i, u = a[e](...n), d = r ? Zo : t ? ti : Yn;
    return !t && Et(
      o,
      "iterate",
      s ? _o : zr
    ), {
      // iterator protocol
      next() {
        const { value: p, done: v } = u.next();
        return v ? { value: p, done: v } : {
          value: l ? [d(p[0]), d(p[1])] : d(p),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function br(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function pc() {
  const e = {
    get(o) {
      return qn(this, o);
    },
    get size() {
      return Xn(this);
    },
    has: Kn,
    add: Bi,
    set: Fi,
    delete: Hi,
    clear: Li,
    forEach: Zn(!1, !1)
  }, t = {
    get(o) {
      return qn(this, o, !1, !0);
    },
    get size() {
      return Xn(this);
    },
    has: Kn,
    add: Bi,
    set: Fi,
    delete: Hi,
    clear: Li,
    forEach: Zn(!1, !0)
  }, r = {
    get(o) {
      return qn(this, o, !0);
    },
    get size() {
      return Xn(this, !0);
    },
    has(o) {
      return Kn.call(this, o, !0);
    },
    add: br("add"),
    set: br("set"),
    delete: br("delete"),
    clear: br("clear"),
    forEach: Zn(!0, !1)
  }, n = {
    get(o) {
      return qn(this, o, !0, !0);
    },
    get size() {
      return Xn(this, !0);
    },
    has(o) {
      return Kn.call(this, o, !0);
    },
    add: br("add"),
    set: br("set"),
    delete: br("delete"),
    clear: br("clear"),
    forEach: Zn(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = Jn(
      o,
      !1,
      !1
    ), r[o] = Jn(
      o,
      !0,
      !1
    ), t[o] = Jn(
      o,
      !1,
      !0
    ), n[o] = Jn(
      o,
      !0,
      !0
    );
  }), [
    e,
    r,
    t,
    n
  ];
}
const [
  vc,
  mc,
  hc,
  gc
] = /* @__PURE__ */ pc();
function Jo(e, t) {
  const r = t ? e ? gc : hc : e ? mc : vc;
  return (n, a, o) => a === "__v_isReactive" ? !e : a === "__v_isReadonly" ? e : a === "__v_raw" ? n : Reflect.get(
    $e(r, a) && a in n ? r : n,
    a,
    o
  );
}
const yc = {
  get: /* @__PURE__ */ Jo(!1, !1)
}, bc = {
  get: /* @__PURE__ */ Jo(!1, !0)
}, wc = {
  get: /* @__PURE__ */ Jo(!0, !1)
}, us = /* @__PURE__ */ new WeakMap(), cs = /* @__PURE__ */ new WeakMap(), ds = /* @__PURE__ */ new WeakMap(), _c = /* @__PURE__ */ new WeakMap();
function xc(e) {
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
function kc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : xc(Wu(e));
}
function Yr(e) {
  return fn(e) ? e : ei(
    e,
    !1,
    cc,
    yc,
    us
  );
}
function Ac(e) {
  return ei(
    e,
    !1,
    fc,
    bc,
    cs
  );
}
function fs(e) {
  return ei(
    e,
    !0,
    dc,
    wc,
    ds
  );
}
function ei(e, t, r, n, a) {
  if (!Ze(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = a.get(e);
  if (o)
    return o;
  const i = kc(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? n : r
  );
  return a.set(e, l), l;
}
function cn(e) {
  return fn(e) ? cn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function fn(e) {
  return !!(e && e.__v_isReadonly);
}
function on(e) {
  return !!(e && e.__v_isShallow);
}
function ps(e) {
  return cn(e) || fn(e);
}
function Ue(e) {
  const t = e && e.__v_raw;
  return t ? Ue(t) : e;
}
function vs(e) {
  return fa(e, "__v_skip", !0), e;
}
const Yn = (e) => Ze(e) ? Yr(e) : e, ti = (e) => Ze(e) ? fs(e) : e;
class ms {
  constructor(t, r, n, a) {
    this._setter = r, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new qo(
      () => t(this._value),
      () => xo(this, 1)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !a, this.__v_isReadonly = n;
  }
  get value() {
    const t = Ue(this);
    return hs(t), (!t._cacheable || t.effect.dirty) && Ir(t._value, t._value = t.effect.run()) && xo(t, 2), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function Dc(e, t, r = !1) {
  let n, a;
  const o = Ie(e);
  return o ? (n = e, a = Yt) : (n = e.get, a = e.set), new ms(n, a, o || !a, r);
}
function hs(e) {
  Or && Gr && (e = Ue(e), ns(
    Gr,
    e.dep || (e.dep = os(
      () => e.dep = void 0,
      e instanceof ms ? e : void 0
    ))
  ));
}
function xo(e, t = 3, r) {
  e = Ue(e);
  const n = e.dep;
  n && as(
    n,
    t
  );
}
function vt(e) {
  return !!(e && e.__v_isRef === !0);
}
function oe(e) {
  return Cc(e, !1);
}
function Cc(e, t) {
  return vt(e) ? e : new Tc(e, t);
}
class Tc {
  constructor(t, r) {
    this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? t : Ue(t), this._value = r ? t : Yn(t);
  }
  get value() {
    return hs(this), this._value;
  }
  set value(t) {
    const r = this.__v_isShallow || on(t) || fn(t);
    t = r ? t : Ue(t), Ir(t, this._rawValue) && (this._rawValue = t, this._value = r ? t : Yn(t), xo(this, 3));
  }
}
function k(e) {
  return vt(e) ? e.value : e;
}
const Mc = {
  get: (e, t, r) => k(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const a = e[t];
    return vt(a) && !vt(r) ? (a.value = r, !0) : Reflect.set(e, t, r, n);
  }
};
function gs(e) {
  return cn(e) ? e : new Proxy(e, Mc);
}
class Oc {
  constructor(t, r, n) {
    this._object = t, this._key = r, this._defaultValue = n, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return oc(Ue(this._object), this._key);
  }
}
class Pc {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function va(e, t, r) {
  return vt(e) ? e : Ie(e) ? new Pc(e) : Ze(e) && arguments.length > 1 ? Sc(e, t, r) : oe(e);
}
function Sc(e, t, r) {
  const n = e[t];
  return vt(n) ? n : new Oc(e, t, r);
}
var On = { NVM_INC: "/Users/sultanov/.nvm/versions/node/v20.10.0/include/node", MANPATH: "/Users/sultanov/.nvm/versions/node/v20.10.0/share/man:/opt/homebrew/share/man:/usr/share/man:/usr/local/share/man:/Users/sultanov/.nvm/versions/node/v20.10.0/share/man:/opt/homebrew/share/man::", TERM_PROGRAM: "vscode", NODE: "/Users/sultanov/.nvm/versions/node/v20.10.0/bin/node", INIT_CWD: "/Users/sultanov/dev/Camperfuchs/booking-calendar", _P9K_TTY: "/dev/ttys005", ANDROID_HOME: "/Users/sultanov/Library/Android/sdk", NVM_CD_FLAGS: "-q", TERM: "xterm-256color", SHELL: "/bin/zsh", HOMEBREW_REPOSITORY: "/opt/homebrew", TMPDIR: "/var/folders/3f/05kq_wlx4cv1tb72m2f8vxy00000gn/T/", npm_config_global_prefix: "/Users/sultanov/.nvm/versions/node/v20.10.0", TERM_PROGRAM_VERSION: "1.85.1", ZDOTDIR: "/Users/sultanov", ORIGINAL_XDG_CURRENT_DESKTOP: "undefined", MallocNanoZone: "0", COLOR: "1", npm_config_noproxy: "", SDKMAN_PLATFORM: "darwinarm64", npm_config_local_prefix: "/Users/sultanov/dev/Camperfuchs/booking-calendar", ZSH: "/Users/sultanov/.oh-my-zsh", NVM_DIR: "/Users/sultanov/.nvm", USER: "sultanov", LS_COLORS: "di=1;36:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43", SPRINGBOOT_HOME: "/Users/sultanov/.sdkman/candidates/springboot/current", COMMAND_MODE: "unix2003", npm_config_globalconfig: "/Users/sultanov/.nvm/versions/node/v20.10.0/etc/npmrc", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.ASOQfQl7Lt/Listeners", __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x0", npm_execpath: "/Users/sultanov/.nvm/versions/node/v20.10.0/lib/node_modules/npm/bin/npm-cli.js", PAGER: "less", LSCOLORS: "Gxfxcxdxbxegedabagacad", PATH: "/Users/sultanov/dev/Camperfuchs/booking-calendar/node_modules/.bin:/Users/sultanov/dev/Camperfuchs/node_modules/.bin:/Users/sultanov/dev/node_modules/.bin:/Users/sultanov/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/sultanov/.nvm/versions/node/v20.10.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/opt/homebrew/opt/mysql@5.7/bin:/opt/homebrew/opt/php@7.2/sbin:/opt/homebrew/opt/php@7.2/bin:/Users/sultanov/.nvm/versions/node/v20.10.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/Users/sultanov/.sdkman/candidates/springboot/current/bin:/opt/homebrew/opt/mysql@5.7/bin:/opt/homebrew/opt/php@7.2/sbin:/opt/homebrew/opt/php@7.2/bin:/Users/sultanov/.nvm/versions/node/v20.10.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/Users/sultanov/.fzf/bin", npm_package_json: "/Users/sultanov/dev/Camperfuchs/booking-calendar/package.json", _: "/Users/sultanov/dev/Camperfuchs/booking-calendar/node_modules/.bin/vite", npm_config_userconfig: "/Users/sultanov/.npmrc", npm_config_init_module: "/Users/sultanov/.npm-init.js", USER_ZDOTDIR: "/Users/sultanov", __CFBundleIdentifier: "com.microsoft.VSCode", npm_command: "run-script", PWD: "/Users/sultanov/dev/Camperfuchs/booking-calendar", VSCODE_NONCE: "661ec715-6160-471e-9932-92b70b4d1f3f", JAVA_HOME: "/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home", npm_lifecycle_event: "build", EDITOR: "vi", P9K_SSH: "0", npm_package_name: "camperfuchs-booking-calendar", P9K_TTY: "old", LANG: "en_US.UTF-8", npm_config_npm_version: "10.2.3", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "--ms-enable-electron-run-as-node", XPC_FLAGS: "0x0", npm_config_node_gyp: "/Users/sultanov/.nvm/versions/node/v20.10.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", npm_package_version: "0.1.0", XPC_SERVICE_NAME: "0", VSCODE_INJECTION: "1", SHLVL: "2", HOME: "/Users/sultanov", VSCODE_GIT_ASKPASS_MAIN: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js", HOMEBREW_PREFIX: "/opt/homebrew", npm_config_cache: "/Users/sultanov/.npm", LESS: "-R", LOGNAME: "sultanov", npm_lifecycle_script: "vite build", SDKMAN_DIR: "/Users/sultanov/.sdkman", VSCODE_GIT_IPC_HANDLE: "/var/folders/3f/05kq_wlx4cv1tb72m2f8vxy00000gn/T/vscode-git-6db1ee2afb.sock", NVM_BIN: "/Users/sultanov/.nvm/versions/node/v20.10.0/bin", npm_config_user_agent: "npm/10.2.3 node/v20.10.0 darwin arm64 workspaces/false", VSCODE_GIT_ASKPASS_NODE: "/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)", GIT_ASKPASS: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh", SDKMAN_CANDIDATES_DIR: "/Users/sultanov/.sdkman/candidates", INFOPATH: "/opt/homebrew/share/info:/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", _P9K_SSH_TTY: "/dev/ttys005", npm_node_execpath: "/Users/sultanov/.nvm/versions/node/v20.10.0/bin/node", npm_config_prefix: "/Users/sultanov/.nvm/versions/node/v20.10.0", COLORTERM: "truecolor", NODE_ENV: "production" };
const Pn = [];
function Ic(e, ...t) {
  Nr();
  const r = Pn.length ? Pn[Pn.length - 1].component : null, n = r && r.appContext.config.warnHandler, a = Ec();
  if (n)
    gr(
      n,
      r,
      11,
      [
        e + t.join(""),
        r && r.proxy,
        a.map(
          ({ vnode: o }) => `at <${Zs(r, o.type)}>`
        ).join(`
`),
        a
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    a.length && o.push(`
`, ...Nc(a)), console.warn(...o);
  }
  Rr();
}
function Ec() {
  let e = Pn[Pn.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const r = t[0];
    r && r.vnode === e ? r.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const n = e.component && e.component.parent;
    e = n && n.vnode;
  }
  return t;
}
function Nc(e) {
  const t = [];
  return e.forEach((r, n) => {
    t.push(...n === 0 ? [] : [`
`], ...Rc(r));
  }), t;
}
function Rc({ vnode: e, recurseCount: t }) {
  const r = t > 0 ? `... (${t} recursive calls)` : "", n = e.component ? e.component.parent == null : !1, a = ` at <${Zs(
    e.component,
    e.type,
    n
  )}`, o = ">" + r;
  return e.props ? [a, ...Yc(e.props), o] : [a + o];
}
function Yc(e) {
  const t = [], r = Object.keys(e);
  return r.slice(0, 3).forEach((n) => {
    t.push(...ys(n, e[n]));
  }), r.length > 3 && t.push(" ..."), t;
}
function ys(e, t, r) {
  return at(t) ? (t = JSON.stringify(t), r ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? r ? t : [`${e}=${t}`] : vt(t) ? (t = ys(e, Ue(t.value), !0), r ? t : [`${e}=Ref<`, t, ">"]) : Ie(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = Ue(t), r ? t : [`${e}=`, t]);
}
function gr(e, t, r, n) {
  let a;
  try {
    a = n ? e(...n) : e();
  } catch (o) {
    Ia(o, t, r);
  }
  return a;
}
function $t(e, t, r, n) {
  if (Ie(e)) {
    const o = gr(e, t, r, n);
    return o && zl(o) && o.catch((i) => {
      Ia(i, t, r);
    }), o;
  }
  const a = [];
  for (let o = 0; o < e.length; o++)
    a.push($t(e[o], t, r, n));
  return a;
}
function Ia(e, t, r, n = !0) {
  const a = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, l = `https://vuejs.org/errors/#runtime-${r}`;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, i, l) === !1)
            return;
      }
      o = o.parent;
    }
    const s = t.appContext.config.errorHandler;
    if (s) {
      gr(
        s,
        null,
        10,
        [e, i, l]
      );
      return;
    }
  }
  Uc(e, r, a, n);
}
function Uc(e, t, r, n = !0) {
  console.error(e);
}
let Un = !1, ko = !1;
const kt = [];
let ar = 0;
const dn = [];
let dr = null, Wr = 0;
const bs = /* @__PURE__ */ Promise.resolve();
let ri = null;
function ur(e) {
  const t = ri || bs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Bc(e) {
  let t = ar + 1, r = kt.length;
  for (; t < r; ) {
    const n = t + r >>> 1, a = kt[n], o = Bn(a);
    o < e || o === e && a.pre ? t = n + 1 : r = n;
  }
  return t;
}
function ni(e) {
  (!kt.length || !kt.includes(
    e,
    Un && e.allowRecurse ? ar + 1 : ar
  )) && (e.id == null ? kt.push(e) : kt.splice(Bc(e.id), 0, e), ws());
}
function ws() {
  !Un && !ko && (ko = !0, ri = bs.then(xs));
}
function Fc(e) {
  const t = kt.indexOf(e);
  t > ar && kt.splice(t, 1);
}
function Hc(e) {
  Te(e) ? dn.push(...e) : (!dr || !dr.includes(
    e,
    e.allowRecurse ? Wr + 1 : Wr
  )) && dn.push(e), ws();
}
function $i(e, t, r = Un ? ar + 1 : 0) {
  for (; r < kt.length; r++) {
    const n = kt[r];
    if (n && n.pre) {
      if (e && n.id !== e.uid)
        continue;
      kt.splice(r, 1), r--, n();
    }
  }
}
function _s(e) {
  if (dn.length) {
    const t = [...new Set(dn)];
    if (dn.length = 0, dr) {
      dr.push(...t);
      return;
    }
    for (dr = t, dr.sort((r, n) => Bn(r) - Bn(n)), Wr = 0; Wr < dr.length; Wr++)
      dr[Wr]();
    dr = null, Wr = 0;
  }
}
const Bn = (e) => e.id == null ? 1 / 0 : e.id, Lc = (e, t) => {
  const r = Bn(e) - Bn(t);
  if (r === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return r;
};
function xs(e) {
  ko = !1, Un = !0, kt.sort(Lc);
  const t = Yt;
  try {
    for (ar = 0; ar < kt.length; ar++) {
      const r = kt[ar];
      r && r.active !== !1 && (On.NODE_ENV !== "production" && t(r), gr(r, null, 14));
    }
  } finally {
    ar = 0, kt.length = 0, _s(), Un = !1, ri = null, (kt.length || dn.length) && xs();
  }
}
function $c(e, t, ...r) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || et;
  let a = r;
  const o = t.startsWith("update:"), i = o && t.slice(7);
  if (i && i in n) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`, { number: p, trim: v } = n[d] || et;
    v && (a = r.map((b) => at(b) ? b.trim() : b)), p && (a = r.map(zu));
  }
  let l, s = n[l = Wa(t)] || // also try camelCase event handler (#2249)
  n[l = Wa(Bt(t))];
  !s && o && (s = n[l = Wa(Lt(t))]), s && $t(
    s,
    e,
    6,
    a
  );
  const u = n[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, $t(
      u,
      e,
      6,
      a
    );
  }
}
function ks(e, t, r = !1) {
  const n = t.emitsCache, a = n.get(e);
  if (a !== void 0)
    return a;
  const o = e.emits;
  let i = {}, l = !1;
  if (!Ie(e)) {
    const s = (u) => {
      const d = ks(u, t, !0);
      d && (l = !0, ct(i, d));
    };
    !r && t.mixins.length && t.mixins.forEach(s), e.extends && s(e.extends), e.mixins && e.mixins.forEach(s);
  }
  return !o && !l ? (Ze(e) && n.set(e, null), null) : (Te(o) ? o.forEach((s) => i[s] = null) : ct(i, o), Ze(e) && n.set(e, i), i);
}
function Ea(e, t) {
  return !e || !Ta(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), $e(e, t[0].toLowerCase() + t.slice(1)) || $e(e, Lt(t)) || $e(e, t));
}
let _t = null, As = null;
function ma(e) {
  const t = _t;
  return _t = e, As = e && e.type.__scopeId || null, t;
}
function Ne(e, t = _t, r) {
  if (!t || e._n)
    return e;
  const n = (...a) => {
    n._d && rl(-1);
    const o = ma(t);
    let i;
    try {
      i = e(...a);
    } finally {
      ma(o), n._d && rl(1);
    }
    return i;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function za(e) {
  const {
    type: t,
    vnode: r,
    proxy: n,
    withProxy: a,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: s,
    emit: u,
    render: d,
    renderCache: p,
    data: v,
    setupState: b,
    ctx: A,
    inheritAttrs: M
  } = e;
  let Q, S;
  const R = ma(e);
  try {
    if (r.shapeFlag & 4) {
      const C = a || n, N = On.NODE_ENV !== "production" && b.__isScriptSetup ? new Proxy(C, {
        get(W, H, z) {
          return Ic(
            `Property '${String(
              H
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(W, H, z);
        }
      }) : C;
      Q = nr(
        d.call(
          N,
          C,
          p,
          o,
          b,
          v,
          A
        )
      ), S = s;
    } else {
      const C = t;
      On.NODE_ENV, Q = nr(
        C.length > 1 ? C(
          o,
          On.NODE_ENV !== "production" ? {
            get attrs() {
              return s;
            },
            slots: l,
            emit: u
          } : { attrs: s, slots: l, emit: u }
        ) : C(
          o,
          null
          /* we know it doesn't need it */
        )
      ), S = t.props ? s : jc(s);
    }
  } catch (C) {
    Nn.length = 0, Ia(C, e, 1), Q = Ke(jt);
  }
  let F = Q;
  if (S && M !== !1) {
    const C = Object.keys(S), { shapeFlag: N } = F;
    C.length && N & 7 && (i && C.some(Qo) && (S = Vc(
      S,
      i
    )), F = Er(F, S));
  }
  return r.dirs && (F = Er(F), F.dirs = F.dirs ? F.dirs.concat(r.dirs) : r.dirs), r.transition && (F.transition = r.transition), Q = F, ma(R), Q;
}
const jc = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Ta(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, Vc = (e, t) => {
  const r = {};
  for (const n in e)
    (!Qo(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function Wc(e, t, r) {
  const { props: n, children: a, component: o } = e, { props: i, children: l, patchFlag: s } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && s >= 0) {
    if (s & 1024)
      return !0;
    if (s & 16)
      return n ? ji(n, i, u) : !!i;
    if (s & 8) {
      const d = t.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        const v = d[p];
        if (i[v] !== n[v] && !Ea(u, v))
          return !0;
      }
    }
  } else
    return (a || l) && (!l || !l.$stable) ? !0 : n === i ? !1 : n ? i ? ji(n, i, u) : !0 : !!i;
  return !1;
}
function ji(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let a = 0; a < n.length; a++) {
    const o = n[a];
    if (t[o] !== e[o] && !Ea(r, o))
      return !0;
  }
  return !1;
}
function Qc({ vnode: e, parent: t }, r) {
  if (r)
    for (; t; ) {
      const n = t.subTree;
      if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
        (e = t.vnode).el = r, t = t.parent;
      else
        break;
    }
}
const ai = "components";
function Gc(e, t) {
  return Cs(ai, e, !0, t) || e;
}
const Ds = Symbol.for("v-ndc");
function oi(e) {
  return at(e) ? Cs(ai, e, !1) || e : e || Ds;
}
function Cs(e, t, r = !0, n = !1) {
  const a = _t || dt;
  if (a) {
    const o = a.type;
    if (e === ai) {
      const l = Xs(
        o,
        !1
      );
      if (l && (l === t || l === Bt(t) || l === Pa(Bt(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Vi(a[e] || o[e], t) || // global registration
      Vi(a.appContext[e], t)
    );
    return !i && n ? o : i;
  }
}
function Vi(e, t) {
  return e && (e[t] || e[Bt(t)] || e[Pa(Bt(t))]);
}
const zc = (e) => e.__isSuspense;
function qc(e, t) {
  t && t.pendingBranch ? Te(e) ? t.effects.push(...e) : t.effects.push(e) : Hc(e);
}
const Kc = Symbol.for("v-scx"), Xc = () => sa(Kc), ea = {};
function zt(e, t, r) {
  return Ts(e, t, r);
}
function Ts(e, t, {
  immediate: r,
  deep: n,
  flush: a,
  once: o,
  onTrack: i,
  onTrigger: l
} = et) {
  var s;
  if (t && o) {
    const N = t;
    t = (...W) => {
      N(...W), C();
    };
  }
  const u = es() === ((s = dt) == null ? void 0 : s.scope) ? dt : null;
  let d, p = !1, v = !1;
  if (vt(e) ? (d = () => e.value, p = on(e)) : cn(e) ? (d = on(e) || n === !1 ? () => pr(e, 1) : () => pr(e), p = !0) : Te(e) ? (v = !0, p = e.some((N) => cn(N) || on(N)), d = () => e.map((N) => {
    if (vt(N))
      return N.value;
    if (cn(N))
      return pr(N, on(N) || n === !1 ? 1 : void 0);
    if (Ie(N))
      return gr(N, u, 2);
  })) : Ie(e) ? t ? d = () => gr(e, u, 2) : d = () => {
    if (!(u && u.isUnmounted))
      return b && b(), $t(
        e,
        u,
        3,
        [A]
      );
  } : d = Yt, t && n) {
    const N = d;
    d = () => pr(N());
  }
  let b, A = (N) => {
    b = F.onStop = () => {
      gr(N, u, 4), b = F.onStop = void 0;
    };
  }, M;
  if (Ba)
    if (A = Yt, t ? r && $t(t, u, 3, [
      d(),
      v ? [] : void 0,
      A
    ]) : d(), a === "sync") {
      const N = Xc();
      M = N.__watcherHandles || (N.__watcherHandles = []);
    } else
      return Yt;
  let Q = v ? new Array(e.length).fill(ea) : ea;
  const S = () => {
    if (!(!F.active || !F.dirty))
      if (t) {
        const N = F.run();
        (n || p || (v ? N.some((W, H) => Ir(W, Q[H])) : Ir(N, Q))) && (b && b(), $t(t, u, 3, [
          N,
          // pass undefined as the old value when it's changed for the first time
          Q === ea ? void 0 : v && Q[0] === ea ? [] : Q,
          A
        ]), Q = N);
      } else
        F.run();
  };
  S.allowRecurse = !!t;
  let R;
  a === "sync" ? R = S : a === "post" ? R = () => It(S, u && u.suspense) : (S.pre = !0, u && (S.id = u.uid), R = () => ni(S));
  const F = new qo(d, Yt, R), C = () => {
    F.stop(), u && u.scope && Go(u.scope.effects, F);
  };
  return t ? r ? S() : Q = F.run() : a === "post" ? It(
    F.run.bind(F),
    u && u.suspense
  ) : F.run(), M && M.push(C), C;
}
function Zc(e, t, r) {
  const n = this.proxy, a = at(e) ? e.includes(".") ? Ms(n, e) : () => n[e] : e.bind(n, n);
  let o;
  Ie(t) ? o = t : (o = t.handler, r = t);
  const i = dt;
  pn(this);
  const l = Ts(a, o.bind(n), r);
  return i ? pn(i) : qr(), l;
}
function Ms(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let a = 0; a < r.length && n; a++)
      n = n[r[a]];
    return n;
  };
}
function pr(e, t, r = 0, n) {
  if (!Ze(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (r >= t)
      return e;
    r++;
  }
  if (n = n || /* @__PURE__ */ new Set(), n.has(e))
    return e;
  if (n.add(e), vt(e))
    pr(e.value, t, r, n);
  else if (Te(e))
    for (let a = 0; a < e.length; a++)
      pr(e[a], t, r, n);
  else if (Gl(e) || un(e))
    e.forEach((a) => {
      pr(a, t, r, n);
    });
  else if (Kl(e))
    for (const a in e)
      pr(e[a], t, r, n);
  return e;
}
function la(e, t) {
  const r = _t;
  if (r === null)
    return e;
  const n = Fa(r) || r.proxy, a = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, s, u = et] = t[o];
    i && (Ie(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && pr(l), a.push({
      dir: i,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: s,
      modifiers: u
    }));
  }
  return e;
}
function Fr(e, t, r, n) {
  const a = e.dirs, o = t && t.dirs;
  for (let i = 0; i < a.length; i++) {
    const l = a[i];
    o && (l.oldValue = o[i].value);
    let s = l.dir[n];
    s && (Nr(), $t(s, r, 8, [
      e.el,
      l,
      e,
      t
    ]), Rr());
  }
}
const Dr = Symbol("_leaveCb"), ta = Symbol("_enterCb");
function Jc() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return yt(() => {
    e.isMounted = !0;
  }), Ns(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ht = [Function, Array], Os = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ht,
  onEnter: Ht,
  onAfterEnter: Ht,
  onEnterCancelled: Ht,
  // leave
  onBeforeLeave: Ht,
  onLeave: Ht,
  onAfterLeave: Ht,
  onLeaveCancelled: Ht,
  // appear
  onBeforeAppear: Ht,
  onAppear: Ht,
  onAfterAppear: Ht,
  onAppearCancelled: Ht
}, ed = {
  name: "BaseTransition",
  props: Os,
  setup(e, { slots: t }) {
    const r = Gs(), n = Jc();
    let a;
    return () => {
      const o = t.default && Ss(t.default(), !0);
      if (!o || !o.length)
        return;
      let i = o[0];
      if (o.length > 1) {
        for (const M of o)
          if (M.type !== jt) {
            i = M;
            break;
          }
      }
      const l = Ue(e), { mode: s } = l;
      if (n.isLeaving)
        return qa(i);
      const u = Wi(i);
      if (!u)
        return qa(i);
      const d = Ao(
        u,
        l,
        n,
        r
      );
      Do(u, d);
      const p = r.subTree, v = p && Wi(p);
      let b = !1;
      const { getTransitionKey: A } = u.type;
      if (A) {
        const M = A();
        a === void 0 ? a = M : M !== a && (a = M, b = !0);
      }
      if (v && v.type !== jt && (!Qr(u, v) || b)) {
        const M = Ao(
          v,
          l,
          n,
          r
        );
        if (Do(v, M), s === "out-in")
          return n.isLeaving = !0, M.afterLeave = () => {
            n.isLeaving = !1, r.update.active !== !1 && (r.effect.dirty = !0, r.update());
          }, qa(i);
        s === "in-out" && u.type !== jt && (M.delayLeave = (Q, S, R) => {
          const F = Ps(
            n,
            v
          );
          F[String(v.key)] = v, Q[Dr] = () => {
            S(), Q[Dr] = void 0, delete d.delayedLeave;
          }, d.delayedLeave = R;
        });
      }
      return i;
    };
  }
}, td = ed;
function Ps(e, t) {
  const { leavingVNodes: r } = e;
  let n = r.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), r.set(t.type, n)), n;
}
function Ao(e, t, r, n) {
  const {
    appear: a,
    mode: o,
    persisted: i = !1,
    onBeforeEnter: l,
    onEnter: s,
    onAfterEnter: u,
    onEnterCancelled: d,
    onBeforeLeave: p,
    onLeave: v,
    onAfterLeave: b,
    onLeaveCancelled: A,
    onBeforeAppear: M,
    onAppear: Q,
    onAfterAppear: S,
    onAppearCancelled: R
  } = t, F = String(e.key), C = Ps(r, e), N = (z, G) => {
    z && $t(
      z,
      n,
      9,
      G
    );
  }, W = (z, G) => {
    const g = G[1];
    N(z, G), Te(z) ? z.every((E) => E.length <= 1) && g() : z.length <= 1 && g();
  }, H = {
    mode: o,
    persisted: i,
    beforeEnter(z) {
      let G = l;
      if (!r.isMounted)
        if (a)
          G = M || l;
        else
          return;
      z[Dr] && z[Dr](
        !0
        /* cancelled */
      );
      const g = C[F];
      g && Qr(e, g) && g.el[Dr] && g.el[Dr](), N(G, [z]);
    },
    enter(z) {
      let G = s, g = u, E = d;
      if (!r.isMounted)
        if (a)
          G = Q || s, g = S || u, E = R || d;
        else
          return;
      let _ = !1;
      const j = z[ta] = (I) => {
        _ || (_ = !0, I ? N(E, [z]) : N(g, [z]), H.delayedLeave && H.delayedLeave(), z[ta] = void 0);
      };
      G ? W(G, [z, j]) : j();
    },
    leave(z, G) {
      const g = String(e.key);
      if (z[ta] && z[ta](
        !0
        /* cancelled */
      ), r.isUnmounting)
        return G();
      N(p, [z]);
      let E = !1;
      const _ = z[Dr] = (j) => {
        E || (E = !0, G(), j ? N(A, [z]) : N(b, [z]), z[Dr] = void 0, C[g] === e && delete C[g]);
      };
      C[g] = e, v ? W(v, [z, _]) : _();
    },
    clone(z) {
      return Ao(z, t, r, n);
    }
  };
  return H;
}
function qa(e) {
  if (Na(e))
    return e = Er(e), e.children = null, e;
}
function Wi(e) {
  return Na(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function Do(e, t) {
  e.shapeFlag & 6 && e.component ? Do(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ss(e, t = !1, r) {
  let n = [], a = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const l = r == null ? i.key : String(r) + String(i.key != null ? i.key : o);
    i.type === Oe ? (i.patchFlag & 128 && a++, n = n.concat(
      Ss(i.children, t, l)
    )) : (t || i.type !== jt) && n.push(l != null ? Er(i, { key: l }) : i);
  }
  if (a > 1)
    for (let o = 0; o < n.length; o++)
      n[o].patchFlag = -2;
  return n;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function gt(e, t) {
  return Ie(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ct({ name: e.name }, t, { setup: e })
  ) : e;
}
const Sn = (e) => !!e.type.__asyncLoader, Na = (e) => e.type.__isKeepAlive;
function rd(e, t) {
  Is(e, "a", t);
}
function nd(e, t) {
  Is(e, "da", t);
}
function Is(e, t, r = dt) {
  const n = e.__wdc || (e.__wdc = () => {
    let a = r;
    for (; a; ) {
      if (a.isDeactivated)
        return;
      a = a.parent;
    }
    return e();
  });
  if (Ra(t, n, r), r) {
    let a = r.parent;
    for (; a && a.parent; )
      Na(a.parent.vnode) && ad(n, t, r, a), a = a.parent;
  }
}
function ad(e, t, r, n) {
  const a = Ra(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Vn(() => {
    Go(n[t], a);
  }, r);
}
function Ra(e, t, r = dt, n = !1) {
  if (r) {
    const a = r[e] || (r[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (r.isUnmounted)
        return;
      Nr(), pn(r);
      const l = $t(t, r, e, i);
      return qr(), Rr(), l;
    });
    return n ? a.unshift(o) : a.push(o), o;
  }
}
const yr = (e) => (t, r = dt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Ba || e === "sp") && Ra(e, (...n) => t(...n), r)
), od = yr("bm"), yt = yr("m"), Es = yr("bu"), id = yr("u"), Ns = yr("bum"), Vn = yr("um"), ld = yr("sp"), sd = yr(
  "rtg"
), ud = yr(
  "rtc"
);
function cd(e, t = dt) {
  Ra("ec", e, t);
}
function rt(e, t, r, n) {
  let a;
  const o = r && r[n];
  if (Te(e) || at(e)) {
    a = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      a[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    a = new Array(e);
    for (let i = 0; i < e; i++)
      a[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (Ze(e))
    if (e[Symbol.iterator])
      a = Array.from(
        e,
        (i, l) => t(i, l, void 0, o && o[l])
      );
    else {
      const i = Object.keys(e);
      a = new Array(i.length);
      for (let l = 0, s = i.length; l < s; l++) {
        const u = i[l];
        a[l] = t(e[u], u, l, o && o[l]);
      }
    }
  else
    a = [];
  return r && (r[n] = a), a;
}
function Pt(e, t) {
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    if (Te(n))
      for (let a = 0; a < n.length; a++)
        e[n[a].name] = n[a].fn;
    else
      n && (e[n.name] = n.key ? (...a) => {
        const o = n.fn(...a);
        return o && (o.key = n.key), o;
      } : n.fn);
  }
  return e;
}
function _e(e, t, r = {}, n, a) {
  if (_t.isCE || _t.parent && Sn(_t.parent) && _t.parent.isCE)
    return t !== "default" && (r.name = t), Ke("slot", r, n && n());
  let o = e[t];
  o && o._c && (o._d = !1), $();
  const i = o && Rs(o(r)), l = Ye(
    Oe,
    {
      key: r.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (n ? n() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !a && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), o && o._c && (o._d = !0), l;
}
function Rs(e) {
  return e.some((t) => ya(t) ? !(t.type === jt || t.type === Oe && !Rs(t.children)) : !0) ? e : null;
}
const Co = (e) => e ? zs(e) ? Fa(e) || e.proxy : Co(e.parent) : null, In = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ct(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Co(e.parent),
    $root: (e) => Co(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ii(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, ni(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ur.bind(e.proxy)),
    $watch: (e) => Zc.bind(e)
  })
), Ka = (e, t) => e !== et && !e.__isScriptSetup && $e(e, t), dd = {
  get({ _: e }, t) {
    const { ctx: r, setupState: n, data: a, props: o, accessCache: i, type: l, appContext: s } = e;
    let u;
    if (t[0] !== "$") {
      const b = i[t];
      if (b !== void 0)
        switch (b) {
          case 1:
            return n[t];
          case 2:
            return a[t];
          case 4:
            return r[t];
          case 3:
            return o[t];
        }
      else {
        if (Ka(n, t))
          return i[t] = 1, n[t];
        if (a !== et && $e(a, t))
          return i[t] = 2, a[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && $e(u, t)
        )
          return i[t] = 3, o[t];
        if (r !== et && $e(r, t))
          return i[t] = 4, r[t];
        To && (i[t] = 0);
      }
    }
    const d = In[t];
    let p, v;
    if (d)
      return t === "$attrs" && Et(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (p = l.__cssModules) && (p = p[t])
    )
      return p;
    if (r !== et && $e(r, t))
      return i[t] = 4, r[t];
    if (
      // global properties
      v = s.config.globalProperties, $e(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, r) {
    const { data: n, setupState: a, ctx: o } = e;
    return Ka(a, t) ? (a[t] = r, !0) : n !== et && $e(n, t) ? (n[t] = r, !0) : $e(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: a, propsOptions: o }
  }, i) {
    let l;
    return !!r[i] || e !== et && $e(e, i) || Ka(t, i) || (l = o[0]) && $e(l, i) || $e(n, i) || $e(In, i) || $e(a.config.globalProperties, i);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : $e(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function en() {
  return fd().slots;
}
function fd() {
  const e = Gs();
  return e.setupContext || (e.setupContext = Ks(e));
}
function Qi(e) {
  return Te(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let To = !0;
function pd(e) {
  const t = ii(e), r = e.proxy, n = e.ctx;
  To = !1, t.beforeCreate && Gi(t.beforeCreate, e, "bc");
  const {
    // state
    data: a,
    computed: o,
    methods: i,
    watch: l,
    provide: s,
    inject: u,
    // lifecycle
    created: d,
    beforeMount: p,
    mounted: v,
    beforeUpdate: b,
    updated: A,
    activated: M,
    deactivated: Q,
    beforeDestroy: S,
    beforeUnmount: R,
    destroyed: F,
    unmounted: C,
    render: N,
    renderTracked: W,
    renderTriggered: H,
    errorCaptured: z,
    serverPrefetch: G,
    // public API
    expose: g,
    inheritAttrs: E,
    // assets
    components: _,
    directives: j,
    filters: I
  } = t;
  if (u && vd(u, n, null), i)
    for (const O in i) {
      const B = i[O];
      Ie(B) && (n[O] = B.bind(r));
    }
  if (a) {
    const O = a.call(r, r);
    Ze(O) && (e.data = Yr(O));
  }
  if (To = !0, o)
    for (const O in o) {
      const B = o[O], h = Ie(B) ? B.bind(r, r) : Ie(B.get) ? B.get.bind(r, r) : Yt, f = !Ie(B) && Ie(B.set) ? B.set.bind(r) : Yt, Y = te({
        get: h,
        set: f
      });
      Object.defineProperty(n, O, {
        enumerable: !0,
        configurable: !0,
        get: () => Y.value,
        set: (U) => Y.value = U
      });
    }
  if (l)
    for (const O in l)
      Ys(l[O], n, r, O);
  if (s) {
    const O = Ie(s) ? s.call(r) : s;
    Reflect.ownKeys(O).forEach((B) => {
      wd(B, O[B]);
    });
  }
  d && Gi(d, e, "c");
  function T(O, B) {
    Te(B) ? B.forEach((h) => O(h.bind(r))) : B && O(B.bind(r));
  }
  if (T(od, p), T(yt, v), T(Es, b), T(id, A), T(rd, M), T(nd, Q), T(cd, z), T(ud, W), T(sd, H), T(Ns, R), T(Vn, C), T(ld, G), Te(g))
    if (g.length) {
      const O = e.exposed || (e.exposed = {});
      g.forEach((B) => {
        Object.defineProperty(O, B, {
          get: () => r[B],
          set: (h) => r[B] = h
        });
      });
    } else
      e.exposed || (e.exposed = {});
  N && e.render === Yt && (e.render = N), E != null && (e.inheritAttrs = E), _ && (e.components = _), j && (e.directives = j);
}
function vd(e, t, r = Yt) {
  Te(e) && (e = Mo(e));
  for (const n in e) {
    const a = e[n];
    let o;
    Ze(a) ? "default" in a ? o = sa(
      a.from || n,
      a.default,
      !0
    ) : o = sa(a.from || n) : o = sa(a), vt(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[n] = o;
  }
}
function Gi(e, t, r) {
  $t(
    Te(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function Ys(e, t, r, n) {
  const a = n.includes(".") ? Ms(r, n) : () => r[n];
  if (at(e)) {
    const o = t[e];
    Ie(o) && zt(a, o);
  } else if (Ie(e))
    zt(a, e.bind(r));
  else if (Ze(e))
    if (Te(e))
      e.forEach((o) => Ys(o, t, r, n));
    else {
      const o = Ie(e.handler) ? e.handler.bind(r) : t[e.handler];
      Ie(o) && zt(a, o, e);
    }
}
function ii(e) {
  const t = e.type, { mixins: r, extends: n } = t, {
    mixins: a,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let s;
  return l ? s = l : !a.length && !r && !n ? s = t : (s = {}, a.length && a.forEach(
    (u) => ha(s, u, i, !0)
  ), ha(s, t, i)), Ze(t) && o.set(t, s), s;
}
function ha(e, t, r, n = !1) {
  const { mixins: a, extends: o } = t;
  o && ha(e, o, r, !0), a && a.forEach(
    (i) => ha(e, i, r, !0)
  );
  for (const i in t)
    if (!(n && i === "expose")) {
      const l = md[i] || r && r[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const md = {
  data: zi,
  props: qi,
  emits: qi,
  // objects
  methods: Mn,
  computed: Mn,
  // lifecycle
  beforeCreate: Ct,
  created: Ct,
  beforeMount: Ct,
  mounted: Ct,
  beforeUpdate: Ct,
  updated: Ct,
  beforeDestroy: Ct,
  beforeUnmount: Ct,
  destroyed: Ct,
  unmounted: Ct,
  activated: Ct,
  deactivated: Ct,
  errorCaptured: Ct,
  serverPrefetch: Ct,
  // assets
  components: Mn,
  directives: Mn,
  // watch
  watch: gd,
  // provide / inject
  provide: zi,
  inject: hd
};
function zi(e, t) {
  return t ? e ? function() {
    return ct(
      Ie(e) ? e.call(this, this) : e,
      Ie(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function hd(e, t) {
  return Mn(Mo(e), Mo(t));
}
function Mo(e) {
  if (Te(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function Ct(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Mn(e, t) {
  return e ? ct(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function qi(e, t) {
  return e ? Te(e) && Te(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ct(
    /* @__PURE__ */ Object.create(null),
    Qi(e),
    Qi(t ?? {})
  ) : t;
}
function gd(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const r = ct(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    r[n] = Ct(e[n], t[n]);
  return r;
}
function Us() {
  return {
    app: null,
    config: {
      isNativeTag: ju,
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
let yd = 0;
function bd(e, t) {
  return function(n, a = null) {
    Ie(n) || (n = ct({}, n)), a != null && !Ze(a) && (a = null);
    const o = Us(), i = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const s = o.app = {
      _uid: yd++,
      _component: n,
      _props: a,
      _container: null,
      _context: o,
      _instance: null,
      version: Wd,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...d) {
        return i.has(u) || (u && Ie(u.install) ? (i.add(u), u.install(s, ...d)) : Ie(u) && (i.add(u), u(s, ...d))), s;
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), s;
      },
      component(u, d) {
        return d ? (o.components[u] = d, s) : o.components[u];
      },
      directive(u, d) {
        return d ? (o.directives[u] = d, s) : o.directives[u];
      },
      mount(u, d, p) {
        if (!l) {
          const v = Ke(n, a);
          return v.appContext = o, p === !0 ? p = "svg" : p === !1 && (p = void 0), d && t ? t(v, u) : e(v, u, p), l = !0, s._container = u, u.__vue_app__ = s, Fa(v.component) || v.component.proxy;
        }
      },
      unmount() {
        l && (e(null, s._container), delete s._container.__vue_app__);
      },
      provide(u, d) {
        return o.provides[u] = d, s;
      },
      runWithContext(u) {
        ga = s;
        try {
          return u();
        } finally {
          ga = null;
        }
      }
    };
    return s;
  };
}
let ga = null;
function wd(e, t) {
  if (dt) {
    let r = dt.provides;
    const n = dt.parent && dt.parent.provides;
    n === r && (r = dt.provides = Object.create(n)), r[e] = t;
  }
}
function sa(e, t, r = !1) {
  const n = dt || _t;
  if (n || ga) {
    const a = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : ga._context.provides;
    if (a && e in a)
      return a[e];
    if (arguments.length > 1)
      return r && Ie(t) ? t.call(n && n.proxy) : t;
  }
}
function _d(e, t, r, n = !1) {
  const a = {}, o = {};
  fa(o, Ua, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Bs(e, t, a, o);
  for (const i in e.propsOptions[0])
    i in a || (a[i] = void 0);
  r ? e.props = n ? a : Ac(a) : e.type.props ? e.props = a : e.props = o, e.attrs = o;
}
function xd(e, t, r, n) {
  const {
    props: a,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = Ue(a), [s] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        let v = d[p];
        if (Ea(e.emitsOptions, v))
          continue;
        const b = t[v];
        if (s)
          if ($e(o, v))
            b !== o[v] && (o[v] = b, u = !0);
          else {
            const A = Bt(v);
            a[A] = Oo(
              s,
              l,
              A,
              b,
              e,
              !1
            );
          }
        else
          b !== o[v] && (o[v] = b, u = !0);
      }
    }
  } else {
    Bs(e, t, a, o) && (u = !0);
    let d;
    for (const p in l)
      (!t || // for camelCase
      !$e(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Lt(p)) === p || !$e(t, d))) && (s ? r && // for camelCase
      (r[p] !== void 0 || // for kebab-case
      r[d] !== void 0) && (a[p] = Oo(
        s,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete a[p]);
    if (o !== l)
      for (const p in o)
        (!t || !$e(t, p)) && (delete o[p], u = !0);
  }
  u && hr(e, "set", "$attrs");
}
function Bs(e, t, r, n) {
  const [a, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let s in t) {
      if (ia(s))
        continue;
      const u = t[s];
      let d;
      a && $e(a, d = Bt(s)) ? !o || !o.includes(d) ? r[d] = u : (l || (l = {}))[d] = u : Ea(e.emitsOptions, s) || (!(s in n) || u !== n[s]) && (n[s] = u, i = !0);
    }
  if (o) {
    const s = Ue(r), u = l || et;
    for (let d = 0; d < o.length; d++) {
      const p = o[d];
      r[p] = Oo(
        a,
        s,
        p,
        u[p],
        e,
        !$e(u, p)
      );
    }
  }
  return i;
}
function Oo(e, t, r, n, a, o) {
  const i = e[r];
  if (i != null) {
    const l = $e(i, "default");
    if (l && n === void 0) {
      const s = i.default;
      if (i.type !== Function && !i.skipFactory && Ie(s)) {
        const { propsDefaults: u } = a;
        r in u ? n = u[r] : (pn(a), n = u[r] = s.call(
          null,
          t
        ), qr());
      } else
        n = s;
    }
    i[
      0
      /* shouldCast */
    ] && (o && !l ? n = !1 : i[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Lt(r)) && (n = !0));
  }
  return n;
}
function Fs(e, t, r = !1) {
  const n = t.propsCache, a = n.get(e);
  if (a)
    return a;
  const o = e.props, i = {}, l = [];
  let s = !1;
  if (!Ie(e)) {
    const d = (p) => {
      s = !0;
      const [v, b] = Fs(p, t, !0);
      ct(i, v), b && l.push(...b);
    };
    !r && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!o && !s)
    return Ze(e) && n.set(e, sn), sn;
  if (Te(o))
    for (let d = 0; d < o.length; d++) {
      const p = Bt(o[d]);
      Ki(p) && (i[p] = et);
    }
  else if (o)
    for (const d in o) {
      const p = Bt(d);
      if (Ki(p)) {
        const v = o[d], b = i[p] = Te(v) || Ie(v) ? { type: v } : ct({}, v);
        if (b) {
          const A = Ji(Boolean, b.type), M = Ji(String, b.type);
          b[
            0
            /* shouldCast */
          ] = A > -1, b[
            1
            /* shouldCastTrue */
          ] = M < 0 || A < M, (A > -1 || $e(b, "default")) && l.push(p);
        }
      }
    }
  const u = [i, l];
  return Ze(e) && n.set(e, u), u;
}
function Ki(e) {
  return e[0] !== "$";
}
function Xi(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Zi(e, t) {
  return Xi(e) === Xi(t);
}
function Ji(e, t) {
  return Te(t) ? t.findIndex((r) => Zi(r, e)) : Ie(t) && Zi(t, e) ? 0 : -1;
}
const Hs = (e) => e[0] === "_" || e === "$stable", li = (e) => Te(e) ? e.map(nr) : [nr(e)], kd = (e, t, r) => {
  if (t._n)
    return t;
  const n = Ne((...a) => (On.NODE_ENV, li(t(...a))), r);
  return n._c = !1, n;
}, Ls = (e, t, r) => {
  const n = e._ctx;
  for (const a in e) {
    if (Hs(a))
      continue;
    const o = e[a];
    if (Ie(o))
      t[a] = kd(a, o, n);
    else if (o != null) {
      const i = li(o);
      t[a] = () => i;
    }
  }
}, $s = (e, t) => {
  const r = li(t);
  e.slots.default = () => r;
}, Ad = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (e.slots = Ue(t), fa(t, "_", r)) : Ls(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && $s(e, t);
  fa(e.slots, Ua, 1);
}, Dd = (e, t, r) => {
  const { vnode: n, slots: a } = e;
  let o = !0, i = et;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? r && l === 1 ? o = !1 : (ct(a, t), !r && l === 1 && delete a._) : (o = !t.$stable, Ls(t, a)), i = t;
  } else
    t && ($s(e, t), i = { default: 1 });
  if (o)
    for (const l in a)
      !Hs(l) && i[l] == null && delete a[l];
};
function Po(e, t, r, n, a = !1) {
  if (Te(e)) {
    e.forEach(
      (v, b) => Po(
        v,
        t && (Te(t) ? t[b] : t),
        r,
        n,
        a
      )
    );
    return;
  }
  if (Sn(n) && !a)
    return;
  const o = n.shapeFlag & 4 ? Fa(n.component) || n.component.proxy : n.el, i = a ? null : o, { i: l, r: s } = e, u = t && t.r, d = l.refs === et ? l.refs = {} : l.refs, p = l.setupState;
  if (u != null && u !== s && (at(u) ? (d[u] = null, $e(p, u) && (p[u] = null)) : vt(u) && (u.value = null)), Ie(s))
    gr(s, l, 12, [i, d]);
  else {
    const v = at(s), b = vt(s);
    if (v || b) {
      const A = () => {
        if (e.f) {
          const M = v ? $e(p, s) ? p[s] : d[s] : s.value;
          a ? Te(M) && Go(M, o) : Te(M) ? M.includes(o) || M.push(o) : v ? (d[s] = [o], $e(p, s) && (p[s] = d[s])) : (s.value = [o], e.k && (d[e.k] = s.value));
        } else
          v ? (d[s] = i, $e(p, s) && (p[s] = i)) : b && (s.value = i, e.k && (d[e.k] = i));
      };
      i ? (A.id = -1, It(A, r)) : A();
    }
  }
}
const It = qc;
function Cd(e) {
  return Td(e);
}
function Td(e, t) {
  const r = Xl();
  r.__VUE__ = !0;
  const {
    insert: n,
    remove: a,
    patchProp: o,
    createElement: i,
    createText: l,
    createComment: s,
    setText: u,
    setElementText: d,
    parentNode: p,
    nextSibling: v,
    setScopeId: b = Yt,
    insertStaticContent: A
  } = e, M = (c, m, P, D = null, V = null, J = null, se = void 0, ne = null, ie = !!m.dynamicChildren) => {
    if (c === m)
      return;
    c && !Qr(c, m) && (D = pe(c), U(c, V, J, !0), c = null), m.patchFlag === -2 && (ie = !1, m.dynamicChildren = null);
    const { type: ee, ref: ce, shapeFlag: ge } = m;
    switch (ee) {
      case Ya:
        Q(c, m, P, D);
        break;
      case jt:
        S(c, m, P, D);
        break;
      case Za:
        c == null && R(m, P, D, se);
        break;
      case Oe:
        _(
          c,
          m,
          P,
          D,
          V,
          J,
          se,
          ne,
          ie
        );
        break;
      default:
        ge & 1 ? N(
          c,
          m,
          P,
          D,
          V,
          J,
          se,
          ne,
          ie
        ) : ge & 6 ? j(
          c,
          m,
          P,
          D,
          V,
          J,
          se,
          ne,
          ie
        ) : (ge & 64 || ge & 128) && ee.process(
          c,
          m,
          P,
          D,
          V,
          J,
          se,
          ne,
          ie,
          K
        );
    }
    ce != null && V && Po(ce, c && c.ref, J, m || c, !m);
  }, Q = (c, m, P, D) => {
    if (c == null)
      n(
        m.el = l(m.children),
        P,
        D
      );
    else {
      const V = m.el = c.el;
      m.children !== c.children && u(V, m.children);
    }
  }, S = (c, m, P, D) => {
    c == null ? n(
      m.el = s(m.children || ""),
      P,
      D
    ) : m.el = c.el;
  }, R = (c, m, P, D) => {
    [c.el, c.anchor] = A(
      c.children,
      m,
      P,
      D,
      c.el,
      c.anchor
    );
  }, F = ({ el: c, anchor: m }, P, D) => {
    let V;
    for (; c && c !== m; )
      V = v(c), n(c, P, D), c = V;
    n(m, P, D);
  }, C = ({ el: c, anchor: m }) => {
    let P;
    for (; c && c !== m; )
      P = v(c), a(c), c = P;
    a(m);
  }, N = (c, m, P, D, V, J, se, ne, ie) => {
    m.type === "svg" ? se = "svg" : m.type === "math" && (se = "mathml"), c == null ? W(
      m,
      P,
      D,
      V,
      J,
      se,
      ne,
      ie
    ) : G(
      c,
      m,
      V,
      J,
      se,
      ne,
      ie
    );
  }, W = (c, m, P, D, V, J, se, ne) => {
    let ie, ee;
    const { props: ce, shapeFlag: ge, transition: xe, dirs: Me } = c;
    if (ie = c.el = i(
      c.type,
      J,
      ce && ce.is,
      ce
    ), ge & 8 ? d(ie, c.children) : ge & 16 && z(
      c.children,
      ie,
      null,
      D,
      V,
      Xa(c, J),
      se,
      ne
    ), Me && Fr(c, null, D, "created"), H(ie, c, c.scopeId, se, D), ce) {
      for (const We in ce)
        We !== "value" && !ia(We) && o(
          ie,
          We,
          null,
          ce[We],
          J,
          c.children,
          D,
          V,
          w
        );
      "value" in ce && o(ie, "value", null, ce.value, J), (ee = ce.onVnodeBeforeMount) && tr(ee, D, c);
    }
    Me && Fr(c, null, D, "beforeMount");
    const Ee = Md(V, xe);
    Ee && xe.beforeEnter(ie), n(ie, m, P), ((ee = ce && ce.onVnodeMounted) || Ee || Me) && It(() => {
      ee && tr(ee, D, c), Ee && xe.enter(ie), Me && Fr(c, null, D, "mounted");
    }, V);
  }, H = (c, m, P, D, V) => {
    if (P && b(c, P), D)
      for (let J = 0; J < D.length; J++)
        b(c, D[J]);
    if (V) {
      let J = V.subTree;
      if (m === J) {
        const se = V.vnode;
        H(
          c,
          se,
          se.scopeId,
          se.slotScopeIds,
          V.parent
        );
      }
    }
  }, z = (c, m, P, D, V, J, se, ne, ie = 0) => {
    for (let ee = ie; ee < c.length; ee++) {
      const ce = c[ee] = ne ? Cr(c[ee]) : nr(c[ee]);
      M(
        null,
        ce,
        m,
        P,
        D,
        V,
        J,
        se,
        ne
      );
    }
  }, G = (c, m, P, D, V, J, se) => {
    const ne = m.el = c.el;
    let { patchFlag: ie, dynamicChildren: ee, dirs: ce } = m;
    ie |= c.patchFlag & 16;
    const ge = c.props || et, xe = m.props || et;
    let Me;
    if (P && Hr(P, !1), (Me = xe.onVnodeBeforeUpdate) && tr(Me, P, m, c), ce && Fr(m, c, P, "beforeUpdate"), P && Hr(P, !0), ee ? g(
      c.dynamicChildren,
      ee,
      ne,
      P,
      D,
      Xa(m, V),
      J
    ) : se || B(
      c,
      m,
      ne,
      null,
      P,
      D,
      Xa(m, V),
      J,
      !1
    ), ie > 0) {
      if (ie & 16)
        E(
          ne,
          m,
          ge,
          xe,
          P,
          D,
          V
        );
      else if (ie & 2 && ge.class !== xe.class && o(ne, "class", null, xe.class, V), ie & 4 && o(ne, "style", ge.style, xe.style, V), ie & 8) {
        const Ee = m.dynamicProps;
        for (let We = 0; We < Ee.length; We++) {
          const x = Ee[We], q = ge[x], ye = xe[x];
          (ye !== q || x === "value") && o(
            ne,
            x,
            q,
            ye,
            V,
            c.children,
            P,
            D,
            w
          );
        }
      }
      ie & 1 && c.children !== m.children && d(ne, m.children);
    } else
      !se && ee == null && E(
        ne,
        m,
        ge,
        xe,
        P,
        D,
        V
      );
    ((Me = xe.onVnodeUpdated) || ce) && It(() => {
      Me && tr(Me, P, m, c), ce && Fr(m, c, P, "updated");
    }, D);
  }, g = (c, m, P, D, V, J, se) => {
    for (let ne = 0; ne < m.length; ne++) {
      const ie = c[ne], ee = m[ne], ce = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        ie.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (ie.type === Oe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Qr(ie, ee) || // - In the case of a component, it could contain anything.
        ie.shapeFlag & 70) ? p(ie.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          P
        )
      );
      M(
        ie,
        ee,
        ce,
        null,
        D,
        V,
        J,
        se,
        !0
      );
    }
  }, E = (c, m, P, D, V, J, se) => {
    if (P !== D) {
      if (P !== et)
        for (const ne in P)
          !ia(ne) && !(ne in D) && o(
            c,
            ne,
            P[ne],
            null,
            se,
            m.children,
            V,
            J,
            w
          );
      for (const ne in D) {
        if (ia(ne))
          continue;
        const ie = D[ne], ee = P[ne];
        ie !== ee && ne !== "value" && o(
          c,
          ne,
          ee,
          ie,
          se,
          m.children,
          V,
          J,
          w
        );
      }
      "value" in D && o(c, "value", P.value, D.value, se);
    }
  }, _ = (c, m, P, D, V, J, se, ne, ie) => {
    const ee = m.el = c ? c.el : l(""), ce = m.anchor = c ? c.anchor : l("");
    let { patchFlag: ge, dynamicChildren: xe, slotScopeIds: Me } = m;
    Me && (ne = ne ? ne.concat(Me) : Me), c == null ? (n(ee, P, D), n(ce, P, D), z(
      m.children,
      P,
      ce,
      V,
      J,
      se,
      ne,
      ie
    )) : ge > 0 && ge & 64 && xe && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (g(
      c.dynamicChildren,
      xe,
      P,
      V,
      J,
      se,
      ne
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || V && m === V.subTree) && si(
      c,
      m,
      !0
      /* shallow */
    )) : B(
      c,
      m,
      P,
      ce,
      V,
      J,
      se,
      ne,
      ie
    );
  }, j = (c, m, P, D, V, J, se, ne, ie) => {
    m.slotScopeIds = ne, c == null ? m.shapeFlag & 512 ? V.ctx.activate(
      m,
      P,
      D,
      se,
      ie
    ) : I(
      m,
      P,
      D,
      V,
      J,
      se,
      ie
    ) : y(c, m, ie);
  }, I = (c, m, P, D, V, J, se) => {
    const ne = c.component = Bd(
      c,
      D,
      V
    );
    if (Na(c) && (ne.ctx.renderer = K), Fd(ne), ne.asyncDep) {
      if (V && V.registerDep(ne, T), !c.el) {
        const ie = ne.subTree = Ke(jt);
        S(null, ie, m, P);
      }
    } else
      T(
        ne,
        c,
        m,
        P,
        V,
        J,
        se
      );
  }, y = (c, m, P) => {
    const D = m.component = c.component;
    if (Wc(c, m, P))
      if (D.asyncDep && !D.asyncResolved) {
        O(D, m, P);
        return;
      } else
        D.next = m, Fc(D.update), D.effect.dirty = !0, D.update();
    else
      m.el = c.el, D.vnode = m;
  }, T = (c, m, P, D, V, J, se) => {
    const ne = () => {
      if (c.isMounted) {
        let { next: ce, bu: ge, u: xe, parent: Me, vnode: Ee } = c;
        {
          const Pe = js(c);
          if (Pe) {
            ce && (ce.el = Ee.el, O(c, ce, se)), Pe.asyncDep.then(() => {
              c.isUnmounted || ne();
            });
            return;
          }
        }
        let We = ce, x;
        Hr(c, !1), ce ? (ce.el = Ee.el, O(c, ce, se)) : ce = Ee, ge && Qa(ge), (x = ce.props && ce.props.onVnodeBeforeUpdate) && tr(x, Me, ce, Ee), Hr(c, !0);
        const q = za(c), ye = c.subTree;
        c.subTree = q, M(
          ye,
          q,
          // parent may have changed if it's in a teleport
          p(ye.el),
          // anchor may have changed if it's in a fragment
          pe(ye),
          c,
          V,
          J
        ), ce.el = q.el, We === null && Qc(c, q.el), xe && It(xe, V), (x = ce.props && ce.props.onVnodeUpdated) && It(
          () => tr(x, Me, ce, Ee),
          V
        );
      } else {
        let ce;
        const { el: ge, props: xe } = m, { bm: Me, m: Ee, parent: We } = c, x = Sn(m);
        if (Hr(c, !1), Me && Qa(Me), !x && (ce = xe && xe.onVnodeBeforeMount) && tr(ce, We, m), Hr(c, !0), ge && ve) {
          const q = () => {
            c.subTree = za(c), ve(
              ge,
              c.subTree,
              c,
              V,
              null
            );
          };
          x ? m.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && q()
          ) : q();
        } else {
          const q = c.subTree = za(c);
          M(
            null,
            q,
            P,
            D,
            c,
            V,
            J
          ), m.el = q.el;
        }
        if (Ee && It(Ee, V), !x && (ce = xe && xe.onVnodeMounted)) {
          const q = m;
          It(
            () => tr(ce, We, q),
            V
          );
        }
        (m.shapeFlag & 256 || We && Sn(We.vnode) && We.vnode.shapeFlag & 256) && c.a && It(c.a, V), c.isMounted = !0, m = P = D = null;
      }
    }, ie = c.effect = new qo(
      ne,
      Yt,
      () => ni(ee),
      c.scope
      // track it in component's effect scope
    ), ee = c.update = () => {
      ie.dirty && ie.run();
    };
    ee.id = c.uid, Hr(c, !0), ee();
  }, O = (c, m, P) => {
    m.component = c;
    const D = c.vnode.props;
    c.vnode = m, c.next = null, xd(c, m.props, D, P), Dd(c, m.children, P), Nr(), $i(c), Rr();
  }, B = (c, m, P, D, V, J, se, ne, ie = !1) => {
    const ee = c && c.children, ce = c ? c.shapeFlag : 0, ge = m.children, { patchFlag: xe, shapeFlag: Me } = m;
    if (xe > 0) {
      if (xe & 128) {
        f(
          ee,
          ge,
          P,
          D,
          V,
          J,
          se,
          ne,
          ie
        );
        return;
      } else if (xe & 256) {
        h(
          ee,
          ge,
          P,
          D,
          V,
          J,
          se,
          ne,
          ie
        );
        return;
      }
    }
    Me & 8 ? (ce & 16 && w(ee, V, J), ge !== ee && d(P, ge)) : ce & 16 ? Me & 16 ? f(
      ee,
      ge,
      P,
      D,
      V,
      J,
      se,
      ne,
      ie
    ) : w(ee, V, J, !0) : (ce & 8 && d(P, ""), Me & 16 && z(
      ge,
      P,
      D,
      V,
      J,
      se,
      ne,
      ie
    ));
  }, h = (c, m, P, D, V, J, se, ne, ie) => {
    c = c || sn, m = m || sn;
    const ee = c.length, ce = m.length, ge = Math.min(ee, ce);
    let xe;
    for (xe = 0; xe < ge; xe++) {
      const Me = m[xe] = ie ? Cr(m[xe]) : nr(m[xe]);
      M(
        c[xe],
        Me,
        P,
        null,
        V,
        J,
        se,
        ne,
        ie
      );
    }
    ee > ce ? w(
      c,
      V,
      J,
      !0,
      !1,
      ge
    ) : z(
      m,
      P,
      D,
      V,
      J,
      se,
      ne,
      ie,
      ge
    );
  }, f = (c, m, P, D, V, J, se, ne, ie) => {
    let ee = 0;
    const ce = m.length;
    let ge = c.length - 1, xe = ce - 1;
    for (; ee <= ge && ee <= xe; ) {
      const Me = c[ee], Ee = m[ee] = ie ? Cr(m[ee]) : nr(m[ee]);
      if (Qr(Me, Ee))
        M(
          Me,
          Ee,
          P,
          null,
          V,
          J,
          se,
          ne,
          ie
        );
      else
        break;
      ee++;
    }
    for (; ee <= ge && ee <= xe; ) {
      const Me = c[ge], Ee = m[xe] = ie ? Cr(m[xe]) : nr(m[xe]);
      if (Qr(Me, Ee))
        M(
          Me,
          Ee,
          P,
          null,
          V,
          J,
          se,
          ne,
          ie
        );
      else
        break;
      ge--, xe--;
    }
    if (ee > ge) {
      if (ee <= xe) {
        const Me = xe + 1, Ee = Me < ce ? m[Me].el : D;
        for (; ee <= xe; )
          M(
            null,
            m[ee] = ie ? Cr(m[ee]) : nr(m[ee]),
            P,
            Ee,
            V,
            J,
            se,
            ne,
            ie
          ), ee++;
      }
    } else if (ee > xe)
      for (; ee <= ge; )
        U(c[ee], V, J, !0), ee++;
    else {
      const Me = ee, Ee = ee, We = /* @__PURE__ */ new Map();
      for (ee = Ee; ee <= xe; ee++) {
        const ke = m[ee] = ie ? Cr(m[ee]) : nr(m[ee]);
        ke.key != null && We.set(ke.key, ee);
      }
      let x, q = 0;
      const ye = xe - Ee + 1;
      let Pe = !1, Xe = 0;
      const xt = new Array(ye);
      for (ee = 0; ee < ye; ee++)
        xt[ee] = 0;
      for (ee = Me; ee <= ge; ee++) {
        const ke = c[ee];
        if (q >= ye) {
          U(ke, V, J, !0);
          continue;
        }
        let Ae;
        if (ke.key != null)
          Ae = We.get(ke.key);
        else
          for (x = Ee; x <= xe; x++)
            if (xt[x - Ee] === 0 && Qr(ke, m[x])) {
              Ae = x;
              break;
            }
        Ae === void 0 ? U(ke, V, J, !0) : (xt[Ae - Ee] = ee + 1, Ae >= Xe ? Xe = Ae : Pe = !0, M(
          ke,
          m[Ae],
          P,
          null,
          V,
          J,
          se,
          ne,
          ie
        ), q++);
      }
      const ue = Pe ? Od(xt) : sn;
      for (x = ue.length - 1, ee = ye - 1; ee >= 0; ee--) {
        const ke = Ee + ee, Ae = m[ke], Ft = ke + 1 < ce ? m[ke + 1].el : D;
        xt[ee] === 0 ? M(
          null,
          Ae,
          P,
          Ft,
          V,
          J,
          se,
          ne,
          ie
        ) : Pe && (x < 0 || ee !== ue[x] ? Y(Ae, P, Ft, 2) : x--);
      }
    }
  }, Y = (c, m, P, D, V = null) => {
    const { el: J, type: se, transition: ne, children: ie, shapeFlag: ee } = c;
    if (ee & 6) {
      Y(c.component.subTree, m, P, D);
      return;
    }
    if (ee & 128) {
      c.suspense.move(m, P, D);
      return;
    }
    if (ee & 64) {
      se.move(c, m, P, K);
      return;
    }
    if (se === Oe) {
      n(J, m, P);
      for (let ge = 0; ge < ie.length; ge++)
        Y(ie[ge], m, P, D);
      n(c.anchor, m, P);
      return;
    }
    if (se === Za) {
      F(c, m, P);
      return;
    }
    if (D !== 2 && ee & 1 && ne)
      if (D === 0)
        ne.beforeEnter(J), n(J, m, P), It(() => ne.enter(J), V);
      else {
        const { leave: ge, delayLeave: xe, afterLeave: Me } = ne, Ee = () => n(J, m, P), We = () => {
          ge(J, () => {
            Ee(), Me && Me();
          });
        };
        xe ? xe(J, Ee, We) : We();
      }
    else
      n(J, m, P);
  }, U = (c, m, P, D = !1, V = !1) => {
    const {
      type: J,
      props: se,
      ref: ne,
      children: ie,
      dynamicChildren: ee,
      shapeFlag: ce,
      patchFlag: ge,
      dirs: xe
    } = c;
    if (ne != null && Po(ne, null, P, c, !0), ce & 256) {
      m.ctx.deactivate(c);
      return;
    }
    const Me = ce & 1 && xe, Ee = !Sn(c);
    let We;
    if (Ee && (We = se && se.onVnodeBeforeUnmount) && tr(We, m, c), ce & 6)
      L(c.component, P, D);
    else {
      if (ce & 128) {
        c.suspense.unmount(P, D);
        return;
      }
      Me && Fr(c, null, m, "beforeUnmount"), ce & 64 ? c.type.remove(
        c,
        m,
        P,
        V,
        K,
        D
      ) : ee && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (J !== Oe || ge > 0 && ge & 64) ? w(
        ee,
        m,
        P,
        !1,
        !0
      ) : (J === Oe && ge & 384 || !V && ce & 16) && w(ie, m, P), D && ae(c);
    }
    (Ee && (We = se && se.onVnodeUnmounted) || Me) && It(() => {
      We && tr(We, m, c), Me && Fr(c, null, m, "unmounted");
    }, P);
  }, ae = (c) => {
    const { type: m, el: P, anchor: D, transition: V } = c;
    if (m === Oe) {
      le(P, D);
      return;
    }
    if (m === Za) {
      C(c);
      return;
    }
    const J = () => {
      a(P), V && !V.persisted && V.afterLeave && V.afterLeave();
    };
    if (c.shapeFlag & 1 && V && !V.persisted) {
      const { leave: se, delayLeave: ne } = V, ie = () => se(P, J);
      ne ? ne(c.el, J, ie) : ie();
    } else
      J();
  }, le = (c, m) => {
    let P;
    for (; c !== m; )
      P = v(c), a(c), c = P;
    a(m);
  }, L = (c, m, P) => {
    const { bum: D, scope: V, update: J, subTree: se, um: ne } = c;
    D && Qa(D), V.stop(), J && (J.active = !1, U(se, c, m, P)), ne && It(ne, m), It(() => {
      c.isUnmounted = !0;
    }, m), m && m.pendingBranch && !m.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === m.pendingId && (m.deps--, m.deps === 0 && m.resolve());
  }, w = (c, m, P, D = !1, V = !1, J = 0) => {
    for (let se = J; se < c.length; se++)
      U(c[se], m, P, D, V);
  }, pe = (c) => c.shapeFlag & 6 ? pe(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : v(c.anchor || c.el), he = (c, m, P) => {
    c == null ? m._vnode && U(m._vnode, null, null, !0) : M(
      m._vnode || null,
      c,
      m,
      null,
      null,
      null,
      P
    ), $i(), _s(), m._vnode = c;
  }, K = {
    p: M,
    um: U,
    m: Y,
    r: ae,
    mt: I,
    mc: z,
    pc: B,
    pbc: g,
    n: pe,
    o: e
  };
  let De, ve;
  return t && ([De, ve] = t(
    K
  )), {
    render: he,
    hydrate: De,
    createApp: bd(he, De)
  };
}
function Xa({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function Hr({ effect: e, update: t }, r) {
  e.allowRecurse = t.allowRecurse = r;
}
function Md(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function si(e, t, r = !1) {
  const n = e.children, a = t.children;
  if (Te(n) && Te(a))
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      let l = a[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = a[o] = Cr(a[o]), l.el = i.el), r || si(i, l)), l.type === Ya && (l.el = i.el);
    }
}
function Od(e) {
  const t = e.slice(), r = [0];
  let n, a, o, i, l;
  const s = e.length;
  for (n = 0; n < s; n++) {
    const u = e[n];
    if (u !== 0) {
      if (a = r[r.length - 1], e[a] < u) {
        t[n] = a, r.push(n);
        continue;
      }
      for (o = 0, i = r.length - 1; o < i; )
        l = o + i >> 1, e[r[l]] < u ? o = l + 1 : i = l;
      u < e[r[o]] && (o > 0 && (t[n] = r[o - 1]), r[o] = n);
    }
  }
  for (o = r.length, i = r[o - 1]; o-- > 0; )
    r[o] = i, i = t[i];
  return r;
}
function js(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : js(t);
}
const Pd = (e) => e.__isTeleport, En = (e) => e && (e.disabled || e.disabled === ""), el = (e) => typeof SVGElement < "u" && e instanceof SVGElement, tl = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, So = (e, t) => {
  const r = e && e.to;
  return at(r) ? t ? t(r) : null : r;
}, Sd = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, r, n, a, o, i, l, s, u) {
    const {
      mc: d,
      pc: p,
      pbc: v,
      o: { insert: b, querySelector: A, createText: M, createComment: Q }
    } = u, S = En(t.props);
    let { shapeFlag: R, children: F, dynamicChildren: C } = t;
    if (e == null) {
      const N = t.el = M(""), W = t.anchor = M("");
      b(N, r, n), b(W, r, n);
      const H = t.target = So(t.props, A), z = t.targetAnchor = M("");
      H && (b(z, H), i === "svg" || el(H) ? i = "svg" : (i === "mathml" || tl(H)) && (i = "mathml"));
      const G = (g, E) => {
        R & 16 && d(
          F,
          g,
          E,
          a,
          o,
          i,
          l,
          s
        );
      };
      S ? G(r, W) : H && G(H, z);
    } else {
      t.el = e.el;
      const N = t.anchor = e.anchor, W = t.target = e.target, H = t.targetAnchor = e.targetAnchor, z = En(e.props), G = z ? r : W, g = z ? N : H;
      if (i === "svg" || el(W) ? i = "svg" : (i === "mathml" || tl(W)) && (i = "mathml"), C ? (v(
        e.dynamicChildren,
        C,
        G,
        a,
        o,
        i,
        l
      ), si(e, t, !0)) : s || p(
        e,
        t,
        G,
        g,
        a,
        o,
        i,
        l,
        !1
      ), S)
        z ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : ra(
          t,
          r,
          N,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const E = t.target = So(
          t.props,
          A
        );
        E && ra(
          t,
          E,
          null,
          u,
          0
        );
      } else
        z && ra(
          t,
          W,
          H,
          u,
          1
        );
    }
    Vs(t);
  },
  remove(e, t, r, n, { um: a, o: { remove: o } }, i) {
    const { shapeFlag: l, children: s, anchor: u, targetAnchor: d, target: p, props: v } = e;
    if (p && o(d), i && o(u), l & 16) {
      const b = i || !En(v);
      for (let A = 0; A < s.length; A++) {
        const M = s[A];
        a(
          M,
          t,
          r,
          b,
          !!M.dynamicChildren
        );
      }
    }
  },
  move: ra,
  hydrate: Id
};
function ra(e, t, r, { o: { insert: n }, m: a }, o = 2) {
  o === 0 && n(e.targetAnchor, t, r);
  const { el: i, anchor: l, shapeFlag: s, children: u, props: d } = e, p = o === 2;
  if (p && n(i, t, r), (!p || En(d)) && s & 16)
    for (let v = 0; v < u.length; v++)
      a(
        u[v],
        t,
        r,
        2
      );
  p && n(l, t, r);
}
function Id(e, t, r, n, a, o, {
  o: { nextSibling: i, parentNode: l, querySelector: s }
}, u) {
  const d = t.target = So(
    t.props,
    s
  );
  if (d) {
    const p = d._lpa || d.firstChild;
    if (t.shapeFlag & 16)
      if (En(t.props))
        t.anchor = u(
          i(e),
          t,
          l(e),
          r,
          n,
          a,
          o
        ), t.targetAnchor = p;
      else {
        t.anchor = i(e);
        let v = p;
        for (; v; )
          if (v = i(v), v && v.nodeType === 8 && v.data === "teleport anchor") {
            t.targetAnchor = v, d._lpa = t.targetAnchor && i(t.targetAnchor);
            break;
          }
        u(
          p,
          t,
          d,
          r,
          n,
          a,
          o
        );
      }
    Vs(t);
  }
  return t.anchor && i(t.anchor);
}
const Ed = Sd;
function Vs(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let r = e.children[0].el;
    for (; r && r !== e.targetAnchor; )
      r.nodeType === 1 && r.setAttribute("data-v-owner", t.uid), r = r.nextSibling;
    t.ut();
  }
}
const Oe = Symbol.for("v-fgt"), Ya = Symbol.for("v-txt"), jt = Symbol.for("v-cmt"), Za = Symbol.for("v-stc"), Nn = [];
let Gt = null;
function $(e = !1) {
  Nn.push(Gt = e ? null : []);
}
function Nd() {
  Nn.pop(), Gt = Nn[Nn.length - 1] || null;
}
let Fn = 1;
function rl(e) {
  Fn += e;
}
function Ws(e) {
  return e.dynamicChildren = Fn > 0 ? Gt || sn : null, Nd(), Fn > 0 && Gt && Gt.push(e), e;
}
function Z(e, t, r, n, a, o) {
  return Ws(
    be(
      e,
      t,
      r,
      n,
      a,
      o,
      !0
    )
  );
}
function Ye(e, t, r, n, a) {
  return Ws(
    Ke(
      e,
      t,
      r,
      n,
      a,
      !0
    )
  );
}
function ya(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Qr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ua = "__vInternal", Qs = ({ key: e }) => e ?? null, ua = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? at(e) || vt(e) || Ie(e) ? { i: _t, r: e, k: t, f: !!r } : e : null);
function be(e, t = null, r = null, n = 0, a = null, o = e === Oe ? 0 : 1, i = !1, l = !1) {
  const s = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Qs(t),
    ref: t && ua(t),
    scopeId: As,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: a,
    dynamicChildren: null,
    appContext: null,
    ctx: _t
  };
  return l ? (ui(s, r), o & 128 && e.normalize(s)) : r && (s.shapeFlag |= at(r) ? 8 : 16), Fn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Gt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (s.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  s.patchFlag !== 32 && Gt.push(s), s;
}
const Ke = Rd;
function Rd(e, t = null, r = null, n = 0, a = null, o = !1) {
  if ((!e || e === Ds) && (e = jt), ya(e)) {
    const l = Er(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && ui(l, r), Fn > 0 && !o && Gt && (l.shapeFlag & 6 ? Gt[Gt.indexOf(e)] = l : Gt.push(l)), l.patchFlag |= -2, l;
  }
  if (Vd(e) && (e = e.__vccOpts), t) {
    t = Ot(t);
    let { class: l, style: s } = t;
    l && !at(l) && (t.class = He(l)), Ze(s) && (ps(s) && !Te(s) && (s = ct({}, s)), t.style = Mt(s));
  }
  const i = at(e) ? 1 : zc(e) ? 128 : Pd(e) ? 64 : Ze(e) ? 4 : Ie(e) ? 2 : 0;
  return be(
    e,
    t,
    r,
    n,
    a,
    i,
    o,
    !0
  );
}
function Ot(e) {
  return e ? ps(e) || Ua in e ? ct({}, e) : e : null;
}
function Er(e, t, r = !1) {
  const { props: n, ref: a, patchFlag: o, children: i } = e, l = t ? ht(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Qs(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && a ? Te(a) ? a.concat(ua(t)) : [a, ua(t)] : ua(t)
    ) : a,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Oe ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Er(e.ssContent),
    ssFallback: e.ssFallback && Er(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Jt(e = " ", t = 0) {
  return Ke(Ya, null, e, t);
}
function re(e = "", t = !1) {
  return t ? ($(), Ye(jt, null, e)) : Ke(jt, null, e);
}
function nr(e) {
  return e == null || typeof e == "boolean" ? Ke(jt) : Te(e) ? Ke(
    Oe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Cr(e) : Ke(Ya, null, String(e));
}
function Cr(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Er(e);
}
function ui(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (Te(t))
    r = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const a = t.default;
      a && (a._c && (a._d = !1), ui(e, a()), a._c && (a._d = !0));
      return;
    } else {
      r = 32;
      const a = t._;
      !a && !(Ua in t) ? t._ctx = _t : a === 3 && _t && (_t.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    Ie(t) ? (t = { default: t, _ctx: _t }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [Jt(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function ht(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const a in n)
      if (a === "class")
        t.class !== n.class && (t.class = He([t.class, n.class]));
      else if (a === "style")
        t.style = Mt([t.style, n.style]);
      else if (Ta(a)) {
        const o = t[a], i = n[a];
        i && o !== i && !(Te(o) && o.includes(i)) && (t[a] = o ? [].concat(o, i) : i);
      } else
        a !== "" && (t[a] = n[a]);
  }
  return t;
}
function tr(e, t, r, n = null) {
  $t(e, t, 7, [
    r,
    n
  ]);
}
const Yd = Us();
let Ud = 0;
function Bd(e, t, r) {
  const n = e.type, a = (t ? t.appContext : e.appContext) || Yd, o = {
    uid: Ud++,
    vnode: e,
    type: n,
    parent: t,
    appContext: a,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new tc(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(a.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Fs(n, a),
    emitsOptions: ks(n, a),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: et,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: et,
    data: et,
    props: et,
    attrs: et,
    slots: et,
    refs: et,
    setupState: et,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = $c.bind(null, o), e.ce && e.ce(o), o;
}
let dt = null;
const Gs = () => dt || _t;
let ci, Io;
{
  const e = Xl(), t = (r, n) => {
    let a;
    return (a = e[r]) || (a = e[r] = []), a.push(n), (o) => {
      a.length > 1 ? a.forEach((i) => i(o)) : a[0](o);
    };
  };
  ci = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => dt = r
  ), Io = t(
    "__VUE_SSR_SETTERS__",
    (r) => Ba = r
  );
}
const pn = (e) => {
  ci(e), e.scope.on();
}, qr = () => {
  dt && dt.scope.off(), ci(null);
};
function zs(e) {
  return e.vnode.shapeFlag & 4;
}
let Ba = !1;
function Fd(e, t = !1) {
  t && Io(t);
  const { props: r, children: n } = e.vnode, a = zs(e);
  _d(e, r, a, t), Ad(e, n);
  const o = a ? Hd(e, t) : void 0;
  return t && Io(!1), o;
}
function Hd(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = vs(new Proxy(e.ctx, dd));
  const { setup: n } = r;
  if (n) {
    const a = e.setupContext = n.length > 1 ? Ks(e) : null;
    pn(e), Nr();
    const o = gr(
      n,
      e,
      0,
      [
        e.props,
        a
      ]
    );
    if (Rr(), qr(), zl(o)) {
      if (o.then(qr, qr), t)
        return o.then((i) => {
          nl(e, i, t);
        }).catch((i) => {
          Ia(i, e, 0);
        });
      e.asyncDep = o;
    } else
      nl(e, o, t);
  } else
    qs(e, t);
}
function nl(e, t, r) {
  Ie(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ze(t) && (e.setupState = gs(t)), qs(e, r);
}
let al;
function qs(e, t, r) {
  const n = e.type;
  if (!e.render) {
    if (!t && al && !n.render) {
      const a = n.template || ii(e).template;
      if (a) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: s } = n, u = ct(
          ct(
            {
              isCustomElement: o,
              delimiters: l
            },
            i
          ),
          s
        );
        n.render = al(a, u);
      }
    }
    e.render = n.render || Yt;
  }
  {
    pn(e), Nr();
    try {
      pd(e);
    } finally {
      Rr(), qr();
    }
  }
}
function Ld(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, r) {
        return Et(e, "get", "$attrs"), t[r];
      }
    }
  ));
}
function Ks(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    get attrs() {
      return Ld(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Fa(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(gs(vs(e.exposed)), {
      get(t, r) {
        if (r in t)
          return t[r];
        if (r in In)
          return In[r](e);
      },
      has(t, r) {
        return r in t || r in In;
      }
    }));
}
const $d = /(?:^|[-_])(\w)/g, jd = (e) => e.replace($d, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Xs(e, t = !0) {
  return Ie(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Zs(e, t, r = !1) {
  let n = Xs(t);
  if (!n && t.__file) {
    const a = t.__file.match(/([^/\\]+)\.\w+$/);
    a && (n = a[1]);
  }
  if (!n && e && e.parent) {
    const a = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    n = a(
      e.components || e.parent.type.components
    ) || a(e.appContext.components);
  }
  return n ? jd(n) : r ? "App" : "Anonymous";
}
function Vd(e) {
  return Ie(e) && "__vccOpts" in e;
}
const te = (e, t) => Dc(e, t, Ba);
function Js(e, t, r) {
  const n = arguments.length;
  return n === 2 ? Ze(t) && !Te(t) ? ya(t) ? Ke(e, null, [t]) : Ke(e, t) : Ke(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && ya(r) && (r = [r]), Ke(e, t, r));
}
const Wd = "3.4.3", Qd = "http://www.w3.org/2000/svg", Gd = "http://www.w3.org/1998/Math/MathML", Tr = typeof document < "u" ? document : null, ol = Tr && /* @__PURE__ */ Tr.createElement("template"), zd = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, n) => {
    const a = t === "svg" ? Tr.createElementNS(Qd, e) : t === "mathml" ? Tr.createElementNS(Gd, e) : Tr.createElement(e, r ? { is: r } : void 0);
    return e === "select" && n && n.multiple != null && a.setAttribute("multiple", n.multiple), a;
  },
  createText: (e) => Tr.createTextNode(e),
  createComment: (e) => Tr.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Tr.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, r, n, a, o) {
    const i = r ? r.previousSibling : t.lastChild;
    if (a && (a === o || a.nextSibling))
      for (; t.insertBefore(a.cloneNode(!0), r), !(a === o || !(a = a.nextSibling)); )
        ;
    else {
      ol.innerHTML = n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e;
      const l = ol.content;
      if (n === "svg" || n === "mathml") {
        const s = l.firstChild;
        for (; s.firstChild; )
          l.appendChild(s.firstChild);
        l.removeChild(s);
      }
      t.insertBefore(l, r);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      r ? r.previousSibling : t.lastChild
    ];
  }
}, wr = "transition", xn = "animation", Hn = Symbol("_vtc"), Ur = (e, { slots: t }) => Js(td, qd(e), t);
Ur.displayName = "Transition";
const eu = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Ur.props = /* @__PURE__ */ ct(
  {},
  Os,
  eu
);
const Lr = (e, t = []) => {
  Te(e) ? e.forEach((r) => r(...t)) : e && e(...t);
}, il = (e) => e ? Te(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function qd(e) {
  const t = {};
  for (const _ in e)
    _ in eu || (t[_] = e[_]);
  if (e.css === !1)
    return t;
  const {
    name: r = "v",
    type: n,
    duration: a,
    enterFromClass: o = `${r}-enter-from`,
    enterActiveClass: i = `${r}-enter-active`,
    enterToClass: l = `${r}-enter-to`,
    appearFromClass: s = o,
    appearActiveClass: u = i,
    appearToClass: d = l,
    leaveFromClass: p = `${r}-leave-from`,
    leaveActiveClass: v = `${r}-leave-active`,
    leaveToClass: b = `${r}-leave-to`
  } = e, A = Kd(a), M = A && A[0], Q = A && A[1], {
    onBeforeEnter: S,
    onEnter: R,
    onEnterCancelled: F,
    onLeave: C,
    onLeaveCancelled: N,
    onBeforeAppear: W = S,
    onAppear: H = R,
    onAppearCancelled: z = F
  } = t, G = (_, j, I) => {
    $r(_, j ? d : l), $r(_, j ? u : i), I && I();
  }, g = (_, j) => {
    _._isLeaving = !1, $r(_, p), $r(_, b), $r(_, v), j && j();
  }, E = (_) => (j, I) => {
    const y = _ ? H : R, T = () => G(j, _, I);
    Lr(y, [j, T]), ll(() => {
      $r(j, _ ? s : o), _r(j, _ ? d : l), il(y) || sl(j, n, M, T);
    });
  };
  return ct(t, {
    onBeforeEnter(_) {
      Lr(S, [_]), _r(_, o), _r(_, i);
    },
    onBeforeAppear(_) {
      Lr(W, [_]), _r(_, s), _r(_, u);
    },
    onEnter: E(!1),
    onAppear: E(!0),
    onLeave(_, j) {
      _._isLeaving = !0;
      const I = () => g(_, j);
      _r(_, p), Jd(), _r(_, v), ll(() => {
        _._isLeaving && ($r(_, p), _r(_, b), il(C) || sl(_, n, Q, I));
      }), Lr(C, [_, I]);
    },
    onEnterCancelled(_) {
      G(_, !1), Lr(F, [_]);
    },
    onAppearCancelled(_) {
      G(_, !0), Lr(z, [_]);
    },
    onLeaveCancelled(_) {
      g(_), Lr(N, [_]);
    }
  });
}
function Kd(e) {
  if (e == null)
    return null;
  if (Ze(e))
    return [Ja(e.enter), Ja(e.leave)];
  {
    const t = Ja(e);
    return [t, t];
  }
}
function Ja(e) {
  return yo(e);
}
function _r(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.add(r)), (e[Hn] || (e[Hn] = /* @__PURE__ */ new Set())).add(t);
}
function $r(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const r = e[Hn];
  r && (r.delete(t), r.size || (e[Hn] = void 0));
}
function ll(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Xd = 0;
function sl(e, t, r, n) {
  const a = e._endId = ++Xd, o = () => {
    a === e._endId && n();
  };
  if (r)
    return setTimeout(o, r);
  const { type: i, timeout: l, propCount: s } = Zd(e, t);
  if (!i)
    return n();
  const u = i + "end";
  let d = 0;
  const p = () => {
    e.removeEventListener(u, v), o();
  }, v = (b) => {
    b.target === e && ++d >= s && p();
  };
  setTimeout(() => {
    d < s && p();
  }, l + 1), e.addEventListener(u, v);
}
function Zd(e, t) {
  const r = window.getComputedStyle(e), n = (A) => (r[A] || "").split(", "), a = n(`${wr}Delay`), o = n(`${wr}Duration`), i = ul(a, o), l = n(`${xn}Delay`), s = n(`${xn}Duration`), u = ul(l, s);
  let d = null, p = 0, v = 0;
  t === wr ? i > 0 && (d = wr, p = i, v = o.length) : t === xn ? u > 0 && (d = xn, p = u, v = s.length) : (p = Math.max(i, u), d = p > 0 ? i > u ? wr : xn : null, v = d ? d === wr ? o.length : s.length : 0);
  const b = d === wr && /\b(transform|all)(,|$)/.test(
    n(`${wr}Property`).toString()
  );
  return {
    type: d,
    timeout: p,
    propCount: v,
    hasTransform: b
  };
}
function ul(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((r, n) => cl(r) + cl(e[n])));
}
function cl(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Jd() {
  return document.body.offsetHeight;
}
function ef(e, t, r) {
  const n = e[Hn];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const di = Symbol("_vod"), ca = {
  beforeMount(e, { value: t }, { transition: r }) {
    e[di] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : kn(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: n }) {
    !t != !r && (n ? t ? (n.beforeEnter(e), kn(e, !0), n.enter(e)) : n.leave(e, () => {
      kn(e, !1);
    }) : kn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    kn(e, t);
  }
};
function kn(e, t) {
  e.style.display = t ? e[di] : "none";
}
const tf = Symbol("");
function rf(e, t, r) {
  const n = e.style, a = at(r);
  if (r && !a) {
    if (t && !at(t))
      for (const o in t)
        r[o] == null && Eo(n, o, "");
    for (const o in r)
      Eo(n, o, r[o]);
  } else {
    const o = n.display;
    if (a) {
      if (t !== r) {
        const i = n[tf];
        i && (r += ";" + i), n.cssText = r;
      }
    } else
      t && e.removeAttribute("style");
    di in e && (n.display = o);
  }
}
const dl = /\s*!important$/;
function Eo(e, t, r) {
  if (Te(r))
    r.forEach((n) => Eo(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const n = nf(e, t);
    dl.test(r) ? e.setProperty(
      Lt(n),
      r.replace(dl, ""),
      "important"
    ) : e[n] = r;
  }
}
const fl = ["Webkit", "Moz", "ms"], eo = {};
function nf(e, t) {
  const r = eo[t];
  if (r)
    return r;
  let n = Bt(t);
  if (n !== "filter" && n in e)
    return eo[t] = n;
  n = Pa(n);
  for (let a = 0; a < fl.length; a++) {
    const o = fl[a] + n;
    if (o in e)
      return eo[t] = o;
  }
  return t;
}
const pl = "http://www.w3.org/1999/xlink";
function af(e, t, r, n, a) {
  if (n && t.startsWith("xlink:"))
    r == null ? e.removeAttributeNS(pl, t.slice(6, t.length)) : e.setAttributeNS(pl, t, r);
  else {
    const o = ec(t);
    r == null || o && !Zl(r) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : r);
  }
}
function of(e, t, r, n, a, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    n && i(n, a, o), e[t] = r ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = r;
    const u = l === "OPTION" ? e.getAttribute("value") : e.value, d = r ?? "";
    u !== d && (e.value = d), r == null && e.removeAttribute(t);
    return;
  }
  let s = !1;
  if (r === "" || r == null) {
    const u = typeof e[t];
    u === "boolean" ? r = Zl(r) : r == null && u === "string" ? (r = "", s = !0) : u === "number" && (r = 0, s = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  s && e.removeAttribute(t);
}
function lf(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function sf(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const vl = Symbol("_vei");
function uf(e, t, r, n, a = null) {
  const o = e[vl] || (e[vl] = {}), i = o[t];
  if (n && i)
    i.value = n;
  else {
    const [l, s] = cf(t);
    if (n) {
      const u = o[t] = pf(n, a);
      lf(e, l, u, s);
    } else
      i && (sf(e, l, i, s), o[t] = void 0);
  }
}
const ml = /(?:Once|Passive|Capture)$/;
function cf(e) {
  let t;
  if (ml.test(e)) {
    t = {};
    let n;
    for (; n = e.match(ml); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Lt(e.slice(2)), t];
}
let to = 0;
const df = /* @__PURE__ */ Promise.resolve(), ff = () => to || (df.then(() => to = 0), to = Date.now());
function pf(e, t) {
  const r = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= r.attached)
      return;
    $t(
      vf(n, r.value),
      t,
      5,
      [n]
    );
  };
  return r.value = e, r.attached = ff(), r;
}
function vf(e, t) {
  if (Te(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = !0;
    }, t.map((n) => (a) => !a._stopped && n && n(a));
  } else
    return t;
}
const hl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, mf = (e, t, r, n, a, o, i, l, s) => {
  const u = a === "svg";
  t === "class" ? ef(e, n, u) : t === "style" ? rf(e, r, n) : Ta(t) ? Qo(t) || uf(e, t, r, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : hf(e, t, n, u)) ? of(
    e,
    t,
    n,
    o,
    i,
    l,
    s
  ) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), af(e, t, n, u));
};
function hf(e, t, r, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && hl(t) && Ie(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const a = e.tagName;
    if (a === "IMG" || a === "VIDEO" || a === "CANVAS" || a === "SOURCE")
      return !1;
  }
  return hl(t) && at(r) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function gf(e, t) {
  const r = /* @__PURE__ */ gt(e);
  class n extends fi {
    constructor(o) {
      super(r, o, t);
    }
  }
  return n.def = r, n;
}
const yf = typeof HTMLElement < "u" ? HTMLElement : class {
};
class fi extends yf {
  constructor(t, r = {}, n) {
    super(), this._def = t, this._props = r, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && n ? n(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), ur(() => {
      this._connected || (ba(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver((n) => {
      for (const a of n)
        this._setAttr(a.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (n, a = !1) => {
      const { props: o, styles: i } = n;
      let l;
      if (o && !Te(o))
        for (const s in o) {
          const u = o[s];
          (u === Number || u && u.type === Number) && (s in this._props && (this._props[s] = yo(this._props[s])), (l || (l = /* @__PURE__ */ Object.create(null)))[Bt(s)] = !0);
        }
      this._numberProps = l, a && this._resolveProps(n), this._applyStyles(i), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((n) => t(n, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: r } = t, n = Te(r) ? r : Object.keys(r || {});
    for (const a of Object.keys(this))
      a[0] !== "_" && n.includes(a) && this._setProp(a, this[a], !0, !1);
    for (const a of n.map(Bt))
      Object.defineProperty(this, a, {
        get() {
          return this._getProp(a);
        },
        set(o) {
          this._setProp(a, o);
        }
      });
  }
  _setAttr(t) {
    let r = this.getAttribute(t);
    const n = Bt(t);
    this._numberProps && this._numberProps[n] && (r = yo(r)), this._setProp(n, r, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, r, n = !0, a = !0) {
    r !== this._props[t] && (this._props[t] = r, a && this._instance && this._update(), n && (r === !0 ? this.setAttribute(Lt(t), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(Lt(t), r + "") : r || this.removeAttribute(Lt(t))));
  }
  _update() {
    ba(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ke(this._def, ct({}, this._props));
    return this._instance || (t.ce = (r) => {
      this._instance = r, r.isCE = !0;
      const n = (o, i) => {
        this.dispatchEvent(
          new CustomEvent(o, {
            detail: i
          })
        );
      };
      r.emit = (o, ...i) => {
        n(o, i), Lt(o) !== o && n(Lt(o), i);
      };
      let a = this;
      for (; a = a && (a.parentNode || a.host); )
        if (a instanceof fi) {
          r.parent = a._instance, r.provides = a._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((r) => {
      const n = document.createElement("style");
      n.textContent = r, this.shadowRoot.appendChild(n);
    });
  }
}
const bf = ["ctrl", "shift", "alt", "meta"], wf = {
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
  exact: (e, t) => bf.some((r) => e[`${r}Key`] && !t.includes(r))
}, qe = (e, t) => {
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = (a, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const l = wf[t[i]];
      if (l && l(a, t))
        return;
    }
    return e(a, ...o);
  });
}, _f = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Se = (e, t) => {
  const r = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return r[n] || (r[n] = (a) => {
    if (!("key" in a))
      return;
    const o = Lt(a.key);
    if (t.some((i) => i === o || _f[i] === o))
      return e(a);
  });
}, xf = /* @__PURE__ */ ct({ patchProp: mf }, zd);
let gl;
function kf() {
  return gl || (gl = Cd(xf));
}
const ba = (...e) => {
  kf().render(...e);
};
function Vt(e) {
  "@babel/helpers - typeof";
  return Vt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vt(e);
}
function Ce(e) {
  if (e === null || e === !0 || e === !1)
    return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function fe(e, t) {
  if (t.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function we(e) {
  fe(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || Vt(e) === "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), /* @__PURE__ */ new Date(NaN));
}
function fr(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t);
  return isNaN(n) ? /* @__PURE__ */ new Date(NaN) : (n && r.setDate(r.getDate() + n), r);
}
function qt(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t);
  if (isNaN(n))
    return /* @__PURE__ */ new Date(NaN);
  if (!n)
    return r;
  var a = r.getDate(), o = new Date(r.getTime());
  o.setMonth(r.getMonth() + n + 1, 0);
  var i = o.getDate();
  return a >= i ? o : (r.setFullYear(o.getFullYear(), o.getMonth(), a), r);
}
function tu(e, t) {
  if (fe(2, arguments), !t || Vt(t) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var r = t.years ? Ce(t.years) : 0, n = t.months ? Ce(t.months) : 0, a = t.weeks ? Ce(t.weeks) : 0, o = t.days ? Ce(t.days) : 0, i = t.hours ? Ce(t.hours) : 0, l = t.minutes ? Ce(t.minutes) : 0, s = t.seconds ? Ce(t.seconds) : 0, u = we(e), d = n || r ? qt(u, n + r * 12) : u, p = o || a ? fr(d, o + a * 7) : d, v = l + i * 60, b = s + v * 60, A = b * 1e3, M = new Date(p.getTime() + A);
  return M;
}
function Af(e, t) {
  fe(2, arguments);
  var r = we(e).getTime(), n = Ce(t);
  return new Date(r + n);
}
var Df = {};
function cr() {
  return Df;
}
function Zr(e, t) {
  var r, n, a, o, i, l, s, u;
  fe(1, arguments);
  var d = cr(), p = Ce((r = (n = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (l = i.options) === null || l === void 0 ? void 0 : l.weekStartsOn) !== null && a !== void 0 ? a : d.weekStartsOn) !== null && n !== void 0 ? n : (s = d.locale) === null || s === void 0 || (u = s.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && r !== void 0 ? r : 0);
  if (!(p >= 0 && p <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var v = we(e), b = v.getDay(), A = (b < p ? 7 : 0) + b - p;
  return v.setDate(v.getDate() - A), v.setHours(0, 0, 0, 0), v;
}
function wa(e) {
  return fe(1, arguments), Zr(e, {
    weekStartsOn: 1
  });
}
function Cf(e) {
  fe(1, arguments);
  var t = we(e), r = t.getFullYear(), n = /* @__PURE__ */ new Date(0);
  n.setFullYear(r + 1, 0, 4), n.setHours(0, 0, 0, 0);
  var a = wa(n), o = /* @__PURE__ */ new Date(0);
  o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
  var i = wa(o);
  return t.getTime() >= a.getTime() ? r + 1 : t.getTime() >= i.getTime() ? r : r - 1;
}
function Tf(e) {
  fe(1, arguments);
  var t = Cf(e), r = /* @__PURE__ */ new Date(0);
  r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0);
  var n = wa(r);
  return n;
}
function _a(e) {
  var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
function No(e) {
  fe(1, arguments);
  var t = we(e);
  return t.setHours(0, 0, 0, 0), t;
}
var Mf = 864e5;
function ru(e, t) {
  fe(2, arguments);
  var r = No(e), n = No(t), a = r.getTime() - _a(r), o = n.getTime() - _a(n);
  return Math.round((a - o) / Mf);
}
function Of(e, t) {
  fe(2, arguments);
  var r = Ce(t), n = r * 3;
  return qt(e, n);
}
function pi(e, t) {
  fe(2, arguments);
  var r = Ce(t);
  return qt(e, r * 12);
}
var vi = 6e4, mi = 36e5, Pf = 1e3;
function nu(e) {
  return fe(1, arguments), e instanceof Date || Vt(e) === "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function vr(e) {
  if (fe(1, arguments), !nu(e) && typeof e != "number")
    return !1;
  var t = we(e);
  return !isNaN(Number(t));
}
function yl(e) {
  fe(1, arguments);
  var t = we(e), r = Math.floor(t.getMonth() / 3) + 1;
  return r;
}
function bl(e, t) {
  var r = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return r < 0 ? -1 : r > 0 ? 1 : r;
}
function Sf(e, t) {
  fe(2, arguments);
  var r = we(e), n = we(t), a = bl(r, n), o = Math.abs(ru(r, n));
  r.setDate(r.getDate() - a * o);
  var i = +(bl(r, n) === -a), l = a * (o - i);
  return l === 0 ? 0 : l;
}
function If(e) {
  fe(1, arguments);
  var t = we(e);
  return t.setHours(23, 59, 59, 999), t;
}
function wl(e) {
  fe(1, arguments);
  var t = we(e), r = t.getMonth();
  return t.setFullYear(t.getFullYear(), r + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function xa(e, t) {
  var r;
  fe(1, arguments);
  var n = e || {}, a = we(n.start), o = we(n.end), i = o.getTime();
  if (!(a.getTime() <= i))
    throw new RangeError("Invalid interval");
  var l = [], s = a;
  s.setHours(0, 0, 0, 0);
  var u = Number((r = t == null ? void 0 : t.step) !== null && r !== void 0 ? r : 1);
  if (u < 1 || isNaN(u))
    throw new RangeError("`options.step` must be a number greater than 1");
  for (; s.getTime() <= i; )
    l.push(we(s)), s.setDate(s.getDate() + u), s.setHours(0, 0, 0, 0);
  return l;
}
function Ln(e) {
  fe(1, arguments);
  var t = we(e), r = t.getMonth(), n = r - r % 3;
  return t.setMonth(n, 1), t.setHours(0, 0, 0, 0), t;
}
function Ef(e) {
  fe(1, arguments);
  var t = e || {}, r = we(t.start), n = we(t.end), a = n.getTime();
  if (!(r.getTime() <= a))
    throw new RangeError("Invalid interval");
  var o = Ln(r), i = Ln(n);
  a = i.getTime();
  for (var l = [], s = o; s.getTime() <= a; )
    l.push(we(s)), s = Of(s, 1);
  return l;
}
function _l(e) {
  fe(1, arguments);
  var t = we(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function Nf(e) {
  fe(1, arguments);
  var t = we(e), r = t.getFullYear();
  return t.setFullYear(r + 1, 0, 0), t.setHours(23, 59, 59, 999), t;
}
function Rf(e) {
  fe(1, arguments);
  var t = we(e), r = /* @__PURE__ */ new Date(0);
  return r.setFullYear(t.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r;
}
function Yf(e, t) {
  var r, n, a, o, i, l, s, u;
  fe(1, arguments);
  var d = cr(), p = Ce((r = (n = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (l = i.options) === null || l === void 0 ? void 0 : l.weekStartsOn) !== null && a !== void 0 ? a : d.weekStartsOn) !== null && n !== void 0 ? n : (s = d.locale) === null || s === void 0 || (u = s.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && r !== void 0 ? r : 0);
  if (!(p >= 0 && p <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var v = we(e), b = v.getDay(), A = (b < p ? -7 : 0) + 6 - (b - p);
  return v.setDate(v.getDate() + A), v.setHours(23, 59, 59, 999), v;
}
function xl(e) {
  fe(1, arguments);
  var t = we(e), r = t.getMonth(), n = r - r % 3 + 3;
  return t.setMonth(n, 0), t.setHours(23, 59, 59, 999), t;
}
function au(e, t) {
  fe(2, arguments);
  var r = Ce(t);
  return Af(e, -r);
}
var Uf = 864e5;
function Bf(e) {
  fe(1, arguments);
  var t = we(e), r = t.getTime();
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  var n = t.getTime(), a = r - n;
  return Math.floor(a / Uf) + 1;
}
function vn(e) {
  fe(1, arguments);
  var t = 1, r = we(e), n = r.getUTCDay(), a = (n < t ? 7 : 0) + n - t;
  return r.setUTCDate(r.getUTCDate() - a), r.setUTCHours(0, 0, 0, 0), r;
}
function ou(e) {
  fe(1, arguments);
  var t = we(e), r = t.getUTCFullYear(), n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(r + 1, 0, 4), n.setUTCHours(0, 0, 0, 0);
  var a = vn(n), o = /* @__PURE__ */ new Date(0);
  o.setUTCFullYear(r, 0, 4), o.setUTCHours(0, 0, 0, 0);
  var i = vn(o);
  return t.getTime() >= a.getTime() ? r + 1 : t.getTime() >= i.getTime() ? r : r - 1;
}
function Ff(e) {
  fe(1, arguments);
  var t = ou(e), r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(t, 0, 4), r.setUTCHours(0, 0, 0, 0);
  var n = vn(r);
  return n;
}
var Hf = 6048e5;
function iu(e) {
  fe(1, arguments);
  var t = we(e), r = vn(t).getTime() - Ff(t).getTime();
  return Math.round(r / Hf) + 1;
}
function Jr(e, t) {
  var r, n, a, o, i, l, s, u;
  fe(1, arguments);
  var d = cr(), p = Ce((r = (n = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (l = i.options) === null || l === void 0 ? void 0 : l.weekStartsOn) !== null && a !== void 0 ? a : d.weekStartsOn) !== null && n !== void 0 ? n : (s = d.locale) === null || s === void 0 || (u = s.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && r !== void 0 ? r : 0);
  if (!(p >= 0 && p <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var v = we(e), b = v.getUTCDay(), A = (b < p ? 7 : 0) + b - p;
  return v.setUTCDate(v.getUTCDate() - A), v.setUTCHours(0, 0, 0, 0), v;
}
function hi(e, t) {
  var r, n, a, o, i, l, s, u;
  fe(1, arguments);
  var d = we(e), p = d.getUTCFullYear(), v = cr(), b = Ce((r = (n = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (l = i.options) === null || l === void 0 ? void 0 : l.firstWeekContainsDate) !== null && a !== void 0 ? a : v.firstWeekContainsDate) !== null && n !== void 0 ? n : (s = v.locale) === null || s === void 0 || (u = s.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && r !== void 0 ? r : 1);
  if (!(b >= 1 && b <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var A = /* @__PURE__ */ new Date(0);
  A.setUTCFullYear(p + 1, 0, b), A.setUTCHours(0, 0, 0, 0);
  var M = Jr(A, t), Q = /* @__PURE__ */ new Date(0);
  Q.setUTCFullYear(p, 0, b), Q.setUTCHours(0, 0, 0, 0);
  var S = Jr(Q, t);
  return d.getTime() >= M.getTime() ? p + 1 : d.getTime() >= S.getTime() ? p : p - 1;
}
function Lf(e, t) {
  var r, n, a, o, i, l, s, u;
  fe(1, arguments);
  var d = cr(), p = Ce((r = (n = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (l = i.options) === null || l === void 0 ? void 0 : l.firstWeekContainsDate) !== null && a !== void 0 ? a : d.firstWeekContainsDate) !== null && n !== void 0 ? n : (s = d.locale) === null || s === void 0 || (u = s.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && r !== void 0 ? r : 1), v = hi(e, t), b = /* @__PURE__ */ new Date(0);
  b.setUTCFullYear(v, 0, p), b.setUTCHours(0, 0, 0, 0);
  var A = Jr(b, t);
  return A;
}
var $f = 6048e5;
function lu(e, t) {
  fe(1, arguments);
  var r = we(e), n = Jr(r, t).getTime() - Lf(r, t).getTime();
  return Math.round(n / $f) + 1;
}
function ze(e, t) {
  for (var r = e < 0 ? "-" : "", n = Math.abs(e).toString(); n.length < t; )
    n = "0" + n;
  return r + n;
}
var jf = {
  // Year
  y: function(t, r) {
    var n = t.getUTCFullYear(), a = n > 0 ? n : 1 - n;
    return ze(r === "yy" ? a % 100 : a, r.length);
  },
  // Month
  M: function(t, r) {
    var n = t.getUTCMonth();
    return r === "M" ? String(n + 1) : ze(n + 1, 2);
  },
  // Day of the month
  d: function(t, r) {
    return ze(t.getUTCDate(), r.length);
  },
  // AM or PM
  a: function(t, r) {
    var n = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (r) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function(t, r) {
    return ze(t.getUTCHours() % 12 || 12, r.length);
  },
  // Hour [0-23]
  H: function(t, r) {
    return ze(t.getUTCHours(), r.length);
  },
  // Minute
  m: function(t, r) {
    return ze(t.getUTCMinutes(), r.length);
  },
  // Second
  s: function(t, r) {
    return ze(t.getUTCSeconds(), r.length);
  },
  // Fraction of second
  S: function(t, r) {
    var n = r.length, a = t.getUTCMilliseconds(), o = Math.floor(a * Math.pow(10, n - 3));
    return ze(o, r.length);
  }
};
const xr = jf;
var rn = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Vf = {
  // Era
  G: function(t, r, n) {
    var a = t.getUTCFullYear() > 0 ? 1 : 0;
    switch (r) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(a, {
          width: "abbreviated"
        });
      case "GGGGG":
        return n.era(a, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return n.era(a, {
          width: "wide"
        });
    }
  },
  // Year
  y: function(t, r, n) {
    if (r === "yo") {
      var a = t.getUTCFullYear(), o = a > 0 ? a : 1 - a;
      return n.ordinalNumber(o, {
        unit: "year"
      });
    }
    return xr.y(t, r);
  },
  // Local week-numbering year
  Y: function(t, r, n, a) {
    var o = hi(t, a), i = o > 0 ? o : 1 - o;
    if (r === "YY") {
      var l = i % 100;
      return ze(l, 2);
    }
    return r === "Yo" ? n.ordinalNumber(i, {
      unit: "year"
    }) : ze(i, r.length);
  },
  // ISO week-numbering year
  R: function(t, r) {
    var n = ou(t);
    return ze(n, r.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(t, r) {
    var n = t.getUTCFullYear();
    return ze(n, r.length);
  },
  // Quarter
  Q: function(t, r, n) {
    var a = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (r) {
      case "Q":
        return String(a);
      case "QQ":
        return ze(a, 2);
      case "Qo":
        return n.ordinalNumber(a, {
          unit: "quarter"
        });
      case "QQQ":
        return n.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(t, r, n) {
    var a = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (r) {
      case "q":
        return String(a);
      case "qq":
        return ze(a, 2);
      case "qo":
        return n.ordinalNumber(a, {
          unit: "quarter"
        });
      case "qqq":
        return n.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(t, r, n) {
    var a = t.getUTCMonth();
    switch (r) {
      case "M":
      case "MM":
        return xr.M(t, r);
      case "Mo":
        return n.ordinalNumber(a + 1, {
          unit: "month"
        });
      case "MMM":
        return n.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(a, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function(t, r, n) {
    var a = t.getUTCMonth();
    switch (r) {
      case "L":
        return String(a + 1);
      case "LL":
        return ze(a + 1, 2);
      case "Lo":
        return n.ordinalNumber(a + 1, {
          unit: "month"
        });
      case "LLL":
        return n.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(a, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function(t, r, n, a) {
    var o = lu(t, a);
    return r === "wo" ? n.ordinalNumber(o, {
      unit: "week"
    }) : ze(o, r.length);
  },
  // ISO week of year
  I: function(t, r, n) {
    var a = iu(t);
    return r === "Io" ? n.ordinalNumber(a, {
      unit: "week"
    }) : ze(a, r.length);
  },
  // Day of the month
  d: function(t, r, n) {
    return r === "do" ? n.ordinalNumber(t.getUTCDate(), {
      unit: "date"
    }) : xr.d(t, r);
  },
  // Day of year
  D: function(t, r, n) {
    var a = Bf(t);
    return r === "Do" ? n.ordinalNumber(a, {
      unit: "dayOfYear"
    }) : ze(a, r.length);
  },
  // Day of week
  E: function(t, r, n) {
    var a = t.getUTCDay();
    switch (r) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(t, r, n, a) {
    var o = t.getUTCDay(), i = (o - a.weekStartsOn + 8) % 7 || 7;
    switch (r) {
      case "e":
        return String(i);
      case "ee":
        return ze(i, 2);
      case "eo":
        return n.ordinalNumber(i, {
          unit: "day"
        });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(t, r, n, a) {
    var o = t.getUTCDay(), i = (o - a.weekStartsOn + 8) % 7 || 7;
    switch (r) {
      case "c":
        return String(i);
      case "cc":
        return ze(i, r.length);
      case "co":
        return n.ordinalNumber(i, {
          unit: "day"
        });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(t, r, n) {
    var a = t.getUTCDay(), o = a === 0 ? 7 : a;
    switch (r) {
      case "i":
        return String(o);
      case "ii":
        return ze(o, r.length);
      case "io":
        return n.ordinalNumber(o, {
          unit: "day"
        });
      case "iii":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(t, r, n) {
    var a = t.getUTCHours(), o = a / 12 >= 1 ? "pm" : "am";
    switch (r) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(t, r, n) {
    var a = t.getUTCHours(), o;
    switch (a === 12 ? o = rn.noon : a === 0 ? o = rn.midnight : o = a / 12 >= 1 ? "pm" : "am", r) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(t, r, n) {
    var a = t.getUTCHours(), o;
    switch (a >= 17 ? o = rn.evening : a >= 12 ? o = rn.afternoon : a >= 4 ? o = rn.morning : o = rn.night, r) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(t, r, n) {
    if (r === "ho") {
      var a = t.getUTCHours() % 12;
      return a === 0 && (a = 12), n.ordinalNumber(a, {
        unit: "hour"
      });
    }
    return xr.h(t, r);
  },
  // Hour [0-23]
  H: function(t, r, n) {
    return r === "Ho" ? n.ordinalNumber(t.getUTCHours(), {
      unit: "hour"
    }) : xr.H(t, r);
  },
  // Hour [0-11]
  K: function(t, r, n) {
    var a = t.getUTCHours() % 12;
    return r === "Ko" ? n.ordinalNumber(a, {
      unit: "hour"
    }) : ze(a, r.length);
  },
  // Hour [1-24]
  k: function(t, r, n) {
    var a = t.getUTCHours();
    return a === 0 && (a = 24), r === "ko" ? n.ordinalNumber(a, {
      unit: "hour"
    }) : ze(a, r.length);
  },
  // Minute
  m: function(t, r, n) {
    return r === "mo" ? n.ordinalNumber(t.getUTCMinutes(), {
      unit: "minute"
    }) : xr.m(t, r);
  },
  // Second
  s: function(t, r, n) {
    return r === "so" ? n.ordinalNumber(t.getUTCSeconds(), {
      unit: "second"
    }) : xr.s(t, r);
  },
  // Fraction of second
  S: function(t, r) {
    return xr.S(t, r);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(t, r, n, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    if (i === 0)
      return "Z";
    switch (r) {
      case "X":
        return Al(i);
      case "XXXX":
      case "XX":
        return jr(i);
      case "XXXXX":
      case "XXX":
      default:
        return jr(i, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(t, r, n, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (r) {
      case "x":
        return Al(i);
      case "xxxx":
      case "xx":
        return jr(i);
      case "xxxxx":
      case "xxx":
      default:
        return jr(i, ":");
    }
  },
  // Timezone (GMT)
  O: function(t, r, n, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (r) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + kl(i, ":");
      case "OOOO":
      default:
        return "GMT" + jr(i, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(t, r, n, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (r) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + kl(i, ":");
      case "zzzz":
      default:
        return "GMT" + jr(i, ":");
    }
  },
  // Seconds timestamp
  t: function(t, r, n, a) {
    var o = a._originalDate || t, i = Math.floor(o.getTime() / 1e3);
    return ze(i, r.length);
  },
  // Milliseconds timestamp
  T: function(t, r, n, a) {
    var o = a._originalDate || t, i = o.getTime();
    return ze(i, r.length);
  }
};
function kl(e, t) {
  var r = e > 0 ? "-" : "+", n = Math.abs(e), a = Math.floor(n / 60), o = n % 60;
  if (o === 0)
    return r + String(a);
  var i = t || "";
  return r + String(a) + i + ze(o, 2);
}
function Al(e, t) {
  if (e % 60 === 0) {
    var r = e > 0 ? "-" : "+";
    return r + ze(Math.abs(e) / 60, 2);
  }
  return jr(e, t);
}
function jr(e, t) {
  var r = t || "", n = e > 0 ? "-" : "+", a = Math.abs(e), o = ze(Math.floor(a / 60), 2), i = ze(a % 60, 2);
  return n + o + r + i;
}
var Dl = function(t, r) {
  switch (t) {
    case "P":
      return r.date({
        width: "short"
      });
    case "PP":
      return r.date({
        width: "medium"
      });
    case "PPP":
      return r.date({
        width: "long"
      });
    case "PPPP":
    default:
      return r.date({
        width: "full"
      });
  }
}, su = function(t, r) {
  switch (t) {
    case "p":
      return r.time({
        width: "short"
      });
    case "pp":
      return r.time({
        width: "medium"
      });
    case "ppp":
      return r.time({
        width: "long"
      });
    case "pppp":
    default:
      return r.time({
        width: "full"
      });
  }
}, Wf = function(t, r) {
  var n = t.match(/(P+)(p+)?/) || [], a = n[1], o = n[2];
  if (!o)
    return Dl(t, r);
  var i;
  switch (a) {
    case "P":
      i = r.dateTime({
        width: "short"
      });
      break;
    case "PP":
      i = r.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      i = r.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      i = r.dateTime({
        width: "full"
      });
      break;
  }
  return i.replace("{{date}}", Dl(a, r)).replace("{{time}}", su(o, r));
}, Ro = {
  p: su,
  P: Wf
}, Qf = ["D", "DD"], Gf = ["YY", "YYYY"];
function uu(e) {
  return Qf.indexOf(e) !== -1;
}
function cu(e) {
  return Gf.indexOf(e) !== -1;
}
function ka(e, t, r) {
  if (e === "YYYY")
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t, "`) for formatting years to the input `").concat(r, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "YY")
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(t, "`) for formatting years to the input `").concat(r, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "D")
    throw new RangeError("Use `d` instead of `D` (in `".concat(t, "`) for formatting days of the month to the input `").concat(r, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "DD")
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(t, "`) for formatting days of the month to the input `").concat(r, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}
var zf = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, qf = function(t, r, n) {
  var a, o = zf[t];
  return typeof o == "string" ? a = o : r === 1 ? a = o.one : a = o.other.replace("{{count}}", r.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a;
};
const Kf = qf;
function ro(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.width ? String(t.width) : e.defaultWidth, n = e.formats[r] || e.formats[e.defaultWidth];
    return n;
  };
}
var Xf = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Zf = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Jf = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ep = {
  date: ro({
    formats: Xf,
    defaultWidth: "full"
  }),
  time: ro({
    formats: Zf,
    defaultWidth: "full"
  }),
  dateTime: ro({
    formats: Jf,
    defaultWidth: "full"
  })
};
const tp = ep;
var rp = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, np = function(t, r, n, a) {
  return rp[t];
};
const ap = np;
function An(e) {
  return function(t, r) {
    var n = r != null && r.context ? String(r.context) : "standalone", a;
    if (n === "formatting" && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth, i = r != null && r.width ? String(r.width) : o;
      a = e.formattingValues[i] || e.formattingValues[o];
    } else {
      var l = e.defaultWidth, s = r != null && r.width ? String(r.width) : e.defaultWidth;
      a = e.values[s] || e.values[l];
    }
    var u = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[u];
  };
}
var op = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ip = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, lp = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, sp = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, up = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, cp = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, dp = function(t, r) {
  var n = Number(t), a = n % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, fp = {
  ordinalNumber: dp,
  era: An({
    values: op,
    defaultWidth: "wide"
  }),
  quarter: An({
    values: ip,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: An({
    values: lp,
    defaultWidth: "wide"
  }),
  day: An({
    values: sp,
    defaultWidth: "wide"
  }),
  dayPeriod: An({
    values: up,
    defaultWidth: "wide",
    formattingValues: cp,
    defaultFormattingWidth: "wide"
  })
};
const pp = fp;
function Dn(e) {
  return function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = r.width, a = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], o = t.match(a);
    if (!o)
      return null;
    var i = o[0], l = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(l) ? mp(l, function(p) {
      return p.test(i);
    }) : vp(l, function(p) {
      return p.test(i);
    }), u;
    u = e.valueCallback ? e.valueCallback(s) : s, u = r.valueCallback ? r.valueCallback(u) : u;
    var d = t.slice(i.length);
    return {
      value: u,
      rest: d
    };
  };
}
function vp(e, t) {
  for (var r in e)
    if (e.hasOwnProperty(r) && t(e[r]))
      return r;
}
function mp(e, t) {
  for (var r = 0; r < e.length; r++)
    if (t(e[r]))
      return r;
}
function hp(e) {
  return function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.match(e.matchPattern);
    if (!n)
      return null;
    var a = n[0], o = t.match(e.parsePattern);
    if (!o)
      return null;
    var i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    i = r.valueCallback ? r.valueCallback(i) : i;
    var l = t.slice(a.length);
    return {
      value: i,
      rest: l
    };
  };
}
var gp = /^(\d+)(th|st|nd|rd)?/i, yp = /\d+/i, bp = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, wp = {
  any: [/^b/i, /^(a|c)/i]
}, _p = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, xp = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, kp = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Ap = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Dp = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Cp = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Tp = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Mp = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Op = {
  ordinalNumber: hp({
    matchPattern: gp,
    parsePattern: yp,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: Dn({
    matchPatterns: bp,
    defaultMatchWidth: "wide",
    parsePatterns: wp,
    defaultParseWidth: "any"
  }),
  quarter: Dn({
    matchPatterns: _p,
    defaultMatchWidth: "wide",
    parsePatterns: xp,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: Dn({
    matchPatterns: kp,
    defaultMatchWidth: "wide",
    parsePatterns: Ap,
    defaultParseWidth: "any"
  }),
  day: Dn({
    matchPatterns: Dp,
    defaultMatchWidth: "wide",
    parsePatterns: Cp,
    defaultParseWidth: "any"
  }),
  dayPeriod: Dn({
    matchPatterns: Tp,
    defaultMatchWidth: "any",
    parsePatterns: Mp,
    defaultParseWidth: "any"
  })
};
const Pp = Op;
var Sp = {
  code: "en-US",
  formatDistance: Kf,
  formatLong: tp,
  formatRelative: ap,
  localize: pp,
  match: Pp,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const du = Sp;
var Ip = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ep = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Np = /^'([^]*?)'?$/, Rp = /''/g, Yp = /[a-zA-Z]/;
function Kt(e, t, r) {
  var n, a, o, i, l, s, u, d, p, v, b, A, M, Q, S, R, F, C;
  fe(2, arguments);
  var N = String(t), W = cr(), H = (n = (a = r == null ? void 0 : r.locale) !== null && a !== void 0 ? a : W.locale) !== null && n !== void 0 ? n : du, z = Ce((o = (i = (l = (s = r == null ? void 0 : r.firstWeekContainsDate) !== null && s !== void 0 ? s : r == null || (u = r.locale) === null || u === void 0 || (d = u.options) === null || d === void 0 ? void 0 : d.firstWeekContainsDate) !== null && l !== void 0 ? l : W.firstWeekContainsDate) !== null && i !== void 0 ? i : (p = W.locale) === null || p === void 0 || (v = p.options) === null || v === void 0 ? void 0 : v.firstWeekContainsDate) !== null && o !== void 0 ? o : 1);
  if (!(z >= 1 && z <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var G = Ce((b = (A = (M = (Q = r == null ? void 0 : r.weekStartsOn) !== null && Q !== void 0 ? Q : r == null || (S = r.locale) === null || S === void 0 || (R = S.options) === null || R === void 0 ? void 0 : R.weekStartsOn) !== null && M !== void 0 ? M : W.weekStartsOn) !== null && A !== void 0 ? A : (F = W.locale) === null || F === void 0 || (C = F.options) === null || C === void 0 ? void 0 : C.weekStartsOn) !== null && b !== void 0 ? b : 0);
  if (!(G >= 0 && G <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!H.localize)
    throw new RangeError("locale must contain localize property");
  if (!H.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var g = we(e);
  if (!vr(g))
    throw new RangeError("Invalid time value");
  var E = _a(g), _ = au(g, E), j = {
    firstWeekContainsDate: z,
    weekStartsOn: G,
    locale: H,
    _originalDate: g
  }, I = N.match(Ep).map(function(y) {
    var T = y[0];
    if (T === "p" || T === "P") {
      var O = Ro[T];
      return O(y, H.formatLong);
    }
    return y;
  }).join("").match(Ip).map(function(y) {
    if (y === "''")
      return "'";
    var T = y[0];
    if (T === "'")
      return Up(y);
    var O = Vf[T];
    if (O)
      return !(r != null && r.useAdditionalWeekYearTokens) && cu(y) && ka(y, t, String(e)), !(r != null && r.useAdditionalDayOfYearTokens) && uu(y) && ka(y, t, String(e)), O(_, y, H.localize, j);
    if (T.match(Yp))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + T + "`");
    return y;
  }).join("");
  return I;
}
function Up(e) {
  var t = e.match(Np);
  return t ? t[1].replace(Rp, "'") : e;
}
function Bp(e, t) {
  if (e == null)
    throw new TypeError("assign requires that input parameter not be null or undefined");
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
  return e;
}
function Fp(e) {
  fe(1, arguments);
  var t = we(e), r = t.getDay();
  return r;
}
function Hp(e) {
  fe(1, arguments);
  var t = we(e), r = t.getFullYear(), n = t.getMonth(), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(r, n + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Xt(e) {
  fe(1, arguments);
  var t = we(e), r = t.getHours();
  return r;
}
var Lp = 6048e5;
function $p(e) {
  fe(1, arguments);
  var t = we(e), r = wa(t).getTime() - Tf(t).getTime();
  return Math.round(r / Lp) + 1;
}
function sr(e) {
  fe(1, arguments);
  var t = we(e), r = t.getMinutes();
  return r;
}
function Le(e) {
  fe(1, arguments);
  var t = we(e), r = t.getMonth();
  return r;
}
function mn(e) {
  fe(1, arguments);
  var t = we(e), r = t.getSeconds();
  return r;
}
function jp(e, t) {
  var r, n, a, o, i, l, s, u;
  fe(1, arguments);
  var d = we(e), p = d.getFullYear(), v = cr(), b = Ce((r = (n = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (l = i.options) === null || l === void 0 ? void 0 : l.firstWeekContainsDate) !== null && a !== void 0 ? a : v.firstWeekContainsDate) !== null && n !== void 0 ? n : (s = v.locale) === null || s === void 0 || (u = s.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && r !== void 0 ? r : 1);
  if (!(b >= 1 && b <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var A = /* @__PURE__ */ new Date(0);
  A.setFullYear(p + 1, 0, b), A.setHours(0, 0, 0, 0);
  var M = Zr(A, t), Q = /* @__PURE__ */ new Date(0);
  Q.setFullYear(p, 0, b), Q.setHours(0, 0, 0, 0);
  var S = Zr(Q, t);
  return d.getTime() >= M.getTime() ? p + 1 : d.getTime() >= S.getTime() ? p : p - 1;
}
function Vp(e, t) {
  var r, n, a, o, i, l, s, u;
  fe(1, arguments);
  var d = cr(), p = Ce((r = (n = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (l = i.options) === null || l === void 0 ? void 0 : l.firstWeekContainsDate) !== null && a !== void 0 ? a : d.firstWeekContainsDate) !== null && n !== void 0 ? n : (s = d.locale) === null || s === void 0 || (u = s.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && r !== void 0 ? r : 1), v = jp(e, t), b = /* @__PURE__ */ new Date(0);
  b.setFullYear(v, 0, p), b.setHours(0, 0, 0, 0);
  var A = Zr(b, t);
  return A;
}
var Wp = 6048e5;
function Qp(e, t) {
  fe(1, arguments);
  var r = we(e), n = Zr(r, t).getTime() - Vp(r, t).getTime();
  return Math.round(n / Wp) + 1;
}
function Re(e) {
  return fe(1, arguments), we(e).getFullYear();
}
function hn(e, t) {
  fe(2, arguments);
  var r = we(e), n = we(t);
  return r.getTime() > n.getTime();
}
function $n(e, t) {
  fe(2, arguments);
  var r = we(e), n = we(t);
  return r.getTime() < n.getTime();
}
function ln(e, t) {
  fe(2, arguments);
  var r = we(e), n = we(t);
  return r.getTime() === n.getTime();
}
function Cl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function Gp(e, t) {
  if (e) {
    if (typeof e == "string")
      return Cl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Cl(e, t);
  }
}
function Tl(e, t) {
  var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!r) {
    if (Array.isArray(e) || (r = Gp(e)) || t && e && typeof e.length == "number") {
      r && (e = r);
      var n = 0, a = function() {
      };
      return {
        s: a,
        n: function() {
          return n >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[n++]
          };
        },
        e: function(u) {
          throw u;
        },
        f: a
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var o = !0, i = !1, l;
  return {
    s: function() {
      r = r.call(e);
    },
    n: function() {
      var u = r.next();
      return o = u.done, u;
    },
    e: function(u) {
      i = !0, l = u;
    },
    f: function() {
      try {
        !o && r.return != null && r.return();
      } finally {
        if (i)
          throw l;
      }
    }
  };
}
function me(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Yo(e, t) {
  return Yo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Yo(e, t);
}
function je(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Yo(e, t);
}
function Aa(e) {
  return Aa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Aa(e);
}
function zp() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function qp(e, t) {
  if (t && (Vt(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return me(e);
}
function Ve(e) {
  var t = zp();
  return function() {
    var n = Aa(e), a;
    if (t) {
      var o = Aa(this).constructor;
      a = Reflect.construct(n, arguments, o);
    } else
      a = n.apply(this, arguments);
    return qp(this, a);
  };
}
function Be(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Kp(e, t) {
  if (Vt(e) != "object" || !e)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Vt(n) != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fu(e) {
  var t = Kp(e, "string");
  return Vt(t) == "symbol" ? t : String(t);
}
function Ml(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, fu(n.key), n);
  }
}
function Fe(e, t, r) {
  return t && Ml(e.prototype, t), r && Ml(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function de(e, t, r) {
  return t = fu(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var Xp = 10, pu = /* @__PURE__ */ function() {
  function e() {
    Be(this, e), de(this, "priority", void 0), de(this, "subPriority", 0);
  }
  return Fe(e, [{
    key: "validate",
    value: function(r, n) {
      return !0;
    }
  }]), e;
}(), Zp = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r(n, a, o, i, l) {
    var s;
    return Be(this, r), s = t.call(this), s.value = n, s.validateValue = a, s.setValue = o, s.priority = i, l && (s.subPriority = l), s;
  }
  return Fe(r, [{
    key: "validate",
    value: function(a, o) {
      return this.validateValue(a, this.value, o);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return this.setValue(a, o, this.value, i);
    }
  }]), r;
}(pu), Jp = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", Xp), de(me(n), "subPriority", -1), n;
  }
  return Fe(r, [{
    key: "set",
    value: function(a, o) {
      if (o.timestampIsSet)
        return a;
      var i = /* @__PURE__ */ new Date(0);
      return i.setFullYear(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()), i.setHours(a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds()), i;
    }
  }]), r;
}(pu), Ge = /* @__PURE__ */ function() {
  function e() {
    Be(this, e), de(this, "incompatibleTokens", void 0), de(this, "priority", void 0), de(this, "subPriority", void 0);
  }
  return Fe(e, [{
    key: "run",
    value: function(r, n, a, o) {
      var i = this.parse(r, n, a, o);
      return i ? {
        setter: new Zp(i.value, this.validate, this.set, this.priority, this.subPriority),
        rest: i.rest
      } : null;
    }
  }, {
    key: "validate",
    value: function(r, n, a) {
      return !0;
    }
  }]), e;
}(), ev = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 140), de(me(n), "incompatibleTokens", ["R", "u", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "G":
        case "GG":
        case "GGG":
          return i.era(a, {
            width: "abbreviated"
          }) || i.era(a, {
            width: "narrow"
          });
        case "GGGGG":
          return i.era(a, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return i.era(a, {
            width: "wide"
          }) || i.era(a, {
            width: "abbreviated"
          }) || i.era(a, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return o.era = i, a.setUTCFullYear(i, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), lt = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}, or = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function st(e, t) {
  return e && {
    value: t(e.value),
    rest: e.rest
  };
}
function nt(e, t) {
  var r = t.match(e);
  return r ? {
    value: parseInt(r[0], 10),
    rest: t.slice(r[0].length)
  } : null;
}
function ir(e, t) {
  var r = t.match(e);
  if (!r)
    return null;
  if (r[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  var n = r[1] === "+" ? 1 : -1, a = r[2] ? parseInt(r[2], 10) : 0, o = r[3] ? parseInt(r[3], 10) : 0, i = r[5] ? parseInt(r[5], 10) : 0;
  return {
    value: n * (a * mi + o * vi + i * Pf),
    rest: t.slice(r[0].length)
  };
}
function vu(e) {
  return nt(lt.anyDigitsSigned, e);
}
function it(e, t) {
  switch (e) {
    case 1:
      return nt(lt.singleDigit, t);
    case 2:
      return nt(lt.twoDigits, t);
    case 3:
      return nt(lt.threeDigits, t);
    case 4:
      return nt(lt.fourDigits, t);
    default:
      return nt(new RegExp("^\\d{1," + e + "}"), t);
  }
}
function Da(e, t) {
  switch (e) {
    case 1:
      return nt(lt.singleDigitSigned, t);
    case 2:
      return nt(lt.twoDigitsSigned, t);
    case 3:
      return nt(lt.threeDigitsSigned, t);
    case 4:
      return nt(lt.fourDigitsSigned, t);
    default:
      return nt(new RegExp("^-?\\d{1," + e + "}"), t);
  }
}
function gi(e) {
  switch (e) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function mu(e, t) {
  var r = t > 0, n = r ? t : 1 - t, a;
  if (n <= 50)
    a = e || 100;
  else {
    var o = n + 50, i = Math.floor(o / 100) * 100, l = e >= o % 100;
    a = e + i - (l ? 100 : 0);
  }
  return r ? a : 1 - a;
}
function hu(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
var tv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 130), de(me(n), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      var l = function(u) {
        return {
          year: u,
          isTwoDigitYear: o === "yy"
        };
      };
      switch (o) {
        case "y":
          return st(it(4, a), l);
        case "yo":
          return st(i.ordinalNumber(a, {
            unit: "year"
          }), l);
        default:
          return st(it(o.length, a), l);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o.isTwoDigitYear || o.year > 0;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var l = a.getUTCFullYear();
      if (i.isTwoDigitYear) {
        var s = mu(i.year, l);
        return a.setUTCFullYear(s, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
      }
      var u = !("era" in o) || o.era === 1 ? i.year : 1 - i.year;
      return a.setUTCFullYear(u, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), rv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 130), de(me(n), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      var l = function(u) {
        return {
          year: u,
          isTwoDigitYear: o === "YY"
        };
      };
      switch (o) {
        case "Y":
          return st(it(4, a), l);
        case "Yo":
          return st(i.ordinalNumber(a, {
            unit: "year"
          }), l);
        default:
          return st(it(o.length, a), l);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o.isTwoDigitYear || o.year > 0;
    }
  }, {
    key: "set",
    value: function(a, o, i, l) {
      var s = hi(a, l);
      if (i.isTwoDigitYear) {
        var u = mu(i.year, s);
        return a.setUTCFullYear(u, 0, l.firstWeekContainsDate), a.setUTCHours(0, 0, 0, 0), Jr(a, l);
      }
      var d = !("era" in o) || o.era === 1 ? i.year : 1 - i.year;
      return a.setUTCFullYear(d, 0, l.firstWeekContainsDate), a.setUTCHours(0, 0, 0, 0), Jr(a, l);
    }
  }]), r;
}(Ge), nv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 130), de(me(n), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o) {
      return Da(o === "R" ? 4 : o.length, a);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var l = /* @__PURE__ */ new Date(0);
      return l.setUTCFullYear(i, 0, 4), l.setUTCHours(0, 0, 0, 0), vn(l);
    }
  }]), r;
}(Ge), av = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 130), de(me(n), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o) {
      return Da(o === "u" ? 4 : o.length, a);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCFullYear(i, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), ov = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 120), de(me(n), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "Q":
        case "QQ":
          return it(o.length, a);
        case "Qo":
          return i.ordinalNumber(a, {
            unit: "quarter"
          });
        case "QQQ":
          return i.quarter(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return i.quarter(a, {
            width: "wide",
            context: "formatting"
          }) || i.quarter(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 4;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth((i - 1) * 3, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), iv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 120), de(me(n), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "q":
        case "qq":
          return it(o.length, a);
        case "qo":
          return i.ordinalNumber(a, {
            unit: "quarter"
          });
        case "qqq":
          return i.quarter(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return i.quarter(a, {
            width: "wide",
            context: "standalone"
          }) || i.quarter(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 4;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth((i - 1) * 3, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), lv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]), de(me(n), "priority", 110), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      var l = function(u) {
        return u - 1;
      };
      switch (o) {
        case "M":
          return st(nt(lt.month, a), l);
        case "MM":
          return st(it(2, a), l);
        case "Mo":
          return st(i.ordinalNumber(a, {
            unit: "month"
          }), l);
        case "MMM":
          return i.month(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.month(a, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return i.month(a, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return i.month(a, {
            width: "wide",
            context: "formatting"
          }) || i.month(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.month(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth(i, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), sv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 110), de(me(n), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      var l = function(u) {
        return u - 1;
      };
      switch (o) {
        case "L":
          return st(nt(lt.month, a), l);
        case "LL":
          return st(it(2, a), l);
        case "Lo":
          return st(i.ordinalNumber(a, {
            unit: "month"
          }), l);
        case "LLL":
          return i.month(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.month(a, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return i.month(a, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return i.month(a, {
            width: "wide",
            context: "standalone"
          }) || i.month(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.month(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth(i, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge);
function uv(e, t, r) {
  fe(2, arguments);
  var n = we(e), a = Ce(t), o = lu(n, r) - a;
  return n.setUTCDate(n.getUTCDate() - o * 7), n;
}
var cv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 100), de(me(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "w":
          return nt(lt.week, a);
        case "wo":
          return i.ordinalNumber(a, {
            unit: "week"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 53;
    }
  }, {
    key: "set",
    value: function(a, o, i, l) {
      return Jr(uv(a, i, l), l);
    }
  }]), r;
}(Ge);
function dv(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t), a = iu(r) - n;
  return r.setUTCDate(r.getUTCDate() - a * 7), r;
}
var fv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 100), de(me(n), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "I":
          return nt(lt.week, a);
        case "Io":
          return i.ordinalNumber(a, {
            unit: "week"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 53;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return vn(dv(a, i));
    }
  }]), r;
}(Ge), pv = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], vv = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], mv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 90), de(me(n), "subPriority", 1), de(me(n), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "d":
          return nt(lt.date, a);
        case "do":
          return i.ordinalNumber(a, {
            unit: "date"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      var i = a.getUTCFullYear(), l = hu(i), s = a.getUTCMonth();
      return l ? o >= 1 && o <= vv[s] : o >= 1 && o <= pv[s];
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCDate(i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), hv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 90), de(me(n), "subpriority", 1), de(me(n), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "D":
        case "DD":
          return nt(lt.dayOfYear, a);
        case "Do":
          return i.ordinalNumber(a, {
            unit: "date"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      var i = a.getUTCFullYear(), l = hu(i);
      return l ? o >= 1 && o <= 366 : o >= 1 && o <= 365;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth(0, i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge);
function yi(e, t, r) {
  var n, a, o, i, l, s, u, d;
  fe(2, arguments);
  var p = cr(), v = Ce((n = (a = (o = (i = r == null ? void 0 : r.weekStartsOn) !== null && i !== void 0 ? i : r == null || (l = r.locale) === null || l === void 0 || (s = l.options) === null || s === void 0 ? void 0 : s.weekStartsOn) !== null && o !== void 0 ? o : p.weekStartsOn) !== null && a !== void 0 ? a : (u = p.locale) === null || u === void 0 || (d = u.options) === null || d === void 0 ? void 0 : d.weekStartsOn) !== null && n !== void 0 ? n : 0);
  if (!(v >= 0 && v <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var b = we(e), A = Ce(t), M = b.getUTCDay(), Q = A % 7, S = (Q + 7) % 7, R = (S < v ? 7 : 0) + A - M;
  return b.setUTCDate(b.getUTCDate() + R), b;
}
var gv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 90), de(me(n), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "E":
        case "EE":
        case "EEE":
          return i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(a, o, i, l) {
      return a = yi(a, i, l), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), yv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 90), de(me(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i, l) {
      var s = function(d) {
        var p = Math.floor((d - 1) / 7) * 7;
        return (d + l.weekStartsOn + 6) % 7 + p;
      };
      switch (o) {
        case "e":
        case "ee":
          return st(it(o.length, a), s);
        case "eo":
          return st(i.ordinalNumber(a, {
            unit: "day"
          }), s);
        case "eee":
          return i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(a, o, i, l) {
      return a = yi(a, i, l), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), bv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 90), de(me(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i, l) {
      var s = function(d) {
        var p = Math.floor((d - 1) / 7) * 7;
        return (d + l.weekStartsOn + 6) % 7 + p;
      };
      switch (o) {
        case "c":
        case "cc":
          return st(it(o.length, a), s);
        case "co":
          return st(i.ordinalNumber(a, {
            unit: "day"
          }), s);
        case "ccc":
          return i.day(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return i.day(a, {
            width: "wide",
            context: "standalone"
          }) || i.day(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(a, o, i, l) {
      return a = yi(a, i, l), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge);
function wv(e, t) {
  fe(2, arguments);
  var r = Ce(t);
  r % 7 === 0 && (r = r - 7);
  var n = 1, a = we(e), o = a.getUTCDay(), i = r % 7, l = (i + 7) % 7, s = (l < n ? 7 : 0) + r - o;
  return a.setUTCDate(a.getUTCDate() + s), a;
}
var _v = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 90), de(me(n), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      var l = function(u) {
        return u === 0 ? 7 : u;
      };
      switch (o) {
        case "i":
        case "ii":
          return it(o.length, a);
        case "io":
          return i.ordinalNumber(a, {
            unit: "day"
          });
        case "iii":
          return st(i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), l);
        case "iiiii":
          return st(i.day(a, {
            width: "narrow",
            context: "formatting"
          }), l);
        case "iiiiii":
          return st(i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), l);
        case "iiii":
        default:
          return st(i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), l);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 7;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a = wv(a, i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ge), xv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 80), de(me(n), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "a":
        case "aa":
        case "aaa":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCHours(gi(i), 0, 0, 0), a;
    }
  }]), r;
}(Ge), kv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 80), de(me(n), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "b":
        case "bb":
        case "bbb":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCHours(gi(i), 0, 0, 0), a;
    }
  }]), r;
}(Ge), Av = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 80), de(me(n), "incompatibleTokens", ["a", "b", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "B":
        case "BB":
        case "BBB":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCHours(gi(i), 0, 0, 0), a;
    }
  }]), r;
}(Ge), Dv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 70), de(me(n), "incompatibleTokens", ["H", "K", "k", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "h":
          return nt(lt.hour12h, a);
        case "ho":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 12;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var l = a.getUTCHours() >= 12;
      return l && i < 12 ? a.setUTCHours(i + 12, 0, 0, 0) : !l && i === 12 ? a.setUTCHours(0, 0, 0, 0) : a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), r;
}(Ge), Cv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 70), de(me(n), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "H":
          return nt(lt.hour23h, a);
        case "Ho":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 23;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), r;
}(Ge), Tv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 70), de(me(n), "incompatibleTokens", ["h", "H", "k", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "K":
          return nt(lt.hour11h, a);
        case "Ko":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var l = a.getUTCHours() >= 12;
      return l && i < 12 ? a.setUTCHours(i + 12, 0, 0, 0) : a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), r;
}(Ge), Mv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 70), de(me(n), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "k":
          return nt(lt.hour24h, a);
        case "ko":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 24;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var l = i <= 24 ? i % 24 : i;
      return a.setUTCHours(l, 0, 0, 0), a;
    }
  }]), r;
}(Ge), Ov = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 60), de(me(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "m":
          return nt(lt.minute, a);
        case "mo":
          return i.ordinalNumber(a, {
            unit: "minute"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 59;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMinutes(i, 0, 0), a;
    }
  }]), r;
}(Ge), Pv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 50), de(me(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "s":
          return nt(lt.second, a);
        case "so":
          return i.ordinalNumber(a, {
            unit: "second"
          });
        default:
          return it(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 59;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCSeconds(i, 0), a;
    }
  }]), r;
}(Ge), Sv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 30), de(me(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o) {
      var i = function(s) {
        return Math.floor(s * Math.pow(10, -o.length + 3));
      };
      return st(it(o.length, a), i);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMilliseconds(i), a;
    }
  }]), r;
}(Ge), Iv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 10), de(me(n), "incompatibleTokens", ["t", "T", "x"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o) {
      switch (o) {
        case "X":
          return ir(or.basicOptionalMinutes, a);
        case "XX":
          return ir(or.basic, a);
        case "XXXX":
          return ir(or.basicOptionalSeconds, a);
        case "XXXXX":
          return ir(or.extendedOptionalSeconds, a);
        case "XXX":
        default:
          return ir(or.extended, a);
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return o.timestampIsSet ? a : new Date(a.getTime() - i);
    }
  }]), r;
}(Ge), Ev = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 10), de(me(n), "incompatibleTokens", ["t", "T", "X"]), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a, o) {
      switch (o) {
        case "x":
          return ir(or.basicOptionalMinutes, a);
        case "xx":
          return ir(or.basic, a);
        case "xxxx":
          return ir(or.basicOptionalSeconds, a);
        case "xxxxx":
          return ir(or.extendedOptionalSeconds, a);
        case "xxx":
        default:
          return ir(or.extended, a);
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return o.timestampIsSet ? a : new Date(a.getTime() - i);
    }
  }]), r;
}(Ge), Nv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 40), de(me(n), "incompatibleTokens", "*"), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a) {
      return vu(a);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return [new Date(i * 1e3), {
        timestampIsSet: !0
      }];
    }
  }]), r;
}(Ge), Rv = /* @__PURE__ */ function(e) {
  je(r, e);
  var t = Ve(r);
  function r() {
    var n;
    Be(this, r);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), de(me(n), "priority", 20), de(me(n), "incompatibleTokens", "*"), n;
  }
  return Fe(r, [{
    key: "parse",
    value: function(a) {
      return vu(a);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return [new Date(i), {
        timestampIsSet: !0
      }];
    }
  }]), r;
}(Ge), Yv = {
  G: new ev(),
  y: new tv(),
  Y: new rv(),
  R: new nv(),
  u: new av(),
  Q: new ov(),
  q: new iv(),
  M: new lv(),
  L: new sv(),
  w: new cv(),
  I: new fv(),
  d: new mv(),
  D: new hv(),
  E: new gv(),
  e: new yv(),
  c: new bv(),
  i: new _v(),
  a: new xv(),
  b: new kv(),
  B: new Av(),
  h: new Dv(),
  H: new Cv(),
  K: new Tv(),
  k: new Mv(),
  m: new Ov(),
  s: new Pv(),
  S: new Sv(),
  X: new Iv(),
  x: new Ev(),
  t: new Nv(),
  T: new Rv()
}, Uv = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Bv = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Fv = /^'([^]*?)'?$/, Hv = /''/g, Lv = /\S/, $v = /[a-zA-Z]/;
function Uo(e, t, r, n) {
  var a, o, i, l, s, u, d, p, v, b, A, M, Q, S, R, F, C, N;
  fe(3, arguments);
  var W = String(e), H = String(t), z = cr(), G = (a = (o = n == null ? void 0 : n.locale) !== null && o !== void 0 ? o : z.locale) !== null && a !== void 0 ? a : du;
  if (!G.match)
    throw new RangeError("locale must contain match property");
  var g = Ce((i = (l = (s = (u = n == null ? void 0 : n.firstWeekContainsDate) !== null && u !== void 0 ? u : n == null || (d = n.locale) === null || d === void 0 || (p = d.options) === null || p === void 0 ? void 0 : p.firstWeekContainsDate) !== null && s !== void 0 ? s : z.firstWeekContainsDate) !== null && l !== void 0 ? l : (v = z.locale) === null || v === void 0 || (b = v.options) === null || b === void 0 ? void 0 : b.firstWeekContainsDate) !== null && i !== void 0 ? i : 1);
  if (!(g >= 1 && g <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var E = Ce((A = (M = (Q = (S = n == null ? void 0 : n.weekStartsOn) !== null && S !== void 0 ? S : n == null || (R = n.locale) === null || R === void 0 || (F = R.options) === null || F === void 0 ? void 0 : F.weekStartsOn) !== null && Q !== void 0 ? Q : z.weekStartsOn) !== null && M !== void 0 ? M : (C = z.locale) === null || C === void 0 || (N = C.options) === null || N === void 0 ? void 0 : N.weekStartsOn) !== null && A !== void 0 ? A : 0);
  if (!(E >= 0 && E <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (H === "")
    return W === "" ? we(r) : /* @__PURE__ */ new Date(NaN);
  var _ = {
    firstWeekContainsDate: g,
    weekStartsOn: E,
    locale: G
  }, j = [new Jp()], I = H.match(Bv).map(function(he) {
    var K = he[0];
    if (K in Ro) {
      var De = Ro[K];
      return De(he, G.formatLong);
    }
    return he;
  }).join("").match(Uv), y = [], T = Tl(I), O;
  try {
    var B = function() {
      var K = O.value;
      !(n != null && n.useAdditionalWeekYearTokens) && cu(K) && ka(K, H, e), !(n != null && n.useAdditionalDayOfYearTokens) && uu(K) && ka(K, H, e);
      var De = K[0], ve = Yv[De];
      if (ve) {
        var c = ve.incompatibleTokens;
        if (Array.isArray(c)) {
          var m = y.find(function(D) {
            return c.includes(D.token) || D.token === De;
          });
          if (m)
            throw new RangeError("The format string mustn't contain `".concat(m.fullToken, "` and `").concat(K, "` at the same time"));
        } else if (ve.incompatibleTokens === "*" && y.length > 0)
          throw new RangeError("The format string mustn't contain `".concat(K, "` and any other token at the same time"));
        y.push({
          token: De,
          fullToken: K
        });
        var P = ve.run(W, K, G.match, _);
        if (!P)
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        j.push(P.setter), W = P.rest;
      } else {
        if (De.match($v))
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + De + "`");
        if (K === "''" ? K = "'" : De === "'" && (K = jv(K)), W.indexOf(K) === 0)
          W = W.slice(K.length);
        else
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
      }
    };
    for (T.s(); !(O = T.n()).done; ) {
      var h = B();
      if (Vt(h) === "object")
        return h.v;
    }
  } catch (he) {
    T.e(he);
  } finally {
    T.f();
  }
  if (W.length > 0 && Lv.test(W))
    return /* @__PURE__ */ new Date(NaN);
  var f = j.map(function(he) {
    return he.priority;
  }).sort(function(he, K) {
    return K - he;
  }).filter(function(he, K, De) {
    return De.indexOf(he) === K;
  }).map(function(he) {
    return j.filter(function(K) {
      return K.priority === he;
    }).sort(function(K, De) {
      return De.subPriority - K.subPriority;
    });
  }).map(function(he) {
    return he[0];
  }), Y = we(r);
  if (isNaN(Y.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  var U = au(Y, _a(Y)), ae = {}, le = Tl(f), L;
  try {
    for (le.s(); !(L = le.n()).done; ) {
      var w = L.value;
      if (!w.validate(U, _))
        return /* @__PURE__ */ new Date(NaN);
      var pe = w.set(U, ae, _);
      Array.isArray(pe) ? (U = pe[0], Bp(ae, pe[1])) : U = pe;
    }
  } catch (he) {
    le.e(he);
  } finally {
    le.f();
  }
  return U;
}
function jv(e) {
  return e.match(Fv)[1].replace(Hv, "'");
}
function Ol(e, t) {
  fe(2, arguments);
  var r = Ln(e), n = Ln(t);
  return r.getTime() === n.getTime();
}
function Vv(e, t) {
  fe(2, arguments);
  var r = Ce(t);
  return fr(e, -r);
}
function Ar(e, t) {
  var r;
  fe(1, arguments);
  var n = Ce((r = t == null ? void 0 : t.additionalDigits) !== null && r !== void 0 ? r : 2);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var a = zv(e), o;
  if (a.date) {
    var i = qv(a.date, n);
    o = Kv(i.restDateString, i.year);
  }
  if (!o || isNaN(o.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  var l = o.getTime(), s = 0, u;
  if (a.time && (s = Xv(a.time), isNaN(s)))
    return /* @__PURE__ */ new Date(NaN);
  if (a.timezone) {
    if (u = Zv(a.timezone), isNaN(u))
      return /* @__PURE__ */ new Date(NaN);
  } else {
    var d = new Date(l + s), p = /* @__PURE__ */ new Date(0);
    return p.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()), p.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()), p;
  }
  return new Date(l + s + u);
}
var na = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, Wv = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, Qv = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Gv = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function zv(e) {
  var t = {}, r = e.split(na.dateTimeDelimiter), n;
  if (r.length > 2)
    return t;
  if (/:/.test(r[0]) ? n = r[0] : (t.date = r[0], n = r[1], na.timeZoneDelimiter.test(t.date) && (t.date = e.split(na.timeZoneDelimiter)[0], n = e.substr(t.date.length, e.length))), n) {
    var a = na.timezone.exec(n);
    a ? (t.time = n.replace(a[1], ""), t.timezone = a[1]) : t.time = n;
  }
  return t;
}
function qv(e, t) {
  var r = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"), n = e.match(r);
  if (!n)
    return {
      year: NaN,
      restDateString: ""
    };
  var a = n[1] ? parseInt(n[1]) : null, o = n[2] ? parseInt(n[2]) : null;
  return {
    year: o === null ? a : o * 100,
    restDateString: e.slice((n[1] || n[2]).length)
  };
}
function Kv(e, t) {
  if (t === null)
    return /* @__PURE__ */ new Date(NaN);
  var r = e.match(Wv);
  if (!r)
    return /* @__PURE__ */ new Date(NaN);
  var n = !!r[4], a = Cn(r[1]), o = Cn(r[2]) - 1, i = Cn(r[3]), l = Cn(r[4]), s = Cn(r[5]) - 1;
  if (n)
    return nm(t, l, s) ? Jv(t, l, s) : /* @__PURE__ */ new Date(NaN);
  var u = /* @__PURE__ */ new Date(0);
  return !tm(t, o, i) || !rm(t, a) ? /* @__PURE__ */ new Date(NaN) : (u.setUTCFullYear(t, o, Math.max(a, i)), u);
}
function Cn(e) {
  return e ? parseInt(e) : 1;
}
function Xv(e) {
  var t = e.match(Qv);
  if (!t)
    return NaN;
  var r = no(t[1]), n = no(t[2]), a = no(t[3]);
  return am(r, n, a) ? r * mi + n * vi + a * 1e3 : NaN;
}
function no(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function Zv(e) {
  if (e === "Z")
    return 0;
  var t = e.match(Gv);
  if (!t)
    return 0;
  var r = t[1] === "+" ? -1 : 1, n = parseInt(t[2]), a = t[3] && parseInt(t[3]) || 0;
  return om(n, a) ? r * (n * mi + a * vi) : NaN;
}
function Jv(e, t, r) {
  var n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(e, 0, 4);
  var a = n.getUTCDay() || 7, o = (t - 1) * 7 + r + 1 - a;
  return n.setUTCDate(n.getUTCDate() + o), n;
}
var em = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function gu(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function tm(e, t, r) {
  return t >= 0 && t <= 11 && r >= 1 && r <= (em[t] || (gu(e) ? 29 : 28));
}
function rm(e, t) {
  return t >= 1 && t <= (gu(e) ? 366 : 365);
}
function nm(e, t, r) {
  return t >= 1 && t <= 53 && r >= 0 && r <= 6;
}
function am(e, t, r) {
  return e === 24 ? t === 0 && r === 0 : r >= 0 && r < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function om(e, t) {
  return t >= 0 && t <= 59;
}
function yu(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t), a = r.getFullYear(), o = r.getDate(), i = /* @__PURE__ */ new Date(0);
  i.setFullYear(a, n, 15), i.setHours(0, 0, 0, 0);
  var l = Hp(i);
  return r.setMonth(n, Math.min(o, l)), r;
}
function tt(e, t) {
  if (fe(2, arguments), Vt(t) !== "object" || t === null)
    throw new RangeError("values parameter must be an object");
  var r = we(e);
  return isNaN(r.getTime()) ? /* @__PURE__ */ new Date(NaN) : (t.year != null && r.setFullYear(t.year), t.month != null && (r = yu(r, t.month)), t.date != null && r.setDate(Ce(t.date)), t.hours != null && r.setHours(Ce(t.hours)), t.minutes != null && r.setMinutes(Ce(t.minutes)), t.seconds != null && r.setSeconds(Ce(t.seconds)), t.milliseconds != null && r.setMilliseconds(Ce(t.milliseconds)), r);
}
function bu(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t);
  return r.setHours(n), r;
}
function bi(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t);
  return r.setMilliseconds(n), r;
}
function wu(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t);
  return r.setMinutes(n), r;
}
function wi(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t);
  return r.setSeconds(n), r;
}
function lr(e, t) {
  fe(2, arguments);
  var r = we(e), n = Ce(t);
  return isNaN(r.getTime()) ? /* @__PURE__ */ new Date(NaN) : (r.setFullYear(n), r);
}
function gn(e, t) {
  fe(2, arguments);
  var r = Ce(t);
  return qt(e, -r);
}
function im(e, t) {
  if (fe(2, arguments), !t || Vt(t) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var r = t.years ? Ce(t.years) : 0, n = t.months ? Ce(t.months) : 0, a = t.weeks ? Ce(t.weeks) : 0, o = t.days ? Ce(t.days) : 0, i = t.hours ? Ce(t.hours) : 0, l = t.minutes ? Ce(t.minutes) : 0, s = t.seconds ? Ce(t.seconds) : 0, u = gn(e, n + r * 12), d = Vv(u, o + a * 7), p = l + i * 60, v = s + p * 60, b = v * 1e3, A = new Date(d.getTime() - b);
  return A;
}
function _u(e, t) {
  fe(2, arguments);
  var r = Ce(t);
  return pi(e, -r);
}
function Wn() {
  return $(), Z(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      be("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      be("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      be("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      be("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
Wn.compatConfig = {
  MODE: 3
};
function xu() {
  return $(), Z(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      be("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      be("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
xu.compatConfig = {
  MODE: 3
};
function _i() {
  return $(), Z(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      be("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
_i.compatConfig = {
  MODE: 3
};
function xi() {
  return $(), Z(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      be("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
xi.compatConfig = {
  MODE: 3
};
function ki() {
  return $(), Z(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      be("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      be("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
ki.compatConfig = {
  MODE: 3
};
function Ai() {
  return $(), Z(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      be("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Ai.compatConfig = {
  MODE: 3
};
function Di() {
  return $(), Z(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      be("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Di.compatConfig = {
  MODE: 3
};
function Ci(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ku = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ku);
var lm = ku.exports, Bo = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n) {
    if (n === null || n === !0 || n === !1)
      return NaN;
    var a = Number(n);
    return isNaN(a) ? a : a < 0 ? Math.ceil(a) : Math.floor(a);
  }
  e.exports = t.default;
})(Bo, Bo.exports);
var sm = Bo.exports;
const um = /* @__PURE__ */ Ci(sm);
var Fo = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n) {
    var a = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
    return a.setUTCFullYear(n.getFullYear()), n.getTime() - a.getTime();
  }
  e.exports = t.default;
})(Fo, Fo.exports);
var cm = Fo.exports;
const Pl = /* @__PURE__ */ Ci(cm);
function dm(e, t) {
  var r = mm(t);
  return r.formatToParts ? pm(r, e) : vm(r, e);
}
var fm = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function pm(e, t) {
  try {
    for (var r = e.formatToParts(t), n = [], a = 0; a < r.length; a++) {
      var o = fm[r[a].type];
      o >= 0 && (n[o] = parseInt(r[a].value, 10));
    }
    return n;
  } catch (i) {
    if (i instanceof RangeError)
      return [NaN];
    throw i;
  }
}
function vm(e, t) {
  var r = e.format(t).replace(/\u200E/g, ""), n = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(r);
  return [n[3], n[1], n[2], n[4], n[5], n[6]];
}
var ao = {};
function mm(e) {
  if (!ao[e]) {
    var t = new Intl.DateTimeFormat("en-US", {
      hour12: !1,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), r = t === "06/25/2014, 00:00:00" || t === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    ao[e] = r ? new Intl.DateTimeFormat("en-US", {
      hour12: !1,
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return ao[e];
}
function Ti(e, t, r, n, a, o, i) {
  var l = /* @__PURE__ */ new Date(0);
  return l.setUTCFullYear(e, t, r), l.setUTCHours(n, a, o, i), l;
}
var Sl = 36e5, hm = 6e4, oo = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function Mi(e, t, r) {
  var n, a;
  if (e === "" || (n = oo.timezoneZ.exec(e), n))
    return 0;
  var o;
  if (n = oo.timezoneHH.exec(e), n)
    return o = parseInt(n[1], 10), Il(o) ? -(o * Sl) : NaN;
  if (n = oo.timezoneHHMM.exec(e), n) {
    o = parseInt(n[1], 10);
    var i = parseInt(n[2], 10);
    return Il(o, i) ? (a = Math.abs(o) * Sl + i * hm, o > 0 ? -a : a) : NaN;
  }
  if (bm(e)) {
    t = new Date(t || Date.now());
    var l = r ? t : gm(t), s = Ho(l, e), u = r ? s : ym(t, s, e);
    return -u;
  }
  return NaN;
}
function gm(e) {
  return Ti(
    e.getFullYear(),
    e.getMonth(),
    e.getDate(),
    e.getHours(),
    e.getMinutes(),
    e.getSeconds(),
    e.getMilliseconds()
  );
}
function Ho(e, t) {
  var r = dm(e, t), n = Ti(
    r[0],
    r[1] - 1,
    r[2],
    r[3] % 24,
    r[4],
    r[5],
    0
  ).getTime(), a = e.getTime(), o = a % 1e3;
  return a -= o >= 0 ? o : 1e3 + o, n - a;
}
function ym(e, t, r) {
  var n = e.getTime(), a = n - t, o = Ho(new Date(a), r);
  if (t === o)
    return t;
  a -= o - t;
  var i = Ho(new Date(a), r);
  return o === i ? o : Math.max(o, i);
}
function Il(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
var El = {};
function bm(e) {
  if (El[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), El[e] = !0, !0;
  } catch {
    return !1;
  }
}
var Au = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, io = 36e5, Nl = 6e4, wm = 2, Tt = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  plainTime: /:/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: Au
};
function Lo(e, t) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  var r = t || {}, n = r.additionalDigits == null ? wm : um(r.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var a = _m(e), o = xm(a.date, n), i = o.year, l = o.restDateString, s = km(l, i);
  if (isNaN(s))
    return /* @__PURE__ */ new Date(NaN);
  if (s) {
    var u = s.getTime(), d = 0, p;
    if (a.time && (d = Am(a.time), isNaN(d)))
      return /* @__PURE__ */ new Date(NaN);
    if (a.timeZone || r.timeZone) {
      if (p = Mi(a.timeZone || r.timeZone, new Date(u + d)), isNaN(p))
        return /* @__PURE__ */ new Date(NaN);
    } else
      p = Pl(new Date(u + d)), p = Pl(new Date(u + d + p));
    return new Date(u + d + p);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function _m(e) {
  var t = {}, r = Tt.dateTimePattern.exec(e), n;
  if (r ? (t.date = r[1], n = r[3]) : (r = Tt.datePattern.exec(e), r ? (t.date = r[1], n = r[2]) : (t.date = null, n = e)), n) {
    var a = Tt.timeZone.exec(n);
    a ? (t.time = n.replace(a[1], ""), t.timeZone = a[1].trim()) : t.time = n;
  }
  return t;
}
function xm(e, t) {
  var r = Tt.YYY[t], n = Tt.YYYYY[t], a;
  if (a = Tt.YYYY.exec(e) || n.exec(e), a) {
    var o = a[1];
    return {
      year: parseInt(o, 10),
      restDateString: e.slice(o.length)
    };
  }
  if (a = Tt.YY.exec(e) || r.exec(e), a) {
    var i = a[1];
    return {
      year: parseInt(i, 10) * 100,
      restDateString: e.slice(i.length)
    };
  }
  return {
    year: null
  };
}
function km(e, t) {
  if (t === null)
    return null;
  var r, n, a, o;
  if (e.length === 0)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  if (r = Tt.MM.exec(e), r)
    return n = /* @__PURE__ */ new Date(0), a = parseInt(r[1], 10) - 1, Yl(t, a) ? (n.setUTCFullYear(t, a), n) : /* @__PURE__ */ new Date(NaN);
  if (r = Tt.DDD.exec(e), r) {
    n = /* @__PURE__ */ new Date(0);
    var i = parseInt(r[1], 10);
    return Tm(t, i) ? (n.setUTCFullYear(t, 0, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Tt.MMDD.exec(e), r) {
    n = /* @__PURE__ */ new Date(0), a = parseInt(r[1], 10) - 1;
    var l = parseInt(r[2], 10);
    return Yl(t, a, l) ? (n.setUTCFullYear(t, a, l), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Tt.Www.exec(e), r)
    return o = parseInt(r[1], 10) - 1, Ul(t, o) ? Rl(t, o) : /* @__PURE__ */ new Date(NaN);
  if (r = Tt.WwwD.exec(e), r) {
    o = parseInt(r[1], 10) - 1;
    var s = parseInt(r[2], 10) - 1;
    return Ul(t, o, s) ? Rl(t, o, s) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Am(e) {
  var t, r, n;
  if (t = Tt.HH.exec(e), t)
    return r = parseFloat(t[1].replace(",", ".")), lo(r) ? r % 24 * io : NaN;
  if (t = Tt.HHMM.exec(e), t)
    return r = parseInt(t[1], 10), n = parseFloat(t[2].replace(",", ".")), lo(r, n) ? r % 24 * io + n * Nl : NaN;
  if (t = Tt.HHMMSS.exec(e), t) {
    r = parseInt(t[1], 10), n = parseInt(t[2], 10);
    var a = parseFloat(t[3].replace(",", "."));
    return lo(r, n, a) ? r % 24 * io + n * Nl + a * 1e3 : NaN;
  }
  return null;
}
function Rl(e, t, r) {
  t = t || 0, r = r || 0;
  var n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(e, 0, 4);
  var a = n.getUTCDay() || 7, o = t * 7 + r + 1 - a;
  return n.setUTCDate(n.getUTCDate() + o), n;
}
var Dm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Cm = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Du(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Yl(e, t, r) {
  if (t < 0 || t > 11)
    return !1;
  if (r != null) {
    if (r < 1)
      return !1;
    var n = Du(e);
    if (n && r > Cm[t] || !n && r > Dm[t])
      return !1;
  }
  return !0;
}
function Tm(e, t) {
  if (t < 1)
    return !1;
  var r = Du(e);
  return !(r && t > 366 || !r && t > 365);
}
function Ul(e, t, r) {
  return !(t < 0 || t > 52 || r != null && (r < 0 || r > 6));
}
function lo(e, t, r) {
  return !(e != null && (e < 0 || e >= 25) || t != null && (t < 0 || t >= 60) || r != null && (r < 0 || r >= 60));
}
var $o = { exports: {} }, jo = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n, a) {
    if (n == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var o in a)
      Object.prototype.hasOwnProperty.call(a, o) && (n[o] = a[o]);
    return n;
  }
  e.exports = t.default;
})(jo, jo.exports);
var Mm = jo.exports;
(function(e, t) {
  var r = lm.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = a;
  var n = r(Mm);
  function a(o) {
    return (0, n.default)({}, o);
  }
  e.exports = t.default;
})($o, $o.exports);
var Om = $o.exports;
const Pm = /* @__PURE__ */ Ci(Om);
function Sm(e, t, r) {
  var n = Lo(e, r), a = Mi(t, n, !0), o = new Date(n.getTime() - a), i = /* @__PURE__ */ new Date(0);
  return i.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), i.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), i;
}
function Im(e, t, r) {
  if (typeof e == "string" && !e.match(Au)) {
    var n = Pm(r);
    return n.timeZone = t, Lo(e, n);
  }
  var a = Lo(e, r), o = Ti(
    a.getFullYear(),
    a.getMonth(),
    a.getDate(),
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
    a.getMilliseconds()
  ).getTime(), i = Mi(t, new Date(o));
  return new Date(o + i);
}
function Bl(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function Em(e) {
  return (t) => Kt(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
const Nm = (e, t, r) => {
  const n = [1, 2, 3, 4, 5, 6, 7];
  let a;
  if (e !== null)
    try {
      a = n.map(Em(e));
    } catch {
      a = n.map(Bl(t));
    }
  else
    a = n.map(Bl(t));
  const o = a.slice(0, r), i = a.slice(r + 1, a.length);
  return [a[r]].concat(...i).concat(...o);
}, Oi = (e, t) => {
  const r = [];
  for (let n = +e[0]; n <= +e[1]; n++)
    r.push({ value: +n, text: `${n}` });
  return t ? r.reverse() : r;
}, Cu = (e, t, r) => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((o) => {
    const i = o < 10 ? `0${o}` : o;
    return /* @__PURE__ */ new Date(`2017-${i}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const o = r === "long" ? "MMMM" : "MMM";
      return n.map((i, l) => {
        const s = Kt(i, o, { locale: e });
        return {
          text: s.charAt(0).toUpperCase() + s.substring(1),
          value: l
        };
      });
    } catch {
    }
  const a = new Intl.DateTimeFormat(t, { month: r, timeZone: "UTC" });
  return n.map((o, i) => {
    const l = a.format(o);
    return {
      text: l.charAt(0).toUpperCase() + l.substring(1),
      value: i
    };
  });
}, Rm = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e], ft = (e) => {
  const t = k(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
}, Ym = (e) => Object.assign({ type: "dot" }, e), Tu = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : !1, Ca = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
}, mt = (e) => e, Fl = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e, Hl = (e) => e === null, Um = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
}, Bm = (e) => {
  const t = [], r = (n) => n.filter((a) => a);
  for (let n = 0; n < e.length; n += 3) {
    const a = [e[n], e[n + 1], e[n + 2]];
    t.push(r(a));
  }
  return t;
}, jn = (e, t, r) => {
  const n = r ?? r === 0, a = t ?? t === 0;
  if (!n && !a)
    return !1;
  const o = +r, i = +t;
  return n && a ? +e > o || +e < i : n ? +e > o : a ? +e < i : !1;
}, yn = (e, t) => Bm(e).map((r) => r.map((n) => {
  const { active: a, disabled: o, isBetween: i, highlighted: l } = t(n);
  return {
    ...n,
    active: a,
    disabled: o,
    className: {
      dp__overlay_cell_active: a,
      dp__overlay_cell: !a,
      dp__overlay_cell_disabled: o,
      dp__overlay_cell_pad: !0,
      dp__overlay_cell_active_disabled: o && a,
      dp__cell_in_between: i,
      "dp--highlighted": l
    }
  };
})), Pr = (e, t, r = !1) => {
  e && t.allowStopPropagation && (r && e.stopImmediatePropagation(), e.stopPropagation());
}, Fm = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function Hm(e, t) {
  let r = [...document.querySelectorAll(Fm())];
  r = r.filter((a) => !e.contains(a) || a.hasAttribute("data-datepicker-instance"));
  const n = r.indexOf(e);
  if (n >= 0 && (t ? n - 1 >= 0 : n + 1 <= r.length))
    return r[n + (t ? -1 : 1)];
}
const Lm = (e, t) => {
  let r;
  return function(...n) {
    clearTimeout(r), r = setTimeout(() => {
      e(...n);
    }, t);
  };
}, Ll = (e, t, r, n, a) => {
  const o = Uo(e, t.slice(0, e.length), /* @__PURE__ */ new Date());
  return vr(o) && nu(o) ? n || a ? o : tt(o, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
}, $m = (e, t, r, n, a) => {
  const o = Array.isArray(r) ? r[0] : r;
  if (typeof t == "string")
    return Ll(e, t, o, n, a);
  if (Array.isArray(t)) {
    let i = null;
    for (const l of t)
      if (i = Ll(e, l, o, n, a), i)
        break;
    return i;
  }
  return typeof t == "function" ? t(e) : null;
}, X = (e) => e ? new Date(e) : /* @__PURE__ */ new Date(), jm = (e, t, r) => {
  if (t) {
    const a = (e.getMonth() + 1).toString().padStart(2, "0"), o = e.getDate().toString().padStart(2, "0"), i = e.getHours().toString().padStart(2, "0"), l = e.getMinutes().toString().padStart(2, "0"), s = r ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${a}-${o}T${i}:${l}:${s}.000Z`;
  }
  const n = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(n).toISOString();
}, Nt = (e) => {
  let t = X(JSON.parse(JSON.stringify(e)));
  return t = bu(t, 0), t = wu(t, 0), t = wi(t, 0), t = bi(t, 0), t;
}, Sr = (e, t, r, n) => {
  let a = e ? X(e) : X();
  return (t || t === 0) && (a = bu(a, +t)), (r || r === 0) && (a = wu(a, +r)), (n || n === 0) && (a = wi(a, +n)), bi(a, 0);
}, wt = (e, t) => !e || !t ? !1 : $n(Nt(e), Nt(t)), Qe = (e, t) => !e || !t ? !1 : ln(Nt(e), Nt(t)), At = (e, t) => !e || !t ? !1 : hn(Nt(e), Nt(t)), Ha = (e, t, r) => e != null && e[0] && e != null && e[1] ? At(r, e[0]) && wt(r, e[1]) : e != null && e[0] && t ? At(r, e[0]) && wt(r, t) || wt(r, e[0]) && At(r, t) : !1, Qt = (e) => {
  const t = tt(new Date(e), { date: 1 });
  return Nt(t);
}, so = (e, t, r) => t && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((n) => n === t ? [n, r] : [n, isNaN(+e[n]) ? void 0 : +e[n]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
}, Kr = (e) => ({
  hours: Xt(e),
  minutes: sr(e),
  seconds: mn(e)
}), Mu = (e, t) => {
  if (t) {
    const r = Re(X(t));
    if (r > e)
      return 12;
    if (r === e)
      return Le(X(t));
  }
}, Ou = (e, t) => {
  if (t) {
    const r = Re(X(t));
    return r < e ? -1 : r === e ? Le(X(t)) : void 0;
  }
}, bn = (e) => {
  if (e)
    return Re(X(e));
}, Zt = (e, t) => t ? Sm(e, t) : e, Pu = (e, t) => t ? Im(e, t) : e, Vm = (e) => e instanceof Date ? e : Ar(e), Su = (e, t) => {
  const r = At(e, t) ? t : e, n = At(t, e) ? t : e;
  return xa({ start: r, end: n });
}, Wm = (e) => {
  const t = qt(e, 1);
  return { month: Le(t), year: Re(t) };
}, da = (e, t, r) => {
  const n = Zr(Zt(e, t), { weekStartsOn: +r }), a = Yf(Zt(e, t), { weekStartsOn: +r });
  return [n, a];
}, Iu = (e, t) => {
  const r = {
    hours: Xt(X()),
    minutes: sr(X()),
    seconds: t ? mn(X()) : 0
  };
  return Object.assign(r, e);
}, Mr = (e, t, r) => [tt(X(e), { date: 1 }), tt(X(), { month: t, year: r, date: 1 })], mr = (e, t, r) => {
  let n = e ? X(e) : X();
  return (t || t === 0) && (n = yu(n, t)), r && (n = lr(n, r)), n;
}, Eu = (e, t, r, n, a) => {
  if (!n || a && !t || !a && !r)
    return !1;
  const o = a ? qt(e, 1) : gn(e, 1), i = [Le(o), Re(o)];
  return a ? !Gm(...i, t) : !Qm(...i, r);
}, Qm = (e, t, r) => wt(...Mr(r, e, t)) || Qe(...Mr(r, e, t)), Gm = (e, t, r) => At(...Mr(r, e, t)) || Qe(...Mr(r, e, t)), Nu = (e, t, r, n, a, o, i) => {
  if (typeof t == "function" && !i)
    return t(e);
  const l = r ? { locale: r } : void 0;
  return Array.isArray(e) ? `${Kt(e[0], o, l)}${a && !e[1] ? "" : n}${e[1] ? Kt(e[1], o, l) : ""}` : Kt(e, o, l);
}, nn = (e) => {
  if (e)
    return null;
  throw new Error(Ca.prop("partial-range"));
}, aa = (e, t) => {
  if (t)
    return e();
  throw new Error(Ca.prop("range"));
}, Vo = (e) => Array.isArray(e) ? vr(e[0]) && (e[1] ? vr(e[1]) : !0) : e ? vr(e) : !1, zm = (e, t) => tt(t ?? X(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
}), uo = (e, t, r, n) => {
  if (!e)
    return !0;
  if (n) {
    const a = r === "max" ? $n(e, t) : hn(e, t), o = { seconds: 0, milliseconds: 0 };
    return a || ln(tt(e, o), tt(t, o));
  }
  return r === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
}, co = (e, t, r) => e ? zm(e, t) : X(r ?? t), $l = (e, t, r, n, a) => {
  if (Array.isArray(n)) {
    const i = co(e, n[0], t), l = co(e, n[1], t);
    return uo(n[0], i, r, !!t) && uo(n[1], l, r, !!t) && a;
  }
  const o = co(e, n, t);
  return uo(n, o, r, !!t) && a;
}, fo = (e) => tt(X(), Kr(e)), qm = (e, t) => Array.isArray(e) ? e.map((r) => X(r)).filter((r) => Re(X(r)) === t).map((r) => Le(r)) : [], Ru = (e, t, r) => typeof e == "function" ? e({ month: t, year: r }) : !!e.months.find((n) => n.month === t && n.year === r), Pi = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t), Tn = Yr({
  menuFocused: !1,
  shiftKeyInMenu: !1
}), Yu = () => {
  const e = (r) => {
    Tn.menuFocused = r;
  }, t = (r) => {
    Tn.shiftKeyInMenu !== r && (Tn.shiftKeyInMenu = r);
  };
  return {
    control: te(() => ({ shiftKeyInMenu: Tn.shiftKeyInMenu, menuFocused: Tn.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
}, Je = Yr({
  monthYear: [],
  calendar: [],
  time: [],
  actionRow: [],
  selectionGrid: [],
  timePicker: {
    0: [],
    1: []
  },
  monthPicker: []
}), po = oe(null), oa = oe(!1), vo = oe(!1), mo = oe(!1), ho = oe(!1), Dt = oe(0), bt = oe(0), Br = () => {
  const e = te(() => oa.value ? [...Je.selectionGrid, Je.actionRow].filter((p) => p.length) : vo.value ? [
    ...Je.timePicker[0],
    ...Je.timePicker[1],
    ho.value ? [] : [po.value],
    Je.actionRow
  ].filter((p) => p.length) : mo.value ? [...Je.monthPicker, Je.actionRow] : [Je.monthYear, ...Je.calendar, Je.time, Je.actionRow].filter((p) => p.length)), t = (p) => {
    Dt.value = p ? Dt.value + 1 : Dt.value - 1;
    let v = null;
    e.value[bt.value] && (v = e.value[bt.value][Dt.value]), v || (Dt.value = p ? Dt.value - 1 : Dt.value + 1);
  }, r = (p) => {
    bt.value === 0 && !p || bt.value === e.value.length && p || (bt.value = p ? bt.value + 1 : bt.value - 1, e.value[bt.value] ? e.value[bt.value] && !e.value[bt.value][Dt.value] && Dt.value !== 0 && (Dt.value = e.value[bt.value].length - 1) : bt.value = p ? bt.value - 1 : bt.value + 1);
  }, n = (p) => {
    let v = null;
    e.value[bt.value] && (v = e.value[bt.value][Dt.value]), v ? v.focus({ preventScroll: !oa.value }) : Dt.value = p ? Dt.value - 1 : Dt.value + 1;
  }, a = () => {
    t(!0), n(!0);
  }, o = () => {
    t(!1), n(!1);
  }, i = () => {
    r(!1), n(!0);
  }, l = () => {
    r(!0), n(!0);
  }, s = (p, v) => {
    Je[v] = p;
  }, u = (p, v) => {
    Je[v] = p;
  }, d = () => {
    Dt.value = 0, bt.value = 0;
  };
  return {
    buildMatrix: s,
    buildMultiLevelMatrix: u,
    setTimePickerBackRef: (p) => {
      po.value = p;
    },
    setSelectionGrid: (p) => {
      oa.value = p, d(), p || (Je.selectionGrid = []);
    },
    setTimePicker: (p, v = !1) => {
      vo.value = p, ho.value = v, d(), p || (Je.timePicker[0] = [], Je.timePicker[1] = []);
    },
    setTimePickerElements: (p, v = 0) => {
      Je.timePicker[v] = p;
    },
    arrowRight: a,
    arrowLeft: o,
    arrowUp: i,
    arrowDown: l,
    clearArrowNav: () => {
      Je.monthYear = [], Je.calendar = [], Je.time = [], Je.actionRow = [], Je.selectionGrid = [], Je.timePicker[0] = [], Je.timePicker[1] = [], oa.value = !1, vo.value = !1, ho.value = !1, mo.value = !1, d(), po.value = null;
    },
    setMonthPicker: (p) => {
      mo.value = p, d();
    },
    refSets: Je
    // exposed for testing
  };
}, jl = (e) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e ?? {}
}), Km = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  calendarWrap: "Calendar wrapper",
  calendarDays: "Calendar days",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (t) => `Increment ${t}`,
  decrementValue: (t) => `Decrement ${t}`,
  openTpOverlay: (t) => `Open ${t} overlay`,
  amPmButton: "Switch AM/PM mode",
  openYearsOverlay: "Open years overlay",
  openMonthsOverlay: "Open months overlay",
  nextMonth: "Next month",
  prevMonth: "Previous month",
  nextYear: "Next year",
  prevYear: "Previous year",
  day: () => "",
  ...e ?? {}
}), Vl = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0, Xm = (e) => {
  const t = typeof e == "object" && e, r = {
    static: !0,
    solo: !1
  };
  if (!e)
    return { ...r, count: Vl(!1) };
  const n = t ? e : {}, a = t ? n.count ?? !0 : e, o = Vl(a);
  return Object.assign(r, n, { count: o });
}, Zm = (e, t, r) => e || (typeof r == "string" ? r : t), Jm = (e) => typeof e == "boolean" ? e ? jl({}) : !1 : jl(e), eh = (e) => {
  const t = {
    enterSubmit: !0,
    tabSubmit: !0,
    openMenu: !0,
    selectOnFocus: !1,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: !0 } : { ...t, enabled: e };
}, th = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
}), rh = (e) => ({
  showSelect: !0,
  showCancel: !0,
  showNow: !1,
  showPreview: !0,
  ...e ?? {}
}), nh = (e) => {
  const t = { input: !1 };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: !0 } : {
    enabled: e,
    ...t
  };
}, ah = (e) => ({ allowStopPropagation: !0, closeOnScroll: !1, modeHeight: 255, allowPreventDefault: !1, closeOnClearValue: !0, closeOnAutoApply: !0, noSwipe: !1, keepActionRow: !1, onClickOutside: void 0, tabOutClosesMenu: !0, ...e ?? {} }), oh = (e, t, r) => {
  const n = {
    dates: Array.isArray(e) ? e.map((a) => X(a)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: t,
    options: { highlightDisabled: r }
  };
  return typeof e == "function" ? e : { ...n, ...e ?? {} };
}, ih = (e) => typeof e == "object" ? {
  type: e.type,
  hideOnOffsetDates: e.hideOnOffsetDates ?? !1
} : {
  type: e,
  hideOnOffsetDates: !1
}, ut = (e) => {
  const t = () => {
    const S = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${S}` : `hh:mm${S} aa`;
  }, r = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? "MM/dd/yyyy" : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy", n = (S) => Iu(S, e.enableSeconds), a = () => e.range ? e.startTime && Array.isArray(e.startTime) ? [n(e.startTime[0]), n(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? n(e.startTime) : null, o = te(() => Xm(e.multiCalendars)), i = te(() => a()), l = te(() => Km(e.ariaLabels)), s = te(() => th(e.filters)), u = te(() => Jm(e.transitions)), d = te(() => rh(e.actionRow)), p = te(
    () => Zm(e.previewFormat, e.format, r())
  ), v = te(() => eh(e.textInput)), b = te(() => nh(e.inline)), A = te(() => ah(e.config)), M = te(
    () => oh(e.highlight, e.highlightWeekDays, e.highlightDisabledDays)
  ), Q = te(() => ih(e.weekNumbers));
  return {
    defaultedTransitions: u,
    defaultedMultiCalendars: o,
    defaultedStartTime: i,
    defaultedAriaLabels: l,
    defaultedFilters: s,
    defaultedActionRow: d,
    defaultedPreviewFormat: p,
    defaultedTextInput: v,
    defaultedInline: b,
    defaultedConfig: A,
    defaultedHighlight: M,
    defaultedWeekNumbers: Q,
    getDefaultPattern: r,
    getDefaultStartTime: a
  };
}, lh = (e, t, r) => {
  const n = oe(), { defaultedTextInput: a, getDefaultPattern: o } = ut(t), i = oe(""), l = va(t, "format");
  zt(n, () => {
    e("internal-model-change", n.value);
  }), zt(l, () => {
    I();
  });
  const s = (f) => Pu(f, t.timezone), u = (f) => Zt(f, t.timezone), d = (f, Y, U = !1) => Nu(
    f,
    t.format,
    t.formatLocale,
    a.value.rangeSeparator,
    t.modelAuto,
    Y ?? o(),
    U
  ), p = (f) => f ? t.modelType ? T(f) : {
    hours: Xt(f),
    minutes: sr(f),
    seconds: t.enableSeconds ? mn(f) : 0
  } : null, v = (f) => t.modelType ? T(f) : { month: Le(f), year: Re(f) }, b = (f) => Array.isArray(f) ? t.multiDates ? f.map((Y) => A(Y, lr(X(), Y))) : aa(
    () => [
      lr(X(), f[0]),
      f[1] ? lr(X(), f[1]) : nn(t.partialRange)
    ],
    t.range
  ) : lr(X(), +f), A = (f, Y) => (typeof f == "string" || typeof f == "number") && t.modelType ? y(f) : Y, M = (f) => Array.isArray(f) ? [
    A(
      f[0],
      Sr(null, +f[0].hours, +f[0].minutes, f[0].seconds)
    ),
    A(
      f[1],
      Sr(null, +f[1].hours, +f[1].minutes, f[1].seconds)
    )
  ] : A(f, Sr(null, f.hours, f.minutes, f.seconds)), Q = (f) => Array.isArray(f) ? t.multiDates ? f.map((Y) => A(Y, mr(null, +Y.month, +Y.year))) : aa(
    () => [
      A(f[0], mr(null, +f[0].month, +f[0].year)),
      A(
        f[1],
        f[1] ? mr(null, +f[1].month, +f[1].year) : nn(t.partialRange)
      )
    ],
    t.range
  ) : A(f, mr(null, +f.month, +f.year)), S = (f) => {
    if (Array.isArray(f))
      return f.map((Y) => y(Y));
    throw new Error(Ca.dateArr("multi-dates"));
  }, R = (f) => {
    if (Array.isArray(f))
      return [X(f[0]), X(f[1])];
    throw new Error(Ca.dateArr("week-picker"));
  }, F = (f) => t.modelAuto ? Array.isArray(f) ? [y(f[0]), y(f[1])] : t.autoApply ? [y(f)] : [y(f), null] : Array.isArray(f) ? aa(
    () => [
      y(f[0]),
      f[1] ? y(f[1]) : nn(t.partialRange)
    ],
    t.range
  ) : y(f), C = () => {
    Array.isArray(n.value) && t.range && n.value.length === 1 && n.value.push(nn(t.partialRange));
  }, N = () => {
    const f = n.value;
    return [
      T(f[0]),
      f[1] ? T(f[1]) : nn(t.partialRange)
    ];
  }, W = () => n.value[1] ? N() : T(mt(n.value[0])), H = () => (n.value || []).map((f) => T(f)), z = () => (C(), t.modelAuto ? W() : t.multiDates ? H() : Array.isArray(n.value) ? aa(() => N(), t.range) : T(mt(n.value))), G = (f) => !f || Array.isArray(f) && !f.length ? null : t.timePicker ? M(mt(f)) : t.monthPicker ? Q(mt(f)) : t.yearPicker ? b(mt(f)) : t.multiDates ? S(mt(f)) : t.weekPicker ? R(mt(f)) : F(mt(f)), g = (f) => {
    const Y = G(f);
    Vo(mt(Y)) ? (n.value = mt(Y), I()) : (n.value = null, i.value = "");
  }, E = () => {
    const f = (Y) => Kt(Y, a.value.format);
    return `${f(n.value[0])} ${a.value.rangeSeparator} ${n.value[1] ? f(n.value[1]) : ""}`;
  }, _ = () => r.value && n.value ? Array.isArray(n.value) ? E() : Kt(n.value, a.value.format) : d(n.value), j = () => n.value ? t.multiDates ? n.value.map((f) => d(f)).join("; ") : a.value.enabled && typeof a.value.format == "string" ? _() : d(n.value) : "", I = () => {
    !t.format || typeof t.format == "string" || a.value.enabled && typeof a.value.format == "string" ? i.value = j() : i.value = t.format(n.value);
  }, y = (f) => {
    if (t.utc) {
      const Y = new Date(f);
      return t.utc === "preserve" ? new Date(Y.getTime() + Y.getTimezoneOffset() * 6e4) : Y;
    }
    return t.modelType ? t.modelType === "date" || t.modelType === "timestamp" ? u(new Date(f)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? Uo(f, o(), /* @__PURE__ */ new Date()) : u(Uo(f, t.modelType, /* @__PURE__ */ new Date())) : u(new Date(f));
  }, T = (f) => f ? t.utc ? jm(f, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +s(f) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? d(s(f)) : d(s(f), t.modelType, !0) : s(f) : "", O = (f, Y = !1) => {
    if (e("update:model-value", f), t.emitTimezone && Y) {
      const U = Array.isArray(f) ? f.map((ae) => Zt(mt(ae)), t.emitTimezone) : Zt(mt(f), t.emitTimezone);
      e("update:model-timezone-value", U);
    }
  }, B = (f) => Array.isArray(n.value) ? t.multiDates ? n.value.map((Y) => f(Y)) : [
    f(n.value[0]),
    n.value[1] ? f(n.value[1]) : nn(t.partialRange)
  ] : f(mt(n.value)), h = (f) => O(mt(B(f)));
  return {
    inputValue: i,
    internalModelValue: n,
    checkBeforeEmit: () => n.value ? t.range ? t.partialRange ? n.value.length >= 1 : n.value.length === 2 : !!n.value : !1,
    parseExternalModelValue: g,
    formatInputValue: I,
    emitModelValue: () => (I(), t.monthPicker ? h(v) : t.timePicker ? h(p) : t.yearPicker ? h(Re) : t.weekPicker ? O(
      n.value.map((f) => T(f)),
      !0
    ) : O(z(), !0))
  };
}, sh = (e, t) => {
  const { defaultedFilters: r } = ut(e), { validateMonthYearInRange: n } = tn(e), a = (u, d) => {
    let p = u;
    return r.value.months.includes(Le(p)) ? (p = d ? qt(u, 1) : gn(u, 1), a(p, d)) : p;
  }, o = (u, d) => {
    let p = u;
    return r.value.years.includes(Re(p)) ? (p = d ? pi(u, 1) : _u(u, 1), o(p, d)) : p;
  }, i = (u, d = !1) => {
    const p = tt(/* @__PURE__ */ new Date(), { month: e.month, year: e.year });
    let v = u ? qt(p, 1) : gn(p, 1);
    e.disableYearSelect && (v = lr(v, e.year));
    let b = Le(v), A = Re(v);
    r.value.months.includes(b) && (v = a(v, u), b = Le(v), A = Re(v)), r.value.years.includes(A) && (v = o(v, u), A = Re(v)), n(b, A, u, e.preventMinMaxNavigation) && l(b, A, d);
  }, l = (u, d, p) => {
    t("update-month-year", { month: u, year: d, fromNav: p });
  }, s = te(() => (u) => Eu(
    tt(/* @__PURE__ */ new Date(), { month: e.month, year: e.year }),
    e.maxDate,
    e.minDate,
    e.preventMinMaxNavigation,
    u
  ));
  return { handleMonthYearChange: i, isDisabled: s, updateMonthYear: l };
};
var an = /* @__PURE__ */ ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(an || {}), Wt = /* @__PURE__ */ ((e) => (e.month = "month", e.year = "year", e))(Wt || {}), Vr = /* @__PURE__ */ ((e) => (e.top = "top", e.bottom = "bottom", e))(Vr || {}), Xr = /* @__PURE__ */ ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Xr || {}), rr = /* @__PURE__ */ ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(rr || {});
const uh = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: r,
  pickerWrapperRef: n,
  inline: a,
  emit: o,
  props: i,
  slots: l
}) => {
  const s = oe({}), u = oe(!1), d = oe({
    top: "0",
    left: "0"
  }), p = oe(!1), v = va(i, "teleportCenter");
  zt(v, () => {
    d.value = JSON.parse(JSON.stringify({})), C();
  });
  const b = (y) => {
    if (i.teleport) {
      const T = y.getBoundingClientRect();
      return {
        left: T.left + window.scrollX,
        top: T.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, A = (y, T) => {
    d.value.left = `${y + T - s.value.width}px`;
  }, M = (y) => {
    d.value.left = `${y}px`;
  }, Q = (y, T) => {
    i.position === an.left && M(y), i.position === an.right && A(y, T), i.position === an.center && (d.value.left = `${y + T / 2 - s.value.width / 2}px`);
  }, S = (y) => {
    const { width: T, height: O } = y.getBoundingClientRect(), { top: B, left: h } = i.altPosition ? i.altPosition(y) : b(y);
    return { top: +B, left: +h, width: T, height: O };
  }, R = () => {
    d.value.left = "50%", d.value.top = "50%", d.value.transform = "translate(-50%, -50%)", d.value.position = "fixed", delete d.value.opacity;
  }, F = () => {
    const y = ft(r), { top: T, left: O, transform: B } = i.altPosition(y);
    d.value = { top: `${T}px`, left: `${O}px`, transform: B ?? "" };
  }, C = (y = !0) => {
    var T;
    if (!a.value.enabled) {
      if (v.value)
        return R();
      if (i.altPosition !== null)
        return F();
      if (y) {
        const O = i.teleport ? (T = t.value) == null ? void 0 : T.$el : e.value;
        O && (s.value = O.getBoundingClientRect()), o("recalculate-position");
      }
      return E();
    }
  }, N = ({ inputEl: y, left: T, width: O }) => {
    window.screen.width > 768 && !u.value && Q(T, O), z(y);
  }, W = (y) => {
    const { top: T, left: O, height: B, width: h } = S(y);
    d.value.top = `${B + T + +i.offset}px`, p.value = !1, u.value || (d.value.left = `${O + h / 2 - s.value.width / 2}px`), N({ inputEl: y, left: O, width: h });
  }, H = (y) => {
    const { top: T, left: O, width: B } = S(y);
    d.value.top = `${T - +i.offset - s.value.height}px`, p.value = !0, N({ inputEl: y, left: O, width: B });
  }, z = (y) => {
    if (i.autoPosition) {
      const { left: T, width: O } = S(y), { left: B, right: h } = s.value;
      if (!u.value) {
        if (Math.abs(B) !== Math.abs(h)) {
          if (B <= 0)
            return u.value = !0, M(T);
          if (h >= document.documentElement.clientWidth)
            return u.value = !0, A(T, O);
        }
        return Q(T, O);
      }
    }
  }, G = () => {
    const y = ft(r);
    if (y) {
      const { height: T } = s.value, { top: O, height: B } = y.getBoundingClientRect(), h = window.innerHeight - O - B, f = O;
      return T <= h ? Vr.bottom : T > h && T <= f ? Vr.top : h >= f ? Vr.bottom : Vr.top;
    }
    return Vr.bottom;
  }, g = (y) => G() === Vr.bottom ? W(y) : H(y), E = () => {
    const y = ft(r);
    if (y)
      return i.autoPosition ? g(y) : W(y);
  }, _ = function(y) {
    if (y) {
      const T = y.scrollHeight > y.clientHeight, O = window.getComputedStyle(y).overflowY.indexOf("hidden") !== -1;
      return T && !O;
    }
    return !0;
  }, j = function(y) {
    return !y || y === document.body || y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : _(y) ? y : j(y.parentNode);
  }, I = (y) => {
    if (y)
      switch (i.position) {
        case an.left:
          return { left: 0, transform: "translateX(0)" };
        case an.right:
          return { left: `${y.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${y.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: p,
    menuStyle: d,
    xCorrect: u,
    setMenuPosition: C,
    getScrollableParent: j,
    shadowRender: (y, T) => {
      var O, B, h;
      const f = document.createElement("div"), Y = (O = ft(r)) == null ? void 0 : O.getBoundingClientRect();
      f.setAttribute("id", "dp--temp-container");
      const U = (B = n.value) != null && B.clientWidth ? n.value : document.body;
      U.append(f);
      const ae = I(Y), le = Js(
        y,
        {
          ...T,
          shadow: !0,
          style: { opacity: 0, position: "absolute", ...ae }
        },
        Object.fromEntries(
          Object.keys(l).filter((L) => ["right-sidebar", "left-sidebar"].includes(L)).map((L) => [L, l[L]])
        )
      );
      ba(le, f), s.value = (h = le.el) == null ? void 0 : h.getBoundingClientRect(), ba(null, f), U.removeChild(f);
    }
  };
}, kr = [
  { name: "clock-icon", use: ["time", "calendar", "shared"] },
  { name: "arrow-left", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-right", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year", "shared"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year", "shared"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar", "shared", "year-mode"] },
  { name: "day", use: ["calendar", "shared"] },
  { name: "month-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay-value", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "year-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay-header", use: ["month-year", "shared"] },
  { name: "year-overlay-header", use: ["month-year", "shared"] },
  { name: "hours-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "hours", use: ["calendar", "time", "shared"] },
  { name: "minutes", use: ["calendar", "time", "shared"] },
  { name: "month", use: ["calendar", "month-year", "shared"] },
  { name: "year", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "action-buttons", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar", "shared"] },
  { name: "marker-tooltip", use: ["calendar", "shared"] },
  { name: "action-extra", use: ["menu"] },
  { name: "time-picker-overlay", use: ["calendar", "time", "shared"] },
  { name: "am-pm-button", use: ["calendar", "time", "shared"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year", "shared"] },
  { name: "time-picker", use: ["menu", "shared"] },
  { name: "action-row", use: ["action"] },
  { name: "marker", use: ["calendar", "shared"] },
  { name: "quarter", use: ["shared"] }
], ch = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }], dh = {
  all: () => kr,
  monthYear: () => kr.filter((e) => e.use.includes("month-year")),
  input: () => ch,
  timePicker: () => kr.filter((e) => e.use.includes("time")),
  action: () => kr.filter((e) => e.use.includes("action")),
  calendar: () => kr.filter((e) => e.use.includes("calendar")),
  menu: () => kr.filter((e) => e.use.includes("menu")),
  shared: () => kr.filter((e) => e.use.includes("shared")),
  yearMode: () => kr.filter((e) => e.use.includes("year-mode"))
}, Ut = (e, t, r) => {
  const n = [];
  return dh[t]().forEach((a) => {
    e[a.name] && n.push(a.name);
  }), r != null && r.length && r.forEach((a) => {
    a.slot && n.push(a.slot);
  }), n;
}, Qn = (e) => {
  const t = te(() => (n) => e.value ? n ? e.value.open : e.value.close : ""), r = te(() => (n) => e.value ? n ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: r };
}, Gn = (e, t) => {
  const r = X(Zt(/* @__PURE__ */ new Date(), e.timezone)), n = oe([{ month: Le(r), year: Re(r) }]), a = Yr({
    hours: e.range ? [Xt(r), Xt(r)] : Xt(r),
    minutes: e.range ? [sr(r), sr(r)] : sr(r),
    seconds: e.range ? [0, 0] : 0
  }), o = te({
    get: () => e.internalModelValue,
    set: (s) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", s);
    }
  }), i = te(
    () => (s) => n.value[s] ? n.value[s].month : 0
  ), l = te(
    () => (s) => n.value[s] ? n.value[s].year : 0
  );
  return {
    calendars: n,
    time: a,
    modelValue: o,
    month: i,
    year: l
  };
}, fh = (e, t) => {
  const { defaultedMultiCalendars: r, defaultedHighlight: n } = ut(t), { isDisabled: a, matchDate: o } = tn(t), i = oe(null), l = oe(X(Zt(/* @__PURE__ */ new Date(), t.timezone))), s = (h) => {
    !h.current && t.hideOffsetDates || (i.value = h.value);
  }, u = () => {
    i.value = null;
  }, d = (h) => Array.isArray(e.value) && t.range && e.value[0] && i.value ? h ? At(i.value, e.value[0]) : wt(i.value, e.value[0]) : !0, p = (h, f) => {
    const Y = () => e.value ? f ? e.value[0] || null : e.value[1] : null, U = e.value && Array.isArray(e.value) ? Y() : null;
    return Qe(X(h.value), U);
  }, v = (h) => {
    const f = Array.isArray(e.value) ? e.value[0] : null;
    return h ? !wt(i.value ?? null, f) : !0;
  }, b = (h, f = !0) => (t.range || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !h.current ? !1 : Qe(X(h.value), e.value[f ? 0 : 1]) : t.range ? p(h, f) && v(f) || Qe(h.value, Array.isArray(e.value) ? e.value[0] : null) && d(f) : !1, A = (h, f, Y) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? h ? !1 : Y ? At(e.value[0], f.value) : wt(e.value[0], f.value) : !1, M = (h) => !e.value || t.hideOffsetDates && !h.current ? !1 : t.range ? t.modelAuto && Array.isArray(e.value) ? Qe(h.value, e.value[0] ? e.value[0] : l.value) : !1 : t.multiDates && Array.isArray(e.value) ? e.value.some((f) => Qe(f, h.value)) : Qe(h.value, e.value ? e.value : l.value), Q = (h) => {
    if (t.autoRange || t.weekPicker) {
      if (i.value) {
        if (t.hideOffsetDates && !h.current)
          return !1;
        const f = fr(i.value, +t.autoRange), Y = da(X(i.value), t.timezone, t.weekStart);
        return t.weekPicker ? Qe(Y[1], X(h.value)) : Qe(f, X(h.value));
      }
      return !1;
    }
    return !1;
  }, S = (h) => {
    if (t.autoRange || t.weekPicker) {
      if (i.value) {
        const f = fr(i.value, +t.autoRange);
        if (t.hideOffsetDates && !h.current)
          return !1;
        const Y = da(X(i.value), t.timezone, t.weekStart);
        return t.weekPicker ? At(h.value, Y[0]) && wt(h.value, Y[1]) : At(h.value, i.value) && wt(h.value, f);
      }
      return !1;
    }
    return !1;
  }, R = (h) => {
    if (t.autoRange || t.weekPicker) {
      if (i.value) {
        if (t.hideOffsetDates && !h.current)
          return !1;
        const f = da(X(i.value), t.timezone, t.weekStart);
        return t.weekPicker ? Qe(f[0], h.value) : Qe(i.value, h.value);
      }
      return !1;
    }
    return !1;
  }, F = (h) => Ha(e.value, i.value, h.value), C = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : !1, N = () => t.modelAuto ? Tu(t.internalModelValue) : !0, W = (h) => {
    if (Array.isArray(e.value) && e.value.length || t.weekPicker)
      return !1;
    const f = t.range ? !b(h) && !b(h, !1) : !0;
    return !a(h.value) && !M(h) && !(!h.current && t.hideOffsetDates) && f;
  }, H = (h) => t.range ? t.modelAuto ? C() && M(h) : !1 : M(h), z = (h) => {
    var f;
    return n.value ? typeof n.value == "function" ? n.value(h.value) : o(
      h.value,
      (f = t.arrMapValues) != null && f.highlightedDates ? t.arrMapValues.highlightedDates : n.value.dates
    ) : !1;
  }, G = (h) => {
    const f = a(h.value);
    return f && (typeof n.value == "function" ? !n.value(h.value, f) : !n.value.options.highlightDisabled);
  }, g = (h) => {
    var f;
    return typeof n.value == "function" ? n.value(h.value) : (f = n.value.weekdays) == null ? void 0 : f.includes(h.value.getDay());
  }, E = (h) => (t.range || t.weekPicker) && (!(r.value.count > 0) || h.current) && N() && !(!h.current && t.hideOffsetDates) && !M(h) ? F(h) : !1, _ = (h) => {
    const { isRangeStart: f, isRangeEnd: Y } = y(h), U = t.range ? f || Y : !1;
    return {
      dp__cell_offset: !h.current,
      dp__pointer: !t.disabled && !(!h.current && t.hideOffsetDates) && !a(h.value),
      dp__cell_disabled: a(h.value),
      dp__cell_highlight: !G(h) && (z(h) || g(h)) && !H(h) && !U && !R(h) && !(E(h) && t.weekPicker) && !Y,
      dp__cell_highlight_active: !G(h) && (z(h) || g(h)) && H(h),
      dp__today: !t.noToday && Qe(h.value, l.value) && h.current
    };
  }, j = (h) => ({
    dp__active_date: H(h),
    dp__date_hover: W(h)
  }), I = (h) => ({
    ...T(h),
    ...O(h),
    dp__range_between_week: E(h) && t.weekPicker
  }), y = (h) => {
    const f = r.value.count > 0 ? h.current && b(h) && N() : b(h) && N(), Y = r.value.count > 0 ? h.current && b(h, !1) && N() : b(h, !1) && N();
    return { isRangeStart: f, isRangeEnd: Y };
  }, T = (h) => {
    const { isRangeStart: f, isRangeEnd: Y } = y(h);
    return {
      dp__range_start: f,
      dp__range_end: Y,
      dp__range_between: E(h) && !t.weekPicker,
      dp__date_hover_start: A(W(h), h, !0),
      dp__date_hover_end: A(W(h), h, !1)
    };
  }, O = (h) => ({
    ...T(h),
    dp__cell_auto_range: S(h),
    dp__cell_auto_range_start: R(h),
    dp__cell_auto_range_end: Q(h)
  }), B = (h) => t.range ? t.autoRange ? O(h) : t.modelAuto ? { ...j(h), ...T(h) } : T(h) : t.weekPicker ? I(h) : j(h);
  return {
    setHoverDate: s,
    clearHoverDate: u,
    getDayClassData: (h) => t.hideOffsetDates && !h.current ? {} : {
      ..._(h),
      ...B(h),
      [t.dayClass ? t.dayClass(h.value) : ""]: !0,
      [t.calendarCellClassName]: !!t.calendarCellClassName
    }
  };
}, tn = (e) => {
  const { defaultedFilters: t, defaultedHighlight: r } = ut(e), n = () => {
    if (e.timezone)
      return e.timezone;
    if (e.utc)
      return "UTC";
  }, a = (g) => {
    const E = Nt(o(X(g))).toISOString(), [_] = E.split("T");
    return _;
  }, o = (g) => e.utc === "preserve" ? Pu(g, n()) : Zt(g, n()), i = (g) => {
    var E;
    const _ = e.maxDate ? At(g, o(X(e.maxDate))) : !1, j = e.minDate ? wt(g, o(X(e.minDate))) : !1, I = d(
      o(g),
      (E = e.arrMapValues) != null && E.disabledDates ? e.arrMapValues.disabledDates : e.disabledDates
    ), y = t.value.months.map((f) => +f).includes(Le(g)), T = e.disabledWeekDays.length ? e.disabledWeekDays.some((f) => +f === Fp(g)) : !1, O = v(g), B = Re(g), h = B < +e.yearRange[0] || B > +e.yearRange[1];
    return !(_ || j || I || y || h || T || O);
  }, l = (g, E) => wt(...Mr(e.minDate, g, E)) || Qe(...Mr(e.minDate, g, E)), s = (g, E) => At(...Mr(e.maxDate, g, E)) || Qe(...Mr(e.maxDate, g, E)), u = (g, E, _) => {
    let j = !1;
    return e.maxDate && _ && s(g, E) && (j = !0), e.minDate && !_ && l(g, E) && (j = !0), j;
  }, d = (g, E) => g ? E instanceof Map ? !!E.get(a(g)) : Array.isArray(E) ? E.some((_) => Qe(o(X(_)), g)) : E ? E(X(JSON.parse(JSON.stringify(g)))) : !1 : !0, p = (g, E, _, j) => {
    let I = !1;
    return j ? e.minDate && e.maxDate ? I = u(g, E, _) : (e.minDate && l(g, E) || e.maxDate && s(g, E)) && (I = !0) : I = !0, I;
  }, v = (g) => {
    var E, _, j, I, y;
    return Array.isArray(e.allowedDates) && !((E = e.allowedDates) != null && E.length) ? !0 : (_ = e.arrMapValues) != null && _.allowedDates ? !d(g, (j = e.arrMapValues) == null ? void 0 : j.allowedDates) : (I = e.allowedDates) != null && I.length ? !((y = e.allowedDates) != null && y.some((T) => Qe(o(X(T)), o(g)))) : !1;
  }, b = (g) => !i(g), A = (g) => e.noDisabledRange ? !xa({ start: g[0], end: g[1] }).some((E) => b(E)) : !0, M = (g, E, _ = 0) => {
    if (Array.isArray(E) && E[_]) {
      const j = ru(g, E[_]), I = Su(E[_], g), y = I.length === 1 ? 0 : I.filter((O) => b(O)).length, T = Math.abs(j) - y;
      if (e.minRange && e.maxRange)
        return T >= +e.minRange && T <= +e.maxRange;
      if (e.minRange)
        return T >= +e.minRange;
      if (e.maxRange)
        return T <= +e.maxRange;
    }
    return !0;
  }, Q = (g) => new Map(g.map((E) => [a(E), !0])), S = (g) => Array.isArray(g) && g.length > 0, R = () => {
    const g = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return S(e.allowedDates) && (g.allowedDates = Q(e.allowedDates)), typeof r.value != "function" && S(r.value.dates) && (g.highlightedDates = Q(r.value.dates)), S(e.disabledDates) && (g.disabledDates = Q(e.disabledDates)), g;
  }, F = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, C = (g) => Array.isArray(g) ? [g[0] ? fo(g[0]) : null, g[1] ? fo(g[1]) : null] : fo(g), N = (g, E, _) => g.find(
    (j) => +j.hours === Xt(E) && j.minutes === "*" ? !0 : +j.minutes === sr(E) && +j.hours === Xt(E)
  ) && _, W = (g, E, _) => {
    const [j, I] = g, [y, T] = E;
    return !N(j, y, _) && !N(I, T, _) && _;
  }, H = (g, E) => {
    const _ = Array.isArray(E) ? E : [E];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? W(e.disabledTimes, _, g) : !_.some((j) => N(e.disabledTimes, j, g)) : g;
  }, z = (g, E) => {
    const _ = Array.isArray(E) ? [Kr(E[0]), E[1] ? Kr(E[1]) : void 0] : Kr(E), j = !e.disabledTimes(_);
    return g && j;
  }, G = (g, E) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? H(E, g) : z(E, g) : E;
  return {
    isDisabled: b,
    validateDate: i,
    validateMonthYearInRange: p,
    isDateRangeAllowed: A,
    checkMinMaxRange: M,
    matchDate: d,
    mapDatesArrToMap: R,
    isValidTime: (g) => {
      let E = !0;
      if (!g || F())
        return !0;
      const _ = !e.minDate && !e.maxDate ? C(g) : g;
      return (e.maxTime || e.maxDate) && (E = $l(
        e.maxTime,
        e.maxDate,
        "max",
        mt(_),
        E
      )), (e.minTime || e.minDate) && (E = $l(
        e.minTime,
        e.minDate,
        "min",
        mt(_),
        E
      )), G(g, E);
    }
  };
}, La = () => {
  const e = te(() => (n, a) => n == null ? void 0 : n.includes(a)), t = te(() => (n, a) => n.count ? n.solo ? !0 : a === 0 : !0), r = te(() => (n, a) => n.count ? n.solo ? !0 : a === n.count - 1 : !0);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: r };
}, ph = (e, t, r) => {
  const n = oe(0), a = Yr({
    [Xr.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Xr.calendar]: !1,
    [Xr.header]: !1
  }), o = te(() => e.monthPicker), i = (p) => {
    var v;
    if ((v = e.flow) != null && v.length) {
      if (!p && o.value)
        return d();
      a[p] = !0, Object.keys(a).filter((b) => !a[b]).length || d();
    }
  }, l = () => {
    var p;
    (p = e.flow) != null && p.length && n.value !== -1 && (n.value += 1, t("flow-step", n.value), d());
  }, s = () => {
    n.value = -1;
  }, u = (p, v, ...b) => {
    e.flow[n.value] === p && r.value && r.value[v](...b);
  }, d = () => {
    u(rr.month, "toggleMonthPicker", !0), u(rr.year, "toggleYearPicker", !0), u(rr.calendar, "toggleTimePicker", !1, !0), u(rr.time, "toggleTimePicker", !0, !0);
    const p = e.flow[n.value];
    (p === rr.hours || p === rr.minutes || p === rr.seconds) && u(p, "toggleTimePicker", !0, !0, p);
  };
  return { childMount: i, updateFlowStep: l, resetFlow: s, flowStep: n };
}, $a = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: !1 },
  format: {
    type: [String, Function],
    default: () => null
  },
  autoPosition: { type: Boolean, default: !0 },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: !0 },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: !1 },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: String, default: null },
  emitTimezone: { type: String, default: null },
  vertical: { type: Boolean, default: !1 },
  disableMonthYearSelect: { type: Boolean, default: !1 },
  disableYearSelect: { type: Boolean, default: !1 },
  menuClassName: { type: String, default: null },
  dayClass: { type: Function, default: null },
  yearRange: { type: Array, default: () => [1900, 2100] },
  calendarCellClassName: { type: String, default: null },
  enableTimePicker: { type: Boolean, default: !0 },
  autoApply: { type: Boolean, default: !1 },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: !1 },
  autoRange: { type: [Number, String], default: null },
  noToday: { type: Boolean, default: !1 },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: null },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  escClose: { type: Boolean, default: !0 },
  spaceConfirm: { type: Boolean, default: !0 },
  monthChangeOnArrows: { type: Boolean, default: !0 },
  presetDates: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  partialFlow: { type: Boolean, default: !1 },
  preventMinMaxNavigation: { type: Boolean, default: !1 },
  minRange: { type: [Number, String], default: null },
  maxRange: { type: [Number, String], default: null },
  multiDatesLimit: { type: [Number, String], default: null },
  reverseYears: { type: Boolean, default: !1 },
  weekPicker: { type: Boolean, default: !1 },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: !1 },
  disableTimeRangeValidation: { type: Boolean, default: !1 },
  highlight: {
    type: [Array, Function, Object],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: !1 },
  teleport: { type: [String, Boolean, Object], default: null },
  teleportCenter: { type: Boolean, default: !1 },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function, Object],
    default: null
  },
  calendarClassName: { type: String, default: null },
  monthChangeOnScroll: { type: [Boolean, String], default: !0 },
  dayNames: {
    type: [Function, Array],
    default: null
  },
  monthPicker: { type: Boolean, default: !1 },
  customProps: { type: Object, default: null },
  yearPicker: { type: Boolean, default: !1 },
  modelAuto: { type: Boolean, default: !1 },
  selectText: { type: String, default: "Select" },
  cancelText: { type: String, default: "Cancel" },
  previewFormat: {
    type: [String, Function],
    default: () => ""
  },
  multiDates: { type: Boolean, default: !1 },
  partialRange: { type: Boolean, default: !0 },
  ignoreTimeValidation: { type: Boolean, default: !1 },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: "" },
  hideInputIcon: { type: Boolean, default: !1 },
  clearable: { type: Boolean, default: !0 },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: !1 },
  autocomplete: { type: String, default: "off" },
  inputClassName: { type: String, default: null },
  fixedStart: { type: Boolean, default: !1 },
  fixedEnd: { type: Boolean, default: !1 },
  timePicker: { type: Boolean, default: !1 },
  enableSeconds: { type: Boolean, default: !1 },
  is24: { type: Boolean, default: !0 },
  noHoursOverlay: { type: Boolean, default: !1 },
  noMinutesOverlay: { type: Boolean, default: !1 },
  noSecondsOverlay: { type: Boolean, default: !1 },
  hoursGridIncrement: { type: [String, Number], default: 1 },
  minutesGridIncrement: { type: [String, Number], default: 5 },
  secondsGridIncrement: { type: [String, Number], default: 5 },
  hoursIncrement: { type: [Number, String], default: 1 },
  minutesIncrement: { type: [Number, String], default: 1 },
  secondsIncrement: { type: [Number, String], default: 1 },
  range: { type: Boolean, default: !1 },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: !1 },
  readonly: { type: Boolean, default: !1 },
  inline: { type: [Boolean, Object], default: !1 },
  textInput: { type: [Boolean, Object], default: !1 },
  noDisabledRange: { type: Boolean, default: !1 },
  sixWeeks: { type: [Boolean, String], default: !1 },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: !1 },
  disabledTimes: { type: [Function, Array], default: void 0 },
  showLastInRange: { type: Boolean, default: !0 },
  timePickerInline: { type: Boolean, default: !1 },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 },
  quarterPicker: { type: Boolean, default: !1 },
  yearFirst: { type: Boolean, default: !1 }
}, er = {
  ...$a,
  shadow: { type: Boolean, default: !1 },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  arrMapValues: { type: Object, default: () => ({}) },
  noOverlayFocus: { type: Boolean, default: !1 }
}, vh = {
  key: 1,
  class: "dp__input_wrap"
}, mh = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"], hh = {
  key: 2,
  class: "dp__clear_icon"
}, gh = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: !1 },
    inputValue: { type: String, default: "" },
    ...$a
  },
  emits: [
    "clear",
    "open",
    "update:input-value",
    "set-input-date",
    "close",
    "select-date",
    "set-empty-date",
    "toggle",
    "focus-prev",
    "focus",
    "blur",
    "real-blur"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      defaultedTextInput: o,
      defaultedAriaLabels: i,
      defaultedInline: l,
      defaultedConfig: s,
      getDefaultPattern: u,
      getDefaultStartTime: d
    } = ut(a), { checkMinMaxRange: p } = tn(a), v = oe(), b = oe(null), A = oe(!1), M = oe(!1), Q = te(
      () => ({
        dp__pointer: !a.disabled && !a.readonly && !o.value.enabled,
        dp__disabled: a.disabled,
        dp__input_readonly: !o.value.enabled,
        dp__input: !0,
        dp__input_icon_pad: !a.hideInputIcon,
        dp__input_valid: !!a.state,
        dp__input_invalid: a.state === !1,
        dp__input_focus: A.value || a.isMenuOpen,
        dp__input_reg: !o.value.enabled,
        [a.inputClassName]: !!a.inputClassName
      })
    ), S = () => {
      n("set-input-date", null), a.autoApply && (n("set-empty-date"), v.value = null);
    }, R = (I) => {
      const y = d();
      return $m(
        I,
        o.value.format ?? u(),
        y ?? Iu({}, a.enableSeconds),
        a.inputValue,
        M.value
      );
    }, F = (I) => {
      const { rangeSeparator: y } = o.value, [T, O] = I.split(`${y}`);
      if (T) {
        const B = R(T.trim()), h = O ? R(O.trim()) : null, f = B && h ? [B, h] : [B];
        p(h, f, 0) && (v.value = B ? f : null);
      }
    }, C = () => {
      M.value = !0;
    }, N = (I) => {
      if (a.range)
        F(I);
      else if (a.multiDates) {
        const y = I.split(";");
        v.value = y.map((T) => R(T.trim())).filter((T) => T);
      } else
        v.value = R(I);
    }, W = (I) => {
      var y;
      const T = typeof I == "string" ? I : (y = I.target) == null ? void 0 : y.value;
      T !== "" ? (o.value.openMenu && !a.isMenuOpen && n("open"), N(T), n("set-input-date", v.value)) : S(), M.value = !1, n("update:input-value", T);
    }, H = (I) => {
      o.value.enabled ? (N(I.target.value), o.value.enterSubmit && Vo(v.value) && a.inputValue !== "" ? (n("set-input-date", v.value, !0), v.value = null) : o.value.enterSubmit && a.inputValue === "" && (v.value = null, n("clear"))) : g(I);
    }, z = (I) => {
      o.value.enabled && o.value.tabSubmit && N(I.target.value), o.value.tabSubmit && Vo(v.value) && a.inputValue !== "" ? (n("set-input-date", v.value, !0, !0), v.value = null) : o.value.tabSubmit && a.inputValue === "" && (v.value = null, n("clear", !0));
    }, G = () => {
      var I;
      A.value = !0, n("focus"), o.value.enabled && o.value.selectOnFocus && ((I = b.value) == null || I.select());
    }, g = (I) => {
      I.preventDefault(), Pr(I, s.value, !0), o.value.enabled && o.value.openMenu && !l.value.input && !a.isMenuOpen ? n("open") : o.value.enabled || n("toggle");
    }, E = () => {
      n("real-blur"), A.value = !1, (!a.isMenuOpen || l.value.enabled && l.value.input) && n("blur"), a.autoApply && o.value.enabled && v.value && !a.isMenuOpen && (n("set-input-date", v.value), n("select-date"), v.value = null);
    }, _ = (I) => {
      Pr(I, s.value, !0), n("clear");
    }, j = (I) => {
      if (!o.value.enabled) {
        if (I.code === "Tab")
          return;
        I.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var I;
        (I = b.value) == null || I.focus({ preventScroll: !0 });
      },
      setParsedDate: (I) => {
        v.value = I;
      }
    }), (I, y) => {
      var T;
      return $(), Z("div", { onClick: g }, [
        I.$slots.trigger && !I.$slots["dp-input"] && !k(l).enabled ? _e(I.$slots, "trigger", { key: 0 }) : re("", !0),
        !I.$slots.trigger && (!k(l).enabled || k(l).input) ? ($(), Z("div", vh, [
          I.$slots["dp-input"] && !I.$slots.trigger && !k(l).enabled ? _e(I.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: W,
            onEnter: H,
            onTab: z,
            onClear: _,
            onBlur: E,
            onKeypress: j,
            onPaste: C,
            openMenu: () => I.$emit("open"),
            closeMenu: () => I.$emit("close"),
            toggleMenu: () => I.$emit("toggle")
          }) : re("", !0),
          I.$slots["dp-input"] ? re("", !0) : ($(), Z("input", {
            key: 1,
            id: I.uid ? `dp-input-${I.uid}` : void 0,
            ref_key: "inputRef",
            ref: b,
            name: I.name,
            class: He(Q.value),
            inputmode: k(o).enabled ? "text" : "none",
            placeholder: I.placeholder,
            disabled: I.disabled,
            readonly: I.readonly,
            required: I.required,
            value: e.inputValue,
            autocomplete: I.autocomplete,
            "aria-label": (T = k(i)) == null ? void 0 : T.input,
            "aria-disabled": I.disabled || void 0,
            "aria-invalid": I.state === !1 ? !0 : void 0,
            onInput: W,
            onKeydown: [
              Se(H, ["enter"]),
              Se(z, ["tab"]),
              j
            ],
            onBlur: E,
            onFocus: G,
            onKeypress: j,
            onPaste: C
          }, null, 42, mh)),
          be("div", {
            onClick: y[2] || (y[2] = (O) => n("toggle"))
          }, [
            I.$slots["input-icon"] && !I.hideInputIcon ? ($(), Z("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: y[0] || (y[0] = (O) => n("toggle"))
            }, [
              _e(I.$slots, "input-icon")
            ])) : re("", !0),
            !I.$slots["input-icon"] && !I.hideInputIcon && !I.$slots["dp-input"] ? ($(), Ye(k(Wn), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: y[1] || (y[1] = (O) => n("toggle"))
            })) : re("", !0)
          ]),
          I.$slots["clear-icon"] && e.inputValue && I.clearable && !I.disabled && !I.readonly ? ($(), Z("span", hh, [
            _e(I.$slots, "clear-icon", { clear: _ })
          ])) : re("", !0),
          I.clearable && !I.$slots["clear-icon"] && e.inputValue && !I.disabled && !I.readonly ? ($(), Ye(k(xu), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: y[3] || (y[3] = qe((O) => _(O), ["prevent"]))
          })) : re("", !0)
        ])) : re("", !0)
      ]);
    };
  }
}), yh = ["title"], bh = { class: "dp__action_buttons" }, wh = ["disabled"], _h = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: !1 },
    calendarWidth: { type: Number, default: 0 },
    ...er
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const r = t, n = e, {
      defaultedActionRow: a,
      defaultedPreviewFormat: o,
      defaultedMultiCalendars: i,
      defaultedTextInput: l,
      defaultedInline: s,
      getDefaultPattern: u
    } = ut(n), { isValidTime: d } = tn(n), { buildMatrix: p } = Br(), v = oe(null), b = oe(null);
    yt(() => {
      n.arrowNavigation && p([ft(v), ft(b)], "actionRow");
    });
    const A = te(() => n.range && !n.partialRange && n.internalModelValue ? n.internalModelValue.length === 2 : !0), M = te(() => !Q.value || !S.value || !A.value), Q = te(() => !n.enableTimePicker || n.ignoreTimeValidation ? !0 : d(n.internalModelValue)), S = te(() => n.monthPicker ? n.range && Array.isArray(n.internalModelValue) ? !n.internalModelValue.filter((g) => !z(g)).length : z(n.internalModelValue) : !0), R = () => {
      const g = o.value;
      return n.timePicker || n.monthPicker, g(mt(n.internalModelValue));
    }, F = () => {
      const g = n.internalModelValue;
      return i.value.count > 0 ? `${C(g[0])} - ${C(g[1])}` : [C(g[0]), C(g[1])];
    }, C = (g) => Nu(
      g,
      o.value,
      n.formatLocale,
      l.value.rangeSeparator,
      n.modelAuto,
      u()
    ), N = te(() => !n.internalModelValue || !n.menuMount ? "" : typeof o.value == "string" ? Array.isArray(n.internalModelValue) ? n.internalModelValue.length === 2 && n.internalModelValue[1] ? F() : n.multiDates ? n.internalModelValue.map((g) => `${C(g)}`) : n.modelAuto ? `${C(n.internalModelValue[0])}` : `${C(n.internalModelValue[0])} -` : C(n.internalModelValue) : R()), W = () => n.multiDates ? "; " : " - ", H = te(
      () => Array.isArray(N.value) ? N.value.join(W()) : N.value
    ), z = (g) => {
      if (!n.monthPicker)
        return !0;
      let E = !0;
      const _ = X(Qt(g));
      if (n.minDate && n.maxDate) {
        const j = X(Qt(n.minDate)), I = X(Qt(n.maxDate));
        return At(_, j) && wt(_, I) || Qe(_, j) || Qe(_, I);
      }
      if (n.minDate) {
        const j = X(Qt(n.minDate));
        E = At(_, j) || Qe(_, j);
      }
      if (n.maxDate) {
        const j = X(Qt(n.maxDate));
        E = wt(_, j) || Qe(_, j);
      }
      return E;
    }, G = () => {
      Q.value && S.value && A.value ? r("select-date") : r("invalid-select");
    };
    return (g, E) => ($(), Z("div", {
      class: "dp__action_row",
      style: Mt(e.calendarWidth ? { width: `${e.calendarWidth}px` } : {})
    }, [
      g.$slots["action-row"] ? _e(g.$slots, "action-row", pt(ht({ key: 0 }, {
        internalModelValue: g.internalModelValue,
        disabled: M.value,
        selectDate: () => g.$emit("select-date"),
        closePicker: () => g.$emit("close-picker")
      }))) : ($(), Z(Oe, { key: 1 }, [
        k(a).showPreview ? ($(), Z("div", {
          key: 0,
          class: "dp__selection_preview",
          title: H.value
        }, [
          g.$slots["action-preview"] ? _e(g.$slots, "action-preview", {
            key: 0,
            value: g.internalModelValue
          }) : re("", !0),
          g.$slots["action-preview"] ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
            Jt(ot(H.value), 1)
          ], 64))
        ], 8, yh)) : re("", !0),
        be("div", bh, [
          g.$slots["action-buttons"] ? _e(g.$slots, "action-buttons", {
            key: 0,
            value: g.internalModelValue
          }) : re("", !0),
          g.$slots["action-buttons"] ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
            !k(s).enabled && k(a).showCancel ? ($(), Z("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: v,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: E[0] || (E[0] = (_) => g.$emit("close-picker")),
              onKeydown: [
                E[1] || (E[1] = Se((_) => g.$emit("close-picker"), ["enter"])),
                E[2] || (E[2] = Se((_) => g.$emit("close-picker"), ["space"]))
              ]
            }, ot(g.cancelText), 545)) : re("", !0),
            k(a).showNow ? ($(), Z("button", {
              key: 1,
              ref_key: "cancelButtonRef",
              ref: v,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: E[3] || (E[3] = (_) => g.$emit("select-now")),
              onKeydown: [
                E[4] || (E[4] = Se((_) => g.$emit("select-now"), ["enter"])),
                E[5] || (E[5] = Se((_) => g.$emit("select-now"), ["space"]))
              ]
            }, ot(g.nowButtonLabel), 545)) : re("", !0),
            k(a).showSelect ? ($(), Z("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: b,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: M.value,
              onKeydown: [
                Se(G, ["enter"]),
                Se(G, ["space"])
              ],
              onClick: G
            }, ot(g.selectText), 41, wh)) : re("", !0)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
}), xh = ["onKeydown"], kh = { class: "dp__selection_grid_header" }, Ah = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"], Dh = ["aria-label"], zn = /* @__PURE__ */ gt({
  __name: "SelectionOverlay",
  props: {
    items: {},
    type: {},
    isLast: { type: Boolean },
    arrowNavigation: { type: Boolean },
    skipButtonRef: { type: Boolean },
    headerRefs: {},
    hideNavigation: {},
    escClose: { type: Boolean },
    useRelative: { type: Boolean },
    height: {},
    textInput: { type: [Boolean, Object] },
    config: {},
    noOverlayFocus: { type: Boolean },
    focusValue: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: r }) {
    const { setSelectionGrid: n, buildMultiLevelMatrix: a, setMonthPicker: o } = Br(), i = r, l = e, { defaultedAriaLabels: s, defaultedTextInput: u, defaultedConfig: d } = ut(
      l
    ), { hideNavigationButtons: p } = La(), v = oe(!1), b = oe(null), A = oe(null), M = oe([]), Q = oe(), S = oe(null), R = oe(0), F = oe(null);
    Es(() => {
      b.value = null;
    }), yt(() => {
      ur().then(() => E()), l.noOverlayFocus || N(), C(!0);
    }), Vn(() => C(!1));
    const C = (h) => {
      var f;
      l.arrowNavigation && ((f = l.headerRefs) != null && f.length ? o(h) : n(h));
    }, N = () => {
      var h;
      const f = ft(A);
      f && (u.value.enabled || (b.value ? (h = b.value) == null || h.focus({ preventScroll: !0 }) : f.focus({ preventScroll: !0 })), v.value = f.clientHeight < f.scrollHeight);
    }, W = te(
      () => ({
        dp__overlay: !0,
        "dp--overlay-absolute": !l.useRelative,
        "dp--overlay-relative": l.useRelative
      })
    ), H = te(
      () => l.useRelative ? { height: `${l.height}px`, width: "260px" } : void 0
    ), z = te(() => ({
      dp__overlay_col: !0
    })), G = te(
      () => ({
        dp__btn: !0,
        dp__button: !0,
        dp__overlay_action: !0,
        dp__over_action_scroll: v.value,
        dp__button_bottom: l.isLast
      })
    ), g = te(() => {
      var h, f;
      return {
        dp__overlay_container: !0,
        dp__container_flex: ((h = l.items) == null ? void 0 : h.length) <= 6,
        dp__container_block: ((f = l.items) == null ? void 0 : f.length) > 6
      };
    });
    zt(
      () => l.items,
      () => E(),
      { deep: !0 }
    );
    const E = () => {
      ur().then(() => {
        const h = ft(b), f = ft(A), Y = ft(S), U = ft(F), ae = Y ? Y.getBoundingClientRect().height : 0;
        f && (f.getBoundingClientRect().height ? R.value = f.getBoundingClientRect().height - ae : R.value = d.value.modeHeight - ae), h && U && (U.scrollTop = h.offsetTop - U.offsetTop - (R.value / 2 - h.getBoundingClientRect().height) - ae);
      });
    }, _ = (h) => {
      h.disabled || i("selected", h.value);
    }, j = () => {
      i("toggle"), i("reset-flow");
    }, I = () => {
      l.escClose && j();
    }, y = (h, f, Y, U) => {
      h && ((f.active || f.value === l.focusValue) && (b.value = h), l.arrowNavigation && (Array.isArray(M.value[Y]) ? M.value[Y][U] = h : M.value[Y] = [h], T()));
    }, T = () => {
      var h, f;
      const Y = (h = l.headerRefs) != null && h.length ? [l.headerRefs].concat(M.value) : M.value.concat([l.skipButtonRef ? [] : [S.value]]);
      a(mt(Y), (f = l.headerRefs) != null && f.length ? "monthPicker" : "selectionGrid");
    }, O = (h) => {
      l.arrowNavigation || Pr(h, d.value, !0);
    }, B = (h) => {
      Q.value = h, i("hover-value", h);
    };
    return t({ focusGrid: N }), (h, f) => {
      var Y;
      return $(), Z("div", {
        ref_key: "gridWrapRef",
        ref: A,
        class: He(W.value),
        style: Mt(H.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          Se(qe(I, ["prevent"]), ["esc"]),
          f[0] || (f[0] = Se(qe((U) => O(U), ["prevent"]), ["left"])),
          f[1] || (f[1] = Se(qe((U) => O(U), ["prevent"]), ["up"])),
          f[2] || (f[2] = Se(qe((U) => O(U), ["prevent"]), ["down"])),
          f[3] || (f[3] = Se(qe((U) => O(U), ["prevent"]), ["right"]))
        ]
      }, [
        be("div", {
          ref_key: "containerRef",
          ref: F,
          class: He(g.value),
          role: "grid",
          style: Mt({ height: `${R.value}px` })
        }, [
          be("div", kh, [
            _e(h.$slots, "header")
          ]),
          h.$slots.overlay ? _e(h.$slots, "overlay", { key: 0 }) : ($(!0), Z(Oe, { key: 1 }, rt(h.items, (U, ae) => ($(), Z("div", {
            key: ae,
            class: He(["dp__overlay_row", { dp__flex_row: h.items.length >= 3 }]),
            role: "row"
          }, [
            ($(!0), Z(Oe, null, rt(U, (le, L) => ($(), Z("div", {
              key: le.value,
              ref_for: !0,
              ref: (w) => y(w, le, ae, L),
              role: "gridcell",
              class: He(z.value),
              "aria-selected": le.active,
              "aria-disabled": le.disabled || void 0,
              tabindex: "0",
              onClick: (w) => _(le),
              onKeydown: [
                Se(qe((w) => _(le), ["prevent"]), ["enter"]),
                Se(qe((w) => _(le), ["prevent"]), ["space"])
              ],
              onMouseover: (w) => B(le.value)
            }, [
              be("div", {
                class: He(le.className)
              }, [
                h.$slots.item ? _e(h.$slots, "item", {
                  key: 0,
                  item: le
                }) : re("", !0),
                h.$slots.item ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
                  Jt(ot(le.text), 1)
                ], 64))
              ], 2)
            ], 42, Ah))), 128))
          ], 2))), 128))
        ], 6),
        h.$slots["button-icon"] ? la(($(), Z("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: S,
          type: "button",
          "aria-label": (Y = k(s)) == null ? void 0 : Y.toggleOverlay,
          class: He(G.value),
          tabindex: "0",
          onClick: j,
          onKeydown: [
            Se(j, ["enter"]),
            Se(j, ["tab"])
          ]
        }, [
          _e(h.$slots, "button-icon")
        ], 42, Dh)), [
          [ca, !k(p)(h.hideNavigation, h.type)]
        ]) : re("", !0)
      ], 46, xh);
    };
  }
}), ja = /* @__PURE__ */ gt({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean }
  },
  setup(e) {
    const t = e, r = te(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), n = te(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (a, o) => ($(), Z("div", {
      class: He({
        dp__menu_inner: !a.stretch,
        "dp--menu--inner-stretched": a.stretch,
        dp__flex_display: a.multiCalendars > 0
      })
    }, [
      ($(!0), Z(Oe, null, rt(r.value, (i, l) => ($(), Z("div", {
        key: i,
        class: He(n.value)
      }, [
        _e(a.$slots, "default", {
          instance: i,
          index: l
        })
      ], 2))), 128))
    ], 2));
  }
}), Ch = ["aria-label", "aria-disabled"], Rn = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: t }) {
    const r = t, n = oe(null);
    return yt(() => r("set-ref", n)), (a, o) => ($(), Z("button", {
      ref_key: "elRef",
      ref: n,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": a.ariaLabel,
      "aria-disabled": a.disabled || void 0,
      onClick: o[0] || (o[0] = (i) => a.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = Se(qe((i) => a.$emit("activate"), ["prevent"]), ["enter"])),
        o[2] || (o[2] = Se(qe((i) => a.$emit("activate"), ["prevent"]), ["space"]))
      ]
    }, [
      be("span", {
        class: He(["dp__inner_nav", { dp__inner_nav_disabled: a.disabled }])
      }, [
        _e(a.$slots, "default")
      ], 2)
    ], 40, Ch));
  }
}), Th = { class: "dp--year-mode-picker" }, Mh = ["aria-label"], Uu = /* @__PURE__ */ gt({
  __name: "YearModePicker",
  props: {
    ...er,
    showYearPicker: { type: Boolean, default: !1 },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => !1 }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const r = t, n = e, { showRightIcon: a, showLeftIcon: o } = La(), { defaultedConfig: i, defaultedMultiCalendars: l, defaultedAriaLabels: s, defaultedTransitions: u } = ut(n), { showTransition: d, transitionName: p } = Qn(u), v = (M = !1, Q) => {
      r("toggle-year-picker", { flow: M, show: Q });
    }, b = (M) => {
      r("year-select", M);
    }, A = (M = !1) => {
      r("handle-year", M);
    };
    return (M, Q) => {
      var S, R, F;
      return $(), Z("div", Th, [
        k(o)(k(l), e.instance) ? ($(), Ye(Rn, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (S = k(s)) == null ? void 0 : S.prevYear,
          disabled: e.isDisabled(!1),
          onActivate: Q[0] || (Q[0] = (C) => A(!1))
        }, {
          default: Ne(() => [
            M.$slots["arrow-left"] ? _e(M.$slots, "arrow-left", { key: 0 }) : re("", !0),
            M.$slots["arrow-left"] ? re("", !0) : ($(), Ye(k(_i), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : re("", !0),
        be("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (R = k(s)) == null ? void 0 : R.openYearsOverlay,
          onClick: Q[1] || (Q[1] = () => v(!1)),
          onKeydown: Q[2] || (Q[2] = Se(() => v(!1), ["enter"]))
        }, [
          M.$slots.year ? _e(M.$slots, "year", {
            key: 0,
            year: e.year
          }) : re("", !0),
          M.$slots.year ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
            Jt(ot(e.year), 1)
          ], 64))
        ], 40, Mh),
        k(a)(k(l), e.instance) ? ($(), Ye(Rn, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (F = k(s)) == null ? void 0 : F.nextYear,
          disabled: e.isDisabled(!0),
          onActivate: Q[3] || (Q[3] = (C) => A(!0))
        }, {
          default: Ne(() => [
            M.$slots["arrow-right"] ? _e(M.$slots, "arrow-right", { key: 0 }) : re("", !0),
            M.$slots["arrow-right"] ? re("", !0) : ($(), Ye(k(xi), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : re("", !0),
        Ke(Ur, {
          name: k(p)(e.showYearPicker),
          css: k(d)
        }, {
          default: Ne(() => [
            e.showYearPicker ? ($(), Ye(zn, {
              key: 0,
              items: e.items,
              "text-input": M.textInput,
              "esc-close": M.escClose,
              config: M.config,
              "is-last": M.autoApply && !k(i).keepActionRow,
              type: "year",
              onToggle: v,
              onSelected: Q[4] || (Q[4] = (C) => b(C))
            }, Pt({
              "button-icon": Ne(() => [
                M.$slots["calendar-icon"] ? _e(M.$slots, "calendar-icon", { key: 0 }) : re("", !0),
                M.$slots["calendar-icon"] ? re("", !0) : ($(), Ye(k(Wn), { key: 1 }))
              ]),
              _: 2
            }, [
              M.$slots["year-overlay-value"] ? {
                name: "item",
                fn: Ne(({ item: C }) => [
                  _e(M.$slots, "year-overlay-value", {
                    text: C.text,
                    value: C.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last"])) : re("", !0)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
}), Si = (e, t, r) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((n) => Qe(e, n))) {
      const n = t.value.filter((a) => !Qe(a, e));
      t.value = n.length ? n : null;
    } else
      (r && +r > t.value.length || !r) && t.value.push(e);
  else
    t.value = [e];
}, Ii = (e, t, r) => {
  let n = e.value ? e.value.slice() : [];
  return n.length === 2 && n[1] !== null && (n = []), n.length ? wt(t, n[0]) ? (n.unshift(t), r("range-start", n[0]), r("range-start", n[1])) : (n[1] = t, r("range-end", t)) : (n = [t], r("range-start", t)), e.value = n, n;
}, Va = (e, t, r, n) => {
  e[0] && e[1] && r && t("auto-apply"), e[0] && !e[1] && n && r && t("auto-apply");
}, Bu = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => Zt(X(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = Zt(X(e.value), e.timezone));
}, Fu = ({
  multiCalendars: e,
  highlight: t,
  calendars: r,
  modelValue: n,
  props: a,
  year: o,
  month: i,
  emit: l
}) => {
  const s = te(() => Oi(a.yearRange, a.reverseYears)), u = oe([!1]), d = te(() => (C, N) => {
    const W = tt(Qt(/* @__PURE__ */ new Date()), {
      month: i.value(C),
      year: o.value(C)
    });
    return Eu(W, a.maxDate, a.minDate, a.preventMinMaxNavigation, N);
  }), p = () => {
    for (let C = 0; C < e.value.count; C++)
      if (C === 0)
        r.value[C] = r.value[0];
      else {
        const N = tt(X(), r.value[C - 1]);
        r.value[C] = { month: Le(N), year: Re(pi(N, 1)) };
      }
  }, v = (C) => {
    if (!C)
      return p();
    const N = tt(X(), r.value[C]);
    return r.value[0].year = Re(_u(N, e.value.count - 1)), p();
  }, b = (C) => a.focusStartDate ? C[0] : C[1] ? C[1] : C[0], A = () => {
    if (n.value) {
      const C = Array.isArray(n.value) ? b(n.value) : n.value;
      r.value[0] = { month: Le(C), year: Re(C) };
    }
  };
  yt(() => {
    A(), e.value.count && p();
  });
  const M = (C, N) => {
    r.value[N].year = C, e.value.count && !e.value.solo && v(N);
  }, Q = te(() => (C) => yn(s.value, (N) => {
    const W = o.value(C) === N.value, H = jn(N.value, bn(a.minDate), bn(a.maxDate)), z = Pi(t.value, N.value);
    return { active: W, disabled: H, highlighted: z };
  })), S = (C, N) => {
    M(C, N), F(N);
  }, R = (C, N = !1) => {
    if (!d.value(C, N)) {
      const W = N ? o.value(C) + 1 : o.value(C) - 1;
      M(W, C);
    }
  }, F = (C, N = !1, W) => {
    N || l("reset-flow"), W !== void 0 ? u.value[C] = W : u.value[C] = !u.value[C], u.value || l("overlay-closed");
  };
  return {
    isDisabled: d,
    groupedYears: Q,
    showYearPicker: u,
    selectYear: M,
    toggleYearPicker: F,
    handleYearSelect: S,
    handleYear: R
  };
}, Oh = (e, t) => {
  const { defaultedMultiCalendars: r, defaultedAriaLabels: n, defaultedTransitions: a, defaultedConfig: o, defaultedHighlight: i } = ut(e), { modelValue: l, year: s, month: u, calendars: d } = Gn(e, t), p = te(() => Cu(e.formatLocale, e.locale, e.monthNameFormat)), v = oe(null), {
    selectYear: b,
    groupedYears: A,
    showYearPicker: M,
    toggleYearPicker: Q,
    handleYearSelect: S,
    handleYear: R,
    isDisabled: F
  } = Fu({
    modelValue: l,
    multiCalendars: r,
    highlight: i,
    calendars: d,
    year: s,
    month: u,
    props: e,
    emit: t
  });
  yt(() => {
    e.startDate && (l.value && e.focusStartDate || !l.value) && b(Re(X(e.startDate)), 0);
  });
  const C = (O) => O ? { month: Le(O), year: Re(O) } : { month: null, year: null }, N = () => l.value ? Array.isArray(l.value) ? l.value.map((O) => C(O)) : C(l.value) : C(), W = (O, B) => {
    const h = d.value[O], f = N();
    return Array.isArray(f) ? f.some((Y) => Y.year === (h == null ? void 0 : h.year) && Y.month === B) : (h == null ? void 0 : h.year) === f.year && B === f.month;
  }, H = (O, B, h) => {
    var f, Y;
    const U = N();
    return Array.isArray(U) ? s.value(B) === ((f = U[h]) == null ? void 0 : f.year) && O === ((Y = U[h]) == null ? void 0 : Y.month) : !1;
  }, z = (O, B) => {
    if (e.range) {
      const h = N();
      if (Array.isArray(l.value) && Array.isArray(h)) {
        const f = H(O, B, 0) || H(O, B, 1), Y = mr(Qt(X()), O, s.value(B));
        return Ha(l.value, v.value, Y) && !f;
      }
      return !1;
    }
    return !1;
  }, G = te(() => (O) => yn(p.value, (B) => {
    const h = W(O, B.value), f = jn(
      B.value,
      Mu(s.value(O), e.minDate),
      Ou(s.value(O), e.maxDate)
    ) || qm(e.disabledDates, s.value(O)).includes(B.value), Y = z(B.value, O), U = Ru(i.value, B.value, s.value(O));
    return { active: h, disabled: f, isBetween: Y, highlighted: U };
  })), g = (O, B) => mr(Qt(X()), O, s.value(B)), E = (O, B) => {
    const h = l.value ? l.value : Qt(/* @__PURE__ */ new Date());
    l.value = mr(h, O, s.value(B)), t("auto-apply");
  }, _ = (O, B) => {
    const h = Ii(l, g(O, B), t);
    Va(h, t, e.autoApply, e.modelAuto);
  }, j = (O, B) => {
    Si(g(O, B), l, e.multiDatesLimit), t("auto-apply", !0);
  }, I = (O, B) => (d.value[B].month = O, T(B, d.value[B].year, O), e.multiDates ? j(O, B) : e.range ? _(O, B) : E(O, B)), y = (O, B) => {
    b(O, B), T(B, O, null);
  }, T = (O, B, h) => {
    let f = h;
    if (!f) {
      const Y = N();
      f = Array.isArray(Y) ? Y[O].month : Y.month;
    }
    t("update-month-year", { instance: O, year: B, month: f });
  };
  return {
    groupedMonths: G,
    groupedYears: A,
    year: s,
    isDisabled: F,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: o,
    showYearPicker: M,
    modelValue: l,
    presetDate: (O, B) => {
      Bu({ value: O, modelValue: l, range: e.range, timezone: B ? void 0 : e.timezone }), t("auto-apply");
    },
    setHoverDate: (O, B) => {
      v.value = g(O, B);
    },
    selectMonth: I,
    selectYear: y,
    toggleYearPicker: Q,
    handleYearSelect: S,
    handleYear: R,
    getModelMonthYear: N
  };
}, Ph = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...er
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year",
    "mount"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = en(), o = Ut(a, "yearMode"), i = e;
    yt(() => {
      i.shadow || n("mount", null);
    });
    const {
      groupedMonths: l,
      groupedYears: s,
      year: u,
      isDisabled: d,
      defaultedMultiCalendars: p,
      defaultedConfig: v,
      showYearPicker: b,
      modelValue: A,
      presetDate: M,
      setHoverDate: Q,
      selectMonth: S,
      selectYear: R,
      toggleYearPicker: F,
      handleYearSelect: C,
      handleYear: N,
      getModelMonthYear: W
    } = Oh(i, n);
    return t({ getSidebarProps: () => ({
      modelValue: A,
      year: u,
      getModelMonthYear: W,
      selectMonth: S,
      selectYear: R,
      handleYear: N
    }), presetDate: M, toggleYearPicker: (H) => F(0, H) }), (H, z) => ($(), Ye(ja, {
      "multi-calendars": k(p).count,
      stretch: ""
    }, {
      default: Ne(({ instance: G }) => [
        H.$slots["month-year"] ? _e(H.$slots, "month-year", pt(ht({ key: 0 }, {
          year: k(u),
          months: k(l)(G),
          years: k(s)(G),
          selectMonth: k(S),
          selectYear: k(R),
          instance: G
        }))) : ($(), Ye(zn, {
          key: 1,
          items: k(l)(G),
          "arrow-navigation": H.arrowNavigation,
          "is-last": H.autoApply && !k(v).keepActionRow,
          "esc-close": H.escClose,
          height: k(v).modeHeight,
          config: H.config,
          "no-overlay-focus": H.noOverlayFocus,
          "use-relative": "",
          type: "month",
          onSelected: (g) => k(S)(g, G),
          onHoverValue: (g) => k(Q)(g, G)
        }, {
          header: Ne(() => [
            Ke(Uu, ht(H.$props, {
              items: k(s)(G),
              instance: G,
              "show-year-picker": k(b)[G],
              year: k(u)(G),
              "is-disabled": (g) => k(d)(G, g),
              onHandleYear: (g) => k(N)(G, g),
              onYearSelect: (g) => k(C)(g, G),
              onToggleYearPicker: (g) => k(F)(G, g == null ? void 0 : g.flow, g == null ? void 0 : g.show)
            }), Pt({ _: 2 }, [
              rt(k(o), (g, E) => ({
                name: g,
                fn: Ne((_) => [
                  _e(H.$slots, g, pt(Ot(_)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
}), Sh = (e, t) => {
  const { modelValue: r } = Gn(e, t), n = oe(null), { defaultedHighlight: a } = ut(e), o = oe();
  yt(() => {
    e.startDate && (r.value && e.focusStartDate || !r.value) && (o.value = Re(X(e.startDate)));
  });
  const i = (d) => Array.isArray(r.value) ? r.value.some((p) => Re(p) === d) : r.value ? Re(r.value) === d : !1, l = (d) => e.range && Array.isArray(r.value) ? Ha(r.value, n.value, u(d)) : !1, s = te(() => yn(Oi(e.yearRange, e.reverseYears), (d) => {
    const p = i(d.value), v = jn(d.value, bn(e.minDate), bn(e.maxDate)), b = l(d.value), A = Pi(a.value, d.value);
    return { active: p, disabled: v, isBetween: b, highlighted: A };
  })), u = (d) => lr(Qt(/* @__PURE__ */ new Date()), d);
  return {
    groupedYears: s,
    modelValue: r,
    focusYear: o,
    setHoverValue: (d) => {
      n.value = lr(Qt(/* @__PURE__ */ new Date()), d);
    },
    selectYear: (d) => {
      var p;
      if (e.multiDates)
        return r.value ? Array.isArray(r.value) && (((p = r.value) == null ? void 0 : p.map((v) => Re(v))).includes(d) ? r.value = r.value.filter((v) => Re(v) !== d) : r.value.push(lr(Nt(X()), d))) : r.value = [lr(Nt(X()), d)], t("auto-apply", !0);
      if (e.range) {
        const v = Ii(r, u(d), t);
        return Va(v, t, e.autoApply, e.modelAuto);
      }
      r.value = u(d), t("auto-apply");
    }
  };
}, Ih = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...er
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { groupedYears: o, modelValue: i, focusYear: l, selectYear: s, setHoverValue: u } = Sh(a, n), { defaultedConfig: d } = ut(a);
    return t({ getSidebarProps: () => ({
      modelValue: i,
      selectYear: s
    }) }), (p, v) => ($(), Z("div", null, [
      p.$slots["month-year"] ? _e(p.$slots, "month-year", pt(ht({ key: 0 }, {
        years: k(o),
        selectYear: k(s)
      }))) : ($(), Ye(zn, {
        key: 1,
        items: k(o),
        "is-last": p.autoApply && !k(d).keepActionRow,
        height: k(d).modeHeight,
        config: p.config,
        "no-overlay-focus": p.noOverlayFocus,
        "focus-value": k(l),
        type: "year",
        "use-relative": "",
        onSelected: k(s),
        onHoverValue: k(u)
      }, Pt({ _: 2 }, [
        p.$slots["year-overlay-value"] ? {
          name: "item",
          fn: Ne(({ item: b }) => [
            _e(p.$slots, "year-overlay-value", {
              text: b.text,
              value: b.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
}), Eh = {
  key: 0,
  class: "dp__time_input"
}, Nh = ["aria-label", "onKeydown", "onClick"], Rh = /* @__PURE__ */ be("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1), Yh = /* @__PURE__ */ be("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1), Uh = ["aria-label", "disabled", "onKeydown", "onClick"], Bh = ["aria-label", "onKeydown", "onClick"], Fh = /* @__PURE__ */ be("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1), Hh = /* @__PURE__ */ be("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1), Lh = { key: 0 }, $h = ["aria-label", "onKeydown"], jh = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: { type: Function, default: () => !1 },
    ...er
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { setTimePickerElements: o, setTimePickerBackRef: i } = Br(), { defaultedAriaLabels: l, defaultedTransitions: s, defaultedFilters: u, defaultedConfig: d } = ut(a), { transitionName: p, showTransition: v } = Qn(s), b = Yr({
      hours: !1,
      minutes: !1,
      seconds: !1
    }), A = oe("AM"), M = oe(null), Q = oe([]);
    yt(() => {
      n("mounted");
    });
    const S = (w) => tt(/* @__PURE__ */ new Date(), {
      hours: w.hours,
      minutes: w.minutes,
      seconds: a.enableSeconds ? w.seconds : 0,
      milliseconds: 0
    }), R = te(
      () => (w) => I(w, a[w]) || C(w, a[w])
    ), F = te(() => ({ hours: a.hours, minutes: a.minutes, seconds: a.seconds })), C = (w, pe) => a.range && !a.disableTimeRangeValidation ? !a.validateTime(w, pe) : !1, N = (w, pe) => {
      if (a.range && !a.disableTimeRangeValidation) {
        const he = pe ? +a[`${w}Increment`] : -+a[`${w}Increment`], K = a[w] + he;
        return !a.validateTime(w, K);
      }
      return !1;
    }, W = te(() => (w) => !T(+a[w] + +a[`${w}Increment`], w) || N(w, !0)), H = te(() => (w) => !T(+a[w] - +a[`${w}Increment`], w) || N(w, !1)), z = (w, pe) => tu(tt(X(), w), pe), G = (w, pe) => im(tt(X(), w), pe), g = te(
      () => ({
        dp__time_col: !0,
        dp__time_col_block: !a.timePickerInline,
        dp__time_col_reg_block: !a.enableSeconds && a.is24 && !a.timePickerInline,
        dp__time_col_reg_inline: !a.enableSeconds && a.is24 && a.timePickerInline,
        dp__time_col_reg_with_button: !a.enableSeconds && !a.is24,
        dp__time_col_sec: a.enableSeconds && a.is24,
        dp__time_col_sec_with_button: a.enableSeconds && !a.is24
      })
    ), E = te(() => {
      const w = [{ type: "hours" }, { type: "", separator: !0 }, { type: "minutes" }];
      return a.enableSeconds ? w.concat([{ type: "", separator: !0 }, { type: "seconds" }]) : w;
    }), _ = te(() => E.value.filter((w) => !w.separator)), j = te(() => (w) => {
      if (w === "hours") {
        const pe = Y(+a.hours);
        return { text: pe < 10 ? `0${pe}` : `${pe}`, value: pe };
      }
      return { text: a[w] < 10 ? `0${a[w]}` : `${a[w]}`, value: a[w] };
    }), I = (w, pe) => {
      var he;
      if (!a.disabledTimesConfig)
        return !1;
      const K = a.disabledTimesConfig(a.order, w === "hours" ? pe : void 0);
      return K[w] ? !!((he = K[w]) != null && he.includes(pe)) : !0;
    }, y = (w) => {
      const pe = a.is24 ? 24 : 12, he = w === "hours" ? pe : 60, K = +a[`${w}GridIncrement`], De = w === "hours" && !a.is24 ? K : 0, ve = [];
      for (let c = De; c < he; c += K)
        ve.push({ value: c, text: c < 10 ? `0${c}` : `${c}` });
      return w === "hours" && !a.is24 && ve.push({ value: 0, text: "12" }), yn(ve, (c) => ({ active: !1, disabled: u.value.times[w].includes(c.value) || !T(c.value, w) || I(w, c.value) || C(w, c.value) }));
    }, T = (w, pe) => {
      const he = a.minTime ? S(so(a.minTime)) : null, K = a.maxTime ? S(so(a.maxTime)) : null, De = S(so(F.value, pe, w));
      return he && K ? ($n(De, K) || ln(De, K)) && (hn(De, he) || ln(De, he)) : he ? hn(De, he) || ln(De, he) : K ? $n(De, K) || ln(De, K) : !0;
    }, O = (w) => a[`no${w[0].toUpperCase() + w.slice(1)}Overlay`], B = (w) => {
      O(w) || (b[w] = !b[w], b[w] || n("overlay-closed"));
    }, h = (w) => w === "hours" ? Xt : w === "minutes" ? sr : mn, f = (w, pe = !0) => {
      const he = pe ? z : G, K = pe ? +a[`${w}Increment`] : -+a[`${w}Increment`];
      T(+a[w] + K, w) && n(
        `update:${w}`,
        h(w)(he({ [w]: +a[w] }, { [w]: +a[`${w}Increment`] }))
      );
    }, Y = (w) => a.is24 ? w : (w >= 12 ? A.value = "PM" : A.value = "AM", Rm(w)), U = () => {
      A.value === "PM" ? (A.value = "AM", n("update:hours", a.hours - 12)) : (A.value = "PM", n("update:hours", a.hours + 12)), n("am-pm-change", A.value);
    }, ae = (w) => {
      b[w] = !0;
    }, le = (w, pe, he) => {
      if (w && a.arrowNavigation) {
        Array.isArray(Q.value[pe]) ? Q.value[pe][he] = w : Q.value[pe] = [w];
        const K = Q.value.reduce(
          (De, ve) => ve.map((c, m) => [...De[m] || [], ve[m]]),
          []
        );
        i(a.closeTimePickerBtn), M.value && (K[1] = K[1].concat(M.value)), o(K, a.order);
      }
    }, L = (w, pe) => (B(w), w === "hours" && !a.is24 ? n(`update:${w}`, A.value === "PM" ? pe + 12 : pe) : n(`update:${w}`, pe));
    return t({ openChildCmp: ae }), (w, pe) => {
      var he;
      return w.disabled ? re("", !0) : ($(), Z("div", Eh, [
        ($(!0), Z(Oe, null, rt(E.value, (K, De) => {
          var ve, c, m;
          return $(), Z("div", {
            key: De,
            class: He(g.value)
          }, [
            K.separator ? ($(), Z(Oe, { key: 0 }, [
              Jt(" : ")
            ], 64)) : ($(), Z(Oe, { key: 1 }, [
              be("button", {
                ref_for: !0,
                ref: (P) => le(P, De, 0),
                type: "button",
                class: He({
                  dp__btn: !0,
                  dp__inc_dec_button: !w.timePickerInline,
                  dp__inc_dec_button_inline: w.timePickerInline,
                  dp__tp_inline_btn_top: w.timePickerInline,
                  dp__inc_dec_button_disabled: W.value(K.type)
                }),
                "aria-label": (ve = k(l)) == null ? void 0 : ve.incrementValue(K.type),
                tabindex: "0",
                onKeydown: [
                  Se(qe((P) => f(K.type), ["prevent"]), ["enter"]),
                  Se(qe((P) => f(K.type), ["prevent"]), ["space"])
                ],
                onClick: (P) => f(K.type)
              }, [
                a.timePickerInline ? ($(), Z(Oe, { key: 1 }, [
                  Rh,
                  Yh
                ], 64)) : ($(), Z(Oe, { key: 0 }, [
                  w.$slots["arrow-up"] ? _e(w.$slots, "arrow-up", { key: 0 }) : re("", !0),
                  w.$slots["arrow-up"] ? re("", !0) : ($(), Ye(k(Ai), { key: 1 }))
                ], 64))
              ], 42, Nh),
              be("button", {
                ref_for: !0,
                ref: (P) => le(P, De, 1),
                type: "button",
                "aria-label": (c = k(l)) == null ? void 0 : c.openTpOverlay(K.type),
                class: He({
                  dp__time_display: !0,
                  dp__time_display_block: !w.timePickerInline,
                  dp__time_display_inline: w.timePickerInline,
                  "dp--time-invalid": R.value(K.type),
                  "dp--time-overlay-btn": !R.value(K.type)
                }),
                disabled: O(K.type),
                tabindex: "0",
                onKeydown: [
                  Se(qe((P) => B(K.type), ["prevent"]), ["enter"]),
                  Se(qe((P) => B(K.type), ["prevent"]), ["space"])
                ],
                onClick: (P) => B(K.type)
              }, [
                w.$slots[K.type] ? _e(w.$slots, K.type, {
                  key: 0,
                  text: j.value(K.type).text,
                  value: j.value(K.type).value
                }) : re("", !0),
                w.$slots[K.type] ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
                  Jt(ot(j.value(K.type).text), 1)
                ], 64))
              ], 42, Uh),
              be("button", {
                ref_for: !0,
                ref: (P) => le(P, De, 2),
                type: "button",
                class: He({
                  dp__btn: !0,
                  dp__inc_dec_button: !w.timePickerInline,
                  dp__inc_dec_button_inline: w.timePickerInline,
                  dp__tp_inline_btn_bottom: w.timePickerInline,
                  dp__inc_dec_button_disabled: H.value(K.type)
                }),
                "aria-label": (m = k(l)) == null ? void 0 : m.decrementValue(K.type),
                tabindex: "0",
                onKeydown: [
                  Se(qe((P) => f(K.type, !1), ["prevent"]), ["enter"]),
                  Se(qe((P) => f(K.type, !1), ["prevent"]), ["space"])
                ],
                onClick: (P) => f(K.type, !1)
              }, [
                a.timePickerInline ? ($(), Z(Oe, { key: 1 }, [
                  Fh,
                  Hh
                ], 64)) : ($(), Z(Oe, { key: 0 }, [
                  w.$slots["arrow-down"] ? _e(w.$slots, "arrow-down", { key: 0 }) : re("", !0),
                  w.$slots["arrow-down"] ? re("", !0) : ($(), Ye(k(Di), { key: 1 }))
                ], 64))
              ], 42, Bh)
            ], 64))
          ], 2);
        }), 128)),
        w.is24 ? re("", !0) : ($(), Z("div", Lh, [
          w.$slots["am-pm-button"] ? _e(w.$slots, "am-pm-button", {
            key: 0,
            toggle: U,
            value: A.value
          }) : re("", !0),
          w.$slots["am-pm-button"] ? re("", !0) : ($(), Z("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: M,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (he = k(l)) == null ? void 0 : he.amPmButton,
            tabindex: "0",
            onClick: U,
            onKeydown: [
              Se(qe(U, ["prevent"]), ["enter"]),
              Se(qe(U, ["prevent"]), ["space"])
            ]
          }, ot(A.value), 41, $h))
        ])),
        ($(!0), Z(Oe, null, rt(_.value, (K, De) => ($(), Ye(Ur, {
          key: De,
          name: k(p)(b[K.type]),
          css: k(v)
        }, {
          default: Ne(() => [
            b[K.type] ? ($(), Ye(zn, {
              key: 0,
              items: y(K.type),
              "is-last": w.autoApply && !k(d).keepActionRow,
              "esc-close": w.escClose,
              type: K.type,
              "text-input": w.textInput,
              config: w.config,
              "arrow-navigation": w.arrowNavigation,
              onSelected: (ve) => L(K.type, ve),
              onToggle: (ve) => B(K.type),
              onResetFlow: pe[0] || (pe[0] = (ve) => w.$emit("reset-flow"))
            }, Pt({
              "button-icon": Ne(() => [
                w.$slots["clock-icon"] ? _e(w.$slots, "clock-icon", { key: 0 }) : re("", !0),
                w.$slots["clock-icon"] ? re("", !0) : ($(), Ye(k(ki), { key: 1 }))
              ]),
              _: 2
            }, [
              w.$slots[`${K.type}-overlay-value`] ? {
                name: "item",
                fn: Ne(({ item: ve }) => [
                  _e(w.$slots, `${K.type}-overlay-value`, {
                    text: ve.text,
                    value: ve.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "onSelected", "onToggle"])) : re("", !0)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
}), Vh = { class: "dp--tp-wrap" }, Wh = ["aria-label", "tabindex"], Qh = ["tabindex"], Gh = ["aria-label"], Hu = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: {
      type: Function,
      default: () => !1
    },
    ...er
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-opened",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { buildMatrix: o, setTimePicker: i } = Br(), l = en(), { defaultedTransitions: s, defaultedAriaLabels: u, defaultedTextInput: d, defaultedConfig: p } = ut(a), { transitionName: v, showTransition: b } = Qn(s), { hideNavigationButtons: A } = La(), M = oe(null), Q = oe(null), S = oe([]), R = oe(null);
    yt(() => {
      n("mount"), !a.timePicker && a.arrowNavigation ? o([ft(M.value)], "time") : i(!0, a.timePicker);
    });
    const F = te(() => a.range && a.modelAuto ? Tu(a.internalModelValue) : !0), C = oe(!1), N = (y) => ({
      hours: Array.isArray(a.hours) ? a.hours[y] : a.hours,
      minutes: Array.isArray(a.minutes) ? a.minutes[y] : a.minutes,
      seconds: Array.isArray(a.seconds) ? a.seconds[y] : a.seconds
    }), W = te(() => {
      const y = [];
      if (a.range)
        for (let T = 0; T < 2; T++)
          y.push(N(T));
      else
        y.push(N(0));
      return y;
    }), H = (y, T = !1, O = "") => {
      T || n("reset-flow"), C.value = y, n(y ? "overlay-opened" : "overlay-closed"), a.arrowNavigation && i(y), ur(() => {
        O !== "" && S.value[0] && S.value[0].openChildCmp(O);
      });
    }, z = te(() => ({
      dp__btn: !0,
      dp__button: !0,
      dp__button_bottom: a.autoApply && !p.value.keepActionRow
    })), G = Ut(l, "timePicker"), g = (y, T, O) => a.range ? T === 0 ? [y, W.value[1][O]] : [W.value[0][O], y] : y, E = (y) => {
      n("update:hours", y);
    }, _ = (y) => {
      n("update:minutes", y);
    }, j = (y) => {
      n("update:seconds", y);
    }, I = () => {
      if (R.value && !d.value.enabled && !a.noOverlayFocus) {
        const y = Um(R.value);
        y && y.focus({ preventScroll: !0 });
      }
    };
    return t({ toggleTimePicker: H }), (y, T) => {
      var O;
      return $(), Z("div", Vh, [
        !y.timePicker && !y.timePickerInline ? la(($(), Z("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: M,
          type: "button",
          class: He(z.value),
          "aria-label": (O = k(u)) == null ? void 0 : O.openTimePicker,
          tabindex: y.noOverlayFocus ? void 0 : 0,
          onKeydown: [
            T[0] || (T[0] = Se((B) => H(!0), ["enter"])),
            T[1] || (T[1] = Se((B) => H(!0), ["space"]))
          ],
          onClick: T[2] || (T[2] = (B) => H(!0))
        }, [
          y.$slots["clock-icon"] ? _e(y.$slots, "clock-icon", { key: 0 }) : re("", !0),
          y.$slots["clock-icon"] ? re("", !0) : ($(), Ye(k(ki), { key: 1 }))
        ], 42, Wh)), [
          [ca, !k(A)(y.hideNavigation, "time")]
        ]) : re("", !0),
        Ke(Ur, {
          name: k(v)(C.value),
          css: k(b) && !y.timePickerInline
        }, {
          default: Ne(() => {
            var B;
            return [
              C.value || y.timePicker || y.timePickerInline ? ($(), Z("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: R,
                class: He({
                  dp__overlay: !y.timePickerInline,
                  "dp--overlay-absolute": !a.timePicker && !y.timePickerInline,
                  "dp--overlay-relative": a.timePicker
                }),
                style: Mt(y.timePicker ? { height: `${k(p).modeHeight}px` } : void 0),
                tabindex: y.timePickerInline ? void 0 : 0
              }, [
                be("div", {
                  class: He(
                    y.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  y.$slots["time-picker-overlay"] ? _e(y.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: E,
                    setMinutes: _,
                    setSeconds: j
                  }) : re("", !0),
                  y.$slots["time-picker-overlay"] ? re("", !0) : ($(), Z("div", {
                    key: 1,
                    class: He(y.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    ($(!0), Z(Oe, null, rt(W.value, (h, f) => la(($(), Ye(jh, ht({ key: f }, {
                      ...y.$props,
                      order: f,
                      hours: h.hours,
                      minutes: h.minutes,
                      seconds: h.seconds,
                      closeTimePickerBtn: Q.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: f === 0 ? y.fixedStart : y.fixedEnd
                    }, {
                      ref_for: !0,
                      ref_key: "timeInputRefs",
                      ref: S,
                      "validate-time": (Y, U) => e.validateTime(Y, g(U, f, Y)),
                      "onUpdate:hours": (Y) => E(g(Y, f, "hours")),
                      "onUpdate:minutes": (Y) => _(g(Y, f, "minutes")),
                      "onUpdate:seconds": (Y) => j(g(Y, f, "seconds")),
                      onMounted: I,
                      onOverlayClosed: I,
                      onAmPmChange: T[3] || (T[3] = (Y) => y.$emit("am-pm-change", Y))
                    }), Pt({ _: 2 }, [
                      rt(k(G), (Y, U) => ({
                        name: Y,
                        fn: Ne((ae) => [
                          _e(y.$slots, Y, pt(Ot(ae)))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [ca, f === 0 ? !0 : F.value]
                    ])), 128))
                  ], 2)),
                  !y.timePicker && !y.timePickerInline ? la(($(), Z("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: Q,
                    type: "button",
                    class: He(z.value),
                    "aria-label": (B = k(u)) == null ? void 0 : B.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      T[4] || (T[4] = Se((h) => H(!1), ["enter"])),
                      T[5] || (T[5] = Se((h) => H(!1), ["space"]))
                    ],
                    onClick: T[6] || (T[6] = (h) => H(!1))
                  }, [
                    y.$slots["calendar-icon"] ? _e(y.$slots, "calendar-icon", { key: 0 }) : re("", !0),
                    y.$slots["calendar-icon"] ? re("", !0) : ($(), Ye(k(Wn), { key: 1 }))
                  ], 42, Gh)), [
                    [ca, !k(A)(y.hideNavigation, "time")]
                  ]) : re("", !0)
                ], 2)
              ], 14, Qh)) : re("", !0)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
}), Lu = (e, t, r, n) => {
  const a = (S, R) => Array.isArray(t[S]) ? t[S][R] : t[S], o = (S) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[S] : t.seconds : 0, i = (S, R) => S ? R !== void 0 ? Sr(S, a("hours", R), a("minutes", R), o(R)) : Sr(S, t.hours, t.minutes, o()) : wi(X(), o(R)), l = (S, R) => {
    t[S] = R;
  }, s = (S, R) => {
    const F = Object.fromEntries(
      Object.keys(t).map((C) => C === S ? [C, R] : [C, t[C]].slice())
    );
    if (e.range && !e.disableTimeRangeValidation) {
      const C = (W) => r.value ? Sr(
        r.value[W],
        F.hours[W],
        F.minutes[W],
        F.seconds[W]
      ) : null, N = (W) => bi(r.value[W], 0);
      return !(Qe(C(0), C(1)) && (hn(C(0), N(1)) || $n(C(1), N(0))));
    }
    return !0;
  }, u = (S, R) => {
    s(S, R) && (l(S, R), n && n());
  }, d = (S) => {
    u("hours", S);
  }, p = (S) => {
    u("minutes", S);
  }, v = (S) => {
    u("seconds", S);
  }, b = (S, R, F, C) => {
    R && d(S), !R && !F && p(S), F && v(S), r.value && C(r.value);
  }, A = (S) => {
    if (S) {
      const R = Array.isArray(S), F = R ? [+S[0].hours, +S[1].hours] : +S.hours, C = R ? [+S[0].minutes, +S[1].minutes] : +S.minutes, N = R ? [+S[0].seconds, +S[1].seconds] : +S.seconds;
      l("hours", F), l("minutes", C), e.enableSeconds && l("seconds", N);
    }
  }, M = (S, R) => {
    const F = {
      hours: Array.isArray(t.hours) ? t.hours[S] : t.hours,
      disabledArr: []
    };
    return (R || R === 0) && (F.hours = R), Array.isArray(e.disabledTimes) && (F.disabledArr = e.range && Array.isArray(e.disabledTimes[S]) ? e.disabledTimes[S] : e.disabledTimes), F;
  }, Q = te(() => (S, R) => {
    var F;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: C, hours: N } = M(S, R), W = C.filter((H) => +H.hours === N);
      return ((F = W[0]) == null ? void 0 : F.minutes) === "*" ? { hours: [N], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (W == null ? void 0 : W.map((H) => +H.minutes)) ?? [],
        seconds: (W == null ? void 0 : W.map((H) => H.seconds ? +H.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: l,
    updateHours: d,
    updateMinutes: p,
    updateSeconds: v,
    getSetDateTime: i,
    updateTimeValues: b,
    getSecondsValue: o,
    assignStartTime: A,
    validateTime: s,
    disabledTimesConfig: Q
  };
}, zh = (e, t) => {
  const { modelValue: r, time: n } = Gn(e, t), { defaultedStartTime: a } = ut(e), { updateTimeValues: o, getSetDateTime: i, setTime: l, assignStartTime: s, disabledTimesConfig: u, validateTime: d } = Lu(e, n, r), p = (R) => {
    const { hours: F, minutes: C, seconds: N } = R;
    return { hours: +F, minutes: +C, seconds: N ? +N : 0 };
  }, v = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const F = p(e.startTime[0]), C = p(e.startTime[1]);
        return [tt(X(), F), tt(X(), C)];
      }
      const R = p(e.startTime);
      return tt(X(), R);
    }
    return e.range ? [null, null] : null;
  }, b = () => {
    if (e.range) {
      const [R, F] = v();
      r.value = [i(R, 0), i(F, 1)];
    } else
      r.value = i(v());
  }, A = (R) => Array.isArray(R) ? [Kr(X(R[0])), Kr(X(R[1]))] : [Kr(R ?? X())], M = (R, F, C) => {
    l("hours", R), l("minutes", F), l("seconds", e.enableSeconds ? C : 0);
  }, Q = () => {
    const [R, F] = A(r.value);
    return e.range ? M(
      [R.hours, F.hours],
      [R.minutes, F.minutes],
      [R.seconds, F.minutes]
    ) : M(R.hours, R.minutes, R.seconds);
  };
  yt(() => {
    if (!e.shadow)
      return s(a.value), r.value ? Q() : b();
  });
  const S = () => {
    Array.isArray(r.value) ? r.value = r.value.map((R, F) => R && i(R, F)) : r.value = i(r.value), t("time-update");
  };
  return {
    modelValue: r,
    time: n,
    disabledTimesConfig: u,
    updateTime: (R, F = !0, C = !1) => {
      o(R, F, C, S);
    },
    validateTime: d
  };
}, qh = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...er
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, o = en(), i = Ut(o, "timePicker"), { time: l, modelValue: s, disabledTimesConfig: u, updateTime: d, validateTime: p } = zh(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: s,
      time: l,
      updateTime: d
    }) }), (v, b) => ($(), Ye(ja, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: Ne(() => [
        Ke(Hu, ht(v.$props, {
          hours: k(l).hours,
          minutes: k(l).minutes,
          seconds: k(l).seconds,
          "internal-model-value": v.internalModelValue,
          "disabled-times-config": k(u),
          "validate-time": k(p),
          "onUpdate:hours": b[0] || (b[0] = (A) => k(d)(A)),
          "onUpdate:minutes": b[1] || (b[1] = (A) => k(d)(A, !1)),
          "onUpdate:seconds": b[2] || (b[2] = (A) => k(d)(A, !1, !0)),
          onAmPmChange: b[3] || (b[3] = (A) => v.$emit("am-pm-change", A))
        }), Pt({ _: 2 }, [
          rt(k(i), (A, M) => ({
            name: A,
            fn: Ne((Q) => [
              _e(v.$slots, A, pt(Ot(Q)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
}), Kh = { class: "dp__month_year_row" }, Xh = ["aria-label", "onClick", "onKeydown"], Zh = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "DpHeader",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    ...er
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      defaultedTransitions: o,
      defaultedAriaLabels: i,
      defaultedMultiCalendars: l,
      defaultedFilters: s,
      defaultedConfig: u,
      defaultedHighlight: d
    } = ut(a), { transitionName: p, showTransition: v } = Qn(o), { buildMatrix: b } = Br(), { handleMonthYearChange: A, isDisabled: M, updateMonthYear: Q } = sh(a, n), { showLeftIcon: S, showRightIcon: R } = La(), F = oe(!1), C = oe(!1), N = oe([null, null, null, null]);
    yt(() => {
      n("mount");
    });
    const W = (f) => ({
      get: () => a[f],
      set: (Y) => {
        const U = f === Wt.month ? Wt.year : Wt.month;
        n("update-month-year", { [f]: Y, [U]: a[U] }), f === Wt.month ? I(!0) : y(!0);
      }
    }), H = te(W(Wt.month)), z = te(W(Wt.year)), G = te(() => (f) => ({
      month: a.month,
      year: a.year,
      items: f === Wt.month ? a.months : a.years,
      instance: a.instance,
      updateMonthYear: Q,
      toggle: f === Wt.month ? I : y
    })), g = te(() => a.months.find((Y) => Y.value === a.month) || { text: "", value: 0 }), E = te(() => yn(a.months, (f) => {
      const Y = a.month === f.value, U = jn(
        f.value,
        Mu(a.year, a.minDate),
        Ou(a.year, a.maxDate)
      ) || s.value.months.includes(f.value), ae = Ru(d.value, f.value, a.year);
      return { active: Y, disabled: U, highlighted: ae };
    })), _ = te(() => yn(a.years, (f) => {
      const Y = a.year === f.value, U = jn(f.value, bn(a.minDate), bn(a.maxDate)) || s.value.years.includes(f.value), ae = Pi(d.value, f.value);
      return { active: Y, disabled: U, highlighted: ae };
    })), j = (f, Y) => {
      Y !== void 0 ? f.value = Y : f.value = !f.value, f.value || n("overlay-closed");
    }, I = (f = !1, Y) => {
      T(f), j(F, Y);
    }, y = (f = !1, Y) => {
      T(f), j(C, Y);
    }, T = (f) => {
      f || n("reset-flow");
    }, O = (f, Y) => {
      a.arrowNavigation && (N.value[Y] = ft(f), b(N.value, "monthYear"));
    }, B = te(() => {
      var f, Y;
      return [
        {
          type: Wt.month,
          index: 1,
          toggle: I,
          modelValue: H.value,
          updateModelValue: (U) => H.value = U,
          text: g.value.text,
          showSelectionGrid: F.value,
          items: E.value,
          ariaLabel: (f = i.value) == null ? void 0 : f.openMonthsOverlay
        },
        {
          type: Wt.year,
          index: 2,
          toggle: y,
          modelValue: z.value,
          updateModelValue: (U) => z.value = U,
          text: a.year,
          showSelectionGrid: C.value,
          items: _.value,
          ariaLabel: (Y = i.value) == null ? void 0 : Y.openYearsOverlay
        }
      ];
    }), h = te(() => a.disableYearSelect ? [B.value[0]] : a.yearFirst ? [...B.value].reverse() : B.value);
    return t({
      toggleMonthPicker: I,
      toggleYearPicker: y,
      handleMonthYearChange: A
    }), (f, Y) => {
      var U, ae, le;
      return $(), Z("div", Kh, [
        f.$slots["month-year"] ? _e(f.$slots, "month-year", pt(ht({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: k(Q), handleMonthYearChange: k(A), instance: e.instance }))) : ($(), Z(Oe, { key: 1 }, [
          k(S)(k(l), e.instance) && !f.vertical ? ($(), Ye(Rn, {
            key: 0,
            "aria-label": (U = k(i)) == null ? void 0 : U.prevMonth,
            disabled: k(M)(!1),
            onActivate: Y[0] || (Y[0] = (L) => k(A)(!1, !0)),
            onSetRef: Y[1] || (Y[1] = (L) => O(L, 0))
          }, {
            default: Ne(() => [
              f.$slots["arrow-left"] ? _e(f.$slots, "arrow-left", { key: 0 }) : re("", !0),
              f.$slots["arrow-left"] ? re("", !0) : ($(), Ye(k(_i), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : re("", !0),
          be("div", {
            class: He(["dp__month_year_wrap", {
              dp__year_disable_select: f.disableYearSelect
            }])
          }, [
            ($(!0), Z(Oe, null, rt(h.value, (L, w) => ($(), Z(Oe, {
              key: L.type
            }, [
              be("button", {
                ref_for: !0,
                ref: (pe) => O(pe, w + 1),
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": L.ariaLabel,
                onClick: L.toggle,
                onKeydown: [
                  Se(qe(L.toggle, ["prevent"]), ["enter"]),
                  Se(qe(L.toggle, ["prevent"]), ["space"])
                ]
              }, [
                f.$slots[L.type] ? _e(f.$slots, L.type, {
                  key: 0,
                  text: L.text,
                  value: a[L.type]
                }) : re("", !0),
                f.$slots[L.type] ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
                  Jt(ot(L.text), 1)
                ], 64))
              ], 40, Xh),
              Ke(Ur, {
                name: k(p)(L.showSelectionGrid),
                css: k(v)
              }, {
                default: Ne(() => [
                  L.showSelectionGrid ? ($(), Ye(zn, {
                    key: 0,
                    items: L.items,
                    "arrow-navigation": f.arrowNavigation,
                    "hide-navigation": f.hideNavigation,
                    "is-last": f.autoApply && !k(u).keepActionRow,
                    "skip-button-ref": !1,
                    config: f.config,
                    type: L.type,
                    "header-refs": [],
                    "esc-close": f.escClose,
                    "text-input": f.textInput,
                    onSelected: L.updateModelValue,
                    onToggle: L.toggle
                  }, Pt({
                    "button-icon": Ne(() => [
                      f.$slots["calendar-icon"] ? _e(f.$slots, "calendar-icon", { key: 0 }) : re("", !0),
                      f.$slots["calendar-icon"] ? re("", !0) : ($(), Ye(k(Wn), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    f.$slots[`${L.type}-overlay-value`] ? {
                      name: "item",
                      fn: Ne(({ item: pe }) => [
                        _e(f.$slots, `${L.type}-overlay-value`, {
                          text: pe.text,
                          value: pe.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    f.$slots[`${L.type}-overlay`] ? {
                      name: "overlay",
                      fn: Ne(() => [
                        _e(f.$slots, `${L.type}-overlay`, pt(Ot(G.value(L.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    f.$slots[`${L.type}-overlay-header`] ? {
                      name: "header",
                      fn: Ne(() => [
                        _e(f.$slots, `${L.type}-overlay-header`, {
                          toggle: L.toggle
                        })
                      ]),
                      key: "2"
                    } : void 0
                  ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "text-input", "onSelected", "onToggle"])) : re("", !0)
                ]),
                _: 2
              }, 1032, ["name", "css"])
            ], 64))), 128))
          ], 2),
          k(S)(k(l), e.instance) && f.vertical ? ($(), Ye(Rn, {
            key: 1,
            "aria-label": (ae = k(i)) == null ? void 0 : ae.prevMonth,
            disabled: k(M)(!1),
            onActivate: Y[2] || (Y[2] = (L) => k(A)(!1, !0))
          }, {
            default: Ne(() => [
              f.$slots["arrow-up"] ? _e(f.$slots, "arrow-up", { key: 0 }) : re("", !0),
              f.$slots["arrow-up"] ? re("", !0) : ($(), Ye(k(Ai), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : re("", !0),
          k(R)(k(l), e.instance) ? ($(), Ye(Rn, {
            key: 2,
            ref: "rightIcon",
            disabled: k(M)(!0),
            "aria-label": (le = k(i)) == null ? void 0 : le.nextMonth,
            onActivate: Y[3] || (Y[3] = (L) => k(A)(!0, !0)),
            onSetRef: Y[4] || (Y[4] = (L) => O(L, f.disableYearSelect ? 2 : 3))
          }, {
            default: Ne(() => [
              f.$slots[f.vertical ? "arrow-down" : "arrow-right"] ? _e(f.$slots, f.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : re("", !0),
              f.$slots[f.vertical ? "arrow-down" : "arrow-right"] ? re("", !0) : ($(), Ye(oi(f.vertical ? k(Di) : k(xi)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label"])) : re("", !0)
        ], 64))
      ]);
    };
  }
}), Jh = ["aria-label"], eg = {
  class: "dp__calendar_header",
  role: "row"
}, tg = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
}, rg = /* @__PURE__ */ be("div", { class: "dp__calendar_header_separator" }, null, -1), ng = ["aria-label"], ag = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
}, og = { class: "dp__cell_inner" }, ig = ["id", "aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"], lg = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...er
  },
  emits: [
    "select-date",
    "set-hover-date",
    "handle-scroll",
    "mount",
    "handle-swipe",
    "handle-space",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { buildMultiLevelMatrix: o } = Br(), {
      defaultedTransitions: i,
      defaultedConfig: l,
      defaultedAriaLabels: s,
      defaultedMultiCalendars: u,
      defaultedWeekNumbers: d
    } = ut(a), p = oe(null), v = oe({
      bottom: "",
      left: "",
      transform: ""
    }), b = oe([]), A = oe(null), M = oe(!0), Q = oe(""), S = oe({ startX: 0, endX: 0, startY: 0, endY: 0 }), R = oe([]), F = oe({ left: "50%" }), C = te(() => a.calendar ? a.calendar(a.mappedDates) : a.mappedDates), N = te(() => a.dayNames ? Array.isArray(a.dayNames) ? a.dayNames : a.dayNames(a.locale, +a.weekStart) : Nm(a.formatLocale, a.locale, +a.weekStart));
    yt(() => {
      n("mount", { cmp: "calendar", refs: b }), l.value.noSwipe || A.value && (A.value.addEventListener("touchstart", y, { passive: !1 }), A.value.addEventListener("touchend", T, { passive: !1 }), A.value.addEventListener("touchmove", O, { passive: !1 })), a.monthChangeOnScroll && A.value && A.value.addEventListener("wheel", f, { passive: !1 });
    });
    const W = (L) => L ? a.vertical ? "vNext" : "next" : a.vertical ? "vPrevious" : "previous", H = (L, w) => {
      if (a.transitions) {
        const pe = Nt(mr(X(), a.month, a.year));
        Q.value = At(Nt(mr(X(), L, w)), pe) ? i.value[W(!0)] : i.value[W(!1)], M.value = !1, ur(() => {
          M.value = !0;
        });
      }
    }, z = te(
      () => ({
        [a.calendarClassName]: !!a.calendarClassName
      })
    ), G = te(() => (L) => {
      const w = Ym(L);
      return {
        dp__marker_dot: w.type === "dot",
        dp__marker_line: w.type === "line"
      };
    }), g = te(() => (L) => Qe(L, p.value)), E = te(() => ({
      dp__calendar: !0,
      dp__calendar_next: u.value.count > 0 && a.instance !== 0
    })), _ = te(() => (L) => a.hideOffsetDates ? L.current : !0), j = async (L, w, pe) => {
      var he, K;
      if (n("set-hover-date", L), (K = (he = L.marker) == null ? void 0 : he.tooltip) != null && K.length) {
        const De = ft(b.value[w][pe]);
        if (De) {
          const { width: ve, height: c } = De.getBoundingClientRect();
          p.value = L.value;
          let m = { left: `${ve / 2}px` }, P = -50;
          if (await ur(), R.value[0]) {
            const { left: D, width: V } = R.value[0].getBoundingClientRect();
            D < 0 && (m = { left: "0" }, P = 0, F.value.left = `${ve / 2}px`), window.innerWidth < D + V && (m = { right: "0" }, P = 0, F.value.left = `${V - ve / 2}px`);
          }
          v.value = {
            bottom: `${c}px`,
            ...m,
            transform: `translateX(${P}%)`
          }, n("tooltip-open", L.marker);
        }
      }
    }, I = (L) => {
      p.value && (p.value = null, v.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), n("tooltip-close", L.marker));
    }, y = (L) => {
      S.value.startX = L.changedTouches[0].screenX, S.value.startY = L.changedTouches[0].screenY;
    }, T = (L) => {
      S.value.endX = L.changedTouches[0].screenX, S.value.endY = L.changedTouches[0].screenY, B();
    }, O = (L) => {
      a.vertical && !a.inline && L.preventDefault();
    }, B = () => {
      const L = a.vertical ? "Y" : "X";
      Math.abs(S.value[`start${L}`] - S.value[`end${L}`]) > 10 && n("handle-swipe", S.value[`start${L}`] > S.value[`end${L}`] ? "right" : "left");
    }, h = (L, w, pe) => {
      L && (Array.isArray(b.value[w]) ? b.value[w][pe] = L : b.value[w] = [L]), a.arrowNavigation && o(b.value, "calendar");
    }, f = (L) => {
      a.monthChangeOnScroll && (L.preventDefault(), n("handle-scroll", L));
    }, Y = (L) => d.value.type === "local" ? Qp(L.value, { weekStartsOn: +a.weekStart }) : d.value.type === "iso" ? $p(L.value) : typeof d.value.type == "function" ? d.value.type(L.value) : "", U = (L) => {
      const w = L[0];
      return d.value.hideOnOffsetDates ? L.some((pe) => pe.current) ? Y(w) : "" : Y(w);
    }, ae = (L, w) => {
      Pr(L, l.value), n("select-date", w);
    }, le = (L) => {
      Pr(L, l.value);
    };
    return t({ triggerTransition: H }), (L, w) => {
      var pe;
      return $(), Z("div", {
        class: He(E.value)
      }, [
        be("div", {
          ref_key: "calendarWrapRef",
          ref: A,
          role: "grid",
          class: He(z.value),
          "aria-label": (pe = k(s)) == null ? void 0 : pe.calendarWrap
        }, [
          ($(), Z(Oe, { key: 0 }, [
            be("div", eg, [
              L.weekNumbers ? ($(), Z("div", tg, ot(L.weekNumName), 1)) : re("", !0),
              ($(!0), Z(Oe, null, rt(N.value, (he, K) => ($(), Z("div", {
                key: K,
                class: "dp__calendar_header_item",
                role: "gridcell"
              }, [
                L.$slots["calendar-header"] ? _e(L.$slots, "calendar-header", {
                  key: 0,
                  day: he,
                  index: K
                }) : re("", !0),
                L.$slots["calendar-header"] ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
                  Jt(ot(he), 1)
                ], 64))
              ]))), 128))
            ]),
            rg,
            Ke(Ur, {
              name: Q.value,
              css: !!L.transitions
            }, {
              default: Ne(() => {
                var he;
                return [
                  M.value ? ($(), Z("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "rowgroup",
                    "aria-label": ((he = k(s)) == null ? void 0 : he.calendarDays) || void 0
                  }, [
                    ($(!0), Z(Oe, null, rt(C.value, (K, De) => ($(), Z("div", {
                      key: De,
                      class: "dp__calendar_row",
                      role: "row"
                    }, [
                      L.weekNumbers ? ($(), Z("div", ag, [
                        be("div", og, ot(U(K.days)), 1)
                      ])) : re("", !0),
                      ($(!0), Z(Oe, null, rt(K.days, (ve, c) => {
                        var m, P, D;
                        return $(), Z("div", {
                          id: ve.value.toISOString().split("T")[0],
                          ref_for: !0,
                          ref: (V) => h(V, De, c),
                          key: c + De,
                          role: "gridcell",
                          class: "dp__calendar_item",
                          "aria-selected": ve.classData.dp__active_date || ve.classData.dp__range_start || ve.classData.dp__range_start,
                          "aria-disabled": ve.classData.dp__cell_disabled || void 0,
                          "aria-label": (P = (m = k(s)) == null ? void 0 : m.day) == null ? void 0 : P.call(m, ve),
                          tabindex: "0",
                          onClick: qe((V) => ae(V, ve), ["prevent"]),
                          onKeydown: [
                            Se((V) => L.$emit("select-date", ve), ["enter"]),
                            Se((V) => L.$emit("handle-space", ve), ["space"])
                          ],
                          onMouseenter: (V) => j(ve, De, c),
                          onMouseleave: (V) => I(ve)
                        }, [
                          be("div", {
                            class: He(["dp__cell_inner", ve.classData])
                          }, [
                            L.$slots.day && _.value(ve) ? _e(L.$slots, "day", {
                              key: 0,
                              day: +ve.text,
                              date: ve.value
                            }) : re("", !0),
                            L.$slots.day ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
                              Jt(ot(ve.text), 1)
                            ], 64)),
                            ve.marker && _.value(ve) ? ($(), Z(Oe, { key: 2 }, [
                              L.$slots.marker ? _e(L.$slots, "marker", {
                                key: 0,
                                marker: ve.marker,
                                day: +ve.text,
                                date: ve.value
                              }) : ($(), Z("div", {
                                key: 1,
                                class: He(G.value(ve.marker)),
                                style: Mt(ve.marker.color ? { backgroundColor: ve.marker.color } : {})
                              }, null, 6))
                            ], 64)) : re("", !0),
                            g.value(ve.value) ? ($(), Z("div", {
                              key: 3,
                              ref_for: !0,
                              ref_key: "activeTooltip",
                              ref: R,
                              class: "dp__marker_tooltip",
                              style: Mt(v.value)
                            }, [
                              (D = ve.marker) != null && D.tooltip ? ($(), Z("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: le
                              }, [
                                ($(!0), Z(Oe, null, rt(ve.marker.tooltip, (V, J) => ($(), Z("div", {
                                  key: J,
                                  class: "dp__tooltip_text"
                                }, [
                                  L.$slots["marker-tooltip"] ? _e(L.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: V,
                                    day: ve.value
                                  }) : re("", !0),
                                  L.$slots["marker-tooltip"] ? re("", !0) : ($(), Z(Oe, { key: 1 }, [
                                    be("div", {
                                      class: "dp__tooltip_mark",
                                      style: Mt(V.color ? { backgroundColor: V.color } : {})
                                    }, null, 4),
                                    be("div", null, ot(V.text), 1)
                                  ], 64))
                                ]))), 128)),
                                be("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: Mt(F.value)
                                }, null, 4)
                              ])) : re("", !0)
                            ], 4)) : re("", !0)
                          ], 2)
                        ], 40, ig);
                      }), 128))
                    ]))), 128))
                  ], 8, ng)) : re("", !0)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, Jh)
      ], 2);
    };
  }
}), Wl = (e) => Array.isArray(e), sg = (e, t, r, n) => {
  const a = oe([]), { modelValue: o, calendars: i, time: l } = Gn(e, t), { defaultedMultiCalendars: s, defaultedStartTime: u } = ut(e), { validateMonthYearInRange: d, isDisabled: p, isDateRangeAllowed: v, checkMinMaxRange: b } = tn(e), { updateTimeValues: A, getSetDateTime: M, setTime: Q, assignStartTime: S, validateTime: R, disabledTimesConfig: F } = Lu(e, l, o, n), C = te(
    () => (x) => i.value[x] ? i.value[x].month : 0
  ), N = te(
    () => (x) => i.value[x] ? i.value[x].year : 0
  ), W = (x, q, ye) => {
    var Pe, Xe;
    i.value[x] || (i.value[x] = { month: 0, year: 0 }), i.value[x].month = Hl(q) ? (Pe = i.value[x]) == null ? void 0 : Pe.month : q, i.value[x].year = Hl(ye) ? (Xe = i.value[x]) == null ? void 0 : Xe.year : ye;
  }, H = () => {
    e.autoApply && t("select-date");
  };
  zt(o, (x, q) => {
    JSON.stringify(x) !== JSON.stringify(q) && g();
  }), yt(() => {
    e.shadow || (o.value || (f(), u.value && S(u.value)), g(!0), e.focusStartDate && e.startDate && f());
  });
  const z = te(() => {
    var x;
    return (x = e.flow) != null && x.length && !e.partialFlow ? e.flowStep === e.flow.length : !0;
  }), G = () => {
    e.autoApply && z.value && t("auto-apply", e.partialFlow);
  }, g = (x = !1) => {
    if (o.value)
      return Array.isArray(o.value) ? (a.value = o.value, T(x)) : _(o.value, x);
    if (s.value.count && x && !e.startDate)
      return E(X(), x);
  }, E = (x, q = !1) => {
    if ((!s.value.count || !s.value.static || q) && W(0, Le(x), Re(x)), s.value.count && !s.value.solo)
      for (let ye = 1; ye < s.value.count; ye++) {
        const Pe = tt(X(), { month: C.value(ye - 1), year: N.value(ye - 1) }), Xe = tu(Pe, { months: 1 });
        i.value[ye] = { month: Le(Xe), year: Re(Xe) };
      }
  }, _ = (x, q) => {
    E(x), Q("hours", Xt(x)), Q("minutes", sr(x)), Q("seconds", mn(x)), s.value.count && q && h();
  }, j = (x) => {
    if (s.value.count) {
      if (s.value.solo)
        return 0;
      const q = Le(x[0]), ye = Le(x[1]);
      return Math.abs(ye - q) < s.value.count ? 0 : 1;
    }
    return 1;
  }, I = (x, q) => {
    x[1] && e.showLastInRange ? E(x[j(x)], q) : E(x[0], q);
    const ye = (Pe, Xe) => [
      Pe(x[0]),
      x[1] ? Pe(x[1]) : l[Xe][1]
    ];
    Q("hours", ye(Xt, "hours")), Q("minutes", ye(sr, "minutes")), Q("seconds", ye(mn, "seconds"));
  }, y = (x, q) => {
    if ((e.range || e.weekPicker) && !e.multiDates)
      return I(x, q);
    if (e.multiDates && q) {
      const ye = x[x.length - 1];
      return _(ye, q);
    }
  }, T = (x) => {
    const q = o.value;
    y(q, x), s.value.count && s.value.solo && h();
  }, O = (x, q) => {
    const ye = tt(X(), { month: C.value(q), year: N.value(q) }), Pe = x < 0 ? qt(ye, 1) : gn(ye, 1);
    d(Le(Pe), Re(Pe), x < 0, e.preventMinMaxNavigation) && (W(q, Le(Pe), Re(Pe)), t("update-month-year", { instance: q, month: Le(Pe), year: Re(Pe) }), s.value.count && !s.value.solo && B(q), r());
  }, B = (x) => {
    for (let q = x - 1; q >= 0; q--) {
      const ye = gn(tt(X(), { month: C.value(q + 1), year: N.value(q + 1) }), 1);
      W(q, Le(ye), Re(ye));
    }
    for (let q = x + 1; q <= s.value.count - 1; q++) {
      const ye = qt(tt(X(), { month: C.value(q - 1), year: N.value(q - 1) }), 1);
      W(q, Le(ye), Re(ye));
    }
  }, h = () => {
    if (Array.isArray(o.value) && o.value.length === 2) {
      const x = X(
        X(o.value[1] ? o.value[1] : qt(o.value[0], 1))
      ), [q, ye] = [Le(o.value[0]), Re(o.value[0])], [Pe, Xe] = [Le(o.value[1]), Re(o.value[1])];
      (q !== Pe || q === Pe && ye !== Xe) && s.value.solo && W(1, Le(x), Re(x));
    } else
      o.value && !Array.isArray(o.value) && (W(0, Le(o.value), Re(o.value)), E(X()));
  }, f = () => {
    e.startDate && (W(0, Le(X(e.startDate)), Re(X(e.startDate))), s.value.count && B(0));
  }, Y = Lm((x, q) => {
    e.monthChangeOnScroll && O(e.monthChangeOnScroll !== "inverse" ? -x.deltaY : x.deltaY, q);
  }, 50), U = (x, q, ye = !1) => {
    e.monthChangeOnArrows && e.vertical === ye && ae(x, q);
  }, ae = (x, q) => {
    O(x === "right" ? -1 : 1, q);
  }, le = (x) => e.markers.find(
    (q) => Qe(Vm(x.value), Zt(X(q.date), e.timezone))
  ), L = (x, q) => {
    switch (e.sixWeeks === !0 ? "append" : e.sixWeeks) {
      case "prepend":
        return [!0, !1];
      case "center":
        return [x == 0, !0];
      case "fair":
        return [x == 0 || q > x, !0];
      case "append":
        return [!1, !1];
      default:
        return [!1, !1];
    }
  }, w = (x, q, ye, Pe) => {
    if (e.sixWeeks && x.length < 6) {
      const Xe = 6 - x.length, xt = (q.getDay() + 7 - Pe) % 7, ue = 6 - (ye.getDay() + 7 - Pe) % 7, [ke, Ae] = L(xt, ue);
      for (let Ft = 1; Ft <= Xe; Ft++)
        if (Ae ? !!(Ft % 2) == ke : ke) {
          const St = x[0].days[0], _n = pe(fr(St.value, -7), Le(q));
          x.unshift({ days: _n });
        } else {
          const St = x[x.length - 1], _n = St.days[St.days.length - 1], $u = pe(fr(_n.value, 1), Le(q));
          x.push({ days: $u });
        }
    }
    return x;
  }, pe = (x, q) => {
    const ye = X(x), Pe = [];
    for (let Xe = 0; Xe < 7; Xe++) {
      const xt = fr(ye, Xe), ue = Le(xt) !== q;
      Pe.push({
        text: e.hideOffsetDates && ue ? "" : xt.getDate(),
        value: xt,
        current: !ue,
        classData: {}
      });
    }
    return Pe;
  }, he = (x, q) => {
    const ye = [], Pe = new Date(q, x), Xe = new Date(q, x + 1, 0), xt = e.weekStart, ue = Zr(Pe, { weekStartsOn: xt }), ke = (Ae) => {
      const Ft = pe(Ae, x);
      if (ye.push({ days: Ft }), !ye[ye.length - 1].days.some(
        (St) => Qe(Nt(St.value), Nt(Xe))
      )) {
        const St = fr(Ae, 7);
        ke(St);
      }
    };
    return ke(ue), w(ye, Pe, Xe, xt);
  }, K = (x) => (o.value = da(X(x.value), e.timezone, e.weekStart), t("date-update", x.value), G()), De = (x) => {
    const q = Sr(X(x.value), l.hours, l.minutes, se());
    t("date-update", q), e.multiDates ? Si(q, o, e.multiDatesLimit) : o.value = q, n(), ur().then(() => {
      G();
    });
  }, ve = (x) => e.noDisabledRange ? Su(a.value[0], x).some((q) => p(q)) : !1, c = () => {
    a.value = o.value ? o.value.slice() : [], a.value.length === 2 && !(e.fixedStart || e.fixedEnd) && (a.value = []);
  }, m = (x, q) => {
    const ye = [X(x.value), fr(X(x.value), +e.autoRange)];
    v(ye) ? (q && P(x.value), a.value = ye) : t("invalid-date", x.value);
  }, P = (x) => {
    const q = Le(X(x)), ye = Re(X(x));
    if (W(0, q, ye), s.value.count > 0)
      for (let Pe = 1; Pe < s.value.count; Pe++) {
        const Xe = Wm(
          tt(X(x), { year: C.value(Pe - 1), month: N.value(Pe - 1) })
        );
        W(Pe, Xe.month, Xe.year);
      }
  }, D = (x) => Array.isArray(o.value) && o.value.length === 2 ? e.fixedStart && (At(x, o.value[0]) || Qe(x, o.value[0])) ? [o.value[0], x] : e.fixedEnd && (wt(x, o.value[1]) || Qe(x, o.value[1])) ? [x, o.value[1]] : (t("invalid-fixed-range", x), o.value) : [], V = (x) => {
    if (ve(x.value) || !b(x.value, o.value, e.fixedStart ? 0 : 1))
      return t("invalid-date", x.value);
    a.value = D(X(x.value));
  }, J = (x, q) => {
    if (c(), e.autoRange)
      return m(x, q);
    if (e.fixedStart || e.fixedEnd)
      return V(x);
    a.value[0] ? b(X(x.value), o.value) && !ve(x.value) ? wt(X(x.value), X(a.value[0])) ? (a.value.unshift(X(x.value)), t("range-end", a.value[0])) : (a.value[1] = X(x.value), t("range-end", a.value[1])) : (e.autoApply && t("auto-apply-invalid", x.value), t("invalid-date", x.value)) : (a.value[0] = X(x.value), t("range-start", a.value[0]));
  }, se = (x = !0) => e.enableSeconds ? Array.isArray(l.seconds) ? x ? l.seconds[0] : l.seconds[1] : l.seconds : 0, ne = (x) => {
    a.value[x] = Sr(
      a.value[x],
      l.hours[x],
      l.minutes[x],
      se(x !== 1)
    );
  }, ie = () => {
    var x, q;
    a.value[0] && a.value[1] && +((x = a.value) == null ? void 0 : x[0]) > +((q = a.value) == null ? void 0 : q[1]) && (a.value.reverse(), t("range-start", a.value[0]), t("range-end", a.value[1]));
  }, ee = () => {
    a.value.length && (a.value[0] && !a.value[1] ? ne(0) : (ne(0), ne(1), n()), ie(), o.value = a.value.slice(), Va(a.value, t, e.autoApply, e.modelAuto));
  }, ce = (x, q = !1) => {
    if (p(x.value) || !x.current && e.hideOffsetDates)
      return t("invalid-date", x.value);
    if (e.weekPicker)
      return K(x);
    if (!e.range)
      return De(x);
    Wl(l.hours) && Wl(l.minutes) && !e.multiDates && (J(x, q), ee());
  }, ge = (x, q) => {
    var ye;
    W(x, q.month, q.year), s.value.count && !s.value.solo && B(x), t("update-month-year", { instance: x, month: q.month, year: q.year }), r(s.value.solo ? x : void 0);
    const Pe = (ye = e.flow) != null && ye.length ? e.flow[e.flowStep] : void 0;
    !q.fromNav && (Pe === rr.month || Pe === rr.year) && n();
  }, xe = (x, q) => {
    Bu({ value: x, modelValue: o, range: e.range, timezone: q ? void 0 : e.timezone }), H(), e.multiCalendars && ur().then(() => g(!0));
  }, Me = () => {
    e.range ? o.value && Array.isArray(o.value) && o.value[0] ? o.value = wt(X(), o.value[0]) ? [X(), o.value[0]] : [o.value[0], X()] : o.value = [X()] : o.value = X(), H();
  }, Ee = () => {
    if (Array.isArray(o.value))
      if (e.multiDates) {
        const x = We();
        o.value[o.value.length - 1] = M(x);
      } else
        o.value = o.value.map((x, q) => x && M(x, q));
    else
      o.value = M(o.value);
    t("time-update");
  }, We = () => Array.isArray(o.value) && o.value.length ? o.value[o.value.length - 1] : null;
  return {
    calendars: i,
    modelValue: o,
    month: C,
    year: N,
    time: l,
    disabledTimesConfig: F,
    validateTime: R,
    getCalendarDays: he,
    getMarker: le,
    handleScroll: Y,
    handleSwipe: ae,
    handleArrow: U,
    selectDate: ce,
    updateMonthYear: ge,
    presetDate: xe,
    selectCurrentDate: Me,
    updateTime: (x, q = !0, ye = !1) => {
      A(x, q, ye, Ee);
    }
  };
}, ug = { key: 0 }, cg = /* @__PURE__ */ gt({
  __name: "DatePicker",
  props: {
    ...er
  },
  emits: [
    "tooltip-open",
    "tooltip-close",
    "mount",
    "update:internal-model-value",
    "update-flow-step",
    "reset-flow",
    "auto-apply",
    "focus-menu",
    "select-date",
    "range-start",
    "range-end",
    "invalid-fixed-range",
    "time-update",
    "am-pm-change",
    "time-picker-open",
    "time-picker-close",
    "recalculate-position",
    "update-month-year",
    "auto-apply-invalid",
    "date-update",
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      calendars: o,
      month: i,
      year: l,
      modelValue: s,
      time: u,
      disabledTimesConfig: d,
      validateTime: p,
      getCalendarDays: v,
      getMarker: b,
      handleArrow: A,
      handleScroll: M,
      handleSwipe: Q,
      selectDate: S,
      updateMonthYear: R,
      presetDate: F,
      selectCurrentDate: C,
      updateTime: N
    } = sg(a, n, h, f), W = en(), { setHoverDate: H, getDayClassData: z, clearHoverDate: G } = fh(s, a), { defaultedMultiCalendars: g } = ut(a), E = oe([]), _ = oe([]), j = oe(null), I = Ut(W, "calendar"), y = Ut(W, "monthYear"), T = Ut(W, "timePicker"), O = (U) => {
      a.shadow || n("mount", U);
    };
    zt(
      o,
      () => {
        a.shadow || setTimeout(() => {
          n("recalculate-position");
        }, 0);
      },
      { deep: !0 }
    );
    const B = te(() => (U) => v(i.value(U), l.value(U)).map((ae) => ({
      ...ae,
      days: ae.days.map((le) => (le.marker = b(le), le.classData = z(le), le))
    })));
    function h(U) {
      var ae;
      U || U === 0 ? (ae = _.value[U]) == null || ae.triggerTransition(i.value(U), l.value(U)) : _.value.forEach((le, L) => le.triggerTransition(i.value(L), l.value(L)));
    }
    function f() {
      n("update-flow-step");
    }
    const Y = (U, ae = !1) => {
      S(U, ae), a.spaceConfirm && n("select-date");
    };
    return t({
      clearHoverDate: G,
      presetDate: F,
      selectCurrentDate: C,
      toggleMonthPicker: (U, ae, le = 0) => {
        var L;
        (L = E.value[le]) == null || L.toggleMonthPicker(U, ae);
      },
      toggleYearPicker: (U, ae, le = 0) => {
        var L;
        (L = E.value[le]) == null || L.toggleYearPicker(U, ae);
      },
      toggleTimePicker: (U, ae, le) => {
        var L;
        (L = j.value) == null || L.toggleTimePicker(U, ae, le);
      },
      handleArrow: A,
      updateMonthYear: R,
      getSidebarProps: () => ({
        modelValue: s,
        month: i,
        year: l,
        time: u,
        updateTime: N,
        updateMonthYear: R,
        selectDate: S,
        presetDate: F
      })
    }), (U, ae) => ($(), Z(Oe, null, [
      Ke(ja, {
        "multi-calendars": k(g).count
      }, {
        default: Ne(({ instance: le, index: L }) => [
          U.disableMonthYearSelect ? re("", !0) : ($(), Ye(Zh, ht({
            key: 0,
            ref: (w) => {
              w && (E.value[L] = w);
            },
            months: k(Cu)(U.formatLocale, U.locale, U.monthNameFormat),
            years: k(Oi)(U.yearRange, U.reverseYears),
            month: k(i)(le),
            year: k(l)(le),
            instance: le
          }, U.$props, {
            onMount: ae[0] || (ae[0] = (w) => O(k(Xr).header)),
            onResetFlow: ae[1] || (ae[1] = (w) => U.$emit("reset-flow")),
            onUpdateMonthYear: (w) => k(R)(le, w),
            onOverlayClosed: ae[2] || (ae[2] = (w) => U.$emit("focus-menu"))
          }), Pt({ _: 2 }, [
            rt(k(y), (w, pe) => ({
              name: w,
              fn: Ne((he) => [
                _e(U.$slots, w, pt(Ot(he)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          Ke(lg, ht({
            ref: (w) => {
              w && (_.value[L] = w);
            },
            "mapped-dates": B.value(le),
            month: k(i)(le),
            year: k(l)(le),
            instance: le
          }, U.$props, {
            onSelectDate: (w) => k(S)(w, le !== 1),
            onHandleSpace: (w) => Y(w, le !== 1),
            onSetHoverDate: ae[3] || (ae[3] = (w) => k(H)(w)),
            onHandleScroll: (w) => k(M)(w, le),
            onHandleSwipe: (w) => k(Q)(w, le),
            onMount: ae[4] || (ae[4] = (w) => O(k(Xr).calendar)),
            onResetFlow: ae[5] || (ae[5] = (w) => U.$emit("reset-flow")),
            onTooltipOpen: ae[6] || (ae[6] = (w) => U.$emit("tooltip-open", w)),
            onTooltipClose: ae[7] || (ae[7] = (w) => U.$emit("tooltip-close", w))
          }), Pt({ _: 2 }, [
            rt(k(I), (w, pe) => ({
              name: w,
              fn: Ne((he) => [
                _e(U.$slots, w, pt(Ot({ ...he })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      U.enableTimePicker ? ($(), Z("div", ug, [
        U.$slots["time-picker"] ? _e(U.$slots, "time-picker", pt(ht({ key: 0 }, { time: k(u), updateTime: k(N) }))) : ($(), Ye(Hu, ht({
          key: 1,
          ref_key: "timePickerRef",
          ref: j
        }, U.$props, {
          hours: k(u).hours,
          minutes: k(u).minutes,
          seconds: k(u).seconds,
          "internal-model-value": U.internalModelValue,
          "disabled-times-config": k(d),
          "validate-time": k(p),
          onMount: ae[8] || (ae[8] = (le) => O(k(Xr).timePicker)),
          "onUpdate:hours": ae[9] || (ae[9] = (le) => k(N)(le)),
          "onUpdate:minutes": ae[10] || (ae[10] = (le) => k(N)(le, !1)),
          "onUpdate:seconds": ae[11] || (ae[11] = (le) => k(N)(le, !1, !0)),
          onResetFlow: ae[12] || (ae[12] = (le) => U.$emit("reset-flow")),
          onOverlayClosed: ae[13] || (ae[13] = (le) => U.$emit("time-picker-close")),
          onOverlayOpened: ae[14] || (ae[14] = (le) => U.$emit("time-picker-open", le)),
          onAmPmChange: ae[15] || (ae[15] = (le) => U.$emit("am-pm-change", le))
        }), Pt({ _: 2 }, [
          rt(k(T), (le, L) => ({
            name: le,
            fn: Ne((w) => [
              _e(U.$slots, le, pt(Ot(w)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : re("", !0)
    ], 64));
  }
}), dg = (e, t) => {
  const r = oe(), { defaultedMultiCalendars: n, defaultedConfig: a, defaultedHighlight: o } = ut(e), { modelValue: i, year: l, month: s, calendars: u } = Gn(e, t), { isDisabled: d } = tn(e), { selectYear: p, groupedYears: v, showYearPicker: b, isDisabled: A, toggleYearPicker: M, handleYearSelect: Q, handleYear: S } = Fu({
    modelValue: i,
    multiCalendars: n,
    highlight: o,
    calendars: u,
    month: s,
    year: l,
    props: e,
    emit: t
  }), R = (G, g) => [G, g].map((E) => Kt(E, "MMMM", { locale: e.formatLocale })).join("-"), F = te(() => (G) => i.value ? Array.isArray(i.value) ? i.value.some((g) => Ol(G, g)) : Ol(i.value, G) : !1), C = (G) => {
    if (e.range) {
      if (Array.isArray(i.value)) {
        const g = Qe(G, i.value[0]) || Qe(G, i.value[1]);
        return Ha(i.value, r.value, G) && !g;
      }
      return !1;
    }
    return !1;
  }, N = te(() => (G) => {
    const g = tt(/* @__PURE__ */ new Date(), { year: l.value(G) });
    return Ef({
      start: Rf(g),
      end: Nf(g)
    }).map((E) => {
      const _ = Ln(E), j = xl(E), I = d(E), y = C(_), T = typeof o.value == "function" ? o.value({ quarter: yl(_), year: Re(_) }) : !!o.value.quarters.find(
        (O) => O.quarter === yl(_) && O.year === Re(_)
      );
      return {
        text: R(_, j),
        value: _,
        active: F.value(_),
        highlighted: T,
        disabled: I,
        isBetween: y
      };
    });
  }), W = (G) => {
    Si(G, i, e.multiDatesLimit), t("auto-apply", !0);
  }, H = (G) => {
    const g = Ii(i, G, t);
    Va(g, t, e.autoApply, e.modelAuto);
  }, z = (G) => {
    i.value = G, t("auto-apply");
  };
  return {
    defaultedConfig: a,
    defaultedMultiCalendars: n,
    groupedYears: v,
    year: l,
    isDisabled: A,
    quarters: N,
    showYearPicker: b,
    modelValue: i,
    setHoverDate: (G) => {
      r.value = G;
    },
    selectYear: p,
    selectQuarter: (G, g, E) => {
      if (!E)
        return u.value[g].month = Le(xl(G)), e.multiDates ? W(G) : e.range ? H(G) : z(G);
    },
    toggleYearPicker: M,
    handleYearSelect: Q,
    handleYear: S
  };
}, fg = { class: "dp--quarter-items" }, pg = ["disabled", "onClick", "onMouseover"], vg = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...er
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, o = en(), i = Ut(o, "yearMode"), {
      defaultedMultiCalendars: l,
      defaultedConfig: s,
      groupedYears: u,
      year: d,
      isDisabled: p,
      quarters: v,
      modelValue: b,
      showYearPicker: A,
      setHoverDate: M,
      selectQuarter: Q,
      toggleYearPicker: S,
      handleYearSelect: R,
      handleYear: F
    } = dg(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: b,
      year: d,
      selectQuarter: Q,
      handleYearSelect: R,
      handleYear: F
    }) }), (C, N) => ($(), Ye(ja, {
      "multi-calendars": k(l).count,
      stretch: ""
    }, {
      default: Ne(({ instance: W }) => [
        be("div", {
          class: "dp-quarter-picker-wrap",
          style: Mt({ minHeight: `${k(s).modeHeight}px` })
        }, [
          be("div", null, [
            Ke(Uu, ht(C.$props, {
              items: k(u)(W),
              instance: W,
              "show-year-picker": k(A)[W],
              year: k(d)(W),
              "is-disabled": (H) => k(p)(W, H),
              onHandleYear: (H) => k(F)(W, H),
              onYearSelect: (H) => k(R)(H, W),
              onToggleYearPicker: (H) => k(S)(W, H == null ? void 0 : H.flow, H == null ? void 0 : H.show)
            }), Pt({ _: 2 }, [
              rt(k(i), (H, z) => ({
                name: H,
                fn: Ne((G) => [
                  _e(C.$slots, H, pt(Ot(G)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          be("div", fg, [
            ($(!0), Z(Oe, null, rt(k(v)(W), (H, z) => ($(), Z("div", { key: z }, [
              be("button", {
                type: "button",
                class: He(["dp--qr-btn", {
                  "dp--qr-btn-active": H.active,
                  "dp--qr-btn-between": H.isBetween,
                  "dp--qr-btn-disabled": H.disabled,
                  "dp--highlighted": H.highlighted
                }]),
                disabled: H.disabled,
                onClick: (G) => k(Q)(H.value, W, H.disabled),
                onMouseover: (G) => k(M)(H.value)
              }, [
                C.$slots.quarter ? _e(C.$slots, "quarter", {
                  key: 0,
                  value: H.value,
                  text: H.text
                }) : ($(), Z(Oe, { key: 1 }, [
                  Jt(ot(H.text), 1)
                ], 64))
              ], 42, pg)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
}), mg = ["id"], hg = {
  key: 0,
  class: "dp__sidebar_left"
}, gg = {
  key: 1,
  class: "dp--preset-dates"
}, yg = ["onClick", "onKeydown"], bg = {
  key: 2,
  class: "dp__sidebar_right"
}, wg = {
  key: 3,
  class: "dp__action_extra"
}, Ql = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...$a,
    shadow: { type: Boolean, default: !1 },
    openOnTop: { type: Boolean, default: !1 },
    internalModelValue: { type: [Date, Array], default: null },
    arrMapValues: { type: Object, default: () => ({}) },
    noOverlayFocus: { type: Boolean, default: !1 }
  },
  emits: [
    "close-picker",
    "select-date",
    "auto-apply",
    "time-update",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "update:internal-model-value",
    "recalculate-position",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "auto-apply-invalid",
    "date-update",
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, o = te(() => {
      const { openOnTop: c, ...m } = a;
      return {
        ...m,
        flowStep: z.value,
        noOverlayFocus: a.noOverlayFocus
      };
    }), { setMenuFocused: i, setShiftKey: l, control: s } = Yu(), u = en(), { defaultedTextInput: d, defaultedInline: p, defaultedConfig: v } = ut(a), b = oe(null), A = oe(0), M = oe(null), Q = oe(null), S = oe(!1), R = oe(null);
    yt(() => {
      if (!a.shadow) {
        S.value = !0, F(), window.addEventListener("resize", F);
        const c = ft(M);
        if (c && !d.value.enabled && !p.value.enabled && (i(!0), j()), c) {
          const m = (P) => {
            v.value.allowPreventDefault && P.preventDefault(), Pr(P, v.value, !0);
          };
          c.addEventListener("pointerdown", m), c.addEventListener("mousedown", m);
        }
      }
    }), Vn(() => {
      window.removeEventListener("resize", F);
    });
    const F = () => {
      const c = ft(Q);
      c && (A.value = c.getBoundingClientRect().width);
    }, { arrowRight: C, arrowLeft: N, arrowDown: W, arrowUp: H } = Br(), { flowStep: z, updateFlowStep: G, childMount: g, resetFlow: E } = ph(a, n, R), _ = te(() => a.monthPicker ? Ph : a.yearPicker ? Ih : a.timePicker ? qh : a.quarterPicker ? vg : cg), j = () => {
      const c = ft(M);
      c && c.focus({ preventScroll: !0 });
    }, I = te(() => {
      var c;
      return ((c = R.value) == null ? void 0 : c.getSidebarProps()) || {};
    }), y = () => {
      a.openOnTop && n("recalculate-position");
    }, T = Ut(u, "action"), O = te(() => a.monthPicker || a.yearPicker ? Ut(u, "monthYear") : a.timePicker ? Ut(u, "timePicker") : Ut(u, "shared")), B = te(() => a.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), h = te(() => ({
      dp__menu_disabled: a.disabled,
      dp__menu_readonly: a.readonly
    })), f = te(
      () => ({
        dp__menu: !0,
        dp__menu_index: !p.value.enabled,
        dp__relative: p.value.enabled,
        [a.menuClassName]: !!a.menuClassName
      })
    ), Y = (c) => {
      Pr(c, v.value, !0);
    }, U = () => {
      a.escClose && n("close-picker");
    }, ae = (c) => {
      if (a.arrowNavigation) {
        if (c === "up")
          return H();
        if (c === "down")
          return W();
        if (c === "left")
          return N();
        if (c === "right")
          return C();
      } else
        c === "left" || c === "up" ? he("handleArrow", "left", 0, c === "up") : he("handleArrow", "right", 0, c === "down");
    }, le = (c) => {
      l(c.shiftKey), !a.disableMonthYearSelect && c.code === "Tab" && c.target.classList.contains("dp__menu") && s.value.shiftKeyInMenu && (c.preventDefault(), Pr(c, v.value, !0), n("close-picker"));
    }, L = () => {
      j(), n("time-picker-close");
    }, w = (c) => {
      var m, P, D;
      (m = R.value) == null || m.toggleTimePicker(!1, !1), (P = R.value) == null || P.toggleMonthPicker(!1, !1, c), (D = R.value) == null || D.toggleYearPicker(!1, !1, c);
    }, pe = (c, m = 0) => {
      var P, D, V;
      return c === "month" ? (P = R.value) == null ? void 0 : P.toggleMonthPicker(!1, !0, m) : c === "year" ? (D = R.value) == null ? void 0 : D.toggleYearPicker(!1, !0, m) : c === "time" ? (V = R.value) == null ? void 0 : V.toggleTimePicker(!0, !1) : w(m);
    }, he = (c, ...m) => {
      var P, D;
      (P = R.value) != null && P[c] && ((D = R.value) == null || D[c](...m));
    }, K = () => {
      he("selectCurrentDate");
    }, De = (c, m) => {
      he("presetDate", c, m);
    }, ve = () => {
      he("clearHoverDate");
    };
    return t({
      updateMonthYear: (c, m) => {
        he("updateMonthYear", c, m);
      },
      switchView: pe
    }), (c, m) => {
      var P;
      return $(), Z("div", {
        id: c.uid ? `dp-menu-${c.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: M,
        tabindex: "0",
        role: "dialog",
        class: He(f.value),
        onMouseleave: ve,
        onClick: Y,
        onKeydown: [
          Se(U, ["esc"]),
          m[18] || (m[18] = Se(qe((D) => ae("left"), ["prevent"]), ["left"])),
          m[19] || (m[19] = Se(qe((D) => ae("up"), ["prevent"]), ["up"])),
          m[20] || (m[20] = Se(qe((D) => ae("down"), ["prevent"]), ["down"])),
          m[21] || (m[21] = Se(qe((D) => ae("right"), ["prevent"]), ["right"])),
          le
        ]
      }, [
        (c.disabled || c.readonly) && k(p).enabled ? ($(), Z("div", {
          key: 0,
          class: He(h.value)
        }, null, 2)) : re("", !0),
        !k(p).enabled && !c.teleportCenter ? ($(), Z("div", {
          key: 1,
          class: He(B.value)
        }, null, 2)) : re("", !0),
        be("div", {
          ref_key: "innerMenuRef",
          ref: Q,
          class: He({
            dp__menu_content_wrapper: ((P = c.presetDates) == null ? void 0 : P.length) || !!c.$slots["left-sidebar"] || !!c.$slots["right-sidebar"]
          }),
          style: Mt({ "--dp-menu-width": `${A.value}px` })
        }, [
          c.$slots["left-sidebar"] ? ($(), Z("div", hg, [
            _e(c.$slots, "left-sidebar", pt(Ot(I.value)))
          ])) : re("", !0),
          c.presetDates.length ? ($(), Z("div", gg, [
            ($(!0), Z(Oe, null, rt(c.presetDates, (D, V) => ($(), Z(Oe, { key: V }, [
              D.slot ? _e(c.$slots, D.slot, {
                key: 0,
                presetDate: De,
                label: D.label,
                value: D.value
              }) : ($(), Z("button", {
                key: 1,
                type: "button",
                style: Mt(D.style || {}),
                class: "dp__btn dp--preset-range",
                onClick: qe((J) => De(D.value, D.noTz), ["prevent"]),
                onKeydown: [
                  Se(qe((J) => De(D.value, D.noTz), ["prevent"]), ["enter"]),
                  Se(qe((J) => De(D.value, D.noTz), ["prevent"]), ["space"])
                ]
              }, ot(D.label), 45, yg))
            ], 64))), 128))
          ])) : re("", !0),
          be("div", {
            ref_key: "calendarWrapperRef",
            ref: b,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            ($(), Ye(oi(_.value), ht({
              ref_key: "dynCmpRef",
              ref: R
            }, o.value, {
              "flow-step": k(z),
              onMount: k(g),
              onUpdateFlowStep: k(G),
              onResetFlow: k(E),
              onFocusMenu: j,
              onSelectDate: m[0] || (m[0] = (D) => c.$emit("select-date")),
              onDateUpdate: m[1] || (m[1] = (D) => c.$emit("date-update", D)),
              onTooltipOpen: m[2] || (m[2] = (D) => c.$emit("tooltip-open", D)),
              onTooltipClose: m[3] || (m[3] = (D) => c.$emit("tooltip-close", D)),
              onAutoApply: m[4] || (m[4] = (D) => c.$emit("auto-apply", D)),
              onRangeStart: m[5] || (m[5] = (D) => c.$emit("range-start", D)),
              onRangeEnd: m[6] || (m[6] = (D) => c.$emit("range-end", D)),
              onInvalidFixedRange: m[7] || (m[7] = (D) => c.$emit("invalid-fixed-range", D)),
              onTimeUpdate: m[8] || (m[8] = (D) => c.$emit("time-update")),
              onAmPmChange: m[9] || (m[9] = (D) => c.$emit("am-pm-change", D)),
              onTimePickerOpen: m[10] || (m[10] = (D) => c.$emit("time-picker-open", D)),
              onTimePickerClose: L,
              onRecalculatePosition: y,
              onUpdateMonthYear: m[11] || (m[11] = (D) => c.$emit("update-month-year", D)),
              onAutoApplyInvalid: m[12] || (m[12] = (D) => c.$emit("auto-apply-invalid", D)),
              onInvalidDate: m[13] || (m[13] = (D) => c.$emit("invalid-date", D)),
              "onUpdate:internalModelValue": m[14] || (m[14] = (D) => c.$emit("update:internal-model-value", D))
            }), Pt({ _: 2 }, [
              rt(O.value, (D, V) => ({
                name: D,
                fn: Ne((J) => [
                  _e(c.$slots, D, pt(Ot({ ...J })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          c.$slots["right-sidebar"] ? ($(), Z("div", bg, [
            _e(c.$slots, "right-sidebar", pt(Ot(I.value)))
          ])) : re("", !0),
          c.$slots["action-extra"] ? ($(), Z("div", wg, [
            c.$slots["action-extra"] ? _e(c.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: K
            }) : re("", !0)
          ])) : re("", !0)
        ], 6),
        !c.autoApply || k(v).keepActionRow ? ($(), Ye(_h, ht({
          key: 2,
          "menu-mount": S.value
        }, o.value, {
          "calendar-width": A.value,
          onClosePicker: m[15] || (m[15] = (D) => c.$emit("close-picker")),
          onSelectDate: m[16] || (m[16] = (D) => c.$emit("select-date")),
          onInvalidSelect: m[17] || (m[17] = (D) => c.$emit("invalid-select")),
          onSelectNow: K
        }), Pt({ _: 2 }, [
          rt(k(T), (D, V) => ({
            name: D,
            fn: Ne((J) => [
              _e(c.$slots, D, pt(Ot({ ...J })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : re("", !0)
      ], 42, mg);
    };
  }
}), _g = typeof window < "u" ? window : void 0, go = () => {
}, xg = (e) => es() ? (nc(e), !0) : !1, kg = (e, t, r, n) => {
  if (!e)
    return go;
  let a = go;
  const o = zt(
    () => k(e),
    (l) => {
      a(), l && (l.addEventListener(t, r, n), a = () => {
        l.removeEventListener(t, r, n), a = go;
      });
    },
    { immediate: !0, flush: "post" }
  ), i = () => {
    o(), a();
  };
  return xg(i), i;
}, Ag = (e, t, r, n = {}) => {
  const { window: a = _g, event: o = "pointerdown" } = n;
  return a ? kg(a, o, (i) => {
    const l = ft(e), s = ft(t);
    !l || !s || l === i.target || i.composedPath().includes(l) || i.composedPath().includes(s) || r(i);
  }, { passive: !0 }) : void 0;
}, Dg = /* @__PURE__ */ gt({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...$a
  },
  emits: [
    "update:model-value",
    "update:model-timezone-value",
    "text-submit",
    "closed",
    "cleared",
    "open",
    "focus",
    "blur",
    "internal-model-change",
    "recalculate-position",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "date-update",
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, o = en(), i = oe(!1), l = va(a, "modelValue"), s = va(a, "timezone"), u = oe(null), d = oe(null), p = oe(null), v = oe(!1), b = oe(null), A = oe(!1), M = oe(!1), { setMenuFocused: Q, setShiftKey: S } = Yu(), { clearArrowNav: R } = Br(), { mapDatesArrToMap: F, validateDate: C, isValidTime: N } = tn(a), { defaultedTransitions: W, defaultedTextInput: H, defaultedInline: z, defaultedConfig: G } = ut(a), { menuTransition: g, showTransition: E } = Qn(W);
    yt(() => {
      ae(a.modelValue), ur().then(() => {
        if (!z.value.enabled) {
          const ue = h(b.value);
          ue == null || ue.addEventListener("scroll", ve), window == null || window.addEventListener("resize", c);
        }
      }), z.value.enabled && (i.value = !0), window == null || window.addEventListener("keyup", m), window == null || window.addEventListener("keydown", P);
    });
    const _ = te(() => F());
    Vn(() => {
      if (!z.value.enabled) {
        const ue = h(b.value);
        ue == null || ue.removeEventListener("scroll", ve), window == null || window.removeEventListener("resize", c);
      }
      window == null || window.removeEventListener("keyup", m), window == null || window.removeEventListener("keydown", P);
    });
    const j = Ut(o, "all", a.presetDates), I = Ut(o, "input");
    zt(
      [l, s],
      () => {
        ae(l.value);
      },
      { deep: !0 }
    );
    const { openOnTop: y, menuStyle: T, xCorrect: O, setMenuPosition: B, getScrollableParent: h, shadowRender: f } = uh({
      menuRef: u,
      menuRefInner: d,
      inputRef: p,
      pickerWrapperRef: b,
      inline: z,
      emit: n,
      props: a,
      slots: o
    }), {
      inputValue: Y,
      internalModelValue: U,
      parseExternalModelValue: ae,
      emitModelValue: le,
      formatInputValue: L,
      checkBeforeEmit: w
    } = lh(n, a, v), pe = te(
      () => ({
        dp__main: !0,
        dp__theme_dark: a.dark,
        dp__theme_light: !a.dark,
        dp__flex_display: z.value.enabled,
        dp__flex_display_with_input: z.value.input
      })
    ), he = te(() => a.dark ? "dp__theme_dark" : "dp__theme_light"), K = te(() => a.teleport ? {
      to: typeof a.teleport == "boolean" ? "body" : a.teleport,
      disabled: z.value.enabled
    } : { class: "dp__outer_menu_wrap" }), De = te(() => z.value.enabled && (a.timePicker || a.monthPicker || a.yearPicker || a.quarterPicker)), ve = () => {
      i.value && (G.value.closeOnScroll ? ge() : B());
    }, c = () => {
      i.value && B();
    }, m = (ue) => {
      ue.key === "Tab" && !z.value.enabled && !a.teleport && G.value.tabOutClosesMenu && (b.value.contains(document.activeElement) || ge()), M.value = ue.shiftKey;
    }, P = (ue) => {
      M.value = ue.shiftKey;
    }, D = () => {
      !a.disabled && !a.readonly && (f(Ql, a), B(!1), i.value = !0, i.value && n("open"), i.value || ce(), ae(a.modelValue));
    }, V = () => {
      var ue;
      Y.value = "", ce(), (ue = p.value) == null || ue.setParsedDate(null), n("update:model-value", null), n("update:model-timezone-value", null), n("cleared"), G.value.closeOnClearValue && ge();
    }, J = () => {
      const ue = U.value;
      return !ue || !Array.isArray(ue) && C(ue) ? !0 : Array.isArray(ue) ? a.multiDates || ue.length === 2 && C(ue[0]) && C(ue[1]) ? !0 : a.partialRange && !a.timePicker ? C(ue[0]) : !1 : !1;
    }, se = () => {
      w() && J() ? (le(), ge()) : n("invalid-select", U.value);
    }, ne = (ue) => {
      ie(), le(), G.value.closeOnAutoApply && !ue && ge();
    }, ie = () => {
      p.value && H.value.enabled && p.value.setParsedDate(U.value);
    }, ee = (ue = !1) => {
      a.autoApply && N(U.value) && J() && (a.range && Array.isArray(U.value) ? (a.partialRange || U.value.length === 2) && ne(ue) : ne(ue));
    }, ce = () => {
      H.value.enabled || (U.value = null);
    }, ge = () => {
      z.value.enabled || (i.value && (i.value = !1, O.value = !1, Q(!1), S(!1), R(), n("closed"), Y.value && ae(l.value)), ce(), n("blur"));
    }, xe = (ue, ke, Ae = !1) => {
      if (!ue) {
        U.value = null;
        return;
      }
      const Ft = Array.isArray(ue) ? !ue.some((_n) => !C(_n)) : C(ue), St = N(ue);
      Ft && St && (U.value = ue, ke && (A.value = Ae, se(), n("text-submit")));
    }, Me = () => {
      a.autoApply && N(U.value) && le(), ie();
    }, Ee = () => i.value ? ge() : D(), We = (ue) => {
      U.value = ue;
    }, x = () => {
      H.value.enabled && (v.value = !0, L()), n("focus");
    }, q = () => {
      if (H.value.enabled && (v.value = !1, ae(a.modelValue), A.value)) {
        const ue = Hm(b.value, M.value);
        ue == null || ue.focus();
      }
      n("blur");
    }, ye = (ue) => {
      d.value && d.value.updateMonthYear(0, {
        month: Fl(ue.month),
        year: Fl(ue.year)
      });
    }, Pe = (ue) => {
      ae(ue ?? a.modelValue);
    }, Xe = (ue, ke) => {
      var Ae;
      (Ae = d.value) == null || Ae.switchView(ue, ke);
    }, xt = (ue) => G.value.onClickOutside ? G.value.onClickOutside(ue) : ge();
    return Ag(u, p, () => xt(J)), t({
      closeMenu: ge,
      selectDate: se,
      clearValue: V,
      openMenu: D,
      onScroll: ve,
      formatInputValue: L,
      // exposed for testing purposes
      updateInternalModelValue: We,
      // modify internal modelValue
      setMonthYear: ye,
      parseModel: Pe,
      switchView: Xe,
      toggleMenu: Ee
    }), (ue, ke) => ($(), Z("div", {
      ref_key: "pickerWrapperRef",
      ref: b,
      class: He(pe.value),
      "data-datepicker-instance": ""
    }, [
      Ke(gh, ht({
        ref_key: "inputRef",
        ref: p,
        "input-value": k(Y),
        "onUpdate:inputValue": ke[0] || (ke[0] = (Ae) => vt(Y) ? Y.value = Ae : null),
        "is-menu-open": i.value
      }, ue.$props, {
        onClear: V,
        onOpen: D,
        onSetInputDate: xe,
        onSetEmptyDate: k(le),
        onSelectDate: se,
        onToggle: Ee,
        onClose: ge,
        onFocus: x,
        onBlur: q,
        onRealBlur: ke[1] || (ke[1] = (Ae) => v.value = !1)
      }), Pt({ _: 2 }, [
        rt(k(I), (Ae, Ft) => ({
          name: Ae,
          fn: Ne((St) => [
            _e(ue.$slots, Ae, pt(Ot(St)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      Ke(Ur, {
        name: k(g)(k(y)),
        css: k(E) && !k(z).enabled
      }, {
        default: Ne(() => [
          i.value ? ($(), Ye(oi(ue.teleport ? Ed : "div"), ht({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: u
          }, K.value, {
            class: { "dp--menu-wrapper": !k(z).enabled },
            style: k(z).enabled ? void 0 : k(T)
          }), {
            default: Ne(() => [
              Ke(Ql, ht({
                ref_key: "dpMenuRef",
                ref: d
              }, ue.$props, {
                "internal-model-value": k(U),
                "onUpdate:internalModelValue": ke[2] || (ke[2] = (Ae) => vt(U) ? U.value = Ae : null),
                class: { [he.value]: !0, "dp--menu-wrapper": ue.teleport },
                style: ue.teleport ? k(T) : void 0,
                "open-on-top": k(y),
                "arr-map-values": _.value,
                "no-overlay-focus": De.value,
                onClosePicker: ge,
                onSelectDate: se,
                onAutoApply: ee,
                onTimeUpdate: Me,
                onFlowStep: ke[3] || (ke[3] = (Ae) => ue.$emit("flow-step", Ae)),
                onUpdateMonthYear: ke[4] || (ke[4] = (Ae) => ue.$emit("update-month-year", Ae)),
                onInvalidSelect: ke[5] || (ke[5] = (Ae) => ue.$emit("invalid-select", k(U))),
                onAutoApplyInvalid: ke[6] || (ke[6] = (Ae) => ue.$emit("invalid-select", Ae)),
                onInvalidFixedRange: ke[7] || (ke[7] = (Ae) => ue.$emit("invalid-fixed-range", Ae)),
                onRecalculatePosition: k(B),
                onTooltipOpen: ke[8] || (ke[8] = (Ae) => ue.$emit("tooltip-open", Ae)),
                onTooltipClose: ke[9] || (ke[9] = (Ae) => ue.$emit("tooltip-close", Ae)),
                onTimePickerOpen: ke[10] || (ke[10] = (Ae) => ue.$emit("time-picker-open", Ae)),
                onTimePickerClose: ke[11] || (ke[11] = (Ae) => ue.$emit("time-picker-close", Ae)),
                onAmPmChange: ke[12] || (ke[12] = (Ae) => ue.$emit("am-pm-change", Ae)),
                onRangeStart: ke[13] || (ke[13] = (Ae) => ue.$emit("range-start", Ae)),
                onRangeEnd: ke[14] || (ke[14] = (Ae) => ue.$emit("range-end", Ae)),
                onDateUpdate: ke[15] || (ke[15] = (Ae) => ue.$emit("date-update", Ae)),
                onInvalidDate: ke[16] || (ke[16] = (Ae) => ue.$emit("invalid-date", Ae))
              }), Pt({ _: 2 }, [
                rt(k(j), (Ae, Ft) => ({
                  name: Ae,
                  fn: Ne((St) => [
                    _e(ue.$slots, Ae, pt(Ot({ ...St })))
                  ])
                }))
              ]), 1040, ["internal-model-value", "class", "style", "open-on-top", "arr-map-values", "no-overlay-focus", "onRecalculatePosition"])
            ]),
            _: 3
          }, 16, ["class", "style"])) : re("", !0)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 2));
  }
}), Ei = /* @__PURE__ */ (() => {
  const e = Dg;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})(), Cg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ei
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(Cg).forEach(([e, t]) => {
  e !== "default" && (Ei[e] = t);
});
const Tg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAACTCAYAAABlAhcCAAAACXBIWXMAAAsTAAALEwEAmpwYAAABLGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarZCxSsNQFIa/GwdFSlUMTg4XcdAhBce6JW0pBYcaHZKAg7kNQaRpSK5a36AP4CTOzj6Cjg5iQXByEJ9BOok4RAmdRPCbvvMP5xx+MFbtptMyFqGf6MxtO9LzAzn7iMEKFWZYOFR5ane7OwDJIImYRsDkGQHwZNlNp8XfmFdppoEPYL0X5QqEBOIznWoQI8AMj1MN4gows323AeIGqMaF3wLVsPAxUM08PwDxCphx4e+AGXp+AMYcYOpoqAE21Kbcqtfr0u4Nwkjunec66ueyk6gaxT8AVFqNjuW2ndqRUvw3nh/IwiYv311ul1mJOslOf3oXD7/P5Y7rIex+Tt+yLuBSwtJBma3dw/Ib3I2/AGL5TD2MChgLAAAAIGNIUk0AAIcKAACMCgABBbcAAIDmAABSCAABFVgAADavAAAfQIQCtHoAAC88SURBVHja7H1rfNzUte9/8+uX0xaikHcCiRzCs6WReeUJ0QB5kOcYGgIJJTPtKY9Asd32nHvP/WL70723p2Cb8ig9bWfMAVoIicd5QAKBkUMCSYBaobQUSGIFyDshCpye+6la94O2ZiSNNKMZjxMn3su//bM9I21JW3v913+tvfbeICIMlCIkL//rzqsU0Qrntgwk3TtPvI6BJ/9255USgTpFSwg5XSKAYGBKlgGGaAYhAggGKxtYemUKgEIEXbSGEAEEgxcEErDDJd2iRYScLvmGaIKBIf9z6RUpAiVcH2miVYQIIBhMIPD9K1IguEFA/z8v/80ULSNEAMEgkP/x/SskACkC4r6vOkTrCBExgsEAAndcLoMoC6I4iOArmQrqS4hWFSKA4OwCARVADwAl4Gv9/6752Cinvn+94/IEAUtEywoRQHCWyL/ecXkzAVkCJAIQUNrLqu/2y+MgpEDoEq0rpFJhAym1lzF27gLA7ZfLAFIA1CKHmb9Y+/HQ6HVepgDIAsAv1n4yVHTns0sGku4JRnBaQOCyBoB68iBAYSUyG/iXussUImQBSETlsQghQvwiRg36FwAUAK1eAAiyDDYbYAxtUUGAMwGJCCYQ7TwhQgQQnGb5l7rLmonQVMYpLb9Y+4lZ6qCfxy/NgQD/qP3fO0ufJ0SIiBGcXgBQeSxALuM0/d87P6mNAAIJXnfuvF9mPq0V3VjECAQjGCDy8/ilMoBWIopXcHoyQv3NQAHDaBQtL0QAwcAAAAlAQ4CSRnYJfpn5VA/78mdLLpUApIgKsg9bHu36VBNvQIhwDc6w/GzJpQnG0Ory1znli1yF9mjXp7Hw+icpADoD3Az90a49wiUQroFgBGcWACapAEsBkL3vsqwXqwOoC/vyp4snNRChNeArs9h5QoQIIOh/AFCQGw4srfRFAF8HEHts3R7T/0Xj4kkyC0g8cqpiQN1j6/YY4m0IEUBwmuWniydJAFrJO1W4fCrIQYCFgcCiSQ0AmsjtarjBhCH52Lo9Ii4gRADB6ZRGGwAaCKhnfG5ApdrPJcOV2QMCDYsuUQCkAFKc4wOu1da2bm9avBUh/SEiWBgGAosmxQG0gkEO9wIIZXzT0rZ+b7MPACREG3FIt63fmxTd9dwSESwcwNKw6BIZQIpAagldjyoagGTb+r0ev75h4SVx2MFAuSQIbBAgIEQAwekEgeai1jk6KGQAdAHQ2jZ4AcAlBuyEoFmwA4OKAAEhwjU4g65Bw8JLVISnBRuwh+yUEtWYsNcSSLdt2GvUL5yoMLC4S9E5lpC7Xg1AV/uGfZn6hRNlDkIJBwTaN+wTICBcAwEEpwkEwliAAaCFQAYDywYoslvaALS0b9hn1i+YqIKhCf51B4o3swGgpX3jvnT9gokKALV94742oSoCCAQQ9LNwC9wZYOlNrtRt9QsmSgB6wSCFKLIOINm+cZ/Oj02hcCHScrwMDaDk4xt7DaEmAghOpwzKhUnqF0yMg9ADguJbGyQNQk37hpw1bgJCQSANINa+cZ/+yIKJCgG9BMRDlxzhbML5KfjWXrRUBaHnkfk1qlATIYIR9KM8smBiAwNafU9tMNuya67jZAC9IbY8/fjG3iQAPDK/RoF3fYDoFqH418lfvdKbFl1UMALBCKoOAjUpgFp9FjkNUK0bBPhbagpYZhygPAj8ZH6NUmIh0sBi8VLiuNTDt8kJoS5CBCOoJgjMr7H3FfRZ3ccDrO5P5teEsAFkfvVKbx0APDy/RoK9JLlchgmo5NaTT7xqCGYgGIFgBH2Vn8yvSRGQcFlbk4Dax0OoNwH1ARbaJPcCIjZjkINZQ0gpAy9cJfXQPMEMhAgg6JM8fJvcmgMBIhCRSUCMiGcOBmti0O5DjU+80mvyOmXYqcFRlblPeEGg1Kp5E+KiuwoRQFAZCCQANLg0zAQQg72cmBZ0zkPzZAV8nQFXMdz0nAhNFShzxT+8gtSquRMU0WWFCCAoQx6aJ8tEaPUpaIz/nvDEq4YecqoaoMgtzh+r5k2QCZSoSJl9/kdYCY5RQiIg++DcCZLotkIEEESXFLxDeo1PbjJ0AjWhyKKfBJocoMgZ1wHxihS5ULFDSxE/QwJRp+i2QgQQRJBV8yYkCKS6FFl7cpPRtmruhASA3U9uMsxw577ALcg8tWm/6TLkS/qgyJELuYu3fvWB2eNbRdcVIoCgiDw4d4LkdwlAdrSfgCai4rsCUWFi0G6fUqtlK7MfLIqcZvFSgk003D97vCq6rxABBOGS8LkELU9t3m88OGd8AkTa05v3m0XPJlJ8iqw5Xz0wZ7xaSpmtKMpcDpsIl877b71YxAuECCAI1mOq92leOscGImw5HmCVTdd3cillruKDlHIZJCoxhClEyKAEgvtnj1dBkF1WOf30a58Z988eHycCfv3aZ3pJ/fP9/8zrnnPkvipygf8fVqIADaH+x7cIViBEAIFfVvqUpYv/XgJ71aAoonsUOUC5+6LIFIY+lYw+2C5QXHRjIQIIvKK6/jafef2zzH23XiyBKAGiroiuhelW5CB9jarIfR1KDLk/f1kiurGQvso5s2bhfbdeLBORXGDZAZUA/GbL51o0Sg+jGNuvQgyjujER/0pIQoQMakZQuMhIN1feWUTQylCs3e5qfnzLxWoJi1xWiUAmTAI0AmKukiSgLYQ1SD+KXaSIrixEAIGtFIpPSXSXu6CXYbG1MOWNqMhllYAKJRBUELJ8ToP5uze/SINwqohrsVJ0ZSECCGwlHeJTYJN/rhDRqaj1/PbNL3RulR1lVVxKr0UaLqxSvMAGMcom1XEKgSYXLHyWf9ZEUh0nie4sZNDHCMi3COnv3vxC+9HNFynkjRdErSwDvogJAZNdn5s+5c8gUtSe+hJzkGDvu6iWOKYBQPO52EnvvWmszJmdDGACvMO4OoBTsGeT6s9uPWgKtR7EQBCod5TLMDTLPL0LudWMKAcwv8t+of8wNs751wDQTuQBApODQzf/3nFNJrg6ciWiFmdDAICmxKxxmXT3Af0cUf447GHfUu3mtE0TEfCDG8fqAGkA2v/zrUOGUPHBxggoqh0uLb/PfpFJquNMbmmVpDpOSmkHuKsBHTb70HxMQwdQl9IO+Duf5vyRVMcpsP35BFxp0JUMJITsr9C58qaxtR1nqVX8wY1jJIA1AFhJ5Ff+yKxK4aXhnpljNAAdz207lBaqPnhiBAUBPiKSw6L1ESQdYpEdxd7PwcEBgyAQ8EhKO6CntAONKe3AUCIkLSLDojJXNnCeJzj+IBOQvfemsWdVvOCemWOke2aOaSZCLxE1ud9bvkRdAMY7U5OA1IqZY3pXzBiTEOo+CIAggp9dLsNod3W4Ja7Pu/lnOgBYRO0WUaYUCBSgTPeBdEf3wRoQWkAwq5h8pMAGA/ksAYFm2AvFNjnvqaIRmPxMUx9Akm0QQKl7bhzTs3zGaFWo/TnNCAotBREM/r9SNh3oPmAQKM3tcNz1ecaZ9MM/yoDQVel9d2w92MxzBfQqtoNChJ4f3DhGGajva8WMMeqKGWN6+WQwyTdtPEiZS6R0F/wYZMcKWpxiWWQCaFo+XYDBuRsjAOluCr9y1ljZ5UdPqLDSFuL+/L03jU08u/VgmlusjBPA6ug+aPrciLLl2a0HdQC19940ttkJeoXdUBkxEglA9p6ZYxoHko+8fMZoCfa28/GKAzlU9KsMA1peePuwLtR7MLoGhFM+ei0TwayUEXBrbbiU3J200wVgSLUf4dmtB5uJKEZERrDlQ7m+ssR95NSKmWPOeNxg+fTRcRB6QYj3w9wMk4C6P7x9uE6AwGB2DVAwxi9zSwsASh8CaC0cUNQf3DhG5gqb9s1rqJr851uHNAC1CEkpjuInB9DrBBFll88YfUZchbunj5bunj66k4DOUrtCFTKdyOnbJhEtuWvaqOZl00Yllk0bJej/oGQEPh/bGX4igmYrB1XUMZ7detAgonZukZtc9Rv99SDPbTtkPrftUCOAGAh6H/xk9yrKCgjZ5dNHN5zOl3LXtFEqEfUQUbyf5mY4Reb7VzTBXrg2u2zaKFo2dVTPsqmjWpdNHRUX6j4YGAGRblkEpxDRLOdzrsRL+qCYzQToBCRWzLRZAQHt/U23n992SHt++6FaAiWBAOApl17b1rj17umjs3dPHy2fBhBohr1BrBxRmcseFSg+BZxAIIVADQTqvHPqyJN3Th2ZunPqSAEKPjmn9j68Z+aYXqfTEWA+v+3Q0BUzxyiw9yg0n992aGilda+YMUYhUA+A9AvbDyfPEMVO8FiFWiZIBn1sAmj54ztH2qp9n8umjpLB0Al32nf1kqb6YCw8/xqwl65Lr9551DxDxksAQX8AwYqZYzoBHoiypfb57Yf0FTNsgCBQ8oXth9MVB7tmjG4G0ARC7IW3D2tnqp3unj5aJnu3plnw5kiY8K+6nJdZXDEln15qABpffOdIVQJs3NqmGJh0GpS5GmICaFy982haAME5AgTLZ4xuAOBe87/lhe2Hm3MKDGgvbD8c66MS9gDAH94+XHs2UsBl00apsGMdflZR9+KOI5k+gkArIuwJOQDcyMAYEwHJNbuO6YMRCM61zMKMz1dewjlmmvuY6t19TyapIyL5rmmjGs7GBnrxnSMagcyAgKJSaZ1Lp4xUlk4Z2UOEhiptCF1SgcotlquEhBQUAD13XD+iWcQIznJG4LLYiqvT1P7xnSP63dNHp4goAUD74ztH+sQK7po2SiWgE0Dti+8cMcrynb2z6WZxX3U/p9E6/9/gxymwR0OMl3YcrZqlWjplZDaAESQrocdLp4xMcBYm9bc1rKinUkVfZQBKrn33eL/GDoRr0I9AwC212z1I//GdI8m7po2SYOe0SwTUvfhO32jwsmmjEiDUv7jjSEkXgfvNTUBZiU0a7OnMTmdcwvdY6AKQ6UuAa+mUAgpvrN55tKacOr5/wwiJt3NiACpyRRX6VEEHEOt8r//AQABBPwLBMlvhT3qCQYSaF3ccMZfZw1lNfIHS2hd3HOnTS75z6sgUAPOlHUcbSxyTCOh0GmO5dQsM32tQYWcuKvxvA/l1DmQA9byjVgQKS6eMlAH0Ou+eMVa7emd0xnHHDSMU2GP1Sl90r/Ke16eFXsq5ig5CLPN+/4CBAIJ+BII7p46UGJjHUhGo5aUdR5v5947r0FZMgctQqhSA7iBavXTKyGbOBHKWF/YEmLKUd+mUkSrsRTri/H21MMZMmyWQytlD18u7jmUiKLEEe2zfUeLkml3HIrsEt18/ogFAEyscfegPq9xXRe4zneDuWqzr/ROmAIKzBAg4BVe4YmTdrIAINat3HjXvnDpSAZAle/Wi2OqdR7U+AoEEO17Q6Laq/HM3M2lbvbPvwPP9G0YoZDMCFUAH7LkQDlDYoGCv4KyvefeY5lJgCUCc2cAkc5cjuebd0uBhnz9cslkAi58uRS6qr1RpfRWdqHW9fyImgOAsAAKueL0A6lbvPKoFBMTSq3ceTboCXCluoWv7mlCydMpIiYg6AdS9vOuYyRVWdYFR28u7jjVWs63usBU7AaCebOBrWfvuMeOO60eofK+DWVzh5YDYQxeA9Np3j0V67rrrhsd5e0lnwipXQZGrAVxt6/50olEAwcAHgmYATat3HmX8fwV2RqFbcgzACZgRUeblXcfq+qyYTvCM0Ljm3WPmHV4gGLpm1zGzv9rt9utHJABayVlOBwCt873juk+ZJQBK53vHIzOg+LXDJTCkELZA69mlyNFAi4red2xDz5eaAIIBCgQ8gt0LQH9517GY6/OUN1ZgR4Idpbwj/33jml3H2qphpcmOpDuW4yQArH33GDsd7Vd33XCZK+1kHxNwgpKZqFHwJdcOS/BYi9Sfylyk++ncfTERnC05xBXnUMBnNRYfZaC+3qsBoHaj/qUpgGAAAsEdN4xwqH7Lml3Hmn1WujfXme1HTa9591jSpbwp2LPWYmtdPnXl1nm4BHv58Ubkh9di5VjiMylLrh0m87ZUT5NVNrm7spv/Ntb96YRRSUULay9UOSjM4vcv9cN9t2zUv2wWQDAQgeD6EVnuFxco8+3Xj4jDDua5X0Fy7bvH0y7lTQGIEyHmp9R9sM4NvGNnCTAy7x0f8CnJi68Z1gzvKEdV6bXLKmcYWDcAbX3PCb2/nmeBcqHCGdJKRFhKnqInLdS8svukIYBgAAFB3XXDJcac6DwbGhQAq7tueNBYfq1b6fkxcQJqMlVKIolfO7yB/9kKIJ15/3hyIALAotphKoAUY5D7kV5nwPMeNvRUh1qXI/OVoQoI9RwYpMigFizpV3efTAogGFhAkLP4ne8dZ2FgwS2z4nrLJoBY5v08GMSvG94Awkr+edU665JrhyU4GGS63j8xYMBgYe2FMr+veD/4+OBxiQ4A6Y36l8ZAeObbJg+VYGdV1ocBQkSdqNn0gWkIIBggQBC/dngrGBpA0DLvH48VOU6GPYoguaybCTtZRHcpbZx3krpqJpEsvmaYwn1vAKir1A+uEmWWADQwZrsB1Y28EwBoDKx9o/5lZqC6QfO+J5UEhBLMoG3zB2bjuQIEZ/3sQwIpzjJdRXnp+8cNAsXcM+9gL6Od5UoKAOh6/0QGQJIIrYuvGSZV6z7X/emEvu5PJ2qJ0GURZRfWXthwhkAgAb6PQPjCp8U3VylS0iDEXtFPxgYyCADApg9Mc9MHZjMBNQSkK9grIYFzSM56RrD4mmG9jEEmgr7uTydqIxyfcyVcYhIhub7nRMZ3rLTuT9VPLV1Ya1tkIsyCHYXW+t1Hnjw0zt0AuXywLUn/27nf3Ke2mvs9Seb3p3Ar7d/wVA04zYR7vUo7qxJ8TwPztT+f0qNce87VQ1TO2CK3DxHqXv/wVMWAJ1yD6gIBuaxupAoW1Q5LECgV8FXjhp4v206zhY4DkDfq/XPd2yYPVYHAhUj60lFN2KnNHZs+MPU+KL2C/MpJSgFFr17QUgOgkw0S2usfnjJDwEDiC9RGZWvp1z88lRRAMACAYGHthe4HqNnQEy0otbD2QgV25p/k85MzAJLVSho5gz5wxQAQZvn55iHdmz4wy7aCc64eIsEOSjpj/HI1n7fMbqwD0Ajo2PJhIWOY/d0hcQpLqfZeyNzyl6+GCiAYYEBAhORG/ct0GdZY4W6C7LM2BgjJV3af1M42AJj7PUllIQBQwZvWwYf8Nldg+edcPURGfhxf6YMye+l/sKiRn9V7IQN8ZGPLX77KGZFbv3OBAtdU6yL1xd74y1eaAIIzDAS3TR7acx5jTifLbNS/LGvewHxlqARCZ4jipAE09tX3PS0AcLWkgoUwAIpMrw3kJyVpr/35VNnPPfu7QyTYORuRlN8HOgbsDEPdUf4wGh8mt37nAnecYQL/rUac/JQB0P7GX23FvuWqCyR4p2wHNWnLm3/9qlkAwRkGgvmTh3bCNQ5OwNBKFPe2yUObEZBVR0QmgJZNH5htAxEA5lw9xFG6SlwA06f4RqX3cet3h8QBrGTedxF+XSINjO0GoG358FS/M69brrpARX5Wplr8/sggQkv2o6/TN191gQRQbn2LAHXRsh99HRNAcOYZQQO8S5M1vrr7ZEVKy/3qwMgx8UVFNn9gps90O3GrG+d5AHIZvrKj+E7QTO/Lfdz6nQsk2IG1KCm8ugM6Wyqk0tWSm686X4KdUr4ERZKp+DtPah99ralXnh+40hQAU/vo66ECCM4wEMyzo8+9bnq76QOzptJ7mGsnmhRGjvPNZBCo5bU/n0qfAQCQYSfAJBAtTdYkQGNVUnyPdWVY6VEMClX+DgCZN/76lYEBKOqV58suVyYMzDQiSjLGcpOxfHpT0/23/zIEEJxBIODK61+EpGXzB2ZzX+5lztVDFM401CLWtZ0I6dc/PNWvnfzW71wQB2MrC6xXyPr8DtWvpuW9+aoLFGYrS9ytMBTcLmkAHW/+9SsdZ5HMuuLbCaCQZbmkDfnVpd0S6/7bf2kCCM40EFwtqQTK+j6ujZpMUgIQ4kQlE3EyxKPrWz4sP8AWaHW/c4HMQixVwBvLcOXPvPGXr8xqvY/YlecrjAUof3CX0QB0ZD/6Oo2zXGZd8e0EzyeQ/S1OgMHy2+rl3NG3Pv57mwCCMwwEXGGzedqWs0yxatHh2d8d4uy0K5ewyhkAXVSBUvIodRwo7rsWKP9fq6P86pXnSwBUll//sBQAmfw+WrSPvjZwjsmNl3+rGUFzEQobouWtT/7eLIBgAAAB9599k4psMNhSJTDgNF2FvU5gPCzC5KPpGoBuArQ3QxT25qvOjwPMUX6pSIUmeDrvm3/tu+Jx/1iFvaJREOUtCkLaOWD9S8nMy74lo8QMTSJq2/7pfzcKIBgAQJDzpQvnEYCAxjf+8lVbNe/1lqsukOGi7kWGopw/DNtv/ro5ZlveOOyhrADlry7tnnXFtyWu5DJXegWAwhiTynj/Onjgr5LA2NkuMy79ZgLhOzpp2z/975gAggECBNy3ToAQNI/AIDv5o+pW7OarzleJcmP5so8N7IadzirBu+x4KTG44qWJSI5wvOSy6O71/NTyOqeHfWjc/dC2fjz4lN8v0yd9U0Hwxi7a23sEEAwoIODW2tmbUCoI9lButlwm2w9+rXrl+Yr20de6euX5DtUuun6er/0dn7uDA4Gzoo5cgSKX9FsCPs0NNW79+O8ahBTItEnflDgYxF2Np72zVwDBgAMCAIjZ/m/gIpzktbqO1dYBGOUGvWZd8W3VZY2d1YOVMqpwlL+LCDpAcYCFpOdSmSpekurrzrO/JRS/LJl6yTebkc9E1XYIIBiYQOCy0HGUmIdP4ePxZsgpSjG/PoJV5m4D69j68X/pN17+LdVl/cvoSSW/Ml3PsZsDn7HtE6H01ZApE7+Z4MZG27lPAMGABgKX5U4gYk4+Vbg9DxX39zVw2v3Wx38PZB03Xv4tCeRhAmoZFt+t3Pq2T/5uClXtf7lh4j8pANRd+/5fmwCCswAIHLnp8m/LtuWlAt+9Stt2O1a426Hfb33yd0OojBABBAMICAKssOLx6+3lw9x67nYDHCV3W/r9DuUWlliIAIKzFAiECBFAcA6sYixEiBABBEKECBFAIESIECFChAjpsxCRYARChAgRroEQIUIEEAgRIkQAgRAhQgQQCBEiRACBECFCBBAIESLEkW9EPfDh2+Q4GFvC8ltYAwCc2QF8VxgdfGXdX73Sa4rmFeKXf739MhVgaskDC6edaL9Y87F2LrXFv915pTPZQPvfL30UG9BA8NA8uZmvbS+DCrfNdP0vgzEZQBxErQ/fJmcAtDzxqmGI7i8k118IKkBNAFB0jhkFooJ2bjXGWeAarJo7QV01b0IvgZosItkigkUEIoQXi+wCSAQkiNDz0Dy5WXR/IXkgyBsTIsAq1p9yhQbUTL1qtoU1QJ4tkBE8MGd8AwGtQYjlvEZWjMrlz5MANK2aN2EWgLqnNu0X7oJgBHCYJWO5PR+Kewk2ddDORSAYKMSgAAjunz0+RYRE4HpdzKvrLIjmBPM9FUD2wTnjY0+/9pkAg0HOCJyOQ4Tux7r2NA/etgiNh5xZILjv1osTIEqQR6+ZX9nTsJfhMjzxAWezDiIphDEosBcRTQp1GOyMYOAowIAIEtAAAoIf33KxTIRW/zuyiOy/GdIAGn+z5fMwi56+f/b4RgANRFRPgMTcDIGgA2gUqjDYuz4FuZCDmxEMJNfAIkqxsIU8GUv+x5bP06Uqe+b1z0wAzffdenEGhJQFKIz48t0MsSIg4mYlEvh2YL5dZ3UGdD+z5fMMd2EkBKz9/8zrn2kB7o4a4N3ov7bvFw/MGe9s/Km4nlkHUdfTr30W6Js+OHeCc4/ue9ABdD21eX9Rf3bVvAkKXG3N7Lsyntxkj7A8NE+WASQYw2S+QxKYvV5iN4BMX0ZifjK/RkZ+uzU3ezPIXvI886tXekvW/8iCiarvI/Pxjfv0+gUTJQANvH6nTVraN+4zHdeAVYEONCy8xN2GetuGvZFdzsZFl8jIL29vtK7fG7k9GxdPkgHEGd/DwkWYTfD2e7Rrj15OjCBIfh6/1HlH/v7V8cvMp3rU+/2XustUePu2CT7E/++dn5gevfhhbJwMsF4EMTaG5O/e/CJd7ov655svkgBkARiMseR/vFEaBH58y8XNAOodQMrFIbyBSANAkn+W9YcwntnyOQsAgqAWj/FGaYVviXNfBRkCks84oDF7vAKGFPODkMeFIg1A8unXPgvsYKvmTsjt3Oy6WAsIabDCDTdZodKkCdRYTvD14dtkJehZ/TEdZre7BqKWJ141QgHtkfk15DtRI0IjA7JgjoLmVL6mfeM+AwDqF0xsRn5jkJb2jfuaKwSCrOtZYm0b9mqRz110iece2tbvbY5wjsqAplwORHEcMwC0t67b01bsoJ8tmZTLI3i0a0+Mfxa33xOTi5yaAZB8tOvTou//5/FLU7D358y9a1fejwmi5C8zn2aIyGYERKj37QGf63Cp7IF0JS/qt29+YQKojXLsj2zQ6CQi1c9GCJ6ABThLyJJFaf9ip1Qe8q70NJKvHpdbE4e992Dt/bPHJwhIgQKuRZ7RFJWAnvtnj69xACT0fvJ/TgbQAzApjE67njZBQPzBuRNiT2/eX9I6rJo3IUHB+0Hm+Snz3I7KAPWh2+SWJ181ApXEyp3HnA8kMJYFIOWfyWaDj7sYRrWGyvpUD5UFOBIH0ARF8OtZPmbW2rDokpUAkm3r9+rBbVjANlIW2X2SoWiwPg6C/NPFk2KPrdtjhoBMK5Gvf7sCtZxNdf48fmkbgMbzAMCySA3JEzgtPj0RZYmgho4p83Z3xl0te/gpYbn/LzIea1lkF2+9iaBrORezvHkRyn23XJwiohS5ruUu4L9d48ISiDrDOkBAiVsEKXdNp7iu4X5WEElElH1gznilWNs+OHdCMxFSVtB9u3+o8FpE1LRq3oRUGH64c0cAKEQkBVynww8gudJHIHA/R8XnFgGU+gUTJQJlCZTIv2cYIDSCUNO2fi9zCgg1ICSJoLn6kgJClrsxRe+jYdElKSJK8IY1yK5r6GPr9rDH1u1hBAwlQgtZMLlOKEQI7F8/XTxJJkKDq30aH+36lD3a9SkjoloiyriuLeViBAQoeaDLNUz62a0Hzf4GgaQ6rpUIigOxFILgwaOSLBLIk6v3hh3HAurxGjYkWBE+SF5q7fjC6n23XCz/5o3PjajWzMdGEJzL4UH1VBjzemD2+DgRNRXU7fmAaSi+hVviwbkTup/evD9d8AwsOPBFXrcmHRogI5rw0DxZLdVHeFMY7tiIRVS0jarBJgiUAjHF1Uca2zbuDaT7bRv2GrBH1NL1CyeqyG/CKwHorF8wsdaJkwQ0lOr6KA2gsW2D19K32pa/uWHRJRkQepzzGhZdorat97pFFlE8/2pYo9tF4fGLusbFkxIA6lvX7Un+EsB598wco+YsptcC7e5vEFh501jZImoIYSMmEdq4Lx8jQsyy0MY/92ScUQRGUHhs7jo6R/IYEerciO5hI15rZhBRkohivKSDrDb/Wwm1piFshAhpIqpz1Z8k+5pBz6zcd+vFzUFBV4so5b8GZx8Zi1D79Gufsac37489vXn/ULKohixqCWQjFrXy4KzXmuWOg789a57atJ+BEHtyk2EGWkH7J8EtbmgBkCVC1k9zPWykTDfBYSNOCQmqJogQdzG+uvaN+9qi1N++YZ8Guz+Z/L1qUZgJgTJtG/YmiwU+29bv1UFoc3XMlQEIJrl0JPDarev2pFvX7ckZkG94lYe5kxz0/gYCApq8o0m5f3QGxDoKGYm2ctbYdhA6eV4CSgTVPIrnjY3lNiON/V474L5OJqmOyweiCtmIDrDY77JfuM/RfhS7aL8rAOW+KYUHdwr960I2YgJI/vbNLzIBj5H+8S0Xp0LiGisBNPsaNwEGKQAcG3+z5fOCDv3r1z8zADTfP3u8lgvCejNEG9zXsCgkPsLQ6ARJg0ZPcvdTPAGtWHzE31fKHoZzshuLBf0soibXV42/etXIlHON9o379Efm18QASO2v9IYCAdyjDsSS0e6f2vn7QNDImY/3KkBpXT7P7ad6LJrV/4OclkXxADZiEqGuI8Qt6eg+aBBQ52UGjrWjkj5hPl5AIEJdygsCTkdp99Rr5QsRGn/vBQGn46Q9/q9TAtoxxEqDgMYQEAAA/McbnyctIi0gNiL/6OaLFN/9rAyIjWhBIOCWZ17/TMsxA6/FWlnUmnGm9OuQ4daQ+IhhWaRZFmnkL+QtFpHXvfKxkfIMkDc2EhxcJdlpsydeNdoq6d+Pv9KrPx4CAnAYSX6+RfvjftchHGQMF4sIYpy6q3+1PrKgRilVp4cRUGWB1Ypk+YzRskUksUI20v789oNGsXOf3XrQuGfmmLQLFYsaFosCjiFkOrYeCLxOuvtA5t6bxgYNJxrp7oOBLzalHTASs8aZRXztUj6q/vsIIzQ8gNsT8J5UB/l/GLtIIoKSpxo5GyH96OaLsigRJ7F4AMk/WvPPN18k//bNL4wgK8xybKmsZ+/4zZbPKxo+tKhCOsBBpFinIb7/JW+1jn5jxBaBsZxHWBbjsOy5F2qQoj6+cV/mJ/NrdFfsJ/uT+TUtv3qlNxTQvmERmSG0WkE/TvQg8iQLuYdLMtE6AnUBaMj3dVay8/n6zO7SHZb59UEvcU86Imy7HsRcGFhXlOf+ffYLPamOM5BPiHHTd+feFQp2a5QwPswQNvPXAyQy7DHy3DP4gqy7I7z3ao00Vc5ES4AIWZQDUdafOgDK3cJTm0oPAxeAGSvaPknu4jkBy9aHb5NXAmgMyg8576UdR3WHVvvKrH6ND1Dw0NgLbx+O1CAvbD+sUYBbExocKixmic5i+IfCLIt2l/NMYbQ1KFDop74lgMTwugd5K+av3+XSoFiQNcil8QdZLYsk/zUs31TiSIG6Kky/LQiyVtD3EHIPfGgOREBYUliVjGFFrk0eRMLb8IlXDZ0Itb7gt0KE7EPz5CzPXs0DAW8YPaBzxL9/wwi53+IDhR25gqBPwbh3yQb3RLeL120EKUgZ/m/oPbnjIo6yWWXEZIJiI+57C8qvcMdG/KXYWgBuIHEHpsKApJx770sYyn/tShTQCgVqOi1rIFiuEZr+AJEnNxnGk5uMGME16mT/qETUs2ruhNz7/AbvOJr9kgu4RiuAukof9I4bRkgAsGbXMbMYRXRHOZdOGamu3nm0JB27c+pINU9PWckG9x/CIrwkd0pmWb6n6wJUxDXwujU0uYwO5An+cPrfHdy2nmNaylpjwv0c5HXborZ9NSl9IL1H+bMWchPpwtvXdr0Ygzsu0i+s2P5TqwREoj77U5v2pwGkH5w7oQEWNQGQwJgEouyDc8bXAjC+kYuSAw0o7BDx+HXDE5n3jqfLvdHbrx8uO5lPt18/PLb23eNmgcUNfpFLojQMEZYEAUkYjfIfQhEQN+cbs+gdzHOBECApGEGz7zCOCLMzl88YrYYEWU1/27LCa2ae23ZIr04njtb2UeIjFSpRtxOPofLPHeKa+qQHuAY2ENj3qsJO8ukX14D14eRyvaKnN+9ve2D2+DQBWdj5LRLsIe/keQDQ+d5xIygphlPL1JJrhzWUc4/xa4erFqGHiBS7IBu/brgnmv7yrmNGIf0GLKJE3XXDlaJM4/oRsmVRwoqYUBSawFOiwwal35ZD2ckKGz4MTOeV75o2qiHC+28Nio24E0ee23bIIF8cgZematLaoEStct2avrqW3DVSytQhxdX2ZsCzdblcqib0k5TjUgUxokriI3zGbcwdAsjFCOyHR8s/LDLdY+a5QmhdVDssu7D2wqIR8cXXDJMXXzMsRaCsk3fuZNcRUXbJtcMkb4Mj4/epLYJEQCp+bTAY1F03XLGIOgkkFYJI8U5bjr9PnoBZdPDw+OYIzoMv4pu3Lps6KhFU97Kpo6RlU0eleFv6QcTwB1mJ0OH3hYkQv3v66FSxZ7h7+mhl+fTRvcunj04tnz5aLu6je/pIJJ/fHxvpg0HUKBeHybPDUnLvTWMlyyLFaf+UdiCIfaad5wIgJ2aNa6jkHpPqOCWpjlP6JVhYYXwEsJcLIILGKYWUixEAwPqeE8YC5cJGAqWCwqgAVMagLlAu1Dl13w+bVinMnna6xCJSmDs70UurFRCa3PSXQO1kIcFYwdi7AiC75NphaSJ0uYbAllhECQYmFS7zRKXpaPHh4/AYRokstCD/Nz98x8ql1amlU0YugT1+7VgrhUD1Nl11uxS5ulsCnrkNhHpnSrDrSoll00bJILS/uONIzudfNm2UyoCVxFeoYowlACTumjYqDaDlj+8cMfwWibnmhzCK3oHhiY1UJs9uPaj94MYxJqe36j0zx6jPbTsUxdduIj5DkkCBblJKO2CuvGlsC4Amfrut9940Vnt268HIblVi1jiFCFnGICVmjWsB0Jbu9iavWX0cAi3Wej+MXST/Phse2/C6l75VjDfqX6b9GXL+rDx7jJoaCNTK88FbidDEhyaKDUNpBPJ02K73TxgWUcs/LMI/cpYiZ2Uky0IDAVmL7GLPqILkr7/kXAOf9XWhfSTrXixLMGzUIH+tYowgtMSJqJPIzrUH0EoEOWS0QHtxx5ECH/bFd46YBGoMqV8lUOeyqaPIKeD5/O77tuyZlwlC4Sy3kHkVkTqw263pm3vCLbd9z53LZ4wuylhXzBzTYFnU4OqT7WHHdmw92EyA7mLfPT+4cWwkZnDvTWPjFnFWbBVmZVaLEYS1eVIdlyCinjA28sPYRQlHX53Rs4LFS1/dfTI573tSLm8+bDagbVlZ0YCRC3HSG/WTgXnUG3q+bFugXDgZ/vneBdcqYvMJRSPYFjfPrCzE9c8HYOVZuwjHUZG4N4vARnigK3RU56UdR9NLp4ychdB1F4q8t3ymkAl74lcoY6p01KCvYUMCtRAhwYgnzTBkl08fnSagiwHaC28fNpdPHy0BiINhpbPeBX9K7blth9Il3JgYB2JHoVrvmTmmnjMw7blth3IW956ZYyQAccaw0t67IdeGJoC6ju7CVHarj3kUIUwk7qw9wRh6OBtJp7sPGIlZ4yTG0ODMSOVVtBcwAkc2fWA2W0R1FpFZbMw5zPd2B2IsorpXdp8sOplio/5lMihXn4qPg2v+e7JKzD4sKyfAKswJKJ1HEDxOH7HujD3PInKCj24RYi8HDM26ZfXOo0mLqLFY2wbmBNixEZ0INS/tOGpW+qyl4iN9kRe2HzYBxHL91CJYNuh1EnDy7umjiYCTBKSIoLqCrDoRlRwWf27bIZOIYt6+RrK9LgV6V8wYQytm2sW5jkVQXX1WtyyKhbkUfclXCGtzAmlOXhDvL00E6l05aywR6KRF1OTSYS2l2WntoRucvPbnUxki1BChxT3Bx4rQSfmLabGIajZ9YGaiPNiru08myQYfI1QZ7GsZfLpwS9A9lQr8RU8O8iX8RAUPq3QALUSxd1tEtf5JRQFujWkRWixCbO27xUHAkTW7jrXxBSm0wrYtTIQigklAy+qdR2tX7zxqlurElYwaVBot98sf3j6s836acY/UBCdOEYiojYhiL7x9OFLbPb/9sPnC9sMxPlXdKBitCV5AxrCIks9tO1RbbLi2nCBrVBDp6D5oEhAjoC2/oE+gS5mxXGBYdMuz1z88ZcKeetp8y3cuiHOK5Cx6qbgYpAHAIIIOxrq3fHgqU8lL5aCRmXP1kDgCFm5kYN2b/2wDy9zvSRKAWBS6T25qSwgdP/Y1dGMu0JZva6MEeDR6Ap8UfI4VkPHDwLC+54QBILb4mmEK8guMOhTeYMxevLTrvRNmuW279t3jOoBY/LrhMq97MgDZlTtiwp4roK9973imtEWy29TX/kaEDpxGPk/EQBXkxR1HTAB1d04ZKYPxdiNPANpgYN0EZPix5bOPtw+nAaTvmjZKARAnu/0k1+I1JmNsN4DMHyKmyRMoBl8OSBnBwkY4K4UXBlJNAI33zBzTDv9CtfZ8ma7/fMsbWB30K8ufCZmvDM0CUH1xh5aN+pfNonWEnG7JLV4q5HQ3fPFgnRAhp1sEEJwByQ0pCj4mRADBIAaCChKchAgRQHAO+mSFroJAAyECCAaV/MMzDTZoIXUhQgQQDAJGYKeu+gDAEC0j5EwJIxKWSIiQwS7/fwCWWFPGtSp+HgAAAABJRU5ErkJggg==", Mg = '.dp__input_wrap{position:relative;width:100%;box-sizing:unset}.dp__input_wrap:focus{border-color:var(--dp-border-color-hover);outline:none}.dp__input{background-color:var(--dp-background-color);border-radius:var(--dp-border-radius);font-family:var(--dp-font-family);border:1px solid var(--dp-border-color);outline:none;transition:border-color .2s cubic-bezier(.645,.045,.355,1);width:100%;font-size:var(--dp-font-size);line-height:calc(var(--dp-font-size)*1.5);padding:var(--dp-input-padding);color:var(--dp-text-color);box-sizing:border-box}.dp__input::-moz-placeholder{opacity:.7}.dp__input::placeholder{opacity:.7}.dp__input:hover{border-color:var(--dp-border-color-hover)}.dp__input_reg{caret-color:#0000}.dp__input_focus{border-color:var(--dp-border-color-hover)}.dp__disabled{background:var(--dp-disabled-color)}.dp__disabled::-moz-placeholder{color:var(--dp-disabled-color-text)}.dp__disabled::placeholder{color:var(--dp-disabled-color-text)}.dp__input_icons{display:inline-block;width:var(--dp-font-size);height:var(--dp-font-size);stroke-width:0;font-size:var(--dp-font-size);line-height:calc(var(--dp-font-size)*1.5);padding:6px 12px;color:var(--dp-icon-color);box-sizing:content-box}.dp__input_icon{cursor:pointer;position:absolute;top:50%;inset-inline-start:0;transform:translateY(-50%);color:var(--dp-icon-color)}.dp__clear_icon{position:absolute;top:50%;inset-inline-end:0;transform:translateY(-50%);cursor:pointer;color:var(--dp-icon-color)}.dp__input_icon_pad{padding-inline-start:var(--dp-input-icon-padding)}.dp__input_valid{box-shadow:0 0 var(--dp-border-radius) var(--dp-success-color);border-color:var(--dp-success-color)}.dp__input_valid:hover{border-color:var(--dp-success-color)}.dp__input_invalid{box-shadow:0 0 var(--dp-border-radius) var(--dp-danger-color);border-color:var(--dp-danger-color)}.dp__input_invalid:hover{border-color:var(--dp-danger-color)}.dp__menu{background:var(--dp-background-color);border-radius:var(--dp-border-radius);min-width:var(--dp-menu-min-width);font-family:var(--dp-font-family);font-size:var(--dp-font-size);-webkit-user-select:none;-moz-user-select:none;user-select:none;border:1px solid var(--dp-menu-border-color);box-sizing:border-box}.dp__menu:after{box-sizing:border-box}.dp__menu:before{box-sizing:border-box}.dp__menu:focus{border:1px solid var(--dp-menu-border-color);outline:none}.dp--menu-wrapper{position:absolute;z-index:99999}.dp__menu_inner{padding:var(--dp-menu-padding)}.dp--menu--inner-stretched{padding:6px 0}.dp__menu_index{z-index:99999}.dp__menu_readonly,.dp__menu_disabled{position:absolute;top:0;right:0;bottom:0;left:0;z-index:999999}.dp__menu_disabled{background:#ffffff80;cursor:not-allowed}.dp__menu_readonly{background:#0000;cursor:default}.dp__arrow_top{left:50%;top:0;height:12px;width:12px;background-color:var(--dp-background-color);position:absolute;border-inline-end:1px solid var(--dp-menu-border-color);border-top:1px solid var(--dp-menu-border-color);transform:translate(-50%,-50%) rotate(-45deg)}.dp__arrow_bottom{left:50%;bottom:0;height:12px;width:12px;background-color:var(--dp-background-color);position:absolute;border-inline-end:1px solid var(--dp-menu-border-color);border-bottom:1px solid var(--dp-menu-border-color);transform:translate(-50%,50%) rotate(45deg)}.dp__action_extra{text-align:center;padding:2px 0}.dp--preset-dates{padding:5px;border-inline-end:1px solid var(--dp-border-color)}@media only screen and (width <= 600px){.dp--preset-dates{display:flex;align-self:center;border:none;overflow-x:auto;max-width:calc(var(--dp-menu-width) - var(--dp-action-row-padding)*2)}}.dp__sidebar_left{padding:5px;border-inline-end:1px solid var(--dp-border-color)}.dp__sidebar_right{padding:5px;margin-inline-end:1px solid var(--dp-border-color)}.dp--preset-range{display:block;width:100%;padding:5px;text-align:left;white-space:nowrap;color:var(--dp-text-color);border-radius:var(--dp-border-radius);transition:var(--dp-common-transition)}.dp--preset-range:hover{background-color:var(--dp-hover-color);color:var(--dp-hover-text-color);cursor:pointer}@media only screen and (width <= 600px){.dp--preset-range{border:1px solid var(--dp-border-color);margin:0 3px}.dp--preset-range:first-child{margin-left:0}.dp--preset-range:last-child{margin-right:0}}.dp__menu_content_wrapper{display:flex}@media only screen and (width <= 600px){.dp__menu_content_wrapper{flex-direction:column-reverse}}.dp__calendar_header{position:relative;display:flex;justify-content:center;align-items:center;color:var(--dp-text-color);white-space:nowrap;font-weight:700}.dp__calendar_header_item{text-align:center;flex-grow:1;height:var(--dp-cell-size);padding:var(--dp-cell-padding);width:var(--dp-cell-size);box-sizing:border-box}.dp__calendar_row{display:flex;justify-content:center;align-items:center;margin:var(--dp-row-margin)}.dp__calendar_item{text-align:center;flex-grow:1;box-sizing:border-box;color:var(--dp-text-color)}.dp__calendar{position:relative}.dp__calendar_header_cell{border-bottom:thin solid var(--dp-border-color);padding:var(--dp-calendar-header-cell-padding)}.dp__cell_inner{display:flex;align-items:center;text-align:center;justify-content:center;border-radius:var(--dp-cell-border-radius);height:var(--dp-cell-size);padding:var(--dp-cell-padding);width:var(--dp-cell-size);border:1px solid rgba(0,0,0,0);box-sizing:border-box;position:relative}.dp__cell_inner:hover{transition:all .2s}.dp__cell_auto_range_start,.dp__date_hover_start:hover,.dp__range_start{border-end-end-radius:0;border-start-end-radius:0}.dp__cell_auto_range_end,.dp__date_hover_end:hover,.dp__range_end{border-end-start-radius:0;border-start-start-radius:0}.dp__range_end,.dp__range_start,.dp__active_date{background:var(--dp-primary-color);color:var(--dp-primary-text-color)}.dp__cell_auto_range_end,.dp__cell_auto_range_start{border-top:1px dashed var(--dp-primary-color);border-bottom:1px dashed var(--dp-primary-color)}.dp__date_hover_end:hover,.dp__date_hover_start:hover,.dp__date_hover:hover{background:var(--dp-hover-color);color:var(--dp-hover-text-color)}.dp__cell_offset{color:var(--dp-secondary-color)}.dp__cell_disabled{color:var(--dp-secondary-color);cursor:not-allowed}.dp__range_between{background:var(--dp-range-between-dates-background-color);color:var(--dp-range-between-dates-text-color);border-radius:0;border:1px solid var(--dp-range-between-border-color)}.dp__range_between_week{background:var(--dp-primary-color);color:var(--dp-primary-text-color);border-radius:0;border-top:1px solid var(--dp-primary-color);border-bottom:1px solid var(--dp-primary-color)}.dp__today{border:1px solid var(--dp-primary-color)}.dp__week_num{color:var(--dp-secondary-color);text-align:center}.dp__cell_auto_range{border-radius:0;border-top:1px dashed var(--dp-primary-color);border-bottom:1px dashed var(--dp-primary-color)}.dp__cell_auto_range_start{border-inline-start:1px dashed var(--dp-primary-color)}.dp__cell_auto_range_end{border-inline-end:1px dashed var(--dp-primary-color)}.dp__calendar_header_separator{width:100%;height:1px;background:var(--dp-border-color)}.dp__calendar_next{margin-inline-start:var(--dp-multi-calendars-spacing)}.dp__marker_line,.dp__marker_dot{height:5px;background-color:var(--dp-marker-color);position:absolute;bottom:0}.dp__marker_dot{width:5px;border-radius:50%;left:50%;transform:translate(-50%)}.dp__marker_line{width:100%;left:0}.dp__marker_tooltip{position:absolute;border-radius:var(--dp-border-radius);background-color:var(--dp-tooltip-color);padding:5px;border:1px solid var(--dp-border-color);z-index:99999;box-sizing:border-box;cursor:default}.dp__tooltip_content{white-space:nowrap}.dp__tooltip_text{display:flex;align-items:center;flex-flow:row nowrap;color:var(--dp-text-color)}.dp__tooltip_mark{height:5px;width:5px;border-radius:50%;background-color:var(--dp-text-color);color:var(--dp-text-color);margin-inline-end:5px}.dp__arrow_bottom_tp{bottom:0;height:8px;width:8px;background-color:var(--dp-tooltip-color);position:absolute;border-inline-end:1px solid var(--dp-border-color);border-bottom:1px solid var(--dp-border-color);transform:translate(-50%,50%) rotate(45deg)}.dp__instance_calendar{position:relative;width:100%}@media only screen and (width <= 600px){.dp__flex_display{flex-direction:column}}.dp__cell_highlight{background-color:var(--dp-highlight-color)}.dp__month_year_row{display:flex;align-items:center;height:var(--dp-month-year-row-height);color:var(--dp-text-color);box-sizing:border-box}.dp__inner_nav{display:flex;align-items:center;justify-content:center;cursor:pointer;height:var(--dp-month-year-row-button-size);width:var(--dp-month-year-row-button-size);color:var(--dp-icon-color);text-align:center;border-radius:50%}.dp__inner_nav svg{height:var(--dp-button-icon-height);width:var(--dp-button-icon-height)}.dp__inner_nav:hover{background:var(--dp-hover-color);color:var(--dp-hover-icon-color)}[dir=rtl] .dp__inner_nav{transform:rotate(180deg)}.dp__inner_nav_disabled:hover,.dp__inner_nav_disabled{background:var(--dp-disabled-color);color:var(--dp-disabled-color-text);cursor:not-allowed}.dp--year-select,.dp__month_year_select{text-align:center;cursor:pointer;height:var(--dp-month-year-row-height);display:flex;align-items:center;justify-content:center;border-radius:var(--dp-border-radius);box-sizing:border-box;color:var(--dp-text-color)}.dp--year-select:hover,.dp__month_year_select:hover{background:var(--dp-hover-color);color:var(--dp-hover-text-color);transition:var(--dp-common-transition)}.dp__month_year_select{width:50%}.dp--year-select{width:100%}.dp__month_year_wrap{display:flex;width:100%}.dp__year_disable_select{justify-content:space-around}.dp__overlay{width:100%;background:var(--dp-background-color);transition:opacity 1s ease-out;z-index:99999;font-family:var(--dp-font-family);color:var(--dp-text-color);box-sizing:border-box}.dp--overlay-absolute{position:absolute;height:100%;top:0;left:0}.dp--overlay-relative{position:relative}.dp__overlay_container::-webkit-scrollbar-track{box-shadow:var(--dp-scroll-bar-background);background-color:var(--dp-scroll-bar-background)}.dp__overlay_container::-webkit-scrollbar{width:5px;background-color:var(--dp-scroll-bar-background)}.dp__overlay_container::-webkit-scrollbar-thumb{background-color:var(--dp-scroll-bar-color);border-radius:10px}.dp__overlay:focus{border:none;outline:none}.dp__container_flex{display:flex}.dp__container_block{display:block}.dp__overlay_container{flex-direction:column;overflow-y:auto}.dp__time_picker_overlay_container{height:100%}.dp__overlay_row{padding:0;box-sizing:border-box;display:flex;margin-inline:auto auto;flex-wrap:wrap;max-width:100%;width:100%;align-items:center}.dp__flex_row{flex:1}.dp__overlay_col{box-sizing:border-box;width:33%;padding:var(--dp-overlay-col-padding);white-space:nowrap}.dp__overlay_cell_pad{padding:var(--dp-common-padding) 0}.dp__overlay_cell_active{cursor:pointer;border-radius:var(--dp-border-radius);text-align:center;background:var(--dp-primary-color);color:var(--dp-primary-text-color)}.dp__overlay_cell{cursor:pointer;border-radius:var(--dp-border-radius);text-align:center}.dp__overlay_cell:hover{background:var(--dp-hover-color);color:var(--dp-hover-text-color);transition:var(--dp-common-transition)}.dp__cell_in_between{background:var(--dp-hover-color);color:var(--dp-hover-text-color)}.dp__over_action_scroll{right:5px;box-sizing:border-box}.dp__overlay_cell_disabled{cursor:not-allowed;background:var(--dp-disabled-color)}.dp__overlay_cell_disabled:hover{background:var(--dp-disabled-color)}.dp__overlay_cell_active_disabled{cursor:not-allowed;background:var(--dp-primary-disabled-color)}.dp__overlay_cell_active_disabled:hover{background:var(--dp-primary-disabled-color)}.dp__btn,.dp--qr-btn,.dp--time-invalid,.dp--time-overlay-btn{border:none;font:inherit;transition:var(--dp-common-transition);line-height:normal}.dp--tp-wrap{max-width:var(--dp-menu-min-width)}.dp__time_input{width:100%;display:flex;align-items:center;justify-content:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;font-family:var(--dp-font-family);color:var(--dp-text-color)}.dp__time_col_reg_block{padding:0 20px}.dp__time_col_reg_inline{padding:0 10px}.dp__time_col_reg_with_button{padding:0 15px}.dp__time_col_sec{padding:0 10px}.dp__time_col_sec_with_button{padding:0 5px}.dp__time_col{text-align:center;display:flex;align-items:center;justify-content:center;flex-direction:column}.dp__time_col_block{font-size:var(--dp-time-font-size)}.dp__time_display{cursor:pointer;color:var(--dp-text-color);border-radius:var(--dp-border-radius);display:flex;align-items:center;justify-content:center}.dp__time_display:hover:enabled{background:var(--dp-hover-color);color:var(--dp-hover-text-color)}.dp__time_display_block{padding:0 3px}.dp__time_display_inline{padding:5px}.dp__time_picker_inline_container{display:flex;width:100%;justify-content:center}.dp__inc_dec_button{padding:5px;margin:0;height:var(--dp-time-inc-dec-button-size);width:var(--dp-time-inc-dec-button-size);display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:50%;color:var(--dp-icon-color);box-sizing:border-box}.dp__inc_dec_button svg{height:var(--dp-time-inc-dec-button-size);width:var(--dp-time-inc-dec-button-size)}.dp__inc_dec_button:hover{background:var(--dp-hover-color);color:var(--dp-primary-color)}.dp__inc_dec_button_inline{width:100%;padding:0;height:8px;cursor:pointer;display:flex;align-items:center}.dp__inc_dec_button_disabled:hover,.dp__inc_dec_button_disabled{background:var(--dp-disabled-color);color:var(--dp-disabled-color-text);cursor:not-allowed}.dp__pm_am_button{background:var(--dp-primary-color);color:var(--dp-primary-text-color);border:none;padding:var(--dp-common-padding);border-radius:var(--dp-border-radius);cursor:pointer}.dp__tp_inline_btn_bar{width:100%;height:4px;background-color:var(--dp-secondary-color);transition:var(--dp-common-transition);border-collapse:collapse}.dp__tp_inline_btn_top:hover .dp__tp_btn_in_r{background-color:var(--dp-primary-color);transform:rotate(12deg) scale(1.15) translateY(-2px)}.dp__tp_inline_btn_top:hover .dp__tp_btn_in_l,.dp__tp_inline_btn_bottom:hover .dp__tp_btn_in_r{background-color:var(--dp-primary-color);transform:rotate(-12deg) scale(1.15) translateY(-2px)}.dp__tp_inline_btn_bottom:hover .dp__tp_btn_in_l{background-color:var(--dp-primary-color);transform:rotate(12deg) scale(1.15) translateY(-2px)}.dp--time-overlay-btn{background:none}.dp--time-invalid{background-color:var(--dp-disabled-color)}.dp__action_row{display:flex;align-items:center;width:100%;padding:var(--dp-action-row-padding);box-sizing:border-box;color:var(--dp-text-color);flex-flow:row nowrap}.dp__action_row svg{height:var(--dp-button-icon-height);width:auto}.dp__selection_preview{display:block;color:var(--dp-text-color);font-size:var(--dp-preview-font-size);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.dp__action_buttons{display:flex;flex:0;align-items:center;justify-content:flex-end;margin-inline-start:auto}.dp__action_button{display:inline-flex;align-items:center;background:#0000;border:1px solid rgba(0,0,0,0);padding:var(--dp-action-buttons-padding);line-height:var(--dp-action-button-height);margin-inline-start:3px;height:var(--dp-action-button-height);cursor:pointer;border-radius:var(--dp-border-radius);font-size:var(--dp-preview-font-size);font-family:var(--dp-font-family)}.dp__action_select{background:var(--dp-primary-color);color:var(--dp-primary-text-color)}.dp__action_select:hover{background:var(--dp-primary-color);transition:var(--dp-action-row-transtion)}.dp__action_select:disabled{background:var(--dp-primary-disabled-color);cursor:not-allowed}.dp__action_cancel{color:var(--dp-text-color);border:1px solid var(--dp-border-color)}.dp__action_cancel:hover{border-color:var(--dp-primary-color);transition:var(--dp-action-row-transtion)}.dp-quarter-picker-wrap{display:flex;flex-direction:column;height:100%;min-width:var(--dp-menu-min-width)}.dp--qr-btn{width:100%;padding:var(--dp-common-padding)}.dp--qr-btn:not(.dp--highlighted,.dp--qr-btn-active,.dp--qr-btn-disabled,.dp--qr-btn-between){background:none}.dp--qr-btn:hover:not(.dp--qr-btn-active,.dp--qr-btn-disabled){background:var(--dp-hover-color);color:var(--dp-hover-text-color);transition:var(--dp-common-transition)}.dp--quarter-items{display:flex;flex-direction:column;flex:1;width:100%;height:100%;justify-content:space-evenly}.dp--qr-btn-active{background:var(--dp-primary-color);color:var(--dp-primary-text-color)}.dp--qr-btn-between{background:var(--dp-hover-color);color:var(--dp-hover-text-color)}.dp--qr-btn-disabled{cursor:not-allowed;background:var(--dp-disabled-color)}.dp--qr-btn-disabled:hover{background:var(--dp-disabled-color)}.dp__btn,.dp--time-overlay-btn,.dp--time-invalid,.dp--qr-btn{border:none;font:inherit;transition:var(--dp-common-transition);line-height:normal}.dp--year-mode-picker{display:flex;width:100%;align-items:center;justify-content:space-between;height:var(--dp-cell-size)}:root{--dp-common-transition: all .1s ease-in;--dp-menu-padding: 6px 8px;--dp-animation-duration: .1s;--dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1);--dp-transition-timing: ease-out;--dp-action-row-transtion: all .2s ease-in;--dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;--dp-border-radius: 4px;--dp-cell-border-radius: 4px;--dp-transition-length: 22px;--dp-transition-timing-general: .1s;--dp-button-height: 35px;--dp-month-year-row-height: 35px;--dp-month-year-row-button-size: 25px;--dp-button-icon-height: 20px;--dp-calendar-wrap-padding: 0 5px;--dp-cell-size: 35px;--dp-cell-padding: 5px;--dp-common-padding: 10px;--dp-input-icon-padding: 35px;--dp-input-padding: 6px 30px 6px 12px;--dp-menu-min-width: 260px;--dp-action-buttons-padding: 1px 6px;--dp-row-margin: 5px 0;--dp-calendar-header-cell-padding: .5rem;--dp-multi-calendars-spacing: 10px;--dp-overlay-col-padding: 3px;--dp-time-inc-dec-button-size: 32px;--dp-font-size: 1rem;--dp-preview-font-size: .8rem;--dp-time-font-size: 2rem;--dp-action-button-height: 22px;--dp-action-row-padding: 8px}.dp__theme_dark{--dp-background-color: #212121;--dp-text-color: #fff;--dp-hover-color: #484848;--dp-hover-text-color: #fff;--dp-hover-icon-color: #959595;--dp-primary-color: #005cb2;--dp-primary-disabled-color: #61a8ea;--dp-primary-text-color: #fff;--dp-secondary-color: #a9a9a9;--dp-border-color: #2d2d2d;--dp-menu-border-color: #2d2d2d;--dp-border-color-hover: #aaaeb7;--dp-disabled-color: #737373;--dp-disabled-color-text: #d0d0d0;--dp-scroll-bar-background: #212121;--dp-scroll-bar-color: #484848;--dp-success-color: #00701a;--dp-success-color-disabled: #428f59;--dp-icon-color: #959595;--dp-danger-color: #e53935;--dp-marker-color: #e53935;--dp-tooltip-color: #3e3e3e;--dp-highlight-color: rgb(0 92 178 / 20%);--dp-range-between-dates-background-color: var(--dp-hover-color, #484848);--dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);--dp-range-between-border-color: var(--dp-hover-color, #fff)}.dp__theme_light{--dp-background-color: #fff;--dp-text-color: #212121;--dp-hover-color: #f3f3f3;--dp-hover-text-color: #212121;--dp-hover-icon-color: #959595;--dp-primary-color: #1976d2;--dp-primary-disabled-color: #6bacea;--dp-primary-text-color: #f8f5f5;--dp-secondary-color: #c0c4cc;--dp-border-color: #ddd;--dp-menu-border-color: #ddd;--dp-border-color-hover: #aaaeb7;--dp-disabled-color: #f6f6f6;--dp-scroll-bar-background: #f3f3f3;--dp-scroll-bar-color: #959595;--dp-success-color: #76d275;--dp-success-color-disabled: #a3d9b1;--dp-icon-color: #959595;--dp-danger-color: #ff6f60;--dp-marker-color: #ff6f60;--dp-tooltip-color: #fafafa;--dp-disabled-color-text: #8e8e8e;--dp-highlight-color: rgb(25 118 210 / 10%);--dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);--dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);--dp-range-between-border-color: var(--dp-hover-color, #f3f3f3)}.dp__flex{display:flex;align-items:center}.dp__btn{background:none}.dp__main{font-family:var(--dp-font-family);-webkit-user-select:none;-moz-user-select:none;user-select:none;box-sizing:border-box;position:relative;width:100%}.dp__pointer{cursor:pointer}.dp__icon{stroke:currentcolor;fill:currentcolor}.dp__button{width:100%;text-align:center;color:var(--dp-icon-color);cursor:pointer;display:flex;align-items:center;place-content:center center;padding:var(--dp-common-padding);box-sizing:border-box;height:var(--dp-button-height)}.dp__button.dp__overlay_action{position:absolute;bottom:0}.dp__button:hover{background:var(--dp-hover-color);color:var(--dp-hover-icon-color)}.dp__button svg{height:var(--dp-button-icon-height);width:auto}.dp__button_bottom{border-bottom-left-radius:var(--dp-border-radius);border-bottom-right-radius:var(--dp-border-radius)}.dp__flex_display{display:flex}.dp__flex_display_with_input{flex-direction:column;align-items:flex-start}.dp__relative{position:relative}.calendar-next-enter-active,.calendar-next-leave-active,.calendar-prev-enter-active,.calendar-prev-leave-active{transition:all var(--dp-transition-timing-general) ease-out}.calendar-next-enter-from{opacity:0;transform:translate(var(--dp-transition-length))}.calendar-next-leave-to,.calendar-prev-enter-from{opacity:0;transform:translate(calc(var(--dp-transition-length) * -1))}.calendar-prev-leave-to{opacity:0;transform:translate(var(--dp-transition-length))}.dp-menu-appear-bottom-enter-active,.dp-menu-appear-bottom-leave-active,.dp-menu-appear-top-enter-active,.dp-menu-appear-top-leave-active,.dp-slide-up-enter-active,.dp-slide-up-leave-active,.dp-slide-down-enter-active,.dp-slide-down-leave-active{transition:all var(--dp-animation-duration) var(--dp-transition-timing)}.dp-menu-appear-top-enter-from,.dp-menu-appear-top-leave-to,.dp-slide-down-leave-to,.dp-slide-up-enter-from{opacity:0;transform:translateY(var(--dp-transition-length))}.dp-menu-appear-bottom-enter-from,.dp-menu-appear-bottom-leave-to,.dp-slide-down-enter-from,.dp-slide-up-leave-to{opacity:0;transform:translateY(calc(var(--dp-transition-length) * -1))}.dp--arrow-btn-nav{transition:var(--dp-common-transition)}.dp--highlighted{background-color:var(--dp-highlight-color)}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.absolute{position:absolute}.relative{position:relative}.inline{display:inline}.flex{display:flex}.grid{display:grid}.h-6{height:1.5rem}.h-fit{height:-moz-fit-content;height:fit-content}.h-screen{height:100vh}.w-full{width:100%}.max-w-64{max-width:16rem}.cursor-pointer{cursor:pointer}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.flex-col{flex-direction:column}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-2{gap:.5rem}.gap-4{gap:1rem}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.border-none{border-style:none}.bg-primary-blue\\/90{background-color:#0987c5e6}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}.object-contain{-o-object-fit:contain;object-fit:contain}.p-2{padding:.5rem}.p-4{padding:1rem}.text-center{text-align:center}.font-sans{font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.tabular-nums{--tw-numeric-spacing: tabular-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.tracking-wide{letter-spacing:.025em}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.text-primary-braun{--tw-text-opacity: 1;color:rgb(107 63 18 / var(--tw-text-opacity))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.no-underline{text-decoration-line:none}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.duration-300{transition-duration:.3s}.hover\\:bg-primary-blue:hover{--tw-bg-opacity: 1;background-color:rgb(9 135 197 / var(--tw-bg-opacity))}.hover\\:bg-secondary-blue\\/40:hover{background-color:#75bce166}.dp__theme_light{--dp-background-color: #ffffff;--dp-text-color: #212121;--dp-hover-color: #75bce1;--dp-hover-text-color: #ffffff;--dp-hover-icon-color: #ffffff;--dp-primary-color: #0987ca;--dp-primary-text-color: #ffffff;--dp-secondary-color: #212121;--dp-border-color: #ffffff;--dp-range-between-dates-background-color: var(--dp-hover-color, #75bce1);--dp-range-between-dates-text-color: var(--dp-hover-text-color, #ffffff);--dp-range-between-border-color: var(--dp-hover-color, #ffffff)}', Og = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
}, Pg = {
  components: {
    VueDatePicker: Ei
  },
  props: {
    vehicleId: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = oe(null), r = oe(null), n = oe(null), a = oe(!0), o = oe(_l(/* @__PURE__ */ new Date())), i = oe(wl(/* @__PURE__ */ new Date())), l = te(() => {
      var _;
      return `https://staging.camperfuchs.de/checkout/${e.vehicleId}/${(_ = t.value) == null ? void 0 : _.relevantStationId}?from=${r.value}&to=${n.value}`;
    }), s = te(() => {
      var _;
      return `https://staging.camperfuchs.de/checkout/${e.vehicleId}/${(_ = t.value) == null ? void 0 : _.relevantStationId}/request?from=${r.value}&to=${n.value}`;
    }), u = oe([]), d = oe([]), p = oe([]), v = oe(!1), b = ({ from: _, to: j }, I, y) => {
      let T = No(Ar(_)), O = If(Ar(j));
      hn(T, O) && ([T, O] = [O, T]), xa({ start: T, end: O }).forEach((f) => {
        d.value.push(f), p.value.push({
          date: f,
          type: "line",
          color: I,
          tooltip: [{ text: y }]
        });
      });
    }, A = `https://staging.camperfuchs.de/api/V1/articles/${e.vehicleId}/calendar`, M = `https://staging.camperfuchs.de/api/V1/articles/${e.vehicleId}/resolve`, Q = async () => {
      try {
        const j = await (await fetch(A)).json();
        j.bookedDays.forEach((y) => b(y, "#960303", "Fahrzeug ist nicht verfügbar")), j.daysOff.forEach((y) => b(y, "#d8bd00", "Standort geschlossen"));
        const I = await fetch(M);
        t.value = await I.json();
      } catch (_) {
        console.error("An error occurred while fetching the data:", _);
      } finally {
        v.value = !1, E("#d8bd00", "Standort geschlossen");
      }
    }, S = te(() => {
      var _;
      return r.value === null || n.value === null || ((_ = t.value) == null ? void 0 : _.relevantStationId) === null;
    }), R = te(() => {
      var j, I, y;
      let _ = /* @__PURE__ */ new Set();
      for (let T = 0; T < ((j = t.value) == null ? void 0 : j.pickupAndReturnTimes.length); T++)
        for (let O in (I = t.value) == null ? void 0 : I.pickupAndReturnTimes[T])
          (y = t.value) != null && y.pickupAndReturnTimes[T][O].open || _.add(T);
      return Array.from(_);
    }), F = te(() => {
      var j, I;
      let _ = {
        isValid: !1,
        season: "std",
        minDays: (j = t.value) == null ? void 0 : j.minDays.std,
        days: 0
      };
      if (r.value !== null && n.value !== null && a.value) {
        let y = Ar(r.value), T = Ar(n.value);
        if (y > T) {
          let B = y;
          y = T, T = B;
        }
        const O = Sf(T, y);
        (I = t.value) == null || I.seasons.forEach((B) => {
          const h = Ar(B.from), f = Ar(B.to);
          y >= h && T <= f && (_.season = B.type, _.minDays = t.value.minDays[B.type], _.days = O);
        }), _.isValid = O >= _.minDays, _.days = O;
      }
      return _;
    }), C = te(() => {
      let _ = 0;
      return F.value.isValid && (_ = F.value.days * t.value.rates[F.value.season]), _;
    }), N = ({ instance: _, month: j, year: I }) => {
      const y = new Date(I, j);
      o.value = _l(y), i.value = wl(y), E("#d8bd00", "Standort geschlossen");
    }, W = () => {
      r.value !== null && n.value !== null && F.value.isValid && a.value && window.open(l.value, "_blank");
    }, H = () => {
      r.value !== null && n.value !== null && F.value.isValid && a.value && window.open(s.value, "_blank");
    }, z = (_) => {
      r.value = Kt(_, "yyyy-MM-dd"), a.value = r.value !== null && n.value !== null, E("#d8bd00", "Standort geschlossen");
    }, G = (_) => {
      let j = Ar(r.value), I = _;
      if (j > I) {
        let y = j;
        j = I, I = y;
      }
      r.value = Kt(j, "yyyy-MM-dd"), n.value = Kt(I, "yyyy-MM-dd"), a.value = vr(j) && vr(I), vr(j) && vr(I) && d.value.forEach((y) => {
        y >= j && y <= I && (a.value = !1);
      });
    }, g = {
      std: "Standard Saison",
      high: "Hauptsaison",
      low: "Nebensaison"
    }, E = (_, j) => {
      const I = { start: o.value, end: i.value };
      xa(I).forEach((T) => {
        R.value.includes(T.getDay()) && p.value.push({
          date: T,
          type: "line",
          color: _,
          tooltip: [{ text: j }]
        });
      });
    };
    return yt(() => {
      Q();
    }), {
      date: u,
      disabledDates: d,
      markers: p,
      isLoading: v,
      isDisabled: S,
      navigateToBookingUrl: W,
      navigateToRequestUrl: H,
      onRangeStart: z,
      onRangeEnd: G,
      bookingUrl: l,
      requestUrl: s,
      article: t,
      rangeSelected: a,
      season: g,
      isValidRange: F,
      totalRate: C,
      closedDays: R,
      handleMonthYear: N
    };
  }
}, Sg = { class: "flex justify-center w-full max-w-64 h-fit font-sans p-2 shadow-b rounded-md tracking-wide" }, Ig = { class: "flex flex-col gap-2 absolute bg-white" }, Eg = { class: "flex justify-center w-full" }, Ng = /* @__PURE__ */ be("a", {
  href: "https://www.camperfuchs.de/wohnmobil-mieten",
  target: "_blank",
  class: "flex items-end gap-2 justify-center w-full appearance-none no-underline text-xs text-primary-braun"
}, [
  /* @__PURE__ */ be("span", { class: "text-sm" }, "powered by"),
  /* @__PURE__ */ be("img", {
    src: Tg,
    class: "object-contain h-6",
    alt: ""
  })
], -1), Rg = {
  key: 0,
  class: "flex flex-col gap-2 p-2 text-sm tabular-nums"
}, Yg = { class: "flex justify-between gap-4 w-full" }, Ug = /* @__PURE__ */ be("span", { class: "font-medium" }, "Ausgewählte Nächte:", -1), Bg = { class: "font-normal" }, Fg = { class: "font-medium" }, Hg = { class: "flex justify-between gap-4 w-full" }, Lg = /* @__PURE__ */ be("span", { class: "font-medium" }, "Mietpreis:", -1), $g = { class: "font-normal" }, jg = { class: "flex justify-between gap-4 w-full" }, Vg = /* @__PURE__ */ be("span", { class: "font-medium" }, "Kaution:", -1), Wg = { class: "font-normal" }, Qg = {
  key: 1,
  class: "text-red-500 text-sm text-center"
}, Gg = {
  key: 2,
  class: "text-red-500 text-sm text-center"
};
function zg(e, t, r, n, a, o) {
  var l, s;
  const i = Gc("VueDatePicker");
  return $(), Z("div", Sg, [
    be("div", Ig, [
      be("div", Eg, [
        Ke(i, {
          locale: "de",
          onUpdateMonthYear: n.handleMonthYear,
          "disabled-week-days": n.closedDays,
          position: "center",
          "auto-position": !1,
          inline: "",
          range: "",
          onRangeStart: n.onRangeStart,
          onRangeEnd: n.onRangeEnd,
          modelValue: n.date,
          "onUpdate:modelValue": t[0] || (t[0] = (u) => n.date = u),
          "prevent-min-max-navigation": "",
          "calendar-class-name": "dp-custom-calendar",
          "disabled-dates": n.disabledDates,
          highlight: n.disabledDates,
          "highlight-disabled-days": "",
          markers: n.markers,
          "auto-apply": "",
          "enable-time-picker": !1,
          "hide-offset-dates": "",
          "min-date": /* @__PURE__ */ new Date(),
          "month-change-on-scroll": !1
        }, {
          "marker-tooltip": Ne(({ tooltip: u, day: d }) => [
            be("div", null, ot(u.text), 1)
          ]),
          "action-extra": Ne(() => [
            Ng
          ]),
          _: 1
        }, 8, ["onUpdateMonthYear", "disabled-week-days", "onRangeStart", "onRangeEnd", "modelValue", "disabled-dates", "highlight", "markers", "min-date"])
      ]),
      n.isValidRange.isValid ? ($(), Z("div", Rg, [
        be("span", Yg, [
          Ug,
          be("span", Bg, ot(n.isValidRange.days), 1)
        ]),
        be("span", Fg, ot(n.season[n.isValidRange.season]), 1),
        be("span", Hg, [
          Lg,
          be("span", $g, ot(n.totalRate) + " €", 1)
        ]),
        be("span", jg, [
          Vg,
          be("span", Wg, ot((l = n.article) == null ? void 0 : l.deposit) + " €", 1),
          Jt("r ")
        ])
      ])) : re("", !0),
      !n.isValidRange.isValid && n.isValidRange.days !== 0 ? ($(), Z("span", Qg, "Mindestmietdauer " + ot(n.isValidRange.minDays) + " Nächte", 1)) : re("", !0),
      n.rangeSelected ? re("", !0) : ($(), Z("span", Gg, "Bitte valide Datum auswählen")),
      (s = n.article) != null && s.onlineBookable ? ($(), Z("button", {
        key: 3,
        onClick: t[1] || (t[1] = (...u) => n.navigateToBookingUrl && n.navigateToBookingUrl(...u)),
        class: "p-4 font-semibold text-center bg-primary-blue/90 shadow-md text-white border-none rounded-lg hover:bg-primary-blue duration-300 appearance-none cursor-pointer"
      }, " Zur Buchung ")) : re("", !0),
      be("button", {
        onClick: t[2] || (t[2] = (...u) => n.navigateToRequestUrl && n.navigateToRequestUrl(...u)),
        class: "p-4 font-semibold text-center bg-white shadow-md text-gray-700 border-none rounded-lg hover:bg-secondary-blue/40 duration-300 appearance-none cursor-pointer"
      }, " Unverbindlich anfragen ")
    ])
  ]);
}
const qg = /* @__PURE__ */ Og(Pg, [["render", zg], ["styles", [Mg]]]), Kg = /* @__PURE__ */ gf(qg);
customElements.define("booking-calendar", Kg);
