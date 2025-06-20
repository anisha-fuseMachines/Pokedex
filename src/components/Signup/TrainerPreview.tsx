import type { Gender } from "../../types/registration";

export const TrainerProfilePreview = ({
  gender,
  name,
  region,
  image,
}: {
  gender: Gender;
  name: string;
  region: string;
  image?: string;
}) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
    <h3 className="font-bold text-gray-800 mb-4">Your Trainer Profile</h3>
    <div className="flex items-center">
      <div
        className={`w-16 h-16 rounded-full mr-4 ${
          gender === "male" ? "bg-blue-300" : "bg-pink-300"
        }`}
      ></div>
      <div>
        <p className="font-semibold text-gray-800">{name || "New Trainer"}</p>
        <p className="text-sm text-gray-600 mt-1">From {region} Region</p>
        <div className="mt-2 flex">
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Trainer
          </span>
        </div>
      </div>
    </div>
  </div>
);
