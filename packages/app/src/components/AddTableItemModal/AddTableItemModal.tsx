import React, { useCallback, useState } from 'react';
import { Button, Input, InputNumber, Modal, ModalProps } from '@climax/ui-kit';

import { MonthNames } from '../../constants';

export interface AddTableItemModal extends ModalProps {
  onSubmit(gcm: string, monthVals: number[]): void;
}

export default ({ onSubmit, ...modalProps }: AddTableItemModal) => {
  const [gcm, setGcm] = useState('');
  const [monthVals, setMonthVals] = useState(Array(12).fill(0));

  const updateMonthValue = useCallback(
    (newValue: number, index: number) => {
      const monthValsCopy = [...monthVals];

      monthValsCopy[index] = newValue;
      setMonthVals(monthValsCopy);
    },
    [monthVals],
  );

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
        {MonthNames.map((monthName, index) => (
          <div key={monthName}>
            <div style={{ display: 'inline-block', width: 100 }}>
              {monthName}:{' '}
            </div>
            <InputNumber
              value={monthVals[index]}
              onChange={newValue => updateMonthValue(Number(newValue), index)}
            />
          </div>
        ))}
      </div>
      <div style={{ padding: 10 }}>
        <Button
          onClick={() => onSubmit(gcm, monthVals)}
          type="primary"
          size="large"
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};
