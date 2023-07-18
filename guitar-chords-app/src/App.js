import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/songSlice';
import SongList from './components/SongList';
import SongEditor from './components/SongEditor';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const store = configureStore({
  reducer: {
    song: songReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <SongList />
            </div>
            <div className="col-md-8">
              <SongEditor />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
