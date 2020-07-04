let searchButton = document.querySelector('.search-button')
let searchInput = document.querySelector('.goods-search')

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});

function makeGETRequest(url, method = 'GET', payload = {}) {
    return new Promise((resolve, reject) => {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }

        xhr.open('GET', url, true);
        xhr.send(JSON.stringify(payload));
    })
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor({ id_product, product_name, price }) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product
        this.btn = `<button type="button" name="add-to-card" class="goods-btn">Добавить в корзину</button>`
    }
    render() {
        return `<div class="goods-item" data-id = ${this.id_product} data-title = ${this.product_name} data-price = ${this.price}><h3>${this.product_name}</h3><p>${this.price}</p>${this.btn}</div>`;
    }
}

class GoodsList {
    constructor(basket) {
        this.basket = basket
        this.goods = [];
        this.filteredGoods = [];
        this.init()

    }
    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then((result) => {
                    this.goods = JSON.parse(result);
                    this.filteredGoods = JSON.parse(result);
                    resolve()
                })
        })
    }
    init() {
        document.querySelector('.goods-list').addEventListener('click', (e) => {
            if (e.target.name === 'add-to-card') {
                const item = {
                    product_name: e.target.parentElement.dataset.title,
                    price: e.target.parentElement.dataset.price,
                    id_product: e.target.parentElement.dataset.id
                }
                this.basket.addItem(item)
            }
        })
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(item => {
            const goodItem = new GoodsItem(item)
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    priceSum() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price
        })
        return sum
    }
}

class BasketItem {
    constructor({ id_product, product_name, price }) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product
        this.btn = `<button type="button" name="remove-from-cart" class="basket-btn">Удалить из корзины</button>`
    }
    render() {
        return `<div class="basket-item" data-id="${this.id_product}"><h3>${this.product_name}</h3><p>${this.price}</p>${this.btn}</div>`;
    }
}

class BasketList {
    constructor() {
        this.basketGoods = [];
        this.fetchBasket()
        this.init()

    }

    addItem(item) {
        makeGETRequest(`${API_URL}/addToBasket.json`, 'POST', { item })
            .then((res) => {
                const { result } = JSON.parse(res)
                if (result === 1) {
                    this.basketGoods.push(item)
                    this.quantityGoods()
                } else {
                    console.error('addItem error')
                }
            })
    }

    init() {
        document.querySelector('.basket-list').addEventListener('click', (e) => {
            if (e.target.name === 'remove-from-cart') {
                this.removeItem(e.target.parentElement.dataset.id)
            }
        })
    }

    removeItem(id) {
        makeGETRequest(`${API_URL}/deleteFromBasket.json`, 'DELETE', { id })
            .then((res) => {
                const { result } = JSON.parse(res)
                if (result == 1) {
                    const itemIndex = this.basketGoods.findIndex(item => item.id_product == id)
                    if (itemIndex !== -1) {
                        this.basketGoods.splice(itemIndex, 1)
                    }
                }
                this.quantityGoods()
            })
    }


    fetchBasket() {
        return new Promise((resolve, reject) => {
                makeGETRequest(`${API_URL}/getBasket.json`)
                    .then((result) => {
                        const { contents } = JSON.parse(result);
                        this.basketGoods = contents
                        this.render()
                        this.quantityGoods()
                        resolve()
                    })
            }) // return this.basketGoods
    }

    render() {
        let listHtml = '';
        this.basketGoods.forEach(item => {
            const basketItem = new BasketItem(item)
            listHtml += basketItem.render();
        });
        document.querySelector('.basket-list').innerHTML = listHtml;
    }
    priceSum() {
        this.sum = 0
        this.basketGoods.contents.forEach(good => {
                this.sum += good.price
            })
            // document.querySelector('.cart-button').textContent = `В корзине товара на ${this.sum} руб.`
        return this.sum
    }

    quantityGoods() {
        return document.querySelector('.cart-button').textContent = `в корзине ${this.basketGoods.length}`
    }
}

const basket = new BasketList

const list = new GoodsList(basket);
list.fetchGoods().then(() => {
    list.render()
})



let cartBtn = document.querySelector('.cart-button')
cartBtn.addEventListener('click', (e) => {

    basket.render()

})