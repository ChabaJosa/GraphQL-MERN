import React from "react";

export default function Card({ title, body, date }) {
  return (
    <>
      <div className="ui card">
        <div className="content">
          <div className="header"><b>Author:</b>{" "+title}</div>
          <div className="meta"><i>Created on{" "+date} with MongoDB</i></div>
          <div className="description"><b>Blog:</b>{" "+body}</div>
        </div>
      </div>
    </>
  );
}
