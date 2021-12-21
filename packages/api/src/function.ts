import * as functions from "firebase-functions";
import { create } from "./server";

export const graphql = functions.https.onRequest(async (request, response) => {
  const server = await create();
  return server(request, response);
});
