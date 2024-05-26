(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(() => {
    const authForm = document.querySelector('.js-auth-form');

    if (!authForm) {
        return;
    }

    const AJAX_URL = '/auth';

    const sendData = async (event) => {
        event.preventDefault();

        const authFormMessage = authForm.querySelector('.js-auth-form-message');
        const urlEncoded = new URLSearchParams(new FormData(authForm));

        try {
            const request = await fetch(AJAX_URL, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
                body: urlEncoded,
            });

            if (!request.ok) {
                return console.log(`error: ${request.statusText}`);
            }

            const response = await request.json();


            if (response.success) {
                location.href = '/profile';
                return;
            }

            authFormMessage.innerHTML = response.message;
        } catch (error) {
            console.log(error);
        }
    };

    const bindEvents = () => {

        authForm.addEventListener('submit', sendData);
    };

    const init = () => {
        bindEvents();
    };

    init();
})();
},{}]},{},[1]);
