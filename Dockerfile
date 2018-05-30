FROM node:latest

ADD MainServer /app
ADD Client /app

WORKDIR /app/MainServer

RUN cd /app/Client
RUN rm -r node_modules
RUN npm install
RUN npm run build

RUN cd /app/MainServer
RUN rm -r node_modules
RUN npm install

RUN apt-get update

EXPOSE 3000 

ENTRYPOINT ["npm"]
CMD ["start"]
