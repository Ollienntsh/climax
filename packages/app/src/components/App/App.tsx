import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Select, Toggle } from '@climax/ui-kit';

import ClimateTable from '../ClimateTable';
import ClimateBarChart from '../ClimateBarChart';
import { setFilters } from './state/reducer';
import { Countries, Periods } from '../../constants';
import { RootState } from '../../redux/reducers';
import { Country, Period } from '../../types';

export interface AppProps {
  country: Country;
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

const App = ({ country, period, setFilters }: AppProps) => {
  const history = useHistory();
  const [toggleActive, setToggleActive] = useState(
    history.location.pathname.includes('/bar'),
  );

  const handleToggleChange = useCallback(
    (active: boolean) => {
      history.push(active ? '/bar' : '/');
      setToggleActive(active);
    },
    [history],
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Select
          options={countryOptions}
          style={{ minWidth: 300 }}
          value={country.id}
          onSelect={value =>
            setFilters({ country: Countries.find(({ id }) => id === value) })
          }
        />
        <Select
          options={periodOptions}
          style={{ minWidth: 300 }}
          value={period.id}
          onSelect={value =>
            setFilters({ period: Periods.find(({ id }) => id === value) })
          }
        />
        <div style={{ display: 'flex' }}>
          Bar Chart active:
          <Toggle checked={toggleActive} onChange={handleToggleChange} />
        </div>
      </div>
      <Switch>
        <Route path="/" exact component={ClimateTable} />
        <Route path="/table" component={ClimateTable} />
        <Route path="/bar" component={ClimateBarChart} />
      </Switch>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    period: state.app.period,
    country: state.app.country,
  }),
  { setFilters },
)(App);
