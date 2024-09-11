"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import { getProfile } from '../actions/getProfile';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import { LoaderCircle } from 'lucide-react';

const ProfilePage = () => {
  
  const {data: profile, isLoading} = useQuery({
    queryFn: () => getProfile(),
    queryKey: ['profile']
  })
  if(isLoading){
    return <LoaderCircle className= "animate-spin" size= "50"/>
  }
  return (
    <div className='flex min-h-screen flex-col bg-[#121212] container mx-auto px-12 py-4'>
      <Navbar/>
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection first_name={profile.first_name} last_name={profile.last_name} age={profile.age} role={profile.role} quote={profile.quote}/>
        <AboutSection about_me={profile.about_me}/>
        <SkillsSection skills={profile.skills}/>
        <ExperienceSection experiences={profile.experience}/>
      </div>
      <Footer email={profile.email} />
    </div>
  )
}

export default ProfilePage