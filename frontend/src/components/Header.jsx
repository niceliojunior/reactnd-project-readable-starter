import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';
import { capitalize } from '../utils/helpers';

class Header extends React.Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { error, categories } = this.props;

    if (error) {
      return <div>Error! { error.message }</div>;
    }

    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Readable</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">Home</NavItem>
            {categories.map((category, number) => 
              <NavItem eventKey={number +2} key={`${category.path}`} componentClass={Link} href={`/${category.path}`} to={`/${category.path}`}>{capitalize(category.name)}</NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  error: state.categories.error,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);