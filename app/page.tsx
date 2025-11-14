import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <IssueSummary
      open={openCount}
      inProgress={inProgressCount}
      closed={closedCount}
    />
  );
}
