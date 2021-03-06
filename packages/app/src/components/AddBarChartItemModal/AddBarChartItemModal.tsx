import React, { useState } from 'react';
import {
  Button,
  Flex,
  Input,
  InputNumber,
  Modal,
  ModalProps,
} from '@climax/ui-kit';

export interface AddBarChartItemModalProps extends ModalProps {
  onSubmit(gcm: string, value: number): void;
}

export default ({ onSubmit, ...modalProps }: AddBarChartItemModalProps) => {
  const [gcm, setGcm] = useState('');
  const [value, setValue] = useState(0);

  return (
    <Modal {...modalProps} footer={null}>
      <form onSubmit={() => onSubmit(gcm, value)}>
        <Flex direction="column" gutter={4} padding={20}>
          <Flex alignItems="center" gutter={4}>
            <span>GCM:</span>
            <Input
              placeholder="gcm"
              value={gcm}
              onChange={({ target: { value } }) => setGcm(value)}
            />
          </Flex>
          <Flex alignItems="center" gutter={4}>
            <span>Value:</span>
            <InputNumber
              value={value}
              onChange={newValue => setValue(Number(newValue))}
            />
          </Flex>
          <Button disabled={!gcm} type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
