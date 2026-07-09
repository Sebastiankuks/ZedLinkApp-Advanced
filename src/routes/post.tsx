import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/post")();

function PostAd() {
  return (
    <div>
      <h1>Post Ad Page</h1>
      <p>Coming soon - Post ad implementation</p>
    </div>
  );
}
