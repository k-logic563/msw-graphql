import React from "react";

import { Post } from "../types";

type Props = {
  posts: Post[] | undefined;
};

export const List = ({ posts }: Props) => {
  return posts ? (
    <ul>
      {posts.map((post, index) => (
        <li data-testid={`todo-${index}`} key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  ) : (
    <p>No Todo</p>
  );
};

export default List;
