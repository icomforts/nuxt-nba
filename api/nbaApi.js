import api from './apiConfig'
const nbaApi = {
  getAllTeams: () => {
    const url = 'teams'
    return api.get(url, { params: {} })
  },
  // team: lakers
  getTeamPlayers: (data) => {
    const url = 'teams/players'
    return api.get(url, { params: data })
  },
  // player: kobe_bryant
  getPlayer: (data) => {
    const url = 'player'
    return api.get(url, { params: data })
  },
  // playerId: player id
  getPlayerAwards: (data) => {
    const url = 'stats/player/awards'
    return api.get(url, { params: data })
  },
  // type: points, season:2021
  getStatsLeadPlayers: (data) => {
    const url = 'stats/player'
    return api.get(url, { params: data })
  },
}
export default nbaApi
