import React from "react";
import { useAllCommunities, JOIN_LEAVE_COMMUNITY, useGetUserCommunities } from "../hooks/useBwengeCommunity";
import IndivCommunity from "./Bwenge Community components/IndivCommunity";
import history from "../../../../Redux/actions/history";
import { useMutation } from "@apollo/client";

const BwengeCommunity = () => {
  const { data, loading, error } = useAllCommunities();

  const queryParams = new URLSearchParams(window.location.search);
  const communityID = queryParams.get("id");

  if (communityID) {
    return <IndivCommunity />;
  }

  if (loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading1</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error) {
    return <h2>{error.Error1}</h2>;
  }
  const communities = data.getAllCommunities;
  var count = 0;
  return (
    <div className="ui raised segment">
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Type</th>
            <th>Field</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {communities.map((item) => {
            count++;
            return (
              <tr
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  history.push(`?menu=bwengecommunity&id=${item.id}`);
                }}
              >
                <td>{count}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.field}</td>
                <td>{item.department}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BwengeCommunity;
