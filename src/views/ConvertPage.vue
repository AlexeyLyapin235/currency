<template>
  <div>
    <convert-block
      :baseCurrency="baseCurrency"
      :targetCurrency="targetCurrency"
      :baseValue="baseValue"
      :currencies="currencies"
      :convertedValue="convertedValue"
      @update:baseCurrency="updateBaseCurrency"
      @update:baseValue="updateBaseValue"
      @swapCurrencies="swapCurrencies"
    />
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import ConvertBlock from '@/components/ConvertBlock.vue'; 

export default {
  components: {
    ConvertBlock,
  },
  setup() {
    const store = useStore();
    const currencies = computed(() => Object.values(store.state.currencies));
    const baseCurrency = ref('RUB');
    const targetCurrency = ref('USD');
    const baseValue = ref(0);

    const convertedValue = computed(() => {
      const rate = getConversionRate();
      return (baseValue.value * rate).toFixed(2);
    });

    const getConversionRate = () => {
      const baseCurrencyRate = currencies.value.find((currency) => currency.CharCode === baseCurrency.value)?.Value || 1;
      const targetCurrencyRate = currencies.value.find((currency) => currency.CharCode === targetCurrency.value)?.Value || 1;
      return baseCurrencyRate / targetCurrencyRate;
    };

    const updateBaseCurrency = (value) => {
      baseCurrency.value = value;
      updateConversion();
    };

    const updateBaseValue = (value) => {
      baseValue.value = value;
      updateConversion();
    };

    const updateConversion = () => {
      const rate = getConversionRate();
      const converted = (baseValue.value * rate).toFixed(2);
    };

    const swapCurrencies = () => {
      [baseCurrency.value, targetCurrency.value] = [targetCurrency.value, baseCurrency.value];
      updateConversion();
    };

    watch([baseCurrency, currencies], updateConversion, { immediate: true });

    return {
      currencies,
      baseCurrency,
      targetCurrency,
      baseValue,
      convertedValue,
      updateBaseCurrency,
      updateBaseValue,
      swapCurrencies,
    };
  },
};
</script>
