<template>
  <q-page>
    <div class="row justify-center">
      <TextBox>
        <template #title>About Rope Culture</template>

        <template #body>
          FascistForge.com was a neo-Nazi forum founded by American
          <a href="https://www.adl.org/resources/backgrounders/the-base">Base</a>
          member
          <a href="https://www.bbc.com/news/uk-53128169">Matthew Baccari</a>
          (under the alias <i>Mathias</i>) in May 2018. Fascist Forge never achieved the influence
          or notoriety of its presecessor forum
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
              >): member of The Base, charged with conspiracy murder
            </li>
          </ul>
          <br />
          For more information about Fascist Forge, see these links:
          <ul class="margin-left">
            <li>
              <a href="https://www.tandfonline.com/doi/full/10.1080/19434472.2020.1850842"
                >Fascist aspirants: Fascist Forge and ideological learning in the extreme-right
                online milieu</a
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
          <br />
          To get the raw data of the Fascist Forge scrape, clone or download Rope Culture was
          <router-link to="/iron-march?tab=about">Iron March's</router-link>
          in-house online magazine. Prominent Iron March users wrote articles and contributed to
          Rope Culture, providing more in-depth and longer-form content than is available from forum
          posts. <br /><br />
          Prominent authors of Rope Culture:
          <ul class="margin-left">
            <li>
              <a href="https://www.bbc.com/russian/features-51301305">Alisher Mukhitdinov</a>
              (<router-link to="/rope-culture?tab=users&id=1"> <i>Alexander Slavros</i></router-link
              >): creator and admin of Iron March
            </li>
            <li>
              <a
                href="https://www.splcenter.org/hatewatch/2018/05/04/prolific-neo-nazi-propagandist-zeiger-outed-montreal-based-gabriel-sohier-chaput"
                >Gabriel Sohier Chaput</a
              >
              (<router-link to="/rope-culture?tab=users&id=3"><i>Zeiger</i></router-link
              >): influential Canadian Nazi
            </li>
            <li>
              <a href="https://discordleaks.unicornriot.ninja/discord/user/2305">Max Macro</a>
              (<router-link to="/rope-culture?tab=users&id=12"><i>Max Macro</i></router-link
              >): treasurer for Traditionalist Worker Party
            </li>
          </ul>
          <br />
          For more information about Rope Culture, see these links:
          <ul class="margin-left">
            <li>
              <a
                href="https://angrywhitemen.org/2016/06/19/neo-fascist-web-zine-advocates-exterminating-the-jews/"
                >Neo-Fascist Web-Zine Advocates Exterminating the Jews
              </a>
            </li>
            <li>
              <a
                href="https://www.splcenter.org/hatewatch/2019/02/15/visions-chaos-weighing-violent-legacy-iron-march"
                >Visions of Chaos: Weighing the Violent Legacy of Iron March
              </a>
            </li>
          </ul>
          <br />
          <!-- To get the raw data of the Rope Server scrape, open <a href="magnet:?xt=urn:btih:1d0554862068bfaba9bd2fc6f75cb69fa420c834">this magnet link</a> in a torrent client, and download and extract the file <code>The Archives/Iron March - NOOSE Backups/Iron March - Rope Culture Website Backups/Iron March - Rope Culture Backups/backup-11.24.2017_05-21-11_ropecult.tar.gz</code>. -->
        </template>
      </TextBox>
    </div>
  </q-page>
</template>

<script setup>
import TextBox from '../../components/TextBox.vue'
</script>
