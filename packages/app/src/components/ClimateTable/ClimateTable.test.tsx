import React from 'react';
import renderer from 'react-test-renderer';
import serializer from 'jest-emotion';

import { ClimateTable } from './ClimateTable';
import mockData from './mockData';
import { Countries, Periods } from '../../constants';

expect.addSnapshotSerializer(serializer);

describe('ClimateTable', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });
  it('should render default', () => {
    const tree = renderer
      .create(
        <ClimateTable
          fetchData={jest.fn() as any}
          data={mockData}
          filters={{
            country: Countries[0],
            measurementType: 'tas',
            period: Periods[0],
          }}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
