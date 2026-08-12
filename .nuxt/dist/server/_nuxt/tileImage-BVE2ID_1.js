import { mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { r as VCard, s as VImg, aa as VCardTitle, al as VCardSubtitle, n as VBtn } from "./asyncData-BoxtDLvH.js";
import "../server.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
import "./resizeObserver-Bors9hmC.js";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = {
  __name: "EditorElementsElementsTileImage",
  __ssrInlineRender: true,
  props: ["title", "description", "btn_title", "btn_link", "to", "btn_color", "background", "gradient", "height", "btn_text_color", "texts_position"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        style: `height: ${__props.height !== "full" ? __props.height : "unset"};flex:${__props.height === "full" ? "1" : "unset"} ; min-height:${__props.height !== "full" ? __props.height : "unset"}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VImg, {
              class: (typeof __props.texts_position === "undefined" ? "align-center" : __props.texts_position) + " reverse_gradient",
              src: __props.background,
              gradient: __props.gradient,
              eager: false,
              height: __props.height !== "full" ? __props.height : "100%",
              cover: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass(`d-flex flex-column pa-1 pb-2 ${__props.texts_position === "space-between" ? "spaceBetween" : ""}`)}"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(VCardTitle, {
                    class: "text-white text-h6 mt-1",
                    style: { "text-overflow": "unset", "white-space": "normal" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, {
                    class: "text-white",
                    style: { "text-overflow": "unset", "white-space": "normal" }
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (__props.btn_title !== "" && __props.btn_title !== null) {
                    _push3(`<!--[-->`);
                    if (__props.btn_link !== "#EVENT#" && typeof __props.btn_link !== "undefined" || typeof __props.to !== "undefined") {
                      _push3(ssrRenderComponent(VBtn, {
                        to: typeof __props.btn_link !== "undefined" ? __props.btn_link : __props.to,
                        color: __props.btn_color,
                        style: typeof __props.btn_text_color !== "undefined" ? "color:" + __props.btn_text_color : "",
                        rounded: "",
                        class: "align-self-end mr-3 mt-4"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(VBtn, {
                        onClick: () => _ctx.$emit("doBtn"),
                        color: __props.btn_color,
                        style: typeof __props.btn_text_color !== "undefined" ? "color:" + __props.btn_text_color : "",
                        rounded: "",
                        class: "align-self-end mr-3 mt-4"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: `d-flex flex-column pa-1 pb-2 ${__props.texts_position === "space-between" ? "spaceBetween" : ""}`
                    }, [
                      createVNode("div", null, [
                        createVNode(VCardTitle, {
                          class: "text-white text-h6 mt-1",
                          innerHTML: __props.title,
                          style: { "text-overflow": "unset", "white-space": "normal" }
                        }, null, 8, ["innerHTML"]),
                        createVNode(VCardSubtitle, {
                          class: "text-white",
                          style: { "text-overflow": "unset", "white-space": "normal" },
                          innerHTML: __props.description
                        }, null, 8, ["innerHTML"])
                      ]),
                      __props.btn_title !== "" && __props.btn_title !== null ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        __props.btn_link !== "#EVENT#" && typeof __props.btn_link !== "undefined" || typeof __props.to !== "undefined" ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          to: typeof __props.btn_link !== "undefined" ? __props.btn_link : __props.to,
                          textContent: toDisplayString(__props.btn_title),
                          color: __props.btn_color,
                          style: typeof __props.btn_text_color !== "undefined" ? "color:" + __props.btn_text_color : "",
                          rounded: "",
                          class: "align-self-end mr-3 mt-4"
                        }, null, 8, ["to", "textContent", "color", "style"])) : (openBlock(), createBlock(VBtn, {
                          key: 1,
                          onClick: () => _ctx.$emit("doBtn"),
                          textContent: toDisplayString(__props.btn_title),
                          color: __props.btn_color,
                          style: typeof __props.btn_text_color !== "undefined" ? "color:" + __props.btn_text_color : "",
                          rounded: "",
                          class: "align-self-end mr-3 mt-4"
                        }, null, 8, ["onClick", "textContent", "color", "style"]))
                      ], 64)) : createCommentVNode("", true)
                    ], 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VImg, {
                class: (typeof __props.texts_position === "undefined" ? "align-center" : __props.texts_position) + " reverse_gradient",
                src: __props.background,
                gradient: __props.gradient,
                eager: false,
                height: __props.height !== "full" ? __props.height : "100%",
                cover: ""
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: `d-flex flex-column pa-1 pb-2 ${__props.texts_position === "space-between" ? "spaceBetween" : ""}`
                  }, [
                    createVNode("div", null, [
                      createVNode(VCardTitle, {
                        class: "text-white text-h6 mt-1",
                        innerHTML: __props.title,
                        style: { "text-overflow": "unset", "white-space": "normal" }
                      }, null, 8, ["innerHTML"]),
                      createVNode(VCardSubtitle, {
                        class: "text-white",
                        style: { "text-overflow": "unset", "white-space": "normal" },
                        innerHTML: __props.description
                      }, null, 8, ["innerHTML"])
                    ]),
                    __props.btn_title !== "" && __props.btn_title !== null ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      __props.btn_link !== "#EVENT#" && typeof __props.btn_link !== "undefined" || typeof __props.to !== "undefined" ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        to: typeof __props.btn_link !== "undefined" ? __props.btn_link : __props.to,
                        textContent: toDisplayString(__props.btn_title),
                        color: __props.btn_color,
                        style: typeof __props.btn_text_color !== "undefined" ? "color:" + __props.btn_text_color : "",
                        rounded: "",
                        class: "align-self-end mr-3 mt-4"
                      }, null, 8, ["to", "textContent", "color", "style"])) : (openBlock(), createBlock(VBtn, {
                        key: 1,
                        onClick: () => _ctx.$emit("doBtn"),
                        textContent: toDisplayString(__props.btn_title),
                        color: __props.btn_color,
                        style: typeof __props.btn_text_color !== "undefined" ? "color:" + __props.btn_text_color : "",
                        rounded: "",
                        class: "align-self-end mr-3 mt-4"
                      }, null, 8, ["onClick", "textContent", "color", "style"]))
                    ], 64)) : createCommentVNode("", true)
                  ], 2)
                ]),
                _: 1
              }, 8, ["class", "src", "gradient", "height"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/tileImage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=tileImage-BVE2ID_1.js.map
