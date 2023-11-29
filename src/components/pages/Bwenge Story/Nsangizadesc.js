import React from "react";
import nsagizap from "../../../imgs/nsangizapic.PNG";
import "./styles/Nsangizadis.css";

const Nsangizadesc = () => {
  return (
    <div className="containernsangiza">
      <div>
        <img src={nsagizap} className="imnsangiza" alt="" />
      </div>
      <div>
        <h2 className="">
          Description to Nsangiza
        </h2>
        <div>
          “Nsangiza” is a Rwandans researchers and global scientific research talk platform based on the
          dissemination of scientific knowledge, currently mainly focusing on academic video conference and scientific research articles, presenting
          the latest scientific research trends for the majority of scientific researchers which will benefit Rwanda, Africa Continent and the World.
        </div>
      </div>
      <div>
        <h2 className="">Our responsibilities:</h2>
        <div>
          Spreading and sharing knowledge: Academic literature, academic conferences at home and abroad,
          trainings, popular science, science and technology. Live streaming or recorded videos and invitation reports within universities can be
          shared.
        </div>
        <div >
          Research procedures and training Providing scientists with
          formal access to scientific source
          code, discover valuable scientific code resources,
          and promoting the concept of science and technology.
          Scientific researchers or units can
          publish the scientific source program developed in their
          published literature. The company will systematically promote it,
          so as to realize
          the effective communication and application of scientific
          procedures and enhance the visibility that can influence the scientific research
          results.
        </div>
      </div>
      <div>
        <h2 className="">Conclusion and recommendations:</h2>
        <div >
          Researchers, colleges, universities, companies and all research organizations are welcomed to put their own series and personal achievements
          on the platform. You can request to share academic articles, ideas, trainings, major scientific news, and events to be seen by anyone at any
          time. This Service is owned by BWENGE R.L.C Ltd, all works belong to the author of the work and the relevant information on the website
          about the introduction, description, flyers etc., are from the conference organizers. The content must be the owner and the organizer should
          follow and read careful the copyright laws because violating any rules shall lead to penalties. If there is a suspected change, please
          contact Nsangiza technical team, we will delete or retain relevant meeting after verifying relevant situation.
        </div>
      </div>
    </div>
  );
};

export default Nsangizadesc;
