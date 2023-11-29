import { useQuery, gql } from "@apollo/client";

const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    getAllArticles {
      id
      title
      article
      onApproved
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
      article
      dateOfSubmission
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
const GET_WRITER_ARTICLES = gql`
  query GetAllArticles($email: String) {
    getWriterArticles(email: $email) {
      id
      title
      article
      onApproved
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

export const useAllArticles = () => {
  const { data, loading, error } = useQuery(GET_ALL_ARTICLES);
  return { data2: data, loading2: loading, error2: error };
};

export const useSingleArticle = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_ARTICLE, {
    variables: { getSingleArticleId: id },
  });
  return { data, loading, error };
};

export const useWiterArticles = (email) => {
  const { data, loading, error } = useQuery(GET_WRITER_ARTICLES, {
    variables: { email },
  });
  return { data2: data, loading2: loading, error2: error };
};
