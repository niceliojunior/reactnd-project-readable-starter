import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Category from './Category';
import Post from './Post';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/:category' component={props => <Category {...props} />} />
        <Route exact path='/:category/:id' component={props => <Post {...props} />} />
      </div>    
    );
  }
}
