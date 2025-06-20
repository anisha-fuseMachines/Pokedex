import { Link } from "react-router-dom";

const PageNotFOund = () => {
  return (
    <div className="[height:calc(100vh_-_67px)] flex justify-center items-center flex-col">
      <img src="/assets/404.png" className="mb-3" />
      <h1 className="text-5xl text-white font-bold mb-4">Page Not Found!</h1>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-indigo-200 hover:bg-indigo-300 text-secondary font-bold py-3 px-6 rounded-full transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFOund;
