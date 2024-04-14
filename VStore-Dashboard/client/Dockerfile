# specify the parent image (although react is not a node app, we need node to install the project  dependencies)
FROM node:20-alpine

# specify the working directory of the image
WORKDIR /app 

# copy package.json to root directory (which is now /app)
COPY package*.json .

# install project dependencies
RUN npm install

# copy the rest of the project files to /app
COPY . .

# expose vite default PORT
EXPOSE 5173


# Start the app whenever the container is launched
CMD [ "npm","run","dev" ]