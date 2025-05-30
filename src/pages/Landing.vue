<template>
  <div class="row justify-center">
    <TextBox>
      <template #title> Decoherence Archive </template>

      <template #body>
        This site provides an easy-to-use advanced search interface for Nazi forum datasets,
        including <router-link to="/iron-march?tab=about">Iron March</router-link>. Click on the
        <i>DATASETS</i> tab in the toolbar and select a dataset to start searching.
      </template>
    </TextBox>
  </div>
  <div class="row justify-center q-gutter-md q-mx-xl q-mt-lg">
    <DatasetLink dataset="iron-march" />
  </div>
</template>

<script setup>
import TextBox from '@/components/TextBox.vue'
import DatasetLink from '@/components/DatasetLink.vue'
</script>
