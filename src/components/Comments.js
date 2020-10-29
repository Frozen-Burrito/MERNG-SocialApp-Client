import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import moment from 'moment';

import { Comment, Header, Card, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { ADD_COMMENT_MUTATION, DELETE_COMMENT_MUTATION } from '../util/graphql';

function Comments({postId, comments}) {

  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState('');

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    update() {
      setComment('');
    },
    variables: {
      postId,
      body: comment
    }
  })

  return (
    <Comment.Group>            
      <Header as='h3' dividing>
        {`${comments.length} Comments`}
      </Header>

      { user && (
        <Card fluid>
          <Form>
            <div className="ui action input fluid">
              <input 
                type="text"
                placeholder="Comment on this post"
                name="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />

              <button 
                type="submit" 
                className="ui button teal" 
                disabled={comment.trim() === ''}
                onClick={addComment}
              >
                Comment
              </button>
            </div>
          </Form>
        </Card>
      )}

      {comments.map(comment => (
        <Comment>
          <Comment.Avatar  src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>{comment.username}</Comment.Author>
            <Comment.Metadata>
              <div>{moment(comment.createdAt).fromNow()}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
            <Comment.Actions>
              {user && user.username === comment.username && (
                <Comment.Action>Delete</Comment.Action>
              )}
            </Comment.Actions>
          </Comment.Content>
        </Comment>
    ))}
    </Comment.Group>
  )
}

export default Comments;