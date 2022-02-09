import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCount } from "redux/selectors/couterSelector";
import { decrement } from "../../redux/actions/counterAction";

Counter.propTypes = {};

function Counter(props) {
  const count = useSelector(getCount);

  const dispatch = useDispatch();

  const handleDecrementUseDispatch = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1 style={{ color: "blue" }}> Counter child useSelector: {count}</h1>
      <button onClick={handleDecrementUseDispatch}>Decrement Child useDispatch</button>
    </div>
  );
}

export default Counter;
