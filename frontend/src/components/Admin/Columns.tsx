"use client";

import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar } from "../ui/avatar";
import { User2 } from "lucide-react";
import { DataTableColumnHeader } from "../Library/DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { User } from "@/lib/validators/user";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "avatar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar className="h-9 w-9">
          <div className="relative flex aspect-square h-full w-full">
            <User2 className="relative h-[50px] w-[50px]" />
          </div>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("name")}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("email")}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("role")}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {/* {row.getValue("created_at")} */}
          {moment(row.getValue("created_at")).format("MMM D, YYYY")}
        </span>
      );
    },
  },
  {
    accessorKey: "is_verified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Verified" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("is_verified") ? "Yes" : "No"}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
