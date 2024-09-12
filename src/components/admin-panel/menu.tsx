"use client";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/user-context"; // Sesuaikan import dengan path yang benar
import { AccessRole, getMenuList } from "@/lib/menu-list";
import { cn } from "@/lib/utils";
import { Ellipsis, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const { user, logout, isLoading } = useUser(); // Periksa nama variabel
  const router = useRouter();
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  if (isLoading) {
    return (
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="mt-8 h-full w-full">
          <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                className={cn("w-full", index === 0 ? "pt-5" : "")}
                key={index}
              >
                <div className="w-full flex items-center space-x-2 p-2">
                  <Skeleton className="h-8 w-[50px]" />
                  <Skeleton className="h-8 w-[250px]" />
                </div>
              </li>
            ))}
            <li className="w-full grow flex items-end">
              <Skeleton className="w-full h-10 mt-5" />
            </li>
          </ul>
        </nav>
      </ScrollArea>
    );
  }

  const userRole: AccessRole = (user?.role as AccessRole) || "user";

  const filteredMenuList = menuList
    .map((group) => ({
      ...group,
      menus: group.menus
        .filter((menu) =>
          Array.isArray(menu.accessRole)
            ? menu.accessRole.includes(userRole)
            : menu.accessRole === userRole
        )
        .map((menu) => ({
          ...menu,
          submenus: menu.submenus.filter((submenu) =>
            Array.isArray(submenu.accessRole)
              ? submenu.accessRole.includes(userRole)
              : submenu.accessRole === userRole
          ),
        })),
    }))
    .filter((group) => group.menus.length > 0);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {filteredMenuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
