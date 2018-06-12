import React from 'react';
import ListPosts from './ListPosts';

class Home extends React.Component {
  render() {
    return (
      <div id="content">
        <ListPosts />
      </div>
    );
  }
}
export default Home;

