import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/userActions";
import { useAuth0 } from "@auth0/auth0-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../credenciales"; // Asegúrate de que este import coincida con la ubicación real del archivo
import "./user.css";

function User() {
  const usersListState = useSelector((state) => state.user.users_list);
  const dispatch = useDispatch();
  const {
    user: auth0User,
    isAuthenticated: isAuth0Authenticated,
    isLoading,
  } = useAuth0();
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());

    // Escuchar cambios en el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return () => unsubscribe(); // Limpia el observador cuando el componente se desmonta
  }, [dispatch]);

  // Priorizar mostrar datos de Firebase si el usuario está autenticado con Firebase, de lo contrario, usar Auth0
  const currentUser = firebaseUser || auth0User;
  const isAuthenticated = !!currentUser;

  const authenticatedUserData = usersListState?.find(
    (userItem) => userItem.email === currentUser?.email
  );

  return (
    <div className="profile-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <div className="authenticated-user-info">
          <h2 className="profile-title">User Profile</h2>
          <div className="profile-card">
            <img
              src={
                currentUser?.photoURL ||
                currentUser?.picture ||
                authenticatedUserData?.img
              }
              alt="User Avatar"
              className="profile-avatar"
            />
            <div className="profile-details">
              <p className="profile-name">
                Name:{" "}
                {currentUser?.displayName ||
                  currentUser?.name ||
                  authenticatedUserData?.name}
              </p>
              <p className="profile-email">Email: {currentUser?.email}</p>
              {authenticatedUserData && (
                <>
                  <p className="user-item-score">
                    Puntaje: {authenticatedUserData?.puntaje}
                  </p>
                  <p className="user-item-resolved">
                    Ejercicios resueltos:{" "}
                    {authenticatedUserData?.ejercicios_resueltos}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>User not authenticated</p>
      )}
    </div>
  );
}

export default User;
