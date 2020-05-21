import React, { useState } from 'react';
import { Button, Input, InputNumber, Modal, ModalProps } from '@climax/ui-kit';

export interface AddBarChartItemModalProps extends ModalProps {
  onSubmit(gcm: string, value: number): void;
}

export default ({ onSubmit, ...modalProps }: AddBarChartItemModalProps) => {
  const [gcm, setGcm] = useState('');
  const [value, setValue] = useState(0);

  return (
    <Modal {...modalProps} footer={null}>
      <div style={{ padding: 10 }}>
        GCM:{' '}
        <Input
          placeholder="gcm"
          value={gcm}
          onChange={({ target: { value } }) => setGcm(value)}
        />
      </div>
      <div style={{ padding: 10 }}>
        Value:{' '}
        <InputNumber
          value={value}
          onChange={newValue => setValue(Number(newValue))}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Button
          onClick={() => onSubmit(gcm, value)}
          type="primary"
          size="large"
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};
