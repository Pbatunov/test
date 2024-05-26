module.exports = (({userData, res}) => {
    const {login, password} = userData;
    const connection = require('../data-base/connection/main');

    const logger = (message) => {
        console.log(`Registration Error: ${message}`);
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
            responseToFront,
        };
    };

    const responseToFront = isValidate().responseToFront;


    const isAuth = true;

    if (isValidate().isValid) {
        connection({logger, userData, res, responseToFront, isAuth});
    }
});