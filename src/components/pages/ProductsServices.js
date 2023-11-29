import React from "react";
import "./../styles/products.css";
import { GiArchiveResearch } from "react-icons/gi";
import history from "../../Redux/actions/history";
import projectadvisory from "./../../imgs/projectadvising.webp";
import africandeveloper from "./../../imgs/africandeveloper.png";
import projecthelper from "./../../imgs/projecthelper.webp";
import industrialproject from "./../../imgs/industrialproject.jpg";
import projectpromoting from "./../../imgs/projectpromoting.jpg";
import datacollection from "./../../imgs/datacollection.jpg";

class ProductsServices extends React.Component {
  render() {
    return (
      <div className="ui segment">
        <div class="container">
          <div class="row serviceRow">
            <div class="card123">
              <img src={projectadvisory} className="img" />
              <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Academic project advisor with professionals</div>
              <a onClick={(e) => history.push("/requestservice")} class="btn1">
                Request
              </a>
            </div>
            <div class="card123">
              <img src={africandeveloper} className="img" />

              <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Website and mobile development</div>

              <a onClick={(e) => history.push("/requestservice")} class="btn1">
                Request
              </a>
            </div>
            <div class="card123">
              <img src={projecthelper} className="img" />

              <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Project assistance(Online/Offline)</div>
              <a onClick={(e) => history.push("/requestservice")} class="btn1">
                Request
              </a>
            </div>
          </div>
          <div class="row serviceRow">
            <div class="card123">
              <img src={industrialproject} className="img" />
              <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Industrial Project planning and Consultancy</div>

              <a onClick={(e) => history.push("/requestservice")} class="btn1">
                Request
              </a>
            </div>
            <div class="card123">
              <img src={projectpromoting} className="img" />
              <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Promoting project</div>
              <a onClick={(e) => history.push("/requestservice")} class="btn1">
                Request
              </a>
            </div>
            <div class="card123">
              <img src={datacollection} className="img" />

              <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Data Collection for Diaspora</div>

              <a onClick={(e) => history.push("/requestservice")} class="btn1">
                Request
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductsServices;
