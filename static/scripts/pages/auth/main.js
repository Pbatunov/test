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