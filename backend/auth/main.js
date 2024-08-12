module.exports = (({userData, req, res}) => {
    const {login, password} = userData;
    const connection = require('../data-base/connection/main');

    const logger = (message) => {
        console.log(`Auth Error: ${message}`);
    };

    const isValidate = () => {
        let isValid = false;
        const responseToFront = {
            success: false,
        };

        if (!login.trim()) {
            responseToFront.message = 'Введите логин';

            res.send(responseToFront);
            logger(responseToFront.message);
            return isValid;
        }

        if (!password.trim()) {
            responseToFront.message = 'Введите пароль';

            res.send(responseToFront);
            logger(responseToFront.message);
            return isValid;
        }


        isValid = true;

        return {
            isValid,
        };
    };

    const isAuth = true;

    if (isValidate().isValid) {
        connection({logger, userData, req, res, isAuth});
    }
});
