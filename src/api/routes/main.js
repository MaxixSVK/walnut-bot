const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({ data: 'Welcome to Walnut API' });
});

module.exports = router;