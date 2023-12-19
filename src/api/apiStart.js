const app = require('express')();
const port = 26986;

module.exports = function (adminToken, client) {
    app.listen(
        port,
        () => console.log(`[INFO] API listening on port ${port}`)
    )

    const helloRoute = require('./routes/hello');
    const serverConfigRoute = require('./routes/serverConfig')(adminToken, client);

    app.use(helloRoute);
    app.use(serverConfigRoute);
}