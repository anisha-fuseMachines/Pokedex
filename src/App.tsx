import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/layout/header";
import PokemonList from "./pages/PokemonList";
import FavouriteList from "./pages/FavoritePokemon";
import PokemonDetail from "./pages/PokemonDetails";
import { ToastContainer } from "react-toastify";
import { PokemonProvider } from "./global-state/contexts/PokemonProvider";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginButton from "./pages/Login";
import SignupPage from "./pages/SignUp";
import PageNotFound from "./components/common/PageNotFound";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <PokemonProvider>
      <Router>
        <div className="flex flex-col items-center justify-center mx-auto w-full min-h-screen bg-background md:w-5xl xl:w-[1550px]">
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
          <Header />
          <Routes>
            {/* Public login route */}
            <Route path="/login" element={<LoginButton />} />
            <Route path="/" element={<PokemonList />} />
            <Route
              path="/pokemon/:selectedPokemon"
              element={<PokemonDetail />}
            />
            {/* Protected routes wrapper */}
            <Route element={<ProtectedRoute />}>
              <Route path="/signup" element={<SignupPage />} />

              <Route path="/favorite" element={<FavouriteList />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </PokemonProvider>
  );
}

export default App;
