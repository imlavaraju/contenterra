import React from "react";
import { BiUpvote } from "react-icons/bi";
import { RiChat3Line as LiaComments } from "react-icons/ri";

const Post = ({ post, handleClickComments }) => {
  const getPostStyle = (flairTextColor, flairBgColor) => {
    return {
      backgroundColor: flairBgColor || "transparent",
      color: flairTextColor || "inherit",
      display: "inline",
      padding: "2px 6px",
      borderRadius: "4px",
    };
  };

  const getTimeAgo = (createdUtc) => {
    const now = Math.floor(Date.now() / 1000);
    const secondsAgo = now - createdUtc;
    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minutes ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hours ago`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} days ago`;
    }
  };

  return (
    <li className="reddit-posts__item">
      <div className="reddit-posts__info">
        <p className="reddit-posts__author">
          <span
            style={getPostStyle(
              post.data.authorcolor,
              post.data.link_flair_background_color
            )}
          >
            @{post.data.author}
          </span>{" "}
          - {getTimeAgo(post.data.created_utc)}
        </p>
        <p className="reddit-posts__type">
          <span
            style={getPostStyle(
              post.data.link_flair_text_color,
              post.data.link_flair_background_color
            )}
          >
            {post.data.link_flair_text}
          </span>
        </p>
      </div>
      <div className="reddit-posts__content">
        <h2 className="reddit-posts__title">{post.data.title}</h2>
        <p className="reddit-posts__selftext">{post.data.selftext}</p>
        {post.data.url && (
          <p className="reddit-posts__url">
            <a href={post.data.url} target="_blank" rel="noopener noreferrer">
              {post.data.url}
            </a>
          </p>
        )}
        {post.data.thumbnail !== "self" && (
          <div className="reddit-posts__image-container">
            <img
              src={post.data.thumbnail}
              alt={post.data.title}
              className="reddit-posts__image"
            />
          </div>
        )}
      </div>
      <div className="reddit-posts__actions">
        <p className="reddit-posts__score">
          <span
            style={{
              display: "inline-block",
              backgroundColor: "black",
              opacity: "0.6",
              color: "white",
              padding: "7px",
              borderRadius: "3px",
              marginRight: "15px",
            }}
          >
            <BiUpvote
              style={{
                marginRight: "5px",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            />{" "}
            {post.data.score}
          </span>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "black",
              opacity: "0.6",
              color: "white",
              padding: "5px",
              borderRadius: "3px",
              marginRight: "15px",
            }}
          >
            <LiaComments
              style={{
                marginBottom: "-3px",
                marginRight: "3px",
                verticalAlign: "middle",
                opacity: "1",

                fontSize: "18px",
              }}
            />
            <button
              className="reddit-posts__comments-button"
              onClick={() => handleClickComments(post.data.permalink)}
              style={{
                color: "blue",
                opacity: "2",
                colorAdjust: "white",
              }}
            >
              {post.data.num_comments}
            </button>
          </span>
        </p>
        <a
          href={`https://www.reddit.com${post.data.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="reddit-posts__view-link"
        >
          View on Reddit
        </a>
      </div>
      <hr className="reddit-posts__separator" />
    </li>
  );
};

export default Post;
