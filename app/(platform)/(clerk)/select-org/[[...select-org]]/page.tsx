import { OrganizationList } from '@clerk/nextjs';

function Organization() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl='/organization/:id'
      afterCreateOrganizationUrl='/organization/:id'
    />
  );
}

export default Organization;
