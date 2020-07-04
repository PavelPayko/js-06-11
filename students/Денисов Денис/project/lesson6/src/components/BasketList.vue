<template>
 <main>
  <div class="cart">
   <BasketItem
    v-for="item in cartGoods"
    v-bind:key="item.id_product"
    :item="item"
    @removeItem="removeItem"
    @addItem="addItem"
    @reduceItem="reduceItem"
   />
  </div>
 </main>
</template>

<script>
import BasketItem from "./BasketItem.vue";
export default {
 name: "BasketList",
 components: {
  BasketItem
 },
 props: {
  cartGoods: {
   type: Array,
   required: false,
   default: () => []
  },
 },
 methods: {
  removeItem(item) {
   this.$emit("removeItem", item);
  },
  reduceItem(item){
      this.$emit('reduceItem', item)
  },
   addItem(item){
      this.$emit('addItem', item)
  }
 }
};
</script>

<style>
.cart {
 position: absolute;
 width: 100%;
 box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
 background: #fff;
 padding: 10px 15px;
 left: 0;
 top: 75px;
}
</style>