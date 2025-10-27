<template>
  <TextBox>
    <template #title> About FashyLeaks </template>

    <template #body>
      <p>
        FashyLeaks is a search interface for Nazi forum scrapes and leaked databases, developed by
        <a href="https://decoherence.media">Decoherence Media</a>. It currently includes the
        <router-link to="/iron-march?tab=about">Iron March</router-link> and
        <router-link to="/rope-culture?tab=about">Rope Culture</router-link> datasets, with many
        more to come.
      </p>
      <p>
        Our gratitude goes out to the researchers and journalists who helped us test out this tool,
        providing useful feedback and encouragement.
      </p>
      <p>
        Decoherence Media has made enhancements to the Iron March database, incorporating additional
        messages, posts, and users by merging files and including additional sources, like snapshots
        from the Internet Archive's <a href="https://web.archive.org/">Wayback Machine</a>.
      </p>
      <p>
        To help familiarize yourself with the site, read our
        <a href="https://decoherence.media/how-to-use-fashyleaks">written guide</a> or watch our
        <a href="https://youtu.be/8PlJTWg6Jkg">video guide</a>.
      </p>
      <p>
        The source code for FashyLeaks's frontend, backend, and data pre-processing can be found on
        Decoherence Media's <a href="https://github.com/decoherencemedia/">GitHub page</a>. If you
        have questions about how to use it, notice a bug, or have an idea for how to improve any
        part of FashyLeaks, you can create an issue on our GitHub page, or
        <a href="https://decoherence.media/contact">contact</a> Decoherence Media. We also encourage
        you to contact us if you know of or possess a dataset you think would be a good fit for
        FashyLeaks.
      </p>
      <p>
        If you want the data itself, you can download the latest version of the
        <a href="http://static.fashyleaks.com/database/fashyleaks_latest.pgsql"
          >FashyLeaks database dump</a
        >. Please use the database dump instead of scraping the site or using our API.
      </p>
    </template>
  </TextBox>
</template>

<script setup>
import TextBox from '@/components/TextBox.vue'
</script>
