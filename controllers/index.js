const router = require('express').Router();

const imageController = require('./image');
const previewController = require('./preview');

router.use('/image', imageController)
router.use('/preview', previewController)


module.exports = router;