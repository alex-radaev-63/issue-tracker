"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";

import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useMemo, useState } from "react";
import axios from "axios";
import { Options } from "easymde";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const options = useMemo<Options>(
    () => ({
      spellChecker: false,
      placeholder: "Issue Description",
      hideIcons: ["quote", "preview", "side-by-side", "fullscreen", "guide"],
      status: false,
    }),
    []
  );

  return (
    <div className="flex flex-col max-w-xl gap-4">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Unexpected error occured.");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>

        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SimpleMDE
              placeholder="Description"
              value={value}
              onChange={onChange}
              options={options}
            />
          )}
        />

        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
