import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './rootReducer'; // Asegúrate de importar el rootReducer correctamente

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
