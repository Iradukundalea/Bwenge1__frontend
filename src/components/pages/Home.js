import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPapers, selectPaper } from "../../Redux/actions/index";
import { useGetallApprovedShortCourses } from "./BwengeCourses/hooks.js/useshortcourses";
import { useGetAllApprovedArticles } from "./Admin Panel/hooks/useAllArticles";
import { useGetUnivProjects } from "./papers/Hooks/useUnivProjects";
import { useGetDiasporaProjects } from "./papers/Hooks/usePaper";
import _ from "lodash";
import { HiNewspaper } from "react-icons/hi";
import { SiHotjar } from "react-icons/si";
import { BsBook } from "react-icons/bs";
import bwengeIntro from "./../../imgs/newcareer.png";
import twiyubake1 from "./../../imgs/rw1.PNG";
import twiyubake2 from "./../../imgs/rw2.PNG";
import twiyubake3 from "./../../imgs/rw3.PNG";
import book1 from "./../../imgs/book3.png";
import book2 from "./../../imgs/book2.png";
import book3 from "./../../imgs/book1.png";
import bookp from "./../../imgs/bookp.PNG";
import par1 from "./../../imgs/par1.png"
import par2 from "./../../imgs/par2.png"
import par3 from "./../../imgs/par3.png" 
import mobile from "./../../imgs/mobile.PNG"
import message1 from "./../../imgs/message.PNG"
import address1 from "./../../imgs/address.PNG"
import courseHero from "./../../imgs/ubumenyi.png";
import history from "../../Redux/actions/history";
import thekomp from "./../../thekomp.js";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

import "../styles/home.css";
import "../styles/animate.css";
import Courses from "./Home components/Courses";

const Home = () => {
  const [projectChoice, setprojectChoice] = useState("diaspora");
  var { data, loading, error } = useGetallApprovedShortCourses();
  const dataCourses = data;
  const loadingCourses = loading;
  const errorCourses = error;
  const { data1, loading1, error1 } = useGetAllApprovedArticles();
  var { data, loading, error } = useGetDiasporaProjects();
  const dataDiaspora = data;
  const loadingDiaspora = loading;
  const errorDiaspora = error;
  var { data, loading, error } = useGetUnivProjects();
  const dataUnivProjects = data;
  const loadingUnivProjects = loading;
  const errorUnivProjects = error;
  if (loadingCourses || loading1 || loadingDiaspora || loadingUnivProjects) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (errorCourses || error1 || errorDiaspora || errorUnivProjects) {
    return <h2>{errorCourses.Error}</h2>;
  }
  const shortcourses = dataCourses.getAllApprovedShortCourses;
  var articles = data1.getAllApprovedArticles;

  const diasporaprojects = dataDiaspora.getAllApprovedprojects;
  const univProjects = dataUnivProjects.getAllApprovedUnivprojects;

  articles = articles.filter((item) => {
    if (!item.communityConnected) return item;
  });

  const articleChunk = _.chunk(articles, Math.ceil(articles.length / 2));

  const slides1 = _.chunk(_.reverse(articleChunk[0]), 5);
  const slides2 = _.chunk(_.reverse(articleChunk[1]), 5);
  const renderAllShortCourses = shortcourses.map((course) => {
    return (
      <div
        class="card me-4"
        onClick={(e) => {
          if (!localStorage.getItem("authToken")) {
            alert("Please Login to view Content");
          } else {
            history.push(`/shortcourselearn/${course.id}`);
          }
        }}
      >
        {/* <a class="ui blue ribbon label">Short Course</a> */}
        <div class="image">
          <img src={`${thekomp}/${course.courseIcon}`} height="155" width="240" />
        </div>
        <div class="content">
          <div class="header" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", width: "100%" }}>
            {course.title}
          </div>
          <div class="meta">
            <a>{course.field}</a>
          </div>
          <div class="description">{course.instructor}</div>
        </div>
        <div class="extra content">
          <span>
            <i class="eye icon"></i>
            {course.viewers.length}
          </span>
          <span className="ps-2">
            <i class="thumbs up icon"></i>
            {course.likes.length}
          </span>
          <span className="ps-2">
            <i class="comments icon"></i>
            {course.comments.length}
          </span>
        </div>
      </div>
    );
  });
  const renderProject = () => {
    if (projectChoice == "diaspora") {
      return (
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Level</th>
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {diasporaprojects.map((item) => {
              return (
                <tr onClick={(e) => history.push(`/project/${item.id}`)} style={{ cursor: "pointer" }}>
                  <td>{item.title}</td>
                  <td>
                    {item.authors.map((author) => (
                      <p>{author}; </p>
                    ))}
                  </td>
                  <td>{item.country}</td>
                  <td>{item.submissionDate.substr(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else if (projectChoice == "university") {
      return (
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>University</th>
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {univProjects.map((item) => {
              return (
                <tr onClick={(e) => history.push(`/univproject/${item.id}`)} style={{ cursor: "pointer" }}>
                  <td>{item.title}</td>
                  <td>
                    {item.authors.map((author) => (
                      <p>{author}; </p>
                    ))}
                  </td>
                  <td>{item.university}</td>
                  <td>{item.submissionDate.substr(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };
  return (
    <div className="mainHome">
      <section class="bwengeNews">
        <div className="ui stackable two column grid">
          <div className="eight wide column">
            <div className="ui segment">
              {/* <a class="ui blue right ribbon label">Read best new Science and Technology articles from Bwenge users</a> */}
              <div>
                <a class="ui label ms-3">
                  <HiNewspaper class="ui right spaced avatar image" />
                  Headlines
                </a>
              </div>

              <Swiper
                direction={"horizontal"}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoHeight={true}
                height="240"
                autoplay={{
                  delay: 10000,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {slides1.map((itemo) => {
                  return (
                    <SwiperSlide height="400">
                      <div class="ui list mt-3 ms-3 me-4 mb-2">
                        {itemo.map((item) => {
                          return (
                            <div
                              class="item"
                              onClick={(e) => {
                                if (!localStorage.getItem("authToken")) {
                                  history.push(`/bwengearticle/${item.id}`);
                                } else history.push(`/article/${item.id}`);
                              }}
                            >
                              <div class="content">
                                <div class="header">{item.title}</div>
                                <div class="description">{item.dateOfSubmission.substr(0, 10)}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="eight wide column">
            <div className="ui segment">
              <a class="ui label m-3">
                <SiHotjar class="ui right spaced avatar image" />
                Trending
              </a>
              <Swiper
                direction={"vertical"}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoHeight={true}
                height="240"
                autoplay={{
                  delay: 10000,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {slides2.map((itemo) => {
                  return (
                    <SwiperSlide height="400">
                      <div class="ui list mt-3 ms-3 me-4 mb-2">
                        {itemo.map((item) => {
                          return (
                            <div
                              class="item"
                              onClick={(e) => {
                                if (!localStorage.getItem("authToken")) {
                                  history.push(`/bwengearticle/${item.id}`);
                                } else history.push(`/article/${item.id}`);
                              }}
                            >
                              <div class="content">
                                <div class="header">{item.title}</div>
                                <div class="description">{item.dateOfSubmission.substr(0, 10)}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
     
      <section class="main py-5">
        <div className="wel">  
          <p>Welcome to the Bwenge platform.</p>
        </div>
      
        <div class="container">
          <div class="row">
            <div class="col-lg-7 ">
             
              <div class="modal fade" id="register" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title text-center" id="registerModalLabel">
                        Register to Bwenge Website
                      </h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3 row">
                        <label for="inputtext" class="col-sm-2 col-form-label">
                          Full name
                        </label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputtext" placeholder="Type your Full name" />
                        </div>
                      </div>
                      <div class="mb-3 row">
                        <label for="inputemail" class="col-sm-2 col-form-label">
                          Email Address
                        </label>
                        <div class="col-sm-10">
                          <input type="email" class="form-control" id="inputemail" placeholder="Type your Email Address" />
                        </div>
                      </div>
                      <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">
                          Password
                        </label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="inputPassword" placeholder="*************" />
                        </div>
                      </div>
                      <div class="mb-3 row">
                        <label for="Tel" class="col-sm-2 col-form-label">
                          Telephone
                        </label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="tel" placeholder="Phone number" />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary">
                        Register
                      </button>
                    </div>
                    <div class="text-center">
                      <h5>
                        <a href="">Forget Password ?</a>
                      </h5>
                    </div>
                    <h6 class="text-center">
                      Already have an account? <a href="#login">Login</a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5 ">
              {/* <img src="./images/7.svg" class="imag1" alt="" srcset="" /> */}
            </div>
          </div>
        </div>
      </section>

      <div className="storebook">
        <div>
            <img src={bookp} class="storeimg" alt="" srcset="" />
            <span className="headingbookstore">BOOK STORE</span>
        </div>
      </div>
              
                 <div class=" book ">
              <div class="#">
                  <img src={book1} class="bookimg " alt="" />
                  <div class="p2 paragarph">Readmore</div>
                </div>
                <div class="#">
                  <img src={book2} class=" #" alt="" />
                  <div class="p2 paragarphii">Readmore</div>
                </div>
              
               <div class="bookimu">
                  <img src={book2} class=" bookimg" alt="" />
                  <div class="p2 paragarphii">Read more</div>
                </div>
        

                <div class="bookimuu">
                  <img src={book3} class="bookimg " alt="" />
                  <div class="p2 paragarphi ">Readmore</div>
                </div>
            
            
          </div>
          


      
      <div className="bwengeintro">
        <div className="header-image">
                <img className=" imag1 " data-wow-duration="3s" data-wow-delay="0.6s" src={bwengeIntro}></img>
              </div>
               <div className="small_header mt-md-5">
                <h3 className="newcareerheading">LAUNCH  YOUR NEW CAREER WITH <br/>A PROFESSIONAL SKILLS ON BWENGE</h3><br/>
               <p className="newcareerpara">We focus on teaching and sharing knowledge and to <br/> help the learners to become experts in all fields  for<br/> impacting our future
                generation.</p> <br/><br/>
                <button className="careerbtn" type="button">CAREER GUIDANCE</button>
              </div>
      </div>

           <div class="row dushake py-5"> 
            <div class="col-md-4 h1p1">
              <div class="head1">DUSHAKASHAKE <br/>DUSHAKIRA U RWANDA</div>
              <div class="p1">Get free access to the best projects <br/> from universities to <br/>improve on your way up.</div>
            </div>
            <div class="col-md-8">
              <div class="blogrw row py-4 ps-5">
                <div class="d1 col-md-4">
                  <img src={twiyubake1} class=" imgp" alt="" />
                  <div class="p2">Access best researches</div>
                </div>
                <div class="d1 col-md-4">
                  <img src={twiyubake2} class=" imgp" alt="" />
                  <div class="p2">Think and develop new ideas to supplement past research</div>
                </div>
                <div class="d1 col-md-4">
                  <img src={twiyubake3} class=" imgp" alt="" />
                  <div class="p2">Proudly graduates adding a stone on Rwandan research block</div>
                </div>
              </div>
            </div>
          </div>
          
      
       <div class="container py-0">
          <h3 class="text-center tableheading">VIEW THE PROJECTS FROM BWENGE PLATFORM</h3>
          <div class="ui tabular menu">
            <a class={projectChoice == "diaspora" ? "item active" : "item"} onClick={(e) => setprojectChoice("diaspora")}>
              Diaspora Projects
            </a>
            <a class={projectChoice == "university" ? "item active" : "item"} onClick={(e) => setprojectChoice("university")}>
              University Projects
            </a>
          </div>
          <div className="ui raised segment">{renderProject()}</div>
        </div>

          {/* <div class="border border-3 border-dark">
            <div class="row m-5">
              <div class="col-md-6 col-lg-3 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5>Computer Science</h5>
                    <hr />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5>BioTech</h5>
                    <hr />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5>Chemistry</h5>
                    <hr />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3 mt-2">
                <div class="card ">
                  <div class="card-body">
                    <h5>Architecture</h5>
                    <hr />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row m-5">
              <div class="col-md-6 col-lg-3 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5>Mechanical </h5>
                    <hr />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5>Medicine</h5>
                    <hr />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5>IS </h5>
                    <hr />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5>IT</h5>
                    <hr />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                    <br />
                    <a href="">Project name..........</a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

     
          <div class=" ubumenyi ">
            <div class="col-md-4 pt-2  headubumenyi">
              <div class="head2">DUSANGIRE UBUMENYI <br/>TWIYUBAKE</div>
              <div class="pa2 pt-5">Get access to courses created by<br/> best instructors and supplement it to your<br/> education for better career.</div>
            </div>

              <img src={courseHero} class=" imag3" alt="" srcset="" />
        
          </div>
        
      <section class="course">
        <div class="container">
        
          <h1 class="text-center brawsetop k">BROWSE TOP CATEGORY COURSES</h1>
          <hr />
          <div class="ui link cards">{renderAllShortCourses}</div>
          {/* <Courses /> */}
        </div>
      </section>

              
     
    
      {/* <div className="partnerdivision">
        <h1 className="parheading ml-6"> OUR PARTNERS</h1>
        
      <div class=" partner ">
                <div class="partner1">
                  <img src={par1} class=" " alt="" />
                  
                </div>
                <div class="partner2">
                  <img src={par2} class=" " alt="" />
                 
                </div>
                <div class="partner3">
                  <img src={par3} class=" " alt="" />
                 </div>
        </div>
        </div> */}

<div class="partnerdivision">
  <h1 class="parheading ml-6">OUR PARTNERS</h1>
  <div class="partner-slideshow">
    <div class="partner">
      <div class="partner1">
        < img src={par1} className="partner1__img" alt="" />
      </div>
      <div class="partner2">
        <img src={par2} className="partner2__img" alt="" />
      </div>
      <div class="partner3">
        <img src={par3} className="partner3__img" alt="" />
      </div>
    </div>
  </div>
</div>


        

    <div className="contactus">
       <h2 class="h1-responsive font-weight-bold text-center my-4  contactushead">CONTACT US</h2>
       
        <div class="col-md-3 text-center ">
            <div className="contactUs">

             <div className="partners">
                <div class="partner11">
                <img src={address1} class=" " alt="" />
                <h1 className="heacontact">ADDRESS</h1>
                <p className="pacontact"> Kigali-Rwanda</p>
                  
                </div>
                <div class="partner22">
                <img src={mobile} class=" " alt="" />
                <h1 className="heacontact">PHONE NUMBER</h1>
                <p className="pacontact"> +25078851359</p>
                 
                </div>
                <div class="partner33">
                <img src={message1} class=" " alt="" />
                <h1 className="heacontact">EMAIL</h1>
                <p className="pacontact"> bwengeorg@gmail.com</p>
                 </div>
        </div>
              
            </div>
        </div>
     <div class=" bothform">
    <div class="col-md-9   ">
    <form className="contactform">
    <div class="row  ">
    <div class="col-6 ">
    <div class="md-form mb-0 ">
   <input   type="text" className="contactinput" placeholder="Your Name"  />
  </div>
  </div>
                   
                    <div class="col-6 ">
                        <div class="md-form mb-0">
                            <input type="Email" placeholder="Your Email" className="contactinputs"/>
                           
                        </div>
                    </div>
                

                </div><br/>
               
                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mb-0">
                            <input type="text" placeholder="Subject" className="subjectconctact"/>
                         
                        </div>
                    </div>
                </div><br/>

                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form">
                            <textarea type="text" placeholder="Message" className="textarea md-textarea"></textarea>
                        </div>
                    </div>
                </div>
            </form>
            <div class="text-center text-md-left">
              <div className="">
                <button id="sb-btn" className="subjectconctact btn-primary" onclick="document.getElementById('contact-form').submit();">Send Message</button>
              </div>
            </div>
        </div>
        
    </div>
</div>



      

      {/* <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Boost your career with{" "}
                <span className="text-warning">Bwenge</span>
              </h1>
              <p className="lead my-4">
                We focus on teaching our students and help them to become
                experts in all their fields through shared knowledge.
              </p>
              <button
                class="btn btn-primary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#enroll"
                onClick={(e) => {
                  history.push("/userinfo");
                }}
              >
                Login Bwenge
              </button>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={bwengeIntro}
            ></img>
          </div>
        </div>
      </section>
      <div className="SearchEngine">
        <Search />
      </div>
      <div className="fieldGround">{indivDeps()}</div>
      <button
        onClick={(e) => history.push("/papers")}
        class="ui inverted secondary button"
      >
        More<i className="ellipsis horizontal"></i>
      </button> */}
    </div>
  );
};
export default Home;
