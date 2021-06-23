// Given when then
const restaurantService = require('../../services/restaurant.service');
const Restaurant = require('../../models/restaurant.model');

describe('create', () => {
  describe('when creating restaurant with new name ', () => {
    it('should create new restaurant', async () => {
      Restaurant.findOne = jest.fn(() => null);
      Restaurant.create = jest.fn(() => {
        return {
          _id: 1,
          name: 'Expresso',
          price: '$'
        };
      });
      const restaurant = await restaurantService.create({
        name: 'Expresso',
        price: '$'
      });

      expect(restaurant).toMatchObject({
        name: 'Expresso',
        price: '$'
      });
    });
  });
  describe('when creating restaurant with existing name', () => {
    it('should throw error', async () => {
      Restaurant.findOne = jest.fn(() => {
        return {
          _id: 1,
          name: 'Expresso',
          price: '$'
        };
      });
      expect(
        async () =>
          await restaurantService.create({ name: 'Expresso', price: '$' })
      ).rejects.toThrow('Restaurant name is already taken');
    });
  });
});

describe('getById', () => {
  describe('when getting restaurant by existing id', () => {
    it('should return restaurant', async () => {
      Restaurant.findById = jest.fn(() => {
        return {
          _id: 1,
          name: 'Expresso',
          price: '$'
        };
      });
      const restaurant = await restaurantService.getById(1);
      expect(restaurant).toMatchObject({
        _id: 1,
        name: 'Expresso',
        price: '$'
      });
    });
  });
});
