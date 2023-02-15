import { ApolloProvider } from "@apollo/client";
import { render, fireEvent, screen } from "@testing-library/react";

import { client } from "../libs/apollo";
import { LoginForm } from "../LoginForm";

describe("LoginForm", () => {
  it("should allow a user to log in", async () => {
    render(
      <ApolloProvider client={client}>
        <LoginForm />
      </ApolloProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "John" },
    });
    fireEvent.click(screen.getByText(/submit/i));

    const userId = await screen.findByTestId("userId");
    const name = await screen.findByTestId("name");

    expect(userId).toHaveTextContent("088677ef-253e-4018-9080-46b23176ed8d");
    expect(name).toHaveTextContent("John");
  });
});
