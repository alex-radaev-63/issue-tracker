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
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!hasFilters) return null;

  return (
    <Button variant="soft" color="crimson" onClick={clearFilters}>
      Clear all filters
    </Button>
  );
};

export default ClearAllFilters;
