import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BarChart } from '@climax/ui-kit';

import { fetchData } from './state/reducer';
import { RootState } from '../../redux/reducers';
import { AppState } from '../App/state/reducer';

export interface ClimateBarChartProps {
  data: { key: string; value: number }[];
  fetchData: typeof fetchData;
  filters: AppState;
}

const ClimateBarChart = ({
  data,
  fetchData,
  filters,
}: ClimateBarChartProps) => {
  useEffect(() => {
    fetchData({});
  }, [fetchData, filters]);

  return (
    <div style={{ height: 500 }}>
      <BarChart data={data} />
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    data: state.climateBarChart.data || [],
    filters: state.app,
  }),
  { fetchData },
)(ClimateBarChart);
