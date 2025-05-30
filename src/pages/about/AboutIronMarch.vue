<template>
  <div class="row justify-center">
    <TextBox>
      <template #title>About Iron March</template>

      <template #body>
        IronMarch.org was a neo-Nazi forum founded by Uzbek Russian
        <a href="https://www.bbc.com/russian/features-51301305">Alisher Mukhitdinov</a>
        (under the alias <i>Alexander Slavros</i>) in September 2011. It significantly influenced
        the international neo-Nazi community, acting as both a platform for fascist organizations in
        different countries (including the UK's
        <a href="https://en.wikipedia.org/wiki/National_Action_(UK)">National Action</a>,
        Lithuania's
        <a
          href="https://www.delfi.lt/en/archive/new-extreme-right-wingers-banding-together-in-lithuania-kremlin-hand-suspected.d?id=76133767"
          >Skydas</a
        >, and Australia's
        <a
          href="https://www.abc.net.au/religion/antipodean-resistance-the-rise-and-goals-of-australias-new-nazis/10094794"
          >Antipodean Resistance</a
        >) to network, and as a petri dish that created and promoted a modern syncretic National
        Socialist ideology that combines esoteric Hitlerism and accelerationism. American neo-Nazi
        terrorist organization
        <a href="https://www.splcenter.org/fighting-hate/extremist-files/group/atomwaffen-division"
          >Atomwaffen Division</a
        >
        was founded on Iron March, and used the forum to recruit new members.
        <br /><br />
        Iron March was taken offline in November 2017 under mysterious circumstances, and 2 years
        later the contents of its admin SQL database were
        <a
          href="https://www.theguardian.com/us-news/2019/nov/07/neo-nazi-site-iron-march-materials-leak"
          >leaked</a
        >, revealing all user email addresses, IP addresses, and private messages, as well as all
        posts and threads. This helped identify dozens of Iron March members (including
        <a
          href="https://www.zdnet.com/article/mysterious-hacker-dumps-database-of-infamous-ironmarch-neo-nazi-forum/"
          >a former congressional candidate from Oklahoma</a
        >
        and
        <a
          href="https://www.newsy.com/stories/we-found-more-active-duty-military-in-leaked-neo-nazi-forum/"
          >several active-duty military personnel</a
        >), and provided an unprecedented look into the mechanics and recruiting strategies of
        modern fascist organizations. <br /><br />
        Prominent users of Iron March:
        <ul class="margin-left">
          <li>
            <a href="https://www.bbc.com/russian/features-51301305">Alisher Mukhitdinov</a>
            (<router-link to="/iron-march?tab=users&id=1"> <i>Alexander Slavros</i></router-link
            >): creator and admin of Iron March
          </li>
          <li>
            <a
              href="https://www.nbcnews.com/news/us-news/florida-neo-nazi-leader-gets-5-years-having-explosive-material-n836246"
              >Brandon Russell</a
            >
            (<router-link to="/iron-march?tab=users&id=7600"><i>Odin</i></router-link
            >): founder of Atomwaffen Division, sentenced to 5 years for explosives charges
          </li>
          <li>
            <a href="https://www.rollingstone.com/politics/politics-news/all-american-nazis-628023/"
              >Devon Arthurs</a
            >
            (<router-link to="/iron-march?tab=users&id=9304"><i>The Weissewolf</i></router-link
            >): second-in-command of Atomwaffen Division, charged with 2 counts of homicide
          </li>
          <li>
            <a
              href="https://www.independent.co.uk/news/uk/crime/national-action-neo-nazi-terrorist-group-founders-trials-ben-raymond-a9430941.html"
              >Benjamin Raymond</a
            >
            (<router-link to="/iron-march?tab=users&id=7"><i>Daddy Terror</i></router-link
            >): co-founder of UK's <i>National Action</i>
          </li>
        </ul>
        For more information about Iron March and its leak, see these links:
        <ul class="margin-left">
          <li>
            <a
              href="https://www.splcenter.org/hatewatch/2019/02/15/visions-chaos-weighing-violent-legacy-iron-march"
              >Visions of Chaos: Weighing the Violent Legacy of Iron March</a
            >
          </li>
          <li>
            <a
              href="https://www.bellingcat.com/news/2019/12/19/transnational-white-terror-exposing-atomwaffen-and-the-iron-march-networks/"
              >Transnational White Terror: Exposing Atomwaffen And The Iron March Networks</a
            >
          </li>
          <li>
            <a
              href="https://www.bellingcat.com/resources/how-tos/2019/11/06/massive-white-supremacist-message-board-leak-how-to-access-and-interpret-the-data/"
              >Massive White Supremacist Message Board Leak: How to Access and Interpret the Data</a
            >
          </li>
        </ul>
        To get the raw data of the Iron March leak, download it from the
        <a href="https://archive.org/details/iron_march_201911_backup">Internet Archive</a>
        or <a href="https://ddosecrets.com/wiki/Iron_March">DDoSecrets</a>.
      </template>
    </TextBox>
  </div>
</template>

<script setup>
import TextBox from '@/components/TextBox.vue'
</script>
