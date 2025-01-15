import { getApplications } from '@/api/apiApplications';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import ApplicationCard from './application-card';

const MyApplications = () => {

    const {user} = useUser();

    const {
        loading:loadingApplications,
        data:applications,
        fn:fnApplications,
    } = useFetch(getApplications,{
        user_id : user.id,
    });

    useEffect(() => {
        fnApplications();
    } , [])

    if(loadingApplications){
        return <BarLoader className='mb-4' width={"100%"} color="#ef4444" />
    }

  return (
    <div className='flex flex-col gap-3 mt-5'>
        {applications?.map((application)=>{
            return (
                <ApplicationCard key={application.id} application={application} isCandidate />
            )
        })}
    </div>
  )
}

export default MyApplications