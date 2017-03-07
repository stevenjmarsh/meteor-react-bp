import React from "react";
import { Router, Route, browserHistory } from "react-router";
import Home from "../ui/pages/Home";
import PrivacyPolicy from "../ui/pages/PrivacyPolicy";
import Support from "../ui/pages/Support";

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/privacy-policy" component={PrivacyPolicy} />
    <Route path="/support" component={Support} />
  </Router>
);

export default Routes;
