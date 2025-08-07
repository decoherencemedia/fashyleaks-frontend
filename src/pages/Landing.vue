<template>
  <div class="row justify-center">
    <TextBox>
      <template #title>FashyLeaks</template>

      <template #body>
        This site provides a search interface for Nazi forum datasets, including
        <router-link to="/iron-march?tab=about">Iron March</router-link> and
        <router-link to="/fascist-forge?tab=about">Fascist Forge</router-link>. Click on the
        <i>DATASETS</i> tab in the toolbar and select a dataset to start searching.
      </template>
    </TextBox>
  </div>
  <div class="row justify-center q-gutter-md q-mx-xl q-mt-lg">
    <DatasetButton dataset="iron-march" />
    <DatasetButton dataset="rope-culture" />
    <DatasetButton dataset="fascist-forge" />
  </div>
</template>

<script setup>
import TextBox from '@/components/TextBox.vue'
import DatasetButton from '@/components/DatasetButton.vue'
</script>
