import { FormEvent, useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

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

type Post = {
  id: string;
  title: string;
};

const App = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { loading, error, data } = useQuery<{ posts: Post[] }>(FETCH_ALL_POST);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: FETCH_ALL_POST }],
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ref.current) return;

    createPost({
      variables: { data: { id: uuidv4(), title: ref.current.value } },
    });
    ref.current.value = "";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" ref={ref} />
        <button type="submit">登録</button>
      </form>
      <ul>
        {data?.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
