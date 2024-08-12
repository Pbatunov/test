(async () => {
    const path = require('path');
    const express = require('express');
    //const upload = require('express-fileupload');
    const auth = require('./backend/auth/main');
    const registration = require('./backend/registration/main');
    const app = express();
    const session = require('express-session');
    const port = 5500;
    const staticPath = 'static';
    const viewsPath = 'views';
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
                return res.sendFile(path.resolve(__dirname, viewsPath, 'auth.html'));
            }

            res.redirect('/profile');
            return res.end();
        });
    });

    app.get('/registration', (req, res) => {
        if (!req.session.auth) {
            return res.sendFile(path.resolve(__dirname, viewsPath, 'registration.html'));
        }

            return res.redirect('/profile');
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

    app.post('/auth', urlencodedParser, (req, res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }

        auth({userData: req.body, req, res});
    });

    app.post('/registration', urlencodedParser, (req, res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }

        registration({userData: req.body, res});
    });

    app.post('/profile', urlencodedParser, (req, res) => {
        if (!req.session && !req.session.username) {
            return res.sendStatus(400);
        }
    });

    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
})();
