import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../util/graphql';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

import { Grid, Form, Button, Header } from 'semantic-ui-react';
import AppMenu from '../components/Menu';

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(login, {
    username: '',
    password: '',
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: loginData }}) {
      setErrors({});
      context.login(loginData);
      props.history.push('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function login() {
    loginUser();
  }

  return (
    <>
      <Grid>
        <Grid.Column width={4}>
          <AppMenu />
        </Grid.Column>
        <Grid.Column width={12}>
          <div className="center">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading wide" : "wide"}>
              <Header size="huge">Login</Header>

              <Form.Input 
                type="text"
                name="username"
                label="Username"
                placeholder="Username"
                value={values.username}
                onChange={onChange}
                error={errors.username ? true : false }
              />
              <Form.Input 
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                value={values.password}
                onChange={onChange}
                error={errors.password ? true : false }
              />

              <Button type="submit" primary>Sign In</Button>
            </Form>

            {Object.keys(errors).length > 0 && (
              <div className="ui error message">
                <ul className="list">
                  {Object.values(errors).map(value => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Login;
