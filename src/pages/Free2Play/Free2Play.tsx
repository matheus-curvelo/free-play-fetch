import React, {useState, useEffect} from "react";
import useFetchFree2PlayGames from "../../utils/FreeToPlayApi";
import Pagination from "../../components/Pagination";

const Free2Play: React.FC = () => {
  const {games, loading, error} = useFetchFree2PlayGames();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Itens por página

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(8); // lg
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(6); // md
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(6); // sm
      } else {
        setItemsPerPage(6); // xs
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = games.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">Jogos Free 2 Play</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {currentItems.map(game => (
          <div key={game.id} className="bg-white p-4 rounded shadow">
            <a href={game.game_url} target="_blank" rel="noreferrer">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full rounded mb-4"
              />
            </a>
            <h2 className="text-lg font-bold mb-2">{game.title}</h2>
            <p className="text-sm mb-4">{game.short_description}</p>
            <div className="flex flex-col gap-1">
              <p className="text-sm">Gênero: {game.genre}</p>
              <p className="text-sm">Plataforma: {game.platform}</p>
              <p className="text-sm">Distribuidora: {game.publisher}</p>
              <p className="text-sm">Desenvolvedor: {game.developer}</p>
              <p className="text-sm">Data de Lançamento: {game.release_date}</p>
            </div>
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm bg-blue-500 text-white mt-2 py-2 px-4 rounded hover:bg-blue-600">
              Jogar Agora
            </a>
          </div>
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={games.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Free2Play;
