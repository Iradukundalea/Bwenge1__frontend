import { useQuery, gql } from "@apollo/client";

const GET_USER_COURSES = gql`
  query Get_usercourse($userId: String) {
    getUserCourses(userId: $userId) {
      title
      id
      courseIcon
      department
      field
      chapters {
        title
      }
      instructors
      objectives
      requirements
      description
    }
  }
`;

const GET_USER_COURSE_DATA = gql`
  query Get_usercoursedata($userId: String, $courseId: String) {
    getUserCourseData(userId: $userId, courseId: $courseId) {
      assignments {
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
            score
          }
          Useranswer
          score
        }
        Userscore
        startTime
        finishTime
      }
      quizes {
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
            score
          }
          Useranswer
          score
        }
        Userscore
        startTime
        finishTime
      }
      exams {
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
            score
          }
          Useranswer
          score
        }
        Userscore
        startTime
        finishTime
      }
      id
    }
  }
`;

const GET_ASSIGNMENT_RESULTS = gql`
  query Get_Mooc($userId: String, $courseId: String, $assignmentTitle: String) {
    getUserCourseAssignmentResults(userId: $userId, courseId: $courseId, AssignmentTitle: $assignmentTitle) {
      assignments {
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
        Userscore
        startTime
        finishTime
      }
    }
  }
`;
const GET_QUIZ_RESULTS = gql`
  query Get_Mooc($userId: String, $courseId: String, $assignmentTitle: String) {
    getUserCourseQuizResults(userId: $userId, courseId: $courseId, AssignmentTitle: $assignmentTitle) {
      id
      quizes {
        id
        AssignmentId
        AssignmentTitle
        UserProblemsAnswers {
          id
          problem {
            type
            questionQ
            answers
            questionFile
            correctAnswer
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
        Userscore
        startTime
        finishTime
      }
    }
  }
`;

const GET_EXAMS_RESULTS = gql`
  query Get_Mooc($userId: String, $courseId: String, $assignmentTitle: String) {
    getUserCourseExamResults(userId: $userId, courseId: $courseId, AssignmentTitle: $assignmentTitle) {
      exams {
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
        Userscore
        startTime
        finishTime
      }
    }
  }
`;

const GET_USER_CONTENT_DATA = gql`
  query Get_Mooc($userId: String, $courseId: String, $title: String) {
    getContentData(userId: $userId, courseId: $courseId, title: $title) {
      content {
        id
        Filetitle
        lastCheckPoint
        maxWatched
      }
    }
  }
`;

export const useUserCourses = (userId) => {
  let skip = true;
  if (userId) {
    skip = false;
  }
  const { data, loading, error } = useQuery(!skip ? GET_USER_COURSES : undefined, {
    variables: {
      userId,
    },
  });
  return { error1: error, loading1: loading, data1: data };
};

export const useUserCourseData = (userId, courseId) => {
  const { data, loading, error } = useQuery(GET_USER_COURSE_DATA, {
    variables: {
      userId,
      courseId,
    },
    fetchPolicy: "network-only",
  });
  return { data1: data, loading1: loading, error1: error };
};

export const useAssignmentResults = (userId, courseId, assignmentTitle) => {
  const { data, loading, error } = useQuery(GET_ASSIGNMENT_RESULTS, {
    variables: {
      userId,
      courseId,
      assignmentTitle,
    },
  });
  return { data, loading, error };
};

export const useQuizResults = (userId, courseId, assignmentTitle) => {
  const { data, loading, error } = useQuery(GET_QUIZ_RESULTS, {
    variables: {
      userId,
      courseId,
      assignmentTitle,
    },
  });
  return { data, loading, error };
};
export const useExamResults = (userId, courseId, assignmentTitle) => {
  const { data, loading, error } = useQuery(GET_EXAMS_RESULTS, {
    variables: {
      userId,
      courseId,
      assignmentTitle,
    },
  });
  return { data, loading, error };
};

export const useUserContentData = (userId, courseId, title) => {
  const { data, loading, error } = useQuery(GET_USER_CONTENT_DATA, {
    variables: {
      userId,
      courseId,
      title,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};
