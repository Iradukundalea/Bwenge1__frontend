import { useQuery, gql } from "@apollo/client";

//This is used in editing the course
const GET_MOOC_COURSES = gql`
  query Get_Mooc($id: ID!) {
    getMooc(id: $id) {
      id
      chapters {
        title
        lectures {
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
        }
        id
      }
      gradingCriteria
      courseIcon
      discussionForum {
        QnAForum {
          user
          question
        }
        courseDiscussion {
          user
          question
        }
      }
      creator {
        email
        firstName
        lastName
      }
      announcement {
        title
        content
        announcementDate
      }
      title
      instructors {
        firstName
        lastName
      }
      university
      field
      department
      type
      language
      objectives
      requirements
      description
      lastUpdated
    }
  }
`;

export const useIndivMoocAll = (id) => {
  const { data, error, loading } = useQuery(GET_MOOC_COURSES, {
    variables: {
      id,
    },
  });
  return { data, error, loading };
};
