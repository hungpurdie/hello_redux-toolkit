import React, { useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCaptcha } from "redux/selectors/authSelector";
import { login, loginByGoogle, verifyCaptcha } from "../../redux/actions/authAction";

function Login({ loginProps }) {
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const refRecapCha = useRef();

  const isHuman = useSelector(getCaptcha)?.success;
  console.log("🚀 :: Login :: isHuman", isHuman);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleGoogleFailure = (error) => {};

  const handleGoogleLogin = async (googleData) => {
    dispatch(loginByGoogle(googleData.tokenId));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true);
  };

  const onLoginHandler = (e) => {
    e.preventDefault();
    const response = refRecapCha.current.getValue();
    if (response) {
      debugger;
      dispatch(verifyCaptcha(response));
    }
    if (isHuman) {
      dispatch(login({ email, password }));
      history.push("/todo");
    }
  };

  return (
    <>
      <form onSubmit={onLoginHandler} className="form__group">
        <input
          type="email"
          className="form__input-email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email"
        />
        <input
          type={showPassword ? "text" : "password"}
          className="form__input-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
        />
        <i onClick={togglePasswordVisibility}>{showPassword ? "show" : "hide"}</i>
        <hr />
        <ReCAPTCHA ref={refRecapCha} sitekey={process.env.REACT_APP_GOOGLE_SITE_KEY} />
        <button type="submit">Login</button>
      </form>
      <h1>React Google Login App</h1>
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleFailure}
          cookiePolicy="single_host_origin"
        />
      </div>
    </>
  );
}
export default Login;
