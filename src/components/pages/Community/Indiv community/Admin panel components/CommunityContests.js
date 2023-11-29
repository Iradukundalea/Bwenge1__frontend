import React from "react";
import { approve_contest, useGetAllCommunityContests } from "../../../Admin Panel/hooks/useBwengeCommunity";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

const CommunityContests = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetAllCommunityContests(id);
  const [approveContest, {}] = useMutation(approve_contest);

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
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  const contests = data.getAllCommunityDailyContests;
  let cntcnt = 0;
  return (
    <div class="ui unstackable items">
      <table class="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Creator Names</th>
            <th>OnApproved</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((item) => {
            cntcnt++;
            return (
              <tr>
                <td>{cntcnt}</td>
                <td>{item.title}</td>
                <td>{item.creator.lastName + " " + item.creator.firstName}</td>
                {item.onApproved && <td>true</td>}
                {!item.onApproved && (
                  <td>
                    <button
                      onClick={(e) => {
                        approveContest({
                          variables: {
                            contestId: item.id,
                          },
                        }).then((res) => {
                          alert("Contest approved");
                          window.location.reload(false);
                        });
                      }}
                      className="ui primary button"
                    >
                      Approve
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommunityContests;
