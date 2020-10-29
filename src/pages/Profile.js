import React, { useContext } from 'react';

import { AuthContext } from '../context/auth';

import { Grid, Container, Header, Image } from 'semantic-ui-react';
import AppMenu from '../components/Menu';

function Profile(props) {
  const userId = props.match.params.userId;
  const { user: currentUser } = useContext(AuthContext);

  if (!userId) {
    userId = currentUser.id;
  }

  return (
    <Grid>
      <Grid.Column width={4} className="padding-0">
        <AppMenu />
      </Grid.Column>
      <Grid.Column width={12} className="padding-0">
        <Image 
          className="profile-banner"
          src="https://westcoastdocs.com/wp-content/uploads/2018/06/image-placeholder-large.jpg"
        />
        <Container text>
          <div className="page-title">
            <Header size="medium">Placeholder profile</Header>
          </div>

          <p>This is the user's bio. Cras vitae libero condimentum, porta ex ac, congue lorem. Donec porta nisi massa, nec convallis ante tincidunt consectetur. Aliquam odio odio, suscipit eget pulvinar et, suscipit eget tortor. Donec vel ultricies mi, sed ornare ligula. Integer tincidunt varius ligula at varius. Nullam vel nisi placerat, pellentesque dui sed, cursus libero. Praesent hendrerit ligula ligula, vel rutrum sem semper a. Donec sit amet tempor sapien. Donec volutpat leo vitae leo iaculis pretium.</p>
        </Container>
        
      </Grid.Column>
    </Grid>
  )
}

export default Profile;