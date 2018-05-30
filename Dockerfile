FROM node:latest

ADD MainServer /app/MainServer
ADD Client /app/Client

WORKDIR /app
RUN npm i npm@latest -g
RUN apt-get update && apt-get install -y

WORKDIR /app/Client
RUN rm -rf node_modules
RUN npm install
RUN npm run build

WORKDIR /app/MainServer
RUN cd /app/MainServer
RUN rm -rf node_modules
RUN npm install


EXPOSE 3000 

ENTRYPOINT ["npm"]
CMD ["start"]
