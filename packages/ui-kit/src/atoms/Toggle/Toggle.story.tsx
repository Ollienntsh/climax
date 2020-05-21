import React from 'react';
import { storiesOf } from '@storybook/react';

import Toggle from './Toggle';
import Flex from '../Flex';

storiesOf('ui-kit/Atoms', module).add('Toggle', () => (
  <Flex gutter={2} padding={20}>
    <span>Toggle:</span>
    <Toggle />
  </Flex>
));
