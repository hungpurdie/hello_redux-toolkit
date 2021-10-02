import './App.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import Counter from './components/Counter';
import { decrement, increment } from './redux/actions/counterAction';
import UserList from './components/UserList';
import 'semantic-ui-css/semantic.min.css';
import TodoApp from './components/TodoApp';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App(props) {
  const { countNumberProps, incrementProps } = props;

  const countNumber = useSelector((state) => state.counterReducer.countNumber);
  const dispatch = useDispatch();

  const handleIncrementConnectStore = () => {
    incrementProps();
  };

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
              <h1 style={{ color: 'green' }}>
                Counter Parent connect store: {countNumberProps}
              </h1>
              <button onClick={handleIncrementConnectStore}>
                Increment Parent connect store
              </button>
              <h1 style={{ color: 'orange' }}>
                Counter Parent useSelector: {countNumber}
              </h1>
              <button onClick={handleIncrementUseDispatch}>
                Increment Parent useDispatch
              </button>
              <Counter />
            </div>
          </Route>
          <Route path="/user">
            <UserList />
          </Route>
          <Route path="/todo">
            <TodoApp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

//Gán dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    incrementProps: () => {
      dispatch(increment());
    },
    decrementProps: () => {
      dispatch(decrement());
    },
  };
};

//Gán giá trị của state to props
const mapStateToProps = (state, ownProps) => {
  return {
    countNumberProps: state.counterReducer.countNumber,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
