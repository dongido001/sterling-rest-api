require("@babel/register")({
    presets: ["@babel/preset-env"]
});

const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const cache = require('express-redis-cache')();

const {jwt, permit} = require('./jwt');
const errorHandler = require('./error-handler');

// import permit from './jwt/permit';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// global error handler   
app.use(errorHandler);

// api routes
app.get('/', (req, res) => res.send('Hello World! :)'))

app.use('/users', require('./controllers/UserController'));
app.use('/teams', require('./controllers/TeamController'));
app.use('/fixtures', require('./controllers/FixtureController'));

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log(`App listening on port ${port}! => ( http://localhost:${port}/ )`)
})

module.exports = app;