import LatestIssue from "./LatestIssue";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return <LatestIssue />;
}
