import { OrganizationSwitcher, auth } from '@clerk/nextjs';

function OrganizationPage() {
  const { userId, orgId } = auth();
  return (
    <div>
      <OrganizationSwitcher hidePersonal />
    </div>
  );
}

export default OrganizationPage;
