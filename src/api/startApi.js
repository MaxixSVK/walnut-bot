const express = require('express');

module.exports = function() {
    const app = express();
    const port = 2000;

    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(200).send({ message: 'Hello, world! This API is in pre-aplha version.' });
    });

    app.get('/status', (req, res) => {
        res.status(200).send({ status: 'ok' });
    });

    app.listen(port, () => {
        console.log(`[INFO] API is running on port ${port}`);
    });
};
