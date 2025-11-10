"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawParam = searchParams.get("status") ?? undefined; // convert null → undefined

  const validStatuses = statuses
    .map((s) => s.value)
    .filter((v): v is Status => !!v);

  const currentValue = validStatuses.includes(rawParam as Status)
    ? (rawParam as Status)
    : "ALL";

  return (
    <Select.Root
      value={currentValue}
      onValueChange={(status) => {
        const query = status === "ALL" ? "" : `?status=${status}`;
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value ?? "ALL"}
            value={status.value ?? "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
