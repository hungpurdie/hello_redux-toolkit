import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import Home from "./features/Home/Home";
import Login from "./features/Login/Login";
import Register from "./features/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import TodoApp from "./features/TodoList/TodoList";
import UserList from "./features/UserList/UserList";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // const [user, setUser] = React.useState(null);

  // const handleLogin = () => {
  //   setUser({
  //     id: "1",
  //     name: "robin",
  //     permissions: ["analyze"],
  //     roles: ["admin"],
  //   });
  // };

  return (
    <div className="app">
      <ToastContainer />
      <BrowserRouter>
        <ToastContainer
          autoClose={5000}
          position="bottom-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <TodoApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
