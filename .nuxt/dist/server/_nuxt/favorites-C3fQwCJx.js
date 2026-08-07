import { defineComponent, ref, computed, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { l as useShopLocal, u as useAsyncData, H as Header1, a as Header1Mobile, V as VContainer, k as VIcon, n as VBtn, p as VRow, q as VCol, r as VCard, s as VImg, w as VProgressCircular, x as VCardText, y as VCardActions, R as Render } from "./asyncData-utIt_h6-.js";
import { useRoute } from "vue-router";
import { r as routeParamString } from "./routeParams-HtYLAcRh.js";
import { u as useTrans } from "./useTrans-CtYIwtZX.js";
import { f as useDisplay, b as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import { u as useHead } from "./composables-BSyjzoin.js";
import { V as VChip } from "./VChip-BczTBod0.js";
import "./resizeObserver-Bors9hmC.js";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "favorites",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useTrans();
    const route = useRoute();
    const related_pages = ref([]);
    const { mdAndUp } = useDisplay();
    const config = useRuntimeConfig();
    const locale = ref(routeParamString(route.params.lang));
    const { favorites: favorites2, removeFavorite } = useShopLocal();
    const langParam = computed(() => route.params.lang?.toString() || "en");
    const isRtl = computed(() => locale.value === "fa" || locale.value === "ar");
    const [
      { data: languages },
      { data: footerData },
      { data: header },
      { data: menu }
    ] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      useAsyncData("languages", () => $fetch(`/api/languages`, { baseURL: config.public.baseUrl })),
      useAsyncData(`footer-${langParam.value}`, () => $fetch(`/api/pages/rows/0-footer-${langParam.value}`, { baseURL: config.public.baseUrl })),
      useAsyncData(`header-data-${langParam.value}`, () => $fetch(`/api/pages/rows/0-header-${langParam.value}`, { baseURL: config.public.baseUrl }).then((r) => r.data || [])),
      useAsyncData("menu-data", () => $fetch(`/api/menus/get`, { baseURL: config.public.baseUrl }).then((r) => r.data || []))
    ])), __temp = await __temp, __restore(), __temp);
    useHead({
      htmlAttrs: {
        lang: () => locale.value,
        dir: () => isRtl.value ? "rtl" : "ltr"
      },
      link: () => isRtl.value ? [{ id: "rtl-stylesheet", rel: "stylesheet", href: "/css/rtl.css" }] : []
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(languages)) {
        _push(`<!--[-->`);
        if (unref(mdAndUp)) {
          _push(ssrRenderComponent(Header1, {
            theme: "light",
            header: unref(header),
            menu: unref(menu),
            languages: unref(languages),
            related_pages: related_pages.value,
            locale: locale.value
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(Header1Mobile, {
            theme: "light",
            rows: unref(header),
            menu: unref(menu),
            languages: unref(languages),
            related_pages: related_pages.value,
            locale: locale.value
          }, null, _parent));
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(VContainer, {
        class: "shop-page py-12",
        style: { direction: unref(isRtl) ? "rtl" : "ltr" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="d-flex align-end justify-space-between mb-10" data-v-a315f009${_scopeId}><div data-v-a315f009${_scopeId}><h1 class="text-h3 font-weight-black mb-1" data-v-a315f009${_scopeId}>${ssrInterpolate(unref(t).favorites?.title)}</h1><p class="text-body-1 text-medium-emphasis" data-v-a315f009${_scopeId}>${ssrInterpolate(unref(t).favorites?.subtitle)}</p></div>`);
            if (unref(favorites2).length) {
              _push2(ssrRenderComponent(VChip, {
                color: "primary",
                variant: "flat",
                size: "large",
                class: "px-6"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(favorites2).length)} ${ssrInterpolate(unref(favorites2).length === 1 ? unref(t).favorites?.item : unref(t).favorites?.items)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(favorites2).length) + " " + toDisplayString(unref(favorites2).length === 1 ? unref(t).favorites?.item : unref(t).favorites?.items), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</header>`);
            if (!unref(favorites2).length) {
              _push2(`<div class="text-center py-16" data-v-a315f009${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, {
                icon: "mdi-heart-outline",
                size: "80",
                color: "grey-lighten-2",
                class: "mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="text-h5 text-medium-emphasis mb-6" data-v-a315f009${_scopeId}>${ssrInterpolate(unref(t).favorites?.empty_title)}</h2>`);
              _push2(ssrRenderComponent(VBtn, {
                to: `/${locale.value}`,
                color: "primary",
                size: "large",
                rounded: "pill",
                "prepend-icon": "mdi-shopping"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t).favorites?.start_shopping)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t).favorites?.start_shopping), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(favorites2), (item) => {
                    _push3(ssrRenderComponent(VCol, {
                      key: `${item.id}-${item.sku}`,
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, {
                            class: "product-card h-100 d-flex flex-column",
                            rounded: "xl",
                            elevation: "0"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="image-container overflow-hidden" data-v-a315f009${_scopeId4}>`);
                                _push5(ssrRenderComponent(VImg, {
                                  src: item.primaryImg,
                                  height: "240",
                                  cover: "",
                                  class: "product-image"
                                }, {
                                  placeholder: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VRow, {
                                        class: "fill-height ma-0",
                                        align: "center",
                                        justify: "center"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VProgressCircular, {
                                              indeterminate: "",
                                              color: "grey-lighten-4"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VProgressCircular, {
                                                indeterminate: "",
                                                color: "grey-lighten-4"
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
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
                                              color: "grey-lighten-4"
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VBtn, {
                                        icon: "mdi-close",
                                        variant: "flat",
                                        color: "white",
                                        size: "small",
                                        class: "remove-btn shadow-sm",
                                        onClick: ($event) => unref(removeFavorite)(item.id, item.sku)
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VBtn, {
                                          icon: "mdi-close",
                                          variant: "flat",
                                          color: "white",
                                          size: "small",
                                          class: "remove-btn shadow-sm",
                                          onClick: ($event) => unref(removeFavorite)(item.id, item.sku)
                                        }, null, 8, ["onClick"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                                _push5(ssrRenderComponent(VCardText, { class: "pt-4 pb-2 px-4 flex-grow-1" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="d-flex justify-space-between align-start mb-1" data-v-a315f009${_scopeId5}><span class="text-caption font-weight-medium text-disabled" data-v-a315f009${_scopeId5}>SKU: ${ssrInterpolate(item.sku)}</span></div><h3 class="text-h6 font-weight-bold text-truncate mb-1" data-v-a315f009${_scopeId5}>${ssrInterpolate(item.title)}</h3><div class="text-h6 color-primary font-weight-black" data-v-a315f009${_scopeId5}><span class="text-body-2 font-weight-medium" data-v-a315f009${_scopeId5}>${ssrInterpolate(item.currency)}</span> ${ssrInterpolate(parseFloat(item.price).toLocaleString())}</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "d-flex justify-space-between align-start mb-1" }, [
                                          createVNode("span", { class: "text-caption font-weight-medium text-disabled" }, "SKU: " + toDisplayString(item.sku), 1)
                                        ]),
                                        createVNode("h3", { class: "text-h6 font-weight-bold text-truncate mb-1" }, toDisplayString(item.title), 1),
                                        createVNode("div", { class: "text-h6 color-primary font-weight-black" }, [
                                          createVNode("span", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.currency), 1),
                                          createTextVNode(" " + toDisplayString(parseFloat(item.price).toLocaleString()), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardActions, { class: "pa-4" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VBtn, {
                                        block: "",
                                        color: "black",
                                        variant: "flat",
                                        rounded: "lg",
                                        height: "44",
                                        to: `/${locale.value}/products/${item.slug}`,
                                        class: "text-none"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(unref(t).favorites?.view_details)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(unref(t).favorites?.view_details), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VBtn, {
                                          block: "",
                                          color: "black",
                                          variant: "flat",
                                          rounded: "lg",
                                          height: "44",
                                          to: `/${locale.value}/products/${item.slug}`,
                                          class: "text-none"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(t).favorites?.view_details), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["to"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode("div", { class: "image-container overflow-hidden" }, [
                                    createVNode(VImg, {
                                      src: item.primaryImg,
                                      height: "240",
                                      cover: "",
                                      class: "product-image"
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
                                              color: "grey-lighten-4"
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          icon: "mdi-close",
                                          variant: "flat",
                                          color: "white",
                                          size: "small",
                                          class: "remove-btn shadow-sm",
                                          onClick: ($event) => unref(removeFavorite)(item.id, item.sku)
                                        }, null, 8, ["onClick"])
                                      ]),
                                      _: 2
                                    }, 1032, ["src"])
                                  ]),
                                  createVNode(VCardText, { class: "pt-4 pb-2 px-4 flex-grow-1" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex justify-space-between align-start mb-1" }, [
                                        createVNode("span", { class: "text-caption font-weight-medium text-disabled" }, "SKU: " + toDisplayString(item.sku), 1)
                                      ]),
                                      createVNode("h3", { class: "text-h6 font-weight-bold text-truncate mb-1" }, toDisplayString(item.title), 1),
                                      createVNode("div", { class: "text-h6 color-primary font-weight-black" }, [
                                        createVNode("span", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.currency), 1),
                                        createTextVNode(" " + toDisplayString(parseFloat(item.price).toLocaleString()), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardActions, { class: "pa-4" }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        block: "",
                                        color: "black",
                                        variant: "flat",
                                        rounded: "lg",
                                        height: "44",
                                        to: `/${locale.value}/products/${item.slug}`,
                                        class: "text-none"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(t).favorites?.view_details), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCard, {
                              class: "product-card h-100 d-flex flex-column",
                              rounded: "xl",
                              elevation: "0"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "image-container overflow-hidden" }, [
                                  createVNode(VImg, {
                                    src: item.primaryImg,
                                    height: "240",
                                    cover: "",
                                    class: "product-image"
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
                                            color: "grey-lighten-4"
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        icon: "mdi-close",
                                        variant: "flat",
                                        color: "white",
                                        size: "small",
                                        class: "remove-btn shadow-sm",
                                        onClick: ($event) => unref(removeFavorite)(item.id, item.sku)
                                      }, null, 8, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1032, ["src"])
                                ]),
                                createVNode(VCardText, { class: "pt-4 pb-2 px-4 flex-grow-1" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "d-flex justify-space-between align-start mb-1" }, [
                                      createVNode("span", { class: "text-caption font-weight-medium text-disabled" }, "SKU: " + toDisplayString(item.sku), 1)
                                    ]),
                                    createVNode("h3", { class: "text-h6 font-weight-bold text-truncate mb-1" }, toDisplayString(item.title), 1),
                                    createVNode("div", { class: "text-h6 color-primary font-weight-black" }, [
                                      createVNode("span", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.currency), 1),
                                      createTextVNode(" " + toDisplayString(parseFloat(item.price).toLocaleString()), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VCardActions, { class: "pa-4" }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      block: "",
                                      color: "black",
                                      variant: "flat",
                                      rounded: "lg",
                                      height: "44",
                                      to: `/${locale.value}/products/${item.slug}`,
                                      class: "text-none"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(t).favorites?.view_details), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(favorites2), (item) => {
                      return openBlock(), createBlock(VCol, {
                        key: `${item.id}-${item.sku}`,
                        cols: "12",
                        sm: "6",
                        md: "4",
                        lg: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            class: "product-card h-100 d-flex flex-column",
                            rounded: "xl",
                            elevation: "0"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "image-container overflow-hidden" }, [
                                createVNode(VImg, {
                                  src: item.primaryImg,
                                  height: "240",
                                  cover: "",
                                  class: "product-image"
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
                                          color: "grey-lighten-4"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      icon: "mdi-close",
                                      variant: "flat",
                                      color: "white",
                                      size: "small",
                                      class: "remove-btn shadow-sm",
                                      onClick: ($event) => unref(removeFavorite)(item.id, item.sku)
                                    }, null, 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1032, ["src"])
                              ]),
                              createVNode(VCardText, { class: "pt-4 pb-2 px-4 flex-grow-1" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex justify-space-between align-start mb-1" }, [
                                    createVNode("span", { class: "text-caption font-weight-medium text-disabled" }, "SKU: " + toDisplayString(item.sku), 1)
                                  ]),
                                  createVNode("h3", { class: "text-h6 font-weight-bold text-truncate mb-1" }, toDisplayString(item.title), 1),
                                  createVNode("div", { class: "text-h6 color-primary font-weight-black" }, [
                                    createVNode("span", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.currency), 1),
                                    createTextVNode(" " + toDisplayString(parseFloat(item.price).toLocaleString()), 1)
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardActions, { class: "pa-4" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    block: "",
                                    color: "black",
                                    variant: "flat",
                                    rounded: "lg",
                                    height: "44",
                                    to: `/${locale.value}/products/${item.slug}`,
                                    class: "text-none"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t).favorites?.view_details), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"])
                                ]),
                                _: 2
                              }, 1024)
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("header", { class: "d-flex align-end justify-space-between mb-10" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-h3 font-weight-black mb-1" }, toDisplayString(unref(t).favorites?.title), 1),
                  createVNode("p", { class: "text-body-1 text-medium-emphasis" }, toDisplayString(unref(t).favorites?.subtitle), 1)
                ]),
                unref(favorites2).length ? (openBlock(), createBlock(VChip, {
                  key: 0,
                  color: "primary",
                  variant: "flat",
                  size: "large",
                  class: "px-6"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(favorites2).length) + " " + toDisplayString(unref(favorites2).length === 1 ? unref(t).favorites?.item : unref(t).favorites?.items), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              !unref(favorites2).length ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-16"
              }, [
                createVNode(VIcon, {
                  icon: "mdi-heart-outline",
                  size: "80",
                  color: "grey-lighten-2",
                  class: "mb-4"
                }),
                createVNode("h2", { class: "text-h5 text-medium-emphasis mb-6" }, toDisplayString(unref(t).favorites?.empty_title), 1),
                createVNode(VBtn, {
                  to: `/${locale.value}`,
                  color: "primary",
                  size: "large",
                  rounded: "pill",
                  "prepend-icon": "mdi-shopping"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t).favorites?.start_shopping), 1)
                  ]),
                  _: 1
                }, 8, ["to"])
              ])) : createCommentVNode("", true),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(favorites2), (item) => {
                    return openBlock(), createBlock(VCol, {
                      key: `${item.id}-${item.sku}`,
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: "product-card h-100 d-flex flex-column",
                          rounded: "xl",
                          elevation: "0"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "image-container overflow-hidden" }, [
                              createVNode(VImg, {
                                src: item.primaryImg,
                                height: "240",
                                cover: "",
                                class: "product-image"
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
                                        color: "grey-lighten-4"
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    icon: "mdi-close",
                                    variant: "flat",
                                    color: "white",
                                    size: "small",
                                    class: "remove-btn shadow-sm",
                                    onClick: ($event) => unref(removeFavorite)(item.id, item.sku)
                                  }, null, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1032, ["src"])
                            ]),
                            createVNode(VCardText, { class: "pt-4 pb-2 px-4 flex-grow-1" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex justify-space-between align-start mb-1" }, [
                                  createVNode("span", { class: "text-caption font-weight-medium text-disabled" }, "SKU: " + toDisplayString(item.sku), 1)
                                ]),
                                createVNode("h3", { class: "text-h6 font-weight-bold text-truncate mb-1" }, toDisplayString(item.title), 1),
                                createVNode("div", { class: "text-h6 color-primary font-weight-black" }, [
                                  createVNode("span", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.currency), 1),
                                  createTextVNode(" " + toDisplayString(parseFloat(item.price).toLocaleString()), 1)
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardActions, { class: "pa-4" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  block: "",
                                  color: "black",
                                  variant: "flat",
                                  rounded: "lg",
                                  height: "44",
                                  to: `/${locale.value}/products/${item.slug}`,
                                  class: "text-none"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(t).favorites?.view_details), 1)
                                  ]),
                                  _: 1
                                }, 8, ["to"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Render, {
        rows: unref(footerData)?.data ?? [],
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[lang]/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const favorites = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a315f009"]]);
export {
  favorites as default
};
//# sourceMappingURL=favorites-C3fQwCJx.js.map
