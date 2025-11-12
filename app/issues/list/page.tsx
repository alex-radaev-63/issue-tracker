import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    order?: "asc" | "desc";
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status as Status)
    ? resolvedSearchParams.status
    : undefined;

  const orderBy = columns.some((c) => c.value === resolvedSearchParams.orderBy)
    ? resolvedSearchParams.orderBy
    : undefined;

  const order =
    resolvedSearchParams.order === "desc" ||
    resolvedSearchParams.order === "asc"
      ? resolvedSearchParams.order
      : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy ? { [orderBy]: order } : undefined,
  });

  const baseQuery: Record<string, string> = {};
  if (status) baseQuery.status = status;

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isActive = column.value === orderBy;
              let nextOrder: "desc" | "asc" | undefined;
              if (!isActive) nextOrder = "desc";
              else if (order === "desc") nextOrder = "asc";
              else if (order === "asc") nextOrder = undefined;

              const linkQuery: Record<string, string> = { ...baseQuery };
              if (nextOrder) {
                linkQuery.orderBy = column.value;
                linkQuery.order = nextOrder;
              }

              return (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{ pathname: "/issues/list", query: linkQuery }}
                  >
                    {column.label}
                  </NextLink>

                  {isActive &&
                    order &&
                    (order === "asc" ? (
                      <ArrowUpIcon className="inline ml-1 pb-0.5" />
                    ) : (
                      <ArrowDownIcon className="inline ml-1 pb-0.5" />
                    ))}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="flex min-h-[54px] gap-4 justify-between items-center">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden mt-1">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
