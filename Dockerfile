FROM node:10

LABEL maintainer="Wilkins Ortiz, wilkins@mctekk.com"

#Creating app folder
RUN mkdir -p /app

#Setting Working Directory
WORKDIR /app

#Copy files
COPY . .

#Install PM2
RUN npm install -g pm2

#Building app
RUN npm install

#Expose Port
EXPOSE 80

#Run app
CMD ["pm2-runtime", "index.js"]
