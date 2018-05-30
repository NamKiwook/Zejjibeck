FROM node:latest

ADD . /app
WORKDIR /app

RUN rm -r node_modules
RUN npm install
RUN apt-get update
 
ENTRYPOINT ["npm"]
CMD ["start"]
