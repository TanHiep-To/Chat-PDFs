"use client";

import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";

// import { labels, priorities, statuses } from "../data/data";
import { Document } from "@/lib/validators/document";
import { UploadStatuses } from "@/lib/config/const";
import Link from "next/link";

// const selectHeader = ({ table } :{table: any}) => (
//   <Checkbox
//     checked={
//       table.getIsAllPageRowsSelected() ||
//       (table.getIsSomePageRowsSelected() && "indeterminate")
//     }
//     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//     aria-label="Select all"
//     className="translate-y-[2px]"
//   />
// );

// const selectCell = ({ row }: {row: any}) => (
//   <Checkbox
//     checked={row.getIsSelected()}
//     onCheckedChange={(value) => row.toggleSelected(!!value)}
//     aria-label="Select row"
//     className="translate-y-[2px]"
//   />
// );

export const columns: ColumnDef<Document>[] = [
  {
    id: "select",
    // accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    // header: selectHeader,
    // cell: selectCell,
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const id = row.original.id; // Access the id directly from the original data object
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            <Link href={`/dashboard/${id}`} target="_blank">
              {row.getValue("name")}
            </Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File Type" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("type")}
        </span>
      );
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {Math.round((Number(row.getValue("size")) / 1024) * 100) / 100} KB
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Uploaded At" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {moment(row.getValue("createdAt"), "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      // const status = statuses.find(
      //   (status) => status.value === row.getValue("status")
      // );
      const status = UploadStatuses.find(
        (status) => status.value === row.getValue("status")
      );
      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[30px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
