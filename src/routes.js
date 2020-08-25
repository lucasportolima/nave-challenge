import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

import Login from "./views/Login";
import Home from "./views/Home";
import FormNavers from "./views/FormNavers";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (<Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )}
  />)
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (<Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )}
  />)
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <AuthenticatedRoute exact path="/" component={Login} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/naver" component={FormNavers} />
      <PrivateRoute exact path="/naver/:id" component={FormNavers} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
