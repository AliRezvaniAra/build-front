import { defineComponent, ref, watch, nextTick, unref, withCtx, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectCoverflow, EffectFade, EffectFlip, EffectCreative } from "swiper/modules";
import { R as Render } from "./asyncData-utIt_h6-.js";
import { f as useDisplay, b as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdvancedSlider",
  __ssrInlineRender: true,
  props: {
    locale: {},
    effect: { default: "slide" },
    height: { default: "200px" },
    mode: { default: "each-slide-content" },
    radius: { default: "16px" },
    hoverEffect: { default: "no-effect" },
    delay: { default: 3500 },
    slidesData: {}
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const { mdAndUp } = useDisplay();
    const currentIndex = ref(0);
    const dynamicHeight = ref(__props.height);
    const onSlideChange = (swiper) => {
      currentIndex.value = swiper.realIndex;
    };
    watch(currentIndex, () => {
      nextTick(() => {
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div id="height-according-container" style="${ssrRenderStyle({ height: dynamicHeight.value })}" data-v-09bebb2b></div><div class="fullpage-slider" id="slider-container" style="${ssrRenderStyle({ height: dynamicHeight.value, borderRadius: __props.radius, direction: "ltr" })}" data-v-09bebb2b>`);
      if (!!__props.slidesData[0] && __props.mode === "single-content") {
        _push(`<div class="slider-overlay" data-v-09bebb2b>`);
        _push(ssrRenderComponent(Render, {
          rows: unref(mdAndUp) ? __props.slidesData[0].content : __props.slidesData[0].contentMobile.length !== 0 ? __props.slidesData[0].contentMobile : __props.slidesData[0].content,
          "margin-top": "0px",
          locale: __props.locale
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Swiper), {
        onSlideChange,
        style: { width: "100%", height: dynamicHeight.value },
        id: "slider-container-swiper",
        modules: [unref(Autoplay), __props.effect === "coverflow" ? unref(EffectCoverflow) : __props.effect === "fade" ? unref(EffectFade) : __props.effect === "flip" ? unref(EffectFlip) : unref(EffectCreative)],
        loop: true,
        effect: __props.effect,
        autoplay: {
          delay: __props.delay,
          disableOnInteraction: false
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.slidesData, (slide, index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), { key: index }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (slide.image) {
                      _push3(`<div class="${ssrRenderClass(`slide ${__props.hoverEffect}`)}"${ssrRenderAttr("id", `slide${index}`)} style="${ssrRenderStyle({
                        height: dynamicHeight.value,
                        padding: "16px"
                      })}" data-v-09bebb2b${_scopeId2}><picture style="${ssrRenderStyle({ "position": "absolute", "left": "0", "top": "0", "width": "100%", "height": "100%" })}" data-v-09bebb2b${_scopeId2}><source media="(max-width: 960px)"${ssrRenderAttr("srcset", unref(config).public.baseUrl + "/" + (slide.imageMobile || slide.image))} data-v-09bebb2b${_scopeId2}><img${ssrRenderAttr("src", unref(config).public.baseUrl + "/" + slide.image)} style="${ssrRenderStyle({ "object-fit": "cover", "width": "100%", "height": "100%" })}" alt="Codentral" data-v-09bebb2b${_scopeId2}></picture><div class="overlay" style="${ssrRenderStyle({
                        background: `linear-gradient(${slide.gradColor1}, ${slide.gradColor2}, ${slide.gradColor3})`
                      })}" data-v-09bebb2b${_scopeId2}></div>`);
                      if (currentIndex.value === index && __props.mode !== "single-content") {
                        _push3(ssrRenderComponent(Render, {
                          rows: unref(mdAndUp) ? slide.content : slide.contentMobile.length !== 0 ? slide.contentMobile : slide.content,
                          "margin-top": "0px",
                          locale: __props.locale
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      slide.image ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: `slide ${__props.hoverEffect}`,
                        id: `slide${index}`,
                        style: {
                          height: dynamicHeight.value,
                          padding: "16px"
                        }
                      }, [
                        createVNode("picture", { style: { "position": "absolute", "left": "0", "top": "0", "width": "100%", "height": "100%" } }, [
                          createVNode("source", {
                            media: "(max-width: 960px)",
                            srcset: unref(config).public.baseUrl + "/" + (slide.imageMobile || slide.image)
                          }, null, 8, ["srcset"]),
                          createVNode("img", {
                            src: unref(config).public.baseUrl + "/" + slide.image,
                            style: { "object-fit": "cover", "width": "100%", "height": "100%" },
                            alt: "Codentral"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", {
                          class: "overlay",
                          style: {
                            background: `linear-gradient(${slide.gradColor1}, ${slide.gradColor2}, ${slide.gradColor3})`
                          }
                        }, null, 4),
                        currentIndex.value === index && __props.mode !== "single-content" ? (openBlock(), createBlock(Render, {
                          key: 0,
                          rows: unref(mdAndUp) ? slide.content : slide.contentMobile.length !== 0 ? slide.contentMobile : slide.content,
                          "margin-top": "0px",
                          locale: __props.locale
                        }, null, 8, ["rows", "locale"])) : createCommentVNode("", true)
                      ], 14, ["id"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.slidesData, (slide, index) => {
                return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                  default: withCtx(() => [
                    slide.image ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: `slide ${__props.hoverEffect}`,
                      id: `slide${index}`,
                      style: {
                        height: dynamicHeight.value,
                        padding: "16px"
                      }
                    }, [
                      createVNode("picture", { style: { "position": "absolute", "left": "0", "top": "0", "width": "100%", "height": "100%" } }, [
                        createVNode("source", {
                          media: "(max-width: 960px)",
                          srcset: unref(config).public.baseUrl + "/" + (slide.imageMobile || slide.image)
                        }, null, 8, ["srcset"]),
                        createVNode("img", {
                          src: unref(config).public.baseUrl + "/" + slide.image,
                          style: { "object-fit": "cover", "width": "100%", "height": "100%" },
                          alt: "Codentral"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", {
                        class: "overlay",
                        style: {
                          background: `linear-gradient(${slide.gradColor1}, ${slide.gradColor2}, ${slide.gradColor3})`
                        }
                      }, null, 4),
                      currentIndex.value === index && __props.mode !== "single-content" ? (openBlock(), createBlock(Render, {
                        key: 0,
                        rows: unref(mdAndUp) ? slide.content : slide.contentMobile.length !== 0 ? slide.contentMobile : slide.content,
                        "margin-top": "0px",
                        locale: __props.locale
                      }, null, 8, ["rows", "locale"])) : createCommentVNode("", true)
                    ], 14, ["id"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/AdvancedSlider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdvancedSlider = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-09bebb2b"]]), { __name: "EditorElementsElementsAdvancedSlider" });
export {
  AdvancedSlider as default
};
//# sourceMappingURL=AdvancedSlider-CebVhLET.js.map
