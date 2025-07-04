import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, logout, isLoading, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const getUsername = () => {
    if (isLoading) return "Loading...";
    if (isAuthenticated && user) {
      return user.nickname || user.name || "User";
    }
    return "Guest";
  };

  return (
    <header className="w-full text-white">
      <div className="w-full p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-24 sm:w-28 md:w-32 h-auto"
          />
        </Link>

        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-capitalize">
              {getUsername()}
            </span>
          </div>

          <nav className="flex items-center space-x-4 text-base md:text-lg">
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition-colors duration-200"
            >
              Pokèmon
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/favorite"
                  className="text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  Favourite
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  Profile
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="flex items-center text-white hover:text-red-400 transition-colors"
                title="Log out"
              >
                <AiOutlineLogout size={24} />
              </button>
            ) : (
              <button
                className="ml-2 px-3 py-1 border-1 border-pink-200 rounded-2xl text-white hover:bg-pink-700 transition text-sm"
                onClick={() =>
                  loginWithRedirect({
                    appState: { returnTo: window.location.pathname },
                  })
                }
              >
                Log In
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
