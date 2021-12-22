import "reflect-metadata";

import { graphqlHTTP } from "express-graphql";
import express from "express";
import cors from "cors";
import * as tq from "type-graphql";

import { context } from "./context";
import { resolvers } from "../prisma/generated/type-graphql";

export const create = async (): Promise<express.Express> => {
  const schema = await tq.buildSchema({ resolvers });
  const server = express();

  server.use(cors({ origin: true }));

  return server.use(
    graphqlHTTP({
      schema,
      context,
      graphiql: true,
    })
  );
};
