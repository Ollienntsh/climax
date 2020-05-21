import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonGroup, { ButtonGroupItem } from './ButtonGroup';
import Flex from '../Flex';

const items: ButtonGroupItem<number>[] = [
  {
    value: 1,
    label: 'First',
  },
  {
    value: 2,
    label: 'Second',
  },
];

storiesOf('ui-kit/Atoms', module).add('ButtonGroup', () => (
  <Flex padding={20}>
    <ButtonGroup defaultValue={2} items={items} />
  </Flex>
));
