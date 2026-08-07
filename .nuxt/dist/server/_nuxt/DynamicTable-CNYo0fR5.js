import { createVNode, normalizeStyle, normalizeClass, createElementVNode, defineComponent, computed, mergeProps, withCtx, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { u as useRender, m as makeComponentProps } from "./resizeObserver-Bors9hmC.js";
import { F as useDensity, h as makeTagProps, X as makeDensityProps } from "./asyncData-utIt_h6-.js";
import { g as genericComponent, x as provideTheme, j as convertToUnit, p as propsFactory, w as makeThemeProps, _ as _export_sfc } from "../server.mjs";
import "C:/nuxt/codentral/node_modules/hookable/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/perfect-debounce/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/nuxt/codentral/node_modules/unctx/dist/index.mjs";
import "C:/nuxt/codentral/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/nuxt/codentral/node_modules/defu/dist/defu.mjs";
import "C:/nuxt/codentral/node_modules/ufo/dist/index.mjs";
const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  striped: {
    type: String,
    default: null,
    validator: (v) => ["even", "odd"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VTable");
const VTable = genericComponent()({
  name: "VTable",
  props: makeVTableProps(),
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-table", {
        "v-table--fixed-height": !!props.height,
        "v-table--fixed-header": props.fixedHeader,
        "v-table--fixed-footer": props.fixedFooter,
        "v-table--has-top": !!slots.top,
        "v-table--has-bottom": !!slots.bottom,
        "v-table--hover": props.hover,
        "v-table--striped-even": props.striped === "even",
        "v-table--striped-odd": props.striped === "odd"
      }, themeClasses.value, densityClasses.value, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.top?.(), slots.default ? createElementVNode("div", {
        "class": "v-table__wrapper",
        "style": {
          height: convertToUnit(props.height)
        }
      }, [createElementVNode("table", null, [slots.default()])]) : slots.wrapper?.(), slots.bottom?.()]
    }));
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DynamicTable",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    const props = __props;
    const tableHeaders = computed(() => {
      return typeof props.data.headers === "string" ? JSON.parse(props.data.headers) : props.data.headers;
    });
    const tableRows = computed(() => {
      return typeof props.data.rows === "string" ? JSON.parse(props.data.rows) : props.data.rows;
    });
    const customStyle = computed(() => {
      return {
        ...props.data.padding
        // در اینجا می‌توانید منطق مدیا کوئری را برای paddingMd و paddingXl اضافه کنید
        // یا کلاس‌های شرطی وویتیفای را به المان والد بدهید
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["table-container", __props.data.animation],
        style: customStyle.value
      }, _attrs))} data-v-26823796>`);
      _push(ssrRenderComponent(VTable, { class: "custom-dynamic-table border" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<thead data-v-26823796${_scopeId}><tr data-v-26823796${_scopeId}><!--[-->`);
            ssrRenderList(tableHeaders.value, (header, index) => {
              _push2(`<th class="text-right font-weight-bold bg-grey-lighten-4" data-v-26823796${_scopeId}>${ssrInterpolate(header)}</th>`);
            });
            _push2(`<!--]--></tr></thead><tbody data-v-26823796${_scopeId}><!--[-->`);
            ssrRenderList(tableRows.value, (row, rowIndex) => {
              _push2(`<tr data-v-26823796${_scopeId}><!--[-->`);
              ssrRenderList(row, (cell, cellIndex) => {
                _push2(`<td class="text-right" data-v-26823796${_scopeId}>${ssrInterpolate(cell)}</td>`);
              });
              _push2(`<!--]--></tr>`);
            });
            _push2(`<!--]--></tbody>`);
          } else {
            return [
              createVNode("thead", null, [
                createVNode("tr", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(tableHeaders.value, (header, index) => {
                    return openBlock(), createBlock("th", {
                      key: index,
                      class: "text-right font-weight-bold bg-grey-lighten-4"
                    }, toDisplayString(header), 1);
                  }), 128))
                ])
              ]),
              createVNode("tbody", null, [
                (openBlock(true), createBlock(Fragment, null, renderList(tableRows.value, (row, rowIndex) => {
                  return openBlock(), createBlock("tr", { key: rowIndex }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(row, (cell, cellIndex) => {
                      return openBlock(), createBlock("td", {
                        key: cellIndex,
                        class: "text-right"
                      }, toDisplayString(cell), 1);
                    }), 128))
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editorElements/elements/DynamicTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DynamicTable = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-26823796"]]), { __name: "EditorElementsElementsDynamicTable" });
export {
  DynamicTable as default
};
//# sourceMappingURL=DynamicTable-CNYo0fR5.js.map
