(() => {
    const init = async () => {
        const userContainer = document.querySelector('.js-user');

        const AJAX_URL = '/profile';

        try {
            const request = await fetch(AJAX_URL, {
                method: 'POST',
            });

            if (!request.ok) {
                return console.log(`error: ${request.statusText}`);
            }

            const response = await request.text();

            userContainer.innerHTML = `, ${response}`;
        } catch (error) {
            console.log(error);
        }
    };

    init();

})();
