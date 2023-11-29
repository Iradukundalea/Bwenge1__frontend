import React from "react";
import { useGetCommunityArticles } from "../../Admin Panel/hooks/useAllArticles";
import { useParams } from "react-router-dom";
import history from "../../../../Redux/actions/history";
import _ from "lodash";
const CommunityArticles = ({ articles }) => {
  const { id } = useParams();
  const { data, loading, error } = useGetCommunityArticles(id);

  const communityArticles = articles;
  console.log(communityArticles);
  return (
    <div>
      {communityArticles.map((item) => {
        return (
          <div>
            <div class="ui feed">
              <div class="event">
                <div class="content">
                  <div class="date">
                    <span style={{ fontWeight: "600", marginRight: "1.5rem" }}>{item.creator.lastName + " " + item.creator.firstName}</span>{" "}
                    {item.dateOfSubmission.substr(0, 10)}
                  </div>
                  <div
                    class="summary"
                    onClick={(e) => {
                      if (!localStorage.getItem("authToken")) history.push(`/bwengearticle/${item.id}`);
                      else history.push(`/article/${item.id}`);
                    }}
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  >
                    {item.title}
                  </div>
                </div>
              </div>
              <div class="extra content mt-3" style={{ fontWeight: "400" }}>
                <span>
                  <i class="eye icon" style={{ opacity: ".5" }}></i>
                  {item.viewers.length}
                </span>
                <span className="ps-2">
                  <i
                    class="thumbs up icon"
                    style={
                      _.findIndex(item.likes, ["liker", localStorage.getItem("userId")]) != -1 ? { color: "green", opacity: ".5" } : { opacity: ".5" }
                    }
                  ></i>
                  {item.likes.length}
                </span>
                <span className="ps-2">
                  <i class="comments icon" style={{ opacity: ".5" }}></i>
                  {item.comments.length}
                </span>
              </div>
            </div>

            <div class="ui divider"></div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityArticles;
