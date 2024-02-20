module.exports = function (adminToken, client) {
    require('./privateApi/mDatabase')();

    const app = require('express')();
    const port = 26986;

    app.listen(port, () => console.log(`[INFO] API listening on port ${port}`));

    app.use(require('./routes/main'));
    app.use(require('./routes/status'));

    app.use((req, res, next) => {
        res.status(404).send({ data: 'Sorry, we cannot find that!' });
    });
}