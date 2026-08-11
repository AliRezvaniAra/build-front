import { createVNode, mergeProps, createElementVNode, withDirectives, vShow, defineComponent, computed, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { b as useBackgroundColor, c as useRounded, d as useTextColor, e as useLocation, f as useDimension, m as makeDimensionProps, g as makeTransitionProps, h as makeTagProps, i as makeRoundedProps, j as makeLocationProps, M as MaybeTransition, k as VIcon, l as useShopLocal, n as VBtn } from "./asyncData-BoxtDLvH.js";
import { u as useRender, m as makeComponentProps } from "./resizeObserver-Bors9hmC.js";
import { g as genericComponent, a6 as useLocale, E as useTheme, p as propsFactory, w as makeThemeProps, I as IconValue, a7 as pickWithRest, _ as _export_sfc } from "../server.mjs";
const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: "scale-rotate-transition"
  }),
  ...makeDimensionProps()
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.textColor);
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? Number(props.offsetY ?? 0) : ["left", "right"].includes(side) ? Number(props.offsetX ?? 0) : 0);
    });
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= Number(props.max) ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => [createElementVNode("div", {
          "class": "v-badge__wrapper"
        }, [ctx.slots.default?.(), createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [withDirectives(createElementVNode("span", mergeProps({
            "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
            "style": [backgroundColorStyles.value, textColorStyles.value, dimensionStyles.value, props.inline ? {} : locationStyles.value],
            "aria-atomic": "true",
            "aria-label": t(props.label, value),
            "aria-live": "polite",
            "role": "status"
          }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? ctx.slots.badge?.() : props.icon ? createVNode(VIcon, {
            "icon": props.icon
          }, null) : content]), [[vShow, props.modelValue]])]
        })])]
      });
    });
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "favAndbasketIcons",
  __ssrInlineRender: true,
  props: {
    locale: {}
  },
  setup(__props) {
    const { favorites, cart, cartItemCount } = useShopLocal();
    const hasFavorites = computed(() => favorites.value.length > 0);
    const hasBasketItems = computed(() => cart.value.length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(hasFavorites)) {
        _push(ssrRenderComponent(VBtn, {
          icon: "",
          class: "fixed-icon fav-btn",
          elevation: "8",
          to: `/${__props.locale}/favorites`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VBadge, {
                color: "pink-lighten-1",
                content: unref(favorites).length,
                "offset-x": "-6",
                "offset-y": "-6"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, {
                      size: "22",
                      color: "pink-lighten-1"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-heart`);
                        } else {
                          return [
                            createTextVNode("mdi-heart")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VIcon, {
                        size: "22",
                        color: "pink-lighten-1"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-heart")
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
                createVNode(VBadge, {
                  color: "pink-lighten-1",
                  content: unref(favorites).length,
                  "offset-x": "-6",
                  "offset-y": "-6"
                }, {
                  default: withCtx(() => [
                    createVNode(VIcon, {
                      size: "22",
                      color: "pink-lighten-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-heart")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["content"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(hasBasketItems)) {
        _push(ssrRenderComponent(VBtn, {
          icon: "",
          class: "fixed-icon basket-btn",
          elevation: "8",
          to: `/${__props.locale}/basket`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VBadge, {
                color: "deep-orange-accent-3",
                content: unref(cartItemCount),
                "offset-x": "-6",
                "offset-y": "-6"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, {
                      size: "22",
                      color: "primary"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-cart-variant`);
                        } else {
                          return [
                            createTextVNode("mdi-cart-variant")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VIcon, {
                        size: "22",
                        color: "primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-cart-variant")
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
                createVNode(VBadge, {
                  color: "deep-orange-accent-3",
                  content: unref(cartItemCount),
                  "offset-x": "-6",
                  "offset-y": "-6"
                }, {
                  default: withCtx(() => [
                    createVNode(VIcon, {
                      size: "22",
                      color: "primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-cart-variant")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["content"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/favAndbasketIcons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FavAndbasketIcons = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-0f8dd7e9"]]), { __name: "EditorElementsElementsFavAndbasketIcons" });
export {
  FavAndbasketIcons as F
};
//# sourceMappingURL=favAndbasketIcons-C2ijvWaG.js.map
