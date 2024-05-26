(async () => {
    const fs = require('fs');
    const express = require('express');
    //const upload = require('express-fileupload');
    const auth = require('./backend/auth/main');
    const registration = require('./backend/registration/main');
    const app = express();
    const port = 3000;
    const staticPath = 'static';

    //app.use(upload());
    app.get('/', ({res}) => {
        res.write(fs.readFileSync(`${staticPath}/index.html`));
        res.end();
    });

    app.get('/registration', ({res}) => {
        res.write(fs.readFileSync(`${staticPath}/registration.html`));
        res.end();
    });

    app.get('/profile', ({res}) => {
        res.write(fs.readFileSync(`${staticPath}/profile.html`));
        res.end();
    });

    const urlencodedParser = express.urlencoded({extended: true});

    app.post('/auth', urlencodedParser, function(req, res) {
        if (!req.body) return res.sendStatus(400);

        const userData = req.body;

        auth({userData, res});
    });

    app.post('/registration', urlencodedParser, function(req, res) {
        if (!req.body) return res.sendStatus(400);

        const userData = req.body;

        registration({userData, res});
    });

    app.use(express.static(staticPath));
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
})();