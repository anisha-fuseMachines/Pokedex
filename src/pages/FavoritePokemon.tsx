import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import PokemonCard from "../components/pokemonList/PokemonCard";
import { usePokemonContext } from "../global-state/contexts/PokemonContext";
import type { PokemonListItem } from "../types/pokemonList";
import { getFavoritePokemons } from "../services/backendApi";
import NoFavorite from "../components/common/Nofavorite";

const FavoriteList = () => {
  const { pokemonList, loading: listLoading } = usePokemonContext();
  const [favorites, setFavorites] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const favs = await getFavoritePokemons(); // [{id,name},…]
        const enriched = favs.flatMap((f: { id: string; name: string }) => {
          const full = pokemonList.find(
            (p) => p.id === +f.id || p.name === f.name
          );
          return full ? [full] : [];
        });
        setFavorites(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (!listLoading) loadFavorites();
  }, [pokemonList, listLoading]);

  const handleToggle = async (id: number, isFav: boolean) => {
    if (!isFav) {
      // already removed on backend by PokemonCard; just update locally
      setFavorites((favs) => favs.filter((p) => p.id !== id));
    }
  };

  if (listLoading || loading) return <Loader />;

  if (favorites.length === 0) return <NoFavorite />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5 2xl:grid-cols-4 lg:gap-6 xl:gap-6 w-full max-w-9xl mx-auto px-4 py-6 [height:calc(100vh_-_67px)]">
      {favorites.map((pokemon) => (
        <Link to={`/${pokemon.name}`} key={pokemon.id}>
          <PokemonCard pokemon={pokemon} onToggleFavorite={handleToggle} />
        </Link>
      ))}
    </div>
  );
};

export default FavoriteList;
