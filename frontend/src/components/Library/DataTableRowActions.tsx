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
import { documentSchema } from "@/lib/validators/document";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { SERVER_API_URL } from "@/lib/config/const";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
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

  const document = documentSchema.parse(row.original);

  const { token } = useContext(UserContext);
  const { data, mutate: deleteDocument } = useMutation({
    mutationKey: ["deleteDocument"],
    mutationFn: async () => {
      console.log("document.id: ", document.id);
      const { data } = await axios.delete(
        `${SERVER_API_URL}/files/${document.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!data || data.success == false) {
        toast({
          variant: "error",
          title: "Error",
        });
        return;
      }
      // await table.refetch();
      // await table.options.meta.refetch();
      // router.refresh();
      window.location.reload();
      // redirect("/dashboard");
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
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteDocument()}>
          Delete
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
