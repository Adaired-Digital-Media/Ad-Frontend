import ZohoLeadCreateForm from '@/app/shared/zoho-leads-create';
import PageHeader from '../../shared/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Add New Lead',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: '/zoho-leads/create',
      name: 'Zoho Leads',
    },
    {
      name: 'Create Lead',
    },
  ],
};
const ZohoLeadCreate = () => {
  return (
    <div>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        isDashboard
        className='px-10 pt-10'
      />
      <ZohoLeadCreateForm />
    </div>
  );
};

export default ZohoLeadCreate;
