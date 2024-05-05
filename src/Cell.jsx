// src/Cell.js
import React from 'react';

function Cell({ value, onClick }) {
  const colors = {
    null: "bg-white",
    "R": "bg-red-500",
    "Y": "bg-yellow-400",
  };

  return (
    <div
      onClick={onClick}
      className={`border border-gray-500 rounded-full cursor-pointer
        ${colors[value]} w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20`}
    ></div>
  );
}

export default Cell;
