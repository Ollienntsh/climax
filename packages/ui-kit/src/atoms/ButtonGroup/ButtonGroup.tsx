import React from 'react';
import { Radio as AntRadio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

export interface ButtonGroupItem<T> {
  label: string;
  value: T;
}

export interface ButtonGroupProps<T> {
  items: ButtonGroupItem<T>[];
  onChange?(e: RadioChangeEvent): void;
  value: T;
}

export default function <T>({ items, onChange, value }: ButtonGroupProps<T>) {
  return (
    <AntRadio.Group onChange={onChange} value={value} buttonStyle="solid">
      {items.map(({ label, value }, index) => (
        <AntRadio.Button key={index} value={value}>
          {label}
        </AntRadio.Button>
      ))}
    </AntRadio.Group>
  );
}
