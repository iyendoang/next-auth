import {
  Bookmark,
  LayoutGrid,
  LucideIcon,
  Settings,
  SquarePen,
  Tag,
  Users,
  Users2Icon,
} from "lucide-react";

export type AccessRole = "superadmin" | "admin" | "user";

interface BaseMenu {
  href: string;
  label: string;
  active: boolean;
  accessRole: AccessRole[];
}

interface Submenu extends BaseMenu {}

interface Menu extends BaseMenu {
  icon: LucideIcon;
  submenus: Submenu[];
}

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// Define the function to get the menu list
export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          accessRole: ["admin", "user"],
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Data Master",
      menus: [
        {
          href: "/admin/users",
          label: "users",
          active: pathname.includes("/users"),
          icon: Users2Icon,
          accessRole: ["superadmin", "admin"],
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          accessRole: ["superadmin", "admin"],
          submenus: [
            {
              href: "/admin/posts",
              label: "All Posts",
              accessRole: ["superadmin"],
              active: pathname === "/posts",
            },
            {
              href: "/admin/posts/new",
              label: "New Post",
              accessRole: ["superadmin", "admin"],
              active: pathname === "/posts/new",
            },
          ],
        },
        {
          href: "/admin/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          accessRole: ["superadmin", "admin"],
          submenus: [],
        },
        {
          href: "/admin/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          accessRole: ["superadmin", "admin", "user"],
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admin/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          accessRole: ["superadmin"],
          submenus: [],
        },
        {
          href: "/admin/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          accessRole: ["superadmin", "admin", "user"],
          submenus: [],
        },
      ],
    },
  ];
}
