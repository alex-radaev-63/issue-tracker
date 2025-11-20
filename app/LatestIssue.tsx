import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Inset, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import NextLink from "next/link";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Inset>
        <Heading size="4" mb="5" className="p-4">
          Latest Issues
        </Heading>
        <Table.Root>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between" className="px-1.5">
                    <Flex direction="column" align="start" gap="2">
                      <NextLink
                        href={`/issues/${issue.id}`}
                        className="text-base"
                      >
                        {issue.title}
                      </NextLink>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser.image!}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Inset>
    </Card>
  );
};

export default LatestIssue;
