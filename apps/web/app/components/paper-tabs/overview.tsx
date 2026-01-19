import { useGetPaperSnapshotQuery } from "@/queries";
import { Paper } from "@workspace/semantic-scholar/src";
import { Separator } from "@workspace/design-system/components/separator";
import { Skeleton } from "@workspace/design-system/components/skeleton";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/design-system/components/table";
import { AlertCircle } from "@workspace/design-system/icons";

export const TableSnapshot = (props: { data: any }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(props.data).map(([key, value]) => {
          const label = key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <TableRow key={key}>
              <TableCell className="font-medium">{label}</TableCell>
              <TableCell>
                {value ? (
                  <div className="text-wrap">{value as string}</div>
                ) : (
                  <div className="text-destructive border rounded-md bg-card w-fit px-2 flex items-center gap-1">
                    <AlertCircle className="size-4" /> Couldn't Extract
                  </div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const PaperSnapShot = (props: { paper: Paper }) => {
  const { data, isPending, error } = useGetPaperSnapshotQuery({
    abstract: props.paper.abstract,
    fields: [
      "Methods",
      "Population",
      "Sample size",
      "Duration",
      "Location",
      "Outcomes",
      "Results",
    ],
    enabled: true,
  });

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <TableSnapshot data={data} />
    </div>
  );
};

export const OverviewTabContent = (props: { paper: Paper }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg">Abstract</div>
        <div className="text-base text-sm">{props.paper.abstract}</div>
      </div>
      <Separator className="max-w-1/4 self-center" />
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg">Snapshot</div>
        <PaperSnapShot paper={props.paper} />
      </div>
    </div>
  );
};
