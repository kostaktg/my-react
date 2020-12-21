import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './hoc/Layout/Layout';
import Builder from './containers/Builder/Builder';
import ChackoutContainer from './containers/CheckoutContainer/CheckoutContainer';

class App extends Component {
  // state = {
  //   show: true
  // };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   },5000)
  // }

  render() {
    return (
      <div>
          <Layout>
            {/* {this.state.show ? <Builder/> : null} */}
            <Switch>
              <Route path="/checkout" component={ChackoutContainer} />
              <Route path="/" component={Builder} />
            </Switch>
       
            {/* <Builder />
            <ChackoutContainer /> */}
          </Layout>
      </div>
    );
  }
}

export default App;
