import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="flex flex-col-reverse md:flex-row items-center justify-between py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="text-center md:text-left mt-10 md:mt-0 md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold text-white font-montserrat mb-4 animate-fadeIn">
          Nalbert Costa
        </h1>
        <h2 className="text-xl md:text-2xl font-light text-white font-montserrat mb-8 animate-fadeIn delay-100">
          Desenvolvedor - Programador - Estudante
        </h2>
        <a 
          href="#redes" 
          className="bg-white text-black px-8 py-3 rounded-2xl font-montserrat shadow-lg transform transition-all hover:scale-105 hover:shadow-xl animate-fadeIn delay-200"
        >
          Redes Sociais
        </a>
      </div>
      
      <div className="md:w-1/2 flex justify-center animate-float">
        <img 
          src="/images/pic.jpg" 
          alt="Nalbert Costa Foto" 
          className="rounded-3xl shadow-2xl w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-white/30"
        />
      </div>
    </section>
  );
};

export default Hero;