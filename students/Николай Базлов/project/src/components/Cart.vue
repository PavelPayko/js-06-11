<template>
    <div>
        <div class="cart-item">
            <h3>{{ item.product_name }}</h3>
            <p>{{ item.price }}</p>
        </div>
    </div>
</template>

<script>

export default {
  name: "Cart",
  props: {
        item: {
            type: Object,
            required: true
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
    top: 100px;
}

.cart-item {
    margin-bottom: 20px;
}

</style>