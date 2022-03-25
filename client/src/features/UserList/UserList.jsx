import { Button, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/selectors/userSelector";
import { fetchUsers } from "./userListSlice";

function UserList(props) {
  const users = useSelector(getAllUsers);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchUsers());
  };

  return (
    <Row>
      <Button onClick={handleClick}>Get users</Button>
      <table className="ui collapsing table loading">
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Row>
  );
}

export default UserList;
