import React from "react";
import BwengeLogo from "./../../../../../../../imgs/BWENG.png";
import thekomp from "../../../../../../../thekomp";

const UsercontestRank = ({ userscontest }) => {
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
  function compare(a, b) {
    let asec = 0;
    let bsec = 0;
    a.lettrecontestPackage.map((item) => {
      asec += item.score;
    });
    b.lettrecontestPackage.map((item) => {
      asec += item.score;
    });
    return asec - bsec;
  }

  let userRank = omitDeepArrayWalk(userscontest);
  userRank = userRank.sort(compare);

  let cnt = 0;
  return (
    <div>
      <div class="ui unstackable items">
        <table class="ui celled table">
          <thead>
            <tr>
              <th>N</th>
              <th></th>
              <th>Contestant</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {userRank.map((item) => {
              cnt++;
              let score = 0;
              item.lettrecontestPackage.map((ki) => {
                score += ki.score;
              });
              return (
                <tr style={item.userId === localStorage.getItem("userId") ? { backgroundColor: "black", color: "white" } : {}}>
                  <td>{cnt}</td>
                  <td>
                    {" "}
                    <img
                      class="ui mini rounded image"
                      src={item.participant[0].profilePicture ? `${thekomp}/${item.participant[0].profilePicture}` : BwengeLogo}
                    />
                  </td>
                  <td>
                    <p>{item.participant[0].lastName + " " + item.participant[0].firstName}</p>
                  </td>
                  <td>{score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsercontestRank;
