<template>
  <div>
    <h1 class="header">
      {{ `${teamInfo.city} ${teamInfo.name} Roster` }}
    </h1>
    <div class="teamRoster">
      <nuxt-link
        v-for="player in players"
        :key="player.profile.displayName"
        :to="`/player/${player.profile.code}`"
        class="card"
        :style="{
          'background-image': `url(https://cdn.nba.com/headshots/nba/latest/1040x760/${player.profile.playerId}.png)`,
          display: `${!player.profile.jerseyNo ? 'none' : null}`,
        }"
      >
        <div class="border">
          <div class="info">
            <div class="number">
              {{ player.profile.jerseyNo }}
            </div>
            <h2 class="name">
              <span>{{ player.profile.firstName }}</span>
              <span>{{ player.profile.lastName }}</span>
            </h2>
          </div>
          <div class="stats">
            <div class="item">
              <span>Position: </span>
              <span>
                {{ player.profile.position }}
              </span>
            </div>
            <div class="item">
              <span>Years Pro: </span>
              <span>
                {{ player.profile.experience }}
              </span>
            </div>
            <div class="item">
              <span>Height: </span>
              <span> {{ player.profile.height }} m </span>
            </div>
            <div class="item">
              <span>Weight: </span>
              <span>
                {{ player.profile.weight }}
              </span>
            </div>
            <div class="item">
              <span>From: </span>
              <span>
                {{ player.profile.country }}
              </span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import nbaApi from '~/api/nbaApi'

export default {
  async asyncData(context) {
    const { teamId } = context.route.params
    const res = await nbaApi.getTeamPlayers({ team: teamId })
    return { players: res.payload.players, teamInfo: res.payload.profile }
  },
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin: 5rem 0 3rem 0;
  padding: 1rem;
  word-break: break-word;
  @media (max-width: 800px) {
    margin: 5rem 0 1rem 0;
  }
}
.teamRoster {
  display: flex;
  flex-wrap: wrap;
  padding: 3rem;
  gap: 2rem;
  justify-content: center;

  .card {
    height: 253px;
    width: 346px;
    border-radius: 10px;
    transition: background 0.8s;
    overflow: hidden;
    box-shadow: 0 70px 63px -60px #000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    &:hover {
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position-x: 173px;
      background-color: #fff;
      .border {
        .info * {
          color: #000;
        }
        .stats {
          opacity: 0.5;
          color: #000;
        }
      }
    }
    .border {
      height: 253px;
      width: 346px;
      background: transparent;
      border-radius: 10px;
      transition: border 1s;
      position: relative;

      &:hover {
        border: 1px solid #fff;
      }
      .stats {
        opacity: 0;
        transition: opacity 0.3s;
        padding: 4px;
        padding-left: 16px;
        .item {
          span:first-child {
            font-weight: bolder;
          }
        }
      }
      .info {
        display: flex;
        align-items: center;
        width: 50%;
        opacity: 0.5;
        padding: 4px;

        .number {
          font-size: 3rem;
          position: relative;
          margin-right: 16px;
          &::before {
            content: '';
            position: absolute;
            width: 1px;
            background: rgba(85, 85, 85, 0.534);
            right: -8px;
            top: 50%;
            transform: translateY(-50%);
            height: 3rem;
          }
        }
        .name {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          color: #fff;
          font-size: 1.25rem;
        }
      }
    }
  }
}
</style>
