import React from 'react';
import ListPosts from './ListPosts';
import { Grid } from 'react-bootstrap';

class Category extends React.Component {
  render() {
    return (
      <Grid>
        <ListPosts match={this.props.match} />
      </Grid>
    )
  }
}

export default Category;