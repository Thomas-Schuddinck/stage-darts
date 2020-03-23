import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import AboutBuilder from './containers/AboutBuilder/AboutBuilder';
import GameBuilder from './containers/GameBuilder/GameBuilder';
import Leaderbord from './containers/LeaderbordBuilder/LeaderbordBuilder';
import PersonalStatsBuilder from './containers/PersonalStatsBuilder/PersonalStatsBuilder';
import Layout from './hoc/Layout';
import GameListBuilder from './containers/GameListBuilder/GameListBuilder';


function App() {
  return (
    <Router>
      <header className="App-header">
      </header>
      <Layout>
        <Route path="/game/:id"  component={GameBuilder} />
        <Route path="/gamelist">
          <GameListBuilder></GameListBuilder>
        </Route>
        <Route path="/stats">
          <PersonalStatsBuilder></PersonalStatsBuilder>
        </Route>
        <Route path="/leaderbord">
          <Leaderbord></Leaderbord>
        </Route>
        <Route path="/about">
          <AboutBuilder />
        </Route>

      </Layout>
    </Router>
  );
}

export default App;
