import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { P as Products } from "./Products-D6ANeln0.js";
import { p as VRow } from "./asyncData-BoxtDLvH.js";
import "./PurchaseModal-CCZxz_QX.js";
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
import "./useTrans-CtYIwtZX.js";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductsByIds",
  __ssrInlineRender: true,
  props: {
    locale: {},
    uiStyles: {},
    productIds: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, mergeProps({
        style: { "position": "relative" },
        align: "start"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Products, {
              "selected-category": null,
              "product-ids": __props.productIds,
              locale: __props.locale,
              "ui-styles": __props.uiStyles
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(Products, {
                "selected-category": null,
                "product-ids": __props.productIds,
                locale: __props.locale,
                "ui-styles": __props.uiStyles
              }, null, 8, ["product-ids", "locale", "ui-styles"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/ProductsByIds.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductsByIds = Object.assign(_sfc_main, { __name: "EditorElementsElementsProductsByIds" });
export {
  ProductsByIds as default
};
//# sourceMappingURL=ProductsByIds-C8kX6cUh.js.map
