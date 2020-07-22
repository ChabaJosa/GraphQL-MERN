import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {AuthContext} from "../context/auth"
import { useForm } from "../utilities/hooks";

function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    password: "",
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, initialState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result);
      context.login(result.data.login) // This is the logged in user data
      props.history.push("/");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser()
    // Why a function to call another function? The way js works, 
    // all functions with the keyword function are hoisted at the 
    // beginning of the program and this makes it work on our custom hook
  }

  return (
    <>
      <div className="register-form">
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>Login</h1>
          <Form.Input
            label="Username"
            placeholder="Username..."
            name="username"
            type="text"
            error={errors.username ? true : false}
            value={values.username}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password..."
            name="password"
            type="password"
            error={errors.password ? true : false}
            value={values.password}
            onChange={onChange}
          />
          <Button type="submit" className="green">
            Login
          </Button>
        </Form>

        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => {
                return <li key={value}>{value}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
