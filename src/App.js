import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BooksList from './components/BooksList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BooksList} />
        <BooksList />
      </Switch>
    </Router>
  );
};

export default App;
