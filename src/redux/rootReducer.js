// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer'; // No necesita llaves {} porque se exporta por defecto

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;

