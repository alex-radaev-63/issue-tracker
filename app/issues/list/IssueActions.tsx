import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import ClearAllFilters from "./ClearAllFilters";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between" align="center">
      <Flex gap="3">
        <IssueStatusFilter />
        <ClearAllFilters />
      </Flex>
      <Button>
        <Link href="/issues/new">+ New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
