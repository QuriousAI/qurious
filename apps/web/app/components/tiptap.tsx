// src/Tiptap.tsx
"use client";

import { useUpdateFolderContentMutation } from "@/queries";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Id } from "@workspace/backend/convex/_generated/dataModel";
import { toast } from "@workspace/ui/src/components/sonner";
import { useRef } from "react";
import { Markdown } from "tiptap-markdown";

const Tiptap = (props: { content: string; folderId: Id<"folders"> }) => {
  const hasShownToast = useRef(false);

  const updateFolderContentMutation = useUpdateFolderContentMutation();

  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: props.content,
    onUpdate: () => {
      if (!hasShownToast.current) {
        toast.warning("You have unsaved changes.", {
          duration: Infinity,
          position: "bottom-center",
          actionButtonStyle: {
            backgroundColor: "var(--color-green-400)",
          },
          action: {
            label: "Save Changes",
            onClick: () => {
              if (editor) {
                const content = editor.getText();
                updateFolderContentMutation.mutate({
                  folderId: props.folderId,
                  content: content,
                });
                toast.success("Changes saved!");
                hasShownToast.current = false;
              }
            },
          },
        });
        hasShownToast.current = true;
      }
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
