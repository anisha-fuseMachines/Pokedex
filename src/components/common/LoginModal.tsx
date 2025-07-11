import { useAuth0 } from "@auth0/auth0-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: (e: any) => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { loginWithRedirect } = useAuth0();

  if (!isOpen) return null;

  const handleLogin = (e: any) => {
    e.stopPropagation();
    localStorage.removeItem("pokemonAppliedFilters");
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
    onClose(e);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">Login Required</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <p className="text-gray-300 mb-6">
          You need to log in to favorite Pokémon.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
