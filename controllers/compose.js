const router = require('express').Router();
const composeImage = require('../utils/compose');

const convertParamsToArray = (param) => (
  Array.isArray(param) ? param : [param]
)

router.get('/',async (req, res) => {
  const { query } = req;
  const { img, alt } = query;

  const imgs = convertParamsToArray(img);
  const alts = convertParamsToArray(alt);
  
  try {
    const imageBuffer = await composeImage(imgs, alts);
    res.contentType('image/jpeg');
    res.end(imageBuffer, 'binary');
  } catch(e) {
    res.json({
      error: e.message
    })
  }

})


module.exports = router;