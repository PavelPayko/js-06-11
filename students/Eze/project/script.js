'use strict';


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false,
    cartItems:[],
    isEmpty : true

  },

  methods: {
    fetchGoods  (url) {
      return fetch(url)
        .then (response =>  {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error (" Ошибка HTTP: " + response.status);
          }
        })
    },


    search () {
      let newSearch = this.searchLine.toLowerCase().trim();

      if (newSearch === '') {
        this.filteredGoods = this.goods;
      } else {
        this.filteredGoods = this.goods.filter((element) => {
          return element.product_name.toLowerCase().includes(newSearch);
        });
      }
    }
  },

  mounted () {
    this.fetchGoods(`${API}/catalogData.json`)
      .then(data => {
        for (let element of data) {
          this.goods.push(element)
        }
      });
    this.filteredGoods = this.goods;
  }


//     addItem(item) {
//       this.fetchGoods(`${API}/addToBasket.json`)
//         .then(data=> {
//        if  (data.result) {
//          let find = this.cartItems.find(element => element.id_product === item.id_product);
//        if (find) {
//          find.quantity++;
//        }
//        else {
//          let product = Object.assign({quantity: 1}, item);
//          this.cartItems.push(product);
//        }
//        }
//        })
//     },
//   remove(item)  {
//       this.fetchGoods(`${API}/deleteFromBasket.json`)
//         .then(data =>{
//         if (data.result){
//         if(item.quantity>1){
//         item.quantity--;
//         }
//         else{
//           this.cartItems.splice(this.cartItems.indexOf(item),1);
//         }
//         }
//         })
// },
//
//
// filter() {
//     let re = new RegExp(this.search, 'i');
//     this.filtered = this.goods.filter(element => re.test(element.product_name));
// }
// },
//
//   mounted(){
//
// this.fetchGoods(`${API}/getBasket.json`)
//   .then(data => {
//     for(let el of data.contents) {
//       this.cartItems.push(el);
//     }
//   }),
//
// this.fetchGoods(`${API}/catalogData.json`)
//   .then(data => {
//     for(let el of data){
//       this.goods.push(el);
//       this.filteredGoods.push(el);
//     }
//   });
// this.fetchGoods(`${API}/getProducts.json`)
//   .then(data => {
//     for(let el of data) {
//       this.goods.push(el);
//       this.filteredGoods.push(el);
//     }
//   });
// }
});

