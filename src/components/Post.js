import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';

import { Item, Button, Icon, Label, Popup } from 'semantic-ui-react';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function Post({ post: { id, createdAt, username, body, likeCount, commentCount, likes }}) {

  const { user } = useContext(AuthContext);

  return (
    <Item>
      <Item.Image
        size='mini'
        src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
      />
      <Item.Content>   
        <Item.Header as={Link} to={`/profile/${id}`}>{username}</Item.Header>
        <Item.Meta>{moment(createdAt).fromNow()}</Item.Meta>
        <Item.Description>
          {body}
        </Item.Description>

        <Link to={`/posts/${id}`}>View</Link>

        <Item.Extra>
          <LikeButton user={user} data={{id, likeCount, likes}}/>

          <Popup 
            content="Comment on this post" 
            inverted
            trigger={
              <Button icon as={Link} to={`/posts/${id}`}>
                <Icon name="comment outline" />
                {commentCount}
              </Button>
            }
          />

          {user && user.username === username && (
            <DeleteButton postId={id} />
          )}

        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default Post;