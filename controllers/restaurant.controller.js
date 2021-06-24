const restaurantService = require('../services/restaurant.service');

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantService.getById(req.params.id);
    res.status(200).json(restaurant);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.create(req.body);
    res.status(200).json(restaurant);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.update(req.params.id, req.body);
    res.status(200).json(restaurant);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};

const removeRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.remove(req.params.id);
    res.status(200).json(restaurant);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};
module.exports = {
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  removeRestaurant
};
