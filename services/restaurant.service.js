const Restaurant = require('../models/restaurant.model');

const getById = async (id) => {
  const restaurant = Restaurant.findById(id);
  if (!restaurant) {
    throw new Error('Restaurant id not exist');
  }
  return restaurant;
};

const create = async (object) => {
  const isExistingRestaurant = await Restaurant.findOne({
    name: object.name
  });
  if (isExistingRestaurant) {
    throw new Error('Restaurant name is already taken');
  }
  return await Restaurant.create(object);
};

const update = async (id, object) => {
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, object, {
    new: true
  });
  if (!updatedRestaurant) {
    throw new Error('Restaurant id not exist');
  }
  return updatedRestaurant;
};

const remove = async (id) => {
  const removedRestaurant = await Restaurant.findByIdAndRemove(id);
  if (!removedRestaurant) {
    throw new Error('Restaurant id not exist');
  }
  return removedRestaurant;
};

module.exports = { create, getById, update, remove };
