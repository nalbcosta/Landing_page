import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-white/30 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <img 
          src="/images/logo.png" 
          alt="Logo de Rodapé" 
          className="h-20 mb-6 opacity-80 hover:opacity-100 transition-opacity"
        />
        <p className="text-white/70 font-montserrat text-sm">
          © {new Date().getFullYear()} Nalbert Costa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;