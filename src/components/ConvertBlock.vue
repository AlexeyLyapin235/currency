<template>
    <div class="converter-block">
      <div class="block">
        <select :value="baseCurrency" @change="$emit('update:baseCurrency', $event.target.value)">
          <option :value="baseCurrency">{{ baseCurrency }}</option>
        </select>
        <custom-input type="number" :value="baseValue" @input="$emit('update:baseValue', $event.target.value)"></custom-input>
      </div>
      <div class="arrow" @click="$emit('swapCurrencies')">&#8646;</div>
      <div class="block">
        <select :value="targetCurrency" @change="$emit('update:targetCurrency', $event.target.value)">
          <option v-for="currency in currencies" :key="currency.CharCode" :value="currency.CharCode">
            {{ currency.CharCode }}
          </option>
        </select>
        <div>{{ convertedValue }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import CustomInput from '@/components/UI/Input/CustomInput.vue';
  
  export default {
    components: {
      CustomInput,
    },
    props: {
      baseCurrency: String,
      targetCurrency: String,
      baseValue: Number,
      currencies: Array,
      convertedValue: String,
    },
  };
  </script>
  <style scoped>
  .converter-block{
    display: flex;
    gap: 10px;
  }
  </style>