FROM node:latest

RUN mkdir -p /app/MainServer

WORKDIR /app/MainServer

EXPOSE 3000 

ENTRYPOINT ["npm"]
CMD ["start"]
