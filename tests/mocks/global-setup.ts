import { server } from "./server";

export default async function globalSetup() {
  if (process.env.USE_MOCKS !== "true") {
    return;
  }

  server.listen({ onUnhandledRequest: "bypass" });
}
