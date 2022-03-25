import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCount } from "../../store/selectors/counterSelector";
import Counter from "../Counter";
import { increment } from "../Counter/counterSlice";

function Home() {
  const dispatch = useDispatch();

  const count = useSelector(getCount);

  const handleOnIncrement = () => {
    dispatch(increment());
  };

  return (
    <>
      <div className="ui three item menu">
        <Button className="item">
          <Link to="/counter">Counter</Link>
        </Button>
        <Button className=" item">
          <Link to="/user">User List</Link>
        </Button>
        <Button className=" item">
          <Link to="/todo">Todo App</Link>
        </Button>
      </div>
      <div className="ui divider">
        <h1 style={{ color: "orange" }}>Counter Parent useSelector: {count}</h1>
        <Button onClick={handleOnIncrement}>Increment Parent useDispatch</Button>
        <Counter />
      </div>
    </>
  );
}
export default Home;
