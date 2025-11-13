import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

interface SearchParams {
  status?: Status;
  orderBy?: keyof Issue;
  order?: "asc" | "desc";
  page?: string;
}

interface Props {
  issues: Issue[];
  searchParams: SearchParams;
}

const IssuesTable = ({ issues, searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const { orderBy, order, status } = searchParams;

  const baseQuery: Record<string, string> = {};
  if (status) baseQuery.status = status;

  return (
    <Table.Root variant="surface" mb="8">
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
                <NextLink href={{ pathname: "/issues/list", query: linkQuery }}>
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
  );
};

export default IssuesTable;
