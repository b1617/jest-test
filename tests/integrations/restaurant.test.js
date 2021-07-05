const setup = require('../setup');
const mongoose = require('mongoose');
const Restaurant = require('../../models/restaurant.model');
const request = setup.init();

let restaurant = null;
const object = {
  name: 'test',
  price: '$'
};

beforeEach(async () => {
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

describe('updateRestaurant', () => {
  describe('when restaurant id exist', () => {
    it('should update restaurant and return new object', async () => {
      const object = { name: 'testUpdate', price: '$$' };
      const response = await request
        .put(`/restaurants/${restaurant._id}`)
        .send(object);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: restaurant._id.toString(),
        ...object
      });
    });
  });

  describe('when restaurant id not exist', () => {
    it('shoud throw error', async () => {
      const objectId = new mongoose.Types.ObjectId();
      const response = await request
        .put(`/restaurants/${objectId}`)
        .send(object);
      expect(response.status).toBe(400);
      expect(response.text).toMatch('Restaurant id not exist');
    });
  });
});

describe('removeRestaurant', () => {
  describe('when restaurant id exist', () => {
    it('should remove restaurant and return it', async () => {
      const response = await request.delete(`/restaurants/${restaurant._id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: restaurant._id.toString(),
        ...object
      });
    });
  });

  describe('when restaurant id not exist', () => {
    it('shoud throw error', async () => {
      const objectId = new mongoose.Types.ObjectId();
      const response = await request.delete(`/restaurants/${objectId}`);
      expect(response.status).toBe(400);
      expect(response.text).toMatch('Restaurant id not exist');
    });
  });
});
