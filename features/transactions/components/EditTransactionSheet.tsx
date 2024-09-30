import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TransactionForm from "./TransactionForm";
import { useOpenTransaction } from "../hooks/useOpenTransaction";
import { useGetTransaction } from "../api/useGetTransaction";
import { Loader2 } from "lucide-react";
import { useEditTransaction } from "../api/useEditTransaction";
import { useDeleteTransaction } from "../api/useDeleteTransaction";
import { useConfirm } from "@/hooks/useConfirm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;

function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = transactionQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = transactionQuery.data
    ? {
        name: transactionQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetHeader>
              <SheetTitle>Edit Transaction</SheetTitle>

              <SheetDescription>Edit an existing Transaction</SheetDescription>
            </SheetHeader>

            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <TransactionForm
                id={id}
                onSubmit={onSubmit}
                disabled={isPending}
                defaultValues={defaultValues}
                onDelete={onDelete}
              />
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default EditTransactionSheet;
