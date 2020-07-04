<template>
 <div v-if="!filteredGoods.length">{{ emptyGoodsMessage }}</div>
</template>

<script>
export default {
 name: "Error",
 props: {
  filteredGoods: {
   type: Array,
   required: false,
   default: () => []
  },
  emptyGoodsMessage: {
   type: String,
   required: false,
   default: "Нет ни одного товара"
  }
 }
};
</script>

<style>
</style>