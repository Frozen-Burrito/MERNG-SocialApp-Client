import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../util/graphql';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

import { Grid, Form, Header, Button, Checkbox } from 'semantic-ui-react';
import AppMenu from '../components/Menu';

function Register(props) {
  const context = useContext(AuthContext);  
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: {register: registerData}}) {
      setErrors({});
      context.login(registerData);
      props.history.push('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function registerUser() {
    addUser();
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
              <Header size="huge">Register</Header>

              <Form.Input 
                type="text"
                name="username"
                label="Username"
                placeholder="Username"
                error={errors.username ? true : false }
                value={values.username}
                onChange={onChange}
              />
              <Form.Input 
                type="email"
                label="Email"
                name="email"
                placeholder="email@address.com"
                value={values.email}
                onChange={onChange}
                error={errors.email ? true : false }
              />
              <Form.Input 
                type="password"
                name="password"
                label="Password"
                placeholder=""
                value={values.password}
                onChange={onChange}
                error={errors.password ? true : false }
              />
              <Form.Input 
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder=""
                value={values.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword ? true : false }
              />

              <Form.Input>
                <Checkbox label="I agree to the Terms of service." />
              </Form.Input>

              <Button type="submit" primary>Register</Button>
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

export default Register;