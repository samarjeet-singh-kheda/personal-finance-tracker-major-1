import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransaction } from "../hooks/useNewTransaction";
import TransactionForm from "./TransactionForm";
import { useCreateTransaction } from "../api/useCreateTransaction";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();

  const mutation = useCreateTransaction();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetHeader>
            <SheetTitle>New Transaction</SheetTitle>

            <SheetDescription>
              Create a new transaction to track your transaction.
            </SheetDescription>
          </SheetHeader>

          <TransactionForm
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{ name: "" }}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NewTransactionSheet;
