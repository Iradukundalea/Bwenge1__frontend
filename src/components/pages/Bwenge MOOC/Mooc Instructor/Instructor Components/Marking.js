import React, { useEffect, useState } from "react";
import Modal from "../../../../Modal";
import { useParams } from "react-router-dom";
import "./styles/marking.css";
import { useSpocMarkingSettings } from "../../../Institution/hooks/useInstitutionSpocs";
import { useMaximumMarks, useMyStudentsData } from "../../hooks/useMoocInstructor";

const Marking = () => {
  const { id } = useParams();
  const [markingsetting, setMarkingSettings] = useState({});
  const [settingsModal, setSettingsModal] = useState(false);
  const { data1, loading1, error1 } = useSpocMarkingSettings(id);
  const { data, loading, error } = useMyStudentsData(id);
  const { data2, loading2, error2 } = useMaximumMarks(id);
  console.log({ data2, loading2, error2 });

  const omitDeep = (obj, key) => {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((i) => {
      if (i !== key) {
        const val = obj[i];
        if (val instanceof Date) newObj[i] = val;
        else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
        else if (typeof val === "object" && val !== null) newObj[i] = omitDeep(val, key);
        else newObj[i] = val;
      }
    });
    return newObj;
  };

  const omitDeepArrayWalk = (arr, key) => {
    return arr.map((val) => {
      if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
      else if (typeof val === "object") return omitDeep(val, key);
      return val;
    });
  };
  console.log(markingsetting);
  useEffect(() => {
    if (data1) {
      const markingprops = data1.getSpoc;
      const cleanedObject = omitDeep(markingprops, "__typename");
      setMarkingSettings(cleanedObject.markingSettings);
    }
  }, [data1]);
  if (loading1 || loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading1</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error1 || error) {
    console.log(error1);
    return <h2>{error1.Error1}</h2>;
  }
  var studentsData = data.getAllInstructorData;
  var studentsMarks = [];
  if (data) {
    //i for students
    for (var i = 0; i < studentsData.length; i++) {
      var singleStudent = {
        names: studentsData[i].lastName + " " + studentsData[i].firstName,
        studentNumber: studentsData[i].studentNumber,
        assignmentsMarks: 0,
        examsMarks: 0,
        quizesMarks: 0,
      };
      for (var j = 0; j < studentsData[i].quizes.length; j++) {
        singleStudent.quizesMarks += studentsData[i].quizes[j].Userscore;
      }
      for (var j = 0; j < studentsData[i].assignments.length; j++) {
        singleStudent.assignmentsMarks += studentsData[i].assignments[j].Userscore;
      }
      for (var j = 0; j < studentsData[i].exams.length; j++) {
        singleStudent.examsMarks += studentsData[i].exams[j].Userscore;
      }
      studentsMarks.push(singleStudent);
    }
    console.log(studentsMarks);
  }

  const changeMarkingSettingContent = () => {
    var markingChanges = markingsetting;
    return (
      <div className="ui form">
        <div className="field">
          <label>Quizes:</label>
          <input
            value={markingsetting.quizes}
            type="number"
            // onChange={(e) => {
            //   markingChanges.quizes = e.target.value;
            // }}
          />
        </div>
        <div className="field">
          <label>Assignments:</label>
          <input value={markingsetting.assignments} type="number" />
        </div>
        <div className="field">
          <label>Exams:</label>
          <input value={markingsetting.exams} type="number" />
        </div>
        <div className="field">
          <label>Content View:</label>
          <input value={markingsetting.contentView} type="number" />
        </div>
        <div className="field">
          <label>Discussions participations:</label>
          <input value={markingsetting.discussionsParticipations} type="number" />
        </div>
      </div>
    );
  };

  const renderMarkingsettings = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-md-2 d-flex flex-column">
          <div className="percentShow">{markingsetting.exams}%</div>
          <div>Exams</div>
        </div>
        <div className="col-md-2 d-flex flex-column">
          <div className="percentShow">{markingsetting.assignments}%</div>
          <div>Assignments</div>
        </div>
        <div className="col-md-2 d-flex flex-column">
          <div className="percentShow">{markingsetting.contentView}%</div>
          <div>Content View</div>
        </div>
        <div className="col-md-2 d-flex flex-column">
          <div className="percentShow">{markingsetting.quizes}%</div>
          <div>Quizes</div>
        </div>
        <div className="col-md-2 d-flex flex-column">
          <div className="percentShow">{markingsetting.discussionsParticipations}%</div>
          <div>Discussions</div>
        </div>
        <div className="col-md-2">
          <button class="ui primary button" onClick={(e) => setSettingsModal(true)}>
            Change Marking settings
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="ui segment">
      <div className="ui raised segment">{renderMarkingsettings()}</div>
      Marking
      {settingsModal && <Modal title="Marking Settings" onDismiss={(e) => setSettingsModal(false)} content={changeMarkingSettingContent()} />}
    </div>
  );
};

export default Marking;
