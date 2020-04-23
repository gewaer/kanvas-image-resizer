FROM ubuntu:16.04

LABEL maintainer="Wilkins Ortiz, wilkins@mctekk.com"

#Setup directories
RUN mkdir /app
WORKDIR /app
COPY . .

#Install Node.js and other dependencies
RUN apt-get update \ 
    && apt-get install -y curl \
    && apt-get install -y git 

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@6.4.1 \
    && npm install -g n \
    && n 10.11.0

#Install pm2
RUN npm install -g pm2@4.2.3

#Building
RUN npm install

#Expose port
EXPOSE 80

#Run app
CMD ["pm2-runtime", "index.js"]
