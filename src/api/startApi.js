/*
 * --------------------------------------------------------------------------------------------
 * Due to time constraints, this API will not be used as originally anticipated.
 * Therefore, I will not implement any endpoints here; it will only be used for health checks.
 * --------------------------------------------------------------------------------------------
 */

const express = require('express');

module.exports = function() {
    const app = express();
    const port = 4300;
    const package = require('../../package.json');

    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(200).send({ name: package.name, version: package.version });
    });

    app.get('/status', (req, res) => {
        res.status(200).send({ status: 'ok' });
    });

    app.listen(port, () => {
        console.log(`[INFO] API is running on port ${port}`);
    });
};