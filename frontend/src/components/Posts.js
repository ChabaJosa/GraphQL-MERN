import React from "react";

import Card from "./Card"

export default function Posts({posts}) {
    console.log(posts)
  return (
    <>
      <div className="ui cards">
          {
              posts.map(eachPost => {
                  return <Card key={eachPost.createdAt} title={eachPost.username} body={eachPost.body} date={eachPost.createdAt} /> 
              })
          }
       {/* <Card />
       <Card />
       <Card />
       <Card />
       <Card />
       <Card /> */}

      </div>
    </>
  );
}
