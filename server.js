(async () => {
    const fs = require('fs');
    const express = require('express');
    //const upload = require('express-fileupload');
    const auth = require('./backend/auth/main');
    const registration = require('./backend/registration/main');
    const app = express();
    const session = require('express-session');
    const port = 5500;
    const staticPath = 'static';

    app.use(express.static(staticPath));
    app.use(session({
        secret: 'secret value',
        resave: false,
        saveUninitialized: false,
    }));

    //app.use(upload());
    app.get('/', (req, res) => {

        req.session.save((err) => {
            if (err) {
                return res.sendStatus(400);
            }

            if (!req.session.auth) {
                res.write(fs.readFileSync(`${staticPath}/auth.html`));
                return res.end();
            }

            res.redirect('/profile');
            return res.end();
        });
    });

    app.get('/registration', ({res}) => {
        res.write(fs.readFileSync(`${staticPath}/registration.html`));
        res.end();
    });

    app.get('/profile', (req, res) => {
        console.log({profileSession: req.session});
        req.session.save((err) => {
            if (err) {
                return res.sendStatus(400);
            }

            if (!req.session.auth) {
                return res.redirect('/');
            }

            res.write(fs.readFileSync(`${staticPath}/profile.html`));
            res.end();
        });
    });

    const urlencodedParser = express.urlencoded({extended: true});

    app.post('/auth', urlencodedParser, function(req, res) {
        if (!req.body) return res.sendStatus(400);

        const userData = req.body;
        auth({userData, req, res});
    });

    app.post('/registration', urlencodedParser, function(req, res) {
        if (!req.body) return res.sendStatus(400);

        const userData = req.body;

        registration({userData, res});
    });

    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
})();
