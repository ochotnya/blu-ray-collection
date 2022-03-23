import React from "react";
import "./Counter.css";

interface ICounter {
  text: string;
  count: number;
  bgColor: string;
  textColor: string;
}

function Counter(props: ICounter) {
  return (
    <div className="counter-container">
      <div
        className={
          "counter-type d-flex justify-content-center p-1 " +
          props.bgColor +
          " " +
          props.textColor
        }
      >
        {props.text}
      </div>
      <div className="counter-count d-flex justify-content-center p-1">
        {props.count}
      </div>
    </div>
  );
}

export default Counter;
