'use strict';

var form = document.getElementById('feedback');


var elements = form.querySelectorAll('.form-control'),
    btn = document.getElementById('send_mess'),
    patternName = /^[А-Яа-яЁёA-Za-z]+$/,
    patternMail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
    patternPhone = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/,
    patternSpam = /[^\<\>\[\]%\&'`]+$/,

    errorMess = [
			'Незаполненное поле ввода', // 0
			'Убедитесь, что имя введено правильно', // 1
			'Укажите Вашу электронную почту', // 2
			'Неверный формат электронной почты', // 3
			'Укажите тему сообщения', // 4
			'Напишите текст сообщения', // 5
      'Ваше сообщение похоже на спам, уберите специальные символы.', // 6
      'Введите номер телефона', //7
      'Не верный формат телефонного номера' //8
		],
    iserror = false;

btn.addEventListener('click', validForm);
form.addEventListener('focus', function () {
    var el = document.activeElement;
    if (el !== btn) cleanError(el);
}, true);

function validForm(e) {
    e.preventDefault();
    var formVal = getFormData(form),
        error;

    for (let property in formVal) {
        error = getError(formVal, property);
        if (error.length != 0) {
            iserror = true;
            showError(property, error);
        }
    }

    if (!iserror) {
        sendFormData(formVal);
    }
    return false;
}

function getError(formVal, property) {
   var error = '',
        validate = {
            'username': function () {
                if (formVal.username.length == 0 || patternName.test(formVal.username) == false) {
                    error = errorMess[1];
                }
            },
            'usermail': function () {
                if (formVal.usermail.length == 0) {
                    error = errorMess[2];
                } else if (patternMail.test(formVal.usermail) == false) {
                    error = errorMess[3];
                }
            },

            'subject': function () {
                if (formVal.subject.length == 0) {
                    error = errorMess[4];
                } else if (patternSpam.test(formVal.subject) == false) {
                    error = errorMess[6];
                }
            },
            'textmess': function () {
                if (formVal.textmess.length == 0) {
                    error = errorMess[5];
                } else if (patternSpam.test(formVal.textmess) == false) {
                    error = errorMess[6];
                }
            },
            'userphone': function () {
                if (formVal.userphone.length == 0) {
                    error = errorMess[7];
                } else if (patternMail.test(formVal.usermail) == false) {
                    error = errorMess[8];
                }
            },
        };
    validate[property]();
    return error;
}

	[].forEach.call(elements, function (element) {
    element.addEventListener('blur', function (e) {
        var formElement = e.target,
            property = formElement.getAttribute('name'),
            dataField = {};

        dataField[property] = formElement.value;

        const error = getError(dataField, property);
        if (error.length != 0) {
            showError(property, error);
        }
        return false;
    });
});

function showError(property, error) {
    var formElement = form.querySelector('[name=' + property + ']'),
        errorBox = formElement.parentElement.nextElementSibling;

    formElement.classList.add('form-control_error');
    errorBox.innerHTML = error;
    errorBox.style.display = 'block';
}

function cleanError(el) {
    const errorBox = el.parentElement.nextElementSibling;
    el.classList.remove('form-control_error');
    errorBox.removeAttribute('style');
}

function getFormData(form) {
    var controls = {};
    if (!form.elements) return '';
    for (let i = 0, ln = form.elements.length; i < ln; i++) {
        const element = form.elements[i];
        if (element.tagName.toLowerCase() !== 'button') {
            controls[element.name] = element.value;
        }
    }
    return controls;
}
