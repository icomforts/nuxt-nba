
import axios from 'axios'

const apiConfig = {
    baseUrl: 'https://nba-api-sigma.vercel.app/nba/'
}
const api = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
api.interceptors.request.use(async (config) => await config);

api.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default api;
