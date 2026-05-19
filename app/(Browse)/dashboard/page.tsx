import Banner from '@/components/dashboard/Banner'
import React from 'react'
import Sizes from "@/components/dashboard/Sizes";
import RecentDesign from "@/components/dashboard/RecentDesign"
import Offline from '@/components/global/Offline';

const Dashboard = () => {
  return (
    <div className="flex flex-col space-y-6 p-10 mx-auto py-10" >
      <Banner/>
      <Offline/> 
      <Sizes/>
      <RecentDesign/>
    </div>
  )
}

export default Dashboard
