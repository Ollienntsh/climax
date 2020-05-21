import React from 'react';
import { storiesOf } from '@storybook/react';

import Flex from './Flex';

const Items = () => (
  <>
    <div>First item</div>
    <div>Second item</div>
    <div>Third item</div>
  </>
);

storiesOf('ui-kit/Atoms/Flex', module)
  .add('With horizontal gutter', () => (
    <Flex gutter={4} padding={20}>
      <Items />
    </Flex>
  ))
  .add('With vertical gutter', () => (
    <Flex direction="column" gutter={4} padding={20}>
      <Items />
    </Flex>
  ))
  .add('With space between', () => (
    <Flex gutter={4} justifyContent="space-between" padding={20}>
      <Items />
    </Flex>
  ));
