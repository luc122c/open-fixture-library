import { defineComponent, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './composables-BbTKwejP.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {
      type: [Object, Error],
      required: true,
      validator: (val) => {
        return val && typeof val === "object" && "statusCode" in val && Number.isFinite(val.statusCode);
      }
    }
  },
  setup(__props) {
    const props = __props;
    const title = computed(() => props.error.statusCode === 404 ? "Not Found" : "Error");
    if (props.error.statusCode !== 404) {
      console.error("Nuxt rendering error:", props.error);
    }
    useHead({
      title: title.value,
      meta: [
        {
          hid: "title",
          content: title.value
        }
      ]
    });
    const errorMessage = computed(() => {
      const e = props.error;
      if (e.response && e.response.data && e.response.data.error) {
        return e.response.data.error;
      }
      return e.message;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-40298a62>`);
      if (__props.error.statusCode === 404) {
        _push(`<!--[--><h1 data-v-40298a62>404 – Not found</h1><p data-v-40298a62>The requested page was not found. Maybe you&#39;ve got the wrong URL? If not, consider <a href="https://github.com/OpenLightingProject/open-fixture-library/issues" data-v-40298a62>filing a bug</a>.</p><!--]-->`);
      } else {
        _push(`<!--[--><h1 data-v-40298a62>${ssrInterpolate(__props.error.statusCode)} – An error occurred</h1><p class="error" data-v-40298a62>${ssrInterpolate(errorMessage.value)}</p><p data-v-40298a62>Please consider <a href="https://github.com/OpenLightingProject/open-fixture-library/issues" data-v-40298a62>filing a bug</a> to help resolve this issue.</p><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-40298a62"]]);

export { error as default };
//# sourceMappingURL=error-hfXDv44M.mjs.map
