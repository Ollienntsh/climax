import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Select, Toggle } from '@climax/ui-kit';

import AddBarChartItemModal from '../AddBarChartItemModal';
import AddTableItemModal from '../AddTableItemModal';
import ClimateTable from '../ClimateTable';
import { addItem as addTableItem } from '../ClimateTable/state/reducer';
import ClimateBarChart from '../ClimateBarChart';
import { addItem as addBarChartItem } from '../ClimateBarChart/state/reducer';
import { setFilters } from './state/reducer';
import { Countries, Periods } from '../../constants';
import { RootState } from '../../redux/reducers';
import { Country, MeasurementType, Period } from '../../types';

export interface AppProps {
  addBarChartItem: typeof addBarChartItem;
  addTableItem: typeof addTableItem;
  country: Country;
  measurementType: MeasurementType;
  period: Period;
  setFilters: typeof setFilters;
}

const countryOptions = Countries.map(({ id, name }) => ({
  value: id,
  label: name,
}));

const periodOptions = Periods.map(({ id, fromYear, toYear }) => ({
  value: id,
  label: `${fromYear} - ${toYear}`,
}));

const App = ({
  addBarChartItem,
  addTableItem,
  country,
  measurementType,
  period,
  setFilters,
}: AppProps) => {
  const history = useHistory();
  const [
    addBarChartItemModalVisible,
    setAddBarChartItemModalVisible,
  ] = useState(false);
  const [addTableItemModalVisible, setAddTableItemModalVisible] = useState(
    false,
  );
  const [barChartActive, setBarChartActive] = useState(
    history.location.pathname.includes('/bar'),
  );

  const handleAddBarChartItem = useCallback(
    (gcm: string, value: number) => {
      addBarChartItem({
        value,
        key: gcm,
      });
      setAddBarChartItemModalVisible(false);
    },
    [addBarChartItem],
  );

  const handleAddTableItem = useCallback(
    (gcm: string, monthVals: number[]) => {
      addTableItem({
        fromYear: Number.NaN,
        toYear: Number.NaN,
        gcm,
        monthVals,
        variable: measurementType,
      });
      setAddTableItemModalVisible(false);
    },
    [addTableItem, measurementType],
  );

  const handleToggleChange = useCallback(
    (active: boolean) => {
      history.push(active ? '/bar' : '/');
      setBarChartActive(active);
    },
    [history],
  );

  return (
    <>
      <AddBarChartItemModal
        destroyOnClose
        visible={addBarChartItemModalVisible}
        onSubmit={handleAddBarChartItem}
        onCancel={() => setAddBarChartItemModalVisible(false)}
      />
      <AddTableItemModal
        destroyOnClose
        visible={addTableItemModalVisible}
        onSubmit={handleAddTableItem}
        onCancel={() => setAddTableItemModalVisible(false)}
      />
      <div
        style={{
          background: 'rgba(255,255,255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          boxShadow: '0px 2px 4px #888888',
          marginBottom: 4,
        }}
      >
        <Select
          options={countryOptions}
          value={country.id}
          onSelect={value =>
            setFilters({ country: Countries.find(({ id }) => id === value) })
          }
        />
        <Select
          options={periodOptions}
          value={period.id}
          onSelect={value =>
            setFilters({ period: Periods.find(({ id }) => id === value) })
          }
        />
        <ButtonGroup
          items={[
            { label: 'Temperature', value: 'tas' },
            { label: 'Precipitation', value: 'pr' },
          ]}
          value={measurementType}
          onChange={({ target: { value } }) =>
            setFilters({ measurementType: value })
          }
        />
        <Button
          type="primary"
          onClick={() =>
            barChartActive
              ? setAddBarChartItemModalVisible(true)
              : setAddTableItemModalVisible(true)
          }
        >
          Add item
        </Button>
        <div style={{ display: 'flex' }}>
          Bar Chart active:
          <Toggle checked={barChartActive} onChange={handleToggleChange} />
        </div>
      </div>
      <Switch>
        <Route path="/" exact component={ClimateTable} />
        <Route path="/table" component={ClimateTable} />
        <Route path="/bar" component={ClimateBarChart} />
      </Switch>
    </>
  );
};

export default connect(
  (state: RootState) => ({
    country: state.app.country,
    measurementType: state.app.measurementType,
    period: state.app.period,
  }),
  { addBarChartItem, addTableItem, setFilters },
)(App);
