import { createStore } from 'vuex';
import api from '../api';

export default createStore({
  state: {
    currencies: [],
    filteredCurrencies:[],
  },
  mutations: {
    SET_CURRENCIES(state, currencies) {
      state.currencies = currencies;
    },
    SET_FILTER_CURRENCIES(state, currencies) {
      state.filteredCurrencies = currencies;
    },
    FILTER_CURRENCIES(state, charCode) {
      if(charCode !== ''){
        state.filteredCurrencies = state.currencies
        state.filteredCurrencies = state.currencies.filter(currency => currency.CharCode.toLowerCase().includes(charCode.toLowerCase()));
      }else{
        state.filteredCurrencies = state.currencies
      }
    },
  },
  actions: {
    async fetchCurrencyRates({ commit }) {
      try {
        const response = await api.getCurrencyRates();
        const currencies = Object.values(response.data.Valute);
        commit('SET_CURRENCIES', currencies);
        commit('SET_FILTER_CURRENCIES', currencies);

      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    filterCurrencies({ commit }, charCode) {
      commit('FILTER_CURRENCIES', charCode);
    },
  },
  modules: {},
});
