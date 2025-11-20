import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import ClearAllFilters from "./ClearAllFilters";

const IssueActions = () => {
  return (
    <Flex mb="5" gap="3" justify="between" align="center">
      <Flex gap="3" align="center">
        <IssueStatusFilter />
        <ClearAllFilters />
      </Flex>
      <div className="hidden sm:inline">
        <Button>
          <Link href="/issues/new">+ New Issue</Link>
        </Button>
      </div>
    </Flex>
  );
};

export default IssueActions;
