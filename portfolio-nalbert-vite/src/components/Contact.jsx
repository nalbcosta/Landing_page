import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const socials = [
    { icon: <FaLinkedin />, name: "LinkedIn", url: "https://www.linkedin.com/in/nalbert-schwank-costa-santos-a42b17222/", color: "bg-blue-600" },
    { icon: <FaGithub />, name: "GitHub", url: "https://github.com/nalbcosta", color: "bg-gray-800" },
    { icon: <FaInstagram />, name: "Instagram", url: "https://www.instagram.com/nalbcosta", color: "bg-gradient-to-r from-purple-500 to-pink-500" }
  ];

  return (
    <section id="redes" className="py-20 px-4 md:px-8 lg:px-16">
      <h3 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-16 text-center border-t border-white/50 pt-8">
        Redes Sociais
      </h3>
      
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.color} w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white text-4xl transform transition-all hover:scale-110 hover:shadow-xl animate-bounce delay-${index * 300}`}
            style={{ animationDelay: `${index * 300}ms` }}
          >
            {social.icon}
            <span className="text-sm mt-2 font-montserrat">{social.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;