class Hamburger {

    static  sizes = {
        small: { id: "small", price: 50, calories: 20 },
        big: { id: "big", price: 100, calories: 40 },
    }

    static stuff = {
        cheese: { id: "cheese", price: 10, calories: 20 },
        salad: { id: "salad", price: 20, calories: 5 },
        fries: { id: "fries", price: 15, calories: 10 },
    };

    static toppings = {
        spice: { id: "spice", price: 15, calories: 0 },
        mayo: { id: "mayo", price: 20, calories: 5 }
    };


    constructor(size, stuffing) {
         this.size = size;
         this.stuffing = stuffing;
         this.topping = [];
    }



  
    addTopping(topping) {

        let foundTopping = this.topping.find(x => x.id == topping.id);

        if ( foundTopping === undefined){
            this.topping.push(topping);
        }
    }

    removeTopping(topping) {

        let index = this.topping.indexOf(topping);

        if (index >= 0) {
            this.topping.splice(index, 1);
        }
    }

    getToppings() {
        return this.topping;
    }



    getSize() {
        return this.size;

    }

    getStuffing() {
        return this.stuffing;
    }
    // расчитать цену
    countPrice() {
        let amount = 0;

        for (let item of this.topping){
            amount += item.price;
        }

        amount += this.size.price;
        amount += this.stuffing.price;
        return amount;
    }
    // расчитать калории
    countCalories() {
        let energie = 0;

        for (let item of this.topping){
            energie += item.calories;
        }

        energie += this.size.calories;
        energie += this.stuffing.calories;
        return energie;
    }
}

window.addEventListener("load",init);

function init(){
    document.querySelector('#radio-size').addEventListener('change', handleSizeButtonClick);
    document.querySelector('#radio-stuff').addEventListener('change', handleStuffButtonClick);
    document.querySelector('#checkbox-toppings').addEventListener('change', handleToppingButtonClick);
    document.querySelector('#submit').addEventListener('click', handleSubmitClick);
}

function handleSizeButtonClick(event){

    BigMac.size = Hamburger.sizes[event.target.value];

}

function handleStuffButtonClick(event){

    BigMac.stuffing = Hamburger.stuff[event.target.value];

}

function handleToppingButtonClick(event){
    // Если переключатель включен то добавляем
    if (event.target.checked) {
        BigMac.addTopping(Hamburger.toppings[event.target.value])
        // иначе убираем
    } else{
        BigMac.removeTopping(Hamburger.toppings[event.target.value])
    }

}


function handleSubmitClick(event){

    document.getElementById('price').innerHTML = BigMac.countPrice();
    document.getElementById('energie').innerHTML = BigMac.countCalories();
}

let BigMac = new Hamburger(Hamburger.sizes.small, Hamburger.stuff.cheese);
