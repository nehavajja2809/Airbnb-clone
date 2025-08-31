import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <ClipLoader
        size={100}
        color="#f5385d"
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Spinner;
