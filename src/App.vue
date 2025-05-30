<template>
  <!-- Mobile toolbar -->
  <q-toolbar v-if="$q.platform.is.mobile" class="bg-primary text-accent">
    <q-btn no-caps flat stretch to="/" title="Decoherence Archive Home" class="q-px-none">
      <img src="@/assets/logo.svg" alt="icon" style="height: 50px" />
    </q-btn>
    <q-space> </q-space>
    <q-btn flat round dense icon="menu" stretch tab aria-label="Menu">
      <q-menu style="min-width: auto; white-space: nowrap">
        <q-list>
          <q-item
            v-for="item in menuItems"
            :key="item.title"
            clickable
            v-close-popup
            :to="item.path"
            :title="`Search ${item.title} dataset`"
            class="q-px-xl"
          >
            <q-item-section side class="q-mr-lg">
              <component :is="item.icon" color="primary" size="2rem" />
            </q-item-section>
            <q-item-section>
              <q-item-label
                class="text-primary"
                style="text-transform: uppercase; font-weight: 400"
                >{{ item.title }}</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-separator color="grey-6" />
          <q-item
            to="/about"
            class="text-primary justify-center"
            style="text-transform: uppercase; font-weight: 400; white-space: nowrap"
          >
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
      </q-menu>
    </q-btn>
  </q-toolbar>
  <!-- Non-mobile toolbar -->
  <q-toolbar v-else class="bg-primary">
    <q-btn flat to="/">
      <img src="@/assets/logo.svg" alt="icon" style="height: 50px" />
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
          class="q-px-xl"
        >
          <q-item-section side class="q-mr-lg">
            <component :is="item.icon" color="primary" size="1.5rem" />
          </q-item-section>
          <q-item-section>
            <q-item-label
              class="text-primary"
              style="text-transform: uppercase; font-weight: 400"
              >{{ item.title }}</q-item-label
            >
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

  <router-view :key="$route.path" />
</template>

<script setup>
import IronMarchIcon from '@/components/icons/IronMarchIcon.vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'

const menuItems = [
  {
    title: 'Iron March',
    path: '/iron-march',
    tooltip: 'Search Iron March data',
    icon: IronMarchIcon,
  },
]
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.1);
}

/* .q-btn {
  font-weight: 400;
  letter-spacing: 0.0892857143em;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
} */
</style>
