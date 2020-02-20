import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from './hoc/Layout'
import GameBuilder from './containers/GameBuilder/GameBuilder';
import PersonalStatsBuilder from './containers/PersonalStatsBuilder/PersonalStatsBuilder';
import Leaderbord from './containers/LeaderbordBuilder/LeaderbordBuilder';
function App() {
  return (
    <Router>
      <header className="App-header">
      </header>
      <Layout>
        <Route path="/game">
        <GameBuilder></GameBuilder>
        </Route>
        <Route path="/stats">
        <PersonalStatsBuilder></PersonalStatsBuilder>
        </Route>
        <Route path="/leaderbord">
        <Leaderbord></Leaderbord>
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
