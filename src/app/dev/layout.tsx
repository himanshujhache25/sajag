import { notFound } from "next/navigation";

/* The gallery is a workbench, not part of the product. It is not built for
   production, so it can never ship to a judge's phone by accident. */
export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  return <>{children}</>;
}
