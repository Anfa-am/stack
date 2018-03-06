import React, { Component } from 'react';
import { connect } from 'react-redux';

import './home.sass';

import Nav from '../../components/Nav/Nav';

class Home extends Component {

  render() {
    return (
      !this.props.isLoading &&
      <div className="home-wrapper">
        <Nav></Nav>
        <h1>hey guy</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.function.currencyLoading,
    loggedIn: state.function.isUserLoggedIn
  };
}

export default connect(mapStateToProps)(Home);

