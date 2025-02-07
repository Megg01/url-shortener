// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";

interface ShortLink {
  id: string;
  shortCode: string;
  longUrl: string;
  createdAt: string;
}

export default function AdminPage() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/links")
      .then((res) => res.json())
      .then((data) => {
        setLinks(data.links);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load links");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Short Links Admin</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Short Code</th>
              <th className="px-6 py-3 border-b">Long URL</th>
              <th className="px-6 py-3 border-b">Clicks</th>
              <th className="px-6 py-3 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {links?.map((link) => (
              <tr key={link.id}>
                <td className="px-6 py-4 border-b">{link.shortCode}</td>
                <td className="px-6 py-4 border-b truncate max-w-xs">
                  <a
                    href={link.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link.longUrl}
                  </a>
                </td>
                <td className="px-6 py-4 border-b">
                  {new Date(link.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
