import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import AboutBuilder from './containers/AboutBuilder/AboutBuilder';
import GameBuilder from './containers/GameBuilder/GameBuilder';
import Leaderbord from './containers/LeaderbordBuilder/LeaderbordBuilder';
import PersonalStatsBuilder from './containers/PersonalStatsBuilder/PersonalStatsBuilder';
import Layout from './hoc/Layout';
import GameListBuilder from './containers/GameListBuilder/GameListBuilder';
import NewGameBuilderForm from './containers/NewGameBuilder/NewGameBuilder';
import NewPlayerBuilderForm from './containers/NewPlayerBuilder/NewPlayerBuilder';
import { GameOverviewBuilder } from './containers/GameOverview/GameOverview';
import { TournamentUnfinishedListBuilder } from './containers/TournamentListBuilder/TournamentUnfinishedListBuilder';
import TournamentBuilder from './containers/TournamentBuilder/TournamentBuilder';
import InfoBuilder from './containers/InfoBuilder/InfoBuilder';
import ArchiveBuilder from './containers/ArchiveBuilder/ArchiveBuilder';

function App() {
  return (
    <Router>
      <header className="App-header">
      </header>
      <Layout>
        <Route path="/new-game">
          <NewGameBuilderForm />
        </Route>
        <Route path="/new-player">
          <NewPlayerBuilderForm />
        </Route>
        <Route path="/tournament/:id" component={TournamentBuilder} />
        <Route path="/game/:id" component={GameBuilder} />
        <Route path="/overview/:id" component={GameOverviewBuilder} />
        <Route path="/gamelist">
          <GameListBuilder />
        </Route>
        <Route path="/tournamentlist">
          <TournamentUnfinishedListBuilder />
        </Route>
        <Route path="/archive">
          <ArchiveBuilder />
        </Route>
        <Route path="/stats">
          <PersonalStatsBuilder />
        </Route>
        <Route path="/leaderbord">
          <Leaderbord />
        </Route>
        <Route path="/about">
          <AboutBuilder />
        </Route>
        <Route path="/info">
          <InfoBuilder />
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
