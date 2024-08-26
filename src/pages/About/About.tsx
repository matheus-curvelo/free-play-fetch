import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Sobre o Projeto</h1>
      <p className="mb-4">
        Este projeto foi criado com o objetivo de oferecer aos usuários uma
        plataforma centralizada para descobrir jogos e DLC's gratuitos para PC
        disponíveis na web.
      </p>

      <h2 className="text-xl font-semibold mt-4">Ferramentas e Tecnologias</h2>
      <ul className="list-disc list-inside mb-4">
        <li>React + TypeScript para estruturação e tipagem do código</li>
        <li>React Router para gerenciamento de rotas</li>
        <li>
          Tailwind CSS para estilos utilitários e design responsivo rápido
        </li>
        <li>SASS para estilização e personalização avançada</li>
        <li>EmailJS para envio de formulários de contato de forma simples</li>
        <li>API Fetch para integração e obtenção de dados dinâmicos</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Fonte de Dados</h2>
      <p className="mb-4">
        As APIs utilizadas neste projeto foram obtidas dos sites{" "}
        <a
          href="https://www.gamerpower.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline">
          GamerPower
        </a>{" "}
        e{" "}
        <a
          href="https://www.freetogame.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline">
          Free To Game
        </a>
        , plataformas que agregam informações sobre jogos gratuitos e promoções
        disponíveis em diversas lojas online.
      </p>

      <h2 className="text-xl font-semibold mt-4">Desafios Enfrentados</h2>
      <p className="mb-4">
        Durante o desenvolvimento deste projeto, alguns dos principais desafios
        incluíram a integração com a API, a garantia de responsividade em
        diferentes dispositivos e a implementação de um sistema de roteamento
        eficiente. Além disso, a estilização personalizada com SASS exigiu um
        cuidado especial para manter a consistência visual em toda a aplicação.
        Nesta ocasião, foi a primeira vez que utilizei o Tailwind CSS, o que
        trouxe novas perspectivas e práticas para o processo de desenvolvimento.
      </p>

      <h2 className="text-xl font-semibold mt-4">Contribua com o Projeto</h2>
      <p className="mb-4">
        Se você gostou deste projeto e gostaria de contribuir com melhorias,
        sinta-se à vontade para visitar o repositório no GitHub e fazer uma pull
        request ou reportar issues. Toda contribuição é bem-vinda!
      </p>
      <p>
        <a
          href="https://github.com/matheus-curvelo/free-play-fetch"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline">
          <a
            href="https://github.com/matheus-curvelo/free-play-fetch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Contribua no GitHub
          </a>
        </a>
      </p>
    </div>
  );
};

export default About;
