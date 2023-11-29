import { gql, useQuery } from "@apollo/client";

const GET_ALL_FOLLOWERS = gql`
  query Query($getAllFollowersId: String) {
    getAllFollowers(id: $getAllFollowersId) {
      follower {
        userId
        firstName
        lastName
      }
      followee {
        userId
        firstName
        lastName
      }
    }
  }
`;

const GET_ALL_FOLLOWEES = gql`
  query Query($getAllFolloweesId: String) {
    getAllFollowees(id: $getAllFolloweesId) {
      follower {
        userId
        firstName
        lastName
      }
      followee {
        userId
        firstName
        lastName
      }
    }
  }
`;
const GET_USER_NAMES = gql`
  query Query($getUserInfoId: ID) {
    getUserInfo(id: $getUserInfoId) {
      firstName
      lastName
      profilePicture
    }
  }
`;

export const useUserFollows = gql`
  mutation Mutation($followerFolloweeInput: FollowerFolloweeInput) {
    followed(followerFolloweeInput: $followerFolloweeInput) {
      follower {
        userId
        firstName
        lastName
      }
    }
  }
`;
export const useUserUnFollows = gql`
  mutation Mutation($followerFolloweeInput: FollowerFolloweeInput) {
    unfollowed(followerFolloweeInput: $followerFolloweeInput) {
      follower {
        userId
        firstName
        lastName
      }
      followee {
        userId
        firstName
        lastName
      }
    }
  }
`;

export const useGetAllFollowers = (getAllFollowersId) => {
  const { data, loading, error } = useQuery(GET_ALL_FOLLOWERS, {
    variables: {
      getAllFollowersId,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};
export const useGetAllFollowees = (getAllFolloweesId) => {
  const { data, loading, error } = useQuery(GET_ALL_FOLLOWEES, {
    variables: {
      getAllFolloweesId,
    },
    fetchPolicy: "network-only",
  });
  return { data1: data, loading1: loading, error1: error };
};

export const useGetUserNames = (getUserInfoId) => {
  const { data, loading, error } = useQuery(GET_USER_NAMES, {
    variables: {
      getUserInfoId,
    },
    fetchPolicy: "network-only",
  });
  return { data2: data, loading2: loading, error2: error };
};
