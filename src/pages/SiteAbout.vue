<template>
  <q-page>
    <TextBox>
      <template #title> About <i>Decoherence Archives</i> </template>

      <template #body>
        The goal of this website is to provide an easy-to-use advanced search interface for Nazi
        forum datasets, including
        <router-link to="/iron-march?tab=about">Iron March</router-link> and
        <router-link to="/fascist-forge?tab=about">Fascist Forge</router-link>.
      </template>
    </TextBox>
  </q-page>
</template>

<script setup>
import TextBox from '../components/TextBox.vue'
</script>
