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
  formatter: linkCell,
  headerClasses: 'tableHeader',
  headerStyle: {
    width: '40%'
  }
}, {
  dataField: 'category',
  text: 'Category',
  sort: true,
  formatter: capitalize,
  headerClasses: 'tableHeader'
}, {
  dataField: 'author',
  text: 'Author',
  sort: true,
  formatter: capitalize,
  headerClasses: 'tableHeader'
}, {
  dataField: 'timestamp',
  text: 'Date',
  sort: true,
  formatter: dateFormat,
  headerClasses: 'tableHeader'
}, {
  dataField: 'voteScore',
  text: 'Raking',
  sort: true,
  headerClasses: 'tableHeader'
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
    const { error, posts, match } = this.props;
    const pageHeaderTitle = typeof(match) !== 'undefined' ? `(filtered by: ${match.params.category})`: '';

    if (error) {
      return <Alert bsStyle="danger">Can not list posts!<br />Error message: { error.message }</Alert>;
    }

    return (
      <div>
        <PageHeader><small>All posts {pageHeaderTitle}</small></PageHeader>
        <BootstrapTable hover condensed keyField='id' data={posts} columns={columns} noDataIndication={ 'No posts to show' } />
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