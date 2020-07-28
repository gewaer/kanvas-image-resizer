const router = require('express').Router();

const imageController = require('./image');
const previewController = require('./preview');
const composeController = require('./compose');

router.use('/image', imageController)
router.use('/preview', previewController)
router.use('/compose', composeController)


module.exports = router;