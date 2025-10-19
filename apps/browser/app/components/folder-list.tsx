import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api.js";

export function FolderList() {
  // Fetch the list of folders using the Convex useQuery hook
  const folders = useQuery(api.folders.queries.getCurrentUserFolders);

  if (folders === undefined) {
    // Query is still loading
    return <div>Loading folders...</div>;
  }
  if (folders === null) {
    // Query errored or returned nothing
    return <div>No folders found.</div>;
  }

  return (
    <ul className="font-bold text-3xl">
      {folders.map((folder: any) => (
        <li key={folder._id}>{folder.name}</li>
      ))}
    </ul>
  );
}
