import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from './Select';
import Flex from '../Flex';

const options = [
  {
    value: 1,
    label: 'First',
  },
  {
    value: 2,
    label: 'Second',
  },
  {
    value: 3,
    label: 'Third',
  },
];

storiesOf('ui-kit/Atoms', module).add('Select', () => (
  <Flex padding={20}>
    <Select defaultValue={1} options={options} />
  </Flex>
));
