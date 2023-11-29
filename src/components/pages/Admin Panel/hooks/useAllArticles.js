import { useQuery, gql } from "@apollo/client";

const GET_ALL_APPROVED_ARTICLES = gql`
  query Query {
    getAllApprovedArticles {
      title
      id
      article
      department
      field
      tags
      polls {
        id
        topic
        options
      }

      bwenge_score
      onApproved
      communityConnected
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

const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    getAllArticles {
      id
      title
      field
      department
      tags
      polls {
        id
        topic
        options
      }
      article
      onApproved
      bwenge_score
      dateOfSubmission
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
    }
  }
`;
const GET_SINGLE_ARTICLE = gql`
  query GetAllArticles($getSingleArticleId: ID) {
    getSingleArticle(id: $getSingleArticleId) {
      id
      title
      field
      department
      tags
      article
      polls {
        id
        topic
        options
      }
      postArticleQuiz {
        title
        problems {
          problemInstruction
          problemFile
          questions {
            type
            questionQ
            questionInstruction
            answers
            correctAnswer
            questionFile
            score
          }
        }
        maximumScore
        estimatedDuration
        instructions
        id
      }
      bwenge_score
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
    }
  }
`;

const GET_COMMUNITY_ARTICLES = gql`
  query GetCommunityArticles($communityId: String) {
    getCommunityArticles(communityId: $communityId) {
      title
      id
      dateOfSubmission
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
      }
      creator {
        creatorId
        firstName
        lastName
      }
    }
  }
`;

export const Judge_Article = gql`
  mutation Mutation($judgeArticleId: ID, $marks: Int) {
    judgeArticle(id: $judgeArticleId, marks: $marks) {
      id
      title
    }
  }
`;

export const EDIT_ARTICLE = gql`
  mutation Mutation($editArticleId: ID, $articleStuff: String) {
    editArticle(id: $editArticleId, articleStuff: $articleStuff) {
      title
      id
    }
  }
`;
const GET_WRITER_ARTICLES = gql`
  query Query($email: String) {
    getWriterArticles(email: $email) {
      title
      dateOfSubmission
      viewers {
        viewer
        dateviewed
      }
      likes {
        liker
        dateliked
      }
      comments {
        message
      }
    }
  }
`;
export const approve_article = gql`
  mutation Mutation($approveArticleId: ID) {
    approveArticle(id: $approveArticleId) {
      id
      title
      field
      department
      tags
      article
      onApproved
      creator {
        email
        userName
        firstName
        lastName
        creatorId
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

export const useLikeArticle = gql`
  mutation ViewArticle($likeArticleId: ID, $userId: String) {
    likeArticle(id: $likeArticleId, userId: $userId) {
      title
      article
    }
  }
`;

export const useCommentArticle = gql`
  mutation Mutation($commentArticleId: ID, $creator: creatorSchemaInput, $parentId: String, $message: String) {
    commentArticle(id: $commentArticleId, creator: $creator, parentId: $parentId, message: $message) {
      title
      article
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
      id
    }
  }
`;

export const userPoll = gql`
  mutation Mutation($userpoll: PollUserInput) {
    userPoll(userpoll: $userpoll) {
      option
      pollId
      userId
    }
  }
`;

export const useViewArticle = gql`
  mutation ViewArticle($viewArticleId: ID, $userId: String) {
    viewArticle(id: $viewArticleId, userId: $userId) {
      title
      article
      field
      department
      tags
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
      dateOfSubmission
    }
  }
`;

export const useAllArticles = () => {
  const { data, loading, error } = useQuery(GET_ALL_ARTICLES, {
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};

export const useSingleArticle = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_ARTICLE, {
    variables: { getSingleArticleId: id },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};

export const useGetAllApprovedArticles = () => {
  const { data, loading, error } = useQuery(GET_ALL_APPROVED_ARTICLES, {
    fetchPolicy: "network-only",
  });
  return { data1: data, loading1: loading, error1: error };
};

export const useGetAllWritersArticles = (email) => {
  const { data, loading, error } = useQuery(GET_WRITER_ARTICLES, {
    variables: {
      email,
    },
  });
  return { data3: data, loading3: loading, error3: error };
};

export const useGetCommunityArticles = (communityId) => {
  const { data, loading, error } = useQuery(GET_COMMUNITY_ARTICLES, {
    variables: { communityId },
    fetchPolicy: "network-only",
  });
  return { data, loading, error };
};
