import { server } from "./server";

export default async function globalTeardown() {
  if (process.env.USE_MOCKS !== "true") {
    return;
  }

  server.close();
}
