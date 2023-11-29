import React, { useState } from "react";
import "./styles/contestStyles.css";
import _ from "lodash";
import Modal from "../../../../Modal";

const CreateContest = () => {
  const [contest, setContest] = useState({
    title: "",
    duration: "Daily",
    description: "",
    lettreContests: [],
  });
  const [addDayContestModal, setAddDayModal] = useState(false);
  const [lettreContest, setlettreContest] = useState({
    lettreContestDescription: "",
    lettre: "",
    shuffledText: "",
  });
  const handleSubmitContest = () => {};

  const DailyContestContent = () => {
    return (
      <div className="ui segment">
        <a class="ui red label">Day {contest.lettreContests.length + 1}</a>
        <div className="ui form">
          <div className="field">
            <label>Lettre Contest Description(Optional):</label>
            <input
              type="text"
              value={lettreContest.lettreContestDescription}
              onChange={(e) => {
                setlettreContest({ ...lettreContest, lettreContestDescription: e.target.value });
                // setContest({ ...contest, lettre: e.target.value });
              }}
            />
          </div>
          <div className="field">
            <label>Lettre Contest word: </label>
            <div className="lettreSetup">
              <div className="lettreInput">
                <input
                  type="text"
                  value={lettreContest.lettre}
                  onChange={(e) => {
                    setlettreContest({ ...lettreContest, lettre: e.target.value });
                    // setContest({ ...contest, lettre: e.target.value });
                  }}
                />
              </div>
              <div>
                <button
                  className="ui primary button"
                  onClick={(e) => {
                    setlettreContest({ ...lettreContest, shuffledText: _.shuffle(lettreContest.lettre) });
                  }}
                >
                  Shuffle Lettres
                </button>
              </div>
              <div>
                <div class="inline field">
                  <label>{lettreContest.shuffledText}</label>
                  <div class="ui left pointing label">This will be the contest</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  var dyscnt = 0;
  const DailyContestActions = () => {
    return (
      <div className="field">
        <button
          className="ui green button"
          onClick={(e) => {
            setContest({ ...contest, lettreContests: [...contest.lettreContests, lettreContest] });
            setlettreContest({
              lettreContestDescription: "",
              lettre: "",
              shuffledText: "",
            });
          }}
        >
          Add Day
        </button>
      </div>
    );
  };
  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="field">
          <label>Title:</label>
          <input
            type="text"
            value={contest.title}
            onChange={(e) => {
              setContest({ ...contest, title: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>Contest Description:</label>
          <input
            type="text"
            value={contest.description}
            onChange={(e) => {
              setContest({ ...contest, description: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>Contest Duration:</label>
          <select
            onChange={(e) => {
              setContest({ ...contest, duration: e.target.value });
            }}
          >
            {/* <option value="One Time">One Time Contest</option> */}
            <option value="Daily">Daily Contest</option>
            {/* <option value="Weekly">Weekly Contest</option> */}
          </select>
        </div>
        <button
          onClick={(e) => {
            setAddDayModal(true);
          }}
          class="ui compact icon button my-2"
        >
          <i class="plus icon"></i>
          Add Day
        </button>

        <div className="field">
          <button className="ui green button" onClick={(e) => {}}>
            Submit
          </button>
        </div>
      </div>
      {contest.lettreContests.map((item) => {
        dyscnt++;
        return (
          <div className="ui segment">
            <a class="ui red label">Day {dyscnt}</a>
            <a class="ui green label" style={{ float: "right" }}>
              <i class="edit icon"></i>
            </a>

            <div className="ui form">
              <div className="field">
                <label>Lettre Contest Description(Optional):</label>
                <input
                  type="text"
                  value={item.lettreContestDescription}
                  //  onChange={(e) => {
                  //    setlettreContest({ ...lettreContest, lettreContestDescription: e.target.value });
                  //    // setContest({ ...contest, lettre: e.target.value });
                  //  }}
                />
              </div>
              <div className="field">
                <label>Lettre Contest word: </label>
                <div className="lettreSetup">
                  <div className="lettreInput">
                    <input
                      type="text"
                      value={item.lettre}
                      // onChange={(e) => {
                      //   setlettreContest({ ...lettreContest, lettre: e.target.value });
                      //   // setContest({ ...contest, lettre: e.target.value });
                      // }}
                    />
                  </div>
                  <div>
                    <button
                      className="ui primary button"
                      // onClick={(e) => {
                      //   setlettreContest({ ...lettreContest, shuffledText: _.shuffle(lettreContest.lettre) });
                      // }}
                    >
                      Shuffle Lettres
                    </button>
                  </div>
                  <div>
                    <div class="inline field">
                      <label>{item.shuffledText}</label>
                      <div class="ui left pointing label">This will be the contest</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {addDayContestModal && <Modal content={DailyContestContent()} actions={DailyContestActions()} onDismiss={(e) => setAddDayModal(false)} />}
    </div>
  );
};

export default CreateContest;
