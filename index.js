const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongo = require('./helpers/mongo.helper');
const restaurantRouter = require('./routers/restaurant.router');

const app = express();
mongo.connect();

const port = 8080 || process.env.PORT;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use('/restaurants', restaurantRouter);

app.listen(port, () => {
  console.log('Server running on ', port);
});
