import DashboardLayout from "@/layouts/dashboard/layout";

export default function DefaultDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
