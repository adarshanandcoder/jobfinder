import CreatedJobs from '@/components/created-jobs';
import MyApplications from '@/components/my-applications';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';

const MyJobs = () => {

  const {user, isLoaded} = useUser();

  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color="#ef4444" />
  }

  return (
    <div>
      <h1 className='gradient-one font-extrabold text-5xl md:text-6xl text-center'>
        {user?.unsafeMetadata?.role === "candidate" ? "My Applications" : "My Created Jobs"}
      </h1>
      {user?.unsafeMetadata?.role==="candidate" ? <MyApplications /> : <CreatedJobs />}
    </div>
  )
}

export default MyJobs