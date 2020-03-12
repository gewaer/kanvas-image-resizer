const router = require('express').Router();

const imageController = require('./image');

router.use('/image', imageController)


module.exports = router;