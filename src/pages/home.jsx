import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from '../data/companies.json'
import faqs from '../data/faq.json'
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Home = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-14 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-one text-5xl font-extrabold sm:text-6xl lg:text-7xl pt-6">
          Find the Career <span>You Deserve</span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl font-[Montserrat]">
          Empowering recruiters to find top talent and job seekers to discover
          their dream careers
        </p>
      </section>
      <div className="flex gap-10 justify-center">
        {/* buttons */}
        <Link to="/jobs">
          <Button className="bg-red-500 text-white hover:bg-gray-300 hover:text-black hover:scale-105 transition-all ease-in-out h-10 sm:h-12 rounded-md px-6 text-lg font-bold">
            Find a Job
          </Button>
        </Link>
        <Link to="/post-jobs">
          <Button className="text-black hover:bg-gray-500 hover:text-white hover:scale-105 transition-all ease-in-out h-10 sm:h-12 rounded-md px-6 text-lg font-bold">
            Post a Job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-7">
        <CarouselContent className="flex gap-10 md:gap-20 items-center">
          {companies.map(({ name, id, path, url }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <Link to={url} target="_blank" rel="noopener noreferrer">
                  <div className="h-20 md:h-[135px] w-20 md:w-[135px] flex items-center justify-center">
                    <img
                      src={path}
                      alt={name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* banner */}
      <div>

      </div>
      <img src="/companies/banner.webp" className="rounded max-w-5xl mx-auto border border-gray-400 shadow-lg shadow-gray-400 shadow-bottom-only" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Hunters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-muted-foreground">Find and apply for jobs, monitor your progress, and achieve your goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Recruiters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-muted-foreground">Advertise jobs, track applicants, and hire top talent effortlessly</p>
          </CardContent>
        </Card>

      </section>
      <Accordion className="mx-2" type="single" collapsible>
        {faqs.map((faq,index)=>{
          return   <AccordionItem key={index} value={`item-1 ${index+1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
        })}   
      </Accordion>
    </main>
  );
};

export default Home;
