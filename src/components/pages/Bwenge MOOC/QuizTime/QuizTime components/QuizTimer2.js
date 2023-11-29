import React, { useState, useEffect } from "react";

const QuizTimer2 = ({ StartTime, thotime, renderRes, setRenderRes }) => {
  const [quizTime, setQuizTime] = useState(thotime);
  function handleTime() {
    if (quizTime > 0) {
      let remTime = thotime - (Math.floor(Date.now() / 1000) - StartTime);
      setQuizTime(remTime);
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

export default QuizTimer2;
