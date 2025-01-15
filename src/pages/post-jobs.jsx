import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
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
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { City } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "location is required" }),
  company_id: z.string().min(1, { message: "Select or add a new company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJobs = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const {
    loading:loadingCreateJob,
    error:errorCreateJob,
    data:dataCreateJob,
    fn:fnCreateJob,
  } = useFetch(addNewJob)

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id:user.id,
      isOpen:true,
    })
  }

  useEffect(()=>{
    if(dataCreateJob?.length>0) navigate('/jobs');
  },[loadingCreateJob])

  if (!isLoaded || loadingCompanies) {
    return <BarLoader width={"100%"} color="#ef4444" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-[60vw] gap-4 mx-auto">
      <h1 className="gradient-one text-6xl md:text-7xl font-extrabold text-center mt-6">
        Post a New Job
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 p-4 pb-0">
        <Input
          placeholder="Title for the job..."
          {...register("title")}
          className="w-full "
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea
          placeholder="Description for the job..."
          {...register("description")}
          className="w-full"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex items-center gap-2 w-full">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select
                className="flex-1"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {City.getCitiesOfCountry("IN").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select
                className="flex-1"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by company...">
                    {field.value? companies?.find((com)=> com.id === Number(field.value))?.name : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {(companies || []).map(({ name, id }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddCompanyDrawer fetchCompanies ={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}

        <Controller 
        name="requirements"
        control={control}
        render ={({field})=>(
          <MDEditor value={field.value} onChange={field.onChange} />
        )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}
        {loadingCreateJob && <BarLoader width={"100%"} color="#ef4444" />}
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJobs;
