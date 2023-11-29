import React, { useState, useEffect } from "react";
import { useAllArticles, Judge_Article } from "../hooks/useAllArticles";
import history from "../../../../Redux/actions/history";
import IndivArticle from "./Bwenge Articles components/IndivArticle";
import { useMutation } from "@apollo/client";
import Modal from "../../../Modal";

const BwengeArticles = () => {
  const { data, loading, error } = useAllArticles();
  const queryParams = new URLSearchParams(window.location.search);
  const [JUDGE_THO_ARTICLE, {}] = useMutation(Judge_Article);
  const [thoarticles, setThoArticles] = useState();
  const [judgeModal, setJudgeModal] = useState(false);
  const [selectedArt, setSelectedArt] = useState({
    id: "",
    marks: 0,
  });
  useEffect(() => {
    if (loading == false && data) {
      setThoArticles(data.getAllArticles);
    }
  }, [loading, data]);

  const articleID = queryParams.get("id");
  if (articleID) {
    return <IndivArticle />;
  }

  if (loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  if (thoarticles) {
    const articles = thoarticles;
    console.log(articles);
    var counter = 1;
    const markContent = () => {
      return (
        <div className="ui segment">
          <div className="ui form">
            <div className="field">
              <label>Marks:</label>
              <input type="number" value={selectedArt.marks} max={50} onChange={(e) => setSelectedArt({ ...selectedArt, marks: e.target.value })} />
            </div>
          </div>
        </div>
      );
    };
    const markActions = () => {
      return (
        <div>
          <button
            className="ui floated right primary button"
            onClick={(e) => {
              JUDGE_THO_ARTICLE({
                variables: {
                  judgeArticleId: selectedArt.id,
                  marks: parseInt(selectedArt.marks),
                },
              }).then(() => {
                var thearto = thoarticles;
                thearto = thearto.map((item) => {
                  if (item.id == selectedArt.id) {
                    item.bwenge_score = selectedArt.marks;
                  }
                  return item;
                });
                setThoArticles(thearto);
                setJudgeModal(false);
              });
            }}
          >
            Judge
          </button>
        </div>
      );
    };
    return (
      <div className="ui raised segment">
        <table className="ui celled table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Field</th>
              <th>Writer</th>
              <th>Email</th>
              <th>onApproved</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item) => {
              var bg = "white";
              if (!item.onApproved) {
                bg = "rgb(255, 109, 109";
              }
              return (
                <tr style={{ cursor: "pointer", backgroundColor: bg }}>
                  <th onClick={(e) => history.push(`?menu=bwengearticles&id=${item.id}`)}>{counter++}</th>
                  <th onClick={(e) => history.push(`?menu=bwengearticles&id=${item.id}`)}>{item.title}</th>
                  <th onClick={(e) => history.push(`?menu=bwengearticles&id=${item.id}`)}>{item.field}</th>
                  <th onClick={(e) => history.push(`?menu=bwengearticles&id=${item.id}`)}>
                    {item.creator.lastName} {item.creator.firstName}
                  </th>
                  <th onClick={(e) => history.push(`?menu=bwengearticles&id=${item.id}`)}>{item.creator.email}</th>
                  <th onClick={(e) => history.push(`?menu=bwengearticles&id=${item.id}`)}>{item.onApproved.toString()}</th>

                  {item.bwenge_score == 0 ? (
                    <th>
                      <button
                        onClick={(e) => {
                          setSelectedArt({
                            id: item.id,
                            marks: item.bwenge_score,
                          });
                          setJudgeModal(true);
                        }}
                        className="ui button"
                      >
                        Judge
                      </button>
                    </th>
                  ) : (
                    <th
                      onClick={(e) => {
                        setSelectedArt({
                          id: item.id,
                          marks: item.bwenge_score,
                        });
                        setJudgeModal(true);
                      }}
                    >
                      {item.bwenge_score}/50
                    </th>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {judgeModal && <Modal title="Mark the article/50" onDismiss={(e) => setJudgeModal(false)} content={markContent()} actions={markActions()} />}
      </div>
    );
  }
};

export default BwengeArticles;
