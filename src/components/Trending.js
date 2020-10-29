import React from 'react';

import { Header, Icon } from 'semantic-ui-react';

function Trending () {
  return (
    <>
      <div className="page-title">
        <Header size="small">Trending</Header>
      </div>
      <div className="center secondary-clr">
        <Icon name="bug" />
        <h4>Huh. This looks empty</h4>
      </div>
    </>
  );
}

export default Trending;