import React from 'react';
import { Provider } from 'react-redux';

import store from './src/store/store';
import { Root } from './src/navigation/Root';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
