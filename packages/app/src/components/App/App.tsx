import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ClimateBarChart from '../ClimateBarChart';
import ClimateTable from '../ClimateTable';
import Header from '../Header';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={ClimateTable} />
        <Route path="/table" component={ClimateTable} />
        <Route path="/bar" component={ClimateBarChart} />
      </Switch>
    </>
  );
};

export default App;
