<template>
 <div class="basket-panel">
  <button type="button" class="cart-button" @click="$emit('handleCartButtonClick')">Корзина</button>
  <div class="cart-info">
   <div class="cart-all-price">Общая стоимость {{getPrice}} руб</div>
   <div class="cart-all-quantity"></div>
  </div>
 </div>
</template>

<script>
export default {
 name: "BasketPanel",
 props: {
  cartGoods: {
   type: Array,
   required: false,
   default: () => []
  }
 },
 computed: {
  getPrice() {
   let result = [];

   if (this.cartGoods.length) {
    for (let item of this.cartGoods) {
     result.push(item.price * item.quantity);
    }

    result = result.reduce(function(sum, el) {
     return sum + el;
    });
   }else{
       return 0
   }

   return result;
  }
 }
};
</script>

<style scoped>
</style>