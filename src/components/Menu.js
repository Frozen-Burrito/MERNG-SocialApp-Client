import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Dropdown } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

function AppMenu() {

  const { user, logout } = useContext(AuthContext);

  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1);

  const [ activeItem, setActiveItem ] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuItems = user ? (
    <>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/" 
      />

      <Menu.Item
        name='bookmarks'
        active={activeItem === 'bookmarks'}
        onClick={handleItemClick}
        as={Link}
        to="/bookmarks"
      />

      <Dropdown item text='Account'>
        <Dropdown.Menu>
          <Menu.Item
            name='profile'
            as={Link}
            to={`/profile/${user.id}`}
          />

          <Menu.Item
            name='logout'
            onClick={logout}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  ) : (
    <>      
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/" 
      />
      <Menu.Item
        name='login'
        active={activeItem === 'login'}
        onClick={handleItemClick}
        as={Link}
        to="/login"
      />
      <Menu.Item
        name='register'
        active={activeItem === 'register'}
        onClick={handleItemClick}
        as={Link}
        to="/register" 
      />
    </>
  )

  return (
    <Container className="flex-vertical tall right-border">
      <Menu secondary vertical size="huge">
        {menuItems}
      </Menu>
    </Container>
  );
}

export default AppMenu;