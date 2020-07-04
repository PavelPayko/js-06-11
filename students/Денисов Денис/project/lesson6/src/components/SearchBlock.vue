<template>
 <div>
  <input type="text" class="goods-search" v-model="searchText" />
  <button type="button" @click="$emit('filterGoods', searchText)" class="search-button">Искать</button>
 </div>
</template>

<script>
export default {
 name: "SearchBlock",
 data() {
  return {
   searchText: ""
  };
 }
};
</script>

<style scoped>
</style>