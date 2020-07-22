import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {AuthContext} from "../context/auth"
import { useForm } from "../utilities/hooks";

function Register(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});
  const initialState = {
    name:"",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.login) // This is the logged in user data
      alert(`Registered succesfully with user: ${result.data.register.username}! \nNow Log in with your new credentials!`)
      // Semantic UI Modal: https://react.semantic-ui.com/modules/modal/#types-controlled might be a good substitute
      props.history.push("/login");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
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
          <h1>Register</h1>
          <Form.Input
            label="Name"
            placeholder="Name..."
            name="name"
            type="text"
            error={errors.name ? true : false}
            value={values.name}
            onChange={onChange}
          />
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
            label="Email"
            placeholder="Email..."
            name="email"
            type="email"
            error={errors.email ? true : false}
            value={values.email}
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
          <Form.Input
            label="Confirm Password"
            placeholder="Confirm Password..."
            name="confirmPassword"
            type="password"
            error={errors.confirmPassword ? true : false}
            value={values.confirmPassword}
            onChange={onChange}
          />
          <Button type="submit" className="green">
            Register
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

const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        name: $name
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      name
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
