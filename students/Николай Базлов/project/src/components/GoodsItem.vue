<template>
  <div class="goods-item">
    <div class="goods-img"/>
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }}</p>
    <button
      class="add-to-cart" 
      @click="$emit('addToCart', item)" 
      name="add-to-cart"
      >
      Добавить в корзину
    </button>
  </div>
</template>

<script>

export default {
  name: "GoodsItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};

</script>

<style>

.goods-img {
  margin: auto;
  width: 150px;
  height: 150px;
  background-color: brown;
}

.goods-item {
  flex-basis: 22%;
  min-width: 100px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}

.add-to-cart {
  cursor: pointer;
}

</style>
