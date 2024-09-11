import React from 'react';
import { motion } from 'framer-motion';

type SkillsSectionProps = {
  skills: string;
};

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const skillsArray = skills.replace(/[\[\]']+/g, '').split(',');

  return (
    <section id="skills" className="py-12 bg-[#181818] text-white container">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillsArray.map((skill: string, index: number) => (
            <motion.div
              key={index}
              className="bg-[#242424] p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2 capitalize">{skill.trim()}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
