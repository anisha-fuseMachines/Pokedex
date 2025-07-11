import type { Gender } from "../../types/registration";

export const AvatarCard = ({
  gender,
  currentGender,
  setGender,
  title,
  description,
  colorClass,
  image,
}: {
  gender: Gender;
  currentGender: Gender;
  setGender: (g: Gender) => void;
  title: string;
  description: string;
  colorClass: string;
  image?: string;
}) => (
  <button
    onClick={() => setGender(gender)}
    className={`p-6 rounded-xl border-2 transition-all ${
      currentGender === gender
        ? `${colorClass} shadow-md scale-[1.02]`
        : "border-gray-200 hover:border-gray-300"
    }`}
  >
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 mb-4 rounded-full flex items-center justify-center overflow-hidden">
        <img
          src={image}
          className={`w-16 h-16 rounded-full mr-4 ${
            gender === "male" ? "bg-blue-300" : "bg-pink-300"
          }`}
        />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="text-sm text-secondary mt-1">{description}</p>
    </div>
  </button>
);
