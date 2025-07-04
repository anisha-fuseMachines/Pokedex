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

const maleAvatar = "/images/trainer-male.png";
const femaleAvatar = "/images/trainer-female.png";

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="h-2 bg-gray-200">
    <div
      className="h-full bg-red-600 transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const StepIndicator = ({
  step,
  currentStep,
}: {
  step: number;
  currentStep: number;
}) => (
  <div className="flex items-center">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        currentStep >= step
          ? "bg-red-600 text-white"
          : "bg-gray-200 text-gray-500"
      } font-bold text-lg`}
    >
      {step}
    </div>
    {step < 3 && (
      <div
        className={`w-16 h-1 ${
          currentStep > step ? "bg-red-600" : "bg-gray-200"
        }`}
      ></div>
    )}
  </div>
);

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<Gender>("male");
  const [name, setName] = useState("");
  const [region, setRegion] = useState<Region>("Kanto");
  const [starter, setStarter] = useState("Bulbasaur");
  const navigate = useNavigate();
  const startersByRegion: Record<Region, Pokemon[]> = {
    Kanto: [
      {
        name: "Bulbasaur",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      },
      {
        name: "Charmander",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      },
      {
        name: "Squirtle",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      },
    ],
    Johto: [
      {
        name: "Chikorita",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
      },
      {
        name: "Cyndaquil",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png",
      },
      {
        name: "Totodile",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png",
      },
    ],
    Hoenn: [
      {
        name: "Treecko",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png",
      },
      {
        name: "Torchic",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png",
      },
      {
        name: "Mudkip",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png",
      },
    ],
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    // Save trainer data to localStorage
    const trainerData = {
      gender,
      name,
      region,
      starter,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("trainerProfile", JSON.stringify(trainerData));

    // Redirect to profile page
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
                  setGender={setGender}
                  title="Male Trainer"
                  description="Classic Pokémon trainer style"
                  colorClass="border-blue-500 bg-blue-50"
                  image={maleAvatar}
                />

                <AvatarCard
                  gender="female"
                  currentGender={gender}
                  setGender={setGender}
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
                      onChange={(e) => setRegion(e.target.value as Region)}
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
                  image={gender === "male" ? maleAvatar : femaleAvatar}
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
                    setStarter={setStarter}
                  />
                ))}
              </div>

              <SelectionSummary
                starter={starter}
                region={region}
                starters={startersByRegion[region]} // Pass starters array
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
