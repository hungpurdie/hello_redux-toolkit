import "./App.css";
import { connect, useDispatch, useSelector } from "react-redux";
import Counter from "./components/Counter";
import { decrement, increment } from "./redux/actions/counterAction";
import UserList from "./components/UserList";
import "semantic-ui-css/semantic.min.css";
import TodoApp from "./components/TodoApp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";

function App(props) {
  const dispatch = useDispatch();

  const countNumber = useSelector((state) => state.counterReducer.countNumber);
  const auth = useSelector((state) => state.authReducer.token);

  const handleIncrementUseDispatch = () => {
    dispatch(increment());
  };

  return (
    <div className="App">
      <Router>
        <div className="ui three item menu">
          <button className="item">
            <Link to="/counter">Counter</Link>
          </button>

          <button className=" item">
            <Link to="/user">User List</Link>
          </button>

          <button className=" item">
            <Link to="/todo">Todo App</Link>
          </button>
        </div>
        <Switch>
          <Route exact path="/counter">
            <div className="ui divider">
              <h1 style={{ color: "orange" }}>Counter Parent useSelector: {countNumber}</h1>
              <button onClick={handleIncrementUseDispatch}>Increment Parent useDispatch</button>
              <Counter />
            </div>
          </Route>
          <Route path="/user">
            <UserList />
          </Route>
          <Route path="/todo">
            {!auth?.accessToken && <Login />}
            {auth?.accessToken && <TodoApp />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
