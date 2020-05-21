import React from 'react';
import renderer from 'react-test-renderer';
import serializer from 'jest-emotion';
import snapshotDiff from 'snapshot-diff';

import Toggle from './Toggle';

expect.addSnapshotSerializer(serializer);

const defaultTree = renderer.create(<Toggle />).toJSON();

describe('Toggle', () => {
  it('should render default', () => {
    expect(defaultTree).toMatchSnapshot();
  });
  it('should render Toggle active', () => {
    const tree = renderer.create(<Toggle defaultChecked />).toJSON();

    expect(snapshotDiff(tree, defaultTree)).toMatchSnapshot();
  });
});
