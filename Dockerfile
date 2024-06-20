FROM node:16.13.2

# Install tzdata package to configure timezone
RUN apt-get update && apt-get install -y tzdata

# Set the timezone environment variable
ENV TZ=Asia/Yerevan

WORKDIR /usr/app

COPY package.json .

COPY . .

# Bcrypt needs to be compiled each time you do npm install to crate a version 
# for the operating system that is running on since it is written in C.
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install

CMD ["npm", "run", "dev"]