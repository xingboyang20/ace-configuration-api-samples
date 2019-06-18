import React from 'react';
import AppBar from './components/AppBar';
import Layout from './components/Layout';
import Head from './components/Head';
import Footer from './components/Footer';
import { withRouter, Route, RouteComponentProps, Switch } from 'react-router';
import Home from './home';
import Products from './products';
import Summary from './summary';
import { SettingsContext, InitialSettings } from './Settings';

class MyApp extends React.Component<RouteComponentProps> {
  render() {
    const { location } = this.props;

    return (
      <SettingsContext.Provider value={InitialSettings}>
        <Head title="iHear Demo" />
        <Layout
          header={
            <AppBar
              title="iHear"
              subTitle="Personalized hearing aids"
              active={location.pathname}
            />
          }
          footer={<Footer />}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Home} />
            <Route path="/products/:brochureModelId" component={Products} />
            <Route path="/summary" component={Summary} />
            <Route render={props => <Home {...props} showHelp />} />
          </Switch>
        </Layout>
      </SettingsContext.Provider>
    );
  }
}

export default withRouter(MyApp);
