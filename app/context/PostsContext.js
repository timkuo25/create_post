'use client';

import { createContext, useState, use } from 'react';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => use(PostsContext);