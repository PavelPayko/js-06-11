<template>
  <div class="cart">
    <div
      class="cart-item"
      v-for="item in cartGoods"
      v-bind:key="item.id_product"
    >
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    cartGoods: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.cart {
  position: absolute;
  width: 300px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  background: #fff;
  padding: 10px 15px;
  top: 70px;
  right: 30px;
}

.cart-item {
  margin-bottom: 10px;
}

</style>
