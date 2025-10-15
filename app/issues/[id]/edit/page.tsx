import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "./IssueFormWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const resolvedParams = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
