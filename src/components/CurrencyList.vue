<template>
    <div>
        <h1>{{ title }}</h1>
        <custom-input v-model="search"></custom-input>
        <CustomButton @clicked="switchValue" :primary="true">Переключить</CustomButton>
        <div v-if="typeCurrency === false">
            <div v-for="currency in filteredCurrencies" :key="currency.CharCode" class="currency">
                <div class="up-arrow" v-if="currency.Value > currency.Previous"></div> <div v-if="currency.Value < currency.Previous" class="down-arrow"></div>  <strong>{{ currency.Nominal + ' ' + currency.CharCode }}</strong>: {{ currency.Value }}RUB
            </div>
        </div>
        <div v-if="typeCurrency === true">
            <div v-for="currency in filteredCurrencies" :key="currency.CharCode" class="currency">
                <div class="up-arrow" v-if="currency.Value > currency.Previous"></div> <div v-if="currency.Value < currency.Previous" class="down-arrow"></div>     <strong>{{ currency.Nominal }}RUB : </strong>{{ RUB_TO_CHAR_RATE(currency.Nominal, currency.Value) }}{{
                    currency.CharCode }}
            </div>
        </div>
    </div>
</template>
<script>
import { ref, watch } from 'vue'
import CustomButton from '@/components/UI/Buttons/CustomButton.vue';
import CustomInput from '@/components/UI/Input/CustomInput.vue';

export default {
    components: {
        CustomButton,
        CustomInput

    },
    props: {
        title: {
            type: String
        },
        filteredCurrencies: {
            type: Array,
        },
        typeCurrency: {
            type: Boolean,
        }
    },
    setup(props, { emit }) {
        const search = ref('')
        const switchValue = () => {
            emit('switchValue')
        }
        watch(search, (value, oldvalue) => {
            emit('searched', value)
        })
        const RUB_TO_CHAR_RATE = (nominal, value) => {
            const sum = Number(nominal) / Number(value)
            return Number(sum.toFixed(4))
        }
        return {
            switchValue,
            RUB_TO_CHAR_RATE,
            search
        }
    }
}
</script>
<style scoped>
.currency{
    display: flex;
    margin: 10px;
}
.up-arrow {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid green; /* This sets the color of the arrow, you can change 'green' to any other color */
}
.down-arrow {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid red; /* This sets the color of the arrow to red */
}
</style>