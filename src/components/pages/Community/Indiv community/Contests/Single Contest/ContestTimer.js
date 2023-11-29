import React, { useState, useEffect } from "react";

const ContestTimer = ({ contestTime, setContestTime }) => {
  function handleTime() {
    setContestTime((prev) => prev + 1);
  }
  let timerId;
  useEffect(() => {
    timerId = setTimeout(handleTime, 1000);
    return () => clearTimeout(timerId);
  }, [contestTime]);
  return <div>{contestTime} s</div>;
};

export default ContestTimer;
