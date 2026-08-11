import { defineComponent, mergeProps, withCtx, renderSlot, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { A as ACard } from "./ACard-CyoWAS1w.js";
import { _ as _export_sfc } from "../server.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GradientCard",
  __ssrInlineRender: true,
  props: ["background", "mainBackground"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "tile-wrapper",
        style: { "height": "100%", "flex": "1", "width": "100%", "display": "flex", "flex-direction": "column" }
      }, _attrs))} data-v-cb40f966>`);
      _push(ssrRenderComponent(ACard, {
        flat: "",
        class: "custom-card",
        style: { background: __props.mainBackground ?? "#f4f4f4", borderRadius: "18px", height: "100%", flex: 1, display: "flex", flexDirection: "column" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<div class="tile-bg" style="${ssrRenderStyle(`background-image: ${__props.background}`)}" data-v-cb40f966></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/GradientCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GradientCard = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-cb40f966"]]), { __name: "EditorElementsElementsGradientCard" });
export {
  GradientCard as default
};
//# sourceMappingURL=GradientCard-CUpEIw2w.js.map
