import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/upgrade")();

function Upgrade() {
  return (
    <div>
      <h1>Upgrade Page</h1>
      <p>Coming soon - Upgrade implementation</p>
    </div>
  );
}
