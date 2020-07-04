<template>
  <div id="app">
    <Header>
      <Search
        :text="searchText"
        @textChange="(value) => (searchText = value)"
      />
      <button
        type="button"
        class="cart-button"
        v-on:click="isCartVisible = !isCartVisible"
      >
        Корзина
      </button>
      <Cart v-if="isCartVisible" :cartGoods="cartGoods" />
    </Header>
    <Error v-if="isError" />
    <GoodsList
      v-else
      @addToCart="addToCart"
      :filteredGoods="filteredGoods"
      emptyGoodsMessage="Товаров нет"
    />
  </div>
</template>

<script>
import GoodsList from "./components/GoodsList.vue";
import Header from "./components/Header.vue";
import Search from "./components/Search.vue";
import Cart from "./components/Cart.vue";
import Error from "./components/Error.vue";

const API = "http://localhost:3000";

export default {
  name: "App",
  components: {
    GoodsList,
    Header,
    Cart,
    Search,
    Error,
  },
  data() {
    return {
      goods: [],
      cartGoods: [],
      searchText: "",
      isCartVisible: false,
      isError: false,
    };
  },
  mounted() {
    this.fetchGoods();
    this.fetchCart();
  },
  methods: {
    fetchGoods() {
      fetch(`${API}/catalog`)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          this.goods = data;
        })
        .catch((err) => {
          this.isError = true;
          console.error(err);
        });
    },
    fetchCart() {
      fetch(`${API}/cart`)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          this.cartGoods = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addToCart(item) {
      fetch(`${API}/addToCart`, {
        method: "POST",
        body: JSON.stringify({ item }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          if (data.result) {
            this.cartGoods.push(item);
          } else {
            console.error("Cant add item to cart");
          }
        })
        .catch((err) => {
          console.error(err);
        });
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
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafc;
}

.cart-button {
  border: none;
  border-radius: 20px;
  padding: 7px 20px;
  background: #0b5bb8;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  color: #fff;
}

.cart-button:focus {
  outline: none;
  background: #0c50a0;
}

.cart-button:hover {
  background: #3b7eb9;
}

.goods-list {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
