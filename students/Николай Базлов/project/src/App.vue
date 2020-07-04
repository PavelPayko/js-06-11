<template>
  <div id="app">
    <Header>
      <Search
        @handleCartButtonClick="handleCartButtonClick"
        @textChanges="textChanges"
      />
      <div class="cart" v-if="isCartVisible">
        <Cart
          v-for="(item, index) in cartGoods"
          :key="`${index}`"
          :item="item"
        />
      </div>
    </Header>
    <GoodsList
      @addToCart="addToCart"
      :filteredGoods="filteredGoods"
      emptyGoodsMessage="Товаров нет"
    />
    <Error v-if="!(isError.length === 0)" />
  </div>
</template>

<script>

import Search from "./components/Search.vue"
import Cart from "./components/Cart.vue"
import Error from "./components/Error.vue"
import GoodsList from "./components/GoodsList.vue";
import Header from "./components/Header.vue";

const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

export default {
  name: "App",
  components: {
    GoodsList,
    Header,
    Search,
    Cart,
    Error
  },
  data() {
    return {
      goods: [],
      cartGoods: [],
      searchText: "",
      isCartVisible: false,
      isError: "",
    };
  },
  mounted() {
    this.fetchGoods();
  },
  methods: {
    textChanges(fromsearchcomponent) {
      this.searchText = fromsearchcomponent;
    },
    fetchGoods() {
      fetch(`${API}/catalogData.json`)
        .then((result) => {
          return result.json();
        })
        .then(
          (data) => {
          this.goods = data;
        },
        (error) => {
          this.isError = error;
        })
    },
    addToCart(item) {
      this.cartGoods.push(item);
    },
    removeFromCart(id) {
      const index = this.cartGoods.find(({ id_product }) => id_product === id);
      if (index !== -1) {
        this.cartGoods.splice(index, 1);
      }
    },
    handleCartButtonClick() {
      this.isCartVisible = !this.isCartVisible;
    },
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchText, "i");
      return this.goods.filter(({ product_name }) => regexp.test(product_name));
    },
  },
};

</script>

<style>

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
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
