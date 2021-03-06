import React from 'react';
import { Route, Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import TopNav from './components/TopNav';

import Toc from './Toc';

import ProductSearchExample from './pages/product-search';
import ConfiguratorExample from './pages/configurator';
import PricingExample from './pages/pricing';

import './index.css';

const history = createBrowserHistory();

/**
 * The application Root component which provides routing for authentication
 * and the different examples (from the ./examples folder)
 */
class Root extends React.Component {
  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <TopNav />

          <main className="content">
            {/* Home page with TOC */}
            <Route exact path="/" component={Toc} />

            {/* examples */}
            <Route path="/product-search" component={ProductSearchExample} />
            <Route
              path="/configurator/:productId?"
              component={ConfiguratorExample}
            />
            <Route path="/pricing/:productId?" component={PricingExample} />
          </main>
        </React.Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
