import { getMyCreatedJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyCreatedJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
  }, []);

  if (loadingCreatedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#ef4444" />;
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {createdJobs?.length ? (
        createdJobs.map((job) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              onJobsSaved={fnCreatedJobs}
              isMyJob
            />
          );
        })
      ) : (
        <div>No jobs found</div>
      )}
    </div>
  );
};

export default CreatedJobs;
