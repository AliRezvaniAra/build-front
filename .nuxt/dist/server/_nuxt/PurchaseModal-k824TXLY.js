import { ref, watch, nextTick, mergeProps, createVNode, defineComponent, computed, withCtx, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { a5 as useScopeId, a6 as forwardRefs, a7 as makeVOverlayProps, a8 as VDialogTransition, a9 as VOverlay, P as VDefaultsProvider, r as VCard, aa as VCardTitle, t as VSpacer, n as VBtn, x as VCardText, Q as VAvatar, s as VImg, y as VCardActions } from "./asyncData-utIt_h6-.js";
import { g as genericComponent, A as useProxiedModel, p as propsFactory, X as omit } from "../server.mjs";
import { u as useRender } from "./resizeObserver-Bors9hmC.js";
const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  scrollable: Boolean,
  ...omit(makeVOverlayProps({
    captureFocus: true,
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: VDialogTransition
    },
    zIndex: 2400,
    retainFocus: true
  }), ["disableInitialFocus"])
}, "VDialog");
const VDialog = genericComponent()({
  name: "VDialog",
  props: makeVDialogProps(),
  emits: {
    "update:modelValue": (value) => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    function onAfterEnter() {
      emit("afterEnter");
      if ((props.scrim || props.retainFocus) && overlay.value?.contentEl && !overlay.value.contentEl.contains((void 0).activeElement)) {
        overlay.value.contentEl.focus({
          preventScroll: true
        });
      }
    }
    function onAfterLeave() {
      emit("afterLeave");
    }
    watch(isActive, async (val) => {
      if (!val) {
        await nextTick();
        overlay.value.activatorEl?.focus({
          preventScroll: true
        });
      }
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const activatorProps = mergeProps({
        "aria-haspopup": "dialog"
      }, props.activatorProps);
      const contentProps = mergeProps({
        tabindex: -1
      }, props.contentProps);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }, props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "aria-modal": "true",
        "activatorProps": activatorProps,
        "contentProps": contentProps,
        "height": !props.fullscreen ? props.height : void 0,
        "width": !props.fullscreen ? props.width : void 0,
        "maxHeight": !props.fullscreen ? props.maxHeight : void 0,
        "maxWidth": !props.fullscreen ? props.maxWidth : void 0,
        "role": "dialog",
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VDialog"
          }, {
            default: () => [slots.default?.(...args)]
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PurchaseModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    product: {},
    title: {},
    unitPriceTitle: {},
    selectQuantityTitle: {},
    totalPriceTitle: {},
    addToCardTitle: {},
    icon: {},
    variant: {},
    rounded: { type: Boolean },
    color: {}
  },
  emits: ["update:modelValue", "confirm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const quantity = ref(1);
    const close = () => {
      quantity.value = 1;
      emit("update:modelValue", false);
    };
    function onDialogModel(v) {
      emit("update:modelValue", v);
      if (!v) quantity.value = 1;
    }
    const handlePurchase = () => {
      emit("confirm", {
        quantity: quantity.value,
        total: (parseFloat(props.product.price) * quantity.value).toFixed(2)
      });
      close();
    };
    const totalPrice = computed(() => {
      return (parseFloat(props.product.price) * quantity.value).toFixed(2);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        "model-value": __props.modelValue,
        "onUpdate:modelValue": onDialogModel,
        "max-width": "450",
        "scroll-strategy": "none"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { class: "rounded-xl pa-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "d-flex align-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-h5 font-weight-black"${_scopeId3}>${ssrInterpolate(__props.title)}</span>`);
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "mdi-close",
                          variant: "text",
                          onClick: close
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("span", { class: "text-h5 font-weight-black" }, toDisplayString(__props.title), 1),
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            icon: "mdi-close",
                            variant: "text",
                            onClick: close
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex align-center mb-6"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VAvatar, {
                          size: "80",
                          rounded: "lg",
                          class: "mr-4 border"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VImg, {
                                src: __props.product.primaryImg,
                                cover: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VImg, {
                                  src: __props.product.primaryImg,
                                  cover: ""
                                }, null, 8, ["src"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}><div class="text-subtitle-1 font-weight-bold"${_scopeId3}>${ssrInterpolate(__props.product.name)}</div><div class="text-body-2 text-grey"${_scopeId3}>${ssrInterpolate(__props.unitPriceTitle)} ${ssrInterpolate(__props.product.currency)}${ssrInterpolate(__props.product.price)}</div></div></div><div class="text-subtitle-2 mb-2"${_scopeId3}>${ssrInterpolate(__props.selectQuantityTitle)}</div><div class="d-flex align-center mb-6"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "mdi-minus",
                          variant: "tonal",
                          color: __props.color,
                          size: "small",
                          disabled: quantity.value <= 1,
                          onClick: ($event) => quantity.value--
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="mx-6 text-h6 font-weight-bold"${_scopeId3}>${ssrInterpolate(quantity.value)}</div>`);
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "mdi-plus",
                          variant: "tonal",
                          color: __props.color,
                          size: "small",
                          onClick: ($event) => quantity.value++
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(`<div class="text-right"${_scopeId3}><div class="text-caption text-grey"${_scopeId3}>${ssrInterpolate(__props.totalPriceTitle)}</div><div class="text-h6 font-weight-black" style="${ssrRenderStyle({ color: "var(--v-theme-success)" })}"${_scopeId3}>${ssrInterpolate(__props.product.currency)} ${ssrInterpolate(totalPrice.value)}</div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex align-center mb-6" }, [
                            createVNode(VAvatar, {
                              size: "80",
                              rounded: "lg",
                              class: "mr-4 border"
                            }, {
                              default: withCtx(() => [
                                createVNode(VImg, {
                                  src: __props.product.primaryImg,
                                  cover: ""
                                }, null, 8, ["src"])
                              ]),
                              _: 1
                            }),
                            createVNode("div", null, [
                              createVNode("div", { class: "text-subtitle-1 font-weight-bold" }, toDisplayString(__props.product.name), 1),
                              createVNode("div", { class: "text-body-2 text-grey" }, toDisplayString(__props.unitPriceTitle) + " " + toDisplayString(__props.product.currency) + toDisplayString(__props.product.price), 1)
                            ])
                          ]),
                          createVNode("div", { class: "text-subtitle-2 mb-2" }, toDisplayString(__props.selectQuantityTitle), 1),
                          createVNode("div", { class: "d-flex align-center mb-6" }, [
                            createVNode(VBtn, {
                              icon: "mdi-minus",
                              variant: "tonal",
                              color: __props.color,
                              size: "small",
                              disabled: quantity.value <= 1,
                              onClick: ($event) => quantity.value--
                            }, null, 8, ["color", "disabled", "onClick"]),
                            createVNode("div", { class: "mx-6 text-h6 font-weight-bold" }, toDisplayString(quantity.value), 1),
                            createVNode(VBtn, {
                              icon: "mdi-plus",
                              variant: "tonal",
                              color: __props.color,
                              size: "small",
                              onClick: ($event) => quantity.value++
                            }, null, 8, ["color", "onClick"]),
                            createVNode(VSpacer),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("div", { class: "text-caption text-grey" }, toDisplayString(__props.totalPriceTitle), 1),
                              createVNode("div", {
                                class: "text-h6 font-weight-black",
                                style: { color: "var(--v-theme-success)" }
                              }, toDisplayString(__props.product.currency) + " " + toDisplayString(totalPrice.value), 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          block: "",
                          size: "x-large",
                          color: __props.color,
                          variant: __props.variant,
                          class: "font-weight-bold rounded-lg",
                          onClick: handlePurchase
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.addToCardTitle)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.addToCardTitle), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            block: "",
                            size: "x-large",
                            color: __props.color,
                            variant: __props.variant,
                            class: "font-weight-bold rounded-lg",
                            onClick: handlePurchase
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.addToCardTitle), 1)
                            ]),
                            _: 1
                          }, 8, ["color", "variant"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "d-flex align-center" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-h5 font-weight-black" }, toDisplayString(__props.title), 1),
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          icon: "mdi-close",
                          variant: "text",
                          onClick: close
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex align-center mb-6" }, [
                          createVNode(VAvatar, {
                            size: "80",
                            rounded: "lg",
                            class: "mr-4 border"
                          }, {
                            default: withCtx(() => [
                              createVNode(VImg, {
                                src: __props.product.primaryImg,
                                cover: ""
                              }, null, 8, ["src"])
                            ]),
                            _: 1
                          }),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-subtitle-1 font-weight-bold" }, toDisplayString(__props.product.name), 1),
                            createVNode("div", { class: "text-body-2 text-grey" }, toDisplayString(__props.unitPriceTitle) + " " + toDisplayString(__props.product.currency) + toDisplayString(__props.product.price), 1)
                          ])
                        ]),
                        createVNode("div", { class: "text-subtitle-2 mb-2" }, toDisplayString(__props.selectQuantityTitle), 1),
                        createVNode("div", { class: "d-flex align-center mb-6" }, [
                          createVNode(VBtn, {
                            icon: "mdi-minus",
                            variant: "tonal",
                            color: __props.color,
                            size: "small",
                            disabled: quantity.value <= 1,
                            onClick: ($event) => quantity.value--
                          }, null, 8, ["color", "disabled", "onClick"]),
                          createVNode("div", { class: "mx-6 text-h6 font-weight-bold" }, toDisplayString(quantity.value), 1),
                          createVNode(VBtn, {
                            icon: "mdi-plus",
                            variant: "tonal",
                            color: __props.color,
                            size: "small",
                            onClick: ($event) => quantity.value++
                          }, null, 8, ["color", "onClick"]),
                          createVNode(VSpacer),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("div", { class: "text-caption text-grey" }, toDisplayString(__props.totalPriceTitle), 1),
                            createVNode("div", {
                              class: "text-h6 font-weight-black",
                              style: { color: "var(--v-theme-success)" }
                            }, toDisplayString(__props.product.currency) + " " + toDisplayString(totalPrice.value), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          block: "",
                          size: "x-large",
                          color: __props.color,
                          variant: __props.variant,
                          class: "font-weight-bold rounded-lg",
                          onClick: handlePurchase
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.addToCardTitle), 1)
                          ]),
                          _: 1
                        }, 8, ["color", "variant"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, { class: "rounded-xl pa-4" }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "d-flex align-center" }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-h5 font-weight-black" }, toDisplayString(__props.title), 1),
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        icon: "mdi-close",
                        variant: "text",
                        onClick: close
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex align-center mb-6" }, [
                        createVNode(VAvatar, {
                          size: "80",
                          rounded: "lg",
                          class: "mr-4 border"
                        }, {
                          default: withCtx(() => [
                            createVNode(VImg, {
                              src: __props.product.primaryImg,
                              cover: ""
                            }, null, 8, ["src"])
                          ]),
                          _: 1
                        }),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-subtitle-1 font-weight-bold" }, toDisplayString(__props.product.name), 1),
                          createVNode("div", { class: "text-body-2 text-grey" }, toDisplayString(__props.unitPriceTitle) + " " + toDisplayString(__props.product.currency) + toDisplayString(__props.product.price), 1)
                        ])
                      ]),
                      createVNode("div", { class: "text-subtitle-2 mb-2" }, toDisplayString(__props.selectQuantityTitle), 1),
                      createVNode("div", { class: "d-flex align-center mb-6" }, [
                        createVNode(VBtn, {
                          icon: "mdi-minus",
                          variant: "tonal",
                          color: __props.color,
                          size: "small",
                          disabled: quantity.value <= 1,
                          onClick: ($event) => quantity.value--
                        }, null, 8, ["color", "disabled", "onClick"]),
                        createVNode("div", { class: "mx-6 text-h6 font-weight-bold" }, toDisplayString(quantity.value), 1),
                        createVNode(VBtn, {
                          icon: "mdi-plus",
                          variant: "tonal",
                          color: __props.color,
                          size: "small",
                          onClick: ($event) => quantity.value++
                        }, null, 8, ["color", "onClick"]),
                        createVNode(VSpacer),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("div", { class: "text-caption text-grey" }, toDisplayString(__props.totalPriceTitle), 1),
                          createVNode("div", {
                            class: "text-h6 font-weight-black",
                            style: { color: "var(--v-theme-success)" }
                          }, toDisplayString(__props.product.currency) + " " + toDisplayString(totalPrice.value), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        block: "",
                        size: "x-large",
                        color: __props.color,
                        variant: __props.variant,
                        class: "font-weight-bold rounded-lg",
                        onClick: handlePurchase
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.addToCardTitle), 1)
                        ]),
                        _: 1
                      }, 8, ["color", "variant"])
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
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/PurchaseModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PurchaseModal = Object.assign(_sfc_main, { __name: "EditorElementsElementsPurchaseModal" });
export {
  PurchaseModal as P
};
//# sourceMappingURL=PurchaseModal-k824TXLY.js.map
