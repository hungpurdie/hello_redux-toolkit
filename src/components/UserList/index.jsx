import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchUsersAsync } from "../../redux/actions/userAction";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllUsers, getIsFetching } from "redux/selectors/userSelector";

UserList.propTypes = {};

function UserList(props) {
  const users = useSelector(getAllUsers);
  const isFetching = useSelector(getIsFetching);

  const dispatch = useDispatch();

  const fetchUsers = useCallback(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
