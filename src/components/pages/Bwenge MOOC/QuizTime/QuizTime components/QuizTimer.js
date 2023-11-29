import React, { useState, useEffect } from "react";

const QuizTimer = ({ thotime, renderRes, setRenderRes }) => {
  const [quizTime, setQuizTime] = useState(thotime);
  function handleTime() {
    if (quizTime > 0) {
      setQuizTime((quizTime) => quizTime - 1);
    } else {
      setRenderRes(true);
    }
  }

  var timerId;
  useEffect(() => {
    if (!renderRes) timerId = setTimeout(handleTime, 1000);
    return () => clearTimeout(timerId);
  }, [quizTime]);

  return <div>{quizTime}</div>;
};

export default QuizTimer;
