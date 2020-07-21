import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

function Home() {
  const {
    loading,
    data,
  } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    console.log(data);
  }

  return <div>Hello from HomeJS</div>;
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
    }
  }
`;

export default Home;
