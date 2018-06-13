import React from 'react';
import ListPosts from './ListPosts';
import { Grid } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <Grid>
        <ListPosts />
      </Grid>
    );
  }
}

export default Home;

