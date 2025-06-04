import React from 'react';

const About = () => {
  return (
    <section id="sobreMim" className="py-20 px-4 md:px-8 lg:px-16 bg-purple-900/20 backdrop-blur-sm border-y border-purple-500/30">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-10 text-center border-t border-white/50 pt-8">
          Quem sou eu?
        </h3>
        <p className="text-lg text-white font-montserrat font-light leading-relaxed bg-black/20 p-6 rounded-xl backdrop-blur-sm animate-fadeIn">
          Olá, Sou Nalbert Schwank Costa Santos, desenvolvedor em formação e atualmente no penúltimo ano de Ciência da Computação na UNIT - Universidade Tiradentes. Tenho uma base sólida em linguagens de programação como Python, Java e JavaScript, com experiência em frameworks como Django, React.js, Node.js e Express. Minha paixão é a engenharia de software, e me especializo em metodologias ágeis, como Scrum. Também tenho um grande interesse por bancos de dados NoSQL, especialmente MongoDB, e estou sempre buscando criar soluções tecnológicas eficientes que otimizem processos e entreguem resultados de alta qualidade.
        </p>
      </div>
    </section>
  );
};

export default About;