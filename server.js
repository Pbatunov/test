(async () => {
    const fs = require('fs');
    const path = require('path');
    const express = require('express');
    //const upload = require('express-fileupload');
    const auth = require('./backend/auth/main');
    const registration = require('./backend/registration/main');
    const app = express();
    const session = require('express-session');
    const port = 5500;
    const staticPath = 'static';
    const ejsViewsPath = 'ejs-views';

    app.use(express.static(staticPath));
    app.use(session({
        secret: 'secret value',
        resave: false,
        saveUninitialized: false,
    }));

    app.set('views engine', 'ejs');

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
        req.session.save((err) => {
            if (err) {
                return res.sendStatus(400);
            }

            if (!req.session.auth) {
                return res.redirect('/');
            }

            // eslint-disable-next-line no-undef
            res.render(path.resolve(__dirname, ejsViewsPath, 'profile.ejs'), {
                user: {
                    name: req.session.username,
                },
            });

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

    app.post('/profile', urlencodedParser, function(req, res) {
        if (!req.session && !req.session.username) return res.sendStatus(400);

        const setUser = () => {
            res.send(req.session.username);
            res.end();
        };

        setUser();
    });

    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
})();
