import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ads/$adId")();

function AdDetail() {
  return (
    <div>
      <h1>Ad Detail Page</h1>
      <p>Coming soon - Ad detail implementation</p>
    </div>
  );
}
