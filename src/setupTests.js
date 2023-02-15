import "@testing-library/jest-dom/extend-expect";

import { client } from "./libs/apollo";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  // https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.clearStore
  return client.clearStore();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
