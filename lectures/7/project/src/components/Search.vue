<template>
  <div class="search">
    <input type="text" class="goods-search" :value="text" @input="handleInput" />
    <button type="button" class="search-button">Искать</button>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
      text: {
          required: true,
          type: String,
      },
  },
  methods: {
      handleInput(e) {
          this.$emit('textChange', e.target.value);
      },
  },
};
</script>
