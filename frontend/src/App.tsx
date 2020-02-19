import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from './hoc/Layout'
import GameBuilder from './containers/GameBuilder/GameBuilder';
import PersonalStatsBuilder from './containers/PersonalStatsBuilder/PersonalStatsBuilder';
function App() {
  return (
    <Router>
      <header className="App-header">
      </header>
      <Layout>
        <Route path="/game">
        <GameBuilder></GameBuilder>
        </Route>
        <Route path="/home">
        <PersonalStatsBuilder></PersonalStatsBuilder>
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
