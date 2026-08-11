import { a8 as useRoute } from "../server.mjs";
import { ref } from "vue";
const __variableDynamicImportRuntimeHelper = (glob$1, path$13, segs) => {
  const v = glob$1[path$13];
  if (v) return typeof v === "function" ? v() : Promise.resolve(v);
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path$13 + (path$13.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
const useTrans = () => {
  const route = useRoute();
  const locale = route.params.lang || "en";
  const t = ref({});
  const loadTranslations = async () => {
    try {
      const messages = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en-ceHDo1LQ.js"), "../locales/fa.json": () => import("./fa-DAJmBEZB.js") }), `../locales/${locale}.json`, 3);
      t.value = messages.default;
    } catch (e) {
      console.error(`Could not load translations for ${locale}`, e);
      const fallback = await import("./en-ceHDo1LQ.js");
      t.value = fallback.default;
    }
  };
  loadTranslations();
  return { t };
};
export {
  useTrans as u
};
//# sourceMappingURL=useTrans-CtYIwtZX.js.map
