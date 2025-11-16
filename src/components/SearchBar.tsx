// src\components\SearchBar.tsx
// used to tweak search display UI and handle search submissions
// also used to reset search state when user clears input

"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSubmit: (url: string) => void;
  onClear: () => void;
}

export default function SearchBar({ onSubmit, onClear }: SearchBarProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  const handleClear = () => {
    setUrl("");
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex flex-col gap-3 items-center"
    >
      <div className="relative w-full">
        <input
          id="search-input"
          type="text"
          placeholder="Enter YouTube video, playlist, or channel URL"
          className="
            pr-16
            border
            border-gray-300
            py-4
            px-6
            w-full
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-red-500
            transition
            rounded-full
          "
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition"
        >
          <Search size={20} />
        </button>
      </div>

      <div className="flex gap-2 justify-center mt-7">
        <button
          type="submit"
          className="w-32 bg-[#EF4444] text-white rounded-md px-3 py-1 hover:bg-[#cc3939] transition text-sm font-medium shadow hover:shadow-md"
        >
          Transcribe
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="w-32 bg-gray-300 text-gray-800 rounded-md px-3 py-1 hover:bg-gray-400 transition text-sm font-medium shadow hover:shadow-md"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
