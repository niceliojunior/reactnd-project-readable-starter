import React from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import { Grid, Panel, Jumbotron, Alert, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { fetchPost } from '../actions/post';
import { fetchCommentsByPost } from '../actions/comments';
import { capitalize, dateFormat } from '../utils/helpers';

class Post extends React.Component {
  componentDidMount() {
    const {fetchPost, fetchCommentsByPost, match } = this.props;
    
    fetchPost(match.params.id);
    fetchCommentsByPost(match.params.id);
  }

  render() {
    const { error, post, comments } = this.props;

    if (error) {
      return <Alert bsStyle="danger">Can not show this post!<br />Error message: { error.message }</Alert>;
    }

    return (
      <Grid>
        <Jumbotron>
          <h3>{post.title}</h3>
          <p><Glyphicon glyph="user" /> {post.author}, {dateFormat(post.timestamp)}</p>
          <p>{post.body}</p>
          <ButtonToolbar>
            <Button bsSize="small" bsStyle="primary">Edit</Button>
            <Button bsSize="small" bsStyle="danger">Delete</Button>
          </ButtonToolbar>
        </Jumbotron>

        {comments.map((comment) => 
          <Panel key={comment.id}>
            <Panel.Heading>
              <Glyphicon glyph="user" /> {capitalize(comment.author)}, {dateFormat(comment.timestamp)}
            </Panel.Heading>
            <Panel.Body>{comment.body}</Panel.Body>
            <Panel.Footer>
              <ButtonToolbar>
                <Button bsSize="small" bsStyle="link" className="pull-right">Delete</Button>
                <Button bsSize="small" bsStyle="link" className="pull-right">Edit</Button>
              </ButtonToolbar>
            </Panel.Footer>
          </Panel>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post.item,
  fetchPostError: state.post.error,
  comments: _.orderBy(state.comments.items, ['voteScore', 'timestamp'], ['desc', 'desc']),
  fetchCommentsByPostError: state.comments.error,

});

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    fetchCommentsByPost: (id) => dispatch(fetchCommentsByPost(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);