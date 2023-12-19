const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.status(200).send({
        message: 'Hi it\'s me Walnut, the bot!',
    });
});

module.exports = router;