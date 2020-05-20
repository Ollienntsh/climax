import React, { useEffect } from 'react';
import { Table } from '@climax/ui-kit';
import { connect } from 'react-redux';

import { fetchData } from './state/reducer';
import { RootState } from '../../redux/reducers';
import { MonthlyAvg } from '../../types';
import { MonthNames } from '../../constants';

export interface ClimateTableProps {
  fetchData: typeof fetchData;
  data?: MonthlyAvg[];
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

const ClimateTable = ({ fetchData, data }: ClimateTableProps) => {
  useEffect(() => {
    fetchData({});
  }, [fetchData]);

  return <Table dataSource={data} columns={columns} rowKey="gcm" />;
};

export default connect(
  (state: RootState) => ({ data: state.climateTable.data }),
  { fetchData },
)(ClimateTable);
