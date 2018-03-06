import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom'

import { closeSearch, openSearch, openLoginModal } from '../../actions'
import './nav.sass';

class Nav extends React.Component {
  render() {
    return (
        <nav className="underline">
          <ul>
            <li> <NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          </ul>
        </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.function.isUserLoggedIn
  };
}

export default connect(mapStateToProps)(Nav);

