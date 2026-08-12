import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { A as ACard } from "./ACard-CyoWAS1w.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Team",
  __ssrInlineRender: true,
  props: {
    image: {},
    name: {},
    position: {},
    linkedIn: {},
    instagram: {},
    github: {},
    link: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(ACard, mergeProps({ style: { "display": "flex", "flex-direction": "row", "gap": "10px", "align-items": "center" } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", __props.name)} width="80px" style="${ssrRenderStyle({ "border-radius": "8px" })}"${_scopeId}><div style="${ssrRenderStyle({ "flex": "1" })}"${_scopeId}><h3 class="text-h6 mb-1"${_scopeId}>${ssrInterpolate(__props.name)}</h3><p class="text-subtitle-2 text-grey-darken-1"${_scopeId}>${ssrInterpolate(__props.position)}</p></div>`);
          } else {
            return [
              createVNode("img", {
                src: __props.image,
                alt: __props.name,
                width: "80px",
                style: { "border-radius": "8px" }
              }, null, 8, ["src", "alt"]),
              createVNode("div", { style: { "flex": "1" } }, [
                createVNode("h3", { class: "text-h6 mb-1" }, toDisplayString(__props.name), 1),
                createVNode("p", { class: "text-subtitle-2 text-grey-darken-1" }, toDisplayString(__props.position), 1)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/Team.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Team = Object.assign(_sfc_main, { __name: "EditorElementsElementsTeam" });
export {
  Team as default
};
//# sourceMappingURL=Team-B2DRav_Q.js.map
