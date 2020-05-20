import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import ClimateTable from '../ClimateTable';
import ClimateBarChart from '../ClimateBarChart';
import { setFilters } from './state/reducer';
import { Countries } from '../../constants';

export interface AppProps {
  setFilters: typeof setFilters;
}

const App = ({ setFilters }: AppProps) => {
  return (
    <div>
      <div onClick={() => setFilters({ country: Countries[3] })}>Click me</div>
      <Switch>
        <Route path="/" exact component={ClimateTable} />
        <Route path="/table" component={ClimateTable} />
        <Route path="/bar" component={ClimateBarChart} />
      </Switch>
    </div>
  );
};

export default connect(undefined, { setFilters })(App);
