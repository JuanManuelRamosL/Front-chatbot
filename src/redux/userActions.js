import axios from "axios";

// src/redux/userActions.js
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const USERS = 'USERS';
export const USERS_LIST = 'USERS_LIST';

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

// Acción para el éxito de la solicitud del usuario
export const usersSuccess = (users) => ({
  type: USERS,
  payload: users
});

export const usersListSuccess = (users_list) => ({
  type: USERS_LIST,
  payload: users_list
});

export const createUser = (userData) => async (dispatch) => {
    dispatch(userRequest());
  
    try {
      const response = await axios.post('https://back-chatbot.vercel.app/create-user', userData);
      dispatch(userSuccess(response.data));
      console.log('Usuario creado:', response.data);
    } catch (error) {
      dispatch(userFailure(error.message));
    }
  };

  export const updateUser = (userData) => async (dispatch) => {
    try {
      const response = await axios.put('https://back-chatbot.vercel.app/update-puntaje', userData);
      dispatch(usersSuccess(response.data));
      console.log('Usuario actualizado:', response.data);
    } catch (error) {
      dispatch(userFailure(error.message));
    }
  };

  export const getUsers = () => async (dispatch) => {
    try {
      const response = await axios.get('https://back-chatbot.vercel.app/users');
      dispatch(usersListSuccess(response.data));
      console.log('Usuarios:', response.data);
    } catch (error) {
      dispatch(userFailure(error.message));
    }
  };