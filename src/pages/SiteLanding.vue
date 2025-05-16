<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <TextBox>
        <template #title> Decoherence Archives </template>

        <template #body>
          This site provides an easy-to-use advanced search interface for Nazi forum datasets,
          including <router-link to="/iron-march?tab=about">Iron March</router-link> and
          <router-link to="/fascist-forge?tab=about">Fascist Forge</router-link>. Click on the
          <i>DATASETS</i> tab in the toolbar and select a dataset to start searching.
        </template>
      </TextBox>
    </div>
  </q-page>
</template>

<script setup>
import TextBox from '../components/TextBox.vue'
</script>
