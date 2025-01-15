import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import useFetch from "@/hooks/use-fetch"
import { addNewCompany } from "@/api/apiCompanies"
import { BarLoader } from "react-spinners"
import { useEffect } from "react"

const schema = z.object({
    name:z.string().min(1, {message:"Name is required"}),
    logo:z.any().refine((file)=>file[0] && (file[0].type === "image/png" || file[0].type === "image/jpeg"),
            {message:"Only Images are required"}),
})

const AddCompanyDrawer = ({ fetchCompanies }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const {
        loading: loadingAddCompany,  // Correct typo here
        data: dataAddCompany,
        error: errorAddCompany,
        fn: fnAddCompany,
    } = useFetch(addNewCompany);

    const onSubmit = (data) => {
        fnAddCompany({
            ...data,
            logo: data.logo[0],
        });
    };

    useEffect(() => {
        if (dataAddCompany?.length > 0) fetchCompanies();
    }, [loadingAddCompany, dataAddCompany]);

    return (
        <Drawer>
            <DrawerTrigger>
                <Button size="sm" type="button">
                    Add Company
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add a new company</DrawerTitle>
                </DrawerHeader>
                <form className="flex gap-3 p-4 pb-0">
                    <Input placeholder="Name of the company..." {...register("name")} />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                    <Input type="file" accept="image/*" className="file:text-gray-500" {...register("logo")} />
                    {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}

                    <Button
                        type="button"
                        variant="destructive"
                        className="w-40"
                        onClick={handleSubmit(onSubmit)} // Use handleSubmit here
                    >
                        Add
                    </Button>
                </form>
                {errorAddCompany?.message && <p className="text-red-500">{errorAddCompany?.message}</p>}
                {loadingAddCompany && <BarLoader width={"100%"} color="#ef4444" />}
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="secondary" type="button">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default AddCompanyDrawer;