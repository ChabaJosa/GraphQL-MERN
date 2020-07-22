import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import Posts from "../components/Posts";
import ControlledCarousel from "../components/Carousel";


function Home() {
  const { user } = useContext(AuthContext);
  
  const { data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    console.log( data.getPosts);
  }

  const homeComponent = user ? (
    <>
      <h1>You're logged in! Welcome!</h1>
      <h3>Now you can view our posts.</h3>

      <div className="posts-div">
        <Posts posts={ data ? data.getPosts : null} />
      </div>
    </>
  ) : (
    <>
      <h1>Welcome, you're not logged in yet!</h1>
      <h4>If you're a new user click on Register.</h4>
      <div>
        <ControlledCarousel />
      </div>
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
