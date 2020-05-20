import React, { useEffect } from 'react';
import { Table } from '@climax/ui-kit';
import { connect } from 'react-redux';

import { fetchData } from './state/reducer';
import { RootState } from '../../redux/reducers';
import { MonthlyAvg } from '../../types';
import { MonthNames } from '../../constants';
import { AppState } from '../App/state/reducer';

export interface ClimateTableProps {
  data?: MonthlyAvg[];
  fetchData: typeof fetchData;
  fetching?: boolean;
  filters: AppState;
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

const ClimateTable = ({
  data,
  fetchData,
  fetching,
  filters,
}: ClimateTableProps) => {
  useEffect(() => {
    fetchData({});
  }, [fetchData, filters]);

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="gcm"
      loading={fetching}
    />
  );
};

export default connect(
  (state: RootState) => ({
    data: state.climateTable.data,
    fetching: state.climateTable.fetching,
    filters: state.app,
  }),
  { fetchData },
)(ClimateTable);
