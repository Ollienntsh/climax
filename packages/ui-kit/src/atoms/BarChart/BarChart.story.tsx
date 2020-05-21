import React from 'react';
import { storiesOf } from '@storybook/react';

import BarChart from './BarChart';
import Flex from '../Flex';

const data = [
  { key: 'Croatia', value: 623 },
  { key: 'Macedonia', value: 367 },
  { key: 'Serbia', value: 510 },
  { key: 'BiH', value: 210 },
];

storiesOf('ui-kit/Atoms', module).add('BarChart', () => (
  <Flex height={600} padding={20}>
    <BarChart data={data} />
  </Flex>
));
