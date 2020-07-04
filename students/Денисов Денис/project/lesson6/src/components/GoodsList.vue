<template>
 <main>
  <div class="goods-list">
      <Error emptyGoodsMessage="Товаров нет" :filteredGoods="filteredGoods"/>
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
import Error from "./Error.vue";
export default {
 name: "GoodsList",
 components: {
  GoodsItem,
  Error
 },
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
 },
 methods: {
  addToCart(item) {
   this.$emit("addToCart", item);
  }
 }
};
</script>

<style>
.goods-list {
 width: 70%;
 margin: 0 auto;
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
}
</style>