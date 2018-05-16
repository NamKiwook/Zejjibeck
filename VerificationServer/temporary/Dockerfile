FROM node:latest

ADD . /app
WORKDIR /app

RUN rm -r node_modules
RUN npm install
RUN apt-get update

EXPOSE 3000 

ENTRYPOINT ["npm"]
CMD ["start"]
