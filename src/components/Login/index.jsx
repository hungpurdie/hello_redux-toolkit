import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authAction';

Login.propTypes = {};

function Login({ loginProps }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginProps({ email, password });
      }}
    >
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginProps: async ({ email, password }) =>
      dispatch(login({ email, password })),
  };
};

export default connect(null, mapDispatchToProps)(Login);
