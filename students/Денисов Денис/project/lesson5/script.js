const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        basketGoods: [],
        searchLine: '',
        totalAmount: 0,
        loaded: true
    },
    mounted() {
        this.fetchGoods()
        this.fetchCartGoods()
    },
    methods: {
        fetchGoods() {
            fetch(`${API_URL}/catalogData.json`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    this.goods = data;
                    this.filteredGoods = data;
                })
                .catch(error => {
                    console.error(error);
                    this.loaded = false
                });
        },
        fetchCartGoods() {
            fetch(`${API_URL}/getBasket.json`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    const { contents } = data;
                    this.basketGoods = contents;
                    this.priceSum()
                    this.quantityGoods()
                })
        },
        clickSearch(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
            return this.filteredGoods
        },
        addItem(item) {
            fetch(`${API_URL}/addToBasket.json`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    const { result } = data
                    if (result === 1) {
                        this.basketGoods.push(item)
                        this.quantityGoods()
                        this.priceSum()
                    } else {
                        console.error('addItem error')
                    }
                })
        },
        removeItem(id) {
            fetch(`${API_URL}/deleteFromBasket.json`)
                .then((response) => {
                    return response.json()
                })
                .then((res) => {
                    const { result } = res
                    if (result == 1) {
                        const itemIndex = this.basketGoods.findIndex(item => item.id_product == id)
                        if (itemIndex !== -1) {
                            this.basketGoods.splice(itemIndex, 1)
                            this.quantityGoods()
                            this.priceSum()
                        }
                    }
                })
        },
        quantityGoods() {
            return document.querySelector('.cart-button').textContent = `в корзине ${this.basketGoods.length}`
        },
        opencart() {
            if (this.basketGoods.length != 0) {
                document.querySelector('.basket-list').classList.toggle('open')
            } else {
                alert('Добавьте товар в корзину')
            }

        },
        priceSum() {
            this.sum = 0
            this.basketGoods.forEach(good => {
                this.sum += good.price
            })
            this.totalAmount = this.sum
            return this.totalAmount
        }
    },
});