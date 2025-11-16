// src\components\YouTubePreviewCard.tsx

import React from "react";

type Props = {
  title: string;
  channel: string;
  thumbnail: string;
  views: number;
  likes?: number;
  date: string;
  url: string; // Required clickable link
};

export default function YouTubePreviewCard({
  title,
  channel,
  thumbnail,
  views,
  likes,
  date,
  url,
}: Props) {
  return (
    <div className="flex gap-4 bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 overflow-hidden rounded-md block transition-transform duration-300 hover:scale-105 hover:brightness-110"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-40 h-24 object-cover"
        />
      </a>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Video Title:
          </p>
          <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
        </div>
        <div className="mt-3 text-xs text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            {channel}
          </span>

          <span className="flex items-center gap-1 before:content-['•'] before:mx-2 before:text-gray-400">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11h3v6h-3V7zm-4 4h2v2H7v-2z" />
            </svg>
            {views.toLocaleString()} views
          </span>

          {typeof likes === "number" && (
            <span className="flex items-center gap-1 before:content-['•'] before:mx-2 before:text-gray-400">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a6 6 0 1111.996.22l.004.281V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-7z" />
              </svg>
              {likes.toLocaleString()} likes
            </span>
          )}

          <span className="flex items-center gap-1 before:content-['•'] before:mx-2 before:text-gray-400">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 2a1 1 0 00-1 1v3h10V3a1 1 0 10-2 0v2H7V3a1 1 0 00-1-1zM3 9h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            {new Date(date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
