import { gql, useQuery } from "@apollo/client";

const GET_ALL_BWENGE_LONG_COURSES = gql`
  query GetAllLongCourses {
    getAllLongCourses {
      id
      title
      instructors
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
      lastUpdated
      price
      onApproved
      creator {
        email
        userName
        firstName
        lastName
      }
    }
  }
`;

const GET_BWENGE_COURSE_DESCRIPTION = gql`
  query GetAllLongCourses($getLongCourseId: ID) {
    getLongCourse(id: $getLongCourseId) {
      id
      title
      instructors
      courseIcon
      coursePreview
      field
      department
      language
      requirements
      description
      lastUpdated
      price
      onApproved
      creator {
        email
        userName
        firstName
        lastName
      }
      type
      objectives
      chapters {
        title
        lectures {
          title
        }
      }
    }
  }
`;

const GET_BWENGE_COURSE_FOR_LEARN = gql`
  query Query($getLongCourseId: ID) {
    getLongCourse(id: $getLongCourseId) {
      title
      instructors
      announcement {
        title
        content
        announcementDate
      }
      discussionForum {
        QnAForum {
          user
          question
        }
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
      coursePreview
      gradingCriteria
      field
      department
      type
      language
      objectives
      requirements
      description
      onApproved
      lastUpdated
      price
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
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
    }
  }
`;

const GET_ALL_LONG_COURSE_STUDENTS = gql`
  query GetUserCourseData($courseId: String) {
    getBwengeLongCourseInstructorData(courseId: $courseId) {
      userId
    }
  }
`;

const GET_ALL_APPROVED_LONGCOURSES = gql`
  query GetUserCourseData {
    getAllApprovedLongCourses {
      id
      title
      studentsCount
      instructors
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
      lastUpdated
      price
      onApproved
      creator {
        email
        userName
        firstName
        lastName
      }
    }
  }
`;

const GET_INSTRUCTOR_LONG_COURSES = gql`
  query GetInstructorLongCourses($email: String) {
    getInstructorLongCourses(email: $email) {
      id
      title
      courseIcon
      field
      instructors
      onApproved
    }
  }
`;

export const useApproveLongBwengeCourse = gql`
  mutation Mutation($approveLongCourseId: ID) {
    approveLongCourse(id: $approveLongCourseId) {
      id
      title
      instructors
      announcement {
        title
        content
        announcementDate
      }
      discussionForum {
        QnAForum {
          user
          question
        }
        courseDiscussion {
          sender
          title
          topic
          content
          dateSent
        }
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
      lastUpdated
      price
      onApproved
      creator {
        email
        userName
        firstName
        lastName
      }
    }
  }
`;

export const useAllBwengeLongCourses = () => {
  const { loading, data, error } = useQuery(GET_ALL_BWENGE_LONG_COURSES);
  return { loading, data, error };
};
export const useAllBwengeApprovedLongCourses = () => {
  const { loading, data, error } = useQuery(GET_ALL_APPROVED_LONGCOURSES);
  return { loading, data, error };
};

export const useBwengeCourseDescription = (id) => {
  const { loading, data, error } = useQuery(GET_BWENGE_COURSE_DESCRIPTION, {
    variables: {
      getLongCourseId: id,
    },
  });
  return { loading, data, error };
};
export const useBwengeCourseLearn = (id) => {
  const { loading, data, error } = useQuery(GET_BWENGE_COURSE_FOR_LEARN, {
    variables: {
      getLongCourseId: id,
    },
    fetchPolicy: "network-only",
  });
  return { loading, data, error };
};

export const useBwengeInstructorCourses = (email) => {
  const { loading, data, error } = useQuery(GET_INSTRUCTOR_LONG_COURSES, {
    variables: {
      email,
    },
  });
  return { loading, data, error };
};

export const useBwengeLongCourseStudent = (id) => {
  const { loading, error, data } = useQuery(GET_ALL_LONG_COURSE_STUDENTS, {
    variables: {
      courseId: id,
    },
  });
  return { loading2: loading, error2: error, data2: data };
};
