import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePokemonContext } from "../global-state/contexts/PokemonContext";
import type { PokemonListItem } from "../types/pokemonList";
import { fetchFilters, searchPokemonAPI } from "../services/backendApi";
import Loader from "../components/common/Loader";
import PokemonCard from "../components/pokemonList/PokemonCard";
import SearchFilterDrawer from "../components/pokemonList/FilterDrawer";
import { LuFilter } from "react-icons/lu";
import NoResult from "../components/common/NoResult";
const PokemonList = () => {
  const { pokemonList, loading, visibleCount, dispatch } = usePokemonContext();
  const visiblePokemon = pokemonList.slice(0, visibleCount);

  const [appliedFilters, setAppliedFilters] = useState<{
    types: string[];
    habitats: string[];
    classification: string;
  }>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("pokemonAppliedFilters") || "null") || {
          types: [],
          habitats: [],
          classification: "",
        }
      );
    } catch {
      return { types: [], habitats: [], classification: "" };
    }
  });

  const [searchText, setSearchText] = useState<string>("");
  const [filteredPokemon, setFilteredPokemon] = useState<
    PokemonListItem[] | null
  >(null);
  const [filters, setFilters] = useState<{
    types: string[];
    habitats: string[];
    classifications: string[];
  }>({
    types: [],
    habitats: [],
    classifications: [],
  });
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // results with full data
  const enrichResults = useCallback(
    (results: PokemonListItem[]) =>
      results.map((p) => {
        const full = pokemonList.find((f) => f.name === p.name);
        return full ? { ...full, ...p } : p;
      }),
    [pokemonList]
  );

  const handleSearch = useCallback(async () => {
    if (!searchText.trim()) {
      setFilteredPokemon(null);
      return;
    }
    try {
      const resp = await searchPokemonAPI({ searchText });
      setFilteredPokemon(enrichResults(resp));
    } catch (err) {
      console.error("Search failed:", err);
    }
  }, [searchText, enrichResults]);

  // apply filters only, clear search text
  const handleFilterApply = useCallback(
    async (filterPayload: {
      types: string[];
      habitats: string[];
      classification: string;
    }) => {
      setAppliedFilters(filterPayload);
      setSearchText("");
      localStorage.setItem(
        "pokemonAppliedFilters",
        JSON.stringify(filterPayload)
      );
      try {
        const resp = await searchPokemonAPI({
          types: filterPayload.types,
          habitats: filterPayload.habitats,
          classification: filterPayload.classification,
        });
        setFilteredPokemon(enrichResults(resp));
      } catch (err) {
        console.error("Filter failed:", err);
      }
      setDrawerOpen(false);
    },
    [enrichResults]
  );

  // reset both search and filters
  const handleResetFilters = useCallback(() => {
    const empty = { types: [], habitats: [], classification: "" };
    setAppliedFilters(empty);
    setSearchText("");
    setFilteredPokemon(null);
    localStorage.removeItem("pokemonAppliedFilters");
    setDrawerOpen(false);
  }, []);

  useEffect(() => {
    fetchFilters().then(setFilters).catch(console.error);
  }, []);

  useEffect(() => {
    if (
      appliedFilters.types.length ||
      appliedFilters.habitats.length ||
      appliedFilters.classification
    ) {
      handleFilterApply(appliedFilters);
    }
  }, [appliedFilters, handleFilterApply]);

  const hasAnyFilter =
    Boolean(searchText.trim()) ||
    appliedFilters.types.length > 0 ||
    appliedFilters.habitats.length > 0 ||
    Boolean(appliedFilters.classification);

  const displayList = hasAnyFilter ? filteredPokemon ?? [] : visiblePokemon;

  const activeFilterCount =
    appliedFilters.types.length +
    appliedFilters.habitats.length +
    (appliedFilters.classification ? 1 : 0);

  if (loading) return <Loader />;

  return (
    <>
      {/* Search + Filters */}
      <div className="flex items center justify-end px-4 py-4 w-full">
        <input
          className="border px-4 py-2 rounded w-full max-w-md border-white/50 text-white"
          placeholder="Search Pokémon"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button
          className="relative px-4 py-3 border border-blue-300 text-white rounded-lg hover:bg-blue-300 ml-4"
          onClick={() => setDrawerOpen(true)}
        >
          <LuFilter size={18} className="hover:text-dark" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs px-2">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Active filters banner */}
      {hasAnyFilter && displayList.length > 0 && (
        <div className="px-4 py-2 text-sm text-gray-600">
          Showing results for:
          {appliedFilters.types.length > 0 &&
            ` Types: ${appliedFilters.types.join(", ")}`}
          {appliedFilters.habitats.length > 0 &&
            ` | Habitats: ${appliedFilters.habitats.join(", ")}`}
          {appliedFilters.classification &&
            ` | Classification: ${appliedFilters.classification}`}
        </div>
      )}

      {/* Grid or No Results */}
      <div className="px-4 py-6">
        {displayList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5 2xl:grid-cols-4 lg:gap-6 xl:gap-6 w-full max-w-9xl mx-auto px-4 py-6">
            {displayList.map((pokemon) => (
              <Link to={`/${pokemon.name}`} key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}
          </div>
        ) : (
          <NoResult />
        )}
      </div>

      {!hasAnyFilter && visibleCount < pokemonList.length && (
        <div className="flex justify-center mb-6">
          <button
            className="bg-pink-200 hover:bg-pink-300 text-pink-700 px-6 py-2 rounded-lg"
            onClick={() => dispatch({ type: "LOAD_MORE" })}
          >
            Load More
          </button>
        </div>
      )}

      <SearchFilterDrawer
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        initialValues={appliedFilters}
        onReset={handleResetFilters}
      />
    </>
  );
};

export default PokemonList;
