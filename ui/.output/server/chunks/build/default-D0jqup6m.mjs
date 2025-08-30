import { defineComponent, ref, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const isBrowser = ref(false);
    const isTouchScreen = ref(false);
    ref(0);
    const content = ref(null);
    const focusContent = () => {
      content.value?.focus();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeaderBar = resolveComponent("HeaderBar");
      const _component_ClimateStrikeBanner = resolveComponent("ClimateStrikeBanner");
      const _component_Nuxt = resolveComponent("Nuxt");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "ofl-root",
        class: {
          js: unref(isBrowser),
          "no-js": !unref(isBrowser),
          touch: unref(isTouchScreen),
          "no-touch": !unref(isTouchScreen)
        }
      }, _attrs))} data-v-554d4a09><a href="#content" class="accessibility" data-v-554d4a09>Skip to content</a>`);
      _push(ssrRenderComponent(_component_HeaderBar, {
        onFocusContent: ($event) => focusContent()
      }, null, _parent));
      _push(`<div id="content" tabindex="-1" data-v-554d4a09>`);
      _push(ssrRenderComponent(_component_ClimateStrikeBanner, null, null, _parent));
      _push(ssrRenderComponent(_component_Nuxt, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-554d4a09"]]);

export { _default as default };
//# sourceMappingURL=default-D0jqup6m.mjs.map
