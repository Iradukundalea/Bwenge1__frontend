import { gql } from "@apollo/client";

export const approve_univ_project = gql`
  mutation Mutation($approveUnivProjectId: ID) {
    approveUnivProject(id: $approveUnivProjectId) {
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
