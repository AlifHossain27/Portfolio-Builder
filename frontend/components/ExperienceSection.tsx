import React from 'react';
import { motion } from 'framer-motion';

type ExperienceSectionProps = {
  experiences: string;
};

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const experiencesArray = experiences.replace(/[\[\]']+/g, '').split(',');

  const isEmpty = experiencesArray.length === 1 && experiencesArray[0] === '';

  return (
    <section id="experience" className="py-12 bg-[#121212] text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        {isEmpty ? (
          <p className="text-center text-gray-400">None</p>
        ) : (
          <div className="space-y-8">
            {experiencesArray.map((company: string, index: number) => (
              <motion.div
                key={index}
                className="bg-[#242424] p-6 rounded-lg shadow-lg relative border-l-4 border-primary-400"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold">{company.trim()}</h3>
                </div>
                <span className="absolute top-0 left-0 transform -translate-x-1/2 bg-primary-400 w-8 h-8 rounded-full"></span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
