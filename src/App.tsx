import * as React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import TabBarNavigation from './TabBarNavigation';

// export const API_URL = 'http://localhost/api';
// export const API_URL = 'https://47410e43.ngrok.io/api';
export const API_URL = 'https://zdunekwilk.pl/api';

const App = () => {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <TabBarNavigation/>
    </Provider>
  );
};

export default App;
