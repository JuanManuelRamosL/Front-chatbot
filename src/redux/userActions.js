import axios from "axios";

// src/redux/userActions.js
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

// Acción para la solicitud del usuario
export const userRequest = () => ({
  type: USER_REQUEST
});

// Acción para el éxito de la solicitud del usuario
export const userSuccess = (user) => ({
  type: USER_SUCCESS,
  payload: user
});

// Acción para el fallo de la solicitud del usuario
export const userFailure = (error) => ({
  type: USER_FAILURE,
  payload: error
});

export const createUser = (userData) => async (dispatch) => {
    dispatch(userRequest());
  
    try {
      const response = await axios.post('http://localhost:3000/create-user', userData);
      dispatch(userSuccess(response.data));
      console.log('Usuario creado:', response.data);
    } catch (error) {
      dispatch(userFailure(error.message));
    }
  };