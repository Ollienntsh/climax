import React from 'react';
import { storiesOf } from '@storybook/react';

import InputNumber from './InputNumber';
import Flex from '../Flex';

storiesOf('ui-kit/Atoms/Input', module).add('InputNumber', () => (
  <Flex padding={20}>
    <InputNumber min={0} max={999} defaultValue={0} />
  </Flex>
));
