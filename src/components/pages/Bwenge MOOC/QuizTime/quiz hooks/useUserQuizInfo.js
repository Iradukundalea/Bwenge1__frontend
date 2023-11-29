import { useQuery, gql } from "@apollo/client";

const GET_USER_QUIZ_INFO = gql`
  query Get_Mooc($userId: String, $courseId: String, $assignmentId: String) {
    getUserQuizData(userId: $userId, courseId: $courseId, AssignmentId: $assignmentId) {
      id
      userId
      courseId
      AssignmentId
      QuizDuration
      StartTime
      assignment {
        id
        AssignmentId
        AssignmentTitle
        UserProblemsAnswers {
          id
          problem {
            type
            questionQ
            answers
            correctAnswer
            fileRequired
            questionFile
            score
          }
          Useranswer
          score
          studentTeacherFiles {
            fileloc
            sender
            timeSent
          }
        }
      }
    }
  }
`;

export const useUserQuizData = (userId, courseId, assignmentId) => {
  const { error, data, loading } = useQuery(GET_USER_QUIZ_INFO, {
    variables: {
      userId,
      courseId,
      assignmentId,
    },
    fetchPolicy: "network-only",
  });
  return { error1: error, data1: data, loading1: loading };
};
