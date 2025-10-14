"use client";

import { Button, TextField } from "@radix-ui/themes";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  return (
    <div className="flex flex-col max-w-xl gap-4">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE
        placeholder="Description"
        options={{
          spellChecker: false,
          placeholder: "Issue Description",
          hideIcons: [
            "quote",
            "preview",
            "side-by-side",
            "fullscreen",
            "guide",
          ],
          status: false,
        }}
      />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
