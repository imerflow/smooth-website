import type { ExperienceStatus } from "@/data/cas-content";

export function EvidenceEmptyState({
  status,
  awaitingRedaction = false,
}: {
  status: ExperienceStatus;
  awaitingRedaction?: boolean;
}) {
  const message =
    status === "projected"
      ? "This experience is projected. Evidence will be collected after the activity takes place and is documented."
      : awaitingRedaction
        ? "Evidence is awaiting privacy checks and redaction before it can appear publicly."
        : "Evidence prepared for review. Public media will appear here after privacy checks and redaction.";

  return (
    <div className="evidence-empty">
      <span aria-hidden="true">□</span>
      <div>
        <p>{awaitingRedaction ? "Awaiting redaction" : "No public media yet"}</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
