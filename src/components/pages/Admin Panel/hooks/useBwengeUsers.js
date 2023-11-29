import { gql, useQuery } from "@apollo/client";

const GET_ALL_USERS = gql`
  query GetAllBwengeUsers {
    getAllBwengeUsers {
      firstName
      lastName
      phoneNumber
      email
    }
  }
`;

export const useAllUsers = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  return { data, loading, error };
};
