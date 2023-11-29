import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleDayContest, useGetAllusersDailyContestData } from "../../../../Admin Panel/hooks/useBwengeCommunity";
import { io } from "socket.io-client";
import thekomp from "./../../../../../../thekomp";
import ContestTimer from "./ContestTimer";
import axios from "axios";
import ContestScore from "./ContestScore";
import renderHTML from "react-render-html";

const SingleDailyContest = () => {
  const { id } = useParams();
  const { loading, error, data } = useGetSingleDayContest(id);
  const [recentTrial, setRecentTrial] = useState("");
  const [theTrials, setTrials] = useState(Array(5).fill(null));
  const [contestTime, setContestTime] = useState(0);
  const [onHideTrials, setOnHideTrials] = useState(false);
  const [contestScore, setContestScore] = useState(100);
  const [newScore, setNewScore] = useState(0);

  const [lettreConto, setLettreConto] = useState();
  let timerId;
  function handleTime() {
    if (contestScore > 0) setContestScore((prev) => prev - 1);
    else clearTimeout(timerId);
  }

  useEffect(() => {
    timerId = setTimeout(handleTime, 500);
    if (onHideTrials) {
      clearTimeout(timerId);
    }
    return () => clearTimeout(timerId);
  }, [contestScore]);
  const submitContest = (isCorrect) => {
    setNewScore(contestScore);
    clearTimeout(timerId);
    const formData = new FormData();
    let theAttempts = [];
    theTrials.map((item) => {
      if (item != null) theAttempts = [...theAttempts, item];
      return item;
    });
    formData.append("attempts", JSON.stringify(theAttempts));
    formData.append("secondsTaken", contestTime);
    if (contestScore > 0) formData.append("score", contestScore);
    else formData.append("score", 0);

    formData.append("lettreContestId", id);
    const config = {
      method: "post",
      url: `${thekomp}/userdailycontest/userpostdailycontest/${localStorage.getItem("userId")}/${lettreConto.id}`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        // alert("Your community contest has been created successfully, After being approved it will be available publicly! Thx.");
        // history.push("/communities");
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };
  // useEffect(() => {
  //   return () => {
  //     submitContest(false);
  //   };
  // }, []);

  useEffect(() => {
    if (loading === false && data) {
      setLettreConto(data.getSingleCommunityDailyContestSingleDay);
    }
  }, [loading, data]);

  const handleType = (event) => {
    // if (!lettreConto) {
    //   return;
    // }
    if (event.key === "Enter") {
      if (recentTrial.length < lettreConto.lettreContests[0].shuffledText.length) {
        alert("complete recent trial");
        return;
      } else {
        let thetrialls = theTrials;
        var index = theTrials.indexOf(null);
        thetrialls[index] = recentTrial;
        if (recentTrial == lettreConto.lettreContests[0].lettre) {
          alert("congs");
          submitContest(true);
          setOnHideTrials(true);
        } else {
          setContestScore((prev) => prev - 20);
        }
        setTrials(thetrialls);
        setRecentTrial("");
        if (index == 4) {
          alert(`the word was ${lettreConto.lettreContests[0].lettre}`);
          setOnHideTrials(true);
          // submitContest(false);
        }
      }
    } else {
      if (recentTrial.length < lettreConto.lettreContests[0].shuffledText.length) {
        setRecentTrial(recentTrial + event.key);
        //or remove recentTrial in dependecies and
        //use setRecentTrial(oldguess=>oldguess+event.key)
      } else {
        let thetrialls = theTrials;
        var index = theTrials.indexOf(null);
        thetrialls[index] = recentTrial;
        if (recentTrial == lettreConto.lettreContests[0].lettre) {
          alert("congs");
          submitContest(true);
          setOnHideTrials(true);
        } else {
          setContestScore((prev) => prev - 20);
        }
        setTrials(thetrialls);
        setRecentTrial("");
        if (index == 4) {
          alert(`the word was ${lettreConto.lettreContests[0].lettre}`);
          setOnHideTrials(true);

          // submitContest(false);
        }
      }
    }
  };

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log(socket.connected); // true
    // });
    document.addEventListener("keypress", handleType);

    return () => {
      document.removeEventListener("keypress", handleType);
    };
  }, [recentTrial, theTrials, lettreConto]);
  if (loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error) {
    return <h2>{error.Error}</h2>;
  }
  const checkTrials = () => {
    for (let i = 0; i < 5; i++) {
      if (theTrials[i] == null) return i;
    }
    return 5;
  };
  if (lettreConto) {
    return (
      <div className="ui stackable three column grid mx-3">
        <div className="twelve wide column">
          <div className="ui raised segment">
            <div class="ui top attached label">
              {!onHideTrials && <ContestScore score={contestScore} setScore={setContestScore} />}
              {onHideTrials && <div>Score: {`${contestScore < 0 ? 0 : newScore}`}</div>}
            </div>
            <div class="ui bottom left attached label">
              {!onHideTrials && (
                <a class="ui red horizontal label">
                  <ContestTimer contestTime={contestTime} setContestTime={setContestTime} />
                </a>
              )}
              <a class="ui blue horizontal label">{checkTrials()}/5</a>
            </div>
            <div>{renderHTML(lettreConto.lettreContests[0].lettreContestDescription)}</div>
            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
              {lettreConto.lettreContests[0].shuffledText.split("").map((letrre, index) => {
                return <Card key={index} letter={letrre} />;
              })}
            </div>
            {theTrials.indexOf(null) !== 0 &&
              theTrials.map((item) => {
                if (item !== null)
                  return (
                    <div className="mt-4" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                      {item.split("").map((lettreindex, index) => {
                        let bg = "black";
                        if (lettreindex !== lettreConto.lettreContests[0].lettre[index]) {
                          bg = "red";
                        } else {
                          bg = "green";
                        }
                        return (
                          <div
                            className="ms-3"
                            style={{
                              border: `2px solid ${bg}`,
                              height: "50px",
                              width: "50px",
                              fontSize: "2rem",
                              // color: color,
                              // backgroundColor: backgroundcolor,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {lettreindex}
                          </div>
                        );
                      })}
                    </div>
                  );
              })}
            {!onHideTrials && (
              <div className="mt-4" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                {lettreConto.lettreContests[0].shuffledText.split("").map((letrre, index) => {
                  return (
                    <div
                      className="ms-3"
                      style={{
                        border: "2px solid black",
                        height: "50px",
                        width: "50px",
                        fontSize: "2rem",
                        // color: color,
                        // backgroundColor: backgroundcolor,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {recentTrial[index]}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="four wide column">
          <div className="ui raised segment"></div>
        </div>
      </div>
    );
  }
};

function Card({ letter }) {
  return (
    <div
      className="ms-3"
      style={{
        border: "2px solid black",
        height: "50px",
        width: "50px",
        fontSize: "2rem",
        // color: color,
        // backgroundColor: backgroundcolor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {letter}
    </div>
  );
}

export default SingleDailyContest;
