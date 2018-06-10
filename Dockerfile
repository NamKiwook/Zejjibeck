FROM node:latest

RUN mkdir -p /app/MainServer
RUN mkdir -p /app/Client

WORKDIR /app/MainServer

EXPOSE 3000 

ENTRYPOINT ["npm"]
CMD ["start"]
