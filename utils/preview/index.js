const axios = require('axios').default;
const cheerio = require('cheerio');
const URL = require('url');
const getWebSiteInfo = async (url) => {
  if(url) {
    try {
      let requestUrl = url;
      const parsedUrl = URL.parse(url);
      if (!parsedUrl.protocol) requestUrl = `http://${requestUrl}`
      
      const { data } = await axios.get(requestUrl)
      const $ = cheerio.load(data);
      const image = $('meta[property="og:image"]').attr('content');
      const originalUrl = $('meta[property="og:url"]').attr('content');
      const imageWidth = $('meta[property="og:image:width"]').attr('content');
      const imageHeight = $('meta[property="og:image:height"]').attr('content');
      const title = $('meta[property="og:title"]').attr('content');
      const description = $('meta[property="og:description"]').attr('content');
      const twitterTitle = $('meta[name="twitter:title"]').attr('content');
      const twitterDescription = $('meta[name="twitter:description"]').attr('content');
      const twitterImage = $('meta[name="twitter:image"]').attr('content');
      const twitterUrl = $('meta[name="twitter:url"]').attr('content');
      const titleNode = $('title').text();
      const firstImgUrl = $('img').first().attr('src');
      let defaultImageUrl;
      if(firstImgUrl) {
        const parsedFirstImageUrl = URL.parse(firstImgUrl)
        if (!parsedFirstImageUrl.host) {
          defaultImageUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedFirstImageUrl.path}`
        }    
      }

      const response = {
        originalUrl: originalUrl || twitterUrl,
        title: title || twitterTitle || titleNode ,
        description: description || twitterDescription,
        image: {
          url: image || twitterImage || defaultImageUrl,
          width: imageWidth,
          height: imageHeight,
        }
      }

      return response
  } catch (e) {
    throw new Error(e);
  }
}
  return undefined;
}


module.exports = {
  getWebSiteInfo,
}