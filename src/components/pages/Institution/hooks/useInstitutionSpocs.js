import { gql, useQuery } from "@apollo/client";

const GET_COURSE_SPOCS = gql`
  query GetAllSpocs($instructorId: String, $courseId: String) {
    getAllSpocs(InstructorId: $instructorId, courseId: $courseId) {
      id
      spocTitle
      courseIcon
      university
      endingDate
      startingDate
    }
  }
`;

const GET_SPOC = gql`
  query GetAllSpocs($getSpocId: ID) {
    getSpoc(id: $getSpocId) {
      id
      spocTitle
      courseId
      instructors {
        InstructorId
        firstName
        lastName
      }
      university
      announcement {
        title
        content
        announcementDate
      }
      courseIcon
      coursePreview
      gradingCriteria
      field
      department
      type
      language
      objectives
      requirements
      description
      chapters {
        title
        lectures {
          title
          lectureFiles {
            title
            fileLocation
            id
          }
          assignment {
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
            maximumScore
            estimatedDuration
            openTime
            openTimeRange
            instructions
            id
            checkedRules
          }
          quiz {
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
            maximumScore
            estimatedDuration
            openTime
            openTimeRange
            instructions
            id
            checkedRules
          }
          id
        }
        exam {
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
          maximumScore
          estimatedDuration
          openTime
          openTimeRange
          instructions
          id
          checkedRules
        }
        id
      }
      startingDate
      endingDate
    }
  }
`;
const GET_ALL_STUDENTS_COURSES = gql`
  query GetAllSpocs($userId: String, $institutionName: String) {
    getStudentCourses(userId: $userId, institutionName: $institutionName) {
      id
      spocTitle
      instructors {
        InstructorId
        firstName
        lastName
      }
      university
      courseIcon
      lastUpdated
      endingDate
      startingDate
    }
  }
`;

const GET_SPOC_MARKING_SETTINGS = gql`
  query GetSpoc($getSpocId: ID) {
    getSpoc(id: $getSpocId) {
      markingSettings {
        quizes
        exams
        contentView
        assignments
        discussionsParticipations
      }
    }
  }
`;

export const useGetAllCourseSpocs = (instructorId, courseId) => {
  const { data, loading, error } = useQuery(GET_COURSE_SPOCS, {
    variables: {
      instructorId,
      courseId,
    },
  });
  return { data1: data, loading1: loading, error1: error };
};

export const useGetSpoc = (id) => {
  const { data, loading, error } = useQuery(GET_SPOC, {
    variables: {
      getSpocId: id,
    },
  });
  return { data, loading, error };
};

export const useStudentsCourses = (userId, institutionName) => {
  const { data, loading, error } = useQuery(GET_ALL_STUDENTS_COURSES, {
    variables: {
      userId,
      institutionName,
    },
  });
  return { data, loading, error };
};

export const useSpocMarkingSettings = (id) => {
  const { data, loading, error } = useQuery(GET_SPOC_MARKING_SETTINGS, {
    variables: {
      getSpocId: id,
    },
  });
  return { data1: data, loading1: loading, error1: error };
};
