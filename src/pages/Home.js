import React, { useContext } from 'react';

import { AuthContext } from '../context/auth';

import { Grid } from 'semantic-ui-react';
import AppMenu from '../components/Menu';
import Feed from '../components/Feed';
import Trending from '../components/Trending';

function Home() {
  const { user } = useContext(AuthContext);


  return (
    <Grid>
      <Grid.Column width={4}>
        <AppMenu />
      </Grid.Column>
      <Grid.Column width={8}>
        <Feed />
      </Grid.Column>
      <Grid.Column width={4}>
        <Trending />
      </Grid.Column>
    </Grid>
  )
}

export default Home;

