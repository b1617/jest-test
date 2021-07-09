import React from 'react';
import RestaurantBoard from './RestaurantBoard';
import { render } from '@testing-library/react';

let getByTestId;

beforeEach(() => {
  const component = render(<RestaurantBoard />);
  getByTestId = component.getByTestId;
});

test('RestaurantBoard', () => {
  const title = getByTestId('title');
  expect(title.textContent).toBe('All Restaurants');
});
