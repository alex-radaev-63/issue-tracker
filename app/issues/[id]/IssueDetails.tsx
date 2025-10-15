import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Heading, Text, Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <div className="flex flex-row gap-3 my-2 items-center">
        <IssueStatusBadge status={issue.status} />
        <Text size="2" weight="medium" color="gray" className="opacity-55">
          {issue.createdAt.toDateString()}
        </Text>
      </div>
      <Card className="prose mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
