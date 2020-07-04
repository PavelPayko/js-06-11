// первое и второе задание

let str = "'Приехали...' — вяло поду'мал Литовченко"
let regexp = /^'|(\s)'|'(\s)|'$/g
console.log(str.replace(regexp, '"'))

// третье задание

let form = document.querySelector('#myForm')
let formBtn = document.querySelector('.form__button')

formBtn.addEventListener('click', function(e) {
    e.preventDefault()
    let name = form.elements.name
    let phone = form.elements.phone
    let mail = form.elements.mail
    let text = form.elements.text
    let nameReg = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    let phoneReg = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g;
    let mailReg = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    if (validate(name, nameReg)) {
        console.log('zaregilsy')
    } else {
        name.style.borderColor = 'red'
        alert('Поле имя не заполненно или заполненно не верно')
    }
    if (validate(phone, phoneReg)) {
        console.log('zaregilsy')
    } else {
        phone.style.borderColor = 'red'
        alert('Поле телефон не заполненно или заполненно не верно')
    }
    if (validate(mail, mailReg)) {
        console.log('zaregilsy')
    } else {
        mail.style.borderColor = 'red'
        alert('Поле почта незаполненно или заполненно не верно')
    }

})

function validate(elem, regexp) {
    if (elem.value.match(regexp)) {
        return true;
    } else {
        return false
    }

}