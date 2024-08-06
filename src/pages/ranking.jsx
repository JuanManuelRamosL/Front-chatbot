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
  const sortedUsers = [...usersListState].sort((a, b) => b.puntaje - a.puntaje);
  return (
    <div>
      <h1>Ranking</h1>
      <ul>
        {sortedUsers && sortedUsers.length > 0 ? (
          sortedUsers.map((user) => (
            <li key={user.id}>
              <p className="nombres">
                <strong className="nombres">Nombre:</strong> {user.name}
              </p>
              <p className="nombres">
                <strong className="nombres">Puntaje:</strong> {user.puntaje}
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

export default Rank;
