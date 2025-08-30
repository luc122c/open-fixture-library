<template>
  <div>
    <template v-if="error.statusCode === 404">
      <h1>404 – Not found</h1>
      <p>The requested page was not found. Maybe you've got the wrong URL? If not, consider <a href="https://github.com/OpenLightingProject/open-fixture-library/issues">filing a bug</a>.</p>
    </template>

    <template v-else>
      <h1>{{ error.statusCode }} – An error occurred</h1>

      <p class="error">{{ errorMessage }}</p>
      <p>Please consider <a href="https://github.com/OpenLightingProject/open-fixture-library/issues">filing a bug</a> to help resolve this issue.</p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.error {
  white-space: pre-wrap;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

// props
const props = defineProps({
  error: {
    type: [Object, Error],
    required: true,
    validator: (val) => {
      // must be an object (including Error) and have a numeric statusCode
      return val && typeof val === 'object' && 'statusCode' in val && Number.isFinite(val.statusCode);
    },
  },
});

const title = computed(() => (props.error.statusCode === 404 ? 'Not Found' : 'Error'));

// Log non-404 errors once when script runs
if ((props.error as any).statusCode !== 404) {
  // eslint-disable-next-line no-console
  console.error('Nuxt rendering error:', props.error);
}

useHead({
  title: title.value,
  meta: [
    {
      hid: 'title',
      content: title.value,
    },
  ],
});

// computed: errorMessage
const errorMessage = computed(() => {
  const e: any = props.error;
  if (e.response && e.response.data && e.response.data.error) {
    return e.response.data.error;
  }
  return e.message;
});
</script>

