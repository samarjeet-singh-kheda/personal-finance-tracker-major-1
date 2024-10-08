import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/useNewAccount";
import AccountForm from "./AccountForm";
import { useCreateAccount } from "../api/useCreateAccount";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

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
            <SheetTitle>New Account</SheetTitle>

            <SheetDescription>
              Create a new account to track your account.
            </SheetDescription>
          </SheetHeader>

          <AccountForm
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{ name: "" }}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NewAccountSheet;
