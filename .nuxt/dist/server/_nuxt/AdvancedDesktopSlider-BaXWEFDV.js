import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { ab as Flex, ac as Spacer } from "./asyncData-BoxtDLvH.js";
import { b as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import "./resizeObserver-Bors9hmC.js";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
function previewImage(file) {
  return URL.createObjectURL(file);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdvancedDesktopSlider",
  __ssrInlineRender: true,
  props: {
    height: {},
    autoplayDelay: {},
    slidesData: {}
  },
  setup(__props) {
    const config = useRuntimeConfig();
    ref(0);
    ref(false);
    ref([]);
    ref([]);
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "fullpage-slider",
        style: { height: __props.height }
      }, _attrs))} data-v-837d7359><i class="pi pi-chevron-right" style="${ssrRenderStyle({ "font-size": "2rem", "position": "absolute", "z-index": "99", "right": "0", "color": "white", "top": "50%", "transform": "translate(-50%, -50%)", "cursor": "pointer" })}" data-v-837d7359></i><i class="pi pi-chevron-left" style="${ssrRenderStyle({ "font-size": "2rem", "position": "absolute", "z-index": "99", "left": "25px", "color": "white", "top": "50%", "transform": "translate(-50%, -50%)", "cursor": "pointer" })}" data-v-837d7359></i><!--[-->`);
      ssrRenderList(__props.slidesData, (slide, index) => {
        _push(`<div class="slide" style="${ssrRenderStyle({ background: slide.background })}" data-v-837d7359><div class="${ssrRenderClass([slide.imagesPosition === "from_left" ? "left-layout" : "right-layout", "slide-content"])}" data-v-837d7359><div class="${ssrRenderClass(["image1", slide.image1Size + "Box"])}" data-v-837d7359>`);
        if (slide.image1) {
          _push(`<img${ssrRenderAttr("src", typeof slide.image1 === "object" ? unref(previewImage)(slide.image1) : unref(config).public.baseUrl + "/" + slide.image1)} class="${ssrRenderClass(["image1", slide.image1Size])}" alt="" data-v-837d7359>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="${ssrRenderClass(["image2", slide.image2Size + "Box"])}" style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column" })}" data-v-837d7359>`);
        _push(ssrRenderComponent(Flex, { fd: "row" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="slide-text" data-v-837d7359${_scopeId}>${slide.description ?? ""}</div>`);
            } else {
              return [
                createVNode("div", {
                  class: "slide-text",
                  innerHTML: slide.description
                }, null, 8, ["innerHTML"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(Spacer, null, null, _parent));
        if (slide.image2) {
          _push(`<img${ssrRenderAttr("src", typeof slide.image2 === "object" ? unref(previewImage)(slide.image2) : unref(config).public.baseUrl + "/" + slide.image2)} class="${ssrRenderClass(["image2", slide.image2Size])}" alt="" data-v-837d7359>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/AdvancedDesktopSlider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdvancedDesktopSlider = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-837d7359"]]), { __name: "EditorElementsElementsAdvancedDesktopSlider" });
export {
  AdvancedDesktopSlider as default
};
//# sourceMappingURL=AdvancedDesktopSlider-BaXWEFDV.js.map
