import React from "react";

import { Route, Switch } from "react-router-dom";

// 引入页面
import Home from "./pages/home";
import Page from "./pages/page";
import Counter from "pages/counter";
import UserInfo from "pages/UserInfo";
import NotFound from "./pages/notfound";

// import Loading from "components/Loading";

// 路由
const getRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/page" component={Page} />
    <Route path="/counter" component={Counter} />

    <Route path="/userinfo" component={UserInfo} />
    <Route component={NotFound} />
  </Switch>
);

export default getRouter;
