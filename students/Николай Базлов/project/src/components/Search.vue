<template>
    <div>
        <input type="text" class="goods-search" v-model="textSearch" @change="$emit('textChanges', textSearch)"/>
        <button type="button" class="search-button">Искать</button>
        <button
        type="button"
        class="cart-button"
        @click="$emit('handleCartButtonClick')"
        >
        Корзина
        </button>
    </div>
</template>

<script>

export default {
  name: "Search",
  data() {
    return {
        textSearch: "",
    };
  },
  methods: {
      handleCartButtonClick() {
          this.$emit("handleCartButtonClick");
      },
      // В общем я не сумел додуматься, как сделать так, чтоб фильтрация товаров происходила без @change
      textChanges() {
          this.$emit("textChanges")
      }
  }
};

</script>

<style>

.search-button {
    margin-right: 20px;
    border-radius: 0;
    border: none;
    cursor: pointer;
    padding: 5px;
    background-color: aquamarine;
}
.search-button:focus {
    outline: none;
    background-color: aqua;
}
.search-button:hover {
    background-color: aqua;
}

.cart-button {
    border: none;
    padding: 7px 20px;
    background: #636bff;
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    color: #fff;
    margin-right: 20px;
}

.cart-button:focus {
    outline: none;
    background: #3b45f9;
}

.cart-button:hover {
    background: #3b45f9;
}

</style>