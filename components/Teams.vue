<template>
  <div class="teamsArea">
    <div class="teams">
      <nuxt-link
        v-for="team in teams"
        :key="team.profile.abbr"
        :to="`team/${team.profile.code}`"
        class="team"
      >
        <img
          :src="`https://tw.global.nba.com/media/img/teams/00/logos/${team.profile.abbr}_logo.svg`"
        />
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import nbaApi from '../api/nbaApi'
export default {
  data() {
    return {
      teams: [],
    }
  },
  async fetch() {
    await this.test()
  },
  methods: {
    async test() {
      const res = await nbaApi.getAllTeams()
      this.teams = res.payload.listGroups.reduce((acc, key) => {
        return [...acc, ...key.teams]
      }, [])
    },
  },
}
</script>

<style lang="scss" scoped>
.teamsArea {
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url('https://i.redd.it/m6up7z4yphh31.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgb(36, 36, 36);
  background-blend-mode: multiply;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .teams {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    padding: 1rem;
    gap: 1rem;
    overflow-y: auto;
    .team {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15%;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
        transition: all 0.2s ease-in-out;
      }
      img {
        width: 108px;
        height: auto;
      }
      @media (max-width: 800px) {
        width: 30%;
      }
      @media (max-width: 500px) {
        width: 40%;
      }
    }
  }
}
</style>
