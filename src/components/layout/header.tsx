import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { GoDotFill } from "react-icons/go";

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
      <div className="w-full p-3 sm:p-4 flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center mb-2 sm:mb-0">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-20 sm:w-24 md:w-28 h-auto"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <nav className="flex items-center gap-2 sm:gap-3 md:gap-4 text-sm sm:text-base md:text-lg">
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
            >
              Pokèmon
            </Link>

            {isAuthenticated && (
              <Link
                to="/favorite"
                className="text-white hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
              >
                Favourite
              </Link>
            )}

            <div className="flex items-center gap-2">
              {!isAuthenticated && (
                <div className=" text-yellow-300 rounded-2xl px-2 py-1 flex items-center gap-1">
                  <GoDotFill />
                  <span className="text-mdfont-medium">Guest</span>
                </div>
              )}

              {isAuthenticated ? (
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="flex items-center space-x-2 group focus:outline-none">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border-2 border-yellow-400 shadow-sm group-hover:border-yellow-300 transition-colors">
                        <span className="font-bold text-yellow-400 text-lg">
                          {getUsername().charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-medium text-white capitalize group-hover:text-yellow-300 transition-colors">
                        {getUsername()}
                      </span>
                      <span className="text-xs text-gray-300">My Account</span>
                    </div>
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                        >
                          <AiOutlineUser className="mr-2" size={16} />
                          Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => {
                            localStorage.removeItem("pokemonAppliedFilters");
                            localStorage.removeItem("trainerProfile");
                            logout({
                              logoutParams: {
                                returnTo: window.location.origin,
                              },
                            });
                          }}
                          className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                        >
                          <AiOutlineLogout className="mr-2" size={16} />
                          Logout
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              ) : (
                <button
                  className="px-2 sm:px-3 py-1 border border-pink-300 rounded-2xl text-white hover:bg-pink-700 transition text-xs sm:text-sm whitespace-nowrap"
                  onClick={() => {
                    localStorage.removeItem("pokemonAppliedFilters");
                    loginWithRedirect({
                      appState: { returnTo: window.location.pathname },
                    });
                  }}
                >
                  Log In
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
