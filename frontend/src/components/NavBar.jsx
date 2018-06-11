import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';
import { capitalize } from '../utils/helpers';

class NavBar extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
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
            <NavItem eventKey={0} componentClass={Link} href="/" to="/">Home</NavItem>
            {categories.map((category, number) => 
              <NavItem eventKey={number +1} key={`${category.path}`} componentClass={Link} href={`/category/${category.path}`} to={`/category/${category.path}`}>{capitalize(category.name)}</NavItem>
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

export default connect(mapStateToProps)(NavBar);