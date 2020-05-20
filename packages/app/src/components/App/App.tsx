import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ClimateTable from '../ClimateTable';

const App = () => {
  return (
    <div className="App">
      <div>Header</div>
      <Switch>
        <Route path="/" exact component={ClimateTable} />
        <Route path="/table" component={ClimateTable} />
      </Switch>
    </div>
  );
};

export default App;
