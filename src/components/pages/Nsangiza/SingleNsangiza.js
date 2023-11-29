import React from "react";
import { useParams } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { useSingleNsangiza } from "../Admin Panel/hooks/useAllNsangizas";
import moment from "moment";
import thekomp from "./../../../thekomp";

const SingleNsangiza = () => {
  const { nsangizaid } = useParams();

  const { loading, data, error } = useSingleNsangiza(nsangizaid);
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

  const theNsangiza = data.getNsangiza;
  const renderSingleNsangiza = () => {
    const timo = moment(new Date(theNsangiza.meetingTime));
    const nowTime = moment(new Date());

    if (timo.diff(nowTime) > 0) {
      return (
        <div className="ui stackable two column grid articleG m-3">
          <div className="five wide column">
            <div className="ui raised segment">
              <img className="img-fluid" src={`${thekomp}/${theNsangiza.meetingTheme}`} />
            </div>
          </div>
          <div className="ten wide column">
            <div className="ui raised segment ms-4">
              <div className="field rowInfo">
                <p>
                  <span className="rowTitle">Title: </span>
                  {theNsangiza.title}
                </p>
              </div>
              <div className="field rowInfo">
                <p>
                  <span className="rowTitle">Brief Description: </span>
                  {theNsangiza.briefIntroduction}
                </p>
              </div>
              <div className="field rowInfo">
                <p>
                  <span className="rowTitle">Nsangiza Time: </span>
                  {new Date(theNsangiza.meetingTime).toString()}
                </p>
              </div>
              <div className="field rowInfo">
                <p>
                  <span className="rowTitle">Host names: </span>
                  {theNsangiza.hostNames}
                </p>
              </div>
              <div className="field rowInfo">
                <p>
                  <span className="rowTitle">Host Introduction: </span>
                  {theNsangiza.hostIntroduction}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return <div className="ui segment">{renderSingleNsangiza()}</div>;
};

export default SingleNsangiza;
