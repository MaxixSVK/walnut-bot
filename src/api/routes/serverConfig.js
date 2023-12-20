const express = require('express');

module.exports = (adminToken, client) => {
    const router = express.Router();

    router.get('/serverconfig/:serverId', async (req, res) => {
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
            ...configSchemaData[0]._doc,
        });
    });

    return router;
}