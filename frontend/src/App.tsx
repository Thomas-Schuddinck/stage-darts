import React from 'react';
import './App.css';
import Layout from './hoc/Layout'
import GameBuilder from './containers/GameBuilder/GameBuilder';
import PersonalStatsBuilder from './containers/PersonalStatsBuilder/PersonalStatsBuilder';
function App() {
  return (
    <div>
      <header className="App-header">
      </header>
    <Layout>
      <GameBuilder></GameBuilder>
      <PersonalStatsBuilder></PersonalStatsBuilder>
    </Layout>
    </div>
  );
}

export default App;
