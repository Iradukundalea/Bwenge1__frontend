import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import history from "../../Redux/actions/history";
import thekomp from "./../../thekomp";
const LastStepEmailverification = () => {
  const { confirmtoken } = useParams();
  useEffect(() => {
    const formData = new FormData();
    formData.append("email", localStorage.getItem("email"));
    const url = `${thekomp}/auth/verifyemail/${confirmtoken}`;
    const config = {
      method: "put",
      url: url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        alert("Email verified");
        localStorage.setItem("isEmailVerified", "true");
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div></div>;
};

export default LastStepEmailverification;
