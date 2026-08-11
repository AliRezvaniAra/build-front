import { ref, shallowRef, inject, watch, computed, createVNode, mergeProps, createElementVNode, onScopeDispose, nextTick, watchEffect, toRef, withDirectives, normalizeStyle, normalizeClass, vShow, useId, Fragment, unref, cloneVNode, vModelText, defineComponent, withCtx, isRef, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as usePosition, a5 as useScopeId, L as useVariant, c as useRounded, a9 as VOverlay, N as genOverlays, a0 as VProgressLinear, P as VDefaultsProvider, a6 as forwardRefs, a7 as makeVOverlayProps, C as makeVariantProps, i as makeRoundedProps, $ as makePositionProps, j as makeLocationProps, M as MaybeTransition, g as makeTransitionProps, ad as VSlideYTransition, k as VIcon, ae as useLoader, b as useBackgroundColor, d as useTextColor, af as nullifyTransforms, ag as animate, ah as LoaderSlot, O as VExpandXTransition, ai as makeLoaderProps, F as useDensity, f as useDimension, m as makeDimensionProps, X as makeDensityProps, aj as Intersect, V as VContainer, ak as ContainerBox, q as VCol, n as VBtn } from "./asyncData-BoxtDLvH.js";
import { g as genericComponent, A as useProxiedModel, x as provideTheme, J as useToggleScope, ad as refElement, p as propsFactory, X as omit, w as makeThemeProps, T as EventProp, a6 as useLocale, ae as callEvent, m as getCurrentInstanceName, k as useRtl, j as convertToUnit, I as IconValue, Q as standardEasing, D as wrapInArray, z as getCurrentInstance, a4 as pick, af as filterInputAttrs, f as useDisplay, H as clamp, b as useRuntimeConfig } from "../server.mjs";
import { V as VuetifyLayoutKey, u as useLayout } from "./layout-BUTXVtFv.js";
import { u as useRender, m as makeComponentProps } from "./resizeObserver-Bors9hmC.js";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
function useCountdown(milliseconds) {
  const time = shallowRef(milliseconds());
  let timer = -1;
  function clear() {
    clearInterval(timer);
  }
  function reset() {
    clear();
    nextTick(() => time.value = milliseconds());
  }
  function start(el) {
    const style = el ? getComputedStyle(el) : {
      transitionDuration: 0.2
    };
    const interval = parseFloat(style.transitionDuration) * 1e3 || 200;
    clear();
    if (time.value <= 0) return;
    const startTime = performance.now();
    timer = (void 0).setInterval(() => {
      const elapsed = performance.now() - startTime + interval;
      time.value = Math.max(milliseconds() - elapsed, 0);
      if (time.value <= 0) clear();
    }, interval);
  }
  onScopeDispose(clear);
  return {
    clear,
    time,
    start,
    reset
  };
}
const makeVSnackbarProps = propsFactory({
  /* @deprecated */
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...makeLocationProps({
    location: "bottom"
  }),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeVariantProps(),
  ...makeThemeProps(),
  ...omit(makeVOverlayProps({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "retainFocus", "captureFocus", "disableInitialFocus", "scrim", "scrollStrategy", "stickToTarget", "viewportMargin"])
}, "VSnackbar");
const VSnackbar = genericComponent()({
  name: "VSnackbar",
  props: makeVSnackbarProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      positionClasses
    } = usePosition(props);
    const {
      scopeId
    } = useScopeId();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      roundedClasses
    } = useRounded(props);
    const countdown = useCountdown(() => Number(props.timeout));
    const overlay = ref();
    const timerRef = ref();
    const isHovering = shallowRef(false);
    const startY = shallowRef(0);
    const mainStyles = ref();
    const hasLayout = inject(VuetifyLayoutKey, void 0);
    useToggleScope(() => !!hasLayout, () => {
      const layout = useLayout();
      watchEffect(() => {
        mainStyles.value = layout.mainStyles.value;
      });
    });
    watch(isActive, startTimeout);
    watch(() => props.timeout, startTimeout);
    let activeTimeout = -1;
    function startTimeout() {
      countdown.reset();
      (void 0).clearTimeout(activeTimeout);
      const timeout = Number(props.timeout);
      if (!isActive.value || timeout === -1) return;
      const element = refElement(timerRef.value);
      countdown.start(element);
      activeTimeout = (void 0).setTimeout(() => {
        isActive.value = false;
      }, timeout);
    }
    function clearTimeout() {
      countdown.reset();
      (void 0).clearTimeout(activeTimeout);
    }
    function onPointerenter() {
      isHovering.value = true;
      clearTimeout();
    }
    function onPointerleave() {
      isHovering.value = false;
      startTimeout();
    }
    function onTouchstart(event) {
      startY.value = event.touches[0].clientY;
    }
    function onTouchend(event) {
      if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
        isActive.value = false;
      }
    }
    function onAfterLeave() {
      if (isHovering.value) onPointerleave();
    }
    const locationClasses = computed(() => {
      return props.location.split(" ").reduce((acc, loc) => {
        acc[`v-snackbar--${loc}`] = true;
        return acc;
      }, {});
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const hasContent = !!(slots.default || slots.text || props.text);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-snackbar", {
          "v-snackbar--active": isActive.value,
          "v-snackbar--multi-line": props.multiLine && !props.vertical,
          "v-snackbar--timer": !!props.timer,
          "v-snackbar--vertical": props.vertical
        }, locationClasses.value, positionClasses.value, props.class],
        "style": [mainStyles.value, props.style]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "contentProps": mergeProps({
          class: ["v-snackbar__wrapper", themeClasses.value, colorClasses.value, roundedClasses.value, variantClasses.value],
          style: [colorStyles.value],
          onPointerenter,
          onPointerleave
        }, overlayProps.contentProps),
        "persistent": true,
        "noClickAnimation": true,
        "scrim": false,
        "scrollStrategy": "none",
        "_disableGlobalStack": true,
        "onTouchstartPassive": onTouchstart,
        "onTouchend": onTouchend,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        default: () => [genOverlays(false, "v-snackbar"), props.timer && !isHovering.value && createElementVNode("div", {
          "key": "timer",
          "class": "v-snackbar__timer"
        }, [createVNode(VProgressLinear, {
          "ref": timerRef,
          "color": typeof props.timer === "string" ? props.timer : "info",
          "max": props.timeout,
          "modelValue": countdown.time.value
        }, null)]), hasContent && createElementVNode("div", {
          "key": "content",
          "class": "v-snackbar__content",
          "role": "status",
          "aria-live": "polite"
        }, [slots.text?.() ?? props.text, slots.default?.()]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              variant: "text",
              ripple: false,
              slim: true
            }
          }
        }, {
          default: () => [createElementVNode("div", {
            "class": "v-snackbar__actions"
          }, [slots.actions({
            isActive
          })])]
        })],
        activator: slots.activator
      });
    });
    return forwardRefs({}, overlay);
  }
});
const makeVCounterProps = propsFactory({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...makeComponentProps(),
  ...makeTransitionProps({
    transition: {
      component: VSlideYTransition
    }
  })
}, "VCounter");
const VCounter = genericComponent()({
  name: "VCounter",
  functional: true,
  props: makeVCounterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const counter = toRef(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-counter", {
          "text-error": props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max)
        }, props.class]),
        "style": normalizeStyle(props.style)
      }, [slots.default ? slots.default({
        counter: counter.value,
        max: props.max,
        value: props.value
      }) : counter.value]), [[vShow, props.active]])]
    }));
    return {};
  }
});
const makeVLabelProps = propsFactory({
  text: String,
  onClick: EventProp(),
  ...makeComponentProps(),
  ...makeThemeProps()
}, "VLabel");
const VLabel = genericComponent()({
  name: "VLabel",
  props: makeVLabelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createElementVNode("label", {
      "class": normalizeClass(["v-label", {
        "v-label--clickable": !!props.onClick
      }, props.class]),
      "style": normalizeStyle(props.style),
      "onClick": props.onClick
    }, [props.text, slots.default?.()]));
    return {};
  }
});
const makeVFieldLabelProps = propsFactory({
  floating: Boolean,
  ...makeComponentProps()
}, "VFieldLabel");
const VFieldLabel = genericComponent()({
  name: "VFieldLabel",
  props: makeVFieldLabelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VLabel, {
      "class": normalizeClass(["v-field-label", {
        "v-field-label--floating": props.floating
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, slots));
    return {};
  }
});
function useInputIcon(props) {
  const {
    t
  } = useLocale();
  function InputIcon(_ref) {
    let {
      name,
      color,
      ...attrs
    } = _ref;
    const localeKey = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[name];
    const listener = props[`onClick:${name}`];
    function onKeydown(e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      e.stopPropagation();
      callEvent(listener, new PointerEvent("click", e));
    }
    const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? "") : void 0;
    return createVNode(VIcon, mergeProps({
      "icon": props[`${name}Icon`],
      "aria-label": label,
      "onClick": listener,
      "onKeydown": onKeydown,
      "color": color
    }, attrs), null);
  }
  return {
    InputIcon
  };
}
const makeFocusProps = propsFactory({
  focused: Boolean,
  "onUpdate:focused": EventProp()
}, "focus");
function useFocus(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const isFocused = useProxiedModel(props, "focused");
  const focusClasses = toRef(() => {
    return {
      [`${name}--focused`]: isFocused.value
    };
  });
  function focus() {
    isFocused.value = true;
  }
  function blur() {
    isFocused.value = false;
  }
  return {
    focusClasses,
    isFocused,
    focus,
    blur
  };
}
const allowedVariants = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"];
const makeVFieldProps = propsFactory({
  appendInnerIcon: IconValue,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: IconValue,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  glow: Boolean,
  error: Boolean,
  flat: Boolean,
  iconColor: [Boolean, String],
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: IconValue,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (v) => allowedVariants.includes(v)
  },
  "onClick:clear": EventProp(),
  "onClick:appendInner": EventProp(),
  "onClick:prependInner": EventProp(),
  ...makeComponentProps(),
  ...makeLoaderProps(),
  ...makeRoundedProps(),
  ...makeThemeProps()
}, "VField");
const VField = genericComponent()({
  name: "VField",
  inheritAttrs: false,
  props: {
    id: String,
    details: Boolean,
    labelId: String,
    ...makeFocusProps(),
    ...makeVFieldProps()
  },
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      focusClasses,
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      InputIcon
    } = useInputIcon(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      rtlClasses
    } = useRtl();
    const isActive = toRef(() => props.dirty || props.active);
    const hasLabel = toRef(() => !!(props.label || slots.label));
    const hasFloatingLabel = toRef(() => !props.singleLine && hasLabel.value);
    const uid = useId();
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = toRef(() => !props.details ? void 0 : `${id.value}-messages`);
    const labelRef = ref();
    const floatingLabelRef = ref();
    const controlRef = ref();
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    const color = computed(() => {
      return props.error || props.disabled ? void 0 : isActive.value && isFocused.value ? props.color : props.baseColor;
    });
    const iconColor = computed(() => {
      if (!props.iconColor || props.glow && !isFocused.value) return void 0;
      return props.iconColor === true ? color.value : props.iconColor;
    });
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    watch(isActive, (val) => {
      if (hasFloatingLabel.value && true) {
        const el = labelRef.value.$el;
        const targetEl = floatingLabelRef.value.$el;
        requestAnimationFrame(() => {
          const rect = nullifyTransforms(el);
          const targetRect = targetEl.getBoundingClientRect();
          const x = targetRect.x - rect.x;
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
          const targetWidth = targetRect.width / 0.75;
          const width = Math.abs(targetWidth - rect.width) > 1 ? {
            maxWidth: convertToUnit(targetWidth)
          } : void 0;
          const style = getComputedStyle(el);
          const targetStyle = getComputedStyle(targetEl);
          const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
          const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
          const color2 = targetStyle.getPropertyValue("color");
          el.style.visibility = "visible";
          targetEl.style.visibility = "hidden";
          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color: color2,
            ...width
          }, {
            duration,
            easing: standardEasing,
            direction: val ? "normal" : "reverse"
          }).finished.then(() => {
            el.style.removeProperty("visibility");
            targetEl.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const slotProps = computed(() => ({
      isActive,
      isFocused,
      controlRef,
      iconColor,
      blur,
      focus
    }));
    const floatingLabelProps = toRef(() => {
      const ariaHidden = !isActive.value;
      return {
        "aria-hidden": ariaHidden,
        for: ariaHidden ? void 0 : id.value
      };
    });
    const mainLabelProps = toRef(() => {
      const ariaHidden = hasFloatingLabel.value && isActive.value;
      return {
        "aria-hidden": ariaHidden,
        for: ariaHidden ? void 0 : id.value
      };
    });
    function onClick(e) {
      if (e.target !== (void 0).activeElement) {
        e.preventDefault();
      }
    }
    useRender(() => {
      const isOutlined = props.variant === "outlined";
      const hasPrepend = !!(slots["prepend-inner"] || props.prependInnerIcon);
      const hasClear = !!(props.clearable || slots.clear) && !props.disabled;
      const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
      const label = () => slots.label ? slots.label({
        ...slotProps.value,
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createElementVNode("div", mergeProps({
        "class": ["v-field", {
          "v-field--active": isActive.value,
          "v-field--appended": hasAppend,
          "v-field--center-affix": props.centerAffix ?? !isPlainOrUnderlined.value,
          "v-field--disabled": props.disabled,
          "v-field--dirty": props.dirty,
          "v-field--error": props.error,
          "v-field--glow": props.glow,
          "v-field--flat": props.flat,
          "v-field--has-background": !!props.bgColor,
          "v-field--persistent-clear": props.persistentClear,
          "v-field--prepended": hasPrepend,
          "v-field--reverse": props.reverse,
          "v-field--single-line": props.singleLine,
          "v-field--no-label": !label(),
          [`v-field--variant-${props.variant}`]: true
        }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value, roundedClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style],
        "onClick": onClick
      }, attrs), [createElementVNode("div", {
        "class": "v-field__overlay"
      }, null), createVNode(LoaderSlot, {
        "name": "v-field",
        "active": !!props.loading,
        "color": props.error ? "error" : typeof props.loading === "string" ? props.loading : props.color
      }, {
        default: slots.loader
      }), hasPrepend && createElementVNode("div", {
        "key": "prepend",
        "class": "v-field__prepend-inner"
      }, [slots["prepend-inner"] ? slots["prepend-inner"](slotProps.value) : props.prependInnerIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prependInner",
        "color": iconColor.value
      }, null)]), createElementVNode("div", {
        "class": "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(props.variant) && hasFloatingLabel.value && createVNode(VFieldLabel, mergeProps({
        "key": "floating-label",
        "ref": floatingLabelRef,
        "class": [textColorClasses.value],
        "floating": true
      }, floatingLabelProps.value, {
        "style": textColorStyles.value
      }), {
        default: () => [label()]
      }), hasLabel.value && createVNode(VFieldLabel, mergeProps({
        "key": "label",
        "ref": labelRef,
        "id": props.labelId
      }, mainLabelProps.value), {
        default: () => [label()]
      }), slots.default?.({
        ...slotProps.value,
        props: {
          id: id.value,
          class: "v-field__input",
          "aria-describedby": messagesId.value
        },
        focus,
        blur
      }) ?? createElementVNode("div", {
        "id": id.value,
        "class": "v-field__input",
        "aria-describedby": messagesId.value
      }, null)]), hasClear && createVNode(VExpandXTransition, {
        "key": "clear"
      }, {
        default: () => [withDirectives(createElementVNode("div", {
          "class": "v-field__clearable",
          "onMousedown": (e) => {
            e.preventDefault();
            e.stopPropagation();
          }
        }, [createVNode(VDefaultsProvider, {
          "defaults": {
            VIcon: {
              icon: props.clearIcon
            }
          }
        }, {
          default: () => [slots.clear ? slots.clear({
            ...slotProps.value,
            props: {
              onFocus: focus,
              onBlur: blur,
              onClick: props["onClick:clear"],
              tabindex: -1
            }
          }) : createVNode(InputIcon, {
            "name": "clear",
            "onFocus": focus,
            "onBlur": blur,
            "tabindex": -1
          }, null)]
        })]), [[vShow, props.dirty]])]
      }), hasAppend && createElementVNode("div", {
        "key": "append",
        "class": "v-field__append-inner"
      }, [slots["append-inner"] ? slots["append-inner"](slotProps.value) : props.appendInnerIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "appendInner",
        "color": iconColor.value
      }, null)]), createElementVNode("div", {
        "class": normalizeClass(["v-field__outline", textColorClasses.value]),
        "style": normalizeStyle(textColorStyles.value)
      }, [isOutlined && createElementVNode(Fragment, null, [createElementVNode("div", {
        "class": "v-field__outline__start"
      }, null), hasFloatingLabel.value && createElementVNode("div", {
        "class": "v-field__outline__notch"
      }, [createVNode(VFieldLabel, mergeProps({
        "ref": floatingLabelRef,
        "floating": true
      }, floatingLabelProps.value), {
        default: () => [label()]
      })]), createElementVNode("div", {
        "class": "v-field__outline__end"
      }, null)]), isPlainOrUnderlined.value && hasFloatingLabel.value && createVNode(VFieldLabel, mergeProps({
        "ref": floatingLabelRef,
        "floating": true
      }, floatingLabelProps.value), {
        default: () => [label()]
      })])]);
    });
    return {
      controlRef,
      fieldIconColor: iconColor
    };
  }
});
const makeVMessagesProps = propsFactory({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...makeComponentProps(),
  ...makeTransitionProps({
    transition: {
      component: VSlideYTransition,
      leaveAbsolute: true,
      group: true
    }
  })
}, "VMessages");
const VMessages = genericComponent()({
  name: "VMessages",
  props: makeVMessagesProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const messages = computed(() => wrapInArray(props.messages));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition,
      "tag": "div",
      "class": normalizeClass(["v-messages", textColorClasses.value, props.class]),
      "style": normalizeStyle([textColorStyles.value, props.style])
    }, {
      default: () => [props.active && messages.value.map((message, i) => createElementVNode("div", {
        "class": "v-messages__message",
        "key": `${i}-${messages.value}`
      }, [slots.message ? slots.message({
        message
      }) : message]))]
    }));
    return {};
  }
});
const FormKey = /* @__PURE__ */ Symbol.for("vuetify:form");
function useForm(props) {
  const form = inject(FormKey, null);
  return {
    ...form,
    isReadonly: computed(() => !!(props?.readonly ?? form?.isReadonly.value)),
    isDisabled: computed(() => !!(props?.disabled ?? form?.isDisabled.value))
  };
}
const RulesSymbol = /* @__PURE__ */ Symbol.for("vuetify:rules");
function useRules(fn) {
  const rules = inject(RulesSymbol, null);
  if (!fn) {
    if (!rules) {
      throw new Error("Could not find Vuetify rules injection");
    }
    return rules.aliases;
  }
  return rules?.resolve(fn) ?? toRef(fn);
}
const makeValidationProps = propsFactory({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...makeFocusProps()
}, "validation");
function useValidation(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  let id = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : useId();
  const model = useProxiedModel(props, "modelValue");
  const validationModel = computed(() => props.validationValue === void 0 ? model.value : props.validationValue);
  const form = useForm(props);
  const rules = useRules(() => props.rules);
  const internalErrorMessages = ref([]);
  const isPristine = shallowRef(true);
  const isDirty = computed(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
  const errorMessages = computed(() => {
    return props.errorMessages?.length ? wrapInArray(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, Number(props.maxErrors))) : internalErrorMessages.value;
  });
  const validateOn = computed(() => {
    let value = (props.validateOn ?? form.validateOn?.value) || "input";
    if (value === "lazy") value = "input lazy";
    if (value === "eager") value = "input eager";
    const set = new Set(value?.split(" ") ?? []);
    return {
      input: set.has("input"),
      blur: set.has("blur") || set.has("input") || set.has("invalid-input"),
      invalidInput: set.has("invalid-input"),
      lazy: set.has("lazy"),
      eager: set.has("eager")
    };
  });
  const isValid = computed(() => {
    if (props.error || props.errorMessages?.length) return false;
    if (!props.rules.length) return true;
    if (isPristine.value) {
      return internalErrorMessages.value.length || validateOn.value.lazy ? null : true;
    } else {
      return !internalErrorMessages.value.length;
    }
  });
  const isValidating = shallowRef(false);
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid.value === false,
      [`${name}--dirty`]: isDirty.value,
      [`${name}--disabled`]: form.isDisabled.value,
      [`${name}--readonly`]: form.isReadonly.value
    };
  });
  getCurrentInstance("validation");
  const uid = computed(() => props.name ?? unref(id));
  useToggleScope(() => validateOn.value.input || validateOn.value.invalidInput && isValid.value === false, () => {
    watch(validationModel, () => {
      if (validationModel.value != null) {
        validate();
      } else if (props.focused) {
        const unwatch = watch(() => props.focused, (val) => {
          if (!val) validate();
          unwatch();
        });
      }
    });
  });
  useToggleScope(() => validateOn.value.blur, () => {
    watch(() => props.focused, (val) => {
      if (!val) validate();
    });
  });
  watch([isValid, errorMessages], () => {
    form.update?.(uid.value, isValid.value, errorMessages.value);
  });
  async function reset() {
    model.value = null;
    await nextTick();
    await resetValidation();
  }
  async function resetValidation() {
    isPristine.value = true;
    if (!validateOn.value.lazy) {
      await validate(!validateOn.value.eager);
    } else {
      internalErrorMessages.value = [];
    }
  }
  async function validate() {
    let silent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    const results = [];
    isValidating.value = true;
    for (const rule of rules.value) {
      if (results.length >= Number(props.maxErrors ?? 1)) {
        break;
      }
      const handler = typeof rule === "function" ? rule : () => rule;
      const result = await handler(validationModel.value);
      if (result === true) continue;
      if (result !== false && typeof result !== "string") {
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
        continue;
      }
      results.push(result || "");
    }
    internalErrorMessages.value = results;
    isValidating.value = false;
    isPristine.value = silent;
    return internalErrorMessages.value;
  }
  return {
    errorMessages,
    isDirty,
    isDisabled: form.isDisabled,
    isReadonly: form.isReadonly,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate,
    validationClasses
  };
}
const makeVInputProps = propsFactory({
  id: String,
  appendIcon: IconValue,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: true
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: IconValue,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["horizontal", "vertical"].includes(v)
  },
  "onClick:prepend": EventProp(),
  "onClick:append": EventProp(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...pick(makeDimensionProps(), ["maxWidth", "minWidth", "width"]),
  ...makeThemeProps(),
  ...makeValidationProps()
}, "VInput");
const VInput = genericComponent()({
  name: "VInput",
  props: {
    ...makeVInputProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const {
      InputIcon
    } = useInputIcon(props);
    const uid = useId();
    const id = computed(() => props.id || `input-${uid}`);
    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses
    } = useValidation(props, "v-input", id);
    const messages = computed(() => {
      if (props.errorMessages?.length || !isPristine.value && errorMessages.value.length) {
        return errorMessages.value;
      } else if (props.hint && (props.persistentHint || props.focused)) {
        return props.hint;
      } else {
        return props.messages;
      }
    });
    const hasMessages = toRef(() => messages.value.length > 0);
    const hasDetails = toRef(() => !props.hideDetails || props.hideDetails === "auto" && (hasMessages.value || !!slots.details));
    const messagesId = computed(() => hasDetails.value ? `${id.value}-messages` : void 0);
    const slotProps = computed(() => ({
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      hasDetails,
      reset,
      resetValidation,
      validate
    }));
    const color = toRef(() => {
      return props.error || props.disabled ? void 0 : props.focused ? props.color : props.baseColor;
    });
    const iconColor = toRef(() => {
      if (!props.iconColor) return void 0;
      return props.iconColor === true ? color.value : props.iconColor;
    });
    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.prependIcon);
      const hasAppend = !!(slots.append || props.appendIcon);
      return createElementVNode("div", {
        "class": normalizeClass(["v-input", `v-input--${props.direction}`, {
          "v-input--center-affix": props.centerAffix,
          "v-input--focused": props.focused,
          "v-input--glow": props.glow,
          "v-input--hide-spin-buttons": props.hideSpinButtons
        }, densityClasses.value, themeClasses.value, rtlClasses.value, validationClasses.value, props.class]),
        "style": normalizeStyle([dimensionStyles.value, props.style])
      }, [hasPrepend && createElementVNode("div", {
        "key": "prepend",
        "class": "v-input__prepend"
      }, [slots.prepend ? slots.prepend(slotProps.value) : props.prependIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prepend",
        "color": iconColor.value
      }, null)]), slots.default && createElementVNode("div", {
        "class": "v-input__control"
      }, [slots.default?.(slotProps.value)]), hasAppend && createElementVNode("div", {
        "key": "append",
        "class": "v-input__append"
      }, [slots.append ? slots.append(slotProps.value) : props.appendIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "append",
        "color": iconColor.value
      }, null)]), hasDetails.value && createElementVNode("div", {
        "id": messagesId.value,
        "class": "v-input__details",
        "role": "alert",
        "aria-live": "polite"
      }, [createVNode(VMessages, {
        "active": hasMessages.value,
        "messages": messages.value
      }, {
        message: slots.message
      }), slots.details?.(slotProps.value)])]);
    });
    return {
      reset,
      resetValidation,
      validate,
      isValid,
      errorMessages
    };
  }
});
const makeAutocompleteProps = propsFactory({
  autocomplete: String
}, "autocomplete");
function useAutocomplete(props) {
  const uniqueId = useId();
  const reloadTrigger = shallowRef(0);
  const isSuppressing = toRef(() => props.autocomplete === "suppress");
  const fieldName = toRef(() => {
    if (!props.name) return void 0;
    return isSuppressing.value ? `${props.name}-${uniqueId}-${reloadTrigger.value}` : props.name;
  });
  const fieldAutocomplete = toRef(() => {
    return isSuppressing.value ? "off" : props.autocomplete;
  });
  return {
    isSuppressing,
    fieldAutocomplete,
    fieldName,
    update: () => reloadTrigger.value = (/* @__PURE__ */ new Date()).getTime()
  };
}
function useAutofocus(props) {
  function onIntersect(isIntersecting, entries) {
    if (!props.autofocus || !isIntersecting) return;
    const el = entries[0].target;
    const target = el.matches("input,textarea") ? el : el.querySelector("input,textarea");
    target?.focus();
  }
  return {
    onIntersect
  };
}
const activeTypes = ["color", "file", "time", "date", "datetime-local", "week", "month"];
const makeVTextFieldProps = propsFactory({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...makeAutocompleteProps(),
  ...omit(makeVInputProps(), ["direction"]),
  ...makeVFieldProps()
}, "VTextField");
const VTextField = genericComponent()({
  name: "VTextField",
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextFieldProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue", void 0, (v) => {
      if (Object.is(v, -0)) return "-0";
      return v;
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : (model.value ?? "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (!isFocused.value) focus();
      nextTick(() => {
        if (inputRef.value !== (void 0).activeElement) {
          inputRef.value?.focus();
        }
      });
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
      if (e.target === inputRef.value) return;
      onFocus();
      e.preventDefault();
    }
    function onControlClick(e) {
      emit("click:control", e);
    }
    function onClear(e, reset) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        reset();
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      const el = e.target;
      if (!(props.modelModifiers?.trim && ["text", "search", "password", "tel", "url"].includes(props.type))) {
        model.value = el.value;
        return;
      }
      const value = el.value;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      model.value = value;
      nextTick(() => {
        let offset = 0;
        if (value.trimStart().length === el.value.length) {
          offset = value.length - el.value.length;
        }
        if (start != null) el.selectionStart = start - offset;
        if (end != null) el.selectionEnd = end - offset;
      });
    }
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter !== false && props.counter != null);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = VField.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-text-field", {
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails: hasDetails2,
            reset
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": (e) => onClear(e, reset),
            "role": props.role
          }, omit(fieldProps, ["onClick:clear"]), {
            "id": id.value,
            "labelId": `${id.value}-label`,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails2.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                },
                controlRef
              } = _ref3;
              const inputNode = createElementVNode("input", mergeProps({
                "ref": (val) => inputRef.value = controlRef.value = val,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "name": autocomplete.fieldName.value,
                "autocomplete": autocomplete.fieldAutocomplete.value,
                "placeholder": props.placeholder,
                "size": 1,
                "role": props.role,
                "type": props.type,
                "onFocus": focus,
                "onBlur": blur,
                "aria-labelledby": `${id.value}-label`
              }, slotProps, inputAttrs), null);
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [createElementVNode("span", {
                "class": "v-text-field__prefix__text"
              }, [props.prefix])]), withDirectives(slots.default ? createElementVNode("div", {
                "class": normalizeClass(fieldClass),
                "data-no-activator": ""
              }, [slots.default({
                id
              }), inputNode]) : cloneVNode(inputNode, {
                class: fieldClass
              }), [[Intersect, onIntersect, null, {
                once: true
              }]]), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [createElementVNode("span", {
                "class": "v-text-field__suffix__text"
              }, [props.suffix])])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value,
          "disabled": props.disabled
        }, slots.counter)])]) : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxHeight: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeAutocompleteProps(),
  ...omit(makeVInputProps(), ["direction"]),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true,
    "update:rows": (rows) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const scrollbarWidth = ref(0);
    const {
      platform
    } = useDisplay();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (textareaRef.value !== (void 0).activeElement) {
        textareaRef.value?.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      const el = e.target;
      if (!props.modelModifiers?.trim) {
        model.value = el.value;
        return;
      }
      const value = el.value;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      model.value = value;
      nextTick(() => {
        let offset = 0;
        if (value.trimStart().length === el.value.length) {
          offset = value.length - el.value.length;
        }
        if (start != null) el.selectionStart = start - offset;
        if (end != null) el.selectionEnd = end - offset;
      });
    }
    const sizerRef = ref();
    const rows = ref(Number(props.rows));
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = Number(props.rows);
    });
    function calculateInputHeight() {
      nextTick(() => {
        if (!textareaRef.value) return;
        if (platform.value.firefox) {
          scrollbarWidth.value = 12;
          return;
        }
        const {
          offsetWidth,
          clientWidth
        } = textareaRef.value;
        scrollbarWidth.value = Math.max(0, offsetWidth - clientWidth);
      });
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = props.maxHeight ? parseFloat(props.maxHeight) : parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height ?? 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxHeight, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    watch(rows, (val) => {
      emit("update:rows", val);
    });
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer?.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = {
        ...VField.filterProps(props),
        "onClick:clear": onClear
      };
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": [{
          "--v-textarea-max-height": props.maxHeight ? convertToUnit(props.maxHeight) : void 0,
          "--v-textarea-scroll-bar-width": convertToUnit(scrollbarWidth.value)
        }, props.style]
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails: hasDetails2
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "labelId": `${id.value}-label`,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails2.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                },
                controlRef
              } = _ref3;
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createElementVNode("textarea", mergeProps({
                "ref": (val) => textareaRef.value = controlRef.value = val,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": autocomplete.fieldName.value,
                "autocomplete": autocomplete.fieldAutocomplete.value,
                "onFocus": onFocus,
                "onBlur": blur,
                "aria-labelledby": `${id.value}-label`
              }, slotProps, inputAttrs), null), [[Intersect, {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createElementVNode("textarea", {
                "class": normalizeClass([fieldClass, "v-textarea__sizer"]),
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value,
          "disabled": props.disabled
        }, slots.counter)])]) : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "renderForm",
  __ssrInlineRender: true,
  props: {
    rows: {},
    form: {}
  },
  setup(__props) {
    function mergeStyles(style1, style2) {
      return { ...style1, ...style2 };
    }
    const props = __props;
    const localRows = ref(JSON.parse(JSON.stringify(props.rows)));
    watch(() => props.rows, (newRows) => {
      localRows.value = JSON.parse(JSON.stringify(newRows));
    }, { deep: true });
    const rules = {
      required: [
        (value) => {
          if (value) return true;
          return "This field is required";
        }
      ],
      requiredNumber: [
        (value) => {
          if (/^\d+$/.test(value.toString())) return true;
          return "This field must be a number";
        }
      ]
    };
    function getRule(rule) {
      switch (rule) {
        case "requiredNumber":
          return rules.requiredNumber;
        case "required":
          return rules.required;
        default:
          return void 0;
      }
    }
    const config = useRuntimeConfig();
    const loading = ref(false);
    const show = ref(false);
    const message = ref("Saved successfully!");
    const color = ref("success");
    async function submit() {
      loading.value = true;
      const fd = new FormData();
      fd.append("formName", props.form.title);
      localRows.value.forEach((r) => {
        r.columns.forEach((col) => {
          col.elements.forEach((elm) => {
            if (elm.data.name) {
              fd.append(elm.data.name, elm.data.model);
            }
          });
        });
      });
      try {
        const res = await $fetch("api/forms/result/store", {
          method: "POST",
          baseURL: config.public.baseUrl,
          body: fd
        });
        console.log(res);
      } catch (err) {
        console.error(err);
      } finally {
        message.value = "Form submitted!";
        color.value = "success";
        show.value = true;
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({
        fluid: "",
        style: { "display": "flex", "flex-direction": "column", "gap": "10px" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VSnackbar, {
              style: { "z-index": "9999999" },
              modelValue: unref(show),
              "onUpdate:modelValue": ($event) => isRef(show) ? show.value = $event : null,
              color: unref(color),
              timeout: "3000",
              location: "top right"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(message))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(message)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(unref(localRows), (row) => {
              _push2(ssrRenderComponent(ContainerBox, {
                "is-normal-in-fluid": "",
                style: mergeStyles(mergeStyles(row.margin, row.padding), { background: row.background_type === "color" ? row.background : `url(${unref(config).public.baseUrl}/${row.background})`, position: "relative", backgroundPosition: "center center" })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(row.columns, (column) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: row.id.toString() + column.id.toString() + "column",
                        style: { "position": "relative", "padding": "0" },
                        cols: "12",
                        sm: "12",
                        md: column.column_md,
                        lg: column.column_lg,
                        xl: column.column_xl
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div style="${ssrRenderStyle([{ "width": "100%", "height": "100%" }, mergeStyles(column.styles, column.padding)])}"${_scopeId3}><!--[-->`);
                            ssrRenderList(column.elements, (element) => {
                              _push4(`<div style="${ssrRenderStyle([{ "width": "100%", "position": "relative" }, element.padding])}"${_scopeId3}>`);
                              if (element.element_key === "simpleInput") {
                                _push4(ssrRenderComponent(VTextField, {
                                  variant: element.data.variant,
                                  placeholder: element.data.placeholder,
                                  label: element.data.label,
                                  rules: getRule(element.data.errorRule),
                                  modelValue: element.data.model,
                                  "onUpdate:modelValue": ($event) => element.data.model = $event
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "textareaInput") {
                                _push4(ssrRenderComponent(VTextarea, {
                                  variant: element.data.variant,
                                  placeholder: element.data.placeholder,
                                  label: element.data.label,
                                  rules: getRule(element.data.errorRule),
                                  modelValue: element.data.model,
                                  "onUpdate:modelValue": ($event) => element.data.model = $event
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (element.element_key === "formButton") {
                                _push4(ssrRenderComponent(VCol, {
                                  style: mergeStyles(element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align })
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      if (element.data.buttonTitle !== "") {
                                        _push5(ssrRenderComponent(VBtn, {
                                          loading: unref(loading),
                                          onClick: submit,
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: element.data.buttonLink,
                                          variant: element.data.ButtonsStyles.style,
                                          block: element.data.datafullWidth,
                                          color: element.data.buttonColor,
                                          rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, {
                                          prepend: withCtx((_5, _push6, _parent6, _scopeId5) => {
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
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              if (!!element.data.icon) {
                                                _push6(`<!--[-->`);
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
                                                _push6(`<!--]-->`);
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                              if (!element.data.icon) {
                                                _push6(`<span style="${ssrRenderStyle({ "padding-top": "2px" })}"${_scopeId5}>${ssrInterpolate(element.data.buttonTitle)}</span>`);
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                            } else {
                                              return [
                                                !!element.data.icon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                  element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true)
                                                ], 64)) : createCommentVNode("", true),
                                                !element.data.icon ? (openBlock(), createBlock("span", {
                                                  key: 1,
                                                  style: { "padding-top": "2px" }
                                                }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                          key: 0,
                                          loading: unref(loading),
                                          onClick: submit,
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: element.data.buttonLink,
                                          variant: element.data.ButtonsStyles.style,
                                          block: element.data.datafullWidth,
                                          color: element.data.buttonColor,
                                          rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, {
                                          prepend: withCtx(() => [
                                            element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true)
                                          ]),
                                          default: withCtx(() => [
                                            !!element.data.icon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                              element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ], 64)) : createCommentVNode("", true),
                                            !element.data.icon ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              style: { "padding-top": "2px" }
                                            }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["loading", "icon", "size", "to", "variant", "block", "color", "rounded"])) : createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                            });
                            _push4(`<!--]--></div>`);
                          } else {
                            return [
                              createVNode("div", {
                                style: [{ "width": "100%", "height": "100%" }, mergeStyles(column.styles, column.padding)]
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                  return openBlock(), createBlock("div", {
                                    style: [{ "width": "100%", "position": "relative" }, element.padding]
                                  }, [
                                    element.element_key === "simpleInput" ? (openBlock(), createBlock(VTextField, {
                                      key: 0,
                                      variant: element.data.variant,
                                      placeholder: element.data.placeholder,
                                      label: element.data.label,
                                      rules: getRule(element.data.errorRule),
                                      modelValue: element.data.model,
                                      "onUpdate:modelValue": ($event) => element.data.model = $event
                                    }, null, 8, ["variant", "placeholder", "label", "rules", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                    element.element_key === "textareaInput" ? (openBlock(), createBlock(VTextarea, {
                                      key: 1,
                                      variant: element.data.variant,
                                      placeholder: element.data.placeholder,
                                      label: element.data.label,
                                      rules: getRule(element.data.errorRule),
                                      modelValue: element.data.model,
                                      "onUpdate:modelValue": ($event) => element.data.model = $event
                                    }, null, 8, ["variant", "placeholder", "label", "rules", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                    element.element_key === "formButton" ? (openBlock(), createBlock(VCol, {
                                      key: 2,
                                      style: mergeStyles(element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align })
                                    }, {
                                      default: withCtx(() => [
                                        element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                          key: 0,
                                          loading: unref(loading),
                                          onClick: submit,
                                          icon: element.data.icon,
                                          size: element.data.icon ? "small" : void 0,
                                          to: element.data.buttonLink,
                                          variant: element.data.ButtonsStyles.style,
                                          block: element.data.datafullWidth,
                                          color: element.data.buttonColor,
                                          rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                        }, {
                                          prepend: withCtx(() => [
                                            element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true)
                                          ]),
                                          default: withCtx(() => [
                                            !!element.data.icon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                              element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ], 64)) : createCommentVNode("", true),
                                            !element.data.icon ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              style: { "padding-top": "2px" }
                                            }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["loading", "icon", "size", "to", "variant", "block", "color", "rounded"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["style"])) : createCommentVNode("", true)
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
                          style: { "position": "relative", "padding": "0" },
                          cols: "12",
                          sm: "12",
                          md: column.column_md,
                          lg: column.column_lg,
                          xl: column.column_xl
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              style: [{ "width": "100%", "height": "100%" }, mergeStyles(column.styles, column.padding)]
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                                return openBlock(), createBlock("div", {
                                  style: [{ "width": "100%", "position": "relative" }, element.padding]
                                }, [
                                  element.element_key === "simpleInput" ? (openBlock(), createBlock(VTextField, {
                                    key: 0,
                                    variant: element.data.variant,
                                    placeholder: element.data.placeholder,
                                    label: element.data.label,
                                    rules: getRule(element.data.errorRule),
                                    modelValue: element.data.model,
                                    "onUpdate:modelValue": ($event) => element.data.model = $event
                                  }, null, 8, ["variant", "placeholder", "label", "rules", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                  element.element_key === "textareaInput" ? (openBlock(), createBlock(VTextarea, {
                                    key: 1,
                                    variant: element.data.variant,
                                    placeholder: element.data.placeholder,
                                    label: element.data.label,
                                    rules: getRule(element.data.errorRule),
                                    modelValue: element.data.model,
                                    "onUpdate:modelValue": ($event) => element.data.model = $event
                                  }, null, 8, ["variant", "placeholder", "label", "rules", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                  element.element_key === "formButton" ? (openBlock(), createBlock(VCol, {
                                    key: 2,
                                    style: mergeStyles(element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align })
                                  }, {
                                    default: withCtx(() => [
                                      element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                        key: 0,
                                        loading: unref(loading),
                                        onClick: submit,
                                        icon: element.data.icon,
                                        size: element.data.icon ? "small" : void 0,
                                        to: element.data.buttonLink,
                                        variant: element.data.ButtonsStyles.style,
                                        block: element.data.datafullWidth,
                                        color: element.data.buttonColor,
                                        rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                      }, {
                                        prepend: withCtx(() => [
                                          element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                            ]),
                                            _: 2
                                          }, 1024)) : createCommentVNode("", true)
                                        ]),
                                        default: withCtx(() => [
                                          !!element.data.icon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                            element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true)
                                          ], 64)) : createCommentVNode("", true),
                                          !element.data.icon ? (openBlock(), createBlock("span", {
                                            key: 1,
                                            style: { "padding-top": "2px" }
                                          }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["loading", "icon", "size", "to", "variant", "block", "color", "rounded"])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["style"])) : createCommentVNode("", true)
                                ], 4);
                              }), 256))
                            ], 4)
                          ]),
                          _: 2
                        }, 1032, ["md", "lg", "xl"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode(VSnackbar, {
                style: { "z-index": "9999999" },
                modelValue: unref(show),
                "onUpdate:modelValue": ($event) => isRef(show) ? show.value = $event : null,
                color: unref(color),
                timeout: "3000",
                location: "top right"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(message)), 1)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "color"]),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(localRows), (row) => {
                return openBlock(), createBlock(ContainerBox, {
                  "is-normal-in-fluid": "",
                  style: mergeStyles(mergeStyles(row.margin, row.padding), { background: row.background_type === "color" ? row.background : `url(${unref(config).public.baseUrl}/${row.background})`, position: "relative", backgroundPosition: "center center" })
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(row.columns, (column) => {
                      return openBlock(), createBlock(VCol, {
                        key: row.id.toString() + column.id.toString() + "column",
                        style: { "position": "relative", "padding": "0" },
                        cols: "12",
                        sm: "12",
                        md: column.column_md,
                        lg: column.column_lg,
                        xl: column.column_xl
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            style: [{ "width": "100%", "height": "100%" }, mergeStyles(column.styles, column.padding)]
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(column.elements, (element) => {
                              return openBlock(), createBlock("div", {
                                style: [{ "width": "100%", "position": "relative" }, element.padding]
                              }, [
                                element.element_key === "simpleInput" ? (openBlock(), createBlock(VTextField, {
                                  key: 0,
                                  variant: element.data.variant,
                                  placeholder: element.data.placeholder,
                                  label: element.data.label,
                                  rules: getRule(element.data.errorRule),
                                  modelValue: element.data.model,
                                  "onUpdate:modelValue": ($event) => element.data.model = $event
                                }, null, 8, ["variant", "placeholder", "label", "rules", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                element.element_key === "textareaInput" ? (openBlock(), createBlock(VTextarea, {
                                  key: 1,
                                  variant: element.data.variant,
                                  placeholder: element.data.placeholder,
                                  label: element.data.label,
                                  rules: getRule(element.data.errorRule),
                                  modelValue: element.data.model,
                                  "onUpdate:modelValue": ($event) => element.data.model = $event
                                }, null, 8, ["variant", "placeholder", "label", "rules", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                element.element_key === "formButton" ? (openBlock(), createBlock(VCol, {
                                  key: 2,
                                  style: mergeStyles(element.padding, { display: "flex", flexDirection: "row", justifyContent: element.data.align })
                                }, {
                                  default: withCtx(() => [
                                    element.data.buttonTitle !== "" ? (openBlock(), createBlock(VBtn, {
                                      key: 0,
                                      loading: unref(loading),
                                      onClick: submit,
                                      icon: element.data.icon,
                                      size: element.data.icon ? "small" : void 0,
                                      to: element.data.buttonLink,
                                      variant: element.data.ButtonsStyles.style,
                                      block: element.data.datafullWidth,
                                      color: element.data.buttonColor,
                                      rounded: element.data.ButtonsStyles.rounded ? element.data.ButtonsStyles.rounded : "8px"
                                    }, {
                                      prepend: withCtx(() => [
                                        element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true)
                                      ]),
                                      default: withCtx(() => [
                                        !!element.data.icon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                          element.data.buttonIcon !== "" ? (openBlock(), createBlock(VIcon, { key: 0 }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(element.data.buttonIcon), 1)
                                            ]),
                                            _: 2
                                          }, 1024)) : createCommentVNode("", true)
                                        ], 64)) : createCommentVNode("", true),
                                        !element.data.icon ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          style: { "padding-top": "2px" }
                                        }, toDisplayString(element.data.buttonTitle), 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["loading", "icon", "size", "to", "variant", "block", "color", "rounded"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["style"])) : createCommentVNode("", true)
                              ], 4);
                            }), 256))
                          ], 4)
                        ]),
                        _: 2
                      }, 1032, ["md", "lg", "xl"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["style"]);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/renderForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const renderForm = Object.assign(_sfc_main, { __name: "EditorElementsRenderForm" });
export {
  renderForm as default
};
//# sourceMappingURL=renderForm-CyJcRg8i.js.map
