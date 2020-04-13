const axios = require('axios').default;

const getImageFromUrl = async (url) => {

  const response = await axios.get(url, { responseType: 'arraybuffer'})
  if (response.status === 200) {
    const { data } = response;
    const imageBuffer = Buffer.from(data, 'binary')
    return imageBuffer;
  } else {
    throw new Error(response.statusText)
  }
  
}

module.exports = getImageFromUrl
