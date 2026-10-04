import { notFound } from "next/navigation";
import { CONCEPT_IDS } from "@/content/learn";
import { ConceptView } from "./view";

/* A server wrapper so all twelve pages are built ahead of time and can be
   precached for offline. The page itself is the client component below. */
export function generateStaticParams() {
  return CONCEPT_IDS.map((id) => ({ id }));
}

export const dynamicParams = false;

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!(CONCEPT_IDS as readonly string[]).includes(id)) notFound();
  return <ConceptView id={id} />;
}
