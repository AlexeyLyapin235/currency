import axios from 'axios';

const API_BASE_URL = 'https://www.cbr-xml-daily.ru';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export default {
  getCurrencyRates() {
    return apiClient.get('/daily_json.js');
  },
};