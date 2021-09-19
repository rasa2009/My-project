import Modal from "../modals/Modal.js";
import API from "./API.js";


class Authorization {
    constructor() {
        this.error = document.createElement('p');
        this.logInBtn = document.getElementById('logIn');
    }

    openModal() {
        if (localStorage.getItem('token') === 'Incorrect username or password' || localStorage.getItem('token') === null) {
            let modal = new Modal();
            modal.show('Вход', 'logSubmit');
            modal.addTitle('Авторизация');
            modal.addInput('укажите e-mail', 'Еmail', false, 'email');
            modal.addInput('укажите пароль', 'Пароль', true, 'pass');
            this.logIn()
        }
    }

    logIn() {
        let emailInput = document.getElementById('email');
        let passInput = document.getElementById('pass');
        let submitBtn = document.querySelector('.sbmt-btn');

        submitBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            API.authorization({
                email: emailInput.value,
                password: passInput.value
            })
                .then(response => response.text())
                .then(token => {
                    localStorage.setItem('token', token);
                    return token;
                })
                .then(token => this.compareUser(token));

        })
    }

    compareUser(token) {
        if (token === 'Incorrect username or password' || token.length > 50) {
            this.error.textContent = token;
            this.error.className = 'log-error';
            document.body.prepend(this.error);

            setTimeout(() => {
                this.error.remove();
            }, 10000);

        } else if (token.length < 50) {
            this.checkLogin();
            document.querySelector('.modal').remove();
            location.reload(true);

        } else {
            localStorage.removeItem('token');
        }

    }

    checkLogin() {
        if (localStorage.getItem('token') !== 'Incorrect username or password' && localStorage.getItem('token') !== null && localStorage.getItem('token').length < 50) {
            this.logInBtn.textContent = 'Создать визит';
            this.logInBtn.id = 'addCard';
            API.getCards().then(response => console.log(response));
        }
    }
}

export default Authorization;