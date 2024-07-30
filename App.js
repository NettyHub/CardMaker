import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardCreator from './CardCreator';
import CardList from './CardList';
import CardView from './CardView';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/create" component={CardCreator} />
            <Route path="/list" component={CardList} />
            <Route path="/view/:id" component={CardView} />
            <Route path="/" exact component={CardList} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;