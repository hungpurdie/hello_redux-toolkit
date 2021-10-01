import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement } from '../../redux/actions/counterAction';

Counter.propTypes = {};

function Counter(props) {
  const count = useSelector((state) => state.counterReducer.countNumber);

  const dispatch = useDispatch();

  const { countNumberProps, incrementProps } = props;

  const handleDecrementProps = () => {
    incrementProps();
  };

  const handleDecrementUseDispatch = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1 style={{ color: 'red' }}>
        {' '}
        Counter child pass to props(Parent connect store): {countNumberProps}
      </h1>
      <button onClick={handleDecrementProps}>
        Decrement Child pass to props(Parent connect store)
      </button>

      <h1 style={{ color: 'blue' }}> Counter child useSelector: {count}</h1>
      <button onClick={handleDecrementUseDispatch}>
        Decrement Child useDispatch
      </button>
    </div>
  );
}

export default Counter;
