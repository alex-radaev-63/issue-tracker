import authOptions from "@/app/auth/authOptions";
import { patcherIssueSchema } from "@/app/ValidationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const resolvedParams = await params;

  const body = await request.json();
  const validation = patcherIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const {assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({ where: { id: assignedToUserId } })
    if (!user) 
      return NextResponse.json({ error: "Invalid user"}, { status:400})
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) 
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const resolvedParams = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
