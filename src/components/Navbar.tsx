import { Link, useLocation } from "react-router-dom";

interface Props {
  onChange: (value: string) => void;
  onSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<Props> = ({ onChange, onSearch }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className="w-full  justify-between py-4 px-8 flex bg-[#0EA5E9]  ">
      <div className="flex items-center gap-4">
        <Link to="/">
          <div className="  text-white font-black p-2 rounded-md">
            <h1 className="text-5xl tracking-wider">CINEMA</h1>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {isHomePage && (
          <div className="relative w-[200px]">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="movie"
              id="simple-search"
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5   dark:focus:ring-yellow-500 dark:focus:border-yelring-yellow-500"
              placeholder="Search"
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={onSearch}
              required
            />
          </div>
        )}
        <Link to="/watchlist">
          <div className=" text-white font-bold p-2 rounded-md">
            <span className="">WatchList</span>
          </div>
        </Link>
        <Link to="/favorite">
          <div className=" text-white font-bold p-2 rounded-md">
            <span className="">Favorite</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
