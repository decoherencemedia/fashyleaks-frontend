<template>
  <!-- Mobile toolbar -->
  <q-toolbar v-if="$q.platform.is.mobile" class="bg-primary text-accent">
    <q-btn no-caps flat stretch to="/" title="Decoherence Archive Home">
      <q-toolbar-title class="text-accent"> Decoherence Archive </q-toolbar-title>
    </q-btn>
    <q-space> </q-space>
    <q-btn-dropdown flat round dense icon="menu" dropdown-icon="none" stretch tab>
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
        <q-item to="/about" class="justify-center">
          <q-item-section class="text-center">About</q-item-section>
        </q-item>
        <q-item
          href="https://github.com/decoherencemedia/fashdata-frontend"
          class="justify-center items-center"
        >
          <q-item-section class="flex justify-center items-center">
            <git-hub-icon color="black" size="1.5em" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-toolbar>
  <!-- Non-mobile toolbar -->
  <q-toolbar v-else class="bg-primary">
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
      <git-hub-icon color="accent" size="2em" />
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
import GitHubIcon from '@/components/icons/GitHubIcon.vue'

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
