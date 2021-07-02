const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongo = require('./helpers/mongo.helper');
const restaurantRouter = require('./routers/restaurant.router');

const app = express();

const port = 8080 || process.env.PORT;

const env = process.env.NODE_ENV.trim() || 'testing';

if (env === 'development') {
  mongo.connect();
  app.use(morgan('tiny'));
  app.use(cors());
}
app.use(express.json());

app.use('/restaurants', restaurantRouter);

const server = app.listen(port, () => {
  console.log('Server running on ', port);
});

module.exports = server;
