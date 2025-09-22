import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatarProps } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  };

  // onSelect={() => authClient.signOut()}
  if (isPending || !data?.user) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-white/20 backdrop-blur-md p-3 w-full flex items-center justify-between bg-white/10 hover:bg-white/15 shadow-lg shadow-black/5 transition-all duration-200 hover:shadow-xl hover:shadow-black/10 overflow-hidden">
        {data?.user?.image ? (
          <Avatar>
            <AvatarImage
              src={data?.user?.image}
              alt={
                data?.user?.name ? `${data.user.name}'s avatar` : "User avatar"
              }
            />
          </Avatar>
        ) : (
          <GeneratedAvatarProps
            seed={data?.user?.name ?? data?.user?.email ?? "User"}
            variant="initials"
            className="size-9 mr-3"
          />
        )}

        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0 ml-2">
          <p className="text-sm truncate w-full">{data?.user.name}</p>
          <p className="text-xs truncate w-full">{data?.user?.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" side="right">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data?.user?.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data?.user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onSelect={onLogout}
        >
          Logout
          <LogOutIcon className="size-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
