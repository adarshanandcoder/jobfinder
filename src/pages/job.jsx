import { getSingleJob, updatingHiringStatus } from '@/api/apiJobs';
import ApplicationCard from '@/components/application-card';
import ApplyJobDrawer from '@/components/apply-job';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react'
import MDEditor from '@uiw/react-md-editor';
import { DoorClosed, DoorOpen, MapPin, User } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const JobPage = () => {

  const { isLoaded , user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data:job,
    fn:fnJob,
  } = useFetch(getSingleJob, {
    job_id:id,
  });

  const {
    loading:loadigHiringStatus,
    fn: fnHiringStatus
  } = useFetch(updatingHiringStatus, {
    job_id:id,
  })

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(()=>fnJob());
  }

  useEffect(()=>{
    if(isLoaded) fnJob();
  },[isLoaded])

  if(!isLoaded || loadingJob){
    return <BarLoader className='mb-4' width={"100%"} color="#ef4444" />
  }

  const jobDescription = job?.description?.split(' - ').filter(Boolean) || [];

  return (
    <div className='flex flex-col gap-8 mt-5  mx-5'>
      <div className='flex flex-col gap-6 md:flex-row justify-between items-center mt-10'>
        <img src={job?.company?.logo_url} className='h-10' alt={job?.title} />
        <h1 className='gradient-one font-extrabold text-5xl md:text-6xl'>{job?.title}</h1>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPin />
          {job?.location}
        </div>
        <div className='flex gap-2'>
          <User />
          {job?.applications?.length} applicants
        </div>
        <div className='flex gap-2'>
          {job?.isOpen ? (
            <>
            <DoorOpen /> Open
            </>
          ) : (
            <>
            <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>
      {/* hiring status */}
      {loadigHiringStatus && <BarLoader className='mb-4' width={"100%"} color='#ef4444' />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
        <SelectTrigger className ={
          `w-full ${job?.isOpen ? "bg-green-900" : "bg-red-900"}`
        }>
          <SelectValue placeholder={
            "Hiring Status" + (job?.isOpen ? "(Open)" : "(Closed)")
          } />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      )}
      
      <h2 className='text-2xl sm:text-3xl font-bold'>Key Responsibilities</h2>
      <MDEditor.Markdown source={job?.description} className='bg-transparent sm:text-lg' />
      <h2 className='text-2xl sm:text-3xl font-bold'>Skills Required</h2>
      <MDEditor.Markdown source={job?.requirements} className='bg-transparent sm:text-lg' />

      {/* Render applications */}
      {job?.recruiter_id !== user.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob = {fnJob}
          applied={job?.applications?.find((appl)=>appl.candidate_id === user.id)}
        />
      )}

      {job?.applications?.length>0 && job?.recruiter_id === user.id && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold md:text-4xl underline'>Applications</h2>
          {job?.applications?.map((application)=>{
            return (
              <ApplicationCard key={application.id} application={application} />
            )
          })}
        </div>
      )}

    </div>
  )
}

export default JobPage