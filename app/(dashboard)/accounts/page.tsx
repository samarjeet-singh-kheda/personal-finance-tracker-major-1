"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";
import { Plus } from "lucide-react";
import { columns, Payment } from "./colums";
import { DataTable } from "@/components/DataTable";

const data: Payment[] = [
  {
    id: "858ed52f",
    amount: 120,
    status: "failed",
    email: "b@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "908ed52f",
    amount: 29,
    status: "processing",
    email: "a@example.com",
  },
];

function AccountsPage() {
  const newAccount = useNewAccount();

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-2xl line-clamp-1">Accounts Page</CardTitle>

          <Button onClick={newAccount.onOpen} size="sm">
            <Plus className="size-4 mr-2" /> Add new
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable
            filterKey="email"
            columns={columns}
            data={data}
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountsPage;
