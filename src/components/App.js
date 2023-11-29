import React from "react";

import Header from "./Header";
import Home from "./pages/Home";
import Footer from "./Footer";
import ProductsServices from "./pages/ProductsServices";
import About from "./pages/About";
import Login from "./Auth/Login";
import UserInfo from "./Auth/UserInfo";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import history from "../Redux/actions/history";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

//private route
import PrivateRoute from "./routing/PrivateRoute";
import AdminRoute from "./routing/AdminRoute";

import "./styles/app.css";

//Papers options
import Papers from "./pages/papers/Papers";
import Paper from "./pages/papers/Paper";
import CreatePaper from "./pages/papers/CreatePaper";
import EditPaper from "./pages/papers/EditPaper";

//Course options
import Courses from "./pages/Courses/Short Courses/Courses";
import CreateCourse from "./pages/Courses/CreateCourse";
import Course from "./pages/Courses/Short Courses/Course";
import EditCourse from "./pages/Courses/Short Courses/EditCourse";
import LongCourses from "./pages/Courses/Long Courses/LongCourses";
import LongCourse from "./pages/Courses/Long Courses/LongCourse";
import LearnPage from "./pages/Courses/Long Courses/LearnPage";
import UserCourses from "./pages/BwengeCourses/UserCourses";

//Search options
import SearchResult from "./pages/Search Components/SearchResult";

//partnership page
import Partnership from "./pages/partnership pages/Partnership";
import OrganPartnership from "./pages/partnership pages/OrganPartnership";

//products services
import RequestService from "./pages/Services/RequestService";

//admin route
import AdminPanel from "./pages/Admin Panel/AdminPanel";

//MOOC courses
import CreateMoocCourse from "./pages/Bwenge MOOC/CreateMoocCourse";
import IndMoocCourse from "./pages/Bwenge MOOC/Display Mooc Courses/IndMoocCourse";
import EditMoocCourse from "./pages/Bwenge MOOC/EditMoocCourse";
import EnrollCoursePage from "./pages/BwengeCourses/EnrollCoursePage";
//quiz time
import AssignmentPackage from "./pages/Bwenge MOOC/QuizTime/AssignmentPackage";
import QuizPackage from "./pages/Bwenge MOOC/QuizTime/QuizPackage";

//usermooc
import UserQuizResults from "./pages/Bwenge MOOC/QuizTime/UserQuizResults";

//InstructorMooc
import IndivCourseInstructor from "./pages/Bwenge MOOC/Mooc Instructor/IndivCourseInstructor";
import ExamPackage from "./pages/Bwenge MOOC/QuizTime/ExamPackage";
import UserExamResults from "./pages/Bwenge MOOC/QuizTime/UserExamResults";

import InstitutionDashboardPage from "./pages/Institution/InstitutionDashboardPage.js";
import InstitutionAdminPanel from "./pages/Institution/Institution Admin Panel/InstitutionAdminPanel";
import UnivInstructorCourses from "./pages/Institution/institution instructor pages/UnivInstructorCourses";
import UserAssignmentResults from "./pages/Bwenge MOOC/QuizTime/UserAssignmentResults";
import NsangizaMainPage from "./pages/Nsangiza/NsangizaMainPage";
import RequestNsangiza from "./pages/Nsangiza/RequestNsangiza";

//video chat
import VideoChat from "./pages/Video chat/VideoChat.tsx";
import SingleNsangiza from "./pages/Nsangiza/SingleNsangiza";
import CourseSpocs from "./pages/Institution/institution instructor pages/CourseSpocs";
import EditSpocCourse from "./pages/Bwenge MOOC/EditSpocCourse";
import BwengeCourses from "./pages/BwengeCourses/BwengeCourses";
import IndivBwengeCourse from "./pages/BwengeCourses/IndivBwengeCourse";
import InstructorPage from "./pages/BwengeCourses/InstructorPage";
import EditLongCourse from "./pages/Courses/EditLongCourse";
import BwengeQuizPackage from "./pages/Bwenge MOOC/QuizTime/BwengeQuizPackage";
import BwengeAssignmentPackage from "./pages/Bwenge MOOC/QuizTime/BwengeAssignmentPackage";
import BwengeExamPackage from "./pages/Bwenge MOOC/QuizTime/BwengeExamPackage";
import Introduction from "./pages/Bwenge Story/Introduction";
import Mission from "./pages/Mission";
import IndivBwengeShortCourse from "./pages/BwengeCourses/IndivBwengeShortCourse";
import ServicesIntro from "./pages/Bwenge Story/ServicesIntro";
import Nsangizadesc from "./pages/Bwenge Story/Nsangizadesc";
import CourseCreation from "./pages/Bwenge Story/CourseCreation";

//articles
import CreateArticle from "./pages/Articles/CreateArticle";
import Article from "./pages/Articles/Article";
import UniversityProjects from "./pages/papers/UniversityProjects";
import CreateUnivPaper from "./pages/papers/CreateUnivPaper";
import UnivProject from "./pages/papers/UnivProject";
import CommunityHome from "./pages/Community/CommunityHome";
import CreateCommunity from "./pages/Community/CreateCommunity";
import IndivCommunity from "./pages/Community/IndivCommunity";
import CreateCommunityArticle from "./pages/Articles/CreateCommunityArticle";
import QAs from "./pages/Articles/QAs";
import ResetPassword from "./Auth/ResetPassword";
import EmailVerification from "./Auth/EmailVerification";
import LastStepEmailverification from "./Auth/LastStepEmailverification";
import UnloggedArticle from "./pages/Articles/UnloggedArticle";
import CreateContest from "./pages/Community/Indiv community/Contests/CreateContest";
import CommunityAdminPanel from "./pages/Community/Indiv community/CommunityAdminPanel";
import SingleContestHome from "./pages/Community/Indiv community/Contests/Single Contest/SingleContestHome";
import SingleDailyContest from "./pages/Community/Indiv community/Contests/Single Contest/SingleDailyContest";
const App = () => {
  const location = useLocation();

  const IndivScreens = [
    "/moocassignment",
    "/createmooccourse",
    "/moocquiz",
    "/quizresult",
    "/assignmentresult",
    "/editmooc",
    "/moocexam",
    "/bwengequiz",
    "/bwengeassignment",
    "/bwengeexam",
    "/createcourse",
    "/examresult",
    "/adminpanel",
    "/institutiondashboard",
    "/institutionadminpanel",
    "/indivcourseinstructor",
    "/editlongcourse",
    "/spocs",
    "/editspoc",
    "/communitycontestcreate",
  ];
  const lightgreenbg = ["/article", "/nsangiza", "/communities"];
  return (
    <div className="body" style={lightgreenbg.some((v) => location.pathname.includes(v)) ? { backgroundColor: "rgb(212, 255, 241)" } : {}}>
      {!IndivScreens.some((v) => location.pathname.includes(v)) && (
        <div className="header">
          <Header />
        </div>
      )}
      <div className="Mainocontent" style={!IndivScreens.some((v) => location.pathname.includes(v)) ? { marginTop: "10vh" } : {}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/longcourses" element={<LongCourses />} />
          <Route path="/products" element={<ProductsServices />} />
          <Route path="/about" element={<About />} />
          <Route path="/bwengearticle/:id" element={<UnloggedArticle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/communitycontestcreate/:id" element={<CreateContest />} />
          <Route path="/applypartner" element={<Partnership />} />
          <Route path="/applyorgnpartner" element={<OrganPartnership />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/passwordreset/:token" element={<ResetPassword />} />
          <Route path="/userinfo/:id" element={<UserInfo />} />
          <Route path="/contest/:id" element={<SingleContestHome />} />
          <Route path="/dailycontest/:id" element={<SingleDailyContest />} />
          <Route path="/communities" element={<CommunityHome />} />
          <Route path="/community/:id" element={<IndivCommunity />} />
          <Route path="/community/:id/admin" element={<CommunityAdminPanel />} />
          <Route path="/createcommunity" element={<CreateCommunity />} />
          <Route path="/diasporaprojects" element={<Papers />} />
          <Route path="/universityprojects" element={<UniversityProjects />} />
          <Route path="/createunivproject" element={<CreateUnivPaper />} />
          <Route path="/project/:id" element={<Paper />} />
          <Route path="univproject/:id" element={<UnivProject />} />
          <Route path="/insertproject" element={<AdminRoute />}>
            <Route path="/insertproject" element={<CreatePaper />} />
          </Route>
          <Route path="/editpaper" element={<AdminRoute />}>
            <Route path="/editpaper" element={<EditPaper />} />
          </Route>
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/createcommunityarticle" element={<CreateCommunityArticle />} />
          <Route path="/createcourse" element={<AdminRoute />}>
            <Route path="/createcourse" element={<CreateCourse />} />
          </Route>
          <Route path="/course" element={<Course />} />
          <Route path="/lcourse" element={<LongCourse />} />
          <Route path="/learnpage" element={<LearnPage />} />
          <Route path="/shortcourselearn/:id" element={<IndivBwengeShortCourse />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/requestemailverification" element={<EmailVerification />} />
          <Route path="/confirmemail/:confirmtoken" element={<LastStepEmailverification />} />

          <Route path="/bwengecourses/:selectedtype" element={<BwengeCourses />} />
          <Route path="/nsangizadescription" element={<Nsangizadesc />} />
          <Route path="/coursedescription" element={<CourseCreation />} />
          <Route path="/editlongcourse/:id" element={<EditLongCourse />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/requestservice" element={<RequestService />} />
          <Route path="/adminpanel" element={<AdminRoute />}>
            <Route path="/adminpanel" element={<AdminPanel />} />
          </Route>
          <Route path="/createmooccourse" element={<CreateMoocCourse />} />
          <Route path="/indivmooc/:id/:selectedMenu" element={<PrivateRoute />}>
            <Route path="/indivmooc/:id/:selectedMenu" element={<IndMoocCourse />} />
          </Route>
          <Route path="/editmooc/:id" element={<EditMoocCourse />} />
          <Route path="/editspoc/:id" element={<EditSpocCourse />} />
          <Route path="/courselearn/:id/:selectedMenu" element={<IndivBwengeCourse />} />
          <Route path="/coursedesc/:id" element={<EnrollCoursePage />} />
          <Route path="/bwengeservices" element={<ServicesIntro />} />
          <Route path="/createarticle" element={<CreateArticle />} />
          <Route path="/qa/:id" element={<QAs />} />

          <Route path="/mycourses" element={<PrivateRoute />}>
            <Route path="/mycourses" element={<UserCourses />} />
          </Route>
          <Route path="/assignmentresult" element={<PrivateRoute />}>
            <Route path="/assignmentresult" element={<UserAssignmentResults />} />
          </Route>
          <Route path="/quizresult" element={<PrivateRoute />}>
            <Route path="/quizresult" element={<UserQuizResults />} />
          </Route>
          <Route path="/examresult" element={<PrivateRoute />}>
            <Route path="/examresult" element={<UserExamResults />} />
          </Route>
          {/* <Route path="/instructorcourses" element={<PrivateRoute />}>
            <Route path="/instructorcourses" element={<InstructorCourses />} />
          </Route> */}
          <Route path="/instructorcourses" element={<PrivateRoute />}>
            <Route path="/instructorcourses" element={<InstructorPage />} />
          </Route>
          <Route path="/indivcourseinstructor/:id/:selectedMenu" element={<PrivateRoute />}>
            <Route path="/indivcourseinstructor/:id/:selectedMenu" element={<IndivCourseInstructor />} />
          </Route>
          <Route path="/spocs/:id" element={<PrivateRoute />}>
            <Route path="/spocs/:id" element={<CourseSpocs />} />
          </Route>
          <Route path="/institutiondashboard" element={<InstitutionDashboardPage />} />
          <Route path="/institutionadminpanel" element={<InstitutionAdminPanel />} />
          <Route path="/videochat" element={<VideoChat />} />

          <Route path="/nsangiza" element={<NsangizaMainPage />} />
          <Route path="/nsangiza/:nsangizaid" element={<SingleNsangiza />} />
          <Route path="/requestnsangiza" element={<RequestNsangiza />} />
        </Routes>
      </div>

      {!IndivScreens.some((v) => location.pathname.includes(v)) && (
        <div className="footer">
          <Footer />
        </div>
      )}
      <Routes>
        <Route path="/moocassignment" element={<AssignmentPackage />} />
        <Route path="/moocquiz" element={<QuizPackage />} />
        <Route path="/moocexam" element={<ExamPackage />} />
        <Route path="/bwengequiz" element={<BwengeQuizPackage />} />
        <Route path="/bwengeassignment" element={<BwengeAssignmentPackage />} />
        <Route path="/bwengeexam" element={<BwengeExamPackage />} />
      </Routes>
    </div>
  );
};

export default App;
