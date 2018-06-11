import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Category from './Category';


export default class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/category/:id' component={Category} />
        </div>
      </Router>
    );
  }
}
