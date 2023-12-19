const app = require('express')();
const port = 26986;

module.exports = function (adminToken, client) {
    console.log(adminToken)
    app.listen(
        port,
        () => console.log(`[INFO] API listening on port ${port}`)
    )

    app.get('/hello', (req, res) => {
        res.status(200).send({
            message: 'Hi it\'s me Walnut, the bot!',
        });
    });

    app.get('/showServerConfig:serverId', async (req, res) => {
        const authToken = req.headers['authorization'];

        if (!authToken || authToken !== adminToken) {
            return res.status(403).send({
                message: 'Forbidden. Invalid token.',
            });
        }

        const serverId = req.params.serverId;
        const configSchema = client.configSchema

        const configSchemaData = await configSchema.find({
            guildId: serverId.slice(1)
        });

        if (!configSchemaData.length) {
            return res.status(404).send({
                message: 'Config not found.',
            });
        }
        res.status(200).send({
            message: 'Config found.',
            ...configSchemaData,
        });
    });
}