import React from 'react';

import { Grid, Header } from 'semantic-ui-react';
import AppMenu from '../components/Menu';

function Bookmarks() {
  return (
    <Grid>
      <Grid.Column width={4}>
        <AppMenu />
      </Grid.Column>
      <Grid.Column width={12}>
        <div className="page-title">
          <Header size="medium">Bookmarks</Header>
        </div>
      </Grid.Column>
    </Grid>
  );
}

export default Bookmarks;