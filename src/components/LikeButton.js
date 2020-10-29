import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { LIKE_POST_MUTATION } from '../util/graphql';

import { Button, Icon } from 'semantic-ui-react';

function LikeButton({ user, data: { id, likeCount, likes }}) {

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(false);
    } else {
      setLiked(false);
    }
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id}
  })

  return (
    <>
      {user ? (
        liked ? (
          <Button color='pink' icon onClick={likePost}>
            <Icon name='like'/>
            {likeCount}
          </Button>
        ) : (
          <Button icon onClick={likePost}>
            <Icon name='like'/>
            {likeCount}
          </Button>
        )
      ) : (
        <Button icon as={Link} to="/login">
          <Icon name='like'/>
        </Button>
      )}
    </>
  )
}

export default LikeButton;