import { FormEvent, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { Form } from "../components/Form";
import List from "../components/List";
import { TodoProps } from "../types";

const FETCH_ALL_TODO = gql`
  query GetTodo {
    todos {
      id
      title
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($data: TodoInput!) {
    createTodo(data: $data) {
      id
      title
    }
  }
`;

export const Todo = () => {
  const [title, setTitle] = useState("");
  const { loading, error, data } = useQuery<{ todos: TodoProps[] }>(FETCH_ALL_TODO);
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: FETCH_ALL_TODO }],
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;
    createTodo({
      variables: { data: { id: uuidv4(), title } },
    });
    setTitle("");
  };

  return (
    <>
      <Form handleSubmit={handleSubmit} setTitle={setTitle} title={title} />
      <List todos={data?.todos} />
    </>
  );
};
