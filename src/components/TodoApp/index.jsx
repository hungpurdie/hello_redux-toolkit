import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, fetchTodos, setTodos } from '../../redux/actions/todoAction';
TodoApp.propTypes = {};

function TodoApp({ todos, fetchTodosProps, addTodoProps }) {
  const [text, setText] = useState('');
  useEffect(() => {
    fetchTodosProps();
  }, [fetchTodosProps]);

  return (
    <div className="ui segment container">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          addTodoProps(text);
          setText('');
        }}
      >
        Add
      </button>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todoReducer.items,
});

//Gán dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    addTodoProps: (text) => {
      dispatch(addTodo(text));
    },
    setTodoProps: (items) => {
      dispatch(setTodos(items));
    },
    fetchTodosProps: async () => {
      dispatch(fetchTodos());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
