(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(() => {
    const regForm = document.querySelector('.js-reg-form');

    if (!regForm) {
        return;
    }

    const AJAX_URL = '/registration';

    const sendData = async (event) => {
        event.preventDefault();

        const regFormMessage = regForm.querySelector('.js-reg-form-message');
        const urlEncoded = new URLSearchParams(new FormData(regForm));

        try {
            const request = await fetch(AJAX_URL, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
                body: urlEncoded,
            });

            const response = await request.json();

            if (response.success) {
                location.href = '/';
                return;
            }

            regFormMessage.innerHTML = response.message;
        } catch (error) {
            console.log(error);
        }
    };

    const bindEvents = () => {

        regForm.addEventListener('submit', sendData);
    };

    const init = () => {
        bindEvents();
    };

    init();
})();
},{}]},{},[1]);
