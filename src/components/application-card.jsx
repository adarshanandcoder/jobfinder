import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Box, Briefcase, Download, GraduationCap } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateApplicationStatus } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const {
    loading:loadingHiringStatus,
    fn:fnHiringStatus,
  } = useFetch(updateApplicationStatus,{
    job_id : application.job_id,
  })

  const handleStatusChange = (status) =>{
    fnHiringStatus(status);
  }

  return (
    <div className="my-6">
      <Card>
        {loadingHiringStatus && <BarLoader width={"100%"} color="#ef4444" />}
        <CardHeader>
          <CardTitle className="flex justify-between font-bold">
            {isCandidate
              ? `${application?.job?.title} at ${application?.joh?.campany?.name}`
              : application?.name}
            <Download className="cursor-pointer" onClick={handleDownload} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex gap-2 items-center">
              <Briefcase size={22} /> {application?.experience} Years of
              experience
            </div>
            <div className="flex gap-2 items-center">
              <GraduationCap size={22} /> {application?.education}
            </div>
            <div className="flex gap-2 items-center">
              <Box size={22} />
              Skills : {application?.skills}
            </div>
          </div>
          <hr />
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>{new Date(application?.created_at).toLocaleString()}</span>
          {isCandidate ? (
            <span className="capitalize font-bold">
              Status : {application?.status}
            </span>
          ) : (
            <Select onValueChange={handleStatusChange} defaultValue={application.status}>
                <SelectTrigger className="w-56">
                    <SelectValue placeholder="Application Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplicationCard;
