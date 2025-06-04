import React from 'react';

const Education = () => {
  const formations = [
    "Cursando Bacharel em Ciência da Computação - UNIT",
    "Lógica de Programação Computacional",
    "Montagem e Manutenção de Hardware",
    "Linguagem de Modelagem Unificada",
    "Inglês Avançado"
  ];

  return (
    <section id="formacao" className="py-20 px-4 md:px-8 lg:px-16 bg-purple-900/20 backdrop-blur-sm border-y border-purple-500/30">
      <h3 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-16 text-center border-t border-white/50 pt-8">
        Formações
      </h3>
      
      <div className="max-w-3xl mx-auto space-y-6">
        {formations.map((item, index) => (
          <div 
            key={index}
            className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20 transform transition-all hover:scale-[1.02] animate-fadeIn"
          >
            <p className="text-xl text-white font-montserrat text-center">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;