import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ACard",
  __ssrInlineRender: true,
  props: {
    padding: { default: "16px" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: ` padding: ${__props.padding} ; border: 1px solid #e5e5e5 ; border-radius: 8px;overflow:hidden`
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/common/ACard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ACard = Object.assign(_sfc_main, { __name: "EditorElementsElementsCommonACard" });
export {
  ACard as A
};
//# sourceMappingURL=ACard-CyoWAS1w.js.map
