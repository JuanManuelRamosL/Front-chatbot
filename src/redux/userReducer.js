// src/redux/userReducer.js
import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from './userActions';

const initialState = {
  loading: false,
  user: null,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null
      };
    case USER_FAILURE:
      return {
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer; // Asegúrate de que sea exportado por defecto
