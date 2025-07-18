<template>
  <div class="row justify-center q-mt-xl q-px-md">
    <q-card
      class="q-pa-md about-card"
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

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

.about {
  text-align: justify;
  text-justify: inter-word;
}

.about-card {
    max-width: 750px;
    border: 1px solid $border-color;
}

::v-deep(.about ul) {
  text-align: left !important;
  text-justify: none !important;
}
</style>
