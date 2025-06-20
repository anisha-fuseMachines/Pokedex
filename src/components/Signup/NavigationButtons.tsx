export const NavigationButtons = ({
  step,
  back,
  next,
  submit,
  isNameEmpty,
}: {
  step: number;
  back: () => void;
  next: () => void;
  submit: () => void;
  isNameEmpty: boolean;
}) => (
  <div className="mt-10 flex justify-between">
    <button
      onClick={back}
      disabled={step === 1}
      className={`px-6 py-3 rounded-lg font-medium ${
        step === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      Back
    </button>

    {step < 3 ? (
      <button
        onClick={next}
        disabled={step === 2 && isNameEmpty}
        className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    ) : (
      <button
        onClick={submit}
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-colors"
      >
        Begin Your Journey
      </button>
    )}
  </div>
);
