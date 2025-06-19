import { FolderAuthSTate } from "./client";

export const metadata = {
  title: "Folders | Qurious",
  description: "Manage your folders and organize your papers",
};

export default function FoldersPage() {
  return (
    // <div className="flex flex-col items-center justify-center w-full">
    // <div className="p-4 w-full">
    <FolderAuthSTate />
    // </div>
    // </div>
  );
}
