import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { GraduationCap, Heart, Pencil } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const {user} = useUser();

  const [search, setSearch] = useSearchParams();

  useEffect(()=>{
    if(search.get("sign-in")){
        setShowSignIn(true);
    }
  },[search])

  const handleOverlayClick = (e) => {
    if(e.target === e.currentTarget){
        setShowSignIn(false);
        setSearch({});
    }
  }
  return (
    <>
      <nav className="py-4 px-10 flex w-full items-center justify-between">
        <Link>
          <p className="text-3xl font-bold font-[Montserrat]">
            Job
            <span className="text-red-500 font-extrabold text-4xl">Finder</span>
          </p>
        </Link>
        <div className="flex gap-6">
          <SignedOut>
            <Button
              variant="outline"
              className="rounded-lg"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {/* Add a contion here */}
            {user?.unsafeMetadata?.role === "recruiter" && (
            <Link to="/post-jobs">
              <Button className="rounded-lg">
                <Pencil size={20} className="mr-1" />
                Post a Job
              </Button>
            </Link>)}
            <UserButton appearance={{
                elements:{
                    avatarBox:"w-10 h-10"
                }
            }}>
                <UserButton.MenuItems>
                    <UserButton.Link
                        label="My Jobs"
                        labelIcon={<GraduationCap size={15} />}
                        href="/my-jobs"
                    />
                    <UserButton.Link
                        label="Saved Jobs"
                        labelIcon={<Heart size={15} />}
                        href="/saved-jobs"
                    />
                </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
        onClick={handleOverlayClick}>
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
