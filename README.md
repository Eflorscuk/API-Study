# Study of the functioning of an API

## Goals

The objective of this small study is to carry out reflections and material for future consultations for the development of REST APIs.
Project developed on Linux.

### Starting

#### Instaling npm package
``` npm install ```

#### Start server
``` npm start ```

### Node Version 
v14.19.0

### NPM version
6.14.16

## Dockerizing the API for development.

First, make sure you have docker or docker-compose installed on your machine with the command:
```
docker -v
```
If you don't have it, follow the instructions in the link: https://docs.docker.com/engine/install/ubuntu/

### Building your image

In the directory where the Dockerfile is, run the following command:
```
docker build . -t <name>/node-web-app
```

Run your image:
```
docker run -p 8000:8000 -d <name>/node-web-app
```
To test the API, run in your browser: http://localhost:8000/geeks/
