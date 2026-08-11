import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createTextVNode, createCommentVNode, withModifiers, useSSRContext, shallowRef, toRef, normalizeStyle, normalizeClass, createElementVNode, nextTick, watch } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { P as PurchaseModal } from "./PurchaseModal-CCZxz_QX.js";
import { u as useTrans } from "./useTrans-CtYIwtZX.js";
import { l as useShopLocal, r as VCard, s as VImg, t as VSpacer, n as VBtn, x as VCardText, p as VRow, q as VCol, y as VCardActions, C as makeVariantProps, h as makeTagProps, S as makeSizeProps, i as makeRoundedProps, W as makeElevationProps, X as makeDensityProps, Y as makeBorderProps, u as useAsyncData, V as VContainer, o as VFadeTransition, w as VProgressCircular } from "./asyncData-BoxtDLvH.js";
import { _ as _export_sfc, g as genericComponent, A as useProxiedModel, a6 as useLocale, k as useRtl, x as provideTheme, f as useDisplay, y as provideDefaults, ag as createRange, ah as keyValues, p as propsFactory, I as IconValue, w as makeThemeProps, aa as useGoTo, b as useRuntimeConfig } from "../server.mjs";
import { a as useResizeObserver, u as useRender, m as makeComponentProps } from "./resizeObserver-Bors9hmC.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Product",
  __ssrInlineRender: true,
  props: {
    productId: {},
    slug: {},
    product: {},
    uiStyles: {},
    locale: {}
  },
  setup(__props) {
    const props = __props;
    const shop = useShopLocal();
    const isHovered = ref(false);
    const showBuyModal = ref(false);
    const favActive = computed(
      () => shop.favorites.value.some(
        (f) => f.id === props.productId && f.sku === props.product.sku
      )
    );
    function toggleFavorite() {
      shop.toggleFavorite({
        id: props.productId,
        sku: props.product.sku,
        slug: props.slug,
        title: props.product.name,
        price: props.product.price,
        currency: props.product.currency,
        primaryImg: props.product.primaryImg,
        secondaryImg: props.product.secondaryImg,
        label: props.product.label
      });
    }
    const onConfirmPurchase = (data) => {
      shop.addToCart({
        id: props.productId,
        sku: props.product.sku,
        slug: props.slug,
        title: props.product.name,
        price: props.product.price,
        currency: props.product.currency,
        image: props.product.primaryImg,
        quantity: data.quantity
      });
    };
    const detailsPath = computed(() => `/${props.locale}/products/${props.slug}`);
    const { t } = useTrans();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        class: "product-card mx-auto",
        "max-width": "400",
        elevation: isHovered.value ? 8 : 2,
        onMouseenter: ($event) => isHovered.value = true,
        onMouseleave: ($event) => isHovered.value = false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="image-wrapper" data-v-56d1a298${_scopeId}>`);
            _push2(ssrRenderComponent(VImg, {
              src: __props.product.secondaryImg,
              height: "100%",
              class: ["bg-image", { "zoom-effect": isHovered.value }]
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VImg, {
              src: __props.product.primaryImg,
              height: "100%",
              class: ["bg-image top-image", { "faded": isHovered.value, "zoom-effect": isHovered.value }]
            }, null, _parent2, _scopeId));
            _push2(`<div class="image-overlay-ui pa-3" data-v-56d1a298${_scopeId}>`);
            _push2(ssrRenderComponent(VSpacer, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              icon: favActive.value ? "mdi-heart" : "mdi-heart-outline",
              color: favActive.value ? "red" : "white",
              size: "small",
              variant: "flat",
              class: "glass-effect favorite-btn",
              onClick: toggleFavorite
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(VCardText, { class: "pt-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex justify-space-between align-center mb-1" data-v-56d1a298${_scopeId2}><span class="text-subtitle-1 font-weight-bold text-truncate" data-v-56d1a298${_scopeId2}>${ssrInterpolate(__props.product.name)}</span></div><div class="d-flex justify-space-between align-center mb-1" data-v-56d1a298${_scopeId2}><div class="text-caption text-grey" data-v-56d1a298${_scopeId2}>SKU: ${ssrInterpolate(__props.product.sku)}</div><span class="font-weight-black text-success" style="${ssrRenderStyle({ "font-size": "18px" })}" data-v-56d1a298${_scopeId2}>${ssrInterpolate(parseFloat(__props.product.price).toLocaleString())} ${ssrInterpolate(unref(t)[__props.product.currency])}</span></div>`);
                  _push3(ssrRenderComponent(VRow, {
                    "no-gutters": "",
                    class: "info-box pa-2 rounded-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(props.product.features.filter((f) => (f.lang ?? __props.locale) === __props.locale), (feature, index) => {
                          _push4(ssrRenderComponent(VCol, {
                            key: index,
                            cols: "6",
                            class: ["text-center py-2", { "border-e": index % 2 === 0, "border-b": index < props.product.features.filter((f) => (f.lang ?? __props.locale) === __props.locale).length - 2 }]
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-overline text-grey-darken-1" data-v-56d1a298${_scopeId4}>${ssrInterpolate(unref(t)[feature.key] ?? feature.key)}</div><div class="text-caption font-weight-bold" data-v-56d1a298${_scopeId4}>${ssrInterpolate(feature.value)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-overline text-grey-darken-1" }, toDisplayString(unref(t)[feature.key] ?? feature.key), 1),
                                  createVNode("div", { class: "text-caption font-weight-bold" }, toDisplayString(feature.value), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.product.features.filter((f) => (f.lang ?? __props.locale) === __props.locale), (feature, index) => {
                            return openBlock(), createBlock(VCol, {
                              key: index,
                              cols: "6",
                              class: ["text-center py-2", { "border-e": index % 2 === 0, "border-b": index < props.product.features.filter((f) => (f.lang ?? __props.locale) === __props.locale).length - 2 }]
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-overline text-grey-darken-1" }, toDisplayString(unref(t)[feature.key] ?? feature.key), 1),
                                createVNode("div", { class: "text-caption font-weight-bold" }, toDisplayString(feature.value), 1)
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "d-flex justify-space-between align-center mb-1" }, [
                      createVNode("span", { class: "text-subtitle-1 font-weight-bold text-truncate" }, toDisplayString(__props.product.name), 1)
                    ]),
                    createVNode("div", { class: "d-flex justify-space-between align-center mb-1" }, [
                      createVNode("div", { class: "text-caption text-grey" }, "SKU: " + toDisplayString(__props.product.sku), 1),
                      createVNode("span", {
                        class: "font-weight-black text-success",
                        style: { "font-size": "18px" }
                      }, toDisplayString(parseFloat(__props.product.price).toLocaleString()) + " " + toDisplayString(unref(t)[__props.product.currency]), 1)
                    ]),
                    createVNode(VRow, {
                      "no-gutters": "",
                      class: "info-box pa-2 rounded-lg"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(props.product.features.filter((f) => (f.lang ?? __props.locale) === __props.locale), (feature, index) => {
                          return openBlock(), createBlock(VCol, {
                            key: index,
                            cols: "6",
                            class: ["text-center py-2", { "border-e": index % 2 === 0, "border-b": index < props.product.features.filter((f) => (f.lang ?? __props.locale) === __props.locale).length - 2 }]
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-overline text-grey-darken-1" }, toDisplayString(unref(t)[feature.key] ?? feature.key), 1),
                              createVNode("div", { class: "text-caption font-weight-bold" }, toDisplayString(feature.value), 1)
                            ]),
                            _: 2
                          }, 1032, ["class"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardActions, { class: "pa-4 pt-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.uiStyles.buy.title !== "disable") {
                    _push3(ssrRenderComponent(VBtn, {
                      color: __props.uiStyles.buy.color,
                      variant: __props.uiStyles.buy.variant,
                      class: "font-weight-bold",
                      rounded: __props.uiStyles.buy.rounded,
                      style: { "flex": "3" },
                      "prepend-icon": __props.uiStyles.buy.icon,
                      onClick: ($event) => showBuyModal.value = true
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(__props.uiStyles.buy.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(__props.uiStyles.buy.title), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(VBtn, {
                    color: __props.uiStyles.details.color,
                    variant: __props.uiStyles.details.variant,
                    class: "font-weight-bold",
                    rounded: __props.uiStyles.details.rounded,
                    style: { "flex": "3" },
                    "prepend-icon": __props.uiStyles.details.icon,
                    to: detailsPath.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.uiStyles.details.title)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.uiStyles.details.title), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    __props.uiStyles.buy.title !== "disable" ? (openBlock(), createBlock(VBtn, {
                      key: 0,
                      color: __props.uiStyles.buy.color,
                      variant: __props.uiStyles.buy.variant,
                      class: "font-weight-bold",
                      rounded: __props.uiStyles.buy.rounded,
                      style: { "flex": "3" },
                      "prepend-icon": __props.uiStyles.buy.icon,
                      onClick: ($event) => showBuyModal.value = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.uiStyles.buy.title), 1)
                      ]),
                      _: 1
                    }, 8, ["color", "variant", "rounded", "prepend-icon", "onClick"])) : createCommentVNode("", true),
                    createVNode(VBtn, {
                      color: __props.uiStyles.details.color,
                      variant: __props.uiStyles.details.variant,
                      class: "font-weight-bold",
                      rounded: __props.uiStyles.details.rounded,
                      style: { "flex": "3" },
                      "prepend-icon": __props.uiStyles.details.icon,
                      to: detailsPath.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.uiStyles.details.title), 1)
                      ]),
                      _: 1
                    }, 8, ["color", "variant", "rounded", "prepend-icon", "to"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(PurchaseModal, mergeProps({
              "add-to-card-title": unref(t)?.confirm_and_add_to_cart ?? "",
              modelValue: showBuyModal.value,
              "onUpdate:modelValue": ($event) => showBuyModal.value = $event,
              product: __props.product
            }, __props.uiStyles.buy.modal, {
              title: unref(t)?.confirm_purchase ?? "",
              "unit-price-title": unref(t)?.unit_price ?? "",
              "select-quantity-title": unref(t)?.select_quantity ?? "",
              "total-price-title": unref(t)?.total ?? "",
              onConfirm: onConfirmPurchase
            }), null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "image-wrapper" }, [
                createVNode(VImg, {
                  src: __props.product.secondaryImg,
                  height: "100%",
                  class: ["bg-image", { "zoom-effect": isHovered.value }]
                }, null, 8, ["src", "class"]),
                createVNode(VImg, {
                  src: __props.product.primaryImg,
                  height: "100%",
                  class: ["bg-image top-image", { "faded": isHovered.value, "zoom-effect": isHovered.value }]
                }, null, 8, ["src", "class"]),
                createVNode("div", { class: "image-overlay-ui pa-3" }, [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    icon: favActive.value ? "mdi-heart" : "mdi-heart-outline",
                    color: favActive.value ? "red" : "white",
                    size: "small",
                    variant: "flat",
                    class: "glass-effect favorite-btn",
                    onClick: withModifiers(toggleFavorite, ["stop"])
                  }, null, 8, ["icon", "color"])
                ])
              ]),
              createVNode(VCardText, { class: "pt-2" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex justify-space-between align-center mb-1" }, [
                    createVNode("span", { class: "text-subtitle-1 font-weight-bold text-truncate" }, toDisplayString(__props.product.name), 1)
                  ]),
                  createVNode("div", { class: "d-flex justify-space-between align-center mb-1" }, [
                    createVNode("div", { class: "text-caption text-grey" }, "SKU: " + toDisplayString(__props.product.sku), 1),
                    createVNode("span", {
                      class: "font-weight-black text-success",
                      style: { "font-size": "18px" }
                    }, toDisplayString(parseFloat(__props.product.price).toLocaleString()) + " " + toDisplayString(unref(t)[__props.product.currency]), 1)
                  ]),
                  createVNode(VRow, {
                    "no-gutters": "",
                    class: "info-box pa-2 rounded-lg"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.product.features.filter((f) => (f.lang ?? __props.locale) === __props.locale), (feature, index) => {
                        return openBlock(), createBlock(VCol, {
                          key: index,
                          cols: "6",
                          class: ["text-center py-2", { "border-e": index % 2 === 0, "border-b": index < props.product.features.filter((f) => (f.lang ?? __props.locale) === __props.locale).length - 2 }]
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-overline text-grey-darken-1" }, toDisplayString(unref(t)[feature.key] ?? feature.key), 1),
                            createVNode("div", { class: "text-caption font-weight-bold" }, toDisplayString(feature.value), 1)
                          ]),
                          _: 2
                        }, 1032, ["class"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 2
              }, 1024),
              createVNode(VCardActions, { class: "pa-4 pt-0" }, {
                default: withCtx(() => [
                  __props.uiStyles.buy.title !== "disable" ? (openBlock(), createBlock(VBtn, {
                    key: 0,
                    color: __props.uiStyles.buy.color,
                    variant: __props.uiStyles.buy.variant,
                    class: "font-weight-bold",
                    rounded: __props.uiStyles.buy.rounded,
                    style: { "flex": "3" },
                    "prepend-icon": __props.uiStyles.buy.icon,
                    onClick: ($event) => showBuyModal.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.uiStyles.buy.title), 1)
                    ]),
                    _: 1
                  }, 8, ["color", "variant", "rounded", "prepend-icon", "onClick"])) : createCommentVNode("", true),
                  createVNode(VBtn, {
                    color: __props.uiStyles.details.color,
                    variant: __props.uiStyles.details.variant,
                    class: "font-weight-bold",
                    rounded: __props.uiStyles.details.rounded,
                    style: { "flex": "3" },
                    "prepend-icon": __props.uiStyles.details.icon,
                    to: detailsPath.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.uiStyles.details.title), 1)
                    ]),
                    _: 1
                  }, 8, ["color", "variant", "rounded", "prepend-icon", "to"])
                ]),
                _: 1
              }),
              createVNode(PurchaseModal, mergeProps({
                "add-to-card-title": unref(t)?.confirm_and_add_to_cart ?? "",
                modelValue: showBuyModal.value,
                "onUpdate:modelValue": ($event) => showBuyModal.value = $event,
                product: __props.product
              }, __props.uiStyles.buy.modal, {
                title: unref(t)?.confirm_purchase ?? "",
                "unit-price-title": unref(t)?.unit_price ?? "",
                "select-quantity-title": unref(t)?.select_quantity ?? "",
                "total-price-title": unref(t)?.total ?? "",
                onConfirm: onConfirmPurchase
              }), null, 16, ["add-to-card-title", "modelValue", "onUpdate:modelValue", "product", "title", "unit-price-title", "select-quantity-title", "total-price-title"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/Product.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Product = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-56d1a298"]]), { __name: "EditorElementsElementsProduct" });
function useRefs() {
  const refs = ref([]);
  function updateRef(e, i) {
    refs.value[i] = e;
  }
  return {
    refs,
    updateRef
  };
}
const makeVPaginationProps = propsFactory({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: (props) => props.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (val) => val % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: IconValue,
    default: "$first"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  lastIcon: {
    type: IconValue,
    default: "$last"
  },
  ariaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.root"
  },
  pageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.page"
  },
  currentPageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.currentPage"
  },
  firstAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.first"
  },
  previousAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.previous"
  },
  nextAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.next"
  },
  lastAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.last"
  },
  ellipsis: {
    type: String,
    default: "..."
  },
  showFirstLastPage: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VPagination");
const VPagination = genericComponent()({
  name: "VPagination",
  props: makeVPaginationProps(),
  emits: {
    "update:modelValue": (value) => true,
    first: (value) => true,
    prev: (value) => true,
    next: (value) => true,
    last: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, "modelValue");
    const {
      t,
      n
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      width
    } = useDisplay();
    const maxButtons = shallowRef(-1);
    provideDefaults(void 0, {
      scoped: true
    });
    const {
      resizeRef
    } = useResizeObserver();
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      if (props.totalVisible != null) return parseInt(props.totalVisible, 10);
      else if (maxButtons.value >= 0) return maxButtons.value;
      return getMax(width.value, 58);
    });
    function getMax(totalWidth, itemWidth) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2))
      ));
    }
    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];
      if (totalVisible.value <= 0) return [];
      else if (totalVisible.value === 1) return [page.value];
      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }
      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;
      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 2);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });
    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }
    const {
      refs,
      updateRef
    } = useRefs();
    provideDefaults({
      VPaginationBtn: {
        color: toRef(() => props.color),
        border: toRef(() => props.border),
        density: toRef(() => props.density),
        size: toRef(() => props.size),
        variant: toRef(() => props.variant),
        rounded: toRef(() => props.rounded),
        elevation: toRef(() => props.elevation)
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref2 = (e) => updateRef(e, index);
        if (typeof item === "string") {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref: ref2,
              ellipsis: true,
              icon: true,
              disabled: true
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref: ref2,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || Number(props.length) < 2,
              color: isActive ? props.activeColor : props.color,
              "aria-current": isActive,
              "aria-label": t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: (e) => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e) => setValue(e, start.value, "first"),
          disabled: prevDisabled,
          "aria-label": t(props.firstAriaLabel),
          "aria-disabled": prevDisabled
        } : void 0,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e) => setValue(e, page.value - 1, "prev"),
          disabled: prevDisabled,
          "aria-label": t(props.previousAriaLabel),
          "aria-disabled": prevDisabled
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e) => setValue(e, page.value + 1, "next"),
          disabled: nextDisabled,
          "aria-label": t(props.nextAriaLabel),
          "aria-disabled": nextDisabled
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e) => setValue(e, start.value + length.value - 1, "last"),
          disabled: nextDisabled,
          "aria-label": t(props.lastAriaLabel),
          "aria-disabled": nextDisabled
        } : void 0
      };
    });
    function updateFocus() {
      const currentIndex = page.value - start.value;
      refs.value[currentIndex]?.$el.focus();
    }
    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > Number(props.start)) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": normalizeClass(["v-pagination", themeClasses.value, props.class]),
      "style": normalizeStyle(props.style),
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createElementVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createElementVNode("li", {
        "key": "first",
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.first), null)]), createElementVNode("li", {
        "key": "prev",
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.prev), null)]), items.value.map((item, index) => createElementVNode("li", {
        "key": item.key,
        "class": normalizeClass(["v-pagination__item", {
          "v-pagination__item--is-active": item.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, item.props), {
        default: () => [item.page]
      })])), createElementVNode("li", {
        "key": "next",
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.next), null)]), props.showFirstLastPage && createElementVNode("li", {
        "key": "last",
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.last), null)])])]
    }));
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Products",
  __ssrInlineRender: true,
  props: {
    selectedCategory: {},
    productIds: {},
    locale: {},
    uiStyles: {}
  },
  setup(__props) {
    const props = __props;
    const goTo = useGoTo();
    const config = useRuntimeConfig();
    const productsSection = ref(null);
    const page = ref(1);
    watch(
      () => props.selectedCategory,
      (newCategory, oldCategory) => {
        page.value = 1;
      }
    );
    const scrollToProducts = () => {
      if (productsSection.value) {
        goTo(productsSection.value, {
          duration: 400,
          easing: "easeInOutCubic",
          offset: -100
        });
      }
    };
    const isChangingPage = ref(false);
    function onPageChange() {
      isChangingPage.value = true;
      scrollToProducts();
    }
    const { data: productsData, pending: productsPending } = useAsyncData(
      () => `products-${props.selectedCategory ?? "all"}-${props.productIds ?? "none"}-${page.value}`,
      () => {
        if (!props.selectedCategory && !props.productIds) {
          return Promise.resolve({ data: [], last_page: 1 });
        }
        return $fetch(`${config.public.baseUrl}/api/products/category/${props.selectedCategory ?? props.productIds}`, {
          query: {
            per_page: 5,
            page: page.value
          }
        });
      },
      {
        watch: [() => props.selectedCategory, () => props.productIds, page],
        lazy: true,
        server: true
      }
    );
    const showLoading = computed(() => productsPending.value || isChangingPage.value);
    watch(productsPending, (newPending) => {
      if (!newPending) {
        isChangingPage.value = false;
      }
    });
    const processedProducts = computed(() => {
      if (!productsData.value?.data) return [];
      const targetCurrency = props.locale === "fa" ? "IRR" : "USD";
      return productsData.value.data.map((product) => {
        const localizedLang = product.langs?.find((l) => l.lang === props.locale) || product.langs?.[0];
        const localizedPrice = product.currencies?.find((c) => c.currency === targetCurrency) || product.currencies?.[0];
        return {
          id: product.id,
          sku: product.sku,
          slug: localizedLang?.title ?? product.sku,
          label: "New",
          name: localizedLang?.title ?? "",
          price: localizedPrice?.price.toString() ?? "0",
          currency: localizedPrice?.currency ?? targetCurrency,
          primaryImg: `${config.public.baseUrl}/${product.image}`,
          secondaryImg: `${config.public.baseUrl}/${product.image2}`,
          features: product.details
        };
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({
        fluid: "",
        ref_key: "productsSection",
        ref: productsSection,
        style: { "position": "relative", "min-height": "400px" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VFadeTransition, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (showLoading.value) {
                    _push3(`<div class="page-loading" style="${ssrRenderStyle({ "position": "absolute", "left": "0", "top": "0", "width": "100%", "height": "100%", "background": "rgba(255,255,255,0.7)", "z-index": "2", "display": "flex", "align-items": "center", "justify-content": "center" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VProgressCircular, {
                      indeterminate: "",
                      color: "primary"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    showLoading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "page-loading",
                      style: { "position": "absolute", "left": "0", "top": "0", "width": "100%", "height": "100%", "background": "rgba(255,255,255,0.7)", "z-index": "2", "display": "flex", "align-items": "center", "justify-content": "center" }
                    }, [
                      createVNode(VProgressCircular, {
                        indeterminate: "",
                        color: "primary"
                      })
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(processedProducts.value, (product) => {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "12",
                      lg: !__props.productIds ? 4 : 3,
                      xl: !__props.productIds ? 4 : 3,
                      key: product.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(Product, {
                            "product-id": product.id,
                            slug: product.slug,
                            locale: __props.locale,
                            product,
                            "ui-styles": __props.uiStyles
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(Product, {
                              "product-id": product.id,
                              slug: product.slug,
                              locale: __props.locale,
                              product,
                              "ui-styles": __props.uiStyles
                            }, null, 8, ["product-id", "slug", "locale", "product", "ui-styles"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(processedProducts.value, (product) => {
                      return openBlock(), createBlock(VCol, {
                        cols: "12",
                        md: "12",
                        lg: !__props.productIds ? 4 : 3,
                        xl: !__props.productIds ? 4 : 3,
                        key: product.id
                      }, {
                        default: withCtx(() => [
                          createVNode(Product, {
                            "product-id": product.id,
                            slug: product.slug,
                            locale: __props.locale,
                            product,
                            "ui-styles": __props.uiStyles
                          }, null, 8, ["product-id", "slug", "locale", "product", "ui-styles"])
                        ]),
                        _: 2
                      }, 1032, ["lg", "xl"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(productsData) && unref(productsData).last_page > 1) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VPagination, {
                            style: { "direction": "ltr !important" },
                            modelValue: page.value,
                            "onUpdate:modelValue": [($event) => page.value = $event, onPageChange],
                            length: unref(productsData).last_page
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VPagination, {
                              style: { "direction": "ltr !important" },
                              modelValue: page.value,
                              "onUpdate:modelValue": [($event) => page.value = $event, onPageChange],
                              length: unref(productsData).last_page
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "length"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { cols: "12" }, {
                        default: withCtx(() => [
                          createVNode(VPagination, {
                            style: { "direction": "ltr !important" },
                            modelValue: page.value,
                            "onUpdate:modelValue": [($event) => page.value = $event, onPageChange],
                            length: unref(productsData).last_page
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "length"])
                        ]),
                        _: 1
                      })
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
              createVNode(VFadeTransition, null, {
                default: withCtx(() => [
                  showLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "page-loading",
                    style: { "position": "absolute", "left": "0", "top": "0", "width": "100%", "height": "100%", "background": "rgba(255,255,255,0.7)", "z-index": "2", "display": "flex", "align-items": "center", "justify-content": "center" }
                  }, [
                    createVNode(VProgressCircular, {
                      indeterminate: "",
                      color: "primary"
                    })
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(processedProducts.value, (product) => {
                    return openBlock(), createBlock(VCol, {
                      cols: "12",
                      md: "12",
                      lg: !__props.productIds ? 4 : 3,
                      xl: !__props.productIds ? 4 : 3,
                      key: product.id
                    }, {
                      default: withCtx(() => [
                        createVNode(Product, {
                          "product-id": product.id,
                          slug: product.slug,
                          locale: __props.locale,
                          product,
                          "ui-styles": __props.uiStyles
                        }, null, 8, ["product-id", "slug", "locale", "product", "ui-styles"])
                      ]),
                      _: 2
                    }, 1032, ["lg", "xl"]);
                  }), 128))
                ]),
                _: 1
              }),
              unref(productsData) && unref(productsData).last_page > 1 ? (openBlock(), createBlock(VRow, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VPagination, {
                        style: { "direction": "ltr !important" },
                        modelValue: page.value,
                        "onUpdate:modelValue": [($event) => page.value = $event, onPageChange],
                        length: unref(productsData).last_page
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "length"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/Products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Products = Object.assign(_sfc_main, { __name: "EditorElementsElementsProducts" });
export {
  Products as P
};
//# sourceMappingURL=Products-D6ANeln0.js.map
