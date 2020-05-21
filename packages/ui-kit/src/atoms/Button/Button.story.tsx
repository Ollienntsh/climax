import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';
import Flex from '../Flex';

storiesOf('ui-kit/Atoms/Button', module)
  .add('Default', () => (
    <Flex padding={20}>
      <Button>Default</Button>
    </Flex>
  ))
  .add('Primary', () => (
    <Flex padding={20}>
      <Button type="primary">Primary</Button>
    </Flex>
  ))
  .add('Danger (small)', () => (
    <Flex padding={20}>
      <Button danger size="small">
        Primary
      </Button>
    </Flex>
  ));
