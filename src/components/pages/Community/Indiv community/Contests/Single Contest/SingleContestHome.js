import React from "react";
import { useParams } from "react-router-dom";
import history from "../../../../../../Redux/actions/history";
import { useGetSingleCommunityContestForAdmin, useGetAllusersDailyContestData } from "../../../../Admin Panel/hooks/useBwengeCommunity";
import UsercontestRank from "./Single contest Home components/UsercontestRank.js";
import renderHTML from "react-render-html";

const SingleContestHome = () => {
  const { id } = useParams();
  const { loading, error, data } = useGetSingleCommunityContestForAdmin(id);
  const { loading1, error1, data1 } = useGetAllusersDailyContestData(id);

  if (loading || loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error || error1) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
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
  const singleContest = omitDeep(data.getSingleCommunityDailyContest);
  let lettreContests = singleContest.lettreContests;
  lettreContests = lettreContests.sort((let1, let2) => let1.contestDate - let2.contestDate);
  let cntCnt = 0;
  return (
    <div className="ui stackable three column grid mx-3">
      <div className="eleven wide column">
        <div className="ui raised segment">
          <a class="ui red ribbon label">{singleContest.title}</a>
          <div className="mt-3">{renderHTML(singleContest.description)}</div>
          <div className="ui raised segment">
            <div class="ui unstackable items">
              <table class="ui celled table">
                <thead>
                  <tr>
                    <th>N</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lettreContests.map((item) => {
                    let isFinished = false;
                    data1.getAllusersDailyContest.map((ito) => {
                      if (ito.userId == localStorage.getItem("userId")) {
                        ito.lettrecontestPackage.map((ita) => {
                          if (ita.lettreContestId === item.id) isFinished = true;
                        });
                      }
                    });
                    cntCnt++;
                    return (
                      <tr>
                        <td>
                          <div class="ui blue horizontal label">Day {cntCnt}</div>
                        </td>
                        <td>{new Date(item.contestDate).toDateString()}</td>
                        {!isFinished ? (
                          <td>
                            {new Date().toDateString() == new Date(item.contestDate).toDateString() ? (
                              <button
                                onClick={(e) => {
                                  history.push(`/dailycontest/${item.id}`);
                                }}
                                className="ui primary button"
                              >
                                Attempt
                              </button>
                            ) : new Date() - new Date(item.contestDate) > 0 ? (
                              <button className="ui disabled button">Ended</button>
                            ) : (
                              <button className="ui disabled button">Coming</button>
                            )}
                          </td>
                        ) : (
                          <td>
                            <button
                              onClick={(e) => {
                                // history.push(`/dailycontest/${item.id}`);
                              }}
                              className="ui positive button"
                            >
                              Done
                            </button>
                          </td>
                        )}
                        {}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="five wide column">
        <div className="ui raised segment">
          <UsercontestRank userscontest={data1.getAllusersDailyContest} />
        </div>
      </div>
    </div>
  );
};

export default SingleContestHome;
