import { FolderClient } from "./client";
import { createMetadata } from "@workspace/seo/metadata";

export const metadata = createMetadata({
  title: "Folders",
  description: "Manage your folders and organize your papers",
});

export default function FoldersPage() {
  return <FolderClient />;
}
