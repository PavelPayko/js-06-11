<template>
 <div class="goods-item">
  <h2>{{ item.product_name }}</h2>
  <p>{{ item.price }}</p>
  <button @click="$emit('addToCart', item)">Добавить в корзину</button>
 </div>
</template>

<script>
export default {
 name: "GoodsItem",
 props: {
  item: {
   type: Object,
   required: true
  }
 }
};
</script>

<style>
.goods-item {
 box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
 flex-basis: calc(25% - 40px);
 margin: 20px;
 background-color: #fff;
 border-radius: 5px;
 padding: 10px;
}
</style>