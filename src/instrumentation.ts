export async function register() {
  if (process.env.USE_MOCKS !== "true") {
    return;
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { server } = await import("../tests/mocks/server");
    server.listen({ onUnhandledRequest: "bypass" });
  }
}
