import { p as propsFactory, z as getCurrentInstance, $ as templateRef } from "../server.mjs";
import { ref, readonly } from "vue";
const makeComponentProps = propsFactory({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function useRender(render) {
  const vm = getCurrentInstance("useRender");
  vm.render = render;
}
function useResizeObserver(callback) {
  const resizeRef = templateRef();
  const contentRect = ref();
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}
export {
  useResizeObserver as a,
  makeComponentProps as m,
  useRender as u
};
//# sourceMappingURL=resizeObserver-Bors9hmC.js.map
