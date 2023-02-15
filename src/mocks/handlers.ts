import { graphql } from "msw";

export const handlers = [
  graphql.mutation("Login", (req, res, ctx) => {
    const { username } = req.variables;

    if (username === "no-user") {
      return res(
        ctx.errors([
          {
            message: "User not found",
            extensions: {
              id: "088677ef-253e-4018-9080-46b23176ed8d",
            },
          },
        ])
      );
    }

    return res(
      ctx.data({
        user: {
          __typename: "User",
          id: "088677ef-253e-4018-9080-46b23176ed8d",
          name: username,
        },
      })
    );
  }),
];
