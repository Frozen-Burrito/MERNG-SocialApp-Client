import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id 
    body 
    createdAt 
    username 
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id username createdAt body
    }
  }
}
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id username
      }
      likeCount
    }
  }
`;

export const ADD_COMMENT_MUTATION = gql`
  mutation addComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id 
        createdAt 
        username 
        body
      }
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
        createdAt
        username
        body
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login (
    $username: String!
    $password: String!
  ) {
    login (
      username: $username password: $password
    ) {
      id email username createdAt token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register (
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register (
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id email username createdAt token
    }
  }
`;