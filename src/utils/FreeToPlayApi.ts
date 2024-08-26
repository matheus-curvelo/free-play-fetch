import { useEffect, useState } from "react";

interface Api {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string; //
  platform: string; //
  publisher: string; // Distribuidora
  developer: string; // Desenvolvedor
  release_date: string; //
}

const FreeToPlayApi = () => {
  const [games, setGames] = useState<Api[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'd70527d129msh57e824f6c5c34d6p1f20f9jsna25f39751ded',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados da API");
        }
        const result = await response.json();
        setGames(result);
      } catch (error) {
        setError("Erro ao carregar os jogos.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};

export default FreeToPlayApi;
