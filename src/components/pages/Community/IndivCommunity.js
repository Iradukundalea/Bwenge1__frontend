import React, { useState } from "react";
import { useSingleCommunity } from "../Admin Panel/hooks/useBwengeCommunity";
import { useGetCommunityArticles } from "../Admin Panel/hooks/useAllArticles";
import { useGetCommunityQAs } from "../Admin Panel/hooks/useBwengeCommunity";
import { useParams } from "react-router-dom";
import BwengeLogo from "./../../../imgs/BWENG.png";
import Modal from "../../Modal";
import thekomp from "./../../../thekomp";
import "./styles/indivcommunity.css";
import RightCommunityDetails from "./Indiv community/RightCommunityDetails";
import CommunityArticles from "./Indiv community/CommunityArticles";
import CommunityQAs from "./Indiv community/CommunityQAs";
import TopCommunityUsers from "./Indiv community/Indiv Community Components/TopCommunityUsers";
import ContestHome from "./Indiv community/Contests/ContestHome";

const IndivCommunity = () => {
  const { id } = useParams();
  var { data, loading, error } = useSingleCommunity(id);
  var communityData = data;
  var communityLoading = loading;
  var communityError = error;
  var { data, loading, error } = useGetCommunityArticles(id);
  var communityArticlesData = data;
  var communityArticlesLoading = loading;
  var communityArticlesError = error;

  var { data, loading, error } = useGetCommunityQAs(id);

  const [selectedMenu, setSelectedMenu] = useState("articles");
  const [updateProfile, setUpdateProfile] = useState(false);

  if (communityLoading || communityArticlesLoading || loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (communityError || communityArticlesError || error) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  const community = communityData.getSingleCommunity;
  const articles = communityArticlesData.getCommunityArticles;
  const qas = data.getCommunityQAs;

  console.log(community);
  console.log(articles.length);
  console.log(qas.length);
  var totposts = articles.length + qas.length;
  console.log(totposts);
  var likes = 0;
  articles.map((item) => {
    likes += item.likes.length;
  });
  qas.map((item) => {
    likes += item.likes.length;
  });

  return (
    <div className="mx-3">
      <div className="ui stackable three column grid">
        <div className="three wide column">
          <div className="ui raised segment"></div>
        </div>
        <div className="ten wide column">
          <div className="ui raised segment">
            <div class="ui secondary pointing menu">
              <a class={selectedMenu == "articles" ? "item active" : "item"} onClick={(e) => setSelectedMenu("articles")}>
                Ibyanditswe
              </a>
              <a class={selectedMenu == "qas" ? "item active" : "item"} onClick={(e) => setSelectedMenu("qas")}>
                Ibibazo/Ibitekerezo
              </a>
              <a class={selectedMenu == "contests" ? "item active" : "item"} onClick={(e) => setSelectedMenu("contests")}>
                Contests
              </a>
              <a class={selectedMenu == "topcommunity" ? "right item active" : "right item"} onClick={(e) => setSelectedMenu("topcommunity")}>
                Stars
              </a>

              {/* <div class="right menu">
                <a class="ui item">Logout</a>
              </div> */}
            </div>
            <div class="ui segment">
              {selectedMenu == "articles" && <CommunityArticles articles={articles} />}
              {selectedMenu == "qas" && <CommunityQAs qas={qas} />}
              {selectedMenu == "topcommunity" && <TopCommunityUsers articles={articles} qas={qas} />}
              {selectedMenu == "contests" && <ContestHome />}
            </div>
          </div>
        </div>
        <div className="three wide column">
          <RightCommunityDetails posts={totposts} likes={likes} />
        </div>
      </div>
    </div>
  );
};

export default IndivCommunity;
