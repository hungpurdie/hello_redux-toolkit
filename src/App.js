import './App.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import Counter from './components/Counter';
import { decrement, increment } from './redux/actions/counterAction';

function App(props) {
  const { countNumberProps, incrementProps } = props;

  const countNumber = useSelector((state) => state.counter.countNumber);
  const dispatch = useDispatch();

  const handleIncrementConnectStore = () => {
    incrementProps();
  };

  const handleIncrementUseDispatch = () => {
    dispatch(increment());
  };

  return (
    <div className="App">
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

      <Counter
        countNumberProps={countNumberProps}
        incrementProps={incrementProps}
      />
    </div>
  );
}

//Gán dispatch thành props
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

//Gán giá trị của state thành props
const mapStateToProps = (state, ownProps) => {
  return {
    countNumberProps: state.counter.countNumber,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
