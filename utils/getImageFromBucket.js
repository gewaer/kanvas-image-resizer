const axios = require('axios').default;

const AMAZON_S3_BUCKET = process.env.AMAZON_S3_BUCKET || 'https://s3.amazonaws.com/mc-canvas/test';
const getImageFromBucket = async (name) => {

  if (!AMAZON_S3_BUCKET) throw new Error('No AMAZON_S3_BUCKET url provided');
  const response = await axios.get(`${AMAZON_S3_BUCKET}/${name}`, { responseType: 'arraybuffer'})
  if (response.status === 200) {
    const { data } = response;
    const imageBuffer = Buffer.from(data, 'binary')
    return imageBuffer;
  } else {
    throw new Error(response.statusText)
  }
  
}

module.exports = getImageFromBucket
