import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center py-8  h-[500px]'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='scroll-m-20  leading-[42px] lg:leading-[65px] text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
          Effortless Task Management with Task Tracker
        </h1>
        <p className='leading-7 [&:not(:first-child)]:py-8 text-center max-w-[42rem]'>
          Stay organized, boost productivity, and collaborate seamlessly with
          Task Tracker. From project planning to daily to-dos, our intuitive
          features streamline your workflow. Experience hassle-free task
          management like never before
        </p>
        <div className='pt-8'>
          <Button className='text-center '>
            <Link href={'/sign-up'}>Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
