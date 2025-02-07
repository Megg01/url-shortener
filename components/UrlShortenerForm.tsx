"use client";

import { ClipboardCopy } from "@/utils";
import { useState, FormEvent, ChangeEvent } from "react";

export default function UrlShortenerForm() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setError("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to shorten URL:" + JSON.stringify(err));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={handleChange}
          placeholder="Enter your URL"
          className="w-full p-2 mb-4 border rounded text-gray-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-primarybutton text-foreground font-semibold p-2 rounded hover:bg-primarybuttonhover"
        >
          Shorten
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {shortUrl && (
        <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 rounded">
          <p className="text-gray-700">
            Short URL:
            <a href={shortUrl} className="text-blue-500 ml-2">
              {shortUrl}
            </a>
          </p>
          <button type="button" onClick={() => ClipboardCopy(shortUrl)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 448 512"
            >
              <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
