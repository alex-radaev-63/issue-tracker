"use client";

import { Button } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ClearAllFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFilters = Array.from(searchParams.keys()).some(
    (key) => key !== "page"
  );

  const clearFilters = () => {
    const params = new URLSearchParams();
    const page = searchParams.get("page");
    if (page) params.set("page", page);
  };

  return (
    <>
      {hasFilters && (
        <Button variant="soft" color="crimson" onClick={clearFilters}>
          Clear all filters
        </Button>
      )}
    </>
  );
};

export default ClearAllFilters;
