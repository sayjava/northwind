import { create } from "./server";

const PORT = process.env.PORT || 8000;

const app = async () => {
  const server = await create();
  server.listen(PORT, () => {
    console.info(
      `🚀 Server ready at: http://localhost:${PORT}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-typegraphql-crud#using-the-graphql-api`
    );
  });
};

app();
