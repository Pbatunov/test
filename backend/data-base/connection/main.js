module.exports = (({logger, userData, res, responseToFront, isAuth, isRegistration}) => {
    console.log(1234);

    const crypto = require('crypto');
    const mysql = require('mysql2');
    const {name, login} = userData;
    const password = crypto.createHash('md5').update(userData.password).digest('hex');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'openDB',
        password: '',
    });


    connection.connect((error) => {
        if (error) {
            connection.end();

            return logger(error.message);
        }
        console.log(isRegistration);

        if (isRegistration) {

            const sqlReqestSelectString = `SELECT * FROM users WHERE login = '${login}'`;

            connection.query(sqlReqestSelectString, (error, result) => {
                if (error) {
                    connection.end();

                    return logger(error);
                }

                if (result.length) {
                    connection.end();

                    responseToFront.message = 'Такой логин уже существует';

                    res.send(responseToFront);
                    return logger(responseToFront.message);
                }

                const sqlRequestInsertString = `INSERT INTO users (name, login, password, score) VALUES ('${name}', '${login}', '${password}', '0')`;

                connection.execute(sqlRequestInsertString, (error) => {
                    if (error) {
                        connection.end();

                        return logger(error);
                    }

                    responseToFront.success = true;

                    res.send(responseToFront);
                    connection.end();

                });
            });

            return;
        }

        if (isAuth) {
            const sqlReqestSelectString = `SELECT * FROM users WHERE login = '${login}' and password = '${password}'`;

            connection.query(sqlReqestSelectString, (error, result) => {
                if (error) {

                    connection.end();

                    return logger(error);
                }

                if (!result.length) {
                    responseToFront.message = 'Неверный логин или пароль!';

                    res.send(responseToFront);
                    connection.end();
                    return logger(responseToFront.message);
                }
                responseToFront.success = true;
                res.send(responseToFront);

                console.log({result});

            });
        }
    });
});