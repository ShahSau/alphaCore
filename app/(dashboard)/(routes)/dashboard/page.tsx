import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";

 const DashBoardPage = () => {
  return (
    <div>
    <p className='text-6xl text-green-500'>Dashboard</p>
    <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
export default DashBoardPage;