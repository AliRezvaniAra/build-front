import { g as genericComponent, x as provideTheme, k as useRtl, p as propsFactory, w as makeThemeProps, X as omit, ac as __nuxt_component_0 } from "../server.mjs";
import { createElementVNode, normalizeStyle, normalizeClass, withCtx, openBlock, createBlock, Suspense, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSuspense, ssrRenderClass } from "vue/server-renderer";
import { u as useRender, m as makeComponentProps } from "./resizeObserver-Bors9hmC.js";
import { c as createLayout, m as makeLayoutProps } from "./layout-BUTXVtFv.js";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...omit(makeLayoutProps(), ["fullHeight"]),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout({
      ...props,
      fullHeight: true
    });
    const {
      rtlClasses
    } = useRtl();
    useRender(() => createElementVNode("div", {
      "ref": layoutRef,
      "class": normalizeClass(["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class]),
      "style": normalizeStyle([props.style])
    }, [createElementVNode("div", {
      "class": "v-application__wrap"
    }, [slots.default?.()])]));
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(_component_NuxtPage, {
                  key: _ctx.$route.fullPath
                }, null, _parent2, _scopeId));
              },
              fallback: () => {
                _push2(`<div class="${ssrRenderClass(`page-loading`)}"${_scopeId}><div class="spinner"${_scopeId}></div></div>`);
              },
              _: 1
            });
          } else {
            return [
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(_component_NuxtPage, {
                    key: _ctx.$route.fullPath
                  }))
                ]),
                fallback: withCtx(() => [
                  createVNode("div", { class: `page-loading` }, [
                    createVNode("div", { class: "spinner" })
                  ])
                ]),
                _: 1
              }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-CA3o0vBu.js.map
