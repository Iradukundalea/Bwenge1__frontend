import { useQuery, gql } from "@apollo/client";

const GET_ALL_COMMUNITIES = gql`
  query ExampleQuery {
    getAllCommunities {
      id
      name
      date_created
      field
      department
      description
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
      membersCount
      onApproved
      type
    }
  }
`;

const GET_SINGLE_COMMUNITY = gql`
  query ExampleQuery($getSingleCommunityId: ID) {
    getSingleCommunity(id: $getSingleCommunityId) {
      id
      name
      date_created
      profile_picture
      type
      field
      department
      description
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
      membersCount
      onApproved
    }
  }
`;

const GET_ALL_APPROVED_COMMUNITIES = gql`
  query GetAllApprovedCommunities {
    getAllApprovedCommunities {
      id
      name
      date_created
      profile_picture
      type
      field
      department
      description
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
      membersCount
      onApproved
      communityAdmins {
        email
        userName
        firstName
        lastName
        creatorId
      }
    }
  }
`;

const GET_COMMUNITY_USERS = gql`
  query GetCommunityMembers($getCommunityMembersId: ID) {
    getCommunityMembers(id: $getCommunityMembersId) {
      id
      firstName
      lastName
      phoneNumber
      gender
      birthDate
      email
      profilePicture
    }
  }
`;

const GET_COMMUNITY_QAS = gql`
  query GetCommunityArticles($getCommunityQAsId: ID) {
    getCommunityQAs(id: $getCommunityQAsId) {
      title
      questionridea
      field
      tags
      department
      comments {
        id
      }
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
      viewers {
        viewer
        dateviewed
      }
      likes {
        liker
        dateliked
      }
      dateOfSubmission
      id
    }
  }
`;

const GET_SINGLE_COMMUNITY_QAS = gql`
  query GetCommunityArticles($getSingleCommunityQAsId: ID) {
    getSingleCommunityQAs(id: $getSingleCommunityQAsId) {
      title
      id
      questionridea
      field
      department
      tags
      onApproved
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
      viewers {
        viewer
        dateviewed
      }
      likes {
        liker
        dateliked
      }
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
      dateOfSubmission
    }
  }
`;

const GET_USER_COMMUNITIES = gql`
  query Query($userId: String) {
    getUserCommunities(userId: $userId) {
      communities {
        communityId
      }
    }
  }
`;

const GET_ALL_COMMUNITY_CONTESTS = gql`
  query GetAllCommunityDailyContests($communityId: ID) {
    getAllCommunityDailyContests(communityId: $communityId) {
      id
      title
      dateCreated
      communityConnected
      description
      onApproved
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
      lettreContests {
        id
        lettre
        shuffledText
        lettreContestDescription
        contestDate
      }
    }
  }
`;
const GET_APPROVED_COMMUNITY_CONTESTS = gql`
  query GetAllCommunityDailyContests($communityId: ID) {
    getApprovedCommunityDailyContests(communityId: $communityId) {
      id
      title
      dateCreated
      communityConnected
      onApproved
      description
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
      lettreContests {
        id
        lettre
        shuffledText
        lettreContestDescription
        contestDate
      }
    }
  }
`;
const GET_SINGLE_CONTEST_FOR_ADMIN = gql`
  query GetAllCommunityDailyContests($getSingleCommunityDailyContestId: ID) {
    getSingleCommunityDailyContest(id: $getSingleCommunityDailyContestId) {
      id
      communityConnected
      creator {
        email
        userName
        firstName
        lastName
        creatorId
      }
      dateCreated
      description
      lettreContests {
        id
        lettre
        shuffledText
        lettreContestDescription
        contestDate
      }
      onApproved
      title
    }
  }
`;

const GET_SINGLE_CONTEST_SINGLE_DAY = gql`
  query GetAllCommunityDailyContests($lettreContestId: ID) {
    getSingleCommunityDailyContestSingleDay(lettreContestId: $lettreContestId) {
      title
      lettreContests {
        id
        lettre
        shuffledText
        lettreContestDescription
        contestDate
      }
      id
    }
  }
`;

export const approve_contest = gql`
  mutation ApproveContest($contestId: String) {
    approveContest(contestId: $contestId) {
      id
      title
      dateCreated
      communityConnected
      onApproved
      description
    }
  }
`;

const GET_ALL_USERS_CONTEST_DATA = gql`
  query GetAllusersDailyContest($getAllusersDailyContestContestId2: String) {
    getAllusersDailyContest(contestId: $getAllusersDailyContestContestId2) {
      userId
      lettrecontestPackage {
        id
        lettreContestId
        secondsTaken
        attempts
        score
        timeStamp
      }
      id
      contestId
      participant {
        profilePicture
        id
        firstName
        lastName
        gender
      }
    }
  }
`;
export const approve_community = gql`
  mutation Mutation($approveCommunityId: ID, $userId: String, $userName: String) {
    approveCommunity(id: $approveCommunityId, userId: $userId, userName: $userName) {
      name
      date_created
      id
      profile_picture
      type
      field
      department
    }
  }
`;

export const JOIN_LEAVE_COMMUNITY = gql`
  mutation Mutation($joinLeaveCommunityId: ID, $userId: String, $userName: String) {
    joinLeaveCommunity(id: $joinLeaveCommunityId, userId: $userId, userName: $userName) {
      firstName
      lastName
    }
  }
`;

export const VIEW_COMMUNITY_QA = gql`
  mutation Mutation($viewQAsId: ID, $userId: String) {
    viewQAs(id: $viewQAsId, userId: $userId) {
      title
      questionridea
      department
      field
      id
    }
  }
`;

export const LIKE_COMMUNITY_QA = gql`
  mutation Mutation($likeQAsId: ID, $userId: String) {
    likeQAs(id: $likeQAsId, userId: $userId) {
      title
      id
      questionridea
    }
  }
`;
export const COMMENT_COMMUNITY_QA = gql`
  mutation Mutation($commentQasId: ID, $creator: creatorSchemaInput, $parentId: String, $message: String) {
    commentQas(id: $commentQasId, creator: $creator, parentId: $parentId, message: $message) {
      title
      id
      questionridea
      field
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
    }
  }
`;

export const useAllCommunities = () => {
  const { data, loading, error } = useQuery(GET_ALL_COMMUNITIES);
  return { data, loading, error };
};

export const useSingleCommunity = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_COMMUNITY, {
    variables: {
      getSingleCommunityId: id,
    },
  });
  return { data, loading, error };
};

export const useApprovedCommunities = () => {
  const { data, loading, error } = useQuery(GET_ALL_APPROVED_COMMUNITIES);
  return { data, loading, error };
};

export const useGetCommunityMembers = (id) => {
  const { data, loading, error } = useQuery(GET_COMMUNITY_USERS, {
    variables: {
      getCommunityMembersId: id,
    },
  });
  return { data, loading, error };
};

export const useGetUserCommunities = (id) => {
  const { data, loading, error } = useQuery(GET_USER_COMMUNITIES, {
    variables: {
      userId: id,
    },
  });
  return { data1: data, loading1: loading, error1: error };
};

export const useGetCommunityQAs = (id) => {
  const { data, loading, error } = useQuery(GET_COMMUNITY_QAS, {
    variables: {
      getCommunityQAsId: id,
    },
  });
  return { data, loading, error };
};

export const useGetSingleCommunityQAs = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_COMMUNITY_QAS, {
    variables: {
      getSingleCommunityQAsId: id,
    },
  });
  return { data, loading, error };
};

export const useGetAllCommunityContests = (communityId) => {
  const { data, loading, error } = useQuery(GET_ALL_COMMUNITY_CONTESTS, {
    variables: {
      communityId: communityId,
    },
  });
  return { data, loading, error };
};
export const useGetApprovedCommunityContests = (communityId) => {
  const { data, loading, error } = useQuery(GET_APPROVED_COMMUNITY_CONTESTS, {
    variables: {
      communityId: communityId,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};

export const useGetSingleCommunityContestForAdmin = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_CONTEST_FOR_ADMIN, {
    variables: {
      getSingleCommunityDailyContestId: id,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};

export const useGetSingleDayContest = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_CONTEST_SINGLE_DAY, {
    variables: {
      lettreContestId: id,
    },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};

export const useGetAllusersDailyContestData = (contestId) => {
  const { data, loading, error } = useQuery(GET_ALL_USERS_CONTEST_DATA, {
    variables: {
      getAllusersDailyContestContestId2: contestId,
    },
    fetchPolicy: "network-only",
  });
  return { data1: data, loading1: loading, error1: error };
};
