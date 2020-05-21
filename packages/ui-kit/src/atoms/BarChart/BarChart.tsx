import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

export interface BarChartProps {
  data: { key: string; value: number }[];
}

export default ({ data }: BarChartProps) => (
  <ResponsiveBar
    data={data}
    keys={['value']}
    indexBy="key"
    margin={{ bottom: 50 }}
    colors={{ scheme: 'dark2' }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'key',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'value',
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    isInteractive={false}
  />
);
