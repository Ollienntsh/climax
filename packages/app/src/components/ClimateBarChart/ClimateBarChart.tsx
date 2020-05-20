import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchData } from './state/reducer';
import { RootState } from '../../redux/reducers';
import { AnnualAvg } from '../../types';
import { AppState } from '../App/state/reducer';

export interface ClimateBarChartProps {
  data?: AnnualAvg[];
  fetchData: typeof fetchData;
  filters: Partial<AppState>;
}

const ClimateBarChart = ({
  data,
  fetchData,
  filters,
}: ClimateBarChartProps) => {
  useEffect(() => {
    fetchData({});
  }, [fetchData, filters]);

  return <div>{JSON.stringify(data)}</div>;
};

export default connect(
  (state: RootState) => ({
    data: state.climateBarChart.data,
    filters: {
      country: state.app.country,
    },
  }),
  { fetchData },
)(ClimateBarChart);
