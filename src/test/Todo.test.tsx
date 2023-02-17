import { ApolloProvider } from "@apollo/client";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import { Todo } from "../features/todo";
import { client } from "../libs/apollo";

describe("Todo", () => {
  it("should render todo to create todo", async () => {
    render(
      <ApolloProvider client={client}>
        <Todo />
      </ApolloProvider>
    );

    // フォーム出現まで待つ
    await waitFor(() => {
      screen.getByTestId("form");
    });

    fireEvent.change(screen.getByLabelText(/todo/i), {
      target: { value: "Do Something" },
    });
    fireEvent.click(screen.getByText(/登録/i));

    const todo = await screen.findByTestId("todo-0");

    expect(todo).toHaveTextContent("Do Something");
  });
});
