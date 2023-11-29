import React, { useEffect } from "react";
import "./styles/courseCreation.css";
import coursecreationim from "../../../imgs/coursecreationimage.PNG"
import { AiOutlineArrowRight } from "react-icons/ai";

const CourseCreation = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" ">
        <div className="">
           <img src={coursecreationim} class=" createcourseim" alt="" />
      </div>
      <div class="">
        <div className="courseCreatorHeader">
        <h2 >Introduction to Content Creation</h2>
        </div>
 
        <div class="introduction">
          <p className="courseCreateParagr">
            The profession online course is now crucial to any expert, leaders and companies to train their employees. BWENGE platform has <br/> become a
            solution for companies, Nation and the universities experts to share their knowledge to build future generation.
          </p>

           
        </div>
        <div className="createco">
        <div class="adweb">
            <div class="advisor">
              <div>
                <h3 className="coursetitle">Short Courses</h3>
              </div>
            
            <p className=" createparagrah">
                The courses will be created freely by everyone who <br />
                willing to share his/her knowledge to contrite to the <br />
                society learning. the content can be a special topic or <br />
                research achievement, well explained with aPower  <br />
                Point(ppt-pdf) and or video between (15-30min).The Content Quality 
                staff will ensure the content quality and approve it. the 
                company will promote the contents and the 
                creators will get the followers which will<br />
                benefit them in one way or the other in thefuture.
              </p>
               <div className="readmorecous">
            <a  href="#"className="readmorecourse">Read more <AiOutlineArrowRight/> </a>
          </div>
          </div>
          <div class="webdesign">
            <h3 className="coursetitle">
              Long Courses
            </h3>
            <p className="createparagrah">
              The courses will be created for free or for sell. The content be well explained with a video of high quality, clearly described with
              clear goals. The quizzes, assignment and exams can be added to evaluate the learning outcomes. after competition the certificate will be
              awarded. The company will ensure the content quality and approve it.
              </p>
               <div className="readmorecous">
            <a  href="#"className="readmorecourse">Read more <AiOutlineArrowRight/> </a>
          </div>
          </div>
        </div>
        <div class="adweb ">
          <div class="advisor2">
            <h3 className="coursetitle">
               National Courses
            </h3>
            <p className="createparagrahs">
                The vision of country includes to educate people <br />
                according to the market demand, the platform will be <br />
                open at national content creator depend on the nation<br />
                training demand. The goal of National Courses is to <br />
                speed up the capacity building for creativity and <br />
                innovation in all domain and provide certification and <br />
                recognition possible for the program learners or<br />
                Trained staffs etc. Also, the overarching goals of<br />
                National Courses are to offer each individual student,<br />
                staff and researchers high standards, breadth, and <br />
                depth Learning.{" "}
              </p>
               <div className="readmorecous">
            <a  href="#"className="sreadmorecourse">Read more <AiOutlineArrowRight/> </a>
          </div>
          </div>
          <div class="webdesign2">
            <h3 className=" coursetitle">
            Culture Courses
            </h3>
            <p className="createparagrah">
              This course will be for Rwandans to learn our culture and history. the company has planned how the content will be created through the
              collaboration with the institutions in charges. In addition, if you want to share your content privately you can contact us.
              </p>
               <div className="readmorecous">
            <a  href="#"className="sreadmorecourse">Read more <AiOutlineArrowRight/> </a>
          </div>
          </div>
        </div>
        <div class="combination">
          <div class="assistance">
            <h3 className="coursetitle">
            How to Create the best and quality content at BWENGE Platform:
            </h3>
            <ol>
              {" "}
              <li className="courseCreatLister">Make a deep research on the content you want to share</li>
              <li className="courseCreatLister">Take time, outline your contents, detail it and make it attractive and productive</li>
              <li className="courseCreatLister">Check your environment before recording</li>
              <li className="courseCreatLister">Make a quality contents (Video, sound and design should be at high quality)</li>
              <li className="courseCreatLister">Share your contents to impact the learners </li>
              <li className="courseCreatLister"> At least each chapter should be between 5-20min for long courses</li>
              <li className="courseCreatLister"> Promote your contents</li>
            </ol>
             <div className="readmorecous">
            <a  href="#"className="readmorecourse">Read more <AiOutlineArrowRight/> </a>
          </div>
          </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default CourseCreation;
