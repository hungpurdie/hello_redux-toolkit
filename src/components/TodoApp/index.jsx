import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodos } from "redux/selectors/todoSelector";
import { addTodo, fetchTodos } from "../../redux/actions/todoAction";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { logout } from "redux/actions/authAction";

TodoApp.propTypes = {};

function TodoApp() {
  const dispatch = useDispatch();

  const history = useHistory();

  const allTodos = useSelector(getAllTodos);

  const [text, setText] = useState("");

  const fetchingTodos = useCallback(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    fetchingTodos();
  }, [fetchingTodos]);

  const Logout = () => {
    dispatch(logout());
  };

  return (
    <div className="ui segment container">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button
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
      >
        Add
      </button>
      <ul>
        {allTodos.slice(allTodos.length - 10, allTodos.length)?.map((todo, index) => (
          <li key={index}>{todo.title}</li>
        ))}
      </ul>
      <button onClick={Logout} className="ui inverted red button">
        Logout
      </button>
    </div>
  );
}
export default TodoApp;
