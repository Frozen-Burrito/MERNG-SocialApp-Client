import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { FETCH_POSTS_QUERY } from '../util/graphql';

import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';

function DeleteButton ({ postId, callback }) {

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId
    },
    update(proxy) {
      setConfirmOpen(false);

      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      const newPosts = data.getPosts.filter(p => p.id !== postId);
      const newData = {...data, getPosts: newPosts};
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });

      if (callback) callback();
    }
  })
  return (
    <>
      <Popup
        content="Delete your post"
        inverted
        trigger ={
          <Button as='div' color="red" onClick={() => setConfirmOpen(true)}>
            <Icon name="times"/>
          </Button>
        }
      />
      <Confirm 
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export default DeleteButton;