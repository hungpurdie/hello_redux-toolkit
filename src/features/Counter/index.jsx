import { Button, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCount } from "../../store/selectors/counterSelector";
import { decrement, incrementByAmount } from "./counterSlice";

function Counter(props) {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  const [value, setValue] = React.useState(5);

  const handleOnIncrement = () => {
    dispatch(decrement());
  };
  const handleOnIncrementByAmount = (e) => {
    e.preventDefault();
    dispatch(incrementByAmount(+value));
  };
  return (
    <div>
      <h1 style={{ color: "blue" }}> Counter child useSelector: {count}</h1>
      <div>
        <Button onClick={handleOnIncrement}>Decrement Child useDispatch</Button>
        <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={handleOnIncrementByAmount}>increment by amount {value}</Button>
      </div>
    </div>
  );
}

export default Counter;
