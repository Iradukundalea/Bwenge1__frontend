import React, { useState } from "react";
import { useGetCommunityQAs, useGetCommunityMembers } from "../../../Admin Panel/hooks/useBwengeCommunity";
import { useGetCommunityArticles } from "../../../Admin Panel/hooks/useAllArticles";
import BwengeLogo from "./../../../../../imgs/BWENG.png";
import thekomp from "./../../../../../thekomp";
import { AiFillCrown } from "react-icons/ai";

import { useParams } from "react-router-dom";
import _ from "lodash";

const TopCommunityUsers = ({ articles, qas }) => {
  const { id } = useParams();

  var { data, loading, error } = useGetCommunityMembers(id);
  const [selectedChart, setSelectedChart] = useState("weekly");
  const membersData = data;
  const membersLoading = loading;
  const membersError = error;

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
  if (membersLoading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (membersError) {
    return <h2>{membersError.Error}</h2>;
  }
  var thoarticles = omitDeepArrayWalk(articles);
  var thoqas = omitDeepArrayWalk(qas);
  var thomembers = omitDeepArrayWalk(membersData.getCommunityMembers);
  console.log(thomembers);
  function compare(a, b) {
    if (a.articlesWritten + a.qasWritten + a.likesCount + a.viewsCount > b.articlesWritten + b.qasWritten + b.likesCount + b.viewsCount) {
      return -1;
    }
    if (a.articlesWritten + a.qasWritten + a.likesCount + a.viewsCount < b.articlesWritten + b.qasWritten + b.likesCount + b.viewsCount) {
      return 1;
    }
    return 0;
  }

  var thousers = thoarticles.map((item) => item.creator);
  thousers = _.concat(
    thousers,
    thoqas.map((item) => item.creator)
  );
  thousers = thousers.map((item) => {
    item["articlesWritten"] = 0;
    item["qasWritten"] = 0;
    item["likesCount"] = 0;
    item["viewsCount"] = 0;
    item["profile_pic"] = "";
    return item;
  });

  var thousersweekly = _.cloneDeep(thousers);
  var thousersmonthly = _.cloneDeep(thousers);

  var thousers = thousers.map((item) => {
    thoarticles.map((itemo) => {
      if (itemo.creator.creatorId == item.creatorId) {
        item["articlesWritten"]++;
        item["likesCount"] += itemo.likes.length;
        item["viewsCount"] += itemo.viewers.length;
      }
    });
    thoqas.map((itemo) => {
      if (itemo.creator.creatorId == item.creatorId) {
        item["qasWritten"]++;
        item["likesCount"] += itemo.likes.length;
        item["viewsCount"] += itemo.viewers.length;
      }
    });
    thomembers.map((itemo) => {
      if (itemo.id == item.creatorId) {
        item["profile_pic"] = itemo.profilePicture;
      }
    });
    return item;
  });
  var thousersweekly = thousersweekly.map((item) => {
    var today = new Date();
    var lastWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));

    thoarticles.map((itemo) => {
      //Get the date value of last week.

      console.log(Date.parse(itemo.dateOfSubmission));
      //If nextWeek is smaller (earlier) than the value of the input date, alert...

      if (itemo.creator.creatorId == item.creatorId) {
        if (lastWeek < Date.parse(itemo.dateOfSubmission)) item["articlesWritten"]++;
        itemo.likes.map((itemlike) => {
          if (lastWeek < Date.parse(itemlike.dateliked)) item["likesCount"]++;
        });
        itemo.viewers.map((itemlike) => {
          if (lastWeek < Date.parse(itemlike.dateviewed)) item["viewsCount"]++;
        });
      }
    });
    thoqas.map((itemo) => {
      if (itemo.creator.creatorId == item.creatorId) {
        if (lastWeek < Date.parse(itemo.dateOfSubmission)) item["qasWritten"]++;
        itemo.likes.map((itemlike) => {
          if (lastWeek < Date.parse(itemlike.dateliked)) item["likesCount"]++;
        });
        itemo.viewers.map((itemlike) => {
          if (lastWeek < Date.parse(itemlike.dateviewed)) item["viewsCount"]++;
        });
      }
    });
    thomembers.map((itemo) => {
      if (itemo.id == item.creatorId) {
        item["profile_pic"] = itemo.profilePicture;
      }
    });
    return item;
  });
  var thousersmonthly = thousersmonthly.map((item) => {
    var today = new Date();
    var lastWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30));

    thoarticles.map((itemo) => {
      //Get the date value of last week.

      console.log(Date.parse(itemo.dateOfSubmission));
      //If nextWeek is smaller (earlier) than the value of the input date, alert...

      if (itemo.creator.creatorId == item.creatorId) {
        if (lastWeek < Date.parse(itemo.dateOfSubmission)) item["articlesWritten"]++;
        itemo.likes.map((itemlike) => {
          if (lastWeek < Date.parse(itemlike.dateliked)) item["likesCount"]++;
        });
        itemo.viewers.map((itemlike) => {
          if (lastWeek < Date.parse(itemlike.dateviewed)) item["viewsCount"]++;
        });
      }
    });
    thoqas.map((itemo) => {
      if (itemo.creator.creatorId == item.creatorId) {
        if (lastWeek < Date.parse(itemo.dateOfSubmission)) item["qasWritten"]++;
        itemo.likes.map((itemlike) => {
          if (lastWeek < Date.parse(itemlike.dateliked)) item["likesCount"]++;
        });
        itemo.viewers.map((itemlike) => {
          if (lastWeek < Date.parse(itemlike.dateviewed)) item["viewsCount"]++;
        });
      }
    });
    thomembers.map((itemo) => {
      if (itemo.id == item.creatorId) {
        item["profile_pic"] = itemo.profilePicture;
      }
    });
    return item;
  });

  thousers = thousers.sort(compare);
  console.log(thousers);
  console.log(thousersweekly);
  var countm = 0;
  return (
    <div>
      <div class="ui top attached tabular menu">
        <a class={selectedChart == "weekly" ? "active item" : "item"} onClick={(e) => setSelectedChart("weekly")}>
          This week
        </a>
        <a class={selectedChart == "monthly" ? "active item" : "item"} onClick={(e) => setSelectedChart("monthly")}>
          This month
        </a>
        <a class={selectedChart == "life" ? "active item" : "item"} onClick={(e) => setSelectedChart("life")}>
          Full Chart
        </a>
      </div>
      {selectedChart == "life" && (
        <div class="ui bottom attached segment">
          <table class="ui celled table">
            <thead>
              <tr>
                <th></th>
                <th>Member</th>
                <th>Names</th>
                <th>Articles</th>
                <th>Q/As</th>
                <th>Likes</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {_.uniqBy(thousers, "creatorId").map((item) => {
                countm++;
                return (
                  <tr>
                    <td>{countm == 1 ? <AiFillCrown color="blue" size={30} /> : countm}</td>
                    <td>
                      <img class="ui mini rounded image" src={item.profile_pic ? `${thekomp}/${item.profile_pic}` : BwengeLogo} />
                    </td>
                    <td>{item.lastName + " " + item.firstName}</td>
                    <td>{item.articlesWritten}</td>
                    <td>{item.qasWritten}</td>
                    <td>{item.likesCount}</td>
                    <td>{item.viewsCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {selectedChart == "weekly" && (
        <div class="ui bottom attached segment">
          <table class="ui celled table">
            <thead>
              <tr>
                <th></th>
                <th>Member</th>
                <th>Names</th>
                <th>Articles</th>
                <th>Q/As</th>
                <th>Likes</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {_.uniqBy(thousersweekly, "creatorId").map((item) => {
                countm++;
                return (
                  <tr>
                    <td>{countm == 1 ? <AiFillCrown color="blue" size={30} /> : countm}</td>
                    <td>
                      <img class="ui mini rounded image" src={item.profile_pic ? `${thekomp}/${item.profile_pic}` : BwengeLogo} />
                    </td>
                    <td>{item.lastName + " " + item.firstName}</td>
                    <td>{item.articlesWritten}</td>
                    <td>{item.qasWritten}</td>
                    <td>{item.likesCount}</td>
                    <td>{item.viewsCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {selectedChart == "monthly" && (
        <div class="ui bottom attached segment">
          <table class="ui celled table">
            <thead>
              <tr>
                <th></th>
                <th>Member</th>
                <th>Names</th>
                <th>Articles</th>
                <th>Q/As</th>
                <th>Likes</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {_.uniqBy(thousersmonthly, "creatorId").map((item) => {
                countm++;
                return (
                  <tr>
                    <td>{countm == 1 ? <AiFillCrown color="blue" size={30} /> : countm}</td>
                    <td>
                      <img class="ui mini rounded image" src={item.profile_pic ? `${thekomp}/${item.profile_pic}` : BwengeLogo} />
                    </td>
                    <td>{item.lastName + " " + item.firstName}</td>
                    <td>{item.articlesWritten}</td>
                    <td>{item.qasWritten}</td>
                    <td>{item.likesCount}</td>
                    <td>{item.viewsCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopCommunityUsers;
