import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Flex, Select, Toggle } from '@climax/ui-kit';

import AddBarChartItemModal from '../AddBarChartItemModal';
import AddTableItemModal from '../AddTableItemModal';

import { addItem as addTableItem } from '../ClimateTable/state/reducer';
import { addItem as addBarChartItem } from '../ClimateBarChart/state/reducer';

import { Countries, Periods } from '../../constants';
import { RootState } from '../../redux/reducers';
import { setFilters } from '../App/state/reducer';
import { Country, MeasurementType, Period } from '../../types';

import logo from '../../logo.png';

export interface HeaderProps {
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

const Header = ({
  addBarChartItem,
  addTableItem,
  country,
  measurementType,
  period,
  setFilters,
}: HeaderProps) => {
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

  useEffect(() => {
    return history.listen(() => {
      setBarChartActive(history.location.pathname.includes('/bar'));
    });
  }, [history]);

  return (
    <>
      {addBarChartItemModalVisible && (
        <AddBarChartItemModal
          destroyOnClose
          visible={addBarChartItemModalVisible}
          onSubmit={handleAddBarChartItem}
          onCancel={() => setAddBarChartItemModalVisible(false)}
        />
      )}
      {addTableItemModalVisible && (
        <AddTableItemModal
          destroyOnClose
          visible={addTableItemModalVisible}
          onSubmit={handleAddTableItem}
          onCancel={() => setAddTableItemModalVisible(false)}
        />
      )}
      <Flex
        alignItems="center"
        background="rgba(255,255,255, 0.15)"
        gutter={6}
        margin="0 0 4px 0"
        padding={10}
        shadow="0px 2px 4px #888888"
        width="100%"
      >
        <Link to="/">
          <img src={logo} alt="Climax" height="50" />
        </Link>
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
          shape="round"
          onClick={() =>
            barChartActive
              ? setAddBarChartItemModalVisible(true)
              : setAddTableItemModalVisible(true)
          }
        >
          + Add item
        </Button>
        <Flex margin="0 0 0 auto" gutter={2}>
          <span>Bar Chart active:</span>
          <Toggle checked={barChartActive} onChange={handleToggleChange} />
        </Flex>
      </Flex>
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
)(Header);
