import React, { useCallback, useState } from 'react';
import {
  Button,
  Flex,
  Input,
  InputNumber,
  Modal,
  ModalProps,
} from '@climax/ui-kit';

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
      <Flex direction="column" gutter={4} padding={20}>
        <Flex alignItems="center" gutter={4}>
          <span>GCM:</span>
          <Input
            placeholder="gcm"
            value={gcm}
            onChange={({ target: { value } }) => setGcm(value)}
          />
        </Flex>
        <Flex direction="column" gutter={2}>
          {MonthNames.map((monthName, index) => (
            <Flex key={monthName} gutter={4}>
              <Flex width={100}>{monthName}: </Flex>
              <InputNumber
                value={monthVals[index]}
                onChange={newValue => updateMonthValue(Number(newValue), index)}
              />
            </Flex>
          ))}
        </Flex>
        <Button
          onClick={() => onSubmit(gcm, monthVals)}
          type="primary"
          size="large"
        >
          Submit
        </Button>
      </Flex>
    </Modal>
  );
};
