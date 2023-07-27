<template>
  <nav>
    <router-link to="/">Курсы валют </router-link> |
    <router-link to="/about">Конвектор</router-link>
  </nav>
  <router-view/>
</template>
<script>
import {onMounted} from 'vue'
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchCurrencyRates');
    });
  },
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
