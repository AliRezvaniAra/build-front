import { hasInjectionContext, inject } from "vue";
import { headSymbol, useHead as useHead$1, useSeoMeta as useSeoMeta$1 } from "C:/nuxt/codentral/node_modules/@unhead/vue/dist/index.mjs";
import { u as useNuxtApp } from "../server.mjs";
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useSeoMeta(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useSeoMeta$1(input, { head, ...options });
}
export {
  useSeoMeta as a,
  injectHead as i,
  useHead as u
};
//# sourceMappingURL=composables-BSyjzoin.js.map
