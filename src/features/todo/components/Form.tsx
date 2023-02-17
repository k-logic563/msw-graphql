import React from "react";

type Props = {
  handleSubmit: (e: React.FormEvent) => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
};

export const Form = ({ handleSubmit, setTitle, title }: Props) => {
  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <label htmlFor="title">todo</label>
      <input
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">登録</button>
    </form>
  );
};
