<template>
  <TextBox>
    <template #title> About <i>FashyLeaks</i> </template>

    <template #body>
      The goal of this website is to provide a search interface for Nazi forum datasets, including
      <router-link to="/iron-march?tab=about">Iron March</router-link> and
      <router-link to="/rope-culture?tab=about">Rope Culture</router-link>.
    </template>
  </TextBox>
</template>

<script setup>
import TextBox from '@/components/TextBox.vue'
</script>
