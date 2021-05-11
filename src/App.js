import React, { lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';

import { getLibrary } from './utils/web3React';

import history from './routerHistory';
import './App.scss';

import Incinerator from './views/Incinerator';
import Layout from './components/Layout';

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router history={history}>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Incinerator />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Web3ReactProvider>
  );
}

export default React.memo(App);
