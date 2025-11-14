import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { Flex } from "@radix-ui/themes";
import IssueChart from "./IssueChart";

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
    <Flex direction="column" gap="4">
      <IssueSummary
        open={openCount}
        inProgress={inProgressCount}
        closed={closedCount}
      />
      <LatestIssue />
      <IssueChart
        open={openCount}
        inProgress={inProgressCount}
        closed={closedCount}
      />
    </Flex>
  );
}
