"use client";

import { Button } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ClearAllFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFilters = Array.from(searchParams.keys()).length > 0;

  return (
    <>
      {hasFilters && (
        <Button
          variant="soft"
          color="crimson"
          onClick={() => router.push(pathname)}
        >
          Clear all filters
        </Button>
      )}
    </>
  );
};

export default ClearAllFilters;
