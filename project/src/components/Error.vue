<template>
  <div class="error">
      {{ message }}
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: {
      type: String,
      default: 'Не удалось выполнить запрос к серверу'
    },
  },
};
</script>

