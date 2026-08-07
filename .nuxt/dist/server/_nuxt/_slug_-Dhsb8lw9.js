import { defineComponent, ref, computed, withAsyncContext, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { u as useAsyncData, H as Header1, a as Header1Mobile, V as VContainer, R as Render } from "./asyncData-utIt_h6-.js";
import { F as FavAndbasketIcons } from "./favAndbasketIcons-Bj3YvgOV.js";
import { f as useDisplay, b as useRuntimeConfig } from "../server.mjs";
import { u as useHead, a as useSeoMeta } from "./composables-BSyjzoin.js";
import "./resizeObserver-Bors9hmC.js";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const config = useRuntimeConfig();
    const { mdAndUp } = useDisplay();
    const isLoading = ref(true);
    const langParam = computed(() => route.params.lang?.toString() || "en");
    const slugParam = computed(() => route.params.slug?.toString() || "");
    const [
      { data: languages },
      { data: settingsData },
      { data: rowsData },
      { data: footerData },
      { data: header },
      { data: menu }
    ] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      useAsyncData("languages", () => $fetch(`/api/languages`, { baseURL: config.public.baseUrl })),
      useAsyncData(`settings-${slugParam.value}`, () => $fetch(`/api/pages/get/title/${slugParam.value}`, { baseURL: config.public.baseUrl })),
      useAsyncData(`rows-${slugParam.value}`, () => $fetch(`/api/pages/rows/title/${slugParam.value}`, { baseURL: config.public.baseUrl })),
      useAsyncData(`footer-${langParam.value}`, () => $fetch(`/api/pages/rows/0-footer-${langParam.value}`, { baseURL: config.public.baseUrl })),
      useAsyncData(`header-data-${langParam.value}`, () => $fetch(`/api/pages/rows/0-header-${langParam.value}`, { baseURL: config.public.baseUrl }).then((r) => r.data || [])),
      useAsyncData("menu-data", () => $fetch(`/api/menus/get`, { baseURL: config.public.baseUrl }).then((r) => r.data || []))
    ])), __temp = await __temp, __restore(), __temp);
    const locale = computed(() => settingsData.value?.data?.lang || langParam.value);
    const isRtl = computed(() => locale.value === "fa" || locale.value === "ar");
    const pageSettings = computed(() => ({
      title: settingsData.value?.data?.title ?? "",
      theme: settingsData.value?.data?.nav_theme ?? "light",
      margin_top: settingsData.value?.data?.margin_top ?? "0px",
      seo_title: settingsData.value?.data?.seo_title ?? "",
      seo_description: settingsData.value?.data?.seo_description ?? "",
      related_pages: settingsData.value?.data?.related_pages ?? []
    }));
    useHead({
      htmlAttrs: {
        lang: () => locale.value,
        dir: () => isRtl.value ? "rtl" : "ltr"
      },
      link: () => isRtl.value ? [{ id: "rtl-stylesheet", rel: "stylesheet", href: "/css/rtl.css" }] : []
    });
    useSeoMeta({
      title: () => pageSettings.value.seo_title || pageSettings.value.title,
      description: () => pageSettings.value.seo_description
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(isLoading)) {
        _push(`<div class="${ssrRenderClass(["page-loading", !unref(isLoading) ? "hideLoadingEffect" : ""])}"><div class="spinner"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(languages)) {
        _push(`<!--[-->`);
        if (unref(mdAndUp)) {
          _push(ssrRenderComponent(Header1, {
            theme: unref(pageSettings).theme,
            header: unref(header),
            menu: unref(menu),
            languages: unref(languages),
            related_pages: unref(pageSettings).related_pages,
            locale: unref(locale)
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(Header1Mobile, {
            theme: unref(pageSettings).theme,
            rows: unref(header),
            menu: unref(menu),
            languages: unref(languages),
            related_pages: unref(pageSettings).related_pages,
            locale: unref(locale)
          }, null, _parent));
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(VContainer, {
        fluid: "",
        class: "pa-0 d-flex flex-column"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Render, {
              rows: unref(rowsData)?.data ?? [],
              "margin-top": unref(pageSettings).margin_top,
              locale: unref(locale)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(Render, {
                rows: unref(rowsData)?.data ?? [],
                "margin-top": unref(pageSettings).margin_top,
                locale: unref(locale)
              }, null, 8, ["rows", "margin-top", "locale"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Render, {
        rows: unref(footerData)?.data ?? [],
        "margin-top": "0px",
        is_footer: "is_footer",
        locale: unref(locale)
      }, null, _parent));
      _push(ssrRenderComponent(FavAndbasketIcons, { locale: unref(locale) }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[lang]/[pre2]/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-Dhsb8lw9.js.map
