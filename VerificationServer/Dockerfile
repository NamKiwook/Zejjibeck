FROM node:latest

ADD . /app
WORKDIR /app
RUN npm i npm@latest -g
RUN apt-get update && apt-get install -y

RUN rm -rf node_modules
RUN npm install

EXPOSE 3001
 
ENTRYPOINT ["npm"]
CMD ["start"]
