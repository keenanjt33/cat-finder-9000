import React from 'react';
import { Router } from '@reach/router';
import NotFoundPage from '../components/NotFoundPage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import SearchPage from '../components/SearchPage';
import CatPage from '../components/CatPage';

import '../styles/index.css';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

// const ReachRouter = () => (
class ReachRouter extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { loading, authenticated } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <NavBar
          authenticated={authenticated}
          deauthenticate={this.deauthenticate}
        />
        <Router>
          <PublicRoute
            component={NotFoundPage}
            authenticated={authenticated}
            authenticate={this.authenticate}
            default
          />
          <PublicRoute
            component={CatPage}
            path="/cat/:catId"
            authenticated={authenticated}
            authenticate={this.authenticate}
          />
          <PublicRoute
            path="/search"
            authenticated={authenticated}
            component={SearchPage}
          />
          <PublicRoute
            path="/"
            authenticated={authenticated}
            component={HomePage}
          />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default ReachRouter;
