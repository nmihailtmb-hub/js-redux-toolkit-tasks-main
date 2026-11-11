import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post.jsx';

const Posts = () => {
  // BEGIN (write your solution here)
  const postIds = useSelector((state) => state.postsReducer.ids);
  const postsById = useSelector((state) => state.postsReducer.entities);
  // END

  return (
    <div className="mt-3">
      {postIds.map((id) => (
        <Post key={id} post={postsById[id]} />
      ))}
    </div>
  );
};

export default Posts;