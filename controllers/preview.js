const router = require('express').Router();
const { getWebSiteInfo } = require('../utils/preview');
const URL_REGEX = new RegExp(/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/);

router.get('/', async (req, res) => {
  const { query } = req;
  const { url = '' } = query;
  if (url) {
    if (URL_REGEX.test(url)) {
      const info = await getWebSiteInfo(url);
      res.json(info);
    } else {
      res.status(401).json({
        message: 'Invalid url'
      })
    }
  }else {
    res.status(401).json({
      message: 'No url provided'
    })
  }
})

module.exports = router;