import React from 'react';
import _ from "lodash";
import { connect } from 'react-redux';
import { PageHeader, Alert } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchPostsByCategory } from '../actions/posts';
import { capitalize, dateFormat } from '../utils/helpers';

const linkCell = (cell, row) => {
  return (
    <Link to={`/${row.category}/${row.id}`}>{cell}</Link>
  )
}

const columns = [{
  dataField: 'id',
  text: 'Id',
  hidden: true
},{
  dataField: 'title',
  text: 'Title',
  sort: true,
  formatter: linkCell
}, {
  dataField: 'category',
  text: 'Category',
  sort: true,
  formatter: capitalize
}, {
  dataField: 'author',
  text: 'Author',
  sort: true,
  formatter: capitalize
}, {
  dataField: 'timestamp',
  text: 'Creation Date',
  sort: true,
  formatter: dateFormat
}, {
  dataField: 'voteScore',
  text: 'Raking',
  sort: true
}];

class ListPosts extends React.Component {
  componentDidMount() {
    const {fetchPosts, fetchPostsByCategory, match } = this.props;

    if (typeof match !== 'undefined') {
      fetchPostsByCategory(match.params.category)
    } else {
      fetchPosts();
    }
  }

  render() {
    const { error, posts } = this.props;

    if (error) {
      return <Alert bsStyle="danger">Can not list posts! { error.message }</Alert>;
    }

    return (
      <div>
        <PageHeader><small>All posts</small></PageHeader>
        <BootstrapTable striped hover condensed keyField='id' data={posts} columns={columns} noDataIndication={ 'No posts to show' } />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: _.orderBy(state.posts.items, ['voteScore', 'timestamp'], ['desc', 'desc']),
  error: state.posts.error,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);