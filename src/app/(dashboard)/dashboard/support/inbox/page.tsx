import { Metadata } from "next";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import SupportInbox from "@/app/shared/support/inbox";
import { auth } from "@/auth";

const pageHeader = {
  title: "Support Inbox",
  breadcrumb: [
    {
      href: routes.userDashboard.dashboard,
      name: "Dashboard",
    },
    {
      href: routes.userDashboard.tickets,
      name: "Support",
    },
    {
      name: "Inbox",
    },
  ],
};

// Define props to include searchParams for query parameters
type Props = {
  searchParams: { tkt?: string };
};

// Generate metadata based on the tkt query parameter
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const id = searchParams.tkt || "Unknown";
  return metaObject(`Ticket ${id}`);
}

export default async function SupportInboxPage({ searchParams }: Props) {
  const session = await auth();

  if (!session || !searchParams.tkt) return;

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SupportInbox initialTicketId={searchParams.tkt} session={session} />
    </>
  );
}
