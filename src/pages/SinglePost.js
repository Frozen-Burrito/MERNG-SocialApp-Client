import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import moment from 'moment';

import { AuthContext } from '../context/auth';

import { Grid, Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import Comments from '../components/Comments';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  console.log(user);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })

  function deletePostCallback() {
    props.history.push('/');
  }

  let postContent;
  if (!data) {
    postContent = <p>Loading...</p>
  } else {
    console.log(data)
    const { id, createdAt, username, body, likeCount, likes, commentCount, comments } = data.getPost;

    console.log(username, body)

    postContent = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image 
              size="small"
              float="right"
              src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr/>
              <Card.Content extra>
                <LikeButton user={user} data={{ id, likeCount, likes }}/>
                <Button as="div" labelPosition="right" onClick={() => console.log('Comment on post')}>
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback}/>
                )}
              </Card.Content>
            </Card>
            
            <Comments postId={postId} comments={comments} />
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postContent;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      createdAt
      username
      body
      likeCount
      likes {
        username
      }
      commentCount 
      comments { 
        id
        createdAt
        username
        body
      }
    }
  }
`

export default SinglePost;