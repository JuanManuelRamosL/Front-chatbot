import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/userActions";
import { useAuth0 } from "@auth0/auth0-react";
import "./user.css";

function User() {
  const usersListState = useSelector((state) => state.user.users_list);
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="profile-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <div className="authenticated-user-info">
          <h2 className="profile-title">User Profile</h2>
          <div className="profile-card">
            <img
              src={user.picture}
              alt="User Avatar"
              className="profile-avatar"
            />
            <div className="profile-details">
              <p className="profile-name">Name: {user.name}</p>
              <p className="profile-email">Email: {user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>User not authenticated</p>
      )}

      <ul className="users-list">
        {usersListState && usersListState.length > 0 ? (
          usersListState.map((userItem) => (
            <li key={userItem.id} className="user-item">
              <p className="user-item-name">Name: {userItem.name}</p>
              <p className="user-item-score">Score: {userItem.puntaje}</p>
              <p className="user-item-resolved">
                Resolved Exercises: {userItem.ejercicios_resueltos}
              </p>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
}

export default User;
