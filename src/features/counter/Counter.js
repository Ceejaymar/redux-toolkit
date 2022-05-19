import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => {
    console.log('state', state);
    return state.counter.count
   });
   const dispatch = useDispatch();

   const [incrementAmount, setIncrementAmount] = React.useState(0);

   const addValue = Number(incrementAmount) || 0;

   const resetAll = () => {
     setIncrementAmount(0);
     dispatch(reset());
   }

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <input type='text' value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
      </div>
      <div>
          <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
          <button onClick={resetAll}>Reset</button>
        </div>
    </section>
  )
}

export default Counter;