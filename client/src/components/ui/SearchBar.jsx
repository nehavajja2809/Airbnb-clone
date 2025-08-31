import React, { useState } from "react";
import axiosInstance from "@/utils/axios";
import { usePlaces } from "../../../hooks";

const SearchBar = () => {
  const Places = usePlaces();
  const { setPlaces, setLoading } = Places;

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  // 🔹 Handle typing (debounced)
  const handleInputChange = (e) => {
    clearTimeout(searchTimeout);
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() !== "") {
      setLoading(true);
      setSearchTimeout(
        setTimeout(() => {
          fetchPlaces(value);
        }, 500)
      );
    }
  };

  // 🔹 Handle actual search request
  const fetchPlaces = async (term) => {
    try {
      const { data } = await axiosInstance.get(
        `/places/search?key=${term.trim()}`
      );
      setPlaces(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Trigger search on button click
  const handleButtonClick = () => {
    if (searchText.trim() !== "") {
      setLoading(true);
      fetchPlaces(searchText);
    }
  };

  return (
    <div className="flex w-4/6 overflow-hidden rounded-full border border-gray-400 bg-gray-300 shadow-sm hover:shadow-lg md:w-1/2">
      <div className="grow">
        <input
          type="search"
          placeholder="Where you want to go?"
          className="h-full w-full border-none py-2 px-4 text-sm focus:outline-none md:text-lg"
          onChange={handleInputChange}
          value={searchText}
        />
      </div>
      <div className="bg-blue flex cursor-pointer items-center bg-primary text-white">
        <button
          className="flex rounded-r-full bg-primary py-2 px-4 md:p-2"
          onClick={handleButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="mt-1 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span className="ml-1 hidden md:block">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
