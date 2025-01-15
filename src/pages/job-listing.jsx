import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { City, State } from "country-state-city";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies =[] } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    const query = formData.get("search-query");

    if (query) setSearchQuery(query);
  };

  const handleCLearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setCompany_id("");
  }

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#ef4444" />;
  }

  return (
    <div>
      <h1 className="gradient-one font-extrabold text-5xl sm:text-6xl pb-4 text-center mt-6">
        Current Openings
      </h1>

      {/* Filters */}
      <form
        onSubmit={handleSearch}
        className="flex w-full h-10 gap-2 items-center mb-3 "
      >
        <Input
          type="text"
          placeholder="Search Jobs...."
          name="search-query"
          className="h-full mx-3 flex-1 px-4 text-md"
        />
        <Button className="bg-red-500 text-white hover:bg-gray-300 hover:text-black hover:scale-105 transition-all ease-in-out h-8 sm:h-9 rounded-md px-6 text-lg font-bold">
          Search
        </Button>
      </form>

      <div className="mx-3 flex flex-col sm:flex-row gap-3">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by location..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {City.getCitiesOfCountry("IN").map(({ name }) => {
                return (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by company..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies.length > 0 ? (
                companies.map(({ name, id }) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No Companies Available</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={handleCLearFilters} className="sm:w-1/2">
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#ef4444" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
