export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="h-2 bg-gray-200">
    <div
      className="h-full bg-red-600 transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export const StepIndicator = ({
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
