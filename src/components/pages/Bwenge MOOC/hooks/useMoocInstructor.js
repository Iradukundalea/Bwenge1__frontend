import { useQuery, gql } from "@apollo/client";

// const GET_MOOC_STUDENTS_ASSIGNMENTS = gql`
//   query Get_Students_Assignments($courseId: String) {
//     getInstructorData(courseId: $courseId) {
//       userId
//       enrolledDate
//       assignments {
//         id
//         AssignmentId
//         AssignmentTitle
//         UserProblemsAnswers {
//           id
//           problem {
//             type
//             questionQ
//             answers
//             correctAnswer
//             score
//           }
//           Useranswer
//         }
//         Userscore
//         dateDone
//       }
//       #   exams {
//       #     id
//       #     AssignmentId
//       #     AssignmentTitle
//       #     UserProblemsAnswers {
//       #       id
//       #       problem {
//       #         type
//       #         questionQ
//       #         answers
//       #         correctAnswer
//       #         score
//       #       }
//       #       Useranswer
//       #     }
//       #     Userscore
//       #     dateDone
//       #   }
//     }
//   }
// `;

const GET_MY_STUDENTS_DATA = gql`
  query Get_Mooc($courseId: String) {
    getAllInstructorData(courseId: $courseId) {
      id
      userId
      firstName
      lastName
      studentNumber
      email
      enrolledDate
      courseId
      assignments {
        id
        AssignmentId
        AssignmentTitle
        Userscore
        startTime
        finishTime
      }
      quizes {
        id
        AssignmentId
        AssignmentTitle
        Userscore
        startTime
        finishTime
      }
      exams {
        id
        AssignmentId
        AssignmentTitle
        Userscore
        startTime
        finishTime
      }
      content {
        id
        Filetitle
        lastCheckPoint
        maxWatched
        contentDuration
        DateViewed
      }
    }
  }
`;
const GET_INSTRUCTOR_SINGLE_ASSIGNMENT_DATA = gql`
  query Get_Mooc($courseId: String, $assignmentTitle: String) {
    getInstructorAssignmentData(courseId: $courseId, AssignmentTitle: $assignmentTitle) {
      userId
      firstName
      lastName
      studentNumber
      email
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
        Userscore
        startTime
        finishTime
      }
    }
  }
`;
const GET_INSTRUCTOR_SINGLE_QUIZ_DATA = gql`
  query Get_Mooc($courseId: String, $assignmentTitle: String) {
    getInstructorQuizData(courseId: $courseId, AssignmentTitle: $assignmentTitle) {
      userId
      firstName
      lastName
      studentNumber
      email
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
    }
  }
`;

const GET_INSTRUCTOR_SINGLE_EXAM_DATA = gql`
  query Get_Mooc($courseId: String, $assignmentTitle: String) {
    getInstructorExamData(courseId: $courseId, AssignmentTitle: $assignmentTitle) {
      userId
      firstName
      lastName
      studentNumber
      email
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

const GET_ALL_STUDENT_CONTENT_DATA = gql`
  query Get_Mooc($courseId: String) {
    getAllInstructorData(courseId: $courseId) {
      lastName
      studentNumber
      enrolledDate
      email
      firstName
      content {
        id
        Filetitle
        lastCheckPoint
        maxWatched
        contentDuration
        DateViewed
      }
    }
  }
`;

const GET_MAXIMUM_MARKS = gql`
  query GetSpoc($getMaximumMarksforInstructorId: ID) {
    getMaximumMarksforInstructor(id: $getMaximumMarksforInstructorId) {
      quizesMarks
      assignmentsMarks
      examsMarks
    }
  }
`;

export const useInstructorSingleAssignmentData = (courseId, assignmentTitle) => {
  const { data, error, loading } = useQuery(GET_INSTRUCTOR_SINGLE_ASSIGNMENT_DATA, {
    variables: {
      courseId,
      assignmentTitle,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};
export const useInstructorSingleQuizData = (courseId, assignmentTitle) => {
  const { data, error, loading } = useQuery(GET_INSTRUCTOR_SINGLE_QUIZ_DATA, {
    variables: {
      courseId,
      assignmentTitle,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};
export const useInstructorSingleExamData = (courseId, assignmentTitle) => {
  const { data, loading, error } = useQuery(GET_INSTRUCTOR_SINGLE_EXAM_DATA, {
    variables: {
      courseId,
      assignmentTitle,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};

export const useInstructorCheckStudentContent = (courseId) => {
  const { data, error, loading } = useQuery(GET_ALL_STUDENT_CONTENT_DATA, {
    variables: {
      courseId,
    },
    fetchPolicy: "network-only",
  });
  return { data1: data, loading1: loading, error1: error };
};

export const useMyStudentsData = (courseId) => {
  const { data, error, loading } = useQuery(GET_MY_STUDENTS_DATA, {
    variables: {
      courseId,
    },
  });
  return { data, loading, error };
};

export const useMaximumMarks = (id) => {
  const { data, loading, error } = useQuery(GET_MAXIMUM_MARKS, {
    variables: {
      getMaximumMarksforInstructorId: id,
    },
  });
  return { data2: data, loading2: loading, error2: error };
};
