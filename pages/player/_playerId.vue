<template>
  <div
    v-if="!$fetchState.pending && !$fetchState.error && playerData.player"
    class="playerInfo"
  >
    <section class="topHead">
      <figure
        class="posterBackground"
        :style="{
          'background-image': `url(https://cdn.nba.com/headshots/nba/latest/1040x760/${playerData.player.playerProfile.playerId}.png)`,
        }"
      ></figure>
      <div class="playerInfoHolder">
        <div class="playerInfoHeader">
          <div class="playerInfoNumber">
            {{ playerData.player.playerProfile.jerseyNo }}
          </div>
          <div class="playerInfoPosition">
            {{ playerData.player.playerProfile.position }}
          </div>
        </div>
        <h2 class="playerName">
          <span>{{ playerData.player.playerProfile.firstName }}</span>
          <span>{{ playerData.player.playerProfile.lastName }}</span>
        </h2>
        <figure class="posterInline">
          <img
            :src="`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerData.player.playerProfile.playerId}.png`"
          />
        </figure>
        <div class="playerAwards">
          <span
            v-for="(count, award) in playerAwards"
            :key="award"
            class="award"
          >
            {{ `${count}x ${award}` }}
          </span>
        </div>
      </div>
    </section>
    <section class="info">
      <div class="playerInfoTable">
        <ul class="infoList">
          <li>
            <span>Position</span
            ><span>{{ playerData.player.playerProfile.position }}</span>
          </li>
          <li>
            <span>Jersey Number</span
            ><span>{{ playerData.player.playerProfile.jerseyNo }}</span>
          </li>

          <li>
            <span>Years Pro</span
            ><span>{{ playerData.player.playerProfile.experience }}</span>
          </li>
          <li>
            <span>Height</span
            ><span>{{ playerData.player.playerProfile.height }} M</span>
          </li>
          <li>
            <span>Weight</span
            ><span>{{ playerData.player.playerProfile.weight }}</span>
          </li>
          <li>
            <span>From</span
            ><span>{{
              playerData.player.playerProfile.displayAffiliation
            }}</span>
          </li>
        </ul>
      </div>
      <div class="playerStats">
        <div class="playerStatsTable">
          <div class="playerStatsTableTitle">Career Stats</div>
          <div class="playerStatsTableItem">
            <p>
              {{
                playerData.player.stats.regularSeasonCareerStat.statAverage
                  .pointsPg
              }}
            </p>
            <span>PPG</span>
          </div>
          <div class="playerStatsTableItem">
            <p>
              {{
                playerData.player.stats.regularSeasonCareerStat.statAverage
                  .assistsPg
              }}
            </p>
            <span>APG</span>
          </div>
          <div class="playerStatsTableItem">
            <p>
              {{
                playerData.player.stats.regularSeasonCareerStat.statAverage
                  .rebsPg
              }}
            </p>
            <span>RPG</span>
          </div>
          <div class="playerStatsTableItem">
            <p>
              {{
                playerData.player.stats.regularSeasonCareerStat.statAverage
                  .minsPg
              }}
            </p>
            <span>MPG</span>
          </div>
        </div>
      </div>
    </section>
    <section class="stats">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :sort-options="{
          enabled: true,
          initialSortBy: { field: 'season', type: 'desc' },
        }"
        style-class="vgt-table condensed"
        class="table"
      ></vue-good-table>
    </section>
  </div>
</template>

<script>
import nbaApi from '~/api/nbaApi'

export default {
  loading: false,
  data() {
    return {
      playerData: {},
      playerAwards: {},
      columns: [
        {
          label: 'Season',
          field: 'season',
        },
        {
          label: 'Tm',
          field: 'abbr',
        },
        {
          label: 'G',
          field: 'games',
        },
        {
          label: 'GS',
          field: 'gamesStarted',
        },
        {
          label: 'MP',
          field: 'minsPg',
        },
        {
          label: 'FG',
          field: 'fgmPg',
        },
        {
          label: 'FGA',
          field: 'fgaPg',
        },
        {
          label: 'FG%',
          field: 'fgpct',
        },
        {
          label: '3P',
          field: 'tpmPg',
        },
        {
          label: '3PA',
          field: 'tpaPg',
        },
        {
          label: '3P%',
          field: 'tppct',
        },
        {
          label: 'FT',
          field: 'ftmPg',
        },
        {
          label: 'FTA',
          field: 'ftaPg',
        },
        {
          label: 'FT%',
          field: 'ftpct',
        },
        {
          label: 'ORB',
          field: 'offRebsPg',
        },
        {
          label: 'DRB',
          field: 'defRebsPg',
        },
        {
          label: 'TRB',
          field: 'rebsPg',
        },
        {
          label: 'AST',
          field: 'assistsPg',
        },
        {
          label: 'STL',
          field: 'stealsPg',
        },
        {
          label: 'BLK',
          field: 'blocksPg',
        },
        {
          label: 'TOV',
          field: 'turnoversPg',
        },
        {
          label: 'PF',
          field: 'foulsPg',
        },
        {
          label: 'PTS',
          field: 'pointsPg',
        },
      ],
      rows: [],
    }
  },
  async fetch() {
    if (this.$nuxt.$loading) this.$nuxt.$loading.start()
    const { playerId } = this.$route.params
    const res = await nbaApi.getPlayer({ player: playerId })
    this.playerData = res.payload
    this.rows = res.payload.player.stats.regularSeasonStat.playerTeams.map(
      (item) => this.flatObj(item)
    )
    const awardsRes = await nbaApi.getPlayerAwards({
      playerId: this.playerData.player.playerProfile.playerId,
    })
    this.playerAwards = this.convertAwards(awardsRes.resultSets[0].rowSet)
    if (this.$nuxt.$loading) this.$nuxt.$loading.finish()
  },

  methods: {
    convertAwards(awards) {
      const awardsObj = {}
      awards.forEach((element) => {
        if (!Object.prototype.hasOwnProperty.call(awardsObj, element[4])) {
          awardsObj[element[4]] = 1
        } else {
          awardsObj[element[4]] += 1
        }
      })
      return awardsObj
    },
    flatObj(obj) {
      let newObj = {}
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
          if (obj[key] !== null)
            newObj = { ...newObj, ...this.flatObj(obj[key]) }
        } else {
          newObj[key] = obj[key]
        }
      })
      return newObj
    },
  },
}
</script>

<style lang="scss" scoped>
.playerInfo {
  .topHead {
    padding: 24px 80px;
    position: relative;
    width: 100%;

    .playerInfoHolder {
      max-width: 550px;
      padding-bottom: 70px;
      padding-top: 100px;
      position: relative;
      width: 100%;

      .playerInfoHeader {
        align-items: baseline;
        display: flex;

        .playerInfoNumber {
          background: #fdb927;
          color: #232323;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.1;
          margin-top: 12px;
          padding: 2px 6px;
        }

        .playerInfoPosition {
          color: silver;
          font-size: 14px;
          font-weight: 500;
          line-height: 1;
          margin: 0 0 0 8px;
        }
      }

      .playerName {
        display: flex;
        flex-direction: column;
        font-size: 7vw;
        font-weight: 800;
        letter-spacing: -0.01em;
        line-height: 0.85;
        margin: 16px 0 32px 0;
        text-transform: uppercase;
      }

      .posterInline {
        display: none;
      }

      .playerAwards {
        display: flex;
        flex-direction: column;
      }
    }

    .posterBackground {
      background-position: 90% top;
      background-repeat: no-repeat;
      background-size: contain;
      height: 160%;
      left: 0;
      max-height: 900px;
      position: absolute;
      top: 0;
      width: 100%;
    }

    @media (max-width: 800px) {
      padding: 40px;

      .posterBackground {
        display: none;
      }

      .playerInfoHolder {
        .playerName {
          font-size: 16vw;
        }

        .posterInline {
          display: block;

          img {
            max-width: 100%;
            height: auto;
          }
        }

        .playerAwards {
          margin-top: 2rem;
        }
      }
    }
  }

  .info {
    margin-top: 16%;
    padding: 40px 80px 24px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    background: black;

    .playerInfoTable {
      margin: auto;
      max-width: 560px;
      width: calc(100% / 3);

      .infoList {
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.1em;
        line-height: 1.1;
        list-style: none;
        padding: 0;
        text-transform: uppercase;

        li {
          border-bottom: 1px solid #303030;
          display: flex;
          font-size: 16px;
          justify-content: space-between;
          padding: 4px 0 8px;
          text-align: right;
        }
      }
    }

    .playerStats {
      display: flex;
      flex-wrap: wrap;
      padding: 0 3% 0 12%;
      width: calc(100% / 3 * 2);

      .playerStatsTable {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;

        .playerStatsTableTitle {
          border-bottom: 1px solid #303030;
          color: #fff;
          flex: 0 0 100%;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.1em;
          line-height: 1;
          padding: 4px 0 0;
          text-align: left;
          text-transform: uppercase;
        }

        .playerStatsTableItem {
          flex: 0 0 25%;
          margin: 16px 0;
          padding: 8px 0;
          text-align: center;

          p {
            font-size: 4vw;
            font-weight: 400;
            line-height: 1;
          }

          span {
            color: hsla(0, 0%, 87%, 0.7);
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0.1em;
            line-height: 1.1;
          }
        }
      }
    }

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 20px;
      margin-top: 0;

      .playerInfoTable {
        width: 100%;
        max-width: unset;
      }

      .playerStats {
        width: 100%;
        padding: 0;

        .playerStatsTable {
          .playerStatsTableTitle {
            padding: 4px 0;
          }
        }
      }
    }
  }

  .stats {
    margin-top: 5rem;
    padding: 1rem;
  }

  ::v-deep .vgt-wrap * {
    background-color: transparent;
  }
}
</style>
