import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import InfiniteScroll from "../pages/InfiniteScroll";
import PlayerBoard from "../pages/PlayerBoard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/infinitescroll" component={InfiniteScroll} />
      <Route path="/playerboard" component={PlayerBoard} />
    </Switch>
  );
};

export default Routes;
