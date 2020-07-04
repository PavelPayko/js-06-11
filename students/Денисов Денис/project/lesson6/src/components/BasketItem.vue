<template>
 <div class="cart-item">
  <h3>{{ item.product_name }}</h3>
  <p>
      <span @click ='$emit("reduceItem", item)'>-</span>
      {{item.quantity}} шт.
      <span @click ='$emit("addItem", item)'>+</span>
      </p>
  <p>{{ item.price * item.quantity}}</p>
  <button class="basket-button" @click='$emit("removeItem", item)'>Удалить из корзины</button>
 </div>
</template>
         
<script>
export default {
 name: "BasketItem",
 props: {
  item: {
   type: Object,
   required: true
  },
 },
};
</script>

<style>
.cart-item {
 margin-bottom: 10px;
}
</style>