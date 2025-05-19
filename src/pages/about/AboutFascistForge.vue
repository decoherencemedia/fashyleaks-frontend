<template>
  <div class="row justify-center">
    <TextBox>
      <template #title>About Fascist Forge</template>

      <template #body>
        FascistForge.com was a neo-Nazi forum founded by American
        <a href="https://www.adl.org/resources/backgrounders/the-base">Base</a>
        member
        <a href="https://www.bbc.com/news/uk-53128169">Matthew Baccari</a>
        (under the alias <i>Mathias</i>) in May 2018. Fascist Forge never achieved the influence or
        notoriety of its predecessor forum
        <router-link to="/iron-march?tab=about">Iron March</router-link>, and was taken offline in
        late February 2020 after the
        <a
          href="https://www.justice.gov/usao-edva/pr/former-atomwaffen-division-leader-arrested-swatting-conspiracy"
          >arrests</a
        >
        of several prominent Base and Atomwaffen members, including
        <router-link to="/iron-march?tab=users&id=13353">Rape</router-link> and Krokodil.
        <br /><br />
        Prominent users of Fascist Forge:
        <ul class="margin-left">
          <li>
            <a href="https://www.bbc.com/news/uk-53128169">Matthew Baccari</a>
            (<router-link to="/fascist-forge?tab=users&id=1"><i>Mathias</i></router-link
            >): creator and admin of Fascist Forge, member of The Base
          </li>
          <li>
            <a
              href="https://www.washingtonpost.com/national-security/2020/01/18/the-base-white-supremacist-arrests/"
              >Jacob Kaderli</a
            >
            (<router-link to="/fascist-forge?tab=users&id=232"><i>Pestilence</i></router-link
            >): member of The Base, charged with conspiracy to commit murder
          </li>
        </ul>
        For more information about Fascist Forge, see these links:
        <ul class="margin-left">
          <li>
            <a href="https://www.tandfonline.com/doi/full/10.1080/19434472.2020.1850842"
              >Fascist aspirants: Fascist Forge and ideological learning in the extreme-right online
              milieu</a
            >
          </li>
          <li>
            <a href="https://www.adl.org/blog/fascist-forge-a-new-forum-for-hate"
              >Fascist Forge: A New Forum for Hate</a
            >
          </li>
          <li>
            <a href="https://www.gaiusgracch.us/fascist-forge/">Fascist Forge Scraping</a>
          </li>
        </ul>
        To get the raw data of the Fascist Forge scrape, clone or download
        <a href="https://github.com/gaius-gracchus/FascistForge">this GitHub repo</a>.
      </template>
    </TextBox>
  </div>
</template>

<script setup>
import TextBox from '@/components/TextBox.vue'
</script>
