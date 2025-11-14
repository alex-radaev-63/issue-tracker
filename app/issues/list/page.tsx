import { prisma } from "@/prisma/client";
import { Status, Issue } from "@prisma/client";
import IssueActions from "./IssueActions";
import Pagination from "@/app/components/Pagination";
import IssuesTable from "./IssuesTable";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    order?: "asc" | "desc";
    page?: string;
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status as Status)
    ? resolvedSearchParams.status
    : undefined;
  const where = { status };

  const page = parseInt(resolvedSearchParams.page!) || 1;
  const pageSize = 10;

  const orderBy =
    resolvedSearchParams.orderBy &&
    ["title", "status", "createdAt"].includes(resolvedSearchParams.orderBy)
      ? resolvedSearchParams.orderBy
      : undefined;

  const order =
    resolvedSearchParams.order === "asc" ||
    resolvedSearchParams.order === "desc"
      ? resolvedSearchParams.order
      : undefined;

  const [issues, issueCount] = await Promise.all([
    prisma.issue.findMany({
      where,
      orderBy: orderBy ? { [orderBy]: order } : undefined,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.issue.count({ where }),
  ]);

  return (
    <div>
      <IssueActions />
      <IssuesTable issues={issues} searchParams={resolvedSearchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue tracker - Issues List",
  description: "View all project issues",
};

export default IssuesPage;
