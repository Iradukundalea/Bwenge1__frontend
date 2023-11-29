import React from "react";
import "./styles/serviceIntro.css";
import serviceimage  from "../../../imgs/servicesimage.PNG";
import mask1 from "../../../imgs/mask1.png"
import mask2 from "../../../imgs/mask2.png"
import mask3 from "../../../imgs/mask3.png"
import mask4 from "../../../imgs/mask4.png"
import { AiOutlineArrowRight } from "react-icons/ai";



const ServicesIntro = () => (
  <div class="">
    <div className="">
      <img src={serviceimage} class=" imservice" alt="" />
    </div>
    <div className="servicescontainer">
      <div className="headparaservice ">
        <h2 className="serviceIntroHeader">Bwenge Micro Services</h2>
        <p className="servicesintropara">The company has established strong rules and regulations based on the services<br />
          policy in Rwanda to ensure customer satisfaction and bussiness success</p>
      </div>
      <div class="webadd">
        <div class="addwebservices">
          <div className="servicesimgmask">
            <img src={mask1} class=" " alt="" />
          </div>
          <h3 className="serviceIntroHeader3">
            Academic project advisor with professionals
          </h3>

          <p className="serviceIntroPaaragr">
            We assist Rwandan researchers to do their projects <br />
            and cooperate with other professionals especially <br />
            Rwandans students abroad and
            university experts, <br />
            university free talk with diaspora and other events. <br />
            This will contribute to the country development <br /> through research
            and accessing to the new technology <br /> worldwide.
          </p>
          <div className="servicerequestss">
            <a href="#" className="servicerequest">Request <AiOutlineArrowRight /> </a>
          </div>
        </div>
        <div class="addwebservises1">
          <div className="servicesimgmask">
            <img src={mask3} class=" " alt="" />
          </div>
          <h3 className="serviceIntroHeader3">
            Websites and applications development
          </h3>

          <p className="serviceIntroPaaragr">
            Website design and mobile application will be <br />
            designed with our expert in IT (video, graphics,  <br />and other media etc.) at affordable price.
          </p>
          <div className="servicerequestsss">
            <a href="#" className="servicerequest">Request <AiOutlineArrowRight /> </a>
          </div>
        </div>
      </div>
      <div class=" servicesassistance">
        <div class="assistance">
          <div className="servicesimgmask">
            <img src={mask2} class=" " alt="" />
          </div>
          <h3 className="serviceIntroHeader3">
            Project assistance
          </h3>

          <p className="serviceIntroPaaragr">
            We assist you in the journey of you research with (both <br />
            online and offline services) with incredible guidance <br />
            and provision of required
            materials.
          </p>
          <div className="servicerequestsss">
            <a href="#" className="servicerequest">Request <AiOutlineArrowRight /> </a>
          </div>
        </div>
        <div class="datacollectionservice">
          <div className="servicesimgmask">
            <img src={mask4} class="" alt="" />
          </div>

          <h3 className="">
            Data collection
          </h3>

          <p className="serviceIntroPaaragr">
            You need an efficient data collection team,
            write an  <br />email for the institution or any organization, complete <br />
             and we help
            you to make a follow up to <br />
            speed up you research especially the diaspora who <br />
            want to do their research which has an impact to our <br />
            country.
          </p>
          <div className="servicerequests">
            <p className="servicerequest">Request <AiOutlineArrowRight /> </p>
          </div>
        </div>

      </div>

      <div class="promotion">
        <div className="">
          <img src={mask2} class=" " alt="" />
        </div>
        <h3 className="">
          Project promotion
        </h3>

        <p className="serviceIntroPaaragr">
          Having research idea or project that need a deep <br />
          research to address any social problem or having<br />
          creative point, we are connection you to
          the research <br />
          institution and allow you to present your star idea.
        </p>
        <div className="servicerequestssss">
          <a href="#" className="servicerequest">Request <AiOutlineArrowRight /> </a>
        </div>
      </div>
    </div>
  </div>
);

export default ServicesIntro;
