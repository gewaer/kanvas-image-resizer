const getImageFromBucket = require('./getImageFromBucket');
const getImageFromUrl = require('./getImageFromUrl');

const url = require('url');

const getImage = (nameOrUrl) => {
  const link = url.parse(nameOrUrl);

  if(link.protocol) {
    return getImageFromUrl(nameOrUrl)
  } else {
    return getImageFromBucket(nameOrUrl);
  }
}

module.exports = {
  getImageFromBucket,
  getImageFromUrl,
  getImage,
}