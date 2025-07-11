import { useState } from "react";
import type { Gender, Pokemon, Region } from "../types/registration";
import { AvatarCard } from "../components/Signup/AvatarCard";
import { TrainerProfilePreview } from "../components/Signup/TrainerPreview";
import {
  SelectionSummary,
  StarterCard,
} from "../components/Signup/StarterPokemon";
import { NavigationButtons } from "../components/Signup/NavigationButtons";
import { useNavigate } from "react-router-dom";
import { ProgressBar, StepIndicator } from "../components/Signup/ProgressSteps";
import {
  femaleAvatar,
  maleAvatar,
  startersByRegion,
} from "../data/profileData";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<Gender>("male");
  const [name, setName] = useState("");
  const [region, setRegion] = useState<Region>("Kanto");
  const [starter, setStarter] = useState("Bulbasaur");
  // New state for avatars
  const [trainerAvatar, setTrainerAvatar] = useState(maleAvatar);
  const [pokemonAvatar, setPokemonAvatar] = useState(
    startersByRegion["Kanto"][0].image
  );
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // Update trainer avatar when gender changes
  const handleSetGender = (g: Gender) => {
    setGender(g);
    setTrainerAvatar(g === "male" ? maleAvatar : femaleAvatar);
  };

  // Update Pokémon avatar when starter changes
  const handleSetStarter = (name: string) => {
    setStarter(name);
    const selectedPokemon = startersByRegion[region].find(
      (p) => p.name === name
    );
    if (selectedPokemon) {
      setPokemonAvatar(selectedPokemon.image);
    }
  };

  const handleSetRegion = (r: Region) => {
    setRegion(r);
    const newStarter = startersByRegion[r][0].name;
    setStarter(newStarter);
    setPokemonAvatar(startersByRegion[r][0].image);
  };

  const handleSubmit = () => {
    const trainerData = {
      gender,
      name,
      region,
      starter,
      trainerAvatar,
      pokemonAvatar,
    };
    localStorage.setItem("trainerProfile", JSON.stringify(trainerData));
    navigate("/profile");
  };

  return (
    <div className="[height:calc(100vh_-_67px)] flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-2xl flex mb-8">
        <div className="text-sm font-medium bg-yellow-400 px-3 py-1 rounded-full">
          New Trainer Registration
        </div>
      </div>

      {/* Main card container */}
      <div className="w-full max-w-2xl bg-gray-500/50 rounded-2xl shadow-xl overflow-hidden border-4 border-gray-800 mb-10">
        <ProgressBar progress={(step / 3) * 100} />

        <div className="p-6 md:p-8">
          {/* Step indicators */}
          <div className="flex justify-center mb-8">
            {[1, 2, 3].map((stepNum) => (
              <StepIndicator key={stepNum} step={stepNum} currentStep={step} />
            ))}
          </div>

          {/* Step 1: Avatar Selection */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Select Your Trainer Avatar
                </h2>
                <p className="text-secondary">
                  Begin your Pokémon journey by choosing your trainer identity
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AvatarCard
                  gender="male"
                  currentGender={gender}
                  setGender={handleSetGender} // Updated handler
                  title="Male Trainer"
                  description="Classic Pokémon trainer style"
                  colorClass="border-blue-500 bg-blue-50"
                  image={maleAvatar}
                />

                <AvatarCard
                  gender="female"
                  currentGender={gender}
                  setGender={handleSetGender} // Updated handler
                  title="Female Trainer"
                  description="Adventurer ready for challenges"
                  colorClass="border-pink-500 bg-pink-50"
                  image={femaleAvatar}
                />
              </div>
            </div>
          )}

          {/* Step 2: Trainer Details */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-zinc-950 mb-2">
                  Trainer Information
                </h2>
                <p className="text-secondary">
                  Tell us about yourself to create your trainer profile
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <label className="block text-zinc-950 font-medium mb-2">
                      Trainer Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-950 font-medium mb-2">
                      Home Region
                    </label>
                    <select
                      value={region}
                      onChange={(e) =>
                        handleSetRegion(e.target.value as Region)
                      } // Updated handler
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Kanto">Kanto Region</option>
                      <option value="Johto">Johto Region</option>
                      <option value="Hoenn">Hoenn Region</option>
                    </select>
                  </div>
                </div>

                <TrainerProfilePreview
                  gender={gender}
                  name={name}
                  region={region}
                  trainerImage={trainerAvatar}
                />
              </div>
            </div>
          )}

          {/* Step 3: Starter Pokémon */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-zinc-950 mb-2">
                  Choose Your Starter Pokémon
                </h2>
                <p className="text-secondary">
                  Every great journey begins with a trusty companion
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {startersByRegion[region].map((pokemon) => (
                  <StarterCard
                    key={pokemon.name}
                    pokemon={pokemon}
                    selectedStarter={starter}
                    setStarter={handleSetStarter}
                  />
                ))}
              </div>

              <SelectionSummary
                starter={starter}
                region={region}
                starters={startersByRegion[region]}
                pokemonAvatar={pokemonAvatar}
              />
            </div>
          )}

          <NavigationButtons
            step={step}
            back={back}
            next={next}
            submit={handleSubmit}
            isNameEmpty={!name.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
