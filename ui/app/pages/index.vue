<template>
  <div>
    <FixtureHeader>
      <template #title>
        <h1>Open Fixture Library</h1>
      </template>

      <DownloadButton :fixture-count="fixtureCount" button-style="home" show-help />
    </FixtureHeader>

    <h3>Create and browse fixture definitions for lighting equipment online and download them in the right format for your DMX control software!</h3>

    <p><abbr title="Open Fixture Library">OFL</abbr> collects DMX fixture definitions in a JSON format and automatically exports them to the right format for every <NuxtLink to="/about/plugins">supported lighting software</NuxtLink>. Everybody can <a href="https://github.com/OpenLightingProject/open-fixture-library/blob/master/docs/CONTRIBUTING.md">contribute</a> and help to improve! Thanks!</p>

    <div class="grid-3 centered">

      <section class="card">
        <h2>Recently updated fixtures</h2>

        <ul class="list">
          <li v-for="fixture of lastUpdated" :key="fixture.key">
            <NuxtLink
              :to="`/${fixture.key}`"
              :style="{ borderLeftColor: fixture.color }"
              class="manufacturer-color">

              {{ fixture.name }}
              <div class="hint">
                {{ fixture.action }}
                <time
                  :datetime="fixture.date.toISOString()"
                  :title="fixture.date.toISOString()">
                  {{ fixture.date.toISOString().replace(/T.*?$/, ``) }}
                </time>
              </div>

            </NuxtLink>
          </li>
        </ul>

        <NuxtLink to="/manufacturers" class="card dark blue big-button" title="Browse all fixtures by manufacturer">
          <OflSvg name="folder-multiple" />
          <h2>Browse fixtures</h2>
        </NuxtLink>
      </section>

      <section class="card">
        <h2>Recent contributors</h2>

        <ul class="list">
          <li v-for="contributor of recentContributors" :key="contributor.name">
            <NuxtLink :to="`/${contributor.latestFixtureKey}`">
              {{ contributor.name }}
              <div class="hint">
                {{ contributor.number }} fixture{{ contributor.number === 1 ? `` : `s` }}, latest: {{ contributor.latestFixtureName }}
              </div>
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink to="/fixture-editor" class="card dark light-green big-button" title="Become a top contributer yourself!">
          <OflSvg name="plus" />
          <h2>Add fixture</h2>
        </NuxtLink>
      </section>

    </div>

    <p><strong>🙏 Help wanted!</strong> There are <a href="https://github.com/OpenLightingProject/open-fixture-library/pulls?q=is%3Apr+is%3Aopen+label%3Anew-fixture+sort%3Aupdated-desc">a lot of pull requests</a> for new fixtures that are not yet reviewed and merged. Reviewing them (and maybe fixing smaller issues) helps get this number down and the number of fixtures in OFL up! See the <a href="https://github.com/OpenLightingProject/open-fixture-library/blob/master/docs/CONTRIBUTING.md#fixtures">step-by-step instructions for fixture reviews</a>.</p>

    <div class="grid-3 centered">
      <a href="https://github.com/OpenLightingProject/open-fixture-library/issues?q=is%3Aopen+is%3Aissue+-label%3Abug" rel="nofollow" class="card slim">
        <OflSvg name="lightbulb-on-outline" class="left" />
        <span>Request feature</span>
      </a>
      <a href="https://github.com/OpenLightingProject/open-fixture-library/issues?q=is%3Aopen+is%3Aissue+label%3Abug" rel="nofollow" class="card slim">
        <OflSvg name="bug" class="left" />
        <span>Report problem</span>
      </a>
      <a href="https://github.com/OpenLightingProject/open-fixture-library" class="card slim">
        <OflSvg name="github-circle" class="left" />
        <span>View source</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import register from '../../fixtures/register.json';

import DownloadButton from '../components/DownloadButton.vue';
import FixtureHeader from '../components/FixtureHeader.vue';

const runtimeConfig =  useRuntimeConfig()

// State
const lastUpdated = ref([]);
const recentContributors = ref([]);

// fixtureCount derived from static register
const fixtureCount = computed(() =>
  Object.keys(register.filesystem).filter(
    (fixtureKey) =>
      !('redirectTo' in register.filesystem[fixtureKey]) ||
      register.filesystem[fixtureKey].reason === 'SameAsDifferentBrand'
  ).length
);

// Methods
function getFixtureName(fixtureKey) {
  const manufacturerKey = fixtureKey.split('/')[0];
  const manufacturerName = manufacturers.value[manufacturerKey].name;
  const fixtureName = register.filesystem[fixtureKey].name;

  return `${manufacturerName} ${fixtureName}`;
}

// Populate lists (was created hook)
function populateFromRegister() {
  lastUpdated.value = register.lastUpdated.slice(0, 5).map((fixtureKey) => ({
    key: fixtureKey,
    name: getFixtureName(fixtureKey),
    action: register.filesystem[fixtureKey].lastAction,
    date: new Date(register.filesystem[fixtureKey].lastActionDate),
    color: register.colors[fixtureKey.split('/')[0]],
  }));

  recentContributors.value = Object.keys(register.contributors)
    .slice(0, 5)
    .map((contributor) => {
      const latestFixtureKey = getLatestFixtureKey(contributor);
      return {
        name: contributor,
        number: register.contributors[contributor].fixtures.length,
        latestFixtureKey,
        latestFixtureName: getFixtureName(latestFixtureKey),
      };
    });
}

const websiteUrl = runtimeConfig && runtimeConfig.websiteUrl ? runtimeConfig.websiteUrl : '';
  useHead({
  script: [
    {
      hid: 'websiteStructuredData',
      type: 'application/ld+json',
      json: {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        name: 'Open Fixture Library',
        url: websiteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${websiteUrl}search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    },
    {
      hid: 'organizationStructuredData',
      type: 'application/ld+json',
      json: {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: 'Open Fixture Library',
        description:
          'Create and browse fixture definitions for lighting equipment online and download them in the right format for your DMX control software!',
        url: websiteUrl,
        logo: `${websiteUrl}ofl-logo.svg`,
      },
    },
  ],
});

const { data: manufacturers } = await useAsyncData(()=>$fetch('/api/v1/manufacturers'))


// After manufacturers are available, compute lists
populateFromRegister();

// Helper (moved out of options API as a module-scoped function)
function getLatestFixtureKey(contributor) {
  return register.lastUpdated.find((key) =>
    register.contributors[contributor].fixtures.includes(key)
  );
}
</script>
