import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "../pages/home";
import About from "../pages/about";
// 새로운 페이지 컴포넌트들 불러오기
import VotePage from "../pages/VotePage";
import LunchVotePage from "../pages/LunchVotePage";
import ResourcesPage from "../pages/ResourcesPage";
import InsightsPage from "../pages/InsightsPage";

/**
* The router is imported in app.jsx
*
* Our site now has multiple routes - Home, About, and the new pages
* Each one is defined as a component in /pages
* We use Switch to only render one route at a time https://github.com/molefrog/wouter#switch-
*/
export default () => (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/vote" component={VotePage} />
      <Route path="/lunch" component={LunchVotePage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/insights" component={InsightsPage} />
    </Switch>
);