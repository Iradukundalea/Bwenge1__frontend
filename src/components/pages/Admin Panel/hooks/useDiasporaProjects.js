import { gql } from "@apollo/client";
export const approve_Project = gql`
  mutation Mutation($approveProjectId: ID) {
    approveProject(id: $approveProjectId) {
      title
      authors
    }
  }
`;
