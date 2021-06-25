const setup = require('../setup');

const request = setup.init();

describe('getRestaurantById', () => {
  describe('when restaurant id exist', () => {
    it('should return restaurant object', async () => {
      const response = await request.get('/restaurants/1');
      expect(response.status).toBe(400);
    });
  });
});
