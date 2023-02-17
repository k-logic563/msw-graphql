import { factory, primaryKey } from "@mswjs/data";

const db = factory({
  todo: {
    id: primaryKey(String),
    title: String,
  },
});

export const handlers = [...db.todo.toHandlers("graphql")];
