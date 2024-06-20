# GoldRush

## Used technologies

- NodeJS v20.11.1
- MongoDB v7.0.11

## Setup and run locally

1. Clone the repository (`main` branch):

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create a `.env` file and copy the content from `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Install the dependencies

   ```bash
   npm install
   ```

4. To run the server use following command:
   ```bash
   npm run dev
   ```

## Note

- Make sure Mongodb is installed and running on your machine before starting the server.
- Before running the server please schedule the events valid start and end dates in <b>eventsConfig.json</b> file in root directory of project.
- For authentication used JWT, to send protected API's request need to set authorization token in header as `Bearer`. 
## How to run with docker

You need to have installed `docker` and `docker compose` on your locale machine.

Run command below

`docker compose up --build`

## Postman Collections

In project directory you can find <b>Postman</b> API collections.
