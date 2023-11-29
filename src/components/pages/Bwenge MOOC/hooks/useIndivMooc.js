import { useQuery, gql } from "@apollo/client";

const GET_MOOC_TITLE = gql`
  query Get_Mooc($id: ID!) {
    getMooc(id: $id) {
      title
      instructors {
        InstructorId
        firstName
        lastName
      }
    }
  }
`;

const GET_MOOC_COURSE_DESCRIPTION = gql`
  query Get_Mooc($id: ID!) {
    getMooc(id: $id) {
      title
      id
      courseIcon
      department
      field
      chapters {
        title
        lectures {
          title
        }
      }
      instructors
      objectives
      requirements
      description
      lastUpdated
      coursePreview
      creator {
        email
        firstName
        lastName
      }
    }
  }
`;

const GET_MOOC_COURSES = gql`
  query Get_Mooc($id: ID!) {
    getMooc(id: $id) {
      id
      title
      chapters {
        title
        lectures {
          quiz {
            id
            title
            problems {
              type
              questionQ
              answers
              correctAnswer
              fileRequired
              score
            }
            maximumScore
            estimatedDuration
            openTime
            openTimeRange
            instructions
            checkedRules
          }
          assignment {
            id
            title
            problems {
              type
              questionQ
              answers
              correctAnswer
              score
            }
            maximumScore
            estimatedDuration
            openTime
            openTimeRange
            instructions
            checkedRules
          }
          title
          id
          lectureFiles {
            title
            fileLocation
            id
          }
        }
        exam {
          id
          title
          problems {
            type
            questionQ
            answers
            correctAnswer
            fileRequired
            score
          }
          maximumScore
          estimatedDuration
          openTime
          openTimeRange
          instructions
          checkedRules
        }
        id
      }
      gradingCriteria
      courseIcon
      discussionForum {
        courseDiscussion {
          sender
          title
          topic
          content
          dateSent
          comments {
            sender
            content
            dateSent
          }
        }
      }
      creator {
        email
        userName
      }
      announcement {
        title
        content
        announcementDate
      }
    }
  }
`;

const GET_ASSIGNMENT = gql`
  query GetBWENGEUserCourses($courseId: ID, $assignmentId: ID) {
    getMoocAssignment(courseId: $courseId, assignmentId: $assignmentId) {
      title
      problems {
        type
        questionQ
        answers
        questionFile
        correctAnswer
        fileRequired
        score
      }
      maximumScore
      estimatedDuration
      openTime
      openTimeRange
      instructions
      id
      checkedRules
    }
  }
`;
const GET_QUIZ = gql`
  query GetBWENGEUserCourses($courseId: ID, $quizId: ID) {
    getMoocQuiz(courseId: $courseId, QuizId: $quizId) {
      title
      problems {
        type
        questionQ
        answers
        questionFile
        correctAnswer
        fileRequired
        score
      }
      maximumScore
      estimatedDuration
      openTime
      openTimeRange
      instructions
      id
      checkedRules
    }
  }
`;
const GET_EXAM = gql`
  query Get_Mooc($courseId: ID, $examId: ID) {
    getMoocExam(courseId: $courseId, examId: $examId) {
      title
      problems {
        questionQ
        answers
        correctAnswer
        questionFile
        fileRequired
        score
        type
      }
      maximumScore
      estimatedDuration
      openTimeRange
      openTime
      instructions
      id
      checkedRules
    }
  }
`;

const GET_ALL_ASSIGNMENTS = gql`
  query Get_Mooc($id: ID!) {
    getMooc(id: $id) {
      chapters {
        lectures {
          assignment {
            id
            title
            problems {
              type
              questionQ
              answers
              correctAnswer
              questionFile
              fileRequired
              score
            }
            maximumScore
            estimatedDuration
            openTime
            openTimeRange
            instructions
            checkedRules
          }
        }
      }
    }
  }
`;
const GET_ALL_QUIZ = gql`
  query Get_Mooc($id: ID!) {
    getMooc(id: $id) {
      chapters {
        lectures {
          quiz {
            id
            title
            problems {
              type
              questionQ
              answers
              correctAnswer
              questionFile
              fileRequired
              score
            }
            maximumScore
            estimatedDuration
            openTime
            openTimeRange
            instructions
            checkedRules
          }
        }
      }
    }
  }
`;
const GET_ALL_EXAMS = gql`
  query Get_Mooc($id: ID!) {
    getMooc(id: $id) {
      chapters {
        exam {
          id
          title
          problems {
            type
            questionQ
            answers
            correctAnswer
            fileRequired
            questionFile
            score
          }
          maximumScore
          estimatedDuration
          openTime
          openTimeRange
          instructions
          checkedRules
        }
      }
    }
  }
`;

const GET_ALL_COURSE_CONTENT = gql`
  query Get_Mooc($getMoocId: ID) {
    getMooc(id: $getMoocId) {
      chapters {
        lectures {
          title
          lectureFiles {
            title
            fileLocation
          }
        }
      }
    }
  }
`;

export const useIndivmoocTitle = (id) => {
  const { data, loading, error } = useQuery(GET_MOOC_TITLE, {
    variables: {
      id,
    },
  });
  return { data, loading, error };
};

export const useIndivMooc = (id) => {
  const { data, error, loading } = useQuery(GET_MOOC_COURSES, {
    variables: {
      id,
    },
  });
  return { data, error, loading };
};

export const useIndivMoocDesc = (id) => {
  const { data, error, loading } = useQuery(GET_MOOC_COURSE_DESCRIPTION, {
    variables: {
      id,
    },
  });
  return { data, error, loading };
};

export const useIndivMoocAssignment = (courseId, assignmentId) => {
  const { error, loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: {
      courseId,
      assignmentId,
    },
  });
  return { error, loading, data };
};

export const useIndivMoocQuiz = (courseId, quizId) => {
  const { error, loading, data } = useQuery(GET_QUIZ, {
    variables: {
      courseId,
      quizId,
    },
  });
  return { error, loading, data };
};
export const useIndivMoocExam = (courseId, examId) => {
  const { error, loading, data } = useQuery(GET_EXAM, {
    variables: {
      courseId,
      examId,
    },
  });
  return { error, loading, data };
};

export const useIndivMoocAllAssignments = (id) => {
  const { error, loading, data } = useQuery(GET_ALL_ASSIGNMENTS, {
    variables: {
      id,
    },
  });
  return { error, loading, data };
};
export const useIndivMoocAllQuizes = (id) => {
  const { error, loading, data } = useQuery(GET_ALL_QUIZ, {
    variables: {
      id,
    },
  });
  return { error, loading, data };
};

export const useIndivMoocAllExams = (id) => {
  const { error, loading, data } = useQuery(GET_ALL_EXAMS, {
    variables: {
      id,
    },
  });
  return { error, loading, data };
};

export const useIndivMoocContent = (getMoocId) => {
  const { error, loading, data } = useQuery(GET_ALL_COURSE_CONTENT, {
    variables: {
      getMoocId,
    },
  });
  return { error, loading, data };
};
