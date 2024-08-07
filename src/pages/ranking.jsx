import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/userActions";
import "./rank.css";

function Rank() {
  const usersListState = useSelector((state) => state.user.users_list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    console.log(usersListState);
  }, []);
  const sortedUsers = Array.isArray(usersListState)
    ? [...usersListState].sort((a, b) => b.puntaje - a.puntaje).slice(0, 5)
    : [];
  return (
    <div className="container-ranking">
      <h1 className="title-ranking">Ranking</h1>
      <ul className="ul-container">
        {sortedUsers && sortedUsers.length > 0 ? (
          sortedUsers.map((user) => (
            <div key={user.id} className="container-user">
              <div className="container-image-user">
                <img src={user.img} alt="user picture" className="img-user" />
              </div>
              <div className="container-info-users-rank">
                <p className="name-usuario">
                  <strong className="name-usuario">Usuario:</strong>{" "}
                  <b className="user">{user.name}</b>
                </p>
                <div className="container-puntaje"></div>
                <p className="name-usuario">
                  <strong className="name-usuario">Puntaje:</strong>{" "}
                  {user.puntaje}
                </p>
                <p className="name-usuario">
                  <strong className="name-usuario">Resueltos:</strong>{" "}
                  {user.ejercicios_resueltos}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
}

export default Rank;
