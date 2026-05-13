/**
 * Route-level config for the embedded Sanity Studio.
 * https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs
 */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

import { Studio } from "./studio";

export default function StudioPage() {
  return <Studio />;
}
