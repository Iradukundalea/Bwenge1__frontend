import { useQuery, gql, useMutation } from "@apollo/client";

const GET_ALL_NSANGIZA_REQUESTS = gql`
  query Get_nsangisaz {
    getAllNsangiza {
      id
      title
      meetingTheme
      hostNames
      meetingTime
      bookings
      likes
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
      briefIntroduction
      hostIntroduction
      hostContacts
      hostLink
      attendeeLink
      email
      onApproved
    }
  }
`;

const GET_SINGLE_NSANGIZA = gql`
  query GetNsangiza($getNsangizaId: ID) {
    getNsangiza(id: $getNsangizaId) {
      title
      briefIntroduction
      meetingTime
      hostNames
      meetingTheme
      hostIntroduction
      bookings
      likes
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
      hostContacts
      email
      hostLink
      attendeeLink
      onApproved
      id
    }
  }
`;

// const Approve_Nsangiza = gql`
//   mutation Mutation($approveNsangizaId: ID) {
//     approveNsangiza(id: $approveNsangizaId) {
//       title
//       onApproved
//       briefIntroduction
//       meetingTime
//       hostNames
//       meetingTheme
//       hostIntroduction
//       hostContacts

//       email
//       id
//     }
//   }
// `;

export const bookNsangiza = gql`
  mutation BookingNsangiza($bookingNsangizaId: ID, $userId: String) {
    bookingNsangiza(id: $bookingNsangizaId, userId: $userId) {
      title
      id
      bookings
      likes
    }
  }
`;

export const updateApprove_Nsangiza = gql`
  mutation Mutation($updateApproveNsangizaId: ID, $nsangizaRequestInput: NsangizaRequestInput) {
    updateApproveNsangiza(id: $updateApproveNsangizaId, nsangizaRequestInput: $nsangizaRequestInput) {
      title
      briefIntroduction
      meetingTime
      meetingTheme
      hostNames
      hostIntroduction
      hostContacts

      email
      hostLink
      attendeeLink
      onApproved
      id
    }
  }
`;

export const useNsangizaRequests = () => {
  const { data, loading, error } = useQuery(GET_ALL_NSANGIZA_REQUESTS);
  return { data1: data, loading1: loading, error1: error };
};

export const useSingleNsangiza = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_NSANGIZA, {
    variables: { getNsangizaId: id },
  });
  return { data, loading, error };
};
