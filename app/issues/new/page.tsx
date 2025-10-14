"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";

import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useMemo, useState } from "react";
import axios from "axios";
import { Options } from "easymde";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
