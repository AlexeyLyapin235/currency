<template>
    <input :value="inputValue" @input="onInput" />
  </template>
  
  <script>
  import { ref, defineProps, defineEmits } from 'vue';
  
  export default {
    props: {
      modelValue: [String,Number],
    },
    setup(props, { emit }) { // Передаем вторым аргументом в setup функцию функцию emit
      const inputValue = ref(props.modelValue);
  
      const onInput = (event) => {
        inputValue.value = event.target.value;
        emit('update:modelValue', inputValue.value);
      };
  
      return {
        inputValue,
        onInput,
      };
    },
    emits: ['update:modelValue'],
  };
  </script>
  