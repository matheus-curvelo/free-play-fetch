import React, {useState, useEffect} from "react";
import "./Pagination.scss";

const Pagination: React.FC<{
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}> = ({itemsPerPage, totalItems, paginate, currentPage}) => {
  const [pagesToShow, setPagesToShow] = useState(5); // Exibe 5 páginas inicialmente
  const [showFirstLastButtons, setShowFirstLastButtons] = useState(true); // Mostra os botões "Primeira" e "Última" inicialmente

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        // Limite para telas mobile
        setPagesToShow(3);
        setShowFirstLastButtons(false); // Esconde os botões em telas pequenas
      } else {
        setPagesToShow(5);
        setShowFirstLastButtons(true); // Mostra os botões em telas maiores
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  const half = Math.floor(pagesToShow / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    end = Math.min(totalPages, pagesToShow);
  } else if (currentPage + half >= totalPages) {
    start = Math.max(1, totalPages - pagesToShow + 1);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex list-none">
          {showFirstLastButtons && (
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
          )}
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

          {pageNumbers.map(number => (
            <li key={number} className="mx-1">
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}>
                {number}
              </button>
            </li>
          ))}

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
          {showFirstLastButtons && (
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
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
