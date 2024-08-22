import {useEffect, useState} from "react";

interface Game {
  id: number;
  title: string;
  worth: string; // Preço
  thumbnail: string;
  image: string;
  description: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  users: number; // Downloads
  status: string;
}

const useFetchGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const url = "https://gamerpower.p.rapidapi.com/api/giveaways?platform=pc";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d70527d129msh57e824f6c5c34d6p1f20f9jsna25f39751ded",
          "x-rapidapi-host": "gamerpower.p.rapidapi.com",
        },
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

  return {games, loading, error};
};

export default useFetchGames;
