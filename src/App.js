import React, { useEffect, useState, useRef } from "react";
import PostList from "./components/PostList";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const afterRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    if (!isLoading) {
      setIsLoading(true);
      fetch(
        `https://www.reddit.com/r/reactjs.json?limit=4${
          afterRef.current ? `&after=${afterRef.current}` : ""
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data && data.data.children) {
            setPosts((prevPosts) => [...prevPosts, ...data.data.children]);
            afterRef.current = data.data.after;
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  };

  const handleClickComments = (permalink) => {
    window.open(`https://www.reddit.com${permalink}`, "_blank");
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchPosts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="reddit-posts">
      <PostList posts={posts} handleClickComments={handleClickComments} />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default App;
