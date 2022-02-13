import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "redux/actions/userAction";
import { getAllUsers, getIsFetching } from "redux/selectors/userSelector";

function UserList(props) {
  const users = useSelector(getAllUsers);
  const isFetching = useSelector(getIsFetching);

  const dispatch = useDispatch();

  const getUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="ui segment container">
      {isFetching && (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading...</div>
        </div>
      )}
      <table className="ui collapsing table loading">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
