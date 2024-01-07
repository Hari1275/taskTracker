import { Sidebar } from '../_components/SideBar';

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='pt-20 md:pt-24 px-4 max-w-8xl 2xl:max-w-screen-xl mx-auto'>
      <div className='flex gap-x-7'>
        <div className='w-64 shrink-0 hidden md:block shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md'>
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
