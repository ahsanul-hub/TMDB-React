// import { useState } from "react";

interface Props {
  onChange: (value: string) => void;
  onSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<Props> = ({ onChange, onSearch }) => {
  return (
    <div className="w-full  justify-between p-4 flex bg-[#242424]  ">
      <div className="!bg-amber-400  text-black font-bold p-2 rounded-md">
        <h1 className="">Movie React</h1>
      </div>

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
    </div>
  );
};

export default Navbar;
