
<template>
 <div id="app">
  <Header>
   <SearchBlock @filterGoods="filterGoods"></SearchBlock>
   <BasketPanel :cartGoods="cartGoods" @handleCartButtonClick="handleCartButtonClick"></BasketPanel>
   <BasketList v-if="isCartVisible" :cartGoods="cartGoods" @removeItem="removeItem" @addItem="addItem"
    @reduceItem="reduceItem" />
  </Header>
  <GoodsList @addToCart="addToCart" :filteredGoods="filteredGoods" />
 </div>
</template>

<script>
import GoodsList from "./components/GoodsList.vue";
import BasketList from "./components/BasketList.vue";
import Header from "./components/Header.vue";
import SearchBlock from "./components/SearchBlock.vue";
import BasketPanel from "./components/BasketPanel.vue";
const API =
 "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
export default {
 name: "App",
 components: {
  GoodsList,
  Header,
  BasketList,
  SearchBlock,
  BasketPanel
 },
 data() {
  return {
   goods: [],
   cartGoods: [],
   isCartVisible: false,
   filteredGoods: []
  };
 },
 mounted() {
  this.fetchGoods();
  this.fetchCartGoods();
 },
 methods: {
  fetchGoods() {
   fetch(`${API}/catalogData.json`)
    .then(result => {
     return result.json();
    })
    .then(data => {
     this.goods = data;
     this.filteredGoods = data;
    });
  },
  handleCartButtonClick() {
   if (this.cartGoods.length != 0) {
    this.isCartVisible = !this.isCartVisible;
   } else {
    this.isCartVisible = false;
    alert("Добавьте товар в корзину");
   }
  },
  fetchCartGoods() {
   fetch(`${API}/getBasket.json`)
    .then(response => {
     return response.json();
    })
    .then(data => {
     const { contents } = data;
     this.cartGoods = contents;
    });
  },
  addToCart(item) {
     item.quantity = 1
    this.cartGoods.push(item);

  },
  removeItem(item) {
   const itemIndex = this.cartGoods.find(
    elem => elem.id_product == item.id_product
   );
   if (itemIndex !== -1) {
    this.cartGoods.splice(itemIndex, 1);
   }
  },
  filterGoods(searchText) {
   const regexp = new RegExp(searchText, "i");
   this.filteredGoods = this.goods.filter(good =>
    regexp.test(good.product_name)
   );
  },
   reduceItem(item){
     if(item.quantity != 0){
       item.quantity--
     }
     
  },
   addItem(item){
      item.quantity++
    console.log(this.cartGoods)

  }
 }
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
</style>

