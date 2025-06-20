import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth0, User } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, logout, isLoading } = useAuth0();

  return (
    <header className="w-full text-white">
      <div className="w-full p-4 flex items-center justify-between">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-24 sm:w-28 md:w-32 h-auto"
          />
        </Link>

        <nav className="flex items-center space-x-4 text-base md:text-lg">
          <Link
            to="/"
            className="text-white hover:text-yellow-400 transition-colors duration-200"
          >
            Pokèmon
          </Link>

          {isAuthenticated && (
            <Link
              to="/favorite"
              className="text-white hover:text-yellow-400 transition-colors duration-200"
            >
              Favourite
            </Link>
          )}

          {isLoading ? (
            <span className="text-white">Loading…</span>
          ) : isAuthenticated ? (
            <>
              {User}
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="px-3 py-1 hover:scale-105"
              >
                <AiOutlineLogout size={24} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Log In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
