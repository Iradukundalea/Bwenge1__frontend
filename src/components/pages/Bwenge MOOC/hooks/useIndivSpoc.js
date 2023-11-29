import { gql, useQuery } from "@apollo/client";

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
const GET_SPOC_CONTENT = gql`
  query Getspoc($getSpocId: ID) {
    getSpoc(id: $getSpocId) {
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
const GET_SPOC_QUIZES = gql`
  query Getspoc($getSpocId: ID) {
    getSpoc(id: $getSpocId) {
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
const GET_SPOC_ASSIGNMENTS = gql`
  query Getspoc($getSpocId: ID) {
    getSpoc(id: $getSpocId) {
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
const GET_SPOC_EXAMS = gql`
  query Getspoc($getSpocId: ID) {
    getSpoc(id: $getSpocId) {
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
export const useIndivSpocContent = (getSpocId) => {
  const { error, loading, data } = useQuery(GET_SPOC_CONTENT, {
    variables: {
      getSpocId,
    },
  });
  return { error, loading, data };
};
export const useIndivSpocallquizes = (getSpocId) => {
  const { error, loading, data } = useQuery(GET_SPOC_QUIZES, {
    variables: {
      getSpocId,
    },
  });
  return { error, loading, data };
};
export const useIndivSpocallAssignments = (getSpocId) => {
  const { error, loading, data } = useQuery(GET_SPOC_ASSIGNMENTS, {
    variables: {
      getSpocId,
    },
  });
  return { error, loading, data };
};
export const useIndivSpocallExams = (getSpocId) => {
  const { error, loading, data } = useQuery(GET_SPOC_EXAMS, {
    variables: {
      getSpocId,
    },
  });
  return { error, loading, data };
};

export const useGetSpoc = (id) => {
  const { data, loading, error } = useQuery(GET_SPOC, {
    variables: {
      getSpocId: id,
    },
  });
  return { data, loading, error };
};
