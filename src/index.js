import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {composeWithDevTools} from 'redux-devtools-extension';

import { createStore, combineReducers, compose } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAz46cnvuHKFe5mp4Lm8qx40kWCUMsgmjI",
    authDomain: "bootcamp2-963aa.firebaseapp.com",
    databaseURL: "https://bootcamp2-963aa.firebaseio.com",
    projectId: "bootcamp2-963aa",
    storageBucket: "bootcamp2-963aa.appspot.com",
    messagingSenderId: "452738533544",
    appId: "1:452738533544:web:a18623a9cba64e75891a9d"
  };

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
  });
  
  // Create store with reducers
  const store = createStore(rootReducer, composeWithDevTools());
  const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  };
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
  };
ReactDOM.render(
<Provider store={store}>
<ReactReduxFirebaseProvider {...rrfProps}>
<BrowserRouter>
    <App />
  </BrowserRouter>
</ReactReduxFirebaseProvider>
</Provider>
,
  document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

