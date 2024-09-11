"use client";
import React from "react";
import Image from "next/image";

type ProfileData = {
  about_me: string
}

const AboutSection = ( {about_me}: ProfileData ) => {
  return (
    <section className="text-white container" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/media/about-img.png" alt="img" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base text-gray-400 lg:text-lg">
            {about_me}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;