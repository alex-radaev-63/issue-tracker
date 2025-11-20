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

  const rawParam = searchParams.get("status") ?? undefined;

  const validStatuses = statuses
    .map((s) => s.value)
    .filter((v): v is Status => !!v);

  const currentValue = validStatuses.includes(rawParam as Status)
    ? (rawParam as Status)
    : undefined;

  return (
    <Select.Root
      value={currentValue || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy")) {
          params.append("orderBy", searchParams.get("orderBy")!);
          {
            searchParams.get("order") &&
              params.append("order", searchParams.get("order")!);
          }
        }

        const query = status === "ALL" ? "" : "?" + params.toString();
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger
        placeholder="Filter by status..."
        className="selectTrigger"
      />
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
