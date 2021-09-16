import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLogin, userObj }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {
        isLogin && (
          <Navigation userObj={userObj} />
        ) /* Login되었을때만 Navigation이 실행됌  */
      }
      <Switch /*Switch는 첫번째 매칭 되는 라우터만 실행하게 해준다. */>
        <>
          {isLogin ? (
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile refreshUser={refreshUser} userObj={userObj} />
              </Route>
            </div>
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
