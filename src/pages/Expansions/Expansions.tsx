import React, {useState, useEffect} from "react";
import useFetchGames from "../../utils/GamerPowerApi";
import Pagination from "../../components/Pagination";
import "./Expansions.scss";

const Expansions: React.FC = () => {
  const {games, loading, error} = useFetchGames();

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

  // Filtra apenas DLCs
  const dlcsList = games.filter(game => game.type === "DLC");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dlcsList.slice(indexOfFirstItem, indexOfLastItem);

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

  const limitWords = (text: string, wordLimit: number): string => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">Expansões Gratuitas</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {currentItems.map(dlc => (
          <div key={dlc.id} className="bg-white p-4 rounded shadow">
            <a href={dlc.open_giveaway_url} target="_blank" rel="noreferrer">
              <img
                src={dlc.image}
                alt={dlc.title}
                className="w-full rounded mb-4"
              />
            </a>
            <h2 className="text-lg font-bold mb-2">{dlc.title}</h2>
            <p className="text-sm mb-4">{limitWords(dlc.description, 48)}</p>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold">
                Status: {translateStatus(dlc.status)}
              </p>
              <p className="text-sm">Plataforma: {dlc.platforms}</p>
              {dlc.worth !== "N/A" && dlc.worth && (
                <p className="text-sm">Preço: {dlc.worth}</p>
              )}
              {dlc.end_date !== "N/A" && dlc.end_date && (
                <p className="text-sm">Termina: {formatDate(dlc.end_date)}</p>
              )}
              <p className="text-sm">Downloads: {dlc.users}</p>
            </div>
            <a
              href={dlc.open_giveaway_url}
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
        totalItems={dlcsList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Expansions;
