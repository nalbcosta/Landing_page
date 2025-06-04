import React from 'react';
import { FaJava, FaPython, FaJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';

const Skills = () => {
  const skills = [
    { icon: <FaJava className="text-orange-500" />, name: "Java", color: "bg-orange-500/20" },
    { icon: <FaPython className="text-yellow-400" />, name: "Python", color: "bg-yellow-400/20" },
    { icon: <FaJs className="text-yellow-300" />, name: "JavaScript", color: "bg-yellow-300/20" },
    { icon: <><FaHtml5 className="text-red-500" /> <FaCss3Alt className="text-blue-500" /></>, name: "HTML+CSS", color: "bg-blue-500/20" }
  ];

  return (
    <section id="linguagens" className="py-20 px-4 md:px-8 lg:px-16">
      <h3 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-16 text-center border-t border-white/50 pt-8">
        Linguagens de desenvolvimento
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className={`${skill.color} p-6 rounded-2xl backdrop-blur-sm flex flex-col items-center transform transition-all hover:scale-105 hover:shadow-lg animate-fadeIn delay-${index * 100}`}
          >
            <div className="text-6xl mb-4">
              {skill.icon}
            </div>
            <p className="text-xl text-white font-montserrat">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;