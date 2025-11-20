import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { Box, Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });

  const issueCounts = {
    open: openCount,
    inProgress: inProgressCount,
    closed: closedCount,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5" style={{ height: "100%" }}>
        <IssueSummary {...issueCounts} />
        <Box style={{ flexGrow: 1, minHeight: 0 }}>
          <IssueChart {...issueCounts} />
        </Box>
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue tracker - Dashboard",
  description: "VIew a summary of project issues",
};
