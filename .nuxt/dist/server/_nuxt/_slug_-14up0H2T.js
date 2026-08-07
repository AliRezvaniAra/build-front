import { computed, toRef, createVNode, normalizeStyle, normalizeClass, createElementVNode, mergeProps, ref, shallowRef, watch, nextTick, provide, withDirectives, Fragment, inject, vShow, defineComponent, unref, withCtx, createTextVNode, openBlock, createBlock, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { Z as createSimpleFunctional, L as useVariant, F as useDensity, f as useDimension, G as useElevation, e as useLocation, _ as usePosition, c as useRounded, d as useTextColor, N as genOverlays, k as VIcon, P as VDefaultsProvider, n as VBtn, C as makeVariantProps, h as makeTagProps, i as makeRoundedProps, $ as makePositionProps, j as makeLocationProps, W as makeElevationProps, m as makeDimensionProps, X as makeDensityProps, A as useGroup, a0 as VProgressLinear, a1 as makeLazyProps, U as makeGroupItemProps, J as useGroupItem, a2 as useSsrBoot, a3 as useLazy, M as MaybeTransition, a4 as makeVImgProps, s as VImg, b as useBackgroundColor, E as useBorder, Y as makeBorderProps, u as useAsyncData, l as useShopLocal, H as Header1, a as Header1Mobile, V as VContainer, p as VRow, w as VProgressCircular, q as VCol, r as VCard, v as VDivider, R as Render } from "./asyncData-utIt_h6-.js";
import { useRoute } from "vue-router";
import { r as routeParamString } from "./routeParams-HtYLAcRh.js";
import { P as PurchaseModal } from "./PurchaseModal-k824TXLY.js";
import { F as FavAndbasketIcons } from "./favAndbasketIcons-Bj3YvgOV.js";
import { u as useTrans } from "./useTrans-CtYIwtZX.js";
import { p as propsFactory, g as genericComponent, A as useProxiedModel, x as provideTheme, a6 as useLocale, w as makeThemeProps, I as IconValue, ab as keys, k as useRtl, j as convertToUnit, f as useDisplay, b as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import { m as makeComponentProps, u as useRender } from "./resizeObserver-Bors9hmC.js";
import { V as VChip } from "./VChip-BczTBod0.js";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
const VAlertTitle = createSimpleFunctional("v-alert-title");
const makeIconSizeProps = propsFactory({
  iconSize: [Number, String],
  iconSizes: {
    type: Array,
    default: () => [["x-small", 10], ["small", 16], ["default", 24], ["large", 28], ["x-large", 32]]
  }
}, "iconSize");
function useIconSizes(props, fallback) {
  const iconSize = computed(() => {
    const iconSizeMap = new Map(props.iconSizes);
    const _iconSize = props.iconSize ?? fallback() ?? "default";
    return iconSizeMap.has(_iconSize) ? iconSizeMap.get(_iconSize) : _iconSize;
  });
  return {
    iconSize
  };
}
const allowedTypes = ["success", "info", "warning", "error"];
const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String],
    validator: (val) => {
      return typeof val === "boolean" || ["top", "end", "bottom", "start"].includes(val);
    }
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$close"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: (val) => allowedTypes.includes(val)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeIconSizeProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAlert");
const VAlert = genericComponent()({
  name: "VAlert",
  props: makeVAlertProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const icon = toRef(() => {
      if (props.icon === false) return void 0;
      if (!props.type) return props.icon;
      return props.icon ?? `$${props.type}`;
    });
    const {
      iconSize
    } = useIconSizes(props, () => props.prominent ? 44 : void 0);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => ({
      color: props.color ?? props.type,
      variant: props.variant
    }));
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
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.borderColor);
    const {
      t
    } = useLocale();
    const closeProps = toRef(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    return () => {
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      const hasClose = !!(slots.close || props.closable);
      const iconProps = {
        density: props.density,
        icon: icon.value,
        size: props.iconSize || props.prominent ? iconSize.value : void 0
      };
      return isActive.value && createVNode(props.tag, {
        "class": normalizeClass(["v-alert", props.border && {
          "v-alert--border": !!props.border,
          [`v-alert--border-${props.border === true ? "start" : props.border}`]: true
        }, {
          "v-alert--prominent": props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class]),
        "style": normalizeStyle([colorStyles.value, dimensionStyles.value, locationStyles.value, props.style]),
        "role": "alert"
      }, {
        default: () => [genOverlays(false, "v-alert"), props.border && createElementVNode("div", {
          "key": "border",
          "class": normalizeClass(["v-alert__border", textColorClasses.value]),
          "style": normalizeStyle(textColorStyles.value)
        }, null), hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-alert__prepend"
        }, [!slots.prepend ? createVNode(VIcon, mergeProps({
          "key": "prepend-icon"
        }, iconProps), null) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !icon.value,
          "defaults": {
            VIcon: {
              ...iconProps
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-alert__content"
        }, [hasTitle && createVNode(VAlertTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.() ?? props.title]
        }), slots.text?.() ?? props.text, slots.default?.()]), slots.append && createElementVNode("div", {
          "key": "append",
          "class": "v-alert__append"
        }, [slots.append()]), hasClose && createElementVNode("div", {
          "key": "close",
          "class": "v-alert__close"
        }, [!slots.close ? createVNode(VBtn, mergeProps({
          "key": "close-btn",
          "icon": props.closeIcon,
          "size": "x-small",
          "variant": "text"
        }, closeProps.value), null) : createVNode(VDefaultsProvider, {
          "key": "close-defaults",
          "defaults": {
            VBtn: {
              icon: props.closeIcon,
              size: "x-small",
              variant: "text"
            }
          }
        }, {
          default: () => [slots.close?.({
            props: closeProps.value
          })]
        })])]
      });
    };
  }
});
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  wrapper.start?.({
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  wrapper.end?.({
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  wrapper.move?.({
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  const value = binding.value;
  const target = value?.parent ? el.parentElement : el;
  const options = value?.options ?? {
    passive: true
  };
  const uid = binding.instance?.$.uid;
  if (!target || uid === void 0) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  const target = binding.value?.parent ? el.parentElement : el;
  const uid = binding.instance?.$.uid;
  if (!target?._touchHandlers || uid === void 0) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const VWindowSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  verticalArrows: [Boolean, String],
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  crossfade: Boolean,
  transitionDuration: Number,
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    vTouch: Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      if (props.crossfade) {
        return "v-window-crossfade-transition";
      }
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = false;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = true;
      } else {
        isReversed.value = newVal < oldVal;
      }
      nextTick(() => {
        return;
      });
    }, {
      flush: "sync"
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = toRef(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = toRef(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createElementVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createElementVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    function onKeyDown(e) {
      if (props.direction === "horizontal" && e.key === "ArrowLeft" || props.direction === "vertical" && e.key === "ArrowUp") {
        e.preventDefault();
        prev();
        nextTick(() => {
          canMoveBack.value ? focusArrow(0) : focusArrow(1);
        });
      }
      if (props.direction === "horizontal" && e.key === "ArrowRight" || props.direction === "vertical" && e.key === "ArrowDown") {
        e.preventDefault();
        next();
        nextTick(() => {
          canMoveForward.value ? focusArrow(1) : focusArrow(0);
        });
      }
    }
    function focusArrow(index) {
      const arrow = arrows.value[index];
      if (!arrow) return;
      const arrowEl = Array.isArray(arrow) ? arrow[0] : arrow;
      arrowEl.el?.focus();
    }
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": normalizeClass(["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover",
        "v-window--vertical-arrows": !!props.verticalArrows,
        "v-window--crossfade": !!props.crossfade
      }, themeClasses.value, props.class]),
      "style": normalizeStyle([props.style, {
        "--v-window-transition-duration": convertToUnit(props.transitionDuration, "ms")
      }])
    }, {
      default: () => [createElementVNode("div", {
        "class": "v-window__container",
        "style": {
          height: transitionHeight.value
        }
      }, [slots.default?.({
        group
      }), props.showArrows !== false && createElementVNode("div", {
        "class": normalizeClass(["v-window__controls", {
          "v-window__controls--left": props.verticalArrows === "left" || props.verticalArrows === true
        }, {
          "v-window__controls--right": props.verticalArrows === "right"
        }]),
        "onKeydown": onKeyDown
      }, [arrows.value])]), slots.additional?.({
        group
      })]
    }), [[Touch, touchOptions.value]]));
    return {
      group
    };
  }
});
const makeVCarouselProps = propsFactory({
  color: String,
  cycle: Boolean,
  delimiterIcon: {
    type: IconValue,
    default: "$delimiter"
  },
  height: {
    type: [Number, String],
    default: 500
  },
  hideDelimiters: Boolean,
  hideDelimiterBackground: Boolean,
  interval: {
    type: [Number, String],
    default: 6e3,
    validator: (value) => Number(value) > 0
  },
  progress: [Boolean, String],
  verticalDelimiters: [Boolean, String],
  ...makeVWindowProps({
    continuous: true,
    mandatory: "force",
    showArrows: true
  })
}, "VCarousel");
const VCarousel = genericComponent()({
  name: "VCarousel",
  props: makeVCarouselProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      t
    } = useLocale();
    const windowRef = ref();
    let slideTimeout = -1;
    watch(model, restartTimeout);
    watch(() => props.interval, restartTimeout);
    watch(() => props.cycle, (val) => {
      if (val) restartTimeout();
      else (void 0).clearTimeout(slideTimeout);
    });
    function startTimeout() {
      if (!props.cycle || !windowRef.value) return;
      slideTimeout = (void 0).setTimeout(windowRef.value.group.next, Number(props.interval) > 0 ? Number(props.interval) : 6e3);
    }
    function restartTimeout() {
      (void 0).clearTimeout(slideTimeout);
      (void 0).requestAnimationFrame(startTimeout);
    }
    function onDelimiterKeyDown(e, group) {
      if (props.direction === "horizontal" && e.key === "ArrowLeft" || props.direction === "vertical" && e.key === "ArrowUp") {
        e.preventDefault();
        group.prev();
        nextTick(() => windowRef.value?.$el.querySelector(".v-btn--active")?.focus());
      }
      if (props.direction === "horizontal" && e.key === "ArrowRight" || props.direction === "vertical" && e.key === "ArrowDown") {
        e.preventDefault();
        group.next();
        nextTick(() => windowRef.value?.$el.querySelector(".v-btn--active")?.focus());
      }
    }
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "ref": windowRef
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-carousel", {
          "v-carousel--hide-delimiter-background": props.hideDelimiterBackground,
          "v-carousel--vertical-delimiters": props.verticalDelimiters
        }, props.class],
        "style": [{
          height: convertToUnit(props.height)
        }, props.style]
      }), {
        default: slots.default,
        additional: (_ref2) => {
          let {
            group
          } = _ref2;
          return createElementVNode(Fragment, null, [!props.hideDelimiters && createElementVNode("div", {
            "class": "v-carousel__controls",
            "style": {
              left: props.verticalDelimiters === "left" && props.verticalDelimiters ? 0 : "auto",
              right: props.verticalDelimiters === "right" ? 0 : "auto"
            }
          }, [group.items.value.length > 0 && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                color: props.color,
                icon: props.delimiterIcon,
                size: "x-small",
                variant: "text"
              }
            },
            "scoped": true
          }, {
            default: () => [group.items.value.map((item, index) => {
              const props2 = {
                id: `carousel-item-${item.id}`,
                "aria-label": t("$vuetify.carousel.ariaLabel.delimiter", index + 1, group.items.value.length),
                class: ["v-carousel__controls__item", group.isSelected(item.id) && "v-btn--active"],
                onClick: () => group.select(item.id, true),
                onKeydown: (e) => onDelimiterKeyDown(e, group)
              };
              return slots.item ? slots.item({
                props: props2,
                item
              }) : createVNode(VBtn, mergeProps(item, props2), null);
            })]
          })]), props.progress && createVNode(VProgressLinear, {
            "absolute": true,
            "class": "v-carousel__progress",
            "color": typeof props.progress === "string" ? props.progress : void 0,
            "modelValue": (group.getItemIndex(model.value) + 1) / group.items.value.length * 100
          }, null)]);
        },
        prev: slots.prev,
        next: slots.next
      });
    });
    return {};
  }
});
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    vTouch: Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-window-item", groupItem.selectedClass.value, props.class]),
        "style": normalizeStyle(props.style)
      }, [hasContent.value && slots.default?.()]), [[vShow, groupItem.isSelected.value]])]
    }));
    return {
      groupItem
    };
  }
});
const makeVCarouselItemProps = propsFactory({
  ...makeVImgProps(),
  ...makeVWindowItemProps()
}, "VCarouselItem");
const VCarouselItem = genericComponent()({
  name: "VCarouselItem",
  inheritAttrs: false,
  props: makeVCarouselItemProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    useRender(() => {
      const imgProps = VImg.filterProps(props);
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "class": ["v-carousel-item", props.class]
      }, windowItemProps), {
        default: () => [createVNode(VImg, mergeProps(attrs, imgProps), slots)]
      });
    });
  }
});
const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VSheet");
const VSheet = genericComponent()({
  name: "VSheet",
  props: makeVSheetProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style])
    }, slots));
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useTrans();
    const route = useRoute();
    const { mdAndUp } = useDisplay();
    const config = useRuntimeConfig();
    const locale = ref(routeParamString(route.params.lang));
    const slugParam = () => routeParamString(route.params.slug);
    const { data: languages } = useAsyncData(
      `languages`,
      async () => {
        const languages2 = await $fetch(`/api/languages`, {
          baseURL: config.public.baseUrl
        });
        locale.value = languages2.find((l) => l.default_lang === 1).code;
        return languages2;
      }
    );
    const { data: header } = useAsyncData(
      `header-data-${routeParamString(route.params.lang)}`,
      async () => {
        const res = await $fetch(`/api/pages/rows/0-header-${routeParamString(route.params.lang)}`, {
          baseURL: config.public.baseUrl
        });
        return res.data || [];
      }
    );
    const { data: menu } = useAsyncData(
      "menu-data",
      async () => {
        const res = await $fetch(`/api/menus/get`, {
          baseURL: config.public.baseUrl
        });
        return res.data || [];
      }
    );
    const { data: footer } = useAsyncData(
      `footer-data-${routeParamString(route.params.lang)}`,
      async () => {
        const res = await $fetch(`/api/pages/rows/0-footer-${routeParamString(route.params.lang)}`, {
          baseURL: config.public.baseUrl
        });
        return res.data || [];
      }
    );
    const { data: product, pending, error } = useAsyncData(
      () => `product-details-${slugParam()}`,
      () => $fetch(`${config.public.baseUrl}/api/products/product/find/${slugParam()}`, {
        method: "GET"
      }),
      "$Epme5j-cjg"
      /* nuxt-injected */
    );
    const { data: disable_buy } = useAsyncData(
      () => `product-disableBuy_status-${slugParam()}`,
      () => $fetch(`${config.public.baseUrl}/api/settings/disable-buy`, {
        method: "GET"
      }),
      "$YJmUeqD6Nl"
      /* nuxt-injected */
    );
    const related_pages = ref([]);
    watch(
      () => product.value,
      (p) => {
        if (p) {
          related_pages.value = p.langs.map((l) => {
            return {
              lang: l.lang,
              title: "products/" + l.title
            };
          });
        }
      },
      { immediate: true }
    );
    const currentLangContent = computed(() => {
      if (!product.value) return null;
      const lang = routeParamString(route.params.lang);
      return product.value.langs.find((l) => l.lang === lang) || product.value.langs[0];
    });
    const shop = useShopLocal();
    const showCartModal = ref(false);
    const primaryOffer = computed(() => {
      const p = product.value;
      if (!p?.currencies?.length) return null;
      return p.currencies.find((c) => c.currency === "USD") ?? p.currencies[0] ?? null;
    });
    const purchaseModalProduct = computed(() => {
      if (!product.value || !currentLangContent.value || !primaryOffer.value) return null;
      const cur = primaryOffer.value;
      const curLabel = cur.currency === "USD" ? "$" : `${cur.currency} `;
      return {
        name: currentLangContent.value.title,
        price: cur.price,
        currency: curLabel,
        primaryImg: `${config.public.baseUrl}/${product.value.image}`
      };
    });
    const carouselImages = computed(() => {
      if (!product.value) return [];
      return [product.value.image, product.value.image2].filter(Boolean);
    });
    const detailFavActive = computed(
      () => product.value ? shop.favorites.value.some(
        (f) => f.id === product.value.id && f.sku === product.value.sku
      ) : false
    );
    function onDetailCartConfirm(data) {
      if (!product.value || !currentLangContent.value || !primaryOffer.value) return;
      shop.addToCart({
        id: product.value.id,
        sku: product.value.sku,
        slug: slugParam(),
        title: currentLangContent.value.title,
        price: primaryOffer.value.price,
        currency: primaryOffer.value.currency,
        image: `${config.public.baseUrl}/${product.value.image}`,
        quantity: data.quantity
      });
    }
    function toggleDetailFavorite() {
      if (!product.value || !currentLangContent.value || !primaryOffer.value) return;
      const base = config.public.baseUrl;
      shop.toggleFavorite({
        id: product.value.id,
        sku: product.value.sku,
        slug: slugParam(),
        title: currentLangContent.value.title,
        price: primaryOffer.value.price,
        currency: primaryOffer.value.currency,
        primaryImg: `${base}/${product.value.image}`,
        secondaryImg: product.value.image2 ? `${base}/${product.value.image2}` : `${base}/${product.value.image}`,
        label: "Product"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(mdAndUp)) {
        _push(ssrRenderComponent(Header1, {
          theme: "light",
          header: unref(header) ?? [],
          menu: unref(menu) ?? [],
          languages: unref(languages),
          related_pages: related_pages.value,
          locale: locale.value
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(Header1Mobile, {
          theme: "light",
          rows: unref(header) ?? [],
          menu: unref(menu) ?? [],
          languages: unref(languages),
          related_pages: related_pages.value,
          locale: locale.value
        }, null, _parent));
      }
      _push(ssrRenderComponent(VContainer, {
        class: "product-page py-10",
        style: { direction: locale.value === "fa" || locale.value === "ar" ? "rtl" : "ltr" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(pending)) {
              _push2(ssrRenderComponent(VRow, {
                justify: "center",
                align: "center",
                style: { "min-height": "50vh" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VProgressCircular, {
                      indeterminate: "",
                      color: "primary",
                      size: "64"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VProgressCircular, {
                        indeterminate: "",
                        color: "primary",
                        size: "64"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else if (unref(error)) {
              _push2(ssrRenderComponent(VAlert, {
                type: "error",
                variant: "tonal",
                class: "ma-5"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Product not found or an error occurred. `);
                  } else {
                    return [
                      createTextVNode(" Product not found or an error occurred. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else if (unref(product)) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "6",
                      lg: "6"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, {
                            variant: "flat",
                            class: "rounded-xl overflow-hidden"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCarousel, {
                                  "hide-delimiter-background": "",
                                  "show-arrows": "hover",
                                  height: "500",
                                  color: "primary",
                                  style: { "direction": "ltr !important" }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(carouselImages.value, (img, i) => {
                                        _push6(ssrRenderComponent(VCarouselItem, {
                                          key: i,
                                          src: `${unref(config).public.baseUrl}/${img}`
                                        }, {
                                          placeholder: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VRow, {
                                                class: "fill-height ma-0",
                                                align: "center",
                                                justify: "center"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VProgressCircular, {
                                                      indeterminate: "",
                                                      color: "grey-lighten-5"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VProgressCircular, {
                                                        indeterminate: "",
                                                        color: "grey-lighten-5"
                                                      })
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VRow, {
                                                  class: "fill-height ma-0",
                                                  align: "center",
                                                  justify: "center"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VProgressCircular, {
                                                      indeterminate: "",
                                                      color: "grey-lighten-5"
                                                    })
                                                  ]),
                                                  _: 1
                                                })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(carouselImages.value, (img, i) => {
                                          return openBlock(), createBlock(VCarouselItem, {
                                            key: i,
                                            src: `${unref(config).public.baseUrl}/${img}`
                                          }, {
                                            placeholder: withCtx(() => [
                                              createVNode(VRow, {
                                                class: "fill-height ma-0",
                                                align: "center",
                                                justify: "center"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VProgressCircular, {
                                                    indeterminate: "",
                                                    color: "grey-lighten-5"
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["src"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCarousel, {
                                    "hide-delimiter-background": "",
                                    "show-arrows": "hover",
                                    height: "500",
                                    color: "primary",
                                    style: { "direction": "ltr !important" }
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(carouselImages.value, (img, i) => {
                                        return openBlock(), createBlock(VCarouselItem, {
                                          key: i,
                                          src: `${unref(config).public.baseUrl}/${img}`
                                        }, {
                                          placeholder: withCtx(() => [
                                            createVNode(VRow, {
                                              class: "fill-height ma-0",
                                              align: "center",
                                              justify: "center"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VProgressCircular, {
                                                  indeterminate: "",
                                                  color: "grey-lighten-5"
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["src"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCard, {
                              variant: "flat",
                              class: "rounded-xl overflow-hidden"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCarousel, {
                                  "hide-delimiter-background": "",
                                  "show-arrows": "hover",
                                  height: "500",
                                  color: "primary",
                                  style: { "direction": "ltr !important" }
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(carouselImages.value, (img, i) => {
                                      return openBlock(), createBlock(VCarouselItem, {
                                        key: i,
                                        src: `${unref(config).public.baseUrl}/${img}`
                                      }, {
                                        placeholder: withCtx(() => [
                                          createVNode(VRow, {
                                            class: "fill-height ma-0",
                                            align: "center",
                                            justify: "center"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VProgressCircular, {
                                                indeterminate: "",
                                                color: "grey-lighten-5"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["src"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "6",
                      lg: "6",
                      class: "ps-md-10"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="d-flex align-center mb-2" data-v-3b186b8f${_scopeId3}>`);
                          _push4(ssrRenderComponent(VChip, {
                            size: "small",
                            color: "primary",
                            variant: "flat",
                            class: "me-2"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`SKU: ${ssrInterpolate(unref(product).sku)}`);
                              } else {
                                return [
                                  createTextVNode("SKU: " + toDisplayString(unref(product).sku), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VChip, {
                            size: "small",
                            variant: "outlined",
                            color: "grey"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`ID: ${ssrInterpolate(unref(product).id)}`);
                              } else {
                                return [
                                  createTextVNode("ID: " + toDisplayString(unref(product).id), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><h1 class="text-h3 font-weight-bold mb-4 text-grey-darken-4" data-v-3b186b8f${_scopeId3}>${ssrInterpolate(currentLangContent.value?.title)}</h1><div class="price-section mb-6" data-v-3b186b8f${_scopeId3}><!--[-->`);
                          ssrRenderList(unref(product).currencies, (price) => {
                            _push4(`<div class="d-inline-block me-4" data-v-3b186b8f${_scopeId3}>`);
                            if (price.currency === (unref(route).params.lang === "fa" ? "IRR" : "USD")) {
                              _push4(`<span class="text-h4 font-weight-black text-primary" data-v-3b186b8f${_scopeId3}>${ssrInterpolate(unref(t)[price.currency])} ${ssrInterpolate(parseFloat(price.price).toLocaleString())}</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          });
                          _push4(`<!--]--></div><p class="text-body-1 text-grey-darken-2 mb-8 leading-relaxed" style="${ssrRenderStyle({ "max-width": "600px" })}" data-v-3b186b8f${_scopeId3}>${ssrInterpolate(currentLangContent.value?.description)}</p>`);
                          _push4(ssrRenderComponent(VDivider, { class: "mb-6" }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, { dense: "" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(product).details.filter((d) => d.lang === locale.value), (detail) => {
                                  _push5(ssrRenderComponent(VCol, {
                                    key: detail.id,
                                    cols: "6"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VSheet, {
                                          border: "",
                                          rounded: "lg",
                                          class: "pa-4 bg-grey-lighten-5"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="text-caption text-uppercase text-grey-darken-1 font-weight-bold" data-v-3b186b8f${_scopeId6}>${ssrInterpolate(detail.key)}</div><div class="text-body-1 font-weight-medium text-blue-grey-darken-3" data-v-3b186b8f${_scopeId6}>${ssrInterpolate(detail.value)}</div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "text-caption text-uppercase text-grey-darken-1 font-weight-bold" }, toDisplayString(detail.key), 1),
                                                createVNode("div", { class: "text-body-1 font-weight-medium text-blue-grey-darken-3" }, toDisplayString(detail.value), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VSheet, {
                                            border: "",
                                            rounded: "lg",
                                            class: "pa-4 bg-grey-lighten-5"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "text-caption text-uppercase text-grey-darken-1 font-weight-bold" }, toDisplayString(detail.key), 1),
                                              createVNode("div", { class: "text-body-1 font-weight-medium text-blue-grey-darken-3" }, toDisplayString(detail.value), 1)
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(product).details.filter((d) => d.lang === locale.value), (detail) => {
                                    return openBlock(), createBlock(VCol, {
                                      key: detail.id,
                                      cols: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSheet, {
                                          border: "",
                                          rounded: "lg",
                                          class: "pa-4 bg-grey-lighten-5"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "text-caption text-uppercase text-grey-darken-1 font-weight-bold" }, toDisplayString(detail.key), 1),
                                            createVNode("div", { class: "text-body-1 font-weight-medium text-blue-grey-darken-3" }, toDisplayString(detail.value), 1)
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
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, { class: "mt-8" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  sm: "6"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (unref(disable_buy).disable_buy.value !== "yes") {
                                        _push6(ssrRenderComponent(VBtn, {
                                          block: "",
                                          size: "x-large",
                                          color: "primary",
                                          elevation: "4",
                                          class: "rounded-pill",
                                          "prepend-icon": "mdi-cart-plus",
                                          disabled: !purchaseModalProduct.value,
                                          onClick: ($event) => showCartModal.value = true
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(unref(t)?.add_to_cart)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(unref(t)?.add_to_cart), 1)
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        unref(disable_buy).disable_buy.value !== "yes" ? (openBlock(), createBlock(VBtn, {
                                          key: 0,
                                          block: "",
                                          size: "x-large",
                                          color: "primary",
                                          elevation: "4",
                                          class: "rounded-pill",
                                          "prepend-icon": "mdi-cart-plus",
                                          disabled: !purchaseModalProduct.value,
                                          onClick: ($event) => showCartModal.value = true
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(t)?.add_to_cart), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["disabled", "onClick"])) : createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  sm: "6"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VBtn, {
                                        block: "",
                                        size: "x-large",
                                        variant: "tonal",
                                        color: "red",
                                        class: "rounded-pill",
                                        "prepend-icon": detailFavActive.value ? "mdi-heart" : "mdi-heart-outline",
                                        onClick: toggleDetailFavorite
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(detailFavActive.value ? unref(t)?.remove_from_favorites : unref(t)?.add_to_favorites)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(detailFavActive.value ? unref(t)?.remove_from_favorites : unref(t)?.add_to_favorites), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VBtn, {
                                          block: "",
                                          size: "x-large",
                                          variant: "tonal",
                                          color: "red",
                                          class: "rounded-pill",
                                          "prepend-icon": detailFavActive.value ? "mdi-heart" : "mdi-heart-outline",
                                          onClick: toggleDetailFavorite
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(detailFavActive.value ? unref(t)?.remove_from_favorites : unref(t)?.add_to_favorites), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["prepend-icon"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, {
                                    cols: "12",
                                    sm: "6"
                                  }, {
                                    default: withCtx(() => [
                                      unref(disable_buy).disable_buy.value !== "yes" ? (openBlock(), createBlock(VBtn, {
                                        key: 0,
                                        block: "",
                                        size: "x-large",
                                        color: "primary",
                                        elevation: "4",
                                        class: "rounded-pill",
                                        "prepend-icon": "mdi-cart-plus",
                                        disabled: !purchaseModalProduct.value,
                                        onClick: ($event) => showCartModal.value = true
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(t)?.add_to_cart), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["disabled", "onClick"])) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    sm: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        block: "",
                                        size: "x-large",
                                        variant: "tonal",
                                        color: "red",
                                        class: "rounded-pill",
                                        "prepend-icon": detailFavActive.value ? "mdi-heart" : "mdi-heart-outline",
                                        onClick: toggleDetailFavorite
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(detailFavActive.value ? unref(t)?.remove_from_favorites : unref(t)?.add_to_favorites), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["prepend-icon"])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { class: "d-flex align-center mb-2" }, [
                              createVNode(VChip, {
                                size: "small",
                                color: "primary",
                                variant: "flat",
                                class: "me-2"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("SKU: " + toDisplayString(unref(product).sku), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(VChip, {
                                size: "small",
                                variant: "outlined",
                                color: "grey"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("ID: " + toDisplayString(unref(product).id), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("h1", { class: "text-h3 font-weight-bold mb-4 text-grey-darken-4" }, toDisplayString(currentLangContent.value?.title), 1),
                            createVNode("div", { class: "price-section mb-6" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(product).currencies, (price) => {
                                return openBlock(), createBlock("div", {
                                  key: price.currency,
                                  class: "d-inline-block me-4"
                                }, [
                                  price.currency === (unref(route).params.lang === "fa" ? "IRR" : "USD") ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-h4 font-weight-black text-primary"
                                  }, toDisplayString(unref(t)[price.currency]) + " " + toDisplayString(parseFloat(price.price).toLocaleString()), 1)) : createCommentVNode("", true)
                                ]);
                              }), 128))
                            ]),
                            createVNode("p", {
                              class: "text-body-1 text-grey-darken-2 mb-8 leading-relaxed",
                              style: { "max-width": "600px" }
                            }, toDisplayString(currentLangContent.value?.description), 1),
                            createVNode(VDivider, { class: "mb-6" }),
                            createVNode(VRow, { dense: "" }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(product).details.filter((d) => d.lang === locale.value), (detail) => {
                                  return openBlock(), createBlock(VCol, {
                                    key: detail.id,
                                    cols: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSheet, {
                                        border: "",
                                        rounded: "lg",
                                        class: "pa-4 bg-grey-lighten-5"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-caption text-uppercase text-grey-darken-1 font-weight-bold" }, toDisplayString(detail.key), 1),
                                          createVNode("div", { class: "text-body-1 font-weight-medium text-blue-grey-darken-3" }, toDisplayString(detail.value), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, { class: "mt-8" }, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "6"
                                }, {
                                  default: withCtx(() => [
                                    unref(disable_buy).disable_buy.value !== "yes" ? (openBlock(), createBlock(VBtn, {
                                      key: 0,
                                      block: "",
                                      size: "x-large",
                                      color: "primary",
                                      elevation: "4",
                                      class: "rounded-pill",
                                      "prepend-icon": "mdi-cart-plus",
                                      disabled: !purchaseModalProduct.value,
                                      onClick: ($event) => showCartModal.value = true
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(t)?.add_to_cart), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["disabled", "onClick"])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      block: "",
                                      size: "x-large",
                                      variant: "tonal",
                                      color: "red",
                                      class: "rounded-pill",
                                      "prepend-icon": detailFavActive.value ? "mdi-heart" : "mdi-heart-outline",
                                      onClick: toggleDetailFavorite
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(detailFavActive.value ? unref(t)?.remove_from_favorites : unref(t)?.add_to_favorites), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["prepend-icon"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            variant: "flat",
                            class: "rounded-xl overflow-hidden"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCarousel, {
                                "hide-delimiter-background": "",
                                "show-arrows": "hover",
                                height: "500",
                                color: "primary",
                                style: { "direction": "ltr !important" }
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(carouselImages.value, (img, i) => {
                                    return openBlock(), createBlock(VCarouselItem, {
                                      key: i,
                                      src: `${unref(config).public.baseUrl}/${img}`
                                    }, {
                                      placeholder: withCtx(() => [
                                        createVNode(VRow, {
                                          class: "fill-height ma-0",
                                          align: "center",
                                          justify: "center"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VProgressCircular, {
                                              indeterminate: "",
                                              color: "grey-lighten-5"
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["src"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6",
                        class: "ps-md-10"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex align-center mb-2" }, [
                            createVNode(VChip, {
                              size: "small",
                              color: "primary",
                              variant: "flat",
                              class: "me-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("SKU: " + toDisplayString(unref(product).sku), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VChip, {
                              size: "small",
                              variant: "outlined",
                              color: "grey"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("ID: " + toDisplayString(unref(product).id), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("h1", { class: "text-h3 font-weight-bold mb-4 text-grey-darken-4" }, toDisplayString(currentLangContent.value?.title), 1),
                          createVNode("div", { class: "price-section mb-6" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(product).currencies, (price) => {
                              return openBlock(), createBlock("div", {
                                key: price.currency,
                                class: "d-inline-block me-4"
                              }, [
                                price.currency === (unref(route).params.lang === "fa" ? "IRR" : "USD") ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-h4 font-weight-black text-primary"
                                }, toDisplayString(unref(t)[price.currency]) + " " + toDisplayString(parseFloat(price.price).toLocaleString()), 1)) : createCommentVNode("", true)
                              ]);
                            }), 128))
                          ]),
                          createVNode("p", {
                            class: "text-body-1 text-grey-darken-2 mb-8 leading-relaxed",
                            style: { "max-width": "600px" }
                          }, toDisplayString(currentLangContent.value?.description), 1),
                          createVNode(VDivider, { class: "mb-6" }),
                          createVNode(VRow, { dense: "" }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(product).details.filter((d) => d.lang === locale.value), (detail) => {
                                return openBlock(), createBlock(VCol, {
                                  key: detail.id,
                                  cols: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSheet, {
                                      border: "",
                                      rounded: "lg",
                                      class: "pa-4 bg-grey-lighten-5"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-caption text-uppercase text-grey-darken-1 font-weight-bold" }, toDisplayString(detail.key), 1),
                                        createVNode("div", { class: "text-body-1 font-weight-medium text-blue-grey-darken-3" }, toDisplayString(detail.value), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { class: "mt-8" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                sm: "6"
                              }, {
                                default: withCtx(() => [
                                  unref(disable_buy).disable_buy.value !== "yes" ? (openBlock(), createBlock(VBtn, {
                                    key: 0,
                                    block: "",
                                    size: "x-large",
                                    color: "primary",
                                    elevation: "4",
                                    class: "rounded-pill",
                                    "prepend-icon": "mdi-cart-plus",
                                    disabled: !purchaseModalProduct.value,
                                    onClick: ($event) => showCartModal.value = true
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)?.add_to_cart), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["disabled", "onClick"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                sm: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    block: "",
                                    size: "x-large",
                                    variant: "tonal",
                                    color: "red",
                                    class: "rounded-pill",
                                    "prepend-icon": detailFavActive.value ? "mdi-heart" : "mdi-heart-outline",
                                    onClick: toggleDetailFavorite
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(detailFavActive.value ? unref(t)?.remove_from_favorites : unref(t)?.add_to_favorites), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["prepend-icon"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1024)
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
              unref(pending) ? (openBlock(), createBlock(VRow, {
                key: 0,
                justify: "center",
                align: "center",
                style: { "min-height": "50vh" }
              }, {
                default: withCtx(() => [
                  createVNode(VProgressCircular, {
                    indeterminate: "",
                    color: "primary",
                    size: "64"
                  })
                ]),
                _: 1
              })) : unref(error) ? (openBlock(), createBlock(VAlert, {
                key: 1,
                type: "error",
                variant: "tonal",
                class: "ma-5"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Product not found or an error occurred. ")
                ]),
                _: 1
              })) : unref(product) ? (openBlock(), createBlock(VRow, { key: 2 }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "6",
                    lg: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, {
                        variant: "flat",
                        class: "rounded-xl overflow-hidden"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCarousel, {
                            "hide-delimiter-background": "",
                            "show-arrows": "hover",
                            height: "500",
                            color: "primary",
                            style: { "direction": "ltr !important" }
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(carouselImages.value, (img, i) => {
                                return openBlock(), createBlock(VCarouselItem, {
                                  key: i,
                                  src: `${unref(config).public.baseUrl}/${img}`
                                }, {
                                  placeholder: withCtx(() => [
                                    createVNode(VRow, {
                                      class: "fill-height ma-0",
                                      align: "center",
                                      justify: "center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VProgressCircular, {
                                          indeterminate: "",
                                          color: "grey-lighten-5"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["src"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6",
                    lg: "6",
                    class: "ps-md-10"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex align-center mb-2" }, [
                        createVNode(VChip, {
                          size: "small",
                          color: "primary",
                          variant: "flat",
                          class: "me-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("SKU: " + toDisplayString(unref(product).sku), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          size: "small",
                          variant: "outlined",
                          color: "grey"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("ID: " + toDisplayString(unref(product).id), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("h1", { class: "text-h3 font-weight-bold mb-4 text-grey-darken-4" }, toDisplayString(currentLangContent.value?.title), 1),
                      createVNode("div", { class: "price-section mb-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(product).currencies, (price) => {
                          return openBlock(), createBlock("div", {
                            key: price.currency,
                            class: "d-inline-block me-4"
                          }, [
                            price.currency === (unref(route).params.lang === "fa" ? "IRR" : "USD") ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-h4 font-weight-black text-primary"
                            }, toDisplayString(unref(t)[price.currency]) + " " + toDisplayString(parseFloat(price.price).toLocaleString()), 1)) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ]),
                      createVNode("p", {
                        class: "text-body-1 text-grey-darken-2 mb-8 leading-relaxed",
                        style: { "max-width": "600px" }
                      }, toDisplayString(currentLangContent.value?.description), 1),
                      createVNode(VDivider, { class: "mb-6" }),
                      createVNode(VRow, { dense: "" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(product).details.filter((d) => d.lang === locale.value), (detail) => {
                            return openBlock(), createBlock(VCol, {
                              key: detail.id,
                              cols: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VSheet, {
                                  border: "",
                                  rounded: "lg",
                                  class: "pa-4 bg-grey-lighten-5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-caption text-uppercase text-grey-darken-1 font-weight-bold" }, toDisplayString(detail.key), 1),
                                    createVNode("div", { class: "text-body-1 font-weight-medium text-blue-grey-darken-3" }, toDisplayString(detail.value), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { class: "mt-8" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            sm: "6"
                          }, {
                            default: withCtx(() => [
                              unref(disable_buy).disable_buy.value !== "yes" ? (openBlock(), createBlock(VBtn, {
                                key: 0,
                                block: "",
                                size: "x-large",
                                color: "primary",
                                elevation: "4",
                                class: "rounded-pill",
                                "prepend-icon": "mdi-cart-plus",
                                disabled: !purchaseModalProduct.value,
                                onClick: ($event) => showCartModal.value = true
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(t)?.add_to_cart), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                block: "",
                                size: "x-large",
                                variant: "tonal",
                                color: "red",
                                class: "rounded-pill",
                                "prepend-icon": detailFavActive.value ? "mdi-heart" : "mdi-heart-outline",
                                onClick: toggleDetailFavorite
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(detailFavActive.value ? unref(t)?.remove_from_favorites : unref(t)?.add_to_favorites), 1)
                                ]),
                                _: 1
                              }, 8, ["prepend-icon"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (purchaseModalProduct.value) {
        _push(ssrRenderComponent(PurchaseModal, {
          modelValue: showCartModal.value,
          "onUpdate:modelValue": ($event) => showCartModal.value = $event,
          product: purchaseModalProduct.value,
          title: unref(t).confirm_purchase,
          "unit-price-title": unref(t).unit_price,
          "select-quantity-title": unref(t).select_quantity,
          "total-price-title": unref(t).total,
          "add-to-card-title": unref(t).confirm_and_add_to_cart,
          icon: "mdi-cart",
          color: "primary",
          variant: "flat",
          rounded: false,
          onConfirm: onDetailCartConfirm
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(Render, {
        rows: unref(footer),
        "margin-top": "0px",
        is_footer: "is_footer",
        locale: locale.value
      }, null, _parent));
      _push(ssrRenderComponent(FavAndbasketIcons, { locale: locale.value }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[lang]/products/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b186b8f"]]);
export {
  _slug_ as default
};
//# sourceMappingURL=_slug_-14up0H2T.js.map
