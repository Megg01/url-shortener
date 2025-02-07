"use client";

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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {shortUrl && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-gray-700">
            Short URL:
            <a href={shortUrl} className="text-blue-500 ml-2">
              {shortUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
