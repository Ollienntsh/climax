import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from './Input';
import Flex from '../Flex';

storiesOf('ui-kit/Atoms/Input', module).add('Input', () => (
  <Flex padding={20}>
    <Input placeholder="Enter text..." />
  </Flex>
));
