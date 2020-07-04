<template>
  <main>
    <div class="goods-list">
      <div v-if="!filteredGoods.length">{{ emptyGoodsMessage }}</div>
      <GoodsItem
        v-for="item in filteredGoods"
        :key="item.id_product"
        :item="item"
        @addToCart="addToCart"
      />
    </div>
  </main>
</template>

<script>
import GoodsItem from "./GoodsItem.vue";

export default {
  name: "GoodsList",
  components: {
    GoodsItem,
  },
  props: {
    filteredGoods: {
      type: Array,
      required: false,
      default: () => [],
    },
    emptyGoodsMessage: {
      type: String,
      required: false,
      default: "Нет ни одного товара",
    },
  },
  methods: {
    addToCart(item) {
      this.$emit("addToCart", item);
    },
  },
};
</script>

<style></style>
