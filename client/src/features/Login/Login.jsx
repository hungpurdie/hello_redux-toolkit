import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Layout } from "antd";
import "./login.css";
import { getAuthenticated } from "../../store/selectors/authSelector";
import { getCaptcha } from "../../store/selectors/captchaSelector";
import { getErrorMessage } from "../../store/selectors/loginSelector";
import { login } from "./loginSlice";

const { Header, Footer, Content } = Layout;

function Login({ loginProps }) {
  const [email, setEmail] = useState("abcd@example.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const refRecapCha = useRef();
  const navigate = useNavigate();
  const errorMessage = useSelector(getErrorMessage);
  const isHuman = useSelector(getCaptcha)?.success;
  const isAuthenticated = useSelector(getAuthenticated);
  const dispatch = useDispatch();

  // const handleGoogleFailure = (error) => {};

  // const handleGoogleLogin = async (googleData) => {
  //   dispatch(loginByGoogle(googleData.tokenId));
  // };

  const onFinish = (values) => {
    const { email, password } = values;
    dispatch(login({ email, password }));
    navigate("/todo");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <div>
      <Layout>
        <Header>Login page</Header>
        <Content>
          <Row justify="center" align="middle">
            <Form
              className="login-form"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                defaultValue="abc@example.com"
                rules={[
                  { required: true, message: "Please input your email!", type: "email", len: 15 },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                defaultValue="123456"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

// <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
//   <Grid.Column style={{ maxWidth: 450 }}>
//     <Header as="h2" color="teal" textAlign="center">
//       <Image src="https://images.unsplash.com/photo-1640622660721-45b83554ab05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" />
//       Log-in to your account
//     </Header>
//     <Form size="large" onSubmit={onLoginHandler}>
//       <Segment stacked>
//         <Form.Input
//           focus
//           fluid
//           icon="user"
//           iconPosition="left"
//           type="email"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           placeholder="Enter your email"
//         />
//         <Form.Field>
//           <Input
//             focus
//             fluid
//             iconPosition="left"
//             labelPosition="right"
//             type={showPassword ? "text" : "password"}
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             placeholder="Enter your password"
//           >
//             <Icon name="lock" />
//             <input />
//             <Label basic onClick={togglePasswordVisibility}>
//               {showPassword ? "Show" : "Hide"}
//             </Label>
//           </Input>
//         </Form.Field>
//         <Button color="teal" fluid size="large" type="submit">
//           Login
//         </Button>
//       </Segment>
//     </Form>
//     <Message>
//       New to us? <Link to={"/register"}>Sign Up</Link>
//     </Message>
//   </Grid.Column>
// </Grid>

export default Login;

// <form onSubmit={onLoginHandler} className="form__group">
//       <input
//         type="email"
//         className="form__input-email"
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         placeholder="Enter your email"
//       />
//       <input
//         type={showPassword ? "text" : "password"}
//         className="form__input-password"
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         placeholder="Enter your password"
//       />
//       <i onClick={togglePasswordVisibility}>{showPassword ? "show" : "hide"}</i>
//       <hr />
//       <ReCAPTCHA ref={refRecapCha} sitekey={process.env.REACT_APP_GOOGLE_SITE_KEY} />
//       <button type="submit">Login</button>
//     </form>
//     <h1>React Google Login App</h1>
//     <div>
//       <GoogleLogin
//         clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//         buttonText="Google"
//         onSuccess={handleGoogleLogin}
//         onFailure={handleGoogleFailure}
//         cookiePolicy="single_host_origin"
//       />
//       <hr />
//       <FacebookLogin
//         appId="517455549688297"
//         autoLoad={true}
//         fields="name,email,picture"
//         onClick={componentClicked}
//         callback={responseFacebook}
//       />
//     </div>
