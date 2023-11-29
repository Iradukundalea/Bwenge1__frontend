import { gql, useQuery } from "@apollo/client";

const GET_ALL_INSTRUCTOR_COURSES = gql`
  query Get_Mooc($name: String, $instructorId: String) {
    getInstitutionInstructorMoocs(name: $name, instructorId: $instructorId) {
      title
      id
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
      courseIcon
      gradingCriteria
      field
      department
      coursePreview
      type
      language
      objectives
      requirements
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
      description
      lastUpdated
      creator {
        email
        userName
        firstName
        lastName
      }
    }
  }
`;

const GET_COURSE_ALL_DETAILS = gql`
  query Get_Mooc($getMoocId: ID) {
    getMooc(id: $getMoocId) {
      id
      title
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
      courseIcon
      gradingCriteria
      field
      department
      coursePreview
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
            id
            checkedRules
          }
          quiz {
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
          id
          checkedRules
        }
        id
      }
      lastUpdated
      creator {
        email
        userName
        firstName
        lastName
      }
    }
  }
`;
const GET_ALL_STUDENTS_COURSES = gql`
  query GetAllSpocs($userId: String, $institutionName: String) {
    getStudentCourses(userId: $userId, institutionName: $institutionName) {
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

export const useAllInstructorCourses = (name, instructorId) => {
  const { data, loading, error } = useQuery(GET_ALL_INSTRUCTOR_COURSES, {
    variables: {
      name,
      instructorId,
    },
    fetchPolicy: "network-only",
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

export const useAllMoocData = (getMoocId) => {
  const { data, loading, error } = useQuery(GET_COURSE_ALL_DETAILS, {
    variables: {
      getMoocId,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};
