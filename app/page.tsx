import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { Box, Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

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

  const session = await getServerSession();

  return (
    <>
      <h1>
        Welcome {session ? session.user?.name + "!" : "to the issue tracker!"}
      </h1>

      <Grid columns={{ initial: "1", sm: "2" }} gap="5">
        <Flex direction="column" gap="5" style={{ height: "100%" }}>
          <IssueSummary {...issueCounts} />
          <Box style={{ flexGrow: 1, minHeight: 300 }}>
            <IssueChart {...issueCounts} />
          </Box>
        </Flex>
        <LatestIssue />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: "Issue tracker - Dashboard",
  description: "VIew a summary of project issues",
};
