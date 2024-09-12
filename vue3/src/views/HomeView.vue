<template>
  <a-config-provider
    :theme="{
      token: {
        algorithm: theme.darkAlgorithm,
        colorPrimary: 'blue',
      },
      components: {
        Radio: {
          colorPrimary: 'red',
        },
      },
    }"
  >
    <a-button>按钮</a-button>
    <a-radio>Radio</a-radio>
    <a-checkbox>Checkbox</a-checkbox>
  </a-config-provider>
</template>

<script setup>
  import { theme } from 'ant-design-vue';
</script>