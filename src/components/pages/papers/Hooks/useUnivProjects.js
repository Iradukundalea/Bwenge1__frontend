import { gql, useQuery } from "@apollo/client";

const GET_ALL_APPROVED_UNIV_PROJECTS = gql`
  query GetAllProjects {
    getAllApprovedUnivprojects {
      id
      title
      authors
      submissionDate
      field
      abstract
      keywords
      selectedFile
      level
      likeCount
      contacts
      university
      onApproved
      comments {
        id
        message
        parentId
        creator {
          email
          userName
          firstName
          lastName
          creatorId
        }
        createdAt
        depth
        likes
      }
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
    }
  }
`;

const GET_ALL_UNIV_PROJECTS = gql`
  query GetAllProjects {
    getAllUnivProjects {
      id
      title
      authors
      submissionDate
      field
      abstract
      keywords
      selectedFile
      level
      likeCount
      contacts
      university
      onApproved
      comments {
        id
        message
        parentId
        creator {
          email
          userName
          firstName
          lastName
          creatorId
        }
        createdAt
        depth
        likes
      }
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
    }
  }
`;

const GET_SINGLE_UNIV_PROJECT = gql`
  query GetAllProjects($getUnivProjectId: ID) {
    getUnivProject(id: $getUnivProjectId) {
      id
      title
      authors
      submissionDate
      field
      abstract
      keywords
      selectedFile
      level
      likeCount
      contacts
      university
      onApproved
      comments {
        id
        message
        parentId
        creator {
          email
          userName
          firstName
          lastName
          creatorId
        }
        createdAt
        depth
        likes
      }
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
    }
  }
`;

export const useGetUnivProjects = () => {
  const { loading, error, data } = useQuery(GET_ALL_APPROVED_UNIV_PROJECTS);
  return { loading, error, data };
};

export const useGetAdminUnivProjects = () => {
  const { loading, error, data } = useQuery(GET_ALL_UNIV_PROJECTS);
  return { loading, error, data };
};

export const useGetSingleUnivProject = (id) => {
  const { loading, error, data } = useQuery(GET_SINGLE_UNIV_PROJECT, {
    variables: {
      getUnivProjectId: id,
    },
  });
  return { loading1: loading, error1: error, data1: data };
};
