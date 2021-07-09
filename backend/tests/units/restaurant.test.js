// Given when then
const restaurantService = require('../../services/restaurant.service');
const Restaurant = require('../../models/restaurant.model');

const object = {
  _id: 1,
  name: 'test',
  price: '$'
};

describe('getById', () => {
  describe('when getting restaurant with existing id', () => {
    it('should return restaurant', async () => {
      Restaurant.findById = jest.fn(() => {
        return {
          ...object
        };
      });
      const restaurant = await restaurantService.getById(1);
      expect(restaurant).toMatchObject({
        ...object
      });
    });
  });

  describe('when getting restaurant with none existing id', () => {
    it('should throw error', async () => {
      Restaurant.findById = jest.fn(() => null);
      expect(async () => await restaurantService.getById(1)).rejects.toThrow(
        'Restaurant id not exist'
      );
    });
  });
});

describe('create', () => {
  describe('when creating restaurant with new name ', () => {
    it('should create new restaurant', async () => {
      Restaurant.findOne = jest.fn(() => null);
      Restaurant.create = jest.fn((object) => {
        return {
          _id: 1,
          ...object
        };
      });
      const restaurant = await restaurantService.create({
        ...object
      });

      expect(restaurant).toMatchObject({
        ...object
      });
    });
  });
  describe('when creating restaurant with existing name', () => {
    it('should throw error', async () => {
      Restaurant.findOne = jest.fn((object) => {
        return {
          _id: 1,
          ...object
        };
      });
      expect(
        async () =>
          await restaurantService.create({
            ...object
          })
      ).rejects.toThrow('Restaurant name is already taken');
    });
  });
});

describe('update', () => {
  describe('when updating restaurant with existing id', () => {
    it('should update and return updated restaurant', async () => {
      Restaurant.findByIdAndUpdate = jest.fn((id, object) => {
        return {
          _id: id,
          ...object
        };
      });
      const restaurant = await restaurantService.update(1, {
        ...object
      });
      expect(restaurant).toMatchObject({
        ...object
      });
    });
  });

  describe('when updating restaurant with none existing id', () => {
    it('should throw error', async () => {
      Restaurant.findByIdAndUpdate = jest.fn(() => null);
      expect(async () => {
        await restaurantService.update(1, {
          ...object
        });
      }).rejects.toThrow('Restaurant id not exist');
    });
  });
});

describe('remove', () => {
  describe('when removing restaurant with existing id', () => {
    it('should remove and return removed restaurant', async () => {
      Restaurant.findByIdAndRemove = jest.fn((id) => {
        return {
          ...object
        };
      });
      const restaurant = await restaurantService.remove(1);
      expect(restaurant).toMatchObject({
        ...object
      });
    });
  });
  describe('when removing restaurant with not existing id', () => {
    it('should throw error', () => {
      Restaurant.findByIdAndRemove = jest.fn(() => null);
      expect(async () => {
        await restaurantService.remove(1);
      }).rejects.toThrow('Restaurant id not exist');
    });
  });
});
