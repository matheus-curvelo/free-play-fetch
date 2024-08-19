import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-600 text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
      <p>Criado com <span className="text-red-500">❤</span> por Matheus Curvelo</p>
    </footer>
  );
};

export default Footer;
