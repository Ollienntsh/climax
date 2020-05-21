import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import serializer from 'jest-emotion';
import snapshotDiff from 'snapshot-diff';

import ButtonGroup, { ButtonGroupItem } from './ButtonGroup';

expect.addSnapshotSerializer(serializer);

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

const defaultTree = renderer.create(<ButtonGroup items={[]} />).toJSON();

describe('ButtonGroup', () => {
  it('should render default', () => {
    expect(defaultTree).toMatchSnapshot();
  });
  it('should render with items', () => {
    const tree = renderer.create(<ButtonGroup items={items} />).toJSON();

    expect(snapshotDiff(tree, defaultTree)).toMatchSnapshot();
  });
  it('should render with second item preselected', () => {
    const tree = renderer
      .create(<ButtonGroup items={items} defaultValue={2} />)
      .toJSON();

    expect(snapshotDiff(tree, defaultTree)).toMatchSnapshot();
  });
  it('should trigger callback on selection change', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <ButtonGroup items={items} onChange={onChangeMock} />,
    );
    const secondButton = wrapper.find('input').at(1);

    secondButton.simulate('change');

    expect(onChangeMock).toHaveBeenCalled();
    wrapper.unmount();
  });
});
