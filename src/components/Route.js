import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "routes/Auth";
import Home from "routes/Home";

const AppRouter = ({ isLogin }) => {
  return (
    <Router>
      <Switch>
        {isLogin ? (
          <Route exact path="/">
            <Home />
          </Route>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
