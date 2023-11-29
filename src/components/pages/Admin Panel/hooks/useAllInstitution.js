import { useQuery, gql } from "@apollo/client";

const GET_ALL_INSTITUTIONS = gql`
  query Get_Institutions {
    getAllInstitutionsData {
      InstitutionName
      InstitutionEmail
      enrolledDate
    }
  }
`;
const GET_INSTITUTION_ADMINS = gql`
  query Get_Institution_admins($name: String) {
    getInstitutionAdmins(name: $name) {
      firstName
      lastName
      phoneNumber
      birthDate
      email
      gender
      institution {
        verified
      }
    }
  }
`;

export const useAllInstitutions = () => {
  const { data, loading, error } = useQuery(GET_ALL_INSTITUTIONS);
  return { data, loading, error };
};

export const useInstitutionAdmin = (name) => {
  const { data, loading, error } = useQuery(GET_INSTITUTION_ADMINS, {
    variables: { name },
  });
  return { data, loading, error };
};
