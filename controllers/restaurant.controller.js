const restaurantService = require('../services/restaurant.service');

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.create(req.body);
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantService.getById(req.params.id);
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { createRestaurant, getRestaurantById };
