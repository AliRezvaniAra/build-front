import { ref, watch, nextTick, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc, b as useRuntimeConfig } from "../server.mjs";
import { V as VContainer, p as VRow, q as VCol, n as VBtn, am as setInterval } from "./asyncData-BoxtDLvH.js";
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
  __name: "EditorElementsElementsModernSlider",
  __ssrInlineRender: true,
  props: {
    sliderHeight: { type: String, default: "100vh" },
    slides: { type: Array, required: true },
    autoPlay: { type: Boolean, default: true },
    delay: { type: Number, default: 5e3 },
    borderRadius: "0px"
  },
  setup(__props) {
    const props = __props;
    const activeIndex = ref(0);
    const rootRef = ref(null);
    ref(null);
    ref(null);
    const subTitleRef = ref(null);
    const titleRef = ref(null);
    const descRef = ref(null);
    const btnRef = ref(null);
    ref(null);
    const trackRowRef = ref(null);
    const config = useRuntimeConfig();
    const revealImageSrc = ref(props.slides && props.slides.length > 0 ? props.slides[0].image : "");
    let autoPlayTimer = null;
    const customMod = (n, m) => (n % m + m) % m;
    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };
    const startAutoPlay = () => {
      stopAutoPlay();
      if (!props.autoPlay || !props.slides?.length || props.slides.length <= 1) return;
      autoPlayTimer = setInterval(() => {
        const nextIdx = (activeIndex.value + 1) % props.slides.length;
        runSlideTransition(nextIdx, getDirectionalOrigin(nextIdx));
      }, props.delay);
    };
    const getOriginFromEvent = (event) => {
      if (!event || !rootRef.value) return { x: 50, y: 50 };
      const rect = rootRef.value.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width * 100;
      const y = (event.clientY - rect.top) / rect.height * 100;
      return { x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) };
    };
    const getDirectionalOrigin = (newIndex) => {
      const total = props.slides.length;
      const forwardDistance = customMod(newIndex - activeIndex.value, total);
      const backwardDistance = total - forwardDistance;
      const goingForward = forwardDistance <= backwardDistance;
      return goingForward ? { x: 96, y: 50 } : { x: 4, y: 50 };
    };
    const runSlideTransition = (targetIndex, origin = { x: 50, y: 50 }) => {
      return;
    };
    const changeSlide = (newIndex, event = null) => {
      if (newIndex === activeIndex.value) return;
      stopAutoPlay();
      event ? getOriginFromEvent(event) : getDirectionalOrigin(newIndex);
      startAutoPlay();
    };
    const nextSlide = () => {
      if (!props.slides?.length) return;
      changeSlide((activeIndex.value + 1) % props.slides.length);
    };
    const prevSlide = () => {
      if (!props.slides?.length) return;
      changeSlide((activeIndex.value - 1 + props.slides.length) % props.slides.length);
    };
    watch(() => props.autoPlay, (newVal) => {
      if (newVal) startAutoPlay();
      else stopAutoPlay();
    });
    watch(() => props.delay, () => {
      if (props.autoPlay) startAutoPlay();
    });
    watch(() => props.slides, async (newSlides, oldSlides) => {
      if (newSlides?.length && !oldSlides?.length) {
        revealImageSrc.value = newSlides[0].image;
        await nextTick();
        startAutoPlay();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "rootRef",
        ref: rootRef,
        style: { minHeight: __props.sliderHeight, borderRadius: __props.borderRadius },
        class: "ma-0 pa-0 bg-black text-white overflow-hidden position-relative"
      }, _attrs))} data-v-0bfa524f><div class="position-absolute inset-0 w-100 h-100 main-bg-wrapper z-index-1" data-v-0bfa524f>`);
      if (props.slides && props.slides.length > 0) {
        _push(`<img${ssrRenderAttr("src", unref(config).public.baseUrl + "/" + props.slides[activeIndex.value].image)} class="w-100 h-100 object-cover brightness-50 position-absolute inset-0"${ssrRenderAttr("alt", props.slides[activeIndex.value].largeTitle)} data-v-0bfa524f>`);
      } else {
        _push(`<!---->`);
      }
      if (props.slides && props.slides.length > 0) {
        _push(`<img${ssrRenderAttr("src", unref(config).public.baseUrl + "/" + revealImageSrc.value)} class="w-100 h-100 object-cover brightness-50 position-absolute inset-0 bg-reveal-layer" data-v-0bfa524f>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(VContainer, {
        fluid: "",
        class: "fill-height px-6 px-md-12 position-relative z-index-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "align-center fill-height" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6",
                    class: "d-flex flex-column justify-center pt-mobile pt-md-16"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (props.slides && props.slides.length > 0) {
                          _push4(`<div class="text-animation-container" data-v-0bfa524f${_scopeId3}><span class="text-uppercase text-subtitle-2 font-weight-bold tracking-widest mb-2 d-block transition-colors" style="${ssrRenderStyle({ color: props.slides[activeIndex.value].subTitleColor || "white" })}" data-v-0bfa524f${_scopeId3}>${ssrInterpolate(props.slides[activeIndex.value].subTitle)}</span><h2 class="text-h3 text-md-h2 font-weight-black text-uppercase mb-4 tracking-tight leading-tight transition-colors" style="${ssrRenderStyle({ color: props.slides[activeIndex.value].titleColor || "white" })}" data-v-0bfa524f${_scopeId3}>${ssrInterpolate(props.slides[activeIndex.value].largeTitle)}</h2><p class="text-body-2 text-md-body-1 mb-6 max-w-sm transition-colors" style="${ssrRenderStyle({ color: props.slides[activeIndex.value].descColor || "white" })}" data-v-0bfa524f${_scopeId3}>${ssrInterpolate(props.slides[activeIndex.value].description)}</p><div data-v-0bfa524f${_scopeId3}>`);
                          _push4(ssrRenderComponent(VBtn, {
                            href: props.slides[activeIndex.value].btnLink,
                            variant: "outlined",
                            rounded: "xl",
                            class: "px-6 text-none font-weight-bold transition-colors",
                            style: {
                              color: props.slides[activeIndex.value].btnTextColor || "white",
                              borderColor: props.slides[activeIndex.value].btnBorderColor || "white"
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(props.slides[activeIndex.value].btnTitle)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(props.slides[activeIndex.value].btnTitle), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          props.slides && props.slides.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-animation-container"
                          }, [
                            createVNode("span", {
                              ref_key: "subTitleRef",
                              ref: subTitleRef,
                              class: "text-uppercase text-subtitle-2 font-weight-bold tracking-widest mb-2 d-block transition-colors",
                              style: { color: props.slides[activeIndex.value].subTitleColor || "white" }
                            }, toDisplayString(props.slides[activeIndex.value].subTitle), 5),
                            createVNode("h2", {
                              ref_key: "titleRef",
                              ref: titleRef,
                              class: "text-h3 text-md-h2 font-weight-black text-uppercase mb-4 tracking-tight leading-tight transition-colors",
                              style: { color: props.slides[activeIndex.value].titleColor || "white" }
                            }, toDisplayString(props.slides[activeIndex.value].largeTitle), 5),
                            createVNode("p", {
                              ref_key: "descRef",
                              ref: descRef,
                              class: "text-body-2 text-md-body-1 mb-6 max-w-sm transition-colors",
                              style: { color: props.slides[activeIndex.value].descColor || "white" }
                            }, toDisplayString(props.slides[activeIndex.value].description), 5),
                            createVNode("div", {
                              ref_key: "btnRef",
                              ref: btnRef
                            }, [
                              createVNode(VBtn, {
                                href: props.slides[activeIndex.value].btnLink,
                                variant: "outlined",
                                rounded: "xl",
                                class: "px-6 text-none font-weight-bold transition-colors",
                                style: {
                                  color: props.slides[activeIndex.value].btnTextColor || "white",
                                  borderColor: props.slides[activeIndex.value].btnBorderColor || "white"
                                }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(props.slides[activeIndex.value].btnTitle), 1)
                                ]),
                                _: 1
                              }, 8, ["href", "style"])
                            ], 512)
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6",
                    class: "d-flex flex-column justify-end justify-md-end align-md-end h-md-100 position-relative z-index-3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-none d-md-block mb-8 index-track-window" data-v-0bfa524f${_scopeId3}><div class="track-row position-relative w-100 h-100" data-v-0bfa524f${_scopeId3}><!--[-->`);
                        ssrRenderList(props.slides, (slide, idx) => {
                          _push4(`<div class="${ssrRenderClass([{ "is-active": idx === activeIndex.value }, "thumbnail-card position-absolute rounded-lg overflow-hidden elevation-4"])}" data-v-0bfa524f${_scopeId3}><img${ssrRenderAttr("src", unref(config).public.baseUrl + "/" + slide.image)} class="w-100 h-100 object-cover brightness-90" data-v-0bfa524f${_scopeId3}><div class="position-absolute bottom-0 left-0 right-0 pa-4 bg-gradient-vertical text-white" data-v-0bfa524f${_scopeId3}><div class="text-caption text-grey-lighten-2 text-uppercase font-weight-medium truncate" data-v-0bfa524f${_scopeId3}>${ssrInterpolate(slide.subTitle)}</div><div class="text-body-2 font-weight-bold text-uppercase tracking-wide truncate" data-v-0bfa524f${_scopeId3}>${ssrInterpolate(slide.largeTitle)}</div></div></div>`);
                        });
                        _push4(`<!--]--></div></div>`);
                        if (props.slides && props.slides.length > 0) {
                          _push4(`<div class="d-flex align-center justify-space-between pl-md-12 w-100 transition-colors" style="${ssrRenderStyle({ color: props.slides[activeIndex.value].titleColor || "white" })}" data-v-0bfa524f${_scopeId3}><div class="d-flex gap-3" data-v-0bfa524f${_scopeId3}>`);
                          _push4(ssrRenderComponent(VBtn, {
                            icon: "mdi-chevron-left",
                            variant: "outlined",
                            size: "small",
                            style: { color: props.slides[activeIndex.value].titleColor || "white", borderColor: props.slides[activeIndex.value].titleColor || "white" },
                            onClick: prevSlide
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VBtn, {
                            icon: "mdi-chevron-right",
                            variant: "outlined",
                            size: "small",
                            style: { color: props.slides[activeIndex.value].titleColor || "white", borderColor: props.slides[activeIndex.value].titleColor || "white" },
                            onClick: nextSlide
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="d-flex align-center gap-4 flex-grow-1 ml-6 max-w-xs" data-v-0bfa524f${_scopeId3}><span class="text-caption font-weight-bold opacity-75" data-v-0bfa524f${_scopeId3}>0${ssrInterpolate(activeIndex.value + 1)}</span><div class="flex-grow-1 bg-grey-darken-3 rounded-pill position-relative" style="${ssrRenderStyle({ "height": "2px" })}" data-v-0bfa524f${_scopeId3}><div class="rounded-pill h-100 position-absolute left-0 top-0 transition-width" style="${ssrRenderStyle({
                            width: `${(activeIndex.value + 1) / props.slides.length * 100}%`,
                            backgroundColor: props.slides[activeIndex.value].titleColor === "black" ? "black" : "#FFD700"
                          })}" data-v-0bfa524f${_scopeId3}></div></div><span class="text-caption font-weight-bold opacity-50" data-v-0bfa524f${_scopeId3}>0${ssrInterpolate(props.slides.length)}</span></div></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "d-none d-md-block mb-8 index-track-window" }, [
                            createVNode("div", {
                              ref_key: "trackRowRef",
                              ref: trackRowRef,
                              class: "track-row position-relative w-100 h-100"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.slides, (slide, idx) => {
                                return openBlock(), createBlock("div", {
                                  key: slide.id,
                                  class: ["thumbnail-card position-absolute rounded-lg overflow-hidden elevation-4", { "is-active": idx === activeIndex.value }],
                                  onClick: ($event) => changeSlide(idx, $event)
                                }, [
                                  createVNode("img", {
                                    src: unref(config).public.baseUrl + "/" + slide.image,
                                    class: "w-100 h-100 object-cover brightness-90"
                                  }, null, 8, ["src"]),
                                  createVNode("div", { class: "position-absolute bottom-0 left-0 right-0 pa-4 bg-gradient-vertical text-white" }, [
                                    createVNode("div", { class: "text-caption text-grey-lighten-2 text-uppercase font-weight-medium truncate" }, toDisplayString(slide.subTitle), 1),
                                    createVNode("div", { class: "text-body-2 font-weight-bold text-uppercase tracking-wide truncate" }, toDisplayString(slide.largeTitle), 1)
                                  ])
                                ], 10, ["onClick"]);
                              }), 128))
                            ], 512)
                          ]),
                          props.slides && props.slides.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "d-flex align-center justify-space-between pl-md-12 w-100 transition-colors",
                            style: { color: props.slides[activeIndex.value].titleColor || "white" }
                          }, [
                            createVNode("div", { class: "d-flex gap-3" }, [
                              createVNode(VBtn, {
                                icon: "mdi-chevron-left",
                                variant: "outlined",
                                size: "small",
                                style: { color: props.slides[activeIndex.value].titleColor || "white", borderColor: props.slides[activeIndex.value].titleColor || "white" },
                                onClick: prevSlide
                              }, null, 8, ["style"]),
                              createVNode(VBtn, {
                                icon: "mdi-chevron-right",
                                variant: "outlined",
                                size: "small",
                                style: { color: props.slides[activeIndex.value].titleColor || "white", borderColor: props.slides[activeIndex.value].titleColor || "white" },
                                onClick: nextSlide
                              }, null, 8, ["style"])
                            ]),
                            createVNode("div", { class: "d-flex align-center gap-4 flex-grow-1 ml-6 max-w-xs" }, [
                              createVNode("span", { class: "text-caption font-weight-bold opacity-75" }, "0" + toDisplayString(activeIndex.value + 1), 1),
                              createVNode("div", {
                                class: "flex-grow-1 bg-grey-darken-3 rounded-pill position-relative",
                                style: { "height": "2px" }
                              }, [
                                createVNode("div", {
                                  class: "rounded-pill h-100 position-absolute left-0 top-0 transition-width",
                                  style: {
                                    width: `${(activeIndex.value + 1) / props.slides.length * 100}%`,
                                    backgroundColor: props.slides[activeIndex.value].titleColor === "black" ? "black" : "#FFD700"
                                  }
                                }, null, 4)
                              ]),
                              createVNode("span", { class: "text-caption font-weight-bold opacity-50" }, "0" + toDisplayString(props.slides.length), 1)
                            ])
                          ], 4)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      md: "6",
                      class: "d-flex flex-column justify-center pt-mobile pt-md-16"
                    }, {
                      default: withCtx(() => [
                        props.slides && props.slides.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-animation-container"
                        }, [
                          createVNode("span", {
                            ref_key: "subTitleRef",
                            ref: subTitleRef,
                            class: "text-uppercase text-subtitle-2 font-weight-bold tracking-widest mb-2 d-block transition-colors",
                            style: { color: props.slides[activeIndex.value].subTitleColor || "white" }
                          }, toDisplayString(props.slides[activeIndex.value].subTitle), 5),
                          createVNode("h2", {
                            ref_key: "titleRef",
                            ref: titleRef,
                            class: "text-h3 text-md-h2 font-weight-black text-uppercase mb-4 tracking-tight leading-tight transition-colors",
                            style: { color: props.slides[activeIndex.value].titleColor || "white" }
                          }, toDisplayString(props.slides[activeIndex.value].largeTitle), 5),
                          createVNode("p", {
                            ref_key: "descRef",
                            ref: descRef,
                            class: "text-body-2 text-md-body-1 mb-6 max-w-sm transition-colors",
                            style: { color: props.slides[activeIndex.value].descColor || "white" }
                          }, toDisplayString(props.slides[activeIndex.value].description), 5),
                          createVNode("div", {
                            ref_key: "btnRef",
                            ref: btnRef
                          }, [
                            createVNode(VBtn, {
                              href: props.slides[activeIndex.value].btnLink,
                              variant: "outlined",
                              rounded: "xl",
                              class: "px-6 text-none font-weight-bold transition-colors",
                              style: {
                                color: props.slides[activeIndex.value].btnTextColor || "white",
                                borderColor: props.slides[activeIndex.value].btnBorderColor || "white"
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(props.slides[activeIndex.value].btnTitle), 1)
                              ]),
                              _: 1
                            }, 8, ["href", "style"])
                          ], 512)
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "6",
                      class: "d-flex flex-column justify-end justify-md-end align-md-end h-md-100 position-relative z-index-3"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-none d-md-block mb-8 index-track-window" }, [
                          createVNode("div", {
                            ref_key: "trackRowRef",
                            ref: trackRowRef,
                            class: "track-row position-relative w-100 h-100"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(props.slides, (slide, idx) => {
                              return openBlock(), createBlock("div", {
                                key: slide.id,
                                class: ["thumbnail-card position-absolute rounded-lg overflow-hidden elevation-4", { "is-active": idx === activeIndex.value }],
                                onClick: ($event) => changeSlide(idx, $event)
                              }, [
                                createVNode("img", {
                                  src: unref(config).public.baseUrl + "/" + slide.image,
                                  class: "w-100 h-100 object-cover brightness-90"
                                }, null, 8, ["src"]),
                                createVNode("div", { class: "position-absolute bottom-0 left-0 right-0 pa-4 bg-gradient-vertical text-white" }, [
                                  createVNode("div", { class: "text-caption text-grey-lighten-2 text-uppercase font-weight-medium truncate" }, toDisplayString(slide.subTitle), 1),
                                  createVNode("div", { class: "text-body-2 font-weight-bold text-uppercase tracking-wide truncate" }, toDisplayString(slide.largeTitle), 1)
                                ])
                              ], 10, ["onClick"]);
                            }), 128))
                          ], 512)
                        ]),
                        props.slides && props.slides.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "d-flex align-center justify-space-between pl-md-12 w-100 transition-colors",
                          style: { color: props.slides[activeIndex.value].titleColor || "white" }
                        }, [
                          createVNode("div", { class: "d-flex gap-3" }, [
                            createVNode(VBtn, {
                              icon: "mdi-chevron-left",
                              variant: "outlined",
                              size: "small",
                              style: { color: props.slides[activeIndex.value].titleColor || "white", borderColor: props.slides[activeIndex.value].titleColor || "white" },
                              onClick: prevSlide
                            }, null, 8, ["style"]),
                            createVNode(VBtn, {
                              icon: "mdi-chevron-right",
                              variant: "outlined",
                              size: "small",
                              style: { color: props.slides[activeIndex.value].titleColor || "white", borderColor: props.slides[activeIndex.value].titleColor || "white" },
                              onClick: nextSlide
                            }, null, 8, ["style"])
                          ]),
                          createVNode("div", { class: "d-flex align-center gap-4 flex-grow-1 ml-6 max-w-xs" }, [
                            createVNode("span", { class: "text-caption font-weight-bold opacity-75" }, "0" + toDisplayString(activeIndex.value + 1), 1),
                            createVNode("div", {
                              class: "flex-grow-1 bg-grey-darken-3 rounded-pill position-relative",
                              style: { "height": "2px" }
                            }, [
                              createVNode("div", {
                                class: "rounded-pill h-100 position-absolute left-0 top-0 transition-width",
                                style: {
                                  width: `${(activeIndex.value + 1) / props.slides.length * 100}%`,
                                  backgroundColor: props.slides[activeIndex.value].titleColor === "black" ? "black" : "#FFD700"
                                }
                              }, null, 4)
                            ]),
                            createVNode("span", { class: "text-caption font-weight-bold opacity-50" }, "0" + toDisplayString(props.slides.length), 1)
                          ])
                        ], 4)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "align-center fill-height" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "6",
                    class: "d-flex flex-column justify-center pt-mobile pt-md-16"
                  }, {
                    default: withCtx(() => [
                      props.slides && props.slides.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-animation-container"
                      }, [
                        createVNode("span", {
                          ref_key: "subTitleRef",
                          ref: subTitleRef,
                          class: "text-uppercase text-subtitle-2 font-weight-bold tracking-widest mb-2 d-block transition-colors",
                          style: { color: props.slides[activeIndex.value].subTitleColor || "white" }
                        }, toDisplayString(props.slides[activeIndex.value].subTitle), 5),
                        createVNode("h2", {
                          ref_key: "titleRef",
                          ref: titleRef,
                          class: "text-h3 text-md-h2 font-weight-black text-uppercase mb-4 tracking-tight leading-tight transition-colors",
                          style: { color: props.slides[activeIndex.value].titleColor || "white" }
                        }, toDisplayString(props.slides[activeIndex.value].largeTitle), 5),
                        createVNode("p", {
                          ref_key: "descRef",
                          ref: descRef,
                          class: "text-body-2 text-md-body-1 mb-6 max-w-sm transition-colors",
                          style: { color: props.slides[activeIndex.value].descColor || "white" }
                        }, toDisplayString(props.slides[activeIndex.value].description), 5),
                        createVNode("div", {
                          ref_key: "btnRef",
                          ref: btnRef
                        }, [
                          createVNode(VBtn, {
                            href: props.slides[activeIndex.value].btnLink,
                            variant: "outlined",
                            rounded: "xl",
                            class: "px-6 text-none font-weight-bold transition-colors",
                            style: {
                              color: props.slides[activeIndex.value].btnTextColor || "white",
                              borderColor: props.slides[activeIndex.value].btnBorderColor || "white"
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.slides[activeIndex.value].btnTitle), 1)
                            ]),
                            _: 1
                          }, 8, ["href", "style"])
                        ], 512)
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6",
                    class: "d-flex flex-column justify-end justify-md-end align-md-end h-md-100 position-relative z-index-3"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-none d-md-block mb-8 index-track-window" }, [
                        createVNode("div", {
                          ref_key: "trackRowRef",
                          ref: trackRowRef,
                          class: "track-row position-relative w-100 h-100"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.slides, (slide, idx) => {
                            return openBlock(), createBlock("div", {
                              key: slide.id,
                              class: ["thumbnail-card position-absolute rounded-lg overflow-hidden elevation-4", { "is-active": idx === activeIndex.value }],
                              onClick: ($event) => changeSlide(idx, $event)
                            }, [
                              createVNode("img", {
                                src: unref(config).public.baseUrl + "/" + slide.image,
                                class: "w-100 h-100 object-cover brightness-90"
                              }, null, 8, ["src"]),
                              createVNode("div", { class: "position-absolute bottom-0 left-0 right-0 pa-4 bg-gradient-vertical text-white" }, [
                                createVNode("div", { class: "text-caption text-grey-lighten-2 text-uppercase font-weight-medium truncate" }, toDisplayString(slide.subTitle), 1),
                                createVNode("div", { class: "text-body-2 font-weight-bold text-uppercase tracking-wide truncate" }, toDisplayString(slide.largeTitle), 1)
                              ])
                            ], 10, ["onClick"]);
                          }), 128))
                        ], 512)
                      ]),
                      props.slides && props.slides.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "d-flex align-center justify-space-between pl-md-12 w-100 transition-colors",
                        style: { color: props.slides[activeIndex.value].titleColor || "white" }
                      }, [
                        createVNode("div", { class: "d-flex gap-3" }, [
                          createVNode(VBtn, {
                            icon: "mdi-chevron-left",
                            variant: "outlined",
                            size: "small",
                            style: { color: props.slides[activeIndex.value].titleColor || "white", borderColor: props.slides[activeIndex.value].titleColor || "white" },
                            onClick: prevSlide
                          }, null, 8, ["style"]),
                          createVNode(VBtn, {
                            icon: "mdi-chevron-right",
                            variant: "outlined",
                            size: "small",
                            style: { color: props.slides[activeIndex.value].titleColor || "white", borderColor: props.slides[activeIndex.value].titleColor || "white" },
                            onClick: nextSlide
                          }, null, 8, ["style"])
                        ]),
                        createVNode("div", { class: "d-flex align-center gap-4 flex-grow-1 ml-6 max-w-xs" }, [
                          createVNode("span", { class: "text-caption font-weight-bold opacity-75" }, "0" + toDisplayString(activeIndex.value + 1), 1),
                          createVNode("div", {
                            class: "flex-grow-1 bg-grey-darken-3 rounded-pill position-relative",
                            style: { "height": "2px" }
                          }, [
                            createVNode("div", {
                              class: "rounded-pill h-100 position-absolute left-0 top-0 transition-width",
                              style: {
                                width: `${(activeIndex.value + 1) / props.slides.length * 100}%`,
                                backgroundColor: props.slides[activeIndex.value].titleColor === "black" ? "black" : "#FFD700"
                              }
                            }, null, 4)
                          ]),
                          createVNode("span", { class: "text-caption font-weight-bold opacity-50" }, "0" + toDisplayString(props.slides.length), 1)
                        ])
                      ], 4)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/modernSlider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const modernSlider = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0bfa524f"]]);
export {
  modernSlider as default
};
//# sourceMappingURL=modernSlider-DcomAmUu.js.map
