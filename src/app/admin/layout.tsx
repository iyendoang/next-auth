import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { UserProvider } from "@/context/user-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </UserProvider>
  );
}
