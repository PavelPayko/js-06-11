const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        cartGoods: [],
        searchLine: '',
        blank:'',
        //Задание 2. Видимость корзины.
        isVisibleCart: true,
    },
    mounted() {
        this.fetchGoods();
    },
    methods: {
        fetchGoods() {
            fetch(`${API_URL}/catalogData.json`)
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    this.goods = data;
                })
                // Задание 3. Проверка для если goods пустой.
                // .then(() => {
                //     this.goods = [];
                // })
        },
        addToCart() {
            this.cartGoods.splice(index, 1);
        },
        removeFromCart(id) {
        },
        filterGoods() {
            //Задание 1
            this.blank = this.searchLine;
            this.searchLine = '';
        },
    },
});