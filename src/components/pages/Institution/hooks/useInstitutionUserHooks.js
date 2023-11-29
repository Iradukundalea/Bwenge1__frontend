import { gql, useQuery } from "@apollo/client";

const GET_INSTITUTION_USERS = gql`
  query Get_Institution($name: String) {
    getInstitutionStudents(name: $name) {
      firstName
      lastName
      phoneNumber
      email
      gender
      birthDate
      institution {
        studentNumber
        major
        department
        enrolledYear
      }
    }
  }
`;

const GET_INSTITUTION_INSTRUCTORS = gql`
  query Get_Instritution($name: String) {
    getInstitutionInstructors(name: $name) {
      id
      prefix
      firstName
      lastName
      phoneNumber
      gender
      birthDate
      email
      institution {
        institutionName
        institutionRole
      }
    }
  }
`;

export const useInstitutionStudents = (name) => {
  const { data, loading, error } = useQuery(GET_INSTITUTION_USERS, {
    variables: {
      name,
    },
  });
  return { data, loading, error };
};

export const useInstitutionInstructors = (name) => {
  const { data, loading, error } = useQuery(GET_INSTITUTION_INSTRUCTORS, {
    variables: {
      name,
    },
  });
  return { data, loading, error };
};
