import React from 'react';
import { connect } from 'react-redux';
import { Grid, Panel, Jumbotron, Alert, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchPost } from '../actions/post';
import { dateFormat } from '../utils/helpers';

class Post extends React.Component {
  componentDidMount() {
    const {fetchPost, match } = this.props;
    fetchPost(match.params.id);
  }

  render() {
    const { error, post } = this.props;

    if (error) {
      return <Alert bsStyle="danger">Can not show this post!<br />Error message: { error.message }</Alert>;
    }

    return (
      <Grid>
        <Jumbotron>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <ButtonToolbar>
            <Button bsSize="small" bsStyle="primary">Edit</Button>
            <Button bsSize="small" bsStyle="danger">Delete</Button>
          </ButtonToolbar>
        </Jumbotron>
        <Panel>
          <Panel.Heading>
            <Glyphicon glyph="user" /> Junior, 2 years
          </Panel.Heading>
          <Panel.Body>Comment comment comment \Comment comment commentComment comment commentComment comment comment</Panel.Body>
          <Panel.Footer>
            <ButtonToolbar>
              <Button bsSize="small" bsStyle="link" className="pull-right">Delete</Button>
              <Button bsSize="small" bsStyle="link" className="pull-right">Reply</Button>
            </ButtonToolbar>
          </Panel.Footer>
        </Panel>

      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post.item,
  error: state.post.error,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);