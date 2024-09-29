"use client";

import { useMountedState } from "react-use";

import NewAccountSheet from "@/features/accounts/components/NewAccountSheet";

type Props = {
  children: React.ReactNode;
};

function SheetProvider({ children }: Props) {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      {children}
      <NewAccountSheet />
    </>
  );
}

export default SheetProvider;
