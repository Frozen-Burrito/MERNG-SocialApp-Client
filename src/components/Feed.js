import React, { useContext } from 'react';

import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import { AuthContext } from '../context/auth';

import { Item, Divider, Transition, Loader, Header } from 'semantic-ui-react';
import Post from './Post';
import NewPostForm from './NewPostForm';

function Feed() {

  const { user } = useContext(AuthContext);
  const { loading, data }= useQuery(FETCH_POSTS_QUERY);

  let posts;

  if (data) {
    posts = data.getPosts;
    console.log(posts);
  }

  return (
    <div className="feed right-border">
      <div className="page-title">
        <Header size="medium">Home</Header>
      </div>

      <NewPostForm/>

      <Divider/>
      
      <Item.Group divided>
        { loading ? (
          <Loader active inline="centered"/>
        ) : (
          <Transition.Group>
            { posts && 
              posts.map((post) => (
                <Post post={post} key={post.id}/>
              ))
            }
          </Transition.Group>
        )}
      </Item.Group>
    </div>
  )
}

export default Feed;

// {user && (
//   <Grid.Column>
//     <NewPostForm />
//   </Grid.Column>
// )}