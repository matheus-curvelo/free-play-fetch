import React, { useState } from "react";
import useFetchGames from "../../utils/api";
import Pagination from "../../components/Pagination";

const Games: React.FC = () => {
  const { games, loading, error } = useFetchGames();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Itens por página

  // Filtra apenas jogos
  const gamesList = games.filter(game => game.type === "Game");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gamesList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatDate = (dateString: string): string => {
    if (dateString === "N/A" || !dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const translateStatus = (status: string): string => {
    return status === "Active" ? "Ativo" : status;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">Jogos Gratuitos</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {currentItems.map(game => (
          <div key={game.id} className="bg-white p-4 rounded shadow">
            <a href={game.open_giveaway_url} target="_blank" rel="noreferrer">
              <img
                src={game.image}
                alt={game.title}
                className="w-full rounded mb-4"
              />
            </a>
            <h2 className="text-lg font-bold mb-2">{game.title}</h2>
            <p className="text-sm mb-4">{game.description}</p>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold">
                Status: {translateStatus(game.status)}
              </p>
              <p className="text-sm">Plataforma: {game.platforms}</p>
              {game.worth !== "N/A" && game.worth && (
                <p className="text-sm">Preço: {game.worth}</p>
              )}
              {game.end_date !== "N/A" && game.end_date && (
                <p className="text-sm">Termina: {formatDate(game.end_date)}</p>
              )}
              <p className="text-sm">Downloads: {game.users}</p>
            </div>
            <a
              href={game.open_giveaway_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm bg-blue-500 text-white mt-2 py-2 px-4 rounded hover:bg-blue-600">
              Resgatar
            </a>
          </div>
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={gamesList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Games;