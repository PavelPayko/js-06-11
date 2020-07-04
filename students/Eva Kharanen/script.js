
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        basketItems: [],
    },
    methods: {
        makeGETRequest(url, payload = {}) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(JSON.parse(xhr.responseText))
                }
                xhr.open('GET', url, true);
                xhr.send(payload);
            })
        },
        getBasketItems() {
            this.makeGETRequest(`${API_URL}/getBasket.json`).then(basketItems => {
                this.basketItems = basketItems.contents;
                console.log(this.basketItems)
            })
        },
        addToTheBasket(name) {
            this.makeGETRequest(`${API_URL}/addToBasket.json`, {name})
                .then(res => {
                    if (res.result === 1) {

                        const product = this.goods.find(it => it && it.product_name === name);
                        this.basketItems.push(product)
                    } else {
                        console.log('error push')
                    }
                })
        },
        removeFromTheBasket(name) {
            this.makeGETRequest(`${API_URL}/deleteFromBasket.json`, {name})
                .then((res) => {
                    const {result} = res;
                    if (result === 1) {
                        let removedProduct = this.goods.find(it => it && it.product_name === name);
                        let index = this.basketItems.findIndex(removedProduct => removedProduct === removedProduct)
                        if (removedProduct !== -1) {
                            this.basketItems.splice(index, 1);
                        }
                    } else {
                        console.log('error delete')
                    }
                })
        },
        clearBasket() {
            this.basketItems = [];
        },
        filterList(){
            this.filteredGoods = this.goods.filter(good => {
                return good.product_name.includes(this.searchLine)
            })
        },

    },
    computed: {
        isBasketVisible() {
            return this.basketItems.length > 0;
        },
        ifBasketEmpty(){
            return this.basketItems.length === 0;
        },

    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, {}).then(goods => {
            this.goods = goods;
            this.filteredGoods = goods;
        });
    }
});

/*// корзина
class Basket {
    constructor() {
        this.basketItems = [];
        this.getBasketItems();
    }

    getBasketItems() {
        sendGETRequest(`${API_URL}/getBasket.json`).then(basketItems => {
            this.basketItems = basketItems.contents;
            // this.render();
        })
    }

    addToTheBasket(name) {
        sendGETRequest(`${API_URL}/addToBasket.json`, 'GET', {name})
            .then((res) => {
                const {result} = res;
                if (result === 1) {
                    const product = list.findProductByName(name);
                    this.basketItems.push(product)
                } else {
                    console.log('error push')
                }
                this.render()
            })
    };

    removeFromTheBasket(name) {
        sendGETRequest(`${API_URL}/deleteFromBasket.json`, 'DELETE', {name})
            .then((res) => {
                const {result} = res;
                if (result === 1) {
                    let removedProduct = list.findProductByName(name);
                    let index = this.basketItems.findIndex(removedProduct => removedProduct === removedProduct)
                    if (removedProduct !== -1) {
                        this.basketItems.splice(index, 1);
                    }
                } else {
                    console.log('error delete')
                }
                this.render()
            })
    };

    getTotalPrice() {
        let totalBasketSum = 0;
        this.basketItems.forEach(basketItem => totalBasketSum += basketItem.getTotalPrice())
        return totalBasketSum;
    }

    clearBasket() {
        this.basketItems = [];
        this.render()
    }


    // render() {
    //     let list = '';
    //     this.basketItems.forEach(({product_name, price}) => {
    //             const item = new BasketItem(product_name, price)
    //             list += item.render()
    //         }
    //     )
    //     document.querySelector('.basket-block').innerHTML = list;
    // }
}

const basketList = new Basket;

//товар, который лежит в корзине

class BasketItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }

    // render() {
    //     return `
    //             <div class="basket-item-name" data-title="${this.product_name}" data-price="${this.price}">
    //             <h2 class="">${this.product_name}</h2>
    //             <p class="">${this.price}</p>
    //             <button class="btn-delete" onclick="basketList.removeFromTheBasket('${this.product_name}')">delete</button>
    //             </div>`;
    // }
}

// ответ с сервера, запрошенный товар, его отображение на странице

class Produckt {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }

    getProductPrice() {
        return this.price
    }

    getProductName() {
        return this.product_name
    }

    render() {
        // return `<div class="goods-item" data-title="${this.product_name}" data-price="${this.price}">
        //         <h2 class="title">${this.product_name}</h2>
        //         <p class="price">${this.price} euro</p>
        //         </div>`;
    }
}

// запрос на сервер

class GoodsList {
    goods = [];

    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        sendGETRequest(`${API_URL}/catalogData.json`).then(goods => {
            this.goods = goods;
            this.render();
        })
    }

    getTotalGoodsPrice() {
        let totalGoodsPrice = 0;
        this.goods.forEach(good => totalGoodsPrice += good.price)
        return totalGoodsPrice;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(({product_name, price}) => {
                const item = new Produckt(product_name, price)
                listHtml += item.render()
            }
        )
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    findProductByName(name) {
        return this.goods.find(good => good.product_name === name)
    }
}

let list = new GoodsList;
list.fetchGoods(() => list.render())

// гамбургер

class Hamburger {
    type; // object like: {name: 'Большой', price: 100, ccal: 40}
    content = [];
    toppings = [];

    constructor(type, content) {
        this.type = type;
        this.content = content;
    }

    addTopping(topping) {
        this.toppings.push(topping)
    }

    removeTopping(removedTopping) {
        let index = this.toppings.findIndex(topping => topping === removedTopping)
        this.toppings.splice(index, 1)
    }

    getToppings(topping) {
        return this.toppings;
    }

    getSize() {
        return this.type;
    }

    getStuffing() {
        return this.content;
    }

    calculatePrice() {
        let contentPrice = 0;
        let toppingPrice = 0;
        this.content.forEach(contentItem => contentPrice += contentItem.price)
        this.toppings.forEach(toppingItem => toppingPrice += toppingItem.price)
        return this.type.price + contentPrice + toppingPrice;
    }

    calculateCalories() {
        let contentCcal = 0;
        let toppingCcal = 0;
        this.content.forEach(contentItem => contentCcal += contentItem.calories)
        this.toppings.forEach(toppingItem => toppingCcal += toppingItem.calories)
        return this.type.calories + contentCcal + toppingCcal;
    }
}*/
