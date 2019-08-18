# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12

RUN mkdir -p /home/node/api/node_modules
# Set the working directory to /api

WORKDIR /home/node/api

# copy package.json into the container at /api
COPY package*.json ./
COPY .env ./

# install dependencies
RUN npm install -g yarn && yarn install

# Copy the current directory contents into the container at /api
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 4000

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
RUN /wait

# Run the app when the container launches
CMD ["node", "./index.js"]