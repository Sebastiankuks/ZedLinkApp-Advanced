import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")();

function Admin() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Coming soon - Admin implementation</p>
    </div>
  );
}
