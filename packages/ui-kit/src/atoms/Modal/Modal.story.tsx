import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Modal from './Modal';
import Button from '../Button';
import Flex from '../Flex';

const ModalContainer = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        Modal content
      </Modal>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
    </>
  );
};

storiesOf('ui-kit/Atoms', module).add('Modal', () => (
  <Flex padding={20}>
    <ModalContainer />
  </Flex>
));
