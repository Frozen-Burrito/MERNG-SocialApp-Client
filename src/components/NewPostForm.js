import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../util/graphql';

import { Form, Image, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';

function NewPostForm() {

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      const newPosts = [result.data.createPost, ...data.getPosts];
      const newData = {...data, getPosts: newPosts};
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      values.body = '';
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div className="newPost">
      <Image
        size='mini'
        rounded
        src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
      />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input 
            placeholder="What's happening?"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />

          <Button type="submit" color="teal">
            Post
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id 
      username 
      body 
      likeCount 
      likes {
        id username createdAt 
      }
      commentCount
      comments {
        id username body createdAt
      }
      createdAt 
    }
  }
`

export default NewPostForm;