import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Prop = {
  href: string;
  label: string;
  isActive: boolean;
};

function NavButton({ href, label, isActive }: Prop) {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full justify-between font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition ",
        isActive ? "bg-white/10 text-white" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default NavButton;

// variant="outline"
//             size="sm"
//             className="font-normal "
