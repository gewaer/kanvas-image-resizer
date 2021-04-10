const router = require('express').Router();
const sharp = require('sharp');
const path = require('path');
const { getImage } = require('../utils');

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  const {
    w = null,
    h = null,
    fit = 'cover',
    position = 'center',
    gravity = undefined,
    strategy = undefined
  } = req.query

  const width = w ? Number(w) : undefined;
  const height = h ? Number(h) : undefined;
  

  try {
    const originaImageBuffer = await getImage(name);
    const transformedImage = await sharp(originaImageBuffer)
    .resize({
      ...width && { width },
      ...height && { height },
      ...gravity && { gravity },
      ...strategy && { strategy },
      fit,
      position
    })
    .toFormat('jpeg')
    .toBuffer();

    res.contentType('image/jpeg')
    res.end(transformedImage, 'binary');
  }catch(e) {
    res.json({ msg: e.message })
  }
})

router.get('/*', async (req,res) => {
  const name = req.url.slice(1);
  const extension = path.extname(name)
  const {
    w = null,
    h = null,
    fit = 'cover',
    position = 'center',
    gravity = undefined,
    strategy = undefined
  } = req.query

  const width = w ? Number(w) : undefined;
  const height = h ? Number(h) : undefined;
  
  try {
    const originaImageBuffer = await getImage(name);

    if (extension.includes('.gif')) {
      res.contentType('image/gif')
      res.end(originaImageBuffer, 'binary');
      return;
    }

    const transformedImage = await sharp(originaImageBuffer)
    .resize({
      ...width && { width },
      ...height && { height },
      ...gravity && { gravity },
      ...strategy && { strategy },
      position,
      fit,
    })
    .toFormat('jpeg')
    .toBuffer();

    res.contentType('image/jpeg')
    res.end(transformedImage, 'binary');
  }catch(e) {
    res.json({ msg: e.message })
  }
})

module.exports = router;