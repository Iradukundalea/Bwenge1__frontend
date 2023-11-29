import { gql, useQuery } from "@apollo/client";

const GET_ALL_APPROVED_PROJECTS = gql`
  query GetAllProjects {
    getAllApprovedprojects {
      title
      authors
      submissionDate
      field
      abstract
      keywords
      selectedFile
      level
      likeCount
      country
      contacts
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
      id
    }
  }
`;
const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
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
      country
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

const GET_SINGLE_PAPER_FOR_ADMIN = gql`
  query GetAllProjects($getProjectId: ID) {
    getProject(id: $getProjectId) {
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
      country
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

export const useGetDiasporaProjects = () => {
  const { loading, error, data } = useQuery(GET_ALL_APPROVED_PROJECTS);
  return { loading, error, data };
};

export const useGetAdminDiasporaProjects = () => {
  const { loading, error, data } = useQuery(GET_ALL_PROJECTS);
  return { loading, error, data };
};

export const useGetSinglePaperForAdmin = (id) => {
  const { loading, error, data } = useQuery(GET_SINGLE_PAPER_FOR_ADMIN, {
    variables: {
      getProjectId: id,
    },
  });
  return { loading1: loading, error1: error, data1: data };
};
