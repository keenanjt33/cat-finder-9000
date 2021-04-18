import React from 'react';
import { Router, Redirect } from '@reach/router';
import NotFoundPage from '../components/NotFoundPage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import SearchPage from '../components/SearchPage';
import CatPage from '../components/CatPage';

import '../styles/index.css';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // console.log('rest:');
  // console.log(rest);
  // console.log('protected route');
  // console.log(`authenticated: ${rest['authenticated']}`);
  // console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  // console.log(Component);
  // console.log(rest);
  // console.log('typeof Component');
  // console.log(typeof Component);
  // console.log('rest');
  // console.log({ ...rest });
  // console.log(
  //   `redirecting to login: ${process.env.NODE_ENV !== 'development'}`
  // );
  // return rest['authenticated'] || process.env.NODE_ENV === 'development' ? (
  return rest['authenticated'] ? (
    // <Component {...rest} />
    <Component {...rest} />
  ) : (
    <Redirect to="/" noThrow />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

// const sendLogout = deauthenticate => {
const sendLogout = () => {
  console.log('sendLogout');
  fetch('/api/user/logout', {
    method: 'POST'
    // headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json'
  }).then(response => {
    if (response.ok) {
      // successful logout
      // console.log('successful logout')
    } else {
      // something went wrong
      // we'll still make authenticated false though and pretend it worked
      // console.log('unsuccessful logout')
    }
    // console.log('logout response:', response.ok);
    // deauthenticate();
  });
};

// const ReachRouter = () => (
class ReachRouter extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authenticated: true
    };
    this.updateAuthenticated = this.updateAuthenticated.bind(this);
  }

  authenticate = () => {
    this.setState({ authenticated: true });
  };

  deauthenticate = () => {
    // console.log('deauthenticate from AppRouter');
    sendLogout();
    this.setState({ authenticated: false });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  async componentDidMount() {
    this._isMounted = true;
    // console.log('AppRouter: componentDidMount');
    // console.log(this.state);
    this.setState({ loading: true });
    fetch('/api/auth')
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ authenticated: data.authenticated, loading: false });
        }
        // console.log('/api/auth');
        // console.log(data);
      });
  }

  updateAuthenticated() {
    console.log('updateAuthenticated');
    try {
      fetch('/api/auth')
        .then(response => response.json())
        .then(data => {
          this.setState({ authenticated: data.authenticated, loading: false });
          // console.log('/api/auth');
          // console.log(data);
        });
    } catch (e) {
      console.log('failed to fetch auth status');
      console.log(e);
    }
  }

  render() {
    const { loading, authenticated } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    // console.log('reach router render');
    /*
          <PublicRoute
            component={Login}
            path="/login"
            authenticated={authenticated}
            authenticate={this.authenticate}
            updateAuthenticated={this.updateAuthenticated}
          />
    */
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
          <ProtectedRoute
            component={CatPage}
            path="/cat/:catId"
            authenticated={authenticated}
            authenticate={this.authenticate}
          />
          {/* <ProtectedRoute
          //   path="/property"
          //   authenticated={authenticated}
          //   component={PropertyPage}
            // />*/}
          <ProtectedRoute
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
