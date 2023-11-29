import React, { useState } from "react";
import "./styles/footer.css";
import BwengeLogo from "./../imgs/Logowhite.jpg";
import history from "../Redux/actions/history";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import thekomp from "./../thekomp";
import axios from "axios";
import { FcNext} from "react-icons/fc";

const Footer = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const subscribeHandler = () => {
    const formData = new FormData();
    formData.append("email", subscriberEmail);
    var url = `${thekomp}/subscribe`;
    const config = {
      method: "POST",
      url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config).then((res) => {
      setSubscriberEmail("");
      alert("Thank you for subscribing for Bwenge newsroom");
    });
  };
  return (
    <div className="FooterBody col p-3">
      <div className="row">
      
        <div className="usefulink ">
          <div className="imglogo mt-3">
            <img className="  img-fluid ms-4" src={BwengeLogo} />
            <div className="col-2 mt-4  contact">
            <div className="mt-2 col-2">KigaliRwanda</div>
            <div className="mt-2">Kimihurura</div><br/>
            <div className="mt-2">Tel:0788512359</div>
            <div className="mt-2">Email:bwengeorg@gmail.com</div>
          </div>
            </div>
        <div className="col-md-2 mt-4 sm-ms-3 ">
          
          <h3>Useful Links</h3>
          <div className="mt-3" onClick={(e) => history.push("/introduction")}>
          <FcNext/> Home
          </div>
          <div className="mt-3" onClick={(e) => history.push("/mission")}>
          <FcNext/> Mission
          </div>
          <div className="mt-3" onClick={(e) => history.push("/bwengeservices")}>
            <FcNext/>Services
          </div>
          <div className="mt-3" onClick={(e) => history.push("/nsangizadescription")}>
          <FcNext/> Nsangiza
          </div>
          
          <div
            className="mt-3"
            onClick={(e) => {
              history.push("/coursedescription");
            }}
          >
           <FcNext/>Course Creation
          </div>
        </div>
        <div className="col-md-2 mt-4">
          <h3>Partners</h3>
          <div className="mt-3" onClick={(e) => history.push("/applypartner")}>
           <FcNext/> Apply for partnership
          </div>
          <div className="mt-3" onClick={(e) => history.push("/applyorgnpartner")}>
            <FcNext/>Apply for Organization partnership
            </div><br/>
            <div>
              <button className="ui primary button" type="button">$Donate</button>
            </div>
          </div>
        <div className="ms-4 mt-3">
  <h3>Our Newsletter</h3>
  <div className="subsbwenge">
    Subscrible to Bwenge to receive all news on new courses and other services.
  </div>
  <br />
  <div className="ui action inpbwenge input ms-4 mt-3">
    <input
      type="email"
      placeholder="email..."
      onChange={(e) => setSubscriberEmail(e.target.value)}
    />
    <button className="ui primary button" onClick={(e) => subscribeHandler()}>
      Subscribe
    </button>
  </div>
</div>

          </div>
        {/* <div className="col-2 mt-4">
          <h3>Contacts</h3>
          <div className="mt-3">Kigali Rwanda</div>
          <div className="mt-2">Kimihurura</div>
          <div className="mt-2">Tel:0788512359</div>
          <div className="mt-2">Email:bwengeorg@gmail.com</div>
        </div> */}
        
       


        
        <div className="media">
          <div className=" socialmedia">
            
            <FaFacebookF
              onClick={(e) => history.push("https://www.facebook.com/profile.php?id=100084708940157")}
              className="img-fluid socialmedialinks mt-2"
              size={30}
            />
            <FaTwitter onClick={(e) => history.push("https://twitter.com/Bwenge_RLC")} className="img-fluid socialmedialinks mt-2" size={30} />
            <FaInstagram
              onClick={(e) => history.push("https://www.instagram.com/bwengeplatform/")}
              className="img-fluid socialmedialinks mt-2"
              size={30}
            />
            <FaYoutube
              onClick={(e) => history.push("https://www.youtube.com/channel/UCh8a0yzgOqX-faCd8dNnMnA")}
              className="img-fluid socialmedialinks mt-2"
              size={30}
            />
          </div>
        </div> 


      
      </div>
      {/* <div className="row-2">okok</div> */}
    </div>
  );
      };
export default Footer;



