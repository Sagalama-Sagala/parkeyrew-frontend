FROM node:lts-alpine

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json ./

# Fix permissions for packages
# RUN npm config set unsafe-perm true

RUN yarn install
RUN yarn add global serve

# Bundle app source
COPY . ./

RUN chown -R node:node /app/node_modules

# start app
CMD ["yarn", "run", "dev"]
