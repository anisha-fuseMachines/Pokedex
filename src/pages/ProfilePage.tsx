// src/pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { GoPencil } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";

interface TrainerProfile {
  gender: "male" | "female";
  name: string;
  region: string;
  starter: string;
  trainerAvatar: string;
  pokemonAvatar: string;
}

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(
    null
  );
  const [pokemonType, setPokemonType] = useState<string | null>(null); // Simplified state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load trainer profile from localStorage
    const profileData = localStorage.getItem("trainerProfile");
    if (profileData) {
      const profile: TrainerProfile = JSON.parse(profileData);
      setTrainerProfile(profile);

      // Get pokemon type only
      fetchPokemonType(profile.starter);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchPokemonType = async (pokemonName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const data = await response.json();
      setPokemonType(data.types[0].type.name);
    } catch (error) {
      console.error("Failed to fetch pokemon type", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">
          Please log in to view your profile
        </h2>
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Log In
        </Link>
      </div>
    );
  }

  if (!trainerProfile) {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h2 className="text-2xl font-bold mb-4">Loading Profile...</h2>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">No Trainer Profile Found</h2>
        <p className="text-gray-600 mb-6 text-center">
          You haven't created your trainer profile yet. Start your Pokémon
          journey now!
        </p>
        <Link
          to="/signup"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Create Trainer Profile
        </Link>
      </div>
    );
  }

  // Get type color classes
  const typeColors: Record<string, string> = {
    grass: "bg-green-100 text-green-800 border-green-300",
    fire: "bg-red-100 text-red-800 border-red-300",
    water: "bg-blue-100 text-blue-800 border-blue-300",
    electric: "bg-yellow-100 text-yellow-800 border-yellow-300",
    poison: "bg-purple-100 text-purple-800 border-purple-300",
    flying: "bg-indigo-100 text-indigo-800 border-indigo-300",
    bug: "bg-lime-100 text-lime-800 border-lime-300",
    normal: "bg-gray-100 text-gray-800 border-gray-300",
    // Add more types as needed
  };

  const typeColorClass = pokemonType
    ? typeColors[pokemonType]
    : "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Trainer Profile
          </h1>
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <GoPencil />
              Edit Profile
            </Link>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              <AiOutlineLogout className="mr-2 text-white" size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trainer Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 lg:col-span-2">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-gray-300">
                <img
                  src={trainerProfile.trainerAvatar}
                  alt="Trainer Avatar"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                  {trainerProfile.name}
                </h2>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium capitalize">
                      {trainerProfile.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Home Region</p>
                    <p className="font-medium capitalize">
                      {trainerProfile.region}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      Active Trainer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Starter Pokemon Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Starter Pokémon
            </h3>

            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 rounded-full p-4 mb-4 border-4 border-gray-300">
                <img
                  src={trainerProfile.pokemonAvatar}
                  alt={trainerProfile.starter}
                  className="w-full h-full object-contain"
                />
              </div>

              <h4 className="text-xl font-bold text-gray-800 capitalize">
                {trainerProfile.starter}
              </h4>

              <div className="mt-2">
                {loading ? (
                  <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                ) : (
                  <span
                    className={`capitalize px-3 py-1 rounded-full text-sm font-medium border ${typeColorClass}`}
                  >
                    {pokemonType || "Unknown"}
                  </span>
                )}
              </div>

              <p className="mt-4 text-gray-600 text-center">
                Your faithful companion since the beginning of your journey in{" "}
                {trainerProfile.region}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
