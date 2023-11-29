import { gql, useQuery } from "@apollo/client";

const GET_ALL_BWENGE_SHORT_COURSES = gql`
  query GetAllShortCourses {
    getAllShortCourses {
      id
      title
      instructor
      field
      courseIcon
      department
      type
      description
      onApproved
      submissionDate
      creator {
        email
        userName
        firstName
        lastName
      }
    }
  }
`;

const GET_SINGLE_BWENGE_SHORT_COURSE = gql`
  query GetAllShortCourses($getSingleShortCourseId: ID) {
    getSingleShortCourse(id: $getSingleShortCourseId) {
      id
      title
      instructor
      courseIcon
      field
      department
      type
      description
      selectedFile
      onApproved
      creator {
        creatorId
        email
        userName
        firstName
        lastName
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
      viewers {
        viewer
        dateviewed
      }
      likes {
        liker
        dateliked
      }
      submissionDate
    }
  }
`;

const GET_ALL_APPROVED_COURSES = gql`
  query GetSpoc {
    getAllApprovedShortCourses {
      id
      title
      instructor
      courseIcon
      field
      department
      type
      description
      selectedFile
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
      onApproved
      creator {
        email
        firstName
        lastName
      }
      viewers {
        viewer
        dateviewed
      }
      likes {
        liker
        dateliked
      }
      submissionDate
    }
  }
`;

const GET_ALL_INSTRUCTOR_COURSES = gql`
  query GetSpoc($email: String) {
    getInstructorShortCourses(email: $email) {
      id
      title
      instructor
      courseIcon
      field
      department
      type
      description
      selectedFile
      onApproved
      creator {
        creatorId
        email
        userName
        firstName
        lastName
      }
      submissionDate
    }
  }
`;
export const useLikeShortCourse = gql`
  mutation Followed($likeShortCourseId: ID, $userId: String) {
    likeShortCourse(id: $likeShortCourseId, userId: $userId) {
      title
      instructor
      selectedFile
      field
    }
  }
`;

export const useViewShortCourse = gql`
  mutation ViewShortCourse($viewShortCourseId: ID, $userId: String) {
    viewShortCourse(id: $viewShortCourseId, userId: $userId) {
      title
      instructor
      selectedFile
      field
    }
  }
`;

export const UseapproveShortCourse = gql`
  mutation Mutation($approveShortCourseId: ID) {
    approveShortCourse(id: $approveShortCourseId) {
      id
      title
      instructor
      courseIcon
      field
      department
      type
      description
      selectedFile
      onApproved
      creator {
        creatorId
        email
        userName
        firstName
        lastName
      }
      submissionDate
    }
  }
`;

export const useUserComments = gql`
  mutation CommentCourse($creator: creatorSchemaInput, $commentCourseId: ID, $parentId: String, $message: String) {
    commentCourse(creator: $creator, id: $commentCourseId, parentId: $parentId, message: $message) {
      title
      comments {
        id
        message
        parentId
        creator {
          email
          firstName
          lastName
          creatorId
        }
        createdAt
        depth
      }
    }
  }
`;

export const useGetAllShortCourses = () => {
  const { loading, data, error } = useQuery(GET_ALL_BWENGE_SHORT_COURSES);
  return { loading1: loading, data1: data, error1: error };
};
export const useGetSinglebwengeshortcourse = (id) => {
  const { loading, data, error } = useQuery(GET_SINGLE_BWENGE_SHORT_COURSE, {
    variables: {
      getSingleShortCourseId: id,
    },
  });
  return { loading, data, error };
};

export const useGetallApprovedShortCourses = () => {
  const { loading, error, data } = useQuery(GET_ALL_APPROVED_COURSES);
  return { loading, error, data };
};

export const useGetAllInstructorShortCourses = (email) => {
  const { loading, data, error } = useQuery(GET_ALL_INSTRUCTOR_COURSES, {
    variables: {
      email,
    },
    fetchPolicy: "network-only",
  });
  return { loading1: loading, data1: data, error1: error };
};
