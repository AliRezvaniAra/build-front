import { defineComponent, ref, watch, withCtx, unref, createSlots, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext, mergeProps } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { P as Products } from "./Products-C4KmC-SW.js";
import { b as useRuntimeConfig } from "../server.mjs";
import { u as useAsyncData, an as VList, ao as VListItem, ap as VListItemTitle, Q as VAvatar, s as VImg, p as VRow, q as VCol } from "./asyncData-utIt_h6-.js";
import "./PurchaseModal-k824TXLY.js";
import "./resizeObserver-Bors9hmC.js";
import "./useTrans-CtYIwtZX.js";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Categories",
  __ssrInlineRender: true,
  props: {
    locale: {}
  },
  emits: ["selectedCategory"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const config = useRuntimeConfig();
    const { data: categories } = useAsyncData(
      `categories`,
      async () => {
        const result = await $fetch(`/api/categories/all?per_page=50&page=1`, {
          baseURL: config.public.baseUrl
        });
        return result;
      }
    );
    const selectedCategoryId = ref(null);
    watch(categories, (val) => {
      if (categories.value?.data.length !== 0) {
        selectedCategoryId.value = categories.value?.data[0]?.id ?? 0;
        emit("selectedCategory", categories.value?.data[0]?.id ?? 0);
      }
    }, {
      immediate: true,
      // Triggers as soon as the component loads
      deep: true
      // Ensures nested data changes are caught
    });
    function selectCategory(id) {
      selectedCategoryId.value = id;
      emit("selectedCategory", id);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VList, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(categories)?.data, (item) => {
              _push2(ssrRenderComponent(VListItem, {
                key: item.id,
                onClick: ($event) => selectCategory(item.id),
                active: unref(selectedCategoryId) === item.id
              }, createSlots({
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VListItemTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(item.langs.find((l) => l.lang === __props.locale)?.title ?? "")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(item.langs.find((l) => l.lang === __props.locale)?.title ?? ""), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VListItemTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.langs.find((l) => l.lang === __props.locale)?.title ?? ""), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, [
                item.image !== null ? {
                  name: "prepend",
                  fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(VAvatar, {
                        size: "32",
                        rounded: "0"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VImg, {
                              src: unref(config).public.baseUrl + "/" + item.image,
                              alt: "category icon",
                              cover: ""
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VImg, {
                                src: unref(config).public.baseUrl + "/" + item.image,
                                alt: "category icon",
                                cover: ""
                              }, null, 8, ["src"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(VAvatar, {
                          size: "32",
                          rounded: "0"
                        }, {
                          default: withCtx(() => [
                            createVNode(VImg, {
                              src: unref(config).public.baseUrl + "/" + item.image,
                              alt: "category icon",
                              cover: ""
                            }, null, 8, ["src"])
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  key: "0"
                } : void 0
              ]), _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(categories)?.data, (item) => {
                return openBlock(), createBlock(VListItem, {
                  key: item.id,
                  onClick: ($event) => selectCategory(item.id),
                  active: unref(selectedCategoryId) === item.id
                }, createSlots({
                  default: withCtx(() => [
                    createVNode(VListItemTitle, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.langs.find((l) => l.lang === __props.locale)?.title ?? ""), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, [
                  item.image !== null ? {
                    name: "prepend",
                    fn: withCtx(() => [
                      createVNode(VAvatar, {
                        size: "32",
                        rounded: "0"
                      }, {
                        default: withCtx(() => [
                          createVNode(VImg, {
                            src: unref(config).public.baseUrl + "/" + item.image,
                            alt: "category icon",
                            cover: ""
                          }, null, 8, ["src"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["onClick", "active"]);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/Categories.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Categories = Object.assign(_sfc_main$1, { __name: "EditorElementsElementsCategories" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductsAndCategories",
  __ssrInlineRender: true,
  props: {
    locale: {},
    uiStyles: {}
  },
  setup(__props) {
    const selectedCategoryId = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, mergeProps({
        style: { "position": "relative" },
        align: "start"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "12",
              lg: "3",
              xl: "2",
              style: { "position": "sticky", "top": "100px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Categories, {
                    locale: __props.locale,
                    onSelectedCategory: (id) => {
                      selectedCategoryId.value = id;
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Categories, {
                      locale: __props.locale,
                      onSelectedCategory: (id) => {
                        selectedCategoryId.value = id;
                      }
                    }, null, 8, ["locale", "onSelectedCategory"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "12",
              lg: "9",
              xl: "10"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Products, {
                    "selected-category": unref(selectedCategoryId),
                    locale: __props.locale,
                    "ui-styles": __props.uiStyles
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Products, {
                      "selected-category": unref(selectedCategoryId),
                      locale: __props.locale,
                      "ui-styles": __props.uiStyles
                    }, null, 8, ["selected-category", "locale", "ui-styles"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, {
                cols: "12",
                md: "12",
                lg: "3",
                xl: "2",
                style: { "position": "sticky", "top": "100px" }
              }, {
                default: withCtx(() => [
                  createVNode(Categories, {
                    locale: __props.locale,
                    onSelectedCategory: (id) => {
                      selectedCategoryId.value = id;
                    }
                  }, null, 8, ["locale", "onSelectedCategory"])
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                md: "12",
                lg: "9",
                xl: "10"
              }, {
                default: withCtx(() => [
                  createVNode(Products, {
                    "selected-category": unref(selectedCategoryId),
                    locale: __props.locale,
                    "ui-styles": __props.uiStyles
                  }, null, 8, ["selected-category", "locale", "ui-styles"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/ProductsAndCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductsAndCategories = Object.assign(_sfc_main, { __name: "EditorElementsElementsProductsAndCategories" });
export {
  ProductsAndCategories as default
};
//# sourceMappingURL=ProductsAndCategories-DQ1o8-i2.js.map
