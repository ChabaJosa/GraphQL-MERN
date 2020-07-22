const gql = require("graphql-tag");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
      id: ID!
      email: String!
      token: String!
      name:String!
      username: String!
      createdAt: String!
  }
  input RegisterInput {
        name:String!
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation{
      register(registerInput: RegisterInput): User!
      login(username: String!, password: String!): User!
  }
`;


//Notes: on Types Definition
// ! is required and is always best practice. This only means we have to return them from our resolver.
// The user can still opt out from not getting this.
// Mutation is for Updating, Query for GET like requests
// We used the RegisterInput input as the value for the mutation