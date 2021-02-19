# kanvas-image-resizer
Image processing service used to rezise images from Amazon S3 bucket dynamically..

### Requirements
* Nodejs v10 or higher
* pm2
* nodemon


# Setup
Make a copy from `.env_default` file and rename the file with `.env`,
* `PORT` : this is the port the service will bind 
* `AMAZON_S3_BUCKET` : this will be the url from your amazon S3 bucket

install node modules
```bash
npm install
```

then you can run the service 
```bash
npm start   #this will boot the service using pm2
```

for development
```bash
npm run dev  #run with nodemon
```
```bash
npm run inspect  #run with nodemon and debugger enabled
```

# Example

```
http://localhost:3000/v1/image/rk4eRm.jpg?w=200
```

# Usage

### `GET -> /image/:image_name` ( resize image )
```
:image_name: amazon_bucket filename

#returns -> Image
```

query params

| Name | Type | Possible values | Required | Note |
| --- | --- | --- | --- | --- 
| w (width) | __number__ | any number > 0 | __false__ |
| h (height) | __number__ | any number > 0 | __false__ |
| fit | __string__ | cover, contain, fill, inside, outside | __false__ | 
| position | __string__ | top, right top, right, right bottom, bottom, left bottom, left, left top | __false__ | fit = `cover` or `contain` default is `center`
| strategy | __string__ | entropy, attention | __false__ | only works with fit = `cover`
| gravity | __string__ | north, northeast, east, southeast, south, southwest, west, northwest, center, centre | __false__ 


### `GET -> /status` ( Used to get the service status)
```
returns -> { "status": "ok" }
```





