import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getAllTodo } from "../../store/selectors/todoSelector";
import { getAuth } from "../../store/selectors/authSelector";
import { addTodo, fetchTodos } from "./todoSlice";
import { getLogout, getRefreshToken } from "../../store/reducers/authSlice";
import { Input, Button } from "antd";

function TodoApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTodos = useSelector(getAllTodo);

  const [text, setText] = useState("");

  const rt = useSelector(getAuth).refreshToken;
  const accessToken = useSelector(getAuth).accessToken;

  const fetchingTodos = useCallback(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    fetchingTodos();
  }, [fetchingTodos]);

  const Logout = () => {
    dispatch(getLogout(rt));
    navigate("/");
  };

  const onHandleRefreshToken = () => {
    dispatch(getRefreshToken(rt));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <Button
        onClick={() => {
          dispatch(
            addTodo({
              userId: uuidv4(),
              id: uuidv4(),
              title: text,
              completed: false,
            })
          );
          setText("");
        }}
        size="medium"
      >
        Add
      </Button>
      <ul>
        {allTodos?.slice(allTodos.length - 10, allTodos.length)?.map((todo, index) => (
          <li key={index}>{todo.title}</li>
        ))}
      </ul>
      <ul>
        <label>Accsess token</label>
        <li> {accessToken}</li>
        <label>Refresh token</label>
        <li> {rt}</li>
      </ul>
      <Button onClick={Logout}>Logout</Button>
      <Button onClick={onHandleRefreshToken}>Refresh Token</Button>
    </div>
  );
}
export default TodoApp;
