<template>
  <div class="row justify-center q-mt-xl q-px-md">
    <q-card
      class="q-pa-md"
      style="width: 100%; max-width: 750px; border: 1px solid rgba(0, 0, 0, 0.24)"
      flat
      bordered
    >
      <div class="text-h6 text-center text-weight-bold q-mb-md">
        <slot name="title" />
      </div>
      <div class="text-body1 about" style="font-weight: 300">
        <slot name="body" />
      </div>
    </q-card>
  </div>
</template>

<script setup></script>

<style scoped>
.about {
  text-align: justify;
  text-justify: inter-word;
}

::v-deep(.about ul) {
  text-align: left !important;
  text-justify: none !important;
}
</style>
