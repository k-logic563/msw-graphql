import { FormEvent, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { Form } from "../components/Form";
import List from "../components/List";
import { Post } from "../types";

const FETCH_ALL_POST = gql`
  query GetPost {
    posts {
      id
      title
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      id
      title
    }
  }
`;

export const Todo = () => {
  const [title, setTitle] = useState("");
  const { loading, error, data } = useQuery<{ posts: Post[] }>(FETCH_ALL_POST);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: FETCH_ALL_POST }],
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;
    createPost({
      variables: { data: { id: uuidv4(), title } },
    });
    setTitle("");
  };

  return (
    <>
      <Form handleSubmit={handleSubmit} setTitle={setTitle} title={title} />
      <List posts={data?.posts} />
    </>
  );
};
