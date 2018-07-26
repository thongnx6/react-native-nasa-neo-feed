import React from 'react';
import { Provider } from 'react-redux';

import configurationStore from './app/config/store';
import Main from './app/screens/Main';

const store = configurationStore();

export default class App extends React.Component {
  componentWillMount() {
    // setup cache
    // setup analytics
    // setup local db
  }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
