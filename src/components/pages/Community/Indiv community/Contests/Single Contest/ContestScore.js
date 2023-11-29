import React, { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";

const ContestScore = ({ score, setScore }) => {
  return (
    <div>
      <ProgressBar now={score} label={`${score}`} />
    </div>
  );
};

export default ContestScore;
