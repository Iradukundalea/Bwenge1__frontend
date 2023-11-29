import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const QuizTimer2 = ({ StartTime, thotime, renderRes, setRenderRes }) => {
  const [quizTime, setQuizTime] = useState(thotime);
  const [perc, setPerc] = useState(100);
  function handleTime() {
    if (quizTime > 0) {
      let remTime = thotime - (Math.floor(Date.now() / 1000) - StartTime);
      setQuizTime(remTime);
      setPerc((remTime * 100) / thotime);
    } else {
      setRenderRes(true);
    }
  }

  var timerId;
  var minutes = Math.floor(quizTime / 60);
  var hrs = Math.floor(minutes / 60);
  var seconds = quizTime % 60;
  useEffect(() => {
    if (!renderRes) timerId = setTimeout(handleTime, 1000);
    return () => clearTimeout(timerId);
  }, [quizTime]);

  return (
    <div>
      <ProgressBar now={perc} label={`${hrs}:${minutes}:${seconds}`} />
    </div>
  );
};

export default QuizTimer2;
