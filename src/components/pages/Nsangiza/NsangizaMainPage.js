import React, { useState, useEffect } from "react";
import { FaPeopleCarry } from "react-icons/fa";
import history from "../../../Redux/actions/history";
import { CgCalendarNext } from "react-icons/cg";
import { useNsangizaRequests, bookNsangiza } from "../Admin Panel/hooks/useAllNsangizas";
import moment from "moment";
import thekomp from "./../../../thekomp";
import { useMutation } from "@apollo/client";
import _ from "lodash";
const NsangizaMainPage = () => {
  const [liveColor, setLiveColor] = useState("red");
  const [Allnsangizas, setAllNsangiza] = useState([]);
  const [BookNsangiza, {}] = useMutation(bookNsangiza);

  useEffect(() => {
    let forlivecolor = setInterval(() => {
      if (liveColor == "red") setLiveColor("black");
      else setLiveColor("red");
    }, 1000);
    return () => {
      clearInterval(forlivecolor);
    };
  }, [liveColor]);

  const omitDeep = (obj, key) => {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((i) => {
      if (i !== key) {
        const val = obj[i];
        if (val instanceof Date) newObj[i] = val;
        else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
        else if (typeof val === "object" && val !== null) newObj[i] = omitDeep(val, key);
        else newObj[i] = val;
      }
    });
    return newObj;
  };

  const omitDeepArrayWalk = (arr, key) => {
    return arr.map((val) => {
      if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
      else if (typeof val === "object") return omitDeep(val, key);
      return val;
    });
  };
  const { data1, loading1, error1 } = useNsangizaRequests();

  useEffect(() => {
    if (loading1 == false && data1) {
      setAllNsangiza(omitDeepArrayWalk(data1.getAllNsangiza, "__typename"));
    }
  }, [loading1, data1]);

  if (loading1) {
    return (
      <div class="ui ">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error1) {
    console.log(error1);
    return <h2>{error1.Error}</h2>;
  }

  let UpcomingNsangizas = [];
  let liveNsangiza = [];
  let finishedNsangiza = [];

  if (Allnsangizas) {
    Allnsangizas.map((item) => {
      const timo = moment(new Date(item.meetingTime));
      const nowTime = moment(new Date());

      if (timo.diff(nowTime) < -2 * 60 * 60 * 1000) {
        finishedNsangiza.push(item);
      } else if (timo.diff(nowTime) > -2 * 60 * 60 * 1000 && timo.diff(nowTime) < 0) {
        liveNsangiza.push(item);
      } else if (timo.diff(nowTime) > 0) {
        UpcomingNsangizas.push(item);
      }
    });

    const renderLiveNsangiza = () => {
      return (
        <div>
          <h3 class="ui header">
            <i style={{ color: liveColor }} class="circle icon"></i> <div class="content">Aka kanya</div>
          </h3>
          <div className="ui link cards">
            {liveNsangiza.map((item) => {
              return (
                <div
                  class="ui card"
                  onClick={(e) => {
                    if (item.email == localStorage.getItem("email")) {
                      history.push(item.hostLink);
                    } else {
                      history.push(item.attendeeLink);
                    }
                  }}
                >
                  <a class="image">
                    <img src={`${thekomp}/${item.meetingTheme}`} height="155" width="240" />
                  </a>
                  <div class="content">
                    <a class="header" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", width: "100%" }}>
                      {item.title}
                    </a>
                    <div class="meta">
                      <a>Yatangiye {new Date(item.meetingTime).toLocaleString()}</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    const renderUpcoming = () => {
      return (
        <div>
          <h3 class="ui header">
            <CgCalendarNext size={30} />
            <div class="content">Dutegereje</div>
          </h3>
          <div className="ui link cards">
            {UpcomingNsangizas.map((item) => {
              return (
                <div class="ui card ms-3">
                  <a onClick={(e) => history.push(`/nsangiza/${item.id}`)} class="image">
                    <img src={`${thekomp}/${item.meetingTheme}`} height="155" width="240" />
                  </a>
                  <div class="content">
                    <a
                      onClick={(e) => history.push(`/nsangiza/${item.id}`)}
                      class="header"
                      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", width: "100%" }}
                    >
                      {item.title}
                    </a>
                    <div class="meta">
                      <a>Izatangira {new Date(item.meetingTime).toLocaleString()}</a>
                    </div>
                  </div>
                  <div class="extra content">
                    {/* <span>
                      <i class="eye icon"></i>5
                    </span> */}
                    {/* <span
                      className="ps-2"
                      onClick={(e) => {
                        console.log(shortCourse);
                        console.log(id);
                        var thelikes = shortCourse.likes;
                        console.log(thelikes);
                        if (!thelikes.includes(localStorage.getItem("userId"))) {
                          thelikes = [...thelikes, localStorage.getItem("userId")];
                          setShortCourse({ ...shortCourse, likes: thelikes });
                        } else {
                          thelikes = thelikes.filter((item) => item !== localStorage.getItem("userId"));
                          setShortCourse({ ...shortCourse, likes: thelikes });
                        }
                        userLikeCourse({
                          variables: {
                            userId: localStorage.getItem("userId"),
                            likeShortCourseId: shortCourse.id,
                          },
                        });
                      }}
                    >
                      <i
                        class="thumbs up icon"
                        //  style={shortCourse.likes.includes(localStorage.getItem("userId")) ? { color: "green" } : {}}
                      ></i>
                      5
                    </span> */}
                    <div
                      class="ui labeled button ms-3"
                      tabindex="0"
                      onClick={(e) => {
                        if (!localStorage.getItem("userId")) {
                          alert("Login to book!");
                        } else {
                          BookNsangiza({
                            variables: {
                              bookingNsangizaId: item.id,
                              userId: localStorage.getItem("userId"),
                            },
                          }).then((res) => {
                            var thosangizas = Allnsangizas;
                            thosangizas = thosangizas.map((itemo) => {
                              if (itemo.id == item.id) {
                                if (_.includes(itemo.bookings, localStorage.getItem("userId"))) {
                                  itemo.bookings = itemo.bookings.filter((itema) => itema != localStorage.getItem("userId"));
                                } else {
                                  itemo.bookings = [...itemo.bookings, localStorage.getItem("userId")];
                                }
                              }
                              return itemo;
                            });
                            setAllNsangiza(thosangizas);
                          });
                        }
                      }}
                    >
                      {_.includes(item.bookings, localStorage.getItem("userId")) && (
                        <div class="ui disabled blue button">
                          <i class="bell icon"></i> Booked
                        </div>
                      )}
                      {!_.includes(item.bookings, localStorage.getItem("userId")) && (
                        <div class="ui basic blue button">
                          <i class="bell icon"></i> Book
                        </div>
                      )}

                      <a class="ui basic left pointing blue label">{item.bookings.length}</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    return (
      <div className="mx-3">
        <button onClick={(e) => history.push("/requestnsangiza")} class="ui right labeled icon button my-3" style={{ right: "0px" }}>
          <FaPeopleCarry class="icon" />
          Request Nsangiza
        </button>
        <div className="ui raised segment">{renderLiveNsangiza()}</div>
        <div className="ui raised segment">{renderUpcoming()}</div>
        {/* <div className="ui raised segment">{renderFinished()}</div> */}
      </div>
    );
  }
};

export default NsangizaMainPage;
