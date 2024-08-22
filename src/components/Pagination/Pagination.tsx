import React from "react";
import "./Pagination.scss";

const Pagination: React.FC<{
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}> = ({itemsPerPage, totalItems, paginate, currentPage}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const maxPagesToShow = 5; // Número máximo de páginas
  const halfMaxPages = Math.floor(maxPagesToShow / 2);

  let startPage: number;
  let endPage: number;

  if (totalPages <= maxPagesToShow) {
    // Se o total de páginas for menor ou igual ao máximo de páginas a exibir
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= halfMaxPages) {
    // Se a página atual estiver na primeira metade das páginas
    startPage = 1;
    endPage = maxPagesToShow;
  } else if (currentPage + halfMaxPages >= totalPages) {
    // Se a página atual estiver na última metade das páginas
    startPage = totalPages - maxPagesToShow + 1;
    endPage = totalPages;
  } else {
    // Caso padrão: páginas ao redor da página atual
    startPage = currentPage - halfMaxPages;
    endPage = currentPage + halfMaxPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex list-none items-center">
          {/*Primeira Página*/}
          <li className="mx-1">
            <button
              onClick={() => paginate(1)}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 opacity-50 cursor-default"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={currentPage === 1}>
              &laquo;
            </button>
          </li>

          {/* Voltar */}
          <li className="mx-1">
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 opacity-50 cursor-default"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={currentPage === 1}>
              &lsaquo;
            </button>
          </li>

          {/*Páginas*/}
          {pageNumbers.map(number => (
            <li key={number} className="mx-1">
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded  ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}>
                {number}
              </button>
            </li>
          ))}

          {/*Avançar*/}
          <li className="mx-1">
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 opacity-50 cursor-default"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={currentPage === totalPages}>
              &rsaquo;
            </button>
          </li>

          {/*Última Página*/}
          <li className="mx-1">
            <button
              onClick={() => paginate(totalPages)}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 opacity-50 cursor-default"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={currentPage === totalPages}>
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
