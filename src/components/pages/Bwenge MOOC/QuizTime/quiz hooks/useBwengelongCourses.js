import { gql, useQuery } from "@apollo/client";

const GET_BWENGE_COURSE_QUIZ = gql`
  query GetInstructorLongCourses($courseId: ID, $quizId: ID) {
    getQuiz(courseId: $courseId, QuizId: $quizId) {
      title
      maximumScore
      estimatedDuration
      openTime
      openTimeRange
      instructions
      problems {
        type
        questionQ
        answers
        questionFile
        fileRequired
        correctAnswer
        score
      }
      id
      checkedRules
    }
  }
`;
const GET_BWENGE_COURSE_ASSIGNMENT = gql`
  query GetInstructorLongCourses($courseId: ID, $quizId: ID) {
    getAssignment(courseId: $courseId, QuizId: $quizId) {
      title
      maximumScore
      estimatedDuration
      openTime
      openTimeRange
      instructions
      problems {
        type
        questionQ
        answers
        questionFile
        fileRequired
        correctAnswer
        score
      }
      id
      checkedRules
    }
  }
`;
const GET_BWENGE_COURSE_EXAM = gql`
  query GetSpoc($courseId: ID, $examId: ID) {
    getExam(courseId: $courseId, examId: $examId) {
      title
      problems {
        type
        questionQ
        answers
        questionFile
        fileRequired
        correctAnswer
        score
      }
      estimatedDuration
      maximumScore
      openTime
      openTimeRange
      instructions
      id
      checkedRules
    }
  }
`;

export const useBwengeCourseQuiz = (courseId, quizId) => {
  const { error, loading, data } = useQuery(GET_BWENGE_COURSE_QUIZ, {
    variables: {
      courseId,
      quizId,
    },
  });
  return { error, loading, data };
};
export const useBwengeCourseAssignment = (courseId, quizId) => {
  const { error, loading, data } = useQuery(GET_BWENGE_COURSE_ASSIGNMENT, {
    variables: {
      courseId,
      quizId,
    },
  });
  return { error, loading, data };
};
export const useBwengeCourseExam = (courseId, examId) => {
  const { error, loading, data } = useQuery(GET_BWENGE_COURSE_EXAM, {
    variables: {
      courseId,
      examId,
    },
  });
  return { error, loading, data };
};
