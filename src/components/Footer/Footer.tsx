import React from 'react';
import githubIcon from '../../assets/svg/github.svg';
import linkedinIcon from '../../assets/svg/linkedin.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-600 text-white text-center p-4">
      
      <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
      <p>
        Criado com <span className="text-red-500">❤</span> por Matheus Curvelo
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://github.com/matheus-curvelo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/matheus-curvelo/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
