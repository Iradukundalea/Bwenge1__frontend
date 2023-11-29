import React from "react";
import { useAllUsers } from "../hooks/useBwengeUsers";
import history from "../../../../Redux/actions/history";
import SendGrid from "./Bwenge Users Components/SendGrid";

const DatabasesPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const action = queryParams.get("action");

  const { loading, error, data } = useAllUsers();
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
  const users = data.getAllBwengeUsers;
  var cntus = 0;
  if (action == "sendgrid") {
    return <SendGrid />;
  }
  return (
    <div className="ui segment">
      <button
        className="ui primary button"
        onClick={(e) => {
          history.push("/adminpanel?menu=Databases&action=sendgrid");
        }}
      >
        Send Grid
      </button>
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>phoneNumber</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            cntus++;
            return (
              <tr>
                <th>{cntus}</th>
                <th>{item.firstName}</th>
                <th>{item.lastName}</th>
                <th>{item.phoneNumber}</th>
                <th>{item.email}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DatabasesPage;
