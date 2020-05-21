import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BarChart, Flex } from '@climax/ui-kit';

import { fetchData } from './state/reducer';
import { RootState } from '../../redux/reducers';
import { AppState } from '../App/state/reducer';

export interface ClimateBarChartProps {
  data: { key: string; value: number }[];
  fetchData: typeof fetchData;
  filters: AppState;
}

export const ClimateBarChart = ({
  data,
  fetchData,
  filters,
}: ClimateBarChartProps) => {
  useEffect(() => {
    fetchData({});
  }, [fetchData, filters]);

  return (
    <Flex alignItems="center" height={600} padding={20}>
      <BarChart data={data} />
    </Flex>
  );
};

export default connect(
  (state: RootState) => ({
    data: state.climateBarChart.data || [],
    filters: state.app,
  }),
  { fetchData },
)(ClimateBarChart);
