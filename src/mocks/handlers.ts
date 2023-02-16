import { factory, primaryKey } from "@mswjs/data";

const db = factory({
  post: {
    id: primaryKey(String),
    title: String,
  },
});

export const handlers = [...db.post.toHandlers("graphql")];
