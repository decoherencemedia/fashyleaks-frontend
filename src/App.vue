<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn no-caps flat stretch to="/" title="Decoherence Archive Home">
      <q-toolbar-title class="text-accent"> Decoherence Archive </q-toolbar-title>
    </q-btn>

    <q-space />
    <q-btn-dropdown
      stretch
      flat
      label="Datasets"
      title="Search a dataset"
      menu-anchor="bottom start"
      menu-self="top start"
      class="text-accent"
      style="letter-spacing: 0.0892857143em; font-weight: 400"
    >
      <q-list>
        <q-item
          v-for="item in menuItems"
          :key="item.title"
          clickable
          v-close-popup
          tabindex="0"
          :to="item.path"
          :title="`Search ${item.title} dataset`"
        >
          <q-item-section side>
            <component :is="item.icon" color="secondary" size="2rem" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn
      class="text-accent"
      stretch
      flat
      label="About"
      to="/about"
      title="Acout Decoherence Archive"
    >
    </q-btn>
    <q-btn
      stretch
      flat
      href="https://github.com/decoherencemedia/fashdata-frontend"
      target="_blank"
      aria-label="Decoherence Archive on GitHub"
      title="Decoherence Archive on GitHub"
    >
      <q-icon color="accent">
        <svg width="98" height="96" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="accent"
          />
        </svg>
      </q-icon>
    </q-btn>
  </q-toolbar>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view :key="$route.path" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import IronMarchIcon from '@/components/icons/IronMarchIcon.vue'
import FascistForgeIcon from '@/components/icons/FascistForgeIcon.vue'
import RopeCultureIcon from '@/components/icons/RopeCultureIcon.vue'

const menuItems = [
  {
    title: 'Iron March',
    path: '/iron-march',
    tooltip: 'Search Iron March data',
    icon: IronMarchIcon,
  },
  {
    title: 'Fascist Forge',
    path: '/fascist-forge',
    tooltip: 'Search Fascist Forge data',
    icon: FascistForgeIcon,
  },
  {
    title: 'Rope Culture',
    path: '/rope-culture',
    tooltip: 'Search Rope Culture data',
    icon: RopeCultureIcon,
  },
]
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
