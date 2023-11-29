import { gql, useQuery } from "@apollo/client";

const GET_BWENGE_USER_COURSES = gql`
  query GetAllLongCourses($userId: String) {
    getBWENGEUserCourses(userId: $userId) {
      id
      title
      instructors
      field
      department
      courseIcon
    }
  }
`;

export const useBwengeUserCourses = (id) => {
  const { loading, data, error } = useQuery(GET_BWENGE_USER_COURSES, {
    variables: {
      userId: id,
    },
  });
  return { loading1: loading, data1: data, error1: error };
};
