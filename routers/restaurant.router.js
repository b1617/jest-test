const express = require('express');
const restaurantController = require('../controllers/restaurant.controller');

const router = express.Router();

router.get('/:id', restaurantController.getRestaurantById);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.removeRestaurant);

module.exports = router;
