import { h, capitalize, camelize, computed, createVNode, normalizeStyle, normalizeClass, withCtx, renderSlot, useSSRContext, defineComponent, mergeProps, toRef, isRef, toValue, createElementVNode, Fragment, useId, provide, inject, watch, reactive, unref, toRefs, shallowRef, Text, ref, watchEffect, Transition, resolveDynamicComponent, nextTick, withDirectives, toDisplayString, TransitionGroup, vShow, toRaw, readonly, onScopeDispose, Teleport, resolveComponent, createSlots, createTextVNode, openBlock, createBlock, createCommentVNode, renderList, getCurrentInstance as getCurrentInstance$1, cloneVNode, createElementBlock, defineAsyncComponent, onServerPrefetch } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { i as includes, g as genericComponent, h as isPrimitive, j as convertToUnit, p as propsFactory, k as useRtl, l as breakpoints, _ as _export_sfc, m as getCurrentInstanceName, o as destructComputed, q as isCssColor, s as isParsableColor, t as parseColor, v as getForeground, w as makeThemeProps, x as provideTheme, y as provideDefaults, z as getCurrentInstance, A as useProxiedModel, B as findChildrenWithProvide, C as consoleWarn, D as wrapInArray, E as useTheme, F as useIcon, I as IconValue, G as flattenFragments, H as clamp, P as PREFERS_REDUCED_MOTION, J as useToggleScope, K as hasEvent, L as isObject, M as onlyDefinedProps, N as acceleratedEasing, O as deceleratedEasing, Q as standardEasing, R as consoleError, S as defineComponent$1, T as EventProp, U as deprecate, V as focusChild, W as getPropertyFromItem, X as omit, Y as CircularBuffer, Z as defer, $ as templateRef, a0 as matchesSelector, a1 as focusableChildren, a2 as isClickInsideElement, a3 as getNextElement, f as useDisplay, b as useRuntimeConfig, a4 as pick$1, u as useNuxtApp, a5 as asyncDataDefaults, c as createError } from "../server.mjs";
import { m as makeComponentProps, u as useRender, a as useResizeObserver } from "./resizeObserver-Bors9hmC.js";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import { debounce } from "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
const block = ["top", "bottom"];
const inline = ["start", "end", "left", "right"];
function parseAnchor(anchor, isRtl) {
  let [side, align] = anchor.split(" ");
  if (!align) {
    align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
  }
  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl)
  };
}
function toPhysical(str, isRtl) {
  if (str === "start") return isRtl ? "right" : "left";
  if (str === "end") return isRtl ? "left" : "right";
  return str;
}
function flipSide(anchor) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.side],
    align: anchor.align
  };
}
function flipAlign(anchor) {
  return {
    side: anchor.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.align]
  };
}
function flipCorner(anchor) {
  return {
    side: anchor.align,
    align: anchor.side
  };
}
function getAxis(anchor) {
  return includes(block, anchor.side) ? "y" : "x";
}
class Box {
  constructor(args) {
    const pageScale = (void 0).body.currentCSSZoom ?? 1;
    const isElement = args instanceof Element;
    const factor = isElement ? 1 + (1 - pageScale) / pageScale : 1;
    const {
      x,
      y,
      width,
      height
    } = isElement ? args.getBoundingClientRect() : args;
    this.x = x * factor;
    this.y = y * factor;
    this.width = width * factor;
    this.height = height * factor;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function getOverflow(a, b) {
  return {
    x: {
      before: Math.max(0, b.left - a.left),
      after: Math.max(0, a.right - b.right)
    },
    y: {
      before: Math.max(0, b.top - a.top),
      after: Math.max(0, a.bottom - b.bottom)
    }
  };
}
function getTargetBox(target) {
  if (Array.isArray(target)) {
    const pageScale = (void 0).body.currentCSSZoom ?? 1;
    const factor = 1 + (1 - pageScale) / pageScale;
    return new Box({
      x: target[0] * factor,
      y: target[1] * factor,
      width: 0 * factor,
      height: 0 * factor
    });
  } else {
    return new Box(target);
  }
}
function getElementBox(el) {
  if (el === (void 0).documentElement) {
    if (!visualViewport) {
      return new Box({
        x: 0,
        y: 0,
        width: (void 0).documentElement.clientWidth,
        height: (void 0).documentElement.clientHeight
      });
    } else {
      const pageScale = (void 0).body.currentCSSZoom ?? 1;
      return new Box({
        x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
        y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
        width: visualViewport.width * visualViewport.scale / pageScale,
        height: visualViewport.height * visualViewport.scale / pageScale
      });
    }
  } else {
    return new Box(el);
  }
}
function nullifyTransforms(el) {
  const rect = new Box(el);
  const style = getComputedStyle(el);
  const tx = style.transform;
  if (tx) {
    let ta, sx, sy, dx, dy;
    if (tx.startsWith("matrix3d(")) {
      ta = tx.slice(9, -1).split(/, /);
      sx = Number(ta[0]);
      sy = Number(ta[5]);
      dx = Number(ta[12]);
      dy = Number(ta[13]);
    } else if (tx.startsWith("matrix(")) {
      ta = tx.slice(7, -1).split(/, /);
      sx = Number(ta[0]);
      sy = Number(ta[3]);
      dx = Number(ta[4]);
      dy = Number(ta[5]);
    } else {
      return new Box(rect);
    }
    const to = style.transformOrigin;
    const x = rect.x - dx - (1 - sx) * parseFloat(to);
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
    const w = sx ? rect.width / sx : el.offsetWidth + 1;
    const h2 = sy ? rect.height / sy : el.offsetHeight + 1;
    return new Box({
      x,
      y,
      width: w,
      height: h2
    });
  } else {
    return new Box(rect);
  }
}
function animate(el, keyframes, options) {
  if (typeof el.animate === "undefined") return {
    finished: Promise.resolve()
  };
  let animation;
  try {
    animation = el.animate(keyframes, options);
  } catch (err) {
    return {
      finished: Promise.resolve()
    };
  }
  if (typeof animation.finished === "undefined") {
    animation.finished = new Promise((resolve) => {
      animation.onfinish = () => {
        resolve(animation);
      };
    });
  }
  return animation;
}
function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
  let name = arguments.length > 2 ? arguments[2] : void 0;
  return genericComponent()({
    name: name ?? capitalize(camelize(klass.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: tag
      },
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        return h(props.tag, {
          class: [klass, props.class],
          style: props.style
        }, slots.default?.());
      };
    }
  });
}
function updateRecursionCache(a, b, cache, result) {
  if (!cache || isPrimitive(a) || isPrimitive(b)) return;
  const visitedObject = cache.get(a);
  if (visitedObject) {
    visitedObject.set(b, result);
  } else {
    const newCacheItem = /* @__PURE__ */ new WeakMap();
    newCacheItem.set(b, result);
    cache.set(a, newCacheItem);
  }
}
function findCachedComparison(a, b, cache) {
  if (!cache || isPrimitive(a) || isPrimitive(b)) return null;
  const r1 = cache.get(a)?.get(b);
  if (typeof r1 === "boolean") return r1;
  const r2 = cache.get(b)?.get(a);
  if (typeof r2 === "boolean") return r2;
  return null;
}
function deepEqual(a, b) {
  let recursionCache = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ new WeakMap();
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    return false;
  }
  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }
  const props = Object.keys(a);
  if (props.length !== Object.keys(b).length) {
    return false;
  }
  const cachedComparisonResult = findCachedComparison(a, b, recursionCache);
  if (cachedComparisonResult) {
    return cachedComparisonResult;
  }
  updateRecursionCache(a, b, recursionCache, true);
  return props.every((p) => deepEqual(a[p], b[p], recursionCache));
}
function attachedRoot(node) {
  if (typeof node.getRootNode !== "function") {
    while (node.parentNode) node = node.parentNode;
    if (node !== void 0) return null;
    return void 0;
  }
  const root = node.getRootNode();
  if (root !== void 0 && root.getRootNode({
    composed: true
  }) !== void 0) return null;
  return root;
}
function getScrollParent(el) {
  let includeHidden = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  while (el) {
    if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el;
    el = el.parentElement;
  }
  return (void 0).scrollingElement;
}
function getScrollParents(el, stopAt) {
  const elements = [];
  if (stopAt && el && !stopAt.contains(el)) return elements;
  while (el) {
    if (hasScrollbar(el)) elements.push(el);
    if (el === stopAt) break;
    el = el.parentElement;
  }
  return elements;
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = (void 0).getComputedStyle(el);
  const hasVerticalScrollbar = style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
  const hasHorizontalScrollbar = style.overflowX === "scroll" || style.overflowX === "auto" && el.scrollWidth > el.clientWidth;
  return hasVerticalScrollbar || hasHorizontalScrollbar;
}
function isPotentiallyScrollable(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = (void 0).getComputedStyle(el);
  return ["scroll", "auto"].includes(style.overflowY);
}
function isFixedPosition(el) {
  while (el) {
    if ((void 0).getComputedStyle(el).position === "fixed") {
      return true;
    }
    el = el.offsetParent;
  }
  return false;
}
function throttle(fn, delay) {
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    leading: true,
    trailing: true
  };
  let timeoutId = 0;
  let lastExec = 0;
  let throttling = false;
  let start = 0;
  function clear() {
    clearTimeout(timeoutId);
    throttling = false;
    start = 0;
  }
  const wrap = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeoutId);
    const now = Date.now();
    if (!start) start = now;
    const elapsed = now - Math.max(start, lastExec);
    function invoke() {
      lastExec = Date.now();
      timeoutId = setTimeout(clear, delay);
      fn(...args);
    }
    if (!throttling) {
      throttling = true;
      if (options.leading) {
        invoke();
      }
    } else if (elapsed >= delay) {
      invoke();
    } else if (options.trailing) {
      timeoutId = setTimeout(invoke, delay - elapsed);
    }
  };
  wrap.clear = clear;
  wrap.immediate = fn;
  return wrap;
}
const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function useDimension(props) {
  const dimensionStyles = computed(() => {
    const styles = {};
    const height = convertToUnit(props.height);
    const maxHeight = convertToUnit(props.maxHeight);
    const maxWidth = convertToUnit(props.maxWidth);
    const minHeight = convertToUnit(props.minHeight);
    const minWidth = convertToUnit(props.minWidth);
    const width = convertToUnit(props.width);
    if (height != null) styles.height = height;
    if (maxHeight != null) styles.maxHeight = maxHeight;
    if (maxWidth != null) styles.maxWidth = maxWidth;
    if (minHeight != null) styles.minHeight = minHeight;
    if (minWidth != null) styles.minWidth = minWidth;
    if (width != null) styles.width = width;
    return styles;
  });
  return {
    dimensionStyles
  };
}
const makeTagProps = propsFactory({
  tag: {
    type: [String, Object, Function],
    default: "div"
  }
}, "tag");
const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps()
}, "VContainer");
const VContainer = genericComponent()({
  name: "VContainer",
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-container", {
        "v-container--fluid": props.fluid
      }, rtlClasses.value, props.class]),
      "style": normalizeStyle([dimensionStyles.value, props.style])
    }, slots));
    return {};
  }
});
const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = "offset" + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = "order" + capitalize(val);
    props[orderKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  if (type === "col") {
    className = "v-" + className;
  }
  if (type === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
const makeVColProps = propsFactory({
  cols: {
    type: [Boolean, String, Number],
    default: false
  },
  ...breakpointProps,
  offset: {
    type: [String, Number],
    default: null
  },
  ...offsetProps,
  order: {
    type: [String, Number],
    default: null
  },
  ...orderProps,
  alignSelf: {
    type: String,
    default: null,
    validator: (str) => ALIGN_SELF_VALUES.includes(str)
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCol");
const VCol = genericComponent()({
  name: "VCol",
  props: makeVColProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap$1) {
        propMap$1[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass$1(type, prop, value);
          if (className) classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => h(props.tag, {
      class: [classes.value, props.class],
      style: props.style
    }, slots.default?.());
  }
});
const ALIGNMENT = ["start", "end", "center"];
const SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
const alignValidator = (str) => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const makeVRowProps = propsFactory({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: alignValidator
  },
  ...alignProps,
  justify: {
    type: String,
    default: null,
    validator: justifyValidator
  },
  ...justifyProps,
  alignContent: {
    type: String,
    default: null,
    validator: alignContentValidator
  },
  ...alignContentProps,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VRow");
const VRow = genericComponent()({
  name: "VRow",
  props: makeVRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => h(props.tag, {
      class: ["v-row", classes.value, props.class],
      style: props.style
    }, slots.default?.());
  }
});
const VSpacer = createSimpleFunctional("v-spacer", "div", "VSpacer");
const _sfc_main$g = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VContainer, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/common/AContainer.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const AContainer = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$2]]), { __name: "EditorElementsElementsCommonAContainer" });
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "containerBox",
  __ssrInlineRender: true,
  props: {
    isNormalInFluid: { type: Boolean },
    reverseOnMobile: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isNormalInFluid) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(VContainer, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, {
                justify: "center",
                class: __props.reverseOnMobile === "reverse" ? "reverseOnMobile" : void 0
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, {
                  justify: "center",
                  class: __props.reverseOnMobile === "reverse" ? "reverseOnMobile" : void 0
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }, 8, ["class"])
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(VRow, mergeProps({
          justify: "center",
          class: __props.reverseOnMobile === "reverse" ? "reverseOnMobile" : void 0
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/containerBox.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const ContainerBox = Object.assign(_sfc_main$f, { __name: "EditorElementsContainerBox" });
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, "border");
function useBorder(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const border = props.border;
    if (border === true || border === "") {
      return `${name}--border`;
    } else if (typeof border === "string" || border === 0) {
      return String(border).split(" ").map((v) => `border-${v}`);
    }
    return [];
  });
  return {
    borderClasses
  };
}
const allowedDensities = [null, "default", "comfortable", "compact"];
const makeDensityProps = propsFactory({
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  }
}, "density");
function useDensity(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const densityClasses = toRef(() => {
    return `${name}--density-${props.density}`;
  });
  return {
    densityClasses
  };
}
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }
  }
}, "elevation");
function useElevation(props) {
  const elevationClasses = toRef(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    if (elevation == null) return [];
    return [`elevation-${elevation}`];
  });
  return {
    elevationClasses
  };
}
const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function useRounded(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const tile = isRef(props) ? false : props.tile;
    const classes = [];
    if (tile || rounded === false) {
      classes.push("rounded-0");
    } else if (rounded === true || rounded === "") {
      classes.push(`${name}--rounded`);
    } else if (typeof rounded === "string" || rounded === 0) {
      for (const value of String(rounded).split(" ")) {
        classes.push(`rounded-${value}`);
      }
    }
    return classes;
  });
  return {
    roundedClasses
  };
}
function useColor(colors) {
  return destructComputed(() => {
    const {
      class: colorClasses,
      style: colorStyles
    } = computeColor(colors);
    return {
      colorClasses,
      colorStyles
    };
  });
}
function useTextColor(color) {
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(() => ({
    text: toValue(color)
  }));
  return {
    textColorClasses,
    textColorStyles
  };
}
function useBackgroundColor(color) {
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(() => ({
    background: toValue(color)
  }));
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}
function normalizeColors(colors) {
  return {
    text: typeof colors.text === "string" ? colors.text.replace(/^text-/, "") : colors.text,
    background: typeof colors.background === "string" ? colors.background.replace(/^bg-/, "") : colors.background
  };
}
function computeColor(colors) {
  const _colors = normalizeColors(toValue(colors));
  const classes = [];
  const styles = {};
  if (_colors.background) {
    if (isCssColor(_colors.background)) {
      styles.backgroundColor = _colors.background;
      if (!_colors.text && isParsableColor(_colors.background)) {
        const backgroundColor = parseColor(_colors.background);
        if (backgroundColor.a == null || backgroundColor.a === 1) {
          const textColor = getForeground(backgroundColor);
          styles.color = textColor;
          styles.caretColor = textColor;
        }
      }
    } else {
      classes.push(`bg-${_colors.background}`);
    }
  }
  if (_colors.text) {
    if (isCssColor(_colors.text)) {
      styles.color = _colors.text;
      styles.caretColor = _colors.text;
    } else {
      classes.push(`text-${_colors.text}`);
    }
  }
  return {
    class: classes,
    style: styles
  };
}
const allowedVariants$2 = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function genOverlays(isClickable, name) {
  return createElementVNode(Fragment, null, [isClickable && createElementVNode("span", {
    "key": "overlay",
    "class": normalizeClass(`${name}__overlay`)
  }, null), createElementVNode("span", {
    "key": "underlay",
    "class": normalizeClass(`${name}__underlay`)
  }, null)]);
}
const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (v) => allowedVariants$2.includes(v)
  }
}, "variant");
function useVariant(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const variantClasses = toRef(() => {
    const {
      variant
    } = toValue(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(() => {
    const {
      variant,
      color
    } = toValue(props);
    return {
      [["elevated", "flat"].includes(variant) ? "background" : "text"]: color
    };
  });
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}
const makeVBtnGroupProps = propsFactory({
  baseColor: String,
  divided: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps()
}, "VBtnGroup");
const VBtnGroup = genericComponent()({
  name: "VBtnGroup",
  props: makeVBtnGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBtn: {
        height: toRef(() => props.direction === "horizontal" ? "auto" : null),
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        density: toRef(() => props.density),
        flat: true,
        variant: toRef(() => props.variant)
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": normalizeClass(["v-btn-group", `v-btn-group--${props.direction}`, {
          "v-btn-group--divided": props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle(props.style)
      }, slots);
    });
  }
});
const makeGroupProps = propsFactory({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group");
const makeGroupItemProps = propsFactory({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function useGroupItem(props, injectKey) {
  let required = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  const vm = getCurrentInstance("useGroupItem");
  if (!vm) {
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  }
  const id = useId();
  provide(/* @__PURE__ */ Symbol.for(`${injectKey.description}:id`), id);
  const group = inject(injectKey, null);
  if (!group) {
    if (!required) return group;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }
  const value = toRef(() => props.value);
  const disabled = computed(() => !!(group.disabled.value || props.disabled));
  function register() {
    group?.register({
      id,
      value,
      disabled
    }, vm);
  }
  function unregister() {
    group?.unregister(id);
  }
  register();
  const isSelected = computed(() => {
    return group.isSelected(id);
  });
  const isFirst = computed(() => {
    return group.items.value[0].id === id;
  });
  const isLast = computed(() => {
    return group.items.value[group.items.value.length - 1].id === id;
  });
  const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
  watch(isSelected, (value2) => {
    vm.emit("group:selected", {
      value: value2
    });
  }, {
    flush: "sync"
  });
  return {
    id,
    isSelected,
    isFirst,
    isLast,
    toggle: () => group.select(id, !isSelected.value),
    select: (value2) => group.select(id, value2),
    selectedClass,
    value,
    disabled,
    group,
    register,
    unregister
  };
}
function useGroup(props, injectKey) {
  const items = reactive([]);
  const selected = useProxiedModel(props, "modelValue", [], (v) => {
    if (v === void 0) return [];
    return getIds(items, v === null ? [null] : wrapInArray(v));
  }, (v) => {
    const arr = getValues(items, v);
    return props.multiple ? arr : arr[0];
  });
  const groupVm = getCurrentInstance("useGroup");
  function register(item, vm) {
    const unwrapped = item;
    const key = /* @__PURE__ */ Symbol.for(`${injectKey.description}:id`);
    const children = findChildrenWithProvide(key, groupVm?.vnode);
    const index = children.indexOf(vm);
    if (unref(unwrapped.value) === void 0) {
      unwrapped.value = index;
      unwrapped.useIndexAsValue = true;
    }
    if (index > -1) {
      items.splice(index, 0, unwrapped);
    } else {
      items.push(unwrapped);
    }
  }
  function unregister(id) {
    forceMandatoryValue();
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
  }
  function forceMandatoryValue() {
    const item = items.find((item2) => !item2.disabled);
    if (item && props.mandatory === "force" && !selected.value.length) {
      selected.value = [item.id];
    }
  }
  function select(id, value) {
    const item = items.find((item2) => item2.id === id);
    if (value && item?.disabled) return;
    if (props.multiple) {
      const internalValue = selected.value.slice();
      const index = internalValue.findIndex((v) => v === id);
      const isSelected = ~index;
      value = value ?? !isSelected;
      if (isSelected && props.mandatory && internalValue.length <= 1) return;
      if (!isSelected && props.max != null && internalValue.length + 1 > props.max) return;
      if (index < 0 && value) internalValue.push(id);
      else if (index >= 0 && !value) internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      const isSelected = selected.value.includes(id);
      if (props.mandatory && isSelected) return;
      if (!isSelected && !value) return;
      selected.value = value ?? !isSelected ? [id] : [];
    }
  }
  function step(offset) {
    if (props.multiple) consoleWarn('This method is not supported when using "multiple" prop');
    if (!selected.value.length) {
      const item = items.find((item2) => !item2.disabled);
      item && (selected.value = [item.id]);
    } else {
      const currentId = selected.value[0];
      const currentIndex = items.findIndex((i) => i.id === currentId);
      let newIndex = (currentIndex + offset) % items.length;
      let newItem = items[newIndex];
      while (newItem.disabled && newIndex !== currentIndex) {
        newIndex = (newIndex + offset) % items.length;
        newItem = items[newIndex];
      }
      if (newItem.disabled) return;
      selected.value = [items[newIndex].id];
    }
  }
  const state = {
    register,
    unregister,
    selected,
    select,
    disabled: toRef(() => props.disabled),
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: (id) => selected.value.includes(id),
    selectedClass: toRef(() => props.selectedClass),
    items: toRef(() => items),
    getItemIndex: (value) => getItemIndex(items, value)
  };
  provide(injectKey, state);
  return state;
}
function getItemIndex(items, value) {
  const ids = getIds(items, [value]);
  if (!ids.length) return -1;
  return items.findIndex((item) => item.id === ids[0]);
}
function getIds(items, modelValue) {
  const ids = [];
  modelValue.forEach((value) => {
    const item = items.find((item2) => deepEqual(value, item2.value));
    const itemByIndex = items[value];
    if (item?.value !== void 0) {
      ids.push(item.id);
    } else if (itemByIndex?.useIndexAsValue) {
      ids.push(itemByIndex.id);
    }
  });
  return ids;
}
function getValues(items, ids) {
  const values = [];
  ids.forEach((id) => {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (~itemIndex) {
      const item = items[itemIndex];
      values.push(item.value !== void 0 ? item.value : itemIndex);
    }
  });
  return values;
}
const VBtnToggleSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-btn-toggle");
const makeVBtnToggleProps = propsFactory({
  ...makeVBtnGroupProps(),
  ...makeGroupProps()
}, "VBtnToggle");
genericComponent()({
  name: "VBtnToggle",
  props: makeVBtnToggleProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      const btnGroupProps = VBtnGroup.filterProps(props);
      return createVNode(VBtnGroup, mergeProps({
        "class": ["v-btn-toggle", props.class]
      }, btnGroupProps, {
        "style": props.style
      }), {
        default: () => [slots.default?.({
          isSelected,
          next,
          prev,
          select,
          selected
        })]
      });
    });
    return {
      next,
      prev,
      select
    };
  }
});
const makeVDefaultsProviderProps = propsFactory({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider");
const VDefaultsProvider = genericComponent(false)({
  name: "VDefaultsProvider",
  props: makeVDefaultsProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      defaults,
      disabled,
      reset,
      root,
      scoped
    } = toRefs(props);
    provideDefaults(defaults, {
      reset,
      root,
      scoped,
      disabled
    });
    return () => slots.default?.();
  }
});
const predefinedSizes = ["x-small", "small", "default", "large", "x-large"];
const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function useSize(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  return destructComputed(() => {
    const size = props.size;
    let sizeClasses;
    let sizeStyles;
    if (includes(predefinedSizes, size)) {
      sizeClasses = `${name}--size-${size}`;
    } else if (size) {
      sizeStyles = {
        width: convertToUnit(size),
        height: convertToUnit(size)
      };
    }
    return {
      sizeClasses,
      sizeStyles
    };
  });
}
const makeVIconProps = propsFactory({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  opacity: [String, Number],
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "i"
  }),
  ...makeThemeProps()
}, "VIcon");
const VIcon = genericComponent()({
  name: "VIcon",
  props: makeVIconProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const slotIcon = shallowRef();
    const {
      themeClasses
    } = useTheme();
    const {
      iconData
    } = useIcon(() => slotIcon.value || props.icon);
    const {
      sizeClasses
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => {
      const slotValue = slots.default?.();
      if (slotValue) {
        slotIcon.value = flattenFragments(slotValue).filter((node) => node.type === Text && node.children && typeof node.children === "string")[0]?.children;
      }
      const hasClick = !!(attrs.onClick || attrs.onClickOnce);
      return createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": normalizeClass(["v-icon", "notranslate", themeClasses.value, sizeClasses.value, textColorClasses.value, {
          "v-icon--clickable": hasClick,
          "v-icon--disabled": props.disabled,
          "v-icon--start": props.start,
          "v-icon--end": props.end
        }, props.class]),
        "style": normalizeStyle([{
          "--v-icon-opacity": props.opacity
        }, !sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          height: convertToUnit(props.size),
          width: convertToUnit(props.size)
        } : void 0, textColorStyles.value, props.style]),
        "role": hasClick ? "button" : void 0,
        "aria-hidden": !hasClick,
        "tabindex": hasClick ? props.disabled ? -1 : 0 : void 0
      }, {
        default: () => [slotValue]
      });
    });
    return {};
  }
});
function useIntersectionObserver(callback, options) {
  const intersectionRef = ref();
  const isIntersecting = shallowRef(false);
  return {
    intersectionRef,
    isIntersecting
  };
}
const makeRevealProps = propsFactory({
  reveal: {
    type: [Boolean, Object],
    default: false
  }
}, "reveal");
function useReveal(props) {
  const defaultDuration = 900;
  const duration = toRef(() => typeof props.reveal === "object" ? Math.max(0, Number(props.reveal.duration ?? defaultDuration)) : defaultDuration);
  const state = shallowRef(props.reveal ? "initial" : "disabled");
  return {
    duration,
    state
  };
}
const makeVProgressCircularProps = propsFactory({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  rounded: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...makeComponentProps(),
  ...makeRevealProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "div"
  }),
  ...makeThemeProps()
}, "VProgressCircular");
const VProgressCircular = genericComponent()({
  name: "VProgressCircular",
  props: makeVProgressCircularProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const root = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(() => props.bgColor);
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const {
      state: revealState,
      duration: revealDuration
    } = useReveal(props);
    const normalizedValue = toRef(() => revealState.value === "initial" ? 0 : clamp(parseFloat(props.modelValue), 0, 100));
    const width = toRef(() => Number(props.width));
    const size = toRef(() => {
      return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
    });
    const diameter = toRef(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = toRef(() => width.value / size.value * diameter.value);
    const strokeDashOffset = toRef(() => {
      const baseLength = (100 - normalizedValue.value) / 100 * CIRCUMFERENCE;
      return props.rounded && normalizedValue.value > 0 && normalizedValue.value < 100 ? convertToUnit(Math.min(CIRCUMFERENCE - 0.01, baseLength + strokeWidth.value)) : convertToUnit(baseLength);
    });
    const startAngle = computed(() => {
      const baseAngle = Number(props.rotate);
      return props.rounded ? baseAngle + strokeWidth.value / 2 / CIRCUMFERENCE * 360 : baseAngle;
    });
    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": normalizeClass(["v-progress-circular", {
        "v-progress-circular--indeterminate": !!props.indeterminate,
        "v-progress-circular--visible": isIntersecting.value,
        "v-progress-circular--disable-shrink": props.indeterminate && (props.indeterminate === "disable-shrink" || PREFERS_REDUCED_MOTION()),
        "v-progress-circular--revealing": ["initial", "pending"].includes(revealState.value)
      }, themeClasses.value, sizeClasses.value, textColorClasses.value, props.class]),
      "style": normalizeStyle([sizeStyles.value, textColorStyles.value, {
        "--progress-reveal-duration": `${revealDuration.value}ms`
      }, props.style]),
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
    }, {
      default: () => [createElementVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${startAngle.value}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [createElementVNode("circle", {
        "class": normalizeClass(["v-progress-circular__underlay", underlayColorClasses.value]),
        "style": normalizeStyle(underlayColorStyles.value),
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null), createElementVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value,
        "stroke-linecap": props.rounded ? "round" : void 0
      }, null)]), slots.default && createElementVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])]
    }));
    return {};
  }
});
const oppositeMap = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const makeLocationProps = propsFactory({
  location: String
}, "location");
function useLocation(props) {
  let opposite = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  let offset = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl
  } = useRtl();
  const locationStyles = computed(() => {
    if (!props.location) return {};
    const {
      side,
      align
    } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
    function getOffset2(side2) {
      return offset ? offset(side2) : 0;
    }
    const styles = {};
    if (side !== "center") {
      if (opposite) styles[oppositeMap[side]] = `calc(100% - ${getOffset2(side)}px)`;
      else styles[side] = 0;
    }
    if (align !== "center") {
      if (opposite) styles[oppositeMap[align]] = `calc(100% - ${getOffset2(align)}px)`;
      else styles[align] = 0;
    } else {
      if (side === "center") styles.top = styles.left = "50%";
      else {
        styles[{
          top: "left",
          bottom: "left",
          left: "top",
          right: "top"
        }[side]] = "50%";
      }
      styles.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[side];
    }
    return styles;
  });
  return {
    locationStyles
  };
}
const makeChunksProps = propsFactory({
  chunkCount: {
    type: [Number, String],
    default: null
  },
  chunkWidth: {
    type: [Number, String],
    default: null
  },
  chunkGap: {
    type: [Number, String],
    default: 4
  }
}, "chunks");
function useChunks(props, containerWidth) {
  const hasChunks = toRef(() => !!props.chunkCount || !!props.chunkWidth);
  const chunkWidth = computed(() => {
    const containerSize = toValue(containerWidth);
    if (!containerSize) {
      return 0;
    }
    if (!props.chunkCount) {
      return Number(props.chunkWidth);
    }
    const count = Number(props.chunkCount);
    const availableWidth = containerSize - Number(props.chunkGap) * (count - 1);
    return availableWidth / count;
  });
  const chunkGap = toRef(() => Number(props.chunkGap));
  const chunksMaskStyles = computed(() => {
    if (!hasChunks.value) {
      return {};
    }
    const chunkGapPx = convertToUnit(chunkGap.value);
    const chunkWidthPx = convertToUnit(chunkWidth.value);
    return {
      maskRepeat: "repeat-x",
      maskImage: `linear-gradient(90deg, #000, #000 ${chunkWidthPx}, transparent ${chunkWidthPx}, transparent)`,
      maskSize: `calc(${chunkWidthPx} + ${chunkGapPx}) 100%`
    };
  });
  function snapValueToChunk(val) {
    const containerSize = toValue(containerWidth);
    if (!containerSize) {
      return val;
    }
    const gapRelativeSize = 100 * chunkGap.value / containerSize;
    const chunkRelativeSize = 100 * (chunkWidth.value + chunkGap.value) / containerSize;
    const filledChunks = Math.floor((val + gapRelativeSize) / chunkRelativeSize);
    return clamp(0, filledChunks * chunkRelativeSize - gapRelativeSize / 2, 100);
  }
  return {
    hasChunks,
    chunksMaskStyles,
    snapValueToChunk
  };
}
const makeVProgressLinearProps = propsFactory({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: true
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...makeChunksProps(),
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VProgressLinear");
const VProgressLinear = genericComponent()({
  name: "VProgressLinear",
  props: makeVProgressLinearProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const root = ref();
    const progress = useProxiedModel(props, "modelValue");
    const {
      isRtl,
      rtlClasses
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor || props.color);
    const {
      backgroundColorClasses: bufferColorClasses,
      backgroundColorStyles: bufferColorStyles
    } = useBackgroundColor(() => props.bufferColor || props.bgColor || props.color);
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const max = computed(() => parseFloat(props.max));
    const height = computed(() => parseFloat(props.height));
    const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue) / max.value * 100, 0, 100));
    const normalizedValue = computed(() => clamp(parseFloat(progress.value) / max.value * 100, 0, 100));
    const isReversed = computed(() => isRtl.value !== props.reverse);
    const transition = computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
    const containerWidth = shallowRef(0);
    const {
      hasChunks,
      chunksMaskStyles,
      snapValueToChunk
    } = useChunks(props, containerWidth);
    useToggleScope(hasChunks, () => {
      const {
        resizeRef
      } = useResizeObserver();
      watchEffect(() => resizeRef.value = root.value);
    });
    const bufferWidth = computed(() => {
      return hasChunks.value ? snapValueToChunk(normalizedBuffer.value) : normalizedBuffer.value;
    });
    const barWidth = computed(() => {
      return hasChunks.value ? snapValueToChunk(normalizedValue.value) : normalizedValue.value;
    });
    function handleClick(e) {
      if (!intersectionRef.value) return;
      const {
        left,
        right,
        width
      } = intersectionRef.value.getBoundingClientRect();
      const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
      progress.value = Math.round(value / width * max.value);
    }
    watchEffect(() => {
      intersectionRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": normalizeClass(["v-progress-linear", {
        "v-progress-linear--absolute": props.absolute,
        "v-progress-linear--active": props.active && isIntersecting.value,
        "v-progress-linear--reverse": isReversed.value,
        "v-progress-linear--rounded": props.rounded,
        "v-progress-linear--rounded-bar": props.roundedBar,
        "v-progress-linear--striped": props.striped,
        "v-progress-linear--clickable": props.clickable
      }, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class]),
      "style": normalizeStyle([{
        bottom: props.location === "bottom" ? 0 : void 0,
        top: props.location === "top" ? 0 : void 0,
        height: props.active ? convertToUnit(height.value) : 0,
        "--v-progress-linear-height": convertToUnit(height.value),
        ...props.absolute ? locationStyles.value : {}
      }, chunksMaskStyles.value, props.style]),
      "role": "progressbar",
      "aria-hidden": props.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": props.max,
      "aria-valuenow": props.indeterminate ? void 0 : Math.min(parseFloat(progress.value), max.value),
      "onClick": props.clickable && handleClick
    }, {
      default: () => [props.stream && createElementVNode("div", {
        "key": "stream",
        "class": normalizeClass(["v-progress-linear__stream", textColorClasses.value]),
        "style": {
          ...textColorStyles.value,
          [isReversed.value ? "left" : "right"]: convertToUnit(-height.value),
          borderTop: `${convertToUnit(height.value / 2)} dotted`,
          opacity: parseFloat(props.bufferOpacity),
          top: `calc(50% - ${convertToUnit(height.value / 4)})`,
          width: convertToUnit(100 - normalizedBuffer.value, "%"),
          "--v-progress-linear-stream-to": convertToUnit(height.value * (isReversed.value ? 1 : -1))
        }
      }, null), createElementVNode("div", {
        "class": normalizeClass(["v-progress-linear__background", backgroundColorClasses.value]),
        "style": normalizeStyle([backgroundColorStyles.value, {
          opacity: parseFloat(props.bgOpacity),
          width: props.stream ? 0 : void 0
        }])
      }, null), createElementVNode("div", {
        "class": normalizeClass(["v-progress-linear__buffer", bufferColorClasses.value]),
        "style": normalizeStyle([bufferColorStyles.value, {
          opacity: parseFloat(props.bufferOpacity),
          width: convertToUnit(bufferWidth.value, "%")
        }])
      }, null), createVNode(Transition, {
        "name": transition.value
      }, {
        default: () => [!props.indeterminate ? createElementVNode("div", {
          "class": normalizeClass(["v-progress-linear__determinate", barColorClasses.value]),
          "style": normalizeStyle([barColorStyles.value, {
            width: convertToUnit(barWidth.value, "%")
          }])
        }, null) : createElementVNode("div", {
          "class": "v-progress-linear__indeterminate"
        }, [["long", "short"].map((bar) => createElementVNode("div", {
          "key": bar,
          "class": normalizeClass(["v-progress-linear__indeterminate", bar, barColorClasses.value]),
          "style": normalizeStyle(barColorStyles.value)
        }, null))])]
      }), slots.default && createElementVNode("div", {
        "class": "v-progress-linear__content"
      }, [slots.default({
        value: normalizedValue.value,
        buffer: normalizedBuffer.value
      })])]
    }));
    return {};
  }
});
const makeLoaderProps = propsFactory({
  loading: [Boolean, String]
}, "loader");
function useLoader(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const loaderClasses = toRef(() => ({
    [`${name}--loading`]: props.loading
  }));
  return {
    loaderClasses
  };
}
function LoaderSlot(props, _ref) {
  let {
    slots
  } = _ref;
  return createElementVNode("div", {
    "class": normalizeClass(`${props.name}__loader`)
  }, [slots.default?.({
    color: props.color,
    isActive: props.active
  }) || createVNode(VProgressLinear, {
    "absolute": props.absolute,
    "active": props.active,
    "color": props.color,
    "height": "2",
    "indeterminate": true
  }, null)]);
}
const positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
const makePositionProps = propsFactory({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (v) => positionValues.includes(v)
    )
  }
}, "position");
function usePosition(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const positionClasses = toRef(() => {
    return props.position ? `${name}--${props.position}` : void 0;
  });
  return {
    positionClasses
  };
}
function useRoute() {
  const vm = getCurrentInstance("useRoute");
  return computed(() => vm?.proxy?.$route);
}
function useRouter() {
  return getCurrentInstance("useRouter")?.proxy?.$router;
}
function useLink(props, attrs) {
  const RouterLink = resolveDynamicComponent("RouterLink");
  const isLink = toRef(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return isLink?.value || hasEvent(attrs, "click") || hasEvent(props, "click");
  });
  if (typeof RouterLink === "string" || !("useLink" in RouterLink)) {
    const href2 = toRef(() => props.href);
    return {
      isLink,
      isRouterLink: toRef(() => false),
      isClickable,
      href: href2,
      linkProps: reactive({
        href: href2
      }),
      route: toRef(() => void 0),
      navigate: toRef(() => void 0)
    };
  }
  const routerLink = RouterLink.useLink({
    to: toRef(() => props.to || ""),
    replace: toRef(() => props.replace)
  });
  const link = computed(() => props.to ? routerLink : void 0);
  const route = useRoute();
  const isActive = computed(() => {
    if (!link.value) return false;
    if (!props.exact) return link.value.isActive?.value ?? false;
    if (!route.value) return link.value.isExactActive?.value ?? false;
    return link.value.isExactActive?.value && deepEqual(link.value.route.value.query, route.value.query);
  });
  const href = computed(() => props.to ? link.value?.route.value.href : props.href);
  const isRouterLink = toRef(() => !!props.to);
  return {
    isLink,
    isRouterLink,
    isClickable,
    isActive,
    route: toRef(() => link.value?.route.value),
    navigate: toRef(() => link.value?.navigate),
    href,
    linkProps: reactive({
      href,
      "aria-current": toRef(() => isActive.value ? "page" : void 0),
      "aria-disabled": toRef(() => props.disabled && isLink.value ? "true" : void 0),
      tabindex: toRef(() => props.disabled && isLink.value ? "-1" : void 0)
    })
  };
}
const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
function useSelectLink(link, select) {
  watch(() => link.isActive?.value, (isActive) => {
    if (link.isLink.value && isActive != null && select) {
      nextTick(() => {
        select(isActive);
      });
    }
  }, {
    immediate: true
  });
}
const stopSymbol = /* @__PURE__ */ Symbol("rippleStop");
const DELAY_RIPPLE = 80;
function transform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}
function isTouchEvent(e) {
  return e.constructor.name === "TouchEvent";
}
function isKeyboardEvent(e) {
  return e.constructor.name === "KeyboardEvent";
}
const calculate = function(e, el) {
  let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  let localX = 0;
  let localY = 0;
  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }
  let radius = 0;
  let scale = 0.3;
  if (el._ripple?.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};
const ripples = {
  /* eslint-disable max-statements */
  show(e, el) {
    let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!el?._ripple?.enabled) {
      return;
    }
    const container = (void 0).createElement("span");
    const animation = (void 0).createElement("span");
    container.appendChild(animation);
    container.className = "v-ripple__container";
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = "v-ripple__animation";
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed2 = (void 0).getComputedStyle(el);
    if (computed2 && computed2.position === "static") {
      el.style.position = "relative";
      el.dataset.previousPosition = "static";
    }
    animation.classList.add("v-ripple__animation--enter");
    animation.classList.add("v-ripple__animation--visible");
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    animation.dataset.activated = String(performance.now());
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animation.classList.remove("v-ripple__animation--enter");
        animation.classList.add("v-ripple__animation--in");
        transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      });
    });
  },
  hide(el) {
    if (!el?._ripple?.enabled) return;
    const ripples2 = el.getElementsByClassName("v-ripple__animation");
    if (ripples2.length === 0) return;
    const animation = Array.from(ripples2).findLast((ripple) => !ripple.dataset.isHiding);
    if (!animation) return;
    else animation.dataset.isHiding = "true";
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--in");
      animation.classList.add("v-ripple__animation--out");
      setTimeout(() => {
        const ripples3 = el.getElementsByClassName("v-ripple__animation");
        if (ripples3.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!element?._ripple || element._ripple.touched || e[stopSymbol]) return;
  e[stopSymbol] = true;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    if (element._ripple.isTouch) return;
  }
  value.center = element._ripple.centered || isKeyboardEvent(e);
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  if (isTouchEvent(e)) {
    if (element._ripple.showTimerCommit) return;
    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value);
    };
    element._ripple.showTimer = (void 0).setTimeout(() => {
      if (element?._ripple?.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e, element, value);
  }
}
function rippleStop(e) {
  e[stopSymbol] = true;
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!element?._ripple) return;
  (void 0).clearTimeout(element._ripple.showTimer);
  if (e.type === "touchend" && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null;
    element._ripple.showTimer = (void 0).setTimeout(() => {
      rippleHide(e);
    });
    return;
  }
  (void 0).setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function rippleCancelShow(e) {
  const element = e.currentTarget;
  if (!element?._ripple) return;
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }
  (void 0).clearTimeout(element._ripple.showTimer);
}
let keyboardRipple = false;
function keyboardRippleShow(e, keys) {
  if (!keyboardRipple && keys.includes(e.key)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}
function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}
function focusRippleHide(e) {
  if (keyboardRipple) {
    keyboardRipple = false;
    rippleHide(e);
  }
}
function updateRipple(el, binding, wasEnabled) {
  const {
    value,
    modifiers
  } = binding;
  const enabled = isRippleEnabled(value);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple ?? {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;
  const bindingValue = isObject(value) ? value : {};
  if (bindingValue.class) {
    el._ripple.class = bindingValue.class;
  }
  const allowedKeys = bindingValue.keys ?? ["Enter", "Space"];
  el._ripple.keyDownHandler = (e) => keyboardRippleShow(e, allowedKeys);
  if (enabled && !wasEnabled) {
    if (modifiers.stop) {
      el.addEventListener("touchstart", rippleStop, {
        passive: true
      });
      el.addEventListener("mousedown", rippleStop);
      return;
    }
    el.addEventListener("touchstart", rippleShow, {
      passive: true
    });
    el.addEventListener("touchend", rippleHide, {
      passive: true
    });
    el.addEventListener("touchmove", rippleCancelShow, {
      passive: true
    });
    el.addEventListener("touchcancel", rippleHide);
    el.addEventListener("mousedown", rippleShow);
    el.addEventListener("mouseup", rippleHide);
    el.addEventListener("mouseleave", rippleHide);
    el.addEventListener("keydown", el._ripple.keyDownHandler);
    el.addEventListener("keyup", keyboardRippleHide);
    el.addEventListener("blur", focusRippleHide);
    el.addEventListener("dragstart", rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}
function removeListeners(el) {
  el.removeEventListener("touchstart", rippleStop);
  el.removeEventListener("mousedown", rippleStop);
  el.removeEventListener("touchstart", rippleShow);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchmove", rippleCancelShow);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  if (el._ripple?.keyDownHandler) {
    el.removeEventListener("keydown", el._ripple.keyDownHandler);
  }
  el.removeEventListener("keyup", keyboardRippleHide);
  el.removeEventListener("blur", focusRippleHide);
  el.removeEventListener("dragstart", rippleHide);
}
function mounted$1(el, binding) {
  updateRipple(el, binding, false);
}
function unmounted$1(el) {
  removeListeners(el);
  delete el._ripple;
}
function updated(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}
const Ripple = {
  mounted: mounted$1,
  unmounted: unmounted$1,
  updated
};
const makeVBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: VBtnToggleSymbol
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: IconValue,
  appendIcon: IconValue,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  spaced: String,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "button"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VBtn");
const VBtn = genericComponent()({
  name: "VBtn",
  props: makeVBtnProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      if (props.active !== void 0) {
        return props.active;
      }
      if (link.isRouterLink.value) {
        return link.isActive?.value;
      }
      return group?.isSelected.value;
    });
    const color = toRef(() => isActive.value ? props.activeColor ?? props.color : props.color);
    const variantProps = computed(() => {
      const showColor = group?.isSelected.value && (!link.isLink.value || link.isActive?.value) || !group || link.isActive?.value;
      return {
        color: showColor ? color.value ?? props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const isDisabled = computed(() => group?.disabled.value || props.disabled);
    const isElevated = toRef(() => {
      return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
    });
    const valueAttr = computed(() => {
      if (props.value === void 0 || typeof props.value === "symbol") return void 0;
      return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
    });
    function onClick(e) {
      if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === "_blank")) return;
      if (link.isRouterLink.value) {
        link.navigate.value?.(e);
      } else {
        group?.toggle();
      }
    }
    useSelectLink(link, group?.select);
    useRender(() => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasPrepend = !!(props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendIcon || slots.append);
      const hasIcon = !!(props.icon && props.icon !== true);
      return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
        "type": Tag === "a" ? void 0 : "button",
        "class": ["v-btn", group?.selectedClass.value, {
          "v-btn--active": isActive.value,
          "v-btn--block": props.block,
          "v-btn--disabled": isDisabled.value,
          "v-btn--elevated": isElevated.value,
          "v-btn--flat": props.flat,
          "v-btn--icon": !!props.icon,
          "v-btn--loading": props.loading,
          "v-btn--readonly": props.readonly,
          "v-btn--slim": props.slim,
          "v-btn--stacked": props.stacked
        }, props.spaced ? ["v-btn--spaced", `v-btn--spaced-${props.spaced}`] : [], themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, sizeStyles.value, props.style],
        "aria-busy": props.loading ? true : void 0,
        "disabled": isDisabled.value && Tag !== "a" || void 0,
        "tabindex": props.loading || props.readonly ? -1 : void 0,
        "onClick": onClick,
        "value": valueAttr.value
      }), {
        default: () => [genOverlays(true, "v-btn"), !props.icon && hasPrepend && createElementVNode("span", {
          "key": "prepend",
          "class": "v-btn__prepend"
        }, [!slots.prepend ? createVNode(VIcon, {
          "key": "prepend-icon",
          "icon": props.prependIcon
        }, null) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !props.prependIcon,
          "defaults": {
            VIcon: {
              icon: props.prependIcon
            }
          }
        }, slots.prepend)]), createElementVNode("span", {
          "class": "v-btn__content",
          "data-no-activator": ""
        }, [!slots.default && hasIcon ? createVNode(VIcon, {
          "key": "content-icon",
          "icon": props.icon
        }, null) : createVNode(VDefaultsProvider, {
          "key": "content-defaults",
          "disabled": !hasIcon,
          "defaults": {
            VIcon: {
              icon: props.icon
            }
          }
        }, {
          default: () => [slots.default?.() ?? toDisplayString(props.text)]
        })]), !props.icon && hasAppend && createElementVNode("span", {
          "key": "append",
          "class": "v-btn__append"
        }, [!slots.append ? createVNode(VIcon, {
          "key": "append-icon",
          "icon": props.appendIcon
        }, null) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !props.appendIcon,
          "defaults": {
            VIcon: {
              icon: props.appendIcon
            }
          }
        }, slots.append)]), !!props.loading && createElementVNode("span", {
          "key": "loader",
          "class": "v-btn__loader"
        }, [slots.loader?.() ?? createVNode(VProgressCircular, {
          "color": typeof props.loading === "boolean" ? void 0 : props.loading,
          "indeterminate": true,
          "width": "2"
        }, null)])]
      }), [[Ripple, !isDisabled.value && props.ripple, "", {
        center: !!props.icon
      }]]);
    });
    return {
      group
    };
  }
});
const allowedVariants$1 = ["dotted", "dashed", "solid", "double"];
const makeVDividerProps = propsFactory({
  color: String,
  contentOffset: [Number, String, Array],
  gradient: Boolean,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  variant: {
    type: String,
    default: "solid",
    validator: (v) => allowedVariants$1.includes(v)
  },
  ...makeComponentProps(),
  ...makeThemeProps()
}, "VDivider");
const VDivider = genericComponent()({
  name: "VDivider",
  props: makeVDividerProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const dividerStyles = computed(() => {
      const styles = {};
      if (props.length) {
        styles[props.vertical ? "height" : "width"] = convertToUnit(props.length);
      }
      if (props.thickness) {
        styles[props.vertical ? "borderRightWidth" : "borderTopWidth"] = convertToUnit(props.thickness);
      }
      return styles;
    });
    const contentStyles = toRef(() => {
      const margin = Array.isArray(props.contentOffset) ? props.contentOffset[0] : props.contentOffset;
      const shift = Array.isArray(props.contentOffset) ? props.contentOffset[1] : 0;
      return {
        marginBlock: props.vertical && margin ? convertToUnit(margin) : void 0,
        marginInline: !props.vertical && margin ? convertToUnit(margin) : void 0,
        transform: shift ? `translate${props.vertical ? "X" : "Y"}(${convertToUnit(shift)})` : void 0
      };
    });
    useRender(() => {
      const divider = createElementVNode("hr", {
        "class": normalizeClass([{
          "v-divider": true,
          "v-divider--gradient": props.gradient && !slots.default,
          "v-divider--inset": props.inset,
          "v-divider--vertical": props.vertical
        }, themeClasses.value, textColorClasses.value, props.class]),
        "style": normalizeStyle([dividerStyles.value, textColorStyles.value, {
          "--v-border-opacity": props.opacity
        }, {
          "border-style": props.variant
        }, props.style]),
        "aria-orientation": !attrs.role || attrs.role === "separator" ? props.vertical ? "vertical" : "horizontal" : void 0,
        "role": `${attrs.role || "separator"}`
      }, null);
      if (!slots.default) return divider;
      return createElementVNode("div", {
        "class": normalizeClass(["v-divider__wrapper", {
          "v-divider__wrapper--gradient": props.gradient,
          "v-divider__wrapper--inset": props.inset,
          "v-divider__wrapper--vertical": props.vertical
        }])
      }, [divider, createElementVNode("div", {
        "class": "v-divider__content",
        "style": normalizeStyle(contentStyles.value)
      }, [slots.default()]), divider]);
    });
    return {};
  }
});
function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + "%"
      } : void 0;
    })
  };
}
const makeVResponsiveProps = propsFactory({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VResponsive");
const VResponsive = genericComponent()({
  name: "VResponsive",
  props: makeVResponsiveProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      aspectStyles
    } = useAspectStyles(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(["v-responsive", {
        "v-responsive--inline": props.inline
      }, props.class]),
      "style": normalizeStyle([dimensionStyles.value, props.style])
    }, [createElementVNode("div", {
      "class": "v-responsive__sizer",
      "style": normalizeStyle(aspectStyles.value)
    }, null), slots.additional?.(), slots.default && createElementVNode("div", {
      "class": normalizeClass(["v-responsive__content", props.contentClass])
    }, [slots.default()])]));
    return {};
  }
});
const makeTransitionProps$1 = propsFactory({
  transition: {
    type: null,
    default: "fade-transition",
    validator: (val) => val !== true
  }
}, "transition");
const MaybeTransition = (props, _ref) => {
  let {
    slots
  } = _ref;
  const {
    transition,
    disabled,
    group,
    ...rest
  } = props;
  const {
    component = group ? TransitionGroup : Transition,
    ...customProps
  } = isObject(transition) ? transition : {};
  let transitionProps;
  if (isObject(transition)) {
    transitionProps = mergeProps(customProps, onlyDefinedProps({
      disabled,
      group
    }), rest);
  } else {
    transitionProps = mergeProps({
      name: disabled || !transition ? "" : transition
    }, rest);
  }
  return h(component, transitionProps, slots);
};
function mounted(el, binding) {
  return;
}
function unmounted(el, binding) {
  const observe = el._observe?.[binding.instance.$.uid];
  if (!observe) return;
  observe.observer.unobserve(el);
  delete el._observe[binding.instance.$.uid];
}
const Intersect = {
  mounted,
  unmounted,
  updated: (el, binding) => {
    if (el._observe?.[binding.instance.$.uid]) {
      unmounted(el, binding);
    }
  }
};
const makeVImgProps = propsFactory({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  imageClass: null,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...makeVResponsiveProps(),
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeTransitionProps$1()
}, "VImg");
const VImg = genericComponent()({
  name: "VImg",
  directives: {
    vIntersect: Intersect
  },
  props: makeVImgProps(),
  emits: {
    loadstart: (value) => true,
    load: (value) => true,
    error: (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const vm = getCurrentInstance("VImg");
    const currentSrc = shallowRef("");
    const image = ref();
    const state = shallowRef(props.eager ? "loading" : "idle");
    const naturalWidth = shallowRef();
    const naturalHeight = shallowRef();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === "object" ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect || 0)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== "idle");
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });
    function init(isIntersecting) {
      if (props.eager && isIntersecting) return;
      state.value = "loading";
      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
      if (!normalisedSrc.value.src) return;
      nextTick(() => {
        emit("loadstart", image.value?.currentSrc || normalisedSrc.value.src);
        setTimeout(() => {
          if (vm.isUnmounted) return;
          if (image.value?.complete) {
            if (!image.value.naturalWidth) {
              onError();
            }
            if (state.value === "error") return;
            if (!aspectRatio.value) pollForSize(image.value, null);
            if (state.value === "loading") onLoad();
          } else {
            if (!aspectRatio.value) pollForSize(image.value);
            getSrc();
          }
        });
      });
    }
    function onLoad() {
      if (vm.isUnmounted) return;
      getSrc();
      pollForSize(image.value);
      state.value = "loaded";
      emit("load", image.value?.currentSrc || normalisedSrc.value.src);
    }
    function onError() {
      if (vm.isUnmounted) return;
      state.value = "error";
      emit("error", image.value?.currentSrc || normalisedSrc.value.src);
    }
    function getSrc() {
      const img = image.value;
      if (img) currentSrc.value = img.currentSrc || img.src;
    }
    let timer = -1;
    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const poll = () => {
        clearTimeout(timer);
        if (vm.isUnmounted) return;
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;
        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === "loading" && timeout != null) {
          timer = (void 0).setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };
      poll();
    }
    const containClasses = toRef(() => ({
      "v-img__img--cover": props.cover,
      "v-img__img--contain": !props.cover
    }));
    const __image = () => {
      if (!normalisedSrc.value.src || state.value === "idle") return null;
      const img = createElementVNode("img", {
        "class": normalizeClass(["v-img__img", containClasses.value, props.imageClass]),
        "style": {
          objectPosition: props.position
        },
        "crossorigin": props.crossorigin,
        "src": normalisedSrc.value.src,
        "srcset": normalisedSrc.value.srcset,
        "alt": props.alt,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable,
        "sizes": props.sizes,
        "ref": image,
        "onLoad": onLoad,
        "onError": onError
      }, null);
      const sources = slots.sources?.();
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createElementVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === "loaded"]])]
      });
    };
    const __preloadImage = () => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createElementVNode("img", {
        "class": normalizeClass(["v-img__img", "v-img__img--preload", containClasses.value]),
        "style": {
          objectPosition: props.position
        },
        "crossorigin": props.crossorigin,
        "src": normalisedSrc.value.lazySrc,
        "alt": props.alt,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable
      }, null)]
    });
    const __placeholder = () => {
      if (!slots.placeholder) return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createElementVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    };
    const __error = () => {
      if (!slots.error) return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === "error" && createElementVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    };
    const __gradient = () => {
      if (!props.gradient) return null;
      return createElementVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    };
    const isBooted = shallowRef(false);
    {
      const stop = watch(aspectRatio, (val) => {
        if (val) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => {
      const responsiveProps = VResponsive.filterProps(props);
      return withDirectives(createVNode(VResponsive, mergeProps({
        "class": ["v-img", {
          "v-img--absolute": props.absolute,
          "v-img--booting": !isBooted.value,
          "v-img--fit-content": props.width === "fit-content"
        }, backgroundColorClasses.value, roundedClasses.value, props.class],
        "style": [{
          width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
        }, backgroundColorStyles.value, props.style]
      }, responsiveProps, {
        "aspectRatio": aspectRatio.value,
        "aria-label": props.alt,
        "role": props.alt ? "img" : void 0
      }), {
        additional: () => createElementVNode(Fragment, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
        default: slots.default
      }), [[Intersect, {
        handler: init,
        options: props.options
      }, null, {
        once: true
      }]]);
    });
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }
});
const makeTransitionProps = propsFactory({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function createCssTransition(name, origin, mode) {
  return genericComponent()({
    name,
    props: makeTransitionProps({
      mode,
      origin
    }),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const functions = {
        onBeforeEnter(el) {
          if (props.origin) {
            el.style.transformOrigin = props.origin;
          }
        },
        onLeave(el) {
          if (props.leaveAbsolute) {
            const {
              offsetTop,
              offsetLeft,
              offsetWidth,
              offsetHeight
            } = el;
            el._transitionInitialStyles = {
              position: el.style.position,
              top: el.style.top,
              left: el.style.left,
              width: el.style.width,
              height: el.style.height
            };
            el.style.position = "absolute";
            el.style.top = `${offsetTop}px`;
            el.style.left = `${offsetLeft}px`;
            el.style.width = `${offsetWidth}px`;
            el.style.height = `${offsetHeight}px`;
          }
          if (props.hideOnLeave) {
            el.style.setProperty("display", "none", "important");
          }
        },
        onAfterLeave(el) {
          if (props.leaveAbsolute && el?._transitionInitialStyles) {
            const {
              position,
              top,
              left,
              width,
              height
            } = el._transitionInitialStyles;
            delete el._transitionInitialStyles;
            el.style.position = position || "";
            el.style.top = top || "";
            el.style.left = left || "";
            el.style.width = width || "";
            el.style.height = height || "";
          }
        }
      };
      return () => {
        const tag = props.group ? TransitionGroup : Transition;
        return h(tag, {
          name: props.disabled ? "" : name,
          css: !props.disabled,
          ...props.group ? void 0 : {
            mode: props.mode
          },
          ...props.disabled ? {} : functions
        }, slots.default);
      };
    }
  });
}
function createJavascriptTransition(name, functions) {
  let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return genericComponent()({
    name,
    props: {
      mode: {
        type: String,
        default: mode
      },
      disabled: {
        type: Boolean,
        default: PREFERS_REDUCED_MOTION()
      },
      group: Boolean,
      hideOnLeave: Boolean
    },
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      const tag = props.group ? TransitionGroup : Transition;
      return () => {
        return h(tag, {
          name: props.disabled ? "" : name,
          css: !props.disabled,
          // mode: props.mode, // TODO: vuejs/vue-next#3104
          ...props.disabled ? {} : {
            ...functions,
            onLeave: (el) => {
              if (props.hideOnLeave) {
                el.style.setProperty("display", "none", "important");
              } else {
                functions.onLeave?.(el);
              }
            }
          }
        }, slots.default);
      };
    }
  });
}
function ExpandTransitionGenerator() {
  let expandedParentClass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "y";
  return {
    onBeforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        width: el.style.width,
        height: el.style.height
      };
    },
    onEnter(el) {
      const initialStyle = el._initialStyle;
      if (!initialStyle) return;
      el.style.setProperty("transition", "none", "important");
      el.style.overflow = "hidden";
      const offsetWidth = `${el.offsetWidth}px`;
      const offsetHeight = `${el.offsetHeight}px`;
      if (["x", "both"].includes(type)) el.style.width = "0";
      if (["y", "both"].includes(type)) el.style.height = "0";
      void el.offsetHeight;
      el.style.transition = initialStyle.transition;
      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }
      requestAnimationFrame(() => {
        if (["x", "both"].includes(type)) el.style.width = offsetWidth;
        if (["y", "both"].includes(type)) el.style.height = offsetHeight;
      });
    },
    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,
    onLeave(el) {
      el._initialStyle = {
        transition: "",
        overflow: el.style.overflow,
        width: el.style.width,
        height: el.style.height
      };
      el.style.overflow = "hidden";
      if (["x", "both"].includes(type)) el.style.width = `${el.offsetWidth}px`;
      if (["y", "both"].includes(type)) el.style.height = `${el.offsetHeight}px`;
      void el.offsetHeight;
      requestAnimationFrame(() => {
        if (["x", "both"].includes(type)) el.style.width = "0";
        if (["y", "both"].includes(type)) el.style.height = "0";
      });
    },
    onAfterLeave,
    onLeaveCancelled: onAfterLeave
  };
  function onAfterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }
  function resetStyles(el) {
    if (!el._initialStyle) return;
    const {
      width: w,
      height: h2
    } = el._initialStyle;
    el.style.overflow = el._initialStyle.overflow;
    if (w != null && ["x", "both"].includes(type)) el.style.width = w;
    if (h2 != null && ["y", "both"].includes(type)) el.style.height = h2;
    delete el._initialStyle;
  }
}
const makeVDialogTransitionProps = propsFactory({
  target: [Object, Array]
}, "v-dialog-transition");
const saved = /* @__PURE__ */ new WeakMap();
const VDialogTransition = genericComponent()({
  name: "VDialogTransition",
  props: makeVDialogTransitionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      },
      async onEnter(el, done) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        el.style.visibility = "";
        const dimensions = getDimensions(props.target, el);
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = dimensions;
        saved.set(el, dimensions);
        {
          const animation = animate(el, [{
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }, {}], {
            duration: 225 * speed,
            easing: deceleratedEasing
          });
          getChildren(el)?.forEach((el2) => {
            animate(el2, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {}], {
              duration: 225 * 2 * speed,
              easing: standardEasing
            });
          });
          animation.finished.then(() => done());
        }
      },
      onAfterEnter(el) {
        el.style.removeProperty("pointer-events");
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = "none";
      },
      async onLeave(el, done) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        let dimensions;
        if (!saved.has(el) || Array.isArray(props.target) || props.target.offsetParent || props.target.getClientRects().length) {
          dimensions = getDimensions(props.target, el);
        } else {
          dimensions = saved.get(el);
        }
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = dimensions;
        {
          const animation = animate(el, [{}, {
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }], {
            duration: 125 * speed,
            easing: acceleratedEasing
          });
          animation.finished.then(() => done());
          getChildren(el)?.forEach((el2) => {
            animate(el2, [{}, {
              opacity: 0,
              offset: 0.2
            }, {
              opacity: 0
            }], {
              duration: 125 * 2 * speed,
              easing: standardEasing
            });
          });
        }
      },
      onAfterLeave(el) {
        el.style.removeProperty("pointer-events");
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});
function getChildren(el) {
  const els = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")?.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = getTargetBox(target);
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === "left" || anchorOffset === "left") {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === "right" || anchorOffset === "right") {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === "top" || anchorOffset === "top") {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;
  const asa = elBox.width * elBox.height / ((void 0).innerWidth * (void 0).innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}
createCssTransition("fab-transition", "center center", "out-in");
createCssTransition("dialog-bottom-transition");
createCssTransition("dialog-top-transition");
const VFadeTransition = createCssTransition("fade-transition");
createCssTransition("scale-transition");
createCssTransition("scroll-x-transition");
createCssTransition("scroll-x-reverse-transition");
createCssTransition("scroll-y-transition");
createCssTransition("scroll-y-reverse-transition");
createCssTransition("slide-x-transition");
createCssTransition("slide-x-reverse-transition");
const VSlideYTransition = createCssTransition("slide-y-transition");
createCssTransition("slide-y-reverse-transition");
const VExpandTransition = createJavascriptTransition("expand-transition", ExpandTransitionGenerator());
const VExpandXTransition = createJavascriptTransition("expand-x-transition", ExpandTransitionGenerator("", "x"));
createJavascriptTransition("expand-both-transition", ExpandTransitionGenerator("", "both"));
const ListKey = /* @__PURE__ */ Symbol.for("vuetify:list");
function createList() {
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    filterable: false
  };
  const parent = inject(ListKey, {
    filterable: false,
    hasPrepend: shallowRef(false),
    updateHasPrepend: () => null,
    trackingIndex: shallowRef(-1),
    navigationStrategy: shallowRef("focus"),
    uid: ""
  });
  const {
    filterable,
    trackingIndex = parent.trackingIndex,
    navigationStrategy = parent.navigationStrategy,
    uid = parent.uid || useId()
  } = options;
  const data = {
    filterable: parent.filterable || filterable,
    hasPrepend: shallowRef(false),
    updateHasPrepend: (value) => {
      if (value) data.hasPrepend.value = value;
    },
    trackingIndex,
    navigationStrategy,
    uid
  };
  provide(ListKey, data);
  return parent;
}
function useList() {
  return inject(ListKey, null);
}
const independentActiveStrategy = (mandatory) => {
  const strategy = {
    activate: (_ref) => {
      let {
        id,
        value,
        activated
      } = _ref;
      id = toRaw(id);
      if (mandatory && !value && activated.size === 1 && activated.has(id)) return activated;
      if (value) {
        activated.add(id);
      } else {
        activated.delete(id);
      }
      return activated;
    },
    in: (v, children, parents) => {
      let set = /* @__PURE__ */ new Set();
      if (v != null) {
        for (const id of wrapInArray(v)) {
          set = strategy.activate({
            id,
            value: true,
            activated: new Set(set),
            children,
            parents
          });
        }
      }
      return set;
    },
    out: (v) => {
      return Array.from(v);
    }
  };
  return strategy;
};
const independentSingleActiveStrategy = (mandatory) => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref2) => {
      let {
        activated,
        id,
        ...rest
      } = _ref2;
      id = toRaw(id);
      const singleSelected = activated.has(id) ? /* @__PURE__ */ new Set([id]) : /* @__PURE__ */ new Set();
      return parentStrategy.activate({
        ...rest,
        id,
        activated: singleSelected
      });
    },
    in: (v, children, parents) => {
      let set = /* @__PURE__ */ new Set();
      if (v != null) {
        const arr = wrapInArray(v);
        if (arr.length) {
          set = parentStrategy.in(arr.slice(0, 1), children, parents);
        }
      }
      return set;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafActiveStrategy = (mandatory) => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref3) => {
      let {
        id,
        activated,
        children,
        ...rest
      } = _ref3;
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleActiveStrategy = (mandatory) => {
  const parentStrategy = independentSingleActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref4) => {
      let {
        id,
        activated,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const singleOpenStrategy = {
  open: (_ref) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref;
    if (value) {
      const newOpened = /* @__PURE__ */ new Set();
      newOpened.add(id);
      let parent = parents.get(id);
      while (parent != null) {
        newOpened.add(parent);
        parent = parents.get(parent);
      }
      return newOpened;
    } else {
      opened.delete(id);
      return opened;
    }
  },
  select: () => null
};
const multipleOpenStrategy = {
  open: (_ref2) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref2;
    if (value) {
      let parent = parents.get(id);
      opened.add(id);
      while (parent != null && parent !== id) {
        opened.add(parent);
        parent = parents.get(parent);
      }
      return opened;
    } else {
      opened.delete(id);
    }
    return opened;
  },
  select: () => null
};
const listOpenStrategy = {
  open: multipleOpenStrategy.open,
  select: (_ref3) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref3;
    if (!value) return opened;
    const path = [];
    let parent = parents.get(id);
    while (parent != null) {
      path.push(parent);
      parent = parents.get(parent);
    }
    return new Set(path);
  }
};
const independentSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref) => {
      let {
        id,
        value,
        selected
      } = _ref;
      id = toRaw(id);
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
          let [key, value2] = _ref2;
          if (value2 === "on") arr.push(key);
          return arr;
        }, []);
        if (on.length === 1 && on[0] === id) return selected;
      }
      selected.set(id, value ? "on" : "off");
      return selected;
    },
    in: (v, children, parents, disabled) => {
      const map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on") arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const independentSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref3) => {
      let {
        selected,
        id,
        ...rest
      } = _ref3;
      id = toRaw(id);
      const singleSelected = selected.has(id) ? /* @__PURE__ */ new Map([[id, selected.get(id)]]) : /* @__PURE__ */ new Map();
      return parentStrategy.select({
        ...rest,
        id,
        selected: singleSelected
      });
    },
    in: (v, children, parents, disabled) => {
      if (v?.length) {
        return parentStrategy.in(v.slice(0, 1), children, parents, disabled);
      }
      return /* @__PURE__ */ new Map();
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref4) => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSingleSelectStrategy(mandatory);
  const strategy = {
    select: (_ref5) => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref5;
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const classicSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref6) => {
      let {
        id,
        value,
        selected,
        children,
        parents,
        disabled
      } = _ref6;
      id = toRaw(id);
      const original = new Map(selected);
      const items = [id];
      while (items.length) {
        const item = items.shift();
        if (!disabled.has(item)) {
          selected.set(toRaw(item), value ? "on" : "off");
        }
        if (children.has(item)) {
          items.push(...children.get(item));
        }
      }
      let parent = toRaw(parents.get(id));
      while (parent) {
        let everySelected = true;
        let noneSelected = true;
        for (const child of children.get(parent)) {
          const cid = toRaw(child);
          if (disabled.has(cid)) continue;
          if (selected.get(cid) !== "on") everySelected = false;
          if (selected.has(cid) && selected.get(cid) !== "off") noneSelected = false;
          if (!everySelected && !noneSelected) break;
        }
        selected.set(parent, everySelected ? "on" : noneSelected ? "off" : "indeterminate");
        parent = toRaw(parents.get(parent));
      }
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
          let [key, value2] = _ref7;
          if (value2 === "on") arr.push(key);
          return arr;
        }, []);
        if (on.length === 0) return original;
      }
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        map = strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled: /* @__PURE__ */ new Set()
        });
      }
      return map;
    },
    out: (v, children) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" && !children.has(key)) arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const trunkSelectStrategy = (mandatory) => {
  const parentStrategy = classicSelectStrategy(mandatory);
  const strategy = {
    select: parentStrategy.select,
    in: parentStrategy.in,
    out: (v, children, parents) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on") {
          if (parents.has(key)) {
            const parent = parents.get(key);
            if (v.get(parent) === "on") continue;
          }
          arr.push(key);
        }
      }
      return arr;
    }
  };
  return strategy;
};
const branchSelectStrategy = (mandatory) => {
  const parentStrategy = classicSelectStrategy(mandatory);
  const strategy = {
    select: parentStrategy.select,
    in: (v, children, parents, disabled) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        if (children.has(id)) continue;
        map = strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" || value === "indeterminate") {
          arr.push(key);
        }
      }
      return arr;
    }
  };
  return strategy;
};
const VNestedSymbol = /* @__PURE__ */ Symbol.for("vuetify:nested");
const emptyNested = {
  id: shallowRef(),
  root: {
    itemsRegistration: ref("render"),
    register: () => null,
    unregister: () => null,
    updateDisabled: () => null,
    children: ref(/* @__PURE__ */ new Map()),
    parents: ref(/* @__PURE__ */ new Map()),
    disabled: ref(/* @__PURE__ */ new Set()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ref(false),
    scrollToActive: ref(false),
    selectable: ref(false),
    opened: ref(/* @__PURE__ */ new Set()),
    activated: ref(/* @__PURE__ */ new Set()),
    selected: ref(/* @__PURE__ */ new Map()),
    selectedValues: ref([]),
    getPath: () => []
  }
};
const makeNestedProps = propsFactory({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean,
  itemsRegistration: {
    type: String,
    default: "render"
  }
}, "nested");
const useNested = (props, _ref) => {
  let {
    items,
    returnObject,
    scrollToActive
  } = _ref;
  const children = shallowRef(/* @__PURE__ */ new Map());
  const parents = shallowRef(/* @__PURE__ */ new Map());
  const disabled = shallowRef(/* @__PURE__ */ new Set());
  const opened = useProxiedModel(props, "opened", props.opened, (v) => new Set(Array.isArray(v) ? v.map((i) => toRaw(i)) : v), (v) => [...v.values()]);
  const activeStrategy = computed(() => {
    if (typeof props.activeStrategy === "object") return props.activeStrategy;
    if (typeof props.activeStrategy === "function") return props.activeStrategy(props.mandatory);
    switch (props.activeStrategy) {
      case "leaf":
        return leafActiveStrategy(props.mandatory);
      case "single-leaf":
        return leafSingleActiveStrategy(props.mandatory);
      case "independent":
        return independentActiveStrategy(props.mandatory);
      case "single-independent":
      default:
        return independentSingleActiveStrategy(props.mandatory);
    }
  });
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    if (typeof props.selectStrategy === "function") return props.selectStrategy(props.mandatory);
    switch (props.selectStrategy) {
      case "single-leaf":
        return leafSingleSelectStrategy(props.mandatory);
      case "leaf":
        return leafSelectStrategy(props.mandatory);
      case "independent":
        return independentSelectStrategy(props.mandatory);
      case "single-independent":
        return independentSingleSelectStrategy(props.mandatory);
      case "trunk":
        return trunkSelectStrategy(props.mandatory);
      case "branch":
        return branchSelectStrategy(props.mandatory);
      case "classic":
      default:
        return classicSelectStrategy(props.mandatory);
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === "object") return props.openStrategy;
    switch (props.openStrategy) {
      case "list":
        return listOpenStrategy;
      case "single":
        return singleOpenStrategy;
      case "multiple":
      default:
        return multipleOpenStrategy;
    }
  });
  const activated = useProxiedModel(props, "activated", props.activated, (v) => activeStrategy.value.in(v, children.value, parents.value), (v) => activeStrategy.value.out(v, children.value, parents.value));
  const selected = useProxiedModel(props, "selected", props.selected, (v) => selectStrategy.value.in(v, children.value, parents.value, disabled.value), (v) => selectStrategy.value.out(v, children.value, parents.value));
  function getPath(id) {
    const path = [];
    let parent = toRaw(id);
    while (parent !== void 0) {
      path.unshift(parent);
      parent = parents.value.get(parent);
    }
    return path;
  }
  const vm = getCurrentInstance("nested");
  const nodeIds = /* @__PURE__ */ new Set();
  const itemsUpdatePropagation = throttle(() => {
    nextTick(() => {
      children.value = new Map(children.value);
      parents.value = new Map(parents.value);
    });
  }, 100);
  watch(() => [items.value, toValue(returnObject)], () => {
    if (props.itemsRegistration === "props") {
      updateInternalMaps();
    }
  }, {
    immediate: true
  });
  function updateInternalMaps() {
    const _parents = /* @__PURE__ */ new Map();
    const _children = /* @__PURE__ */ new Map();
    const _disabled = /* @__PURE__ */ new Set();
    const getValue = toValue(returnObject) ? (item) => toRaw(item.raw) : (item) => item.value;
    const stack = [...items.value];
    let i = 0;
    while (i < stack.length) {
      const item = stack[i++];
      const itemValue = getValue(item);
      if (item.children) {
        const childValues = [];
        for (const child of item.children) {
          const childValue = getValue(child);
          _parents.set(childValue, itemValue);
          childValues.push(childValue);
          stack.push(child);
        }
        _children.set(itemValue, childValues);
      }
      if (item.props.disabled) {
        _disabled.add(itemValue);
      }
    }
    children.value = _children;
    parents.value = _parents;
    disabled.value = _disabled;
  }
  const nested = {
    id: shallowRef(),
    root: {
      opened,
      activatable: toRef(() => props.activatable),
      scrollToActive: toRef(() => toValue(scrollToActive)),
      selectable: toRef(() => props.selectable),
      activated,
      selected,
      selectedValues: computed(() => {
        const arr = [];
        for (const [key, value] of selected.value.entries()) {
          if (value === "on") arr.push(key);
        }
        return arr;
      }),
      itemsRegistration: toRef(() => props.itemsRegistration),
      register: (id, parentId, isDisabled, isGroup) => {
        if (nodeIds.has(id)) {
          const path = getPath(id).map(String).join(" -> ");
          const newPath = getPath(parentId).concat(id).map(String).join(" -> ");
          consoleError(`Multiple nodes with the same ID
	${path}
	${newPath}`);
          return;
        } else {
          nodeIds.add(id);
        }
        parentId && id !== parentId && parents.value.set(id, parentId);
        isDisabled && disabled.value.add(id);
        isGroup && children.value.set(id, []);
        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id]);
        }
        itemsUpdatePropagation();
      },
      unregister: (id) => {
        nodeIds.delete(id);
        children.value.delete(id);
        disabled.value.delete(id);
        const parent = parents.value.get(id);
        if (parent) {
          const list = children.value.get(parent) ?? [];
          children.value.set(parent, list.filter((child) => child !== id));
        }
        parents.value.delete(id);
        itemsUpdatePropagation();
      },
      updateDisabled: (id, isDisabled) => {
        if (isDisabled) {
          disabled.value.add(id);
        } else {
          disabled.value.delete(id);
        }
      },
      open: (id, value, event) => {
        vm.emit("click:open", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newOpened = openStrategy.value.open({
          id,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      openOnSelect: (id, value, event) => {
        const newOpened = openStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      select: (id, value, event) => {
        vm.emit("click:select", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newSelected = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          disabled: disabled.value,
          event
        });
        newSelected && (selected.value = newSelected);
        nested.root.openOnSelect(id, value, event);
      },
      activate: (id, value, event) => {
        if (!props.activatable) {
          return nested.root.select(id, true, event);
        }
        vm.emit("click:activate", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newActivated = activeStrategy.value.activate({
          id,
          value,
          activated: new Set(activated.value),
          children: children.value,
          parents: parents.value,
          event
        });
        if (newActivated.size !== activated.value.size) {
          activated.value = newActivated;
        } else {
          for (const value2 of newActivated) {
            if (!activated.value.has(value2)) {
              activated.value = newActivated;
              return;
            }
          }
          for (const value2 of activated.value) {
            if (!newActivated.has(value2)) {
              activated.value = newActivated;
              return;
            }
          }
        }
      },
      children,
      parents,
      disabled,
      getPath
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
const useNestedItem = (id, isDisabled, isGroup) => {
  const parent = inject(VNestedSymbol, emptyNested);
  const uidSymbol = /* @__PURE__ */ Symbol("nested item");
  const computedId = computed(() => {
    const idValue = toRaw(toValue(id));
    return idValue !== void 0 ? idValue : uidSymbol;
  });
  const item = {
    ...parent,
    id: computedId,
    open: (open, e) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    activate: (activated, e) => parent.root.activate(computedId.value, activated, e),
    isActivated: computed(() => parent.root.activated.value.has(computedId.value)),
    scrollToActive: parent.root.scrollToActive,
    select: (selected, e) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === "on"),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === "indeterminate"),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator
  };
  watch(computedId, (val, oldVal) => {
    if (parent.isGroupActivator || parent.root.itemsRegistration.value === "props") return;
    parent.root.unregister(oldVal);
    nextTick(() => {
      parent.root.register(val, parent.id.value, toValue(isDisabled), isGroup);
    });
  });
  watch(() => toValue(isDisabled), (val) => {
    parent.root.updateDisabled(computedId.value, val);
  });
  isGroup && provide(VNestedSymbol, item);
  return item;
};
const useNestedGroupActivator = () => {
  const parent = inject(VNestedSymbol, emptyNested);
  provide(VNestedSymbol, {
    ...parent,
    isGroupActivator: true
  });
};
function useSsrBoot() {
  const isBooted = shallowRef(false);
  const ssrBootStyles = toRef(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}
const VListGroupActivator = defineComponent$1({
  name: "VListGroupActivator",
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    useNestedGroupActivator();
    return () => slots.default?.();
  }
});
const makeVListGroupProps = propsFactory({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  disabled: Boolean,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  rawId: [String, Number],
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListGroup");
const VListGroup = genericComponent()({
  name: "VListGroup",
  props: makeVListGroupProps(),
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open,
      id: _id
    } = useNestedItem(() => props.value, () => props.disabled, true);
    const id = computed(() => `v-list-group--id-${String(props.rawId ?? _id.value)}`);
    const list = useList();
    const {
      isBooted
    } = useSsrBoot();
    const parent = inject(VNestedSymbol);
    const renderWhenClosed = toRef(() => parent?.root?.itemsRegistration.value === "render");
    function onClick(e) {
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;
      open(!isOpen.value, e);
    }
    const activatorProps = computed(() => ({
      onClick,
      class: "v-list-group__header",
      id: id.value
    }));
    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    const activatorDefaults = computed(() => ({
      VListItem: {
        activeColor: props.activeColor,
        baseColor: props.baseColor,
        color: props.color,
        prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
        appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
        title: props.title,
        value: props.value
      }
    }));
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-list-group", {
        "v-list-group--prepend": list?.hasPrepend.value,
        "v-list-group--fluid": props.fluid,
        "v-list-group--subgroup": props.subgroup,
        "v-list-group--open": isOpen.value
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.activator && createVNode(VDefaultsProvider, {
        "defaults": activatorDefaults.value
      }, {
        default: () => [createVNode(VListGroupActivator, null, {
          default: () => [slots.activator({
            props: activatorProps.value,
            isOpen: isOpen.value
          })]
        })]
      }), createVNode(MaybeTransition, {
        "transition": {
          component: VExpandTransition
        },
        "disabled": !isBooted.value
      }, {
        default: () => [renderWhenClosed.value ? withDirectives(createElementVNode("div", {
          "class": "v-list-group__items",
          "role": "group",
          "aria-labelledby": id.value
        }, [slots.default?.()]), [[vShow, isOpen.value]]) : isOpen.value && createElementVNode("div", {
          "class": "v-list-group__items",
          "role": "group",
          "aria-labelledby": id.value
        }, [slots.default?.()])]
      })]
    }));
    return {
      isOpen
    };
  }
});
const makeVListItemSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListItemSubtitle");
const VListItemSubtitle = genericComponent()({
  name: "VListItemSubtitle",
  props: makeVListItemSubtitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-list-item-subtitle", props.class]),
      "style": normalizeStyle([{
        "--v-list-item-subtitle-opacity": props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});
const VListItemTitle = createSimpleFunctional("v-list-item-title");
const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  text: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAvatar");
const VAvatar = genericComponent()({
  name: "VAvatar",
  props: makeVAvatarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-avatar", {
        "v-avatar--start": props.start,
        "v-avatar--end": props.end
      }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class]),
      "style": normalizeStyle([colorStyles.value, sizeStyles.value, props.style])
    }, {
      default: () => [!slots.default ? props.image ? createVNode(VImg, {
        "key": "image",
        "src": props.image,
        "alt": "",
        "cover": true
      }, null) : props.icon ? createVNode(VIcon, {
        "key": "icon",
        "icon": props.icon
      }, null) : props.text : createVNode(VDefaultsProvider, {
        "key": "content-defaults",
        "defaults": {
          VImg: {
            cover: true,
            src: props.image
          },
          VIcon: {
            icon: props.icon
          }
        }
      }, {
        default: () => [slots.default()]
      }), genOverlays(false, "v-avatar")]
    }));
    return {};
  }
});
const makeVListItemProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  slim: Boolean,
  prependGap: [Number, String],
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  value: null,
  index: Number,
  tabindex: [Number, String],
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VListItem");
const VListItem = genericComponent()({
  name: "VListItem",
  directives: {
    vRipple: Ripple
  },
  props: makeVListItemProps(),
  emits: {
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const link = useLink(props, attrs);
    const rootEl = ref();
    const id = computed(() => props.value === void 0 ? link.href.value : props.value);
    const {
      activate,
      isActivated,
      select,
      isOpen,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect,
      scrollToActive,
      id: uid
    } = useNestedItem(id, () => props.disabled, false);
    const list = useList();
    const isActive = computed(() => props.active !== false && (props.active || link.isActive?.value || (root.activatable.value ? isActivated.value : isSelected.value)));
    const isLink = toRef(() => props.link !== false && link.isLink.value);
    const isSelectable = computed(() => !!list && (root.selectable.value || root.activatable.value || props.value != null));
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || isSelectable.value));
    const isTracked = computed(() => list && list.navigationStrategy.value === "track" && props.index !== void 0 && list.trackingIndex.value === props.index);
    const role = computed(() => list ? isLink.value ? "link" : isSelectable.value ? "option" : "listitem" : void 0);
    const ariaSelected = computed(() => {
      if (!isSelectable.value) return void 0;
      return root.activatable.value ? isActivated.value : root.selectable.value ? isSelected.value : isActive.value;
    });
    const roundedProps = toRef(() => props.rounded || props.nav);
    const color = toRef(() => props.color ?? props.activeColor);
    const variantProps = toRef(() => ({
      color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
      variant: props.variant
    }));
    watch(() => link.isActive?.value, (val) => {
      if (!val) return;
      handleActiveLink();
    });
    watch(isActivated, (val) => {
      if (!val || !scrollToActive) return;
      rootEl.value?.scrollIntoView({
        block: "nearest",
        behavior: "instant"
      });
    });
    watch(isTracked, (val) => {
      if (!val) return;
      rootEl.value?.scrollIntoView({
        block: "nearest",
        behavior: "instant"
      });
    });
    function handleActiveLink() {
      if (parent.value != null) {
        root.open(parent.value, true);
      }
      openOnSelect(true);
    }
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(roundedProps);
    const lineClasses = toRef(() => props.lines ? `v-list-item--${props.lines}-line` : void 0);
    const rippleOptions = toRef(() => props.ripple !== void 0 && !!props.ripple && list?.filterable ? {
      keys: ["Enter"]
    } : props.ripple);
    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isOpen: isOpen.value,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
      isDisabled: props.disabled
    }));
    function onClick(e) {
      emit("click", e);
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;
      if (!isClickable.value) return;
      link.navigate.value?.(e);
      if (isGroupActivator) return;
      if (root.activatable.value) {
        activate(!isActivated.value, e);
      } else if (root.selectable.value) {
        select(!isSelected.value, e);
      } else if (props.value != null && !isLink.value) {
        select(!isSelected.value, e);
      }
    }
    function onKeyDown(e) {
      const target = e.target;
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "Enter" || e.key === " " && !list?.filterable) {
        e.preventDefault();
        e.stopPropagation();
        e.target.dispatchEvent(new MouseEvent("click", e));
      }
    }
    useRender(() => {
      const Tag = isLink.value ? "a" : props.tag;
      const hasTitle = slots.title || props.title != null;
      const hasSubtitle = slots.subtitle || props.subtitle != null;
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      list?.updateHasPrepend(hasPrepend);
      if (props.activeColor) {
        deprecate("active-color", ["color", "base-color"]);
      }
      return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
        "ref": rootEl,
        "id": props.index !== void 0 && list ? `v-list-item-${list.uid}-${props.index}` : void 0,
        "class": ["v-list-item", {
          "v-list-item--active": isActive.value,
          "v-list-item--disabled": props.disabled,
          "v-list-item--link": isClickable.value,
          "v-list-item--nav": props.nav,
          "v-list-item--prepend": !hasPrepend && list?.hasPrepend.value,
          "v-list-item--slim": props.slim,
          "v-list-item--focus-visible": isTracked.value,
          [`${props.activeClass}`]: props.activeClass && isActive.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [{
          "--v-list-prepend-gap": convertToUnit(props.prependGap)
        }, colorStyles.value, dimensionStyles.value, props.style],
        "tabindex": props.tabindex ?? (isClickable.value ? list ? -2 : 0 : void 0),
        "aria-selected": ariaSelected.value,
        "role": role.value,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }), {
        default: () => [genOverlays(isClickable.value || isActive.value, "v-list-item"), hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-list-item__prepend"
        }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
          "key": "prepend-avatar",
          "density": props.density,
          "image": props.prependAvatar
        }, null), props.prependIcon && createVNode(VIcon, {
          "key": "prepend-icon",
          "density": props.density,
          "icon": props.prependIcon
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            },
            VListItemAction: {
              start: true
            },
            VCheckboxBtn: {
              density: props.density
            }
          }
        }, {
          default: () => [slots.prepend?.(slotProps.value)]
        }), createElementVNode("div", {
          "class": "v-list-item__spacer"
        }, null)]), createElementVNode("div", {
          "class": "v-list-item__content",
          "data-no-activator": ""
        }, [hasTitle && createVNode(VListItemTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.({
            title: props.title
          }) ?? toDisplayString(props.title)]
        }), hasSubtitle && createVNode(VListItemSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [slots.subtitle?.({
            subtitle: props.subtitle
          }) ?? toDisplayString(props.subtitle)]
        }), slots.default?.(slotProps.value)]), hasAppend && createElementVNode("div", {
          "key": "append",
          "class": "v-list-item__append"
        }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
          "key": "append-icon",
          "density": props.density,
          "icon": props.appendIcon
        }, null), props.appendAvatar && createVNode(VAvatar, {
          "key": "append-avatar",
          "density": props.density,
          "image": props.appendAvatar
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            },
            VListItemAction: {
              end: true
            },
            VCheckboxBtn: {
              density: props.density
            }
          }
        }, {
          default: () => [slots.append?.(slotProps.value)]
        }), createElementVNode("div", {
          "class": "v-list-item__spacer"
        }, null)])]
      }), [[Ripple, isClickable.value && rippleOptions.value]]);
    });
    return {
      activate,
      isActivated,
      isGroupActivator,
      isSelected,
      list,
      select,
      root,
      id: uid,
      link
    };
  }
});
const makeVListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListSubheader");
const VListSubheader = genericComponent()({
  name: "VListSubheader",
  props: makeVListSubheaderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => {
      const hasText = !!(slots.default || props.title);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-list-subheader", {
          "v-list-subheader--inset": props.inset,
          "v-list-subheader--sticky": props.sticky
        }, textColorClasses.value, props.class]),
        "style": normalizeStyle([{
          textColorStyles
        }, props.style])
      }, {
        default: () => [hasText && createElementVNode("div", {
          "class": "v-list-subheader__text"
        }, [slots.default?.() ?? props.title])]
      });
    });
    return {};
  }
});
const makeVListChildrenProps = propsFactory({
  items: Array,
  returnObject: Boolean
}, "VListChildren");
const VListChildren = genericComponent()({
  name: "VListChildren",
  props: makeVListChildrenProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    createList();
    return () => slots.default?.() ?? props.items?.map((_ref2, index) => {
      let {
        children,
        props: itemProps,
        type,
        raw: item
      } = _ref2;
      if (type === "divider") {
        return slots.divider?.({
          props: itemProps
        }) ?? createVNode(VDivider, itemProps, null);
      }
      if (type === "subheader") {
        return slots.subheader?.({
          props: itemProps
        }) ?? createVNode(VListSubheader, itemProps, null);
      }
      const slotsWithItem = {
        subtitle: slots.subtitle ? (slotProps) => slots.subtitle?.({
          ...slotProps,
          item
        }) : void 0,
        prepend: slots.prepend ? (slotProps) => slots.prepend?.({
          ...slotProps,
          item
        }) : void 0,
        append: slots.append ? (slotProps) => slots.append?.({
          ...slotProps,
          item
        }) : void 0,
        title: slots.title ? (slotProps) => slots.title?.({
          ...slotProps,
          item
        }) : void 0
      };
      const listGroupProps = VListGroup.filterProps(itemProps);
      return children ? createVNode(VListGroup, mergeProps(listGroupProps, {
        "value": props.returnObject ? item : itemProps?.value,
        "rawId": itemProps?.value
      }), {
        activator: (_ref3) => {
          let {
            props: activatorProps
          } = _ref3;
          const listItemProps = mergeProps(itemProps, activatorProps, {
            value: props.returnObject ? item : itemProps.value
          });
          return slots.header ? slots.header({
            props: listItemProps
          }) : createVNode(VListItem, mergeProps(listItemProps, {
            "index": index
          }), slotsWithItem);
        },
        default: () => createVNode(VListChildren, {
          "items": children,
          "returnObject": props.returnObject
        }, slots)
      }) : slots.item ? slots.item({
        props: {
          ...itemProps,
          index
        }
      }) : createVNode(VListItem, mergeProps(itemProps, {
        "index": index,
        "value": props.returnObject ? item : itemProps.value
      }), slotsWithItem);
    });
  }
});
const makeItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  itemType: {
    type: [Boolean, String, Array, Function],
    default: "type"
  },
  returnObject: Boolean,
  valueComparator: Function
}, "list-items");
const itemTypes = /* @__PURE__ */ new Set(["item", "divider", "subheader"]);
function transformItem(props, item) {
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
  const value = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemValue, void 0);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? omit(item, ["children"]) : getPropertyFromItem(item, props.itemProps);
  let type = getPropertyFromItem(item, props.itemType, "item");
  if (!itemTypes.has(type)) {
    type = "item";
  }
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === "item" && children ? transformItems(props, children) : void 0,
    raw: item
  };
}
function transformItems(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem(props, item));
  }
  return array;
}
function useListItems(props) {
  const items = computed(() => transformItems(props, props.items));
  return {
    items
  };
}
const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  filterable: Boolean,
  expandIcon: IconValue,
  collapseIcon: IconValue,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  prependGap: [Number, String],
  indent: [Number, String],
  nav: Boolean,
  navigationStrategy: {
    type: String,
    default: "focus"
  },
  navigationIndex: Number,
  "onClick:open": EventProp(),
  "onClick:select": EventProp(),
  "onUpdate:opened": EventProp(),
  ...makeNestedProps({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VList");
const VList = genericComponent()({
  name: "VList",
  props: makeVListProps(),
  emits: {
    "update:selected": (value) => true,
    "update:activated": (value) => true,
    "update:opened": (value) => true,
    "update:navigationIndex": (value) => true,
    "click:open": (value) => true,
    "click:activate": (value) => true,
    "click:select": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      items
    } = useListItems(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      children,
      open,
      parents,
      select,
      getPath
    } = useNested(props, {
      items,
      returnObject: toRef(() => props.returnObject),
      scrollToActive: toRef(() => props.navigationStrategy === "track")
    });
    const lineClasses = toRef(() => props.lines ? `v-list--${props.lines}-line` : void 0);
    const activeColor = toRef(() => props.activeColor);
    const baseColor = toRef(() => props.baseColor);
    const color = toRef(() => props.color);
    const isSelectable = toRef(() => props.selectable || props.activatable);
    const navigationIndex = useProxiedModel(props, "navigationIndex", -1, (v) => v ?? -1);
    const uid = useId();
    createList({
      filterable: props.filterable,
      trackingIndex: navigationIndex,
      navigationStrategy: toRef(() => props.navigationStrategy),
      uid
    });
    watch(items, () => {
      if (props.navigationStrategy === "track") {
        navigationIndex.value = -1;
      }
    });
    provideDefaults({
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(() => props.expandIcon),
        collapseIcon: toRef(() => props.collapseIcon)
      },
      VListItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor,
        baseColor,
        color,
        density: toRef(() => props.density),
        disabled: toRef(() => props.disabled),
        lines: toRef(() => props.lines),
        nav: toRef(() => props.nav),
        slim: toRef(() => props.slim),
        variant: toRef(() => props.variant),
        tabindex: toRef(() => props.navigationStrategy === "track" ? -1 : void 0)
      }
    });
    const isFocused = shallowRef(false);
    const contentRef = ref();
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      if (props.navigationStrategy === "track") {
        if (!~navigationIndex.value) {
          navigationIndex.value = getNextIndex("first");
        }
      } else if (!isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget))) focus();
    }
    function onBlur() {
      if (props.navigationStrategy === "track") {
        navigationIndex.value = -1;
      }
    }
    function getNavigationDirection(key) {
      switch (key) {
        case "ArrowDown":
          return "next";
        case "ArrowUp":
          return "prev";
        case "Home":
          return "first";
        case "End":
          return "last";
        default:
          return null;
      }
    }
    function getNextIndex(direction) {
      const itemCount = items.value.length;
      if (itemCount === 0) return -1;
      let nextIndex;
      if (direction === "first") {
        nextIndex = 0;
      } else if (direction === "last") {
        nextIndex = itemCount - 1;
      } else {
        nextIndex = navigationIndex.value + (direction === "next" ? 1 : -1);
        if (nextIndex < 0) nextIndex = itemCount - 1;
        if (nextIndex >= itemCount) nextIndex = 0;
      }
      const startIndex = nextIndex;
      let attempts = 0;
      while (attempts < itemCount) {
        const item = items.value[nextIndex];
        if (item && item.type !== "divider" && item.type !== "subheader") {
          return nextIndex;
        }
        nextIndex += direction === "next" || direction === "first" ? 1 : -1;
        if (nextIndex < 0) nextIndex = itemCount - 1;
        if (nextIndex >= itemCount) nextIndex = 0;
        if (nextIndex === startIndex) return -1;
        attempts++;
      }
      return -1;
    }
    function onKeydown2(e) {
      const target = e.target;
      if (!contentRef.value || target.tagName === "INPUT" && ["Home", "End"].includes(e.key) || target.tagName === "TEXTAREA") {
        return;
      }
      const direction = getNavigationDirection(e.key);
      if (direction !== null) {
        e.preventDefault();
        if (props.navigationStrategy === "track") {
          const nextIndex = getNextIndex(direction);
          if (nextIndex !== -1) {
            navigationIndex.value = nextIndex;
          }
        } else {
          focus(direction);
        }
      }
    }
    function onMousedown(e) {
      isFocused.value = true;
    }
    function focus(location) {
      if (contentRef.value) {
        return focusChild(contentRef.value, location);
      }
    }
    useRender(() => {
      const ariaMultiselectable = isSelectable.value ? attrs.ariaMultiselectable ?? !String(props.selectStrategy).startsWith("single-") : void 0;
      return createVNode(props.tag, {
        "ref": contentRef,
        "class": normalizeClass(["v-list", {
          "v-list--disabled": props.disabled,
          "v-list--nav": props.nav,
          "v-list--slim": props.slim
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle([{
          "--v-list-indent": convertToUnit(props.indent),
          "--v-list-prepend-gap": convertToUnit(props.prependGap)
        }, backgroundColorStyles.value, dimensionStyles.value, props.style]),
        "tabindex": props.disabled ? -1 : 0,
        "role": isSelectable.value ? "listbox" : "list",
        "aria-activedescendant": props.navigationStrategy === "track" && navigationIndex.value >= 0 ? `v-list-item-${uid}-${navigationIndex.value}` : void 0,
        "aria-multiselectable": ariaMultiselectable,
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "onKeydown": onKeydown2,
        "onMousedown": onMousedown
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value,
          "returnObject": props.returnObject
        }, slots)]
      });
    });
    return {
      open,
      select,
      focus,
      children,
      parents,
      getPath,
      navigationIndex
    };
  }
});
function elementToViewport(point, offset) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y
  };
}
function getOffset(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}
function anchorToPoint(anchor, box) {
  if (anchor.side === "top" || anchor.side === "bottom") {
    const {
      side,
      align
    } = anchor;
    const x = align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align;
    const y = side === "top" ? 0 : side === "bottom" ? box.height : side;
    return elementToViewport({
      x,
      y
    }, box);
  } else if (anchor.side === "left" || anchor.side === "right") {
    const {
      side,
      align
    } = anchor;
    const x = side === "left" ? 0 : side === "right" ? box.width : side;
    const y = align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align;
    return elementToViewport({
      x,
      y
    }, box);
  }
  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2
  }, box);
}
const locationStrategies = {
  static: staticLocationStrategy,
  // specific viewport position, usually centered
  connected: connectedLocationStrategy
  // connected to a certain element
};
const makeLocationStrategyProps = propsFactory({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (val) => typeof val === "function" || val in locationStrategies
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array],
  stickToTarget: Boolean,
  viewportMargin: {
    type: [Number, String],
    default: 12
  }
}, "VOverlay-location-strategies");
function useLocationStrategies(props, data) {
  const contentStyles = ref({});
  const updateLocation = ref();
  return {
    contentStyles,
    updateLocation
  };
}
function staticLocationStrategy() {
}
function getIntrinsicSize(el, isRtl) {
  const contentBox = nullifyTransforms(el);
  if (isRtl) {
    contentBox.x += parseFloat(el.style.right || 0);
  } else {
    contentBox.x -= parseFloat(el.style.left || 0);
  }
  contentBox.y -= parseFloat(el.style.top || 0);
  return contentBox;
}
function connectedLocationStrategy(data, props, contentStyles) {
  const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value);
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: "fixed",
      top: 0,
      [data.isRtl.value ? "right" : "left"]: 0
    });
  }
  const {
    preferredAnchor,
    preferredOrigin
  } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
    const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin)
      };
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin
      };
    }
  });
  const [minWidth, minHeight, maxWidth, maxHeight] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((key) => {
    return computed(() => {
      const val = parseFloat(props[key]);
      return isNaN(val) ? Infinity : val;
    });
  });
  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset;
    }
    if (typeof props.offset === "string") {
      const offset2 = props.offset.split(" ").map(parseFloat);
      if (offset2.length < 2) offset2.push(0);
      return offset2;
    }
    return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
  });
  let observe = false;
  let lastFrame = -1;
  const flipped = new CircularBuffer(4);
  const observer = new ResizeObserver(() => {
    if (!observe) return;
    requestAnimationFrame((newTime) => {
      if (newTime !== lastFrame) flipped.clear();
      requestAnimationFrame((newNewTime) => {
        lastFrame = newNewTime;
      });
    });
    if (flipped.isFull) {
      const values = flipped.values();
      if (deepEqual(values.at(-1), values.at(-3)) && !deepEqual(values.at(-1), values.at(-2))) {
        return;
      }
    }
    const result = updateLocation();
    if (result) flipped.push(result.flipped);
  });
  let targetBox = new Box({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  watch(data.target, (newTarget, oldTarget) => {
    if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget);
    if (!Array.isArray(newTarget)) {
      if (newTarget) observer.observe(newTarget);
    } else if (!deepEqual(newTarget, oldTarget)) {
      updateLocation();
    }
  }, {
    immediate: true
  });
  watch(data.contentEl, (newContentEl, oldContentEl) => {
    if (oldContentEl) observer.unobserve(oldContentEl);
    if (newContentEl) observer.observe(newContentEl);
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    observer.disconnect();
  });
  function updateLocation() {
    observe = false;
    requestAnimationFrame(() => observe = true);
    if (!data.target.value || !data.contentEl.value) return;
    if (Array.isArray(data.target.value) || data.target.value.offsetParent || data.target.value.getClientRects().length) {
      targetBox = getTargetBox(data.target.value);
    }
    const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
    const scrollParents = getScrollParents(data.contentEl.value);
    const viewportMargin = Number(props.viewportMargin);
    if (!scrollParents.length) {
      scrollParents.push((void 0).documentElement);
      if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
        contentBox.x -= parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
        contentBox.y -= parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
      }
    }
    const viewport = scrollParents.reduce((box, el) => {
      const scrollBox = getElementBox(el);
      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
        });
      }
      return scrollBox;
    }, void 0);
    if (props.stickToTarget) {
      viewport.x += Math.min(viewportMargin, targetBox.x);
      viewport.y += Math.min(viewportMargin, targetBox.y);
      viewport.width = Math.max(viewport.width - viewportMargin * 2, targetBox.x + targetBox.width - viewportMargin);
      viewport.height = Math.max(viewport.height - viewportMargin * 2, targetBox.y + targetBox.height - viewportMargin);
    } else {
      viewport.x += viewportMargin;
      viewport.y += viewportMargin;
      viewport.width -= viewportMargin * 2;
      viewport.height -= viewportMargin * 2;
    }
    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value
    };
    function checkOverflow(_placement) {
      const box = new Box(contentBox);
      const targetPoint = anchorToPoint(_placement.anchor, targetBox);
      const contentPoint = anchorToPoint(_placement.origin, box);
      let {
        x: x2,
        y: y2
      } = getOffset(targetPoint, contentPoint);
      switch (_placement.anchor.side) {
        case "top":
          y2 -= offset.value[0];
          break;
        case "bottom":
          y2 += offset.value[0];
          break;
        case "left":
          x2 -= offset.value[0];
          break;
        case "right":
          x2 += offset.value[0];
          break;
      }
      switch (_placement.anchor.align) {
        case "top":
          y2 -= offset.value[1];
          break;
        case "bottom":
          y2 += offset.value[1];
          break;
        case "left":
          x2 -= offset.value[1];
          break;
        case "right":
          x2 += offset.value[1];
          break;
      }
      box.x += x2;
      box.y += y2;
      box.width = Math.min(box.width, maxWidth.value);
      box.height = Math.min(box.height, maxHeight.value);
      const overflows = getOverflow(box, viewport);
      return {
        overflows,
        x: x2,
        y: y2
      };
    }
    let x = 0;
    let y = 0;
    const available = {
      x: 0,
      y: 0
    };
    const flipped2 = {
      x: false,
      y: false
    };
    let resets = -1;
    while (true) {
      if (resets++ > 10) {
        consoleError("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: _x,
        y: _y,
        overflows
      } = checkOverflow(placement);
      x += _x;
      y += _y;
      contentBox.x += _x;
      contentBox.y += _y;
      {
        const axis2 = getAxis(placement.anchor);
        const hasOverflowX = overflows.x.before || overflows.x.after;
        const hasOverflowY = overflows.y.before || overflows.y.after;
        let reset = false;
        ["x", "y"].forEach((key) => {
          if (key === "x" && hasOverflowX && !flipped2.x || key === "y" && hasOverflowY && !flipped2.y) {
            const newPlacement = {
              anchor: {
                ...placement.anchor
              },
              origin: {
                ...placement.origin
              }
            };
            const flip = key === "x" ? axis2 === "y" ? flipAlign : flipSide : axis2 === "y" ? flipSide : flipAlign;
            newPlacement.anchor = flip(newPlacement.anchor);
            newPlacement.origin = flip(newPlacement.origin);
            const {
              overflows: newOverflows
            } = checkOverflow(newPlacement);
            if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
              placement = newPlacement;
              reset = flipped2[key] = true;
            }
          }
        });
        if (reset) continue;
      }
      if (overflows.x.before) {
        x += overflows.x.before;
        contentBox.x += overflows.x.before;
      }
      if (overflows.x.after) {
        x -= overflows.x.after;
        contentBox.x -= overflows.x.after;
      }
      if (overflows.y.before) {
        y += overflows.y.before;
        contentBox.y += overflows.y.before;
      }
      if (overflows.y.after) {
        y -= overflows.y.after;
        contentBox.y -= overflows.y.after;
      }
      {
        const overflows2 = getOverflow(contentBox, viewport);
        available.x = viewport.width - overflows2.x.before - overflows2.x.after;
        available.y = viewport.height - overflows2.y.before - overflows2.y.after;
        x += overflows2.x.before;
        contentBox.x += overflows2.x.before;
        y += overflows2.y.before;
        contentBox.y += overflows2.y.before;
      }
      break;
    }
    const axis = getAxis(placement.anchor);
    Object.assign(contentStyles.value, {
      "--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: data.isRtl.value ? void 0 : convertToUnit(pixelRound(x)),
      right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : void 0,
      minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
    });
    return {
      available,
      contentBox,
      flipped: flipped2
    };
  }
  watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
  nextTick(() => {
    const result = updateLocation();
    if (!result) return;
    const {
      available,
      contentBox
    } = result;
    if (contentBox.height > available.y) {
      requestAnimationFrame(() => {
        updateLocation();
        requestAnimationFrame(() => {
          updateLocation();
        });
      });
    }
  });
  return {
    updateLocation
  };
}
function pixelRound(val) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}
let clean = true;
const frames = [];
function requestNewFrame(cb) {
  if (!clean || frames.length) {
    frames.push(cb);
    run();
  } else {
    clean = false;
    cb();
    run();
  }
}
let raf = -1;
function run() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const frame = frames.shift();
    if (frame) frame();
    if (frames.length) run();
    else clean = true;
  });
}
const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy
};
const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (val) => typeof val === "function" || val in scrollStrategies
  }
}, "VOverlay-scroll-strategies");
function closeScrollStrategy(data) {
  function onScroll(e) {
    data.isActive.value = false;
  }
  bindScroll(getTargetEl(data.target.value, data.contentEl.value), onScroll);
}
function blockScrollStrategy(data, props) {
  const offsetParent = data.root.value?.offsetParent;
  const target = getTargetEl(data.target.value, data.contentEl.value);
  const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(target, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
  const scrollbarWidth = (void 0).innerWidth - (void 0).documentElement.offsetWidth;
  const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || (void 0).documentElement);
  if (scrollableParent) {
    data.root.value.classList.add("v-overlay--scroll-blocked");
  }
  scrollElements.forEach((el, i) => {
    el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
    el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
    if (el !== (void 0).documentElement) {
      el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
    }
    el.classList.add("v-overlay-scroll-blocked");
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
      const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
      const scrollBehavior = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.style.removeProperty("--v-body-scroll-x");
      el.style.removeProperty("--v-body-scroll-y");
      el.style.removeProperty("--v-scrollbar-offset");
      el.classList.remove("v-overlay-scroll-blocked");
      el.scrollLeft = -x;
      el.scrollTop = -y;
      el.style.scrollBehavior = scrollBehavior;
    });
    if (scrollableParent) {
      data.root.value.classList.remove("v-overlay--scroll-blocked");
    }
  });
}
function repositionScrollStrategy(data, props, scope) {
  let slow = false;
  let raf2 = -1;
  let ric = -1;
  function update(e) {
    requestNewFrame(() => {
      const start = performance.now();
      data.updateLocation.value?.(e);
      const time = performance.now() - start;
      slow = time / (1e3 / 60) > 2;
    });
  }
  ric = (typeof requestIdleCallback === "undefined" ? (cb) => cb() : requestIdleCallback)(() => {
    scope.run(() => {
      bindScroll(getTargetEl(data.target.value, data.contentEl.value), (e) => {
        if (slow) {
          cancelAnimationFrame(raf2);
          raf2 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              update(e);
            });
          });
        } else {
          update(e);
        }
      });
    });
  });
  onScopeDispose(() => {
    typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(ric);
    cancelAnimationFrame(raf2);
  });
}
function getTargetEl(target, contentEl) {
  return Array.isArray(target) ? (void 0).elementsFromPoint(...target).find((el) => !contentEl?.contains(el)) : target ?? contentEl;
}
function bindScroll(el, onScroll) {
  const scrollElements = [void 0, ...getScrollParents(el)];
  scrollElements.forEach((el2) => {
    el2.addEventListener("scroll", onScroll, {
      passive: true
    });
  });
  onScopeDispose(() => {
    scrollElements.forEach((el2) => {
      el2.removeEventListener("scroll", onScroll);
    });
  });
}
const VMenuSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-menu");
const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function useDelay(props, cb) {
  let clearDelay = () => {
  };
  function runDelay(isOpening, options) {
    clearDelay?.();
    const delay = isOpening ? props.openDelay : props.closeDelay;
    const normalizedDelay = Math.max(options?.minDelay ?? 0, Number(delay ?? 0));
    return new Promise((resolve) => {
      clearDelay = defer(normalizedDelay, () => {
        cb?.(isOpening);
        resolve(isOpening);
      });
    });
  }
  function runOpenDelay() {
    return runDelay(true);
  }
  function runCloseDelay(options) {
    return runDelay(false, options);
  }
  return {
    clearDelay,
    runOpenDelay,
    runCloseDelay
  };
}
const makeActivatorProps = propsFactory({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...makeDelayProps()
}, "VOverlay-activator");
function useActivator(props, _ref) {
  let {
    isActive,
    isTop,
    contentEl
  } = _ref;
  const vm = getCurrentInstance("useActivator");
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  let firstEnter = true;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, (value) => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
      if (isActive.value !== value) {
        firstEnter = true;
      }
      isActive.value = value;
    }
  });
  const cursorTarget = ref();
  const availableEvents = {
    onClick: (e) => {
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      if (!isActive.value) {
        cursorTarget.value = [e.clientX, e.clientY];
      }
      isActive.value = !isActive.value;
    },
    onMouseenter: (e) => {
      isHovered = true;
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onMouseleave: (e) => {
      isHovered = false;
      runCloseDelay();
    },
    onFocus: (e) => {
      if (matchesSelector(e.target) === false) return;
      isFocused = true;
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onBlur: (e) => {
      isFocused = false;
      e.stopPropagation();
      runCloseDelay({
        minDelay: 1
      });
    }
  };
  const activatorEvents = computed(() => {
    const events = {};
    if (openOnClick.value) {
      events.onClick = availableEvents.onClick;
    }
    if (props.openOnHover) {
      events.onMouseenter = availableEvents.onMouseenter;
      events.onMouseleave = availableEvents.onMouseleave;
    }
    if (openOnFocus.value) {
      events.onFocus = availableEvents.onFocus;
      events.onBlur = availableEvents.onBlur;
    }
    return events;
  });
  const contentEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        isHovered = true;
        runOpenDelay();
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    if (openOnFocus.value) {
      events.onFocusin = (e) => {
        if (!e.target.matches(":focus-visible")) return;
        isFocused = true;
        runOpenDelay();
      };
      events.onFocusout = () => {
        isFocused = false;
        runCloseDelay({
          minDelay: 1
        });
      };
    }
    if (props.closeOnContentClick) {
      const menu = inject(VMenuSymbol, null);
      events.onClick = () => {
        isActive.value = false;
        menu?.closeParents();
      };
    }
    return events;
  });
  const scrimEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        if (firstEnter) {
          isHovered = true;
          firstEnter = false;
          runOpenDelay();
        }
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    return events;
  });
  watch(isTop, (val) => {
    if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered)) && !contentEl.value?.contains((void 0).activeElement)) {
      isActive.value = false;
    }
  });
  watch(isActive, (val) => {
    if (!val) {
      setTimeout(() => {
        cursorTarget.value = void 0;
      });
    }
  }, {
    flush: "post"
  });
  const activatorRef = templateRef();
  watchEffect(() => {
    if (!activatorRef.value) return;
    nextTick(() => {
      activatorEl.value = activatorRef.el;
    });
  });
  const targetRef = templateRef();
  const target = computed(() => {
    if (props.target === "cursor" && cursorTarget.value) return cursorTarget.value;
    if (targetRef.value) return targetRef.el;
    return getTarget(props.target, vm) || activatorEl.value;
  });
  const targetEl = computed(() => {
    return Array.isArray(target.value) ? void 0 : target.value;
  });
  watch(() => !!props.activator, (val) => {
  }, {
    flush: "post",
    immediate: true
  });
  onScopeDispose(() => {
  });
  return {
    activatorEl,
    activatorRef,
    target,
    targetEl,
    targetRef,
    activatorEvents,
    contentEvents,
    scrimEvents
  };
}
function getTarget(selector, vm) {
  if (!selector) return;
  let target;
  if (selector === "parent") {
    let el = vm?.proxy?.$el?.parentNode;
    while (el?.hasAttribute("data-no-activator")) {
      el = el.parentNode;
    }
    target = el;
  } else if (typeof selector === "string") {
    target = (void 0).querySelector(selector);
  } else if ("$el" in selector) {
    target = selector.$el;
  } else {
    target = selector;
  }
  return target;
}
const makeFocusTrapProps = propsFactory({
  retainFocus: Boolean,
  captureFocus: Boolean,
  /** @deprecated */
  disableInitialFocus: Boolean
}, "focusTrap");
const registry = /* @__PURE__ */ new Map();
let subscribers = 0;
function onKeydown(e) {
  const activeElement = (void 0).activeElement;
  if (e.key !== "Tab" || !activeElement) return;
  const parentTraps = Array.from(registry.values()).filter((_ref) => {
    let {
      isActive,
      contentEl
    } = _ref;
    return isActive.value && contentEl.value?.contains(activeElement);
  }).map((x) => x.contentEl.value);
  let closestTrap;
  let currentParent = activeElement.parentElement;
  while (currentParent) {
    if (parentTraps.includes(currentParent)) {
      closestTrap = currentParent;
      break;
    }
    currentParent = currentParent.parentElement;
  }
  if (!closestTrap) return;
  const focusable = focusableChildren(closestTrap).filter((x) => x.tabIndex >= 0);
  if (!focusable.length) return;
  const active = (void 0).activeElement;
  if (focusable.length === 1 && focusable[0].classList.contains("v-list") && focusable[0].contains(active)) {
    e.preventDefault();
    return;
  }
  const firstElement = focusable[0];
  const lastElement = focusable[focusable.length - 1];
  if (e.shiftKey && (active === firstElement || firstElement.classList.contains("v-list") && firstElement.contains(active))) {
    e.preventDefault();
    lastElement.focus();
  }
  if (!e.shiftKey && (active === lastElement || lastElement.classList.contains("v-list") && lastElement.contains(active))) {
    e.preventDefault();
    firstElement.focus();
  }
}
function useFocusTrap(props, _ref2) {
  let {
    isActive,
    localTop,
    contentEl
  } = _ref2;
  const trapId = /* @__PURE__ */ Symbol("trap");
  let focusTrapSuppressed = false;
  let focusTrapSuppressionTimeout = -1;
  async function onPointerdown() {
    focusTrapSuppressed = true;
    focusTrapSuppressionTimeout = (void 0).setTimeout(() => {
      focusTrapSuppressed = false;
    }, 100);
  }
  async function captureOnFocus(e) {
    const before = e.relatedTarget;
    const after = e.target;
    (void 0).removeEventListener("pointerdown", onPointerdown);
    (void 0).removeEventListener("keydown", captureOnKeydown);
    await nextTick();
    if (isActive.value && !focusTrapSuppressed && before !== after && contentEl.value && // We're the menu without open submenus or overlays
    toValue(localTop) && // It isn't the document or the container body
    ![void 0, contentEl.value].includes(after) && // It isn't inside the container body
    !contentEl.value.contains(after)) {
      const focusable = focusableChildren(contentEl.value);
      focusable[0]?.focus();
    }
  }
  function captureOnKeydown(e) {
    if (e.key !== "Tab") return;
    (void 0).removeEventListener("keydown", captureOnKeydown);
    if (isActive.value && contentEl.value && e.target && !contentEl.value.contains(e.target)) {
      const allFocusableElements = focusableChildren((void 0).documentElement);
      if (e.shiftKey && e.target === allFocusableElements.at(0) || !e.shiftKey && e.target === allFocusableElements.at(-1)) {
        const focusable = focusableChildren(contentEl.value);
        if (focusable.length > 0) {
          e.preventDefault();
          focusable[0].focus();
        }
      }
    }
  }
  toRef(() => isActive.value && props.captureFocus && !props.disableInitialFocus);
  onScopeDispose(() => {
    registry.delete(trapId);
    clearTimeout(focusTrapSuppressionTimeout);
    (void 0).removeEventListener("pointerdown", onPointerdown);
    (void 0).removeEventListener("focusin", captureOnFocus);
    (void 0).removeEventListener("keydown", captureOnKeydown);
    if (--subscribers < 1) {
      (void 0).removeEventListener("keydown", onKeydown);
    }
  });
}
function useHydration() {
  return shallowRef(false);
}
const makeLazyProps = propsFactory({
  eager: Boolean
}, "lazy");
function useLazy(props, active) {
  const isBooted = shallowRef(false);
  const hasContent = toRef(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);
  function onAfterLeave() {
    if (!props.eager) isBooted.value = false;
  }
  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}
function useScopeId() {
  const vm = getCurrentInstance("useScopeId");
  const scopeId = vm.vnode.scopeId;
  return {
    scopeId: scopeId ? {
      [scopeId]: ""
    } : void 0
  };
}
const StackSymbol = /* @__PURE__ */ Symbol.for("vuetify:stack");
const globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
  const vm = getCurrentInstance("useStack");
  const createStackEntry = !disableGlobalStack;
  const parent = inject(StackSymbol, void 0);
  const stack = reactive({
    activeChildren: /* @__PURE__ */ new Set()
  });
  provide(StackSymbol, stack);
  const _zIndex = shallowRef(Number(toValue(zIndex)));
  useToggleScope(isActive, () => {
    const lastZIndex = globalStack.at(-1)?.[1];
    _zIndex.value = lastZIndex ? lastZIndex + 10 : Number(toValue(zIndex));
    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value]);
    }
    parent?.activeChildren.add(vm.uid);
    onScopeDispose(() => {
      if (createStackEntry) {
        const idx = toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
        globalStack.splice(idx, 1);
      }
      parent?.activeChildren.delete(vm.uid);
    });
  });
  const globalTop = shallowRef(true);
  if (createStackEntry) {
    watchEffect(() => {
      const _isTop = globalStack.at(-1)?.[0] === vm.uid;
      setTimeout(() => globalTop.value = _isTop);
    });
  }
  const localTop = toRef(() => !stack.activeChildren.size);
  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: toRef(() => ({
      zIndex: _zIndex.value
    }))
  };
}
function useTeleport(target) {
  const teleportTarget = computed(() => {
    target();
    return void 0;
  });
  return {
    teleportTarget
  };
}
function defaultConditional() {
  return true;
}
function checkEvent(e, el, binding) {
  if (!e || checkIsActive(e, binding) === false) return false;
  const root = attachedRoot(el);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target) return false;
  const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
  elements.push(el);
  return !elements.some((el2) => el2?.contains(e.target));
}
function checkIsActive(e, binding) {
  const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}
function directive(e, el, binding) {
  const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
  e.shadowTarget = e.target;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}
function handleShadow(el, callback) {
  const root = attachedRoot(el);
  callback(void 0);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = (e) => directive(e, el, binding);
    const onMousedown = (e) => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };
    handleShadow(el, (app) => {
      app.addEventListener("click", onClick, true);
      app.addEventListener("mousedown", onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: false
      };
    }
    el._clickOutside[binding.instance.$.uid] = {
      onClick,
      onMousedown
    };
  },
  beforeUnmount(el, binding) {
    if (!el._clickOutside) return;
    handleShadow(el, (app) => {
      if (!app || !el._clickOutside?.[binding.instance.$.uid]) return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[binding.instance.$.uid];
      app.removeEventListener("click", onClick, true);
      app.removeEventListener("mousedown", onMousedown, true);
    });
    delete el._clickOutside[binding.instance.$.uid];
  }
};
function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && createElementVNode("div", mergeProps({
      "class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}
const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: true
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeFocusTrapProps(),
  ...makeThemeProps(),
  ...makeTransitionProps$1()
}, "VOverlay");
const VOverlay = genericComponent()({
  name: "VOverlay",
  directives: {
    vClickOutside: ClickOutside
  },
  inheritAttrs: false,
  props: {
    _disableGlobalStack: Boolean,
    ...omit(makeVOverlayProps(), ["disableInitialFocus"])
  },
  emits: {
    "click:outside": (e) => true,
    "update:modelValue": (value) => true,
    keydown: (e) => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const vm = getCurrentInstance("VOverlay");
    const root = ref();
    const scrimEl = ref();
    const contentEl = ref();
    const model = useProxiedModel(props, "modelValue");
    const isActive = computed({
      get: () => model.value,
      set: (v) => {
        if (!(v && props.disabled)) model.value = v;
      }
    });
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const {
      hasContent,
      onAfterLeave: _onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    });
    const {
      globalTop,
      localTop,
      stackStyles
    } = useStack(isActive, () => props.zIndex, props._disableGlobalStack);
    const {
      activatorEl,
      activatorRef,
      target,
      targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    } = useActivator(props, {
      isActive,
      isTop: localTop,
      contentEl
    });
    const {
      teleportTarget
    } = useTeleport(() => {
      const target2 = props.attach || props.contained;
      if (target2) return target2;
      const rootNode = activatorEl?.value?.getRootNode() || vm.proxy?.$el?.getRootNode();
      if (rootNode instanceof ShadowRoot) return rootNode;
      return false;
    });
    const {
      dimensionStyles
    } = useDimension(props);
    const isMounted = useHydration();
    const {
      scopeId
    } = useScopeId();
    watch(() => props.disabled, (v) => {
      if (v) isActive.value = false;
    });
    const {
      contentStyles,
      updateLocation
    } = useLocationStrategies();
    function onClickOutside(e) {
      emit("click:outside", e);
      if (!props.persistent) isActive.value = false;
      else animateClick();
    }
    function closeConditional(e) {
      return isActive.value && localTop.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!props.scrim || e.target === scrimEl.value || e instanceof MouseEvent && e.shadowTarget === scrimEl.value);
    }
    useFocusTrap(props, {
      isActive,
      localTop,
      contentEl
    });
    function onKeydownSelf(e) {
      if (e.key === "Escape" && !globalTop.value) return;
      emit("keydown", e);
    }
    useRouter();
    useToggleScope(() => props.closeOnBack, () => {
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== (void 0).scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });
    function animateClick() {
      if (props.noClickAnimation) return;
      contentEl.value && animate(contentEl.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: standardEasing
      });
    }
    function onAfterEnter() {
      emit("afterEnter");
    }
    function onAfterLeave() {
      _onAfterLeave();
      emit("afterLeave");
    }
    useRender(() => createElementVNode(Fragment, null, [slots.activator?.({
      isActive: isActive.value,
      targetRef,
      props: mergeProps({
        ref: activatorRef
      }, activatorEvents.value, props.activatorProps)
    }), isMounted.value && hasContent.value && createVNode(Teleport, {
      "disabled": !teleportTarget.value,
      "to": teleportTarget.value
    }, {
      default: () => [createElementVNode("div", mergeProps({
        "class": ["v-overlay", {
          "v-overlay--absolute": props.absolute || props.contained,
          "v-overlay--active": isActive.value,
          "v-overlay--contained": props.contained
        }, themeClasses.value, rtlClasses.value, props.class],
        "style": [stackStyles.value, {
          "--v-overlay-opacity": props.opacity,
          top: convertToUnit(top.value)
        }, props.style],
        "ref": root,
        "onKeydown": onKeydownSelf
      }, scopeId, attrs), [createVNode(Scrim, mergeProps({
        "color": scrimColor,
        "modelValue": isActive.value && !!props.scrim,
        "ref": scrimEl
      }, scrimEvents.value), null), createVNode(MaybeTransition, {
        "appear": true,
        "persisted": true,
        "transition": props.transition,
        "target": target.value,
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [withDirectives(createElementVNode("div", mergeProps({
          "ref": contentEl,
          "class": ["v-overlay__content", props.contentClass],
          "style": [dimensionStyles.value, contentStyles.value]
        }, contentEvents.value, props.contentProps), [slots.default?.({
          isActive
        })]), [[vShow, isActive.value], [ClickOutside, {
          handler: onClickOutside,
          closeConditional,
          include: () => [activatorEl.value]
        }]])]
      })])]
    })]));
    return {
      activatorEl,
      scrimEl,
      target,
      animateClick,
      contentEl,
      rootEl: root,
      globalTop,
      localTop,
      updateLocation
    };
  }
});
const Refs = /* @__PURE__ */ Symbol("Forwarded refs");
function getDescriptor(obj, key) {
  let currentObj = obj;
  while (currentObj) {
    const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
    if (descriptor) return descriptor;
    currentObj = Object.getPrototypeOf(currentObj);
  }
  return void 0;
}
function forwardRefs(target) {
  for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    refs[_key - 1] = arguments[_key];
  }
  target[Refs] = refs;
  return new Proxy(target, {
    get(target2, key) {
      if (Reflect.has(target2, key)) {
        return Reflect.get(target2, key);
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          const val = Reflect.get(ref2.value, key);
          return typeof val === "function" ? val.bind(ref2.value) : val;
        }
      }
    },
    has(target2, key) {
      if (Reflect.has(target2, key)) {
        return true;
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return false;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          return true;
        }
      }
      return false;
    },
    set(target2, key, value) {
      if (Reflect.has(target2, key)) {
        return Reflect.set(target2, key, value);
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return false;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          return Reflect.set(ref2.value, key, value);
        }
      }
      return false;
    },
    getOwnPropertyDescriptor(target2, key) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target2, key);
      if (descriptor) return descriptor;
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return;
      for (const ref2 of refs) {
        if (!ref2.value) continue;
        const descriptor2 = getDescriptor(ref2.value, key) ?? ("_" in ref2.value ? getDescriptor(ref2.value._?.setupState, key) : void 0);
        if (descriptor2) return descriptor2;
      }
      for (const ref2 of refs) {
        const childRefs = ref2.value && ref2.value[Refs];
        if (!childRefs) continue;
        const queue = childRefs.slice();
        while (queue.length) {
          const ref3 = queue.shift();
          const descriptor2 = getDescriptor(ref3.value, key);
          if (descriptor2) return descriptor2;
          const childRefs2 = ref3.value && ref3.value[Refs];
          if (childRefs2) queue.push(...childRefs2);
        }
      }
      return void 0;
    }
  });
}
const makeVMenuProps = propsFactory({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...omit(makeVOverlayProps({
    captureFocus: true,
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: false,
    scrollStrategy: "reposition",
    transition: {
      component: VDialogTransition
    }
  }), ["absolute"])
}, "VMenu");
const VMenu = genericComponent()({
  name: "VMenu",
  props: makeVMenuProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const {
      isRtl
    } = useRtl();
    const uid = useId();
    const id = toRef(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject(VMenuSymbol, null);
    const openChildren = shallowRef(/* @__PURE__ */ new Set());
    provide(VMenuSymbol, {
      register() {
        openChildren.value.add(uid);
      },
      unregister() {
        openChildren.value.delete(uid);
      },
      closeParents(e) {
        setTimeout(() => {
          if (!openChildren.value.size && !props.persistent && (e == null || overlay.value?.contentEl && !isClickInsideElement(e, overlay.value.contentEl))) {
            isActive.value = false;
            parent?.closeParents();
          }
        }, 40);
      }
    });
    watch(isActive, (val) => {
      val ? parent?.register() : parent?.unregister();
    }, {
      immediate: true
    });
    function onClickOutside(e) {
      parent?.closeParents(e);
    }
    function onKeydown2(e) {
      if (props.disabled) return;
      if (e.key === "Tab" || e.key === "Enter" && !props.closeOnContentClick) {
        if (e.key === "Enter" && (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement && !!e.target.closest("form"))) return;
        if (e.key === "Enter") e.preventDefault();
        const nextElement = getNextElement(focusableChildren(overlay.value?.contentEl, false), e.shiftKey ? "prev" : "next", (el) => el.tabIndex >= 0);
        if (!nextElement && !props.retainFocus) {
          isActive.value = false;
          overlay.value?.activatorEl?.focus();
        }
      } else if (props.submenu && e.key === (isRtl.value ? "ArrowRight" : "ArrowLeft")) {
        isActive.value = false;
        overlay.value?.activatorEl?.focus();
      }
    }
    function onActivatorKeydown(e) {
      if (props.disabled) return;
      const el = overlay.value?.contentEl;
      if (el && isActive.value) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, "next");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, "prev");
        } else if (props.submenu) {
          if (e.key === (isRtl.value ? "ArrowRight" : "ArrowLeft")) {
            isActive.value = false;
          } else if (e.key === (isRtl.value ? "ArrowLeft" : "ArrowRight")) {
            e.preventDefault();
            focusChild(el, "first");
          }
        }
      } else if (props.submenu ? e.key === (isRtl.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
      }
    }
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "menu",
      "aria-expanded": String(isActive.value),
      "aria-controls": id.value,
      "aria-owns": id.value,
      onKeydown: onActivatorKeydown
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "id": id.value,
        "class": ["v-menu", props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "absolute": true,
        "activatorProps": activatorProps.value,
        "location": props.location ?? (props.submenu ? "end" : "bottom"),
        "onClick:outside": onClickOutside,
        "onKeydown": onKeydown2
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VMenu"
          }, {
            default: () => [slots.default?.(...args)]
          });
        }
      });
    });
    return forwardRefs({
      id,
      ΨopenChildren: openChildren
    }, overlay);
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "RenderHeader",
  __ssrInlineRender: true,
  props: {
    rows: {},
    theme: {},
    menu: {},
    languages: {},
    related_pages: {},
    locale: {}
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    function mergeStyles(style1, style2) {
      return { ...style1, ...style2 };
    }
    function to(lang) {
      const defaultLanguage = props.languages.find((l) => l.code === lang).default_lang;
      const link = props.related_pages.find((f) => f.lang === lang);
      console.log(link);
      let finalLink = "";
      if (link?.is_home === 1) {
        finalLink = lang;
      } else if (defaultLanguage) {
        finalLink = lang + "/" + link.title;
      } else {
        finalLink = lang + "/" + link.title;
      }
      return "/" + finalLink;
    }
    const direction = ref(props.locale === "fa" || props.locale === "ar" ? "rtl" : "ltr");
    watch(props, (newProps) => {
      const isRtl = newProps.locale === "fa" || newProps.locale === "ar";
      if (isRtl) {
        direction.value = "rtl";
      } else {
        direction.value = "ltr";
      }
    }, { immediate: true });
    const { mdAndUp } = useDisplay();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<!--[-->`);
      ssrRenderList(__props.rows, (row) => {
        _push(ssrRenderComponent(VContainer, {
          fluid: row.container === "fluid",
          style: { padding: 0, direction: unref(direction) }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(ContainerBox, {
                "is-normal-in-fluid": false,
                "reverse-on-mobile": "unset",
                style: mergeStyles(mergeStyles(row.margin, row.padding), { background: row.background_type === "color" ? row.background : `url(${unref(config).public.baseUrl}/${row.background})`, position: "relative", backgroundPosition: "center center", border: "unset", borderRadius: "unset" })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(row.columns, (column) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: row.id.toString() + column.id.toString() + "column",
                        style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                        cols: "12",
                        sm: "12",
                        md: column.column_md,
                        lg: column.column_lg,
                        xl: column.column_xl
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div style="${ssrRenderStyle(mergeStyles(!!!column?.elementsStyles || column?.elementsStyles.flexDirection === "unset" ? { display: "flex", flexDirection: "column", flex: 1 } : mergeStyles(column?.elementsStyles, { display: "flex" }), mergeStyles(Object.fromEntries(Object.entries(column.styles).filter(([k, v]) => !(k === "backdropFilter" && v === "blur()"))), unref(mdAndUp) ? column.padding : column.paddingM == null ? column.padding : column.paddingM)))}" data-v-efb0e89f${_scopeId3}><!--[-->`);
                            ssrRenderList(column.elements, (element) => {
                              _push4(`<div style="${ssrRenderStyle(element.padding)}" data-v-efb0e89f${_scopeId3}>`);
                              if (element.element_key === "SimpleContent") {
                                _push4(`<div data-v-efb0e89f${_scopeId3}>${element.data.content ?? ""}</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Button") {
                                _push4(ssrRenderComponent(VCol, {
                                  style: mergeStyles(element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align })
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      if (element.data.buttonTitle !== "") {
                                        _push5(ssrRenderComponent(VBtn, {
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                          href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                          target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                          variant: element.data.ButtonsStyles?.style,
                                          block: element.data.fullWidth,
                                          color: __props.theme === "dark" ? "white" : element.data.buttonColor,
                                          style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                          rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, createSlots({
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              if (element.data.icon) {
                                                _push6(ssrRenderComponent(VIcon, null, {
                                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                    if (_push7) {
                                                      _push7(`${ssrInterpolate(element.data.buttonIcon)}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent6, _scopeId5));
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                              if (!element.data.icon) {
                                                _push6(`<span style="${ssrRenderStyle({ "padding-top": "2px" })}" data-v-efb0e89f${_scopeId5}>${ssrInterpolate(element.data.buttonTitle)}</span>`);
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                            } else {
                                              return [
                                                element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                !element.data.icon ? (openBlock(), createBlock("span", {
                                                  key: 1,
                                                  style: { "padding-top": "2px" }
                                                }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, [
                                          element.data.buttonIcon !== "mdi-disable" ? {
                                            name: "prepend",
                                            fn: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                              if (_push6) {
                                                if (element.data.buttonIcon !== "") {
                                                  _push6(ssrRenderComponent(VIcon, null, {
                                                    default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                      if (_push7) {
                                                        _push7(`${ssrInterpolate(element.data.buttonIcon)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent6, _scopeId5));
                                                } else {
                                                  _push6(`<!---->`);
                                                }
                                              } else {
                                                return [
                                                  element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true)
                                                ];
                                              }
                                            }),
                                            key: "0"
                                          } : void 0
                                        ]), _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                          key: 0,
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                          href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                          target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                          variant: element.data.ButtonsStyles?.style,
                                          block: element.data.fullWidth,
                                          color: __props.theme === "dark" ? "white" : element.data.buttonColor,
                                          style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                          rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, createSlots({
                                          default: withCtx(() => [
                                            element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            !element.data.icon ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              style: { "padding-top": "2px" }
                                            }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, [
                                          element.data.buttonIcon !== "mdi-disable" ? {
                                            name: "prepend",
                                            fn: withCtx(() => [
                                              element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ]),
                                            key: "0"
                                          } : void 0
                                        ]), 1032, ["icon", "size", "to", "href", "target", "variant", "block", "color", "style", "rounded"])) : createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Image" && element.data.link !== "") {
                                _push4(ssrRenderComponent(_component_router_link, {
                                  to: element.data.link,
                                  style: { width: element.data.width }
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(ssrRenderComponent(VImg, {
                                        src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                        height: element.data.height,
                                        alt: element.data.alt,
                                        style: { borderRadius: element.data.borderRadius },
                                        cover: "",
                                        width: element.data.width
                                      }, null, _parent5, _scopeId4));
                                    } else {
                                      return [
                                        createVNode(VImg, {
                                          src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                          height: element.data.height,
                                          alt: element.data.alt,
                                          style: { borderRadius: element.data.borderRadius },
                                          cover: "",
                                          width: element.data.width
                                        }, null, 8, ["src", "height", "alt", "style", "width"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Image" && element.data.link === "") {
                                _push4(ssrRenderComponent(VImg, {
                                  src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                  height: element.data.height,
                                  alt: element.data.alt,
                                  style: { borderRadius: element.data.borderRadius },
                                  cover: "",
                                  width: element.data.width
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Menu") {
                                _push4(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "row" })}" data-v-efb0e89f${_scopeId3}><!--[-->`);
                                ssrRenderList(__props.menu.filter((f) => f.lang === __props.locale), (item) => {
                                  _push4(`<!--[-->`);
                                  if (item.children && item.children.length) {
                                    _push4(ssrRenderComponent(VMenu, {
                                      style: { "position": "relative", "z-index": "99999" },
                                      "open-on-hover": "",
                                      location: "bottom"
                                    }, {
                                      activator: withCtx(({ props: props2 }, _push5, _parent5, _scopeId4) => {
                                        if (_push5) {
                                          _push5(ssrRenderComponent(VBtn, mergeProps({ ref_for: true }, props2, {
                                            variant: element.data.ButtonsStyles.style,
                                            rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                            color: element.data.buttonColor,
                                            to: "/" + __props.locale + item.link,
                                            class: "menu-parent-btn"
                                          }), {
                                            default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                              if (_push6) {
                                                _push6(`<span data-v-efb0e89f${_scopeId5}>${ssrInterpolate(item.title)}</span>`);
                                                _push6(ssrRenderComponent(VIcon, {
                                                  size: "18",
                                                  class: "ml-1"
                                                }, {
                                                  default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                    if (_push7) {
                                                      _push7(`mdi-chevron-down`);
                                                    } else {
                                                      return [
                                                        createTextVNode("mdi-chevron-down")
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent6, _scopeId5));
                                              } else {
                                                return [
                                                  createVNode("span", null, toDisplayString(item.title), 1),
                                                  createVNode(VIcon, {
                                                    size: "18",
                                                    class: "ml-1"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("mdi-chevron-down")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent5, _scopeId4));
                                        } else {
                                          return [
                                            createVNode(VBtn, mergeProps({ ref_for: true }, props2, {
                                              variant: element.data.ButtonsStyles.style,
                                              rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                              color: element.data.buttonColor,
                                              to: "/" + __props.locale + item.link,
                                              class: "menu-parent-btn"
                                            }), {
                                              default: withCtx(() => [
                                                createVNode("span", null, toDisplayString(item.title), 1),
                                                createVNode(VIcon, {
                                                  size: "18",
                                                  class: "ml-1"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("mdi-chevron-down")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 2
                                            }, 1040, ["variant", "rounded", "color", "to"])
                                          ];
                                        }
                                      }),
                                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                        if (_push5) {
                                          _push5(ssrRenderComponent(VList, { density: "compact" }, {
                                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                              if (_push6) {
                                                _push6(`<!--[-->`);
                                                ssrRenderList(item.children, (child) => {
                                                  _push6(ssrRenderComponent(VListItem, {
                                                    key: child.id,
                                                    to: "/" + __props.locale + child.link,
                                                    density: "compact"
                                                  }, {
                                                    default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                      if (_push7) {
                                                        _push7(ssrRenderComponent(VListItemTitle, null, {
                                                          default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                            if (_push8) {
                                                              _push8(`${ssrInterpolate(child.title)}`);
                                                            } else {
                                                              return [
                                                                createTextVNode(toDisplayString(child.title), 1)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent7, _scopeId6));
                                                      } else {
                                                        return [
                                                          createVNode(VListItemTitle, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(child.title), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent6, _scopeId5));
                                                });
                                                _push6(`<!--]-->`);
                                              } else {
                                                return [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(item.children, (child) => {
                                                    return openBlock(), createBlock(VListItem, {
                                                      key: child.id,
                                                      to: "/" + __props.locale + child.link,
                                                      density: "compact"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VListItemTitle, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(child.title), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["to"]);
                                                  }), 128))
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent5, _scopeId4));
                                        } else {
                                          return [
                                            createVNode(VList, { density: "compact" }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(item.children, (child) => {
                                                  return openBlock(), createBlock(VListItem, {
                                                    key: child.id,
                                                    to: "/" + __props.locale + child.link,
                                                    density: "compact"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VListItemTitle, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(child.title), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to"]);
                                                }), 128))
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent4, _scopeId3));
                                  } else {
                                    _push4(`<div style="${ssrRenderStyle(element.padding)}" data-v-efb0e89f${_scopeId3}>`);
                                    _push4(ssrRenderComponent(VBtn, {
                                      variant: element.data.ButtonsStyles.style,
                                      color: __props.theme === "dark" ? element.data.buttonColorDark : element.data.buttonColor,
                                      rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                      to: "/" + __props.locale + item.link
                                    }, {
                                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                        if (_push5) {
                                          _push5(`${ssrInterpolate(item.title)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(item.title), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent4, _scopeId3));
                                    _push4(`</div>`);
                                  }
                                  _push4(`<!--]-->`);
                                });
                                _push4(`<!--]--></div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Logo" && element.data.link !== "") {
                                _push4(ssrRenderComponent(_component_router_link, {
                                  to: "/",
                                  style: { width: element.data.width, float: unref(direction) === "rtl" ? "left" : "right" }
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<img${ssrRenderAttr("src", unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2))}${ssrRenderAttr("height", element.data.height)}${ssrRenderAttr("alt", element.data.alt)} style="${ssrRenderStyle({ borderRadius: element.data.borderRadius })}" width="auto" data-v-efb0e89f${_scopeId4}>`);
                                    } else {
                                      return [
                                        createVNode("img", {
                                          src: unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2),
                                          height: element.data.height,
                                          alt: element.data.alt,
                                          style: { borderRadius: element.data.borderRadius },
                                          width: "auto"
                                        }, null, 12, ["src", "height", "alt"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Break") {
                                _push4(ssrRenderComponent(VDivider, {
                                  vertical: element.data.divider === "vertical",
                                  color: "#fff"
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Languages") {
                                _push4(`<div style="${ssrRenderStyle({ float: unref(direction) === "rtl" ? "left" : "right" })}" data-v-efb0e89f${_scopeId3}>`);
                                _push4(ssrRenderComponent(VMenu, { style: { "position": "relative", "z-index": "9999" } }, {
                                  activator: withCtx(({ props: props2 }, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(ssrRenderComponent(VBtn, mergeProps({
                                        class: "white_on_stuck",
                                        variant: "text"
                                      }, { ref_for: true }, props2, {
                                        color: __props.theme === "dark" ? "white" : "darkgray",
                                        icon: "",
                                        density: "compact"
                                      }), {
                                        default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(VIcon, {
                                              size: "18",
                                              class: "mx-2"
                                            }, {
                                              default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(`mdi-earth`);
                                                } else {
                                                  return [
                                                    createTextVNode("mdi-earth")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            return [
                                              createVNode(VIcon, {
                                                size: "18",
                                                class: "mx-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-earth")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      return [
                                        createVNode(VBtn, mergeProps({
                                          class: "white_on_stuck",
                                          variant: "text"
                                        }, { ref_for: true }, props2, {
                                          color: __props.theme === "dark" ? "white" : "darkgray",
                                          icon: "",
                                          density: "compact"
                                        }), {
                                          default: withCtx(() => [
                                            createVNode(VIcon, {
                                              size: "18",
                                              class: "mx-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-earth")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 16, ["color"])
                                      ];
                                    }
                                  }),
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(ssrRenderComponent(VList, null, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(`<!--[-->`);
                                            ssrRenderList(__props.languages, (item, index) => {
                                              _push6(ssrRenderComponent(VListItem, {
                                                key: index,
                                                value: index,
                                                to: to(item.code)
                                              }, {
                                                default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                  if (_push7) {
                                                    _push7(ssrRenderComponent(VListItemTitle, null, {
                                                      default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                        if (_push8) {
                                                          _push8(`${ssrInterpolate(item.code)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(item.code), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent7, _scopeId6));
                                                  } else {
                                                    return [
                                                      createVNode(VListItemTitle, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(item.code), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent6, _scopeId5));
                                            });
                                            _push6(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                                return openBlock(), createBlock(VListItem, {
                                                  key: index,
                                                  value: index,
                                                  to: to(item.code)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItemTitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.code), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "to"]);
                                              }), 128))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      return [
                                        createVNode(VList, null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                              return openBlock(), createBlock(VListItem, {
                                                key: index,
                                                value: index,
                                                to: to(item.code)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VListItemTitle, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.code), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["value", "to"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                            });
                            _push4(`<!--]--></div>`);
                          } else {
                            return [
                              createVNode("div", {
                                style: mergeStyles(!!!column?.elementsStyles || column?.elementsStyles.flexDirection === "unset" ? { display: "flex", flexDirection: "column", flex: 1 } : mergeStyles(column?.elementsStyles, { display: "flex" }), mergeStyles(Object.fromEntries(Object.entries(column.styles).filter(([k, v]) => !(k === "backdropFilter" && v === "blur()"))), unref(mdAndUp) ? column.padding : column.paddingM == null ? column.padding : column.paddingM))
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock("div", {
                                    style: element.padding
                                  }, [
                                    element.element_key === "SimpleContent" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      innerHTML: element.data.content
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    element.element_key === "Button" ? (openBlock(), createBlock(VCol, {
                                      key: 1,
                                      style: mergeStyles(element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align })
                                    }, {
                                      default: withCtx(() => [
                                        element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                          key: 0,
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                          href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                          target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                          variant: element.data.ButtonsStyles?.style,
                                          block: element.data.fullWidth,
                                          color: __props.theme === "dark" ? "white" : element.data.buttonColor,
                                          style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                          rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, createSlots({
                                          default: withCtx(() => [
                                            element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            !element.data.icon ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              style: { "padding-top": "2px" }
                                            }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, [
                                          element.data.buttonIcon !== "mdi-disable" ? {
                                            name: "prepend",
                                            fn: withCtx(() => [
                                              element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ]),
                                            key: "0"
                                          } : void 0
                                        ]), 1032, ["icon", "size", "to", "href", "target", "variant", "block", "color", "style", "rounded"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["style"])) : createCommentVNode("", true),
                                    element.element_key === "Image" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                      key: 2,
                                      to: element.data.link,
                                      style: { width: element.data.width }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VImg, {
                                          src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                          height: element.data.height,
                                          alt: element.data.alt,
                                          style: { borderRadius: element.data.borderRadius },
                                          cover: "",
                                          width: element.data.width
                                        }, null, 8, ["src", "height", "alt", "style", "width"])
                                      ]),
                                      _: 2
                                    }, 1032, ["to", "style"])) : createCommentVNode("", true),
                                    element.element_key === "Image" && element.data.link === "" ? (openBlock(), createBlock(VImg, {
                                      key: 3,
                                      src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                      height: element.data.height,
                                      alt: element.data.alt,
                                      style: { borderRadius: element.data.borderRadius },
                                      cover: "",
                                      width: element.data.width
                                    }, null, 8, ["src", "height", "alt", "style", "width"])) : createCommentVNode("", true),
                                    element.element_key === "Menu" ? (openBlock(), createBlock("div", {
                                      key: 4,
                                      style: { "display": "flex", "flex-direction": "row" }
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.menu.filter((f) => f.lang === __props.locale), (item) => {
                                        return openBlock(), createBlock(Fragment, {
                                          key: item.id
                                        }, [
                                          item.children && item.children.length ? (openBlock(), createBlock(VMenu, {
                                            key: 0,
                                            style: { "position": "relative", "z-index": "99999" },
                                            "open-on-hover": "",
                                            location: "bottom"
                                          }, {
                                            activator: withCtx(({ props: props2 }) => [
                                              createVNode(VBtn, mergeProps({ ref_for: true }, props2, {
                                                variant: element.data.ButtonsStyles.style,
                                                rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                                color: element.data.buttonColor,
                                                to: "/" + __props.locale + item.link,
                                                class: "menu-parent-btn"
                                              }), {
                                                default: withCtx(() => [
                                                  createVNode("span", null, toDisplayString(item.title), 1),
                                                  createVNode(VIcon, {
                                                    size: "18",
                                                    class: "ml-1"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("mdi-chevron-down")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 2
                                              }, 1040, ["variant", "rounded", "color", "to"])
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(VList, { density: "compact" }, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(item.children, (child) => {
                                                    return openBlock(), createBlock(VListItem, {
                                                      key: child.id,
                                                      to: "/" + __props.locale + child.link,
                                                      density: "compact"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VListItemTitle, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(child.title), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["to"]);
                                                  }), 128))
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)) : (openBlock(), createBlock("div", {
                                            key: 1,
                                            style: element.padding
                                          }, [
                                            createVNode(VBtn, {
                                              variant: element.data.ButtonsStyles.style,
                                              color: __props.theme === "dark" ? element.data.buttonColorDark : element.data.buttonColor,
                                              rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                              to: "/" + __props.locale + item.link
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.title), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant", "color", "rounded", "to"])
                                          ], 4))
                                        ], 64);
                                      }), 128))
                                    ])) : createCommentVNode("", true),
                                    element.element_key === "Logo" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                      key: 5,
                                      to: "/",
                                      style: { width: element.data.width, float: unref(direction) === "rtl" ? "left" : "right" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("img", {
                                          src: unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2),
                                          height: element.data.height,
                                          alt: element.data.alt,
                                          style: { borderRadius: element.data.borderRadius },
                                          width: "auto"
                                        }, null, 12, ["src", "height", "alt"])
                                      ]),
                                      _: 2
                                    }, 1032, ["style"])) : createCommentVNode("", true),
                                    element.element_key === "Break" ? (openBlock(), createBlock(VDivider, {
                                      key: 6,
                                      vertical: element.data.divider === "vertical",
                                      color: "#fff"
                                    }, null, 8, ["vertical"])) : createCommentVNode("", true),
                                    element.element_key === "Languages" ? (openBlock(), createBlock("div", {
                                      key: 7,
                                      style: { float: unref(direction) === "rtl" ? "left" : "right" }
                                    }, [
                                      createVNode(VMenu, { style: { "position": "relative", "z-index": "9999" } }, {
                                        activator: withCtx(({ props: props2 }) => [
                                          createVNode(VBtn, mergeProps({
                                            class: "white_on_stuck",
                                            variant: "text"
                                          }, { ref_for: true }, props2, {
                                            color: __props.theme === "dark" ? "white" : "darkgray",
                                            icon: "",
                                            density: "compact"
                                          }), {
                                            default: withCtx(() => [
                                              createVNode(VIcon, {
                                                size: "18",
                                                class: "mx-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-earth")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 16, ["color"])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(VList, null, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                                return openBlock(), createBlock(VListItem, {
                                                  key: index,
                                                  value: index,
                                                  to: to(item.code)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItemTitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.code), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "to"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ], 4)) : createCommentVNode("", true)
                                  ], 4);
                                }), 256))
                              ], 4)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(row.columns, (column) => {
                        return openBlock(), createBlock(VCol, {
                          key: row.id.toString() + column.id.toString() + "column",
                          style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                          cols: "12",
                          sm: "12",
                          md: column.column_md,
                          lg: column.column_lg,
                          xl: column.column_xl
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              style: mergeStyles(!!!column?.elementsStyles || column?.elementsStyles.flexDirection === "unset" ? { display: "flex", flexDirection: "column", flex: 1 } : mergeStyles(column?.elementsStyles, { display: "flex" }), mergeStyles(Object.fromEntries(Object.entries(column.styles).filter(([k, v]) => !(k === "backdropFilter" && v === "blur()"))), unref(mdAndUp) ? column.padding : column.paddingM == null ? column.padding : column.paddingM))
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                return openBlock(), createBlock("div", {
                                  style: element.padding
                                }, [
                                  element.element_key === "SimpleContent" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    innerHTML: element.data.content
                                  }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                  element.element_key === "Button" ? (openBlock(), createBlock(VCol, {
                                    key: 1,
                                    style: mergeStyles(element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align })
                                  }, {
                                    default: withCtx(() => [
                                      element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                        key: 0,
                                        icon: element.data.icon,
                                        size: element.data.icon ? "small" : void 0,
                                        to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                        href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                        target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                        variant: element.data.ButtonsStyles?.style,
                                        block: element.data.fullWidth,
                                        color: __props.theme === "dark" ? "white" : element.data.buttonColor,
                                        style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                        rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                      }, createSlots({
                                        default: withCtx(() => [
                                          element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                            ]),
                                            _: 2
                                          }, 1024)) : createCommentVNode("", true),
                                          !element.data.icon ? (openBlock(), createBlock("span", {
                                            key: 1,
                                            style: { "padding-top": "2px" }
                                          }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, [
                                        element.data.buttonIcon !== "mdi-disable" ? {
                                          name: "prepend",
                                          fn: withCtx(() => [
                                            element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true)
                                          ]),
                                          key: "0"
                                        } : void 0
                                      ]), 1032, ["icon", "size", "to", "href", "target", "variant", "block", "color", "style", "rounded"])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["style"])) : createCommentVNode("", true),
                                  element.element_key === "Image" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                    key: 2,
                                    to: element.data.link,
                                    style: { width: element.data.width }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VImg, {
                                        src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                        height: element.data.height,
                                        alt: element.data.alt,
                                        style: { borderRadius: element.data.borderRadius },
                                        cover: "",
                                        width: element.data.width
                                      }, null, 8, ["src", "height", "alt", "style", "width"])
                                    ]),
                                    _: 2
                                  }, 1032, ["to", "style"])) : createCommentVNode("", true),
                                  element.element_key === "Image" && element.data.link === "" ? (openBlock(), createBlock(VImg, {
                                    key: 3,
                                    src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                    height: element.data.height,
                                    alt: element.data.alt,
                                    style: { borderRadius: element.data.borderRadius },
                                    cover: "",
                                    width: element.data.width
                                  }, null, 8, ["src", "height", "alt", "style", "width"])) : createCommentVNode("", true),
                                  element.element_key === "Menu" ? (openBlock(), createBlock("div", {
                                    key: 4,
                                    style: { "display": "flex", "flex-direction": "row" }
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.menu.filter((f) => f.lang === __props.locale), (item) => {
                                      return openBlock(), createBlock(Fragment, {
                                        key: item.id
                                      }, [
                                        item.children && item.children.length ? (openBlock(), createBlock(VMenu, {
                                          key: 0,
                                          style: { "position": "relative", "z-index": "99999" },
                                          "open-on-hover": "",
                                          location: "bottom"
                                        }, {
                                          activator: withCtx(({ props: props2 }) => [
                                            createVNode(VBtn, mergeProps({ ref_for: true }, props2, {
                                              variant: element.data.ButtonsStyles.style,
                                              rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                              color: element.data.buttonColor,
                                              to: "/" + __props.locale + item.link,
                                              class: "menu-parent-btn"
                                            }), {
                                              default: withCtx(() => [
                                                createVNode("span", null, toDisplayString(item.title), 1),
                                                createVNode(VIcon, {
                                                  size: "18",
                                                  class: "ml-1"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("mdi-chevron-down")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 2
                                            }, 1040, ["variant", "rounded", "color", "to"])
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(VList, { density: "compact" }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(item.children, (child) => {
                                                  return openBlock(), createBlock(VListItem, {
                                                    key: child.id,
                                                    to: "/" + __props.locale + child.link,
                                                    density: "compact"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VListItemTitle, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(child.title), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to"]);
                                                }), 128))
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          style: element.padding
                                        }, [
                                          createVNode(VBtn, {
                                            variant: element.data.ButtonsStyles.style,
                                            color: __props.theme === "dark" ? element.data.buttonColorDark : element.data.buttonColor,
                                            rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                            to: "/" + __props.locale + item.link
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.title), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant", "color", "rounded", "to"])
                                        ], 4))
                                      ], 64);
                                    }), 128))
                                  ])) : createCommentVNode("", true),
                                  element.element_key === "Logo" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                    key: 5,
                                    to: "/",
                                    style: { width: element.data.width, float: unref(direction) === "rtl" ? "left" : "right" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("img", {
                                        src: unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2),
                                        height: element.data.height,
                                        alt: element.data.alt,
                                        style: { borderRadius: element.data.borderRadius },
                                        width: "auto"
                                      }, null, 12, ["src", "height", "alt"])
                                    ]),
                                    _: 2
                                  }, 1032, ["style"])) : createCommentVNode("", true),
                                  element.element_key === "Break" ? (openBlock(), createBlock(VDivider, {
                                    key: 6,
                                    vertical: element.data.divider === "vertical",
                                    color: "#fff"
                                  }, null, 8, ["vertical"])) : createCommentVNode("", true),
                                  element.element_key === "Languages" ? (openBlock(), createBlock("div", {
                                    key: 7,
                                    style: { float: unref(direction) === "rtl" ? "left" : "right" }
                                  }, [
                                    createVNode(VMenu, { style: { "position": "relative", "z-index": "9999" } }, {
                                      activator: withCtx(({ props: props2 }) => [
                                        createVNode(VBtn, mergeProps({
                                          class: "white_on_stuck",
                                          variant: "text"
                                        }, { ref_for: true }, props2, {
                                          color: __props.theme === "dark" ? "white" : "darkgray",
                                          icon: "",
                                          density: "compact"
                                        }), {
                                          default: withCtx(() => [
                                            createVNode(VIcon, {
                                              size: "18",
                                              class: "mx-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-earth")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 16, ["color"])
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(VList, null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                              return openBlock(), createBlock(VListItem, {
                                                key: index,
                                                value: index,
                                                to: to(item.code)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VListItemTitle, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.code), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["value", "to"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ], 4)) : createCommentVNode("", true)
                                ], 4);
                              }), 256))
                            ], 4)
                          ]),
                          _: 2
                        }, 1032, ["md", "lg", "style", "xl"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(ContainerBox, {
                  "is-normal-in-fluid": false,
                  "reverse-on-mobile": "unset",
                  style: mergeStyles(mergeStyles(row.margin, row.padding), { background: row.background_type === "color" ? row.background : `url(${unref(config).public.baseUrl}/${row.background})`, position: "relative", backgroundPosition: "center center", border: "unset", borderRadius: "unset" })
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(row.columns, (column) => {
                      return openBlock(), createBlock(VCol, {
                        key: row.id.toString() + column.id.toString() + "column",
                        style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                        cols: "12",
                        sm: "12",
                        md: column.column_md,
                        lg: column.column_lg,
                        xl: column.column_xl
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            style: mergeStyles(!!!column?.elementsStyles || column?.elementsStyles.flexDirection === "unset" ? { display: "flex", flexDirection: "column", flex: 1 } : mergeStyles(column?.elementsStyles, { display: "flex" }), mergeStyles(Object.fromEntries(Object.entries(column.styles).filter(([k, v]) => !(k === "backdropFilter" && v === "blur()"))), unref(mdAndUp) ? column.padding : column.paddingM == null ? column.padding : column.paddingM))
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                              return openBlock(), createBlock("div", {
                                style: element.padding
                              }, [
                                element.element_key === "SimpleContent" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  innerHTML: element.data.content
                                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                element.element_key === "Button" ? (openBlock(), createBlock(VCol, {
                                  key: 1,
                                  style: mergeStyles(element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align })
                                }, {
                                  default: withCtx(() => [
                                    element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                      key: 0,
                                      icon: element.data.icon,
                                      size: element.data.icon ? "small" : void 0,
                                      to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                      href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                      target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                      variant: element.data.ButtonsStyles?.style,
                                      block: element.data.fullWidth,
                                      color: __props.theme === "dark" ? "white" : element.data.buttonColor,
                                      style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                      rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                    }, createSlots({
                                      default: withCtx(() => [
                                        element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true),
                                        !element.data.icon ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          style: { "padding-top": "2px" }
                                        }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, [
                                      element.data.buttonIcon !== "mdi-disable" ? {
                                        name: "prepend",
                                        fn: withCtx(() => [
                                          element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                            ]),
                                            _: 2
                                          }, 1024)) : createCommentVNode("", true)
                                        ]),
                                        key: "0"
                                      } : void 0
                                    ]), 1032, ["icon", "size", "to", "href", "target", "variant", "block", "color", "style", "rounded"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["style"])) : createCommentVNode("", true),
                                element.element_key === "Image" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                  key: 2,
                                  to: element.data.link,
                                  style: { width: element.data.width }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VImg, {
                                      src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                      height: element.data.height,
                                      alt: element.data.alt,
                                      style: { borderRadius: element.data.borderRadius },
                                      cover: "",
                                      width: element.data.width
                                    }, null, 8, ["src", "height", "alt", "style", "width"])
                                  ]),
                                  _: 2
                                }, 1032, ["to", "style"])) : createCommentVNode("", true),
                                element.element_key === "Image" && element.data.link === "" ? (openBlock(), createBlock(VImg, {
                                  key: 3,
                                  src: unref(config).public.baseUrl + "/" + element.data.imageFile,
                                  height: element.data.height,
                                  alt: element.data.alt,
                                  style: { borderRadius: element.data.borderRadius },
                                  cover: "",
                                  width: element.data.width
                                }, null, 8, ["src", "height", "alt", "style", "width"])) : createCommentVNode("", true),
                                element.element_key === "Menu" ? (openBlock(), createBlock("div", {
                                  key: 4,
                                  style: { "display": "flex", "flex-direction": "row" }
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.menu.filter((f) => f.lang === __props.locale), (item) => {
                                    return openBlock(), createBlock(Fragment, {
                                      key: item.id
                                    }, [
                                      item.children && item.children.length ? (openBlock(), createBlock(VMenu, {
                                        key: 0,
                                        style: { "position": "relative", "z-index": "99999" },
                                        "open-on-hover": "",
                                        location: "bottom"
                                      }, {
                                        activator: withCtx(({ props: props2 }) => [
                                          createVNode(VBtn, mergeProps({ ref_for: true }, props2, {
                                            variant: element.data.ButtonsStyles.style,
                                            rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                            color: element.data.buttonColor,
                                            to: "/" + __props.locale + item.link,
                                            class: "menu-parent-btn"
                                          }), {
                                            default: withCtx(() => [
                                              createVNode("span", null, toDisplayString(item.title), 1),
                                              createVNode(VIcon, {
                                                size: "18",
                                                class: "ml-1"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-chevron-down")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 2
                                          }, 1040, ["variant", "rounded", "color", "to"])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(VList, { density: "compact" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(item.children, (child) => {
                                                return openBlock(), createBlock(VListItem, {
                                                  key: child.id,
                                                  to: "/" + __props.locale + child.link,
                                                  density: "compact"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItemTitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(child.title), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to"]);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        style: element.padding
                                      }, [
                                        createVNode(VBtn, {
                                          variant: element.data.ButtonsStyles.style,
                                          color: __props.theme === "dark" ? element.data.buttonColorDark : element.data.buttonColor,
                                          rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px",
                                          to: "/" + __props.locale + item.link
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.title), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant", "color", "rounded", "to"])
                                      ], 4))
                                    ], 64);
                                  }), 128))
                                ])) : createCommentVNode("", true),
                                element.element_key === "Logo" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                  key: 5,
                                  to: "/",
                                  style: { width: element.data.width, float: unref(direction) === "rtl" ? "left" : "right" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode("img", {
                                      src: unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2),
                                      height: element.data.height,
                                      alt: element.data.alt,
                                      style: { borderRadius: element.data.borderRadius },
                                      width: "auto"
                                    }, null, 12, ["src", "height", "alt"])
                                  ]),
                                  _: 2
                                }, 1032, ["style"])) : createCommentVNode("", true),
                                element.element_key === "Break" ? (openBlock(), createBlock(VDivider, {
                                  key: 6,
                                  vertical: element.data.divider === "vertical",
                                  color: "#fff"
                                }, null, 8, ["vertical"])) : createCommentVNode("", true),
                                element.element_key === "Languages" ? (openBlock(), createBlock("div", {
                                  key: 7,
                                  style: { float: unref(direction) === "rtl" ? "left" : "right" }
                                }, [
                                  createVNode(VMenu, { style: { "position": "relative", "z-index": "9999" } }, {
                                    activator: withCtx(({ props: props2 }) => [
                                      createVNode(VBtn, mergeProps({
                                        class: "white_on_stuck",
                                        variant: "text"
                                      }, { ref_for: true }, props2, {
                                        color: __props.theme === "dark" ? "white" : "darkgray",
                                        icon: "",
                                        density: "compact"
                                      }), {
                                        default: withCtx(() => [
                                          createVNode(VIcon, {
                                            size: "18",
                                            class: "mx-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-earth")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 16, ["color"])
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(VList, null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                            return openBlock(), createBlock(VListItem, {
                                              key: index,
                                              value: index,
                                              to: to(item.code)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VListItemTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.code), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["value", "to"]);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ], 4)) : createCommentVNode("", true)
                              ], 4);
                            }), 256))
                          ], 4)
                        ]),
                        _: 2
                      }, 1032, ["md", "lg", "style", "xl"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["style"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/RenderHeader.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const RenderHeader = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$e, [["__scopeId", "data-v-efb0e89f"]]), { __name: "EditorElementsRenderHeader" });
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "header1",
  __ssrInlineRender: true,
  props: {
    theme: {},
    header: {},
    menu: {},
    languages: {},
    related_pages: {},
    locale: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AContainer, mergeProps({
        class: "sticky-nav navOnStuck",
        style: { marginTop: "15px", zIndex: 9999, padding: "10px", borderRadius: "16px" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(RenderHeader, {
              rows: props.header,
              theme: props.theme,
              menu: __props.menu,
              languages: __props.languages,
              related_pages: __props.related_pages,
              locale: __props.locale
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(RenderHeader, {
                rows: props.header,
                theme: props.theme,
                menu: __props.menu,
                languages: __props.languages,
                related_pages: __props.related_pages,
                locale: __props.locale
              }, null, 8, ["rows", "theme", "menu", "languages", "related_pages", "locale"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/headers/header1.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const Header1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$d, [["__scopeId", "data-v-6716a4c5"]]), { __name: "EditorElementsElementsHeadersHeader1" });
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted2 = shallowRef(false);
    const vm = getCurrentInstance$1();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted2.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "RenderHeaderMobile",
  __ssrInlineRender: true,
  props: {
    rows: {},
    theme: {},
    menu: {},
    languages: {},
    related_pages: {},
    locale: {}
  },
  emits: ["openDrawer"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    function to(lang) {
      const defaultLanguage = props.languages.find((l) => l.code === lang).default_lang;
      const link = props.related_pages.find((f) => f.lang === lang);
      console.log(link);
      let finalLink = "";
      if (link?.is_home === 1) {
        finalLink = lang;
      } else if (defaultLanguage) {
        finalLink = link.title;
      } else {
        finalLink = lang + "/" + link.title;
      }
      return "/" + finalLink;
    }
    const emit = __emit;
    const config = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(ssrRenderComponent(VContainer, mergeProps({
        fluid: "",
        style: { "padding": "6px" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { style: { "padding-top": "6px", "padding-bottom": "6px" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.rows, (row) => {
                    _push3(`<!--[--><!--[-->`);
                    ssrRenderList(row.columns, (column) => {
                      _push3(`<!--[-->`);
                      if (column.elements.filter((e) => e.element_key === "Languages").length !== 0) {
                        _push3(ssrRenderComponent(VCol, {
                          style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                          cols: "2",
                          sm: "2",
                          md: "2",
                          lg: "2",
                          xl: "2"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<!--[-->`);
                              ssrRenderList(column.elements, (element) => {
                                _push4(`<!--[-->`);
                                if (element.element_key === "Languages") {
                                  _push4(`<div data-v-f182ba22${_scopeId3}>`);
                                  _push4(ssrRenderComponent(VMenu, { style: { "position": "relative", "z-index": "9999" } }, {
                                    activator: withCtx(({ props: props2 }, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(ssrRenderComponent(VBtn, mergeProps({
                                          class: "white_on_stuck",
                                          variant: "text"
                                        }, { ref_for: true }, props2, {
                                          color: __props.theme === "dark" ? "white" : "darkgray",
                                          style: { "float": "right" },
                                          icon: ""
                                        }), {
                                          default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(ssrRenderComponent(VIcon, {
                                                size: "18",
                                                class: "mx-2"
                                              }, {
                                                default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                  if (_push7) {
                                                    _push7(`mdi-earth`);
                                                  } else {
                                                    return [
                                                      createTextVNode("mdi-earth")
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent6, _scopeId5));
                                            } else {
                                              return [
                                                createVNode(VIcon, {
                                                  size: "18",
                                                  class: "mx-2"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("mdi-earth")
                                                  ]),
                                                  _: 1
                                                })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        return [
                                          createVNode(VBtn, mergeProps({
                                            class: "white_on_stuck",
                                            variant: "text"
                                          }, { ref_for: true }, props2, {
                                            color: __props.theme === "dark" ? "white" : "darkgray",
                                            style: { "float": "right" },
                                            icon: ""
                                          }), {
                                            default: withCtx(() => [
                                              createVNode(VIcon, {
                                                size: "18",
                                                class: "mx-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-earth")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 16, ["color"])
                                        ];
                                      }
                                    }),
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(ssrRenderComponent(VList, null, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`<!--[-->`);
                                              ssrRenderList(__props.languages, (item, index) => {
                                                _push6(ssrRenderComponent(VListItem, {
                                                  key: index,
                                                  value: index,
                                                  to: to(item.code)
                                                }, {
                                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                    if (_push7) {
                                                      _push7(ssrRenderComponent(VListItemTitle, null, {
                                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                          if (_push8) {
                                                            _push8(`${ssrInterpolate(item.code)}`);
                                                          } else {
                                                            return [
                                                              createTextVNode(toDisplayString(item.code), 1)
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent7, _scopeId6));
                                                    } else {
                                                      return [
                                                        createVNode(VListItemTitle, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(item.code), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent6, _scopeId5));
                                              });
                                              _push6(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                                  return openBlock(), createBlock(VListItem, {
                                                    key: index,
                                                    value: index,
                                                    to: to(item.code)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VListItemTitle, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(item.code), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "to"]);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        return [
                                          createVNode(VList, null, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                                return openBlock(), createBlock(VListItem, {
                                                  key: index,
                                                  value: index,
                                                  to: to(item.code)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItemTitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.code), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "to"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(`</div>`);
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(`<!--]-->`);
                              });
                              _push4(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock(Fragment, null, [
                                    element.element_key === "Languages" ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode(VMenu, { style: { "position": "relative", "z-index": "9999" } }, {
                                        activator: withCtx(({ props: props2 }) => [
                                          createVNode(VBtn, mergeProps({
                                            class: "white_on_stuck",
                                            variant: "text"
                                          }, { ref_for: true }, props2, {
                                            color: __props.theme === "dark" ? "white" : "darkgray",
                                            style: { "float": "right" },
                                            icon: ""
                                          }), {
                                            default: withCtx(() => [
                                              createVNode(VIcon, {
                                                size: "18",
                                                class: "mx-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-earth")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 16, ["color"])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(VList, null, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                                return openBlock(), createBlock(VListItem, {
                                                  key: index,
                                                  value: index,
                                                  to: to(item.code)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItemTitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.code), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "to"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true)
                                  ], 64);
                                }), 256))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      if (column.elements.filter((e) => e.element_key === "Logo").length !== 0) {
                        _push3(ssrRenderComponent(VCol, {
                          style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                          cols: "8",
                          sm: "8",
                          md: "8",
                          lg: "8",
                          xl: "8"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<!--[-->`);
                              ssrRenderList(column.elements, (element) => {
                                _push4(`<!--[-->`);
                                if (element.element_key === "Logo") {
                                  _push4(`<div style="${ssrRenderStyle({ "text-align": "center" })}" data-v-f182ba22${_scopeId3}>`);
                                  if (element.element_key === "Logo" && element.data.link !== "") {
                                    _push4(ssrRenderComponent(_component_router_link, {
                                      to: "/",
                                      style: { width: element.data.width, margin: "auto" }
                                    }, {
                                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                        if (_push5) {
                                          _push5(`<img${ssrRenderAttr("src", unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2))} height="38px"${ssrRenderAttr("alt", element.data.alt)} style="${ssrRenderStyle({ marginTop: "8px", borderRadius: element.data.borderRadius })}" width="auto" data-v-f182ba22${_scopeId4}>`);
                                        } else {
                                          return [
                                            createVNode("img", {
                                              src: unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2),
                                              height: "38px",
                                              alt: element.data.alt,
                                              style: { marginTop: "8px", borderRadius: element.data.borderRadius },
                                              width: "auto"
                                            }, null, 12, ["src", "alt"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent4, _scopeId3));
                                  } else {
                                    _push4(`<!---->`);
                                  }
                                  _push4(`</div>`);
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(`<!--]-->`);
                              });
                              _push4(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock(Fragment, null, [
                                    element.element_key === "Logo" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      style: { "text-align": "center" }
                                    }, [
                                      element.element_key === "Logo" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                        key: 0,
                                        to: "/",
                                        style: { width: element.data.width, margin: "auto" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("img", {
                                            src: unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2),
                                            height: "38px",
                                            alt: element.data.alt,
                                            style: { marginTop: "8px", borderRadius: element.data.borderRadius },
                                            width: "auto"
                                          }, null, 12, ["src", "alt"])
                                        ]),
                                        _: 2
                                      }, 1032, ["style"])) : createCommentVNode("", true)
                                    ])) : createCommentVNode("", true)
                                  ], 64);
                                }), 256))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      if (column.elements.filter((e) => e.element_key === "Menu").length !== 0) {
                        _push3(ssrRenderComponent(VCol, {
                          style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                          cols: "2",
                          sm: "2",
                          md: "2",
                          lg: "2",
                          xl: "2"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<!--[-->`);
                              ssrRenderList(column.elements, (element) => {
                                _push4(`<!--[-->`);
                                if (element.element_key === "Menu") {
                                  _push4(ssrRenderComponent(VBtn, {
                                    class: "mobile-menu-toggle",
                                    icon: "",
                                    variant: "text",
                                    onClick: ($event) => emit("openDrawer"),
                                    color: __props.theme === "dark" ? "white" : "darkgray"
                                  }, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(ssrRenderComponent(VIcon, null, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`mdi-menu`);
                                            } else {
                                              return [
                                                createTextVNode("mdi-menu")
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        return [
                                          createVNode(VIcon, null, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-menu")
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(`<!--]-->`);
                              });
                              _push4(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock(Fragment, null, [
                                    element.element_key === "Menu" ? (openBlock(), createBlock(VBtn, {
                                      key: 0,
                                      class: "mobile-menu-toggle",
                                      icon: "",
                                      variant: "text",
                                      onClick: ($event) => emit("openDrawer"),
                                      color: __props.theme === "dark" ? "white" : "darkgray"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, null, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-menu")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick", "color"])) : createCommentVNode("", true)
                                  ], 64);
                                }), 256))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]--><!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.rows, (row) => {
                      return openBlock(), createBlock(Fragment, null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(row.columns, (column) => {
                          return openBlock(), createBlock(Fragment, {
                            key: row.id.toString() + column.id.toString() + "column"
                          }, [
                            column.elements.filter((e) => e.element_key === "Languages").length !== 0 ? (openBlock(), createBlock(VCol, {
                              key: 0,
                              style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                              cols: "2",
                              sm: "2",
                              md: "2",
                              lg: "2",
                              xl: "2"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock(Fragment, null, [
                                    element.element_key === "Languages" ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode(VMenu, { style: { "position": "relative", "z-index": "9999" } }, {
                                        activator: withCtx(({ props: props2 }) => [
                                          createVNode(VBtn, mergeProps({
                                            class: "white_on_stuck",
                                            variant: "text"
                                          }, { ref_for: true }, props2, {
                                            color: __props.theme === "dark" ? "white" : "darkgray",
                                            style: { "float": "right" },
                                            icon: ""
                                          }), {
                                            default: withCtx(() => [
                                              createVNode(VIcon, {
                                                size: "18",
                                                class: "mx-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-earth")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 16, ["color"])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(VList, null, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                                return openBlock(), createBlock(VListItem, {
                                                  key: index,
                                                  value: index,
                                                  to: to(item.code)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItemTitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.code), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "to"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true)
                                  ], 64);
                                }), 256))
                              ]),
                              _: 2
                            }, 1032, ["style"])) : createCommentVNode("", true),
                            column.elements.filter((e) => e.element_key === "Logo").length !== 0 ? (openBlock(), createBlock(VCol, {
                              key: 1,
                              style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                              cols: "8",
                              sm: "8",
                              md: "8",
                              lg: "8",
                              xl: "8"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock(Fragment, null, [
                                    element.element_key === "Logo" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      style: { "text-align": "center" }
                                    }, [
                                      element.element_key === "Logo" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                        key: 0,
                                        to: "/",
                                        style: { width: element.data.width, margin: "auto" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("img", {
                                            src: unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2),
                                            height: "38px",
                                            alt: element.data.alt,
                                            style: { marginTop: "8px", borderRadius: element.data.borderRadius },
                                            width: "auto"
                                          }, null, 12, ["src", "alt"])
                                        ]),
                                        _: 2
                                      }, 1032, ["style"])) : createCommentVNode("", true)
                                    ])) : createCommentVNode("", true)
                                  ], 64);
                                }), 256))
                              ]),
                              _: 2
                            }, 1032, ["style"])) : createCommentVNode("", true),
                            column.elements.filter((e) => e.element_key === "Menu").length !== 0 ? (openBlock(), createBlock(VCol, {
                              key: 2,
                              style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                              cols: "2",
                              sm: "2",
                              md: "2",
                              lg: "2",
                              xl: "2"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock(Fragment, null, [
                                    element.element_key === "Menu" ? (openBlock(), createBlock(VBtn, {
                                      key: 0,
                                      class: "mobile-menu-toggle",
                                      icon: "",
                                      variant: "text",
                                      onClick: ($event) => emit("openDrawer"),
                                      color: __props.theme === "dark" ? "white" : "darkgray"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, null, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-menu")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick", "color"])) : createCommentVNode("", true)
                                  ], 64);
                                }), 256))
                              ]),
                              _: 2
                            }, 1032, ["style"])) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ], 64);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { style: { "padding-top": "6px", "padding-bottom": "6px" } }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.rows, (row) => {
                    return openBlock(), createBlock(Fragment, null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(row.columns, (column) => {
                        return openBlock(), createBlock(Fragment, {
                          key: row.id.toString() + column.id.toString() + "column"
                        }, [
                          column.elements.filter((e) => e.element_key === "Languages").length !== 0 ? (openBlock(), createBlock(VCol, {
                            key: 0,
                            style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                            cols: "2",
                            sm: "2",
                            md: "2",
                            lg: "2",
                            xl: "2"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                return openBlock(), createBlock(Fragment, null, [
                                  element.element_key === "Languages" ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode(VMenu, { style: { "position": "relative", "z-index": "9999" } }, {
                                      activator: withCtx(({ props: props2 }) => [
                                        createVNode(VBtn, mergeProps({
                                          class: "white_on_stuck",
                                          variant: "text"
                                        }, { ref_for: true }, props2, {
                                          color: __props.theme === "dark" ? "white" : "darkgray",
                                          style: { "float": "right" },
                                          icon: ""
                                        }), {
                                          default: withCtx(() => [
                                            createVNode(VIcon, {
                                              size: "18",
                                              class: "mx-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-earth")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 16, ["color"])
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(VList, null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(__props.languages, (item, index) => {
                                              return openBlock(), createBlock(VListItem, {
                                                key: index,
                                                value: index,
                                                to: to(item.code)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VListItemTitle, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.code), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["value", "to"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ])) : createCommentVNode("", true)
                                ], 64);
                              }), 256))
                            ]),
                            _: 2
                          }, 1032, ["style"])) : createCommentVNode("", true),
                          column.elements.filter((e) => e.element_key === "Logo").length !== 0 ? (openBlock(), createBlock(VCol, {
                            key: 1,
                            style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                            cols: "8",
                            sm: "8",
                            md: "8",
                            lg: "8",
                            xl: "8"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                return openBlock(), createBlock(Fragment, null, [
                                  element.element_key === "Logo" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    style: { "text-align": "center" }
                                  }, [
                                    element.element_key === "Logo" && element.data.link !== "" ? (openBlock(), createBlock(_component_router_link, {
                                      key: 0,
                                      to: "/",
                                      style: { width: element.data.width, margin: "auto" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("img", {
                                          src: unref(config).public.baseUrl + "/" + (__props.theme === "dark" ? element.data.imageFile : element.data.imageFile2),
                                          height: "38px",
                                          alt: element.data.alt,
                                          style: { marginTop: "8px", borderRadius: element.data.borderRadius },
                                          width: "auto"
                                        }, null, 12, ["src", "alt"])
                                      ]),
                                      _: 2
                                    }, 1032, ["style"])) : createCommentVNode("", true)
                                  ])) : createCommentVNode("", true)
                                ], 64);
                              }), 256))
                            ]),
                            _: 2
                          }, 1032, ["style"])) : createCommentVNode("", true),
                          column.elements.filter((e) => e.element_key === "Menu").length !== 0 ? (openBlock(), createBlock(VCol, {
                            key: 2,
                            style: [{ "position": "relative" }, { padding: column.gap ?? "8px" }],
                            cols: "2",
                            sm: "2",
                            md: "2",
                            lg: "2",
                            xl: "2"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                return openBlock(), createBlock(Fragment, null, [
                                  element.element_key === "Menu" ? (openBlock(), createBlock(VBtn, {
                                    key: 0,
                                    class: "mobile-menu-toggle",
                                    icon: "",
                                    variant: "text",
                                    onClick: ($event) => emit("openDrawer"),
                                    color: __props.theme === "dark" ? "white" : "darkgray"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, null, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-menu")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "color"])) : createCommentVNode("", true)
                                ], 64);
                              }), 256))
                            ]),
                            _: 2
                          }, 1032, ["style"])) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ], 64);
                  }), 256))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/RenderHeaderMobile.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const RenderHeaderMobile = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$c, [["__scopeId", "data-v-f182ba22"]]), { __name: "EditorElementsRenderHeaderMobile" });
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "header1Mobile",
  __ssrInlineRender: true,
  props: {
    theme: {},
    rows: {},
    menu: {},
    languages: {},
    related_pages: {},
    locale: {}
  },
  setup(__props) {
    const mobileDrawer = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(AContainer, {
        class: "mobile-header-container sticky-nav navOnStuck",
        style: { marginTop: "0", zIndex: 99, padding: "8px", borderRadius: "0px 0px 16px 16px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(RenderHeaderMobile, {
              rows: __props.rows,
              theme: __props.theme,
              menu: __props.menu,
              languages: __props.languages,
              related_pages: __props.related_pages,
              locale: __props.locale,
              onOpenDrawer: () => {
                mobileDrawer.value = !mobileDrawer.value;
              }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(RenderHeaderMobile, {
                rows: __props.rows,
                theme: __props.theme,
                menu: __props.menu,
                languages: __props.languages,
                related_pages: __props.related_pages,
                locale: __props.locale,
                onOpenDrawer: () => {
                  mobileDrawer.value = !mobileDrawer.value;
                }
              }, null, 8, ["rows", "theme", "menu", "languages", "related_pages", "locale", "onOpenDrawer"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/headers/header1Mobile.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const Header1Mobile = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$b, [["__scopeId", "data-v-978d09a7"]]), { __name: "EditorElementsElementsHeadersHeader1Mobile" });
const _sfc_main$a = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "row" }, _attrs))} data-v-68970438>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/common/ARow.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const ARow = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-68970438"]]), { __name: "EditorElementsElementsCommonARow" });
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ACol",
  __ssrInlineRender: true,
  props: {
    sm: {},
    md: {},
    lg: {},
    xl: {},
    xxl: {},
    p: {}
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      const sizes = ["sm", "md", "lg", "xl", "xxl"];
      return sizes.filter((size) => props[size] !== void 0).map((size) => `${size}-${props[size]}`);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["col", classes.value]
      }, _attrs))} data-v-167f1c69><div style="${ssrRenderStyle(`padding: ${__props.p ?? 0}px ; width:100%;height:100% ; display: flex;flex:1 ; flex-direction: column`)}" data-v-167f1c69>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/common/ACol.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const ACol = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$9, [["__scopeId", "data-v-167f1c69"]]), { __name: "EditorElementsElementsCommonACol" });
const _sfc_main$8 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1" } }, _attrs))}></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/common/Spacer.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const Spacer = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender]]), { __name: "EditorElementsElementsCommonSpacer" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "LightGradientFullContent",
  __ssrInlineRender: true,
  props: {
    src: {},
    gradient: {},
    buttonTitle: {},
    buttonLink: {},
    buttonsStyles: {},
    buttonColor: {},
    contentSize: {},
    imageSize: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content position-relative" }, _attrs))} data-v-17c634f4><div class="left-border position-absolute" data-v-17c634f4><div class="neon reverse-fa" style="${ssrRenderStyle("background: " + __props.gradient)}" data-v-17c634f4></div></div><div class="body-content" data-v-17c634f4>`);
      _push(ssrRenderComponent(ARow, { class: "responsive_flex_wrap_reverse" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ACol, {
              cols: 12,
              sm: 12,
              md: 12,
              lg: typeof __props.contentSize === "undefined" ? 6 : __props.contentSize,
              xl: typeof __props.contentSize === "undefined" ? 6 : __props.contentSize,
              style: { "padding": "0", "margin": "0", "display": "flex", "flex-direction": "column" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(Spacer, null, null, _parent3, _scopeId2));
                  if (typeof __props.buttonLink != "undefined" && __props.buttonLink !== "" && __props.buttonTitle !== "" && __props.buttonTitle !== null) {
                    _push3(ssrRenderComponent(_component_router_link, {
                      to: __props.buttonLink,
                      class: "ma-4",
                      style: { "align-self": "end", "justify-self": "end" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (__props.buttonTitle !== "") {
                            _push4(ssrRenderComponent(VBtn, {
                              to: __props.buttonLink,
                              variant: __props.buttonsStyles?.style ?? "tonal",
                              color: __props.buttonColor,
                              rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles?.rounded : "8px"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(__props.buttonTitle)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(__props.buttonTitle), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            __props.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                              key: 0,
                              to: __props.buttonLink,
                              variant: __props.buttonsStyles?.style ?? "tonal",
                              color: __props.buttonColor,
                              rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles?.rounded : "8px"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.buttonTitle), 1)
                              ]),
                              _: 1
                            }, 8, ["to", "variant", "color", "rounded"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true),
                    createVNode(Spacer),
                    typeof __props.buttonLink != "undefined" && __props.buttonLink !== "" && __props.buttonTitle !== "" && __props.buttonTitle !== null ? (openBlock(), createBlock(_component_router_link, {
                      key: 0,
                      to: __props.buttonLink,
                      class: "ma-4",
                      style: { "align-self": "end", "justify-self": "end" }
                    }, {
                      default: withCtx(() => [
                        __props.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          to: __props.buttonLink,
                          variant: __props.buttonsStyles?.style ?? "tonal",
                          color: __props.buttonColor,
                          rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles?.rounded : "8px"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.buttonTitle), 1)
                          ]),
                          _: 1
                        }, 8, ["to", "variant", "color", "rounded"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["to"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(ACol, {
              cols: 12,
              sm: 12,
              md: 12,
              class: "padding-md-16px",
              lg: typeof __props.imageSize === "undefined" ? 6 : __props.imageSize,
              xl: typeof __props.imageSize === "undefined" ? 6 : __props.imageSize,
              style: { "padding": "0" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VImg, {
                    src: __props.src,
                    cover: "",
                    class: "float-right radius-md-16px radius-lng"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VImg, {
                      src: __props.src,
                      cover: "",
                      class: "float-right radius-md-16px radius-lng"
                    }, null, 8, ["src"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(ACol, {
                cols: 12,
                sm: 12,
                md: 12,
                lg: typeof __props.contentSize === "undefined" ? 6 : __props.contentSize,
                xl: typeof __props.contentSize === "undefined" ? 6 : __props.contentSize,
                style: { "padding": "0", "margin": "0", "display": "flex", "flex-direction": "column" }
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true),
                  createVNode(Spacer),
                  typeof __props.buttonLink != "undefined" && __props.buttonLink !== "" && __props.buttonTitle !== "" && __props.buttonTitle !== null ? (openBlock(), createBlock(_component_router_link, {
                    key: 0,
                    to: __props.buttonLink,
                    class: "ma-4",
                    style: { "align-self": "end", "justify-self": "end" }
                  }, {
                    default: withCtx(() => [
                      __props.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        to: __props.buttonLink,
                        variant: __props.buttonsStyles?.style ?? "tonal",
                        color: __props.buttonColor,
                        rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles?.rounded : "8px"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.buttonTitle), 1)
                        ]),
                        _: 1
                      }, 8, ["to", "variant", "color", "rounded"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["to"])) : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["lg", "xl"]),
              createVNode(ACol, {
                cols: 12,
                sm: 12,
                md: 12,
                class: "padding-md-16px",
                lg: typeof __props.imageSize === "undefined" ? 6 : __props.imageSize,
                xl: typeof __props.imageSize === "undefined" ? 6 : __props.imageSize,
                style: { "padding": "0" }
              }, {
                default: withCtx(() => [
                  createVNode(VImg, {
                    src: __props.src,
                    cover: "",
                    class: "float-right radius-md-16px radius-lng"
                  }, null, 8, ["src"])
                ]),
                _: 1
              }, 8, ["lg", "xl"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/LightGradientFullContent.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const LightGradientFullContent = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-17c634f4"]]), { __name: "EditorElementsElementsLightGradientFullContent" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "LightGradientFullContentReverse",
  __ssrInlineRender: true,
  props: {
    src: {},
    gradient: {},
    buttonTitle: {},
    buttonLink: {},
    buttonsStyles: {},
    buttonColor: {},
    contentSize: {},
    imageSize: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content position-relative" }, _attrs))} data-v-3c26bee0><div class="left-border position-absolute" data-v-3c26bee0><div class="neon reverse-fa" style="${ssrRenderStyle("background: " + __props.gradient)}" data-v-3c26bee0></div></div><div class="body-content" data-v-3c26bee0>`);
      _push(ssrRenderComponent(ARow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ACol, {
              cols: 12,
              sm: 12,
              md: 12,
              lg: typeof __props.imageSize === "undefined" ? 6 : __props.imageSize,
              xl: typeof __props.imageSize === "undefined" ? 6 : __props.imageSize,
              style: { "padding": "0" },
              class: "padding-md-16px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VImg, {
                    src: __props.src,
                    width: "100%",
                    height: "100%",
                    cover: "",
                    class: "float-right radius-md-16px radius-lng"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VImg, {
                      src: __props.src,
                      width: "100%",
                      height: "100%",
                      cover: "",
                      class: "float-right radius-md-16px radius-lng"
                    }, null, 8, ["src"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(ACol, {
              cols: 12,
              sm: 12,
              md: 12,
              lg: typeof __props.contentSize === "undefined" ? 6 : __props.contentSize,
              xl: typeof __props.contentSize === "undefined" ? 6 : __props.contentSize,
              style: { "padding": "0", "margin": "0", "display": "flex", "flex-direction": "column" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(Spacer, null, null, _parent3, _scopeId2));
                  if (typeof __props.buttonLink != "undefined" && __props.buttonLink !== "" && __props.buttonTitle !== "" && __props.buttonTitle !== null) {
                    _push3(ssrRenderComponent(_component_router_link, {
                      to: __props.buttonLink,
                      class: "ma-4",
                      style: { "align-self": "end", "justify-self": "end" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (__props.buttonTitle !== "") {
                            _push4(ssrRenderComponent(VBtn, {
                              to: __props.buttonLink,
                              variant: __props.buttonsStyles?.style ?? "tonal",
                              color: __props.buttonColor,
                              rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles?.rounded : "8px"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(__props.buttonTitle)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(__props.buttonTitle), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            __props.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                              key: 0,
                              to: __props.buttonLink,
                              variant: __props.buttonsStyles?.style ?? "tonal",
                              color: __props.buttonColor,
                              rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles?.rounded : "8px"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.buttonTitle), 1)
                              ]),
                              _: 1
                            }, 8, ["to", "variant", "color", "rounded"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true),
                    createVNode(Spacer),
                    typeof __props.buttonLink != "undefined" && __props.buttonLink !== "" && __props.buttonTitle !== "" && __props.buttonTitle !== null ? (openBlock(), createBlock(_component_router_link, {
                      key: 0,
                      to: __props.buttonLink,
                      class: "ma-4",
                      style: { "align-self": "end", "justify-self": "end" }
                    }, {
                      default: withCtx(() => [
                        __props.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          to: __props.buttonLink,
                          variant: __props.buttonsStyles?.style ?? "tonal",
                          color: __props.buttonColor,
                          rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles?.rounded : "8px"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.buttonTitle), 1)
                          ]),
                          _: 1
                        }, 8, ["to", "variant", "color", "rounded"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["to"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(ACol, {
                cols: 12,
                sm: 12,
                md: 12,
                lg: typeof __props.imageSize === "undefined" ? 6 : __props.imageSize,
                xl: typeof __props.imageSize === "undefined" ? 6 : __props.imageSize,
                style: { "padding": "0" },
                class: "padding-md-16px"
              }, {
                default: withCtx(() => [
                  createVNode(VImg, {
                    src: __props.src,
                    width: "100%",
                    height: "100%",
                    cover: "",
                    class: "float-right radius-md-16px radius-lng"
                  }, null, 8, ["src"])
                ]),
                _: 1
              }, 8, ["lg", "xl"]),
              createVNode(ACol, {
                cols: 12,
                sm: 12,
                md: 12,
                lg: typeof __props.contentSize === "undefined" ? 6 : __props.contentSize,
                xl: typeof __props.contentSize === "undefined" ? 6 : __props.contentSize,
                style: { "padding": "0", "margin": "0", "display": "flex", "flex-direction": "column" }
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true),
                  createVNode(Spacer),
                  typeof __props.buttonLink != "undefined" && __props.buttonLink !== "" && __props.buttonTitle !== "" && __props.buttonTitle !== null ? (openBlock(), createBlock(_component_router_link, {
                    key: 0,
                    to: __props.buttonLink,
                    class: "ma-4",
                    style: { "align-self": "end", "justify-self": "end" }
                  }, {
                    default: withCtx(() => [
                      __props.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        to: __props.buttonLink,
                        variant: __props.buttonsStyles?.style ?? "tonal",
                        color: __props.buttonColor,
                        rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles?.rounded : "8px"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.buttonTitle), 1)
                        ]),
                        _: 1
                      }, 8, ["to", "variant", "color", "rounded"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["to"])) : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["lg", "xl"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/LightGradientFullContentReverse.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const LightGradientFullContentReverse = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-3c26bee0"]]), { __name: "EditorElementsElementsLightGradientFullContentReverse" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Flex",
  __ssrInlineRender: true,
  props: {
    fd: { default: "row" },
    jc: { default: "flex-start" },
    ai: { default: "stretch" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: `display: flex;flex-direction: ${__props.fd}; align-items: ${__props.ai}; justify-content: ${__props.jc};`
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/common/Flex.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Flex = Object.assign(_sfc_main$5, { __name: "EditorElementsElementsCommonFlex" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BackgroundAndGradientCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    src: { default: "" },
    height: { default: "500px" },
    imageClass: { default: "" },
    gradient: {},
    buttonTitle: {},
    buttonLink: {},
    buttonsStyles: {},
    borderRadius: {},
    buttonColor: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "hero-bg " + __props.imageClass,
        style: `position:relative;background-image: url('${__props.src}');height: ${__props.height};border-radius:${typeof __props.borderRadius === "undefined" ? "0px" : __props.borderRadius}`
      }, _attrs))} data-v-884df0b7><div class="content" data-v-884df0b7><h3 class="px-2 title-height" data-v-884df0b7>${ssrInterpolate(__props.title)}</h3>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (typeof __props.buttonTitle !== "undefined" && __props.buttonTitle !== "") {
        _push(ssrRenderComponent(Flex, {
          fd: "row",
          jc: "flex-end",
          style: { "padding": "0 16px 16px 16px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (__props.buttonTitle !== "" && typeof __props.buttonLink !== "undefined" && !!__props.buttonLink) {
                _push2(ssrRenderComponent(VBtn, {
                  to: !__props.buttonLink?.includes("http") ? __props.buttonLink : void 0,
                  href: __props.buttonLink?.includes("http") ? __props.buttonLink : void 0,
                  target: __props.buttonLink.includes("http") ? "_blank" : void 0,
                  class: "mt-2",
                  variant: __props.buttonsStyles?.style ?? "tonal",
                  color: __props.buttonColor,
                  rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles.rounded : "8px"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(__props.buttonTitle)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(__props.buttonTitle), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                __props.buttonTitle !== "" && typeof __props.buttonLink !== "undefined" && !!__props.buttonLink ? (openBlock(), createBlock(VBtn, {
                  key: 0,
                  to: !__props.buttonLink?.includes("http") ? __props.buttonLink : void 0,
                  href: __props.buttonLink?.includes("http") ? __props.buttonLink : void 0,
                  target: __props.buttonLink.includes("http") ? "_blank" : void 0,
                  class: "mt-2",
                  variant: __props.buttonsStyles?.style ?? "tonal",
                  color: __props.buttonColor,
                  rounded: __props.buttonsStyles?.rounded ? __props.buttonsStyles.rounded : "8px"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(__props.buttonTitle), 1)
                  ]),
                  _: 1
                }, 8, ["to", "href", "target", "variant", "color", "rounded"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (typeof __props.gradient !== "undefined") {
        _push(`<div class="gradient" style="${ssrRenderStyle(`background:${__props.gradient} `)}" data-v-884df0b7></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/BackgroundAndGradientCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BackgroundAndGradientCard = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-884df0b7"]]), { __name: "EditorElementsElementsBackgroundAndGradientCard" });
const makeVCardActionsProps = propsFactory({
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardActions");
const VCardActions = genericComponent()({
  name: "VCardActions",
  props: makeVCardActionsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        slim: true,
        variant: "text"
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-card-actions", props.class]),
      "style": normalizeStyle(props.style)
    }, slots));
    return {};
  }
});
const makeVCardSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardSubtitle");
const VCardSubtitle = genericComponent()({
  name: "VCardSubtitle",
  props: makeVCardSubtitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-card-subtitle", props.class]),
      "style": normalizeStyle([{
        "--v-card-subtitle-opacity": props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});
const VCardTitle = createSimpleFunctional("v-card-title");
const makeCardItemProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  prependAvatar: String,
  prependIcon: IconValue,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VCardItem");
const VCardItem = genericComponent()({
  name: "VCardItem",
  props: makeCardItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasTitle = !!(props.title != null || slots.title);
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-card-item", props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-card-item__prepend"
        }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
          "key": "prepend-avatar",
          "density": props.density,
          "image": props.prependAvatar
        }, null), props.prependIcon && createVNode(VIcon, {
          "key": "prepend-icon",
          "density": props.density,
          "icon": props.prependIcon
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-card-item__content"
        }, [hasTitle && createVNode(VCardTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.() ?? toDisplayString(props.title)]
        }), hasSubtitle && createVNode(VCardSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [slots.subtitle?.() ?? toDisplayString(props.subtitle)]
        }), slots.default?.()]), hasAppend && createElementVNode("div", {
          "key": "append",
          "class": "v-card-item__append"
        }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
          "key": "append-icon",
          "density": props.density,
          "icon": props.appendIcon
        }, null), props.appendAvatar && createVNode(VAvatar, {
          "key": "append-avatar",
          "density": props.density,
          "image": props.appendAvatar
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !hasAppendMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            }
          }
        }, slots.append)])]
      });
    });
    return {};
  }
});
const makeVCardTextProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardText");
const VCardText = genericComponent()({
  name: "VCardText",
  props: makeVCardTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-card-text", props.class]),
      "style": normalizeStyle([{
        "--v-card-text-opacity": props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});
const makeVCardProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VCard");
const VCard = genericComponent()({
  name: "VCard",
  directives: {
    vRipple: Ripple
  },
  props: makeVCardProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const link = useLink(props, attrs);
    const loadingColor = shallowRef(void 0);
    watch(() => props.loading, (val, old) => {
      loadingColor.value = !val && typeof old === "string" ? old : typeof val === "boolean" ? void 0 : val;
    }, {
      immediate: true
    });
    useRender(() => {
      const isLink = props.link !== false && link.isLink.value;
      const isClickable = !props.disabled && props.link !== false && (props.link || link.isClickable.value);
      const Tag = isLink ? "a" : props.tag;
      const hasTitle = !!(slots.title || props.title != null);
      const hasSubtitle = !!(slots.subtitle || props.subtitle != null);
      const hasHeader = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasCardItem = hasHeader || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text != null);
      return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
        "class": ["v-card", {
          "v-card--disabled": props.disabled,
          "v-card--flat": props.flat,
          "v-card--hover": props.hover && !(props.disabled || props.flat),
          "v-card--link": isClickable
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, {
          "--v-card-height": convertToUnit(props.height)
        }, props.style],
        "onClick": isClickable && link.navigate.value,
        "tabindex": props.disabled ? -1 : void 0
      }), {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-card__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(LoaderSlot, {
          "name": "v-card",
          "active": !!props.loading,
          "color": loadingColor.value
        }, {
          default: slots.loader
        }), hasCardItem && createVNode(VCardItem, {
          "key": "item",
          "prependAvatar": props.prependAvatar,
          "prependIcon": props.prependIcon,
          "title": props.title,
          "subtitle": props.subtitle,
          "appendAvatar": props.appendAvatar,
          "appendIcon": props.appendIcon
        }, {
          default: slots.item,
          prepend: slots.prepend,
          title: slots.title,
          subtitle: slots.subtitle,
          append: slots.append
        }), hasText && createVNode(VCardText, {
          "key": "text"
        }, {
          default: () => [slots.text?.() ?? props.text]
        }), slots.default?.(), slots.actions && createVNode(VCardActions, null, {
          default: slots.actions
        }), genOverlays(isClickable, "v-card")]
      }), [[Ripple, isClickable && props.ripple]]);
    });
    return {};
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SimpleCard",
  __ssrInlineRender: true,
  props: {
    link: { default: "" },
    image: { default: "" },
    imageHeight: { default: "200px" },
    cardAnimation: { default: "none" },
    title: { default: "" },
    subTitle: { default: "" },
    fullTitle: { default: "false" },
    buttonTitle: { default: "" },
    buttonColor: { default: "primary" },
    buttonStyle: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        padding: "0px",
        flat: "",
        border: "",
        style: { "border-radius": "8px" },
        color: "transparent",
        class: __props.cardAnimation
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("height", __props.imageHeight)} class="image" style="${ssrRenderStyle({
              width: "100%",
              height: __props.imageHeight,
              objectFit: "cover",
              display: "block"
            })}" fetchpriority="high" loading="eager" decoding="async"${ssrRenderAttr("alt", __props.title)} data-v-096dcbb2${_scopeId}>`);
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h4 style="${ssrRenderStyle({ color: __props.buttonColor })}" class="${ssrRenderClass(`text-h6  font-weight-regular mt-2 ${__props.fullTitle.toString() == "false" ? "title" : ""}`)}" data-v-096dcbb2${_scopeId2}>${__props.title ?? ""}</h4>`);
                  if (__props.subTitle !== "") {
                    _push3(`<span style="${ssrRenderStyle({ color: __props.buttonColor, opacity: 0.6 })}" class="text-caption font-weight-light" data-v-096dcbb2${_scopeId2}>${ssrInterpolate(__props.subTitle)}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="text-body-2 mt-2 pb-4 font-weight-regular" data-v-096dcbb2${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("h4", {
                      style: { color: __props.buttonColor },
                      class: `text-h6  font-weight-regular mt-2 ${__props.fullTitle.toString() == "false" ? "title" : ""}`,
                      innerHTML: __props.title
                    }, null, 14, ["innerHTML"]),
                    __props.subTitle !== "" ? (openBlock(), createBlock("span", {
                      key: 0,
                      style: { color: __props.buttonColor, opacity: 0.6 },
                      class: "text-caption font-weight-light"
                    }, toDisplayString(__props.subTitle), 5)) : createCommentVNode("", true),
                    createVNode("div", { class: "text-body-2 mt-2 pb-4 font-weight-regular" }, [
                      renderSlot(_ctx.$slots, "default", {}, void 0, true)
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (__props.buttonTitle !== "" && !!__props.buttonTitle) {
              _push2(ssrRenderComponent(VCardActions, { style: { "display": "flex", "justify-content": "flex-end" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      variant: __props.buttonStyle.style,
                      rounded: __props.buttonStyle.rounded ? __props.buttonStyle.rounded : "8px",
                      to: __props.link,
                      color: __props.buttonColor
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(__props.buttonTitle)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(__props.buttonTitle), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VBtn, {
                        variant: __props.buttonStyle.style,
                        rounded: __props.buttonStyle.rounded ? __props.buttonStyle.rounded : "8px",
                        to: __props.link,
                        color: __props.buttonColor
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.buttonTitle), 1)
                        ]),
                        _: 1
                      }, 8, ["variant", "rounded", "to", "color"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("img", {
                src: __props.image,
                height: __props.imageHeight,
                class: "image",
                style: {
                  width: "100%",
                  height: __props.imageHeight,
                  objectFit: "cover",
                  display: "block"
                },
                fetchpriority: "high",
                loading: "eager",
                decoding: "async",
                alt: __props.title
              }, null, 12, ["src", "height", "alt"]),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("h4", {
                    style: { color: __props.buttonColor },
                    class: `text-h6  font-weight-regular mt-2 ${__props.fullTitle.toString() == "false" ? "title" : ""}`,
                    innerHTML: __props.title
                  }, null, 14, ["innerHTML"]),
                  __props.subTitle !== "" ? (openBlock(), createBlock("span", {
                    key: 0,
                    style: { color: __props.buttonColor, opacity: 0.6 },
                    class: "text-caption font-weight-light"
                  }, toDisplayString(__props.subTitle), 5)) : createCommentVNode("", true),
                  createVNode("div", { class: "text-body-2 mt-2 pb-4 font-weight-regular" }, [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ])
                ]),
                _: 2
              }, 1024),
              __props.buttonTitle !== "" && !!__props.buttonTitle ? (openBlock(), createBlock(VCardActions, {
                key: 0,
                style: { "display": "flex", "justify-content": "flex-end" }
              }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    variant: __props.buttonStyle.style,
                    rounded: __props.buttonStyle.rounded ? __props.buttonStyle.rounded : "8px",
                    to: __props.link,
                    color: __props.buttonColor
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.buttonTitle), 1)
                    ]),
                    _: 1
                  }, 8, ["variant", "rounded", "to", "color"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/SimpleCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SimpleCard = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-096dcbb2"]]), { __name: "EditorElementsElementsSimpleCard" });
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
const _sfc_main$2 = {
  __name: "EditorElementsElementsImageFeature",
  __ssrInlineRender: true,
  props: {
    element: { type: Object, required: true },
    config: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const isSecondImageVisible = ref(false);
    let intervalId = null;
    const hasSecondImage = computed(() => !!props.element.data.imageFile2);
    const img1 = computed(() => `${props.config.public.baseUrl}/${props.element.data.imageFile}`);
    const img2 = computed(() => `${props.config.public.baseUrl}/${props.element.data.imageFile2}`);
    const startTimer = () => {
      if (hasSecondImage.value) {
        intervalId = setInterval();
      }
    };
    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
    const handleMouseEnter = () => {
      stopTimer();
      isSecondImageVisible.value = !isSecondImageVisible.value;
    };
    const handleMouseLeave = () => {
      isSecondImageVisible.value = !isSecondImageVisible.value;
      startTimer();
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.element.element_key === "Image") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "image-wrapper" }, _attrs))} data-v-f108a58b>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.element.data.link ? "router-link" : "div"), {
          to: __props.element.data.link,
          class: "image-container",
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
          style: {
            width: __props.element.data.width,
            height: __props.element.data.height,
            borderRadius: __props.element.data.borderRadius,
            cursor: hasSecondImage.value ? "pointer" : "unset"
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VImg, {
                src: img1.value,
                height: __props.element.data.height,
                width: __props.element.data.width,
                alt: __props.element.data.alt,
                cover: "",
                class: "main-img"
              }, null, _parent2, _scopeId));
              _push2(``);
              if (hasSecondImage.value) {
                _push2(ssrRenderComponent(VImg, {
                  style: isSecondImageVisible.value ? null : { display: "none" },
                  src: img2.value,
                  height: __props.element.data.height,
                  width: __props.element.data.width,
                  cover: "",
                  class: "loop-layer"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(VImg, {
                  src: img1.value,
                  height: __props.element.data.height,
                  width: __props.element.data.width,
                  alt: __props.element.data.alt,
                  cover: "",
                  class: "main-img"
                }, null, 8, ["src", "height", "width", "alt"]),
                createVNode(Transition, { name: "fade" }, {
                  default: withCtx(() => [
                    hasSecondImage.value ? withDirectives((openBlock(), createBlock(VImg, {
                      key: 0,
                      src: img2.value,
                      height: __props.element.data.height,
                      width: __props.element.data.width,
                      cover: "",
                      class: "loop-layer"
                    }, null, 8, ["src", "height", "width"])), [
                      [vShow, isSecondImageVisible.value]
                    ]) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/ImageFeature.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ImageFeature = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-f108a58b"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ABreak",
  __ssrInlineRender: true,
  props: {
    color: { default: "lightgray" },
    direction: { default: "horizontal" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.direction === "horizontal") {
        _push(`<div style="${ssrRenderStyle(`width: 100% ; height: 1px ; background-color: ${__props.color};opacity:0.3`)}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.direction === "vertical") {
        _push(`<div style="${ssrRenderStyle(`width: 1px ; height:100% ; background-color: ${__props.color};opacity:0.3`)}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/common/ABreak.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ABreak = Object.assign(_sfc_main$1, { __name: "EditorElementsElementsCommonABreak" });
const VExpansionPanelSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-expansion-panel");
const makeVExpansionPanelTextProps = propsFactory({
  ...makeComponentProps(),
  ...makeLazyProps()
}, "VExpansionPanelText");
const VExpansionPanelText = genericComponent()({
  name: "VExpansionPanelText",
  props: makeVExpansionPanelTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, expansionPanel.isSelected);
    useRender(() => createVNode(VExpandTransition, {
      "onAfterLeave": onAfterLeave
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-expansion-panel-text", props.class]),
        "style": normalizeStyle(props.style)
      }, [slots.default && hasContent.value && createElementVNode("div", {
        "class": "v-expansion-panel-text__wrapper"
      }, [slots.default?.()])]), [[vShow, expansionPanel.isSelected.value]])]
    }));
    return {};
  }
});
const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  hideActions: Boolean,
  focusable: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  },
  readonly: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VExpansionPanelTitle");
const VExpansionPanelTitle = genericComponent()({
  name: "VExpansionPanelTitle",
  directives: {
    vRipple: Ripple
  },
  props: makeVExpansionPanelTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      dimensionStyles
    } = useDimension(props);
    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly
    }));
    const icon = toRef(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon);
    useRender(() => withDirectives(createElementVNode("button", {
      "class": normalizeClass(["v-expansion-panel-title", {
        "v-expansion-panel-title--active": expansionPanel.isSelected.value,
        "v-expansion-panel-title--focusable": props.focusable,
        "v-expansion-panel-title--static": props.static
      }, backgroundColorClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, props.style]),
      "type": "button",
      "tabindex": expansionPanel.disabled.value ? -1 : void 0,
      "disabled": expansionPanel.disabled.value,
      "aria-expanded": expansionPanel.isSelected.value,
      "onClick": !props.readonly ? expansionPanel.toggle : void 0
    }, [createElementVNode("span", {
      "class": "v-expansion-panel-title__overlay"
    }, null), slots.default?.(slotProps.value), !props.hideActions && createVNode(VDefaultsProvider, {
      "defaults": {
        VIcon: {
          icon: icon.value
        }
      }
    }, {
      default: () => [createElementVNode("span", {
        "class": "v-expansion-panel-title__icon"
      }, [slots.actions?.(slotProps.value) ?? createVNode(VIcon, null, null)])]
    })]), [[Ripple, props.ripple]]));
    return {};
  }
});
const makeVExpansionPanelProps = propsFactory({
  title: String,
  text: String,
  bgColor: String,
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeVExpansionPanelTitleProps(),
  ...makeVExpansionPanelTextProps()
}, "VExpansionPanel");
const VExpansionPanel = genericComponent()({
  name: "VExpansionPanel",
  props: makeVExpansionPanelProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = toRef(() => groupItem?.disabled.value || props.disabled);
    const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
      return arr;
    }, []));
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      const expansionPanelTitleProps = VExpansionPanelTitle.filterProps(props);
      const expansionPanelTextProps = VExpansionPanelText.filterProps(props);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-expansion-panel", {
          "v-expansion-panel--active": groupItem.isSelected.value,
          "v-expansion-panel--before-active": isBeforeSelected.value,
          "v-expansion-panel--after-active": isAfterSelected.value,
          "v-expansion-panel--disabled": isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => [createElementVNode("div", {
          "class": normalizeClass(["v-expansion-panel__shadow", ...elevationClasses.value])
        }, null), createVNode(VDefaultsProvider, {
          "defaults": {
            VExpansionPanelTitle: {
              ...expansionPanelTitleProps
            },
            VExpansionPanelText: {
              ...expansionPanelTextProps
            }
          }
        }, {
          default: () => [hasTitle && createVNode(VExpansionPanelTitle, {
            "key": "title"
          }, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasText && createVNode(VExpansionPanelText, {
            "key": "text"
          }, {
            default: () => [slots.text ? slots.text() : props.text]
          }), slots.default?.()]
        })]
      });
    });
    return {
      groupItem
    };
  }
});
const allowedVariants = ["default", "accordion", "inset", "popout"];
const makeVExpansionPanelsProps = propsFactory({
  flat: Boolean,
  ...makeGroupProps(),
  ...pick$1(makeVExpansionPanelProps(), ["bgColor", "collapseIcon", "color", "eager", "elevation", "expandIcon", "focusable", "hideActions", "readonly", "ripple", "rounded", "tile", "static"]),
  ...makeThemeProps(),
  ...makeComponentProps(),
  ...makeTagProps(),
  variant: {
    type: String,
    default: "default",
    validator: (v) => allowedVariants.includes(v)
  }
}, "VExpansionPanels");
const VExpansionPanels = genericComponent()({
  name: "VExpansionPanels",
  props: makeVExpansionPanelsProps(),
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      next,
      prev
    } = useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = provideTheme(props);
    const variantClass = toRef(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(() => props.bgColor),
        collapseIcon: toRef(() => props.collapseIcon),
        color: toRef(() => props.color),
        eager: toRef(() => props.eager),
        elevation: toRef(() => props.elevation),
        expandIcon: toRef(() => props.expandIcon),
        focusable: toRef(() => props.focusable),
        hideActions: toRef(() => props.hideActions),
        readonly: toRef(() => props.readonly),
        ripple: toRef(() => props.ripple),
        rounded: toRef(() => props.rounded),
        static: toRef(() => props.static)
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-expansion-panels", {
        "v-expansion-panels--flat": props.flat,
        "v-expansion-panels--tile": props.tile
      }, themeClasses.value, variantClass.value, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.default?.({
        prev,
        next
      })]
    }));
    return {
      next,
      prev
    };
  }
});
const __nuxt_component_0_lazy = defineAsyncComponent(() => import("./GradientCard-CUpEIw2w.js").then((c) => c.default || c));
const __nuxt_component_1_lazy = defineAsyncComponent(() => import("./DynamicTable-CNYo0fR5.js").then((c) => c.default || c));
const __nuxt_component_2_lazy = defineAsyncComponent(() => import("./AdvancedDesktopSlider-DbxDDGtJ.js").then((c) => c.default || c));
const __nuxt_component_3_lazy = defineAsyncComponent(() => import("./Team-B2DRav_Q.js").then((c) => c.default || c));
const __nuxt_component_4_lazy = defineAsyncComponent(() => import("./AdvancedSlider-CebVhLET.js").then((c) => c.default || c));
const __nuxt_component_5_lazy = defineAsyncComponent(() => import("./renderForm-CrEKWwI-.js").then((c) => c.default || c));
const __nuxt_component_6_lazy = defineAsyncComponent(() => import("./tileImage-sb-naaqw.js").then((c) => c.default || c));
const __nuxt_component_7_lazy = defineAsyncComponent(() => import("./modernSlider-DpgUaqtO.js").then((c) => c.default || c));
const __nuxt_component_8_lazy = defineAsyncComponent(() => import("./ProductsAndCategories-DQ1o8-i2.js").then((c) => c.default || c));
const __nuxt_component_9_lazy = defineAsyncComponent(() => import("./ProductsByIds-CTtyyJfu.js").then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Render",
  __ssrInlineRender: true,
  props: {
    rows: {},
    marginTop: {},
    is_footer: {},
    locale: {}
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const { mdAndUp, mdAndDown, xlAndUp } = useDisplay();
    ref(null);
    const getColumnInnerStyles = (column) => {
      const baseFlex = !column?.elementsStyles || column.elementsStyles.flexDirection === "unset" ? { display: "flex", flexDirection: "column", flex: 1 } : { ...column.elementsStyles, display: "flex" };
      const filteredStyles = { ...column.styles };
      if (filteredStyles.backdropFilter === "blur()") {
        delete filteredStyles.backdropFilter;
      }
      const activePadding = mdAndUp.value ? column.padding : column.paddingM ?? column.padding;
      return [baseFlex, filteredStyles, activePadding];
    };
    const getElementPadding = (element) => {
      if (mdAndDown.value) return element.paddingMd ?? element.padding;
      if (xlAndUp.value) return element.paddingXl ?? element.padding;
      return element.padding;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LazyEditorElementsElementsGradientCard = __nuxt_component_0_lazy;
      const _component_LazyEditorElementsElementsDynamicTable = __nuxt_component_1_lazy;
      const _component_LazyEditorElementsElementsAdvancedDesktopSlider = __nuxt_component_2_lazy;
      const _component_LazyEditorElementsElementsTeam = __nuxt_component_3_lazy;
      const _component_LazyEditorElementsElementsAdvancedSlider = __nuxt_component_4_lazy;
      const _component_LazyEditorElementsRenderForm = __nuxt_component_5_lazy;
      const _component_LazyEditorElementsElementsTileImage = __nuxt_component_6_lazy;
      const _component_LazyEditorElementsElementsModernSlider = __nuxt_component_7_lazy;
      const _component_LazyEditorElementsElementsProductsAndCategories = __nuxt_component_8_lazy;
      const _component_LazyEditorElementsElementsProductsByIds = __nuxt_component_9_lazy;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "handle-width" }, _attrs))} data-v-e8a4fe2b><!--[-->`);
      ssrRenderList(__props.rows, (row, index) => {
        _push(ssrRenderComponent(VContainer, {
          fluid: row.container === "fluid" || row.container === "fluid-normal",
          class: index === 0 && !(__props.marginTop === "0px" || __props.marginTop === "") ? "mobile-margin-top" : "",
          style: { padding: 0, marginTop: index === 0 ? "-" + __props.marginTop : "unset" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(ContainerBox, {
                isNormalInFluid: row.container === "fluid-normal",
                reverseOnMobile: row.reverse_on_mobile,
                style: [
                  row.margin,
                  row.padding,
                  {
                    background: row.background_type === "color" ? row.background : `url(${unref(config).public.baseUrl}/${row.background})`,
                    position: "relative",
                    backgroundPosition: "center center",
                    border: "unset",
                    borderRadius: "unset",
                    backgroundSize: "cover"
                  }
                ]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(row.columns, (column) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: row.id.toString() + column.id.toString() + "column",
                        style: { "position": "relative", "display": "flex", "flex-direction": "column", "padding": "0px" },
                        cols: "12",
                        xl: column.column_xl,
                        lg: column.column_lg,
                        md: column.column_md,
                        sm: column.column_sm
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div style="${ssrRenderStyle([{ "position": "relative", "display": "flex", "flex-direction": "column", "flex": "1", "height": "100%" }, { padding: column.gap ?? "8px" }])}" data-v-e8a4fe2b${_scopeId3}><div class="${ssrRenderClass(column.animation ? `reveal ${column.animation}` : "")}" style="${ssrRenderStyle({ borderRadius: column.styles?.borderRadius, flex: column.animation !== "fade-in-blur" ? 1 : "unset", display: "flex", flexDirection: "column", position: "relative", width: "100%", height: "100%" })}" data-v-e8a4fe2b${_scopeId3}><div style="${ssrRenderStyle([{ "height": "100%" }, getColumnInnerStyles(column)])}" data-v-e8a4fe2b${_scopeId3}><!--[-->`);
                            ssrRenderList(column.elements, (element) => {
                              _push4(`<div style="${ssrRenderStyle([{ position: "relative", display: "flex", flexDirection: "column" }, getElementPadding(element), { flex: element.element_key === "BorderGradientCard" ? column.animation !== "fade-in-blur" ? 1 : "unset" : element.data?.height === "full" ? 1 : "unset" }])}" class="${ssrRenderClass(element.animation ? `reveal ${element.animation}` : "")}" data-v-e8a4fe2b${_scopeId3}>`);
                              if (element.element_key === "LightGradientAndContents" && !element.data.reverse) {
                                _push4(ssrRenderComponent(LightGradientFullContent, {
                                  src: `${unref(config).public.baseUrl}/${element.data.imageFile}`,
                                  "content-size": element.data.columnLG,
                                  "image-size": 12 - element.data.columnLG,
                                  gradient: `linear-gradient(to left, ${element.data.gradientColor1}, ${element.data.gradientColor2}, ${element.data.gradientColor3})`,
                                  "button-title": element.data.buttonTitle,
                                  "button-link": element.data.buttonLink,
                                  "button-color": element.data.buttonColor,
                                  "buttons-styles": element.data.ButtonsStyles
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<div class="pa-4" data-v-e8a4fe2b${_scopeId4}>${element.data.content ?? ""}</div>`);
                                    } else {
                                      return [
                                        createVNode("div", {
                                          class: "pa-4",
                                          innerHTML: element.data.content
                                        }, null, 8, ["innerHTML"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "LightGradientAndContents" && element.data.reverse) {
                                _push4(ssrRenderComponent(LightGradientFullContentReverse, {
                                  src: `${unref(config).public.baseUrl}/${element.data.imageFile}`,
                                  "content-size": element.data.columnLG,
                                  "image-size": 12 - element.data.columnLG,
                                  gradient: `linear-gradient(to left, ${element.data.gradientColor1}, ${element.data.gradientColor2}, ${element.data.gradientColor3})`,
                                  "button-title": element.data.buttonTitle,
                                  "button-link": element.data.buttonLink,
                                  "button-color": element.data.buttonColor,
                                  "buttons-styles": element.data.ButtonsStyles
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<div class="pa-4" data-v-e8a4fe2b${_scopeId4}>${element.data.content ?? ""}</div>`);
                                    } else {
                                      return [
                                        createVNode("div", {
                                          class: "pa-4",
                                          innerHTML: element.data.content
                                        }, null, 8, ["innerHTML"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "SimpleContent") {
                                _push4(`<div data-v-e8a4fe2b${_scopeId3}>${element.data.content ?? ""}</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Button") {
                                _push4(ssrRenderComponent(VCol, {
                                  style: [element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align }]
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      if (element.data.buttonTitle !== "") {
                                        _push5(ssrRenderComponent(VBtn, {
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                          href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                          target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                          variant: element.data.ButtonsStyles?.style,
                                          block: element.data.fullWidth,
                                          color: element.data.buttonColor,
                                          style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                          rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, createSlots({
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              if (element.data.icon) {
                                                _push6(ssrRenderComponent(VIcon, null, {
                                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                    if (_push7) {
                                                      _push7(`${ssrInterpolate(element.data.buttonIcon)}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent6, _scopeId5));
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                              if (!element.data.icon) {
                                                _push6(`<span style="${ssrRenderStyle({ "padding-top": "2px" })}" data-v-e8a4fe2b${_scopeId5}>${ssrInterpolate(element.data.buttonTitle)}</span>`);
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                            } else {
                                              return [
                                                element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                !element.data.icon ? (openBlock(), createBlock("span", {
                                                  key: 1,
                                                  style: { "padding-top": "2px" }
                                                }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, [
                                          element.data.buttonIcon !== "mdi-disable" ? {
                                            name: "prepend",
                                            fn: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                              if (_push6) {
                                                if (element.data.buttonIcon !== "") {
                                                  _push6(ssrRenderComponent(VIcon, null, {
                                                    default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                      if (_push7) {
                                                        _push7(`${ssrInterpolate(element.data.buttonIcon)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent6, _scopeId5));
                                                } else {
                                                  _push6(`<!---->`);
                                                }
                                              } else {
                                                return [
                                                  element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true)
                                                ];
                                              }
                                            }),
                                            key: "0"
                                          } : void 0
                                        ]), _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                          key: 0,
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                          href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                          target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                          variant: element.data.ButtonsStyles?.style,
                                          block: element.data.fullWidth,
                                          color: element.data.buttonColor,
                                          style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                          rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, createSlots({
                                          default: withCtx(() => [
                                            element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            !element.data.icon ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              style: { "padding-top": "2px" }
                                            }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, [
                                          element.data.buttonIcon !== "mdi-disable" ? {
                                            name: "prepend",
                                            fn: withCtx(() => [
                                              element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ]),
                                            key: "0"
                                          } : void 0
                                        ]), 1032, ["icon", "size", "to", "href", "target", "variant", "block", "color", "style", "rounded"])) : createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "BackgroundAndGradientCard") {
                                _push4(`<div style="${ssrRenderStyle({ "width": "100%" })}" data-v-e8a4fe2b${_scopeId3}>`);
                                if (element.data.backgroundFile) {
                                  _push4(ssrRenderComponent(BackgroundAndGradientCard, {
                                    "more-link": "/sample/link",
                                    src: `${unref(config).public.baseUrl}/${element.data.backgroundFile}`,
                                    height: element.data.height,
                                    class: element.data.cssClass,
                                    "border-radius": element.data.borderRadius,
                                    title: element.data.title,
                                    "button-title": element.data.buttonTitle,
                                    "button-color": element.data.buttonColor,
                                    "button-link": element.data.buttonLink,
                                    "buttons-styles": element.data.ButtonsStyles,
                                    gradient: `linear-gradient(180deg, ${element.data.gradientColor1} 1%, ${element.data.gradientColor2} 50%, ${element.data.gradientColor3} 100%)`
                                  }, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                                        _push5(ssrRenderComponent(Flex, {
                                          fd: "column",
                                          ai: "flex-start"
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`<div class="px-4" data-v-e8a4fe2b${_scopeId5}>${element.data.content ?? ""}</div>`);
                                            } else {
                                              return [
                                                createVNode("div", {
                                                  class: "px-4",
                                                  innerHTML: element.data.content
                                                }, null, 8, ["innerHTML"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        return [
                                          createVNode(VSpacer),
                                          createVNode(Flex, {
                                            fd: "column",
                                            ai: "flex-start"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", {
                                                class: "px-4",
                                                innerHTML: element.data.content
                                              }, null, 8, ["innerHTML"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Image") {
                                _push4(ssrRenderComponent(ImageFeature, {
                                  element,
                                  config: unref(config)
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "SimpleCard") {
                                _push4(ssrRenderComponent(SimpleCard, {
                                  "full-title": element.data?.fullTitle ?? "false",
                                  "image-height": element.data.height,
                                  image: `${unref(config).public.baseUrl}/${element.data.backgroundFile}`,
                                  title: element.data.title,
                                  "sub-title": element.data.subTitle,
                                  link: element.data.buttonLink,
                                  "card-animation": element.data.cardAnimations ?? "none",
                                  "button-color": element.data.buttonColor,
                                  "button-style": element.data.ButtonsStyles,
                                  "button-title": element.data.buttonTitle
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<div data-v-e8a4fe2b${_scopeId4}>${element.data.content ?? ""}</div>`);
                                    } else {
                                      return [
                                        createVNode("div", {
                                          innerHTML: element.data.content
                                        }, null, 8, ["innerHTML"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "BorderGradientCard") {
                                _push4(`<div style="${ssrRenderStyle({ "flex": "1", "display": "flex", "flex-direction": "column" })}" data-v-e8a4fe2b${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsGradientCard, {
                                  "main-background": element.data.color,
                                  background: `linear-gradient(50deg, ${element.data.gradientColor1} 1%, ${element.data.gradientColor2} 28%, ${element.data.gradientColor3} 58%, ${element.data.gradientColor4} 70%, ${element.data.gradientColor5})`
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<div class="d-flex flex-column ga-2 align-center" style="${ssrRenderStyle({ "flex": "1" })}" data-v-e8a4fe2b${_scopeId4}>`);
                                      if (element.data.iconType === "MDI Font Icon") {
                                        _push5(ssrRenderComponent(VIcon, {
                                          class: `${element.data.icon} mdi v-icon notranslate v-theme--light tile-icon`,
                                          style: [{ "font-size": "48px", "height": "48px", "width": "48px" }, { color: element.data.buttonColor }],
                                          "aria-hidden": "true"
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`${ssrInterpolate(element.data.icon)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(element.data.icon), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      if (element.data.iconType === "Image" && element.data.iconFile) {
                                        _push5(`<img${ssrRenderAttr("alt", element.data.content)} style="${ssrRenderStyle({ "background-size": "contain", "height": "48px", "width": "48px" })}"${ssrRenderAttr("src", `${unref(config).public.baseUrl}/${element.data.iconFile}`)} data-v-e8a4fe2b${_scopeId4}>`);
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(`<div style="${ssrRenderStyle({ "flex": "1" })}" data-v-e8a4fe2b${_scopeId4}>${element.data.content ?? ""}</div>`);
                                      if (element.data.buttonTitle) {
                                        _push5(ssrRenderComponent(ABreak, { color: "lightgray" }, null, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      if (element.data.buttonTitle) {
                                        _push5(ssrRenderComponent(VBtn, {
                                          to: !element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                          href: element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                          target: element.data.buttonLink.includes("http") ? "_blank" : void 0,
                                          variant: element.data.ButtonsStyles?.style,
                                          color: element.data.buttonColor,
                                          rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`${ssrInterpolate(element.data.buttonTitle)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(element.data.buttonTitle), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", {
                                          class: "d-flex flex-column ga-2 align-center",
                                          style: { "flex": "1" }
                                        }, [
                                          element.data.iconType === "MDI Font Icon" ? (openBlock(), createBlock(VIcon, {
                                            key: 0,
                                            class: `${element.data.icon} mdi v-icon notranslate v-theme--light tile-icon`,
                                            style: [{ "font-size": "48px", "height": "48px", "width": "48px" }, { color: element.data.buttonColor }],
                                            "aria-hidden": "true"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(element.data.icon), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class", "style"])) : createCommentVNode("", true),
                                          element.data.iconType === "Image" && element.data.iconFile ? (openBlock(), createBlock("img", {
                                            key: 1,
                                            alt: element.data.content,
                                            style: { "background-size": "contain", "height": "48px", "width": "48px" },
                                            src: `${unref(config).public.baseUrl}/${element.data.iconFile}`
                                          }, null, 8, ["alt", "src"])) : createCommentVNode("", true),
                                          createVNode("div", {
                                            innerHTML: element.data.content,
                                            style: { "flex": "1" }
                                          }, null, 8, ["innerHTML"]),
                                          element.data.buttonTitle ? (openBlock(), createBlock(ABreak, {
                                            key: 2,
                                            color: "lightgray"
                                          })) : createCommentVNode("", true),
                                          element.data.buttonTitle ? (openBlock(), createBlock(VBtn, {
                                            key: 3,
                                            to: !element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                            href: element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                            target: element.data.buttonLink.includes("http") ? "_blank" : void 0,
                                            variant: element.data.ButtonsStyles?.style,
                                            color: element.data.buttonColor,
                                            rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(element.data.buttonTitle), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["to", "href", "target", "variant", "color", "rounded"])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "DynamicTable") {
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsDynamicTable, {
                                  data: element.data
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "AdvancedDesktopSlider" && unref(mdAndUp)) {
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsAdvancedDesktopSlider, {
                                  "autoplay-delay": element.data.autoplayDelay,
                                  height: element.data.height ?? "300px",
                                  "slides-data": element.data.items
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Faq") {
                                _push4(ssrRenderComponent(VExpansionPanels, null, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<!--[-->`);
                                      ssrRenderList(element.data.items, (item, idx) => {
                                        _push5(ssrRenderComponent(VExpansionPanel, { key: idx }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(ssrRenderComponent(VExpansionPanelTitle, null, {
                                                default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                  if (_push7) {
                                                    _push7(`${ssrInterpolate(item.title)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(item.title), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent6, _scopeId5));
                                              _push6(ssrRenderComponent(VExpansionPanelText, null, {
                                                default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                  if (_push7) {
                                                    _push7(`<div class="px-3" data-v-e8a4fe2b${_scopeId6}>${item.description ?? ""}</div>`);
                                                  } else {
                                                    return [
                                                      createVNode("div", {
                                                        class: "px-3",
                                                        innerHTML: item.description
                                                      }, null, 8, ["innerHTML"])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent6, _scopeId5));
                                            } else {
                                              return [
                                                createVNode(VExpansionPanelTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(VExpansionPanelText, null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", {
                                                      class: "px-3",
                                                      innerHTML: item.description
                                                    }, null, 8, ["innerHTML"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      });
                                      _push5(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(element.data.items, (item, idx) => {
                                          return openBlock(), createBlock(VExpansionPanel, { key: idx }, {
                                            default: withCtx(() => [
                                              createVNode(VExpansionPanelTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(VExpansionPanelText, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", {
                                                    class: "px-3",
                                                    innerHTML: item.description
                                                  }, null, 8, ["innerHTML"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "IconItems") {
                                _push4(ssrRenderComponent(VList, { dense: "" }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<!--[-->`);
                                      ssrRenderList(element.data.items, (item, idx) => {
                                        _push5(ssrRenderComponent(VListItem, {
                                          key: idx,
                                          "prepend-icon": item.icon
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`${ssrInterpolate(item.title)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(item.title), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      });
                                      _push5(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(element.data.items, (item, idx) => {
                                          return openBlock(), createBlock(VListItem, {
                                            key: idx,
                                            "prepend-icon": item.icon
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.title), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["prepend-icon"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Team") {
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsTeam, {
                                  name: element.data.fullName,
                                  position: element.data.role,
                                  image: `${unref(config).public.baseUrl}/${element.data.profile}`
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "AdvancedSlider") {
                                _push4(`<div style="${ssrRenderStyle({ "width": "100%", "position": "relative" })}" data-v-e8a4fe2b${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsAdvancedSlider, {
                                  height: element.data.height,
                                  "hover-effect": element.data.hoverEffect,
                                  mode: element.data.mode,
                                  "slides-data": element.data.items,
                                  radius: element.data.borderRadius,
                                  delay: element.data.delay,
                                  effect: element.data.effect,
                                  locale: __props.locale
                                }, null, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Form") {
                                _push4(ssrRenderComponent(_component_LazyEditorElementsRenderForm, {
                                  rows: element.rows,
                                  form: element.form
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "TileImage") {
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsTileImage, {
                                  background: `${unref(config).public.baseUrl}/${element.data.background}`,
                                  height: element.data.height,
                                  title: element.data.title,
                                  to: element.data.to,
                                  btn_color: element.data.btn_color,
                                  btn_title: element.data.btn_title,
                                  btn_text_color: element.data.btn_text_color,
                                  btn_link: element.data.btn_link,
                                  description: element.data.description,
                                  gradient: element.data.gradient,
                                  texts_position: element.data.texts_position
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "Break") {
                                _push4(ssrRenderComponent(VDivider, { style: { "filter": "invert(100%)" } }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "ModernSlider") {
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsModernSlider, {
                                  "border-radius": element.data.borderRadius,
                                  "slider-height": element.data.sliderHeight,
                                  "auto-play": element.data.autoPlay,
                                  delay: element.data.delay,
                                  slides: element.data.slides
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "ProductsAndCategories") {
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsProductsAndCategories, {
                                  locale: __props.locale,
                                  "ui-styles": { buy: { title: element.data.buyTitle, icon: element.data.buyIcon, color: element.data.buyColor, variant: element.data.buyVariant, rounded: element.data.buyRounded, modal: { icon: element.data.modalIcon, color: element.data.modalColor, rounded: element.data.modalRounded, selectQuantityTitle: element.data.modalSelectQuantityTitle, title: element.data.modalTitle, variant: element.data.modalVariant, totalPriceTitle: element.data.modalTotalPriceTitle, unitPriceTitle: element.data.modalUnitPriceTitle } }, details: { title: element.data.detailsTitle, icon: element.data.detailsIcon, color: element.data.detailsColor, variant: element.data.detailsVariant, rounded: element.data.detailsRounded } }
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "ProductIds") {
                                _push4(ssrRenderComponent(_component_LazyEditorElementsElementsProductsByIds, {
                                  locale: __props.locale,
                                  "product-ids": element.data.ids,
                                  "ui-styles": { buy: { title: element.data.buyTitle, icon: element.data.buyIcon, color: element.data.buyColor, variant: element.data.buyVariant, rounded: element.data.buyRounded, modal: { icon: element.data.modalIcon, color: element.data.modalColor, rounded: element.data.modalRounded, selectQuantityTitle: element.data.modalSelectQuantityTitle, title: element.data.modalTitle, variant: element.data.modalVariant, totalPriceTitle: element.data.modalTotalPriceTitle, unitPriceTitle: element.data.modalUnitPriceTitle } }, details: { title: element.data.detailsTitle, icon: element.data.detailsIcon, color: element.data.detailsColor, variant: element.data.detailsVariant, rounded: element.data.detailsRounded } }
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                            });
                            _push4(`<!--]--></div></div></div>`);
                          } else {
                            return [
                              createVNode("div", {
                                style: [{ "position": "relative", "display": "flex", "flex-direction": "column", "flex": "1", "height": "100%" }, { padding: column.gap ?? "8px" }]
                              }, [
                                createVNode("div", {
                                  class: column.animation ? `reveal ${column.animation}` : "",
                                  style: { borderRadius: column.styles?.borderRadius, flex: column.animation !== "fade-in-blur" ? 1 : "unset", display: "flex", flexDirection: "column", position: "relative", width: "100%", height: "100%" }
                                }, [
                                  createVNode("div", {
                                    style: [{ "height": "100%" }, getColumnInnerStyles(column)]
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                      return openBlock(), createBlock("div", {
                                        key: element.id,
                                        style: [{ position: "relative", display: "flex", flexDirection: "column" }, getElementPadding(element), { flex: element.element_key === "BorderGradientCard" ? column.animation !== "fade-in-blur" ? 1 : "unset" : element.data?.height === "full" ? 1 : "unset" }],
                                        class: element.animation ? `reveal ${element.animation}` : ""
                                      }, [
                                        element.element_key === "LightGradientAndContents" && !element.data.reverse ? (openBlock(), createBlock(LightGradientFullContent, {
                                          key: 0,
                                          src: `${unref(config).public.baseUrl}/${element.data.imageFile}`,
                                          "content-size": element.data.columnLG,
                                          "image-size": 12 - element.data.columnLG,
                                          gradient: `linear-gradient(to left, ${element.data.gradientColor1}, ${element.data.gradientColor2}, ${element.data.gradientColor3})`,
                                          "button-title": element.data.buttonTitle,
                                          "button-link": element.data.buttonLink,
                                          "button-color": element.data.buttonColor,
                                          "buttons-styles": element.data.ButtonsStyles
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", {
                                              class: "pa-4",
                                              innerHTML: element.data.content
                                            }, null, 8, ["innerHTML"])
                                          ]),
                                          _: 2
                                        }, 1032, ["src", "content-size", "image-size", "gradient", "button-title", "button-link", "button-color", "buttons-styles"])) : createCommentVNode("", true),
                                        element.element_key === "LightGradientAndContents" && element.data.reverse ? (openBlock(), createBlock(LightGradientFullContentReverse, {
                                          key: 1,
                                          src: `${unref(config).public.baseUrl}/${element.data.imageFile}`,
                                          "content-size": element.data.columnLG,
                                          "image-size": 12 - element.data.columnLG,
                                          gradient: `linear-gradient(to left, ${element.data.gradientColor1}, ${element.data.gradientColor2}, ${element.data.gradientColor3})`,
                                          "button-title": element.data.buttonTitle,
                                          "button-link": element.data.buttonLink,
                                          "button-color": element.data.buttonColor,
                                          "buttons-styles": element.data.ButtonsStyles
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", {
                                              class: "pa-4",
                                              innerHTML: element.data.content
                                            }, null, 8, ["innerHTML"])
                                          ]),
                                          _: 2
                                        }, 1032, ["src", "content-size", "image-size", "gradient", "button-title", "button-link", "button-color", "buttons-styles"])) : createCommentVNode("", true),
                                        element.element_key === "SimpleContent" ? (openBlock(), createBlock("div", {
                                          key: 2,
                                          innerHTML: element.data.content
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                        element.element_key === "Button" ? (openBlock(), createBlock(VCol, {
                                          key: 3,
                                          style: [element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align }]
                                        }, {
                                          default: withCtx(() => [
                                            element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                              key: 0,
                                              icon: element.data.icon,
                                              size: element.data.icon ? "small" : void 0,
                                              to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                              href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                              target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                              variant: element.data.ButtonsStyles?.style,
                                              block: element.data.fullWidth,
                                              color: element.data.buttonColor,
                                              style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                              rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                            }, createSlots({
                                              default: withCtx(() => [
                                                element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                !element.data.icon ? (openBlock(), createBlock("span", {
                                                  key: 1,
                                                  style: { "padding-top": "2px" }
                                                }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                              ]),
                                              _: 2
                                            }, [
                                              element.data.buttonIcon !== "mdi-disable" ? {
                                                name: "prepend",
                                                fn: withCtx(() => [
                                                  element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true)
                                                ]),
                                                key: "0"
                                              } : void 0
                                            ]), 1032, ["icon", "size", "to", "href", "target", "variant", "block", "color", "style", "rounded"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["style"])) : createCommentVNode("", true),
                                        element.element_key === "BackgroundAndGradientCard" ? (openBlock(), createBlock("div", {
                                          key: 4,
                                          style: { "width": "100%" }
                                        }, [
                                          element.data.backgroundFile ? (openBlock(), createBlock(BackgroundAndGradientCard, {
                                            key: 0,
                                            "more-link": "/sample/link",
                                            src: `${unref(config).public.baseUrl}/${element.data.backgroundFile}`,
                                            height: element.data.height,
                                            class: element.data.cssClass,
                                            "border-radius": element.data.borderRadius,
                                            title: element.data.title,
                                            "button-title": element.data.buttonTitle,
                                            "button-color": element.data.buttonColor,
                                            "button-link": element.data.buttonLink,
                                            "buttons-styles": element.data.ButtonsStyles,
                                            gradient: `linear-gradient(180deg, ${element.data.gradientColor1} 1%, ${element.data.gradientColor2} 50%, ${element.data.gradientColor3} 100%)`
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VSpacer),
                                              createVNode(Flex, {
                                                fd: "column",
                                                ai: "flex-start"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", {
                                                    class: "px-4",
                                                    innerHTML: element.data.content
                                                  }, null, 8, ["innerHTML"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["src", "height", "class", "border-radius", "title", "button-title", "button-color", "button-link", "buttons-styles", "gradient"])) : createCommentVNode("", true)
                                        ])) : createCommentVNode("", true),
                                        element.element_key === "Image" ? (openBlock(), createBlock(ImageFeature, {
                                          key: 5,
                                          element,
                                          config: unref(config)
                                        }, null, 8, ["element", "config"])) : createCommentVNode("", true),
                                        element.element_key === "SimpleCard" ? (openBlock(), createBlock(SimpleCard, {
                                          key: 6,
                                          "full-title": element.data?.fullTitle ?? "false",
                                          "image-height": element.data.height,
                                          image: `${unref(config).public.baseUrl}/${element.data.backgroundFile}`,
                                          title: element.data.title,
                                          "sub-title": element.data.subTitle,
                                          link: element.data.buttonLink,
                                          "card-animation": element.data.cardAnimations ?? "none",
                                          "button-color": element.data.buttonColor,
                                          "button-style": element.data.ButtonsStyles,
                                          "button-title": element.data.buttonTitle
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", {
                                              innerHTML: element.data.content
                                            }, null, 8, ["innerHTML"])
                                          ]),
                                          _: 2
                                        }, 1032, ["full-title", "image-height", "image", "title", "sub-title", "link", "card-animation", "button-color", "button-style", "button-title"])) : createCommentVNode("", true),
                                        element.element_key === "BorderGradientCard" ? (openBlock(), createBlock("div", {
                                          key: 7,
                                          style: { "flex": "1", "display": "flex", "flex-direction": "column" }
                                        }, [
                                          createVNode(_component_LazyEditorElementsElementsGradientCard, {
                                            "main-background": element.data.color,
                                            background: `linear-gradient(50deg, ${element.data.gradientColor1} 1%, ${element.data.gradientColor2} 28%, ${element.data.gradientColor3} 58%, ${element.data.gradientColor4} 70%, ${element.data.gradientColor5})`
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", {
                                                class: "d-flex flex-column ga-2 align-center",
                                                style: { "flex": "1" }
                                              }, [
                                                element.data.iconType === "MDI Font Icon" ? (openBlock(), createBlock(VIcon, {
                                                  key: 0,
                                                  class: `${element.data.icon} mdi v-icon notranslate v-theme--light tile-icon`,
                                                  style: [{ "font-size": "48px", "height": "48px", "width": "48px" }, { color: element.data.buttonColor }],
                                                  "aria-hidden": "true"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(element.data.icon), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class", "style"])) : createCommentVNode("", true),
                                                element.data.iconType === "Image" && element.data.iconFile ? (openBlock(), createBlock("img", {
                                                  key: 1,
                                                  alt: element.data.content,
                                                  style: { "background-size": "contain", "height": "48px", "width": "48px" },
                                                  src: `${unref(config).public.baseUrl}/${element.data.iconFile}`
                                                }, null, 8, ["alt", "src"])) : createCommentVNode("", true),
                                                createVNode("div", {
                                                  innerHTML: element.data.content,
                                                  style: { "flex": "1" }
                                                }, null, 8, ["innerHTML"]),
                                                element.data.buttonTitle ? (openBlock(), createBlock(ABreak, {
                                                  key: 2,
                                                  color: "lightgray"
                                                })) : createCommentVNode("", true),
                                                element.data.buttonTitle ? (openBlock(), createBlock(VBtn, {
                                                  key: 3,
                                                  to: !element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                                  href: element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                                  target: element.data.buttonLink.includes("http") ? "_blank" : void 0,
                                                  variant: element.data.ButtonsStyles?.style,
                                                  color: element.data.buttonColor,
                                                  rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(element.data.buttonTitle), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to", "href", "target", "variant", "color", "rounded"])) : createCommentVNode("", true)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["main-background", "background"])
                                        ])) : createCommentVNode("", true),
                                        element.element_key === "DynamicTable" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsDynamicTable, {
                                          key: 8,
                                          data: element.data
                                        }, null, 8, ["data"])) : createCommentVNode("", true),
                                        element.element_key === "AdvancedDesktopSlider" && unref(mdAndUp) ? (openBlock(), createBlock(_component_LazyEditorElementsElementsAdvancedDesktopSlider, {
                                          key: 9,
                                          "autoplay-delay": element.data.autoplayDelay,
                                          height: element.data.height ?? "300px",
                                          "slides-data": element.data.items
                                        }, null, 8, ["autoplay-delay", "height", "slides-data"])) : createCommentVNode("", true),
                                        element.element_key === "Faq" ? (openBlock(), createBlock(VExpansionPanels, { key: 10 }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(element.data.items, (item, idx) => {
                                              return openBlock(), createBlock(VExpansionPanel, { key: idx }, {
                                                default: withCtx(() => [
                                                  createVNode(VExpansionPanelTitle, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.title), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(VExpansionPanelText, null, {
                                                    default: withCtx(() => [
                                                      createVNode("div", {
                                                        class: "px-3",
                                                        innerHTML: item.description
                                                      }, null, 8, ["innerHTML"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true),
                                        element.element_key === "IconItems" ? (openBlock(), createBlock(VList, {
                                          key: 11,
                                          dense: ""
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(element.data.items, (item, idx) => {
                                              return openBlock(), createBlock(VListItem, {
                                                key: idx,
                                                "prepend-icon": item.icon
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.title), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["prepend-icon"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true),
                                        element.element_key === "Team" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsTeam, {
                                          key: 12,
                                          name: element.data.fullName,
                                          position: element.data.role,
                                          image: `${unref(config).public.baseUrl}/${element.data.profile}`
                                        }, null, 8, ["name", "position", "image"])) : createCommentVNode("", true),
                                        element.element_key === "AdvancedSlider" ? (openBlock(), createBlock("div", {
                                          key: 13,
                                          style: { "width": "100%", "position": "relative" }
                                        }, [
                                          createVNode(_component_LazyEditorElementsElementsAdvancedSlider, {
                                            height: element.data.height,
                                            "hover-effect": element.data.hoverEffect,
                                            mode: element.data.mode,
                                            "slides-data": element.data.items,
                                            radius: element.data.borderRadius,
                                            delay: element.data.delay,
                                            effect: element.data.effect,
                                            locale: __props.locale
                                          }, null, 8, ["height", "hover-effect", "mode", "slides-data", "radius", "delay", "effect", "locale"])
                                        ])) : createCommentVNode("", true),
                                        element.element_key === "Form" ? (openBlock(), createBlock(_component_LazyEditorElementsRenderForm, {
                                          key: 14,
                                          rows: element.rows,
                                          form: element.form
                                        }, null, 8, ["rows", "form"])) : createCommentVNode("", true),
                                        element.element_key === "TileImage" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsTileImage, {
                                          key: 15,
                                          background: `${unref(config).public.baseUrl}/${element.data.background}`,
                                          height: element.data.height,
                                          title: element.data.title,
                                          to: element.data.to,
                                          btn_color: element.data.btn_color,
                                          btn_title: element.data.btn_title,
                                          btn_text_color: element.data.btn_text_color,
                                          btn_link: element.data.btn_link,
                                          description: element.data.description,
                                          gradient: element.data.gradient,
                                          texts_position: element.data.texts_position
                                        }, null, 8, ["background", "height", "title", "to", "btn_color", "btn_title", "btn_text_color", "btn_link", "description", "gradient", "texts_position"])) : createCommentVNode("", true),
                                        element.element_key === "Break" ? (openBlock(), createBlock(VDivider, {
                                          key: 16,
                                          style: { "filter": "invert(100%)" }
                                        })) : createCommentVNode("", true),
                                        element.element_key === "ModernSlider" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsModernSlider, {
                                          key: 17,
                                          "border-radius": element.data.borderRadius,
                                          "slider-height": element.data.sliderHeight,
                                          "auto-play": element.data.autoPlay,
                                          delay: element.data.delay,
                                          slides: element.data.slides
                                        }, null, 8, ["border-radius", "slider-height", "auto-play", "delay", "slides"])) : createCommentVNode("", true),
                                        element.element_key === "ProductsAndCategories" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsProductsAndCategories, {
                                          key: 18,
                                          locale: __props.locale,
                                          "ui-styles": { buy: { title: element.data.buyTitle, icon: element.data.buyIcon, color: element.data.buyColor, variant: element.data.buyVariant, rounded: element.data.buyRounded, modal: { icon: element.data.modalIcon, color: element.data.modalColor, rounded: element.data.modalRounded, selectQuantityTitle: element.data.modalSelectQuantityTitle, title: element.data.modalTitle, variant: element.data.modalVariant, totalPriceTitle: element.data.modalTotalPriceTitle, unitPriceTitle: element.data.modalUnitPriceTitle } }, details: { title: element.data.detailsTitle, icon: element.data.detailsIcon, color: element.data.detailsColor, variant: element.data.detailsVariant, rounded: element.data.detailsRounded } }
                                        }, null, 8, ["locale", "ui-styles"])) : createCommentVNode("", true),
                                        element.element_key === "ProductIds" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsProductsByIds, {
                                          key: 19,
                                          locale: __props.locale,
                                          "product-ids": element.data.ids,
                                          "ui-styles": { buy: { title: element.data.buyTitle, icon: element.data.buyIcon, color: element.data.buyColor, variant: element.data.buyVariant, rounded: element.data.buyRounded, modal: { icon: element.data.modalIcon, color: element.data.modalColor, rounded: element.data.modalRounded, selectQuantityTitle: element.data.modalSelectQuantityTitle, title: element.data.modalTitle, variant: element.data.modalVariant, totalPriceTitle: element.data.modalTotalPriceTitle, unitPriceTitle: element.data.modalUnitPriceTitle } }, details: { title: element.data.detailsTitle, icon: element.data.detailsIcon, color: element.data.detailsColor, variant: element.data.detailsVariant, rounded: element.data.detailsRounded } }
                                        }, null, 8, ["locale", "product-ids", "ui-styles"])) : createCommentVNode("", true)
                                      ], 6);
                                    }), 128))
                                  ], 4)
                                ], 6)
                              ], 4)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(row.columns, (column) => {
                        return openBlock(), createBlock(VCol, {
                          key: row.id.toString() + column.id.toString() + "column",
                          style: { "position": "relative", "display": "flex", "flex-direction": "column", "padding": "0px" },
                          cols: "12",
                          xl: column.column_xl,
                          lg: column.column_lg,
                          md: column.column_md,
                          sm: column.column_sm
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              style: [{ "position": "relative", "display": "flex", "flex-direction": "column", "flex": "1", "height": "100%" }, { padding: column.gap ?? "8px" }]
                            }, [
                              createVNode("div", {
                                class: column.animation ? `reveal ${column.animation}` : "",
                                style: { borderRadius: column.styles?.borderRadius, flex: column.animation !== "fade-in-blur" ? 1 : "unset", display: "flex", flexDirection: "column", position: "relative", width: "100%", height: "100%" }
                              }, [
                                createVNode("div", {
                                  style: [{ "height": "100%" }, getColumnInnerStyles(column)]
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                    return openBlock(), createBlock("div", {
                                      key: element.id,
                                      style: [{ position: "relative", display: "flex", flexDirection: "column" }, getElementPadding(element), { flex: element.element_key === "BorderGradientCard" ? column.animation !== "fade-in-blur" ? 1 : "unset" : element.data?.height === "full" ? 1 : "unset" }],
                                      class: element.animation ? `reveal ${element.animation}` : ""
                                    }, [
                                      element.element_key === "LightGradientAndContents" && !element.data.reverse ? (openBlock(), createBlock(LightGradientFullContent, {
                                        key: 0,
                                        src: `${unref(config).public.baseUrl}/${element.data.imageFile}`,
                                        "content-size": element.data.columnLG,
                                        "image-size": 12 - element.data.columnLG,
                                        gradient: `linear-gradient(to left, ${element.data.gradientColor1}, ${element.data.gradientColor2}, ${element.data.gradientColor3})`,
                                        "button-title": element.data.buttonTitle,
                                        "button-link": element.data.buttonLink,
                                        "button-color": element.data.buttonColor,
                                        "buttons-styles": element.data.ButtonsStyles
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", {
                                            class: "pa-4",
                                            innerHTML: element.data.content
                                          }, null, 8, ["innerHTML"])
                                        ]),
                                        _: 2
                                      }, 1032, ["src", "content-size", "image-size", "gradient", "button-title", "button-link", "button-color", "buttons-styles"])) : createCommentVNode("", true),
                                      element.element_key === "LightGradientAndContents" && element.data.reverse ? (openBlock(), createBlock(LightGradientFullContentReverse, {
                                        key: 1,
                                        src: `${unref(config).public.baseUrl}/${element.data.imageFile}`,
                                        "content-size": element.data.columnLG,
                                        "image-size": 12 - element.data.columnLG,
                                        gradient: `linear-gradient(to left, ${element.data.gradientColor1}, ${element.data.gradientColor2}, ${element.data.gradientColor3})`,
                                        "button-title": element.data.buttonTitle,
                                        "button-link": element.data.buttonLink,
                                        "button-color": element.data.buttonColor,
                                        "buttons-styles": element.data.ButtonsStyles
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", {
                                            class: "pa-4",
                                            innerHTML: element.data.content
                                          }, null, 8, ["innerHTML"])
                                        ]),
                                        _: 2
                                      }, 1032, ["src", "content-size", "image-size", "gradient", "button-title", "button-link", "button-color", "buttons-styles"])) : createCommentVNode("", true),
                                      element.element_key === "SimpleContent" ? (openBlock(), createBlock("div", {
                                        key: 2,
                                        innerHTML: element.data.content
                                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                      element.element_key === "Button" ? (openBlock(), createBlock(VCol, {
                                        key: 3,
                                        style: [element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align }]
                                      }, {
                                        default: withCtx(() => [
                                          element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                            key: 0,
                                            icon: element.data.icon,
                                            size: element.data.icon ? "small" : void 0,
                                            to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                            href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                            target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                            variant: element.data.ButtonsStyles?.style,
                                            block: element.data.fullWidth,
                                            color: element.data.buttonColor,
                                            style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                            rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                          }, createSlots({
                                            default: withCtx(() => [
                                              element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              !element.data.icon ? (openBlock(), createBlock("span", {
                                                key: 1,
                                                style: { "padding-top": "2px" }
                                              }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, [
                                            element.data.buttonIcon !== "mdi-disable" ? {
                                              name: "prepend",
                                              fn: withCtx(() => [
                                                element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true)
                                              ]),
                                              key: "0"
                                            } : void 0
                                          ]), 1032, ["icon", "size", "to", "href", "target", "variant", "block", "color", "style", "rounded"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["style"])) : createCommentVNode("", true),
                                      element.element_key === "BackgroundAndGradientCard" ? (openBlock(), createBlock("div", {
                                        key: 4,
                                        style: { "width": "100%" }
                                      }, [
                                        element.data.backgroundFile ? (openBlock(), createBlock(BackgroundAndGradientCard, {
                                          key: 0,
                                          "more-link": "/sample/link",
                                          src: `${unref(config).public.baseUrl}/${element.data.backgroundFile}`,
                                          height: element.data.height,
                                          class: element.data.cssClass,
                                          "border-radius": element.data.borderRadius,
                                          title: element.data.title,
                                          "button-title": element.data.buttonTitle,
                                          "button-color": element.data.buttonColor,
                                          "button-link": element.data.buttonLink,
                                          "buttons-styles": element.data.ButtonsStyles,
                                          gradient: `linear-gradient(180deg, ${element.data.gradientColor1} 1%, ${element.data.gradientColor2} 50%, ${element.data.gradientColor3} 100%)`
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VSpacer),
                                            createVNode(Flex, {
                                              fd: "column",
                                              ai: "flex-start"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", {
                                                  class: "px-4",
                                                  innerHTML: element.data.content
                                                }, null, 8, ["innerHTML"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["src", "height", "class", "border-radius", "title", "button-title", "button-color", "button-link", "buttons-styles", "gradient"])) : createCommentVNode("", true)
                                      ])) : createCommentVNode("", true),
                                      element.element_key === "Image" ? (openBlock(), createBlock(ImageFeature, {
                                        key: 5,
                                        element,
                                        config: unref(config)
                                      }, null, 8, ["element", "config"])) : createCommentVNode("", true),
                                      element.element_key === "SimpleCard" ? (openBlock(), createBlock(SimpleCard, {
                                        key: 6,
                                        "full-title": element.data?.fullTitle ?? "false",
                                        "image-height": element.data.height,
                                        image: `${unref(config).public.baseUrl}/${element.data.backgroundFile}`,
                                        title: element.data.title,
                                        "sub-title": element.data.subTitle,
                                        link: element.data.buttonLink,
                                        "card-animation": element.data.cardAnimations ?? "none",
                                        "button-color": element.data.buttonColor,
                                        "button-style": element.data.ButtonsStyles,
                                        "button-title": element.data.buttonTitle
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", {
                                            innerHTML: element.data.content
                                          }, null, 8, ["innerHTML"])
                                        ]),
                                        _: 2
                                      }, 1032, ["full-title", "image-height", "image", "title", "sub-title", "link", "card-animation", "button-color", "button-style", "button-title"])) : createCommentVNode("", true),
                                      element.element_key === "BorderGradientCard" ? (openBlock(), createBlock("div", {
                                        key: 7,
                                        style: { "flex": "1", "display": "flex", "flex-direction": "column" }
                                      }, [
                                        createVNode(_component_LazyEditorElementsElementsGradientCard, {
                                          "main-background": element.data.color,
                                          background: `linear-gradient(50deg, ${element.data.gradientColor1} 1%, ${element.data.gradientColor2} 28%, ${element.data.gradientColor3} 58%, ${element.data.gradientColor4} 70%, ${element.data.gradientColor5})`
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", {
                                              class: "d-flex flex-column ga-2 align-center",
                                              style: { "flex": "1" }
                                            }, [
                                              element.data.iconType === "MDI Font Icon" ? (openBlock(), createBlock(VIcon, {
                                                key: 0,
                                                class: `${element.data.icon} mdi v-icon notranslate v-theme--light tile-icon`,
                                                style: [{ "font-size": "48px", "height": "48px", "width": "48px" }, { color: element.data.buttonColor }],
                                                "aria-hidden": "true"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.icon), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class", "style"])) : createCommentVNode("", true),
                                              element.data.iconType === "Image" && element.data.iconFile ? (openBlock(), createBlock("img", {
                                                key: 1,
                                                alt: element.data.content,
                                                style: { "background-size": "contain", "height": "48px", "width": "48px" },
                                                src: `${unref(config).public.baseUrl}/${element.data.iconFile}`
                                              }, null, 8, ["alt", "src"])) : createCommentVNode("", true),
                                              createVNode("div", {
                                                innerHTML: element.data.content,
                                                style: { "flex": "1" }
                                              }, null, 8, ["innerHTML"]),
                                              element.data.buttonTitle ? (openBlock(), createBlock(ABreak, {
                                                key: 2,
                                                color: "lightgray"
                                              })) : createCommentVNode("", true),
                                              element.data.buttonTitle ? (openBlock(), createBlock(VBtn, {
                                                key: 3,
                                                to: !element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                                href: element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                                target: element.data.buttonLink.includes("http") ? "_blank" : void 0,
                                                variant: element.data.ButtonsStyles?.style,
                                                color: element.data.buttonColor,
                                                rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.buttonTitle), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to", "href", "target", "variant", "color", "rounded"])) : createCommentVNode("", true)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["main-background", "background"])
                                      ])) : createCommentVNode("", true),
                                      element.element_key === "DynamicTable" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsDynamicTable, {
                                        key: 8,
                                        data: element.data
                                      }, null, 8, ["data"])) : createCommentVNode("", true),
                                      element.element_key === "AdvancedDesktopSlider" && unref(mdAndUp) ? (openBlock(), createBlock(_component_LazyEditorElementsElementsAdvancedDesktopSlider, {
                                        key: 9,
                                        "autoplay-delay": element.data.autoplayDelay,
                                        height: element.data.height ?? "300px",
                                        "slides-data": element.data.items
                                      }, null, 8, ["autoplay-delay", "height", "slides-data"])) : createCommentVNode("", true),
                                      element.element_key === "Faq" ? (openBlock(), createBlock(VExpansionPanels, { key: 10 }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(element.data.items, (item, idx) => {
                                            return openBlock(), createBlock(VExpansionPanel, { key: idx }, {
                                              default: withCtx(() => [
                                                createVNode(VExpansionPanelTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(VExpansionPanelText, null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", {
                                                      class: "px-3",
                                                      innerHTML: item.description
                                                    }, null, 8, ["innerHTML"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)) : createCommentVNode("", true),
                                      element.element_key === "IconItems" ? (openBlock(), createBlock(VList, {
                                        key: 11,
                                        dense: ""
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(element.data.items, (item, idx) => {
                                            return openBlock(), createBlock(VListItem, {
                                              key: idx,
                                              "prepend-icon": item.icon
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.title), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["prepend-icon"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)) : createCommentVNode("", true),
                                      element.element_key === "Team" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsTeam, {
                                        key: 12,
                                        name: element.data.fullName,
                                        position: element.data.role,
                                        image: `${unref(config).public.baseUrl}/${element.data.profile}`
                                      }, null, 8, ["name", "position", "image"])) : createCommentVNode("", true),
                                      element.element_key === "AdvancedSlider" ? (openBlock(), createBlock("div", {
                                        key: 13,
                                        style: { "width": "100%", "position": "relative" }
                                      }, [
                                        createVNode(_component_LazyEditorElementsElementsAdvancedSlider, {
                                          height: element.data.height,
                                          "hover-effect": element.data.hoverEffect,
                                          mode: element.data.mode,
                                          "slides-data": element.data.items,
                                          radius: element.data.borderRadius,
                                          delay: element.data.delay,
                                          effect: element.data.effect,
                                          locale: __props.locale
                                        }, null, 8, ["height", "hover-effect", "mode", "slides-data", "radius", "delay", "effect", "locale"])
                                      ])) : createCommentVNode("", true),
                                      element.element_key === "Form" ? (openBlock(), createBlock(_component_LazyEditorElementsRenderForm, {
                                        key: 14,
                                        rows: element.rows,
                                        form: element.form
                                      }, null, 8, ["rows", "form"])) : createCommentVNode("", true),
                                      element.element_key === "TileImage" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsTileImage, {
                                        key: 15,
                                        background: `${unref(config).public.baseUrl}/${element.data.background}`,
                                        height: element.data.height,
                                        title: element.data.title,
                                        to: element.data.to,
                                        btn_color: element.data.btn_color,
                                        btn_title: element.data.btn_title,
                                        btn_text_color: element.data.btn_text_color,
                                        btn_link: element.data.btn_link,
                                        description: element.data.description,
                                        gradient: element.data.gradient,
                                        texts_position: element.data.texts_position
                                      }, null, 8, ["background", "height", "title", "to", "btn_color", "btn_title", "btn_text_color", "btn_link", "description", "gradient", "texts_position"])) : createCommentVNode("", true),
                                      element.element_key === "Break" ? (openBlock(), createBlock(VDivider, {
                                        key: 16,
                                        style: { "filter": "invert(100%)" }
                                      })) : createCommentVNode("", true),
                                      element.element_key === "ModernSlider" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsModernSlider, {
                                        key: 17,
                                        "border-radius": element.data.borderRadius,
                                        "slider-height": element.data.sliderHeight,
                                        "auto-play": element.data.autoPlay,
                                        delay: element.data.delay,
                                        slides: element.data.slides
                                      }, null, 8, ["border-radius", "slider-height", "auto-play", "delay", "slides"])) : createCommentVNode("", true),
                                      element.element_key === "ProductsAndCategories" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsProductsAndCategories, {
                                        key: 18,
                                        locale: __props.locale,
                                        "ui-styles": { buy: { title: element.data.buyTitle, icon: element.data.buyIcon, color: element.data.buyColor, variant: element.data.buyVariant, rounded: element.data.buyRounded, modal: { icon: element.data.modalIcon, color: element.data.modalColor, rounded: element.data.modalRounded, selectQuantityTitle: element.data.modalSelectQuantityTitle, title: element.data.modalTitle, variant: element.data.modalVariant, totalPriceTitle: element.data.modalTotalPriceTitle, unitPriceTitle: element.data.modalUnitPriceTitle } }, details: { title: element.data.detailsTitle, icon: element.data.detailsIcon, color: element.data.detailsColor, variant: element.data.detailsVariant, rounded: element.data.detailsRounded } }
                                      }, null, 8, ["locale", "ui-styles"])) : createCommentVNode("", true),
                                      element.element_key === "ProductIds" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsProductsByIds, {
                                        key: 19,
                                        locale: __props.locale,
                                        "product-ids": element.data.ids,
                                        "ui-styles": { buy: { title: element.data.buyTitle, icon: element.data.buyIcon, color: element.data.buyColor, variant: element.data.buyVariant, rounded: element.data.buyRounded, modal: { icon: element.data.modalIcon, color: element.data.modalColor, rounded: element.data.modalRounded, selectQuantityTitle: element.data.modalSelectQuantityTitle, title: element.data.modalTitle, variant: element.data.modalVariant, totalPriceTitle: element.data.modalTotalPriceTitle, unitPriceTitle: element.data.modalUnitPriceTitle } }, details: { title: element.data.detailsTitle, icon: element.data.detailsIcon, color: element.data.detailsColor, variant: element.data.detailsVariant, rounded: element.data.detailsRounded } }
                                      }, null, 8, ["locale", "product-ids", "ui-styles"])) : createCommentVNode("", true)
                                    ], 6);
                                  }), 128))
                                ], 4)
                              ], 6)
                            ], 4)
                          ]),
                          _: 2
                        }, 1032, ["xl", "lg", "md", "sm"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(ContainerBox, {
                  isNormalInFluid: row.container === "fluid-normal",
                  reverseOnMobile: row.reverse_on_mobile,
                  style: [
                    row.margin,
                    row.padding,
                    {
                      background: row.background_type === "color" ? row.background : `url(${unref(config).public.baseUrl}/${row.background})`,
                      position: "relative",
                      backgroundPosition: "center center",
                      border: "unset",
                      borderRadius: "unset",
                      backgroundSize: "cover"
                    }
                  ]
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(row.columns, (column) => {
                      return openBlock(), createBlock(VCol, {
                        key: row.id.toString() + column.id.toString() + "column",
                        style: { "position": "relative", "display": "flex", "flex-direction": "column", "padding": "0px" },
                        cols: "12",
                        xl: column.column_xl,
                        lg: column.column_lg,
                        md: column.column_md,
                        sm: column.column_sm
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            style: [{ "position": "relative", "display": "flex", "flex-direction": "column", "flex": "1", "height": "100%" }, { padding: column.gap ?? "8px" }]
                          }, [
                            createVNode("div", {
                              class: column.animation ? `reveal ${column.animation}` : "",
                              style: { borderRadius: column.styles?.borderRadius, flex: column.animation !== "fade-in-blur" ? 1 : "unset", display: "flex", flexDirection: "column", position: "relative", width: "100%", height: "100%" }
                            }, [
                              createVNode("div", {
                                style: [{ "height": "100%" }, getColumnInnerStyles(column)]
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock("div", {
                                    key: element.id,
                                    style: [{ position: "relative", display: "flex", flexDirection: "column" }, getElementPadding(element), { flex: element.element_key === "BorderGradientCard" ? column.animation !== "fade-in-blur" ? 1 : "unset" : element.data?.height === "full" ? 1 : "unset" }],
                                    class: element.animation ? `reveal ${element.animation}` : ""
                                  }, [
                                    element.element_key === "LightGradientAndContents" && !element.data.reverse ? (openBlock(), createBlock(LightGradientFullContent, {
                                      key: 0,
                                      src: `${unref(config).public.baseUrl}/${element.data.imageFile}`,
                                      "content-size": element.data.columnLG,
                                      "image-size": 12 - element.data.columnLG,
                                      gradient: `linear-gradient(to left, ${element.data.gradientColor1}, ${element.data.gradientColor2}, ${element.data.gradientColor3})`,
                                      "button-title": element.data.buttonTitle,
                                      "button-link": element.data.buttonLink,
                                      "button-color": element.data.buttonColor,
                                      "buttons-styles": element.data.ButtonsStyles
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", {
                                          class: "pa-4",
                                          innerHTML: element.data.content
                                        }, null, 8, ["innerHTML"])
                                      ]),
                                      _: 2
                                    }, 1032, ["src", "content-size", "image-size", "gradient", "button-title", "button-link", "button-color", "buttons-styles"])) : createCommentVNode("", true),
                                    element.element_key === "LightGradientAndContents" && element.data.reverse ? (openBlock(), createBlock(LightGradientFullContentReverse, {
                                      key: 1,
                                      src: `${unref(config).public.baseUrl}/${element.data.imageFile}`,
                                      "content-size": element.data.columnLG,
                                      "image-size": 12 - element.data.columnLG,
                                      gradient: `linear-gradient(to left, ${element.data.gradientColor1}, ${element.data.gradientColor2}, ${element.data.gradientColor3})`,
                                      "button-title": element.data.buttonTitle,
                                      "button-link": element.data.buttonLink,
                                      "button-color": element.data.buttonColor,
                                      "buttons-styles": element.data.ButtonsStyles
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", {
                                          class: "pa-4",
                                          innerHTML: element.data.content
                                        }, null, 8, ["innerHTML"])
                                      ]),
                                      _: 2
                                    }, 1032, ["src", "content-size", "image-size", "gradient", "button-title", "button-link", "button-color", "buttons-styles"])) : createCommentVNode("", true),
                                    element.element_key === "SimpleContent" ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      innerHTML: element.data.content
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    element.element_key === "Button" ? (openBlock(), createBlock(VCol, {
                                      key: 3,
                                      style: [element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align }]
                                    }, {
                                      default: withCtx(() => [
                                        element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                          key: 0,
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: !(element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:")) ? element.data.buttonLink : void 0,
                                          href: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") || element.data.buttonLink.includes("tel:") ? element.data.buttonLink : void 0,
                                          target: element.data.buttonLink.includes("http") || element.data.buttonLink.includes("mailto") ? "_blank" : void 0,
                                          variant: element.data.ButtonsStyles?.style,
                                          block: element.data.fullWidth,
                                          color: element.data.buttonColor,
                                          style: element.data.fullWidth ? { display: "flex", flexDirection: "row", justifyContent: element.data.align, gap: "8px" } : {},
                                          rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, createSlots({
                                          default: withCtx(() => [
                                            element.data.icon ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            !element.data.icon ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              style: { "padding-top": "2px" }
                                            }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, [
                                          element.data.buttonIcon !== "mdi-disable" ? {
                                            name: "prepend",
                                            fn: withCtx(() => [
                                              element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ]),
                                            key: "0"
                                          } : void 0
                                        ]), 1032, ["icon", "size", "to", "href", "target", "variant", "block", "color", "style", "rounded"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["style"])) : createCommentVNode("", true),
                                    element.element_key === "BackgroundAndGradientCard" ? (openBlock(), createBlock("div", {
                                      key: 4,
                                      style: { "width": "100%" }
                                    }, [
                                      element.data.backgroundFile ? (openBlock(), createBlock(BackgroundAndGradientCard, {
                                        key: 0,
                                        "more-link": "/sample/link",
                                        src: `${unref(config).public.baseUrl}/${element.data.backgroundFile}`,
                                        height: element.data.height,
                                        class: element.data.cssClass,
                                        "border-radius": element.data.borderRadius,
                                        title: element.data.title,
                                        "button-title": element.data.buttonTitle,
                                        "button-color": element.data.buttonColor,
                                        "button-link": element.data.buttonLink,
                                        "buttons-styles": element.data.ButtonsStyles,
                                        gradient: `linear-gradient(180deg, ${element.data.gradientColor1} 1%, ${element.data.gradientColor2} 50%, ${element.data.gradientColor3} 100%)`
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSpacer),
                                          createVNode(Flex, {
                                            fd: "column",
                                            ai: "flex-start"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", {
                                                class: "px-4",
                                                innerHTML: element.data.content
                                              }, null, 8, ["innerHTML"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["src", "height", "class", "border-radius", "title", "button-title", "button-color", "button-link", "buttons-styles", "gradient"])) : createCommentVNode("", true)
                                    ])) : createCommentVNode("", true),
                                    element.element_key === "Image" ? (openBlock(), createBlock(ImageFeature, {
                                      key: 5,
                                      element,
                                      config: unref(config)
                                    }, null, 8, ["element", "config"])) : createCommentVNode("", true),
                                    element.element_key === "SimpleCard" ? (openBlock(), createBlock(SimpleCard, {
                                      key: 6,
                                      "full-title": element.data?.fullTitle ?? "false",
                                      "image-height": element.data.height,
                                      image: `${unref(config).public.baseUrl}/${element.data.backgroundFile}`,
                                      title: element.data.title,
                                      "sub-title": element.data.subTitle,
                                      link: element.data.buttonLink,
                                      "card-animation": element.data.cardAnimations ?? "none",
                                      "button-color": element.data.buttonColor,
                                      "button-style": element.data.ButtonsStyles,
                                      "button-title": element.data.buttonTitle
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", {
                                          innerHTML: element.data.content
                                        }, null, 8, ["innerHTML"])
                                      ]),
                                      _: 2
                                    }, 1032, ["full-title", "image-height", "image", "title", "sub-title", "link", "card-animation", "button-color", "button-style", "button-title"])) : createCommentVNode("", true),
                                    element.element_key === "BorderGradientCard" ? (openBlock(), createBlock("div", {
                                      key: 7,
                                      style: { "flex": "1", "display": "flex", "flex-direction": "column" }
                                    }, [
                                      createVNode(_component_LazyEditorElementsElementsGradientCard, {
                                        "main-background": element.data.color,
                                        background: `linear-gradient(50deg, ${element.data.gradientColor1} 1%, ${element.data.gradientColor2} 28%, ${element.data.gradientColor3} 58%, ${element.data.gradientColor4} 70%, ${element.data.gradientColor5})`
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", {
                                            class: "d-flex flex-column ga-2 align-center",
                                            style: { "flex": "1" }
                                          }, [
                                            element.data.iconType === "MDI Font Icon" ? (openBlock(), createBlock(VIcon, {
                                              key: 0,
                                              class: `${element.data.icon} mdi v-icon notranslate v-theme--light tile-icon`,
                                              style: [{ "font-size": "48px", "height": "48px", "width": "48px" }, { color: element.data.buttonColor }],
                                              "aria-hidden": "true"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.icon), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "style"])) : createCommentVNode("", true),
                                            element.data.iconType === "Image" && element.data.iconFile ? (openBlock(), createBlock("img", {
                                              key: 1,
                                              alt: element.data.content,
                                              style: { "background-size": "contain", "height": "48px", "width": "48px" },
                                              src: `${unref(config).public.baseUrl}/${element.data.iconFile}`
                                            }, null, 8, ["alt", "src"])) : createCommentVNode("", true),
                                            createVNode("div", {
                                              innerHTML: element.data.content,
                                              style: { "flex": "1" }
                                            }, null, 8, ["innerHTML"]),
                                            element.data.buttonTitle ? (openBlock(), createBlock(ABreak, {
                                              key: 2,
                                              color: "lightgray"
                                            })) : createCommentVNode("", true),
                                            element.data.buttonTitle ? (openBlock(), createBlock(VBtn, {
                                              key: 3,
                                              to: !element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                              href: element.data.buttonLink.includes("http") ? element.data.buttonLink : void 0,
                                              target: element.data.buttonLink.includes("http") ? "_blank" : void 0,
                                              variant: element.data.ButtonsStyles?.style,
                                              color: element.data.buttonColor,
                                              rounded: element.data.ButtonsStyles?.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonTitle), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to", "href", "target", "variant", "color", "rounded"])) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["main-background", "background"])
                                    ])) : createCommentVNode("", true),
                                    element.element_key === "DynamicTable" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsDynamicTable, {
                                      key: 8,
                                      data: element.data
                                    }, null, 8, ["data"])) : createCommentVNode("", true),
                                    element.element_key === "AdvancedDesktopSlider" && unref(mdAndUp) ? (openBlock(), createBlock(_component_LazyEditorElementsElementsAdvancedDesktopSlider, {
                                      key: 9,
                                      "autoplay-delay": element.data.autoplayDelay,
                                      height: element.data.height ?? "300px",
                                      "slides-data": element.data.items
                                    }, null, 8, ["autoplay-delay", "height", "slides-data"])) : createCommentVNode("", true),
                                    element.element_key === "Faq" ? (openBlock(), createBlock(VExpansionPanels, { key: 10 }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(element.data.items, (item, idx) => {
                                          return openBlock(), createBlock(VExpansionPanel, { key: idx }, {
                                            default: withCtx(() => [
                                              createVNode(VExpansionPanelTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(VExpansionPanelText, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", {
                                                    class: "px-3",
                                                    innerHTML: item.description
                                                  }, null, 8, ["innerHTML"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true),
                                    element.element_key === "IconItems" ? (openBlock(), createBlock(VList, {
                                      key: 11,
                                      dense: ""
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(element.data.items, (item, idx) => {
                                          return openBlock(), createBlock(VListItem, {
                                            key: idx,
                                            "prepend-icon": item.icon
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.title), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["prepend-icon"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true),
                                    element.element_key === "Team" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsTeam, {
                                      key: 12,
                                      name: element.data.fullName,
                                      position: element.data.role,
                                      image: `${unref(config).public.baseUrl}/${element.data.profile}`
                                    }, null, 8, ["name", "position", "image"])) : createCommentVNode("", true),
                                    element.element_key === "AdvancedSlider" ? (openBlock(), createBlock("div", {
                                      key: 13,
                                      style: { "width": "100%", "position": "relative" }
                                    }, [
                                      createVNode(_component_LazyEditorElementsElementsAdvancedSlider, {
                                        height: element.data.height,
                                        "hover-effect": element.data.hoverEffect,
                                        mode: element.data.mode,
                                        "slides-data": element.data.items,
                                        radius: element.data.borderRadius,
                                        delay: element.data.delay,
                                        effect: element.data.effect,
                                        locale: __props.locale
                                      }, null, 8, ["height", "hover-effect", "mode", "slides-data", "radius", "delay", "effect", "locale"])
                                    ])) : createCommentVNode("", true),
                                    element.element_key === "Form" ? (openBlock(), createBlock(_component_LazyEditorElementsRenderForm, {
                                      key: 14,
                                      rows: element.rows,
                                      form: element.form
                                    }, null, 8, ["rows", "form"])) : createCommentVNode("", true),
                                    element.element_key === "TileImage" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsTileImage, {
                                      key: 15,
                                      background: `${unref(config).public.baseUrl}/${element.data.background}`,
                                      height: element.data.height,
                                      title: element.data.title,
                                      to: element.data.to,
                                      btn_color: element.data.btn_color,
                                      btn_title: element.data.btn_title,
                                      btn_text_color: element.data.btn_text_color,
                                      btn_link: element.data.btn_link,
                                      description: element.data.description,
                                      gradient: element.data.gradient,
                                      texts_position: element.data.texts_position
                                    }, null, 8, ["background", "height", "title", "to", "btn_color", "btn_title", "btn_text_color", "btn_link", "description", "gradient", "texts_position"])) : createCommentVNode("", true),
                                    element.element_key === "Break" ? (openBlock(), createBlock(VDivider, {
                                      key: 16,
                                      style: { "filter": "invert(100%)" }
                                    })) : createCommentVNode("", true),
                                    element.element_key === "ModernSlider" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsModernSlider, {
                                      key: 17,
                                      "border-radius": element.data.borderRadius,
                                      "slider-height": element.data.sliderHeight,
                                      "auto-play": element.data.autoPlay,
                                      delay: element.data.delay,
                                      slides: element.data.slides
                                    }, null, 8, ["border-radius", "slider-height", "auto-play", "delay", "slides"])) : createCommentVNode("", true),
                                    element.element_key === "ProductsAndCategories" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsProductsAndCategories, {
                                      key: 18,
                                      locale: __props.locale,
                                      "ui-styles": { buy: { title: element.data.buyTitle, icon: element.data.buyIcon, color: element.data.buyColor, variant: element.data.buyVariant, rounded: element.data.buyRounded, modal: { icon: element.data.modalIcon, color: element.data.modalColor, rounded: element.data.modalRounded, selectQuantityTitle: element.data.modalSelectQuantityTitle, title: element.data.modalTitle, variant: element.data.modalVariant, totalPriceTitle: element.data.modalTotalPriceTitle, unitPriceTitle: element.data.modalUnitPriceTitle } }, details: { title: element.data.detailsTitle, icon: element.data.detailsIcon, color: element.data.detailsColor, variant: element.data.detailsVariant, rounded: element.data.detailsRounded } }
                                    }, null, 8, ["locale", "ui-styles"])) : createCommentVNode("", true),
                                    element.element_key === "ProductIds" ? (openBlock(), createBlock(_component_LazyEditorElementsElementsProductsByIds, {
                                      key: 19,
                                      locale: __props.locale,
                                      "product-ids": element.data.ids,
                                      "ui-styles": { buy: { title: element.data.buyTitle, icon: element.data.buyIcon, color: element.data.buyColor, variant: element.data.buyVariant, rounded: element.data.buyRounded, modal: { icon: element.data.modalIcon, color: element.data.modalColor, rounded: element.data.modalRounded, selectQuantityTitle: element.data.modalSelectQuantityTitle, title: element.data.modalTitle, variant: element.data.modalVariant, totalPriceTitle: element.data.modalTotalPriceTitle, unitPriceTitle: element.data.modalUnitPriceTitle } }, details: { title: element.data.detailsTitle, icon: element.data.detailsIcon, color: element.data.detailsColor, variant: element.data.detailsVariant, rounded: element.data.detailsRounded } }
                                    }, null, 8, ["locale", "product-ids", "ui-styles"])) : createCommentVNode("", true)
                                  ], 6);
                                }), 128))
                              ], 4)
                            ], 6)
                          ], 4)
                        ]),
                        _: 2
                      }, 1032, ["xl", "lg", "md", "sm"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["isNormalInFluid", "reverseOnMobile", "style"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/Render.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Render = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-e8a4fe2b"]]), { __name: "EditorElementsRender" });
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const CART_KEY = "dyna-shop-cart";
const FAV_KEY = "dyna-shop-favorites";
function writeJson(key, value) {
  return;
}
function useShopLocal() {
  const cart = useState("shop-cart", () => []);
  const favorites = useState("shop-favorites", () => []);
  useState("shop-local-hydrated", () => false);
  function ensureHydrated() {
    return;
  }
  function persistCart() {
    writeJson(CART_KEY, cart.value);
  }
  function persistFavorites() {
    writeJson(FAV_KEY, favorites.value);
  }
  function addToCart(line) {
    const qty = line.quantity ?? 1;
    const { quantity: _q, ...rest } = line;
    const existing = cart.value.find((i) => i.id === rest.id && i.sku === rest.sku);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.value = [...cart.value, { ...rest, quantity: qty }];
    }
    persistCart();
  }
  function setLineQuantity(id, sku, quantity) {
    const line = cart.value.find((i) => i.id === id && i.sku === sku);
    if (!line) return;
    if (quantity <= 0) {
      removeFromCart(id, sku);
      return;
    }
    line.quantity = quantity;
    cart.value = [...cart.value];
    persistCart();
  }
  function removeFromCart(id, sku) {
    cart.value = cart.value.filter((i) => !(i.id === id && i.sku === sku));
    persistCart();
  }
  function clearCart() {
    cart.value = [];
    persistCart();
  }
  function toggleFavorite(item) {
    const i = favorites.value.findIndex((f) => f.id === item.id && f.sku === item.sku);
    if (i >= 0) {
      favorites.value = favorites.value.filter((_, idx) => idx !== i);
    } else {
      favorites.value = [...favorites.value, item];
    }
    persistFavorites();
  }
  function removeFavorite(id, sku) {
    favorites.value = favorites.value.filter((f) => !(f.id === id && f.sku === sku));
    persistFavorites();
  }
  const cartItemCount = computed(
    () => cart.value.reduce((n, l) => n + l.quantity, 0)
  );
  const cartSubtotal = computed(
    () => cart.value.reduce((sum, l) => sum + parseFloat(l.price || "0") * l.quantity, 0)
  );
  return {
    cart,
    favorites,
    ensureHydrated,
    addToCart,
    setLineQuantity,
    removeFromCart,
    clearCart,
    toggleFavorite,
    removeFavorite,
    cartItemCount,
    cartSubtotal
  };
}
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance$1()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry?._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = !import.meta.prerender || !nuxtApp.ssrContext?.["~sharedPrerenderCache"] ? _handler : (nuxtApp2, options2) => {
    const value = nuxtApp2.ssrContext["~sharedPrerenderCache"].get(key);
    if (value) {
      return value;
    }
    const promise = Promise.resolve().then(() => nuxtApp2.runWithContext(() => _handler(nuxtApp2, options2)));
    nuxtApp2.ssrContext["~sharedPrerenderCache"].set(key, promise);
    return promise;
  };
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
export {
  makePositionProps as $,
  useGroup as A,
  deepEqual as B,
  makeVariantProps as C,
  Ripple as D,
  useBorder as E,
  useDensity as F,
  useElevation as G,
  Header1 as H,
  useSize as I,
  useGroupItem as J,
  useLink as K,
  useVariant as L,
  MaybeTransition as M,
  genOverlays as N,
  VExpandXTransition as O,
  VDefaultsProvider as P,
  VAvatar as Q,
  Render as R,
  makeSizeProps as S,
  makeRouterProps as T,
  makeGroupItemProps as U,
  VContainer as V,
  makeElevationProps as W,
  makeDensityProps as X,
  makeBorderProps as Y,
  createSimpleFunctional as Z,
  usePosition as _,
  Header1Mobile as a,
  VProgressLinear as a0,
  makeLazyProps as a1,
  useSsrBoot as a2,
  useLazy as a3,
  makeVImgProps as a4,
  useScopeId as a5,
  forwardRefs as a6,
  makeVOverlayProps as a7,
  VDialogTransition as a8,
  VOverlay as a9,
  VCardTitle as aa,
  Flex as ab,
  Spacer as ac,
  VSlideYTransition as ad,
  useLoader as ae,
  nullifyTransforms as af,
  animate as ag,
  LoaderSlot as ah,
  makeLoaderProps as ai,
  Intersect as aj,
  ContainerBox as ak,
  VCardSubtitle as al,
  setInterval as am,
  VList as an,
  VListItem as ao,
  VListItemTitle as ap,
  useBackgroundColor as b,
  useRounded as c,
  useTextColor as d,
  useLocation as e,
  useDimension as f,
  makeTransitionProps$1 as g,
  makeTagProps as h,
  makeRoundedProps as i,
  makeLocationProps as j,
  VIcon as k,
  useShopLocal as l,
  makeDimensionProps as m,
  VBtn as n,
  VFadeTransition as o,
  VRow as p,
  VCol as q,
  VCard as r,
  VImg as s,
  VSpacer as t,
  useAsyncData as u,
  VDivider as v,
  VProgressCircular as w,
  VCardText as x,
  VCardActions as y,
  makeGroupProps as z
};
//# sourceMappingURL=asyncData-utIt_h6-.js.map
