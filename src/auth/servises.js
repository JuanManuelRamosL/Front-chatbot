import { auth } from "../credenciales";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const register = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  console.log(response);
  return response;
};

export const login = async (email, password) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  console.log(response);
  return response;
};

export const loginWithGoogle = async () => {
  const responseGoogle = new GoogleAuthProvider();
  const response = await signInWithPopup(auth, responseGoogle);
  console.log(response);
  return response;
};

export const logout = async () => {
  const response = await signOut(auth);
  console.log(response);
  return response;
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user || null);
  });
};
