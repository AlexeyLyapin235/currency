<template>
  <div>
    <CurrencyList :title="'Курсы валют Центробанка РФ'" :filteredCurrencies="filteredCurrencies"
      :typeCurrency="typeCurrency" @switchValue='switchValue' @searched="searched"></CurrencyList>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import CustomButton from '@/components/UI/Buttons/CustomButton.vue';
import CurrencyList from '@/components/CurrencyList.vue';

export default {
  components: {
    CustomButton,
    CurrencyList
  },
  setup() {
    const store = useStore();
    const search = ref('')
    const currencies = computed(() => store.state.currencies);
    const filteredCurrencies = computed(() => store.state.filteredCurrencies);
    const typeCurrency = ref(false)
    const switchValue = () => {
      typeCurrency.value = !typeCurrency.value
    }
   
    const searched = (value) => {
      store.dispatch('filterCurrencies', value);
    }

    return {
      currencies,
      switchValue,
      searched,
      typeCurrency,
      filteredCurrencies,
      search
    };
  },
};
</script>
