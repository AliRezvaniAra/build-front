import { defineComponent, ref, watch, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { l as useShopLocal, u as useAsyncData, H as Header1, a as Header1Mobile, V as VContainer, n as VBtn, o as VFadeTransition, k as VIcon, p as VRow, q as VCol, r as VCard, s as VImg, t as VSpacer, v as VDivider, R as Render } from "./asyncData-BoxtDLvH.js";
import { useRoute } from "vue-router";
import { r as routeParamString } from "./routeParams-HtYLAcRh.js";
import { u as useTrans } from "./useTrans-CtYIwtZX.js";
import { f as useDisplay, b as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import "./resizeObserver-Bors9hmC.js";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basket",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useTrans();
    const route = useRoute();
    const footer = ref([]);
    const related_pages = ref([]);
    const { mdAndUp } = useDisplay();
    const config = useRuntimeConfig();
    const locale = ref(routeParamString(route.params.lang));
    const {
      cart,
      setLineQuantity,
      removeFromCart,
      clearCart,
      cartItemCount,
      cartSubtotal
    } = useShopLocal();
    const { data: languages } = useAsyncData(
      `languages`,
      async () => {
        const res = await $fetch(`/api/languages`, {
          baseURL: config.public.baseUrl
        });
        related_pages.value = res.map((l) => {
          return { lang: l.code, title: "basket" };
        });
        return res;
      }
    );
    watch(languages.value, () => {
      if (!!languages.value)
        related_pages.value = languages.value.map((l) => {
          return { lang: l.code, title: "basket" };
        });
    }, { immediate: true, deep: true });
    const { data: header } = useAsyncData(
      "header-data",
      async () => {
        const res = await $fetch(`/api/pages/rows/0-header`, {
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
    const { data: footerData } = useAsyncData(
      () => `page-footer-${locale.value}-${routeParamString(route.params.lang)}`,
      async () => {
        const result = await $fetch(`/api/pages/rows/0-footer-${routeParamString(route.params.lang)}`, {
          baseURL: config.public.baseUrl
        });
        footer.value = result?.data ?? [];
        return result;
      },
      "$6VNn8QgTGO"
      /* nuxt-injected */
    );
    if (footerData.value?.data) {
      footer.value = footerData.value.data;
    }
    function formatMoney(n) {
      return n.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
        class: "shop-page py-10",
        style: { direction: locale.value === "fa" || locale.value === "ar" ? "rtl" : "ltr" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex align-end justify-space-between mb-8" data-v-8b55ec10${_scopeId}><div data-v-8b55ec10${_scopeId}><h1 class="text-h3 font-weight-bold mb-1" data-v-8b55ec10${_scopeId}>${ssrInterpolate(unref(t).basket?.title)}</h1><p class="text-body-1 text-medium-emphasis" data-v-8b55ec10${_scopeId}>${ssrInterpolate(unref(t).basket?.subtitle)}</p></div>`);
            if (unref(cart).length) {
              _push2(ssrRenderComponent(VBtn, {
                color: "error",
                variant: "tonal",
                "prepend-icon": "mdi-delete-sweep-outline",
                onClick: unref(clearCart)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t).basket?.clear_all)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t).basket?.clear_all), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(VFadeTransition, { "hide-on-leave": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!unref(cart).length) {
                    _push3(`<div class="text-center py-16 border rounded-xl bg-grey-lighten-5" data-v-8b55ec10${_scopeId2}>`);
                    _push3(ssrRenderComponent(VIcon, {
                      size: "80",
                      color: "grey-lighten-1",
                      class: "mb-4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-cart-outline`);
                        } else {
                          return [
                            createTextVNode("mdi-cart-outline")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<h2 class="text-h5 font-weight-medium mb-2" data-v-8b55ec10${_scopeId2}>${ssrInterpolate(unref(t).basket?.empty_title)}</h2><p class="text-body-1 text-medium-emphasis mb-6" data-v-8b55ec10${_scopeId2}>${ssrInterpolate(unref(t).basket?.empty_subtitle)}</p>`);
                    _push3(ssrRenderComponent(VBtn, {
                      to: `/${locale.value}`,
                      color: "primary",
                      size: "large",
                      rounded: "pill",
                      elevation: "2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(t).basket?.start_shopping)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(t).basket?.start_shopping), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(ssrRenderComponent(VRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCol, {
                            cols: "12",
                            lg: "8"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(cart), (line) => {
                                  _push5(ssrRenderComponent(VCard, {
                                    key: `${line.id}-${line.sku}`,
                                    class: "mb-4 product-card",
                                    elevation: "1",
                                    rounded: "xl"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="d-flex flex-column flex-sm-row pa-5 gap-6" data-v-8b55ec10${_scopeId5}>`);
                                        _push6(ssrRenderComponent(VImg, {
                                          src: line.image,
                                          width: "140",
                                          height: "140",
                                          cover: "",
                                          rounded: "lg",
                                          class: "bg-grey-lighten-4 flex-grow-0"
                                        }, null, _parent6, _scopeId5));
                                        _push6(`<div class="flex-grow-1 d-flex flex-column px-3" data-v-8b55ec10${_scopeId5}><div class="d-flex justify-space-between align-start" data-v-8b55ec10${_scopeId5}><div data-v-8b55ec10${_scopeId5}><div class="text-h6 font-weight-bold" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(line.title)}</div><div class="text-caption text-medium-emphasis uppercase tracking-widest" data-v-8b55ec10${_scopeId5}>SKU: ${ssrInterpolate(line.sku)}</div></div><div class="text-h6 font-weight-black text-primary" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(line.currency)} ${ssrInterpolate((parseFloat(line.price) * line.quantity).toLocaleString())}</div></div>`);
                                        _push6(ssrRenderComponent(VSpacer, { class: "my-4" }, null, _parent6, _scopeId5));
                                        _push6(`<div class="d-flex align-center justify-space-between mt-auto" data-v-8b55ec10${_scopeId5}><div class="quantity-picker d-flex align-center border rounded-pill" data-v-8b55ec10${_scopeId5}>`);
                                        _push6(ssrRenderComponent(VBtn, {
                                          icon: "mdi-minus",
                                          variant: "text",
                                          density: "comfortable",
                                          size: "small",
                                          onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity - 1)
                                        }, null, _parent6, _scopeId5));
                                        _push6(`<span class="px-4 font-weight-bold" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(line.quantity)}</span>`);
                                        _push6(ssrRenderComponent(VBtn, {
                                          icon: "mdi-plus",
                                          variant: "text",
                                          density: "comfortable",
                                          size: "small",
                                          onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity + 1)
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div><div class="d-flex gap-2" data-v-8b55ec10${_scopeId5}>`);
                                        _push6(ssrRenderComponent(VBtn, {
                                          color: "error",
                                          variant: "text",
                                          icon: "mdi-trash-can-outline",
                                          onClick: ($event) => unref(removeFromCart)(line.id, line.sku)
                                        }, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VBtn, {
                                          to: `/${locale.value}/products/${line.slug}`,
                                          variant: "text",
                                          icon: "mdi-eye-outline",
                                          color: "medium-emphasis"
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div></div></div></div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "d-flex flex-column flex-sm-row pa-5 gap-6" }, [
                                            createVNode(VImg, {
                                              src: line.image,
                                              width: "140",
                                              height: "140",
                                              cover: "",
                                              rounded: "lg",
                                              class: "bg-grey-lighten-4 flex-grow-0"
                                            }, null, 8, ["src"]),
                                            createVNode("div", { class: "flex-grow-1 d-flex flex-column px-3" }, [
                                              createVNode("div", { class: "d-flex justify-space-between align-start" }, [
                                                createVNode("div", null, [
                                                  createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(line.title), 1),
                                                  createVNode("div", { class: "text-caption text-medium-emphasis uppercase tracking-widest" }, "SKU: " + toDisplayString(line.sku), 1)
                                                ]),
                                                createVNode("div", { class: "text-h6 font-weight-black text-primary" }, toDisplayString(line.currency) + " " + toDisplayString((parseFloat(line.price) * line.quantity).toLocaleString()), 1)
                                              ]),
                                              createVNode(VSpacer, { class: "my-4" }),
                                              createVNode("div", { class: "d-flex align-center justify-space-between mt-auto" }, [
                                                createVNode("div", { class: "quantity-picker d-flex align-center border rounded-pill" }, [
                                                  createVNode(VBtn, {
                                                    icon: "mdi-minus",
                                                    variant: "text",
                                                    density: "comfortable",
                                                    size: "small",
                                                    onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity - 1)
                                                  }, null, 8, ["onClick"]),
                                                  createVNode("span", { class: "px-4 font-weight-bold" }, toDisplayString(line.quantity), 1),
                                                  createVNode(VBtn, {
                                                    icon: "mdi-plus",
                                                    variant: "text",
                                                    density: "comfortable",
                                                    size: "small",
                                                    onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity + 1)
                                                  }, null, 8, ["onClick"])
                                                ]),
                                                createVNode("div", { class: "d-flex gap-2" }, [
                                                  createVNode(VBtn, {
                                                    color: "error",
                                                    variant: "text",
                                                    icon: "mdi-trash-can-outline",
                                                    onClick: ($event) => unref(removeFromCart)(line.id, line.sku)
                                                  }, null, 8, ["onClick"]),
                                                  createVNode(VBtn, {
                                                    to: `/${locale.value}/products/${line.slug}`,
                                                    variant: "text",
                                                    icon: "mdi-eye-outline",
                                                    color: "medium-emphasis"
                                                  }, null, 8, ["to"])
                                                ])
                                              ])
                                            ])
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(cart), (line) => {
                                    return openBlock(), createBlock(VCard, {
                                      key: `${line.id}-${line.sku}`,
                                      class: "mb-4 product-card",
                                      elevation: "1",
                                      rounded: "xl"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex flex-column flex-sm-row pa-5 gap-6" }, [
                                          createVNode(VImg, {
                                            src: line.image,
                                            width: "140",
                                            height: "140",
                                            cover: "",
                                            rounded: "lg",
                                            class: "bg-grey-lighten-4 flex-grow-0"
                                          }, null, 8, ["src"]),
                                          createVNode("div", { class: "flex-grow-1 d-flex flex-column px-3" }, [
                                            createVNode("div", { class: "d-flex justify-space-between align-start" }, [
                                              createVNode("div", null, [
                                                createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(line.title), 1),
                                                createVNode("div", { class: "text-caption text-medium-emphasis uppercase tracking-widest" }, "SKU: " + toDisplayString(line.sku), 1)
                                              ]),
                                              createVNode("div", { class: "text-h6 font-weight-black text-primary" }, toDisplayString(line.currency) + " " + toDisplayString((parseFloat(line.price) * line.quantity).toLocaleString()), 1)
                                            ]),
                                            createVNode(VSpacer, { class: "my-4" }),
                                            createVNode("div", { class: "d-flex align-center justify-space-between mt-auto" }, [
                                              createVNode("div", { class: "quantity-picker d-flex align-center border rounded-pill" }, [
                                                createVNode(VBtn, {
                                                  icon: "mdi-minus",
                                                  variant: "text",
                                                  density: "comfortable",
                                                  size: "small",
                                                  onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity - 1)
                                                }, null, 8, ["onClick"]),
                                                createVNode("span", { class: "px-4 font-weight-bold" }, toDisplayString(line.quantity), 1),
                                                createVNode(VBtn, {
                                                  icon: "mdi-plus",
                                                  variant: "text",
                                                  density: "comfortable",
                                                  size: "small",
                                                  onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity + 1)
                                                }, null, 8, ["onClick"])
                                              ]),
                                              createVNode("div", { class: "d-flex gap-2" }, [
                                                createVNode(VBtn, {
                                                  color: "error",
                                                  variant: "text",
                                                  icon: "mdi-trash-can-outline",
                                                  onClick: ($event) => unref(removeFromCart)(line.id, line.sku)
                                                }, null, 8, ["onClick"]),
                                                createVNode(VBtn, {
                                                  to: `/${locale.value}/products/${line.slug}`,
                                                  variant: "text",
                                                  icon: "mdi-eye-outline",
                                                  color: "medium-emphasis"
                                                }, null, 8, ["to"])
                                              ])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCol, {
                            cols: "12",
                            lg: "4"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCard, {
                                  class: "summary-card pa-6 sticky-top",
                                  rounded: "xl",
                                  elevation: "4",
                                  border: ""
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<h2 class="text-h5 font-weight-bold mb-6" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(unref(t).basket?.summary)}</h2><div class="d-flex justify-space-between mb-3 text-body-1" data-v-8b55ec10${_scopeId5}><span class="text-medium-emphasis" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(unref(t).basket?.items)} (${ssrInterpolate(unref(cartItemCount))})</span><span data-v-8b55ec10${_scopeId5}>${ssrInterpolate(formatMoney(unref(cartSubtotal)))}</span></div><div class="d-flex justify-space-between mb-6 text-body-1" data-v-8b55ec10${_scopeId5}><span class="text-medium-emphasis" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(unref(t).basket?.shipping)}</span><span class="text-success font-weight-medium" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(unref(t).basket?.free)}</span></div>`);
                                      _push6(ssrRenderComponent(VDivider, { class: "mb-6" }, null, _parent6, _scopeId5));
                                      _push6(`<div class="d-flex justify-space-between align-end mb-8" data-v-8b55ec10${_scopeId5}><span class="text-h6" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(unref(t).basket?.total)}</span><div class="text-right" data-v-8b55ec10${_scopeId5}><div class="text-h4 font-weight-black text-primary" data-v-8b55ec10${_scopeId5}>${ssrInterpolate(formatMoney(unref(cartSubtotal)))}</div><div class="text-caption text-medium-emphasis italic" data-v-8b55ec10${_scopeId5}>VAT included where applicable</div></div></div>`);
                                      _push6(ssrRenderComponent(VBtn, {
                                        block: "",
                                        color: "primary",
                                        size: "x-large",
                                        rounded: "pill",
                                        class: "font-weight-bold",
                                        elevation: "3"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(unref(t).basket?.checkout)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(unref(t).basket?.checkout), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        variant: "text",
                                        block: "",
                                        class: "mt-4 text-none text-medium-emphasis",
                                        to: `/${locale.value}`
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VIcon, { start: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`mdi-arrow-left`);
                                                } else {
                                                  return [
                                                    createTextVNode("mdi-arrow-left")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(` ${ssrInterpolate(unref(t).basket?.continue)}`);
                                          } else {
                                            return [
                                              createVNode(VIcon, { start: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-arrow-left")
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" " + toDisplayString(unref(t).basket?.continue), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode("h2", { class: "text-h5 font-weight-bold mb-6" }, toDisplayString(unref(t).basket?.summary), 1),
                                        createVNode("div", { class: "d-flex justify-space-between mb-3 text-body-1" }, [
                                          createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.items) + " (" + toDisplayString(unref(cartItemCount)) + ")", 1),
                                          createVNode("span", null, toDisplayString(formatMoney(unref(cartSubtotal))), 1)
                                        ]),
                                        createVNode("div", { class: "d-flex justify-space-between mb-6 text-body-1" }, [
                                          createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.shipping), 1),
                                          createVNode("span", { class: "text-success font-weight-medium" }, toDisplayString(unref(t).basket?.free), 1)
                                        ]),
                                        createVNode(VDivider, { class: "mb-6" }),
                                        createVNode("div", { class: "d-flex justify-space-between align-end mb-8" }, [
                                          createVNode("span", { class: "text-h6" }, toDisplayString(unref(t).basket?.total), 1),
                                          createVNode("div", { class: "text-right" }, [
                                            createVNode("div", { class: "text-h4 font-weight-black text-primary" }, toDisplayString(formatMoney(unref(cartSubtotal))), 1),
                                            createVNode("div", { class: "text-caption text-medium-emphasis italic" }, "VAT included where applicable")
                                          ])
                                        ]),
                                        createVNode(VBtn, {
                                          block: "",
                                          color: "primary",
                                          size: "x-large",
                                          rounded: "pill",
                                          class: "font-weight-bold",
                                          elevation: "3"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(t).basket?.checkout), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VBtn, {
                                          variant: "text",
                                          block: "",
                                          class: "mt-4 text-none text-medium-emphasis",
                                          to: `/${locale.value}`
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VIcon, { start: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-arrow-left")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" " + toDisplayString(unref(t).basket?.continue), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["to"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCard, {
                                    class: "summary-card pa-6 sticky-top",
                                    rounded: "xl",
                                    elevation: "4",
                                    border: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h2", { class: "text-h5 font-weight-bold mb-6" }, toDisplayString(unref(t).basket?.summary), 1),
                                      createVNode("div", { class: "d-flex justify-space-between mb-3 text-body-1" }, [
                                        createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.items) + " (" + toDisplayString(unref(cartItemCount)) + ")", 1),
                                        createVNode("span", null, toDisplayString(formatMoney(unref(cartSubtotal))), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex justify-space-between mb-6 text-body-1" }, [
                                        createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.shipping), 1),
                                        createVNode("span", { class: "text-success font-weight-medium" }, toDisplayString(unref(t).basket?.free), 1)
                                      ]),
                                      createVNode(VDivider, { class: "mb-6" }),
                                      createVNode("div", { class: "d-flex justify-space-between align-end mb-8" }, [
                                        createVNode("span", { class: "text-h6" }, toDisplayString(unref(t).basket?.total), 1),
                                        createVNode("div", { class: "text-right" }, [
                                          createVNode("div", { class: "text-h4 font-weight-black text-primary" }, toDisplayString(formatMoney(unref(cartSubtotal))), 1),
                                          createVNode("div", { class: "text-caption text-medium-emphasis italic" }, "VAT included where applicable")
                                        ])
                                      ]),
                                      createVNode(VBtn, {
                                        block: "",
                                        color: "primary",
                                        size: "x-large",
                                        rounded: "pill",
                                        class: "font-weight-bold",
                                        elevation: "3"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(t).basket?.checkout), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        variant: "text",
                                        block: "",
                                        class: "mt-4 text-none text-medium-emphasis",
                                        to: `/${locale.value}`
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, { start: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-arrow-left")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(unref(t).basket?.continue), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
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
                            createVNode(VCol, {
                              cols: "12",
                              lg: "8"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(cart), (line) => {
                                  return openBlock(), createBlock(VCard, {
                                    key: `${line.id}-${line.sku}`,
                                    class: "mb-4 product-card",
                                    elevation: "1",
                                    rounded: "xl"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex flex-column flex-sm-row pa-5 gap-6" }, [
                                        createVNode(VImg, {
                                          src: line.image,
                                          width: "140",
                                          height: "140",
                                          cover: "",
                                          rounded: "lg",
                                          class: "bg-grey-lighten-4 flex-grow-0"
                                        }, null, 8, ["src"]),
                                        createVNode("div", { class: "flex-grow-1 d-flex flex-column px-3" }, [
                                          createVNode("div", { class: "d-flex justify-space-between align-start" }, [
                                            createVNode("div", null, [
                                              createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(line.title), 1),
                                              createVNode("div", { class: "text-caption text-medium-emphasis uppercase tracking-widest" }, "SKU: " + toDisplayString(line.sku), 1)
                                            ]),
                                            createVNode("div", { class: "text-h6 font-weight-black text-primary" }, toDisplayString(line.currency) + " " + toDisplayString((parseFloat(line.price) * line.quantity).toLocaleString()), 1)
                                          ]),
                                          createVNode(VSpacer, { class: "my-4" }),
                                          createVNode("div", { class: "d-flex align-center justify-space-between mt-auto" }, [
                                            createVNode("div", { class: "quantity-picker d-flex align-center border rounded-pill" }, [
                                              createVNode(VBtn, {
                                                icon: "mdi-minus",
                                                variant: "text",
                                                density: "comfortable",
                                                size: "small",
                                                onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity - 1)
                                              }, null, 8, ["onClick"]),
                                              createVNode("span", { class: "px-4 font-weight-bold" }, toDisplayString(line.quantity), 1),
                                              createVNode(VBtn, {
                                                icon: "mdi-plus",
                                                variant: "text",
                                                density: "comfortable",
                                                size: "small",
                                                onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity + 1)
                                              }, null, 8, ["onClick"])
                                            ]),
                                            createVNode("div", { class: "d-flex gap-2" }, [
                                              createVNode(VBtn, {
                                                color: "error",
                                                variant: "text",
                                                icon: "mdi-trash-can-outline",
                                                onClick: ($event) => unref(removeFromCart)(line.id, line.sku)
                                              }, null, 8, ["onClick"]),
                                              createVNode(VBtn, {
                                                to: `/${locale.value}/products/${line.slug}`,
                                                variant: "text",
                                                icon: "mdi-eye-outline",
                                                color: "medium-emphasis"
                                              }, null, 8, ["to"])
                                            ])
                                          ])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCol, {
                              cols: "12",
                              lg: "4"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  class: "summary-card pa-6 sticky-top",
                                  rounded: "xl",
                                  elevation: "4",
                                  border: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h2", { class: "text-h5 font-weight-bold mb-6" }, toDisplayString(unref(t).basket?.summary), 1),
                                    createVNode("div", { class: "d-flex justify-space-between mb-3 text-body-1" }, [
                                      createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.items) + " (" + toDisplayString(unref(cartItemCount)) + ")", 1),
                                      createVNode("span", null, toDisplayString(formatMoney(unref(cartSubtotal))), 1)
                                    ]),
                                    createVNode("div", { class: "d-flex justify-space-between mb-6 text-body-1" }, [
                                      createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.shipping), 1),
                                      createVNode("span", { class: "text-success font-weight-medium" }, toDisplayString(unref(t).basket?.free), 1)
                                    ]),
                                    createVNode(VDivider, { class: "mb-6" }),
                                    createVNode("div", { class: "d-flex justify-space-between align-end mb-8" }, [
                                      createVNode("span", { class: "text-h6" }, toDisplayString(unref(t).basket?.total), 1),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode("div", { class: "text-h4 font-weight-black text-primary" }, toDisplayString(formatMoney(unref(cartSubtotal))), 1),
                                        createVNode("div", { class: "text-caption text-medium-emphasis italic" }, "VAT included where applicable")
                                      ])
                                    ]),
                                    createVNode(VBtn, {
                                      block: "",
                                      color: "primary",
                                      size: "x-large",
                                      rounded: "pill",
                                      class: "font-weight-bold",
                                      elevation: "3"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(t).basket?.checkout), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, {
                                      variant: "text",
                                      block: "",
                                      class: "mt-4 text-none text-medium-emphasis",
                                      to: `/${locale.value}`
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, { start: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-arrow-left")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" " + toDisplayString(unref(t).basket?.continue), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
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
                  }
                } else {
                  return [
                    !unref(cart).length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-16 border rounded-xl bg-grey-lighten-5"
                    }, [
                      createVNode(VIcon, {
                        size: "80",
                        color: "grey-lighten-1",
                        class: "mb-4"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-cart-outline")
                        ]),
                        _: 1
                      }),
                      createVNode("h2", { class: "text-h5 font-weight-medium mb-2" }, toDisplayString(unref(t).basket?.empty_title), 1),
                      createVNode("p", { class: "text-body-1 text-medium-emphasis mb-6" }, toDisplayString(unref(t).basket?.empty_subtitle), 1),
                      createVNode(VBtn, {
                        to: `/${locale.value}`,
                        color: "primary",
                        size: "large",
                        rounded: "pill",
                        elevation: "2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t).basket?.start_shopping), 1)
                        ]),
                        _: 1
                      }, 8, ["to"])
                    ])) : (openBlock(), createBlock(VRow, { key: 1 }, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          lg: "8"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(cart), (line) => {
                              return openBlock(), createBlock(VCard, {
                                key: `${line.id}-${line.sku}`,
                                class: "mb-4 product-card",
                                elevation: "1",
                                rounded: "xl"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex flex-column flex-sm-row pa-5 gap-6" }, [
                                    createVNode(VImg, {
                                      src: line.image,
                                      width: "140",
                                      height: "140",
                                      cover: "",
                                      rounded: "lg",
                                      class: "bg-grey-lighten-4 flex-grow-0"
                                    }, null, 8, ["src"]),
                                    createVNode("div", { class: "flex-grow-1 d-flex flex-column px-3" }, [
                                      createVNode("div", { class: "d-flex justify-space-between align-start" }, [
                                        createVNode("div", null, [
                                          createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(line.title), 1),
                                          createVNode("div", { class: "text-caption text-medium-emphasis uppercase tracking-widest" }, "SKU: " + toDisplayString(line.sku), 1)
                                        ]),
                                        createVNode("div", { class: "text-h6 font-weight-black text-primary" }, toDisplayString(line.currency) + " " + toDisplayString((parseFloat(line.price) * line.quantity).toLocaleString()), 1)
                                      ]),
                                      createVNode(VSpacer, { class: "my-4" }),
                                      createVNode("div", { class: "d-flex align-center justify-space-between mt-auto" }, [
                                        createVNode("div", { class: "quantity-picker d-flex align-center border rounded-pill" }, [
                                          createVNode(VBtn, {
                                            icon: "mdi-minus",
                                            variant: "text",
                                            density: "comfortable",
                                            size: "small",
                                            onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity - 1)
                                          }, null, 8, ["onClick"]),
                                          createVNode("span", { class: "px-4 font-weight-bold" }, toDisplayString(line.quantity), 1),
                                          createVNode(VBtn, {
                                            icon: "mdi-plus",
                                            variant: "text",
                                            density: "comfortable",
                                            size: "small",
                                            onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity + 1)
                                          }, null, 8, ["onClick"])
                                        ]),
                                        createVNode("div", { class: "d-flex gap-2" }, [
                                          createVNode(VBtn, {
                                            color: "error",
                                            variant: "text",
                                            icon: "mdi-trash-can-outline",
                                            onClick: ($event) => unref(removeFromCart)(line.id, line.sku)
                                          }, null, 8, ["onClick"]),
                                          createVNode(VBtn, {
                                            to: `/${locale.value}/products/${line.slug}`,
                                            variant: "text",
                                            icon: "mdi-eye-outline",
                                            color: "medium-emphasis"
                                          }, null, 8, ["to"])
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(VCol, {
                          cols: "12",
                          lg: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              class: "summary-card pa-6 sticky-top",
                              rounded: "xl",
                              elevation: "4",
                              border: ""
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "text-h5 font-weight-bold mb-6" }, toDisplayString(unref(t).basket?.summary), 1),
                                createVNode("div", { class: "d-flex justify-space-between mb-3 text-body-1" }, [
                                  createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.items) + " (" + toDisplayString(unref(cartItemCount)) + ")", 1),
                                  createVNode("span", null, toDisplayString(formatMoney(unref(cartSubtotal))), 1)
                                ]),
                                createVNode("div", { class: "d-flex justify-space-between mb-6 text-body-1" }, [
                                  createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.shipping), 1),
                                  createVNode("span", { class: "text-success font-weight-medium" }, toDisplayString(unref(t).basket?.free), 1)
                                ]),
                                createVNode(VDivider, { class: "mb-6" }),
                                createVNode("div", { class: "d-flex justify-space-between align-end mb-8" }, [
                                  createVNode("span", { class: "text-h6" }, toDisplayString(unref(t).basket?.total), 1),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("div", { class: "text-h4 font-weight-black text-primary" }, toDisplayString(formatMoney(unref(cartSubtotal))), 1),
                                    createVNode("div", { class: "text-caption text-medium-emphasis italic" }, "VAT included where applicable")
                                  ])
                                ]),
                                createVNode(VBtn, {
                                  block: "",
                                  color: "primary",
                                  size: "x-large",
                                  rounded: "pill",
                                  class: "font-weight-bold",
                                  elevation: "3"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(t).basket?.checkout), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  variant: "text",
                                  block: "",
                                  class: "mt-4 text-none text-medium-emphasis",
                                  to: `/${locale.value}`
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { start: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-arrow-left")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" " + toDisplayString(unref(t).basket?.continue), 1)
                                  ]),
                                  _: 1
                                }, 8, ["to"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1024))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "d-flex align-end justify-space-between mb-8" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-h3 font-weight-bold mb-1" }, toDisplayString(unref(t).basket?.title), 1),
                  createVNode("p", { class: "text-body-1 text-medium-emphasis" }, toDisplayString(unref(t).basket?.subtitle), 1)
                ]),
                unref(cart).length ? (openBlock(), createBlock(VBtn, {
                  key: 0,
                  color: "error",
                  variant: "tonal",
                  "prepend-icon": "mdi-delete-sweep-outline",
                  onClick: unref(clearCart)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t).basket?.clear_all), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])) : createCommentVNode("", true)
              ]),
              createVNode(VFadeTransition, { "hide-on-leave": "" }, {
                default: withCtx(() => [
                  !unref(cart).length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-16 border rounded-xl bg-grey-lighten-5"
                  }, [
                    createVNode(VIcon, {
                      size: "80",
                      color: "grey-lighten-1",
                      class: "mb-4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-cart-outline")
                      ]),
                      _: 1
                    }),
                    createVNode("h2", { class: "text-h5 font-weight-medium mb-2" }, toDisplayString(unref(t).basket?.empty_title), 1),
                    createVNode("p", { class: "text-body-1 text-medium-emphasis mb-6" }, toDisplayString(unref(t).basket?.empty_subtitle), 1),
                    createVNode(VBtn, {
                      to: `/${locale.value}`,
                      color: "primary",
                      size: "large",
                      rounded: "pill",
                      elevation: "2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t).basket?.start_shopping), 1)
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ])) : (openBlock(), createBlock(VRow, { key: 1 }, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        lg: "8"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(cart), (line) => {
                            return openBlock(), createBlock(VCard, {
                              key: `${line.id}-${line.sku}`,
                              class: "mb-4 product-card",
                              elevation: "1",
                              rounded: "xl"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex flex-column flex-sm-row pa-5 gap-6" }, [
                                  createVNode(VImg, {
                                    src: line.image,
                                    width: "140",
                                    height: "140",
                                    cover: "",
                                    rounded: "lg",
                                    class: "bg-grey-lighten-4 flex-grow-0"
                                  }, null, 8, ["src"]),
                                  createVNode("div", { class: "flex-grow-1 d-flex flex-column px-3" }, [
                                    createVNode("div", { class: "d-flex justify-space-between align-start" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(line.title), 1),
                                        createVNode("div", { class: "text-caption text-medium-emphasis uppercase tracking-widest" }, "SKU: " + toDisplayString(line.sku), 1)
                                      ]),
                                      createVNode("div", { class: "text-h6 font-weight-black text-primary" }, toDisplayString(line.currency) + " " + toDisplayString((parseFloat(line.price) * line.quantity).toLocaleString()), 1)
                                    ]),
                                    createVNode(VSpacer, { class: "my-4" }),
                                    createVNode("div", { class: "d-flex align-center justify-space-between mt-auto" }, [
                                      createVNode("div", { class: "quantity-picker d-flex align-center border rounded-pill" }, [
                                        createVNode(VBtn, {
                                          icon: "mdi-minus",
                                          variant: "text",
                                          density: "comfortable",
                                          size: "small",
                                          onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity - 1)
                                        }, null, 8, ["onClick"]),
                                        createVNode("span", { class: "px-4 font-weight-bold" }, toDisplayString(line.quantity), 1),
                                        createVNode(VBtn, {
                                          icon: "mdi-plus",
                                          variant: "text",
                                          density: "comfortable",
                                          size: "small",
                                          onClick: ($event) => unref(setLineQuantity)(line.id, line.sku, line.quantity + 1)
                                        }, null, 8, ["onClick"])
                                      ]),
                                      createVNode("div", { class: "d-flex gap-2" }, [
                                        createVNode(VBtn, {
                                          color: "error",
                                          variant: "text",
                                          icon: "mdi-trash-can-outline",
                                          onClick: ($event) => unref(removeFromCart)(line.id, line.sku)
                                        }, null, 8, ["onClick"]),
                                        createVNode(VBtn, {
                                          to: `/${locale.value}/products/${line.slug}`,
                                          variant: "text",
                                          icon: "mdi-eye-outline",
                                          color: "medium-emphasis"
                                        }, null, 8, ["to"])
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(VCol, {
                        cols: "12",
                        lg: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            class: "summary-card pa-6 sticky-top",
                            rounded: "xl",
                            elevation: "4",
                            border: ""
                          }, {
                            default: withCtx(() => [
                              createVNode("h2", { class: "text-h5 font-weight-bold mb-6" }, toDisplayString(unref(t).basket?.summary), 1),
                              createVNode("div", { class: "d-flex justify-space-between mb-3 text-body-1" }, [
                                createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.items) + " (" + toDisplayString(unref(cartItemCount)) + ")", 1),
                                createVNode("span", null, toDisplayString(formatMoney(unref(cartSubtotal))), 1)
                              ]),
                              createVNode("div", { class: "d-flex justify-space-between mb-6 text-body-1" }, [
                                createVNode("span", { class: "text-medium-emphasis" }, toDisplayString(unref(t).basket?.shipping), 1),
                                createVNode("span", { class: "text-success font-weight-medium" }, toDisplayString(unref(t).basket?.free), 1)
                              ]),
                              createVNode(VDivider, { class: "mb-6" }),
                              createVNode("div", { class: "d-flex justify-space-between align-end mb-8" }, [
                                createVNode("span", { class: "text-h6" }, toDisplayString(unref(t).basket?.total), 1),
                                createVNode("div", { class: "text-right" }, [
                                  createVNode("div", { class: "text-h4 font-weight-black text-primary" }, toDisplayString(formatMoney(unref(cartSubtotal))), 1),
                                  createVNode("div", { class: "text-caption text-medium-emphasis italic" }, "VAT included where applicable")
                                ])
                              ]),
                              createVNode(VBtn, {
                                block: "",
                                color: "primary",
                                size: "x-large",
                                rounded: "pill",
                                class: "font-weight-bold",
                                elevation: "3"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(t).basket?.checkout), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                variant: "text",
                                block: "",
                                class: "mt-4 text-none text-medium-emphasis",
                                to: `/${locale.value}`
                              }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, { start: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-arrow-left")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" " + toDisplayString(unref(t).basket?.continue), 1)
                                ]),
                                _: 1
                              }, 8, ["to"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1024))
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Render, {
        rows: footer.value,
        "margin-top": "0px",
        is_footer: "is_footer",
        locale: locale.value
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[lang]/basket.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basket = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b55ec10"]]);
export {
  basket as default
};
//# sourceMappingURL=basket-BDH1Tdjz.js.map
