import React from 'react';
import { UserButton, auth, currentUser } from '@clerk/nextjs';
async function page() {
  const user = await currentUser();
  const { userId } = auth();
  return (
    <div>
      page:{user?.firstName}
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}

export default page;
