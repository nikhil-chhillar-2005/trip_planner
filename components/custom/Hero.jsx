import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col  items-center mx-15 lg:mx-56 gap-9">
      <h1 className="font-extrabold text-xl md:text-3xl lg:text-5xl text-center mt-16">
        <span className="text-[#f56551]  ">
          Discover Your Next Adventure with AI:
        </span>
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-sm sm:text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interest and budget.
      </p>
      <Link to={'/create-trip'}>
      <Button> Get Started,It's Free</Button></Link>

      <img src="/hero.png" alt="" className="mt-5 w-[100%] md:w-[80%]" />
    </div>
  );
};

export default Hero;
