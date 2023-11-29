import React from "react";
import { useSingleCommunity, approve_community } from "../../hooks/useBwengeCommunity";
import { useMutation } from "@apollo/client";
import renderHTML from "react-render-html";
const IndivCommunity = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const communityID = queryParams.get("id");
  const { data, loading, error } = useSingleCommunity(communityID);
  const [approveCommunity, {}] = useMutation(approve_community);
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
  const theCommunity = data.getSingleCommunity;
  return (
    <div className="ui raised segment">
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Name: </span>
          {theCommunity.name}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Field: </span>
          {theCommunity.field}
        </p>
      </div>
      {theCommunity.department && (
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Department: </span>
            {theCommunity.department}
          </p>
        </div>
      )}
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Type: </span>
          {theCommunity.type}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Creator Names: </span>
          {theCommunity.creator.lastName + " " + theCommunity.creator.firstName}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Creator Email: </span>
          {theCommunity.creator.email}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Community Description: </span>
          {renderHTML(theCommunity.description)}
        </p>
      </div>
      {!theCommunity.onApproved && (
        <button
          onClick={(e) => {
            approveCommunity({
              variables: {
                approveCommunityId: theCommunity.id,
                userId: theCommunity.creator.creatorId,
                userName: `${theCommunity.creator.lastName} ${theCommunity.creator.firstName}`,
              },
            }).then((res) => {
              alert("Community approved");
              window.location.reload(false);
            });
          }}
          style={{ position: "fixed", top: "20px", right: "20px" }}
          className="ui primary button"
        >
          Approve Community
        </button>
      )}
    </div>
  );
};

export default IndivCommunity;
