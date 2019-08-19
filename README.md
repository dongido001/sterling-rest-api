# How To run the app

Availabe at ...

## Without Docker

1. Clone the repository to your local machine
    ```sh
    git clone https://github.com/dongido001/sterling-rest-api.git
    ```
2. Start up Redis
3. Start up Mongo
4. Set up your config details 
    ```sh
    cp .env.example .env
    ```
>> Make sure to set Mongo and Redis to their correct ports
5. Install dependencies
    ```sh
    npm install
    ```
6. Run the app:
    ```sh
    npm run serve
    ```

## Using Docker

1. Clone the repository to your local machine
    ```sh
    git clone https://github.com/dongido001/sterling-rest-api.git
    ```
2. Run the app
```sh
  docker-compose up
```

> The app should be available running at localhost:4000
( npm install take a while, so be patient :) )