import React, { useReducer, useRef } from "react";
import iPhoneImage from "./iphone1.png"; 

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        [action.color]: Math.min(state[action.color] + 1, 250),
      };
    case "decrement":
      return {
        ...state,
        [action.color]: Math.max(state[action.color] - 1, 0),
      };
    default:
      return state;
  }
};

const ColorChanger = () => {
  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
  const intervalId = useRef(null);

  const updateBackgroundColor = () => {
    return `rgb(${state.red}, ${state.green}, ${state.blue})`;
  };

  const handleMouseDown = (color, type) => {
    dispatch({ type, color });
    intervalId.current = setInterval(() => {
      dispatch({ type, color });
    }, 100);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId.current);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className="w-[500px] h-[500px]  transition-colors duration-500 ease-in-out  "
        style={{
          backgroundColor: updateBackgroundColor(),
        }}
      >
        <img
          src={iPhoneImage}
          className="z-40 h-[500px]  "
          alt=""
          style={{ width: 500, marginBottom: -50 }}
        />
      </div>

      <div className="text-center text-xl font-semibold mt-4">
        Red: {state.red}, Green: {state.green}, Blue: {state.blue}
      </div>
      <div className=" flex gap-6 ">
        {["red", "green", "blue"].map((color) => (
          <div key={color} className="flex mt-4 gap-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
              onMouseDown={() => handleMouseDown(color, "decrement")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              -
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
              onMouseDown={() => handleMouseDown(color, "increment")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorChanger;
