import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import MovieDetails from './views/movie-details';
import Movies from './views/movies';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Movies} />
      <Route path="/movies/:id" component={MovieDetails} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
);

export default App;
