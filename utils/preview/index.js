const axios = require("axios").default;
const cheerio = require("cheerio");
const URL = require("url");

const fixUrlProtocol = (url) => {
  if (url) {
    const parsed = URL.parse(url);
    if (!parsed.protocol) {
      return `http://${url.replace("//", "")}`;
    }
    return url;
  }
  return "";
};

const fixFavicon = (url, domain) => {
  if (url) {
    const parsed = new URL.URL(fixUrlProtocol(url), domain)
    return parsed.href;
  }
  return '';
}

const getUrl = (url) => {
  if (url) {
    let requestUrl = url;
    let parsedUrl = URL.parse(requestUrl);
    if (!parsedUrl.protocol) {
      requestUrl = `http://${requestUrl}`;
      parsedUrl = URL.parse(requestUrl);
    }
    return [parsedUrl, requestUrl];
  }
};

const getInfo = async (url) => {
  if (url) {
    try {
      const [parsedUrl, requestUrl] = getUrl(url);

      const { data } = await axios.get(requestUrl, {
        headers: { "User-Agent": "memod-link-preview-googlebot" },
      });
      const $ = cheerio.load(data);
      const image = $('meta[property="og:image"]').attr("content");
      const originalUrl = $('meta[property="og:url"]').attr("content");
      const imageWidth = $('meta[property="og:image:width"]').attr("content");
      const imageHeight = $('meta[property="og:image:height"]').attr("content");
      const title = $('meta[property="og:title"]').attr("content");
      const description = $('meta[property="og:description"]').attr("content");
      const twitterTitle = $('meta[name="twitter:title"]').attr("content");
      const twitterDescription = $('meta[name="twitter:description"]').attr(
        "content"
      );
      const twitterImage = $('meta[name="twitter:image"]').attr("content");
      const twitterUrl = $('meta[name="twitter:url"]').attr("content");
      const siteName = $('meta[property="og:site_name"]').attr("content");
      const twitterSiteName = $('meta[name="twitter:site"]').attr("content");
      const favicon = $('link[rel="icon"]').attr("href");
      const shortcutIcon = $('link[rel="shortcut icon"]').attr('href');
      const appleTouchIcon = $('link[rel="apple-touch-icon"]').attr('href');
      const imageSrc = $('link[rel="image_src"]').attr('href');
      const titleNode = $("title").text();
      const firstImgUrl = $("img").first().attr("src");
      let defaultImageUrl;
      if (firstImgUrl) {
        const parsedFirstImageUrl = URL.parse(firstImgUrl);
        if (!parsedFirstImageUrl.host) {
          defaultImageUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedFirstImageUrl.path}`;
        }
      }

      const imageUrl = fixUrlProtocol(image || twitterImage || defaultImageUrl);
      const icon = fixFavicon(favicon || appleTouchIcon || shortcutIcon || imageSrc);
      console.log(siteName)
      const response = {
        originalUrl: originalUrl || twitterUrl,
        title: title || twitterTitle || titleNode,
        description: description || twitterDescription,
        favicon: icon,
        siteName: siteName || twitterSiteName,
        hostname: parsedUrl.hostname,
        ...(imageUrl
          ? {
              image: {
                url: imageUrl,
                width: imageWidth,
                height: imageHeight,
              },
            }
          : {}),
      };

      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
  return undefined;
};

const getWebSiteInfo = async (url) => {
  if (url) {
    // Get base domain url object;
    const [parsedUrl] = getUrl(url);

    // get the info from the requested site;
    const info = await getInfo(url);
    const domainInfo = await getInfo(
      `${parsedUrl.protocol}//${parsedUrl.hostname}`
    );
    const response = {
      ...info,
    };

    for (key in domainInfo) {
      if (!(key in response) || !response[key]) {
        response[key] = domainInfo[key];
      }
    }

    return response;
  }
  return undefined;
};

module.exports = {
  getWebSiteInfo,
};
