<template>
  <div class="row justify-center">
    <TextBox>
      <template #title>About Rope Culture</template>

      <template #body>
        Rope Culture was
        <router-link to="/iron-march?tab=about">Iron March's</router-link>
        in-house online magazine. Prominent Iron March users wrote articles and contributed to Rope
        Culture, providing more in-depth and longer-form content than is available from forum posts.
        <br /><br />
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
        To get the raw data of the Rope Server scrape, open
        <a href="magnet:?xt=urn:btih:1d0554862068bfaba9bd2fc6f75cb69fa420c834">this magnet link</a>
        in a torrent client, and download and extract the file
        <code
          >The Archives/Iron March - NOOSE Backups/Iron March - Rope Culture Website Backups/Iron
          March - Rope Culture Backups/backup-11.24.2017_05-21-11_ropecult.tar.gz</code
        >.
      </template>
    </TextBox>
  </div>
</template>

<script setup>
import TextBox from '@/components/TextBox.vue'
</script>
