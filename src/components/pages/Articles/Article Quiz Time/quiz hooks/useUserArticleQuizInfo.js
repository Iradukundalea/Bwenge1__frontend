import { gql, useQuery } from "@apollo/client";

const GET_USER_QUIZ_DATA = gql`
  query ExampleQuery($userId: String, $articleId: String, $assignmentId: String) {
    getUserArticleQuizData(userId: $userId, articleId: $articleId, AssignmentId: $assignmentId) {
      id
      userId
      AssignmentId
      QuizDuration
      StartTime
      assignment {
        id
        AssignmentId
        AssignmentTitle
        Userscore
        startTime
        finishTime
        userProblemsAnswers {
          problemInstruction
          problemFile
          questions {
            id
            problem {
              type
              questionQ
              answers
              questionFile
              questionInstruction
              fileRequired
              correctAnswer
              score
              problemInstruction
              problemFile
              questions {
                type
                questionQ
                answers
                questionFile
                score
              }
            }
            Useranswer
            score
          }
        }
      }
      articleId
    }
  }
`;

export const useUserQuizData = (userId, articleId, assignmentId) => {
  const { loading, error, data } = useQuery(GET_USER_QUIZ_DATA, {
    variables: {
      userId,
      assignmentId,
      articleId,
    },
    fetchPolicy: "network-only",
  });
  return { loading1: loading, error1: error, data1: data };
};
