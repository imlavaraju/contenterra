import React from "react";
import Post from "./Post";

const PostList = ({ posts, handleClickComments }) => {
  return (
    <ul className="reddit-posts__list">
      {posts.map((post) => (
        <Post
          key={post.data.id}
          post={post}
          handleClickComments={handleClickComments}
        />
      ))}
    </ul>
  );
};

export default PostList;
