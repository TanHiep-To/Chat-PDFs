import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { SERVER_API_URL } from "@/lib/config/const";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { userSchema } from "@/lib/validators/user";
import { useToast } from "../ui/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  table: any;
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const { toast } = useToast();
  const user = userSchema.parse(row.original);

  const { token } = useContext(UserContext);

  const { data, mutate: promoteToAdmin } = useMutation({
    mutationKey: ["promoteToAdmin"],
    mutationFn: async () => {
      const { data } = await axios.put(
        `${SERVER_API_URL}/users/${user.id}`,
        {
          role: "ADMIN",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!data || data.success == false) {
        toast({
          variant: "error",
          title: "Failed to promote user to admin",
        });
      }
      // await table.refetch();
      // await table.options.meta.refetch();
      // router.refresh();
      toast({
        variant: "success",
        title: `Promoted ${user.name} to ADMIN`,
      });
      window.location.reload();
      return data.data;
    },
  });

  const { data: deletedUser, mutate: deleteUser } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async () => {
      const { data } = await axios.delete(
        `${SERVER_API_URL}/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!data || data.success == false) {
        toast({
          variant: "error",
          title: "Failed to delete user",
        });
      }
      // await table.refetch();
      // await table.options.meta.refetch();
      // router.refresh();
      toast({
        variant: "success",
        title: `Deleted ${user.name}`,
      });
      window.location.reload();
      return data.data;
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
        <DropdownMenuItem onClick={() => promoteToAdmin()}>
          Promote to ADMIN
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteUser()}>
          Delete
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
