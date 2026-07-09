import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")();

function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Coming soon - Profile implementation</p>
    </div>
  );
}
