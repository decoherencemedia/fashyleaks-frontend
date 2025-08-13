<template>
  <div class="row justify-center">
    <TextBox>
      <template #title>Welcome to FashyLeaks</template>

      <template #body>
        <i>FashyLeaks</i> provides a search interface for Nazi forum datasets, including
        <router-link to="/iron-march?tab=about">Iron March</router-link> and
        <router-link to="/rope-culture?tab=about">Rope Culture</router-link>. Click on one of the
        datasets below to start searching.
      </template>
    </TextBox>
  </div>
  <div class="row justify-center q-gutter-md q-mx-xl q-mt-lg">
    <DatasetButton dataset="iron-march" />
    <DatasetButton dataset="rope-culture" />
  </div>
</template>

<script setup>
import TextBox from '@/components/TextBox.vue'
import DatasetButton from '@/components/DatasetButton.vue'
</script>
