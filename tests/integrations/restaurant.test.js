const setup = require('../setup');
const mongoose = require('mongoose');
const Restaurant = require('../../models/restaurant.model');
const request = setup.init();

let restaurant = null;
let object = null;

beforeEach(async () => {
  object = {
    name: 'test',
    price: '$'
  };
  restaurant = await Restaurant.create(object);
});

describe('getRestaurantById', () => {
  describe('when restaurant id exist', () => {
    it('should return restaurant', async () => {
      const response = await request.get(`/restaurants/${restaurant._id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: restaurant._id.toString(),
        ...object
      });
    });
  });
  describe('when restaurant id not exist', () => {
    it('should throw error ', async () => {
      const objectId = new mongoose.Types.ObjectId();
      const response = await request.get(`/restaurants/${objectId}`);
      expect(response.status).toBe(400);
      expect(response.text).toMatch('Restaurant id not exist');
    });
  });
});

describe('createRestaurant', () => {
  describe('when restaurant name is not taken', () => {
    it('shoud create restaurant', async () => {
      const object = { name: 'Expresso', price: '$' };
      const response = await request.post(`/restaurants`).send(object);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        ...object
      });
    });
  });

  describe('when restaurant name is taken', () => {
    it('shoud throw error', async () => {
      const response = await request.post(`/restaurants`).send(object);
      expect(response.status).toBe(400);
      expect(response.text).toMatch('Restaurant name is already taken');
    });
  });
});
