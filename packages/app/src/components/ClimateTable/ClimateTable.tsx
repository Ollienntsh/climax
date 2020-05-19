import React, { useEffect } from 'react';
import { Table } from '@climax/ui-kit';
import { connect } from 'react-redux';

import { fetchData } from '../App/state/reducer';
import { RootState } from '../../redux/reducers';
import { MonthlyAvg } from '../../types';
import { MonthNames } from '../../constants';

export interface ClimateTableProps {
  fetchData: typeof fetchData;
  response?: MonthlyAvg[];
}

const columns = [
  {
    title: 'GCM',
    dataIndex: 'gcm',
    key: 'gcm',
  },
  ...MonthNames.map((monthName, index) => ({
    title: monthName,
    key: monthName,
    render: (row: MonthlyAvg) => (
      <div>{parseFloat(String(row.monthVals[index])).toFixed(2)}</div>
    ),
  })),
];

const ClimateTable = ({ fetchData, response }: ClimateTableProps) => {
  useEffect(() => {
    fetchData({});
  }, [fetchData]);

  return <Table dataSource={response} columns={columns} rowKey="gcm" />;
};

export default connect(
  (state: RootState) => ({ response: state.app.climate.response }),
  { fetchData },
)(ClimateTable);
