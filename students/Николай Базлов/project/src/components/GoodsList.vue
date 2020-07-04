<template>
  <main>
    <div class="width-container">
      <div class="goods-container">
        <div v-if="!filteredGoods.length">{{ emptyGoodsMessage }}</div>
        <GoodsItem
          v-for="item in filteredGoods"
          :key="item.id_product"
          :item="item"
          @addToCart="addToCart"
        />
      </div>
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

<style>

.width-container {
  margin: auto;
  min-width: 1070px;
  width: 1070px;
}

.goods-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

</style>
