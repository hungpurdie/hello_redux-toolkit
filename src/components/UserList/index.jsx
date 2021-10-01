import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchUsersAsync } from '../../redux/actions/userAction';
import { connect } from 'react-redux';

UserList.propTypes = {};

function UserList(props) {
  const { users, fetchUsers, isFetching } = props;

  console.log(props);

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

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.userReducer.users,
    isFetching: state.userReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsersAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
