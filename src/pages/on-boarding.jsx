import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(user?.unsafeMetadata?.role === "recruiter" ? "/post-jobs" : "/jobs");
    }
  }, [user, navigate]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#ef4444" />;
  }

  const handleRoleSelection = async (role) => {
    try {
      await user.update({
        unsafeMetadata: { role },
      });
      navigate(role === "recruiter" ? "/post-jobs" : "/jobs");
    } catch (error) {
      console.error("Error updating role", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-one text-5xl md:text-6xl lg:text-7xl font-extrabold">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          onClick={() => handleRoleSelection("candidate")}
          className="bg-red-500 text-white hover:bg-gray-300 hover:text-black hover:scale-105 transition-all ease-in-out h-12 sm:h-14 rounded-md px-6 text-lg font-bold"
        >
          Candidate
        </Button>
        <Button
          onClick={() => handleRoleSelection("recruiter")}
          className="text-black hover:bg-gray-500 hover:text-white hover:scale-105 transition-all ease-in-out h-12 sm:h-14 rounded-md px-6 text-lg font-bold"
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
