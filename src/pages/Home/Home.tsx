import React, {useState, useEffect} from "react";
import useFetchGames from "../../utils/GamerPowerApi";
import useFetchFree2PlayGames from "../../utils/FreeToPlayApi";

const Home: React.FC = () => {
  const {games, loading: gamesLoading, error: gamesError} = useFetchGames();
  const {
    games: free2PlayGames,
    loading: free2PlayLoading,
    error: free2PlayError,
  } = useFetchFree2PlayGames();
  const [itemsToShow, setItemsToShow] = useState(8);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setItemsToShow(8); // lg
    } else if (width >= 768) {
      setItemsToShow(6); // md
    } else {
      setItemsToShow(4); // sm
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const gamesList = games
    .filter(game => game.type === "Game")
    .slice(0, itemsToShow);
  const dlcsList = games
    .filter(game => game.type === "DLC")
    .slice(0, itemsToShow);
  const free2PlayList = free2PlayGames.slice(0, itemsToShow);

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
      <div className="bg-cover text-center bg-center text-black py-10 mb-4 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">
          Bem-vindo ao Free Play Fetch!
        </h1>
        <p className="text-lg">
          Descubra os melhores jogos e DLCs gratuitos disponíveis para PC.
        </p>
      </div>

      {gamesLoading && <p>Carregando Jogos e DLCs...</p>}
      {gamesError && <p className="text-red-500">{gamesError}</p>}
      {free2PlayLoading && <p>Carregando Jogos Free2Play...</p>}
      {free2PlayError && <p className="text-red-500">{free2PlayError}</p>}

      <h2 className="text-xl font-bold mb-4">Jogos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {gamesList.map(game => (
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

      <h2 className="text-xl font-bold mb-4">DLCs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {dlcsList.map(dlc => (
          <div key={dlc.id} className="bg-white p-4 rounded shadow">
            <a href={dlc.open_giveaway_url} target="_blank" rel="noreferrer">
              <img
                src={dlc.image}
                alt={dlc.title}
                className="w-full rounded mb-4"
              />
            </a>
            <h2 className="text-lg font-bold mb-2">{dlc.title}</h2>
            <p className="text-sm mb-4">{dlc.description}</p>
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

      <h2 className="text-xl font-bold mb-4">Jogos Free2Play</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {free2PlayList.map(game => (
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
              <p className="text-sm">
                Data de Lançamento: {formatDate(game.release_date)}
              </p>
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
    </div>
  );
};

export default Home;
