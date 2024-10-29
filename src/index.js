import AppComponent from './App';
import { PersistGate } from 'redux-persist/integration/react';
import React, { Component } from 'react';
import { persistor, store } from './utils/redux/store';
import { Provider } from 'react-redux';
import AppLoader from './components/common/AppLoader';

export default class Root extends Component {
  render() {
    return (
      // <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={false}>
          <AppComponent />
        </PersistGate>
      </Provider >
      //  </React.StrictMode>
    );
  }
}
