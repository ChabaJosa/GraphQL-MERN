import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import Posts from "../components/Posts";

function Home() {
  const { user } = useContext(AuthContext);
  
  const { data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    console.log("Here2", data, data.getPosts);
  }

  const homeComponent = user ? (
    <>
      <h1>Hey you're logged in!</h1>
      <div className="posts-div">
        <Posts posts={ data ? data.getPosts : null} />
      </div>
    </>
  ) : (
    <>
      <h1>Hey! You're not logged in yet!</h1>
      <h4>If you're a new user click on register.</h4>
    </>
  );

  return homeComponent;
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
