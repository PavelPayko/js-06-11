function makeGETRequest(url, arr = []) {
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
        xhr.send(JSON.stringify(arr));
    })
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
        this.btn = `<button type="button" name="${this.product_name}" class="goods-btn">Добавить в корзину</button>`
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p>${this.btn}</div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        document.querySelector('.goods-list').addEventListener('click', (e) => {
            basket.addItem(e.target.name)
        })
    }
    fetchGoods() {
        let promise = makeGETRequest(`${API_URL}/catalogData.json`);
        promise.then(
            result => {
                this.goods = JSON.parse(result);
                return new Promise((resolve) => {
                    this.render()
                })
            }
        )
    }
    get item() {
        return this.goods
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price)
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

class BasketItem extends GoodsItem {
    constructor(product_name, price) {
        super(product_name, price)
        this.btn = `<button type="button" name="${this.product_name}" class="basket-btn">Удалить из корзины</button>`
    }
    render() {
        return `<div class="basket-item"><h3>${this.product_name}</h3><p>${this.price}</p>${this.btn}</div>`;
    }
}

class BasketList {
    constructor() {
        this.basketGoods = [];
    }
    fetchBasket() {
        let promise = makeGETRequest(`${API_URL}/getBasket.json`);
        promise.then(
            result => {
                this.basketGoods = JSON.parse(result);
                this.priceSum()
                this.quantityGoods()
            }
        )
        return this.basketGoods
    }

    get item() {
        return this.basketGoods.contents
    }

    addItem(item) {
        let arr = list.item
        let brr = arr.some(x => {
            if (x.product_name == item) {
                this.basketGoods.contents.push(x)
                this.basketGoods.amount + this.basketGoods.contents.price
                let promise = makeGETRequest(`${API_URL}/addToBasket.json`, this.basketGoods);
                promise.then(
                    result => {
                        alert(item + ' добавлен в корзину')
                            // this.priceSum()
                        this.quantityGoods()
                        return this.basketGoods
                    }
                )
            }
        })
    }

    removeItem(elem) {
        console.log(elem)
        let arr = Array.from(document.querySelector('.basket-list').children);
        let idx = arr.indexOf(elem);
        this.basketGoods.contents.splice(idx, 1);
        document.querySelector('.basket-list').removeChild(elem);
        // this.priceSum()
        this.quantityGoods()
        return this.basketGoods
    }

    render() {
        let listHtml = '';
        this.basketGoods.contents.forEach(good => {
            const basketItem = new BasketItem(good.product_name, good.price)
            listHtml += basketItem.render();
        });
        document.querySelector('.basket-list').innerHTML = listHtml;
        let basketItem = document.querySelectorAll('.basket-item');
        let basketBtns = document.querySelectorAll('.basket-btn');
        basketBtns.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                basket.removeItem(basketItem[index])
            })
        })
    }
    priceSum() {
        this.sum = 0
        this.basketGoods.contents.forEach(good => {
            this.sum += good.price
        })
        document.querySelector('.cart-quantity').textContent = `В корзине товара на ${this.sum} руб.`
        return this.sum
    }

    quantityGoods() {
        return document.querySelector('.cart-quantity').textContent = `В корзине ${this.item.length} товара на ${this.priceSum()} руб.`
    }
}

const list = new GoodsList();
list.fetchGoods()

const basket = new BasketList()
basket.fetchBasket()

let cartBtn = document.querySelector('.cart-button')
cartBtn.addEventListener('click', (e) => {

    basket.render()

})