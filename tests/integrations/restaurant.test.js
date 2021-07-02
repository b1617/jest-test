const setup = require('../setup');
const mongoose = require('mongoose');
const request = setup.init();

describe('getRestaurantById', () => {
  const objectId = new mongoose.Types.ObjectId();
  describe('when restaurant id not exist', () => {
    it('should throw error ', async () => {
      const response = await request.get(`/restaurants/${objectId}`);
      expect(response.status).toBe(400);
      expect(response.text).toMatch('Restaurant id not exist');
    });
  });

  // describe('when restaurant id not exist', () => {
  //   it('should throw error', async () => {
  //     const response = await request.get(`/restaurants/${objectId}`);
  //     expect(response.status).toBe(400);
  //     console.log(response.error);
  //     expect(response.error.text.toString()).toBe('Restaurant id not exist');
  //   });
  // });
});
