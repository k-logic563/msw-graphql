import React from "react";

import { TodoProps } from "../types";

type Props = {
  todos: TodoProps[] | undefined;
};

export const List = ({ todos }: Props) => {
  return todos ? (
    <ul>
      {todos.map((todo, index) => (
        <li data-testid={`todo-${index}`} key={todo.id}>
          {todo.title}
        </li>
      ))}
    </ul>
  ) : (
    <p>No Todo</p>
  );
};

export default List;
