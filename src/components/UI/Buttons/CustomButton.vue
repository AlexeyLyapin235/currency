<template>
    <button @click="handleClick" :class="btnClass">
      <slot></slot>
    </button>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    props: {
      primary: {
        type: Boolean,
        default: false,
      },
      secondary: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      // Вычисляем классы кнопки на основе переданных props
      const btnClass = computed(() => {
        return {
          'custom-button': true,
          'custom-button--primary': props.primary,
          'custom-button--secondary': props.secondary,
          'custom-button--disabled': props.disabled,
        };
      });
  
      // Функция-обработчик клика по кнопке
      const handleClick = () => {
        if (!props.disabled) {
          // Эмитируем пользовательское событие 'click'
          emit('clicked');
        }
      };
  
      return {
        btnClass,
        handleClick,
      };
    },
  };
  </script>
  
  <style>
  .custom-button {
    display: inline-block;
    padding: 8px 16px;
    font-size: 16px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
  }
  
  .custom-button--primary {
    background-color: #007bff;
    color: #fff;
  }
  
  .custom-button--secondary {
    background-color: #6c757d;
    color: #fff;
  }
  
  .custom-button--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  </style>
  